import '../../../css/colosal.css';
import EnviarDimensiones8025 from '../../../components/cotizador/sistema8025/enviarDimenciones';
import useCalculoPrecios from '../../../components/cotizador/sistema8025/useCalculoPrecios';
import { useState } from 'react';
import AddTableDoor from '../../../components/cotizador/addTableDoor';
import PrintTableDoor from '../../../components/cotizador/PrintTableDoor';
import DetalleTablas8025 from '../../../components/cotizador/sistema8025/detalleTablas';
import Sistema8025img from '../../../img/colox.png';
import BackButton from '../../../components/common/backButton';

const Sistema8025 = () => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [doors, setDoors] = useState([]);
    const [selectedAccessories, setSelectedAccessories] = useState([]);
    const [selectedGlass, setSelectedGlass] = useState('sinVidrio');
    const { totalPrice, calculatedValues } = useCalculoPrecios(dimensions, selectedAccessories, selectedGlass);

    const handleDimensionsChange = (newDimensions) => {
        setDimensions(newDimensions);
    };

    const handleAddDoor = (newDoor) => {
        setDoors(prevDoors => [...prevDoors, newDoor]);
    };

    const handleRemoveDoor = (indextoRemove) => {
        setDoors(prevDoors => prevDoors.filter((_, index) => index !== indextoRemove));
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
            <div className='w-full bg-white shadow-md p-4 flex flex-col mx-auto'>
                <div className='px-4 sm:px-12 md:px-24 lg:px-40 text-center sm:text-left'>
                    <p className='py-2 text-pretty text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-gray-700'>
                        sistema 8025 XO-OX
                    </p>
                </div>
            </div>
            <div className='door-container'>
                <div className='px-10'>
                    <div className='relative w-full h-56 sm:h-72 md:h-96 bg-black/20 rounded-xl'>
                        <div className='top-0 left-0 w-full h-full'>
                            <img src={Sistema8025img} alt="Puerta / ventana Corrediza Sistema 8025" className='w-full h-56 sm:h-full object-cover rounded-xl' />
                        </div>
                    </div>
                    <div className='mb-2'>
                        <label className='text-gray-700 font-bold mb-2'>
                            Dimensiones
                        </label>
                        <EnviarDimensiones8025 onDimensionsChange={handleDimensionsChange} />
                    </div>
                    <div className='mb-2'>
                        <label className='text-gray-700 font-bold mb-2'>Tipo de Vidrio</label>
                        <select className="mt-2 border rounded-2xl w-full py-2 px-3 text-gray-700 font-semibold mb-2 hover:bg-default-200" value={selectedGlass} onChange={(e) => setSelectedGlass(e.target.value)}>
                            <option value="sinVidrio">Sin Vidrio</option>
                            <option value="4mm744">Vidrio 4 mm</option>
                            <option value="5mm744">Vidrio 5 mm</option>
                            <option value="VID_L33">Vidrio laminado 3 + 3</option>
                            <option value="vidriobronce">Vidrio Bronce</option>
                        </select>
                    </div>
                    <div className='mb-2'>
                        <h2 className='text-right text-xl font-bold'>${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} </h2>
                    </div>
                    <div>
                        <AddTableDoor doors={doors} onRemove={handleRemoveDoor} />
                    </div>
                    <div className='flex justify-between mb-6'>
                        <PrintTableDoor doors={doors} title={"Puerta / ventana Corrediza Sistema 8025"} image={Sistema8025img} totalPrice={totalPrice} />
                        <BackButton />
                    </div>
                </div>
                <DetalleTablas8025
                    calculatedValues={calculatedValues}
                    dimensions={dimensions}
                    onAddDoor={handleAddDoor}
                    onAccessoryChange={handleAccessoryChange}
                    selectedAccessories={selectedAccessories}
                    selectedGlass={selectedGlass}
                    useCalculoPrecios={useCalculoPrecios}
                />
            </div>
        </>
    );
};

export default Sistema8025;