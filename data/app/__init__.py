from flask import Flask
from app.routes import predict

def create_app():
    app = Flask(__name__)

    # API 블루프린트 등록
    app.register_blueprint(predict.bp, url_prefix='/api/v1')
   

    return app
