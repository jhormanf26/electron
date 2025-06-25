import React, { useState, useEffect } from 'react';
import { getProductos, deleteProducto } from '../services/productos';
import '../styles/ProductoList.css';

const ProductoList = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      const data = await getProductos();
      setProductos(data || []);
    } catch (error) {
      console.error('Error al cargar productos', error);
      setProductos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleEliminar = async (id) => {
    const confirmar = window.confirm('¿Estás seguro de eliminar este producto?');
    if (!confirmar) return;

    try {
      const result = await deleteProducto(id);
      if (result?.eliminado) {
        alert('✅ Producto eliminado correctamente');
        cargarProductos();
      } else {
        alert('❌ No se pudo eliminar el producto');
      }
    } catch (error) {
      alert('❌ Error al eliminar el producto');
    }
  };

  if (loading) {
    return (
      <div className="productos-container loading">
        <div className="loading-spinner">Cargando productos...</div>
      </div>
    );
  }

  return (
    <div className="productos-container">
      <div className="productos-header">
        <h2 className="productos-title">Listado de Productos</h2>
        <div className="productos-actions">
          {/* Aquí puedes agregar botones adicionales como "Exportar" o "Filtrar" */}
        </div>
      </div>

      <div className="table-container">
        <table className="productos-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.length > 0 ? (
              productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.descripcion}</td>
                  <td className="precio">
                    ${Number(producto.precio).toLocaleString('es-ES', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </td>
                  <td className="stock">{producto.stock}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-editar"
                        onClick={() => alert('Función de editar en desarrollo')}
                        title="Editar producto"
                      >
                        ✏️
                      </button>
                      <button 
                        className="btn-eliminar"
                        onClick={() => handleEliminar(producto.id)}
                        title="Eliminar producto"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="empty-row">
                <td colSpan="6">
                  <div className="empty-message">
                    No hay productos disponibles
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductoList;
