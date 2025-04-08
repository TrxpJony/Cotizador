import '../../../css/colosal.css';
import EnviarDimensiones from '../../../components/cotizador/kimbayaxxx/enviarDimensionse';
import useCalculoPrecios from '../../../components/cotizador/kimbayaxxx/useCalculoPrecios';
import { useState } from 'react';
import AddTableDoor from '../../../components/cotizador/addTableDoor';
import kimbayaImage from '../../../img/kimxxx.png';
import PrintTableDoor from '../../../components/cotizador/PrintTableDoor';
import DetalleTablas from '../../../components/cotizador/kimbayaxxx/detalleTablas';
import BackButton from '../../../components/common/backButton';

const Kimbayaxxx = () => {
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

    const handleRemoveDoor = (indexToRemove) => {
        setDoors(prevDoors => prevDoors.filter((_, index) => index !== indexToRemove));
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
                        Sistema kimbaya XXX
                    </p>
                </div>
            </div>
            <div className='door-container'>
                <div className='px-10'>
                    {/* Imagen */}
                    <div className='relative w-full h-56 sm:h-72 md:h-96 bg-black/20 mb-5 rounded-xl'>
                        <div className='top-0 left-0 w-full h-full'>
                            <img src={kimbayaImage} alt="SISTEMA KIMBAYA XO" className='w-full h-56 sm:h-full object-cover rounded-xl' />
                        </div>
                    </div>
                    <div className='mb-2'>
                        <label className='text-gray-700 font-bold mb-2'>
                            Dimensiones
                        </label>
                        <EnviarDimensiones onDimensionsChange={handleDimensionsChange} />
                    </div>
                    <div>
                        <h2 className='text-right text-xl font-bold'>${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                        <AddTableDoor doors={doors} onRemove={handleRemoveDoor} />
                    </div>
                    <div className='flex justify-between mb-6'>
                        <PrintTableDoor doors={doors} title={"Puerta Corrediza Sistema Kimbaya"} image={kimbayaImage} totalPrice={totalPrice} />
                        <BackButton />
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

export default Kimbayaxxx;