import React, { useState } from 'react';
import ProductoForm from './ProductoForm';
import ProductoList from './ProductoList';

const Productos = () => {
   const [vista, setVista] = useState("no definido");

    return (
        <div className="productos-container">
            <h2>Control de Ventas</h2>
            <button onClick={() => setVista("formulario")}>Formulario</button>
            <button onClick={() => setVista("Listado")}>Lista</button>
            {vista === "formulario" && (
             <>
             <ProductoForm />
             </>
             )}
           {vista === "Listado" && (
              <>
                <ProductoList />
            </>
              )}
         
           
        </div>
    );
};

export default Productos;
