import '../../../css/colosal.css';
import EnviarDimensiones from '../../../components/cotizador/tairona/enviarDimenciones';
import useCalculoPrecios from '../../../components/cotizador/tairona/useCalculoPrecios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddTableDoor from '../../../components/cotizador/addTableDoor';
import PrintTableDoor from '../../../components/cotizador/PrintTableDoor';
import DetalleTablas from '../../../components/cotizador/tairona/detalleTablas';
import sTaironaImage from '../../../img/zinux.png'; 

const Taironax = () => {
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
                    <img src={sTaironaImage} alt="SISTEMA TAIRONA X" className='door-image' />
                    <EnviarDimensiones onDimensionsChange={handleDimensionsChange} />
                    <h2 className='text-right text-4xl font-bold'>${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                    <br />
                    <AddTableDoor doors={doors}/>
                    <PrintTableDoor doors={doors} title={"Puerta Osilo Batiente Sistema Tairona"} image={sTaironaImage} totalPrice={totalPrice} />
                    <div className='flex justify-end mt-6'>
                        <div className='flex justify-center mb-6'>
                            <button
                                onClick={() => navigate(-1)}
                                className='bg-500 px-4 py-2 text-white rounded-md'
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

export default Taironax;