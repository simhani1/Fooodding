from flask import Flask, request, jsonify, Response
import joblib
import pandas as pd
import numpy as np
import datetime
import os

import json
app = Flask(__name__)

# 모델과 스케일러를 메모리에 로드해 둠
model_dict = {}
scaler_dict = {}

def load_model(행정동코드):
    model_filename = f"population_prediction_{행정동코드}"
    if 행정동코드 not in model_dict:
        model_path = f"{model_filename}_model.joblib"
        scaler_path = f"{model_filename}_scaler.joblib"
        if os.path.exists(model_path) and os.path.exists(scaler_path):
            model_dict[행정동코드] = joblib.load(model_path)
            scaler_dict[행정동코드] = joblib.load(scaler_path)
        else:
            return None, None
    return model_dict[행정동코드], scaler_dict[행정동코드]

def predict_population_today(model, scaler):
    today = datetime.datetime.now()
    year = today.year
    month = today.month
    weekday = today.weekday()

    hours = list(range(24))
    X_pred = pd.DataFrame({
        '연도': [year] * 24,
        '월': [month] * 24,
        '요일_숫자': [weekday] * 24,
        '시간': hours,
        '오전_오후': [0 if h < 12 else 1 for h in hours],
        '러시아워': [1 if (7 <= h <= 9) or (17 <= h <= 19) else 0 for h in hours],
        '주말': [1 if weekday >= 5 else 0] * 24
    })

    X_pred_scaled = scaler.transform(X_pred)
    predictions = model.predict(X_pred_scaled)
    
    return pd.DataFrame({'시간': hours, '예측 유동인구': predictions.astype(int)})

@app.route('/predict', methods=['POST'])
def predict():
    # JSON 형식의 요청에서 행정동 코드를 가져옴
    request_data = request.get_json()
    행정동코드 = request_data.get('행정동코드')
    
    if not 행정동코드:
        return jsonify({"error": "행정동 코드를 제공해주세요."}), 400

    # 모델 로드
    model, scaler = load_model(행정동코드)
    if model is None or scaler is None:
        return jsonify({"error": "모델을 찾을 수 없습니다. 해당 행정동코드에 대해 먼저 모델을 훈련시켜주세요."}), 404

    # 오늘 날짜의 유동인구 예측
    predictions = predict_population_today(model, scaler)
    today = datetime.datetime.now().strftime("%Y-%m-%d")
    
    # 예측 결과 반환
    return Response(
    json.dumps({
        "date": today,
        "predictions": predictions.to_dict(orient='records')
    }, ensure_ascii=False), 
    mimetype='application/json'
    )

if __name__ == '__main__':
    app.run(debug=True)
