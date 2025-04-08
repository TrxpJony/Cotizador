import EnviarDimensiones from '../../../components/cotizador/espejosCuadrados/enviarDimensiones';
import { useState } from 'react';
import PrintTableDoor from '../../../components/cotizador/PrintTableDoor'; // Import the new component
import BackButton from '../../../components/common/backButton';
import useCalculoPrecios from '../../../components/cotizador/espejosCuadrados/useCalculoPrecios';
import DetalleTablas from '../../../components/cotizador/espejosCuadrados/detalleTablas';
import AddTableDoor from '../../../components/cotizador/addTableDoor';

const espejoImage = "https://res.cloudinary.com/dtxmsbsjd/image/upload/v1744034207/img_cotizadores/e14xp7uhsscn62incxkg.png";
const CotizadorEspejos = () => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [doors, setDoors] = useState([]); // State to hold doors
    const [selectedAccessories, setSelectedAccessories] = useState([]); // State to hold selected accessories
    const [selectedGlass, setSelectedGlass] = useState('sinVidrio');
    const [selectedCenefa, setSelectedCenefa] = useState('sinCenefa');
    const [selectedPerfil, setselectedPerfil] = useState('sinPerfil'); // State for selected profile
    const [isCenBotSelected, setIsCenBotSelected] = useState(false); // State for checkbox

    const { totalPrice, calculatedValues } = useCalculoPrecios(dimensions, selectedAccessories, selectedGlass, selectedCenefa, selectedPerfil,  isCenBotSelected);


    const handleDimensionsChange = (newDimensions) => {
        setDimensions(newDimensions);
    };

    const handleAddDoor = (newDoor) => {
        setDoors(prevDoors => [...prevDoors, newDoor]);
    };

    const handleRemoveDoor = (indexToRemove) => {
        setDoors(prevDoors => prevDoors.filter((_, index) => index !== indexToRemove));
    };

    const handleAccessoryChange = (accessories) => {
        setSelectedAccessories(accessories); // Actualiza todo el array de accesorios
    };

    const handleCenBotChange = (isSelected) => {
        setIsCenBotSelected(isSelected);
    };


    return (
        <>
            <div className="w-full bg-white shadow-md p-4 flex flex-col mx-auto">
                <div className="px-4 sm:px-12 md:px-24 lg:px-48 text-center sm:text-left">
                    <p className="py-2 text-pretty text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-gray-700">
                        Espejos rectos
                    </p>
                </div>
            </div>
            <div className="door-container">
                <div className="px-10">
                    {/* Imagen */}
                    <div className='relative w-full h-56 sm:h-72 md:h-96 bg-black/20 mb-5 rounded-xl'>
                        <div className='top-0 left-0 w-full h-full'>
                            <img src={espejoImage} alt="Espejo" className="w-full h-56 sm:h-full object-cover rounded-xl " />
                        </div>
                    </div>
                    <div className='mb-2'>
                        <label className='text-gray-700 font-bold mb-2'>
                            Dimensiones
                        </label>
                        <EnviarDimensiones onDimensionsChange={handleDimensionsChange} />
                    </div>
                    <div className='mb-2'>
                        <label className='text-gray-700 font-bold mb-2'>Tipo de Vidrio</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:ring-1 focus:ring-cyan-500 text-gray-700  mb-2 hover:bg-default-200 focus:outline-none" value={selectedGlass} onChange={(e) => setSelectedGlass(e.target.value)}>
                            <option value="sinVidrio">Sin Vidrio</option>
                            <option value="Orion4mm">Orion 4 mm</option>
                            <option value="Radiant4mm">Radiant 4 mm</option>
                            <option value="PaloRosa4mm">Palo Rosa 4 mm</option>
                            <option value="Gris4mm">Gris 4 mm</option>
                            <option value="Bronce4mm">Bronce 4 mm</option>
                        </select>
                    </div>
                    <div className='mb-2'>
                        <label className='text-gray-700 font-bold mb-2'>Cenefa y perfileria</label>
                    </div>
                    <div className='grid grid-cols-2 gap-2'>

                        <select className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:ring-1 focus:ring-cyan-500 text-gray-700  mb-2 hover:bg-default-200 focus:outline-none" value={selectedCenefa} onChange={(e) => setSelectedCenefa(e.target.value)}>
                            <option value="sinCenefa">Sin cenefa</option>
                            <option value="CEN_FAC">Facil</option>
                            <option value="CEN_INT">Intermedia</option>
                            <option value="CEN_DIF">Dificil</option>
                        </select>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:ring-1 focus:ring-cyan-500 text-gray-700  mb-2 hover:bg-default-200 focus:outline-none" value={selectedPerfil} onChange={(e) => setselectedPerfil(e.target.value)}>
                            <option value="sinPerfil">Sin perfileria</option>
                            <option value="PER_ESP">Perfileria en aluminio</option>
                        </select>
                    </div>
                    <div>
                        <h2 className="text-right text-xl font-bold">${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                        <AddTableDoor doors={doors} onRemove={handleRemoveDoor} /> {/* Use the new component */}
                    </div>
                    <div className='flex justify-between mb-6'>
                        <PrintTableDoor doors={doors} title={"Espejo personalizado"} image={espejoImage} totalPrice={totalPrice} /> {/* Pass totalPrice prop */}
                        <BackButton />
                    </div>
                </div>
                <DetalleTablas
                    calculatedValues={calculatedValues}
                    dimensions={dimensions}
                    onAddDoor={handleAddDoor}
                    onAccessoryChange={handleAccessoryChange} // ✅ Esto está bien
                    selectedAccessories={selectedAccessories}
                    useCalculoPrecios={useCalculoPrecios}
                    selectedGlass={selectedGlass}
                    selectedCenefa={selectedCenefa} // Pass the selectedCenefa state to DetalleTablas
                    selectedPerfil={selectedPerfil} // Pass the selectedPerfil state to DetalleTablas
                    onCenBotChange={handleCenBotChange} // Pass handler to DetalleTablas
                /> {/* Pass useCalculoPrecios as a prop */}
            </div>
        </>
    );
};

export default CotizadorEspejos;