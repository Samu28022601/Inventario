import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';

function ProductList() {
    const [productos, setProductos] = useState([]);
    const [editing, setEditing] = useState(false);
    const [currentProducto, setCurrentProducto] = useState({
        id: null,
        nombre: '',
        descripcion: '',
        precio: '',
        disponible: false
    });

    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = async () => {
        try {
            const res = await axios.get('/api/productos');
            setProductos(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const deleteProducto = async (id) => {
        try {
            await axios.delete(`/api/productos/${id}`);
            setProductos(productos.filter(prod => prod.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const editProducto = (producto) => {
        setEditing(true);
        setCurrentProducto(producto);
    };

    const updateProducto = async (id, updatedProducto) => {
        try {
            const res = await axios.put(`/api/productos/${id}`, updatedProducto);
            setProductos(productos.map(prod => (prod.id === id ? res.data : prod)));
            setEditing(false);
            setCurrentProducto({
                id: null,
                nombre: '',
                descripcion: '',
                precio: '',
                disponible: false
            });
        } catch (err) {
            console.error(err);
        }
    };

    const addProducto = async (producto) => {
        try {
            const res = await axios.post('/api/productos', producto);
            setProductos([...productos, res.data]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            {editing ? (
                <ProductForm
                    producto={currentProducto}
                    onSubmit={updateProducto}
                    isEditing={true}
                />
            ) : (
                <ProductForm onSubmit={addProducto} />
            )}
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Disponible</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(producto => (
                        <tr key={producto.id}>
                            <td>{producto.nombre}</td>
                            <td>{producto.descripcion}</td>
                            <td>${producto.precio.toFixed(2)}</td>
                            <td>{producto.disponible ? 'Sí' : 'No'}</td>
                            <td>
                                <button onClick={() => editProducto(producto)}>Editar</button>
                                <button onClick={() => deleteProducto(producto.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;