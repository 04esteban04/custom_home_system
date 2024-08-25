import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import logo from '../../assets/SmartHome-logo.png';
import userIcon from '../../assets/user-icon.png';
import picture from '../../assets/picture.png';

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

    /* TODO: Modularize home grid-container and lights-toggle container in components*/

    /* TODO: Add door component and styles */
    return (
        <div className="home-container">
            <Navbar onLogout={handleLogout} />

            <div className="grid-container">
                <div className="grid-item camera-container">
                    
                    {/* TODO: Incorporate image taken from hardware */}
                    <div>
                        <img 
                            src={picture} 
                            alt="A camera logo" 
                            className="photo-logo"
                        />
                    </div>

                    <div>
                        <button className="take-photo" onClick={handlePhoto}>
                            Take photo
                        </button>
                    </div>  

                </div>
                
                <button className={`living-room room-button ${lightStates.livingRoom ? 'on' : 'off'}`} 
                    onClick={() => toggleLight('livingRoom')}>

                    Living room
                </button>  

                <button 
                    className={`dining-room room-button ${lightStates.diningRoom ? 'on' : 'off'}`} 
                    onClick={() => toggleLight('diningRoom')}>
                
                    Dining room
                </button>

                <button 
                    className={`kitchen room-button ${lightStates.kitchen ? 'on' : 'off'}`} 
                    onClick={() => toggleLight('kitchen')}>

                    Kitchen
                </button>

                <button 
                    className={`room-1 room-button ${lightStates.room1 ? 'on' : 'off'}`} 
                    onClick={() => toggleLight('room1')}>

                    Room 1
                </button>

                <button 
                    className={`room-2 room-button ${lightStates.room2 ? 'on' : 'off'}`} 
                    onClick={() => toggleLight('room2')}>

                    Room 2
                </button>

                <div className="grid-item garage">Garage</div>
            </div>

            <div className='lights-toggle'>
                <label className="toggle-label">
                    <input 
                        type="checkbox" 
                        className="toggle-switch" 
                        checked={areAllLightsOn()} 
                        onChange={toggleAllLights} 
                    />
                    <span className="slider"></span>
                    <span className="toggle-text">
                        {areAllLightsOn() ? 'Turn off all lights' : 'Turn on all lights'}
                    </span>
                </label>
            </div>
        </div>
    );
}

function Navbar({ onLogout }) {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    }

    return (
        <nav className="navbar">
            <img 
                src={logo} 
                alt="Smart Home Logo" 
                className="navbar-logo"
            />
            <div className="user-menu" onClick={toggleDropdown}>
                <img 
                    src={userIcon} 
                    alt="User profile icon" 
                    className="user-icon" 
                />
                {dropdownVisible && (
                    <div className="dropdown-menu">
                        <button onClick={onLogout} className="dropdown-item">Logout</button>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Home;
