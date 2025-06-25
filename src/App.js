import React, { useState, useEffect } from 'react';
import ProductoForm from './components/ProductoForm';
import ProductoList from './components/ProductoList';
import './styles.css'; // Importa tu archivo CSS si lo tienes


const App = () => {
    
    const [vista, setVista] = useState("formulario");

    return (
        <div>
            <h1>Control de Ventas</h1>
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

export default App;
