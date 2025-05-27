import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, MapPin, Tag, Package, LogOut } from 'lucide-react';
import '../css/sidebar.css';

const SidebarComponent = ({ activeSection, setActiveSection, onLogout }) => {
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
      id: 'empleados',
      label: 'Empleados',
      icon: Tag,
      path: '/empleados'
    },
    {
      id: 'productos',
      label: 'Productos',
      icon: Package,
      path: '/productos'
    }
  ];

  const handleNavigation = (itemId, path) => {
    // Solo usar navegación interna si estás en /dashboard y haciendo clic en secciones internas
    if (location.pathname === '/dashboard' && setActiveSection && itemId === 'dashboard') {
      setActiveSection(itemId);
    } else {
      navigate(path);
    }
  };

  // Función para determinar si una ruta está activa
  const isActive = (itemId, path) => {
    // Si estás en el dashboard y tienes activeSection, usar navegación interna
    if (location.pathname === '/dashboard' && activeSection) {
      return activeSection === itemId;
    }
    // Para todas las demás páginas, comparar con la ruta actual
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
              onClick={() => handleNavigation(item.id, item.path)}
              className={`menu-item ${isActive(item.id, item.path) ? 'active' : ''}`}
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