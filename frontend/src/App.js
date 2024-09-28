import React from 'react';
import ProductList from './components/ProductList';
import './App.css';

function App() {
    return (
        <div className="container">
            <h1>Inventario de Productos</h1>
            <ProductList />
        </div>
    );
}

export default App;