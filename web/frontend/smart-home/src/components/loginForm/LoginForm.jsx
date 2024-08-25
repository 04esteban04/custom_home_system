import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import logo from '../../assets/SmartHome-logo.png';

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

    /* TODO: Modularize form in component */
    return (
        <div className="login-container" onSubmit={handleFormSubmit}>
            
            <div className="login-box">

                <img className='logo' src={logo} alt="Smart Home Logo" width={'300px'} height={'150px'}/>
                
                <form className='league-spartan-font'> 
        
                    <div className="input-group">
                        <label className="login-label" htmlFor="username">Username</label>
                        <input type="username" name="username" value={userData.username} placeholder="Enter your username" onChange={handleFormChange} required />
                    </div>

                    <div className="input-group">
                        <label className="login-label" htmlFor="password">Password</label>
                        <input type="password" name="password" value={userData.password} placeholder="Enter your password" onChange={handleFormChange} required />
                    </div>

                    <button className="submit-button" type="submit">Login</button>

                </form>
            </div>
        </div>
    );
}

export default LoginForm;
