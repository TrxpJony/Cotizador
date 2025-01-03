import '../../../css/colosal.css'; // Archivo CSS para estilos
import sistema744img from '../../../img/colox.png'; // Importar la imagen
import { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf'; // Importamos jsPDF
import preciosData from '../../../api/db.json';
import logo from '../../../../src/img/logo.png'

const Sistema744 = () => {
  const navigate = useNavigate(); // Inicializar useNavigate
  const [dimensions, setDimensions] = useState({ width: '', height: '' });
  const [accessories, setAccessories] = useState({
    kitCierre744: false,
    rodamientoSimple744: false,
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
  const [puertas, setPuertas] = useState([]);

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
  const halfWidth = width ? width / 2 : '';
  const totalHeight = height ? height : '';
  const totalWidth = width ? width : '';

  const { glassPrice } = glassDimensions;

  // Calcular valores
  const doubleHeight = totalHeight ? totalHeight * 2 : '';
  const doubleHalfWidth = halfWidth ? halfWidth * 2 : '';
  const area = width && height ? (width * height) / 1000000 : ''; // Convertir a m²
  const empaque744Height = height && width ? height * 4 : '';
  const empaque744Width = height && width ? width * 2 : '';
  const felpaHeight = height && width ? height * 6 : '';
  const felpaWidth = height && width ? width * 2 : '';
  const empaque744Price = (empaque744Height + empaque744Width) / 1000 * prices.empaque744; // Precio total del empaque
  const totFelpa = (felpaHeight + felpaWidth);
  // Calcular precios
  const cabezal744Price = prices.cabezal744 * (totalWidth / 1000);
  const sillar744Price = prices.sillar744 * (totalWidth / 1000);
  const jamba744Price = prices.jamba744 * (doubleHeight / 1000);
  const horizontalSuperior744Price = prices.horizontalSuperior744 * (doubleHalfWidth / 1000);
  const horizontalInferior744Price = prices.horizontalInferior744 * (doubleHalfWidth / 1000);
  const traslape744Price = prices.traslape744 * (doubleHeight / 1000);
  const enganche744Price = prices.enganche744 * (doubleHeight / 1000);

  const kitCierre744Price = accessories.kitCierre744 ? accessoryPrices.kitCierre744 : 0;
  const rodamientoSimple744Price = accessories.rodamientoSimple744 ? accessoryPrices.rodamientoSimple744 * 2 : 0;
  const felpaPrice = (felpaHeight + felpaWidth) / 1000 * prices.felpacol; // Precio total de la felpa
  const manodeObraPrice = prices.manodeObra * area;

  const tornillosPrice = utilitaryPrices.tornillos * 44;
  const siliconaPrice = utilitaryPrices.silicona * 1;

  const [componentTotals, setComponentTotals] = useState({
    sillar: { totalSize: 0, totalPrice: 0 },
    cabezal: { totalSize: 0, totalPrice: 0 },
    jamba: { totalSize: 0, totalPrice: 0 },
    horizontalSuperior: { totalSize: 0, totalPrice: 0 },
    horizontalInferior: { totalSize: 0, totalPrice: 0 },
    traslape: { totalSize: 0, totalPrice: 0 },
    enganche: { totalSize: 0, totalPrice: 0 },
    empaque: { totalSize: 0, totalSize2: 0, totalPrice: 0 },
    felpa: { totalSize: 0, totalPrice: 0 },
    tornillos: { cantidad: 0, totalPrice: 0 },
    silicona: { cantidad: 0, totalPrice: 0 },
    // Puedes añadir más componentes aquí si es necesario.
  });

  const [accessoryTotals, setAccessoryTotals] = useState({
    kitCierre: { cantidad: 0, totalPrice: 0 },
    rodamientoSimple: { cantidad: 0, totalPrice: 0 },
    // Agrega otros accesorios aquí si es necesario.
  });

  const handleAddDoor = () => {
    const nuevaPuerta = {
      dimensions: { ...dimensions },
      accessories: { ...accessories },
      price: totalPrice,
    };
    setComponentTotals((prevTotals) => ({
      ...prevTotals,
      sillar: {
        totalSize: prevTotals.sillar.totalSize + parseFloat(totalWidth), // Sumar tamaño
        totalPrice: prevTotals.sillar.totalPrice + sillar744Price, // Sumar precio
      },
      cabezal: {
        totalSize: prevTotals.cabezal.totalSize + parseFloat(totalWidth),
        totalPrice: prevTotals.cabezal.totalPrice + cabezal744Price,
      },
      jamba: {
        totalSize: prevTotals.jamba.totalSize + parseFloat(doubleHeight),
        totalPrice: prevTotals.jamba.totalPrice + jamba744Price,
      },
      horizontalSuperior: {
        totalSize: prevTotals.horizontalSuperior.totalSize + parseFloat(doubleHalfWidth),
        totalPrice: prevTotals.horizontalSuperior.totalPrice + horizontalSuperior744Price,
      },
      horizontalInferior: {
        totalSize: prevTotals.horizontalInferior.totalSize + parseFloat(doubleHalfWidth),
        totalPrice: prevTotals.horizontalInferior.totalPrice + horizontalInferior744Price,
      },
      traslape: {
        totalSize: prevTotals.traslape.totalSize + parseFloat(doubleHeight),
        totalPrice: prevTotals.traslape.totalPrice + traslape744Price,
      },
      enganche: {
        totalSize: prevTotals.enganche.totalSize + parseFloat(doubleHeight),
        totalPrice: prevTotals.enganche.totalPrice + enganche744Price,
      },
      empaque: {
        totalSize: prevTotals.empaque.totalSize + parseFloat(empaque744Height),
        totalSize2: prevTotals.empaque.totalSize + parseFloat(empaque744Width),
        totalPrice: prevTotals.empaque.totalPrice + empaque744Price,
      },
      felpa: {
        totalSize: prevTotals.felpa.totalSize + parseFloat(totFelpa),
        totalPrice: prevTotals.felpa.totalPrice + felpaPrice,
      },
      tornillos: {
        cantidad: prevTotals.tornillos.cantidad + 44,
        totalPrice: prevTotals.tornillos.totalPrice + tornillosPrice,
      },
      silicona: {
        cantidad: prevTotals.silicona.cantidad + 1,
        totalPrice: prevTotals.silicona.totalPrice + siliconaPrice,
      },

    }));

    setAccessoryTotals((prevTotals) => ({
      ...prevTotals,
      kitCierre: accessories.kitCierre744
        ? {
          cantidad: prevTotals.kitCierre.cantidad + 1,
          totalPrice: prevTotals.kitCierre.totalPrice + kitCierre744Price,
        }
        : prevTotals.kitCierre,
      rodamientoSimple: accessories.rodamientoSimple744
        ? {
          cantidad: prevTotals.rodamientoSimple.cantidad + 2,
          totalPrice: prevTotals.rodamientoSimple.totalPrice + rodamientoSimple744Price,
        }
        : prevTotals.rodamientoSimple,

      // Añade lógica para otros accesorios si es necesario.
    }));


    setPuertas((prev) => [...prev, nuevaPuerta]);
    setDimensions({ width: '', height: '' }); // Reiniciar dimensiones
    setAccessories({ kitCierrecol: false, kitCierreConLlavecol: false }); // Reiniciar accesorios
  };

  const totalSum = puertas.reduce((acc, puerta) => acc + puerta.price, 0);
  const totalArea = puertas.reduce(
    (acc, puerta) =>
      acc + (puerta.dimensions.width * puerta.dimensions.height) / 1000000,
    0
  );




  const totalPrice =
    cabezal744Price +
    sillar744Price +
    jamba744Price +
    horizontalSuperior744Price +
    horizontalInferior744Price +
    traslape744Price +
    enganche744Price +
    kitCierre744Price +
    rodamientoSimple744Price +
    felpaPrice +
    empaque744Price +
    tornillosPrice +
    siliconaPrice +

    (glassPrice ? parseFloat(glassPrice) : 0) // Precio del vidrio

  const generatePDF = () => {
    const doc = new jsPDF();

    // Colores de la empresa
    const cyanBlue = '#00b5e2';
    const lightGray = '#d3d3d3';

    // Agregamos el logo o nombre de la empresa en la parte superior (opcional)
    doc.addImage(logo, 'PNG', 20, 10, 40, 20); // x, y, ancho, alto del logo
    doc.setFontSize(14); // Título más pequeño
    doc.setTextColor(cyanBlue);

    // Fecha de creación
    const currentDate = new Date().toLocaleDateString();
    doc.setFontSize(8); // Tamaño de fuente más pequeño para la fecha
    doc.setTextColor('black');
    doc.text(`Fecha de creación: ${currentDate}`, 150, 20); // Fecha a la derecha

    // Agregamos un borde y un fondo gris claro a los encabezados
    doc.setFillColor(lightGray);
    doc.rect(20, 30, 170, 8, 'F'); // Fondo gris en la cabecera
    doc.setTextColor('white');
    doc.setFontSize(10); // Texto más pequeño en el encabezado
    doc.text('Detalle de la cotización Sistema 744 XO-OX', 70, 34); // Texto blanco en la cabecera

    // Marco
    doc.setFontSize(12); // Título más pequeño
    doc.setTextColor(cyanBlue);
    doc.text('Marco', 20, 45); // Título de la sección Marco

    doc.setFontSize(10);
    doc.setTextColor('black');

    doc.text('Pieza', 20, 50);
    doc.text('Tamaño', 120, 50);
    doc.text('Precio', 170, 50);

    doc.setFontSize(10); // Texto más pequeño para los detalles
    doc.setTextColor('black');

    doc.text(`Cabezal:`, 20, 55);
    doc.text(`${componentTotals.cabezal.totalSize} mm`, 120, 55);
    doc.text(`${componentTotals.cabezal.totalPrice.toFixed(2)}`, 170, 55);
    doc.text(`Sillar:`, 20, 60);
    doc.text(`${componentTotals.sillar.totalSize} mm`, 120, 60);
    doc.text(`${componentTotals.sillar.totalPrice.toFixed(2)}`, 170, 60);
    doc.text(`Jamba:`, 20, 65);
    doc.text(`${componentTotals.jamba.totalSize} mm `, 120, 65);
    doc.text(`${componentTotals.jamba.totalPrice.toFixed(2)}`, 170, 65);

    // Nave
    doc.setFontSize(12); // Título más pequeño
    doc.setTextColor(cyanBlue);
    doc.text('Nave', 20, 75); // Título de la sección Nave

    doc.setFontSize(10);
    doc.setTextColor('black');

    doc.text('Pieza', 20, 80);
    doc.text('Tamaño', 120, 80);
    doc.text('Precio', 170, 80);

    doc.setFontSize(10); // Texto más pequeño para los detalles
    doc.setTextColor('black');

    doc.text(`Horizontal Superior:`, 20, 85);
    doc.text(`${componentTotals.horizontalSuperior.totalSize} mm `, 120, 85);
    doc.text(`${componentTotals.horizontalSuperior.totalPrice.toFixed(2)}`, 170, 85);
    doc.text(`Horizontal Inferior:`, 20, 90);
    doc.text(`${componentTotals.horizontalInferior.totalSize} mm `, 120, 90);
    doc.text(`${componentTotals.horizontalInferior.totalPrice.toFixed(2)}`, 170, 90);
    doc.text(`Traslape:`, 20, 95);
    doc.text(`${componentTotals.traslape.totalSize} mm `, 120, 95);
    doc.text(`${componentTotals.traslape.totalPrice.toFixed(2)}`, 170, 95);
    doc.text(`Enganche:`, 20, 100);
    doc.text(`${componentTotals.enganche.totalSize} mm `, 120, 100);
    doc.text(`${componentTotals.enganche.totalPrice.toFixed(2)}`, 170, 100);


    // Tabla Accesorios
    doc.setFontSize(12); // Título más pequeño
    doc.setTextColor(cyanBlue);
    doc.text('Accesorios', 20, 110); // Título de la sección Empaque

    // Tabla de Accesorios
    doc.setFontSize(10);
    doc.setTextColor('black');
    doc.text('Pieza', 20, 115);
    doc.text('Cantidad', 120, 115);
    doc.text('Precio', 170, 115);

    doc.text(`Kit de Cierre:`, 20, 120);
    doc.text(`${accessoryTotals.kitCierre.cantidad}`, 120, 120);
    doc.text(`${accessoryTotals.kitCierre.totalPrice.toFixed(2)}`, 170, 120);

    doc.text(`Rodamiento Simple en Agujas:`, 20, 125);
    doc.text(`${accessoryTotals.rodamientoSimple.cantidad}`, 120, 125);
    doc.text(`${accessoryTotals.rodamientoSimple.totalPrice.toFixed(2)}`, 170, 125);

    // Tabla Empaque
    doc.setFontSize(12); // Título más pequeño
    doc.setTextColor(cyanBlue);
    doc.text('Empaque', 20, 135); // Título de la sección Empaque

    // Tabla de Empaque
    doc.setFontSize(10);
    doc.setTextColor('black');

    doc.text('Pieza', 20, 140);
    doc.text('Tamaño', 120, 140);
    doc.text('Precio', 170, 140);

    doc.text(`Empaque (Alto):`, 20, 145);
    doc.text(`${componentTotals.empaque.totalSize} mm`, 120, 145);

    doc.text(`Empaque (Ancho):`, 20, 150);
    doc.text(`${componentTotals.empaque.totalSize2} mm`, 120, 150);
    doc.text(`${componentTotals.empaque.totalPrice.toFixed(2)}`, 170, 147.5);

    doc.text(`Felpa 5.00 x 7.00:`, 20, 155);
    doc.text(`${componentTotals.felpa.totalSize} mm`, 120, 155);
    doc.text(`${componentTotals.felpa.totalPrice.toFixed(2)}`, 170, 155);


    // Tabla Utilitarios
    doc.setFontSize(12); // Título más pequeño
    doc.setTextColor(cyanBlue);
    doc.text('Utilitarios', 20, 165); // Título de la sección Empaque

    // Tabla de Utilitarios
    doc.setFontSize(10);
    doc.setTextColor('black');

    doc.text('Pieza', 20, 170);
    doc.text('cantidad', 120, 170);
    doc.text('Precio', 170, 170);

    doc.text(`Torinillos:`, 20, 175);
    doc.text(`${componentTotals.tornillos.cantidad}`, 120, 175);
    doc.text(`${componentTotals.tornillos.totalPrice.toFixed(2)}`, 170, 175);

    doc.text(`Silicona:`, 20, 180);
    doc.text(`${componentTotals.silicona.cantidad}`, 120, 180);
    doc.text(`${componentTotals.silicona.totalPrice.toFixed(2)}`, 170, 180);


    // Total
    doc.setFontSize(14);
    doc.setTextColor(cyanBlue);
    doc.text('Total', 170, 190); // Título Total

    doc.setFontSize(16);
    doc.setTextColor('black');
    // Formateamos el total con separadores de miles y el símbolo de moneda
    const formattedTotal = totalSum.toLocaleString('en-US', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    doc.text(formattedTotal, 150, 195); // Total

    // Total puertas
    doc.setFontSize(14);
    doc.setTextColor(cyanBlue);

    doc.text('Cantidad de puertas', 20, 190); // Título Total
    doc.text(`${puertas.length}`, 20, 195);

    // Mostramos el total formateado

    // Guardamos el archivo PDF
    doc.save('Cotizacion-Sistema744.pdf'); // Guardamos el archivo con el nombre
  };


  const getPriceDisplay = () => {
    if (accessories.kitCierre744) {
      return `$${accessoryPrices.kitCierre744.toFixed(2)}`;
    }
    return ''; // Si no hay ninguna opción seleccionada, no mostrar precio
  };

  const getRodamientoPrice = () => {
    if (accessories.rodamientoSimple744) {
      return `$${rodamientoSimple744Price.toFixed(2)}`; // Mostrar precio si 'rodamientoSimple744' está seleccionado
    }
    return ''; // Si no se selecciona ningún radio button, no mostrar precio
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
        <img src={sistema744img} alt="Puerta Corrediza Colosal" className="door-image" />

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
        <strong><h1>SISTEMA 744 XO-OX</h1></strong>
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
              <TableCell><strong>Cabezal:</strong></TableCell>
              <TableCell>{totalWidth} mm</TableCell>
              <TableCell>${cabezal744Price.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell><strong>Sillar:</strong></TableCell>
              <TableCell>{totalWidth} mm</TableCell>
              <TableCell>${sillar744Price.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell><strong>Jamba:</strong></TableCell>
              <TableCell>{doubleHeight} mm (2)</TableCell>
              <TableCell>${jamba744Price.toFixed(2)}</TableCell>
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
              <TableCell><strong>Horizontal Superior:</strong></TableCell>
              <TableCell>{doubleHalfWidth} mm (2)</TableCell>
              <TableCell>${horizontalSuperior744Price.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell><strong>Horizontal Inferior:</strong></TableCell>
              <TableCell>{doubleHalfWidth} mm (2)</TableCell>
              <TableCell>${horizontalInferior744Price.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell><strong>Traslape:</strong> </TableCell>
              <TableCell>{doubleHeight} mm (2) </TableCell>
              <TableCell>${traslape744Price.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow key="5">
              <TableCell><strong>Enganche:</strong> </TableCell>
              <TableCell>{doubleHeight} mm (2) </TableCell>
              <TableCell>${enganche744Price.toFixed(2)}</TableCell>
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
                name="kitCierre744"
                value="Kit de Cierre"
                checked={accessories.kitCierre744}
                onChange={handleChange}
              />
                Kit de Cierre
              </TableCell>
              <TableCell>$ {getPriceDisplay()}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell><input
                type="checkbox"
                name="rodamientoSimple744"
                checked={accessories.rodamientoSimple744}
                onChange={handleChange}
              />
                Rodamiento Simple en Agujas (2)
              </TableCell>
              <TableCell>$ {getRodamientoPrice()}</TableCell>
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
              <TableCell>{empaque744Height} mm
                <br /> {empaque744Width} mm
              </TableCell>
              <TableCell>${empaque744Price.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell><strong>Felpa 5.00 x 7.00:</strong></TableCell>
              <TableCell>{totFelpa} mm</TableCell>
              <TableCell>${felpaPrice.toFixed(2)}</TableCell>
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
                <strong> Tornillos (44)</strong>
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

export default Sistema744;
