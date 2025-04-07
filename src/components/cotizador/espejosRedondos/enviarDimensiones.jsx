import '../../../css/colosal.css'; // Archivo CSS para estilos
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import useCalculoPrecios from './useCalculoPrecios';

const EnviarDimensiones = ({ onDimensionsChange }) => {
  const [dimensions, setDimensions] = useState({Diameter: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newDimensions = {
      ...dimensions,
      [name]: value,
    };
    setDimensions(newDimensions);
    onDimensionsChange(newDimensions);
  };

  const { totalPrice } = useCalculoPrecios(dimensions);

  // Usamos useEffect para enviar el totalPrice al componente padre
  useEffect(() => {
    if (totalPrice !== undefined) {
      // setTotalPrice(totalPrice); // Removed this line
    }
  }, [totalPrice]);

  const { Diameter } = dimensions;

  return (
    <>
    
      <div className=" gap-2 mt-2">
          <input
            name="Diameter"
            value={Diameter}
            onChange={handleChange}
            placeholder="Diametro (mm)"
            className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:ring-1 focus:ring-cyan-500 text-gray-700  mb-2 hover:bg-default-200 focus:outline-none"
          />
      </div>
    </>
  );
};

EnviarDimensiones.propTypes = {
  // setTotalPrice: PropTypes.func.isRequired, // Removed this line
  onDimensionsChange: PropTypes.func.isRequired,
};

export default EnviarDimensiones;
