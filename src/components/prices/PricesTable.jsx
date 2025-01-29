import { motion } from "framer-motion";
import { Search, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';

const baseUrl = 'http://localhost:3002/api/precios';

const PricesTable = () => {
	const [prices, setPrices] = useState([]);
	const [filteredPrices, setFilteredPrices] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
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

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = prices.filter(
			(price) => price.nombre.toLowerCase().includes(term) || price.descripcion.toLowerCase().includes(term)
		);
		setFilteredPrices(filtered);
		setCurrentPage(1); // Reset to first page on search
	};

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
			alert("Todos los campos son requeridos.");
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
				toast('Precio actualizado correctamente!', {
					position: "bottom-center",
					autoClose: 3000,
					hideProgressBar: true,
					closeOnClick: false,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});

				const updatedPrices = prices.map((price) =>
					price.id === editedPrice.id ? editedPrice : price
				);
				setPrices(updatedPrices);
				setFilteredPrices(updatedPrices);
				setIsModalOpen(false);
			})
			.catch((error) => {
				console.error('Error:', error);
				alert('Hubo un problema al actualizar el precio.');
			});
	};

	const paginatedPrices = filteredPrices.slice(
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
					<h2 className='text-xl font-semibold text-gray-700'>Lista de precios</h2>
					<div className='relative'>
						<input
							type='text'
							placeholder='Buscar Precio...'
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
									Nombre
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
									Descripción
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
							{paginatedPrices.map((price) => (
								<motion.tr
									key={price.id}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.3 }}
								>
									<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600'>
										{price.nombre}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
										{price.descripcion}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
										${price.precio ? parseFloat(price.precio).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
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
				<div className='flex justify-between items-center mt-4'>
					<button
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}
						className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50'
					>
						Anterior
					</button>
					<span className='text-gray-700'>
						Page {currentPage} of {Math.ceil(filteredPrices.length / itemsPerPage)}
					</span>
					<button
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === Math.ceil(filteredPrices.length / itemsPerPage)}
						className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50'
					>
						Siguiente
					</button>
				</div>
			</motion.div>

			{isModalOpen && (
				<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
					<div className='bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-4xl'>
						<h2 className='text-xl font-semibold mb-4'>Editar Precio</h2>
						<div className='mb-4'>
							<label className='block text-gray-700'>Descripción</label>
							<textarea
								name='descripcion'
								value={editedPrice.descripcion}
								onChange={handleInputChange}
								className='w-full p-2 border rounded h-32'
							/>
						</div>
						<div className='mb-4'>
							<label className='block text-gray-700'>Precio</label>
							<input
								type='number'
								name='precio'
								value={editedPrice.precio}
								onChange={handleInputChange}
								className='w-full p-2 border rounded'
							/>
						</div>
						<div className='flex justify-end'>
							<button
								onClick={handleModalClose}
								className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2'
							>
								Cancelar
							</button>
							<button
								onClick={handleSaveChanges}
								className='px-4 py-2 bg-cyan-500 text-white rounded-md'
							>
								Guardar
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default PricesTable;
