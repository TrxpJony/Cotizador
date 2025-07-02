import { motion } from "framer-motion";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import PropTypes from "prop-types";

const baseUrl = import.meta.env.VITE_API_URL + "/api/precios";

const PricesTable = ({ searchTerm }) => {
	const [prices, setPrices] = useState([]);
	const [filteredPrices, setFilteredPrices] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;
	const [editedPrice, setEditedPrice] = useState({
		id: '',
		nombre: '',
		descripcion: '',
		precio: ''
	});
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		// Filtrar prices cuando cambia el searchTerm o los productos
		const filtered = prices.filter(
			(prices) =>
				prices.nombre.toLowerCase().includes(searchTerm) ||
				prices.descripcion.toLowerCase().includes(searchTerm)
		);
		setFilteredPrices(filtered);
		setCurrentPage(1); // Resetear a la primera página al buscar
	}, [searchTerm, prices]);

	useEffect(() => {
		fetch(baseUrl)
			.then((response) => response.json())
			.then((data) => {
				if (data && Array.isArray(data)) {
					setPrices(data);
					setFilteredPrices(data);
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

	const handleEditClick = (price) => {
		setEditedPrice(price);
		setIsModalOpen(true);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setEditedPrice((prevPrice) => ({
			...prevPrice,
			[name]: value
		}));
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	const handleSaveChanges = () => {
		const { descripcion, precio, id } = editedPrice;

		if (!descripcion || !precio || !id) {
			toast.warn('Todos los campos son requeridos.');
			return;
		}

		fetch(`${baseUrl}/${editedPrice.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				descripcion: editedPrice.descripcion,
				precio: editedPrice.precio,
			}),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Error al actualizar el precio.');
				}
				return response.json();
			})
			.then(() => {
				toast.success('Precio actualizado correctamente!');

				const updatedPrices = prices.map((price) =>
					price.id === editedPrice.id ? editedPrice : price
				);
				setPrices(updatedPrices);
				setFilteredPrices(updatedPrices);
				setIsModalOpen(false);
			})
			.catch((error) => {
				console.error('Error:', error);
				toast.error('Hubo un problema al actualizar el precio.');
			});
	};

	const paginatedPrices = filteredPrices.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	return (
		<>
			<motion.div
				className='bg-white backdrop-blur-md shadow-lg rounded-xl p-6 border mb-8 mt-5'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
			>
				<div className='flex justify-between items-center mb-6'>
					<h2 className='text-sm sm:text-base md:text-xl font-semibold text-gray-700'>Lista de precios</h2>
				</div>
				<div className='overflow-x-auto'>
					<table className='min-w-full divide-y divide-gray-900'>
						<thead>
							<tr>
								<th className='px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider'>
									Nombre
								</th>
								<th className='px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider'>
									Descripción
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
							{paginatedPrices.map((price) => (
								<motion.tr
									key={price.id}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.3 }}
								>
									<td className='px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-600'>
										{price.nombre}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-700'>
										{price.descripcion}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-700'>
										${price.precio ? parseFloat(price.precio).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-700'>
										<button
											className='text-cyan-500 hover:text-cyan-400 mr-2'
											onClick={() => handleEditClick(price)}
										>
											<Edit size={18} />
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
						className=' flex rounded-2xl text-gray-700 hover:text-cyan-500 font-bold py-2 px-0 sm:px-10 transition-all'
					>
						<IoIosArrowBack className="mt-1" /> Anterior
					</motion.button>
					<span className='text-gray-700'>
						Page {currentPage} of {Math.ceil(filteredPrices.length / itemsPerPage)}
					</span>
					<motion.button
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === Math.ceil(filteredPrices.length / itemsPerPage)}
						className='flex rounded-2xl text-gray-700 hover:text-cyan-500 font-bold py-2 px-0 sm:px-10 transition-all'
					>
						Siguiente <IoIosArrowForward className="mt-1" />
					</motion.button>
				</div>
			</motion.div>

			{isModalOpen && (
				<motion.div
					className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<motion.div
						className='bg-white p-6 rounded-2xl shadow-lg w-full max-w-4xl mx-auto max-h-[90vh] overflow-y-auto mt-16'
						initial={{ scale: 0.8 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0.8 }}
					>
						<h2 className='text-xl font-semibold mb-4'>Editar Precio</h2>
						<div className='mb-4'>
							<label className='block text-gray-700 font-bold mb-2'>Descripción</label>
							<textarea
								name='descripcion'
								value={editedPrice.descripcion}
								onChange={handleInputChange}
								className='py-2 px-3 text-gray-700 leading-700 leading-tight focus:outline-none focus:shadow-outline w-full p-2 border rounded-2xl h-32 hover:bg-default-200'
							/>
						</div>
						<div className='mb-4'>
							<label className='block text-gray-700 font-bold mb-2'>Precio</label>
							<input
								type='number'
								name='precio'
								value={editedPrice.precio}
								onChange={handleInputChange}
								className='border rounded-2xl w-full py-2 px-3 text-gray-700 font-semibold mb-2 hover:bg-default-200 focus:outline-none'
							/>
						</div>
						<div className='flex justify-between'>
							<button
								onClick={handleModalClose}
								className='flex rounde-2xl text-gray-400 hover:text-black font-bold py-2 px-6 transition-all'
							>
								Cancelar
							</button>
							<button
								onClick={handleSaveChanges}
								className='flex border border-cyan-500 text-cyan-500 py-2 px-10 rounded-2xl hover:bg-cyan-500 hover:text-white transition-all '
							>
								Guardar
							</button>
						</div>
					</motion.div>
				</motion.div>
			)}
		</>
	);
};
PricesTable.propTypes = {
	searchTerm: PropTypes.string.isRequired, // searchTerm debe ser una cadena y es obligatorio
}

export default PricesTable;
