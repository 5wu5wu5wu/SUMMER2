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
      <button onClick={closeMenu}>
        <img style={{ height: '150px' }} src={logo} alt="logo" />
      </button>
      <ul>
        <li>
          <button onClick={() => {window.location.href = '/profile';}}>Профиль</button>
        </li>
        <li>
          <button>Кнопка 2</button>
        </li>
        <li>
          <button>Кнопка 3</button>
        </li>
        <li>
          <button>Кнопка 4</button>
        </li>
        <li>
          <button>Кнопка 5</button>
        </li>
        <li>
          <button>Кнопка 6</button>
        </li>
        <li>
          <button>Кнопка 7</button>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
