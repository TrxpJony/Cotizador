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
import { CircularProgress } from '@heroui/react';

const PrintTableDoor = ({ doors, title, image }) => { // Remove totalPrice prop
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        cliente: '',   // Cambiado de 'client' a 'cliente'
        projecto: '',  // Asegurar consistencia en los nombres
        contacto: '',
        telefono: '',
        direccion: '',
        email: '',
        abono: ''
    });
    const [cotNumber, setCotNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Add loading state
    const cookies = new Cookies();
    const usuarioId = cookies.get('id'); // Get user ID from cookies

    useEffect(() => {
        const generateUniqueCotNumber = () => {
            return uuidv4(); // Use uuidv4 to generate unique cotNumber
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
        setIsLoading(true); // Set loading to true
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

        const tableColumn = ["DESCRIPCIÓN", "CANTIDAD", "MEDIDAS (mm)", "SUBTOTAL", "IVA", "TOTAL"];
        const tableRows = [];

        doors.forEach(door => {
            const iva = (door.price * 0.19) * door.quantity;
            const totalConIva = (door.price * door.quantity);
            const doorData = [
                door.description,
                door.quantity,
                `${door.width} x ${door.height}`,
                ((door.price * door.quantity) - iva).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                iva.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                totalConIva.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
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
        const summaryTableColumn = ["Total con IVA", "Abono", "Saldo"];
        const abono = parseFloat(formData.abono || 0);
        const saldo = totalPrice - abono;
        const summaryTableRows = [
            [
                totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                abono.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                saldo.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            ]
        ];

        doc.autoTable({
            head: [summaryTableColumn],
            body: summaryTableRows,
            startY: doc.previousAutoTable.finalY + 10,
            tableWidth: 'wrap',
            headStyles: { fillColor: lightGray },
            alternateRowStyles: { fillColor: white },
            styles: { lineColor: [0, 0, 0], lineWidth: 0.1 }
        });

        // Add footer information
        doc.setFontSize(8);
        doc.setTextColor('black');
        doc.text('Ventas: Calle 71 A # 75 - 36', 20, 285);
        doc.text('Planta: Calle 71 A # 76 - 08', 20, 290);
        doc.text('Tel: 4824039 Nit: 900.260.389-9', 75, 285);
        doc.text('Cel ventas: 3223065279 - 3204391328', 75, 290);
        doc.text('Nit: 900.260.389-9', 140, 287.5);

        const pdfBlob = doc.output('blob');
        const formDataToSend = new FormData();
        formDataToSend.append('pdf', pdfBlob, `${cotNumber}_${currentDate}.pdf`);
        formDataToSend.append('cotNumber', cotNumber);
        formDataToSend.append('client_name', formData.cliente);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('total_precio', totalPrice.toFixed(2)); // Add totalPrice to form data
        formDataToSend.append('usuario_id', usuarioId); // Use user ID from cookies

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/cotizaciones`, formDataToSend, {
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

            await axios.post(`${import.meta.env.VITE_API_URL}/api/send-email`, emailData, {
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
        setIsLoading(false); // Set loading to false
        handleCloseModal();
    };

    return (
        <>
            <button onClick={handleOpenModal} className="flex border border-cyan-500  text-cyan-500 py-2 px-10 rounded-2xl hover:bg-cyan-500 hover:text-white transition-all ">
                Cotizar
            </button>

            {isModalOpen && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto'>
                    <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mx-4 my-8 mt-16 sm:mt-8'>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Cotizacion</h2>
                        {isLoading ? (
                            <div className="flex justify-center items-center">
                                <CircularProgress aria-label="Loading..." color="default" />
                            </div>
                        ) : (
                            <>
                                {/* Form Fields - 2 columns */}
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
                                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[90%] sm:max-w-4xl max-h-[90vh] overflow-y-auto">
                                        <h2 className="text-xl font-semibold mb-4">Cotización</h2>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {['cliente', 'projecto', 'contacto', 'telefono', 'direccion', 'email', 'abono'].map((field, index) => (
                                                <div key={index} className="flex flex-col">
                                                    <label htmlFor={field} className="block text-gray-700">
                                                        {field}
                                                    </label>
                                                    <input
                                                        id={field}
                                                        type="text"
                                                        name={field}
                                                        value={formData[field]}
                                                        onChange={handleChange}
                                                        className="w-full p-2 border rounded h-10"
                                                        placeholder={`Ingrese el ${field}`}
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        {/* Botones */}
                                        <div className="flex flex-col sm:flex-row justify-end mt-6 gap-2">
                                            <button
                                                onClick={handleCloseModal}
                                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md w-full sm:w-auto"
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                onClick={handlePrint}
                                                className="px-4 py-2 bg-cyan-500 text-white rounded-md w-full sm:w-auto"
                                            >
                                                Cotizar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
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
