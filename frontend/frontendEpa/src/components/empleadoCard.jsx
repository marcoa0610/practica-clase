import React from 'react';
import '../css/sucursalesCard.css'; // asegúrate de importar el CSS correspondiente

const EmpleadoCard = ({ empleado, onEdit, onDelete }) => {
  return (
    <div className="sucursal-card">
      <div className="sucursal-card-header">
        <h2 className="sucursal-name">{empleado.name} {empleado.lastName}</h2>
      </div>

      <div className="sucursal-card-body">
        <div className="sucursal-info">
          <div className="info-item">
            <span className="info-label">Correo electrónico</span>
            <span className="info-value">{empleado.email}</span>
          </div>

          <div className="info-item">
            <span className="info-label">Dirección</span>
            <span className="info-value">{empleado.address}</span>
          </div>

          <div className="info-item">
            <span className="info-label">Teléfono</span>
            <span className="info-value">{empleado.telephone}</span>
          </div>

          <div className="info-item">
            <span className="info-label">DUI</span>
            <span className="info-value">{empleado.dui}</span>
          </div>

          <div className="info-item">
            <span className="info-label">ISSS</span>
            <span className="info-value">{empleado.isssNumber}</span>
          </div>

          <div className="info-item">
            <span className="info-label">Fecha de nacimiento</span>
            <span className="info-value">{empleado.birthday}</span>
          </div>

          <div className="info-item">
            <span className="info-label">Fecha de contratación</span>
            <span className="info-value">{empleado.hireDate}</span>
          </div>

          <div className="info-item">
            <span className="info-label">Verificado</span>
            <span className="info-value">
              {empleado.isVerified ? 'Sí' : 'No'}
            </span>
          </div>
        </div>
      </div>

      <div className="sucursal-card-footer">
        <button className="btn-edit" onClick={() => onEdit(empleado)}>
          Editar
        </button>
        <button className="btn-delete" onClick={() => onDelete(empleado._id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default EmpleadoCard;
