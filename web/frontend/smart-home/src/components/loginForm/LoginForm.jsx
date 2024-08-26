import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginForm.css';
import logo from '../../assets/SmartHome-logo.png';
import LoginFields from '../loginFields/LoginFields.jsx';

function LoginForm () {

    const [userData, setUserData] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const userSession = localStorage.getItem('userSession');
        if (userSession) {
            navigate('/home');
        }
    }, [navigate]);

    const handleFormChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUserData(values => ({ ...values, [name]: value }));
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:5000/login', {
                username: userData.username,
                password: userData.password,
            });

            if (response.status === 200) {
                localStorage.setItem('userSession', JSON.stringify(response.data));
                navigate('/home');
            }

        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert('Invalid username or password');
            } else {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }

            navigate('/login');
        }
    };

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
