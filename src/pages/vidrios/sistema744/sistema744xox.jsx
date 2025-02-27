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
    const navigate = useNavigate(); // Inicializar useNavigate
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [doors, setDoors] = useState([]); // State to hold doors
    const [selectedAccessories, setSelectedAccessories] = useState([]); // State to hold selected accessories
    const [selectedGlass, setSelectedGlass] = useState('sinVidrio');
    const { totalPrice, calculatedValues } = useCalculoPrecios(dimensions, selectedAccessories, selectedGlass);

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
                    <label> Tipo de Vidrio:</label>
                    <select className="p-2 border border-gray-300 rounded-md foucs:outline-none focus:right-2 focus:ring-cyan-500 focus:border-cyan-500 transition ease-in-out w-[130px]" value={selectedGlass} onChange={(e) => setSelectedGlass(e.target.value)}>
                        <option value="sinVidrio">Sin Vidrio</option>
                        <option value="4mm744">Vidrio 4 mm</option>
                        <option value="5mm744">Vidrio 5 mm</option>
                        <option value="vidriobronce">Vidrio Bronce</option>
                    </select>
                    <h2 className='text-right text-4xl font-bold'>${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                    <br />
                    <AddTableDoor doors={doors} />
                    <PrintTableDoor doors={doors} title={"Puerta / ventana Corrediza Sistema 744"} image={Sistema744Image} totalPrice={totalPrice} />
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
                    selectedGlass={selectedGlass} // ✅ Ahora lo estamos pasando
                />
            </div>
        </>
    );
};


export default Sistema744xox;