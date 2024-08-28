from flask import Flask, request, jsonify, make_response
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

@app.route('/getStates', methods=['GET'])
def getStates():
    response = make_response(jsonify(light_states), 200)

    response.headers['Content-Type'] = 'application/json; charset=utf-8'
    return response

@app.route('/login', methods=['POST'])
def login():
    data = request.json

    username = data.get('username')
    password = data.get('password')

    if (username == stored_username) & bcrypt.checkpw(password.encode('utf-8'), hashed_password):
        response = make_response(jsonify({"message": "Login successful"}), 200)

    else:
        response = make_response(jsonify({"message": "Invalid username or password"}), 401)

    response.headers['Content-Type'] = 'application/json; charset=utf-8'
    return response

@app.route('/toggleLight', methods=['POST'])
def toggleLight():
    
    data = request.json
    room = data.get('room')
    
    if room in light_states:
        light_states[room] = not light_states[room]
        response = make_response(jsonify({"isOn": light_states[room]}), 200)
    else:
        response = make_response(jsonify({"error": "Invalid room"}), 400)

    response.headers['Content-Type'] = 'application/json; charset=utf-8'

    return response

@app.route('/toggleAllLights', methods=['POST'])
def toggleAllLights():

    all_on = all(light_states.values())
    
    for room in light_states:
        light_states[room] = not all_on

    response = make_response(jsonify(light_states), 200)
    response.headers['Content-Type'] = 'application/json; charset=utf-8'
    
    return response





if __name__ == '__main__':
    app.run(debug=True)
