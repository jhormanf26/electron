import React, { useState } from 'react';
import { registerProducto, getProductos } from '../services/productos';
import '../styles/ProductoForm.css';

const ProductoForm = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const producto = { nombre, descripcion, precio, stock };
        try {
            const ventas = await registerProducto(producto);
            const ventasActuales = await getProductos();
            setNombre('');
            setDescripcion('');
            setPrecio('');
            setStock(0);
            alert('Producto registrado con éxito');
        } catch (error) {
            alert('Error al registrar el producto');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="producto-form-container">
            <h2 className="form-title">Registrar Nuevo Producto</h2>
            <form onSubmit={handleSubmit} className="producto-form">
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        id="nombre"
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        placeholder="Ingrese el nombre del producto"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="descripcion">Descripción</label>
                    <textarea
                        id="descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                        placeholder="Ingrese la descripción del producto"
                        className="form-control"
                        rows="3"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group half">
                        <label htmlFor="precio">Precio</label>
                        <div className="input-group">
                            <span className="currency-symbol">$</span>
                            <input
                                id="precio"
                                type="number"
                                value={precio}
                                onChange={(e) => setPrecio(e.target.value)}
                                required
                                placeholder="0.00"
                                className="form-control"
                                min="0"
                                step="0.01"
                            />
                        </div>
                    </div>

                    <div className="form-group half">
                        <label htmlFor="stock">Stock</label>
                        <input
                            id="stock"
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(parseInt(e.target.value))}
                            required
                            placeholder="Cantidad disponible"
                            className="form-control"
                            min="0"
                        />
                    </div>
                </div>

                <button 
                    type="submit" 
                    className="submit-button"
                    disabled={loading}
                >
                    {loading ? 'Registrando...' : 'Registrar Producto'}
                </button>
            </form>
        </div>
    );
};

export default ProductoForm;