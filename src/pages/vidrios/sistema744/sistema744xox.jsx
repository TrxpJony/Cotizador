import '../../../css/colosal.css';
import EnviarDimensiones from '../../../components/cotizador/sistema744xox/enviarDimensiones';
import useCalculoPrecios from '../../../components/cotizador/sistema744xox/useCalculoPrecios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddTableDoor from '../../../components/cotizador/addTableDoor';
import PrintTableDoor from '../../../components/cotizador/PrintTableDoor';
import DetalleTablas from '../../../components/cotizador/sistema744xox/detalleTablas';
import Sistema744Image from '../../../img/xox.png';

const Sistema744xox = () => {
    const navigate = useNavigate();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [doors, setDoors] = useState([]);
    const [selectedAccessories, setSelectedAccessories] = useState([]);

    const { totalPrice, calculatedValues } = useCalculoPrecios(dimensions, selectedAccessories)

    const handleDimensionsChange = (newDimensions) => {
        setDimensions(newDimensions);
    };

    const handleAddDoor = (newDoor) => {
        setDoors(prevDoors => [...prevDoors, newDoor]);
    };

    const handleAccessoryChange = (accessory) => {
        setSelectedAccessories(prevAccessories => {
            if (prevAccessories.includes(accessory)) {
                return prevAccessories.filter(item => item !== accessory);
            } else {
                return [...prevAccessories, accessory];
            }
        });
    };

    return (
        <>
            <div className="door-container">
                <div className="door-frame">
                    <img src={Sistema744Image} alt="Puerta / Ventana Corrediz Sistema 744" className="door-image" />
                    <EnviarDimensiones onDimensionsChange={handleDimensionsChange} />
                    <h2 className='text-right text-4xl font-bold'>${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                    <br />
                    <AddTableDoor doors={doors} />
                    <PrintTableDoor door={doors} title={"Puerta / Ventana Corrediza Sistema 744"} image={Sistema744Image} totalPrice={totalPrice} />
                    <div className="flex jutify-end mt-6">
                        <div className="flex justify-end mt-6">
                            <button
                                onClick={() => navigate(-1)}
                                className="bg-gray-500 px-4 py-2 text-white rounded-md"
                            >
                                Regresar
                            </button>
                        </div>
                    </div>
                </div>
                <DetalleTablas
                    calculatedValues={calculatedValues}
                    dimensions={dimensions}
                    onAddDoor={handleAddDoor}
                    onAccessoryChange={handleAccessoryChange}
                    selectedAccessories={selectedAccessories}
                    useCalculoPrecios={useCalculoPrecios}
                />
            </div>
        </>
    );
};


export default Sistema744xox;