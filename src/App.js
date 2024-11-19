import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './Vistas/LoginForm';
import Register from './Vistas/Register'; // Tu nuevo componente
import { Home } from './Vistas/Home';
import Paradas from './Vistas/Paradas';
import Usuarios from './Vistas/Usuarios';
import Navbar from './Componentes/Navbar/Navbar';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && token !== '') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (token) => {
    setIsLoggedIn(true);
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
      <div className="App">
        <BrowserRouter>
          {isLoggedIn ? (
              <>
                <Navbar onLogout={handleLogout} />
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/paradas" element={<Paradas />} />
                  <Route path="/usuarios" element={<Usuarios />} />
                  <Route path="*" element={<Navigate to="/home" />} />
                </Routes>
              </>
          ) : (
              <Routes>
                {/* Rutas públicas */}
                <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
                <Route path="/register" element={<Register />} />
                {/* Redirige cualquier ruta no válida a /login */}
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
          )}
        </BrowserRouter>
      </div>
  );
}

export default App;
