import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import Productos from './ProductosP';

const Layout = ({ cerrarSesion }) => {
  const [vista, setVista] = useState(() => {
    return localStorage.getItem('vista') || 'dashboard';
  });
  useEffect(() => {
    localStorage.setItem('vista', vista);
  }, [vista]);
  
  const renderVista = () => {
    switch (vista) {
      case 'dashboard': return <Dashboard />;
      case 'productos': return <Productos />;
      default: return <div>Seleccione una opción del menú</div>;
    }
  };

  return (
    <div className="layout">
      <div className="sidebar">
        <h3>Menú</h3>
        <button onClick={() => setVista('dashboard')}>Dashboard</button>
        <button onClick={() => setVista('productos')}>Productos</button>
        <hr />
        <button onClick={() => { localStorage.removeItem('logueado'); cerrarSesion(); }}>
          Cerrar sesión
        </button>
      </div>
      <div className="main-content">
        <div className="encabezado-general">
          <h2>Bienvenido al sistema de administración de billar</h2>
        </div>
        <header>
          <h1>Panel de Administración</h1>
        </header>
        {renderVista()}
      </div>
    </div>
  );
};

export default Layout;
