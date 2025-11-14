import '../../css/colosal.css';
import EnviarDimensiones from '../../components/cotizador/PuertaCocina/enviarDimenciones';
import useCalculoPrecios from '../../components/cotizador/PuertaCocina/useCalculoPrecios';
import { useState } from 'react';
import AddTableDoor from '../../components/cotizador/addTableDoor'; // Import the new component
import PrintTableDoor from '../../components/cotizador/PrintTableDoor'; // Import the new component
import DetalleTablas from '../../components/cotizador/PuertaCocina/detalleTablas';
import BackButton from '../../components/common/backButton';


const CocinasCotizador = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [doors, setDoors] = useState([]); // State to hold doors
  const [selectedAccessories, setSelectedAccessories] = useState([]); // State to hold selected accessories
  const cocinaIMG = 'https://res.cloudinary.com/dils6fuig/image/upload/v1738787741/img_catalogo/producto_coci2_1738787740325.png'; // Importar la imagen
  const [selectedGlass, setSelectedGlass] = useState('sinVidrio');
  const [selectedPerfil, setSelectedPerfil] = useState('sinPerfil');
  const { totalPrice, calculatedValues } = useCalculoPrecios(dimensions, selectedAccessories, selectedGlass, selectedPerfil);


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
            Puerta cocina con batiente
          </p>
        </div>
      </div>
      <div className="door-container">
        <div className="px-10">
          {/* Imagen */}
          <div className='relative w-full h-56 sm:h-72 md:h-96 bg-black/20 mb-5 rounded-xl shadow-lg'>
            <div className='top-0 left-0 w-full h-full'>
              <img src={cocinaIMG} alt="Imagen" className="w-full h-56 sm:h-full object-cover rounded-xl" />
            </div>
          </div>
          <div className='mb-2'>
            <label className='text-gray-700 font-bold mb-2'>
              Dimensiones
            </label>
            <EnviarDimensiones onDimensionsChange={handleDimensionsChange} />
          </div>
          <div className='mb-2'>
            <label className='text-gray-700 font-bold mb-2'>Tipo de perfil de marco:</label>
            <select className='mt-2 border rounded-2xl w-full py-2 px-3 text-gray-700 font-semibold mb-2 hover:bg-default-200 focus:outline-none shadow-lg' value={selectedPerfil} onChange={(e) => setSelectedPerfil(e.target.value)}>
              <option value="sinPerfil">Seleccionar</option>
              <option value="MAR_PEQ">Perfil 4771 negro / mate</option>
              <option value="MAR_PED">Perfil 4771 dorado</option>
              <option value="MAR_PEA">Perfil 4771 arena</option>
              <option value="MAR_ACN">Perfil 2798 negro / mate</option>
              <option value="MAR_N5M">Perfil 5103 mate</option>
              <option value="MAR_N5N">Perfil 5103 negro</option>
              <option value="MAR_N5B">Perfil 5103 blanco</option>
              <option value="MAR_N5C">Perfil 5103 arena</option>
              <option value="MAR_N5B">Perfil 5103 bronce</option>
              <option value="MAR_N5D">Perfil 5103 dorado</option>
            </select>
          </div>
          <div className='mb-2'>
            <label className='text-gray-700 font-bold mb-2' >Tipo de vidrio:</label>
            <select className="mt-2 border rounded-2xl w-full py-2 px-3 text-gray-700 font-semibold mb-2 hover:bg-default-200 focus:outline-none shadow-lg" value={selectedGlass} onChange={(e) => setSelectedGlass(e.target.value)}>
              <option value="sinVidrio">Sin Vidrio</option> {/* Nueva opción */}
              <option value="TRA_NOR">Vidrio incoloro 4 mm</option>
              <option value="VI5_INC">Vidrio incoloro templado 5 mm</option>
              <option value="COL_NOR">Vidrio bronce / gris 4 mm</option>
              <option value="COL_5MM">Vidrio bronce / gris 5 mm</option>
              <option value="COL_TEM">Vidrio bronce / gris templado 5 mm</option>
              <option value="BRO_REF">Vidrio bronce reflectivo 4 mm</option>
              <option value="BIE_NOR">Vidrio bienestar 5 mm</option>
              <option value="BIE_TEM">Vidrio bienestar templado 5 mm</option>
              <option value="VI4_ESM">Vidrio Esmerilado 4 mm</option>
              <option value="VI5_ESM">Vidrio Esmerilado 5 mm</option>
              <option value="LAM_SEG">Vidrio laminado 3 + 3 blanco coco</option>
              <option value="ESP_BRO">Espejo bronce 4 mm</option>
            </select>
            <h2 className="text-right text-xl font-bold">${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
          </div>
          <div className=''>
            <AddTableDoor doors={doors} onRemove={handleRemoveDoor} /> {/* Pass handleRemoveDoor */}
          </div>
          {/* Botón Agregar Puerta */}
          <div className="flex justify-between mb-6">
            <PrintTableDoor doors={doors} title={"Puerta de Cocina"} image={cocinaIMG} totalPrice={totalPrice} /> {/* Pass totalPrice prop */}
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
          selectedPerfil={selectedPerfil}
        />
        {/* Pass useCalculoPrecios as a prop */}
      </div>
    </>
  );
};

export default CocinasCotizador;
