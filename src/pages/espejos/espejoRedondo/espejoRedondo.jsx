import '../../../css/colosal.css'; // Archivo CSS para estilos
import s3890Image from '../../../img/espejo1.png'; // Importar la imagen
import { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf'; // Importamos jsPDF
import preciosData from '../../../api/db.json';
import logo from '../../../../src/img/logo.png'

const EspejoRedondo = () => {
  const navigate = useNavigate(); // Inicializar useNavigate
  const [dimensions, setDimensions] = useState({diame: '' });
  const [accessories, setAccessories] = useState({
    pulido: false,
    felpa: '',
  });


  const [manodeObraprices, setmanodeObraprices] = useState({
    manodeObraPrice: 0,
  });

  const [prices, setPrices] = useState({});
  const [espejos, setespejos] = useState([]); // Estado para almacenar las espejos agregadas


  useEffect(() => {
    setPrices(preciosData.precios);
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


  const handlemanodeObraChange = (e) => {
    const { name, value } = e.target;
    setmanodeObraprices((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { diame } = dimensions;

  const totalWidth = diame ? Number(diame) + 50 : '';
  const totalHeight = diame ? Number(diame) + 50 : '';

  const { manodeObraPrice } = manodeObraprices;

  // Calcular valores

  const area = totalWidth && totalHeight ? (totalWidth * totalHeight) / 1000000 : ''; // Convertir a m²
  // Calcular precios
  const espejoPrice = prices.espejoRedondo * area;
  const pulidoTotal = diame * 3.14;
  const pulidoTotalPrice = accessories.pulido ? pulidoTotal * (prices.pulido/1000)  : 0;


  const [componentTotals, setComponentTotals] = useState({
    espejo: { totalSize: 0, totalPrice: 0 },
    espejoTotal: { totalSize: 0, totalSize2: 0 },
    pulido: { totalSize: 0, totalPrice: 0 },
    manodeObra: { totalPrice: 0}
    // Puedes añadir más componentes aquí si es necesario.
  });


  const handleAddDoor = () => {
    const nuevaespejo = {
      dimensions: { ...dimensions },
      price: totalPrice,
    };

    // Actualizar totales del sillar
    setComponentTotals((prevTotals) => ({
      ...prevTotals,
      espejo: {
        totalSize: prevTotals.espejo.totalSize + parseFloat(diame), // Sumar tamaño
        totalPrice: prevTotals.espejo.totalPrice + espejoPrice, // Sumar precio
      },
      espejoTotal: {
        totalSize: prevTotals.espejoTotal.totalSize + parseFloat(totalWidth),
        totalSize2: prevTotals.espejoTotal.totalSize2 + parseFloat(totalHeight),
      },
      pulido: {
        totalSize: prevTotals.pulido.totalSize + pulidoTotal,
        totalPrice: prevTotals.pulido.totalPrice + pulidoTotalPrice,
      },
      manodeObra: {
        totalPrice: prevTotals.manodeObra.totalPrice + parseFloat(manodeObraPrice),
      },
    }));
    setespejos((prev) => [...prev, nuevaespejo]);
    setDimensions({ width: '', diame: '' }); // Reiniciar dimensiones
    setAccessories({ kitCierrecol: false, kitCierreConLlavecol: false }); // Reiniciar accesorios
    setmanodeObraprices({ manodeObraPrice: 0 }); // Reiniciar precio de mano de obra
  };

  const totalSum = espejos.reduce((acc, espejo) => acc + espejo.price, 0);

  const totalPrice =
    espejoPrice+
    pulidoTotalPrice+
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
    doc.text('Detalle de la cotización espejo Redondo', 70, 34);

    addSection(doc, 'Espejo', 45);
    addTableRow(doc, 50, 'Espejo Redondo:', `${componentTotals.espejo.totalSize} mm`, `${componentTotals.espejo.totalPrice.toFixed(2)}`);
    addTableRow(doc, 55, 'Espejo Alto', `${componentTotals.espejoTotal.totalSize} mm`, ``);
    addTableRow(doc, 60, 'Espejo Ancho', `${componentTotals.espejoTotal.totalSize2} mm`, ``);

    addSection(doc, 'Extra', 70);
    addTableRow(doc, 75, 'Pulido:', `${componentTotals.pulido.totalSize} mm`, `${componentTotals.pulido.totalPrice.toFixed(2)}`);
    addTableRow(doc, 80, 'Mano de Obra:', ``, `${Number(componentTotals.manodeObra.totalPrice).toFixed(2)}`);


    doc.setFontSize(14);
    doc.setTextColor(cyanBlue);
    doc.text('Total', 170, 90);
    doc.setFontSize(16);
    doc.setTextColor('black');
    const formattedTotal = totalSum.toLocaleString('en-US', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    doc.text(formattedTotal, 150, 95);

    doc.setFontSize(14);
    doc.setTextColor(cyanBlue);
    doc.text('Cantidad de espejos', 20, 90);
    doc.text(`${espejos.length}`, 20, 95);

    doc.save('Cotizacion-EspejoRedondo.pdf');
  };

  return (
    <div className="door-container">
      <div className="door-frame">
        {/* Formulario para el Diametro y ancho */}
        <div className="dimensions-form">
          <label>
            Diametro (mm):
            <input
              type="number"
              name="diame"
              value={diame}
              onChange={handleChange}
              placeholder="00"
            />
          </label>
        </div>

        {/* Imagen */}
        <img src={s3890Image} alt="espejo Corrediza Colosal" className="door-image" />

        {/* Dimensiones dinámicas */}
        <div className="dimensions-display">
          {diame ? (
            <>
              <p>Dimensiones totales: {diame} </p>
              <p>Área: {area} m²</p>
            </>
          ) : (
            <p>Ingrese las dimensiones de la espejo en milímetros.</p>
          )}
          <br />
        </div>

        <div className="container mx-auto p-4">

          {/* Resumen de espejos */}
          <div className="doors-summary bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Resumen de espejos</h2>
            <ul className="list-disc pl-5 mb-4">
              {espejos.map((espejo, index) => (
                <li key={index} className="mb-2 text-gray-600">
                  <strong>espejo {index + 1}</strong>: {espejo.dimensions.diame} mm
                  <span className="text-cyan-600 font-semibold"> ${espejo.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="text-gray-700">
              <p>
                <strong>Total espejos:</strong> {espejos.length}
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
            {/* Botón Agregar espejo */}
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
        <strong><h1>ESPEJO REDONDO</h1></strong>
        <Table aria-label="TABLA ESPEJO">
          <TableHeader>
            <TableColumn><h1>Espejo</h1></TableColumn>
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
              <TableCell><strong>Espejo Redondo:</strong></TableCell>
              <TableCell> {diame} mm</TableCell>
              <TableCell>${espejoPrice.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell><strong>Espejo Alto:</strong></TableCell>
              <TableCell>{totalWidth} mm</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell><strong>Espejo Ancho:</strong></TableCell>
              <TableCell>{totalHeight} mm</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow key="5">
              <TableCell><strong>Pulido</strong></TableCell>
              <TableCell>{pulidoTotal} mm</TableCell>
              <TableCell>${pulidoTotalPrice.toFixed(2)}</TableCell>
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
              <TableCell>
                <input
                  type="checkbox"
                  name="pulido"
                  checked={accessories.pulido}
                  onChange={handleChange}
                />
                pulido
              </TableCell>
              <TableCell>$ {pulidoTotalPrice.toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <br />


        <Table aria-label="Tabla Vidrio">
          <TableHeader>
            <TableColumn><h1>Mano de Obra</h1></TableColumn>
            <TableColumn></TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell><strong><h2>Mano de Obra</h2></strong></TableCell>
              <TableCell><strong><h2>Precio</h2></strong></TableCell>
            </TableRow>
            <TableRow key="2">
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
            Agregar espejo
          </button>
          <h2 className="text-right text-4xl font-bold">${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
        </div>

      </div>
    </div>

  );
};

export default EspejoRedondo;
