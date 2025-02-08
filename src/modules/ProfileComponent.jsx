import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { getUserData, updateUserData, uploadAvatar } from '../services/api';


const ProfilePageComponent = () => {
    const [cookies, , removeCookie] = useCookies(['token']);
    const [userData, setUserData] = useState({
      fullName: '',
      plotNumber: '',
      phone: '',
      avatar: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [tempAvatar, setTempAvatar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
      if (!cookies.token) {
          navigate('/', { 
            state: { requireAuth: true },
            replace: true
          });
          return;
      }
    
      const fetchUserData = async () => {
          try {
              setLoading(true);
              const response = await getUserData(cookies.token);
              setUserData(response.data);
          } catch (error) {
              console.error('Error:', error);
              navigate('/' , { 
                  state: { openFirstPopup: true },
                  replace: true,
              });
          } finally {
              setLoading(false);
          }
      }; 
      fetchUserData();
    }, [cookies.token, navigate]);
    
    const handleFileUpload = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
    
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append('avatar', file);
        
        const response = await uploadAvatar(formData, cookies.token);
        setUserData(prev => ({...prev, avatar: response.data.avatar}));
        setTempAvatar(URL.createObjectURL(file));
      } catch (error) {
        setMessage('Ошибка загрузки аватара');
      } finally {
        setLoading(false);
      }
    };
    
    const handleInputChange = (e) => {
      setUserData({
        ...userData,
        [e.target.name]: e.target.value
      });
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        await updateUserData(userData, cookies.token);
        setIsEditing(false);
        setMessage('Данные успешно обновлены');
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage('Ошибка обновления данных');
      } finally {
        setLoading(false);
      }
    };
    
    const handleLogout = () => {
      removeCookie('token', { path: '/' });
      navigate('/');
    };
    
    return (
      <div className="profile-container">
        <div className="profile-header">
          <h1>Личный кабинет</h1>
          <button onClick={handleLogout} className="logout-button">
            Выйти
          </button>
        </div>
    
        <div className="profile-content">
          <div className="avatar-section">
            <div className="avatar-wrapper">
              <img 
                src={tempAvatar || userData.avatar || '/default-avatar.png'} 
                alt="Аватар" 
                className="avatar"
              />
              {isEditing && (
                <div className="avatar-overlay">
                  <label htmlFor="avatar-upload" className="upload-label">
                    {loading ? 'Загрузка...' : 'Изменить'}
                  </label>
                  <input 
                    type="file" 
                    id="avatar-upload" 
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={loading}
                  />
                </div>
              )}
            </div>
          </div>
    
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label>ФИО:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="fullName"
                  value={userData.fullName}
                  onChange={handleInputChange}
                  required
                />
              ) : (
                <p>{userData.fullName}</p>
              )}
            </div>
    
            <div className="form-group">
              <label>Номер участка:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="plotNumber"
                  value={userData.plotNumber}
                  onChange={handleInputChange}
                  required
                />
              ) : (
                <p>{userData.plotNumber}</p>
              )}
            </div>
    
            <div className="form-group">
              <label>Телефон:</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                  required
                />
              ) : (
                <p>{userData.phone}</p>
              )}
            </div>
    
            {message && <div className="message">{message}</div>}
    
            <div className="form-actions">
              {!isEditing ? (
                <button 
                  type="button" 
                  onClick={() => setIsEditing(true)}
                  className="edit-button"
                >
                  Редактировать
                </button>
              ) : (
                <>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="save-button"
                  >
                    {loading ? 'Сохранение...' : 'Сохранить'}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setIsEditing(false)}
                    className="cancel-button"
                  >
                    Отмена
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    );
    };
export default ProfilePageComponent;

