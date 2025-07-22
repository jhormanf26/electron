import React, { useState, useEffect } from 'react';
import Login2 from './components/Login2';
import Login from './components/Login';
import Layout from './components/Layout';
import './styles.css'; // Importa tu archivo CSS si lo tienes


const App = () => {
  const [logueado, setLogueado] = useState(() => {
    return localStorage.getItem('logueado') === 'true';
  });

  // Detecta modo oscuro desde localStorage
  const isDarkMode = localStorage.getItem('mode') === 'dark';

  useEffect(() => {
    localStorage.setItem('logueado', logueado);
  }, [logueado]);

  return logueado ? (
    <Layout cerrarSesion={() => setLogueado(false)} />
  ) : (
    isDarkMode
      ? <Login2 onLoginSuccess={() => setLogueado(true)} />
      : <Login2 onLoginSuccess={() => setLogueado(true)} />
  );
};

export default App;
