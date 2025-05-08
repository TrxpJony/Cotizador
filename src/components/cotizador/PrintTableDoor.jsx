import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import jsPDF from 'jspdf';
import logo from '../../../src/img/logo.png';
import 'jspdf-autotable';
import axios from 'axios'; // Import axios
import Cookies from 'universal-cookie'; // Import cookies
import { Flip, ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify CSS
import { v4 as uuidv4 } from 'uuid'; // Import uuid
import { CircularProgress } from '@heroui/react';
import { MdCalendarMonth } from "react-icons/md"
import { Calendar } from "@heroui/react";
import { Download } from "lucide-react";

const PrintTableDoor = ({ doors, title, image }) => { // Remove totalPrice prop
    const [selectedDate, setSelectedDate] = useState('');
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        cliente: '',   // Cambiado de 'client' a 'cliente'
        telefono: '',
        email: '',
        entrega: '',  // Asegurar consistencia en los nombres
        abono: ''
    });
    const [cotNumber, setCotNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Add loading state
    const cookies = new Cookies();
    const usuarioId = cookies.get('id'); // Get user ID from cookies

    const formatSelectedDate = (dateObj) => {
        const jsDate = dateObj.toDate(); // convierte sin UTC
        jsDate.setHours(12); // ajusta la hora al mediodía para evitar el desfase de zona horaria
        return jsDate.toLocaleDateString();
    };

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

    // Función única para generar el PDF y decidir la acción
    const generateAndHandlePDF = async ({ saveOnly }) => {
        const doc = new jsPDF();
        const cyanBlue = '#00b5e2';
        const lightGray = '#d3d3d3';
        const white = '#ffffff';
        const now = new Date();
        const currentDate = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        doc.addImage(logo, 'PNG', 14, 10, 40, 20);
        doc.setFontSize(14);
        doc.setTextColor(cyanBlue);
        doc.setFontSize(8);
        doc.setTextColor('black');
        doc.text(`COT. #: ${cotNumber}`, 70, 25);
        doc.text(`Fecha de creación: ${currentDate}`, 145, 25);
        doc.setFillColor(lightGray);
        doc.rect(14, 30, 182, 8, 'F');
        doc.setTextColor('white');
        doc.setFontSize(10);
        doc.text(`Detalle de la cotización: ${title}`, 70, 34);

        doc.setTextColor('black');
        doc.setFontSize(11);
        const formDataFields = [
            { label: `CLIENTE: ${formData.cliente}`, x: 14, y: 45 },
            { label: `FECHA DE ENTREGA: ${selectedDate ? formatSelectedDate(selectedDate) : "Por confirmar"}`, x: 126, y: 45 },
            { label: `TELEFONO: ${formData.telefono}`, x: 14, y: 52 },
            { label: `CORREO: ${formData.email}`, x: 126, y: 52 },
        ];

        const boxWidth = 88;
        const boxHeight = 8;
        const startY = 40;

        formDataFields.forEach((field, index) => {
            const y = startY + Math.floor(index / 2) * (boxHeight + 2);
            const x = index % 2 === 0 ? 14 : 108;
            doc.setLineWidth(0.1);
            doc.setDrawColor(0);
            doc.line(x, y + boxHeight, x + boxWidth, y + boxHeight);
            doc.setFontSize(8);
            doc.setTextColor('gray');
            doc.text(field.label.split(':')[0], x + 2, y + 3);
            doc.setTextColor('black');
            doc.setFontSize(10);
            doc.text(field.label.split(':')[1]?.trim() || '', x + 2, y + 7);
        });

        if (image) {
            doc.setLineWidth(0.1);
            doc.setDrawColor(0, 0, 0);
            doc.addImage(image, 'PNG', 14, 66, 182, 80);
        }

        const tableColumn = ["DESCRIPCIÓN", "CANTIDAD", "ANCHO x ALTO", "SUBTOTAL", "IVA", "TOTAL"];
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
            startY: 153,
            headStyles: { fillColor: white, textColor: 'black' },
            alternateRowStyles: { fillColor: white },
            styles: { lineColor: [0, 0, 0], lineWidth: 0.1 }
        });

        const totalPrice = doors.reduce((sum, door) => sum + (door.price * door.quantity), 0);

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
            startY: doc.previousAutoTable.finalY + 7,
            tableWidth: 'wrap',
            headStyles: { fillColor: white, textColor: 'black' },
            alternateRowStyles: { fillColor: white },
            styles: { lineColor: [0, 0, 0], lineWidth: 0.1 }
        });

        doc.setFontSize(8);
        doc.setTextColor('black');
        doc.text('Ventas: Calle 71 A # 75 - 36', 14, 285);
        doc.text('Planta: Calle 71 A # 76 - 08', 14, 290);
        doc.text('Tel: 4824039 Nit: 900.260.389-9', 85, 285);
        doc.text('Cel ventas: 3223065279 - 3204391328', 85, 290);
        doc.text('Nit: 900.260.389-9', 172, 287.5);

        if (saveOnly) {
            doc.save(`${cotNumber}_${currentDate}.pdf`);
            return;
        }

        // ...enviar a backend y correo como antes...
        const pdfBlob = doc.output('blob');
        const formDataToSend = new FormData();
        formDataToSend.append('pdf', pdfBlob, `${cotNumber}_${currentDate}.pdf`);
        formDataToSend.append('cotNumber', cotNumber);
        formDataToSend.append('client_name', formData.cliente);
        formDataToSend.append('email', formData.email || ''); // Siempre envía el campo, aunque esté vacío
        formDataToSend.append('total_precio', totalPrice.toFixed(2));
        formDataToSend.append('usuario_id', usuarioId);
        formDataToSend.append('estado', selectedDate ? 'facturada' : 'pendiente');

        try {
            // Siempre almacena la cotización, aunque el email esté vacío o no sea válido
            await axios.post(`${import.meta.env.VITE_API_URL}/api/cotizaciones`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('Cotización almacenada con éxito');

            // Solo intenta enviar el correo si el email tiene formato válido y no está vacío
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (formData.email && emailRegex.test(formData.email)) {
                try {
                    const emailData = new FormData();
                    emailData.append('pdf', pdfBlob, `${cotNumber}_${currentDate}.pdf`);
                    emailData.append('email', formData.email);
                    emailData.append('cotNumber', cotNumber);

                    await axios.post(`${import.meta.env.VITE_API_URL}/api/send-email`, emailData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    toast.success('Correo de confirmación enviado');
                } catch (emailError) {
                    console.error('Error al enviar el correo:', emailError);
                    toast.error('Error al enviar el correo');
                }
            }
        } catch (error) {
            console.error('Error al almacenar la cotización:', error);
            toast.error('Error al almacenar la cotización');
        }

        doc.save(`${cotNumber}_${currentDate}.pdf`);
    };

    // Botón Cotizar
    const handlePrint = async () => {
        setIsLoading(true);
        await generateAndHandlePDF({ saveOnly: false });
        setIsLoading(false);
        handleCloseModal();
    };

    // Botón Descargar PDF
    const handleDownloadPDF = () => {
        generateAndHandlePDF({ saveOnly: true });
    };

    return (
        <>
            <button onClick={handleOpenModal} className="flex border border-cyan-500  text-cyan-500 py-2 px-10 rounded-2xl hover:bg-cyan-500 hover:text-white transition-all ">
                Cotizar
            </button>

            {isModalOpen && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto'>
                    <div className='bg-white p-6 rounded-2xl shadow-lg w-full max-w-4xl mx-4 my-8 mt-16 sm:mt-8 max-h-[90vh] overflow-y-auto'>
                        <h2 className="text-xl font-semibold mb-4">Cotizacion</h2>
                        {isLoading ? (
                            <div className="flex justify-center items-center">
                                <CircularProgress aria-label="Loading..." color="default" />
                            </div>
                        ) : (
                            <>
                                {/* Form Fields - 2 columns */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col">
                                        <label htmlFor="cliente" className="block text-gray-700 font-bold mb-2">Cliente</label>
                                        <input
                                            id="cliente"
                                            type="text"
                                            name="cliente"
                                            value={formData.cliente}
                                            onChange={handleChange}
                                            className="border rounded-2xl w-full py-2 px-3 text-gray-700 font-semibold mb-2 hover:bg-default-200 focus:outline-none"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="telefono" className="block text-gray-700 font-bold mb-2">Teléfono</label>
                                        <input
                                            id="telefono"
                                            type="text"
                                            name="telefono"
                                            value={formData.telefono}
                                            onChange={handleChange}
                                            className="border rounded-2xl w-full py-2 px-3 text-gray-700 font-semibold mb-2 hover:bg-default-200 focus:outline-none"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Correo</label>
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="border rounded-2xl w-full py-2 px-3 text-gray-700 font-semibold mb-2 hover:bg-default-200 focus:outline-none"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="entrega" className="block text-gray-700 font-bold mb-2">Fecha de entrega</label>
                                        <button
                                            className='border border-black py-2 px-2 rounded-2xl hover:bg-black hover:text-white transition-all w-full sm:W-auto flex items-center justify-center'
                                            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                                        >
                                            <MdCalendarMonth className='mr-2' />
                                            {selectedDate ? formatSelectedDate(selectedDate) : 'Seleccionar fecha'}
                                        </button>
                                        {isCalendarOpen && (
                                            <div>
                                                <Calendar
                                                    aria-label="Seleccionar fecha"
                                                    value={selectedDate}
                                                    onChange={(date) => {
                                                        setSelectedDate(date);
                                                        setIsCalendarOpen(false);
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col sm:col-span-2">
                                        <label htmlFor="abono" className="block text-gray-700 font-bold mb-2">Abono</label>
                                        <input
                                            id="abono"
                                            type="text"
                                            name="abono"
                                            value={formData.abono}
                                            onChange={handleChange}
                                            className="border rounded-2xl w-full py-2 px-3 text-gray-700 font-semibold mb-2 hover:bg-default-200 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Botones */}
                                <div className="flex flex-col sm:flex-row justify-end mt-6 gap-2">
                                    <button
                                        onClick={handleCloseModal}
                                        className="flex rounded-2xl text-gray-400 hover:text-black  font-bold py-2 px-6  transition-all"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={handlePrint}
                                        className="flex border border-cyan-500  text-cyan-500 py-2 px-10 rounded-2xl hover:bg-cyan-500 hover:text-white transition-all "
                                    >
                                        Cotizar
                                    </button>
                                    <button
                                        onClick={handleDownloadPDF}
                                        className="text-cyan-500 hover:text-cyan-400 mr-2"
                                    >
                                        <Download size={18} />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
            <ToastContainer
                position="bottom-center"
                autoclose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
                transition={Flip}
            />
        </>
    );
};

PrintTableDoor.propTypes = {
    doors: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired, // Change this line to expect a string
    image: PropTypes.string // Add image prop type
};

export default PrintTableDoor;
