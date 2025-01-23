import '../../../css/colosal.css'; // Archivo CSS para estilos
import s3890Image from '../../../img/espejo1.png'; // Importar la imagen
import { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';


const CotizadorEspejos = () => {
    const navigate = useNavigate(); // Inicializar useNavigate
    const [dimensions, setDimensions] = useState({ diame: '' });
    const [accessories, setAccessories] = useState({
        pulido: false,
        felpa: '',
    });
    const [selectedMirrorType, setSelectedMirrorType] = useState('incoloro3mm');
    const [prices, setPrices] = useState({});
    const [loading, setLoading] = useState(true); // Estado para manejo de carga
    const [error, setError] = useState(null); // Estado para manejar errores
    // Estado para almacenar las espejos agregadas


    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await fetch('http://localhost:3002/api/precios'); // Cambia la URL si es necesario
                if (!response.ok) {
                    throw new Error('Error al obtener los datos de la API');
                }
                const data = await response.json();
                // Convertir los datos a un formato adecuado para acceder por nombre
                const formattedPrices = {};
                data.forEach(item => {
                    const key = item.nombre.toLowerCase().replace(/\s+/g, '');
                    formattedPrices[key] = item.precio;
                });
                setPrices(formattedPrices);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPrices();
    }, []);


    // Función que maneja el cambio de valores
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setDimensions((prev) => ({ ...prev, [name]: value }));
        if (type === 'checkbox') {
            setAccessories((prev) => ({ ...prev, [name]: checked }));
        } else if (type === 'radio') {
            // Desmarcar la otra opción cuando se selecciona una nueva
        } else {
            setAccessories((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleMirrorTypeChange = (e) => {
        setSelectedMirrorType(e.target.value);
    };

    const { diame } = dimensions;

    const totalWidth = diame ? Number(diame) + 50 : '';
    const totalHeight = diame ? Number(diame) + 50 : '';


    // Calcular valores

    const area = totalWidth && totalHeight ? (totalWidth * totalHeight) / 1000000 : ''; // Convertir a m²
    //const pulidoTotal = diame * 3.14;
    const pulidoTotal = totalHeight && totalWidth ? (totalHeight * 2) + (totalWidth * 2) : "";
    // Calcular precios

    const espejoPrice = prices[selectedMirrorType] * area;
    const pulidoTotalPrice = accessories.pulido ? pulidoTotal * (prices.pulido / 1000) : 0;



    const totalPrice =
        espejoPrice +
        pulidoTotalPrice

        if (loading) return <p>Cargando precios...</p>;
        if (error) return <p>Error: {error}</p>;

    return (
        <div className="door-container">
            <div className="door-frame">
                {/* Formulario para el Diametro y ancho */}
                <div className="dimensions-form flex flex-col gap-4 bg-gray-100 p-6 rounded-lg max-w-md mx-auto">
                    <label className="flex flex-col font-semibold text-gray-800">
                        Tipo de Espejo:
                        <select
                            value={selectedMirrorType}
                            onChange={handleMirrorTypeChange}
                            className="mt-2 p-2 text-lg border border-gray-300 rounded-md focus:border-green-500 focus:outline-none"
                        >
                            <option value="incoloro3mm">Incoloro 3 mm</option>
                            <option value="radiant4mm">Radiant 4 mm</option>
                            <option value="orion4mm">Orion 4 mm</option>
                            <option value="palorosa4mm">Palo Rosa 4 mm</option>
                            <option value="gris4mm">Gris 4 mm</option>
                            <option value="bronce4mm">Bronce 4 mm</option>
                        </select>
                    </label>
                    <label className="flex flex-col font-semibold text-gray-800">
                        Diametro (mm):
                        <input
                            type="number"
                            name="diame"
                            value={diame}
                            onChange={handleChange}
                            placeholder="00"
                            className="mt-2 p-2 text-lg border border-gray-300 rounded-md focus:border-green-500 focus:outline-none"
                        />
                    </label>
                </div>

                {/* Imagen */}
                <img src={s3890Image} alt="espejo Corrediza Colosal" className="door-image" />

                {/* Dimensiones dinámicas */}
                <div className="dimensions-display">
                    {diame ? (
                        <>
                            <p>Dimensiones totales: {diame} </p>
                            <p>Área: {area} m²</p>
                        </>
                    ) : (
                        <p>Ingrese las dimensiones de la espejo en milímetros.</p>
                    )}
                    <br />
                </div>

                <div className="container mx-auto p-4">
                    {/* Botón Regresar */}
                    <div className="flex justify-end mt-6">
                        {/* Botón Agregar espejo */}
                        <div className="flex justify-center mb-6">
                            <button
                                onClick={() => navigate(-1)}
                                className="bg-gray-500 text-white py-2 px-6 rounded-lg font-bold text-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                            >
                                Regresar
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <br />
            {/* Lista de partes */}
            <div className="parts-list">
                <strong><h1>ESPEJO REDONDO</h1></strong>
                <Table aria-label="TABLA ESPEJO">
                    <TableHeader>
                        <TableColumn><h1>Espejo</h1></TableColumn>
                        <TableColumn></TableColumn>
                        <TableColumn></TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell><strong><h2>Pieza</h2></strong></TableCell>
                            <TableCell><strong><h2>Tamaño</h2></strong></TableCell>
                            <TableCell><strong><h2>Precio</h2></strong></TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell><strong>Espejo Redondo ({selectedMirrorType}):</strong></TableCell>
                            <TableCell> {diame} mm</TableCell>
                            <TableCell>${espejoPrice.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><strong>Espejo Alto:</strong></TableCell>
                            <TableCell>{totalWidth} mm</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell><strong>Espejo Ancho:</strong></TableCell>
                            <TableCell>{totalHeight} mm</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <br />
                <Table aria-label="tabla accesorios">
                    <TableHeader>
                        <TableColumn><h1>Accesorios</h1></TableColumn>
                        <TableColumn></TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell><strong><h2>Pieza</h2></strong></TableCell>
                            <TableCell><strong><h2>Precio</h2></strong></TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    name="pulido"
                                    checked={accessories.pulido}
                                    onChange={handleChange}
                                />
                                pulido
                            </TableCell>
                            <TableCell>$ {pulidoTotalPrice.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <br />



                <h2 className="text-right text-2xl font-bold">Total</h2>
                <div className="flex justify-between items-center">
                    <button
                        onClick={""}
                        className="bg-cyan-500 text-white py-2 px-6 rounded-lg font-bold text-lg shadow-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                    >
                        Agregar espejo
                    </button>
                    <h2 className="text-right text-4xl font-bold">${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                </div>

            </div>
        </div>

    );
};

export default CotizadorEspejos;
