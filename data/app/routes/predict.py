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

@bp.route('/predict', methods=['POST'])
def predict():
    request_data = request.get_json()
    행정동코드 = request_data.get('행정동코드')

    if not 행정동코드:
        return jsonify({"error": "행정동 코드를 제공해주세요."}, ensure_ascii=False), 400

    today = datetime.datetime.now().date()
    connection = create_connection()

    # DB 조회 및 예측
    with connection.cursor(dictionary=True) as cursor:
        cursor.execute("SELECT time, predict_people FROM predictions WHERE location_code = %s AND date = %s", (행정동코드, today))
        existing_predictions = cursor.fetchall()
        if existing_predictions:
            return jsonify({"message": "DB에서 예측 결과를 반환합니다.", "predictions": existing_predictions}, ensure_ascii=False), 200

    client = Client(n_workers=4, threads_per_worker=2, memory_limit='2GB')

    # 데이터 읽기
    folder_paths = ["/app/data/생활이동_행정동_202310/*.csv"]
    ddf = dd.read_csv(folder_paths, encoding='cp949', dtype=dtypes, blocksize="32MB")

    # 전처리
    ddf = ddf.map_partitions(preprocess)
    aggregated_data = aggregate_data(ddf, 행정동코드).compute()

    if aggregated_data.empty:
        return jsonify({"error": "해당 행정동코드에 대한 데이터가 없습니다."}), 404

    # 모델 훈련 및 예측
    X = aggregated_data[['연도', '월', '요일_숫자', '시간', '오전_오후', '러시아워', '주말']]
    y = aggregated_data['이동인구(합)']
    model, scaler = train_model(X, y)

    # 예측 수행
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
    save_prediction_to_db(connection, 행정동코드, today, results)

    print_progress("예측 완료.")
    
    json_response = json.dumps({"message": "오늘의 예측을 반환합니다.", "predictions": results}, ensure_ascii=False)
    return Response(json_response, content_type="application/json; charset=utf-8", status=200)
