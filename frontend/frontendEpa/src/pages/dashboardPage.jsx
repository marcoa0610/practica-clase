import React, { useState } from 'react';
import SidebarComponent from '../components/sideBarComponent';
import '../css/dashBoard.css';

// Componente de contenido principal
const MainContent = ({ activeSection }) => {
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div>
            <h1 className="content-title">Dashboard</h1>
            <h2 className="content-subtitle">¡Bienvenido!</h2>
            
            <div className="cards-grid">
              <div className="card">
                <h3 className="card-title">Estadísticas</h3>
                <p className="card-text">Información general del sistema</p>
              </div>
              
              <div className="card">
                <h3 className="card-title">Actividad Reciente</h3>
                <p className="card-text">Últimas acciones realizadas</p>
              </div>
              
              <div className="card">
                <h3 className="card-title">Notificaciones</h3>
                <p className="card-text">Mensajes importantes</p>
              </div>
            </div>
          </div>
        );
      case 'sucursales':
        return (
          <div>
            <h1 className="content-title">Sucursales</h1>
            <div className="content-wrapper">
              <p className="card-text">Gestión de sucursales</p>
            </div>
          </div>
        );
      case 'marcas':
        return (
          <div>
            <h1 className="content-title">Marcas</h1>
            <div className="content-wrapper">
              <p className="card-text">Gestión de marcas</p>
            </div>
          </div>
        );
      case 'productos':
        return (
          <div>
            <h1 className="content-title">Productos</h1>
            <div className="content-wrapper">
              <p className="card-text">Gestión de productos</p>
            </div>
          </div>
        );
      default:
        return (
          <div>
            <h1 className="content-title">Dashboard</h1>
            <h2 className="content-subtitle">¡Bienvenido!</h2>
          </div>
        );
    }
  };

  return (
    <div className="main-content">
      {renderContent()}
    </div>
  );
};

// Página principal del Dashboard
const DashboardPage = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <div className="dashboard-container">
      <SidebarComponent 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        onLogout={onLogout}
      />
      <MainContent activeSection={activeSection} />
    </div>
  );
};

export default DashboardPage;