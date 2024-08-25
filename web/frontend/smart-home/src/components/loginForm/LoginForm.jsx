import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import logo from '../../assets/SmartHome-logo.png';
import LoginFields from '../loginFields/LoginFields.jsx';

function LoginForm () {

    const [userData, setUserData] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleFormChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUserData(values => ({ ...values, [name]: value }));
    }

    /* TODO: Verify user credentials with backend server */
    /* TODO: Verify user sesion */
    const handleFormSubmit = (event) => {
        event.preventDefault();

        console.log("Username:", userData.username);
        console.log("Password:", userData.password);
        alert(`Username: ${userData.username}\nPassword: ${userData.password}`);

        navigate('/home');
    }

    return (
        <div className="login-container">

            <div className="login-box">

                <img className='logo' src={logo} alt="Smart Home Logo"/>
                
                <LoginFields
                    userData={userData}
                    handleFormChange={handleFormChange}
                    handleFormSubmit={handleFormSubmit}
                />

            </div>
            
        </div>
    );
}

export default LoginForm;
