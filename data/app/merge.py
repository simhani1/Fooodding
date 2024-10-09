import pandas as pd

행정동코드_df = pd.read_excel(r'C:\Users\SSAFY\Downloads\행정동코드.xlsx')
행정동면적_df = pd.read_excel(r'C:\Users\SSAFY\Downloads\행정동면적.xlsx')


# 데이터프레임 컬럼 이름 확인 (필요시 수정)
print(행정동코드_df.columns)
print(행정동면적_df.columns)

# Outer Join 수행 (, 와 중점 통일 )
행정동코드_df['동이름'] = 행정동코드_df['동이름'].str.replace('.', '·')
행정동면적_df['행정동'] = 행정동면적_df['행정동'].str.replace('.', '·')
merged_df = pd.merge(행정동코드_df, 행정동면적_df, left_on='동이름', right_on='행정동', how='outer', indicator=True)

# 합쳐지지 않은 행 조회 (left_only, right_only)
not_matched = merged_df[merged_df['_merge'] != 'both']

# 결과 출력
print("합쳐지지 않은 행들:")
print(not_matched)

# 합쳐진 결과 저장 (필요시)
merged_df.to_excel(r'C:\Users\SSAFY\행정동별_면적.xlsx', index=False)
