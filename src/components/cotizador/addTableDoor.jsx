import PropTypes from 'prop-types';
import { IoTrashBinOutline } from "react-icons/io5";

const AddTableDoor = ({ doors, onRemove }) => {
    // Calcular el total del IVA y el total sin IVA
    const totalPrice = doors.reduce((sum, door) => sum + (door.price * door.quantity), 0);
    const totalIva = totalPrice * 0.19;
    const totalSinIva = totalPrice - totalIva; // Se resta el IVA al total

    return (
        <div className="">
            <h3 className="text-gray-700 font-bold mb-2">Agregados</h3>
            <ul>
                {doors.map((door, index) => {
                    const iva = (door.price * 0.19) * door.quantity; // Calcular IVA por puerta
                    const totalSinIvaPorPuerta = (door.price * door.quantity) - iva; // Se resta el IVA
                    const totalConIvaPorPuerta = (door.price * door.quantity);
                    return (
                        <li key={index} className="py-2 px-4 mb-2 border-2 rounded-2xl w-full bg-white ">
                            <table className="table-auto w-full text-left ">
                                <tbody>
                                    <tr>
                                        <td className="font-semibold">Descripción:</td>
                                        <td className='text-sm'>{door.description}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">Cantidad:</td>
                                        <td>{door.quantity}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">Ancho:</td>
                                        <td>{door.width} mm</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">Alto:</td>
                                        <td>{door.height} mm</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">Subtotal:</td>
                                        <td>${totalSinIvaPorPuerta.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">IVA:</td>
                                        <td>${iva.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">Total:</td>
                                        <td>${totalConIvaPorPuerta.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="flex justify-end">
                                <button 
                                    onClick={() => onRemove(index)} 
                                    className="rounded-2xl text-red-400 hover:text-red-700 font-bold transition-all"
                                >
                                    <IoTrashBinOutline/>
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
            <div className="py-2 px-4  border-2 rounded-2xl w-full bg-white ">
                <table className="table-auto w-full text-left">
                    <tbody>
                        <tr>
                            <td className="font-semibold">Total sin IVA:</td>
                            <td>${totalSinIva.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>
                        <tr>
                            <td className="font-semibold">Total IVA:</td>
                            <td>${totalIva.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>
                        <tr>
                            <td className="font-semibold">Total:</td>
                            <td>${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br />
        </div>
    );
};

AddTableDoor.propTypes = {
    doors: PropTypes.array.isRequired,
    onRemove: PropTypes.func.isRequired
};

export default AddTableDoor;
