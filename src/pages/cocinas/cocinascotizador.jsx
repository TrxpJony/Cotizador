import '../../css/colosal.css';
import EnviarDimensiones from '../../components/cotizador/PuertaCocina/enviarDimenciones';
import useCalculoPrecios from '../../components/cotizador/PuertaCocina/useCalculoPrecios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddTableDoor from '../../components/cotizador/addTableDoor'; // Import the new component
import PrintTableDoor from '../../components/cotizador/PrintTableDoor'; // Import the new component
import DetalleTablas from '../../components/cotizador/PuertaCocina/detalleTablas';


const CocinasCotizador = () => {
  const navigate = useNavigate(); // Inicializar useNavigate
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [doors, setDoors] = useState([]); // State to hold doors
  const [selectedAccessories, setSelectedAccessories] = useState([]); // State to hold selected accessories
  const cocinaIMG = 'https://res.cloudinary.com/dils6fuig/image/upload/v1738787741/img_catalogo/producto_coci2_1738787740325.png'; // Importar la imagen
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
      <div className="door-container">
        <div className="door-frame">
          {/* Imagen */}
          <img src={cocinaIMG} alt="Puerta Corrediza Colosal" className="door-image" />
          <EnviarDimensiones onDimensionsChange={handleDimensionsChange} />
          <h2 className="text-right text-4xl font-bold">${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
          <br />
          <AddTableDoor doors={doors} /> {/* Use the new component */}
          <PrintTableDoor doors={doors} title={"Puerta Corrediza Colosal 2.6"} image={cocinaIMG} totalPrice={totalPrice} /> {/* Pass totalPrice prop */}
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
        <DetalleTablas 
          calculatedValues={calculatedValues} 
          dimensions={dimensions} 
          onAddDoor={handleAddDoor} 
          onAccessoryChange={handleAccessoryChange} 
          selectedAccessories={selectedAccessories} 
          useCalculoPrecios={useCalculoPrecios} 
        /> {/* Pass useCalculoPrecios as a prop */}
      </div>
    </>
  );
};

export default CocinasCotizador;
