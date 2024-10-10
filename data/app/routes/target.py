from flask import Blueprint, request, jsonify, Response
from app.models.predict_model import preprocess, aggregate_data, train_model
from app.utils.db import create_connection, save_target_to_db, get_gender_and_age_by_category, get_foodtruck_category
import datetime
import dask.dataframe as dd
import pandas as pd
from dask.distributed import Client
from flask_cors import CORS
import json

bp = Blueprint('target', __name__)
CORS(bp, supports_credentials=True)

def print_progress(message):
    print(f"[{datetime.datetime.now()}] {message}")

@bp.route('/target', methods=['POST'])
def target():
    request_data = request.get_json()
    foodtruck_id = request_data.get('foodtruck_id')

    if foodtruck_id is None:
        return Response(json.dumps({"error": "푸드트럭 ID를 제공해주세요."}, ensure_ascii=False), content_type="application/json; charset=utf-8", status=400)

    # DB 연결
    connection = create_connection()
    print_progress("DB 연결 성공")

    # 푸드트럭 카테고리 조회
    category = get_foodtruck_category(connection, foodtruck_id)
    if category is None:
        return Response(json.dumps({"error": "해당 ID에 맞는 푸드트럭이 없습니다."}, ensure_ascii=False), content_type="application/json; charset=utf-8", status=404)

    # 카테고리에 따른 성별 및 연령대 매핑
    gender, age = get_gender_and_age_by_category(category)
    if gender is None or age is None:
        return Response(json.dumps({"error": "해당 카테고리에 맞는 성별과 연령대 정보가 없습니다."}, ensure_ascii=False), content_type="application/json; charset=utf-8", status=404)

    print_progress(f"푸드트럭 카테고리: {category}, 성별: {gender}, 연령대: {age}")

    print_progress("Dask 클라이언트 설정 중...")
    client = Client(n_workers=4, threads_per_worker=2, memory_limit='4GB')
    print_progress("Dask 클라이언트 설정 완료")

    # 행정동코드 가져오기
    행정동코드 = request_data.get('행정동코드')
    if not 행정동코드:
        return jsonify({"error": "행정동 코드를 제공해주세요."}), 400

    today = datetime.datetime.now().date()
    print_progress(f"오늘 날짜: {today}")

    # DB 조회 및 예측
    with connection.cursor(dictionary=True) as cursor:
        cursor.execute("SELECT time, predict_people FROM target WHERE location_code = %s AND date = %s", (행정동코드, today))
        existing_predictions = cursor.fetchall()
        if existing_predictions:
            print_progress("DB에서 예측 결과를 반환합니다.")
            return jsonify({"message": "DB에서 예측 결과를 반환합니다.", "predictions": existing_predictions}), 200

    # 데이터 읽기
    print_progress("데이터 파일 읽는 중...")
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

    ddf = dd.read_csv(folder_paths, encoding='cp949', dtype=dtypes, blocksize="32MB")
    print_progress("데이터 파일 읽기 완료")

    # 전처리
    print_progress("데이터 전처리 중...")
    ddf = ddf.map_partitions(preprocess)
    aggregated_data = aggregate_data(ddf, 행정동코드).compute()
    print_progress("데이터 전처리 완료")

    if aggregated_data.empty:
        return jsonify({"error": "해당 행정동코드에 대한 데이터가 없습니다."}), 404

    # 성별과 나이에 해당하는 데이터 필터링
    filtered_data = aggregated_data[(aggregated_data['성별'] == gender) & (aggregated_data['연령대'] == age)]
    print_progress(f"성별: {gender}, 연령대: {age}에 맞는 데이터 필터링 완료")

    if filtered_data.empty:
        return jsonify({"error": "성별 및 연령대에 맞는 데이터가 없습니다."}), 404

    # 모델 훈련 및 예측
    print_progress("모델 훈련 중...")
    X = filtered_data[['연도', '월', '요일_숫자', '시간', '오전_오후', '러시아워', '주말']]
    y = filtered_data['이동인구(합)']
    model, scaler = train_model(X, y)
    print_progress("모델 훈련 완료")

    # 예측 수행
    print_progress("예측 수행 중...")
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

    results = [{"시간": hour, "예측 유동인구": max(0, int(pred) / 4)} for hour, pred in zip(hours, predictions)]
    save_target_to_db(connection, 행정동코드, today, results)
    print_progress("예측 결과 DB에 저장 완료")

    return jsonify({"message": "오늘의 예측을 반환합니다.", "predictions": results}), 200
