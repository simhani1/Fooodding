# A608 팔조핑 팀

🐹 김도은 FE, 팀장, 프짱
🐰 오유진 BE
🦅 김예훈 FE
🐩 김윤  FE
🐣 심종한 BE, 백짱
🐈‍ 김범수 BE


# 푸드트럭 상권 분석 서비스

## 주요 기능 및 플로우

### 타겟층 (B2B 서비스 st)

- 합법적으로 상업 허가를 받고, 운영 중인 푸드트럭 사장님 (= 신고 걱정 x)
- 매출액을 늘리는 것에 고민인 사장님
- 새로 사업을 시작하게 된 사장님

### 주요 기능

- **시간대별 연령/성별별 유동인구 지도**
- 상업 행위 허용 가능 구역 데이터 활용 → 푸드트럭 동종업계(큰 카테고리)에 따른 분포도 확인
    - 행사 유무 — 푸드 트럭 신청 공모 확인 기능? (이건 얘기해봐야 할 듯)
- 푸드트럭 메뉴의 타겟층 설정 및 필터링 기능 (ex 20대 남녀 타겟 - 성수동을 가세요 이런…)

**푸드트럭 상인들이 우리 서비스를 이용해야 할 근거가 되는 기능**

- 해당 시간대의 장소+매출액 등록을 통해 **매출 통계 서비스 제공** (aka 애드포스트)
    - 간편 결제 서비스로 연결 → 개인화 맞춤 추천 통계
    - 카카오결제 api 조사 필요
    - 아니면 수기로 직접 입력 (하루 단위로)
- 푸드트럭 홍보 마케팅 기능 제공
    - 전단지 및 쿠폰 제공
    - 유저 입장의 화면 제공이 필요함
- 푸드트럭 협동 조합 가입 안내 ? ㅋㅋ (이게 좋은가?)
    - 공모 연결 서비스로 가면 좋을 수도??
        - https://culture.seoul.go.kr/culture/bbs/B0000000/view.do?nttId=9695&menuNo=200050&pageIndex=1
    - 지원사업 연결?
        - http://hamkke.org/archives/business/47922
- 백종원 푸드트럭 코칭 연결 서비스

---

## 푸드트럭  창업 및 운영 생태계

https://brunch.co.kr/@foodtravelhleu/3

https://www.thescoop.co.kr/news/articleView.html?idxno=302119

https://www.data.go.kr/data/15028208/standard.do#tab_layer_grid


<푸드트럭 현황>
https://www.data.go.kr/data/15098933/fileData.do
https://www.data.go.kr/data/3073395/fileData.do


----------
아래 데이터들을 활용하여 Develop

### 야외 나들이 추천 서비스 ‘보고가’

- 활용 데이터
    - https://hangang.seoul.go.kr/www/utztnStats/utztnStats.do?mid=622
    - https://data.kma.go.kr/api/selectApiList.do?pgmNo=42
    - https://data.seoul.go.kr/dataList/OA-21285/F/1/datasetView.do
    - https://data.seoul.go.kr/dataList/OA-21778/A/1/datasetView.do
    - https://data.seoul.go.kr/dataList/OA-15386/F/1/datasetView.do
    - https://gimi9.com/dataset/bigdata-culture-dataset-845116/
    - https://www.data.go.kr/data/15050093/fileData.do
    - https://www.data.go.kr/data/15044234/fileData.do?recommendDataYn=Y
    - https://data.seoul.go.kr/dataVisual/seoul/seoulLivingMigration.do 데이터
    - https://data.seoul.go.kr/dataList/OA-394/S/1/datasetView.do
    - https://data.seoul.go.kr/dataList/OA-21229/F/1/datasetView.do#
    - https://data.seoul.go.kr/dataList/OA-13122/S/1/datasetView.do
    - https://data.seoul.go.kr/dataList/OA-21084/S/1/datasetView.do
    - [https://korean.visitkorea.or.kr/search/search_list.do?keyword=나들이 코스&area=All](https://korean.visitkorea.or.kr/search/search_list.do?keyword=%EB%82%98%EB%93%A4%EC%9D%B4%20%EC%BD%94%EC%8A%A4&area=All)

    
- 공원별 인원 혼잡도 + 날씨를 바탕으로 내가 원하는 시간, 날짜에 돗자리를 들고 놀러갈 수 있는지 판단해주는 서비스
- 확장하자면 야외나들이로 확장
- 나들이 장소 추천서비스로 확장해도 재밌을 거 같고
- 테마별 벚꽃놀이, 불꽃놀이, 드론쇼 등의 행사 기간에 맞춰서 추천

<관련 프로젝트>
https://github.com/green-pinetree/picnic-map
https://notefolio.net/soar_dy/209759


