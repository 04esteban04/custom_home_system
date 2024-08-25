import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Navbar from '../navbar/Navbar.jsx';
import LightButton from '../lightButton/LightButton.jsx';
import ToggleLights from '../toggleLights/ToggleLights.jsx';
import CameraContainer from '../camera/CameraContainer.jsx';

function Home() {
    const navigate = useNavigate();
    const [lightStates, setLightStates] = useState({
        livingRoom: false,
        diningRoom: false,
        kitchen: false,
        room1: false,
        room2: false,
    });

    const areAllLightsOn = () => {
        return Object.values(lightStates).every(state => state);
    };

    const toggleLight = (room) => {
        setLightStates(prevStates => ({
            ...prevStates,
            [room]: !prevStates[room]
        }));
    }

    const toggleAllLights = () => {
        const allLightsOn = areAllLightsOn();
        setLightStates({
            livingRoom: !allLightsOn,
            diningRoom: !allLightsOn,
            kitchen: !allLightsOn,
            room1: !allLightsOn,
            room2: !allLightsOn,
        });
    }

    /* TODO: Handle session logout */
    const handleLogout = () => {
        navigate('/login'); 
    }

    /* TODO: Show photo taken from hardware */
    const handlePhoto = () => {
        console.log("Show user taken photo");
         
    }

    /* TODO: Add door component and styles */
    return (
        <div className="home-container">
            
            <Navbar onLogout={handleLogout} />

            <div className="grid-container">

                <CameraContainer handlePhoto={handlePhoto} />

                <LightButton
                    room="livingRoom"
                    isOn={lightStates.livingRoom}
                    toggleLight={toggleLight}
                    label="Living Room"
                />

                <LightButton
                    room="diningRoom"
                    isOn={lightStates.diningRoom}
                    toggleLight={toggleLight}
                    label="Dining Room"
                />

                <LightButton
                    room="kitchen"
                    isOn={lightStates.kitchen}
                    toggleLight={toggleLight}
                    label="Kitchen"
                />

                <LightButton
                    room="room1"
                    isOn={lightStates.room1}
                    toggleLight={toggleLight}
                    label="Room 1"
                />

                <LightButton
                    room="room2"
                    isOn={lightStates.room2}
                    toggleLight={toggleLight}
                    label="Room 2"
                />

                <div className="garage">Garage</div>
            </div>

            <ToggleLights 
                areAllLightsOn={areAllLightsOn()} 
                toggleAllLights={toggleAllLights}
            />

        </div>
    );
}

export default Home;
