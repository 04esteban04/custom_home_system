import React from 'react';
import './ToggleLights.css';

function ToggleLights({ areAllLightsOn, toggleAllLights }) {
    return (
        <div className='lights-toggle'>
            <label className="toggle-label">
                <input 
                    type="checkbox" 
                    className="toggle-switch" 
                    checked={areAllLightsOn} 
                    onChange={toggleAllLights} 
                />
                <span className="slider"></span>
                <span className="toggle-text">
                    {areAllLightsOn ? 'Turn off all lights' : 'Turn on all lights'}
                </span>
            </label>
        </div>
    );
}

export default ToggleLights;
