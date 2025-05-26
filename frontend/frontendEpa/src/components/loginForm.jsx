import React, { useState } from 'react';

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Para incluir cookies
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();

      if (response.ok && data.message === 'login successful') {
        // Login exitoso - llamar función callback
        onLoginSuccess(data);
      } else {
        // Mostrar error
        setError(data.message || 'Error en el login');
      }
    } catch (error) {
      setError('Error de conexión. Verifica tu servidor.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form-wrapper">
      <h2 className="login-title">Bienvenido</h2>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Correo Electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className="login-button"
          disabled={loading}
        >
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>

      <div className="login-links">
        <a href="#" className="login-link">
          ¿No tienes cuenta? Créala ahora!
        </a>
        <a href="#" className="login-link">
          ¿Olvidaste tu contraseña?
        </a>
      </div>
    </div>
  );
};

export default LoginForm;