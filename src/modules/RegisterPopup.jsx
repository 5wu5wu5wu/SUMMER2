// src/components/RegisterPopup.js
import React, { useState } from 'react';
import { register } from '../services/api';
import Popup from './Popup';
import '../styles/PopupStyle.css'; // Импортируем стили


const RegisterPopup = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await register(username, password);
      setMessage(response.message);
      if (response.message === 'Registration successful') {
        onClose();
      }
    } catch (error) {
      setMessage('Error: Unable to register');
    }
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className='login-popup-container'>   
        <h2 className="login-popup-title">Регистрация</h2>
        <label htmlFor="username" className="login-popup-label">Введите логин</label>
        <input className="login-popup-input" type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="password" className="login-popup-label">Введите пароль</label>
        <input className="login-popup-input" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <label htmlFor="confirmPassword" className="login-popup-label">Повторите пароль</label>
        <input className="login-popup-input" type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <button onClick={handleRegister} className="login-popup-button">Регистрация</button>
        {message && <p className="login-popup-message">{message}</p>}
      </div>
    </Popup>
  );
};

export default RegisterPopup;
