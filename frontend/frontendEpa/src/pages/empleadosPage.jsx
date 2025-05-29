import React, { useState, useEffect } from 'react';
import SidebarComponent from '../components/sideBarComponent';
import EmpleadoCard from '../components/empleadoCard';
import EmpleadoModal from '../components/empleadoModal';
import '../css/dashBoard.css';
import '../css/sucursales.css';
import '../css/modal.css';

const EmpleadosPage = ({ onLogout }) => {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmpleado, setCurrentEmpleado] = useState(null);
  const [modalMode, setModalMode] = useState('add');

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const fetchEmpleados = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://practica-clase.onrender.com/api/employee', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setEmpleados(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
      setEmpleados([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setCurrentEmpleado(null);
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleEdit = (empleado) => {
    setCurrentEmpleado(empleado);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDelete = async (empleadoId) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este empleado?')) return;

    try {
      const response = await fetch(`https://practica-clase.onrender.com/api/employee/${empleadoId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setEmpleados(prev => prev.filter(emp => emp._id !== empleadoId));
        console.log('Empleado eliminado correctamente');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar empleado');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar el empleado: ' + error.message);
    }
  };

  const handleSaveEmpleado = async (formData) => {
    try {
      const url = modalMode === 'add'
        ? 'https://practica-clase.onrender.com/api/employee'
        : `https://practica-clase.onrender.com/api/employee/${currentEmpleado._id}`;

      const method = modalMode === 'add' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        await fetchEmpleados();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al guardar empleado');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentEmpleado(null);
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <SidebarComponent onLogout={onLogout} />
        <div className="main-content">
          <div className="flex items-center justify-center h-64">
            <div className="text-xl text-gray-600">Cargando empleados...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <SidebarComponent onLogout={onLogout} />
      <div className="main-content">
        <h1 className="content-title">Empleados</h1>
        <p className="content-subtitle">Gestión de empleados</p>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="sucursales-container">
          <div className="sucursales-header">
            <button 
              className="card"
              onClick={handleAddNew}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
                borderRadius: '8px'
              }}
            >
              + Agregar Empleado
            </button>
          </div>

          {empleados.length > 0 ? (
            <div className="sucursales-grid">
              {empleados.map((empleado) => (
                <EmpleadoCard
                  key={empleado._id}
                  empleado={empleado}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className="content-wrapper">
              <div className="text-center py-8">
                <h3 className="card-title mb-2">No hay empleados registrados</h3>
                <p className="card-text mb-4">Comienza agregando tu primer empleado.</p>
                <button 
                  className="card"
                  onClick={handleAddNew}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    borderRadius: '8px'
                  }}
                >
                  + Agregar Primer Empleado
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <EmpleadoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveEmpleado}
        empleado={currentEmpleado}
        mode={modalMode}
      />
    </div>
  );
};

export default EmpleadosPage;
