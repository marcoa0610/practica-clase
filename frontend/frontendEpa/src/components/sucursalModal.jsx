import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import '../css/sucursalModal.css';

const SucursalModal = ({ sucursal, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
    horario: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (sucursal) {
      setFormData({
        nombre: sucursal.nombre || '',
        telefono: sucursal.telefono || '',
        direccion: sucursal.direccion || '',
        horario: sucursal.horario || ''
      });
    }
  }, [sucursal]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    } else if (!/^\d{4}-\d{4}$/.test(formData.telefono)) {
      newErrors.telefono = 'Formato de teléfono inválido (ej: 1234-5678)';
    }

    if (!formData.direccion.trim()) {
      newErrors.direccion = 'La dirección es requerida';
    }

    if (!formData.horario.trim()) {
      newErrors.horario = 'El horario es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave(formData);
    } catch (error) {
      console.error('Error al guardar:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">
            {sucursal ? 'Editar Sucursal' : 'Agregar Sucursal'}
          </h2>
          <button 
            className="close-btn"
            onClick={onClose}
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="nombre" className="form-label">
              Nombre de la Sucursal *
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              className={`form-input ${errors.nombre ? 'error' : ''}`}
              placeholder="Ingrese el nombre de la sucursal"
            />
            {errors.nombre && <span className="error-message">{errors.nombre}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="telefono" className="form-label">
              Teléfono *
            </label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              className={`form-input ${errors.telefono ? 'error' : ''}`}
              placeholder="1234-5678"
              maxLength="9"
            />
            {errors.telefono && <span className="error-message">{errors.telefono}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="direccion" className="form-label">
              Dirección *
            </label>
            <textarea
              id="direccion"
              name="direccion"
              value={formData.direccion}
              onChange={handleInputChange}
              className={`form-textarea ${errors.direccion ? 'error' : ''}`}
              placeholder="Ingrese la dirección completa"
              rows="3"
            />
            {errors.direccion && <span className="error-message">{errors.direccion}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="horario" className="form-label">
              Horario *
            </label>
            <input
              type="text"
              id="horario"
              name="horario"
              value={formData.horario}
              onChange={handleInputChange}
              className={`form-input ${errors.horario ? 'error' : ''}`}
              placeholder="8:00 AM - 9 PM"
            />
            {errors.horario && <span className="error-message">{errors.horario}</span>}
          </div>

          <div className="modal-actions">
            <button 
              type="button" 
              className="cancel-btn"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="save-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SucursalModal;