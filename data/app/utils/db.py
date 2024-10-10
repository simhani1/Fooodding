import mysql.connector
from mysql.connector import Error

def create_connection():
    connection = None
    try:
        connection = mysql.connector.connect(
            host='j11a608.p.ssafy.io',      
            user='fooding_admin',        
            password='fooding1234', 
            database='fooding' 
        )
        print("MySQL 연결 성공")
    except Error as e:
        print(f"Error: '{e}'")

    return connection

def save_prediction_to_db(connection, location_code, date, predictions):
    cursor = connection.cursor()
    for pred in predictions:
        time = pred['시간']
        predict_people = pred['예측 유동인구']
        query = "INSERT INTO predictions (location_code, date, time, predict_people) VALUES (%s, %s, %s, %s)"
        values = (location_code, date, time, predict_people)
        cursor.execute(query, values)
    connection.commit()
    cursor.close()

# 푸드트럭 ID로 카테고리를 가져오는 함수
def get_foodtruck_category(connection, foodtruck_id):
    cursor = connection.cursor(dictionary=True)
    query = "SELECT category FROM foodtruck WHERE foodtruck_id = %s"
    cursor.execute(query, (foodtruck_id,))
    result = cursor.fetchone()
    cursor.close()
    
    if result:
        return result['category']
    else:
        return None

# 카테고리에 따라 성별과 연령대 매핑하는 함수
def get_gender_and_age_by_category(category):
    category_mapping = {
        'KOREAN': ('M', 30),
        'JAPANESE': ('M', 20),
        'CHINESE': ('M', 10),
        'WESTERN': ('F', 20),
        'BUNSIK': ('F', 10),
        'ASIAN': ('F', 30),
        'FAST_FOOD': ('M', 10),
        'CAFE_DESSERT': ('F', 20),
    }
    
    return category_mapping.get(category, (None, None))

def save_prediction_to_db(connection, location_code, date, predictions):
    cursor = connection.cursor()
    for pred in predictions:
        time = pred['시간']
        predict_people = pred['예측 유동인구']
        query = "INSERT INTO predictions (location_code, date, time, predict_people) VALUES (%s, %s, %s, %s)"
        values = (location_code, date, time, predict_people)
        cursor.execute(query, values)
    connection.commit()
    cursor.close()

def save_target_to_db(connection, location_code, date, target):
    cursor = connection.cursor()
    for pred in target:
        time = pred['시간']
        predict_people = pred['예측 유동인구']
        query = "INSERT INTO target (location_code, date, time, predict_people) VALUES (%s, %s, %s, %s)"
        values = (location_code, date, time, predict_people)
        cursor.execute(query, values)
    connection.commit()
    cursor.close()