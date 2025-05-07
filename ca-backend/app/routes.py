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

    # 确保返回的消息完全匹配前端的判断条件
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
    

#密码
@main.route('/check-username', methods=['POST'])
def check_username():
    """检查用户名是否存在"""
    data = request.json
    username = data.get('username')
    
    if not username:
        return jsonify({"message": "Username is required"}), 400
    
    user = User.query.filter_by(username=username).first()
    
    if user:
        return jsonify({"exists": True}), 200
    else:
        return jsonify({"exists": False, "message": "Username does not exist"}), 404

@main.route('/verify-password', methods=['POST'])
def verify_password():
    """验证用户的原密码"""
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400
    
    user = User.query.filter_by(username=username, password=password).first()
    
    if user:
        return jsonify({"valid": True}), 200
    else:
        return jsonify({"valid": False, "message": "Incorrect password"}), 401

@main.route('/update-password', methods=['POST'])
def update_password():
    """更新用户密码"""
    data = request.json
    username = data.get('username')
    new_password = data.get('newPassword')
    
    if not username or not new_password:
        return jsonify({"message": "Username and new password are required"}), 400
    
    user = User.query.filter_by(username=username).first()
    
    if not user:
        return jsonify({"message": "User not found"}), 404
    
    # 更新密码
    user.password = new_password
    db.session.commit()
    
    return jsonify({"success": True, "message": "Password updated successfully"}), 200
