import dask.dataframe as dd
import pandas as pd
import numpy as np
from dask.distributed import Client
import warnings

warnings.filterwarnings("ignore", category=DeprecationWarning)

def preprocess_data(df):
    # '이동인구(합)' 열의 '*' 값을 NaN으로 변경하고, 숫자로 변환
    df['이동인구(합)'] = df['이동인구(합)'].replace('*', np.nan)
    df['이동인구(합)'] = dd.to_numeric(df['이동인구(합)'], errors='coerce').fillna(2)
    df['시간'] = df['도착시간']
    
    day_mapping = {'월': 0, '화': 1, '수': 2, '목': 3, '금': 4, '토': 5, '일': 6}
    df['요일_숫자'] = df['요일'].map(day_mapping)
    
    # 도착 행정동 코드가 1로 시작하는 행만 필터링
    df = df[df['도착 행정동 코드'].str.startswith('1')]
    
    return df[['도착 행정동 코드', '이동인구(합)', '시간', '요일_숫자']]

def assign_congestion_level(group):
    if group.isnull().all():
        return pd.Series(np.full(len(group), np.nan), index=group.index)
    
    non_nan_group = group.dropna()
    
    if non_nan_group.nunique() <= 1:  # All values are the same or only one unique value
        return pd.Series(np.full(len(group), 1), index=group.index)
    
    try:
        return pd.qcut(non_nan_group, q=4, labels=[1, 2, 3, 4], duplicates='drop')
    except ValueError:
        min_val, max_val = non_nan_group.min(), non_nan_group.max()
        if min_val == max_val:
            return pd.Series(np.full(len(group), 1), index=group.index)
        
        # Create bins manually if needed
        bins = np.linspace(min_val, max_val, 5)  # 4 equal intervals
        return pd.cut(non_nan_group, bins=bins, labels=[1, 2, 3, 4], include_lowest=True)

def calculate_congestion_levels():
    client = Client(n_workers=4, threads_per_worker=2, memory_limit='4GB')
    
    folder_paths = [
        r"C:\Users\SSAFY\Downloads\생활이동\생활이동_행정동_202310\*.csv",
        r"C:\Users\SSAFY\Downloads\생활이동\생활이동_행정동_202407\*.csv"
    ]
    
    ddf = dd.concat([dd.read_csv(path, encoding='cp949', dtype={'도착 행정동 코드': 'object'}) for path in folder_paths])
    ddf = preprocess_data(ddf)

    # 데이터 샘플 확인
    print("이동인구 데이터 샘플:")
    print(ddf.head())  # Dask DataFrame의 상위 5개 샘플 출력

    # Calculate total 이동인구(합)
    grouped = ddf.groupby(['요일_숫자', '시간', '도착 행정동 코드'])['이동인구(합)'].sum()
    grouped_df = grouped.compute().reset_index()  # GroupBy 결과를 Dask DataFrame에서 Pandas DataFrame으로 변환
    
    # 병합 전 샘플 확인
    print("그룹화된 데이터 샘플:")
    print(grouped_df.head())  # 그룹화된 데이터의 상위 5개 샘플 출력
    
    try:
        admin_areas = pd.read_excel(r'C:\Users\SSAFY\행정동별_면적.xlsx', dtype={'행정동코드': 'object'})
        
        # 행정동코드 열을 문자열로 변환 후 공백 제거
        admin_areas['행정동코드'] = admin_areas['행정동코드'].astype(str).str.strip()
        
        # 행정동 면적 데이터 샘플 확인
        print("행정동 면적 데이터 샘플:")
        print(admin_areas.head())  # 행정동 면적 데이터의 상위 5개 샘플 출력
        
    except FileNotFoundError:
        print("행정동별_면적.xlsx 파일을 찾을 수 없습니다. 파일 경로를 확인해주세요.")
        client.close()
        return
    
    # 병합하여 면적과 이동인구 데이터를 합칩니다.
    merged_df = pd.merge(grouped_df, admin_areas, left_on='도착 행정동 코드', right_on='행정동코드', how='left')
    
    # 면적이 NaN인 경우에 대한 로그 출력
    if merged_df['면적'].isnull().any():
        print("다음 '행정동코드'에서 면적 정보를 찾을 수 없습니다:")
        print(merged_df[merged_df['면적'].isnull()]['도착 행정동 코드'].unique())
    
    # 밀도 계산
    merged_df['밀도'] = merged_df['이동인구(합)'] / merged_df['면적'].replace(0, np.nan)
    
    # 혼잡도 계산 (4가 가장 혼잡)
    merged_df['혼잡도'] = merged_df.groupby(['요일_숫자', '시간'])['밀도'].transform(assign_congestion_level)
    
    result = merged_df[['요일_숫자', '시간', '행정동코드', '동이름', '이동인구(합)', '면적', '밀도', '혼잡도']]
    result.to_parquet('congestion_levels.parquet', engine='pyarrow', index=False)
    
    print("Congestion levels have been calculated and saved to congestion_levels.parquet")
    
    client.close()


if __name__ == "__main__":
    calculate_congestion_levels()
