import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import Profile from '../pages/ProfilePage';
import '../styles/App.css'
import NotFoundPage from '../pages/NotFoundPage';
function App() {
  return (
    <Router>
      <div className="relative h-screen w-screen">
        
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;