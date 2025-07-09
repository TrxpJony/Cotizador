import '../../../css/colosal.css'; // Archivo CSS para estilos
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import useCalculoPrecios from './useCalculoPrecios';

const EnviarDimensionesCocinas = ({ onDimensionsChange }) => {
  const [dimensions, setDimensions] = useState({
    width: '',
    height: '',
    width2: '',
    cantidad: 1,
  });

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

  const { width, height, width2, cantidad } = dimensions;

  return (
    <>

      <div className="grid grid-cols-2 gap-2 mt-2">

        <input
          name="height"
          value={height}
          onChange={handleChange}
          placeholder="Alto (mm)"
          className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:ring-1 focus:ring-cyan-500 text-gray-700  mb-2 hover:bg-default-200 focus:outline-none"
        />

        <input
          name="width"
          value={width}
          onChange={handleChange}
          placeholder="Ancho (mm)"
          className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:ring-1 focus:ring-cyan-500 text-gray-700  mb-2 hover:bg-default-200 focus:outline-none"
        />

        <input
          name="width2"
          value={width2}
          onChange={handleChange}
          placeholder="Ancho de nave (mm)"
          className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:ring-1 focus:ring-cyan-500 text-gray-700  mb-2 hover:bg-default-200 focus:outline-none"
        />

        <input
          name="cantidad"
          type="number"
          min="1"
          value={cantidad}
          onChange={handleChange}
          placeholder="Cantidad de naves"
          className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:ring-1 focus:ring-cyan-500 text-gray-700  mb-2 hover:bg-default-200 focus:outline-none"
        />
      </div>
    </>
  );
};

EnviarDimensionesCocinas.propTypes = {
  // setTotalPrice: PropTypes.func.isRequired, // Removed this line
  onDimensionsChange: PropTypes.func.isRequired,
};

export default EnviarDimensionesCocinas;
