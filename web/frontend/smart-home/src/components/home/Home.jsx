import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
import Navbar from '../navbar/Navbar.jsx';
import LightButton from '../lightButton/LightButton.jsx';
import ToggleLights from '../toggleLights/ToggleLights.jsx';
import CameraContainer from '../camera/CameraContainer.jsx';
import arrow from '../../assets/arrow.png';

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

                <div className='mainDoorContainer flexContainer'>
                    <LightButton
                        room="livingRoom"
                        isOn={lightStates.livingRoom}
                        toggleLight={toggleLight}
                        label="Living Room"
                    />
                    <div className='door'>Main Door</div>
                </div>

                <LightButton
                    room="diningRoom"
                    isOn={lightStates.diningRoom}
                    toggleLight={toggleLight}
                    label="Dining Room"
                />

                <div className='kitchenContainer'>
                    <div className='backDoor flexContainer door'>Back Door</div>
                    <LightButton
                        room="kitchen"
                        isOn={lightStates.kitchen}
                        toggleLight={toggleLight}
                        label="Kitchen"
                    />
                 </div>

                <div className='room1-container flexContainer'>
                    <LightButton
                        room="room1"
                        isOn={lightStates.room1}
                        toggleLight={toggleLight}
                        label="Room 1"
                    />
                    <div className='door'>Room 1 Door</div>
                </div>

                <div className='room2-container flexContainer'>
                    <LightButton
                        room="room2"
                        isOn={lightStates.room2}
                        toggleLight={toggleLight}
                        label="Room 2"
                    />
                    <div className='door'>Room 2 Door</div>
                </div>

                <div className="garage">Garage</div>

                <div className="flexContainer arrowContainer">
                    <img 
                        src={arrow} 
                        alt="A left arrow logo" 
                        className='arrow'
                    />
                </div>
            </div>

            <ToggleLights 
                areAllLightsOn={areAllLightsOn()} 
                toggleAllLights={toggleAllLights}
            />

        </div>
    );
}

export default Home;
