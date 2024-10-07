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