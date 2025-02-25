import '../../../css/colosal.css';
import EnviarDimensiones from '../../../components/cotizador/kimbaya/enviarDimensiones';
import useCalculoPrecios from '../../../components/cotizador/kimbaya/useCalculoPrecios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddTableDoor from '../../../components/cotizador/addTableDoor';
import DetalleTablas from '../../../components/cotizador/kimbaya/detalleTablas';
import kimbayaImage from '../../../img/kimxo.png';
import PrintTableDoor from '../../../components/cotizador/PrintTableDoor';

const Kimbaya = () => {
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
                return prevAccessories.filter(item => item !== accessory);
            } else {
                return [...prevAccessories, accessory];
            }
        });
    };

    return (
        <>
            <div className='door-container'>
                <div className='door-frame'>
                    <img src={kimbayaImage} alt="SISTEMA KIMBAYA XO" className='door-image' />
                    <EnviarDimensiones onDimensionsChange={handleDimensionsChange} />
                    <h2 className='text-right text-4xl font-bold'>${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                    <br />
                    <AddTableDoor doors={doors} />
                    <PrintTableDoor doors={doors} title={"Puerta Corrediza Sistema Kimbaya"} image={kimbayaImage} totalPrice={totalPrice} />
                    <div className='flex justify-end mt-6'>
                        <div className='flex justify-center mb-6'>
                            <button
                                onClick={() => navigate(-1)}
                                className='bg-gray-500 px-3 py-2 text-white rounded-md'
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

export default Kimbaya;