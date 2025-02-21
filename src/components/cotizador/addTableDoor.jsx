import PropTypes from 'prop-types';

const AddTableDoor = ({ doors }) => {
    // Calcular el total del IVA y el total sin IVA
    const totalPrice = doors.reduce((sum, door) => sum + (door.price * door.quantity), 0);
    const totalIva = totalPrice * 0.19;
    const totalSinIva = totalPrice - totalIva; // Se resta el IVA al total

    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Agregados</h3>
            <ul>
                {doors.map((door, index) => {
                    const iva = (door.price * 0.19) * door.quantity; // Calcular IVA por puerta
                    const totalSinIvaPorPuerta = (door.price * door.quantity) - iva; // Se resta el IVA
                    return (
                        <li key={index} className="mb-2 p-2 border rounded">
                            <p><strong>Descripción:</strong> {door.description}</p>
                            <p><strong>Cantidad:</strong> {door.quantity}</p>
                            <p><strong>Ancho:</strong> {door.width} mm</p>
                            <p><strong>Alto:</strong> {door.height} mm</p>
                            <p><strong>Subtotal:</strong> ${totalSinIvaPorPuerta.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                            <p><strong>IVA:</strong> ${iva.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                            <p><strong>Total:</strong> ${door.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} </p>
                        </li>
                    );
                })}
            </ul>
            <div className="mt-4 p-2 border rounded">
                <p><strong>Total sin IVA:</strong> ${totalSinIva.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p><strong>Total IVA:</strong> ${totalIva.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p><strong>Total:</strong> ${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <br />
        </div>
    );
};

AddTableDoor.propTypes = {
    doors: PropTypes.array.isRequired
};

export default AddTableDoor;
