import { motion } from "framer-motion";
import { Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Flip, toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import PropTypes from 'prop-types'; // Importar PropTypes

const baseUrl = import.meta.env.VITE_API_URL + "/api/detalleProductos";

const ProductsTable = ({ searchTerm }) => {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
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
	const [categories, setCategories] = useState([]); // Nuevo estado para categorías
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [newProduct, setNewProduct] = useState({
		id: '',
		title: '',
		description: '',
		precio: '',
		color: '',
		categoria: '',
		img: null
	});


	useEffect(() => {
		// Filtrar productos cuando cambia el searchTerm o los productos
		const filtered = products.filter(
			(product) =>
				product.title.toLowerCase().includes(searchTerm) ||
				product.categoria.toLowerCase().includes(searchTerm) ||
				product.description.toLowerCase().includes(searchTerm)
		);
		setFilteredProducts(filtered);
		setCurrentPage(1); // Resetear a la primera página al buscar
	}, [searchTerm, products]);

	useEffect(() => {
		fetch(baseUrl)
			.then((response) => response.json())
			.then((data) => {
				if (data && Array.isArray(data)) {
					const sortedData = data.sort((a, b) => a.title.localeCompare(b.title));
					setProducts(sortedData);
					setFilteredProducts(sortedData);
				} else {
					console.error("La respuesta de la API no es un array válido.");
				}
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}, []);

	useEffect(() => {
		fetch(import.meta.env.VITE_API_URL + "/api/detalleProductos/categorias")
			.then((res) => res.json())
			.then((data) => setCategories(data))
			.catch((err) => console.error("Error al obtener categorías:", err));
	}, []);

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
		const { title, description, precio, color, categoria, img, id } = editedProduct;

		if (!title || !description || !precio || !color || !categoria || !id) {
			alert("Todos los campos son requeridos.");
			return;
		}

		const formData = new FormData();
		formData.append("title", title);
		formData.append("description", description);
		formData.append("precio", precio);
		formData.append("color", color);
		formData.append("categoria", categoria);
		if (img instanceof File) {
			formData.append("img", img); // Solo se añade si se seleccionó una nueva imagen
		}

		fetch(`${baseUrl}/${id}`, {
			method: "PUT",
			body: formData, // Enviamos FormData en lugar de JSON
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Error al actualizar el producto.");
				}
				return response.json();
			})
			.then(() => {
				toast.success("Producto actualizado correctamente!");

				// Recargar los productos después de la actualización
				fetch(baseUrl)
					.then((res) => res.json())
					.then((data) => {
						setProducts(data);
						setFilteredProducts(data);
					});

				setIsModalOpen(false);
			})
			.catch((error) => {
				console.error("Error:", error);
				toast.error("Hubo un problema al actualizar el producto.")
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
						toast(data.message);

						// Actualizar el estado sin recargar la página
						const updatedProducts = products.filter((product) => product.id !== id);
						setProducts(updatedProducts);
						setFilteredProducts(updatedProducts);
					})
					.catch((error) => {
						console.error("Error al eliminar el producto:", error);
						toast.error("Hubo un Problema al eliminar el producto.");
					});
			}
		});
	};

	const handleAddClick = () => {
		setNewProduct({
			id: '',
			title: '',
			description: '',
			precio: '',
			color: '',
			categoria: '',
			img: null
		});
		setIsAddModalOpen(true);
	};

	const handleAddInputChange = (e) => {
		const { name, value } = e.target;
		setNewProduct((prev) => ({
			...prev,
			[name]: value
		}));
	};

	const handleAddModalClose = () => {
		setIsAddModalOpen(false);
	};

	const handleAddSave = () => {
		const { title, description, precio, color, categoria, img } = newProduct;
		if (!title || !description || !precio || !color || !categoria || !img) {
			alert("Todos los campos son requeridos.");
			return;
		}
		const formData = new FormData();
		formData.append("title", title);
		formData.append("description", description);
		formData.append("precio", precio);
		formData.append("color", color);
		formData.append("categoria", categoria);
		formData.append("img", img);

		fetch(import.meta.env.VITE_API_URL + "/api/detalleProductos", {
			method: "POST",
			body: formData,
		})
			.then((response) => {
				if (!response.ok) throw new Error("Error al agregar el producto.");
				return response.json();
			})
			.then(() => {
				toast.success("Producto agregado correctamente!");
				// Recargar productos
				fetch(baseUrl)
					.then((res) => res.json())
					.then((data) => {
						setProducts(data);
						setFilteredProducts(data);
					});
				setIsAddModalOpen(false);
			})
			.catch((error) => {
				console.error("Error:", error);
				toast.error("Hubo un problema al agregar el producto.");
			});
	};

	const paginatedProducts = filteredProducts.slice(
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
				theme='light'
				transition={Flip}
			/>
			<motion.div
				className='bg-white backdrop-blur-md shadow-lg rounded-xl p-6 border mb-8 mt-5'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
			>
				<div className='flex justify-between items-center mb-6'>
					<h2 className='text-sm sm:text-base md:text-xl font-semibold text-gray-700'>Lista de productos</h2>
					<button
						className='bg-transparent border border-cyan-500 text-cyan-500 rounded-2xl px-4 py-2 hover:bg-cyan-500 hover:text-white transition-all text-xs sm:text-sm'
						onClick={handleAddClick}
					>
						Agregar producto
					</button>
				</div>

				<div className='overflow-x-auto'>
					<table className='min-w-full divide-y divide-gray-900'>
						<thead>
							<tr>
								<th className='px-6 py-3 text-left text-xs sm:text-sm tracking-wider'>
									Referencia
								</th>
								<th className="px-6 py-3 text-left text-xs sm:text-sm tracking-wider">
									Nombre
								</th>
								<th className='px-6 py-3 text-left text-xs sm:text-sm tracking-wider'>
									Precio
								</th>
								<th className='px-6 py-3 text-left text-xs sm:text-sm tracking-wider'>
									Categoria
								</th>
								<th className='px-6 py-3 text-left text-xs sm:text-sm tracking-wider'>
									Imagen
								</th>
								<th className='px-6 py-3 text-left text-xs sm:text-sm tracking-wider'>
									Acciones
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
									<td className='px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-600'>
										{product.title}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-600">
										{product.description}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-700'>
										${product.precio ? parseFloat(product.precio).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''}								</td>
									<td className='px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-700'>
										{product.categoria}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-700'>
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
											className='text-red-400 hover:text-red-300 '
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
				<div className='text-xs sm:text-sm md:text-base flex justify-between items-center mt-4'>
					<motion.button
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}
						className=' flex rounded-2xl text-gray-700 hover:text-cyan-500 font-bold py-2 px-0 sm:px-10 transition-all'
					>
						<IoIosArrowBack className="mt-1" /> Anterior
					</motion.button>
					<span className='text-gray-700'>
						Page {currentPage} of {Math.ceil(filteredProducts.length / itemsPerPage)}
					</span>
					<motion.button
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === Math.ceil(filteredProducts.length / itemsPerPage)}
						className='flex rounded-2xl text-gray-700 hover:text-cyan-500 font-bold py-2 px-0 sm:px-10 transition-all'
					>
						Siguiente <IoIosArrowForward className="mt-1" />
					</motion.button>
				</div>
			</motion.div>

			{selectedImage && (
				<motion.div
					className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<motion.div
						className='bg-white p-4 rounded-lg'
						initial={{ scale: 0.8 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0.8 }}
					>
						<img src={selectedImage} alt='Selected' className='max-h-96 max-w-full' />
						<motion.button
							onClick={closeModal}
							className='mt-4 px-4 py-2 bg-red-500 text-white rounded-md'
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
						>
							Close
						</motion.button>
					</motion.div>
				</motion.div>
			)}

			{isModalOpen && (
				<motion.div
					className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 sm:p-6 md:p-8  '
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<motion.div
						className='bg-white p-6 rounded-2xl shadow-lg w-full max-w-4xl mx-auto max-h-[90vh] overflow-y-auto mt-16 sm:mt-20'
						initial={{ scale: 0.8 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0.8 }}
					>
						<h2 className='text-xl font-semibold mb-4'>Editar Producto</h2>
						<div className='mb-4'>
							<label className='block text-gray-700 font-bold mb-2'>Title</label>
							<input
								type='text'
								name='title'
								value={editedProduct.title}
								onChange={handleInputChange}
								className='border rounded-2xl w-full py-2 px-3 text-gray-700 font-semibold mb-2 hover:bg-default-200 focus:outline-none'
							/>
						</div>
						<div className='mb-4'>
							<label className='block text-gray-700 font-bold mb-2'>Description</label>
							<textarea
								name='description'
								value={editedProduct.description}
								onChange={handleInputChange}
								className='py-2 px-3 text-gray-700 leading-700 leading-tight focus:outline-none focus:shadow-outline w-full p-2 border rounded-2xl h-32 hover:bg-default-200'
							/>
						</div>
						<div className='mb-4'>
							<label className='block text-gray-700 font-bold mb-2'>Color</label>
							<input
								type='text'
								name='color'
								value={editedProduct.color}
								onChange={handleInputChange}
								className='border rounded-2xl w-full py-2 px-3 text-gray-700 mb-2 hover:bg-default-200 focus:outline-none'
							/>
						</div>
						<div className='mb-4'>
							<label className='block text-gray-700 font-bold mb-2'>Precio</label>
							<input
								type='number'
								name='precio'
								value={editedProduct.precio}
								onChange={handleInputChange}
								className='border rounded-2xl w-full py-2 px-3 text-gray-700 mb-2 hover:bg-default-200 focus:outline-none'
							/>
						</div>
						<div className='mb-4'>
							<label className='block text-gray-700 font-bold mb-2'>Imagen</label>
							<div className='relative w-full h-96 bg-black/20 mb-5 rounded-xl'>
								<div className='absolute top-0 left-0 w-full h-full object-cover'>
									<img
										className='w-full h-full object-cover rounded-xl'
										src={
											editedProduct.img instanceof File
												? URL.createObjectURL(editedProduct.img)
												: editedProduct.img || '/default-placeholder.png'
										}
										alt='Vista previa'
									/>
								</div>
								<label className='absolute border border-black rounded-2xl hover:outline-black hover:bg-black hover:text-white bottom-5 right-5 text-black font-bold py-1 px-2 text-sm sm:text-base sm:py-2 sm:px-4 focus:outline-none focus:shadow-outline cursor-pointer transition-all'>
									Seleccionar
									<input
										type='file'
										name='img'
										accept='image/*'
										onChange={(e) => setEditedProduct({ ...editedProduct, img: e.target.files[0] })}
										className='hidden'
									/>
								</label>
							</div>
						</div>

						<div className='mb-4'>
							<label className='block text-gray-700 font-bold mb-2'>Categoria</label>
							<select
								name='categoria'
								value={editedProduct.categoria}
								onChange={handleInputChange}
								className='border rounded-2xl w-full py-2 px-3 text-gray-700 mb-2 hover:bg-default-200 focus:outline-none'
							>
								<option value="">Selecciona una categoría</option>
								{categories.map((cat, idx) => (
									<option key={idx} value={cat}>{cat}</option>
								))}
							</select>
						</div>
						<div className='flex justify-between'>
							<button
								onClick={handleModalClose}
								className='flex rounded-2xl text-gray-400 hover:text-black  font-bold py-2 px-6  transition-all'
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

			{isAddModalOpen && (
				<motion.div
					className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 sm:p-6 md:p-8'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<motion.div
						className='bg-white p-6 rounded-2xl shadow-lg w-full max-w-4xl mx-auto max-h-[90vh] overflow-y-auto mt-16 sm:mt-20'
						initial={{ scale: 0.8 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0.8 }}
					>
						<h2 className='text-xl font-semibold mb-4'>Agregar Producto</h2>
						<div className='mb-4'>
							<label className='block text-gray-700 font-bold mb-2'>Title</label>
							<input
								type='text'
								name='title'
								value={newProduct.title}
								onChange={handleAddInputChange}
								className='border rounded-2xl w-full py-2 px-3 text-gray-700 font-semibold mb-2 hover:bg-default-200 focus:outline-none'
							/>
						</div>
						<div className='mb-4'>
							<label className='block text-gray-700 font-bold mb-2'>Description</label>
							<textarea
								name='description'
								value={newProduct.description}
								onChange={handleAddInputChange}
								className='py-2 px-3 text-gray-700 leading-700 leading-tight focus:outline-none focus:shadow-outline w-full p-2 border rounded-2xl h-32 hover:bg-default-200'
							/>
						</div>
						<div className='mb-4'>
							<label className='block text-gray-700 font-bold mb-2'>Color</label>
							<input
								type='text'
								name='color'
								value={newProduct.color}
								onChange={handleAddInputChange}
								className='border rounded-2xl w-full py-2 px-3 text-gray-700 mb-2 hover:bg-default-200 focus:outline-none'
							/>
						</div>
						<div className='mb-4'>
							<label className='block text-gray-700 font-bold mb-2'>Precio</label>
							<input
								type='number'
								name='precio'
								value={newProduct.precio}
								onChange={handleAddInputChange}
								className='border rounded-2xl w-full py-2 px-3 text-gray-700 mb-2 hover:bg-default-200 focus:outline-none'
							/>
						</div>
						<div className='mb-4'>
							<label className='block text-gray-700 font-bold mb-2'>Imagen</label>
							<div className='relative w-full h-96 bg-black/20 mb-5 rounded-xl'>
								<div className='absolute top-0 left-0 w-full h-full object-cover'>
									<img
										className='w-full h-full object-cover rounded-xl'
										src={
											newProduct.img
												? (newProduct.img instanceof File ? URL.createObjectURL(newProduct.img) : newProduct.img)
												: '/default-placeholder.png'
										}
										alt='Vista previa'
									/>
								</div>
								<label className='absolute border border-black rounded-2xl hover:outline-black hover:bg-black hover:text-white bottom-5 right-5 text-black font-bold py-1 px-2 text-sm sm:text-base sm:py-2 sm:px-4 focus:outline-none focus:shadow-outline cursor-pointer transition-all'>
									Seleccionar
									<input
										type='file'
										name='img'
										accept='image/*'
										onChange={(e) => setNewProduct({ ...newProduct, img: e.target.files[0] })}
										className='hidden'
									/>
								</label>
							</div>
						</div>
						<div className='mb-4'>
							<label className='block text-gray-700 font-bold mb-2'>Categoria</label>
							<select
								name='categoria'
								value={newProduct.categoria}
								onChange={handleAddInputChange}
								className='border rounded-2xl w-full py-2 px-3 text-gray-700 mb-2 hover:bg-default-200 focus:outline-none'
							>
								<option value="">Selecciona una categoría</option>
								{categories.map((cat, idx) => (
									<option key={idx} value={cat}>{cat}</option>
								))}
							</select>
						</div>
						<div className='flex justify-between'>
							<button
								onClick={handleAddModalClose}
								className='flex rounded-2xl text-gray-400 hover:text-black font-bold py-2 px-6 transition-all'
							>
								Cancelar
							</button>
							<button
								onClick={handleAddSave}
								className='flex border border-cyan-500 text-cyan-500 py-2 px-10 rounded-2xl hover:bg-cyan-500 hover:text-white transition-all'
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
// Validación de las props
ProductsTable.propTypes = {
	searchTerm: PropTypes.string.isRequired, // searchTerm debe ser una cadena y es obligatorio
};
export default ProductsTable;
