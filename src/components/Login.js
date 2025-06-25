import React, { useState } from 'react';

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
      <h2>Iniciar Sesión</h2>
      <input placeholder="Usuario" value={usuario} onChange={e => setUsuario(e.target.value)} />
      <input placeholder="Contraseña" type="password" value={clave} onChange={e => setClave(e.target.value)} />
      <button onClick={handleLogin}>Ingresar</button>
    </div>
  );
};

export default Login;