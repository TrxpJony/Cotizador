import '../../../css/colosal.css'; // Archivo CSS para estilos
import s3890Image from '../../../img/sistema3890.png'; // Importar la imagen
import { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf'; // Importamos jsPDF
import preciosData from '../../../api/db.json';
import logo from '../../../../src/img/logo.png'

const Sistema3890 = () => {
  const navigate = useNavigate(); // Inicializar useNavigate
  const [dimensions, setDimensions] = useState({ width: '', height: '' });
  const [accessories, setAccessories] = useState({
    kitCierre3890: false,
    kitCierreConLlave3890: false,
    enchape: false,
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
      if (name === 'kitCierre3890' || name === 'kitCierreConLlave3890') {
        setAccessories((prev) => ({
          ...prev,
          kitCierre3890: name === 'kitCierre3890' ? checked : false,
          kitCierreConLlave3890: name === 'kitCierreConLlave3890' ? checked : false,
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
  const totalHeight = height ? height : '';
  const totalWidth = width ? width : '';

  const { glassPrice } = glassDimensions;

  // Calcular valores
  const doubleHeight = totalHeight ? totalHeight * 2 : '';
  const doubleWidth = totalWidth ? totalWidth * 2 : '';
  const aln1101s3890 = doubleHeight && doubleWidth ? (doubleHeight + doubleWidth): '';
  const area = width && height ? (width * height) / 1000000 : ''; // Convertir a m²
  const empaque3890Height = height && width ? height * 4 : '';
  const empaque3890Width = height && width ? width * 2 : '';
  const felpaHeight = height && width ? height * 6 : '';
  const felpaWidth = height && width ? width * 2 : '';
  const empaque3890Price = (empaque3890Height + empaque3890Width) / 1000 * prices.empaque3890; // Precio total del empaque
  const totFelpa = (felpaHeight + felpaWidth);
  // Calcular precios
  const aln1101s3890Price = prices.aln1101s3890 * (aln1101s3890 / 1000);
  const aln1102s3890Price = prices.aln1102s3890 * (totalWidth / 1000);

  const kitCierre3890Price = accessories.kitCierre3890 ? accessoryPrices.kitCierre3890 : 0;
  const kitCierreConLlave3890Price = accessories.kitCierreConLlave3890 ? accessoryPrices.kitCierreConLlave3890 : 0;
  const felpaPrice = (felpaHeight + felpaWidth) / 1000 * prices.felpacol; // Precio total de la felpa
  const manodeObraPrice = prices.manodeObra * area;

  const tornillosPrice = utilitaryPrices.tornillos * 44;
  const siliconaPrice = utilitaryPrices.silicona * 1;

  const enchapeWidth = 90;

  const enchapePieces = Math.floor(totalWidth / enchapeWidth);
  const enchapeTotalPrice = accessories.enchape ? enchapePieces * prices.enchape3890 : 0;

  const [componentTotals, setComponentTotals] = useState({
    aln1101: { totalSize: 0, totalPrice: 0 },
    aln1102: { totalSize: 0, totalPrice: 0 },
    enchape: { totalSize: 0, totalPrice: 0 },
    empaque: { totalSize: 0, totalSize2: 0, totalPrice: 0 },
    felpa: { totalSize: 0, totalPrice: 0 },
    tornillos: { cantidad: 0, totalPrice: 0 },
    silicona: { cantidad: 0, totalPrice: 0 },
    // Puedes añadir más componentes aquí si es necesario.
  });

  const [accessoryTotals, setAccessoryTotals] = useState({
    kitCierre: { cantidad: 0, totalPrice: 0 },
    kitCierreConLlave: { cantidad: 0, totalPrice: 0 },
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
      aln1101: {
        totalSize: prevTotals.aln1101.totalSize + parseFloat(aln1101s3890), // Sumar tamaño
        totalPrice: prevTotals.aln1101.totalPrice + aln1101s3890Price, // Sumar precio
      },
      aln1102: {
        totalSize: prevTotals.aln1102.totalSize + parseFloat(totalWidth),
        totalPrice: prevTotals.aln1102.totalPrice + aln1102s3890Price,
      },
      enchape: {
        totalSize: prevTotals.enchape.totalSize + enchapePieces,
        totalPrice: prevTotals.enchape.totalPrice + enchapeTotalPrice,
      },
      empaque: {
        totalSize: prevTotals.empaque.totalSize + parseFloat(empaque3890Height),
        totalSize2: prevTotals.empaque.totalSize + parseFloat(empaque3890Width),
        totalPrice: prevTotals.empaque.totalPrice + empaque3890Price,
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
      kitCierre: accessories.kitCierre3890
        ? {
          cantidad: prevTotals.kitCierre.cantidad + 1,
          totalPrice: prevTotals.kitCierre.totalPrice + kitCierre3890Price,
        }
        : prevTotals.kitCierre,
      kitCierreConLlave: accessories.kitCierreConLlave3890
        ? {
          cantidad: prevTotals.kitCierreConLlave.cantidad + 1,
          totalPrice: prevTotals.kitCierreConLlave.totalPrice + kitCierreConLlave3890Price,
        }
        : prevTotals.kitCierreConLlave,


      // Añade lógica para otros accesorios si es necesario.
    }));


    setPuertas((prev) => [...prev, nuevaPuerta]);
    setDimensions({ width: '', height: '' }); // Reiniciar dimensiones
    setAccessories({ kitCierre3890: false, kitCierreConLlave3890: false, enchape: false }); // Reiniciar accesorios
  };

  const totalSum = puertas.reduce((acc, puerta) => acc + puerta.price, 0);
  const totalArea = puertas.reduce(
    (acc, puerta) =>
      acc + (puerta.dimensions.width * puerta.dimensions.height) / 1000000,
    0
  );

  const totalPrice =
    aln1101s3890Price +
    aln1102s3890Price +
    kitCierre3890Price +
    kitCierreConLlave3890Price +
    felpaPrice +
    empaque3890Price +
    tornillosPrice +
    siliconaPrice +
    enchapeTotalPrice + // Add enchape total price
    (glassPrice ? parseFloat(glassPrice) : 0); // Precio del vidrio

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
    doc.text('Detalle de la cotización Sistema 3890 X', 70, 34);

    addSection(doc, 'Marco', 45);
    addTableRow(doc, 50, 'ALN: 1101 Tubular:', `${componentTotals.aln1101.totalSize} mm`, `${componentTotals.aln1101.totalPrice.toFixed(2)}`);
    addTableRow(doc, 55, 'ALN: 1102 Tubular', `${componentTotals.aln1102.totalSize} mm`, `${componentTotals.aln1102.totalPrice.toFixed(2)}`);
    addTableRow(doc, 60, 'Enchape:', `${componentTotals.enchape.totalSize} Piezas `, `${componentTotals.enchape.totalPrice.toFixed(2)}`);

    addSection(doc, 'Accesorios', 70);
    addTableRow(doc, 75, 'Kit de Cierre:', `${accessoryTotals.kitCierre.cantidad}`, `${accessoryTotals.kitCierre.totalPrice.toFixed(2)}`);
    addTableRow(doc, 80, 'Kit de Cierre con Llave:', `${accessoryTotals.kitCierreConLlave.cantidad}`, `${accessoryTotals.kitCierreConLlave.totalPrice.toFixed(2)}`);

    addSection(doc, 'Empaque', 90);
    addTableRow(doc, 95, 'Empaque (Alto):', `${componentTotals.empaque.totalSize} mm`, '');
    addTableRow(doc, 100, 'Empaque (Ancho):', `${componentTotals.empaque.totalSize2} mm`, `${componentTotals.empaque.totalPrice.toFixed(2)}`);
    addTableRow(doc, 105, 'Felpa 5.00 x 7.00:', `${componentTotals.felpa.totalSize} mm`, `${componentTotals.felpa.totalPrice.toFixed(2)}`);

    addSection(doc, 'Utilitarios', 115);
    addTableRow(doc, 120, 'Tornillos:', `${componentTotals.tornillos.cantidad}`, `${componentTotals.tornillos.totalPrice.toFixed(2)}`);
    addTableRow(doc, 125, 'Silicona:', `${componentTotals.silicona.cantidad}`, `${componentTotals.silicona.totalPrice.toFixed(2)}`);

    doc.setFontSize(14);
    doc.setTextColor(cyanBlue);
    doc.text('Total', 170, 135);
    doc.setFontSize(16);
    doc.setTextColor('black');
    const formattedTotal = totalSum.toLocaleString('en-US', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    doc.text(formattedTotal, 150, 140);

    doc.setFontSize(14);
    doc.setTextColor(cyanBlue);
    doc.text('Cantidad de puertas', 20, 135);
    doc.text(`${puertas.length}`, 20, 140);

    doc.save('Cotizacion-Sistema3890.pdf');
  };

  const getPriceDisplay = () => {
    if (accessories.kitCierre3890) {
      return `$${accessoryPrices.kitCierre3890.toFixed(2)}`;
    } else if (accessories.kitCierreConLlave3890) {
      return `$${accessoryPrices.kitCierreConLlave3890.toFixed(2)}`;
    }
    return ''; // Si no hay ninguna opción seleccionada, no mostrar precio
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
        <img src={s3890Image} alt="Puerta Corrediza Colosal" className="door-image" />

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
        <strong><h1>SISTEMA 3890 X</h1></strong>
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
              <TableCell><strong>ALN: 1101 Tubular:</strong></TableCell>
              <TableCell>{aln1101s3890} mm</TableCell>
              <TableCell>${aln1101s3890Price.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell><strong>ALN: 1102 Tubular:</strong></TableCell>
              <TableCell>{totalWidth} mm</TableCell>
              <TableCell>${aln1102s3890Price.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell><strong>Enchape:</strong></TableCell>
              <TableCell>({enchapePieces} piezas)</TableCell>
              <TableCell>${enchapeTotalPrice.toFixed(2)}</TableCell>
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
                name="kitCierre3890"
                value="Kit de Cierre"
                checked={accessories.kitCierre3890}
                onChange={handleChange}
              />
                Kit de Cierre

                <br />
                <input
                  type="radio"
                  name="kitCierreConLlave3890"
                  value="Kit de Cierre con Llave"
                  checked={accessories.kitCierreConLlave3890}
                  onChange={handleChange}
                />
                Kit de Cierre con Llave
              </TableCell>
              <TableCell>$ {getPriceDisplay()}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>
                <input
                  type="checkbox"
                  name="enchape"
                  checked={accessories.enchape}
                  onChange={handleChange}
                />
                Enchape
              </TableCell>
              <TableCell>$ {enchapeTotalPrice.toFixed(2)}</TableCell>
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
              <TableCell>{empaque3890Height} mm
                <br /> {empaque3890Width} mm
              </TableCell>
              <TableCell>${empaque3890Price.toFixed(2)}</TableCell>
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

export default Sistema3890;
