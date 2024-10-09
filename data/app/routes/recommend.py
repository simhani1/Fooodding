from flask import Blueprint, request, Response
import dask.dataframe as dd
import numpy as np
from dask.distributed import Client
import datetime
import json  

bp = Blueprint('recommend', __name__)

def print_progress(message):
    print(f"[{datetime.datetime.now()}] {message}")

def preprocess(ddf):
    ddf['이동인구(합)'] = ddf['이동인구(합)'].replace('*', np.nan)
    ddf['이동인구(합)'] = dd.to_numeric(ddf['이동인구(합)'], errors='coerce').fillna(0)
    
    # 연령대 전처리
    ddf['연령대'] = ddf['나이'].map(lambda x: min(x // 10, 6), meta=('x', 'int'))
    return ddf

@bp.route('/recommend', methods=['POST'])
def recommend():
    request_data = request.get_json()
    gender = request_data.get('성별')
    age = request_data.get('나이')

    if gender is None or age is None:
        return Response(json.dumps({"error": "성별과 나이를 제공해주세요."}), content_type="application/json; charset=utf-8", status=400)

    print_progress("Dask 클라이언트 설정 중...")
    client = Client(n_workers=4, threads_per_worker=2, memory_limit='4GB')
    
    print_progress("데이터 로드 중...")
    folder_paths = [
        r"C:\Users\SSAFY\Downloads\생활이동\생활이동_행정동_202310\*.csv",
        r"C:\Users\SSAFY\Downloads\생활이동\생활이동_행정동_202407\*.csv"
    ]

    dtypes = {
        '이동인구(합)': 'object',
        '도착 행정동 코드': 'object',
        '대상연월': 'object',
        '도착시간': 'int32',
        '요일': 'object',
        '성별': 'object', 
        '나이': 'int32'    
    }

    ddf = dd.concat([dd.read_csv(path, encoding='cp949', dtype=dtypes) for path in folder_paths])
    
    print_progress("데이터 전처리 중...")
    ddf = preprocess(ddf)

    # 필요한 열만 선택
    ddf = ddf[['도착 행정동 코드', '이동인구(합)', '성별', '나이', '연령대']]  # '연령대' 열 포함

    # 필터링: 성별 및 연령대 기반으로 유동인구 계산
    print_progress("데이터 필터링 및 집계 중...")
    age_group = min(age // 10, 6)  # 0~6세대 범위로 변환

    filtered_ddf = ddf[(ddf['성별'] == gender) & (ddf['연령대'] == age_group)]
    aggregated_data = filtered_ddf.groupby('도착 행정동 코드')['이동인구(합)'].sum().compute()

    if aggregated_data.empty:
        return Response(json.dumps({"error": "해당 조건에 맞는 데이터가 없습니다."}), content_type="application/json; charset=utf-8", status=404)

    # 62로 나누기
    results = (aggregated_data / 62).nlargest(10)  # 유동인구 합계 상위 10개 추천

    recommendations = [{"행정동코드": code, "유동인구": int(pop)} for code, pop in results.items()]

    print_progress("추천 완료.")
   
    json_response = json.dumps({"message": "추천된 행정동코드와 유동인구", "recommendations": recommendations}, ensure_ascii=False)
    response = Response(json_response, content_type="application/json; charset=utf-8", status=200)
    return response
