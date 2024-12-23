import '../../../css/colosal.css'; // Archivo CSS para estilos
import Astral20Image from '../../../img/colox.png'; // Importar la imagen
import { useState, useEffect } from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import preciosData from '../../../api/db.json';
import logo from '../../../../src/img/logo.png'
import { jsPDF } from 'jspdf'; // Importamos jsPDF

const Astral17 = () => {
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
  

   
const [prices, setPrices] = useState({});
const [accessoryPrices, setAccessoryPrices] = useState({});


useEffect(() => {
  setPrices(preciosData.precios);
  setAccessoryPrices(preciosData.accesorios);
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
  
  
  const { width, height } = dimensions;
  const halfWidth = width ? width / 2 : '';
  const totalHeight = height ? height : '';
  const totalWidth = width ? width : '';

  const { glassPrice } = glassDimensions;

  // Calcular valores
  const doubleHeight = totalHeight ? totalHeight * 2 : '';
  const doubleHalfWidth = halfWidth ? halfWidth * 2 : '';
  const area = width && height ? (width * height) / 1000000 : ''; // Convertir a m²
  const empaqueastHeight = height && width ? height * 4 : '';
  const empaqueastWidth = height && width ? width * 2 : '';
  const felpaHeight = height && width ? height * 4 : '';
  const felpaWidth = height && width ? width * 2 : '';
  const empaqueastPrice = (empaqueastHeight + empaqueastWidth) / 1000 * prices.empaqueast; // Precio total del empaqueast
  const totFelpa = (felpaHeight + felpaWidth );
  // Calcular precios
  const cabezalastPrice = prices.cabezalast * (totalWidth / 1000);
  const sillarastPrice = prices.sillarast * (totalWidth / 1000);
  const sillarAlfajiaastPrice = prices.sillarAlfajiaast * (totalWidth / 1000);
  const jambaastPrice = prices.jambaast * (doubleHeight / 1000);
  const horizontalSuperiorastPrice = prices.horizontalSuperiorast * (doubleHalfWidth / 1000);
  const horizontalInferiorFijaastPrice = prices.horizontalInferiorFijaast * (halfWidth / 1000);
  const horizontalInferiorMovilastPrice = prices.horizontalInferiorMovilast * (halfWidth / 1000);
  const traslapeastPrice = prices.traslapeast * (doubleHeight / 1000);
  const engancheastPrice = prices.engancheast * (doubleHeight / 1000);


  const kitCierreastPrice = accessories.kitCierreast ? accessoryPrices.kitCierreast : 0;
  const cubetaAngeoPrice = accessories.cubetaAngeo ? accessoryPrices.cubetaAngeo : 0;
  const rodamiento80astPrice = accessories.rodamiento80ast ? accessoryPrices.rodamiento80ast : 0;
  const rodamiento40astPrice = accessories.rodamiento40ast ? accessoryPrices.rodamiento40ast : 0;
  const cajaDeflectoraPrice = accessories.cajaDeflectora ? accessoryPrices.cajaDeflectora : 0;
  const rodamientoNave22astPrice = accessories.rodamientoNave22ast ? accessoryPrices.rodamientoNave22ast : 0;
  const guiaSuperiorangeoPrice = accessories.guiaSuperiorangeo ? accessoryPrices.guiaSuperiorangeo : 0;
  const felpaPrice = (felpaHeight + felpaWidth) / 1000 * prices.felpacol; // Precio total de la felpa
  const manodeObraPrice =  prices.manodeObra * area;

  const totalPrice =
    cabezalastPrice +
    sillarastPrice +
    sillarAlfajiaastPrice+
    jambaastPrice +
    horizontalSuperiorastPrice +
    horizontalInferiorFijaastPrice +
    horizontalInferiorMovilastPrice +
    traslapeastPrice +
    engancheastPrice +
    kitCierreastPrice +
    cubetaAngeoPrice +
    rodamiento80astPrice +
    rodamiento40astPrice +
    cajaDeflectoraPrice +
    rodamientoNave22astPrice+
    guiaSuperiorangeoPrice+
    felpaPrice+
    empaqueastPrice+
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
      doc.text('Detalle de la cotización Astral 1.7 XO-OX', 70, 34); // Texto blanco en la cabecera
    
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
      doc.text(`${cabezalastPrice.toFixed(2)}`, 170, 55);
      doc.text(`Sillar un Riel:`, 20, 60);
      doc.text(`${totalWidth} mm`, 120, 60);
      doc.text(`${sillarastPrice.toFixed(2)}`, 170, 60);
      doc.text(`Sillar Alfajia un Riel:`, 20, 65);
      doc.text(`${totalWidth} mm`, 120, 65);
      doc.text(`${sillarAlfajiaastPrice.toFixed(2)}`, 170, 65);
      doc.text(`Jamba:`, 20, 70);
      doc.text(`${doubleHeight} mm (2)`, 120, 70);
      doc.text(`${jambaastPrice.toFixed(2)}`, 170, 70);

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
      doc.text(`${doubleHalfWidth} mm (2)`, 120, 90);
      doc.text(`${horizontalSuperiorastPrice.toFixed(2)}`, 170, 90);
      doc.text(`Horizontal Inferior Fija:`, 20, 95);
      doc.text(`${halfWidth} mm`, 120, 95);
      doc.text(`${horizontalInferiorFijaastPrice.toFixed(2)}`, 170, 95);
      doc.text(`Horizontal Inferior Móvil:`, 20, 100);
      doc.text(`${halfWidth} mm`, 120, 100);
      doc.text(`${horizontalInferiorMovilastPrice.toFixed(2)}`, 170, 100);
      doc.text(`Traslape:`, 20, 105);
      doc.text(`${doubleHeight} mm (2)`, 120, 105);
      doc.text(`${traslapeastPrice.toFixed(2)}`, 170, 105);
      doc.text(`Enganche:`, 20, 110);
      doc.text(`${doubleHeight} mm (2)`, 120, 110);
      doc.text(`${engancheastPrice.toFixed(2)}`, 170, 110);


      // Tabla Accesorios
      doc.setFontSize(12); // Título más pequeño
      doc.setTextColor(cyanBlue);
      doc.text('Accesorios', 20, 120); // Título de la sección Empaque
            
      // Tabla de Accesorios
      doc.setFontSize(10);
      doc.setTextColor('black');

      doc.text('Pieza', 20, 125);
      doc.text('Precio', 170, 125);
      
      doc.text(`Kit de Cierre:`, 20, 130);
      doc.text(`${kitCierreastPrice.toFixed(2)}`, 170, 130);
      doc.text(`Cubeta de Angeo Negra:`, 20, 135);
      doc.text(`${cubetaAngeoPrice.toFixed(2)}`, 170, 135);
      doc.text(`Rodamiento 80 Kilos en Agujas:`, 20, 140);
      doc.text(`${rodamiento80astPrice.toFixed(2)}`, 170, 140);
      doc.text(`Rodamiento 40 Kilos en Agujas:`, 20, 145);
      doc.text(`${rodamiento40astPrice.toFixed(2)}`, 170, 145);
      doc.text(`Caja Deflectora:`, 20, 150);
      doc.text(`${cajaDeflectoraPrice.toFixed(2)}`, 170, 150);
      doc.text(`Rodamiento 22 Kilos en Bolas Para Naves:`, 20, 155);
      doc.text(`${rodamientoNave22astPrice.toFixed(2)}`, 170, 155);

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
      doc.text(`${empaqueastHeight} mm`, 120, 175);

      doc.text(`Empaque (Ancho):`, 20, 180);
      doc.text(`${empaqueastWidth} mm`, 120, 180);
      doc.text(`${empaqueastPrice.toFixed(2)}`, 170, 175.5);

      doc.text(`Felpa 5.00 x 7.00:`, 20, 185);
      doc.text(`${totFelpa} mm`, 120, 185);
      doc.text(`${felpaPrice.toFixed(2)}`, 170, 185);

      /*/ Tabla Utilitarios
      doc.setFontSize(12); // Título más pequeño
      doc.setTextColor(cyanBlue);
      doc.text('Utilitarios', 20, 190); // Título de la sección Empaque

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
*/
      // Total
      doc.setFontSize(14);
      doc.setTextColor(cyanBlue);
      doc.text('Total', 170, 195); // Título Total

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
      doc.text(formattedTotal, 150, 200); // Total
            // Guardamos el archivo PDF
            doc.save('cotizacion-marco.pdf'); // Guardamos el archivo con el nombre
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
        <img src={Astral20Image} alt="Puerta ventana corrediza" className="door-image" />

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
        <strong><h1>ASTRAL 1.7</h1></strong>
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
          <TableCell><strong>Sillarast un Riel:</strong></TableCell>
          <TableCell>{totalWidth} mm</TableCell>
          <TableCell>${sillarastPrice.toFixed(2)}</TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell><strong>Sillarast Alfajia un Riel:</strong></TableCell>
          <TableCell>{totalWidth} mm</TableCell>
          <TableCell>${sillarAlfajiaastPrice.toFixed(2)}</TableCell>
        </TableRow>
        <TableRow key="4">
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
        <TableRow key="3">
          <TableCell><strong>Horizontal Inferior Fija:</strong></TableCell>
          <TableCell>{halfWidth} mm</TableCell>
          <TableCell>${horizontalInferiorFijaastPrice.toFixed(2)}</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell><strong>Horizontal Inferior:</strong> </TableCell>
          <TableCell>{halfWidth} mm </TableCell>
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
    <Table aria-label="TABLA EMPAQUEast">
      <TableHeader>
        <TableColumn><h1>Empaqueast</h1></TableColumn>
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
          <TableCell><strong>Empaqueast (Alto): 
            <br />
            Empaqueast (Ancho): </strong></TableCell>
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

export default Astral17;
