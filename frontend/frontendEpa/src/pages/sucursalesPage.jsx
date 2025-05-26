import React from 'react';
import SidebarComponent from '../components/sideBarComponent';
import '../css/sucursales.css';

const SucursalesPage = ({ onLogout }) => {
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <SidebarComponent onLogout={onLogout} />
      
      {/* Contenido principal */}
      <div className="main-content">
        <div className="content-header">
          <h1 className="page-title">Sucursales</h1>
          <p className="page-subtitle">Gestión de sucursales</p>
        </div>
        
        <div className="content-body">
          {/* Contenido específico de sucursales */}
          <div className="sucursales-container">
            <div className="sucursales-header">
              <button className="btn-primary">
                + Agregar Sucursal
              </button>
            </div>
            
            <div className="sucursales-grid">
              {/* Card 1 - usando tus clases CSS existentes */}
              <div className="sucursal-card">
                <div className="sucursal-card-header">
                  <h3 className="sucursal-name">Sucursal Centro</h3>
                </div>
                
                <div className="sucursal-card-body">
                  <div className="sucursal-info">
                    <div className="info-row">
                      <span className="info-label">Dirección:</span>
                      <span className="info-value">Calle Principal 123</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Teléfono:</span>
                      <span className="info-value">(555) 123-4567</span>
                    </div>
                  </div>
                </div>
                
                <div className="sucursal-card-actions">
                  <button className="edit-btn">Editar</button>
                  <button className="delete-btn">Eliminar</button>
                </div>
              </div>
              
              {/* Card 2 - usando tus clases CSS existentes */}
              <div className="sucursal-card">
                <div className="sucursal-card-header">
                  <h3 className="sucursal-name">Sucursal Norte</h3>
                </div>
                
                <div className="sucursal-card-body">
                  <div className="sucursal-info">
                    <div className="info-row">
                      <span className="info-label">Dirección:</span>
                      <span className="info-value">Av. Norte 456</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Teléfono:</span>
                      <span className="info-value">(555) 765-4321</span>
                    </div>
                  </div>
                </div>
                
                <div className="sucursal-card-actions">
                  <button className="edit-btn">Editar</button>
                  <button className="delete-btn">Eliminar</button>
                </div>
              </div>
              
              {/* Puedes agregar más cards aquí siguiendo la misma estructura */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SucursalesPage;