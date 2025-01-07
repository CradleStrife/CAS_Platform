from flask import Blueprint, request, jsonify
from app.models import db, User

main = Blueprint('main', __name__)

@main.route('/register', methods=['POST'])
@main.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    print(f"Received data: username={username}, password={password}")

    # 检查用户名和密码是否为空
    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400

    # 检查用户名是否已存在
    existing_user = User.query.filter_by(username=username).first()
    print(f"Query result for username={username}: {existing_user}")

    if existing_user:
        return jsonify({"message": "Username already exists"}), 400

    # 创建新用户
    user = User(username=username, password=password)
    db.session.add(user)
    db.session.commit()
    print(f"New user created: {user}")

    return jsonify({"message": "User registered successfully!"}), 201


@main.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # 检查用户名和密码是否为空
    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400

    # 验证用户名和密码
    user = User.query.filter_by(username=username, password=password).first()
    if user:
        return jsonify({"message": "Login successful!"})
    else:
        return jsonify({"message": "Invalid credentials"}), 401
