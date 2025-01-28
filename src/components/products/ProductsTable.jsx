import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2'; // Importar SweetAlert2

const baseUrl = 'http://localhost:3002/api/detalleProductos';

const ProductsTable = () => {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;
	const [selectedImage, setSelectedImage] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editedProduct, setEditedProduct] = useState({
		id: '',
		title: '',
		description: '',
		precio: ''
	});

	useEffect(() => {
		fetch(baseUrl)
		  .then((response) => response.json())
		  .then((data) => {
			if (data && Array.isArray(data)) {
			  setProducts(data);
			  setFilteredProducts(data);
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
		const filtered = products.filter(
			(product) => product.title.toLowerCase().includes(term) || product.categoria.toLowerCase().includes(term)
		);
		setFilteredProducts(filtered);
		setCurrentPage(1); // Reset to first page on search
	};

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const handleImageClick = (img) => {
		setSelectedImage(img);
	};

	const closeModal = () => {
		setSelectedImage(null);
	};

	const handleEditClick = (product) => {
		setEditedProduct(product);
		setIsModalOpen(true);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setEditedProduct((prevProduct) => ({
			...prevProduct,
			[name]: value
		}));
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	const handleSaveChanges = () => {
		// Validar que los campos no estén vacíos
		const { title, description, precio, id } = editedProduct;
	
		if (!title || !description || !precio || !id) {
			alert("Todos los campos son requeridos.");
			return;
		}
	
		// Hacer la solicitud PUT a la API para actualizar el producto
		fetch(`${baseUrl}/${editedProduct.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: editedProduct.title,
				description: editedProduct.description,
				precio: editedProduct.precio,
				color: editedProduct.color,
				img: editedProduct.img,
				categoria: editedProduct.categoria,
			}),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Error al actualizar el producto.');
				}
				return response.json();
			})
			.then(() => {
				// Mostrar la alerta con react-toastify
				toast('Producto actualizado correctamente!', {
					position: "bottom-center",
					autoClose: 3000,
					hideProgressBar: true,
					closeOnClick: false,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
	
				// Actualizar el estado de los productos
				const updatedProducts = products.map((product) =>
					product.id === editedProduct.id ? editedProduct : product
				);
				setProducts(updatedProducts);
				setFilteredProducts(updatedProducts);
				setIsModalOpen(false);
	
			})
			.catch((error) => {
				console.error('Error:', error);
				alert('Hubo un problema al actualizar el producto.');
			});
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
					const updatedProducts = products.filter((product) => product.id !== id);
					setProducts(updatedProducts);
					setFilteredProducts(updatedProducts);
				})
				.catch((error) => {
					console.error("Error al eliminar el producto:", error);
					alert("Hubo un problema al eliminar el producto.");
				});
			}
		});
	};

	const paginatedProducts = filteredProducts.slice(
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
					<h2 className='text-xl font-semibold text-gray-700'>Lista de productos</h2>
					<div className='relative'>
						<input
							type='text'
							placeholder='Buscar Producto...'
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
									Title
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
									Precio
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
									Categoria
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
									Imagen
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
									Actions
								</th>

							</tr>
						</thead>

						<tbody className='divide-y divide-gray-900'>
								{paginatedProducts.map((product) => (
								<motion.tr
									key={product.id}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.3 }}
								>
									<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600'>
										{product.title}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
										${product.precio ? parseFloat(product.precio).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''}								</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
										{product.categoria}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
										<img
											src={product.img}
											alt={product.title}
											className='h-16 w-16 object-cover rounded-md cursor-pointer'
											onClick={() => handleImageClick(product.img)}
										/>
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
											<button
												className='text-cyan-500 hover:text-cyan-400 mr-2'
												onClick={() => handleEditClick(product)}
											>
												<Edit size={18} />
											</button>
											<button
												className='text-red-400 hover:text-red-300'
												onClick={() => handleDeleteClick(product.id)}
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
					<button
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}
						className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50'
					>
						Anterior
					</button>
					<span className='text-gray-700'>
						Page {currentPage} of {Math.ceil(filteredProducts.length / itemsPerPage)}
					</span>
					<button
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === Math.ceil(filteredProducts.length / itemsPerPage)}
						className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50'
					>
						Siguiente
					</button>
				</div>
			</motion.div>

			{selectedImage && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
					<div className='bg-white p-4 rounded-lg'>
						<img src={selectedImage} alt='Selected' className='max-h-96 max-w-full' />
						<button
							onClick={closeModal}
							className='mt-4 px-4 py-2 bg-red-500 text-white rounded-md'
						>
							Close
						</button>
					</div>
				</div>
			)}

			{isModalOpen && (
				<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
					<div className='bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-4xl'>
						<h2 className='text-xl font-semibold mb-4'>Editar Producto</h2>
						<div className='mb-4'>
							<label className='block text-gray-700'>Title</label>
							<input
								type='text'
								name='title'
								value={editedProduct.title}
								onChange={handleInputChange}
								className='w-full p-2 border rounded'
							/>
						</div>
						<div className='mb-4'>
							<label className='block text-gray-700'>Description</label>
							<textarea
								name='description'
								value={editedProduct.description}
								onChange={handleInputChange}
								className='w-full p-2 border rounded h-32'
							/>
						</div>
						<div className='mb-4'>
							<label className='block text-gray-700'>Color</label>
							<input
								type='text'
								name='color'
								value={editedProduct.color}
								onChange={handleInputChange}
								className='w-full p-2 border rounded'
							/>
						</div>
						<div className='mb-4'>
							<label className='block text-gray-700'>Precio</label>
							<input
								type='number'
								name='precio'
								value={editedProduct.precio}
								onChange={handleInputChange}
								className='w-full p-2 border rounded'
							/>
						</div>
						<div className='mb-4'>
							<label className='block text-gray-700'>Imagen</label>
							<input
								type='text'
								name='img'
								value={editedProduct.img}
								onChange={handleInputChange}
								className='w-full p-2 border rounded'
							/>
						</div>
						<div className='mb-4'>
							<label className='block text-gray-700'>Categoria</label>
							<input
								type='text'
								name='categoria'
								value={editedProduct.categoria}
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
export default ProductsTable;
