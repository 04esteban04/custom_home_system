from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
from flask_cors import CORS
import bcrypt
import os

app = Flask(__name__)
app.secret_key = "cR/N{E{4Ta#qUn5"
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

storedUsername = "admin"
storedPassword = "admin123"

hashedPassword = bcrypt.hashpw(storedPassword.encode('utf-8'), bcrypt.gensalt())

photo_path = "./assets/house.jpg"

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

# Login routes
@app.route('/')
def index():
    if 'userSession' in session:
        return redirect(url_for('home'))
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if 'userSession' in session:
        return redirect(url_for('home'))

    elif request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        if username == storedUsername and bcrypt.checkpw(password.encode('utf-8'), hashedPassword):
            session['userSession'] = {'username': username}
            return redirect(url_for('home'))
        else:
            flash('Invalid username or password', 'error')
            return redirect(url_for('login'))

    return render_template('login.html')

@app.route('/home')
def home():
    if 'userSession' in session:
        return render_template('home.html', username=session['userSession']['username'])
    else:
        return redirect(url_for('login'))

@app.route('/logout')
def logout():
    session.pop('userSession', None)
    return redirect(url_for('login'))


# Functionality routes
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

@app.route('/takePhoto', methods=['POST'])
def takePhoto():
    """
    TODO:

    Use function from library to take photo and save it in a folder.
    Then, use the image path to send it in the response.
    """

    if os.path.exists(photo_path):
        response = make_response(send_file(photo_path, mimetype='image/jpeg'))
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    else:
        response = make_response(jsonify({"error": "Photo not found"}), 404)
        response.headers['Content-Type'] = 'application/json; charset=utf-8'
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response


if __name__ == '__main__':
    app.run(debug=True)
