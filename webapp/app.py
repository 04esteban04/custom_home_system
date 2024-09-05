from flask import Flask, render_template, request, redirect, url_for, session, flash, send_file, jsonify
from flask_cors import CORS
import bcrypt
import os

app = Flask(__name__)
app.secret_key = "cR/N{E{4Ta#qUn5"
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

storedUsername = "admin"
storedPassword = "admin123"

hashedPassword = bcrypt.hashpw(storedPassword.encode('utf-8'), bcrypt.gensalt())

photo_path = "./static/images/house.jpg"

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

# Basic routes
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

        """
        TODO:

            An array or dictionary must be created in server to stored the pins 
            used in hardware to make reference to any light and door.

            The function digitalRead(pinNumber) from library must be used 
            to get the lights and doors states from hardware.

            After that, all the lights and doors states from server have to 
            be updated correspondingly
        
        """

        return render_template(
            'home.html',
            lightStates = lightStates,
            doorStates = doorStates,
            photoUrl = None  
        )
    else:
        return redirect(url_for('login'))

@app.route('/logout')
def logout():
    session.pop('userSession', None)
    return redirect(url_for('login'))


# Functionality routes
@app.route('/getStates', methods=['GET'])
def get_states():
    
    """
    TODO:

        The function digitalRead(pinNumber) from library must be used 
        to get the lights and doors states from hardware.

        After that, all the lights and doors states from server have to 
        be updated correspondingly
    
    """

    responseData = {
        "lightStates": lightStates,
        "doorStates": doorStates
    }
    return jsonify(responseData)
    
@app.route('/toggleLight', methods=['POST'])
def toggleLight():
    
    data = request.json
    room = data.get('room')
    
    """  
    TODO:

        The light state have to be changed with the function
        digitalWrite(pinNumber) from library.

        After that, the light state from server have to be 
        updated correspondingly and send in the response.

    """

    if room in lightStates:
        lightStates[room] = not lightStates[room]
        return jsonify({"lightStates": lightStates}) 

    else:
        return jsonify({"error": "Invalid room"}), 400

@app.route('/toggleAllLights', methods=['POST'])
def toggleAllLights():

    all_on = all(lightStates.values())
    
    """  
    TODO:
        The lights states have to be changed with the function
        digitalWrite(pinNumber) from library.

        After that, the lights states from server have to be 
        updated correspondingly and send in the response.

    """

    if all_on:
        for room in lightStates:
            lightStates[room] = not all_on

    else: 
        for room in lightStates:
            lightStates[room] = True

    return jsonify(lightStates)

@app.route('/takePhoto', methods=['POST'])
def takePhoto():
    """
    TODO:

    Use function from library to take photo and save it in a folder.
    Then, use the image path to send it in the response.
    """

    if os.path.exists(photo_path):
        return send_file(photo_path, mimetype='image/jpeg')
    else:
        return jsonify({"error": "Photo not found"}), 404


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
