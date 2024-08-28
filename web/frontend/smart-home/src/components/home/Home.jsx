import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
    
    useEffect(() => {
        const userSession = localStorage.getItem('userSession');
        if (!userSession) {
            navigate('/login');
        } else {
            fetchStates(); 
        }
    }, [navigate]);

    const fetchStates = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/getStates');
            setLightStates(response.data);
        } catch (error) {
            alert('Error fetching light states:');
            console.error('Error fetching light states:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userSession');
        navigate('/login');
    };

    const toggleLight = async (room) => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/toggleLight', { room });
            const {isOn} = response.data;
            
            setLightStates(prevStates => ({
                ...prevStates,
                [room]: isOn
            }));
            
        } catch (error) {
            alert(`Error toggling light: ${room}`);
            console.error('Error toggling light:', error);
        }
    };

    const toggleAllLights = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/toggleAllLights');
            
            const updatedLightStates = response.data;
    
            setLightStates(updatedLightStates);
            
        } catch (error) {
            alert('Error toggling  all lights');
            console.error('Error toggling all lights:', error);
        }
    };

    const areAllLightsOn = () => {
        return Object.values(lightStates).every(state => state);
    };

    /* TODO: Show photo taken from hardware */
    const handlePhoto = () => {
        console.log("Show user taken photo");
         
    }

    /* TODO: Add door component and styles */
    return (
        <div className="home-container">
            
            <Navbar onLogout={handleLogout} onLogoClick={fetchStates}/>

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
