import '../../../css/colosal.css';
import EnviarDimensiones from '../../../components/cotizador/astral17xx/enviarDimenciones';
import useCalculoPrecios from '../../../components/cotizador/astral17xx/useCalculoPrecios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddTableDoor from '../../../components/cotizador/addTableDoor';
import PrintTableDoor from '../../../components/cotizador/PrintTableDoor';
import DetalleTablas from '../../../components/cotizador/astral17xx/detalleTablas';
import Astral20Image from '../../../img/colxx.png';

const Astral17xx = () => {
    const navigate = useNavigate();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [doors, setDoors] = useState([]);
    const [selectedAccessories, setSelectedAccessories] = useState([]);

    const { totalPrice, calculatedValues } = useCalculoPrecios(dimensions, selectedAccessories);

    const handleDimensionsChange = (newDimensions) => {
        setDimensions(newDimensions);
    };

    const handleAddDoor = (newDoor) => {
        setDoors(prevDoors => [...prevDoors, newDoor]);
    };

    const handleAccessoryChange = (accessory) => {
        setSelectedAccessories(prevAccessories => {
            if (prevAccessories.includes(accessory)) {
                return prevAccessories.filter(item => item !== accessory)
            } else {
                return [...prevAccessories, accessory];
            }
        });
    };

    return (
        <>
             <div className='door-container'>
             <div className='door-frame'>
                    <img src={Astral20Image} alt="ASTRAL 1.7 XX" className='door-image' />
                    <EnviarDimensiones onDimensionsChange={handleDimensionsChange} />
                    <h2 className='text-right text-4xl font-bold'>${totalPrice.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h2>
                    <br />
                    <AddTableDoor doors={doors} />
                    <PrintTableDoor doors={doors} title={'Ventana Corrediza Astral 1.7'} image={Astral20Image} totalPrice={totalPrice} />
                    <div className='flex justify-end mt-6'>
                        <div className='flex justify-center mb-6'>
                            <button
                                onClick={() => navigate(-1)}
                                className='bg-gray-500 px-4 py-2 text-white rounded-md'
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
export default Astral17xx