import '../../../css/colosal.css'; // Archivo CSS para estilos
import s3890Image from '../../../img/img_Espejos/espejoconforma.png'; // Importar la imagen
import { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardFooter, Image, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@heroui/react";

const baseUrl = import.meta.env.VITE_API_URL + "/api";

const CotizadorEspejosconForma = () => {
    const navigate = useNavigate(); // Inicializar useNavigate
    const [dimensions, setDimensions] = useState({ alto: '', ancho: '' });
    const [accessories, setAccessories] = useState({
        pulido: false,
        felpa: '',
    });
    const [selectedMirrorType, setSelectedMirrorType] = useState('orion4mm');
    const [prices, setPrices] = useState({});
    const [loading, setLoading] = useState(true); // Estado para manejo de carga
    const [error, setError] = useState(null); // Estado para manejar errores
    const [detalleProductos, setDetalleProductos] = useState([]); // Nuevo estado para productos
    const { isOpen: isOpen12V, onOpen: onOpen12V, onClose: onClose12V } = useDisclosure();
    const { isOpen: isOpen110V, onOpen: onOpen110V, onClose: onClose110V } = useDisclosure();
    const { isOpen: isOpenSensores, onOpen: onOpenSensores, onClose: onCloseSensores } = useDisclosure();

    const [selectedAccessory, setSelectedAccessory] = useState({
        luz12V: { id: 0, precio: 0 },
        luz110V: { id: 0, precio: 0 },
        sensores: { id: 0, precio: 0 },
    });

    const [cenefaprices, setcenefaprices] = useState({
        cenefaPrice: 0,
    });
    const [aluminioPrice, setAluminioPrice] = useState(0); // Nuevo estado para el precio del aluminio
    const handleAccessorySelect = (tipo, id, precio) => {
        setSelectedAccessory((prevState) => {
            const newState = { ...prevState, [tipo]: { id, precio } };
            if (tipo === 'luz12V') {
                newState.luz110V = { id: 0, precio: 0 }; // Deseleccionar luz 110V
                onClose12V();
            } else if (tipo === 'luz110V') {
                newState.luz12V = { id: 0, precio: 0 }; // Deseleccionar luz 12V
                onClose110V();
            } else if (tipo === 'sensores') {
                onCloseSensores();
            }
            return newState;
        });
    };


    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await fetch(`${baseUrl}/precios`);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos de la API');
                }
                const data = await response.json();
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

        const fetchDetalleProductos = async () => {
            try {
                const response = await fetch(`${baseUrl}/detalleProductos`);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos de detalleProductos');
                }
                const data = await response.json();

                // Filtrar los productos por las categorías que necesitamos
                const filteredProductos = data.filter(producto =>
                    producto.categoria === 'luzled12' ||
                    producto.categoria === 'luzled110' ||
                    producto.categoria === 'sensores'
                );

                setDetalleProductos(filteredProductos); // Guardar los productos filtrados en el estado
            } catch (err) {
                setError(err.message);
            }
        };

        fetchPrices();
        fetchDetalleProductos(); // Llamar a la función que obtiene los productos filtrados

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

    const handlecenefaChange = (e) => {
        const { name, value } = e.target;
        setcenefaprices((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAluminioChange = (e) => {
        const { value } = e.target;
        setAluminioPrice(parseFloat(value) || 0);
    };

    const { alto, ancho } = dimensions;

    const totalWidth = ancho ? Number(ancho) + 50 : '';
    const totalHeight = alto ? Number(alto) + 50 : '';

    // Calcular valores
    const area = totalWidth && totalHeight ? (totalWidth * totalHeight) / 1000000 : ''; // Convertir a m²

    const luztotal = totalHeight && totalWidth ? (totalHeight * 2) + (totalWidth * 2) : "";
    const pulidoTotal = totalHeight && totalWidth ? (totalHeight * 2) + (totalWidth * 2) : "";
    // Calcular precios
    const luzprice = (selectedAccessory.luz12V.precio / 1000) * luztotal;
    const luz110price = (selectedAccessory.luz110V.precio / 1000) * luztotal;
    const espejoPrice = prices[selectedMirrorType] * area;
    const pulidoTotalPrice = accessories.pulido ? pulidoTotal * (prices.pulido / 1000) : 0;
    const { cenefaPrice } = cenefaprices;

    const totalPrice =
        30000 +
        espejoPrice +
        pulidoTotalPrice +
        luzprice +
        luz110price +
        selectedAccessory.sensores.precio +
        (cenefaPrice ? parseFloat(cenefaPrice) : 0) +
        aluminioPrice; // Sumar el precio del aluminio

    if (loading) return <p>Cargando precios...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="door-container">
            <div className="door-frame">
                {/* Formulario para el Diametro y ancho */}
                <div className="dimensions-form flex flex-col gap-4 bg-gray-100 p-6 rounded-lg max-w-lg mx-auto">
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
                        alto (mm):
                        <input
                            type="number"
                            name="alto"
                            value={alto}
                            onChange={handleChange}
                            placeholder="00"
                            className="mt-2 p-2 text-lg border border-gray-300 rounded-md focus:border-green-500 focus:outline-none"
                        />
                    </label>
                    <label className="flex flex-col font-semibold text-gray-800">
                        Ancho (mm):
                        <input
                            type="number"
                            name="ancho"
                            value={ancho}
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
                    {alto && ancho ? (
                        <>
                            <p>Dimensiones totales: {alto} x {ancho} mm</p>
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
                <Table aria-label="Tabla detalleProductos">
                    <TableHeader>
                        <TableColumn>Producto</TableColumn>
                        <TableColumn>Descripción</TableColumn>
                        <TableColumn>Precio</TableColumn>
                        <TableColumn>Color</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {detalleProductos.map((producto) => (
                            <TableRow key={producto.id}>
                                <TableCell>{producto.title}</TableCell>
                                <TableCell>{producto.description}</TableCell>
                                <TableCell>${producto.precio}</TableCell>
                                <TableCell>{producto.color}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <br />
            {/* Lista de partes */}
            <div className="parts-list">
                <strong><h1>ESPEJO CON FORMA</h1></strong>
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
                            <TableCell><strong>Espejo Cuadrado ({selectedMirrorType}):</strong></TableCell>
                            <TableCell> {alto} x {ancho} mm</TableCell>
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
                        <TableRow key="3">
                            <TableCell>
                                <button
                                    onClick={onOpen12V}
                                    className="text-gray-900 rounded-lg font-bold text-lg hover:bg-cyan-500 focus:outline-none  transition"
                                >
                                    Luces led 12v
                                </button>
                            </TableCell>
                            <TableCell>$ {luzprice.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell>
                                <button
                                    onClick={onOpen110V}
                                    className="text-gray-900 rounded-lg font-bold text-lg hover:bg-cyan-500 focus:outline-none  transition"
                                >
                                    Luces led 110v
                                </button>
                            </TableCell>
                            <TableCell>$ {luz110price.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="5">
                            <TableCell>
                                <button
                                    onClick={onOpenSensores}
                                    className="text-gray-900 rounded-lg font-bold text-lg hover:bg-cyan-500 focus:ring-2 transition"
                                >
                                    Sensores
                                </button>
                            </TableCell>
                            <TableCell>$ {selectedAccessory.sensores.precio}</TableCell>
                        </TableRow>
                        <TableRow key="6">
                            <TableCell>Cenefa</TableCell>
                            <TableCell>              <input
                                type="number"
                                name="cenefaPrice"
                                value={cenefaprices.cenefaPrice || ''}
                                placeholder="Ingrece precio"
                                onChange={handlecenefaChange}
                            /></TableCell>
                        </TableRow>
                        <TableRow key="7">
                            <TableCell>Aluminio</TableCell>
                            <TableCell>
                                <input
                                    type="number"
                                    name="aluminioPrice"
                                    value={aluminioPrice || ''}
                                    placeholder="Ingrese precio"
                                    onChange={handleAluminioChange}
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <br />



                <h1 className="font-bold">Total</h1>
                <div className="flex justify-between items-center">
                    <p className=" text-4xl font-bold">${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
                {/* Modal */}
                <Modal isOpen={isOpen12V} onClose={onClose12V}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Luces LED 12V</ModalHeader>
                                <ModalBody>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {detalleProductos
                                            .filter((producto) => producto.categoria === 'luzled12')
                                            .map((item, index) => (
                                                <Card
                                                    key={index}
                                                    isPressable
                                                    shadow="sm"
                                                    onPress={() => handleAccessorySelect('luz12V', item.id, item.precio)}
                                                    className={`nextui-card ${selectedAccessory.luz12V.id === item.id ? 'bg-cyan-300' : ''}`}
                                                >
                                                    <CardBody className="overflow-hidden p-4">
                                                        <Image
                                                            alt={item.title}
                                                            className="w-full h-[100px] sm:h-[100px] md:h-[100px] object-cover rounded-t-lg"
                                                            radius="lg"
                                                            shadow="sm"
                                                            src={item.img}
                                                            width="100%"
                                                            height="auto"
                                                        />
                                                    </CardBody>
                                                    <b className="overflow-hidden p-2">{item.title}</b>
                                                    <CardFooter className="p-2 flex flex-col items-start bg-gray-100 rounded-b-lg">
                                                        <p className="text-sm text-gray-900 text-center">{item.precio.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                                    </CardFooter>
                                                </Card>
                                            ))}
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={() => handleAccessorySelect('luz12V', 0, 0)}>
                                        Ninguno
                                    </Button>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Cerrar
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>

                <Modal isOpen={isOpen110V} onClose={onClose110V}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Luces LED 110V</ModalHeader>
                                <ModalBody>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {detalleProductos
                                            .filter((producto) => producto.categoria === 'luzled110')
                                            .map((item, index) => (
                                                <Card
                                                    key={index}
                                                    isPressable
                                                    shadow="sm"
                                                    onPress={() => handleAccessorySelect('luz110V', item.id, item.precio)}
                                                    className={`nextui-card ${selectedAccessory.luz110V.id === item.id ? 'bg-cyan-300' : ''}`}
                                                >
                                                    <CardBody className="overflow-hidden p-4">
                                                        <Image
                                                            alt={item.title}
                                                            className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover rounded-t-lg"
                                                            radius="lg"
                                                            shadow="sm"
                                                            src={item.img}
                                                            width="100%"
                                                            height="auto"
                                                        />
                                                    </CardBody>
                                                    <b className="overflow-hidden p-2">{item.title}</b>
                                                    <CardFooter className="p-2 flex flex-col items-start bg-gray-100 rounded-b-lg">
                                                        <p className="text-sm text-gray-900 text-center">{item.precio.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                                    </CardFooter>
                                                </Card>
                                            ))}
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={() => handleAccessorySelect('luz110V', 0, 0)}>
                                        Ninguno
                                    </Button>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Cerrar
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>

                <Modal size="5xl" isOpen={isOpenSensores} onClose={onCloseSensores}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Sensores</ModalHeader>
                                <ModalBody>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {detalleProductos
                                            .filter((producto) => producto.categoria === 'sensores')
                                            .map((item, index) => (
                                                <Card
                                                    key={index}
                                                    isPressable
                                                    shadow="sm"
                                                    onPress={() => handleAccessorySelect('sensores', item.id, item.precio)}
                                                    className={`nextui-card ${selectedAccessory.sensores.id === item.id ? 'bg-cyan-300' : ''}`}
                                                >
                                                    <CardBody className="overflow-hidden p-4 items-center">
                                                        <Image
                                                            alt={item.title}
                                                            className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover rounded-t-lg"
                                                            radius="lg"
                                                            shadow="sm"
                                                            src={item.img}
                                                            width="60%"
                                                            height="auto"
                                                        />
                                                    </CardBody>
                                                    <b className="text-sm overflow-hidden ">{item.title}</b>
                                                    <CardFooter className="p-2 flex flex-col items-start bg-gray-100 rounded-b-lg">
                                                        <p className="text-sm text-gray-900 text-center">{item.precio.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                                    </CardFooter>
                                                </Card>
                                            ))}
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={() => handleAccessorySelect('sensores', 0, 0)}>
                                        Ninguno
                                    </Button>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Cerrar
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        </div>

    );
};

export default CotizadorEspejosconForma;
