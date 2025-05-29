import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../src/pages/loginPage';
import DashboardPage from '../src/pages/dashboardPage';
import SucursalesPage from '../src/pages/sucursalesPage';
import SidebarComponent from '../src/components/sideBarComponent';
import ProductosPage from './pages/productsPage';
import EmpleadosPage from './pages/empleadosPage';
// Importa las otras páginas cuando las tengas
// import MarcasPage from './pages/marcasPage';
// import ProductosPage from './pages/productosPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar si hay una sesión activa al cargar la app
  useEffect(() => {
    checkAuthStatus();
  }, []);

 

  const handleLoginSuccess = (data) => {
    setIsAuthenticated(true);
    setUserType(data.userType || 'admin'); // Asumimos admin si no viene userType
    // No necesitas localStorage ya que usas cookies
  };

  const handleLogout = async () => {
    try {
      await fetch('https://practica-clase.onrender.com/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      setIsAuthenticated(false);
      setUserType(null);
    }
  };

  // Componente de ruta protegida
  const ProtectedRoute = ({ children, allowedUserTypes = [] }) => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl">Cargando...</div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    if (allowedUserTypes.length > 0 && !allowedUserTypes.includes(userType)) {
      return <Navigate to="/unauthorized" replace />;
    }

    return children;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Cargando...</div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Ruta de login */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
            <Navigate to="/dashboard" replace /> : 
            <LoginPage onLoginSuccess={handleLoginSuccess} />
          } 
        />

        {/* Ruta del dashboard - solo para admin */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute allowedUserTypes={['admin']}>
              <DashboardPage onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />

        {/* Ruta de sucursales - solo para admin */}
        <Route 
  path="/sucursales" 
  element={<SucursalesPage onLogout={handleLogout} />} 
/>


        {/* Ruta de marcas - solo para admin */}
        <Route 
  path="/empleados" 
  element={<EmpleadosPage onLogout={handleLogout} />} 
/>

        {/* Ruta de productos - solo para admin */}
        <Route 
  path="/productos" 
  element={<ProductosPage onLogout={handleLogout} />} 
/>

        {/* Ruta no autorizada */}
        <Route 
          path="/unauthorized" 
          element={
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Acceso No Autorizado</h1>
                <p className="text-gray-600 mb-4">No tienes permisos para acceder a esta página.</p>
                <button 
                  onClick={handleLogout}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Volver al Login
                </button>
              </div>
            </div>
          } 
        />

        {/* Ruta por defecto */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? 
            <Navigate to="/dashboard" replace /> : 
            <Navigate to="/login" replace />
          } 
        />

        {/* Catch all - redirigir a login o dashboard según autenticación */}
        <Route 
          path="*" 
          element={
            isAuthenticated ? 
            <Navigate to="/dashboard" replace /> : 
            <Navigate to="/login" replace />
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;