import React, { useState } from 'react';
import ProductoForm from './ProductoForm';
import ProductoList from './ProductoList';
console.log('✅  productosP.js cargado correctamente');

const Productos = () => {
   const [vista, setVista] = useState("formulario");

    return (
        <div>
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
