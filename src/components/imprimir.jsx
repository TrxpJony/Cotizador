import { useEffect, useState } from 'react';

const Imprimir = () => {
    const [detalleProductos, setdetalleProductos] = useState([]);

    useEffect(() => {
        fetch('/path/to/db.json')
            .then(response => response.json())
            .then(data => setdetalleProductos(data.detalleProductos))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const formatData = () => {
        return detalleProductos.map(producto => 
            `${producto.id}, ${producto.title}, ${producto.description}, ${producto.color}, ${producto.precio}, ${producto.img}, ${producto.categoria}`
        ).join('\n');
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div>
            <h1>Detalle de Productos</h1>
            <pre>{formatData()}</pre>
            <button onClick={handlePrint}>Imprimir</button>
        </div>
    );
};

export default Imprimir;