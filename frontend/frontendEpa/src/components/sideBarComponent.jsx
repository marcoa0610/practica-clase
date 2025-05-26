import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, MapPin, Tag, Package, LogOut } from 'lucide-react';
import '../css/sidebar.css';

const SidebarComponent = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      path: '/dashboard'
    },
    {
      id: 'sucursales',
      label: 'Sucursales',
      icon: MapPin,
      path: '/sucursales'
    },
    {
      id: 'marcas',
      label: 'Marcas',
      icon: Tag,
      path: '/marcas'
    },
    {
      id: 'productos',
      label: 'Productos',
      icon: Package,
      path: '/productos'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Función para determinar si una ruta está activa
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="sidebar-container">
      {/* Header */}
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-box">
            <img 
              src="/src/assets/logoEpa.jpg" 
              alt="EPA Logo" 
              className="logo-img"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <span className="logo-fallback">
              EPA
            </span>
          </div>
          <span className="logo-text">EPA</span>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`menu-item ${isActive(item.path) ? 'active' : ''}`}
            >
              <Icon className="menu-icon" />
              <span className="menu-text">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Cerrar sesión */}
      <div className="sidebar-footer">
        <button 
          onClick={onLogout}
          className="menu-item logout-button"
        >
          <LogOut className="menu-icon" />
          <span className="menu-text">Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
};

export default SidebarComponent;