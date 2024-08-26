from flask import Flask, request, jsonify
from flask_cors import CORS
import bcrypt

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

stored_username = "admin"
stored_password = "admin123"

hashed_password = bcrypt.hashpw(stored_password.encode('utf-8'), bcrypt.gensalt())

@app.route('/login', methods=['POST'])
def login():
    data = request.json

    username = data.get('username')
    password = data.get('password')

    if (username == stored_username) & bcrypt.checkpw(password.encode('utf-8'), hashed_password):
        return jsonify({"message": "Login successful"}), 200

    else:
        return jsonify({"message": "Invalid username or password"}), 401

if __name__ == '__main__':
    app.run(debug=True)
