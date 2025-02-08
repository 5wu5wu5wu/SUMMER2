// src/components/Header.js
// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Добавляем импорты
import logo from './logo.svg';
import usePopup from '../hooks/usePopup';
import LoginPopup from './LoginPopup';
import RegisterPopup from './RegisterPopup';
import SideMenu from './SideMenu';
import { useCookies } from 'react-cookie';
// import { getUserData, updateUserData, uploadAvatar } from '../services/api';

const Header = () => {
  const location = useLocation(); // Получаем доступ к состоянию маршрута
  const navigate = useNavigate(); // Добавляем для управления навигацией
  const [cookies, setCookie] = useCookies(['token']); // Используем useCookies
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
      // Очищаем состояние маршрута после открытия попапа
      navigate(location.pathname, { 
        replace: true,
        state: {} 
      });
    }
  }, [location.state]); // Срабатывает при изменении состояния маршрута

  useEffect(() => {
    if (cookies.token) {
      setIsLoggedIn(true);
    }
  }, [cookies.token]);

  const handleLoginSuccess = (token) => {
    setCookie('token', token, { path: '/' }); // Устанавливаем куки
    setIsLoggedIn(true); // Обновляем состояние авторизации
    closePopup(); // Закрываем попап
  };

  // Обработка выхода
  const handleLogout = () => {
    setCookie('token', '', { path: '/', expires: new Date(0) }); // Удаляем куки
    setIsLoggedIn(false); // Обновляем состояние авторизации
  };

  const ProfileDropdown = () => (
    <div style={{
      position: 'absolute',
      right: '20px',
      top: '100px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      zIndex: 1000,
    }}>
      <div style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Профиль
      </div>
      <div 
        style={{ 
          padding: '10px 20px', 
          cursor: 'pointer',
          borderTop: '1px solid #eee'
        }}
        onClick={handleLogout}
      >
        Выход
      </div>
    </div>
  );

  return (
    <div>
      <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", margin: "20px"}}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button onClick={openMenu} style={{ marginRight: '20px', background: 'none', border: 'none', fontSize: '24px' }}>
            <img style={{height: "85px"}} src={logo} alt="logo" />
          </button>
        </div>
        
        <div style={{display: "flex", gap: "10px", marginTop: "25px", position: 'relative'}}>
          {isLoggedIn ? (
            <>
              <button
                style={{
                  padding:"10px",
                  borderRadius: "50%",
                  background: "orange",
                  border: "none",
                  cursor: 'pointer',
                }}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {/* <img style={{height:"35px"}} src={tempAvatar || userData.avatar || '/default-avatar.png'} alt="" /> */}
              </button>
              {dropdownOpen && <ProfileDropdown />}
            </>
          ) : (
            <>
              <button 
                style={{height: "50px", width: "120px", borderRadius: "25px", color: "white", background: "orange", border: "none", fontSize: "28px"}} 
                onClick={openFirstPopup}>
                Вход
              </button>
              <button 
                style={{height: "50px", width: "220px", borderRadius: "25px", color: "white", background: "orange", border: "none", fontSize: "28px"}}
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