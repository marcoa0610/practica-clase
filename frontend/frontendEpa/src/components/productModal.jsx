import React, { useState, useEffect } from 'react';
import '../css/modal.css';

const ProductoModal = ({ isOpen, onClose, onSave, producto = null, mode = 'add' }) => {
  const [formData, setFormData] = useState({ name: '', description: '', price: '', quantity: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && producto) {
        setFormData({
          name: producto.name || '',
          description: producto.description || '',
          price: producto.price || '',
          quantity: producto.quantity || ''
        });
      } else {
        setFormData({ name: '', description: '', price: '', quantity: '' });
      }
      setError('');
    }
  }, [isOpen, producto, mode]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, price, quantity } = formData;
    if (!name || !description || !price || !quantity) {
      setError('Todos los campos son requeridos');
      return;
    }

    setLoading(true);
    try {
      await onSave({ ...formData, price: parseFloat(price), quantity: parseInt(quantity) });
      onClose();
    } catch (err) {
      setError(err.message || 'Error al guardar el producto');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{mode === 'edit' ? 'Editar Producto' : 'Agregar Producto'}</h2>
          <button className="modal-close-btn" onClick={onClose} disabled={loading}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {error && <div className="error-message">{error}</div>}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} disabled={loading} />
            </div>
            <div className="form-group">
              <label htmlFor="description">Descripción</label>
              <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} disabled={loading} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Precio</label>
              <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} disabled={loading} />
            </div>
            <div className="form-group">
              <label htmlFor="quantity">Cantidad</label>
              <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} disabled={loading} />
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose} disabled={loading}>Cancelar</button>
            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? 'Guardando...' : (mode === 'edit' ? 'Actualizar' : 'Agregar')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductoModal;
