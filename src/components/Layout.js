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

  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('mode') === 'dark');
  const [sidebarClosed, setSidebarClosed] = useState(() => localStorage.getItem('status') === 'close');

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem('mode', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const nav = document.querySelector('nav');
    if (nav) {
      nav.classList.toggle('close', sidebarClosed);
    }
    localStorage.setItem('status', sidebarClosed ? 'close' : 'open');
  }, [sidebarClosed]);

  const renderVista = () => {
    switch (vista) {
      case 'dashboard': return <Dashboard />;
      case 'productos': return <Productos />;
      default: return <div>Seleccione una opción del menú</div>;
    }
  };

  return (
    <div>
      <nav className={sidebarClosed ? 'close' : ''}>
        <div className="logo-name">
          <div className="logo-image">
            <img src="images/logo.png" alt="" />
          </div>
          <span className="logo_name">Sistema Billar</span>
        </div>
        <div className="menu-items">
          <ul className="nav-links">
            <li onClick={() => setVista('dashboard')}><a href="#"><i className="uil uil-estate"></i><span className="link-name">Dashboard</span></a></li>
            <li onClick={() => setVista('productos')}><a href="#"><i className="uil uil-files-landscapes"></i><span className="link-name">Productos</span></a></li>
            <li onClick={() => setVista('analytics')}><a href="#"><i className="uil uil-chart"></i><span className="link-name">Analytics</span></a></li>
            <li onClick={() => setVista('like')}><a href="#"><i className="uil uil-thumbs-up"></i><span className="link-name">Like</span></a></li>
            <li onClick={() => setVista('comment')}><a href="#"><i className="uil uil-comments"></i><span className="link-name">Comment</span></a></li>
            <li onClick={() => setVista('share')}><a href="#"><i className="uil uil-share"></i><span className="link-name">Share</span></a></li>
          </ul>
          <ul className="logout-mode">
            <li  onClick={() => { localStorage.removeItem('logueado'); cerrarSesion(); }}>
              <a href="#"><i className="uil uil-signout"></i><span className="link-name">Logout</span></a></li>
            <li className="mode">
              <a href="#" onClick={e => { e.preventDefault(); setDarkMode(dm => !dm); }}>
              <i className="uil uil-moon"></i>
              <span className="link-name">Dark Mode</span>
            </a>
            <div className="mode-toggle" onClick={() => setDarkMode(dm => !dm)}>
              <span className="switch"></span>
            </div>
            </li>
          </ul>
        </div>
      </nav>

    <section className="dashboard">
        <div className="top">
            <i className="uil uil-bars sidebar-toggle"
            onClick={() => setSidebarClosed(sc => !sc)}
            style={{ cursor: 'pointer' }}></i>
            <div className="search-box">
                <i className="uil uil-search"></i>
                <input type="text" placeholder="Search here..."/>
            </div>
            
        </div>
        <div className="dash-content">
                    {renderVista()}

        </div>
        {/* Pie de página siempre visible */}
        <footer className="dashboard-footer" style={{ marginTop: '2rem', textAlign: 'center', color: '#888' }}>
            © 2025 Tu Empresa - Todos los derechos reservados
        </footer>
    </section>
    </div>

  );
};

export default Layout;
