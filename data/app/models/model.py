import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
import xgboost as xgb
import datetime
from sklearn.model_selection import train_test_split

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
