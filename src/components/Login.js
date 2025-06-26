import React, { useState } from 'react';
import '../styles/login.css';

const Login = ({ onLoginSuccess }) => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');

  const handleLogin = () => {
    if (usuario === 'admin' && clave === '1234' || true) {
      onLoginSuccess();
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="login-container">
      <div className="title"><span>Iniciar Sesión</span></div>
      <form action="#">
        <div className="row">
          <i className="fas fa-user"></i>
          <input type="text" placeholder="Usuario" required value={usuario} onChange={e => setUsuario(e.target.value)} />
        </div>
        <div className="row">
          <i className="fas fa-lock"></i>
          <input type="password" placeholder="Contraseña" required value={clave} onChange={e => setClave(e.target.value)} />
        </div>
        <div className="row button">
          <input type="submit" value="Ingresar" onClick={handleLogin} />
        </div>
      </form>
    </div>

  );
};

export default Login;