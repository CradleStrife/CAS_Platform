import os  # 添加这一行
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__, instance_relative_config=True)  # 启用 instance 文件夹
    CORS(app)  # 解决跨域问题

    # 数据库文件路径指向 instance 文件夹
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(app.instance_path, 'site.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    # 为根路径添加路由
    @app.route('/')
    def index():
        return "Welcome to the API root!"

    # 注册蓝图
    from app.routes import main
    app.register_blueprint(main, url_prefix='/api')  # 挂载到 /api 路径下

    return app
