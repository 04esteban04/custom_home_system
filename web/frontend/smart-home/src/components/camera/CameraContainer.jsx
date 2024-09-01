import React, { useState } from 'react';
import picture from '../../assets/picture.png';
import './CameraContainer.css';
import axios from 'axios';

function CameraContainer() {
    
    const [photoUrl, setPhotoUrl] = useState(null);

    const handlePhoto = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/takePhoto', {}, { responseType: 'blob' });
            const imageBlob = response.data;
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setPhotoUrl(imageObjectURL);
        } catch (error) {
            alert('Error taking photo');
            console.error('Error taking photo:', error);
        }
    };

    return (
        <div className="camera-container">
            <div>
                {photoUrl ? (
                    <img 
                        src={photoUrl} 
                        alt="Captured" 
                        className="photo-logo"
                        onError={(e) => e.target.src = picture}
                    />
                ) : (
                    <img 
                        src={picture} 
                        alt="Default" 
                        className="photo-logo"
                    />
                )}
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
