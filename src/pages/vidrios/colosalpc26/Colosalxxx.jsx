import '../../../css/colosal.css'; // Archivo CSS para estilos
import colosalImage from '../../../img/colxxx.png'; // Importar la imagen
import { useState, useEffect } from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf'; // Importamos jsPDF
import preciosData from '../../../api/db.json';
import logo from '../../../../src/img/logo.png'

const Colosalxxx = () => {
  const navigate = useNavigate(); // Inicializar useNavigate
  const [dimensions, setDimensions] = useState({ width: '', height: '' });
  const [accessories, setAccessories] = useState({
    kitCierrecol: false,
    kitCierreConLlavecol: false,
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
    if (name === 'kitCierrecol' || name === 'kitCierreConLlavecol') {
      setAccessories((prev) => ({
        ...prev,
        kitCierrecol: name === 'kitCierrecol' ? checked : false,
        kitCierreConLlavecol: name === 'kitCierreConLlavecol' ? checked : false,
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
  const tripleWidth = width ? width / 3 : '';
  const totalHeight = height ? height : '';
  const totalWidth = width ? width : '';

  const { glassPrice } = glassDimensions;

  // Calcular valores
  const doubleHeight = totalHeight ? totalHeight * 2 : '';
  const cuadrupleHeight = totalHeight ? totalHeight * 4 : '';
  const tripleHalfWidth = tripleWidth ? tripleWidth * 3 : '';
  const area = width && height ? (width * height) / 1000000 : ''; // Convertir a m²
  const empaquecolHeight = height && width ? height * 4 : '';
  const empaquecolWidth = height && width ? width * 2 : '';
  const felpaHeight = height && width ? height * 6 : '';
  const felpaWidth = height && width ? width * 2 : '';
  const empaquecolPrice = (empaquecolHeight + empaquecolWidth) / 1000 * prices.empaquecol; // Precio total del empaquecol
  const totFelpa = (felpaHeight + felpaWidth );
  // Calcular precios
  const cabezalcolPrice = prices.cabezalcol * (totalWidth / 1000);
  const sillarcolPrice = prices.sillarcol * (totalWidth / 1000);
  const guiaDoblecolPrice = prices.guiaDoblecol * (totalWidth / 1000);
  const jambacolPrice = prices.jambacol * (doubleHeight / 1000);
  const horizontalSuperiorcolPrice = prices.horizontalSuperiorcol * (tripleHalfWidth / 1000);
  const horizontalInferiorMovilcolPrice = prices.horizontalInferiorMovilcol * (tripleHalfWidth / 1000);
  const traslapecolPrice = prices.traslapecol * (doubleHeight / 1000);
  const enganchecolPrice = prices.enganchecol * (cuadrupleHeight / 1000);
  const complementoCabezalcolPrice = prices.complementoCabezalcol * (totalWidth / 1000);
  const complementoJambacolPrice = prices.complementoJambacol * (doubleHeight / 1000);

  const kitCierrecolPrice = accessories.kitCierrecol ? accessoryPrices.kitCierrecol : 0;
  const kitCierreConLlavecolPrice = accessories.kitCierreConLlavecol? accessoryPrices.kitCierreConLlavecol: 0;
  const cubetaAngeoPrice = accessories.cubetaAngeo ? accessoryPrices.cubetaAngeo : 0;
  const rodamientoSimple70colPrice = accessories.rodamientoSimple70col ? accessoryPrices.rodamientoSimple70col * 2 : 0;
  const rodamientoDoble140colPrice = accessories.rodamientoDoble140col ? accessoryPrices.rodamientoDoble140col * 2 : 0;
  const cajaDeflectoraPrice = accessories.cajaDeflectora ? accessoryPrices.cajaDeflectora : 0;
  const felpaPrice = (felpaHeight + felpaWidth) / 1000 * prices.felpacol; // Precio total de la felpa
  const manodeObraPrice =  prices.manodeObra * area;

  const tornillosPrice = utilitaryPrices.tornillos * 44;
  const siliconaPrice = utilitaryPrices.silicona * 1;

  const totalPrice =
    cabezalcolPrice +
    sillarcolPrice +
    guiaDoblecolPrice +
    jambacolPrice +
    horizontalSuperiorcolPrice +
    horizontalInferiorMovilcolPrice +
    traslapecolPrice +
    enganchecolPrice +
    kitCierrecolPrice +
    kitCierreConLlavecolPrice +
    cubetaAngeoPrice +
    rodamientoSimple70colPrice +
    rodamientoDoble140colPrice +
    cajaDeflectoraPrice +
    felpaPrice+
    empaquecolPrice+
    tornillosPrice+
    siliconaPrice+
    complementoCabezalcolPrice+
    complementoJambacolPrice+

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
      doc.text('Detalle de la cotización Colosal PC 2.6 XXX', 70, 34); // Texto blanco en la cabecera
    
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
      doc.text(`${totalWidth} mm`, 120, 55);
      doc.text(`${cabezalcolPrice.toFixed(2)}`, 170, 55);
      doc.text(`Sillar:`, 20, 60);
      doc.text(`${totalWidth} mm`, 120, 60);
      doc.text(`${sillarcolPrice.toFixed(2)}`, 170, 60);
      doc.text(`Guia Doble:`, 20, 65);
      doc.text(`${totalWidth} mm`, 120, 65);
      doc.text(`${guiaDoblecolPrice.toFixed(2)}`, 170, 65);
      doc.text(`Jamba:`, 20, 70);
      doc.text(`${doubleHeight} mm (2)`, 120, 70);
      doc.text(`${jambacolPrice.toFixed(2)}`, 170, 70);

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

      doc.text(`Horizontal Superior:`, 20, 90);
      doc.text(`${tripleHalfWidth} mm (3)`, 120, 90);
      doc.text(`${horizontalSuperiorcolPrice.toFixed(2)}`, 170, 90);
      doc.text(`Horizontal Inferior Móvil:`, 20, 95);
      doc.text(`${tripleHalfWidth} mm (3)`, 120, 95);
      doc.text(`${horizontalInferiorMovilcolPrice.toFixed(2)}`, 170, 95);
      doc.text(`Traslape:`, 20, 100);
      doc.text(`${doubleHeight} mm (2)`, 120, 100);
      doc.text(`${traslapecolPrice.toFixed(2)}`, 170, 100);
      doc.text(`Enganche:`, 20, 105);
      doc.text(`${cuadrupleHeight} mm (4)`, 120, 105);
      doc.text(`${enganchecolPrice.toFixed(2)}`, 170, 105);


      // Tabla Accesorios
      doc.setFontSize(12); // Título más pequeño
      doc.setTextColor(cyanBlue);
      doc.text('Accesorios', 20, 115); // Título de la sección Empaquecol
            
      // Tabla de Accesorios
      doc.setFontSize(10);
      doc.setTextColor('black');

      doc.text('Pieza', 20, 120);
      doc.text('Precio', 170, 120);
      
      doc.text(`Kit de Cierre:`, 20, 125);
      doc.text(`${kitCierrecolPrice.toFixed(2)}`, 170, 125);

      doc.text(`Kit de Cierre con Llave:`, 20, 130);
      doc.text(`${kitCierreConLlavecolPrice.toFixed(2)}`, 170, 130);
      
      doc.text(`Cubeta de Angeo Negra:`, 20, 135);
      doc.text(`${cubetaAngeoPrice.toFixed(2)}`, 170, 135);

      doc.text(`Rodamiento Simple en Agujas:`, 20, 140);
      doc.text(`${rodamientoSimple70colPrice.toFixed(2)}`, 170, 140);

      doc.text(`Rodamiento Doble en Agujas:`, 20, 145);
      doc.text(`${rodamientoDoble140colPrice.toFixed(2)}`, 170, 145);

      doc.text(`Caja Deflectora:`, 20, 150);
      doc.text(`${cajaDeflectoraPrice.toFixed(2)}`, 170, 150);

      // Tabla Empaquecol
      doc.setFontSize(12); // Título más pequeño
      doc.setTextColor(cyanBlue);
      doc.text('Empaque', 20, 160); // Título de la sección Empaquecol
      
      // Tabla de Empaquecol
      doc.setFontSize(10);
      doc.setTextColor('black');
      
      doc.text('Pieza', 20, 165);
      doc.text('Tamaño', 120, 165);
      doc.text('Precio', 170, 165);

      doc.text(`Empaquecol (Alto):`, 20, 170);
      doc.text(`${empaquecolHeight} mm`, 120, 170);
      doc.text(`${empaquecolPrice.toFixed(2)}`, 170, 170);

      doc.text(`Empaquecol (Ancho):`, 20, 175);
      doc.text(`${empaquecolWidth} mm`, 120, 175);
      doc.text(`${empaquecolPrice.toFixed(2)}`, 170, 175);

      doc.text(`Felpa 5.00 x 7.00:`, 20, 180);
      doc.text(`${totFelpa} mm`, 120, 180);
      doc.text(`${felpaPrice.toFixed(2)}`, 170, 180);

      // Tabla Utilitarios
      doc.setFontSize(12); // Título más pequeño
      doc.setTextColor(cyanBlue);
      doc.text('Utilitarios', 20, 190); // Título de la sección Empaquecol

      // Tabla de Utilitarios
      doc.setFontSize(10);
      doc.setTextColor('black');

      doc.text('Pieza', 20, 195);
      doc.text('cantidad', 120, 195);
      doc.text('Precio', 170, 195);

      doc.text(`Torinillos:`, 20, 200);
      doc.text(`16`, 120, 200);
      doc.text(`${tornillosPrice.toFixed(2)}`, 170, 200);

      doc.text(`Silicona:`, 20, 205);
      doc.text(`${siliconaPrice.toFixed(2)}`, 170, 205);

      // Total
      doc.setFontSize(14);
      doc.setTextColor(cyanBlue);
      doc.text('Total', 170, 215); // Título Total

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
      doc.text(formattedTotal, 150, 220); // Total
            // Guardamos el archivo PDF
            doc.save('cotizacion-marco.pdf'); // Guardamos el archivo con el nombre
          };

    
    const getPriceDisplay = () => {
        if (accessories.kitCierrecol) {
          return `$${accessoryPrices.kitCierrecol.toFixed(2)}`;
        } else if (accessories.kitCierreConLlavecol) {
          return `$${accessoryPrices.kitCierreConLlavecol.toFixed(2)}`;
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
          return `$${rodamientoSimple70colPrice.toFixed(2)}`; // Mostrar precio si 'rodamientoSimple70col' está seleccionado
        } else if (accessories.rodamientoDoble140col) {
          return `$${rodamientoDoble140colPrice.toFixed(2)}`; // Mostrar precio si 'rodamientoDoble140col' está seleccionado
        }
        return ''; // Si no se selecciona ningún radio button, no mostrar precio
      };
      
      
      const getCajaPrice = () => {
        if (accessories.cajaDeflectora) {
          return `$${accessoryPrices.cajaDeflectora.toFixed(2)}`; // Mostrar precio si el checkbox está seleccionado
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
        <strong><h1>COLOSAL PC 2.6 XXX</h1></strong>
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
          <TableCell>${cabezalcolPrice.toFixed(2)}</TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell><strong>Sillar:</strong></TableCell>
          <TableCell>{totalWidth} mm</TableCell>
          <TableCell>${sillarcolPrice.toFixed(2)}</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell><strong>Guia Doble:</strong></TableCell>
          <TableCell>{totalWidth} mm</TableCell>
          <TableCell>${guiaDoblecolPrice.toFixed(2)}</TableCell>
        </TableRow>
        <TableRow key="5">
          <TableCell><strong>Jamba:</strong></TableCell>
          <TableCell>{doubleHeight} mm (2)</TableCell>
          <TableCell>${jambacolPrice.toFixed(2)}</TableCell>
        </TableRow>
        <TableRow key="6">
          <TableCell><strong>Complemento Cabezal:</strong></TableCell>
          <TableCell>{totalWidth} mm</TableCell>
          <TableCell>${complementoCabezalcolPrice.toFixed(2)}</TableCell>
        </TableRow>
        <TableRow key="7">
          <TableCell><strong>Complemento Jamba:</strong></TableCell>
          <TableCell>{doubleHeight} mm (2)</TableCell>
          <TableCell>${complementoJambacolPrice.toFixed(2)}</TableCell>
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
          <TableCell>{tripleHalfWidth} mm (3)</TableCell>
          <TableCell>${horizontalSuperiorcolPrice.toFixed(2)}</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell><strong>Horizontal Inferior Móvil:</strong> </TableCell>
          <TableCell>{tripleHalfWidth} mm (3)</TableCell>
          <TableCell>${horizontalInferiorMovilcolPrice.toFixed(2)}</TableCell>
        </TableRow>
        <TableRow key="5">
          <TableCell><strong>Traslape:</strong> </TableCell>
          <TableCell>{doubleHeight} mm (2) </TableCell>
          <TableCell>${traslapecolPrice.toFixed(2)}</TableCell>
        </TableRow>
        <TableRow key="6">
          <TableCell><strong>Enganche:</strong> </TableCell>
          <TableCell>{cuadrupleHeight} mm (4) </TableCell>
          <TableCell>${enganchecolPrice.toFixed(2)}</TableCell>
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
        name="kitCierrecol"
        value="Kit de Cierre"
        checked={accessories.kitCierrecol}
        onChange={handleChange}
      />
      Kit de Cierre
      <br />
      <input
        type="radio"
        name="kitCierreConLlavecol"
        value="Kit de Cierre con Llave"
        checked={accessories.kitCierreConLlavecol}
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
            Rodamiento Simple en Agujas (2)
            <br />
            <input
            type="radio"
            name="rodamientoDoble140col"
            checked={accessories.rodamientoDoble140col}
            onChange={handleChange}
            />
            Rodamiento Doble en Agujas (2)</TableCell>
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
      </TableBody>
    </Table>
    
    <br />
    <Table aria-label="TABLA EMPAQUEcol">
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
    <Table aria-label="TABLA EMPAQUEcol">
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

export default Colosalxxx;
