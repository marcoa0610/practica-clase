import React, { useState, useEffect } from 'react';
import SidebarComponent from '../components/sideBarComponent';
import SucursalCard from '../components/sucursalesCard';
import SucursalModal from '../components/SucursalModal';
import '../css/dashBoard.css';
import '../css/sucursales.css';
import '../css/modal.css';

const SucursalesPage = ({ onLogout }) => {
  const [sucursales, setSucursales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSucursal, setCurrentSucursal] = useState(null);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'

  // Cargar sucursales al montar el componente
  useEffect(() => {
    fetchSucursales();
  }, []);

  const fetchSucursales = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:4000/api/branch', {
        method: 'GET',
        credentials: 'include',
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      setSucursales(Array.isArray(data) ? data : []);
      
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
      // Si hay error, mostrar datos de ejemplo para desarrollo
      setSucursales([
        {
          _id: '1',
          name: 'Casa Blanca',
          telephone: '7277-8845',
          address: 'Calle 123, Diagonal 35, Casa 122\nSan Salvador',
          schedule: '8:00 AM - 9 PM'
        },
        {
          _id: '2',
          name: 'Casa Blanca Norte',
          telephone: '7277-8846',
          address: 'Av. Norte 456, Col. Escalón\nSan Salvador',
          schedule: '7:00 AM - 10 PM'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setCurrentSucursal(null);
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleEdit = (sucursal) => {
    setCurrentSucursal(sucursal);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDelete = async (sucursalId) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta sucursal?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/branch/${sucursalId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        // Remover la sucursal del estado local
        setSucursales(prevSucursales => 
          prevSucursales.filter(sucursal => sucursal._id !== sucursalId)
        );
        console.log('Sucursal eliminada correctamente');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar sucursal');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar la sucursal: ' + error.message);
    }
  };

  const handleSaveSucursal = async (formData) => {
    try {
      const url = modalMode === 'add' 
        ? 'http://localhost:4000/api/branch' 
        : `http://localhost:4000/api/branch/${currentSucursal._id}`;
      
      const method = modalMode === 'add' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        
        if (modalMode === 'add') {
          // Agregar nueva sucursal
          if (responseData.branch) {
            setSucursales(prevSucursales => [...prevSucursales, responseData.branch]);
          } else {
            // Si el backend no devuelve la sucursal, recargar la lista
            await fetchSucursales();
          }
        } else {
          // Actualizar sucursal existente
          if (responseData.branch) {
            setSucursales(prevSucursales => 
              prevSucursales.map(sucursal => 
                sucursal._id === currentSucursal._id ? responseData.branch : sucursal
              )
            );
          } else {
            // Si el backend no devuelve la sucursal actualizada, recargar la lista
            await fetchSucursales();
          }
        }
        
        console.log(modalMode === 'add' ? 'Sucursal creada correctamente' : 'Sucursal actualizada correctamente');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al guardar sucursal');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error; // Re-throw para que el modal pueda manejar el error
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentSucursal(null);
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <SidebarComponent onLogout={onLogout} />
        <div className="main-content">
          <div className="flex items-center justify-center h-64">
            <div className="text-xl text-gray-600">Cargando sucursales...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <SidebarComponent onLogout={onLogout} />
      <div className="main-content">
        <h1 className="content-title">Sucursales</h1>
        <p className="content-subtitle">Gestión de sucursales</p>
        
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <div className="sucursales-container">
          {/* Header con botón agregar */}
          <div className="sucursales-header">
            <button 
              className="card"
              onClick={handleAddNew}
              style={{ 
                display: 'inline-block',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
                minHeight: 'auto',
                borderRadius: '8px',
                transition: 'background-color 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
            >
              + Agregar Sucursal
            </button>
          </div>
          
          {/* Grid de sucursales */}
          {sucursales.length > 0 ? (
            <div className="sucursales-grid">
              {sucursales.map((sucursal) => (
                <SucursalCard
                  key={sucursal._id}
                  sucursal={sucursal}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className="content-wrapper">
              <div className="text-center py-8">
                <h3 className="card-title mb-2">No hay sucursales registradas</h3>
                <p className="card-text mb-4">Comienza agregando tu primera sucursal.</p>
                <button 
                  className="card"
                  onClick={handleAddNew}
                  style={{ 
                    display: 'inline-block',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    minHeight: 'auto',
                    borderRadius: '8px'
                  }}
                >
                  + Agregar Primera Sucursal
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal para agregar/editar sucursales */}
      <SucursalModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveSucursal}
        sucursal={currentSucursal}
        mode={modalMode}
      />
    </div>
  );
};

export default SucursalesPage;