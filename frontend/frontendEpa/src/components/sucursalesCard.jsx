import React from 'react';
import '../css/sucursalesCard.css';

const SucursalCard = ({ sucursal, onEdit, onDelete }) => {
  const handleEdit = () => {
    onEdit(sucursal);
  };

  const handleDelete = () => {
    onDelete(sucursal._id);
  };

  return (
    <div className="sucursal-card">
      <div className="sucursal-card-header">
        <h3 className="sucursal-name">{sucursal.name}</h3>
      </div>
      
      <div className="sucursal-card-body">
        <div className="sucursal-info">
          <div className="info-item">
            <span className="info-label">Teléfono:</span>
            <span className="info-value">{sucursal.telephone}</span>
          </div>
          
          <div className="info-item">
            <span className="info-label">Dirección:</span>
            <span className="info-value">{sucursal.address}</span>
          </div>
          
          <div className="info-item">
            <span className="info-label">Horario:</span>
            <span className="info-value">{sucursal.schedule}</span>
          </div>
        </div>
      </div>
      
      <div className="sucursal-card-footer">
        <button 
          className="btn-edit"
          onClick={handleEdit}
        >
          Editar
        </button>
        <button 
          className="btn-delete"
          onClick={handleDelete}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default SucursalCard;