import React, { useState } from 'react';
import logo from '../../assets/SmartHome-logo.png';
import userIcon from '../../assets/user-icon.png';
import './Navbar.css';

function Navbar({ onLogout, onLogoClick }) {
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
                onClick={onLogoClick}
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

export default Navbar;
