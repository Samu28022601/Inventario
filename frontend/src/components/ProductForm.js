import React, { useState, useEffect } from 'react';

function ProductForm({ onSubmit, producto, isEditing }) {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [disponible, setDisponible] = useState(false);

    useEffect(() => {
        if (isEditing && producto) {
            setNombre(producto.nombre);
            setDescripcion(producto.descripcion);
            setPrecio(producto.precio);
            setDisponible(producto.disponible);
        }
    }, [isEditing, producto]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nombre || !descripcion || !precio) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const newProducto = {
            nombre,
            descripcion,
            precio: parseFloat(precio),
            disponible
        };

        if (isEditing) {
            onSubmit(producto.id, newProducto);
        } else {
            onSubmit(newProducto);
        }

        // Reset form
        setNombre('');
        setDescripcion('');
        setPrecio('');
        setDisponible(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{isEditing ? 'Editar Producto' : 'Agregar Producto'}</h2>
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
            </div>
            <div>
                <label>Descripción:</label>
                <input
                    type="text"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />
            </div>
            <div>
                <label>Precio:</label>
                <input
                    type="number"
                    step="0.01"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                />
            </div>
            <div>
                <label>Disponible:</label>
                <input
                    type="checkbox"
                    checked={disponible}
                    onChange={(e) => setDisponible(e.target.checked)}
                />
            </div>
            <button type="submit">{isEditing ? 'Actualizar' : 'Agregar'}</button>
        </form>
    );
}

export default ProductForm;