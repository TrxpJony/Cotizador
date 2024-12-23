import '../../../css/colosal.css'; // Archivo CSS para estilos
import kimbayaImage from '../../../img/kimbaya.png'; // Importar la imagen
import { useState, useEffect } from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import { jsPDF } from 'jspdf'; // Importamos jsPDF
import { useNavigate } from 'react-router-dom';
import preciosData from '../../../api/db.json';
import logo from '../../../../src/img/logo.png'

const Kimbaya = () => {
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
      felpa: '',

  });

  const [glassDimensions, setGlassDimensions] = useState({
    glassWidth: '',
    glassHeight: '',
    glassPrice: '',
  });

  const [prices, setPrices] = useState({});
  const [accessoryPrices, setAccessoryPrices] = useState({});



  useEffect(() => {
    setPrices(preciosData.precios);
    setAccessoryPrices(preciosData.accesorios);
  }, []);
  

    /**hoja fija

    kitHojaFijakim: 30000,

    //hoja movil
    escuadraMovil: 22000,
    kit6M: 20000,
    kit2M: 10000,
    topesM: 10000,
    espumaTapaM: 5000,
    portaEsponjaM: 25000,
    tapaCierreM: 22000,
    rodamientoSimplekim: 33000,
    rodamientoDoblekim: 57000,

    //accesorios
    kitPuntoCierrekim: 12000,
    kitManijakim: 80000,
    kitManijaConLlavekim: 130000,
    pletinaPoliamida: 50000,
    empaqueBurbujakim: 30000,
  
  **/


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
  
  
  const { width, height } = dimensions;
  //const halfWidth = width ? width / 2 : '';
  const totalHeight = height ? height : '';
  const totalWidth = width ? width : '';

  const { glassPrice } = glassDimensions;

  // Calcular valores
  const doubleHeight = totalHeight ? totalHeight * 2 : '';
  const doubleWidth = totalWidth ? totalWidth * 2 : '';
  const area = width && height ? (width * height) / 1000000 : ''; // Convertir a m²
  const empaquekimHeight = height && width ? height * 4 : '';
  const empaquekimWidth = height && width ? width * 2 : '';
  const felpaHeight = height && width ? height * 6 : '';
  const felpaWidth = height && width ? width * 2 : '';
  const empaquekimPrice = (empaquekimHeight + empaquekimWidth) / 1000 * prices.empaquekim; // Precio total del empaquekim
  const totFelpa = (felpaHeight + felpaWidth );
  const marcoPerimetralkim = (totalWidth && totalHeight) ? (totalWidth * 2 + totalHeight * 2) : 0;
  const pistaRodamientokim = (totalWidth && totalHeight) ? (totalWidth * 2 + totalHeight * 4) : 0;
  const verticalHorizontaleskim = (totalWidth && totalHeight) ? (totalWidth * 4 + totalHeight * 2) : 0;
  const verticalHorizontalesCakim = (totalWidth && totalHeight) ? (totalWidth * 4 + totalHeight * 2) : 0;
  
  // Calcular precios
  const pistaRodamientokimPrice = (pistaRodamientokim/1000) * prices.pistaRodamientokim;
  const marcoPerimetralkimPrice = (marcoPerimetralkim / 1000) * prices.marcoPerimetralkim;
  const pistaRodamientokalPrice = prices.pistaRodamientokal * ((totalWidth / 1000)*2);
  const complementoSuperiorkimPrice = prices.complementoSuperiorkim * ((totalWidth / 1000)*2);
  const enganchekimPrice = prices.enganchekim * (doubleHeight / 1000);
  const engancheVidrioCakimPrice = prices.engancheVidrioCakim * (doubleHeight / 1000);
  const verticalHorizontaleskimPrice = (verticalHorizontaleskim/1000) * prices.verticalHorizontaleskim;
  const verticalHorizontalesCakimPrice = (verticalHorizontalesCakim/1000) * prices.verticalHorizontalesCakim;
  
 
  const escuadraEnsamblekimPrice = accessories.escuadraEnsamblekim ? accessoryPrices.escuadraEnsamblekim : 0;
  const espumaSelloSukimPrice = accessories.espumaSelloSukim? accessoryPrices.espumaSelloSukim: 0;
  const espumaSelloInkimPrice = accessories.espumaSelloInkim ? accessoryPrices.espumaSelloInkim: 0;
  const sifonSistemaskimPrice = accessories.sifonSistemaskim ? accessoryPrices.sifonSistemaskim: 0;
  const cajaDeflectoraPrice = accessories.cajaDeflectora ? accessoryPrices.cajaDeflectora : 0;
  const felpaPrice = (felpaHeight + felpaWidth) / 1000 * prices.felpacol; // Precio total de la felpa
  const manodeObraPrice =  prices.manodeObra * area;

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

  const totalPrice =
  enganchekimPrice +
  engancheVidrioCakimPrice+
  escuadraEnsamblekimPrice+
  espumaSelloInkimPrice+
  espumaSelloSukimPrice+
  sifonSistemaskimPrice+
  cajaDeflectoraPrice +
  marcoPerimetralkimPrice + // Agregar marco perimetral
  pistaRodamientokimPrice+
  pistaRodamientokalPrice + 
  complementoSuperiorkimPrice+
  verticalHorizontaleskimPrice+
  verticalHorizontalesCakimPrice+
  felpaPrice +
  empaquekimPrice +

  //hoja fija
  escuadraHojaPrice+
  kit6HPrice+
  kit2HPrice+
  topesHPrice+
  espumaTapaHPrice+
  portaEsponjaHPrice+
  tapaCierreHPrice+
  kitHojaFijakimPrice+

  //hoja movil
  escuadraMovilPrice+
  kit6MPrice+
  kit2MPrice+
  topesMPrice+
  espumaTapaMPrice+
  portaEsponjaMPrice+
  tapaCierreMPrice+
  rodamientoSimplekimPrice+
  rodamientoDoblekimPrice+

  //accesorios
  kitPuntoCierrekimPrice+
  kitManijakimPrice+
  kitManijaConLlavekimPrice+
  pletinaPoliamidaPrice+
  empaqueBurbujakimPrice+
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
          doc.text('Detalle de la cotización Kimbaya', 70, 34); // Texto blanco en la cabecera
        
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
          doc.text(`${marcoPerimetralkim} mm (4)`, 120, 55);
          doc.text(`${marcoPerimetralkimPrice.toFixed(2)}`, 170, 55);
          doc.text(`Pista Rodamiento Kalima:`, 20, 60);
          doc.text(`${doubleWidth} mm (2)`, 120, 60);
          doc.text(`${pistaRodamientokalPrice.toFixed(2)}`, 170, 60);
          doc.text(`Pista Rodamiento Kimbaya:`, 20, 65);
          doc.text(`${pistaRodamientokim} mm (6)`, 120, 65);
          doc.text(`${pistaRodamientokimPrice.toFixed(2)}`, 170, 65);
          doc.text(`Complemento Marco Superior:`, 20, 70);
          doc.text(`${doubleWidth} mm (2)`, 120, 70);
          doc.text(`${complementoSuperiorkimPrice.toFixed(2)}`, 170, 70);
    
          // Nave
          doc.setFontSize(12); // Título más pequeño
          doc.setTextColor(cyanBlue);
          doc.text('Nave', 20, 80); // Título de la sección Nave
    
          doc.setFontSize(10);
          doc.setTextColor('black');
          
          doc.text('Pieza', 20, 85);
          doc.text('Tamaño', 120, 85);
          doc.text('Precio', 170, 85);
          
          doc.setFontSize(10); // Texto más pequeño para los detalles
          doc.setTextColor('black');
    
          doc.text(`Vertical Horizontal Vidrio`, 20, 90);
          doc.text(`${verticalHorizontaleskim} mm (2)`, 120, 90);
          doc.text(`${verticalHorizontaleskimPrice.toFixed(2)}`, 170, 90);
          doc.text(`Enganche Vidrio:`, 20, 95);
          doc.text(`${doubleHeight} mm`, 120, 95);
          doc.text(`${enganchekimPrice.toFixed(2)}`, 170, 95);
          doc.text(`Vertical Horizontales Vidrio Camara:`, 20, 100);
          doc.text(`${verticalHorizontalesCakim} mm`, 120, 100);
          doc.text(`${verticalHorizontalesCakimPrice.toFixed(2)}`, 170, 100);
          doc.text(`Enganche Vidrio Camara:`, 20, 105);
          doc.text(`${doubleHeight} mm (2)`, 120, 105);
          doc.text(`${engancheVidrioCakimPrice.toFixed(2)}`, 170, 105);
    
          // Tabla Accesorios Marco
          doc.setFontSize(12); // Título más pequeño
          doc.setTextColor(cyanBlue);
          doc.text('Accesorios de Marco', 20, 115); // Título de la sección Empaque
                
          // Tabla de Accesorios Marco
          doc.setFontSize(10);
          doc.setTextColor('black');
    
          doc.text('Pieza', 20, 120);
          doc.text('Precio', 170, 120);
          
          doc.text(`Escuadra Ensamble Marco:`, 20, 125);
          doc.text(`${escuadraEnsamblekimPrice.toFixed(2)}`, 170, 125);
    
          doc.text(`Espuma Sello Superior:`, 20, 130);
          doc.text(`${espumaSelloSukimPrice.toFixed(2)}`, 170, 130);
          
          doc.text(`Espuma Sello Inferior:`, 20, 135);
          doc.text(`${espumaSelloInkimPrice.toFixed(2)}`, 170, 135);
    
          doc.text(`Sifon Sistemas Eurovitral:`, 20, 140);
          doc.text(`${sifonSistemaskimPrice.toFixed(2)}`, 170, 140);
    
          doc.text(`Caja Deflectora:`, 20, 145);
          doc.text(`${cajaDeflectoraPrice.toFixed(2)}`, 170, 145);
    
          // Tabla Accesorios de Hoja fija
          doc.setFontSize(12); // Título más pequeño
          doc.setTextColor(cyanBlue);
          doc.text('Accesorios de Hoja Fija', 20, 155); // Título de la sección Empaque
          
          // Tabla de Empaque
          doc.setFontSize(10);
          doc.setTextColor('black');
          
          doc.text('Pieza', 20, 160);
          doc.text('Precio', 170, 160);

          doc.text(`Escuadra Ensamble Hoja Fija:`, 20, 165);
          doc.text(`${escuadraHojaPrice.toFixed(2)}`, 170, 165);
          doc.text(`Kit de 6 Escuadras de Alineación Hoja Fija:`, 20, 170);
          doc.text(`${kit6HPrice.toFixed(2)}`, 170, 170);
          doc.text(`Kit de 2 Escuadras de Alineacion con Guia:`, 20, 175);
          doc.text(`${topesHPrice.toFixed(2)}`, 170, 175);
          doc.text(`Topes Para Hojas:`, 20, 180);
          doc.text(`${topesHPrice.toFixed(2)}`, 170, 180);
          doc.text(`Espuma Tapa Guia Superior/Inferior:`, 20, 185);
          doc.text(`${espumaTapaHPrice.toFixed(2)}`, 170, 185);
          doc.text(`Tapa y Tapete Porta Esponja Superior e Inferior`, 20, 190);
          doc.text(`${portaEsponjaHPrice.toFixed(2)}`, 170, 190);
          doc.text(`Tapa Entrecierre Supeior e Inferior:`, 20, 195);
          doc.text(`${tapaCierreHPrice.toFixed(2)}`, 170, 195);
          doc.text(`Kit Hoja Fija:`, 20, 200);
          doc.text(`${kitHojaFijakimPrice.toFixed(2)}`, 170, 200);
    
    
          // Tabla accesorios hoja mobil
          doc.setFontSize(12); // Título más pequeño
          doc.setTextColor(cyanBlue);
          doc.text('Accesorios de Hoja Mobil', 20, 210); // Título de la sección Empaque
    
          // Tabla accesorios hoja mobil
          doc.setFontSize(10);
          doc.setTextColor('black');
    
          doc.text('Pieza', 20, 215);
          doc.text('Precio', 170, 215);

          doc.text(`Escuadra Ensamble Hoja Mobil:`, 20, 220);
          doc.text(`${escuadraMovilPrice.toFixed(2)}`, 170, 220);
          doc.text(`Kit de 6 Escuadras de Alineación Hoja Mobil:`, 20, 225);
          doc.text(`${kit6MPrice.toFixed(2)}`, 170, 225);
          doc.text(`Kit de 2 Escuadras de Alineacion con Guia:`, 20, 230);
          doc.text(`${kit2MPrice.toFixed(2)}`, 170, 230);
          doc.text(`Topes Para Hojas:`, 20, 235);
          doc.text(`${topesMPrice.toFixed(2)}`, 170, 235);
          doc.text(`Espuma Tapa Guia Superior/Inferior:`, 20, 240);
          doc.text(`${espumaTapaMPrice.toFixed(2)}`, 170, 240);
          doc.text(`Tapa y Tapete Porta Esponja Superior e Inferior`, 20, 245);
          doc.text(`${portaEsponjaMPrice.toFixed(2)}`, 170, 245);
          doc.text(`Tapa Entrecierre Supeior e Inferior:`, 20, 250);
          doc.text(`${tapaCierreMPrice.toFixed(2)}`, 170, 250);
          doc.text(`Rodamiento Simple en Aguja 100 Kilos:`, 20, 255);
          doc.text(`${rodamientoSimplekimPrice.toFixed(2)}`, 170, 255);
          doc.text(`Rodamiento Doble en Aguja 200 Kilos:`, 20, 260);
          doc.text(`${rodamientoDoblekimPrice.toFixed(2)}`, 170, 260);
          doc.addPage(2)


          // Tabla accesorios 
          doc.setFontSize(12); // Título más pequeño
          doc.setTextColor(cyanBlue);
          doc.text('Accesorios de Hoja Mobil', 20, 20); // Título de la sección Empaque
    
          // Tabla accesorios 
          doc.setFontSize(10);
          doc.setTextColor('black');
              
          doc.text('Pieza', 20, 25);
          doc.text('Precio', 170, 25);
          
          doc.text(`Kit Punto de Cierre:`, 20, 30);
          doc.text(`${kitPuntoCierrekimPrice.toFixed(2)}`, 170, 30);
          doc.text(`Kit Manija Bidireccional con Transmision:`, 20, 35);
          doc.text(`${kitManijakimPrice.toFixed(2)}`, 170, 35);
          doc.text(`Kit Manija Bidireccional con Transmision con Llave:`, 20, 40);
          doc.text(`${kitManijaConLlavekimPrice.toFixed(2)}`, 170, 40);
          doc.text(`Pletina de Poliamida Negra:`, 20, 45);
          doc.text(`${pletinaPoliamidaPrice.toFixed(2)}`, 170, 45);
          doc.text(`Empaque Burbuja Sello X 250M`, 20, 50);
          doc.text(`${empaqueBurbujakimPrice.toFixed(2)}`, 170, 50);


          // Tabla Empaque
          doc.setFontSize(12); // Título más pequeño
          doc.setTextColor(cyanBlue);
          doc.text('Empaque', 20, 60); // Título de la sección Empaque

          // Tabla de Empaque
          doc.setFontSize(10);
          doc.setTextColor('black');
 
          doc.text('Pieza', 20, 65);
          doc.text('Tamaño', 120, 65);
          doc.text('Precio', 170, 65);
          doc.text(`Empaque (Alto):`, 20, 70);
          doc.text(`${empaquekimHeight} mm`, 120, 70)
          doc.text(`Empaque (Ancho):`, 20, 75);
          doc.text(`${empaquekimWidth} mm`, 120, 75);
          doc.text(`${empaquekimPrice.toFixed(2)}`, 170, 72.5);
          doc.text(`Felpa 5.00 x 7.00:`, 20, 80);
          doc.text(`${totFelpa} mm`, 120, 80);
          doc.text(`${felpaPrice.toFixed(2)}`, 170, 80);
 /**    
          doc.text(`Torinillos:`, 20, 200);
          doc.text(`16`, 120, 200);
          doc.text(`${tornillosPrice.toFixed(2)}`, 170, 200);
    
          doc.text(`Silicona:`, 20, 205);
          doc.text(`${siliconaPrice.toFixed(2)}`, 170, 205);
*/

          // Total
          doc.setFontSize(14);
          doc.setTextColor(cyanBlue);
          doc.text('Total', 170, 90); // Título Total
    
          doc.setFontSize(16);
          doc.setTextColor('black');
          // Formateamos el total con separadores de miles y el símbolo de moneda
          const formattedTotal = totalPrice.toLocaleString('en-US', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
          // Mostramos el total formateado
          doc.text(formattedTotal, 150, 95); // Total
                // Guardamos el archivo PDF
                doc.save('cotizacion-marco.pdf'); // Guardamos el archivo con el nombre
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
         {/* Botón para regresar */}
         <button 
          onClick={() => navigate(-1)} 
          className="bg-cyan-500 text-white py-2 px-4 rounded-lg font-bold text-lg hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            Regresar
         </button>

      
      </div>
          <br />
      {/* Lista de partes */}
      <div className="parts-list">
        <strong><h1>KIMBAYA</h1></strong>
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
          <TableCell>{doubleWidth} mm (2)</TableCell>
          <TableCell>${pistaRodamientokalPrice.toFixed(2)}</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell><strong>Pista Rodamiento Kimbaya:</strong></TableCell>
          <TableCell>{pistaRodamientokim} mm (6) </TableCell>
          <TableCell>${pistaRodamientokimPrice.toFixed(2)}</TableCell>
        </TableRow>
        <TableRow key="5">
          <TableCell><strong>Complemento Superior Marco:</strong></TableCell>
          <TableCell>{doubleWidth} mm (2) </TableCell>
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
          <TableCell><strong>Enganchekim Vidrio:</strong> </TableCell>
          <TableCell>{doubleHeight} mm (2) </TableCell>
          <TableCell>${enganchekimPrice.toFixed(2)}</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell><strong>Vertical Horizontales Vidrio Camara:</strong> </TableCell>
          <TableCell>{verticalHorizontalesCakim} mm (6) </TableCell>
          <TableCell>${verticalHorizontalesCakimPrice.toFixed(2)}</TableCell>
        </TableRow>
        <TableRow key="5">
          <TableCell><strong>Enganchekim Vidrio Camara:</strong> </TableCell>
          <TableCell>{doubleHeight} mm (2) </TableCell>
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
                name="escuadraEnsamblekim"
                checked={accessories.escuadraEnsamblekim}
                onChange={handleChange}
                />
                Escuadra Ensamble Marco
            </TableCell>
          <TableCell>$ {getescuadraEnsamblekimPrice()}</TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell><input
                type="checkbox"
                name="espumaSelloSukim"
                checked={accessories.espumaSelloSukim}
                onChange={handleChange}
                />
                Espuma Sello Superior</TableCell>
          <TableCell>$ {getespumaSelloSukimPrice()} </TableCell>
        </TableRow>
        <TableRow key="4">
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
        <TableRow key="5">
          <TableCell><input
                    type="checkbox"
                    name="sifonSistemaskim"
                    checked={accessories.sifonSistemaskim}
                    onChange={handleChange}
                />
                Sifón Sistemas Eurovitral</TableCell>
          <TableCell>$ {getsifonSistemaskimPrice()}</TableCell>
        </TableRow>
        <TableRow key="6">
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
            name="rodamientoSimplekim"
            checked={accessories.rodamientoSimplekim}
            onChange={handleChange}
            />
            Rodamiento Simple en Agujas 100 Kilos
            <br />
            <input
            type="radio"
            name="rodamientoDoblekim"
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
        name="kitManijakim"
        value="Kit de Cierre"
        checked={accessories.kitManijakim}
        onChange={handleChange}
      />
      Kit Manija Bidireccional con Transmision
      <br />
      <input
        type="radio"
        name="kitManijaConLlavekim"
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
    <Table aria-label="TABLA EMPAQUEkim">
      <TableHeader>
        <TableColumn><h1>Empaquekim</h1></TableColumn>
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
          <TableCell><strong>Empaquekim (Alto): 
            <br />
            Empaquekim (Ancho): </strong></TableCell>
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

export default Kimbaya;
