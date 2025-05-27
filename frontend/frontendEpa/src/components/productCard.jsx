import React from 'react';
import '../css/sucursalesCard.css';

const ProductoCard = ({ producto, onEdit, onDelete }) => (
  <div className="sucursal-card">
    <div className="sucursal-card-header">
      <h3 className="sucursal-name">{producto.name}</h3>
    </div>
    <div className="sucursal-card-body">
      <div className="sucursal-info">
        <div className="info-item">
          <span className="info-label">Descripción:</span>
          <span className="info-value">{producto.description}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Precio:</span>
          <span className="info-value">${producto.price.toFixed(2)}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Cantidad:</span>
          <span className="info-value">{producto.quantity}</span>
        </div>
      </div>
    </div>
    <div className="sucursal-card-footer">
      <button className="btn-edit" onClick={() => onEdit(producto)}>Editar</button>
      <button className="btn-delete" onClick={() => onDelete(producto._id)}>Eliminar</button>
    </div>
  </div>
);

export default ProductoCard;
