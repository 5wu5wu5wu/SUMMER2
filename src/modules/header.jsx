// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import usePopup from '../hooks/usePopup';
import LoginPopup from './LoginPopup';
import RegisterPopup from './RegisterPopup';
import SideMenu from './SideMenu';
import { useCookies } from 'react-cookie';
import { getUserData, updateUserData, uploadAvatar } from '../services/api';
import avatar from './default-avatar.svg';
import '../styles/Header.css'; // Импортируем CSS

const Header = () => {
  const [tempAvatar, setTempAvatar] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['token']);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userData, setUserData] = useState({
    fullName: '',
    plotNumber: '',
    phone: '',
    avatar: ''
  });

  const {
    isFirstPopupOpen,
    isSecondPopupOpen,
    isMenuOpen,
    isMenuClosing,
    openFirstPopup,
    openSecondPopup,
    openMenu,
    closePopup,
    closeMenu,
  } = usePopup();

  useEffect(() => {
    if (location.state?.requireAuth) {
      openFirstPopup();
      navigate(location.pathname, { 
        replace: true,
        state: {} 
      });
    }
  }, [location.state]);

  useEffect(() => {
    if (cookies.token) {
      setIsLoggedIn(true);
    }
  }, [cookies.token]);

  const handleLoginSuccess = (token) => {
    setCookie('token', token, { path: '/' });
    setIsLoggedIn(true);
    closePopup();
  };

  const handleLogout = () => {
    setCookie('token', '', { path: '/', expires: new Date(0) });
    setIsLoggedIn(false);
  };

  const ProfileDropdown = () => (
    <div className="profile-dropdown">
      <div className="dropdown-item" onClick={() => {window.location.href = '/profile';}}>
        Профиль
      </div>
      <div 
        className="dropdown-item-with-border"
        onClick={handleLogout}
      >
        Выход
      </div>
    </div>
  );

  return (
    <div>
      <div className="header-container">
        <div className="logo-container">
          <button onClick={openMenu} className="menu-button">
            <img className="logo-image" src={logo} alt="logo" />
          </button>
        </div>
        
        <div className="auth-buttons-container">
          {isLoggedIn ? (
            <>
              <button
                className="profile-button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img className="profile-image" src={avatar} alt="Профиль" />
              </button>
              {dropdownOpen && <ProfileDropdown />}
            </>
          ) : (
            <>
              <button 
                className="auth-button login-button" 
                onClick={openFirstPopup}>
                Вход
              </button>
              <button 
                className="auth-button register-button"
                onClick={openSecondPopup}>
                Регистрация
              </button>
            </>
          )}
        </div>
      </div>

      <LoginPopup 
        isOpen={isFirstPopupOpen} 
        onClose={closePopup} 
        onLoginSuccess={handleLoginSuccess}
        onSwitchToRegister={() => {
          closePopup();
          openSecondPopup();
        }}
      />
      <RegisterPopup 
        isOpen={isSecondPopupOpen} 
        onClose={closePopup} 
        onRegisterSuccess={() => {
          setIsLoggedIn(true);
          closePopup();}}
      />
      <SideMenu isMenuOpen={isMenuOpen} isMenuClosing={isMenuClosing} closeMenu={closeMenu} />

    </div>
  );
};

export default Header;