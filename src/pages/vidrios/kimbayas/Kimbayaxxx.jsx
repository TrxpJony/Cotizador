import '../../../css/colosal.css'; // Archivo CSS para estilos
import kimbayaImage from '../../../img/kimxxx.png'; // Importar la imagen
import { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { jsPDF } from 'jspdf'; // Importamos jsPDF
import { useNavigate } from 'react-router-dom';
import preciosData from '../../../api/db.json';
import logo from '../../../../src/img/logo.png'

const Kimbayaxxx = () => {
  const navigate = useNavigate(); // Inicializar useNavigate
  const [dimensions, setDimensions] = useState({ width: '', height: '' });
  const [accessories, setAccessories] = useState({
    escuadraEnsamblekim: false,
    escuadraHoja: false,
    escuadraMovil: false,
    espumaSelloSukim: false,
    espumaSelloInkim: false,
    sifonSistemaskim: false,
    kit6kim: false,
    kit6H: false,
    kit6M: false,
    kit2kim: false,
    kit2H: false,
    kit2M: false,
    topeskim: false,
    topesH: false,
    topesM: false,
    espumaTapaGuiakim: false,
    espumaTapaH: false,
    espumaTapaM: false,
    portaEsponjakim: false,
    portaEsponjaH: false,
    portaEsponjaM: false,
    tapaEntrecierrekim: false,
    tapaCierreH: false,
    tapaCierreM: false,
    kitHojaFijakimkim: false,
    rodamientoSimplekim: false,
    rodamientoDoblekim: false,
    kitPuntoCierrekim: false,
    kitManijakim: false,
    kitManijaConLlavekim: false,
    pletinaPoliamida: false,
    empaqueBurbujakim: false,
    cajaDeflectora: false,
    kitHojaFijakim: false,
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
      if (name === 'kitManijakim' || name === 'kitManijaConLlavekim') {
        setAccessories((prev) => ({
          ...prev,
          kitManijakim: name === 'kitManijakim' ? checked : false,
          kitManijaConLlavekim: name === 'kitManijaConLlavekim' ? checked : false,
        }));
      } else if (name === 'rodamientoSimplekim' || name === 'rodamientoDoblekim') {
        setAccessories((prev) => ({
          ...prev,
          rodamientoSimplekim: name === 'rodamientoSimplekim' ? checked : false,
          rodamientoDoblekim: name === 'rodamientoDoblekim' ? checked : false,
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

  const [selectAll, setSelectAll] = useState(false);

  const handleAccessoryChange = (e) => {
    const { name, checked } = e.target;
    if (name === 'selectAll') {
      setSelectAll(checked);
      setAccessories((prev) => {
        const updatedAccessories = {};
        for (const key in prev) {
          updatedAccessories[key] = checked;
        }
        return updatedAccessories;
      });
    } else {
      setAccessories((prev) => ({
        ...prev,
        [name]: checked,
      }));
    }
  };


  const { width, height } = dimensions;
  const totalHeight = height ? height : '';
  const totalWidth = width ? width : '';

  const { glassPrice } = glassDimensions;

  // Calcular valores
  const doubleHeight = totalHeight ? totalHeight * 2 : '';
  const doubleWidth = totalWidth ? totalWidth * 2 : '';
  const tripleWidth = totalWidth ? totalWidth * 3 : '';
  const cuadHeight = totalHeight ? totalHeight * 4 : '';
  const area = width && height ? (width * height) / 1000000 : ''; // Convertir a m²
  const empaquekimHeight = height && width ? height * 4 : '';
  const empaquekimWidth = height && width ? width * 2 : '';
  const felpaHeight = height && width ? height * 6 : '';
  const felpaWidth = height && width ? width * 2 : '';
  const empaquekimPrice = (empaquekimHeight + empaquekimWidth) / 1000 * prices.empaquekim; // Precio total del empaquekim
  const totFelpa = (felpaHeight + felpaWidth);
  const marcoPerimetralkim = (totalWidth && totalHeight) ? (totalWidth * 2 + totalHeight * 2) : 0;
  const pistaRodamientokim = (totalWidth && totalHeight) ? (totalWidth * 3 + totalHeight * 6) : 0;
  const verticalHorizontaleskim = (totalWidth && totalHeight) ? ((totalWidth / 3 + 27) * 6 + totalHeight * 2) : 0;
  const verticalHorizontalesCakim = (totalWidth && totalHeight) ? ((totalWidth / 3 + 27) * 6 + totalHeight * 2) : 0;

  // Calcular precios
  const pistaRodamientokimPrice = (pistaRodamientokim / 1000) * prices.pistaRodamientokim;
  const marcoPerimetralkimPrice = (marcoPerimetralkim / 1000) * prices.marcoPerimetralkim;
  const pistaRodamientokalPrice = prices.pistaRodamientokal * ((totalWidth / 1000) * 3);
  const complementoSuperiorkimPrice = prices.complementoSuperiorkim * ((totalWidth / 1000) * 3);
  const enganchekimPrice = prices.enganchekim * (cuadHeight / 1000);
  const engancheVidrioCakimPrice = prices.engancheVidrioCakim * (cuadHeight / 1000);
  const verticalHorizontaleskimPrice = (verticalHorizontaleskim / 1000) * prices.verticalHorizontaleskim;
  const verticalHorizontalesCakimPrice = (verticalHorizontalesCakim / 1000) * prices.verticalHorizontalesCakim;
  const adaptadorKimPrice = prices.adaptadorKim * (totalHeight / 1000);

  const escuadraEnsamblekimPrice = accessories.escuadraEnsamblekim ? accessoryPrices.escuadraEnsamblekim : 0;
  const espumaSelloSukimPrice = accessories.espumaSelloSukim ? accessoryPrices.espumaSelloSukim : 0;
  const espumaSelloInkimPrice = accessories.espumaSelloInkim ? accessoryPrices.espumaSelloInkim : 0;
  const sifonSistemaskimPrice = accessories.sifonSistemaskim ? accessoryPrices.sifonSistemaskim : 0;
  const cajaDeflectoraPrice = accessories.cajaDeflectora ? accessoryPrices.cajaDeflectora : 0;
  const felpaPrice = (felpaHeight + felpaWidth) / 1000 * prices.felpacol; // Precio total de la felpa
  const manodeObraPrice = prices.manodeObra * area;

  //hoja fija
  const escuadraHojaPrice = accessories.escuadraHoja ? accessoryPrices.escuadraEnsamblekim : 0;
  const kit6HPrice = accessories.kit6H ? accessoryPrices.kit6kim : 0;
  const kit2HPrice = accessories.kit2H ? accessoryPrices.kit2kim : 0;
  const topesHPrice = accessories.topesH ? accessoryPrices.topeskim : 0;
  const espumaTapaHPrice = accessories.espumaTapaH ? accessoryPrices.espumaTapaGuiakim : 0;
  const portaEsponjaHPrice = accessories.portaEsponjaH ? accessoryPrices.portaEsponjakim : 0;
  const tapaCierreHPrice = accessories.tapaCierreH ? accessoryPrices.tapaEntrecierrekim : 0;
  const kitHojaFijakimPrice = accessories.kitHojaFijakim ? accessoryPrices.kitHojaFijakim : 0;

  //hoja movil
  const escuadraMovilPrice = accessories.escuadraMovil ? accessoryPrices.escuadraEnsamblekim : 0;
  const kit6MPrice = accessories.kit6M ? accessoryPrices.kit6kim : 0;
  const kit2MPrice = accessories.kit2M ? accessoryPrices.kit2kim : 0;
  const topesMPrice = accessories.topesM ? accessoryPrices.topeskim : 0;
  const espumaTapaMPrice = accessories.espumaTapaM ? accessoryPrices.espumaTapaGuiakim : 0;
  const portaEsponjaMPrice = accessories.portaEsponjaM ? accessoryPrices.portaEsponjakim : 0;
  const tapaCierreMPrice = accessories.tapaCierreM ? accessoryPrices.tapaEntrecierrekim : 0;
  const rodamientoSimplekimPrice = accessories.rodamientoSimplekim ? accessoryPrices.rodamientoSimplekim : 0;
  const rodamientoDoblekimPrice = accessories.rodamientoDoblekim ? accessoryPrices.rodamientoDoblekim : 0;

  //accessories
  const kitPuntoCierrekimPrice = accessories.kitPuntoCierrekim ? accessoryPrices.kitPuntoCierrekim : 0;
  const kitManijakimPrice = accessories.kitManijakim ? accessoryPrices.kitManijakim : 0;
  const kitManijaConLlavekimPrice = accessories.kitManijaConLlavekim ? accessoryPrices.kitManijaConLlavekim : 0;
  const pletinaPoliamidaPrice = accessories.pletinaPoliamida ? accessoryPrices.pletinaPoliamida : 0;
  const empaqueBurbujakimPrice = accessories.empaqueBurbujakim ? accessoryPrices.empaqueBurbujakim : 0;

  const tornillosPrice = utilitaryPrices.tornillos * 60;
  const siliconaPrice = utilitaryPrices.silicona * 1;

  const [componentTotals, setComponentTotals] = useState({
    marcoPerimetral: { totalSize: 0, totalPrice: 0 },
    pistaRodamientokal: { totalSize: 0, totalPrice: 0 },
    pistaRodamientokim: { totalSize: 0, totalPrice: 0 },
    complementoSuperior: { totalSize: 0, totalPrice: 0 },
    verticalHorizontales: { totalSize: 0, totalPrice: 0 },
    enganche: { totalSize: 0, totalPrice: 0 },
    verticalHorizontalesCa: { totalSize: 0, totalPrice: 0 },
    engancheCa: { totalSize: 0, totalPrice: 0 },
    adaptador: { totalSize: 0, totalPrice: 0 },
    empaque: { totalSize: 0, totalSize2: 0, totalPrice: 0 },
    felpa: { totalSize: 0, totalPrice: 0 },
    tornillos: { cantidad: 0, totalPrice: 0 },
    silicona: { cantidad: 0, totalPrice: 0 },
    // Puedes añadir más componentes aquí si es necesario.
  });

  const [accessoryTotals, setAccessoryTotals] = useState({
    escuadraEnsamble: { cantidad: 0, totalPrice: 0 },
    espumaSelloSu: { cantidad: 0, totalPrice: 0 },
    espumaSelloIn: { cantidad: 0, totalPrice: 0 },
    sifonSistemas: { cantidad: 0, totalPrice: 0 },
    cajaDeflectora: { cantidad: 0, totalPrice: 0 },
    escuadraEnsambleHoja: { cantidad: 0, totalPrice: 0 },
    kit6H: { cantidad: 0, totalPrice: 0 },
    kit2H: { cantidad: 0, totalPrice: 0 },
    topesH: { cantidad: 0, totalPrice: 0 },
    espumaTapaH: { cantidad: 0, totalPrice: 0 },
    portaEsponjaH: { cantidad: 0, totalPrice: 0 },
    tapaCierreH: { cantidad: 0, totalPrice: 0 },
    kitHojaFija: { cantidad: 0, totalPrice: 0 },
    escuadraEnsambleMovil: { cantidad: 0, totalPrice: 0 },
    kit6M: { cantidad: 0, totalPrice: 0 },
    kit2M: { cantidad: 0, totalPrice: 0 },
    topesM: { cantidad: 0, totalPrice: 0 },
    espumaTapaM: { cantidad: 0, totalPrice: 0 },
    portaEsponjaM: { cantidad: 0, totalPrice: 0 },
    tapaCierreM: { cantidad: 0, totalPrice: 0 },
    rodamientoSimple: { cantidad: 0, totalPrice: 0 },
    rodamientoDoble: { cantidad: 0, totalPrice: 0 },
    kitPuntoCierre: { cantidad: 0, totalPrice: 0 },
    kitManija: { cantidad: 0, totalPrice: 0 },
    kitManijaConLlave: { cantidad: 0, totalPrice: 0 },
    pletinaPoliamida: { cantidad: 0, totalPrice: 0 },
    empaqueBurbuja: { cantidad: 0, totalPrice: 0 },
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
        totalSize: prevTotals.marcoPerimetral.totalSize + parseFloat(marcoPerimetralkim), // Sumar tamaño
        totalPrice: prevTotals.marcoPerimetral.totalPrice + marcoPerimetralkimPrice, // Sumar precio
      },
      pistaRodamientokal: {
        totalSize: prevTotals.pistaRodamientokal.totalSize + parseFloat(doubleWidth),
        totalPrice: prevTotals.pistaRodamientokal.totalPrice + pistaRodamientokalPrice,
      },
      pistaRodamientokim: {
        totalSize: prevTotals.pistaRodamientokim.totalSize + parseFloat(pistaRodamientokim),
        totalPrice: prevTotals.pistaRodamientokim.totalPrice + pistaRodamientokimPrice,
      },
      complementoSuperior: {
        totalSize: prevTotals.complementoSuperior.totalSize + parseFloat(doubleWidth),
        totalPrice: prevTotals.complementoSuperior.totalPrice + complementoSuperiorkimPrice,
      },
      verticalHorizontales: {
        totalSize: prevTotals.verticalHorizontales.totalSize + parseFloat(verticalHorizontaleskim),
        totalPrice: prevTotals.verticalHorizontales.totalPrice + verticalHorizontaleskimPrice,
      },
      verticalHorizontalesCa: {
        totalSize: prevTotals.verticalHorizontalesCa.totalSize + parseFloat(verticalHorizontalesCakim),
        totalPrice: prevTotals.verticalHorizontalesCa.totalPrice + verticalHorizontalesCakimPrice,
      },
      enganche: {
        totalSize: prevTotals.enganche.totalSize + parseFloat(doubleHeight),
        totalPrice: prevTotals.enganche.totalPrice + enganchekimPrice,
      },
      engancheCa: {
        totalSize: prevTotals.engancheCa.totalSize + parseFloat(doubleHeight),
        totalPrice: prevTotals.engancheCa.totalPrice + engancheVidrioCakimPrice,
      },
      adaptador: {
        totalSize: prevTotals.adaptador.totalSize + parseFloat(totalHeight),
        totalPrice: prevTotals.adaptador.totalPrice + adaptadorKimPrice,
      },
      empaque: {
        totalSize: prevTotals.empaque.totalSize + parseFloat(empaquekimHeight),
        totalSize2: prevTotals.empaque.totalSize + parseFloat(empaquekimWidth),
        totalPrice: prevTotals.empaque.totalPrice + empaquekimPrice,
      },
      felpa: {
        totalSize: prevTotals.felpa.totalSize + parseFloat(totFelpa),
        totalPrice: prevTotals.felpa.totalPrice + felpaPrice,
      },
      tornillos: {
        cantidad: prevTotals.tornillos.cantidad + 60,
        totalPrice: prevTotals.tornillos.totalPrice + tornillosPrice,
      },
      silicona: {
        cantidad: prevTotals.silicona.cantidad + 1,
        totalPrice: prevTotals.silicona.totalPrice + siliconaPrice,
      },

    }));

    setAccessoryTotals((prevTotals) => ({
      ...prevTotals,
      escuadraEnsamble: accessories.escuadraEnsamblekim
        ? {
          cantidad: prevTotals.escuadraEnsamble.cantidad + 1,
          totalPrice: prevTotals.escuadraEnsamble.totalPrice + escuadraEnsamblekimPrice,
        }
        : prevTotals.escuadraEnsamble,
      espumaSelloSu: accessories.espumaSelloSukim
        ? {
          cantidad: prevTotals.espumaSelloSu.cantidad + 1,
          totalPrice: prevTotals.espumaSelloSu.totalPrice + espumaSelloSukimPrice,
        }
        : prevTotals.espumaSelloSu,
      espumaSelloIn: accessories.espumaSelloInkim
        ? {
          cantidad: prevTotals.espumaSelloIn.cantidad + 1,
          totalPrice: prevTotals.espumaSelloIn.totalPrice + espumaSelloInkimPrice,
        }
        : prevTotals.espumaSelloIn,
      sifonSistemas: accessories.sifonSistemaskim
        ? {
          cantidad: prevTotals.sifonSistemas.cantidad + 1,
          totalPrice: prevTotals.sifonSistemas.totalPrice + sifonSistemaskimPrice,
        }
        : prevTotals.sifonSistemas,
      cajaDeflectora: accessories.cajaDeflectora
        ? {
          cantidad: prevTotals.cajaDeflectora.cantidad + 1,
          totalPrice: prevTotals.cajaDeflectora.totalPrice + cajaDeflectoraPrice,
        }
        : prevTotals.cajaDeflectora,
      escuadraEnsambleHoja: accessories.escuadraHoja
        ? {
          cantidad: prevTotals.escuadraEnsambleHoja.cantidad + 1,
          totalPrice: prevTotals.escuadraEnsambleHoja.totalPrice + escuadraHojaPrice,
        }
        : prevTotals.escuadraEnsambleHoja,
      kit6H: accessories.kit6H
        ? {
          cantidad: prevTotals.kit6H.cantidad + 1,
          totalPrice: prevTotals.kit6H.totalPrice + kit6HPrice,
        }
        : prevTotals.kit6H,
      kit2H: accessories.kit2H
        ? {
          cantidad: prevTotals.kit2H.cantidad + 1,
          totalPrice: prevTotals.kit2H.totalPrice + kit2HPrice,
        }
        : prevTotals.kit2H,
      topesH: accessories.topesH
        ? {
          cantidad: prevTotals.topesH.cantidad + 1,
          totalPrice: prevTotals.topesH.totalPrice + topesHPrice,
        }
        : prevTotals.topesH,
      espumaTapaH: accessories.espumaTapaH
        ? {
          cantidad: prevTotals.espumaTapaH.cantidad + 1,
          totalPrice: prevTotals.espumaTapaH.totalPrice + espumaTapaHPrice,
        }
        : prevTotals.espumaTapaH,
      portaEsponjaH: accessories.portaEsponjaH
        ? {
          cantidad: prevTotals.portaEsponjaH.cantidad + 1,
          totalPrice: prevTotals.portaEsponjaH.totalPrice + portaEsponjaHPrice,
        }
        : prevTotals.portaEsponjaH,
      tapaCierreH: accessories.tapaCierreH
        ? {
          cantidad: prevTotals.tapaCierreH.cantidad + 1,
          totalPrice: prevTotals.tapaCierreH.totalPrice + tapaCierreHPrice,
        }
        : prevTotals.tapaCierreH,
      kitHojaFija: accessories.kitHojaFijakim
        ? {
          cantidad: prevTotals.kitHojaFija.cantidad + 1,
          totalPrice: prevTotals.kitHojaFija.totalPrice + kitHojaFijakimPrice,
        }
        : prevTotals.kitHojaFija,
      escuadraEnsambleMovil: accessories.escuadraMovil
        ? {
          cantidad: prevTotals.escuadraEnsambleMovil.cantidad + 1,
          totalPrice: prevTotals.escuadraEnsambleMovil.totalPrice + escuadraMovilPrice,
        }
        : prevTotals.escuadraEnsambleMovil,
      kit6M: accessories.kit6M
        ? {
          cantidad: prevTotals.kit6M.cantidad + 1,
          totalPrice: prevTotals.kit6M.totalPrice + kit6MPrice,
        }
        : prevTotals.kit6M,
      kit2M: accessories.kit2M
        ? {
          cantidad: prevTotals.kit2M.cantidad + 1,
          totalPrice: prevTotals.kit2M.totalPrice + kit2MPrice,
        }
        : prevTotals.kit2M,
      topesM: accessories.topesM
        ? {
          cantidad: prevTotals.topesM.cantidad + 1,
          totalPrice: prevTotals.topesM.totalPrice + topesMPrice,
        }
        : prevTotals.topesM,
      espumaTapaM: accessories.espumaTapaM
        ? {
          cantidad: prevTotals.espumaTapaM.cantidad + 1,
          totalPrice: prevTotals.espumaTapaM.totalPrice + espumaTapaMPrice,
        }
        : prevTotals.espumaTapaM,
      portaEsponjaM: accessories.portaEsponjaM
        ? {
          cantidad: prevTotals.portaEsponjaM.cantidad + 1,
          totalPrice: prevTotals.portaEsponjaM.totalPrice + portaEsponjaMPrice,
        }
        : prevTotals.portaEsponjaM,
      tapaCierreM: accessories.tapaCierreM
        ? {
          cantidad: prevTotals.tapaCierreM.cantidad + 1,
          totalPrice: prevTotals.tapaCierreM.totalPrice + tapaCierreMPrice,
        }
        : prevTotals.tapaCierreM,
      rodamientoSimple: accessories.rodamientoSimplekim
        ? {
          cantidad: prevTotals.rodamientoSimple.cantidad + 2,
          totalPrice: prevTotals.rodamientoSimple.totalPrice + rodamientoSimplekimPrice,
        }
        : prevTotals.rodamientoSimple,
      rodamientoDoble: accessories.rodamientoDoblekim
        ? {
          cantidad: prevTotals.rodamientoDoble.cantidad + 2,
          totalPrice: prevTotals.rodamientoDoble.totalPrice + rodamientoDoblekimPrice,
        }
        : prevTotals.rodamientoDoble,
      kitPuntoCierre: accessories.kitPuntoCierrekim
        ? {
          cantidad: prevTotals.kitPuntoCierre.cantidad + 1,
          totalPrice: prevTotals.kitPuntoCierre.totalPrice + kitPuntoCierrekimPrice,
        }
        : prevTotals.kitPuntoCierre,
      kitManija: accessories.kitManijakim
        ? {
          cantidad: prevTotals.kitManija.cantidad + 1,
          totalPrice: prevTotals.kitManija.totalPrice + kitManijakimPrice,
        }
        : prevTotals.kitManija,
      kitManijaConLlave: accessories.kitManijaConLlavekim
        ? {
          cantidad: prevTotals.kitManijaConLlave.cantidad + 1,
          totalPrice: prevTotals.kitManijaConLlave.totalPrice + kitManijaConLlavekimPrice,
        }
        : prevTotals.kitManijaConLlave,
      pletinaPoliamida: accessories.pletinaPoliamida
        ? {
          cantidad: prevTotals.pletinaPoliamida.cantidad + 1,
          totalPrice: prevTotals.pletinaPoliamida.totalPrice + pletinaPoliamidaPrice,
        }
        : prevTotals.pletinaPoliamida,
      empaqueBurbuja: accessories.empaqueBurbujakim
        ? {
          cantidad: prevTotals.empaqueBurbuja.cantidad + 1,
          totalPrice: prevTotals.empaqueBurbuja.totalPrice + empaqueBurbujakimPrice,
        }
        : prevTotals.empaqueBurbuja,

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
    enganchekimPrice +
    engancheVidrioCakimPrice +
    escuadraEnsamblekimPrice +
    espumaSelloInkimPrice +
    espumaSelloSukimPrice +
    sifonSistemaskimPrice +
    cajaDeflectoraPrice +
    marcoPerimetralkimPrice + // Agregar marco perimetral
    pistaRodamientokimPrice +
    pistaRodamientokalPrice +
    complementoSuperiorkimPrice +
    verticalHorizontaleskimPrice +
    verticalHorizontalesCakimPrice +
    adaptadorKimPrice +
    felpaPrice +
    empaquekimPrice +

    //hoja fija
    escuadraHojaPrice +
    kit6HPrice +
    kit2HPrice +
    topesHPrice +
    espumaTapaHPrice +
    portaEsponjaHPrice +
    tapaCierreHPrice +
    kitHojaFijakimPrice +

    //hoja movil
    escuadraMovilPrice +
    kit6MPrice +
    kit2MPrice +
    topesMPrice +
    espumaTapaMPrice +
    portaEsponjaMPrice +
    tapaCierreMPrice +
    rodamientoSimplekimPrice +
    rodamientoDoblekimPrice +

    //accesorios
    kitPuntoCierrekimPrice +
    kitManijakimPrice +
    kitManijaConLlavekimPrice +
    pletinaPoliamidaPrice +
    empaqueBurbujakimPrice +

    tornillosPrice+
    siliconaPrice+
    (glassPrice ? parseFloat(glassPrice) : 0) // Precio del vidrio

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
    doc.text('Detalle de la cotización Colosal PC 2.6 XO-OX', 70, 34);

    addSection(doc, 'Marco', 45);
    addTableRow(doc, 50, 'Marco Perimetral:', `${componentTotals.marcoPerimetral.totalSize} mm`, `${componentTotals.marcoPerimetral.totalPrice.toFixed(2)}`);
    addTableRow(doc, 55, 'Pista Rodamiento Kalima:', `${componentTotals.pistaRodamientokal.totalSize} mm`, `${componentTotals.pistaRodamientokal.totalPrice.toFixed(2)}`);
    addTableRow(doc, 60, 'Pista Rodamiento Kim:', `${componentTotals.pistaRodamientokim.totalSize} mm`, `${componentTotals.pistaRodamientokim.totalPrice.toFixed(2)}`);
    addTableRow(doc, 65, 'Complemento Superior Marco:', `${componentTotals.complementoSuperior.totalSize} mm`, `${componentTotals.complementoSuperior.totalPrice.toFixed(2)}`);

    addSection(doc, 'Nave', 75);
    addTableRow(doc, 80, 'Vertical Horizontales:', `${componentTotals.verticalHorizontales.totalSize} mm`, `${componentTotals.verticalHorizontales.totalPrice.toFixed(2)}`);
    addTableRow(doc, 85, 'Enganche Vidrio:', `${componentTotals.enganche.totalSize} mm`, `${componentTotals.enganche.totalPrice.toFixed(2)}`);
    addTableRow(doc, 90, 'Vertical Horizontales Vidrio Camara:', `${componentTotals.verticalHorizontalesCa.totalSize} mm`, `${componentTotals.verticalHorizontalesCa.totalPrice.toFixed(2)}`);
    addTableRow(doc, 95, 'Enganche Vidrio Camara:', `${componentTotals.engancheCa.totalSize} mm`, `${componentTotals.engancheCa.totalPrice.toFixed(2)}`);
    addTableRow(doc, 100, 'Adaptador:', `${componentTotals.adaptador.totalSize} mm`, `${componentTotals.adaptador.totalPrice.toFixed(2)}`);

    addSection(doc, 'Accesorios Marco', 110);
    addTableRow(doc, 115, 'Escuadra Ensamble Marco:', `${accessoryTotals.escuadraEnsamble.cantidad}`, `${accessoryTotals.escuadraEnsamble.totalPrice.toFixed(2)}`);
    addTableRow(doc, 120, 'Espuma Sello Superior:', `${accessoryTotals.espumaSelloSu.cantidad}`, `${accessoryTotals.espumaSelloSu.totalPrice.toFixed(2)}`);
    addTableRow(doc, 125, 'Espuma Sello Inferior:', `${accessoryTotals.espumaSelloIn.cantidad}`, `${accessoryTotals.espumaSelloIn.totalPrice.toFixed(2)}`);
    addTableRow(doc, 130, 'Sifon Sistemas Eurovitral:', `${accessoryTotals.sifonSistemas.cantidad}`, `${accessoryTotals.sifonSistemas.totalPrice.toFixed(2)}`);
    addTableRow(doc, 135, 'Caja Deflectora:', `${accessoryTotals.cajaDeflectora.cantidad}`, `${accessoryTotals.cajaDeflectora.totalPrice.toFixed(2)}`);

    addSection(doc, 'Accesorios Hoja Fija', 145);
    addTableRow(doc, 150, 'Escuadra Ensamble Hoja fija:', `${accessoryTotals.escuadraEnsambleHoja.cantidad}`, `${accessoryTotals.escuadraEnsambleHoja.totalPrice.toFixed(2)}`);
    addTableRow(doc, 155, 'Kit de 6 Escuadras de Alineación Hoja fija:', `${accessoryTotals.kit6H.cantidad}`, `${accessoryTotals.kit6H.totalPrice.toFixed(2)}`);
    addTableRow(doc, 160, 'Kit de 2 Escuadras de Alineación con Guia:', `${accessoryTotals.kit2H.cantidad}`, `${accessoryTotals.kit2H.totalPrice.toFixed(2)}`);
    addTableRow(doc, 165, 'Topes Para Hojas:', `${accessoryTotals.topesH.cantidad}`, `${accessoryTotals.topesH.totalPrice.toFixed(2)}`);
    addTableRow(doc, 170, 'Espuma Tapa Guia Superior/Inferior:', `${accessoryTotals.espumaTapaH.cantidad}`, `${accessoryTotals.espumaTapaH.totalPrice.toFixed(2)}`);
    addTableRow(doc, 175, 'Tapa y Taperte Porta Esponja Superior e Inferior:', `${accessoryTotals.portaEsponjaH.cantidad}`, `${accessoryTotals.portaEsponjaH.totalPrice.toFixed(2)}`);
    addTableRow(doc, 180, 'Tapa Entrecierre Superior e Inferior:', `${accessoryTotals.tapaCierreH.cantidad}`, `${accessoryTotals.tapaCierreH.totalPrice.toFixed(2)}`);
    addTableRow(doc, 185, 'Kit de Hoja Fija:', `${accessoryTotals.kitHojaFija.cantidad}`, `${accessoryTotals.kitHojaFija.totalPrice.toFixed(2)}`);

    addSection(doc, 'Accesorios Hoja Movil', 195);
    addTableRow(doc, 200, 'Escuadra Ensamble Hoja Movil:', `${accessoryTotals.escuadraEnsambleMovil.cantidad}`, `${accessoryTotals.escuadraEnsambleMovil.totalPrice.toFixed(2)}`);
    addTableRow(doc, 205, 'Kit de 6 Escuadras de Alineación Hoja Movil:', `${accessoryTotals.kit6M.cantidad}`, `${accessoryTotals.kit6M.totalPrice.toFixed(2)}`);
    addTableRow(doc, 210, 'Kit de 2 Escuadras de Alineación con Guia:', `${accessoryTotals.kit2M.cantidad}`, `${accessoryTotals.kit2M.totalPrice.toFixed(2)}`);
    addTableRow(doc, 215, 'Topes Para Hojas:', `${accessoryTotals.topesM.cantidad}`, `${accessoryTotals.topesM.totalPrice.toFixed(2)}`);
    addTableRow(doc, 220, 'Espuma Tapa Guia Superior/Inferior:', `${accessoryTotals.espumaTapaM.cantidad}`, `${accessoryTotals.espumaTapaM.totalPrice.toFixed(2)}`);
    addTableRow(doc, 225, 'Tapa y Taperte Porta Esponja Superior e Inferior:', `${accessoryTotals.portaEsponjaM.cantidad}`, `${accessoryTotals.portaEsponjaM.totalPrice.toFixed(2)}`);
    addTableRow(doc, 230, 'Tapa Entrecierre Superior e Inferior:', `${accessoryTotals.tapaCierreM.cantidad}`, `${accessoryTotals.tapaCierreM.totalPrice.toFixed(2)}`);
    addTableRow(doc, 235, 'Rodamiento Simple:', `${accessoryTotals.rodamientoSimple.cantidad}`, `${accessoryTotals.rodamientoSimple.totalPrice.toFixed(2)}`);
    addTableRow(doc, 240, 'Rodamiento Doble:', `${accessoryTotals.rodamientoDoble.cantidad}`, `${accessoryTotals.rodamientoDoble.totalPrice.toFixed(2)}`);

    addSection(doc, 'Accesorios', 250);
    addTableRow(doc, 255, 'Kit Punto Cierre:', `${accessoryTotals.kitPuntoCierre.cantidad}`, `${accessoryTotals.kitPuntoCierre.totalPrice.toFixed(2)}`);
    addTableRow(doc, 260, 'Kit Manija Bidireccional con Transmision:', `${accessoryTotals.kitManija.cantidad}`, `${accessoryTotals.kitManija.totalPrice.toFixed(2)}`);
    addTableRow(doc, 265, 'Kit Manija Bidireccional con Transmision con Llave:', `${accessoryTotals.kitManijaConLlave.cantidad}`, `${accessoryTotals.kitManijaConLlave.totalPrice.toFixed(2)}`);
    addTableRow(doc, 270, 'Pletina Poliamida:', `${accessoryTotals.pletinaPoliamida.cantidad}`, `${accessoryTotals.pletinaPoliamida.totalPrice.toFixed(2)}`);
    addTableRow(doc, 275, 'Empaque Burbuja:', `${accessoryTotals.empaqueBurbuja.cantidad}`, `${accessoryTotals.empaqueBurbuja.totalPrice.toFixed(2)}`);

    doc.addPage();

    addSection(doc, 'Empaque', 25);
    addTableRow(doc, 30, 'Empaque (Alto):', `${componentTotals.empaque.totalSize} mm`, '');
    addTableRow(doc, 35, 'Empaque (Ancho):', `${componentTotals.empaque.totalSize2} mm`, `${componentTotals.empaque.totalPrice.toFixed(2)}`);
    addTableRow(doc, 40, 'Felpa 5.00 x 7.00:', `${componentTotals.felpa.totalSize} mm`, `${componentTotals.felpa.totalPrice.toFixed(2)}`);

    addSection(doc, 'Utilitarios', 50);
    addTableRow(doc, 55, 'Tornillos:', `${componentTotals.tornillos.cantidad}`, `${componentTotals.tornillos.totalPrice.toFixed(2)}`);
    addTableRow(doc, 60, 'Silicona:', `${componentTotals.silicona.cantidad}`, `${componentTotals.silicona.totalPrice.toFixed(2)}`);

    doc.setFontSize(14);
    doc.setTextColor(cyanBlue);
    doc.text('Total', 170, 70);
    doc.setFontSize(16);
    doc.setTextColor('black');
    const formattedTotal = totalSum.toLocaleString('en-US', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    doc.text(formattedTotal, 150, 75);

    doc.setFontSize(14);
    doc.setTextColor(cyanBlue);
    doc.text('Cantidad de puertas', 20, 70);
    doc.text(`${puertas.length}`, 20, 75);

    doc.save('Cotizacion-Colosalpc2.6.pdf');
  };


  const getPriceDisplay = () => {
    if (accessories.kitManijakim) {
      return `$${accessoryPrices.kitManijakim.toFixed(2)}`;
    } else if (accessories.kitManijaConLlavekim) {
      return `$${accessoryPrices.kitManijaConLlavekim.toFixed(2)}`;
    }
    return ''; // Si no hay ninguna opción seleccionada, no mostrar precio
  };

  const getescuadraEnsamblekimPrice = () => {
    if (accessories.escuadraEnsamblekim) {
      return `$${accessoryPrices.escuadraEnsamblekim.toFixed(2)}`; // Mostrar precio si el checkbox está seleccionado
    }
    return ''; // Si no está seleccionado, no mostrar precio
  };


  const getCajaPrice = () => {
    if (accessories.cajaDeflectora) {
      return `$${accessoryPrices.cajaDeflectora.toFixed(2)}`; // Mostrar precio si el checkbox está seleccionado
    }
    return ''; // Si no está seleccionado, no mostrar precio
  };

  const getespumaSelloSukimPrice = () => {
    if (accessories.espumaSelloSukim) {
      return `$${accessoryPrices.espumaSelloSukim.toFixed(2)}`;
    }
    return ''; // Si no está seleccionado, no mostrar precio
  };


  const getsifonSistemaskimPrice = () => {
    if (accessories.sifonSistemaskim) {
      return `$${accessoryPrices.sifonSistemaskim.toFixed(2)}`;
    }
    return ''; // Si no está seleccionado, no mostrar precio
  };

  const getespumaSelloInkimPrice = () => {
    if (accessories.espumaSelloInkim) {
      return `$${accessoryPrices.espumaSelloInkim.toFixed(2)}`;
    }
    return ''; // Si no está seleccionado, no mostrar precio
  };
  const getEscuadraHojaPrice = () => {
    if (accessories.escuadraHoja) {
      return `$${accessoryPrices.escuadraEnsamblekim.toFixed(2)}`;
    }
    return ''; // Si no está seleccionado, no mostrar precio
  };

  const getKit6HPrice = () => {
    if (accessories.kit6H) {
      return `$${accessoryPrices.kit6kim.toFixed(2)}`;
    }
    return ''; // Si no está seleccionado, no mostrar precio
  };

  const getKit2HPrice = () => {
    if (accessories.kit2H) {
      return `$${accessoryPrices.kit2kim.toFixed(2)}`;
    }
    return ''; // Si no está seleccionado, no mostrar precio
  };

  const getTopesHPrice = () => {
    if (accessories.topesH) {
      return `$${accessoryPrices.topeskim.toFixed(2)}`;
    }
    return ''; // Si no está seleccionado, no mostrar precio
  };

  const getEspumaTapaHPrice = () => {
    if (accessories.espumaTapaH) {
      return `$${accessoryPrices.espumaTapaGuiakim.toFixed(2)}`;
    }
    return ''; // Si no está seleccionado, no mostrar precio
  };

  const getPortaEsponjaHPrice = () => {
    if (accessories.portaEsponjaH) {
      return `$${accessoryPrices.portaEsponjakim.toFixed(2)}`;
    }
    return ''; // Si no está seleccionado, no mostrar precio
  };

  const getTapaCierreHPrice = () => {
    if (accessories.tapaCierreH) {
      return `$${accessoryPrices.tapaEntrecierrekim.toFixed(2)}`;
    }
    return ''; // Si no está seleccionado, no mostrar precio
  };

  const getKitHojaFijakimPrice = () => {
    if (accessories.kitHojaFijakim) {
      return `$${accessoryPrices.kitHojaFijakim.toFixed(2)}`;
    }
    return ''; // Si no está seleccionado, no mostrar precio
  };

  // Hoja móvil

  const getEscuadraMovilPrice = () => {
    if (accessories.escuadraMovil) {
      return `$${accessoryPrices.escuadraEnsamblekim.toFixed(2)}`;
    }
    return ''; // Si no está seleccionado, no mostrar precio
  };

  const getKit6MPrice = () => {
    if (accessories.kit6M) {
      return `$${accessoryPrices.kit6kim.toFixed(2)}`;
    }
    return ''; // Si no está seleccionado, no mostrar precio
  };

  const getKit2MPrice = () => {
    if (accessories.kit2M) {
      return `$${accessoryPrices.kit2kim.toFixed(2)}`;
    }
    return ''; // Si no está seleccionado, no mostrar precio
  };

  const getTopesMPrice = () => {
    if (accessories.topesM) {
      return `$${accessoryPrices.topeskim.toFixed(2)}`;
    }
    return ''; // Si no está seleccionado, no mostrar precio
  };

  const getEspumaTapaMPrice = () => {
    if (accessories.espumaTapaM) {
      return `$${accessoryPrices.espumaTapaGuiakim.toFixed(2)}`;
    }
    return ''; // Si no está seleccionado, no mostrar precio
  };

  const getPortaEsponjaMPrice = () => {
    if (accessories.portaEsponjaM) {
      return `$${accessoryPrices.portaEsponjakim.toFixed(2)}`;
    }
    return ''; // Si no está seleccionado, no mostrar precio
  };

  const getTapaCierreMPrice = () => {
    if (accessories.tapaCierreM) {
      return `$${accessoryPrices.tapaEntrecierrekim.toFixed(2)}`;
    }
    return ''; // Si no está seleccionado, no mostrar precio
  };

  // Accesorios

  const getkitPuntoCierrekimPrice = () => {
    if (accessories.kitPuntoCierrekim) {
      return `$${accessoryPrices.kitPuntoCierrekim.toFixed(2)}`;
    }
    return ''; // Si no está seleccionado, no mostrar precio
  };


  const getPletinaPoliamidaPrice = () => {
    if (accessories.pletinaPoliamida) {
      return `$${accessoryPrices.pletinaPoliamida.toFixed(2)}`;
    }
    return ''; // Si no está seleccionado, no mostrar precio
  };

  const getempaqueBurbujakimPrice = () => {
    if (accessories.empaqueBurbujakim) {
      return `$${accessoryPrices.empaqueBurbujakim.toFixed(2)}`;
    }
    return ''; // Si no está seleccionado, no mostrar precio
  };

  const getRodamientoPrice = () => {
    if (accessories.rodamientoSimplekim) {
      return `$${accessoryPrices.rodamientoSimplekim.toFixed(2)}`; // Mostrar precio si 'rodamientoSimplekim' está seleccionado
    } else if (accessories.rodamientoDoblekim) {
      return `$${accessoryPrices.rodamientoDoblekim.toFixed(2)}`; // Mostrar precio si 'rodamientoDoblekim' está seleccionado
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
        <img src={kimbayaImage} alt="Puerta Corrediza Colosal" className="door-image" />

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
        <strong><h1>KIMBAYA OXX-XXO-XXX</h1></strong>
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
              <TableCell>{marcoPerimetralkim} mm (4)</TableCell>
              <TableCell>${marcoPerimetralkimPrice.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell><strong>Pista Rodamiento Kalima:</strong></TableCell>
              <TableCell>{tripleWidth} mm (3)</TableCell>
              <TableCell>${pistaRodamientokalPrice.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell><strong>Pista Rodamiento Kimbaya:</strong></TableCell>
              <TableCell>{pistaRodamientokim} mm (9) </TableCell>
              <TableCell>${pistaRodamientokimPrice.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow key="5">
              <TableCell><strong>Complemento Superior Marco:</strong></TableCell>
              <TableCell>{tripleWidth} mm (3) </TableCell>
              <TableCell>${complementoSuperiorkimPrice.toFixed(2)}</TableCell>
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
              <TableCell><strong>Vertical Horizontales Vidrio:</strong></TableCell>
              <TableCell>{verticalHorizontaleskim} mm (6)</TableCell>
              <TableCell>${verticalHorizontaleskimPrice.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell><strong>Enganche Vidrio:</strong> </TableCell>
              <TableCell>{cuadHeight} mm (2) </TableCell>
              <TableCell>${enganchekimPrice.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell><strong>Vertical Horizontales Vidrio Camara:</strong> </TableCell>
              <TableCell>{verticalHorizontalesCakim} mm (6) </TableCell>
              <TableCell>${verticalHorizontalesCakimPrice.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow key="5">
              <TableCell><strong>Enganche Vidrio Camara:</strong> </TableCell>
              <TableCell>{cuadHeight} mm (2) </TableCell>
              <TableCell>${engancheVidrioCakimPrice.toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <br />

        <Table aria-label="tabla accesorios marco">
          <TableHeader>
            <TableColumn><h1>Accesorios de Marco</h1></TableColumn>
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
                  name="selectAll"
                  checked={selectAll}
                  onChange={handleAccessoryChange}
                />
                Todos
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>
                <input
                  type="checkbox"
                  name="escuadraEnsamblekim"
                  checked={accessories.escuadraEnsamblekim}
                  onChange={handleChange}
                />
                Escuadra Ensamble Marco
              </TableCell>
              <TableCell>$ {getescuadraEnsamblekimPrice()}</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell><input
                type="checkbox"
                name="espumaSelloSukim"
                checked={accessories.espumaSelloSukim}
                onChange={handleChange}
              />
                Espuma Sello Superior</TableCell>
              <TableCell>$ {getespumaSelloSukimPrice()} </TableCell>
            </TableRow>
            <TableRow key="5">
              <TableCell><input
                type="checkbox"
                name="espumaSelloInkim"
                checked={accessories.espumaSelloInkim}
                onChange={handleChange}
              />
                Espuma Sello Inferior
              </TableCell>
              <TableCell>$ {getespumaSelloInkimPrice()}</TableCell>
            </TableRow>
            <TableRow key="6">
              <TableCell><input
                type="checkbox"
                name="sifonSistemaskim"
                checked={accessories.sifonSistemaskim}
                onChange={handleChange}
              />
                Sifón Sistemas Eurovitral</TableCell>
              <TableCell>$ {getsifonSistemaskimPrice()}</TableCell>
            </TableRow>
            <TableRow key="7">
              <TableCell><input
                type="checkbox"
                name="cajaDeflectora"
                checked={accessories.cajaDeflectora}
                onChange={handleChange}
              />
                Caja Deflectora</TableCell>
              <TableCell>$ {getCajaPrice()}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <br />

        <Table aria-label="tabla accesorios Hoja">
          <TableHeader>
            <TableColumn><h1>Accesorios Hoja Fija</h1></TableColumn>
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
                  name="escuadraHoja"
                  checked={accessories.escuadraHoja}
                  onChange={handleChange}
                />
                Escuadra Ensamble Hoja Fija
              </TableCell>
              <TableCell>$ {getEscuadraHojaPrice()}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell><input
                type="checkbox"
                name="kit6H"
                checked={accessories.kit6H}
                onChange={handleChange}
              />
                Kit de 6 Escuadras de Alineación Hoja fija</TableCell>
              <TableCell>$ {getKit6HPrice()} </TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell><input
                type="checkbox"
                name="kit2H"
                checked={accessories.kit2H}
                onChange={handleChange}
              />
                Kit de 2 Escuadras de Alineación con Guia
              </TableCell>
              <TableCell>$ {getKit2HPrice()}</TableCell>
            </TableRow>
            <TableRow key="5">
              <TableCell><input
                type="checkbox"
                name="topesH"
                checked={accessories.topesH}
                onChange={handleChange}
              />
                Topes Para Hojas</TableCell>
              <TableCell>$ {getTopesHPrice()}</TableCell>
            </TableRow>
            <TableRow key="6">
              <TableCell><input
                type="checkbox"
                name="espumaTapaH"
                checked={accessories.espumaTapaH}
                onChange={handleChange}
              />
                Espuma Tapa Guía Superior/Inferior </TableCell>
              <TableCell>$ {getEspumaTapaHPrice()}</TableCell>
            </TableRow>
            <TableRow key="7">
              <TableCell><input
                type="checkbox"
                name="portaEsponjaH"
                checked={accessories.portaEsponjaH}
                onChange={handleChange}
              />
                Tapa y Tapete Porta Esponja Superior e Inferior </TableCell>
              <TableCell>$ {getPortaEsponjaHPrice()}</TableCell>
            </TableRow>
            <TableRow key="8">
              <TableCell><input
                type="checkbox"
                name="tapaCierreH"
                checked={accessories.tapaCierreH}
                onChange={handleChange}
              />
                Tapa Entrecierre Superior e Inferior </TableCell>
              <TableCell>$ {getTapaCierreHPrice()}</TableCell>
            </TableRow>
            <TableRow key="9">
              <TableCell><input
                type="checkbox"
                name="kitHojaFijakim"
                checked={accessories.kitHojaFijakim}
                onChange={handleChange}
              />
                Kit Hoja Fija </TableCell>
              <TableCell>$ {getKitHojaFijakimPrice()}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <br />

        <Table aria-label="tabla accesorios Hoja Mobil">
          <TableHeader>
            <TableColumn><h1>Accesorios Hoja Mobil</h1></TableColumn>
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
                  name="escuadraMovil"
                  checked={accessories.escuadraMovil}
                  onChange={handleChange}
                />
                Escuadra Ensamble Hoja Movil
              </TableCell>
              <TableCell>$ {getEscuadraMovilPrice()}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell><input
                type="checkbox"
                name="kit6M"
                checked={accessories.kit6M}
                onChange={handleChange}
              />
                Kit de 6 Escuadras de Alineación Hoja Mobil</TableCell>
              <TableCell>$ {getKit6MPrice()} </TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell><input
                type="checkbox"
                name="kit2M"
                checked={accessories.kit2M}
                onChange={handleChange}
              />
                Kit de 2 Escuadras de Alineación con Guia
              </TableCell>
              <TableCell>$ {getKit2MPrice()}</TableCell>
            </TableRow>
            <TableRow key="5">
              <TableCell><input
                type="checkbox"
                name="topesM"
                checked={accessories.topesM}
                onChange={handleChange}
              />
                Topes Para Hojas</TableCell>
              <TableCell>$ {getTopesMPrice()}</TableCell>
            </TableRow>
            <TableRow key="6">
              <TableCell><input
                type="checkbox"
                name="espumaTapaM"
                checked={accessories.espumaTapaM}
                onChange={handleChange}
              />
                Espuma Tapa Guía Superior/Inferior </TableCell>
              <TableCell>$ {getEspumaTapaMPrice()}</TableCell>
            </TableRow>
            <TableRow key="7">
              <TableCell><input
                type="checkbox"
                name="portaEsponjaM"
                checked={accessories.portaEsponjaM}
                onChange={handleChange}
              />
                Tapa y Tapete Porta Esponja Superior e Inferior </TableCell>
              <TableCell>$ {getPortaEsponjaMPrice()}</TableCell>
            </TableRow>
            <TableRow key="8">
              <TableCell><input
                type="checkbox"
                name="tapaCierreM"
                checked={accessories.tapaCierreM}
                onChange={handleChange}
              />
                Tapa Entrecierre Superior e Inferior </TableCell>
              <TableCell>$ {getTapaCierreMPrice()}</TableCell>
            </TableRow>
            <TableRow key="9">
              <TableCell><input
                type="radio"
                name="rodamiento"
                checked={accessories.rodamientoSimplekim}
                onChange={handleChange}
              />
                Rodamiento Simple en Agujas 100 Kilos
                <br />
                <input
                  type="radio"
                  name="rodamiento"
                  checked={accessories.rodamientoDoblekim}
                  onChange={handleChange}
                />
                Rodamiento Doble en Agujas 200 Kilos</TableCell>
              <TableCell>$ {getRodamientoPrice()}</TableCell>
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
                name="kitPuntoCierrekim"
                checked={accessories.kitPuntoCierrekim}
                onChange={handleChange}
              />
                Kit Punto de Cierre</TableCell>
              <TableCell>$ {getkitPuntoCierrekimPrice()}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell><input
                type="radio"
                name="kitManija"
                value="Kit de Cierre"
                checked={accessories.kitManijakim}
                onChange={handleChange}
              />
                Kit Manija Bidireccional con Transmision
                <br />
                <input
                  type="radio"
                  name="kitManija"
                  value="Kit de Manija con Llave"
                  checked={accessories.kitManijaConLlavekim}
                  onChange={handleChange}
                />
                Kit Manija Bidireccional con Transmision con Llave
              </TableCell>
              <TableCell>$ {getPriceDisplay()}</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell><input
                type="checkbox"
                name="pletinaPoliamida"
                checked={accessories.pletinaPoliamida}
                onChange={handleChange}
              />
                Pletina de Poliamida Negra</TableCell>
              <TableCell>$ {getPletinaPoliamidaPrice()}</TableCell>
            </TableRow>
            <TableRow key="5">
              <TableCell><input
                type="checkbox"
                name="empaqueBurbujakim"
                checked={accessories.empaqueBurbujakim}
                onChange={handleChange}
              />
                Empaque Burbuja Sello X 250M</TableCell>
              <TableCell>$ {getempaqueBurbujakimPrice()}</TableCell>
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
              <TableCell>60</TableCell>
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
              <TableCell>{empaquekimHeight} mm
                <br /> {empaquekimWidth} mm
              </TableCell>
              <TableCell>${empaquekimPrice.toFixed(2)}</TableCell>
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

export default Kimbayaxxx;
