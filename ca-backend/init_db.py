from app import db, create_app

app = create_app()

with app.app_context():
    db.create_all()  # 创建所有表
    print("Database initialized successfully!")
