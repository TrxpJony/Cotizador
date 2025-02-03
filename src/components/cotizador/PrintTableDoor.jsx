import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import jsPDF from 'jspdf';
import logo from '../../../src/img/logo.png';
import 'jspdf-autotable';
import axios from 'axios'; // Import axios
import Cookies from 'universal-cookie'; // Import cookies
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify CSS
import { v4 as uuidv4 } from 'uuid'; // Import uuid

const PrintTableDoor = ({ doors, title, image }) => { // Remove totalPrice prop
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        client: ' ',
        project: '',
        contact: '',
        phone: '',
        address: '',
        email: '',
        abono: '' // Add abono to formData
    });
    const [cotNumber, setCotNumber] = useState('');
    const cookies = new Cookies();
    const usuarioId = cookies.get('id'); // Get user ID from cookies

    useEffect(() => {
        const generateUniqueCotNumber = () => {
            return 'COT-' + uuidv4(); // Use uuidv4 to generate unique cotNumber
        };
        setCotNumber(generateUniqueCotNumber());
    }, []);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePrint = async () => {
        const doc = new jsPDF();
        const cyanBlue = '#00b5e2';
        const lightGray = '#d3d3d3';
        const white = '#ffffff';
        const currentDate = new Date().toLocaleDateString();

        // Add header
        doc.addImage(logo, 'PNG', 20, 10, 40, 20);
        doc.setFontSize(14);
        doc.setTextColor(cyanBlue);
        doc.setFontSize(8);
        doc.setTextColor('black');
        doc.text(`COT. #: ${cotNumber}`, 75, 25);
        doc.text(`Fecha de creación: ${currentDate}`, 150, 25);
        doc.setFillColor(lightGray);
        doc.rect(20, 30, 170, 8, 'F');
        doc.setTextColor('white');
        doc.setFontSize(10);
        doc.text(`Detalle de la cotización: ${title}`, 70, 34); // Use title prop here

        // Add form data with lines
        doc.setTextColor('black');
        doc.setFontSize(8);
        const formDataFields = [
            { label: `CLIENTE: ${formData.cliente}`, x: 20, y: 50 },
            { label: `PROYECTO: ${formData.projecto}`, x: 120, y: 50 },
            { label: `CONTACTO: ${formData.contacto}`, x: 20, y: 57 },
            { label: `TELEFONO: ${formData.telefono}`, x: 120, y: 57 },
            { label: `DIRECCIÓN: ${formData.direccion}`, x: 20, y: 64 },
            { label: `CORREO: ${formData.email}`, x: 120, y: 64 }
        ];

        formDataFields.forEach(field => {
            doc.text(field.label, field.x, field.y - 2); // Adjust text position to be above the line
            doc.setLineWidth(0.1); // Set line width to be thin
            doc.line(field.x, field.y, field.x + 70, field.y); // Draw line below the text
        });

        // Add image
        if (image) {
            doc.setLineWidth(0.1); // Set line width to be thin
            doc.setDrawColor(0, 0, 0); // Set line color to black
            doc.rect(20, 70, 170, 65); // Draw rectangle with thin border
            doc.addImage(image, 'PNG', 25, 75, 160, 55); // Adjust image dimensions
        }

        const tableColumn = ["DESCRIPCIÓN", "CANTIDAD", "MEDIDAS (mm)", "SUBTOTAL", "TOTAL"];
        const tableRows = [];

        doors.forEach(door => {
            const doorData = [
                door.description,
                door.quantity,
                `${door.width} x ${door.height}`, // Combine width and height into one cell
                (door.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                (door.price * door.quantity).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            ];
            tableRows.push(doorData);
        });

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 140, // Adjust startY to account for increased rectangle height
            headStyles: { fillColor: lightGray },
            alternateRowStyles: { fillColor: white },
            styles: { lineColor: [0, 0, 0], lineWidth: 0.1 }
        });

        // Calculate total price from doors
        const totalPrice = doors.reduce((sum, door) => sum + (door.price * door.quantity), 0);

        // Add summary table
        const summaryTableColumn = ["Total", "Abono", "Saldo"];
        const abono = parseFloat(formData.abono || 0); // Get abono from form data
        const saldo = totalPrice - abono; // Calculate saldo
        const summaryTableRows = [
            [totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), abono.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), saldo.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })]
        ];

        doc.autoTable({
            head: [summaryTableColumn],
            body: summaryTableRows,
            startY: doc.previousAutoTable.finalY + 10, // Adjust startY to be below the previous table
            tableWidth: 'wrap', // Adjust table width to fit content
            // Position the table to the right
            headStyles: { fillColor: lightGray },
            alternateRowStyles: { fillColor: white },
            styles: { lineColor: [0, 0, 0], lineWidth: 0.1 }
        });

        // Add footer information
        doc.setFontSize(8);
        doc.setTextColor('black');
        doc.text('Ventas: Calle 71 A # 75 - 36', 20, 285);
        doc.text('Planta: Calle 71 A  # 76 - 08', 20, 290);
        doc.text('Tel: 4824039 Nit: 900.260.389-9', 75, 285);
        doc.text('Cel ventas: 3223065279 - 3204391328', 75, 290);
        doc.text('Nit: 900.260.389-9', 140, 287.5);
        
        const pdfBlob = doc.output('blob');
        const formDataToSend = new FormData();
        formDataToSend.append('pdf', pdfBlob, `${cotNumber}_${currentDate}.pdf`);
        formDataToSend.append('cotNumber', cotNumber);
        formDataToSend.append('client_name', formData.cliente);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('usuario_id', usuarioId); // Use user ID from cookies

        try {
            await axios.post('http://localhost:3002/api/cotizaciones', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('Cotización almacenada con éxito', {
                                position: "bottom-center",
                                autoClose: 3000,
                                hideProgressBar: true,
                                closeOnClick: false,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                            });

            // Send email with PDF
            const emailData = new FormData();
            emailData.append('pdf', pdfBlob, `${cotNumber}_${currentDate}.pdf`);
            emailData.append('email', formData.email);
            emailData.append('cotNumber', cotNumber);

            await axios.post('http://localhost:3002/api/send-email', emailData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('Correo de confirmación enviado', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
            console.error('Error al almacenar la cotización o enviar el correo:', error);
            toast.error('Error al almacenar la cotización o enviar el correo');
        }

        doc.save(`${cotNumber}_${currentDate}.pdf`);

        handleCloseModal();
    };

    return (
        <>
            <button onClick={handleOpenModal} className="px-4 py-2 bg-cyan-500 text-white rounded-md">
                Cotizar
            </button>

            {isModalOpen && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto'>
                    <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mx-4 my-8 mt-16 sm:mt-8'>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Datos para el PDF</h2>

                        {/* Form Fields - 2 columns */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {['cliente', 'projecto', 'contacto', 'telefono', 'direccion', 'email', 'abono'].map((field, index) => (
                                <div key={index} className='mb-5'>
                                    <label htmlFor={field} className='block text-gray-700 font-medium mb-2'>{field.toUpperCase()}</label>
                                    <input
                                        id={field}
                                        type='text'
                                        name={field}
                                        value={formData[field]}
                                        onChange={handleChange}
                                        className='w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500'
                                        placeholder={`Ingrese el ${field}`}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-4 mt-6">
                            <button
                                onClick={handleCloseModal}
                                className="px-6 py-3 bg-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handlePrint}
                                className="px-6 py-3 bg-cyan-500 text-white font-medium rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            >
                                Imprimir
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer /> {/* Add ToastContainer */}
        </>
    );
};

PrintTableDoor.propTypes = {
    doors: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired, // Change this line to expect a string
    image: PropTypes.string // Add image prop type
};

export default PrintTableDoor;
