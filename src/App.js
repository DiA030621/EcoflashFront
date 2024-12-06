import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './Vistas/LoginForm';
import Register from './Vistas/Register';
import { Home } from './Vistas/Home';
import Contenedor from './Vistas/Contenedor';
import Navbar from './Componentes/Navbar/Navbar';
import Colaboration from './Vistas/Colaboration';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [userScore, setUserScore] = useState(null);
  const [name, setName] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    if (storedUserType && (storedUserType === 'admin' || storedUserType === 'user')) {
      setIsLoggedIn(true);
      setUserType(storedUserType);
    }
  }, []);

  const handleLogin = (data) => {
    const type = data.user[0].type;
    const name = data.user[0].name;
    const lastname = data.user[0].lastname;
    const id = data.user[0].id;
    const userScore = data.user[0].score;
    setIsLoggedIn(true);
    setUserType(type);
    setName(name);
    setLastname (lastname);
    setId(id);
    setUserScore(userScore);
    localStorage.setItem('userType', type);
    localStorage.setItem('name', name);
    localStorage.setItem('lastname', lastname);
    localStorage.setItem('userScore', userScore);
  };

  const handleLogout = () => {
    localStorage.removeItem('name');
    localStorage.removeItem('Lastname');
    localStorage.removeItem('userScore');
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
                  <Route path="/home" element={<Home userType={userType} name={name} lastname={lastname} userScore={userScore} />} />
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
