import React, { useState, useEffect } from 'react';
import '../css/EmpleadoModal.css'; // Asegúrate de tener estilos para el modal

const EmpleadoModal = ({ isOpen, onClose, onSave, empleado = null, mode = 'add' }) => {
  const initialState = {
    name: '', lastName: '', birthday: '', email: '', address: '',
    hireDate: '', password: '', telephone: '', dui: '', isssNumber: '',
    isVerified: false
  };

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && empleado) {
        setFormData(empleado);
      } else {
        setFormData(initialState);
      }
      setError('');
    }
  }, [isOpen, empleado, mode]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = ['name', 'lastName', 'email', 'address', 'telephone', 'dui', 'isssNumber', 'birthday', 'hireDate', 'password'];
    for (let field of requiredFields) {
      if (!formData[field]) {
        setError('Todos los campos son requeridos');
        return;
      }
    }

    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (err) {
      setError(err.message || 'Error al guardar el empleado');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{mode === 'edit' ? 'Editar Empleado' : 'Agregar Empleado'}</h2>
          <button onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          <input name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} />
          <input name="lastName" placeholder="Apellido" value={formData.lastName} onChange={handleChange} />
          <input name="birthday" placeholder="Fecha de Nacimiento" type="date" value={formData.birthday} onChange={handleChange} />
          <input name="hireDate" placeholder="Fecha de Contratación" type="date" value={formData.hireDate} onChange={handleChange} />
          <input name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} />
          <input name="address" placeholder="Dirección" value={formData.address} onChange={handleChange} />
          <input name="telephone" placeholder="Teléfono" value={formData.telephone} onChange={handleChange} />
          <input name="dui" placeholder="DUI" value={formData.dui} onChange={handleChange} />
          <input name="isssNumber" placeholder="ISSS" value={formData.isssNumber} onChange={handleChange} />
          <input name="password" placeholder="Contraseña" type="password" value={formData.password} onChange={handleChange} />
          <label>
            <input type="checkbox" name="isVerified" checked={formData.isVerified} onChange={handleChange} />
            Verificado
          </label>

          <div className="form-actions">
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit" disabled={loading}>{loading ? 'Guardando...' : 'Guardar'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmpleadoModal;