from flask import Flask, request, jsonify, Response
import dask.dataframe as dd
import pandas as pd
import numpy as np
from dask.distributed import Client
import datetime
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import json

import mysql.connector
from mysql.connector import Error

app = Flask(__name__)

def print_progress(message):
    print(f"[{datetime.datetime.now()}] {message}")

def preprocess(df):
    df['이동인구(합)'] = df['이동인구(합)'].replace('*', np.nan)
    df['이동인구(합)'] = pd.to_numeric(df['이동인구(합)'], errors='coerce').fillna(0)
    
    df['대상연월'] = df['대상연월'].astype(str)
    df['연도'] = df['대상연월'].str[:4]
    df['월'] = df['대상연월'].str[4:6]
    
    df['연도'] = pd.to_numeric(df['연도'], errors='coerce')
    df['월'] = pd.to_numeric(df['월'], errors='coerce')
    
    current_year = datetime.datetime.now().year
    df['연도'] = df['연도'].fillna(current_year)
    df['연도'] = df['연도'].clip(2000, current_year)
    df['월'] = df['월'].fillna(1)
    df['월'] = df['월'].clip(1, 12)
    
    df['연도'] = df['연도'].astype(int)
    df['월'] = df['월'].astype(int)
    
    df['시간'] = df['도착시간']
    
    day_mapping = {'월': 0, '화': 1, '수': 2, '목': 3, '금': 4, '토': 5, '일': 6}
    df['요일_숫자'] = df['요일'].map(day_mapping)
    
    df['오전_오후'] = (df['시간'] >= 12).astype(int)
    df['러시아워'] = ((df['시간'] >= 7) & (df['시간'] <= 9) | (df['시간'] >= 17) & (df['시간'] <= 19)).astype(int)
    df['주말'] = (df['요일_숫자'] >= 5).astype(int)
    
    return df[['도착 행정동 코드', '이동인구(합)', '연도', '월', '시간', '요일_숫자', '오전_오후', '러시아워', '주말']]

def aggregate_data(ddf, 행정동코드):
    return (ddf[ddf['도착 행정동 코드'] == 행정동코드]
            .groupby(['연도', '월', '요일_숫자', '시간'])
            .agg({'이동인구(합)': 'sum', '오전_오후': 'first', '러시아워': 'first', '주말': 'first'})
            .reset_index())

def train_model(X, y):
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    model = xgb.XGBRegressor(
        objective='reg:squarederror',
        max_depth=8,
        learning_rate=0.01,
        n_estimators=1000,
        subsample=0.8,
        colsample_bytree=0.8,
        gamma=0.1,
        min_child_weight=1,
        tree_method='hist',
        random_state=42,
        early_stopping_rounds=50
    )
    
    model.fit(X_train_scaled, y_train, eval_set=[(X_test_scaled, y_test)], verbose=True)

    return model, scaler

def create_connection():
    connection = None
    try:
        connection = mysql.connector.connect(
            host='j11a608.p.ssafy.io',      
            user='fooding_admin',        
            password='fooding1234', 
            database='fooding' 
        )
        print("MySQL 연결 성공")
    except Error as e:
        print(f"Error: '{e}'")

    return connection

def save_prediction_to_db(connection, 행정동코드, date, predictions):
    cursor = connection.cursor()
    for pred in predictions:
        시간 = pred['시간']
        예측유동인구 = pred['예측 유동인구']
        query = "INSERT INTO predictions (행정동코드, 조회날짜, 시간, 예측유동인구) VALUES (%s, %s, %s, %s)"
        values = (행정동코드, date, 시간, 예측유동인구)
        cursor.execute(query, values)
    connection.commit()
    cursor.close()

@app.route('/api/v1/predict', methods=['POST'])
def predict():
    request_data = request.get_json()
    행정동코드 = request_data.get('행정동코드')

    if not 행정동코드:
        return jsonify({"error": "행정동 코드를 제공해주세요."}, ensure_ascii=False), 400

    today = datetime.datetime.now().date()

    # 1. DB에서 예측된 값을 먼저 조회합니다.
    connection = create_connection()
    if connection:
        cursor = connection.cursor(dictionary=True)
        query = "SELECT 시간, 예측유동인구 FROM predictions WHERE 행정동코드 = %s AND 조회날짜 = %s"
        cursor.execute(query, (행정동코드, today))
        existing_predictions = cursor.fetchall()

        # 2. 예측 값이 있으면 바로 반환합니다.
        if existing_predictions:
            print_progress("DB에서 예측 결과를 가져왔습니다.")
            cursor.close()
            json_response = json.dumps({"message": "DB에서 예측 결과를 반환합니다.", "predictions": existing_predictions}, ensure_ascii=False)
            return Response(json_response, content_type="application/json; charset=utf-8", status=200)

        cursor.close()

    # 3. 예측 값이 없을 때, 예측을 진행합니다.
    print_progress("Dask 클라이언트 설정 중...")
    client = Client(n_workers=4, threads_per_worker=2, memory_limit='2GB')
    print(client.dashboard_link)

    print_progress("데이터 로드 중...")
    folder_paths = [
        r"C:\Users\SSAFY\Downloads\생활이동\생활이동_행정동_202310\*.csv",
        r"C:\Users\SSAFY\Downloads\생활이동\생활이동_행정동_202210\*.csv",
        r"C:\Users\SSAFY\Downloads\생활이동\생활이동_행정동_202110\*.csv",
    ]

    dtypes = {
        '이동인구(합)': 'object',
        '도착 행정동 코드': 'object',
        '대상연월': 'object',
        '도착시간': 'int32',
        '요일': 'object'
    }

    def read_csv_optimized(path):
        return dd.read_csv(path, encoding='cp949', dtype=dtypes, blocksize="32MB",
                           usecols=['이동인구(합)', '도착 행정동 코드', '대상연월', '도착시간', '요일'])

    ddf = dd.concat([read_csv_optimized(path) for path in folder_paths])

    print_progress("데이터 전처리 중...")
    ddf = ddf.map_partitions(preprocess)

    print_progress(f"행정동 코드 {행정동코드}에 해당하는 데이터 필터링 및 집계 중...")
    aggregated_data = aggregate_data(ddf, 행정동코드).compute()

    if aggregated_data.empty:
        return jsonify({"error": "해당 행정동코드에 대한 데이터가 없습니다."}), 404

    print_progress("모델 훈련 시작...")

    X = aggregated_data[['연도', '월', '요일_숫자', '시간', '오전_오후', '러시아워', '주말']]
    y = aggregated_data['이동인구(합)']

    model, scaler = train_model(X, y)

    # 4. 예측을 수행합니다.
    hours = list(range(24))
    X_pred = pd.DataFrame({
        '연도': [today.year] * 24,
        '월': [today.month] * 24,
        '요일_숫자': [today.weekday()] * 24,
        '시간': hours,
        '오전_오후': [0 if h < 12 else 1 for h in hours],
        '러시아워': [1 if (7 <= h <= 9) or (17 <= h <= 19) else 0 for h in hours],
        '주말': [1 if today.weekday() >= 5 else 0] * 24
    })

    X_pred_scaled = scaler.transform(X_pred)
    predictions = model.predict(X_pred_scaled)

    results = [{"시간": hour, "예측 유동인구": max(0, int(pred)/4)} for hour, pred in zip(hours, predictions)]

    # 5. 예측 결과를 DB에 저장합니다.
    save_prediction_to_db(connection, 행정동코드, today, results)

    print_progress("예측 완료.")
    json_response = json.dumps({"message": "오늘의 예측을 반환합니다.", "predictions": results}, ensure_ascii=False)

    # 명시적으로 UTF-8 인코딩을 지정한 응답 생성
    response = Response(json_response, content_type="application/json; charset=utf-8", status=200)
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
