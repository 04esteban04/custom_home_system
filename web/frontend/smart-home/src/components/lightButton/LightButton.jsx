import React from 'react';
import './LightButton.css';

function LightButton({ room, isOn, toggleLight, label }) {
    return (
        <button 
            className={`roomButton ${room} ${isOn ? 'on' : 'off'}`} 
            onClick={() => toggleLight(room)}
        >
            {label}
        </button>
    );
}

export default LightButton;