import "../styles/Footer.css";
import React, { useState, useEffect } from "react";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      // Прокрутка вниз - скрыть футер
      if (currentScrollPos < prevScrollPos) {
        setIsVisible(false);
      } 
      // Прокрутка вверх - показать футер
      else {
        setIsVisible(true);
      }

      // Обновить позицию прокрутки
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <footer className={`footer-container ${isVisible ? "visible" : "hidden"}`}>
      <div className="footer-section">
        <h3 className="footer-heading">Ссылки</h3>
        <ul className="footer-links">
          <li><a href="/about" className="footer-link">О нас</a></li>
          <li><a href="/services" className="footer-link">Услуги</a></li>
          <li><a href="/contact" className="footer-link">Контакты</a></li>
          <li><a href="/privacy" className="footer-link">Политика конфиденциальности</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h3 className="footer-heading">Контакты</h3>
        <p className="footer-text">Email: info@example.com</p>
        <p className="footer-text">Телефон: +7 (123) 456-78-90</p>
      </div>
      <div className="footer-section">
        <h3 className="footer-heading">Социальные сети</h3>
        <div className="social-icons">
          <a href="https://facebook.com" className="social-icon">Facebook</a>
          <a href="https://twitter.com" className="social-icon">Twitter</a>
          <a href="https://instagram.com" className="social-icon">Instagram</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-copyright">
          &copy; 2025 Tech-Start. Все права защищены.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
