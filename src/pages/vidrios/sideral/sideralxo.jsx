import '../../../css/colosal.css'; // Archivo CSS para estilos
import sideralImage from '../../../img/sideralxo.png'; // Importar la imagen
import { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf'; // Importamos jsPDF
import preciosData from '../../../api/db.json';
import logo from '../../../../src/img/logo.png'

const Sideralxo = () => {
    const navigate = useNavigate(); // Inicializar useNavigate
    const [dimensions, setDimensions] = useState({ width: '', height: '' });
    const [accessories, setAccessories] = useState({
        kitManijaDobleSid: false,
        kitCierreConLlave3890: false,
        bisagra2Sid: false,
        bisagra3Sid: false,
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
            if (name === 'kitManijaDobleSid' || name === 'kitCierreConLlave3890') {
                setAccessories((prev) => ({
                    ...prev,
                    kitManijaDobleSid: name === 'kitManijaDobleSid' ? checked : false,
                    kitCierreConLlave3890: name === 'kitCierreConLlave3890' ? checked : false,
                }));
            } else if (name === 'bisagra2Sid' || name === 'bisagra3Sid') {
                setAccessories((prev) => ({
                    ...prev,
                    bisagra2Sid: name === 'bisagra2Sid' ? checked : false,
                    bisagra3Sid: name === 'bisagra3Sid' ? checked : false,
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
    const cuadHeight = totalHeight ? totalHeight * 4 : '';
    const cuadWidth =totalWidth ? totalWidth * 4 : '';
    const marcoPerimetralSid = totalWidth && doubleHeight ? (parseInt(totalWidth) + parseInt(doubleHeight)) : '';
    const area = width && height ? (width * height) / 1000000 : ''; // Convertir a m²
    const empaqueSidHeight = height && width ? height * 4 : '';
    const empaqueSidWidth = height && width ? width * 2 : '';
    const felpaHeight = height && width ? height * 6 : '';
    const felpaWidth = height && width ? width * 2 : '';
    const empaqueSidPrice = (empaqueSidHeight + empaqueSidWidth) / 1000 * prices.empaqueSid; // Precio total del empaque
    const totFelpa = (felpaHeight + felpaWidth);
    // Calcular precios
    const marcoPerimetralSidPrice = prices.marcoPerimetralSid * (marcoPerimetralSid / 1000);
    const horizontalFelperosSidPrice = prices.horizontalFelperosSid * (cuadWidth / 1000);
    const verticalSidPrice = prices.verticalSid * (cuadHeight / 1000);
    const verticalReforzadoSidPrice = prices.verticalReforzadoSid * (cuadHeight / 1000);
    const adaptadorSidPrice = prices.adaptadorSid * (totalHeight/1000)

    const kitManijaDobleSidPrice = accessories.kitManijaDobleSid ? accessoryPrices.kitManijaDobleSid : 0;
    const kitCierreConLlave3890Price = accessories.kitCierreConLlave3890 ? accessoryPrices.kitCierreConLlave3890 : 0;
    const bisagra2SidPrice = accessories.bisagra2Sid ? accessoryPrices.bisagra2Sid : 0;
    const bisagra3SidPrice = accessories.bisagra3Sid ? accessoryPrices.bisagra3Sid : 0;
    const felpaPrice = (felpaHeight + felpaWidth) / 1000 * prices.felpacol; // Precio total de la felpa
    const manodeObraPrice = prices.manodeObra * area;
    const escuadraEnsambleSidPrice = accessoryPrices.escuadraEnsambleSid;
    const escuadraEnsambleMSidPrice = accessoryPrices.escuadraEnsambleMSid;

    const tornillosPrice = utilitaryPrices.tornillos * 28;
    const siliconaPrice = utilitaryPrices.silicona * 1;

    const [componentTotals, setComponentTotals] = useState({
        marcoPerimetral: { totalSize: 0, totalPrice: 0 },
        horizontalFelperos: { totalSize: 0, totalPrice: 0 },
        vertical: { totalSize: 0, totalPrice: 0 },
        verticalReforzado: { totalSize: 0, totalPrice: 0 },
        adaptador: {totalSize: 0, totalPrice:0 },
        empaque: { totalSize: 0, totalSize2: 0, totalPrice: 0 },
        felpa: { totalSize: 0, totalPrice: 0 },
        escuadraEnsamble: { cantidad: 0, totalPrice: 0 },
        escuadraEnsambleM: { cantidad: 0, totalPrice: 0 },
        tornillos: { cantidad: 0, totalPrice: 0 },
        silicona: { cantidad: 0, totalPrice: 0 },
        // Puedes añadir más componentes aquí si es necesario.
    });

    const [accessoryTotals, setAccessoryTotals] = useState({
        kitCierre: { cantidad: 0, totalPrice: 0 },
        kitCierreConLlave: { cantidad: 0, totalPrice: 0 },
        bisagra2: { cantidad: 0, totalPrice: 0 },
        bisagra3: { cantidad: 0, totalPrice: 0 },
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
                totalSize: prevTotals.marcoPerimetral.totalSize + parseFloat(marcoPerimetralSid),
                totalPrice: prevTotals.marcoPerimetral.totalPrice + marcoPerimetralSidPrice,
            },
            horizontalFelperos: {
                totalSize: prevTotals.horizontalFelperos.totalSize + parseFloat(cuadWidth),
                totalPrice: prevTotals.horizontalFelperos.totalPrice + horizontalFelperosSidPrice,
            },
            vertical: {
                totalSize: prevTotals.vertical.totalSize + parseFloat(cuadHeight),
                totalPrice: prevTotals.vertical.totalPrice + verticalSidPrice,
            },
            verticalReforzado: {
                totalSize: prevTotals.verticalReforzado.totalSize + parseFloat(cuadHeight),
                totalPrice: prevTotals.verticalReforzado.totalPrice + verticalReforzadoSidPrice,
            },
            adaptador: {
                totalSize: prevTotals.adaptador.totalSize + parseFloat(totalHeight),
                totalPrice: prevTotals.adaptador.totalPrice + adaptadorSidPrice
            },
            empaque: {
                totalSize: prevTotals.empaque.totalSize + parseFloat(empaqueSidHeight),
                totalSize2: prevTotals.empaque.totalSize + parseFloat(empaqueSidWidth),
                totalPrice: prevTotals.empaque.totalPrice + empaqueSidPrice,
            },
            felpa: {
                totalSize: prevTotals.felpa.totalSize + parseFloat(totFelpa),
                totalPrice: prevTotals.felpa.totalPrice + felpaPrice,
            },
            escuadraEnsamble: {
                cantidad: prevTotals.escuadraEnsamble.cantidad + 1,
                totalPrice: prevTotals.escuadraEnsamble.totalPrice + escuadraEnsambleSidPrice,
            },
            escuadraEnsambleM: {
                cantidad: prevTotals.escuadraEnsambleM.cantidad + 1,
                totalPrice: prevTotals.escuadraEnsambleM.totalPrice + escuadraEnsambleMSidPrice,
            },
            tornillos: {
                cantidad: prevTotals.tornillos.cantidad + 28,
                totalPrice: prevTotals.tornillos.totalPrice + tornillosPrice,
            },
            silicona: {
                cantidad: prevTotals.silicona.cantidad + 1,
                totalPrice: prevTotals.silicona.totalPrice + siliconaPrice,
            },

        }));

        setAccessoryTotals((prevTotals) => ({
            ...prevTotals,
            kitCierre: accessories.kitManijaDobleSid
                ? {
                    cantidad: prevTotals.kitCierre.cantidad + 1,
                    totalPrice: prevTotals.kitCierre.totalPrice + kitManijaDobleSidPrice,
                }
                : prevTotals.kitCierre,
            kitCierreConLlave: accessories.kitCierreConLlave3890
                ? {
                    cantidad: prevTotals.kitCierreConLlave.cantidad + 1,
                    totalPrice: prevTotals.kitCierreConLlave.totalPrice + kitCierreConLlave3890Price,
                }
                : prevTotals.kitCierreConLlave,
            bisagra2: accessories.bisagra2Sid
                ? {
                    cantidad: prevTotals.bisagra2.cantidad + 1,
                    totalPrice: prevTotals.bisagra2.totalPrice + bisagra2SidPrice,
                }
                : prevTotals.bisagra2,
            bisagra3: accessories.bisagra3Sid
                ? {
                    cantidad: prevTotals.bisagra3.cantidad + 1,
                    totalPrice: prevTotals.bisagra3.totalPrice + bisagra3SidPrice,
                }
                : prevTotals.bisagra3,
            // Añade lógica para otros accesorios si es necesario.
        }));


        setPuertas((prev) => [...prev, nuevaPuerta]);
        setDimensions({ width: '', height: '' }); // Reiniciar dimensiones
        setAccessories({ kitManijaDobleSid: false, kitCierreConLlave3890: false, enchape: false }); // Reiniciar accesorios
    };

    const totalSum = puertas.reduce((acc, puerta) => acc + puerta.price, 0);
    const totalArea = puertas.reduce(
        (acc, puerta) =>
            acc + (puerta.dimensions.width * puerta.dimensions.height) / 1000000,
        0
    );

    const totalPrice =
        marcoPerimetralSidPrice +
        horizontalFelperosSidPrice +
        verticalSidPrice +
        verticalReforzadoSidPrice +
        adaptadorSidPrice +
        kitManijaDobleSidPrice +
        kitCierreConLlave3890Price +
        bisagra2SidPrice +
        bisagra3SidPrice +
        felpaPrice +
        empaqueSidPrice +
        escuadraEnsambleMSidPrice +
        escuadraEnsambleSidPrice +
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
        doc.text('Detalle de la cotización Sistema 3890 X', 70, 34);

        addSection(doc, 'Marco', 45);
        addTableRow(doc, 50, 'Marco Perimetral Sideral:', `${componentTotals.marcoPerimetral.totalSize} mm`, `${componentTotals.marcoPerimetral.totalPrice.toFixed(2)}`);

        addSection(doc, 'Nave', 60);
        addTableRow(doc, 65, 'Horizontal con Felperos:', `${componentTotals.horizontalFelperos.totalSize} mm`, `${componentTotals.horizontalFelperos.totalPrice.toFixed(2)}`);
        addTableRow(doc, 70, 'Vertical:', `${componentTotals.vertical.totalSize} mm`, `${componentTotals.vertical.totalPrice.toFixed(2)}`);
        addTableRow(doc, 75, 'Vertical Reforzado:', `${componentTotals.verticalReforzado.totalSize} mm`, `${componentTotals.verticalReforzado.totalPrice.toFixed(2)}`);
        addTableRow(doc, 80, 'Adaptador:', `${componentTotals.adaptador.totalSize} mm`, `${componentTotals.adaptador.totalPrice.toFixed(2)}`);

        addSection(doc, 'Accesorios', 85);
        addTableRow(doc, 90, 'Kit Manija Doble Bidireccional con Bloqueo:', `${accessoryTotals.kitCierre.cantidad}`, `${accessoryTotals.kitCierre.totalPrice.toFixed(2)}`);
        addTableRow(doc, 95, 'Bisagra 2 Aletas Negra para 70K:', `${accessoryTotals.bisagra2.cantidad}`, `${accessoryTotals.bisagra2.totalPrice.toFixed(2)}`);
        addTableRow(doc, 100, 'Bisagra 3 Aletas para 90K:', `${accessoryTotals.bisagra3.cantidad}`, `${accessoryTotals.bisagra3.totalPrice.toFixed(2)}`);
        addTableRow(doc, 105, 'Escuadra Ensamble Marco:', `${componentTotals.escuadraEnsamble.cantidad}`, `${componentTotals.escuadraEnsamble.totalPrice.toFixed(2)}`);
        addTableRow(doc, 110, 'Escuadra Ensamble Marco Sideral 2.4:', `${componentTotals.escuadraEnsambleM.cantidad}`, `${componentTotals.escuadraEnsambleM.totalPrice.toFixed(2)}`);

        addSection(doc, 'Empaque', 120);
        addTableRow(doc, 125, 'Empaque (Alto):', `${componentTotals.empaque.totalSize} mm`, '');
        addTableRow(doc, 130, 'Empaque (Ancho):', `${componentTotals.empaque.totalSize2} mm`, `${componentTotals.empaque.totalPrice.toFixed(2)}`);
        addTableRow(doc, 135, 'Felpa 5.00 x 7.00:', `${componentTotals.felpa.totalSize} mm`, `${componentTotals.felpa.totalPrice.toFixed(2)}`);

        addSection(doc, 'Utilitarios', 145);
        addTableRow(doc, 150, 'Tornillos:', `${componentTotals.tornillos.cantidad}`, `${componentTotals.tornillos.totalPrice.toFixed(2)}`);
        addTableRow(doc, 155, 'Silicona:', `${componentTotals.silicona.cantidad}`, `${componentTotals.silicona.totalPrice.toFixed(2)}`);

        doc.setFontSize(14);
        doc.setTextColor(cyanBlue);
        doc.text('Total', 170, 165);
        doc.setFontSize(16);
        doc.setTextColor('black');
        const formattedTotal = totalSum.toLocaleString('en-US', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        doc.text(formattedTotal, 150, 170);

        doc.setFontSize(14);
        doc.setTextColor(cyanBlue);
        doc.text('Cantidad de puertas', 20, 165);
        doc.text(`${puertas.length}`, 20, 170);

        doc.save('Cotizacion-Sistema3890.pdf');
    };

    const getPriceDisplay = () => {
        if (accessories.kitManijaDobleSid) {
            return `$${accessoryPrices.kitManijaDobleSid.toFixed(2)}`;
        } else if (accessories.kitCierreConLlave3890) {
            return `$${accessoryPrices.kitCierreConLlave3890.toFixed(2)}`;
        }
        return ''; // Si no hay ninguna opción seleccionada, no mostrar precio
    };

    const getPriceBisagra = () => {
        if (accessories.bisagra2Sid) {
            return `$${accessoryPrices.bisagra2Sid.toFixed(2)}`;
        } else if (accessories.bisagra3Sid) {
            return `$${accessoryPrices.bisagra3Sid.toFixed(2)}`;
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
                <img src={sideralImage} alt="Puerta Corrediza Colosal" className="door-image" />

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
                <strong><h1>SIDERAL 2.4 XO PLUS</h1></strong>
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
                            <TableCell><strong>Marco Perimetral Sideral:</strong></TableCell>
                            <TableCell>{marcoPerimetralSid} mm</TableCell>
                            <TableCell>${marcoPerimetralSidPrice.toFixed(2)}</TableCell>
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
                            <TableCell><strong>Horizontal con Felperos:</strong></TableCell>
                            <TableCell>{cuadWidth} mm (4)</TableCell>
                            <TableCell>${horizontalFelperosSidPrice.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><strong>Vertical:</strong></TableCell>
                            <TableCell>{cuadHeight} mm (4)</TableCell>
                            <TableCell>${verticalSidPrice.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell><strong>Vertical Reforzado:</strong></TableCell>
                            <TableCell>{cuadHeight} mm (4)</TableCell>
                            <TableCell>${verticalReforzadoSidPrice.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="5">
                            <TableCell><strong>Adaptador:</strong></TableCell>
                            <TableCell>{totalHeight} mm </TableCell>
                            <TableCell>${adaptadorSidPrice.toFixed(2)}</TableCell>
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
                                type="checkbox"
                                name="kitManijaDobleSid"
                                value="Kit de Cierre"
                                checked={accessories.kitManijaDobleSid}
                                onChange={handleChange}
                            />
                                Kit Manija Doble Bidireccional con Bloqueo
                            </TableCell>
                            <TableCell>$ {getPriceDisplay()}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><input
                                type="radio"
                                name="bisagra2Sid"
                                value="Bisagra 2 Aletas Negra para 70K"
                                checked={accessories.bisagra2Sid}
                                onChange={handleChange}
                            />
                                Bisagra 2 Aletas Negra para 70K

                                <br />

                                <input
                                    type="radio"
                                    name="bisagra3Sid"
                                    value="Bisagra 3 Aletas para 90K"
                                    checked={accessories.bisagra3Sid}
                                    onChange={handleChange}
                                />
                                Bisagra 3 Aletas para 90K
                            </TableCell>
                            <TableCell>$ {getPriceBisagra()}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell>
                                Escuadra Ensamble Marco
                            </TableCell>
                            <TableCell>$ {escuadraEnsambleSidPrice}</TableCell>
                        </TableRow>
                        <TableRow key="5">
                            <TableCell>
                                Escuadra Ensamble Marco Sideral 2.4
                            </TableCell>
                            <TableCell>$ {escuadraEnsambleMSidPrice}</TableCell>
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
                            <TableCell>{empaqueSidHeight} mm
                                <br /> {empaqueSidWidth} mm
                            </TableCell>
                            <TableCell>${empaqueSidPrice.toFixed(2)}</TableCell>
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

export default Sideralxo;
