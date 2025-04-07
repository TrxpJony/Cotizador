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
            <div className="w-full bg-white shadow-md p-4 flex flex-col mx-auto">
                <div className="px-4 sm:px-12 md:px-24 lg:px-48 text-center sm:text-left">
                    <p className="py-2 text-pretty text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-gray-700">
                        Sistema kimbaya OX
                    </p>
                </div>
            </div>
            <div className='door-container'>
                <div className='px-10'>
                    {/* Imagen */}
                    <div className='relative w-full h-56 sm:h-72 md:h-96 bg-black/20 mb-5 rounded-xl shadow-lg'>
                        <div className='top-0 left-0 w-full h-full'>
                            <img src={kimbayaImage} alt="SISTEMA KIMBAYA XO" className='w-full h-56 sm:h-full object-cover rounded-xl' />
                        </div>
                    </div>
                    <div className='MB-2'>
                        <label className=''>
                            Dimensiones
                        </label>
                    </div>
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