import '../../../css/colosal.css';
import EnviarDimensiones744 from '../../../components/cotizador/sistema744/enviarDimenciones';
import useCalculoPrecios from '../../../components/cotizador/sistema744/useCalculoPrecios';
import { useState } from 'react';
import AddTableDoor from '../../../components/cotizador/addTableDoor'; // Import the new component
import PrintTableDoor from '../../../components/cotizador/PrintTableDoor'; // Import the new component
import DetalleTablas from '../../../components/cotizador/sistema744/detalleTablas';
import sistema744img from '../../../img/colox.png'; // Importar la imagen
import BackButton from '../../../components/common/backButton';

const Sistema744 = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [doors, setDoors] = useState([]); // State to hold doors
  const [selectedAccessories, setSelectedAccessories] = useState([]); // State to hold selected accessories
  const [selectedGlass, setSelectedGlass] = useState('sinVidrio');
  const [selectedAlfajia, setselectedAlfajia] = useState('sinAlfajia')
  const { totalPrice, calculatedValues } = useCalculoPrecios(dimensions, selectedAccessories, selectedGlass, selectedAlfajia);

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
            Sistema 744 XO-OX
          </p>
        </div>
      </div>
      <div className="door-container">
        <div className="px-10">
          {/* Imagen */}
          <div className='relative w-full h-56 sm:h-72 md:h-96 bg-black/20 mb-5 rounded-xl'>
            <div className='top-0 left-0 w-full h-full'>
              <img src={sistema744img} alt="Puerta / ventana Corrediza Sistema 744" className="w-full h-56 sm:h-full object-cover rounded-xl " />
            </div>
          </div>
          <div className='mb-2'>
            <label className='text-gray-700 font-bold mb-2'>
              Dimensiones
            </label>
            <EnviarDimensiones744 onDimensionsChange={handleDimensionsChange} />
          </div>
          <div className='mb-5'>
            <label className='text-gray-700 font-bold mb-2'>Tipo de Vidrio</label>
            <select className="mt-2 border rounded-2xl w-full py-2 px-3 text-gray-700 font-semibold" value={selectedGlass} onChange={(e) => setSelectedGlass(e.target.value)}>
              <option value="sinVidrio">Sin Vidrio</option>
              <option value="4mm744">Vidrio 4 mm</option>
              <option value="5mm744">Vidrio 5 mm</option>
              <option value="vidriobronce">Vidrio Bronce</option>
            </select>
          </div>
          <div className='mb-2'>
            <label className='text-gray-700 font-bold mb-2'>Alfajia</label>
            <select className='mt-2 border rounded-2xl w-full py-2 px-3 text-gray-700 font-semibold' value={selectedAlfajia} onChange={(e) => setselectedAlfajia(e.target.value)}>
              <option value="sinAlfajia">Sin alfajia</option>
              <option value="ALN0000">Con alfajia</option>
            </select>
          </div>
          <div>
            <h2 className="text-right text-xl font-bold">${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
            <AddTableDoor doors={doors} onRemove={handleRemoveDoor} /> {/* Use the new component */}
          </div>
          <div className='flex justify-between mb-6'>
            <PrintTableDoor doors={doors} title={"Puerta / ventana Corrediza Sistema 744"} image={sistema744img} totalPrice={totalPrice} /> {/* Pass totalPrice prop */}
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
          selectedGlass={selectedGlass} // ✅ Ahora lo estamos pasando
          selectedAlfajia={selectedAlfajia} // Pass the selelectedAlfajia state to DetalleTablas
        /> {/* Pass useCalculoPrecios as a prop */}
      </div>
    </>
  );
};

export default Sistema744;
