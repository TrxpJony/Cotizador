import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import "react-toastify/dist/ReactToastify.css";

const CotizadorAdd = ({ dimensions, onAddDoor, useCalculoPrecios, selectedAccessories, selectedGlass }) => { // Accept selectedAccessories as a prop
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        description: '',
        quantity: 1,
        width: dimensions.width || 0, // Initialize width
        height: dimensions.height || 0, // Initialize height
        glassPrice: '' // Initialize the glass price
    });
    const { totalPrice } = useCalculoPrecios(dimensions, selectedAccessories, selectedGlass);


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
        const glassPrice = parseFloat(formData.glassPrice) || 0; // Ensure glass price is a number
        const newTotalPrice = totalPrice + glassPrice; // Add glass price to totalPrice

        const newDoor = {
            ...formData,
            glassPrice: glassPrice,
            price: newTotalPrice // Add the new total price including glass price
        };
        onAddDoor(newDoor); // Use the onAddDoor prop
        setFormData({
            description: '',
            quantity: 1,
            width: dimensions.width || 0, // Reset width
            height: dimensions.height || 0, // Reset height
            glassPrice: 0 // Reset glass price
        });
        handleCloseModal();
    };

    return (
        <>
            <button onClick={handleOpenModal} className="flex border border-cyan-500  text-cyan-500 py-2 px-10 rounded-2xl hover:bg-cyan-500 hover:text-white transition-all ">
                Agregar
            </button>

            {isModalOpen && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                    <div className='bg-white p-6 rounded-2xl shadow-lg w-3/4 max-w-4xl'>
                        <h2 className="text-xl font-semibold mb-4">Agregar</h2>
                        <div className='mb-4'>
                            <label className='block text-gray-700 font-bold mb-2'>Descripción</label>
                            <textarea
                                name='description'
                                value={formData.description}
                                onChange={handleChange}
                                className='py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full p-2 border rounded-2xl h-32 hover:bg-default-200'
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">
                                Precio del vidrio:
                                <input
                                    type="number"
                                    name="glassPrice"
                                    value={formData.glassPrice}
                                    onChange={handleChange}
                                    className=" border rounded-2xl w-full py-2 px-3 text-gray-700 font-semibold mb-2 hover:bg-default-200 focus:outline-none"
                                    placeholder="0"
                                    min="0"
                                />
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">
                                Cantidad:
                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    className="border rounded-2xl w-full py-2 px-3 text-gray-700 font-semibold mb-2 hover:bg-default-200 focus:outline-none"
                                />
                            </label>
                        </div>

                        <div className="mb-4 flex justify-center gap-x-4">
                            <p className="text-gray-700 font-bold">
                                Ancho: {dimensions.width} mm
                            </p>
                            <p className="text-gray-700 font-bold">
                                Alto: {dimensions.height} mm
                            </p>
                        </div>

                        <div className="mb-4">
                            <p className="text-lg block text-gray-700 font-bold mb-2">
                                Precio: ${(totalPrice + (parseFloat(formData.glassPrice) || 0)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={handleCloseModal}
                                className="flex rounded-2xl text-gray-400 hover:text-black  font-bold py-2 px-6  transition-all"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex border border-cyan-500  text-cyan-500 py-2 px-10 rounded-2xl hover:bg-cyan-500 hover:text-white transition-all "
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
    selectedAccessories: PropTypes.array.isRequired, // Add prop type for selectedAccessories
    selectedGlass: PropTypes.string.isRequired,
};

export default CotizadorAdd;
