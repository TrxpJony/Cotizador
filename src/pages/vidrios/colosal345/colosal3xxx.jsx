import '../../../css/colosal.css'; // Archivo CSS para estilos
import colosal3Image from '../../../img/colxxx.png'; // Importar la imagen
import { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import preciosData from '../../../api/db.json';
import { jsPDF } from 'jspdf'; // Importamos jsPDF
import logo from '../../../../src/img/logo.png'

const Colosal3xxx = () => {
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


  const { width, height } = dimensions;
  //const halfWidth = width ? width / 2 : '';
  const totalHeight = height ? height : '';
  const totalWidth = width ? width : '';

  const { glassPrice } = glassDimensions;

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
  const perimetralNaveCol345 = (totalWidth && totalHeight) ? ((totalWidth / 3 + 13) * 6 + totalHeight * 6) : 0;
  // Calcular precios

  const marcoPerimetralCol345Price = (marcoPerimetralCol345 / 1000) * prices.marcoPerimetralCol345;
  const perimetralNaveCol345Price = (perimetralNaveCol345 / 1000) * prices.perimetralNaveCol345;
  const engancheCol345Price = prices.engancheCol345 * (cuadHeight / 1000);

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
  const manodeObraPrice = prices.manodeObra * area;
  const tornillosPrice = utilitaryPrices.tornillos * 44;
  const siliconaPrice = utilitaryPrices.silicona * 1;

  const [componentTotals, setComponentTotals] = useState({
    marcoPerimetral: { totalSize: 0, totalPrice: 0 },
    perimetralNave: { totalSize: 0, totalPrice: 0 },
    enganche: { totalSize: 0, totalPrice: 0 },
    empaque: { totalSize: 0, totalSize2: 0, totalPrice: 0 },
    felpa: { totalSize: 0, totalPrice: 0 },
    tornillos: { cantidad: 0, totalPrice: 0 },
    silicona: { cantidad: 0, totalPrice: 0 },
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
    engancheCol345Price +
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
    doc.text('Detalle de la cotización Colosal 345 XO-OX', 70, 34); // Texto blanco en la cabecera

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

    doc.text(`Marco Perimetral:`, 20, 55);
    doc.text(`${componentTotals.marcoPerimetral.totalSize} mm (4)`, 120, 55);
    doc.text(`${componentTotals.marcoPerimetral.totalPrice.toFixed(2)}`, 170, 55);

    // Nave
    doc.setFontSize(12); // Título más pequeño
    doc.setTextColor(cyanBlue);
    doc.text('Nave', 20, 65); // Título de la sección Nave

    doc.setFontSize(10);
    doc.setTextColor('black');

    doc.text('Pieza', 20, 70);
    doc.text('Tamaño', 120, 70);
    doc.text('Precio', 170, 70);

    doc.setFontSize(10); // Texto más pequeño para los detalles
    doc.setTextColor('black');

    doc.text(`Perimetral Nave:`, 20, 75);
    doc.text(`${componentTotals.perimetralNave.totalSize} mm (12)`, 120, 75);
    doc.text(`${componentTotals.perimetralNave.totalPrice.toFixed(2)}`, 170, 75);
    doc.text(`Enganche:`, 20, 80);
    doc.text(`${componentTotals.enganche.totalSize} mm (4)`, 120, 80);
    doc.text(`${componentTotals.enganche.totalPrice.toFixed(2)}`, 170, 80);


    // Tabla Accesorios
    doc.setFontSize(12); // Título más pequeño
    doc.setTextColor(cyanBlue);
    doc.text('Accesorios', 20, 90); // Título de la sección Empaquecol

    // Tabla de Accesorios
    doc.setFontSize(10);
    doc.setTextColor('black');

    doc.text('Pieza', 20, 95);
    doc.text('Precio', 170, 95);

    doc.text(`Kit de Cierre:`, 20, 100);
    doc.text(`${accessoryTotals.kitCierre.cantidad}`, 120, 100);
    doc.text(`${accessoryTotals.kitCierre.totalPrice.toFixed(2)}`, 170, 100);

    doc.text(`Kit de Cierre con Llave:`, 20, 105);
    doc.text(`${accessoryTotals.kitCierreConLlave.cantidad}`, 120, 105);
    doc.text(`${accessoryTotals.kitCierreConLlave.totalPrice.toFixed(2)}`, 170, 105);

    doc.text(`Cubeta de Angeo Negra:`, 20, 110);
    doc.text(`${accessoryTotals.cubetaAngeo.cantidad}`, 120, 110);
    doc.text(`${accessoryTotals.cubetaAngeo.totalPrice.toFixed(2)}`, 170, 110);

    doc.text(`Rodamiento Simple en Agujas 70 Kilos:`, 20, 115);
    doc.text(`${accessoryTotals.rodamientoSimple.cantidad}`, 120, 115);
    doc.text(`${accessoryTotals.rodamientoSimple.totalPrice.toFixed(2)}`, 170, 115);

    doc.text(`Rodamiento Doble en Agujas 140 Kilos:`, 20, 120);
    doc.text(`${accessoryTotals.rodamientoDoble.cantidad}`, 120, 120);
    doc.text(`${accessoryTotals.rodamientoDoble.totalPrice.toFixed(2)}`, 170, 120);

    doc.text(`Caja Deflectora:`, 20, 125);
    doc.text(`${accessoryTotals.cajaDeflectora.cantidad}`, 120, 125);
    doc.text(`${accessoryTotals.cajaDeflectora.totalPrice.toFixed(2)}`, 170, 125);

    doc.text(`Kit 8 Escuadras de Alineación:`, 20, 130);
    doc.text(`${accessoryTotals.Kit8Escuadras.cantidad}`, 120, 130);
    doc.text(`${accessoryTotals.Kit8Escuadras.totalPrice.toFixed(2)}`, 170, 130);

    doc.text(`Kit 4 Anclas Esquinero:`, 20, 135);
    doc.text(`${accessoryTotals.kit4Anclas.cantidad}`, 120, 135);
    doc.text(`${accessoryTotals.kit4Anclas.totalPrice.toFixed(2)}`, 170, 135);

    doc.text(`Kit 4 Alza Guia/Tope Hoja Fija/Movil:`, 20, 140);
    doc.text(`${accessoryTotals.kit4Alza.cantidad}`, 120, 140);
    doc.text(`${accessoryTotals.kit4Alza.totalPrice.toFixed(2)}`, 170, 140);

    doc.text(`Kit 4 Tapa y Tapeta Enganche:`, 20, 145);
    doc.text(`${accessoryTotals.kit4Tapa.cantidad}`, 120, 145);
    doc.text(`${accessoryTotals.kit4Tapa.totalPrice.toFixed(2)}`, 170, 145);

    doc.text(`Kit 2 Cortavientos:`, 20, 150);
    doc.text(`${accessoryTotals.kit2Cortavientos.cantidad}`, 120, 150);
    doc.text(`${accessoryTotals.kit2Cortavientos.totalPrice.toFixed(2)}`, 170, 150);

    doc.text(`Kit 4 Seguros de Hoja Fija:`, 20, 155);
    doc.text(`${accessoryTotals.kit4Seguros.cantidad}`, 120, 155);
    doc.text(`${accessoryTotals.kit4Seguros.totalPrice.toFixed(2)}`, 170, 155);
    
    // Tabla Empaque
    doc.setFontSize(12); // Título más pequeño
    doc.setTextColor(cyanBlue);
    doc.text('Empaque', 20, 165); // Título de la sección Empaque

    // Tabla de Empaque
    doc.setFontSize(10);
    doc.setTextColor('black');

    doc.text('Pieza', 20, 170);
    doc.text('Tamaño', 120, 170);
    doc.text('Precio', 170, 170);

    doc.text(`Empaque (Alto):`, 20, 175);
    doc.text(`${componentTotals.empaque.totalSize} mm`, 120, 175);

    doc.text(`Empaque (Ancho):`, 20, 180);
    doc.text(`${componentTotals.empaque.totalSize2} mm`, 120, 180);
    doc.text(`${componentTotals.empaque.totalPrice.toFixed(2)}`, 170, 177.5);

    doc.text(`Felpa 5.00 x 7.00:`, 20, 185);
    doc.text(`${componentTotals.felpa.totalSize} mm`, 120, 185);
    doc.text(`${componentTotals.felpa.totalPrice.toFixed(2)}`, 170, 185);

    // Tabla Utilitarios
    doc.setFontSize(12); // Título más pequeño
    doc.setTextColor(cyanBlue);
    doc.text('Utilitarios', 20, 195); // Título de la sección Empaque

    // Tabla de Utilitarios
    doc.setFontSize(10);
    doc.setTextColor('black');

    doc.text('Pieza', 20, 200);
    doc.text('cantidad', 120, 200);
    doc.text('Precio', 170, 200);

    doc.text(`Torinillos:`, 20, 205);
    doc.text(`${componentTotals.tornillos.cantidad}`, 120, 205);
    doc.text(`${componentTotals.tornillos.totalPrice.toFixed(2)}`, 170, 205);

    doc.text(`Silicona:`, 20, 210);
    doc.text(`${componentTotals.silicona.cantidad}`, 120, 210);
    doc.text(`${componentTotals.silicona.totalPrice.toFixed(2)}`, 170, 210);

    // Total
    doc.setFontSize(14);
    doc.setTextColor(cyanBlue);
    doc.text('Total', 170, 220); // Título Total

    doc.setFontSize(16);
    doc.setTextColor('black');
    // Formateamos el total con separadores de miles y el símbolo de moneda
    const formattedTotal = totalSum.toLocaleString('en-US', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    // Mostramos el total formateado
    doc.text(formattedTotal, 150, 225); // Total

    // Total puertas
    doc.setFontSize(14);
    doc.setTextColor(cyanBlue);

    doc.text('Cantidad de puertas', 20, 220); // Título Total
    doc.text(`${puertas.length}`, 20, 225);

    // Guardamos el archivo PDF
    doc.save('cotizacion-colosal345.pdf'); // Guardamos el archivo con el nombre
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
        <strong><h1>COLOSAL 345 XO-OX</h1></strong>
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
              <TableCell>{perimetralNaveCol345} mm (12)</TableCell>
              <TableCell>${perimetralNaveCol345Price.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell><strong>Enganche:</strong> </TableCell>
              <TableCell>{doubleHeight} mm (4) </TableCell>
              <TableCell>${engancheCol345Price.toFixed(2)}</TableCell>
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

export default Colosal3xxx;
