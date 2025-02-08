import React, { useState } from 'react';
import { login } from '../services/api';
import Popup from './Popup';
import '../styles/PopupStyle.css'; // Импортируем стили

const LoginPopup = ({ isOpen, onClose, onLoginSuccess, onSwitchToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await login(username, password);

      // Проверяем успешность входа
      if (response.token) {
        setMessage('Вход выполнен успешно!');
        onLoginSuccess(response.token); // Передаем токен в родительский компонент
        onClose(); // Закрываем попап
      } else {
        setMessage('Ошибка: Неверные учетные данные');
      }
    } catch (error) {
      setMessage('Ошибка: Не удалось войти');
      console.error(error);
    }
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className="login-popup-container">
        <h2 className="login-popup-title">Вход</h2>
        <label htmlFor="username" className="login-popup-label">
          Введите логин
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-popup-input"
        />
        <label htmlFor="password" className="login-popup-label">
          Введите пароль
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-popup-input"
        />
        <button className="login-popup-button" onClick={handleLogin}>
          Вход
        </button>
        <a
          className="context-button"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onClose();
            onSwitchToRegister();
          }}
        >
          Зарегистрироваться
        </a>
        {message && <p className="login-popup-message">{message}</p>}
      </div>
    </Popup>
  );
};

export default LoginPopup;