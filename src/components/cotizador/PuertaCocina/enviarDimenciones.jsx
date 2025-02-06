import '../../../css/colosal.css'; // Archivo CSS para estilos
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import useCalculoPrecios from './useCalculoPrecios';

const EnviarDimensionesCocinas = ({ onDimensionsChange }) => {
  const [dimensions, setDimensions] = useState({ width: '', height: '' });

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

  const { width, height } = dimensions;

  return (
    <>
      <div className="dimensions-form">
        <label>
          Alto (mm):
          <input
            type="number"
            name="height"
            value={height}
            onChange={handleChange}
            placeholder="00"
          />
        </label>
        <label>
          Ancho (mm):
          <input
            type="number"
            name="width"
            value={width}
            onChange={handleChange}
            placeholder="00"
          />
        </label>
      </div>
    </>
  );
};

EnviarDimensionesCocinas.propTypes = {
  // setTotalPrice: PropTypes.func.isRequired, // Removed this line
  onDimensionsChange: PropTypes.func.isRequired,
};

export default EnviarDimensionesCocinas;
