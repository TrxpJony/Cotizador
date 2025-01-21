import '../../../css/colosal.css'; // Archivo CSS para estilos
import sistema8025img from '../../../img/colox.png'; // Importar la imagen
import { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf'; // Importamos jsPDF
import preciosData from '../../../api/db.json';
import logo from '../../../../src/img/logo.png'

const Sistema8025 = () => {
  const navigate = useNavigate(); // Inicializar useNavigate
  const [dimensions, setDimensions] = useState({ width: '', height: '' });
  const [accessories, setAccessories] = useState({
    kitCierre8025: false,
    kitCierreConLlave8025: false,
    rodamientoSimple8025: false,
    rodamientoDoble8025: false,
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
    } else if (type === 'radio') {
      // Desmarcar la otra opción cuando se selecciona una nueva
      if (name === 'kitCierre8025' || name === 'kitCierreConLlave8025') {
        setAccessories((prev) => ({
          ...prev,
          kitCierre8025: name === 'kitCierre8025' ? checked : false,
          kitCierreConLlave8025: name === 'kitCierreConLlave8025' ? checked : false,
        }));
      } else if (name === 'rodamientoSimple8025' || name === 'rodamientoDoble8025') {
        setAccessories((prev) => ({
          ...prev,
          rodamientoSimple8025: name === 'rodamientoSimple8025' ? checked : false,
          rodamientoDoble8025: name === 'rodamientoDoble8025' ? checked : false,
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
  const empaque744Height = height && width ? height * 4 : '';
  const empaque744Width = height && width ? width * 2 : '';
  const felpaHeight = height && width ? height * 6 : '';
  const felpaWidth = height && width ? width * 2 : '';
  const empaque744Price = (empaque744Height + empaque744Width) / 1000 * prices.empaque744; // Precio total del empaque
  const totFelpa = (felpaHeight + felpaWidth);
  // Calcular precios
  const cabezal8025Price = prices.cabezal8025 * (totalWidth / 1000);
  const sillar8025Price = prices.sillar8025 * (totalWidth / 1000);
  const jamba8025Price = prices.jamba8025 * (doubleHeight / 1000);
  const horizontalSuperior8025Price = prices.horizontalSuperior8025 * (doubleHalfWidth / 1000);
  const horizontalInferior8025Price = prices.horizontalInferior8025 * (doubleHalfWidth / 1000);
  const traslape8025Price = prices.traslape8025 * (doubleHeight / 1000);
  const enganche8025Price = prices.enganche8025 * (doubleHeight / 1000);

  const kitCierre8025Price = accessories.kitCierre8025 ? accessoryPrices.kitCierre8025 : 0;
  const kitCierreConLlave8025Price = accessories.kitCierreConLlave8025 ? accessoryPrices.kitCierreConLlave8025 : 0;
  const rodamientoSimple8025Price = accessories.rodamientoSimple8025 ? accessoryPrices.rodamientoSimple8025 * 2 : 0;
  const rodamientoDoble8025Price = accessories.rodamientoDoble8025 ? accessoryPrices.rodamientoDoble8025 * 2 : 0;
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
    kitCierreConLlave: { cantidad: 0, totalPrice: 0 },
    rodamientoSimple: { cantidad: 0, totalPrice: 0 },
    rodamientoDoble: { cantidad: 0, totalPrice: 0 },
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
        totalPrice: prevTotals.sillar.totalPrice + sillar8025Price, // Sumar precio
      },
      cabezal: {
        totalSize: prevTotals.cabezal.totalSize + parseFloat(totalWidth),
        totalPrice: prevTotals.cabezal.totalPrice + cabezal8025Price,
      },
      jamba: {
        totalSize: prevTotals.jamba.totalSize + parseFloat(doubleHeight),
        totalPrice: prevTotals.jamba.totalPrice + jamba8025Price,
      },
      horizontalSuperior: {
        totalSize: prevTotals.horizontalSuperior.totalSize + parseFloat(doubleHalfWidth),
        totalPrice: prevTotals.horizontalSuperior.totalPrice + horizontalSuperior8025Price,
      },
      horizontalInferior: {
        totalSize: prevTotals.horizontalInferior.totalSize + parseFloat(doubleHalfWidth),
        totalPrice: prevTotals.horizontalInferior.totalPrice + horizontalInferior8025Price,
      },
      traslape: {
        totalSize: prevTotals.traslape.totalSize + parseFloat(doubleHeight),
        totalPrice: prevTotals.traslape.totalPrice + traslape8025Price,
      },
      enganche: {
        totalSize: prevTotals.enganche.totalSize + parseFloat(doubleHeight),
        totalPrice: prevTotals.enganche.totalPrice + enganche8025Price,
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
      kitCierre: accessories.kitCierre8025
        ? {
          cantidad: prevTotals.kitCierre.cantidad + 1,
          totalPrice: prevTotals.kitCierre.totalPrice + kitCierre8025Price,
        }
        : prevTotals.kitCierre,
      kitCierreConLlave: accessories.kitCierreConLlave8025
        ? {
          cantidad: prevTotals.kitCierreConLlave.cantidad + 1,
          totalPrice: prevTotals.kitCierreConLlave.totalPrice + kitCierreConLlave8025Price,
        }
        : prevTotals.kitCierreConLlave,
      rodamientoSimple: accessories.rodamientoSimple8025
        ? {
          cantidad: prevTotals.rodamientoSimple.cantidad + 2,
          totalPrice: prevTotals.rodamientoSimple.totalPrice + rodamientoSimple8025Price,
        }
        : prevTotals.rodamientoSimple,
      rodamientoDoble: accessories.rodamientoDoble8025
        ? {
          cantidad: prevTotals.rodamientoDoble.cantidad + 2,
          totalPrice: prevTotals.rodamientoDoble.totalPrice + rodamientoDoble8025Price,
        }
        : prevTotals.rodamientoDoble,

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
    cabezal8025Price +
    sillar8025Price +
    jamba8025Price +
    horizontalSuperior8025Price +
    horizontalInferior8025Price +
    traslape8025Price +
    enganche8025Price +
    kitCierre8025Price +
    kitCierreConLlave8025Price +
    rodamientoSimple8025Price +
    rodamientoDoble8025Price +
    felpaPrice +
    empaque744Price +
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
    doc.text('Detalle de la cotización Sistema 8025 XO-OX', 70, 34);

    addSection(doc, 'Marco', 45);
    addTableRow(doc, 50, 'Cabezal:', `${componentTotals.cabezal.totalSize} mm`, `${componentTotals.cabezal.totalPrice.toFixed(2)}`);
    addTableRow(doc, 55, 'Sillar:', `${componentTotals.sillar.totalSize} mm`, `${componentTotals.sillar.totalPrice.toFixed(2)}`);
    addTableRow(doc, 60, 'Jamba:', `${componentTotals.jamba.totalSize} mm`, `${componentTotals.jamba.totalPrice.toFixed(2)}`);

    addSection(doc, 'Nave', 70);
    addTableRow(doc, 75, 'Horizontal Superior:', `${componentTotals.horizontalSuperior.totalSize} mm`, `${componentTotals.horizontalSuperior.totalPrice.toFixed(2)}`);
    addTableRow(doc, 80, 'Horizontal Inferior:', `${componentTotals.horizontalInferior.totalSize} mm`, `${componentTotals.horizontalInferior.totalPrice.toFixed(2)}`);
    addTableRow(doc, 85, 'Traslape:', `${componentTotals.traslape.totalSize} mm`, `${componentTotals.traslape.totalPrice.toFixed(2)}`);
    addTableRow(doc, 90, 'Enganche:', `${componentTotals.enganche.totalSize} mm`, `${componentTotals.enganche.totalPrice.toFixed(2)}`);

    addSection(doc, 'Accesorios', 100);
    addTableRow(doc, 105, 'Kit de Cierre:', `${accessoryTotals.kitCierre.cantidad}`, `${accessoryTotals.kitCierre.totalPrice.toFixed(2)}`);
    addTableRow(doc, 110, 'Rodamiento Simple en Agujas:', `${accessoryTotals.rodamientoSimple.cantidad}`, `${accessoryTotals.rodamientoSimple.totalPrice.toFixed(2)}`);

    addSection(doc, 'Empaque', 120);
    addTableRow(doc, 125, 'Empaque (Alto):', `${componentTotals.empaque.totalSize} mm`, '');
    addTableRow(doc, 130, 'Empaque (Ancho):', `${componentTotals.empaque.totalSize2} mm`, `${componentTotals.empaque.totalPrice.toFixed(2)}`);
    addTableRow(doc, 135, 'Felpa 5.00 x 7.00:', `${componentTotals.felpa.totalSize} mm`, `${componentTotals.felpa.totalPrice.toFixed(2)}`);

    addSection(doc, 'Utilitarios', 145);
    addTableRow(doc, 150, 'Tornillos:', `${componentTotals.tornillos.cantidad}`, `${componentTotals.tornillos.totalPrice.toFixed(2)}`);
    addTableRow(doc, 155, 'Silicona:', `${componentTotals.silicona.cantidad}`, `${componentTotals.silicona.totalPrice.toFixed(2)}`);

    addSection(doc, 'Extra', 165);
    addTableRow(doc, 170, 'Vidrio (alto):', `${componentTotals.glass.totalSize} mm`, ``);
    addTableRow(doc, 175, 'Vidrio (ancho):', `${componentTotals.glass.totalSize2} mm`, `${Number(componentTotals.glass.totalPrice).toFixed(2)}`);
    addTableRow(doc, 180, 'Mano de Obra:', ``, `${Number(componentTotals.manodeObra.totalPrice).toFixed(2)}`);


    doc.setFontSize(14);
    doc.setTextColor(cyanBlue);
    doc.text('Total', 170, 190);
    doc.setFontSize(16);
    doc.setTextColor('black');
    const formattedTotal = totalSum.toLocaleString('en-US', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    doc.text(formattedTotal, 150, 195);

    doc.setFontSize(14);
    doc.setTextColor(cyanBlue);
    doc.text('Cantidad', 20, 190);
    doc.text(`${puertas.length}`, 20, 195);

    doc.save('Cotizacion-Sistema8025.pdf');
  };


  const getPriceDisplay = () => {
    if (accessories.kitCierre8025) {
      return `$${accessoryPrices.kitCierre8025.toFixed(2)}`;
    } else if (accessories.kitCierreConLlave8025) {
      return `$${accessoryPrices.kitCierreConLlave8025.toFixed(2)}`;
    }
    return ''; // Si no hay ninguna opción seleccionada, no mostrar precio
  };

  const getRodamientoPrice = () => {
    if (accessories.rodamientoSimple8025) {
      return `$${rodamientoSimple8025Price.toFixed(2)}`; // Mostrar precio si 'rodamientoSimple8025' está seleccionado
    } else if (accessories.rodamientoDoble8025) {
      return `$${rodamientoDoble8025Price.toFixed(2)}`; // Mostrar precio si 'rodamientoDoble8025' está seleccionado
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
            <img src={sistema8025img} alt="Puerta Corrediza Colosal" className="door-image" />
    
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
        <strong><h1>SISTEMA 8025 XO-OX</h1></strong>
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
              <TableCell>${cabezal8025Price.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell><strong>Sillar:</strong></TableCell>
              <TableCell>{totalWidth} mm</TableCell>
              <TableCell>${sillar8025Price.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell><strong>Jamba:</strong></TableCell>
              <TableCell>{doubleHeight} mm (2)</TableCell>
              <TableCell>${jamba8025Price.toFixed(2)}</TableCell>
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
              <TableCell>${horizontalSuperior8025Price.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell><strong>Horizontal Inferior:</strong></TableCell>
              <TableCell>{doubleHalfWidth} mm (2)</TableCell>
              <TableCell>${horizontalInferior8025Price.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell><strong>Traslape:</strong> </TableCell>
              <TableCell>{doubleHeight} mm (2) </TableCell>
              <TableCell>${traslape8025Price.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow key="5">
              <TableCell><strong>Enganche:</strong> </TableCell>
              <TableCell>{doubleHeight} mm (2) </TableCell>
              <TableCell>${enganche8025Price.toFixed(2)}</TableCell>
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
                name="kitCierre8025"
                value="Kit de Cierre"
                checked={accessories.kitCierre8025}
                onChange={handleChange}
              />
                Kit de Cierre
                <br />
                <input
                  type="radio"
                  name="kitCierreConLlave8025"
                  value="Kit de Cierre con Llave"
                  checked={accessories.kitCierreConLlave8025}
                  onChange={handleChange}
                />
                Kit de Cierre con Llave
              </TableCell>
              <TableCell>$ {getPriceDisplay()}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell><input
                type="radio"
                name="rodamientoSimple8025"
                checked={accessories.rodamientoSimple8025}
                onChange={handleChange}
              />
                Rodamiento Simple en Agujas (2)
                <br />
                <input
                  type="radio"
                  name="rodamientoDoble8025"
                  checked={accessories.rodamientoDoble8025}
                  onChange={handleChange}
                />
                Rodamiento Doble (2)
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

export default Sistema8025;
