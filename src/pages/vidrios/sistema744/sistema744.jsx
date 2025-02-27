import '../../../css/colosal.css';
import EnviarDimensiones744 from '../../../components/cotizador/sistema744/enviarDimenciones';
import useCalculoPrecios from '../../../components/cotizador/sistema744/useCalculoPrecios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddTableDoor from '../../../components/cotizador/addTableDoor'; // Import the new component
import PrintTableDoor from '../../../components/cotizador/PrintTableDoor'; // Import the new component
import DetalleTablas744 from '../../../components/cotizador/sistema744/detalleTablas';
import sistema744img from '../../../img/colox.png'; // Importar la imagen

const Sistema744 = () => {
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
          {/* Imagen */}
          <img src={sistema744img} alt="Puerta / ventana Corrediza Sistema 744" className="door-image" />
          <EnviarDimensiones744 onDimensionsChange={handleDimensionsChange} />
          <label>Tipo de Vidrio</label>
          <select className="p-2 border border-gray-300 rounded-md focus:outline-none focus:right-2 focus:ring-cyan-500 focus:border-cyan-500 transition ease-in-out w-[130px]" value={selectedGlass} onChange={(e) => setSelectedGlass(e.target.value)}>
            <option value="sinVidrio">Sin Vidrio</option>
            <option value="4mm744">Vidrio 4 mm</option>
            <option value="5mm744">Vidrio 5 mm</option>
            <option value="vidriobronce">Vidrio Bronce</option>
          </select>
          <h2 className="text-right text-4xl font-bold">${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
          <br />
          <AddTableDoor doors={doors} /> {/* Use the new component */}
          <PrintTableDoor doors={doors} title={"Puerta / ventana Corrediza Sistema 744"} image={sistema744img} totalPrice={totalPrice} /> {/* Pass totalPrice prop */}
          <div className="flex justify-end mt-6">
            {/* Botón Agregar Puerta */}
            <div className="flex justify-center mb-6">
              <button
                onClick={() => navigate(-1)}
                className="bg-gray-500 px-4 py-2 text-white rounded-md"
              >
                Regresar
              </button>
            </div>
          </div>
        </div>
        <DetalleTablas744 
          calculatedValues={calculatedValues} 
          dimensions={dimensions} 
          onAddDoor={handleAddDoor} 
          onAccessoryChange={handleAccessoryChange} 
          selectedAccessories={selectedAccessories} 
          useCalculoPrecios={useCalculoPrecios} 
          selectedGlass={selectedGlass}
        /> {/* Pass useCalculoPrecios as a prop */}
      </div>
    </>
  );
};

export default Sistema744;
