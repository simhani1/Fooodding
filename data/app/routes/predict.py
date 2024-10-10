from flask import Blueprint, request, jsonify, Response
<<<<<<< HEAD
<<<<<<< HEAD
from app.models.model import preprocess, aggregate_data, train_model
=======
<<<<<<< HEAD
from app.models.predict_model import preprocess, aggregate_data, train_model
=======
from app.models.model import preprocess, aggregate_data, train_model
>>>>>>> ac59f34a409f086a308e10ad5dac158ca0830a67
>>>>>>> 4c59f8d (feat: 혼잡도 api 설계)
=======
from app.models.predict_model import preprocess, aggregate_data, train_model
<<<<<<< HEAD

>>>>>>> a11ace3 (feat: 성별, 연령대 별 행정동 추천 알고리즘 api 설계)
=======
>>>>>>> d542351 (fix: 추천 api 수정)
from app.utils.db import create_connection, save_prediction_to_db
import datetime
import json
import dask.dataframe as dd
import pandas as pd
from dask.distributed import Client
from flask_cors import CORS

bp = Blueprint('predict', __name__)
CORS(bp, supports_credentials=True)
def print_progress(message):
    print(f"[{datetime.datetime.now()}] {message}")

@bp.route('/predict', methods=['POST'])
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
        query = "SELECT time, predict_people FROM predictions WHERE location_code = %s AND date = %s"
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
    "/app/data/생활이동_행정동_202310/*.csv",
    "/app/data/생활이동_행정동_202210/*.csv",
    "/app/data/생활이동_행정동_202110/*.csv",
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
    return Response(json_response, content_type="application/json; charset=utf-8", status=200)