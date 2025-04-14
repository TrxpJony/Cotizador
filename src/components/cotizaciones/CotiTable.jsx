import { motion } from "framer-motion";
import { Trash2, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import PropTypes from "prop-types";

const baseUrl = import.meta.env.VITE_API_URL + "/api/cotizaciones";// Cambia la URL base

const CotiTable = ({ searchTerm }) => {
	const [cotizaciones, setCotizaciones] = useState([]);
	const [filteredCotizaciones, setFilteredCotizaciones] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	useEffect(() => {
		// Filtrar productos cuando cambia el search o los productos
		const filtered = cotizaciones.filter(
			(cotizaciones) =>
				cotizaciones.client_name.toLowerCase().includes(searchTerm) ||
				cotizaciones.nombre_usuario.toLowerCase().includes(searchTerm) ||
				cotizaciones.cotNumber.toLowerCase().includes(searchTerm)
		);
		setFilteredCotizaciones(filtered);
		setCurrentPage(1); // Resetear a la primera página al buscar
	}, [searchTerm, cotizaciones])

	useEffect(() => {
		fetch(baseUrl)
			.then((response) => response.json())
			.then((data) => {
				if (data && Array.isArray(data)) {
					// Ordenar por created_at (suponiendo que es una fecha válida)
					const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
					setCotizaciones(sortedData);
					setFilteredCotizaciones(sortedData);
				} else {
					console.error("La respuesta de la API no es un array válido.");
				}
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}, []);


	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const handleDeleteClick = (id) => {
		Swal.fire({
			title: '¿Estás seguro?',
			text: "¡No podrás revertir esto!",
			showCancelButton: true,
			confirmButtonColor: '#06B6D4',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sí, eliminarlo!',
			cancelButtonText: 'Cancelar'
		}).then((result) => {
			if (result.isConfirmed) {
				// Hacer la solicitud DELETE a la API
				fetch(`${baseUrl}/${id}`, {
					method: 'DELETE',
				})
					.then((response) => {
						if (!response.ok) {
							throw new Error('Network response was not ok');
						}
						return response.json();
					})
					.then((data) => {
						toast(data.message, {
							position: "bottom-center",
							autoClose: 3000,
							hideProgressBar: true,
							closeOnClick: false,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
							theme: "light",
						});

						// Actualizar el estado sin recargar la página
						const updatedCotizaciones = cotizaciones.filter((cotizacion) => cotizacion.id !== id);
						setCotizaciones(updatedCotizaciones);
						setFilteredCotizaciones(updatedCotizaciones);
					})
					.catch((error) => {
						console.error("Error al eliminar la cotización:", error);
						alert("Hubo un problema al eliminar la cotización.");
					});
			}
		});
	};

	const handleDownloadClick = (pdfPath) => {
		const link = document.createElement('a');
		link.href = pdfPath;
		link.download = pdfPath.split('/').pop();
		link.click();
	};

	const paginatedCotizaciones = filteredCotizaciones.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	return (
		<>
			<ToastContainer />
			<motion.div
				className='bg-white backdrop-blur-md shadow-lg rounded-xl p-6 border mb-8 mt-5'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
			>
				<div className='flex justify-between items-center mb-6'>
					<h2 className='text-sm sm:text-base md:text-xl font-semibold text-gray-700'>Lista de Cotizaciones</h2>
				</div>

				<div className='overflow-x-auto'>
					<table className='min-w-full divide-y divide-gray-900'>
						<thead>
							<tr>
								<th className='px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider'>
									Cotización #
								</th>
								<th className='px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider'>
									Cliente
								</th>
								<th className='px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider'>
									Email
								</th>
								<th className='px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider'>
									Usuario
								</th>
								<th className='px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider'>
									Fecha
								</th>
								<th className='px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider'>
									Precio
								</th>
								<th className='px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider'>
									Actions
								</th>
							</tr>
						</thead>

						<tbody className='divide-y divide-gray-900'>
							{paginatedCotizaciones.map((cotizacion) => (
								<motion.tr
									key={cotizacion.id}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.3 }}
								>
									<td className='px-6 py-4 text-xs sm:text-sm font-medium text-gray-600'>
										{cotizacion.cotNumber}
									</td>
									<td className='px-6 py-4 text-xs sm:text-sm text-gray-700'>
										{cotizacion.client_name}
									</td>
									<td className='px-6 py-4 text-xs sm:text-sm text-gray-700'>
										{cotizacion.email}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-700'>
										{cotizacion.nombre_usuario}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-700'>
										{new Date(cotizacion.created_at).toLocaleDateString()}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-700'>
										{cotizacion.total_precio !== undefined && !isNaN(cotizacion.total_precio)
											? `$${Number(cotizacion.total_precio).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
											: "N/A"}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
										<button
											className='text-cyan-500 hover:text-cyan-400 mr-2'
											onClick={() => handleDownloadClick(cotizacion.pdf_path)}
										>
											<Download size={18} />
										</button>
										<button
											className='text-red-400 hover:text-red-300'
											onClick={() => handleDeleteClick(cotizacion.id)}
										>
											<Trash2 size={18} />
										</button>
									</td>
								</motion.tr>
							))}
						</tbody>
					</table>
				</div>
				<div className='text-xs sm:text-sm md:text-base flex justify-between items-center mt-4'>
					<motion.button
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}
						className=' flex rounded-2xl text-gray-700 hover:text-cyan-500 font-bold py-2 px-0 sm:px-10 transition-all '
					>
						<IoIosArrowBack className="mt-1" /> Anterior
					</motion.button>
					<span className='text-gray-700'>
						Page {currentPage} of {Math.ceil(filteredCotizaciones.length / itemsPerPage)}
					</span>
					<motion.button
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === Math.ceil(filteredCotizaciones.length / itemsPerPage)}
						className=' flex rounded-2xl text-gray-700 hover:text-cyan-500 font-bold py-2 px-0 sm:px-10 transition-all'
					>
						Siguiente <IoIosArrowForward className="mt-1" />
					</motion.button>
				</div>
			</motion.div>
		</>
	);
};
// Validacion de las props
CotiTable.propTypes = {
	searchTerm: PropTypes.string.isRequired,
};
export default CotiTable;
