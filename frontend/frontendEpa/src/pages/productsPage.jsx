import React, { useState, useEffect } from 'react';
import SidebarComponent from '../components/sideBarComponent';
import ProductoCard from '../components/productCard';
import ProductoModal from '../components/productModal';

const ProductosPage = ({ onLogout }) => {
  const [productos, setProductos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [modalMode, setModalMode] = useState('add');

  const fetchProductos = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/product', {
        credentials: 'include',
      });
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleAdd = () => {
    setSelectedProducto(null);
    setModalMode('add');
    setModalOpen(true);
  };

  const handleEdit = (producto) => {
    setSelectedProducto(producto);
    setModalMode('edit');
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await fetch(`http://localhost:4000/api/product/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        fetchProductos();
      } catch (error) {
        console.error('Error al eliminar producto:', error);
      }
    }
  };

  const handleSave = async (data) => {
    const url = modalMode === 'edit' 
      ? `http://localhost:4000/api/product/${selectedProducto._id}`
      : 'http://localhost:4000/api/product';
    const method = modalMode === 'edit' ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Error al guardar');
    }

    fetchProductos();
  };

  return (
    <div className="dashboard-container">
      <SidebarComponent onLogout={onLogout} />
      <div className="main-content">
        <h1 className="content-title">Productos</h1>
        <p className="content-subtitle">Gestión de productos del sistema</p>

        <div className="flex justify-end mb-4">
          <button onClick={handleAdd} className="btn-add">+ Agregar Producto</button>
        </div>

        <div className="cards-container">
          {productos.map(producto => (
            <ProductoCard 
              key={producto._id} 
              producto={producto}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        <ProductoModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          producto={selectedProducto}
          mode={modalMode}
        />
      </div>
    </div>
  );
};

export default ProductosPage;
