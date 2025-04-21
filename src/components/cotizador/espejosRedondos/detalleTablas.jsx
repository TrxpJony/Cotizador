import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import PropTypes from 'prop-types';
import CotizadorAdd from '../CotizadorAdd'; // Import CotizadorAdd
import { Card, CardBody, CardFooter, Image, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@heroui/react";
import { useState, useEffect } from 'react';

const baseUrl = import.meta.env.VITE_API_URL + "/api";

const DetalleTablas = ({ calculatedValues, dimensions, onAddDoor, selectedAccessories, useCalculoPrecios, selectedGlass, selectedCenefa, selectedPerfil, onAccessoryChange}) => { // Add new props
    const { isOpen: isOpen12V, onOpen: onOpen12V, onClose: onClose12V } = useDisclosure();
    const { isOpen: isOpen110V, onOpen: onOpen110V, onClose: onClose110V } = useDisclosure();
    const { isOpen: isOpenSensores, onOpen: onOpenSensores, onClose: onCloseSensores } = useDisclosure();
    const [detalleProductos, setDetalleProductos] = useState([]); // Nuevo estado para productos
    const [setError] = useState(null); // Estado para manejar errores

    const [selectedAccessory, setSelectedAccessory] = useState({
        luz12V: { id: 0, precio: 0 },
        luz110V: { id: 0, precio: 0 },
        sensores: { id: 0, precio: 0 },
    });

    const handleAccessorySelect = (tipo, id, precio) => {
        const mtrsLineal = calculatedValues?.mtrsLineal || 0; // Ensure mtrsLineal is always derived here
        let precioFinal = precio;

        if (tipo === 'luz12V' || tipo === 'luz110V') {
            precioFinal = (precio / 1000) * mtrsLineal;
            // Redondear a múltiplo de 5000 hacia arriba
            precioFinal = Math.ceil(precioFinal / 5000) * 5000;
        }

        setSelectedAccessory((prevState) => {
            const newState = { ...prevState, [tipo]: { id, precio: precioFinal } };

            // Deselect the other type of light if necessary
            if (tipo === 'luz12V') {
                newState.luz110V = { id: 0, precio: 0 };
                onClose12V();
            } else if (tipo === 'luz110V') {
                newState.luz12V = { id: 0, precio: 0 };
                onClose110V();
            } else if (tipo === 'sensores') {
                onCloseSensores();
            }

            onAccessoryChange(Object.values(newState)); // Notify parent of the updated accessories
            return newState;
        });
    };

    useEffect(() => {
        const mtrsLineal = calculatedValues?.mtrsLineal || 0; // Derivar mtrsLineal directamente

        setSelectedAccessory((prevState) => {
            const updatedState = { ...prevState };

            // Recalcular el precio de las luces 12V si están seleccionadas
            if (prevState.luz12V.id !== 0) {
                const precioBase12V = detalleProductos.find(p => p.id === prevState.luz12V.id)?.precio || 0;
                let recalculated = (precioBase12V / 1000) * mtrsLineal;
                recalculated = Math.ceil(recalculated / 5000) * 5000; // Redondear a múltiplo de 5000 hacia arriba
                updatedState.luz12V.precio = recalculated;
            }

            // Recalcular el precio de las luces 110V si están seleccionadas
            if (prevState.luz110V.id !== 0) {
                const precioBase110V = detalleProductos.find(p => p.id === prevState.luz110V.id)?.precio || 0;
                let recalculated = (precioBase110V / 1000) * mtrsLineal;
                recalculated = Math.ceil(recalculated / 5000) * 5000; // Redondear a múltiplo de 5000 hacia arriba
                updatedState.luz110V.precio = recalculated;
            }

            return updatedState;
        });
    }, [calculatedValues, detalleProductos]); // Ajustar dependencias

    useEffect(() => {
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
                setError(err.message); // Manejar el error
            }
        };

        // Llamar a la función solo si detalleProductos está vacío
        if (detalleProductos.length === 0) {
            fetchDetalleProductos();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [detalleProductos]);


    const {
        totalWidth,
        totalHeight,
        vidrioPrice,
        cenefaPrice,
        perfilPrice,
        mtrsLineal,
        manoDeObra,
        totalArea,
    } = calculatedValues || {};

    return (
        <>
            <div className="parts-list">
                <Table aria-label="Tabla Vidrio">
                    <TableHeader>
                        <TableColumn><h1>Vidrio</h1></TableColumn>
                        <TableColumn></TableColumn>
                        <TableColumn></TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell><strong><h2>Pieza</h2></strong></TableCell>
                            <TableCell><strong><h2>Dimensiones</h2></strong></TableCell>
                            <TableCell><strong><h2>Precio</h2></strong></TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell><strong>Vidrio:</strong></TableCell>
                            <TableCell> {totalHeight} x {totalWidth} mm</TableCell>
                            <TableCell>${vidrioPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><strong>Cenefa:</strong></TableCell>
                            <TableCell> {mtrsLineal} mm</TableCell>
                            <TableCell>${cenefaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell><strong>Perfileria en aluminio:</strong></TableCell>
                            <TableCell> {mtrsLineal} mm</TableCell>
                            <TableCell>${perfilPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="5">
                            <TableCell><strong>Mano de obra:</strong></TableCell>
                            <TableCell> {totalArea} mm</TableCell>
                            <TableCell>${manoDeObra?.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <br />
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
                        <TableRow key="3">
                            <TableCell>
                                <button
                                    onClick={onOpen12V}
                                    className="text-gray-900 rounded-lg font-bold text-lg hover:bg-cyan-500 focus:outline-none transition"
                                >
                                    Luces led 12v
                                </button>
                            </TableCell>
                            <TableCell>${selectedAccessory.luz12V.precio.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell>
                                <button
                                    onClick={onOpen110V}
                                    className="text-gray-900 rounded-lg font-bold text-lg hover:bg-cyan-500 focus:outline-none transition"
                                >
                                    Luces led 110v
                                </button>
                            </TableCell>
                            <TableCell>${selectedAccessory.luz110V.precio.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
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
                            <TableCell>${selectedAccessory.sensores.precio.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <br />


                {/* Modal */}
                <Modal isOpen={isOpen12V} onClose={onClose12V}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Luces LED 12V</ModalHeader>
                                <ModalBody className="overflow-y-auto max-h-[80vh]">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {detalleProductos
                                            .filter((producto) => producto.categoria === 'luzled12')
                                            .map((item, index) => (
                                                <Card
                                                    key={index}
                                                    isPressable
                                                    shadow="sm"
                                                    onPress={() => handleAccessorySelect('luz12V', item.id, item.precio)} // Pass id and price
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
                                <ModalBody className="overflow-y-auto max-h-[80vh]">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
                                        {detalleProductos
                                            .filter((producto) => producto.categoria === 'luzled110')
                                            .map((item, index) => (
                                                <Card
                                                    key={index}
                                                    isPressable
                                                    shadow="sm"
                                                    onPress={() => handleAccessorySelect('luz110V', item.id, item.precio)} // Pass id and price
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
                                <ModalBody className="overflow-y-auto max-h-[80vh]">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {detalleProductos
                                            .filter((producto) => producto.categoria === 'sensores')
                                            .map((item, index) => (
                                                <Card
                                                    key={index}
                                                    isPressable
                                                    shadow="sm"
                                                    onPress={() => handleAccessorySelect('sensores', item.id, item.precio)} // Pass id and price
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
                <br />
                <CotizadorAdd
                    dimensions={dimensions} onAddDoor={onAddDoor} useCalculoPrecios={useCalculoPrecios} selectedAccessories={selectedAccessories} selectedGlass={selectedGlass} selectedCenefa={selectedCenefa} selectedPerfil={selectedPerfil} />
            </div>
        </>
    );
};

DetalleTablas.propTypes = {
    calculatedValues: PropTypes.shape({
        totalWidth: PropTypes.number,
        totalHeight: PropTypes.number,
        vidrioPrice: PropTypes.number,
        cenefaPrice: PropTypes.number,
        perfilPrice: PropTypes.number,
        mtrsLineal: PropTypes.number,
    }),
    dimensions: PropTypes.object.isRequired,
    onAddDoor: PropTypes.func.isRequired,
    onAccessoryChange: PropTypes.func.isRequired, // ✅ Esto está bien
    selectedAccessories: PropTypes.array.isRequired,
    useCalculoPrecios: PropTypes.func.isRequired,
    selectedGlass: PropTypes.string.isRequired,
    selectedPerfil: PropTypes.string.isRequired,
    selectedCenefa: PropTypes.string.isRequired,
};

export default DetalleTablas;