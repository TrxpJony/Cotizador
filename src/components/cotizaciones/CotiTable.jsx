import { motion } from "framer-motion";
import { Trash2, Download } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Flip, toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import PropTypes from "prop-types";

const baseUrl = import.meta.env.VITE_API_URL + "/api/cotizaciones";// Cambia la URL base

const CotiTable = ({ searchTerm }) => {
	const [cotizaciones, setCotizaciones] = useState([]);
	const [filteredCotizaciones, setFilteredCotizaciones] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;
	const prevSearchTerm = useRef(searchTerm);
	const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

	useEffect(() => {
		const filtered = cotizaciones.filter(
			(cotizacion) =>
				cotizacion.client_name.toLowerCase().includes(searchTerm) ||
				cotizacion.nombre_usuario.toLowerCase().includes(searchTerm) ||
				cotizacion.cotNumber.toLowerCase().includes(searchTerm)
		);
		setFilteredCotizaciones(filtered);

		// Solo resetea la página si cambió el searchTerm
		if (prevSearchTerm.current !== searchTerm) {
			setCurrentPage(1);
			prevSearchTerm.current = searchTerm;
		}
	}, [cotizaciones, searchTerm]);


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
						toast.success(data.message);

						// Actualizar el estado sin recargar la página
						const updatedCotizaciones = cotizaciones.filter((cotizacion) => cotizacion.id !== id);
						setCotizaciones(updatedCotizaciones);
						setFilteredCotizaciones(updatedCotizaciones);
					})
					.catch((error) => {
						console.error("Error al eliminar la cotización:", error);
						toast.error('Hubo un problema al eliminar la cotizacio')
					});
			}
		});
	};

	const handleDownloadClick = (pdfPath) => {
		// Si es de Cloudinary o externo, descarga normal
		if (!pdfPath.includes('/uploads/cotizaciones/')) {
			const link = document.createElement('a');
			link.href = pdfPath;
			link.download = pdfPath.split('/').pop();
			link.click();
			return;
		}

		// Si es local, usa el endpoint de descarga
		const filename = pdfPath.split('/').pop();
		const downloadUrl = `${import.meta.env.VITE_API_URL}/api/cotizaciones/download/${filename}`;
		const link = document.createElement('a');
		link.href = downloadUrl;
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const handleEstadoChange = (id, nuevoEstado) => {
		fetch(`${baseUrl}/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ estado: nuevoEstado }),
		})
			.then((res) => {
				if (!res.ok) throw new Error('Error actualizando el estado');
				return res.json();
			})
			.then(() => {
				toast.success('Estado actualizado correctamente');
				const actualizadas = cotizaciones.map(coti =>
					coti.id === id ? { ...coti, estado: nuevoEstado } : coti
				);
				setCotizaciones(actualizadas);
				setFilteredCotizaciones(actualizadas);
			})
			.catch((err) => {
				console.error(err);
				toast.error('Error al actualizar el estado');
			});
	};

	const handleSort = (key) => {
		let direction = 'asc';
		if (sortConfig.key === key && sortConfig.direction === 'asc') {
			direction = 'desc';
		}
		setSortConfig({ key, direction });
		setCurrentPage(1); // <-- Esto te regresa a la primera página
	};

	let sortedCotizaciones = [...filteredCotizaciones];

	if (sortConfig.key) {
		sortedCotizaciones.sort((a, b) => {
			if (sortConfig.key === 'created_at') {
				return sortConfig.direction === 'asc'
					? new Date(a.created_at) - new Date(b.created_at)
					: new Date(b.created_at) - new Date(a.created_at);
			}
			if (sortConfig.key === 'total_precio') {
				const aPrecio = Number(a.total_precio) || 0;
				const bPrecio = Number(b.total_precio) || 0;
				return sortConfig.direction === 'asc'
					? aPrecio - bPrecio
					: bPrecio - aPrecio;
			}
			// Comparar strings de forma segura (email, nombre_usuario, etc)
			const aValue = (a[sortConfig.key] || '').toString().toLowerCase();
			const bValue = (b[sortConfig.key] || '').toString().toLowerCase();
			if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
			if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
			return 0;
		});
	}

	const paginatedCotizaciones = sortedCotizaciones.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	return (
		<>
			<ToastContainer
				position="bottom-center"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
				transition={Flip}
			/>
			<motion.div
				className='bg-white backdrop-blur-md shadow-lg rounded-xl p-6 border mt-5 mb-8'
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
								<th
									className='px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider hover:text-gray-400 cursor-pointer'
									onClick={() => handleSort('cotNumber')}
								>
									Cotización {sortConfig.key === 'cotNumber' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
								</th>
								<th
									className='px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider hover:text-gray-400 cursor-pointer'
									onClick={() => handleSort('client_name')}
								>
									Cliente {sortConfig.key === 'client_name' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
								</th>
								<th
									className='px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider hover:text-gray-400 cursor-pointer'
									onClick={() => handleSort('email')}
								>
									Email {sortConfig.key === 'email' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
								</th>
								<th
									className='px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider hover:text-gray-400 cursor-pointer'
									onClick={() => handleSort('nombre_usuario')}
								>
									Cotizador {sortConfig.key === 'nombre_usuario' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
								</th>
								<th
									className='px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider hover:text-gray-400 cursor-pointer'
									onClick={() => handleSort('created_at')}
								>
									Fecha {sortConfig.key === 'created_at' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
								</th>
								<th
									className='px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider hover:text-gray-400 cursor-pointer'
									onClick={() => handleSort('total_precio')}
								>
									Precio {sortConfig.key === 'total_precio' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
								</th>
								<th
									className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider hover:text-gray-400 cursor-pointer"
									onClick={() => handleSort('estado')}
								>
									Estado {sortConfig.key === 'estado' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
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
									<td className='px-4 py-4 text-xs sm:text-sm text-gray-700'>
										{cotizacion.email}
									</td>
									<td className='px-6 py-4 text-xs sm:text-sm whitespace-nowrap text-gray-700'>
										{cotizacion.nombre_usuario}
									</td>
									<td className='px-6 py-4 text-xs sm:text-sm whitespace-nowrap text-gray-700'>
										{new Date(cotizacion.created_at).toLocaleDateString()}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
										{cotizacion.total_precio !== undefined && !isNaN(cotizacion.total_precio)
											? `$${Number(cotizacion.total_precio).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
											: "N/A"}
									</td>
									<td>
										<select
											value={cotizacion.estado}
											onChange={(e) => handleEstadoChange(cotizacion.id, e.target.value)}
											className={`px-2 py-1 rounded-full text-xs font-semibold text-white outline-none border-none ${cotizacion.estado === 'pendiente'
												? 'bg-yellow-500'
												: cotizacion.estado === 'facturada'
													? 'bg-green-600'
													: 'bg-red-600'
												}`}
										>
											<option value="facturada" className="bg-white text-black">Facturada</option>
											<option value="pendiente" className="bg-white text-black">Pendiente</option>
											<option value="cancelada" className="bg-white text-black">Cancelada</option>
										</select>

									</td>
									<td className='px-6 py-4 text-xs sm:text-sm whitespace-nowrap text-gray-700'>
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
						className='flex rounded-2xl text-gray-700 hover:text-cyan-500 font-bold py-2 px-0 sm:px-10 transition-all'
					>
						<IoIosArrowBack className="mt-1" /> Anterior
					</motion.button>
					<span className='text-gray-700'>
						Page {currentPage} of {Math.ceil(filteredCotizaciones.length / itemsPerPage)}
					</span>
					<motion.button
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === Math.ceil(filteredCotizaciones.length / itemsPerPage)}
						className='flex rounded-2xl text-gray-700 hover:text-cyan-500 font-bold py-2 px-0 sm:px-10 transition-all'
					>
						Siguiente <IoIosArrowForward className="mt-1" />
					</motion.button>
				</div>
			</motion.div>
		</>
	);
};
CotiTable.propTypes = {
	searchTerm: PropTypes.string.isRequired // SearchTerm debe ser una cadena y es obligatotio
};
export default CotiTable;
