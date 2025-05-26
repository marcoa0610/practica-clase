import React from 'react';
import LoginForm from '../components/loginForm';
import Logo from '../components/logoComponent';
import '../css/login.css';

const LoginPage = ({ onLoginSuccess }) => {
  return (
    <div className="login-container">
      {/* Lado izquierdo - Formulario */}
      <div className="login-form-section">
        <LoginForm onLoginSuccess={onLoginSuccess} />
      </div>
      
      {/* Lado derecho - Logo */}
      <div className="logo-section">
        <Logo />
      </div>
    </div>
  );
};

export default LoginPage;