import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importa los estilos de Toastify
import { motion } from "framer-motion"; // Importar framer-motion

const baseUrl = import.meta.env.VITE_API_URL + "/api/usuarios"; // Cambia la URL base

const UsersAdd = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [newUser, setNewUser] = useState({
        usuario: "",
        contraseña: "",
        rol: "administrador", // Valor predeterminado
    });

    // Controla la apertura y cierre del modal
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    // Maneja los cambios en los inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    // Función para guardar el nuevo usuario en la API
    const handleSaveUser = async () => {
        try {
            const response = await fetch(baseUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });

            if (!response.ok) {
                throw new Error("Error al crear el usuario");
            }

            // Muestra la notificación de éxito
            toast('Usuario creado exitosamente!', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            handleCloseModal();
            // Limpia el formulario después de guardar
            setNewUser({
                usuario: "",
                contraseña: "",
                rol: "administrador",
            });

            // Retrasar la recarga de la página después de que la notificación termine
            setTimeout(() => {
                window.location.reload(); // Recarga la página
            }, 3000); // 3 segundos de espera (ajusta según el tiempo de la alerta)
        } catch (error) {
            console.error("Error al guardar el usuario:", error);
            // Muestra la notificación de error
            toast.error("Hubo un problema al crear el usuario.");
        }
    };

    return (
        <>
            <motion.button
                onClick={handleOpenModal}
                className="mb-4 outline rounded-2xl outline-cyan-500 text-cyan-500 hover:text-white hover:bg-cyan-500 font-bold py-2 px-4 focus:outline-none focus:shadow-outline transition-all"
            >
                Agregar Usuario
            </motion.button>

            {isModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    style={{ zIndex: 9999 }} // Asegura que el modal tenga un índice alto
                >
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Agregar Usuario</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700">Usuario</label>
                            <input
                                type="text"
                                name="usuario"
                                value={newUser.usuario}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Contraseña</label>
                            <input
                                type="password"
                                name="contraseña"
                                value={newUser.contraseña}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Rol</label>
                            <select
                                name="rol"
                                value={newUser.rol}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="administrador">Administrador</option>
                                <option value="cotizador">Cotizador</option>
                            </select>
                        </div>
                        <div className="flex justify-end">
                            <motion.button
                                onClick={handleCloseModal}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                Cancelar
                            </motion.button>
                            <motion.button
                                onClick={handleSaveUser}
                                className="px-4 py-2 bg-cyan-500 text-white rounded-md"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                Guardar
                            </motion.button>
                        </div>
                    </div>
                </div>
            )}

            {/* Coloca el contenedor de Toasts aquí */}
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
};

export default UsersAdd;
