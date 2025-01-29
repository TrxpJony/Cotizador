import '../../../css/colosal.css'; // Archivo CSS para estilos
import s3890Image from '../../../img/zinux.png'; // Importar la imagen
import { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf'; // Importamos jsPDF
import preciosData from '../../../api/db.json';
import logo from '../../../../src/img/logo.png'

const Zinux = () => {
    const navigate = useNavigate(); // Inicializar useNavigate
    const [dimensions, setDimensions] = useState({ width: '', height: '' });
    const [accessories, setAccessories] = useState({
        kitCierreZinu: false,
        kitCierreConLlaveZinu: false,
        limitador150Zinu: false,
        limitador220Zinu: false,
        felpa: '',
    });

    const [glassDimensions, setGlassDimensions] = useState({
        glassWidth: '',
        glassHeight: '',
        glassPrice: '',
    });

    const [manodeObraprices, setmanodeObraprices] = useState({
        manodeObraPrice: 0,
    });

    const [prices, setPrices] = useState({});
    const [accessoryPrices, setAccessoryPrices] = useState({});
    const [utilitaryPrices, setUtilitaryPrices] = useState({});
    const [puertas, setPuertas] = useState([]); // Estado para almacenar las puertas agregadas

// Nuevo estado para los precios de la base de datos
const [dbPrices, setDbPrices] = useState({});

// Efecto para cargar los precios de la base de datos
useEffect(() => {
  const fetchPrices = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/precios');
      const data = await response.json();
      
      // Convertir el array de precios a un objeto para fácil acceso
      const pricesObject = data.reduce((acc, item) => {
        acc[item.nombre] = item.precio;
        return acc;
      }, {});
      
      setDbPrices(pricesObject);
    } catch (error) {
      console.error('Error al cargar los precios:', error);
    }
  };

  fetchPrices();
}, []);

    useEffect(() => {
        setPrices(preciosData.precios);
        setAccessoryPrices(preciosData.accesorios);
        setUtilitaryPrices(preciosData.utilitarios);
    }, []);


    // Función que maneja el cambio de valores
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setDimensions((prev) => ({ ...prev, [name]: value }));
        if (type === 'checkbox') {
            setAccessories((prev) => ({ ...prev, [name]: checked }));
        } else if (type === 'radio') {
            // Desmarcar la otra opción cuando se selecciona una nueva
            if (name === 'kitCierreZinu' || name === 'kitCierreConLlaveZinu') {
                setAccessories((prev) => ({
                    ...prev,
                    kitCierreZinu: name === 'kitCierreZinu' ? checked : false,
                    kitCierreConLlaveZinu: name === 'kitCierreConLlaveZinu' ? checked : false,
                }));
            } else if (name === 'limitador150Zinu' || name === 'limitador220Zinu') {
                setAccessories((prev) => ({
                    ...prev,
                    limitador150Zinu: name === 'limitador150Zinu' ? checked : false,
                    limitador220Zinu: name === 'limitador220Zinu' ? checked : false,
                }));
            } else {
                setAccessories((prev) => ({ ...prev, [name]: value }));
            }
        } else {
            setAccessories((prev) => ({ ...prev, [name]: value }));
        }
    };


    const handleGlassChange = (e) => {
        const { name, value } = e.target;
        setGlassDimensions((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlemanodeObraChange = (e) => {
        const { name, value } = e.target;
        setmanodeObraprices((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const { width, height } = dimensions;
    const totalHeight = height ? height : '';
    const totalWidth = width ? width : '';

    const { glassPrice } = glassDimensions;
    const { glassHeight } = glassDimensions;
    const { glassWidth } = glassDimensions;
    const { manodeObraPrice } = manodeObraprices;

    // Calcular valores
    const doubleHeight = totalHeight ? totalHeight * 2 : '';
    const doubleWidth = totalWidth ? totalWidth * 2 : '';
    const marcoPerimetralZinu = doubleHeight && doubleWidth ? (doubleHeight + doubleWidth) : '';
    const area = width && height ? (width * height) / 1000000 : ''; // Convertir a m²
    const empaque3890Height = height && width ? height * 4 : '';
    const empaque3890Width = height && width ? width * 2 : '';
    const felpaHeight = height && width ? height * 6 : '';
    const felpaWidth = height && width ? width * 2 : '';
    const empaque3890Price = (empaque3890Height + empaque3890Width) / 1000 * dbPrices.empaque3890; // Precio total del empaque
    const totFelpa = (felpaHeight + felpaWidth);
    // Calcular precios
    const marcoPerimetralZinuPrice = dbPrices.marcoPerimetralZinu * (marcoPerimetralZinu / 1000);
    const perimetralNaveZinuPrice = dbPrices.perimetralNaveZinu * (marcoPerimetralZinu / 1000);
    const pisaVidrioZinuPrice = dbPrices.pisaVidrioZinu * (marcoPerimetralZinu / 1000);
    const verticalHorizontalesCaZinuPrice = dbPrices.verticalHorizontalesCaZinu * (marcoPerimetralZinu / 1000);
    const kitCierreZinuPrice = accessories.kitCierreZinu ? accessoryPrices.kitCierreZinu : 0;
    const kitCierreConLlaveZinuPrice = accessories.kitCierreConLlaveZinu ? accessoryPrices.kitCierreConLlaveZinu : 0;
    const limitador150ZinuPrice = accessories.limitador150Zinu ? accessoryPrices.limitador150Zinu : 0;
    const limitador220ZinuPrice = accessories.limitador220Zinu ? accessoryPrices.limitador220Zinu : 0;
    const felpaPrice = (felpaHeight + felpaWidth) / 1000 * prices.felpacol; // Precio total de la felpa

    const escuadraEnsambleZinuPrice = accessoryPrices.escuadraEnsambleZinu;
    const escuadraEnsambleHZinuPrice = accessoryPrices.escuadraEnsambleZinu;
    const bisagra2ZinuPrice = accessoryPrices.bisagra2Zinu;
    const cierreHZinuPrice = accessoryPrices.cierreHZinu;
    const soporteHZinuPrice = accessoryPrices.soporteHZinu;

    const tornillosPrice = utilitaryPrices.tornillos * 28;
    const siliconaPrice = utilitaryPrices.silicona * 1;




    const [componentTotals, setComponentTotals] = useState({
        marcoPerimetral: { totalSize: 0, totalPrice: 0 },
        perimetralNave: { totalSize: 0, totalPrice: 0 },
        pisaVidrio: { totalSize: 0, totalPrice: 0 },
        verticalHorizontalesCa: { totalSize: 0, totalPrice: 0 },
        empaque: { totalSize: 0, totalSize2: 0, totalPrice: 0 },
        felpa: { totalSize: 0, totalPrice: 0 },
        tornillos: { cantidad: 0, totalPrice: 0 },
        silicona: { cantidad: 0, totalPrice: 0 },
        escuadraEnsamble: { cantidad: 0, totalPrice: 0 },
        escuadraEnsambleH: { cantidad: 0, totalPrice: 0 },
        bisagra2: { cantidad: 0, totalPrice: 0 },
        cierreH: { cantidad: 0, totalPrice: 0 },
        soporteH: { cantidad: 0, totalPrice: 0 },
        manodeObra: { totalPrice: 0 },
        glass: { totalSize: 0, totalSize2: 0, totalPrice: 0 }
        // Puedes añadir más componentes aquí si es necesario.
    });

    const [accessoryTotals, setAccessoryTotals] = useState({
        kitCierre: { cantidad: 0, totalPrice: 0 },
        kitCierreConLlave: { cantidad: 0, totalPrice: 0 },
        limitador150: { cantidad: 0, totalPrice: 0 },
        limitador220: { cantidad: 0, totalPrice: 0 },
        // Agrega otros accesorios aquí si es necesario.
    });


    const handleAddDoor = () => {
        const nuevaPuerta = {
            dimensions: { ...dimensions },
            accessories: { ...accessories },
            price: totalPrice,
        };

        // Actualizar totales del sillar
        setComponentTotals((prevTotals) => ({
            ...prevTotals,
            marcoPerimetral: {
                totalSize: prevTotals.marcoPerimetral.totalSize + parseFloat(marcoPerimetralZinu), // Sumar tamaño
                totalPrice: prevTotals.marcoPerimetral.totalPrice + marcoPerimetralZinuPrice, // Sumar precio
            },
            perimetralNave: {
                totalSize: prevTotals.perimetralNave.totalSize + parseFloat(marcoPerimetralZinu),
                totalPrice: prevTotals.perimetralNave.totalPrice + perimetralNaveZinuPrice,
            },
            pisaVidrio: {
                totalSize: prevTotals.pisaVidrio.totalSize + parseFloat(marcoPerimetralZinu),
                totalPrice: prevTotals.pisaVidrio.totalPrice + pisaVidrioZinuPrice,
            },
            verticalHorizontalesCa: {
                totalSize: prevTotals.verticalHorizontalesCa.totalSize + parseFloat(marcoPerimetralZinu),
                totalPrice: prevTotals.verticalHorizontalesCa.totalPrice + verticalHorizontalesCaZinuPrice,
            },
            empaque: {
                totalSize: prevTotals.empaque.totalSize + parseFloat(empaque3890Height),
                totalSize2: prevTotals.empaque.totalSize + parseFloat(empaque3890Width),
                totalPrice: prevTotals.empaque.totalPrice + empaque3890Price,
            },
            felpa: {
                totalSize: prevTotals.felpa.totalSize + parseFloat(totFelpa),
                totalPrice: prevTotals.felpa.totalPrice + felpaPrice,
            },
            tornillos: {
                cantidad: prevTotals.tornillos.cantidad + 28,
                totalPrice: prevTotals.tornillos.totalPrice + tornillosPrice,
            },
            silicona: {
                cantidad: prevTotals.silicona.cantidad + 1,
                totalPrice: prevTotals.silicona.totalPrice + siliconaPrice,
            },
            escuadraEnsamble: {
                cantidad: prevTotals.escuadraEnsamble.cantidad + 1,
                totalPrice: prevTotals.escuadraEnsamble.totalPrice + escuadraEnsambleZinuPrice,
            },
            escuadraEnsambleH: {
                cantidad: prevTotals.escuadraEnsambleH.cantidad + 1,
                totalPrice: prevTotals.escuadraEnsambleH.totalPrice + escuadraEnsambleHZinuPrice,
            },
            bisagra2: {
                cantidad: prevTotals.bisagra2.cantidad + 1,
                totalPrice: prevTotals.bisagra2.totalPrice + bisagra2ZinuPrice,
            },
            cierreH: {
                cantidad: prevTotals.cierreH.cantidad + 1,
                totalPrice: prevTotals.cierreH.totalPrice + cierreHZinuPrice,
            },
            soporteH: {
                cantidad: prevTotals.soporteH.cantidad + 1,
                totalPrice: prevTotals.soporteH.totalPrice + soporteHZinuPrice,
            },
            manodeObra: {
                totalPrice: prevTotals.manodeObra.totalPrice + parseFloat(manodeObraPrice),
            },
            glass: {
                totalSize: prevTotals.glass.totalSize + parseFloat(glassHeight),
                totalSize2: prevTotals.glass.totalSize + parseFloat(glassWidth),
                totalPrice: prevTotals.glass.totalPrice + parseFloat(glassPrice),
            }
        }));

        setAccessoryTotals((prevTotals) => ({
            ...prevTotals,
            kitCierre: accessories.kitCierreZinu
                ? {
                    cantidad: prevTotals.kitCierre.cantidad + 1,
                    totalPrice: prevTotals.kitCierre.totalPrice + kitCierreZinuPrice,
                }
                : prevTotals.kitCierre,
            kitCierreConLlave: accessories.kitCierreConLlaveZinu
                ? {
                    cantidad: prevTotals.kitCierreConLlave.cantidad + 1,
                    totalPrice: prevTotals.kitCierreConLlave.totalPrice + kitCierreConLlaveZinuPrice,
                }
                : prevTotals.kitCierreConLlave,
            limitador150: accessories.limitador150Zinu
                ? {
                    cantidad: prevTotals.limitador150.cantidad + 1,
                    totalPrice: prevTotals.limitador150.totalPrice + limitador150ZinuPrice,
                }
                : prevTotals.limitador150,
            limitador220: accessories.limitador220Zinu
                ? {
                    cantidad: prevTotals.limitador220.cantidad + 1,
                    totalPrice: prevTotals.limitador220.totalPrice + limitador220ZinuPrice,
                }
                : prevTotals.limitador220,



            // Añade lógica para otros accesorios si es necesario.
        }));
        setPuertas((prev) => [...prev, nuevaPuerta]);
        setDimensions({ width: '', height: '' }); // Reiniciar dimensiones
        setAccessories({ kitCierrecol: false, kitCierreConLlavecol: false }); // Reiniciar accesorios
        setGlassDimensions({ glassWidth: '', glassHeight: '', glassPrice: '' }); // Reiniciar dimensiones del vidrio
        setmanodeObraprices({ manodeObraPrice: 0 }); // Reiniciar precio de mano de obra
    };

    const totalSum = puertas.reduce((acc, puerta) => acc + puerta.price, 0);
    const totalArea = puertas.reduce(
        (acc, puerta) =>
            acc + (puerta.dimensions.width * puerta.dimensions.height) / 1000000,
        0
    );

    const totalPrice =
        marcoPerimetralZinuPrice +
        perimetralNaveZinuPrice +
        pisaVidrioZinuPrice +
        verticalHorizontalesCaZinuPrice +
        kitCierreZinuPrice +
        kitCierreConLlaveZinuPrice +
        limitador150ZinuPrice +
        limitador220ZinuPrice +
        escuadraEnsambleZinuPrice +
        escuadraEnsambleHZinuPrice +
        bisagra2ZinuPrice +
        cierreHZinuPrice +
        soporteHZinuPrice +
        felpaPrice +
        empaque3890Price +
        tornillosPrice +
        siliconaPrice +
        (glassPrice ? parseFloat(glassPrice) : 0) + // Precio del vidrio
        (manodeObraPrice ? parseFloat(manodeObraPrice) : 0)

    const generatePDF = () => {
        const doc = new jsPDF();
        const cyanBlue = '#00b5e2';
        const lightGray = '#d3d3d3';
        const currentDate = new Date().toLocaleDateString();

        const addTableRow = (doc, y, label, size, price) => {
            doc.text(label, 20, y);
            doc.text(size, 120, y);
            doc.text(price, 170, y);
        };

        const addSection = (doc, title, y) => {
            doc.setFontSize(12);
            doc.setTextColor(cyanBlue);
            doc.text(title, 20, y);
            doc.setFontSize(10);
            doc.setTextColor('black');
        };

        doc.addImage(logo, 'PNG', 20, 10, 40, 20);
        doc.setFontSize(14);
        doc.setTextColor(cyanBlue);
        doc.setFontSize(8);
        doc.setTextColor('black');
        doc.text(`Fecha de creación: ${currentDate}`, 150, 20);
        doc.setFillColor(lightGray);
        doc.rect(20, 30, 170, 8, 'F');
        doc.setTextColor('white');
        doc.setFontSize(10);
        doc.text('Detalle de la cotización Sistema Zinu X', 70, 34);

        addSection(doc, 'Marco', 45);
        addTableRow(doc, 50, 'Marco Perimentral', `${componentTotals.marcoPerimetral.totalSize} mm`, `${componentTotals.marcoPerimetral.totalPrice.toFixed(2)}`);

        addSection(doc, 'Nave', 60);
        addTableRow(doc, 65, 'Perimetral de Nave', `${componentTotals.perimetralNave.totalSize} mm`, `${componentTotals.perimetralNave.totalPrice.toFixed(2)}`);
        addTableRow(doc, 70, 'Pisavidrio:', `${componentTotals.pisaVidrio.totalSize} mm`, `${componentTotals.pisaVidrio.totalPrice.toFixed(2)}`);
        addTableRow(doc, 75, 'Vertical Horizontales Vidrio Camara:', `${componentTotals.verticalHorizontalesCa.totalSize} mm`, `${componentTotals.verticalHorizontalesCa.totalPrice.toFixed(2)}`);


        addSection(doc, 'Accesorios', 85);
        addTableRow(doc, 90, 'Kit Manija Bidireccional con Transmision:', `${accessoryTotals.kitCierre.cantidad}`, `${accessoryTotals.kitCierre.totalPrice.toFixed(2)}`);
        addTableRow(doc, 95, 'Kit Manija Bidireccional con Transmision:', `${accessoryTotals.kitCierreConLlave.cantidad}`, `${accessoryTotals.kitCierreConLlave.totalPrice.toFixed(2)}`);
        addTableRow(doc, 100, 'Limitador De Apertura L = 150:', `${accessoryTotals.limitador150.cantidad}`, `${accessoryTotals.limitador150.totalPrice.toFixed(2)}`);
        addTableRow(doc, 105, 'Limitador De Apertura L = 220:', `${accessoryTotals.limitador220.cantidad}`, `${accessoryTotals.limitador220.totalPrice.toFixed(2)}`);
        addTableRow(doc, 110, 'Escuadra Ensamble Marco Sideral:', `${componentTotals.escuadraEnsamble.cantidad}`, `${componentTotals.escuadraEnsamble.totalPrice.toFixed(2)}`);
        addTableRow(doc, 115, 'Escuadra Ensamble Hoja:', `${componentTotals.escuadraEnsambleH.cantidad}`, `${componentTotals.escuadraEnsambleH.totalPrice.toFixed(2)}`);
        addTableRow(doc, 120, 'Bisagra 2 Aletas Negra 70K:', `${componentTotals.bisagra2.cantidad}`, `${componentTotals.bisagra2.totalPrice.toFixed(2)}`);
        addTableRow(doc, 125, 'Cierre Hojas y Encuentros Regulables:', `${componentTotals.cierreH.cantidad}`, `${componentTotals.cierreH.totalPrice.toFixed(2)}`);
        addTableRow(doc, 130, 'Soporte Compensador de Hoja:', `${componentTotals.soporteH.cantidad}`, `${componentTotals.soporteH.totalPrice.toFixed(2)}`);

        addSection(doc, 'Empaque', 140);
        addTableRow(doc, 145, 'Empaque (Alto):', `${componentTotals.empaque.totalSize} mm`, '');
        addTableRow(doc, 150, 'Empaque (Ancho):', `${componentTotals.empaque.totalSize2} mm`, `${componentTotals.empaque.totalPrice.toFixed(2)}`);
        addTableRow(doc, 155, 'Felpa 5.00 x 7.00:', `${componentTotals.felpa.totalSize} mm`, `${componentTotals.felpa.totalPrice.toFixed(2)}`);

        addSection(doc, 'Utilitarios', 165);
        addTableRow(doc, 170, 'Tornillos:', `${componentTotals.tornillos.cantidad}`, `${componentTotals.tornillos.totalPrice.toFixed(2)}`);
        addTableRow(doc, 175, 'Silicona:', `${componentTotals.silicona.cantidad}`, `${componentTotals.silicona.totalPrice.toFixed(2)}`);

        addSection(doc, 'Extra', 185);
        addTableRow(doc, 190, 'Vidrio (alto):', `${componentTotals.glass.totalSize} mm`, ``);
        addTableRow(doc, 195, 'Vidrio (ancho):', `${componentTotals.glass.totalSize2} mm`, `${Number(componentTotals.glass.totalPrice).toFixed(2)}`);
        addTableRow(doc, 200, 'Mano de Obra:', ``, `${Number(componentTotals.manodeObra.totalPrice).toFixed(2)}`);

        doc.setFontSize(14);
        doc.setTextColor(cyanBlue);
        doc.text('Total', 170, 210);
        doc.setFontSize(16);
        doc.setTextColor('black');
        const formattedTotal = totalSum.toLocaleString('en-US', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        doc.text(formattedTotal, 150, 215);

        doc.setFontSize(14);
        doc.setTextColor(cyanBlue);
        doc.text('Cantidad', 20, 210);
        doc.text(`${puertas.length}`, 20, 215);

        doc.save('Cotizacion-SistemaZinu.pdf');
    };

    const getPriceDisplay = () => {
        if (accessories.kitCierreZinu) {
            return `$${accessoryPrices.kitCierreZinu.toFixed(2)}`;
        } else if (accessories.kitCierreConLlaveZinu) {
            return `$${accessoryPrices.kitCierreConLlaveZinu.toFixed(2)}`;
        }
        return ''; // Si no hay ninguna opción seleccionada, no mostrar precio
    };

    const getLimitadorPrice = () => {
        if (accessories.limitador150Zinu) {
            return `$${accessoryPrices.limitador150Zinu.toFixed(2)}`;
        } else if (accessories.limitador220Zinu) {
            return `$${accessoryPrices.limitador220Zinu.toFixed(2)}`;
        }
        return ''; // Si no hay ninguna opción seleccionada, no mostrar precio
    };


    return (
        <div className="door-container">
            <div className="door-frame">
                {/* Formulario para el alto y ancho */}
                <div className="dimensions-form">
                    <label>
                        Alto (mm):
                        <input
                            type="number"
                            name="height"
                            value={height}
                            onChange={handleChange}
                            placeholder="00"
                        />
                    </label>
                    <label>
                        Ancho (mm):
                        <input
                            type="number"
                            name="width"
                            value={width}
                            onChange={handleChange}
                            placeholder="00"
                        />
                    </label>
                </div>

                {/* Imagen */}
                <img src={s3890Image} alt="Puerta Corrediza Colosal" className="door-image" />

                {/* Dimensiones dinámicas */}
                <div className="dimensions-display">
                    {width && height ? (
                        <>
                            <p>Dimensiones totales: {height} mm (Alto) x {width} mm (Ancho) </p>
                            <p>Área: {area} m²</p>
                        </>
                    ) : (
                        <p>Ingrese las dimensiones en milímetros.</p>
                    )}
                    <br />
                </div>

                <div className="container mx-auto p-4">

                    {/* Resumen de Puertas */}
                    <div className="doors-summary bg-gray-100 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-700 mb-4">Resumen</h2>
                        <ul className="list-disc pl-5 mb-4">
                            {puertas.map((puerta, index) => (
                                <li key={index} className="mb-2 text-gray-600">
                                    <strong>Puerta {index + 1}</strong>: {puerta.dimensions.height} mm x {puerta.dimensions.width} mm -
                                    <span className="text-cyan-600 font-semibold"> ${puerta.price.toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="text-gray-700">
                            <p>
                                <strong>Total:</strong> {puertas.length}
                            </p>
                            <p>
                                <strong>Área Total:</strong> {totalArea.toFixed(2)} m²
                            </p>
                            <p>
                                <strong>Precio Total:</strong>{" "}
                                <span className="text-cyan-600 font-bold">
                                    ${totalSum.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                            </p>
                        </div>
                        <br />
                        <div>
                            <button
                                className="bg-cyan-500 text-white py-2 px-6 rounded-lg font-bold text-lg shadow-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                                onClick={generatePDF}
                            >
                                Cotizar
                            </button>
                        </div>
                    </div>

                    {/* Botón Regresar */}
                    <div className="flex justify-end mt-6">
                        {/* Botón Agregar Puerta */}
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
                <strong><h1>SISTEMA ZINU X</h1></strong>
                <Table aria-label="TABLA MARCO">
                    <TableHeader>
                        <TableColumn><h1>Marco</h1></TableColumn>
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
                            <TableCell><strong>Marco Perimetral:</strong></TableCell>
                            <TableCell>{marcoPerimetralZinu} mm</TableCell>
                            <TableCell>${marcoPerimetralZinuPrice.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <br />

                <Table aria-label="TABLA NAVE">
                    <TableHeader>
                        <TableColumn><h1>Nave</h1></TableColumn>
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
                            <TableCell><strong>Perimetral de nave:</strong></TableCell>
                            <TableCell>{marcoPerimetralZinu} mm</TableCell>
                            <TableCell>${perimetralNaveZinuPrice.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><strong>Pisavidrio:</strong></TableCell>
                            <TableCell>{marcoPerimetralZinu} mm</TableCell>
                            <TableCell>${pisaVidrioZinuPrice.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell><strong>Vertical Horizontales Vidrio Camara:</strong></TableCell>
                            <TableCell>{marcoPerimetralZinu} mm</TableCell>
                            <TableCell>${verticalHorizontalesCaZinuPrice.toFixed(2)}</TableCell>
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
                            <TableCell><input
                                type="radio"
                                name="kitCierreZinu"
                                value="Kit de Cierre"
                                checked={accessories.kitCierreZinu}
                                onChange={handleChange}
                            />
                                Kit Manija Bidireccional con Transmision

                                <br />
                                <input
                                    type="radio"
                                    name="kitCierreConLlaveZinu"
                                    value="Kit de Cierre con Llave"
                                    checked={accessories.kitCierreConLlaveZinu}
                                    onChange={handleChange}
                                />
                                Kit Manija Bidireccional con Transmision con Llave
                            </TableCell>
                            <TableCell>$ {getPriceDisplay()}</TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell><input
                                type="radio"
                                name="limitador150Zinu"
                                value="Limitador De Apertura L = 150"
                                checked={accessories.limitador150Zinu}
                                onChange={handleChange}
                            />
                                Limitador De Apertura L = 150

                                <br />
                                <input
                                    type="radio"
                                    name="limitador220Zinu"
                                    value="Limitador De Apertura L = 220"
                                    checked={accessories.limitador220Zinu}
                                    onChange={handleChange}
                                />
                                Limitador De Apertura L = 220
                            </TableCell>
                            <TableCell>$ {getLimitadorPrice()}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell>Escuadra Ensamble Marco Sideral:</TableCell>
                            <TableCell>$ {escuadraEnsambleZinuPrice}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell>Escuadra Ensamble Hoja:</TableCell>
                            <TableCell>$ {escuadraEnsambleHZinuPrice}</TableCell>
                        </TableRow>
                        <TableRow key="5">
                            <TableCell>Bisagra 2 Aletas Negra 70K:</TableCell>
                            <TableCell>$ {bisagra2ZinuPrice}</TableCell>
                        </TableRow>
                        <TableRow key="6">
                            <TableCell>Cierre Hojas y Encuentros Regulables:</TableCell>
                            <TableCell>$ {cierreHZinuPrice}</TableCell>
                        </TableRow>
                        <TableRow key="7">
                            <TableCell>Soporte Compensador de Hoja:</TableCell>
                            <TableCell>$ {soporteHZinuPrice}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <br />
                <Table aria-label="tabla utilitarios">
                    <TableHeader>
                        <TableColumn><h1>Utilitarios</h1></TableColumn>
                        <TableColumn></TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell><strong><h2>Pieza</h2></strong></TableCell>
                            <TableCell><strong><h2>Precio</h2></strong></TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell>
                                <strong> Tornillos (28)</strong>
                            </TableCell>
                            <TableCell>$ {tornillosPrice.toFixed(2)}</TableCell>
                        </TableRow>

                        <TableRow key="3">
                            <TableCell>
                                <strong> Silicona</strong>
                            </TableCell>
                            <TableCell>$ {siliconaPrice.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <br />
                <Table aria-label="TABLA EMPAQUE">
                    <TableHeader>
                        <TableColumn><h1>Empaque</h1></TableColumn>
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
                            <TableCell><strong>Empaque (Alto):
                                <br />
                                Empaque (Ancho): </strong></TableCell>
                            <TableCell>{empaque3890Height} mm
                                <br /> {empaque3890Width} mm
                            </TableCell>
                            <TableCell>${empaque3890Price.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><strong>Felpa 5.00 x 7.00:</strong></TableCell>
                            <TableCell>{totFelpa} mm</TableCell>
                            <TableCell>${felpaPrice.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <br />

                <Table aria-label="Tabla Vidrio">
                    <TableHeader>
                        <TableColumn><h1>Vidrio - Mano de Obra</h1></TableColumn>
                        <TableColumn></TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell><strong><h2>Vidrio</h2></strong></TableCell>
                            <TableCell><strong><h2>Precio</h2></strong></TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell>
                                <input
                                    type="number"
                                    name="glassHeight"
                                    value={glassDimensions.glassHeight}
                                    placeholder="Alto Vidrio en mm"
                                    onChange={handleGlassChange}
                                />
                                <input
                                    type="number"
                                    name="glassWidth"
                                    value={glassDimensions.glassWidth}
                                    placeholder="Ancho Vidrio en mm"
                                    onChange={handleGlassChange}
                                />
                            </TableCell>
                            <TableCell>
                                <input
                                    type="number"
                                    name="glassPrice"
                                    value={glassDimensions.glassPrice || ''}
                                    placeholder="Precio del vidrio"
                                    onChange={handleGlassChange}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><strong><h2>Mano de Obra</h2></strong></TableCell>
                            <TableCell><strong><h2>Precio</h2></strong></TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell><strong>Área: {area} m²</strong></TableCell>
                            <TableCell>
                                <input
                                    type="number"
                                    name="manodeObraPrice"
                                    value={manodeObraprices.manodeObraPrice || ''}
                                    placeholder="Precio del vidrio"
                                    onChange={handlemanodeObraChange}
                                /></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <h2 className="text-right text-2xl font-bold">Total</h2>
                <div className="flex justify-between items-center">
                    <button
                        onClick={handleAddDoor}
                        className="bg-cyan-500 text-white py-2 px-6 rounded-lg font-bold text-lg shadow-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                    >
                        Agregar
                    </button>
                    <h2 className="text-right text-4xl font-bold">${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                </div>

            </div>
        </div>


    );
};

export default Zinux;
