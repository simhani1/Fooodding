from flask import Blueprint, Response, Flask
import pandas as pd
from datetime import datetime
import json
from flask_cors import CORS
# Blueprints를 정의합니다.
bp = Blueprint('congestion', __name__)
CORS(bp, supports_credentials=True)

# 모델을 불러옵니다. 경로는 상황에 맞게 수정해야 합니다.
congestion_data = pd.read_parquet('congestion_levels.parquet')

@bp.route('/congestion', methods=['GET'])
def get_congestion():
    # 현재 시간과 요일을 가져옵니다.
    now = datetime.now()
    current_hour = now.hour  # 시간은 정수로 설정 (예: 21)
    current_day = now.weekday()  # 월요일=0, 일요일=6
    
    # 해당 시간과 요일에 맞는 데이터를 필터링합니다.
    filtered_data = congestion_data[
        (congestion_data['요일_숫자'] == current_day) & 
        (congestion_data['시간'] == current_hour)
    ]
    
    # '행정동코드'가 null이 아닌 행만 필터링하고, '행정동코드'와 '혼잡도' 열만 선택합니다.
    filtered_data = filtered_data[filtered_data['행정동코드'].notna()][['행정동코드', '혼잡도']]
    
    # 혼잡도를 정수형으로 변환합니다.
    filtered_data['혼잡도'] = filtered_data['혼잡도'].astype(int)
    
    # NaN 값을 null로 변환하고 JSON으로 변환합니다.
    result = filtered_data.where(pd.notnull(filtered_data), None).to_dict(orient='records')
    json_response = json.dumps(result, ensure_ascii=False)
    
    response = Response(json_response, content_type="application/json; charset=utf-8", status=200)
    return response
