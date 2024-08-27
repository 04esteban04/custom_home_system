import React from 'react';
import './LoginFields.css'; 

function LoginFields({ userData, handleFormChange, handleFormSubmit }) {
    return (
        <form className='league-spartan-font' onSubmit={handleFormSubmit}>
            <div className="input-group">
                <label className="login-label" htmlFor="username-label">Username</label>
                <input
                    id="username-label"
                    type="text"
                    name="username"
                    value={userData.username}
                    placeholder="Enter your username"
                    onChange={handleFormChange}
                    required
                    autoComplete="username"
                />
            </div>

            <div className="input-group">
                <label className="login-label" htmlFor="password-label">Password</label>
                <input
                    id="password-label"
                    type="password"
                    name="password"
                    value={userData.password}
                    placeholder="Enter your password"
                    onChange={handleFormChange}
                    required
                    autoComplete="current-password"
                />
            </div>

            <button className="submit-button" type="submit">Login</button>
        </form>
    );
}

export default LoginFields;
