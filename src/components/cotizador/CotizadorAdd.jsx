import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import "react-toastify/dist/ReactToastify.css";

const CotizadorAdd = ({ dimensions, onAddDoor, useCalculoPrecios, selectedAccessories }) => { // Accept selectedAccessories as a prop
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        description: '',
        quantity: 1,
        width: dimensions.width || 0, // Initialize width
        height: dimensions.height || 0 // Initialize height
    });
    const { totalPrice } = useCalculoPrecios(dimensions, selectedAccessories); // Use dimensions and selectedAccessories for price calculation

    useEffect(() => {
        setFormData(prevData => ({
            ...prevData,
            width: dimensions.width,
            height: dimensions.height
        }));
    }, [dimensions]);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = () => {
        const newDoor = {
            ...formData,
            price: totalPrice // Add totalPrice to the new door
        };
        onAddDoor(newDoor); // Use the onAddDoor prop
        setFormData({
            description: '',
            quantity: 1,
            width: dimensions.width || 0, // Reset width
            height: dimensions.height || 0 // Reset height
        });
        handleCloseModal();
    };

    return (
        <>
            <button onClick={handleOpenModal} className="px-4 py-2 bg-cyan-500 text-white rounded-md">
                Agregar
            </button>

            {isModalOpen && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                    <div className='bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-4xl'>
                        <h2 className="text-xl font-semibold mb-4">Agregar</h2>
                        <div className='mb-4'>
                            <label className='block text-gray-700'>Descripción</label>
                            <textarea
                                name='description'
                                value={formData.description}
                                onChange={handleChange}
                                className='w-full p-2 border rounded h-32'
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">
                                Cantidad:
                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                            </label>
                        </div>

                        <div className="mb-4">
                            <p className="text-lg font-semibold">
                                Ancho: {dimensions.width} mm
                            </p>
                            <p className="text-lg font-semibold">
                                Alto: {dimensions.height} mm
                            </p>
                            <p className="text-lg font-semibold">
                                Precio calculado: ${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-cyan-500 text-white rounded-md"
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

CotizadorAdd.propTypes = {
    dimensions: PropTypes.object.isRequired,
    onAddDoor: PropTypes.func.isRequired, // Add prop type for onAddDoor
    useCalculoPrecios: PropTypes.func.isRequired, // Add prop type for useCalculoPrecios
    selectedAccessories: PropTypes.array.isRequired // Add prop type for selectedAccessories
};

export default CotizadorAdd;
