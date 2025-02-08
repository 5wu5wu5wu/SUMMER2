import React, { useEffect, useRef } from 'react';
import '../styles/SideMenu.css';
import logo from './logo.svg';
import { useHref } from 'react-router-dom';

const SideMenu = ({ isMenuOpen, isMenuClosing, closeMenu }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, closeMenu]);

  return (
    <div
      ref={menuRef}
      className={`side-menu ${isMenuOpen ? 'open' : ''} ${
        isMenuClosing ? 'closed' : ''
      }`}
    >
      <ul>
        <li>
        <img style={{ height: '150px', paddingBottom:"100px" }} src={logo} alt="logo"  onClick={closeMenu}/>
        </li>
        <li>
        <button onClick={() => {window.location.href = '/';}}>Главная</button>
        </li>
        <li>
        <button onClick={() => {window.location.href = '/profile';}}>Профиль</button>
        </li>
        <li>
        <button onClick={() => {window.location.href = '/news';}}>Новости</button>
        </li>
        <li>
        <button onClick={() => {window.location.href = '/trasport';}}>Проезд</button>
        </li>
        <li>
        <button onClick={() => {window.location.href = '/about';}}>О нас</button>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
