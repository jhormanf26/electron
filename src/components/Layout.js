import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import Productos from './ProductosP';
import '../styles/layout.css';


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
      <div className="encabezado-general">
          <h2>Bienvenido</h2>
          <p>cabezera</p>

        </div>
      <div className="main-content">
        <header>
          <h1>Contenido</h1>
        </header>
        {renderVista()}
      </div>
      <div className="pie-pagina">
          <h3>Pie de pagina</h3>
      </div>
    </div>
  );
};

export default Layout;
