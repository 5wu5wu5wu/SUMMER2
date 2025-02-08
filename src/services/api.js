// src/services/api.js
const TEST_MODE = true; // Переключить на false для работы с реальным API
const API_URL = 'http://localhost:3000';
import avatar from "../modules/default-avatar.svg"

// Тестовые данные
let testData = {
  users: {
    admin: {
      password: 'admin',
      userData: {
        fullName: 'Администратор',
        plotNumber: '001',
        phone: '+7 (999) 123-45-67',
        avatar: '../modules/default-avatar.svg'
      }
    },
    user1: {
      password: 'user1pass',
      userData: {
        fullName: 'Тестовый Пользователь 1',
        plotNumber: '002',
        phone: '+7 (999) 765-43-21',
        avatar: '/default-avatar.png'
      }
    }
  },
  files: [
    { id: 1, name: 'Документ 1', owner: 'admin' },
    { id: 2, name: 'Документ 2', owner: 'user1' }
  ],
  access: []
};

// Имитация задержки ответа
const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 500));

// Auth API
export const login = async (username, password) => {
  await simulateDelay();

  if (TEST_MODE) {
    if (testData.users[username]?.password === password) {
      return {
        token: `test_token_${username}`,
        user: testData.users[username].userData
      };
    }
    throw new Error('Неверные учетные данные');
  }

  // Реальная реализация
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  return response.json();
};

export const register = async (username, password) => {
  await simulateDelay();

  if (TEST_MODE) {
    if (testData.users[username]) {
      throw new Error('Пользователь уже существует');
    }
    
    testData.users[username] = {
      password,
      userData: {
        fullName: 'Новый пользователь',
        plotNumber: '000',
        phone: '+7 (999) 000-00-00',
        avatar: '/default-avatar.png'
      }
    };
    
    return { status: 'success' };
  }

  // Реальная реализация
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  return response.json();
};

// Profile API
export const getUserData = async (token) => {
  await simulateDelay();

  if (TEST_MODE) {
    const username = token.replace('test_token_', '');
    const user = testData.users[username]?.userData;
    
    if (!user) throw new Error('Пользователь не найден');
    return { data: user };
  }

  const response = await fetch(`${API_URL}/user`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.json();
};

export const updateUserData = async (data, token) => {
  await simulateDelay();

  if (TEST_MODE) {
    const username = token.replace('test_token_', '');
    if (!testData.users[username]) throw new Error('Пользователь не найден');
    
    testData.users[username].userData = {
      ...testData.users[username].userData,
      ...data
    };
    
    return { status: 200, data: testData.users[username].userData };
  }

  const response = await fetch(`${API_URL}/user`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return response.json();
};

export const uploadAvatar = async (formData, token) => {
  await simulateDelay();

  if (TEST_MODE) {
    const username = token.replace('test_token_', '');
    const file = formData.get('avatar');
    
    testData.users[username].userData.avatar = URL.createObjectURL(file);
    return { 
      data: { 
        avatar: testData.users[username].userData.avatar 
      } 
    };
  }

  const response = await fetch(`${API_URL}/user/avatar`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  });
  return response.json();
};

// Files API
export const getFiles = async () => {
  await simulateDelay();
  
  if (TEST_MODE) {
    return testData.files;
  }

  const response = await fetch(`${API_URL}/files`);
  return response.json();
};

export const uploadFile = async (name) => {
  await simulateDelay();

  if (TEST_MODE) {
    const newFile = {
      id: Date.now(),
      name,
      owner: 'test_user'
    };
    
    testData.files.push(newFile);
    return newFile;
  }

  const response = await fetch(`${API_URL}/files`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  return response.json();
};

export const updateFile = async (id, name) => {
  await simulateDelay();

  if (TEST_MODE) {
    const file = testData.files.find(f => f.id === id);
    if (!file) throw new Error('Файл не найден');
    
    file.name = name;
    return file;
  }

  const response = await fetch(`${API_URL}/files/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  return response.json();
};

export const deleteFile = async (id) => {
  await simulateDelay();

  if (TEST_MODE) {
    testData.files = testData.files.filter(f => f.id !== id);
    return { status: 'success' };
  }

  const response = await fetch(`${API_URL}/files/${id}`, {
    method: 'DELETE'
  });
  return response.json();
};

// Access API
export const getFileAccessRights = async (id) => {
  await simulateDelay();

  if (TEST_MODE) {
    return testData.access.filter(a => a.fileId === id);
  }

  const response = await fetch(`${API_URL}/files/${id}/access`);
  return response.json();
};

export const grantAccess = async (id, email) => {
  await simulateDelay();

  if (TEST_MODE) {
    testData.access.push({ fileId: id, email });
    return { status: 'success' };
  }

  const response = await fetch(`${API_URL}/files/${id}/access`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  return response.json();
};

export const revokeAccess = async (id, email) => {
  await simulateDelay();

  if (TEST_MODE) {
    testData.access = testData.access.filter(a => !(a.fileId === id && a.email === email));
    return { status: 'success' };
  }

  const response = await fetch(`${API_URL}/files/${id}/access`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  return response.json();
};