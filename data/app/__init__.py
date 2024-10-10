from flask import Flask
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
from app.routes import predict,congestion,recommend,target
>>>>>>> bbda1d4 (feat: api 주소 추가)
=======
from app.routes import predict,congestion,recommend,target
>>>>>>> 50bb45e (Feat/689)
=======
from app.routes import predict,congestion,recommend,target
>>>>>>> 87c4b47 (feat: api 주소 추가)

def create_app():
    app = Flask(__name__)

    # API 블루프린트 등록
<<<<<<< HEAD
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
=======
    app.register_blueprint(predict.bp, url_prefix='/api/v2')
    app.register_blueprint(congestion.bp, url_prefix='/api/v2')
    app.register_blueprint(recommend.bp, url_prefix='/api/v2')
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 168c6d0 (fix: api 주소 수정)
=======
    app.register_blueprint(target.bp, url_prefix='/api/v2')
>>>>>>> bbda1d4 (feat: api 주소 추가)
=======
    app.register_blueprint(target.bp, url_prefix='/api/v2')
>>>>>>> 50bb45e (Feat/689)
=======
    app.register_blueprint(target.bp, url_prefix='/api/v2')
>>>>>>> 87c4b47 (feat: api 주소 추가)
    return app
