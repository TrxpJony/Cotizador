import { motion } from "framer-motion";
import { Search, Trash2, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2'; // Importar SweetAlert2

const baseUrl = import.meta.env.VITE_API_URL + "/api/cotizaciones";// Cambia la URL base

const CotiTable = () => {
	const [cotizaciones, setCotizaciones] = useState([]);
	const [filteredCotizaciones, setFilteredCotizaciones] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

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

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = cotizaciones.filter(
			(cotizacion) =>
				cotizacion.client_name.toLowerCase().includes(term) ||
				cotizacion.nombre_usuario.toLowerCase().includes(term) ||
				cotizacion.cotNumber.toString().toLowerCase().includes(term) // Ensure cotNumber is a string and lowercase
		);
		setFilteredCotizaciones(filtered);
		setCurrentPage(1); // Reset to first page on search
	};

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
				className='bg-white backdrop-blur-md shadow-lg rounded-xl p-6 border  mb-8'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
			>
				<div className='flex justify-between items-center mb-6'>
					<h2 className='text-xl font-semibold text-gray-700'>Lista de Cotizaciones</h2>
					<div className='relative'>
						<input
							type='text'
							placeholder='Buscar Cotización...'
							className='bg-white text-gray-700 placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500'
							onChange={handleSearch}
							value={searchTerm}
						/>
						<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
					</div>
				</div>

				<div className='overflow-x-auto'>
					<table className='min-w-full divide-y divide-gray-900'>
						<thead>
							<tr>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
									Cotización #
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
									Cliente
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
									Email
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
									Usuario
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
									Fecha
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
									Precio
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
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
									<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600'>
										{cotizacion.cotNumber}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
										{cotizacion.client_name}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
										{cotizacion.email}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
										{cotizacion.nombre_usuario}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
										{new Date(cotizacion.created_at).toLocaleDateString()}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
										{cotizacion.total_precio.toFixed(2)}
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
				<div className='flex justify-between items-center mt-4'>
					<motion.button
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}
						className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50'
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
					>
						Anterior
					</motion.button>
					<span className='text-gray-700'>
						Page {currentPage} of {Math.ceil(filteredCotizaciones.length / itemsPerPage)}
					</span>
					<motion.button
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === Math.ceil(filteredCotizaciones.length / itemsPerPage)}
						className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50'
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
					>
						Siguiente
					</motion.button>
				</div>
			</motion.div>
		</>
	);
};
export default CotiTable;
