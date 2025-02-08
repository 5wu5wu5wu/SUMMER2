import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../modules/header';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <Header></Header>
      <h1 className="text-4xl font-bold mb-4">404 - Страница не найдена</h1>
      <p className="text-lg mb-4">Извините, запрашиваемая страница не существует.</p>
      <Link 
        to="/" 
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFoundPage;