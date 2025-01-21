import '../../../css/colosal.css'; // Archivo CSS para estilos
import colosal3Image from '../../../img/coloxxo.png'; // Importar la imagen
import { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import preciosData from '../../../api/db.json';
import { jsPDF } from 'jspdf'; // Importamos jsPDF
import logo from '../../../../src/img/logo.png'

const Colosal3oxxo = () => {
  const navigate = useNavigate(); // Inicializar useNavigate
  const [dimensions, setDimensions] = useState({ width: '', height: '' });
  const [accessories, setAccessories] = useState({
    kitCierrecol345: false,
    kitCierreConLlavecol345: false,
    Kit8Escuadrascol345: false,
    kit4Anclascol345: false,
    kit4Alzacol345: false,
    kit4Tapacol345: false,
    kit2Cortavientoscol345: false,
    kit4Seguroscol345: false,
    cubetaAngeo: false,
    rodamientoSimple70col: false,
    rodamientoDoble140col: false,
    cajaDeflectora: false,
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
      if (name === 'kitCierrecol345' || name === 'kitCierreConLlavecol345') {
        setAccessories((prev) => ({
          ...prev,
          kitCierrecol345: name === 'kitCierrecol345' ? checked : false,
          kitCierreConLlavecol345: name === 'kitCierreConLlavecol345' ? checked : false,
        }));
      } else if (name === 'rodamientoSimple70col' || name === 'rodamientoDoble140col') {
        setAccessories((prev) => ({
          ...prev,
          rodamientoSimple70col: name === 'rodamientoSimple70col' ? checked : false,
          rodamientoDoble140col: name === 'rodamientoDoble140col' ? checked : false,
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
  const cuadHeight = totalHeight ? totalHeight * 4 : '';
  const area = width && height ? (width * height) / 1000000 : ''; // Convertir a m²
  const empaquecolHeight = height && width ? height * 4 : '';
  const empaquecolWidth = height && width ? width * 2 : '';
  const felpaHeight = height && width ? height * 6 : '';
  const felpaWidth = height && width ? width * 2 : '';
  const empaquecolPrice = (empaquecolHeight + empaquecolWidth) / 1000 * prices.empaquecol; // Precio total del empaquecol
  const totFelpa = (felpaHeight + felpaWidth);
  const marcoPerimetralCol345 = (totalWidth && totalHeight) ? (totalWidth * 2 + totalHeight * 2) : 0;
  const perimetralNaveCol345 = (totalWidth && totalHeight) ? ((totalWidth / 3 + 31) * 8 + totalHeight * 8) : 0;
  
  // Calcular precios
  const marcoPerimetralCol345Price = (marcoPerimetralCol345 / 1000) * prices.marcoPerimetralCol345;
  const perimetralNaveCol345Price = (perimetralNaveCol345 / 1000) * prices.perimetralNaveCol345;
  const engancheCol345Price = prices.engancheCol345 * (cuadHeight / 1000);
  const adaptadorCol345Price = prices.adaptadorCol345 * (totalHeight / 1000);

  const kitCierrecol345Price = accessories.kitCierrecol345 ? accessoryPrices.kitCierrecol345 : 0;
  const kitCierreConLlavecol345Price = accessories.kitCierreConLlavecol345 ? accessoryPrices.kitCierreConLlavecol345 : 0;
  const Kit8Escuadrascol345Price = accessories.Kit8Escuadrascol345 ? accessoryPrices.Kit8Escuadrascol345 : 0;
  const kit4Anclascol345Price = accessories.kit4Anclascol345 ? accessoryPrices.kit4Anclascol345 : 0;
  const kit4Alzacol345Price = accessories.kit4Alzacol345 ? accessoryPrices.kit4Alzacol345 : 0;
  const kit4Tapacol345Price = accessories.kit4Tapacol345 ? accessoryPrices.kit4Tapacol345 : 0;
  const kit2Cortavientoscol345Price = accessories.kit2Cortavientoscol345 ? accessoryPrices.kit2Cortavientoscol345 : 0;
  const kit4Seguroscol345Price = accessories.kit4Seguroscol345 ? accessoryPrices.kit4Seguroscol345 : 0;
  const cubetaAngeoPrice = accessories.cubetaAngeo ? accessoryPrices.cubetaAngeo : 0;
  const rodamientoSimple70colPrice = accessories.rodamientoSimple70col ? accessoryPrices.rodamientoSimple70col : 0;
  const rodamientoDoble140colPrice = accessories.rodamientoDoble140col ? accessoryPrices.rodamientoDoble140col : 0;
  const cajaDeflectoraPrice = accessories.cajaDeflectora ? accessoryPrices.cajaDeflectora : 0;
  const felpaPrice = (felpaHeight + felpaWidth) / 1000 * prices.felpacol; // Precio total de la felpa

  const tornillosPrice = utilitaryPrices.tornillos * 76;
  const siliconaPrice = utilitaryPrices.silicona * 1;

  const [componentTotals, setComponentTotals] = useState({
    marcoPerimetral: { totalSize: 0, totalPrice: 0 },
    perimetralNave: { totalSize: 0, totalPrice: 0 },
    enganche: { totalSize: 0, totalPrice: 0 },
    adaptador: { totalSize: 0, totalPrice: 0 },
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
    kitCierreConLlave: { cantidad: 0, totalPrice: 0 },
    cubetaAngeo: { cantidad: 0, totalPrice: 0 },
    rodamientoSimple: { cantidad: 0, totalPrice: 0 },
    rodamientoDoble: { cantidad: 0, totalPrice: 0 },
    cajaDeflectora: { cantidad: 0, totalPrice: 0 },
    Kit8Escuadras: { cantidad: 0, totalPrice: 0 },
    kit4Anclas: { cantidad: 0, totalPrice: 0 },
    kit4Alza: { cantidad: 0, totalPrice: 0 },
    kit4Tapa: { cantidad: 0, totalPrice: 0 },
    kit2Cortavientos: { cantidad: 0, totalPrice: 0 },
    kit4Seguros: { cantidad: 0, totalPrice: 0 },
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
        totalSize: prevTotals.marcoPerimetral.totalSize + parseFloat(marcoPerimetralCol345), // Sumar tamaño
        totalPrice: prevTotals.marcoPerimetral.totalPrice + marcoPerimetralCol345Price, // Sumar precio
      },
      perimetralNave: {
        totalSize: prevTotals.perimetralNave.totalSize + parseFloat(perimetralNaveCol345), // Sumar tamaño
        totalPrice: prevTotals.perimetralNave.totalPrice + perimetralNaveCol345Price, // Sumar precio
      },
      enganche: {
        totalSize: prevTotals.enganche.totalSize + parseFloat(cuadHeight),
        totalPrice: prevTotals.enganche.totalPrice + engancheCol345Price,
      },
      adaptador: {
        totalSize: prevTotals.adaptador.totalSize + parseFloat(totalHeight),
        totalPrice: prevTotals.adaptador.totalPrice + adaptadorCol345Price,
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
        cantidad: prevTotals.tornillos.cantidad + 76,
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
      kitCierre: accessories.kitCierrecol345
        ? {
          cantidad: prevTotals.kitCierre.cantidad + 1,
          totalPrice: prevTotals.kitCierre.totalPrice + kitCierrecol345Price,
        }
        : prevTotals.kitCierre,
      kitCierreConLlave: accessories.kitCierreConLlavecol345
        ? {
          cantidad: prevTotals.kitCierreConLlave.cantidad + 1,
          totalPrice: prevTotals.kitCierreConLlave.totalPrice + kitCierreConLlavecol345Price,
        }
        : prevTotals.kitCierreConLlave,
      cubetaAngeo: accessories.cubetaAngeo
        ? {
          cantidad: prevTotals.cubetaAngeo.cantidad + 1,
          totalPrice: prevTotals.cubetaAngeo.totalPrice + cubetaAngeoPrice,
        }
        : prevTotals.cubetaAngeo,
      rodamientoSimple: accessories.rodamientoSimple70col
        ? {
          cantidad: prevTotals.rodamientoSimple.cantidad + 2,
          totalPrice: prevTotals.rodamientoSimple.totalPrice + rodamientoSimple70colPrice,
        }
        : prevTotals.rodamientoSimple,
      rodamientoDoble: accessories.rodamientoDoble140col
        ? {
          cantidad: prevTotals.rodamientoDoble.cantidad + 2,
          totalPrice: prevTotals.rodamientoDoble.totalPrice + rodamientoDoble140colPrice,
        }
        : prevTotals.rodamientoDoble,
      cajaDeflectora: accessories.cajaDeflectora
        ? {
          cantidad: prevTotals.cajaDeflectora.cantidad + 1,
          totalPrice: prevTotals.cajaDeflectora.totalPrice + cajaDeflectoraPrice,
        }
        : prevTotals.cajaDeflectora,
      Kit8Escuadras: accessories.Kit8Escuadrascol345
        ? {
          cantidad: prevTotals.Kit8Escuadras.cantidad + 1,
          totalPrice: prevTotals.Kit8Escuadras.totalPrice + Kit8Escuadrascol345Price,
        }
        : prevTotals.Kit8Escuadras,
      kit4Anclas: accessories.kit4Anclascol345
        ? {
          cantidad: prevTotals.kit4Anclas.cantidad + 1,
          totalPrice: prevTotals.kit4Anclas.totalPrice + kit4Anclascol345Price,
        }
        : prevTotals.kit4Anclas,
      kit4Alza: accessories.kit4Alzacol345
        ? {
          cantidad: prevTotals.kit4Alza.cantidad + 1,
          totalPrice: prevTotals.kit4Alza.totalPrice + kit4Alzacol345Price,
        }
        : prevTotals.kit4Alza,
      kit4Tapa: accessories.kit4Tapacol345
        ? {
          cantidad: prevTotals.kit4Tapa.cantidad + 1,
          totalPrice: prevTotals.kit4Tapa.totalPrice + kit4Tapacol345Price,
        }
        : prevTotals.kit4Tapa,
      kit2Cortavientos: accessories.kit2Cortavientoscol345
        ? {
          cantidad: prevTotals.kit2Cortavientos.cantidad + 1,
          totalPrice: prevTotals.kit2Cortavientos.totalPrice + kit2Cortavientoscol345Price,
        }
        : prevTotals.kit2Cortavientos,
      kit4Seguros: accessories.kit4Seguroscol345
        ? {
          cantidad: prevTotals.kit4Seguros.cantidad + 1,
          totalPrice: prevTotals.kit4Seguros.totalPrice + kit4Seguroscol345Price,
        }
        : prevTotals.kit4Seguros,
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
    engancheCol345Price +
    adaptadorCol345Price +
    kitCierrecol345Price +
    kitCierreConLlavecol345Price +
    Kit8Escuadrascol345Price +
    kit4Anclascol345Price +
    kit4Alzacol345Price +
    kit4Tapacol345Price +
    kit2Cortavientoscol345Price +
    kit4Seguroscol345Price +
    cubetaAngeoPrice +
    rodamientoSimple70colPrice +
    rodamientoDoble140colPrice +
    cajaDeflectoraPrice +
    marcoPerimetralCol345Price +  // Agregar marco perimetral
    perimetralNaveCol345Price +   // Agregar perimetral nave
    felpaPrice +
    empaquecolPrice +
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
      doc.text('Detalle de la cotización Colosal 345 OXXO', 70, 34);
  
      addSection(doc, 'Marco', 45);
      addTableRow(doc, 50, 'Marco Perimetral:', `${componentTotals.marcoPerimetral.totalSize} mm`, `${componentTotals.marcoPerimetral.totalPrice.toFixed(2)}`);
  
      addSection(doc, 'Nave', 60);
      addTableRow(doc, 65, 'Perimetral Nave:', `${componentTotals.perimetralNave.totalSize} mm`, `${componentTotals.perimetralNave.totalPrice.toFixed(2)}`);
      addTableRow(doc, 70, 'Enganche:', `${componentTotals.enganche.totalSize} mm`, `${componentTotals.enganche.totalPrice.toFixed(2)}`);
      addTableRow(doc, 75, 'Adaptador:', `${componentTotals.adaptador.totalSize} mm`, `${componentTotals.adaptador.totalPrice.toFixed(2)}`);
  
      addSection(doc, 'Accesorios', 85);
      addTableRow(doc, 90, 'Kit de Cierre:', `${accessoryTotals.kitCierre.cantidad}`, `${accessoryTotals.kitCierre.totalPrice.toFixed(2)}`);
      addTableRow(doc, 95, 'Kit de Cierre con Llave:', `${accessoryTotals.kitCierreConLlave.cantidad}`, `${accessoryTotals.kitCierreConLlave.totalPrice.toFixed(2)}`);
      addTableRow(doc, 100, 'Cubeta de Angeo Negra:', `${accessoryTotals.cubetaAngeo.cantidad}`, `${accessoryTotals.cubetaAngeo.totalPrice.toFixed(2)}`);
      addTableRow(doc, 105, 'Rodamiento Simple en Agujas 70 Kilos:', `${accessoryTotals.rodamientoSimple.cantidad}`, `${accessoryTotals.rodamientoSimple.totalPrice.toFixed(2)}`);
      addTableRow(doc, 110, 'Rodamiento Doble en Agujas 140 Kilos:', `${accessoryTotals.rodamientoDoble.cantidad}`, `${accessoryTotals.rodamientoDoble.totalPrice.toFixed(2)}`);
      addTableRow(doc, 115, 'Caja Deflectora:', `${accessoryTotals.cajaDeflectora.cantidad}`, `${accessoryTotals.cajaDeflectora.totalPrice.toFixed(2)}`);
      addTableRow(doc, 120, 'Kit 8 Escuadras de Alineación:', `${accessoryTotals.Kit8Escuadras.cantidad}`, `${accessoryTotals.Kit8Escuadras.totalPrice.toFixed(2)}`);
      addTableRow(doc, 125, 'Kit 4 Anclas Esquinero:', `${accessoryTotals.kit4Anclas.cantidad}`, `${accessoryTotals.kit4Anclas.totalPrice.toFixed(2)}`);
      addTableRow(doc, 130, 'Kit 4 Alza Guia/Tope Hoja Fija/Movil:', `${accessoryTotals.kit4Alza.cantidad}`, `${accessoryTotals.kit4Alza.totalPrice.toFixed(2)}`);
      addTableRow(doc, 135, 'Kit 4 Tapa y Tapeta Enganche:', `${accessoryTotals.kit4Tapa.cantidad}`, `${accessoryTotals.kit4Tapa.totalPrice.toFixed(2)}`);
      addTableRow(doc, 140, 'Kit 2 Cortavientos:', `${accessoryTotals.kit2Cortavientos.cantidad}`, `${accessoryTotals.kit2Cortavientos.totalPrice.toFixed(2)}`);
      addTableRow(doc, 145, 'Kit 4 Seguros de Hoja Fija:', `${accessoryTotals.kit4Seguros.cantidad}`, `${accessoryTotals.kit4Seguros.totalPrice.toFixed(2)}`);
  
      addSection(doc, 'Empaque', 155);
      addTableRow(doc, 160, 'Empaque (Alto):', `${componentTotals.empaque.totalSize} mm`, '');
      addTableRow(doc, 165, 'Empaque (Ancho):', `${componentTotals.empaque.totalSize2} mm`, `${componentTotals.empaque.totalPrice.toFixed(2)}`);
      addTableRow(doc, 170, 'Felpa 5.00 x 7.00:', `${componentTotals.felpa.totalSize} mm`, `${componentTotals.felpa.totalPrice.toFixed(2)}`);
  
      addSection(doc, 'Utilitarios', 180);
      addTableRow(doc, 185, 'Tornillos:', `${componentTotals.tornillos.cantidad}`, `${componentTotals.tornillos.totalPrice.toFixed(2)}`);
      addTableRow(doc, 190, 'Silicona:', `${componentTotals.silicona.cantidad}`, `${componentTotals.silicona.totalPrice.toFixed(2)}`);
  
      addSection(doc, 'Extra', 200);
      addTableRow(doc, 205, 'Vidrio (alto):', `${componentTotals.glass.totalSize} mm`, ``);
      addTableRow(doc, 210, 'Vidrio (ancho):', `${componentTotals.glass.totalSize2} mm`, `${Number(componentTotals.glass.totalPrice).toFixed(2)}`);
      addTableRow(doc, 215, 'Mano de Obra:', ``, `${Number(componentTotals.manodeObra.totalPrice).toFixed(2)}`);
  
  
      doc.setFontSize(14);
      doc.setTextColor(cyanBlue);
      doc.text('Total', 170, 225);
      doc.setFontSize(16);
      doc.setTextColor('black');
      const formattedTotal = totalSum.toLocaleString('en-US', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      doc.text(formattedTotal, 150, 230);
  
      doc.setFontSize(14);
      doc.setTextColor(cyanBlue);
      doc.text('Cantidad', 20, 225);
      doc.text(`${puertas.length}`, 20, 230);
  
      doc.save('Cotizacion-Colosal345.pdf');
    };

  const getPriceDisplay = () => {
    if (accessories.kitCierrecol345) {
      return `$${accessoryPrices.kitCierrecol345.toFixed(2)}`;
    } else if (accessories.kitCierreConLlavecol345) {
      return `$${accessoryPrices.kitCierreConLlavecol345.toFixed(2)}`;
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
    if (accessories.rodamientoSimple70col) {
      return `$${accessoryPrices.rodamientoSimple70col.toFixed(2)}`; // Mostrar precio si 'rodamientoSimple70col' está seleccionado
    } else if (accessories.rodamientoDoble140col) {
      return `$${accessoryPrices.rodamientoDoble140col.toFixed(2)}`; // Mostrar precio si 'rodamientoDoble140col' está seleccionado
    }
    return ''; // Si no se selecciona ningún radio button, no mostrar precio
  };


  const getCajaPrice = () => {
    if (accessories.cajaDeflectora) {
      return `$${accessoryPrices.cajaDeflectora.toFixed(2)}`; // Mostrar precio si el checkbox está seleccionado
    }
    return ''; // Si no está seleccionado, no mostrar precio
  };

  const getKit8Escuadrascol345Price = () => {
    if (accessories.Kit8Escuadrascol345) {
      return `$${accessoryPrices.Kit8Escuadrascol345.toFixed(2)}`;
    }
    return ''; // Si no está seleccionado, no mostrar precio
  };

  const getKit4Anclascol345Price = () => {
    if (accessories.kit4Anclascol345) {
      return `$${accessoryPrices.kit4Anclascol345.toFixed(2)}`;
    }
    return ''; // Si no está seleccionado, no mostrar precio
  };

  const getKit4Alzacol345Price = () => {
    if (accessories.kit4Alzacol345) {
      return `$${accessoryPrices.kit4Alzacol345.toFixed(2)}`;
    }
    return ''; // Si no está seleccionado, no mostrar precio
  };

  const getKit4Tapacol345Price = () => {
    if (accessories.kit4Tapacol345) {
      return `$${accessoryPrices.kit4Tapacol345.toFixed(2)}`;
    }
    return ''; // Si no está seleccionado, no mostrar precio
  };

  const getKit2Cortavientoscol345Price = () => {
    if (accessories.kit2Cortavientoscol345) {
      return `$${accessoryPrices.kit2Cortavientoscol345.toFixed(2)}`;
    }
    return ''; // Si no está seleccionado, no mostrar precio
  };
  const getkit4Seguroscol345Price = () => {
    if (accessories.kit4Seguroscol345) {
      return `$${accessoryPrices.kit4Seguroscol345.toFixed(2)}`;
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
            <img src={colosal3Image} alt="Puerta Corrediza Colosal" className="door-image" />
    
            {/* Dimensiones dinámicas */}
            <div className="dimensions-display">
              {width && height ? (
                <>
                  <p>Dimensiones totales: {height} mm (Alto) x {width} mm (Ancho) </p>
                  <p>Área: {area} m²</p>
                </>
              ) : (
                <p>Ingrese las dimensiones  en milímetros.</p>
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
        <strong><h1>COLOSAL 345 OXXO</h1></strong>
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
              <TableCell>{marcoPerimetralCol345} mm (4)</TableCell>
              <TableCell>${marcoPerimetralCol345Price.toFixed(2)}</TableCell>
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
              <TableCell><strong>Perimetral Nave:</strong></TableCell>
              <TableCell>{perimetralNaveCol345} mm (16)</TableCell>
              <TableCell>${perimetralNaveCol345Price.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell><strong>Enganche:</strong> </TableCell>
              <TableCell>{doubleHeight} mm (4) </TableCell>
              <TableCell>${engancheCol345Price.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell><strong>Adaptador:</strong> </TableCell>
              <TableCell>{totalHeight} mm </TableCell>
              <TableCell>${adaptadorCol345Price.toFixed(2)}</TableCell>
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
                name="kitCierrecol345"
                value="Kit de Cierre"
                checked={accessories.kitCierrecol345}
                onChange={handleChange}
              />
                Kit de Cierre
                <br />
                <input
                  type="radio"
                  name="kitCierreConLlavecol345"
                  value="Kit de Cierre con Llave"
                  checked={accessories.kitCierreConLlavecol345}
                  onChange={handleChange}
                />
                Kit de Cierre con Llave
              </TableCell>
              <TableCell>$ {getPriceDisplay()}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell><input
                type="checkbox"
                name="cubetaAngeo"
                checked={accessories.cubetaAngeo}
                onChange={handleChange}
              />
                Cubeta de Angeo Negra</TableCell>
              <TableCell>$ {getCubetaAngeoPrice()}</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell><input
                type="radio"
                name="rodamientoSimple70col"
                checked={accessories.rodamientoSimple70col}
                onChange={handleChange}
              />
                Rodamiento Simple en Agujas 70 Kilos
                <br />
                <input
                  type="radio"
                  name="rodamientoDoble140col"
                  checked={accessories.rodamientoDoble140col}
                  onChange={handleChange}
                />
                Rodamiento Doble en Agujas 140 Kilos</TableCell>
              <TableCell>$ {getRodamientoPrice()}</TableCell>
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
                name="Kit8Escuadrascol345"
                checked={accessories.Kit8Escuadrascol345}
                onChange={handleChange}
              />
                Kit 8 Escuadras de Alineación</TableCell>
              <TableCell>$ {getKit8Escuadrascol345Price()}</TableCell>
            </TableRow>
            <TableRow key="7">
              <TableCell><input
                type="checkbox"
                name="kit4Anclascol345"
                checked={accessories.kit4Anclascol345}
                onChange={handleChange}
              />
                Kit 4 Anclas Esquinero</TableCell>
              <TableCell>$ {getKit4Anclascol345Price()}</TableCell>
            </TableRow>
            <TableRow key="8">
              <TableCell><input
                type="checkbox"
                name="kit4Alzacol345"
                checked={accessories.kit4Alzacol345}
                onChange={handleChange}
              />
                Kit 4 Alza Guia/Tope Hoja Fija/Movil</TableCell>
              <TableCell>$ {getKit4Alzacol345Price()}</TableCell>
            </TableRow>
            <TableRow key="9">
              <TableCell><input
                type="checkbox"
                name="kit4Tapacol345"
                checked={accessories.kit4Tapacol345}
                onChange={handleChange}
              />
                Kit 4 Tapa y Tapeta Enganche</TableCell>
              <TableCell>$ {getKit4Tapacol345Price()}</TableCell>
            </TableRow>
            <TableRow key="10">
              <TableCell><input
                type="checkbox"
                name="kit2Cortavientoscol345"
                checked={accessories.kit2Cortavientoscol345}
                onChange={handleChange}
              />
                Kit 2 Cortavientos</TableCell>
              <TableCell>$ {getKit2Cortavientoscol345Price()}</TableCell>
            </TableRow>
            <TableRow key="11">
              <TableCell><input
                type="checkbox"
                name="kit4Seguroscol345"
                checked={accessories.kit4Seguroscol345}
                onChange={handleChange}
              />
                Kit 4 Seguros de Hoja Fija</TableCell>
              <TableCell>$ {getkit4Seguroscol345Price()}</TableCell>
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
              <TableCell>76</TableCell>
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
        <Table aria-label="TABLA EMPAQuecol">
          <TableHeader>
            <TableColumn><h1>Empaquecol</h1></TableColumn>
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
              <TableCell><strong>Empaquecol (Alto):
                <br />
                Empaquecol (Ancho): </strong></TableCell>
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

export default Colosal3oxxo;
