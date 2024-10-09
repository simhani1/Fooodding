from flask import Flask
<<<<<<< HEAD
from app.routes import predict
=======
<<<<<<< HEAD
from app.routes import predict,congestion
=======
from app.routes import predict
>>>>>>> ac59f34a409f086a308e10ad5dac158ca0830a67
>>>>>>> 4c59f8d (feat: 혼잡도 api 설계)

def create_app():
    app = Flask(__name__)

    # API 블루프린트 등록
    app.register_blueprint(predict.bp, url_prefix='/api/v1')
<<<<<<< HEAD
   
=======
<<<<<<< HEAD
    app.register_blueprint(congestion.bp, url_prefix='/api/v1')
=======
   
>>>>>>> ac59f34a409f086a308e10ad5dac158ca0830a67
>>>>>>> 4c59f8d (feat: 혼잡도 api 설계)

    return app
