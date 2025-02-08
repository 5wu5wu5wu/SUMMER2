import React, { useEffect, useState } from 'react';
import '../styles/PopupStyle.css';

const Popup = ({ isOpen, onClose, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300); // Синхронизируем с длительностью анимации
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div
      className={`login-popup-overlay ${isOpen ? 'active' : ''}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div>
        <div className="popup-content">
        <button className="close-button" onClick={onClose} aria-label="Close">
          ×
        </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Popup;