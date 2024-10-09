from flask import Flask
<<<<<<< HEAD
<<<<<<< HEAD
from app.routes import predict
=======
<<<<<<< HEAD
from app.routes import predict,congestion
=======
from app.routes import predict
>>>>>>> ac59f34a409f086a308e10ad5dac158ca0830a67
>>>>>>> 4c59f8d (feat: 혼잡도 api 설계)
=======
from app.routes import predict,congestion,recommend
>>>>>>> a11ace3 (feat: 성별, 연령대 별 행정동 추천 알고리즘 api 설계)

def create_app():
    app = Flask(__name__)

    # API 블루프린트 등록
    app.register_blueprint(predict.bp, url_prefix='/api/v1')
<<<<<<< HEAD
<<<<<<< HEAD
   
=======
<<<<<<< HEAD
    app.register_blueprint(congestion.bp, url_prefix='/api/v1')
=======
   
>>>>>>> ac59f34a409f086a308e10ad5dac158ca0830a67
>>>>>>> 4c59f8d (feat: 혼잡도 api 설계)

=======
    app.register_blueprint(congestion.bp, url_prefix='/api/v1')
    app.register_blueprint(recommend.bp, url_prefix='/api/v1')
>>>>>>> a11ace3 (feat: 성별, 연령대 별 행정동 추천 알고리즘 api 설계)
    return app
