import '../../../css/colosal.css'; // Archivo CSS para estilos
import Astral20Image from '../../../img/colxx.png'; // Importar la imagen
import { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import preciosData from '../../../api/db.json';
import logo from '../../../../src/img/logo.png'
import { jsPDF } from 'jspdf'; // Importamos jsPDF

const Astral20xx = () => {
  const navigate = useNavigate(); // Inicializar useNavigate
  const [dimensions, setDimensions] = useState({ width: '', height: '' });
  const [accessories, setAccessories] = useState({
    kitCierreast: false,
    cubetaAngeo: false,
    rodamiento80ast: false,
    rodamiento40ast: false,
    cajaDeflectora: false,
    rodamientoNave22ast: false,
    guiaSuperiorangeo: false,
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
      if (name === 'kitCierreast' || name === 'kitCierreastConLlave') {
        setAccessories((prev) => ({
          ...prev,
          kitCierreast: name === 'kitCierreast' ? checked : false,
          kitCierreastConLlave: name === 'kitCierreastConLlave' ? checked : false,
        }));
      } else if (name === 'rodamiento80ast' || name === 'rodamiento40ast') {
        setAccessories((prev) => ({
          ...prev,
          rodamiento80ast: name === 'rodamiento80ast' ? checked : false,
          rodamiento40ast: name === 'rodamiento40ast' ? checked : false,
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
  const halfWidth = width ? width / 2 : '';
  const totalHeight = height ? height : '';
  const totalWidth = width ? width : '';

  const { glassPrice } = glassDimensions;
  const { glassHeight } = glassDimensions;
  const { glassWidth } = glassDimensions;
  const { manodeObraPrice } = manodeObraprices;

  // Calcular valores
  const doubleHeight = totalHeight ? totalHeight * 2 : '';
  const doubleHalfWidth = halfWidth ? halfWidth * 2 : '';
  const area = width && height ? (width * height) / 1000000 : ''; // Convertir a m²
  const empaqueastHeight = height && width ? height * 4 : '';
  const empaqueastWidth = height && width ? width * 2 : '';
  const felpaHeight = height && width ? height * 4 : '';
  const felpaWidth = height && width ? width * 2 : '';
  const empaqueastPrice = (empaqueastHeight + empaqueastWidth) / 1000 * dbPrices.empaqueast; // Precio total del empaqueast
  const totFelpa = (felpaHeight + felpaWidth);
  // Calcular precios
  const cabezalastPrice = dbPrices.cabezalast * (totalWidth / 1000);
  const sillarastPrice = dbPrices.sillarast * (totalWidth / 1000);
  const jambaastPrice = dbPrices.jambaast * (doubleHeight / 1000);
  const horizontalSuperiorastPrice = dbPrices.horizontalSuperiorast * (doubleHalfWidth / 1000);
  const horizontalInferiorMovilastPrice = dbPrices.horizontalInferiorMovilast * (doubleHalfWidth / 1000);
  const traslapeastPrice = dbPrices.traslapeast * (doubleHeight / 1000);
  const engancheastPrice = dbPrices.engancheast * (doubleHeight / 1000);


  const kitCierreastPrice = accessories.kitCierreast ? accessoryPrices.kitCierreast : 0;
  const cubetaAngeoPrice = accessories.cubetaAngeo ? accessoryPrices.cubetaAngeo : 0;
  const rodamiento80astPrice = accessories.rodamiento80ast ? accessoryPrices.rodamiento80ast : 0;
  const rodamiento40astPrice = accessories.rodamiento40ast ? accessoryPrices.rodamiento40ast : 0;
  const cajaDeflectoraPrice = accessories.cajaDeflectora ? accessoryPrices.cajaDeflectora : 0;
  const rodamientoNave22astPrice = accessories.rodamientoNave22ast ? accessoryPrices.rodamientoNave22ast : 0;
  const guiaSuperiorangeoPrice = accessories.guiaSuperiorangeo ? accessoryPrices.guiaSuperiorangeo : 0;
  const felpaPrice = (felpaHeight + felpaWidth) / 1000 * prices.felpacol; // Precio total de la felpa

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
    manodeObra: { totalPrice: 0 },
    glass: { totalSize: 0, totalSize2: 0, totalPrice: 0 }
    // Puedes añadir más componentes aquí si es necesario.
  });

  const [accessoryTotals, setAccessoryTotals] = useState({
    kitCierre: { cantidad: 0, totalPrice: 0 },
    rodamiento80: { cantidad: 0, totalPrice: 0 },
    rodamiento40: { cantidad: 0, totalPrice: 0 },
    cubetaAngeo: { cantidad: 0, totalPrice: 0 },
    cajaDeflectora: { cantidad: 0, totalPrice: 0 },
    rodamientoNave22: { cantidad: 0, totalPrice: 0 },
    guiaSuperiorangeo: { cantidad: 0, totalPrice: 0 },
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
      sillar: {
        totalSize: prevTotals.sillar.totalSize + parseFloat(totalWidth), // Sumar tamaño
        totalPrice: prevTotals.sillar.totalPrice + sillarastPrice, // Sumar precio
      },
      cabezal: {
        totalSize: prevTotals.cabezal.totalSize + parseFloat(totalWidth),
        totalPrice: prevTotals.cabezal.totalPrice + cabezalastPrice,
      },
      jamba: {
        totalSize: prevTotals.jamba.totalSize + parseFloat(doubleHeight),
        totalPrice: prevTotals.jamba.totalPrice + jambaastPrice,
      },
      horizontalSuperior: {
        totalSize: prevTotals.horizontalSuperior.totalSize + parseFloat(doubleHalfWidth),
        totalPrice: prevTotals.horizontalSuperior.totalPrice + horizontalSuperiorastPrice,
      },
      horizontalInferior: {
        totalSize: prevTotals.horizontalInferior.totalSize + parseFloat(doubleHalfWidth),
        totalPrice: prevTotals.horizontalInferior.totalPrice + horizontalInferiorMovilastPrice,
      },
      traslape: {
        totalSize: prevTotals.traslape.totalSize + parseFloat(doubleHeight),
        totalPrice: prevTotals.traslape.totalPrice + traslapeastPrice,
      },
      enganche: {
        totalSize: prevTotals.enganche.totalSize + parseFloat(doubleHeight),
        totalPrice: prevTotals.enganche.totalPrice + engancheastPrice,
      },
      empaque: {
        totalSize: prevTotals.empaque.totalSize + parseFloat(empaqueastHeight),
        totalSize2: prevTotals.empaque.totalSize + parseFloat(empaqueastWidth),
        totalPrice: prevTotals.empaque.totalPrice + empaqueastPrice,
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
      kitCierre: accessories.kitCierreast
        ? {
          cantidad: prevTotals.kitCierre.cantidad + 1,
          totalPrice: prevTotals.kitCierre.totalPrice + kitCierreastPrice,
        }
        : prevTotals.kitCierre,
      rodamiento80: accessories.rodamiento80ast
        ? {
          cantidad: prevTotals.rodamiento80.cantidad + 2,
          totalPrice: prevTotals.rodamiento80.totalPrice + rodamiento80astPrice,
        }
        : prevTotals.rodamiento80,
      rodamiento40: accessories.rodamiento40ast
        ? {
          cantidad: prevTotals.rodamiento40.cantidad + 2,
          totalPrice: prevTotals.rodamiento40.totalPrice + rodamiento40astPrice,
        }
        : prevTotals.rodamiento40,
      cubetaAngeo: accessories.cubetaAngeo
        ? {
          cantidad: prevTotals.cubetaAngeo.cantidad + 1,
          totalPrice: prevTotals.cubetaAngeo.totalPrice + cubetaAngeoPrice,
        }
        : prevTotals.cubetaAngeo,
      cajaDeflectora: accessories.cajaDeflectora
        ? {
          cantidad: prevTotals.cajaDeflectora.cantidad + 1,
          totalPrice: prevTotals.cajaDeflectora.totalPrice + cajaDeflectoraPrice,
        }
        : prevTotals.cajaDeflectora,
      rodamientoNave22: accessories.rodamientoNave22ast
        ? {
          cantidad: prevTotals.rodamientoNave22.cantidad + 1,
          totalPrice: prevTotals.rodamientoNave22.totalPrice + rodamientoNave22astPrice,
        }
        : prevTotals.rodamientoNave22,
      guiaSuperiorangeo: accessories.guiaSuperiorangeo
        ? {
          cantidad: prevTotals.guiaSuperiorangeo.cantidad + 1,
          totalPrice: prevTotals.guiaSuperiorangeo.totalPrice + guiaSuperiorangeoPrice,
        }
        : prevTotals.guiaSuperiorangeo,




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
    cabezalastPrice +
    sillarastPrice +
    jambaastPrice +
    horizontalSuperiorastPrice +
    horizontalInferiorMovilastPrice +
    traslapeastPrice +
    engancheastPrice +
    kitCierreastPrice +
    cubetaAngeoPrice +
    rodamiento80astPrice +
    rodamiento40astPrice +
    cajaDeflectoraPrice +
    rodamientoNave22astPrice +
    guiaSuperiorangeoPrice +
    felpaPrice +
    empaqueastPrice +
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
        doc.text('Detalle de la cotización Astral 2.0 XX', 70, 34);
    
        addSection(doc, 'Marco', 45);
        addTableRow(doc, 50, 'Cabezal:', `${componentTotals.cabezal.totalSize} mm`, `${componentTotals.cabezal.totalPrice.toFixed(2)}`);
        addTableRow(doc, 55, 'Sillar un Riel:', `${componentTotals.sillar.totalSize} mm`, `${componentTotals.sillar.totalPrice.toFixed(2)}`);
        addTableRow(doc, 60, 'Jamba:', `${componentTotals.jamba.totalSize} mm`, `${componentTotals.jamba.totalPrice.toFixed(2)}`);
    
        addSection(doc, 'Nave', 70);
        addTableRow(doc, 75, 'Horizontal Superior:', `${componentTotals.horizontalSuperior.totalSize} mm`, `${componentTotals.horizontalSuperior.totalPrice.toFixed(2)}`);
        addTableRow(doc, 80, 'Horizontal Inferior:', `${componentTotals.horizontalInferior.totalSize} mm`, `${componentTotals.horizontalInferior.totalPrice.toFixed(2)}`);
        addTableRow(doc, 85, 'Traslape:', `${componentTotals.traslape.totalSize} mm`, `${componentTotals.traslape.totalPrice.toFixed(2)}`);
        addTableRow(doc, 90, 'Enganche:', `${componentTotals.enganche.totalSize} mm`, `${componentTotals.enganche.totalPrice.toFixed(2)}`);
    
        addSection(doc, 'Accesorios', 100);
        addTableRow(doc, 105, 'Kit de Cierre:', `${accessoryTotals.kitCierre.cantidad}`, `${accessoryTotals.kitCierre.totalPrice.toFixed(2)}`);
        addTableRow(doc, 110, 'Cubeta de Angeo Negra:', `${accessoryTotals.cubetaAngeo.cantidad}`, `${accessoryTotals.cubetaAngeo.totalPrice.toFixed(2)}`);
        addTableRow(doc, 115, 'Rodamiento 80 Kilos en Agujas:', `${accessoryTotals.rodamiento80.cantidad}`, `${accessoryTotals.rodamiento80.totalPrice.toFixed(2)}`);
        addTableRow(doc, 120, 'Rodamiento 40 Kilos en Agujas:', `${accessoryTotals.rodamiento40.cantidad}`, `${accessoryTotals.rodamiento40.totalPrice.toFixed(2)}`);
        addTableRow(doc, 125, 'Caja Deflectora:', `${accessoryTotals.cajaDeflectora.cantidad}`, `${accessoryTotals.cajaDeflectora.totalPrice.toFixed(2)}`);
        addTableRow(doc, 130, 'Rodamiento 22 Kilos en Bolas Para Nave:', `${accessoryTotals.rodamientoNave22.cantidad}`, `${accessoryTotals.rodamientoNave22.totalPrice.toFixed(2)}`);
  
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
    
        doc.save('Cotizacion-Astral2.0.pdf');
      };

  const getPriceDisplay = () => {
    if (accessories.kitCierreast) {
      return `$${accessoryPrices.kitCierreast.toFixed(2)}`;
    } else if (accessories.kitCierreastConLlave) {
      return `$${accessoryPrices.kitCierreastConLlave.toFixed(2)}`;
    }
    return ''; // Si no hay ninguna opción seleccionada, no mostrar precio
  };

  const getCubetaAngeoPrice = () => {
    if (accessories.cubetaAngeo) {
      return `$${accessoryPrices.cubetaAngeo.toFixed(2)}`; // Mostrar precio si el checkbox está seleccionado
    }
    return ''; // Si no está seleccionado, no mostrar precio
  };

  const getRodamientoPrice = () => {
    if (accessories.rodamiento80ast) {
      return `$${accessoryPrices.rodamiento80ast.toFixed(2)}`; // Mostrar precio si 'rodamiento80ast' está seleccionado
    } else if (accessories.rodamiento40ast) {
      return `$${accessoryPrices.rodamiento40ast.toFixed(2)}`; // Mostrar precio si 'rodamiento40ast' está seleccionado
    }
    return ''; // Si no se selecciona ningún radio button, no mostrar precio
  };


  const getCajaPrice = () => {
    if (accessories.cajaDeflectora) {
      return `$${accessoryPrices.cajaDeflectora.toFixed(2)}`; // Mostrar precio si el checkbox está seleccionado
    }
    return ''; // Si no está seleccionado, no mostrar precio
  };

  const getRodaNavPrice = () => {
    if (accessories.rodamientoNave22ast) {
      return `$${accessoryPrices.rodamientoNave22ast.toFixed(2)}`; // Mostrar precio si el checkbox está seleccionado
    }
    return ''; // Si no está seleccionado, no mostrar precio
  };

  const getGuiaPrice = () => {
    if (accessories.guiaSuperiorangeo) {
      return `$${accessoryPrices.guiaSuperiorangeo.toFixed(2)}`; // Mostrar precio si el checkbox está seleccionado
    }
    return ''; // Si no está seleccionado, no mostrar precio
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
              <img src={Astral20Image} alt="Puerta Corrediza Colosal" className="door-image" />
      
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
        <strong><h1>ASTRAL 2.0 XX</h1></strong>
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
              <TableCell>${cabezalastPrice.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell><strong>Sillar un Riel:</strong></TableCell>
              <TableCell>{totalWidth} mm</TableCell>
              <TableCell>${sillarastPrice.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell><strong>Jamba:</strong></TableCell>
              <TableCell>{doubleHeight} mm (2)</TableCell>
              <TableCell>${jambaastPrice.toFixed(2)}</TableCell>
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
              <TableCell>${horizontalSuperiorastPrice.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell><strong>Horizontal Inferior:</strong> </TableCell>
              <TableCell>{doubleHalfWidth} mm (2)</TableCell>
              <TableCell>${horizontalInferiorMovilastPrice.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow key="5">
              <TableCell><strong>Traslape:</strong> </TableCell>
              <TableCell>{doubleHeight} mm (2) </TableCell>
              <TableCell>${traslapeastPrice.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow key="6">
              <TableCell><strong>Enganche:</strong> </TableCell>
              <TableCell>{doubleHeight} mm (2) </TableCell>
              <TableCell>${engancheastPrice.toFixed(2)}</TableCell>
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
                name="kitCierreast"
                value="Kit de Cierre"
                checked={accessories.kitCierreast}
                onChange={handleChange}
              />
                Kit de Cierre
              </TableCell>
              <TableCell>$ {getPriceDisplay()}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell><input
                type="radio"
                name="rodamiento80ast"
                checked={accessories.rodamiento80ast}
                onChange={handleChange}
              />
                Rodamiento 80 Kilos en Agujas
                <br />
                <input
                  type="radio"
                  name="rodamiento40ast"
                  checked={accessories.rodamiento40ast}
                  onChange={handleChange}
                />
                Rodamiento 40 Kilos en Bolas
              </TableCell>
              <TableCell>$ {getRodamientoPrice()}</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell><input
                type="checkbox"
                name="cubetaAngeo"
                checked={accessories.cubetaAngeo}
                onChange={handleChange}
              />
                Cubeta de Angeo Negra</TableCell>
              <TableCell>$ {getCubetaAngeoPrice()}</TableCell>
            </TableRow>
            <TableRow key="5">
              <TableCell><input
                type="checkbox"
                name="cajaDeflectora"
                checked={accessories.cajaDeflectora}
                onChange={handleChange}
              />
                Caja Deflectora</TableCell>
              <TableCell>$ {getCajaPrice()}</TableCell>
            </TableRow>
            <TableRow key="6">
              <TableCell><input
                type="checkbox"
                name="rodamientoNave22ast"
                checked={accessories.rodamientoNave22ast}
                onChange={handleChange}
              />
                Rodamiento 22 Kilos en Bolas Para Nave</TableCell>
              <TableCell>$ {getRodaNavPrice()}</TableCell>
            </TableRow>
            <TableRow key="7">
              <TableCell><input
                type="checkbox"
                name="guiaSuperiorangeo"
                checked={accessories.guiaSuperiorangeo}
                onChange={handleChange}
              />
                Guia Superior Angeo Linea Universal</TableCell>
              <TableCell>$ {getGuiaPrice()}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <br />
        <Table aria-label="tabla utilitarios">
          <TableHeader>
            <TableColumn><h1>Utilitarios</h1></TableColumn>
            <TableColumn><h1>Cantidad</h1></TableColumn>
            <TableColumn><h1>Precio</h1></TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell><strong><h2>Pieza</h2></strong></TableCell>
              <TableCell><strong><h2>Cantidad</h2></strong></TableCell>
              <TableCell><strong><h2>Precio</h2></strong></TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell><strong> Tornillos</strong></TableCell>
              <TableCell>44</TableCell>
              <TableCell>$ {tornillosPrice.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell><strong> Silicona</strong></TableCell>
              <TableCell>1</TableCell>
              <TableCell>$ {siliconaPrice.toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <br />
        <Table aria-label="TABLA EMPAQUEast">
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
              <TableCell>{empaqueastHeight} mm
                <br /> {empaqueastWidth} mm
              </TableCell>
              <TableCell>${empaqueastPrice.toFixed(2)}</TableCell>
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

export default Astral20xx;
