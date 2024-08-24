import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/loginForm/LoginForm';
import Home from './components/home/Home';

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<LoginForm />} /> 
          </Routes>
      </Router>
  );
}

export default App;
