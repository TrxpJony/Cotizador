import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import PropTypes from 'prop-types'; // Importar PropTypes

const baseUrl = import.meta.env.VITE_API_URL + "/api/usuarios";

const UsersTable = ({ searchTerm }) => {
	const [users, setUsers] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editedUser, setEditedUser] = useState({ usuario: "", contraseña: "" });

	useEffect(() => {
		// Filtrar productos cuando cambia el searchTerm o los productos
		const filtered = users.filter(
			(users) =>
				users.usuario.toLowerCase().includes(searchTerm) ||
				users.rol.toLowerCase().includes(searchTerm)
		);
		setFilteredUsers(filtered);
		setCurrentPage(1); // Resetear a la primera página al buscar
	}, [searchTerm, users]);

	useEffect(() => {
		fetch(baseUrl)
			.then((response) => response.json())
			.then((data) => {
				if (data && Array.isArray(data)) {
					setUsers(data);
					setFilteredUsers(data);
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

	const handleEditClick = (user) => {
		setEditedUser({
			id: user.id,
			usuario: user.usuario,
			contraseña: user.contraseña
		});
		setIsModalOpen(true);
	};


	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setEditedUser((prev) => ({ ...prev, [name]: value }));
	};

	const handleSaveChanges = () => {
		const { id, usuario, contraseña } = editedUser;

		// Validar que los campos no estén vacíos
		if (!usuario || !contraseña || !id) {
			toast.warn("Usuario y contraseña son requeridos.");
			return;
		}

		// Hacer la solicitud PUT a la API para actualizar el usuario
		fetch(`${baseUrl}/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				usuario,
				contraseña
			}),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then(() => {
				toast.success('Usuario actualizado correctamente!');

				// Actualizar el estado de los usuarios sin necesidad de recargar la página
				setUsers(users.map((user) => (user.id === id ? editedUser : user)));
				setFilteredUsers(users.map((user) => (user.id === id ? editedUser : user))); // Esto también actualiza el listado filtrado
				setIsModalOpen(false); // Cierra el modal después de guardar los cambios
			})
			.catch((error) => {
				console.error("Error al actualizar el usuario:", error);
				toast.error('Hubo un problema al actualizar el usuario.')
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
						toast.success(data.message);

						// Actualizar el estado sin recargar la página
						setUsers(users.filter((user) => user.id !== id)); // Elimina el usuario del estado
						setFilteredUsers(filteredUsers.filter((user) => user.id !== id)); // Actualiza también el listado filtrado
					})
					.catch((error) => {
						console.error("Error al eliminar el usuario:", error);
						toast.error("hubo un problema al eliminar el usuario");
					});
			}
		});
	};


	const paginatedUsers = filteredUsers.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	return (
		<>
			<motion.div
				className='bg-white backdrop-blur-md shadow-lg rounded-2xl p-6 border mb-8'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
			>
				<div className='flex justify-between items-center mb-6'>
					<h2 className='text-sm sm:text-base md:text-xl font-semibold text-gray-700'>Lista de usuarios</h2>
				</div>

				<div className='overflow-x-auto'>
					<table className='min-w-full divide-y divide-gray-900'>
						<thead>
							<tr>
								<th className='px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider'>
									Usuario
								</th>
								<th className='px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider'>
									Rol
								</th>
								<th className='px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider'>
									Acciones
								</th>
							</tr>
						</thead>

						<tbody className='divide-y divide-gray-900'>
							{paginatedUsers.map((user) => (
								<motion.tr
									key={user.id}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.3 }}
								>
									<td className='px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-600'>
										<div className='flex items-center'>
											<div className='flex-shrink-0 h-10 w-10'>
												<div className='h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 flex items-center justify-center text-white font-semibold'>
													{user.usuario.charAt(0)}
												</div>
											</div>
											<div className='ml-4'>
												<div className='text-sm font-medium text-gray-600'>{user.usuario}</div>
											</div>
										</div>
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-xs sm:text-sm'>
										<span className='px-2 inline-flex leading-5 font-semibold rounded-full bg-cyan-700 text-blue-100'>
											{user.rol}
										</span>
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-300'>
										<button
											className='text-cyan-500 hover:text-cyan-400 mr-2'
											onClick={() => handleEditClick(user)}
										>
											Editar
										</button>
										<button
											className='text-red-400 hover:text-red-300'
											onClick={() => handleDeleteClick(user.id)}
										>
											Eliminar
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
						Page {currentPage} of {Math.ceil(filteredUsers.length / itemsPerPage)}
					</span>
					<motion.button
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === Math.ceil(filteredUsers.length / itemsPerPage)}
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
						<h2 className='text-xl font-semibold mb-4'>Editar Usuario</h2>
						<div className='mb-4'>
							<label className='block text-gray-700 font-bold mb-2'>Usuario</label>
							<input
								type='text'
								name='usuario'
								value={editedUser.usuario}
								onChange={handleInputChange}
								className='border rounded-2xl w-full py-2 px-3 text-gray-700 font-semibold mb-2 hover:bg-default-200 focus:outline-none'
							/>
						</div>
						<div className='mb-4'>
							<label className='block text-gray-700 font-bold mb-2'>Contraseña</label>
							<input
								type='text'
								name='contraseña'
								value={editedUser.contraseña}
								onChange={handleInputChange}
								className='border rounded-2xl w-full py-2 px-3 text-gray-700 font-semibold mb-2 hover:bg-default-200 focus:outline-none'
							/>
						</div>
						<div className='flex justify-between'>
							<button
								onClick={handleModalClose}
								className='flex rounded-2xl text-gray-400 hover:text-black font-bold py-2 px-6 transition-all'
							>
								Cancelar
							</button>
							<button
								onClick={handleSaveChanges}
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

UsersTable.propTypes = {
	searchTerm: PropTypes.string.isRequired,
};

export default UsersTable;
