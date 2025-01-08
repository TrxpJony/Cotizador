import '../../../css/colosal.css'; // Archivo CSS para estilos
import sTaironaImage from '../../../img/Zinux.png'; // Importar la imagen
import { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf'; // Importamos jsPDF
import preciosData from '../../../api/db.json';
import logo from '../../../../src/img/logo.png'

const Taironax = () => {
    const navigate = useNavigate(); // Inicializar useNavigate
    const [dimensions, setDimensions] = useState({ width: '', height: '' });
    const [accessories, setAccessories] = useState({
        kitCierreTairona: false,
        kitCierreConLlaveTairona: false,
        limitador150Tairona: false,
        limitador220Tairona: false,
        felpa: '',
    });

    const [glassDimensions, setGlassDimensions] = useState({
        glassWidth: '',
        glassHeight: '',
        glassPrice: '',
    });


    const [prices, setPrices] = useState({});
    const [accessoryPrices, setAccessoryPrices] = useState({});
    const [utilitaryPrices, setUtilitaryPrices] = useState({});
    const [puertas, setPuertas] = useState([]); // Estado para almacenar las puertas agregadas


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
          if (name === 'kitCierreTairona' || name === 'kitCierreConLlaveTairona') {
            setAccessories((prev) => ({
              ...prev,
              kitCierreTairona: name === 'kitCierreTairona' ? checked : false,
              kitCierreConLlaveTairona: name === 'kitCierreConLlaveTairona' ? checked : false,
            }));
          } else if (name === 'limitador150Tairona' || name === 'limitador220Tairona') {
            setAccessories((prev) => ({
              ...prev,
              limitador150Tairona: name === 'limitador150Tairona' ? checked : false,
              limitador220Tairona: name === 'limitador220Tairona' ? checked : false,
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


    const { width, height } = dimensions;
    const totalHeight = height ? height : '';
    const totalWidth = width ? width : '';

    const { glassPrice } = glassDimensions;

    // Calcular valores
    const doubleHeight = totalHeight ? totalHeight * 2 : '';
    const doubleWidth = totalWidth ? totalWidth * 2 : '';
    const marcoPerimetralTairona = doubleHeight && doubleWidth ? (doubleHeight + doubleWidth) : '';
    const area = width && height ? (width * height) / 1000000 : ''; // Convertir a m²
    const empaqueTaironaHeight = height && width ? height * 4 : '';
    const empaqueTaironaWidth = height && width ? width * 2 : '';
    const felpaHeight = height && width ? height * 6 : '';
    const felpaWidth = height && width ? width * 2 : '';
    const empaqueTaironaPrice = (empaqueTaironaHeight + empaqueTaironaWidth) / 1000 * prices.empaqueTairona; // Precio total del empaque
    const totFelpa = (felpaHeight + felpaWidth);
    // Calcular precios
    const marcoPerimetralTaironaPrice = prices.marcoPerimetralTairona * (marcoPerimetralTairona / 1000);
    const perimetralNaveTaironaPrice = prices.perimetralNaveTairona * (marcoPerimetralTairona / 1000);
    const pisaVidrioTaironaPrice = prices.pisaVidrioTairona * (marcoPerimetralTairona / 1000);
    const verticalHorizontalesCaTaironaPrice = prices.verticalHorizontalesCaTairona * (marcoPerimetralTairona / 1000);
    const kitCierreTaironaPrice = accessories.kitCierreTairona ? accessoryPrices.kitCierreTairona : 0;
    const kitCierreConLlaveTaironaPrice = accessories.kitCierreConLlaveTairona ? accessoryPrices.kitCierreConLlaveTairona : 0;
    const limitador150TaironaPrice = accessories.limitador150Tairona ? accessoryPrices.limitador150Tairona : 0;
    const limitador220TaironaPrice = accessories.limitador220Tairona ? accessoryPrices.limitador220Tairona : 0;
    const felpaPrice = (felpaHeight + felpaWidth) / 1000 * prices.felpacol; // Precio total de la felpa
    const manodeObraPrice = prices.manodeObra * area;

    const escuadraEnsambleTaironaPrice = accessoryPrices.escuadraEnsambleTairona;
    const escuadraEnsambleHTaironaPrice = accessoryPrices.escuadraEnsambleTairona;
    const bisagra2TaironaPrice = accessoryPrices.bisagra2Tairona;
    const bisagra3TaironaPrice = accessoryPrices.bisagra3Tairona;
    const bisagraOcultaTaironaPrice = accessoryPrices.bisagraOcultaTairona;

    const cierreHTaironaPrice = accessoryPrices.cierreHTairona;
    const soporteHTaironaPrice = accessoryPrices.soporteHTairona;

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
        bisagra3: { cantidad: 0, totalPrice: 0 },
        bisagraOculta: { cantidad: 0, totalPrice: 0 },
        cierreH: { cantidad: 0, totalPrice: 0 },
        soporteH: { cantidad: 0, totalPrice: 0 },

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
                totalSize: prevTotals.marcoPerimetral.totalSize + parseFloat(marcoPerimetralTairona), // Sumar tamaño
                totalPrice: prevTotals.marcoPerimetral.totalPrice + marcoPerimetralTaironaPrice, // Sumar precio
            },
            perimetralNave: {
                totalSize: prevTotals.perimetralNave.totalSize + parseFloat(marcoPerimetralTairona),
                totalPrice: prevTotals.perimetralNave.totalPrice + perimetralNaveTaironaPrice,
            },
            pisaVidrio: {
                totalSize: prevTotals.pisaVidrio.totalSize + parseFloat(marcoPerimetralTairona),
                totalPrice: prevTotals.pisaVidrio.totalPrice + pisaVidrioTaironaPrice,
            },
            verticalHorizontalesCa: {
                totalSize: prevTotals.verticalHorizontalesCa.totalSize + parseFloat(marcoPerimetralTairona),
                totalPrice: prevTotals.verticalHorizontalesCa.totalPrice + verticalHorizontalesCaTaironaPrice,
            },
            empaque: {
                totalSize: prevTotals.empaque.totalSize + parseFloat(empaqueTaironaHeight),
                totalSize2: prevTotals.empaque.totalSize + parseFloat(empaqueTaironaWidth),
                totalPrice: prevTotals.empaque.totalPrice + empaqueTaironaPrice,
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
                totalPrice: prevTotals.escuadraEnsamble.totalPrice + escuadraEnsambleTaironaPrice,
            },
            escuadraEnsambleH: {
                cantidad: prevTotals.escuadraEnsambleH.cantidad + 1,
                totalPrice: prevTotals.escuadraEnsambleH.totalPrice + escuadraEnsambleHTaironaPrice,
            },
            bisagra2: {
                cantidad: prevTotals.bisagra2.cantidad + 1,
                totalPrice: prevTotals.bisagra2.totalPrice + bisagra2TaironaPrice,
            },
            bisagra3: {
                cantidad: prevTotals.bisagra3.cantidad + 1,
                totalPrice: prevTotals.bisagra3.totalPrice + bisagra3TaironaPrice,
            },
            bisagraOculta: {
                cantidad: prevTotals.bisagraOculta.cantidad + 1,
                totalPrice: prevTotals.bisagraOculta.totalPrice + bisagraOcultaTaironaPrice,
            },
            cierreH: {
                cantidad: prevTotals.cierreH.cantidad + 1,
                totalPrice: prevTotals.cierreH.totalPrice + cierreHTaironaPrice,
            },
            soporteH: {
                cantidad: prevTotals.soporteH.cantidad + 1,
                totalPrice: prevTotals.soporteH.totalPrice + soporteHTaironaPrice,
            },

        }));

        setAccessoryTotals((prevTotals) => ({
            ...prevTotals,
            kitCierre: accessories.kitCierreTairona
                ? {
                    cantidad: prevTotals.kitCierre.cantidad + 1,
                    totalPrice: prevTotals.kitCierre.totalPrice + kitCierreTaironaPrice,
                }
                : prevTotals.kitCierre,
            kitCierreConLlave: accessories.kitCierreConLlaveTairona
                ? {
                    cantidad: prevTotals.kitCierreConLlave.cantidad + 1,
                    totalPrice: prevTotals.kitCierreConLlave.totalPrice + kitCierreConLlaveTaironaPrice,
                }
                : prevTotals.kitCierreConLlave,
            limitador150: accessories.limitador150Tairona
                ? {
                    cantidad: prevTotals.limitador150.cantidad + 1,
                    totalPrice: prevTotals.limitador150.totalPrice + limitador150TaironaPrice,
                }
                : prevTotals.limitador150,
            limitador220: accessories.limitador220Tairona
                ? {
                    cantidad: prevTotals.limitador220.cantidad + 1,
                    totalPrice: prevTotals.limitador220.totalPrice + limitador220TaironaPrice,
                }
                : prevTotals.limitador220,
        


            // Añade lógica para otros accesorios si es necesario.
        }));


        setPuertas((prev) => [...prev, nuevaPuerta]);
        setDimensions({ width: '', height: '' }); // Reiniciar dimensiones
        setAccessories({ kitCierreTairona: false, kitCierreConLlaveTairona: false, enchape: false }); // Reiniciar accesorios
    };

    const totalSum = puertas.reduce((acc, puerta) => acc + puerta.price, 0);
    const totalArea = puertas.reduce(
        (acc, puerta) =>
            acc + (puerta.dimensions.width * puerta.dimensions.height) / 1000000,
        0
    );

    const totalPrice =
        marcoPerimetralTaironaPrice +
        perimetralNaveTaironaPrice +
        pisaVidrioTaironaPrice +
        verticalHorizontalesCaTaironaPrice +
        kitCierreTaironaPrice +
        kitCierreConLlaveTaironaPrice +
        limitador150TaironaPrice +
        limitador220TaironaPrice +
        escuadraEnsambleTaironaPrice +
        escuadraEnsambleHTaironaPrice +
        bisagra2TaironaPrice +
        bisagra3TaironaPrice +
        bisagraOcultaTaironaPrice +
        cierreHTaironaPrice +
        soporteHTaironaPrice +
        felpaPrice +
        empaqueTaironaPrice +
        tornillosPrice +
        siliconaPrice +
        (glassPrice ? parseFloat(glassPrice) : 0); // Precio del vidrio

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
        doc.text('Detalle de la cotización Sistema Tairona X', 70, 34);

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
        addTableRow(doc, 120, 'Bisagra 2 Aletas Regulable Negra 120K:', `${componentTotals.bisagra2.cantidad}`, `${componentTotals.bisagra2.totalPrice.toFixed(2)}`);
        addTableRow(doc, 125, 'Bisagra 3 Aletas Negra 90K', `${componentTotals.bisagra3.cantidad}`, `${componentTotals.bisagra3.totalPrice.toFixed(2)}`);
        addTableRow(doc, 130, 'Bisagra Oculta de Ajuste', `${componentTotals.bisagraOculta.cantidad}`, `${componentTotals.bisagraOculta.totalPrice.toFixed(2)}`);
        addTableRow(doc, 135, 'Cierre Hojas y Encuentros Regulables:', `${componentTotals.cierreH.cantidad}`, `${componentTotals.cierreH.totalPrice.toFixed(2)}`);
        addTableRow(doc, 140, 'Soporte Compensador de Hoja:', `${componentTotals.soporteH.cantidad}`, `${componentTotals.soporteH.totalPrice.toFixed(2)}`);

        addSection(doc, 'Empaque',150);
        addTableRow(doc, 155, 'Empaque (Alto):', `${componentTotals.empaque.totalSize} mm`, '');
        addTableRow(doc, 160, 'Empaque (Ancho):', `${componentTotals.empaque.totalSize2} mm`, `${componentTotals.empaque.totalPrice.toFixed(2)}`);
        addTableRow(doc, 165, 'Felpa 5.00 x 7.00:', `${componentTotals.felpa.totalSize} mm`, `${componentTotals.felpa.totalPrice.toFixed(2)}`);

        addSection(doc, 'Utilitarios', 175);
        addTableRow(doc, 180, 'Tornillos:', `${componentTotals.tornillos.cantidad}`, `${componentTotals.tornillos.totalPrice.toFixed(2)}`);
        addTableRow(doc, 185, 'Silicona:', `${componentTotals.silicona.cantidad}`, `${componentTotals.silicona.totalPrice.toFixed(2)}`);

        doc.setFontSize(14);
        doc.setTextColor(cyanBlue);
        doc.text('Total', 170, 190);
        doc.setFontSize(16);
        doc.setTextColor('black');
        const formattedTotal = totalSum.toLocaleString('en-US', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        doc.text(formattedTotal, 150, 195);

        doc.setFontSize(14);
        doc.setTextColor(cyanBlue);
        doc.text('Cantidad de puertas', 20, 190);
        doc.text(`${puertas.length}`, 20, 195);

        doc.save('Cotizacion-SistemaTairona.pdf');
    };

    const getPriceDisplay = () => {
        if (accessories.kitCierreTairona) {
            return `$${accessoryPrices.kitCierreTairona.toFixed(2)}`;
        } else if (accessories.kitCierreConLlaveTairona) {
            return `$${accessoryPrices.kitCierreConLlaveTairona.toFixed(2)}`;
        }
        return ''; // Si no hay ninguna opción seleccionada, no mostrar precio
    };

    const getLimitadorPrice = () => {
        if (accessories.limitador150Tairona) {
            return `$${accessoryPrices.limitador150Tairona.toFixed(2)}`;
        } else if (accessories.limitador220Tairona) {
            return `$${accessoryPrices.limitador220Tairona.toFixed(2)}`;
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
                <img src={sTaironaImage} alt="Puerta Corrediza Colosal" className="door-image" />

                {/* Dimensiones dinámicas */}
                <div className="dimensions-display">
                    {width && height ? (
                        <>
                            <p>Dimensiones totales: {height} mm (Alto) x {width} mm (Ancho) </p>
                            <p>Área: {area} m²</p>
                        </>
                    ) : (
                        <p>Ingrese las dimensiones de la puerta en milímetros.</p>
                    )}
                    <br />
                </div>

                <div className="container mx-auto p-4">
                    {/* Botón Agregar Puerta */}
                    <div className="flex justify-center mb-6">
                        <button
                            onClick={handleAddDoor}
                            className="bg-cyan-500 text-white py-2 px-6 rounded-lg font-bold text-lg shadow-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                        >
                            Agregar Puerta
                        </button>
                    </div>

                    {/* Resumen de Puertas */}
                    <div className="doors-summary bg-gray-100 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-700 mb-4">Resumen de Puertas</h2>
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
                                <strong>Total Puertas:</strong> {puertas.length}
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
                    </div>

                    {/* Botón Regresar */}
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-gray-500 text-white py-2 px-6 rounded-lg font-bold text-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                        >
                            Regresar
                        </button>
                    </div>
                </div>

            </div>
            <br />
            {/* Lista de partes */}
            <div className="parts-list">
                <strong><h1>SISTEMA TAIRONA X</h1></strong>
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
                            <TableCell>{marcoPerimetralTairona} mm</TableCell>
                            <TableCell>${marcoPerimetralTaironaPrice.toFixed(2)}</TableCell>
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
                            <TableCell>{marcoPerimetralTairona} mm</TableCell>
                            <TableCell>${perimetralNaveTaironaPrice.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><strong>Pisavidrio:</strong></TableCell>
                            <TableCell>{marcoPerimetralTairona} mm</TableCell>
                            <TableCell>${pisaVidrioTaironaPrice.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell><strong>Vertical Horizontales Vidrio Camara:</strong></TableCell>
                            <TableCell>{marcoPerimetralTairona} mm</TableCell>
                            <TableCell>${verticalHorizontalesCaTaironaPrice.toFixed(2)}</TableCell>
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
                                name="kitCierreTairona"
                                value="Kit de Cierre"
                                checked={accessories.kitCierreTairona}
                                onChange={handleChange}
                            />
                                Kit Manija Bidireccional con Transmision

                                <br />
                                <input
                                    type="radio"
                                    name="kitCierreConLlaveTairona"
                                    value="Kit de Cierre con Llave"
                                    checked={accessories.kitCierreConLlaveTairona}
                                    onChange={handleChange}
                                />
                                Kit Manija Bidireccional con Transmision con Llave
                            </TableCell>
                            <TableCell>$ {getPriceDisplay()}</TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell><input
                                type="radio"
                                name="limitador150Tairona"
                                value="Limitador De Apertura L = 150"
                                checked={accessories.limitador150Tairona}
                                onChange={handleChange}
                            />
                                Limitador De Apertura L = 150

                                <br />
                                <input
                                    type="radio"
                                    name="limitador220Tairona"
                                    value="Limitador De Apertura L = 220"
                                    checked={accessories.limitador220Tairona}
                                    onChange={handleChange}
                                />
                                Limitador De Apertura L = 220
                            </TableCell>
                            <TableCell>$ {getLimitadorPrice()}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell>Escuadra Ensamble Marco Sideral:</TableCell>
                            <TableCell>$ {escuadraEnsambleTaironaPrice}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell>Escuadra Ensamble Hoja:</TableCell>
                            <TableCell>$ {escuadraEnsambleHTaironaPrice}</TableCell>
                        </TableRow>
                        <TableRow key="5">
                            <TableCell>Bisagra 2 Aletas Regulable Negra 120K:</TableCell>
                            <TableCell>$ {bisagra2TaironaPrice}</TableCell>
                        </TableRow>
                        <TableRow key="6">
                            <TableCell>Bisagra 3 Aletas Negra 90K:</TableCell>
                            <TableCell>$ {bisagra3TaironaPrice}</TableCell>
                        </TableRow>
                        <TableRow key="7">
                            <TableCell>Bisagra Oculta de Ajuste:</TableCell>
                            <TableCell>$ {bisagraOcultaTaironaPrice}</TableCell>
                        </TableRow>
                        <TableRow key="8">
                            <TableCell>Cierre Hojas y Encuentros Regulables:</TableCell>
                            <TableCell>$ {cierreHTaironaPrice}</TableCell>
                        </TableRow>
                        <TableRow key="9">
                            <TableCell>Soporte Compensador de Hoja:</TableCell>
                            <TableCell>$ {soporteHTaironaPrice}</TableCell>
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
                            <TableCell>{empaqueTaironaHeight} mm
                                <br /> {empaqueTaironaWidth} mm
                            </TableCell>
                            <TableCell>${empaqueTaironaPrice.toFixed(2)}</TableCell>
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
                            <TableCell>${manodeObraPrice.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>


                <h2 className="text-right text-2xl font-bold">Total</h2>
                <div className="flex justify-between items-center">
                    <button
                        className="bg-[#00bcd4] text-white text-[1.8em] font-bold py-2 px-6 rounded-lg hover:bg-[#0097a7] focus:outline-none transition duration-300"
                        onClick={generatePDF}
                    >
                        Cotizar
                    </button>
                    <h2 className="text-right text-4xl font-bold">${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                </div>


            </div>
        </div>

    );
};

export default Taironax;
