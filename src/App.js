import React, { useState, useEffect } from 'react';
import LoginForm from './Vistas/LoginForm';
import {Home} from './Vistas/Home';
import Paradas from './Vistas/Paradas';
import Usuarios from './Vistas/Usuarios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Componentes/Navbar/Navbar';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => 
  {
    const token = localStorage.getItem('token');
    if (token&& token!=='') 
    {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (token) => 
  {
    setIsLoggedIn(true);
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <BrowserRouter>
        <Navbar  onLogout={handleLogout} />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/paradas" element={<Paradas />} />
            <Route path="/usuarios" element={<Usuarios />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;