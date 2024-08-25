import React from 'react';
import './LoginFields.css'; 

function LoginFields({ userData, handleFormChange, handleFormSubmit }) {
    return (
        <form className='league-spartan-font' onSubmit={handleFormSubmit}>
            <div className="input-group">
                <label className="login-label" htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    value={userData.username}
                    placeholder="Enter your username"
                    onChange={handleFormChange}
                    required
                />
            </div>

            <div className="input-group">
                <label className="login-label" htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    value={userData.password}
                    placeholder="Enter your password"
                    onChange={handleFormChange}
                    required
                />
            </div>

            <button className="submit-button" type="submit">Login</button>
        </form>
    );
}

export default LoginFields;
