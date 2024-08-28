from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import bcrypt

app = Flask(__name__)
CORS(app)

storedUsername = "admin"
storedPassword = "admin123"

hashedPassword = bcrypt.hashpw(storedPassword.encode('utf-8'), bcrypt.gensalt())

lightStates = {
    "livingRoom": False,
    "diningRoom": False,
    "kitchen": False,
    "room1": False,
    "room2": False
}

doorStates = {
    "mainDoor": False,
    "backDoor": False,
    "room1Door": False,
    "room2Door": False
}

@app.route('/getStates', methods=['GET'])
def getStates():

    """
    TODO:

        An array or dictionary must be created in server to stored the pins 
        used in hardware to make reference to any light and door.

        The function digitalRead(pinNumber) from library must be used 
        to get the lights and doors states from hardware.

        After that, all the lights and doors states from server have to 
        be updated correspondingly
    
    """

    responseData = {
        "lightStates": lightStates,
        "doorStates": doorStates
    }

    response = make_response(jsonify(responseData), 200)
    response.headers['Content-Type'] = 'application/json; charset=utf-8'
    
    return response

@app.route('/login', methods=['POST'])
def login():
    data = request.json

    username = data.get('username')
    password = data.get('password')

    if (username == storedUsername) & bcrypt.checkpw(password.encode('utf-8'), hashedPassword):
        response = make_response(jsonify({"message": "Login successful"}), 200)

    else:
        response = make_response(jsonify({"message": "Invalid username or password"}), 401)

    response.headers['Content-Type'] = 'application/json; charset=utf-8'
    return response

@app.route('/toggleLight', methods=['POST'])
def toggleLight():
    
    data = request.json
    room = data.get('room')
    
    if room in lightStates:

        """  
        TODO:

            The light state have to be changed with the function
            digitalWrite(pinNumber) from library.

            After that, the light state from server have to be 
            updated correspondingly and send in the response.

        """

        lightStates[room] = not lightStates[room]
        response = make_response(jsonify({"isOn": lightStates[room]}), 200)

    else:
        response = make_response(jsonify({"error": "Invalid room"}), 400)

    response.headers['Content-Type'] = 'application/json; charset=utf-8'

    return response

@app.route('/toggleAllLights', methods=['POST'])
def toggleAllLights():

    all_on = all(lightStates.values())
    
    for room in lightStates:

        """  
        TODO:
            The lights states have to be changed with the function
            digitalWrite(pinNumber) from library.

            After that, the lights states from server have to be 
            updated correspondingly and send in the response.

        """

        lightStates[room] = not all_on

    response = make_response(jsonify(lightStates), 200)
    response.headers['Content-Type'] = 'application/json; charset=utf-8'
    
    return response


if __name__ == '__main__':
    app.run(debug=True)
