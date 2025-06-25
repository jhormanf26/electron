import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Layout from './components/Layout';
import './styles.css'; // Importa tu archivo CSS si lo tienes


const App = () => {
const [logueado, setLogueado] = useState(() => {
    return localStorage.getItem('logueado') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('logueado', logueado);
  }, [logueado]);
  return logueado ? (
    <Layout cerrarSesion={() => setLogueado(false)} />
  ) : (
    <Login onLoginSuccess={() => setLogueado(true)} />
  );
};

export default App;
