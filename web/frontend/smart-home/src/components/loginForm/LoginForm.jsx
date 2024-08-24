import React from 'react';
import './LoginForm.css';
import logo from '../../assets/SmartHome-logo.png'

function LoginForm () {
    return (
        <div className="login-container">
            
            <div className="login-box">

                <img className='logo' src={logo} alt="Smart Home Logo" width={'300px'} height={'150px'}/>
                
                <form className='league-spartan-font'> 
        
                    <div className="input-group">
                        <label className="login-label" htmlFor="username">Username</label>
                        <input type="username" placeholder="Enter your username" required />
                    </div>

                    <div className="input-group">
                        <label className="login-label" htmlFor="password">Password</label>
                        <input type="password" placeholder="Enter your password" required />
                    </div>

                    <button type="submit">Login</button>

                </form>
            </div>
        </div>
    );
}

export default LoginForm;
