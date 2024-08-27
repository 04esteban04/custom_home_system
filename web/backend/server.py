from flask import Flask, request, jsonify
from flask_cors import CORS
import bcrypt

app = Flask(__name__)
CORS(app)

stored_username = "admin"
stored_password = "admin123"

hashed_password = bcrypt.hashpw(stored_password.encode('utf-8'), bcrypt.gensalt())

light_states = {
    "livingRoom": False,
    "diningRoom": False,
    "kitchen": False,
    "room1": False,
    "room2": False
}

@app.route('/login', methods=['POST'])
def login():
    data = request.json

    username = data.get('username')
    password = data.get('password')

    if (username == stored_username) & bcrypt.checkpw(password.encode('utf-8'), hashed_password):
        return jsonify({"message": "Login successful"}), 200

    else:
        return jsonify({"message": "Invalid username or password"}), 401


@app.route('/toggleLight', methods=['POST'])
def toggle_light():
    
    data = request.json
    room = data.get('room')
    
    if room in light_states:
        light_states[room] = not light_states[room]
        return jsonify({"isOn": light_states[room]}), 200
    else:
        return jsonify({"error": "Invalid room"}), 400


@app.route('/toggleAllLights', methods=['POST'])
def toggle_all_lights():

    all_on = all(light_states.values())
    
    for room in light_states:
        light_states[room] = not all_on

    return jsonify(light_states), 200





if __name__ == '__main__':
    app.run(debug=True)
