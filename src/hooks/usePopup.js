// src/hooks/usePopup.js
import { useState } from 'react';

const usePopup = () => {
  const [isFirstPopupOpen, setFirstPopupOpen] = useState(false);
  const [isSecondPopupOpen, setSecondPopupOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false); // Состояние для меню
  const [isMenuClosing, setMenuClosing] = useState(false); // Состояние для анимации закрытия

  const openFirstPopup = () => {
    setFirstPopupOpen(true);
    setSecondPopupOpen(false);
    closeMenu(); // Закрываем меню при открытии попапа
  };

  const openSecondPopup = () => {
    setFirstPopupOpen(false);
    setSecondPopupOpen(true);
    closeMenu(); // Закрываем меню при открытии попапа
  };

  const openMenu = () => {
    setMenuOpen(true);
    setMenuClosing(false); // Сбрасываем состояние закрытия
    setFirstPopupOpen(false); // Закрываем попапы при открытии меню
    setSecondPopupOpen(false);
  };

  const closePopup = () => {
    setFirstPopupOpen(false);
    setSecondPopupOpen(false);
    closeMenu(); // Закрываем меню при закрытии попапа
  };

  const closeMenu = () => {
    if (isMenuOpen) {
      setMenuClosing(true); // Запускаем анимацию закрытия
      setTimeout(() => {
        setMenuOpen(false); // Полностью закрываем меню после анимации
        setMenuClosing(false); // Сбрасываем состояние закрытия
      }, 800); // Задержка должна соответствовать длительности анимации (0.8s)
    }
  };

  return {
    isFirstPopupOpen,
    isSecondPopupOpen,
    isMenuOpen,
    isMenuClosing, // Возвращаем состояние анимации закрытия
    openFirstPopup,
    openSecondPopup,
    openMenu,
    closePopup,
    closeMenu,
  };
};

export default usePopup;