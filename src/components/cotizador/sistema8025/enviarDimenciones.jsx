import '../../../css/colosal.css';
import { useState, useEffect} from "react";
import PropTypes from 'prop-types';
import useCalculoPrecios from './useCalculoPrecios';

const EnviarDimensiones8025 = ({ onDimensionsChange }) => {
    const [dimensions, setDimensions] = useState({width: '', height: ''});

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

    useEffect(() => {
        if (totalPrice !== undefined) {
            //removed this line
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
    )
};

EnviarDimensiones8025.propTypes = {
    onDimensionsChange: PropTypes.func.isRequired,
};

export default EnviarDimensiones8025