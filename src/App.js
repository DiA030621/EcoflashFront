import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './Vistas/LoginForm';
import Register from './Vistas/Register';
import { Home } from './Vistas/Home';
import Contenedor from './Vistas/Contenedor';
import Navbar from './Componentes/Navbar/Navbar';
import Colaboration from './Vistas/Colaboration';  // Importa el nuevo componente
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    if (storedUserType && (storedUserType === 'admin' || storedUserType === 'user')) {
      setIsLoggedIn(true);
      setUserType(storedUserType);
    }
  }, []);

  const handleLogin = (type) => {
    setIsLoggedIn(true);
    setUserType(type);
    localStorage.setItem('userType', type);
  };

  const handleLogout = () => {
    localStorage.removeItem('userType');
    setIsLoggedIn(false);
    setUserType(null);
  };

  return (
      <div className="App">
        <BrowserRouter>
          {isLoggedIn ? (
              <>
                <Navbar onLogout={handleLogout} userType={userType} />
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/contenedor" element={<Contenedor userType={userType} />} />
                  <Route path="/colaboration" element={<Colaboration userType={userType} />} />
                  <Route path="*" element={<Navigate to="/home" />} />
                </Routes>
              </>
          ) : (
              <Routes>
                <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/login" />} />
                <Route path="/colaboration" element={<Colaboration userType={userType} />} />
              </Routes>
          )}
        </BrowserRouter>
      </div>
  );
}

export default App;
