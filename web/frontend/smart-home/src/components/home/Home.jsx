import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import logo from '../../assets/SmartHome-logo.png';
import { FaUser } from 'react-icons/fa';
import { ImFilePicture } from "react-icons/im";

function Home() {
    const navigate = useNavigate();

    /* TODO: Handle session logout */
    const handleLogout = () => {
        navigate('/login'); 
    }

    return (
        <div className="home-container">

            <Navbar onLogout={handleLogout} />
            
            <div className="grid-container">                
                <div className="grid-item camera-item">
                    Camera
                    {/* TODO: Incorporate image taken from hardware */}
                    <div>
                        <ImFilePicture className='photo'/>
                    </div>
                </div>
                
                {/* TODO: Add button functionality and trigger lightning animation */}
                <div className="grid-item grid-item-size living-room">Living room</div>
                <div className="grid-item grid-item-size dining-room">Dining room</div>
                <div className="grid-item grid-item-size kitchen">Kitchen</div>
                <div className="grid-item grid-item-size room-1">Room 1</div>
                <div className="grid-item grid-item-size room-2">Room 2</div>
                <div className="grid-item grid-item-size garage">Garage</div>
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
                <FaUser className="user-icon" />
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
