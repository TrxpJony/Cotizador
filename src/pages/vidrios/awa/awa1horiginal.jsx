import '../../../css/colosal.css'; // Archivo CSS para estilos
import colosalImage from '../../../img/awa2h.png'; // Importar la imagen
import { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf'; // Importamos jsPDF
import preciosData from '../../../api/db.json';
import logo from '../../../../src/img/logo.png'

const Awa2h = () => {
  const navigate = useNavigate(); // Inicializar useNavigate
  const [dimensions, setDimensions] = useState({ width: '', height: '' });
  const [accessories, setAccessories] = useState({
    kitManijaAwa: false,
    kitManijaConLlaveAwa: false,
    escuadraEnsambleAwa: false,
    escuadraEnsambleHAwa: false,
    bisagra3Awa: false,
    kitRodamientosAwa: false,
    frenoRodamientoAwa: false,
    kitGuiaHAwa: false,
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
      if (name === 'kitManijaAwa' || name === 'kitManijaConLlaveAwa') {
        setAccessories((prev) => ({
          ...prev,
          kitManijaAwa: name === 'kitManijaAwa' ? checked : false,
          kitManijaConLlaveAwa: name === 'kitManijaConLlaveAwa' ? checked : false,
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
  const area = width && height ? (width * height) / 1000000 : ''; // Convertir a m²
  const empaquecolHeight = height && width ? height * 4 : '';
  const empaquecolWidth = height && width ? width * 2 : '';
  const felpaHeight = height && width ? height * 6 : '';
  const felpaWidth = height && width ? width * 2 : '';
  const empaquecolPrice = (empaquecolHeight + empaquecolWidth) / 1000 * dbPrices.empaqueAwa; // Precio total del empaque
  const totFelpa = (felpaHeight + felpaWidth);
  const verticalInferiorAwa = (totalWidth && totalHeight) ? (totalWidth * 1 + totalHeight * 2) : 0;
  const perimetralAwa = (totalHeight && totalWidth) ? ((totalWidth / 2) * 4 + (totalHeight * 4)) : 0;

  // Calcular precios
  const compensadorAwaPrice = dbPrices.compensadorAwa * (totalWidth / 1000);
  const cabezalAwaPrice = dbPrices.cabezalAwa * (totalWidth / 1000);
  const verticalInferiorAwaPrice = dbPrices.verticalInferiorAwa * (verticalInferiorAwa / 1000);
  const sillarEmpotrarAwaPrice = dbPrices.sillarEmpotrarAwa * (totalWidth / 1000);
  const sillaSobreponerAwaPrice = dbPrices.sillaSobreponerAwa * (totalWidth / 1000);
  const perimetralAwaPrice = dbPrices.perimetralAwa * (perimetralAwa / 1000);
  const pisavidrioPerimetralAwaPrice = dbPrices.pisavidrioPerimetralAwa * (perimetralAwa / 1000);

  const kitManijaAwaPrice = accessories.kitManijaAwa ? accessoryPrices.kitManijaAwa : 0;
  const kitManijaConLlaveAwaPrice = accessories.kitManijaConLlaveAwa ? accessoryPrices.kitManijaConLlaveAwa : 0;
  const escuadraEnsambleAwaPrice = accessories.escuadraEnsambleAwa ? accessoryPrices.escuadraEnsambleAwa : 0;
  const escuadraEnsambleHAwaPrice = accessories.escuadraEnsambleHAwa ? accessoryPrices.escuadraEnsambleHAwa : 0;
  const bisagra3AwaPrice = accessories.bisagra3Awa ? accessoryPrices.bisagra3Awa : 0;
  const kitRodamientosAwaPrice = accessories.kitRodamientosAwa ? accessoryPrices.kitRodamientosAwa : 0;
  const frenoRodamientoAwaPrice = accessories.frenoRodamientoAwa ? accessoryPrices.frenoRodamientoAwa : 0;
  const kitGuiaHAwaPrice = accessories.kitGuiaHAwa ? accessoryPrices.kitGuiaHAwa : 0;

  const felpaPrice = (felpaHeight + felpaWidth) / 1000 * prices.felpacol; // Precio total de la felpa

  const tornillosPrice = utilitaryPrices.tornillos * 44;
  const siliconaPrice = utilitaryPrices.silicona * 1;

  const [componentTotals, setComponentTotals] = useState({
    cabezal: { totalSize: 0, totalPrice: 0 },
    compensador: { totalSize: 0, totalPrice: 0 },
    sillarEmpotrar: { totalSize: 0, totalPrice: 0 },
    sillaSobreponer: { totalSize: 0, totalPrice: 0 },
    perimetral: { totalSize: 0, totalPrice: 0 },
    pisavidrioPerimetral: { totalSize: 0, totalPrice: 0 },
    verticalInferior: { totalSize: 0, totalPrice: 0 },
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
    kitManija: { cantidad: 0, totalPrice: 0 },
    kitManijaConLlave: { cantidad: 0, totalPrice: 0 },
    escuadraEnsambleAwa: { cantidad: 0, totalPrice: 0 },
    rodamientoSimple: { cantidad: 0, totalPrice: 0 },
    rodamientoDoble: { cantidad: 0, totalPrice: 0 },
    escuadraEnsambleHAwa: { cantidad: 0, totalPrice: 0 },
    bisagra3Awa: { cantidad: 0, totalPrice: 0 },
    kitRodamientosAwa: { cantidad: 0, totalPrice: 0 },
    frenoRodamientoAwa: { cantidad: 0, totalPrice: 0 },
    kitGuiaHAwa: { cantidad: 0, totalPrice: 0 },
    // Agrega otros accesorios aquí si es necesario.
  });


  const handleAddDoor = () => {
    const nuevaPuerta = {
      dimensions: { ...dimensions },
      accessories: { ...accessories },
      price: totalPrice,
    };

    // Actualizar totales del cabezal
    setComponentTotals((prevTotals) => ({
      ...prevTotals,
      cabezal: {
        totalSize: prevTotals.cabezal.totalSize + parseFloat(totalWidth), // Sumar tamaño
        totalPrice: prevTotals.cabezal.totalPrice + cabezalAwaPrice, // Sumar precio
      },
      compensador: {
        totalSize: prevTotals.compensador.totalSize + parseFloat(totalWidth),
        totalPrice: prevTotals.compensador.totalPrice + compensadorAwaPrice,
      },
      sillarEmpotrar: {
        totalSize: prevTotals.sillarEmpotrar.totalSize + parseFloat(totalWidth),
        totalPrice: prevTotals.sillarEmpotrar.totalPrice + sillarEmpotrarAwaPrice,
      },
      sillaSobreponer: {
        totalSize: prevTotals.sillaSobreponer.totalSize + parseFloat(totalWidth),
        totalPrice: prevTotals.sillaSobreponer.totalPrice + sillaSobreponerAwaPrice,
      },
      perimetral: {
        totalSize: prevTotals.perimetral.totalSize + parseFloat(perimetralAwa),
        totalPrice: prevTotals.perimetral.totalPrice + perimetralAwaPrice,
      },
      pisavidrioPerimetral: {
        totalSize: prevTotals.pisavidrioPerimetral.totalSize + parseFloat(perimetralAwa),
        totalPrice: prevTotals.pisavidrioPerimetral.totalPrice + pisavidrioPerimetralAwaPrice,
      },
      verticalInferior: {
        totalSize: prevTotals.verticalInferior.totalSize + parseFloat(verticalInferiorAwa),
        totalPrice: prevTotals.verticalInferior.totalPrice + verticalInferiorAwaPrice,
      },
      empaque: {
        totalSize: prevTotals.empaque.totalSize + parseFloat(empaquecolHeight),
        totalSize2: prevTotals.empaque.totalSize + parseFloat(empaquecolWidth),
        totalPrice: prevTotals.empaque.totalPrice + empaquecolPrice,
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
        totalSize2: prevTotals.glass.totalSize2 + parseFloat(glassWidth),
        totalPrice: prevTotals.glass.totalPrice + parseFloat(glassPrice),
      }
    }));

    setAccessoryTotals((prevTotals) => ({
      ...prevTotals,
      kitManija: accessories.kitManijaAwa
        ? {
          cantidad: prevTotals.kitManija.cantidad + 1,
          totalPrice: prevTotals.kitManija.totalPrice + kitManijaAwaPrice,
        }
        : prevTotals.kitManija,
      kitManijaConLlave: accessories.kitManijaConLlaveAwa
        ? {
          cantidad: prevTotals.kitManijaConLlave.cantidad + 1,
          totalPrice: prevTotals.kitManijaConLlave.totalPrice + kitManijaConLlaveAwaPrice,
        }
        : prevTotals.kitManijaConLlave,
      escuadraEnsambleAwa: accessories.escuadraEnsambleAwa
        ? {
          cantidad: prevTotals.escuadraEnsambleAwa.cantidad + 1,
          totalPrice: prevTotals.escuadraEnsambleAwa.totalPrice + escuadraEnsambleAwaPrice,
        }
        : prevTotals.escuadraEnsambleAwa,
      escuadraEnsambleHAwa: accessories.escuadraEnsambleHAwa
        ? {
          cantidad: prevTotals.escuadraEnsambleHAwa.cantidad + 1,
          totalPrice: prevTotals.escuadraEnsambleHAwa.totalPrice + escuadraEnsambleHAwaPrice,
        }
        : prevTotals.escuadraEnsambleHAwa,
      bisagra3Awa: accessories.bisagra3Awa
        ? {
          cantidad: prevTotals.bisagra3Awa.cantidad + 1,
          totalPrice: prevTotals.bisagra3Awa.totalPrice + bisagra3AwaPrice,
        }
        : prevTotals.bisagra3Awa,
      kitRodamientosAwa: accessories.kitRodamientosAwa
        ? {
          cantidad: prevTotals.kitRodamientosAwa.cantidad + 1,
          totalPrice: prevTotals.kitRodamientosAwa.totalPrice + kitRodamientosAwaPrice,
        }
        : prevTotals.kitRodamientosAwa,
      frenoRodamientoAwa: accessories.frenoRodamientoAwa
        ? {
          cantidad: prevTotals.frenoRodamientoAwa.cantidad + 1,
          totalPrice: prevTotals.frenoRodamientoAwa.totalPrice + frenoRodamientoAwaPrice,
        }
        : prevTotals.frenoRodamientoAwa,
      kitGuiaHAwa: accessories.kitGuiaHAwa
        ? {
          cantidad: prevTotals.kitGuiaHAwa.cantidad + 1,
          totalPrice: prevTotals.kitGuiaHAwa.totalPrice + kitGuiaHAwaPrice,
        }
        : prevTotals.kitGuiaHAwa,
      // Añade lógica para otros accesorios si es necesario.
    }));
    setPuertas((prev) => [...prev, nuevaPuerta]);
    setDimensions({ width: '', height: '' }); // Reiniciar dimensiones
    setAccessories({ kitManijaAwa: false, kitManijaConLlaveAwa: false }); // Reiniciar accesorios
    setGlassDimensions({ glassWidth: '', glassHeight: '', glassPrice: '' }); // Reiniciar Dimensiones del vidrio
    setmanodeObraprices({ manodeObraPrice: 0 }); // Reiniciar precio de la mano de obra
  };

  const totalSum = puertas.reduce((acc, puerta) => acc + puerta.price, 0);
  const totalArea = puertas.reduce(
    (acc, puerta) =>
      acc + (puerta.dimensions.width * puerta.dimensions.height) / 1000000,
    0
  );

  const totalPrice =
    compensadorAwaPrice +
    cabezalAwaPrice +
    sillarEmpotrarAwaPrice +
    sillaSobreponerAwaPrice +
    perimetralAwaPrice +
    pisavidrioPerimetralAwaPrice +
    verticalInferiorAwaPrice +
    kitManijaAwaPrice +
    kitManijaConLlaveAwaPrice +
    escuadraEnsambleAwaPrice +
    escuadraEnsambleHAwaPrice +
    bisagra3AwaPrice +
    kitGuiaHAwaPrice +
    kitRodamientosAwaPrice +
    frenoRodamientoAwaPrice +
    felpaPrice +
    empaquecolPrice +
    tornillosPrice +
    siliconaPrice +
    (glassPrice ? parseFloat(glassPrice) : 0) +// Precio del vidrio
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
    doc.text('Detalle de la cotización Sistema Awa 2 Hojas   ', 70, 34);

    addSection(doc, 'Marco', 45);
    addTableRow(doc, 50, 'Compensador:', `${componentTotals.compensador.totalSize} mm`, `${componentTotals.compensador.totalPrice.toFixed(2)}`);
    addTableRow(doc, 55, 'Cabezal:', `${componentTotals.cabezal.totalSize} mm`, `${componentTotals.cabezal.totalPrice.toFixed(2)}`);
    addTableRow(doc, 60, 'Vertical Inferior de Marco:', `${componentTotals.verticalInferior.totalSize} mm`, `${componentTotals.verticalInferior.totalPrice.toFixed(2)}`);
    addTableRow(doc, 65, 'Sillar de Empotrar:', `${componentTotals.sillarEmpotrar.totalSize} mm`, `${componentTotals.sillarEmpotrar.totalPrice.toFixed(2)}`);
    addTableRow(doc, 70, 'Sillar de Sobreponer:', `${componentTotals.sillaSobreponer.totalSize} mm`, `${componentTotals.sillaSobreponer.totalPrice.toFixed(2)}`);

    addSection(doc, 'Nave', 80);
    addTableRow(doc, 85, 'Perimetral Hoja:', `${componentTotals.perimetral.totalSize} mm`, `${componentTotals.perimetral.totalPrice.toFixed(2)}`);
    addTableRow(doc, 90, 'Pisa Vidrio Perimetral de Hoja:', `${componentTotals.pisavidrioPerimetral.totalSize} mm`, `${componentTotals.pisavidrioPerimetral.totalPrice.toFixed(2)}`);

    addSection(doc, 'Accesorios', 100);
    addTableRow(doc, 105, 'Kit de Manija Bidireccional:', `${accessoryTotals.kitManija.cantidad}`, `${accessoryTotals.kitManija.totalPrice.toFixed(2)}`);
    addTableRow(doc, 110, 'Kit de Manija Bidireccional con Llave:', `${accessoryTotals.kitManijaConLlave.cantidad}`, `${accessoryTotals.kitManijaConLlave.totalPrice.toFixed(2)}`);
    addTableRow(doc, 115, 'Escuadra Ensamble Marco/Hoja:', `${accessoryTotals.escuadraEnsambleAwa.cantidad}`, `${accessoryTotals.escuadraEnsambleAwa.totalPrice.toFixed(2)}`);
    addTableRow(doc, 120, 'Escuadra Ensamble Hojas:', `${accessoryTotals.escuadraEnsambleHAwa.cantidad}`, `${accessoryTotals.escuadraEnsambleHAwa.totalPrice.toFixed(2)}`);
    addTableRow(doc, 125, 'Bisagra 3 Aletas:', `${accessoryTotals.bisagra3Awa.cantidad}`, `${accessoryTotals.bisagra3Awa.totalPrice.toFixed(2)}`);
    addTableRow(doc, 130, 'Kit Rodamientos Agujas Superior Guia Inferior 80k:', `${accessoryTotals.kitRodamientosAwa.cantidad}`, `${accessoryTotals.kitRodamientosAwa.totalPrice.toFixed(2)}`);
    addTableRow(doc, 135, 'Freno Rodamiento:', `${accessoryTotals.frenoRodamientoAwa.cantidad}`, `${accessoryTotals.frenoRodamientoAwa.totalPrice.toFixed(2)}`);
    addTableRow(doc, 140, 'Kit Guia Para Hoja Par:', `${accessoryTotals.kitGuiaHAwa.cantidad}`, `${accessoryTotals.kitGuiaHAwa.totalPrice.toFixed(2)}`);

    addSection(doc, 'Empaque', 150);
    addTableRow(doc, 155, 'Empaque (Alto):', `${componentTotals.empaque.totalSize} mm`, '');
    addTableRow(doc, 160, 'Empaque (Ancho):', `${componentTotals.empaque.totalSize2} mm`, `${componentTotals.empaque.totalPrice.toFixed(2)}`);
    addTableRow(doc, 165, 'Felpa 5.00 x 7.00:', `${componentTotals.felpa.totalSize} mm`, `${componentTotals.felpa.totalPrice.toFixed(2)}`);

    addSection(doc, 'Utilitarios', 175);
    addTableRow(doc, 180, 'Tornillos:', `${componentTotals.tornillos.cantidad}`, `${componentTotals.tornillos.totalPrice.toFixed(2)}`);
    addTableRow(doc, 185, 'Silicona:', `${componentTotals.silicona.cantidad}`, `${componentTotals.silicona.totalPrice.toFixed(2)}`);

    addSection(doc, 'Extra', 195);
    addTableRow(doc, 200, 'Vidrio (alto):', `${componentTotals.glass.totalSize} mm`, ``);
    addTableRow(doc, 205, 'Vidrio (ancho):', `${componentTotals.glass.totalSize2} mm`, `${Number(componentTotals.glass.totalPrice).toFixed(2)}`);
    addTableRow(doc, 210, 'Mano de Obra:', ``, `${Number(componentTotals.manodeObra.totalPrice).toFixed(2)}`);

    doc.setFontSize(14);
    doc.setTextColor(cyanBlue);
    doc.text('Total', 170, 220);
    doc.setFontSize(16);
    doc.setTextColor('black');
    const formattedTotal = totalSum.toLocaleString('en-US', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    doc.text(formattedTotal, 150, 225);

    doc.setFontSize(14);
    doc.setTextColor(cyanBlue);
    doc.text('Cantidad', 20, 220);
    doc.text(`${puertas.length}`, 20, 225);

    doc.save('Cotizacion-Sistema-Awa.pdf');
  };

  const getPriceDisplay = () => {
    if (accessories.kitManijaAwa) {
      return `$${accessoryPrices.kitManijaAwa.toFixed(2)}`;
    } else if (accessories.kitManijaConLlaveAwa) {
      return `$${accessoryPrices.kitManijaConLlaveAwa.toFixed(2)}`;
    }
    return ''; // Si no hay ninguna opción seleccionada, no mostrar precio
  };

  const getescuadraEnsambleAwaPrice = () => {
    if (accessories.escuadraEnsambleAwa) {
      return `$${accessoryPrices.escuadraEnsambleAwa.toFixed(2)}`; // Mostrar precio si el checkbox está seleccionado
    }
    return ''; // Si no está seleccionado, no mostrar precio
  };

  const getCajaPrice = () => {
    if (accessories.escuadraEnsambleHAwa) {
      return `$${accessoryPrices.escuadraEnsambleHAwa.toFixed(2)}`; // Mostrar precio si el checkbox está seleccionado
    }
    return ''; // Si no está seleccionado, no mostrar precio
  };

  const getbisagraPrice = () => {
    if (accessories.bisagra3Awa) {
      return `$${accessoryPrices.bisagra3Awa.toFixed(2)}`; // Mostrar precio si el checkbox está seleccionado
    }
    return ''; // Si no está seleccionado, no mostrar precio
  };

  const getrodamientoPrice = () => {
    if (accessories.kitRodamientosAwa) {
      return `$${accessoryPrices.kitRodamientosAwa.toFixed(2)}`; // Mostrar precio si el checkbox está seleccionado
    }
    return ''; // Si no está seleccionado, no mostrar precio
  };

  const getfrenorodamientoPrice = () => {
    if (accessories.frenoRodamientoAwa) {
      return `$${accessoryPrices.frenoRodamientoAwa.toFixed(2)}`; // Mostrar precio si el checkbox está seleccionado
    }
    return ''; // Si no está seleccionado, no mostrar precio
  };

  const getkitguiaPrice = () => {
    if (accessories.kitGuiaHAwa) {
      return `$${accessoryPrices.kitGuiaHAwa.toFixed(2)}`; // Mostrar precio si el checkbox está seleccionado
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
        <img src={colosalImage} alt="Puerta Corrediza Colosal" className="door-image" />

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
        <strong><h1>SISTEMA AGUA 2 HOJAS</h1></strong>
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
              <TableCell><strong>compensador:</strong></TableCell>
              <TableCell>{totalWidth} mm</TableCell>
              <TableCell>${compensadorAwaPrice.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell><strong>cabezal:</strong></TableCell>
              <TableCell>{totalWidth} mm</TableCell>
              <TableCell>${cabezalAwaPrice.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell><strong>vertical Inferior de Marco:</strong> </TableCell>
              <TableCell>{verticalInferiorAwa} mm (3) </TableCell>
              <TableCell>${verticalInferiorAwaPrice.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow key="5">
              <TableCell><strong>Sillar de Empotrar:</strong></TableCell>
              <TableCell>{totalWidth} mm</TableCell>
              <TableCell>${sillarEmpotrarAwaPrice.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow key="6">
              <TableCell><strong>Sillar de Sobreponer:</strong></TableCell>
              <TableCell>{totalWidth} mm </TableCell>
              <TableCell>${sillaSobreponerAwaPrice.toFixed(2)}</TableCell>
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
              <TableCell><strong>Perimetral Hoja:</strong></TableCell>
              <TableCell>{perimetralAwa} mm (8)</TableCell>
              <TableCell>${perimetralAwaPrice.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell><strong>Pisa Vidrio Perimetral de Hoja:</strong> </TableCell>
              <TableCell>{perimetralAwa} mm (8)</TableCell>
              <TableCell>${pisavidrioPerimetralAwaPrice.toFixed(2)}</TableCell>
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
                name="kitManijaAwa"
                value="Kit de Manija Bidireccional"
                checked={accessories.kitManijaAwa}
                onChange={handleChange}
              />
                Kit de Manija Bidireccional

                <br />
                <input
                  type="radio"
                  name="kitManijaConLlaveAwa"
                  value="Kit de Manija Bidireccional con Llave"
                  checked={accessories.kitManijaConLlaveAwa}
                  onChange={handleChange}
                />
                Kit de Manija Bidireccional con Llave
              </TableCell>
              <TableCell>$ {getPriceDisplay()}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell><input
                type="checkbox"
                name="escuadraEnsambleAwa"
                checked={accessories.escuadraEnsambleAwa}
                onChange={handleChange}
              />
                Escuadra Ensamble Marco/Hoja</TableCell>
              <TableCell>$ {getescuadraEnsambleAwaPrice()}</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell><input
                type="checkbox"
                name="escuadraEnsambleHAwa"
                checked={accessories.escuadraEnsambleHAwa}
                onChange={handleChange}
              />
                Escuadra Ensamble Hojas</TableCell>
              <TableCell>$ {getCajaPrice()}</TableCell>
            </TableRow>
            <TableRow key="5">
              <TableCell><input
                type="checkbox"
                name="bisagra3Awa"
                checked={accessories.bisagra3Awa}
                onChange={handleChange}
              />
                Bisagra 3 Aletas</TableCell>
              <TableCell>$ {getbisagraPrice()}</TableCell>
            </TableRow>
            <TableRow key="6">
              <TableCell><input
                type="checkbox"
                name="kitRodamientosAwa"
                checked={accessories.kitRodamientosAwa}
                onChange={handleChange}
              />
                Kit Rodamientos Agujas Superior Guia Inferior 80k</TableCell>
              <TableCell>$ {getrodamientoPrice()}</TableCell>
            </TableRow>
            <TableRow key="7">
              <TableCell><input
                type="checkbox"
                name="frenoRodamientoAwa"
                checked={accessories.frenoRodamientoAwa}
                onChange={handleChange}
              />
                Freno Rodamiento</TableCell>
              <TableCell>$ {getfrenorodamientoPrice()}</TableCell>
            </TableRow>
            <TableRow key="8">
              <TableCell><input
                type="checkbox"
                name="kitGuiaHAwa"
                checked={accessories.kitGuiaHAwa}
                onChange={handleChange}
              />
                Kit Guia Para Hoja Par</TableCell>
              <TableCell>$ {getkitguiaPrice()}</TableCell>
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
              <TableCell>{empaquecolHeight} mm
                <br /> {empaquecolWidth} mm
              </TableCell>
              <TableCell>${empaquecolPrice.toFixed(2)}</TableCell>
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

export default Awa2h;
