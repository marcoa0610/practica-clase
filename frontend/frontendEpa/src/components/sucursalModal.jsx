import React, { useState, useEffect } from 'react';
import '../css/modal.css'; 

const SucursalModal = ({ isOpen, onClose, onSave, sucursal = null, mode = 'add' }) => {
  const [formData, setFormData] = useState({
    name: '',
    telephone: '',
    address: '',
    schedule: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Resetear formulario cuando se abre/cierra el modal o cambia la sucursal
  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && sucursal) {
        setFormData({
          name: sucursal.name || '',
          telephone: sucursal.telephone || '',
          address: sucursal.address || '',
          schedule: sucursal.schedule || ''
        });
      } else {
        setFormData({
          name: '',
          telephone: '',
          address: '',
          schedule: ''
        });
      }
      setError('');
    }
  }, [isOpen, sucursal, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.name.trim() || !formData.telephone.trim() || !formData.address.trim() || !formData.schedule.trim()) {
      setError('Todos los campos son requeridos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      setError(error.message || 'Error al guardar la sucursal');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {mode === 'edit' ? 'Editar Sucursal' : 'Agregar Sucursal'}
          </h2>
          <button 
            className="modal-close-btn" 
            onClick={handleClose}
            disabled={loading}
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
                placeholder="Nombre de la sucursal"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="telephone">Teléfono</label>
              <input
                type="text"
                id="telephone"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                disabled={loading}
                placeholder="Número de teléfono"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="address">Dirección</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={loading}
                placeholder="Dirección completa"
                rows="3"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="schedule">Horario</label>
              <input
                type="text"
                id="schedule"
                name="schedule"
                value={formData.schedule}
                onChange={handleChange}
                disabled={loading}
                placeholder="Ej: 8:00 AM - 9:00 PM"
              />
            </div>
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="btn-cancel" 
              onClick={handleClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-save"
              disabled={loading}
            >
              {loading ? 'Guardando...' : (mode === 'edit' ? 'Actualizar' : 'Agregar')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SucursalModal;