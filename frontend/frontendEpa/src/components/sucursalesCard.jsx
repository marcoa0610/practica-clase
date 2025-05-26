import React from 'react';
import '../css/sucursalCard.css';

const SucursalCard = ({ sucursal, onEdit, onDelete }) => {
  return (
    <div className="sucursal-card">
      <div className="sucursal-card-header">
        <h3 className="sucursal-name">{sucursal.nombre}</h3>
      </div>
      
      <div className="sucursal-card-body">
        <div className="sucursal-info">
          <div className="info-row">
            <span className="info-label">Teléfono:</span>
            <span className="info-value">{sucursal.telefono}</span>
          </div>
          
          <div className="info-row">
            <span className="info-label">Dirección:</span>
            <span className="info-value">{sucursal.direccion}</span>
          </div>
          
          <div className="info-row">
            <span className="info-label">Horario:</span>
            <span className="info-value">{sucursal.horario}</span>
          </div>
        </div>
      </div>
      
      <div className="sucursal-card-actions">
        <button 
          className="edit-btn"
          onClick={() => onEdit(sucursal)}
        >
          Editar
        </button>
        <button 
          className="delete-btn"
          onClick={() => onDelete(sucursal._id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default SucursalCard;