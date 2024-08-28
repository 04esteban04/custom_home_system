import React from 'react';
import picture from '../../assets/picture.png';
import './CameraContainer.css';

function CameraContainer({ handlePhoto }) {
    return (
        <div className="camera-container">
            <div>
                <img 
                    src={picture} 
                    alt="A camera logo" 
                    className="photo-logo"
                />
            </div>
            <div>
                <button type="button" className="take-photo" onClick={handlePhoto}>
                    Take photo
                </button>
            </div>
        </div>
    );
}

export default CameraContainer;
