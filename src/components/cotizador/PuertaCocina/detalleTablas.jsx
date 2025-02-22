import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import PropTypes from 'prop-types';
import CotizadorAdd from '../../../components/cotizador/CotizadorAdd'; // Import CotizadorAdd
import { useState } from 'react';

const DetalleTablasCocinas = ({ calculatedValues, dimensions, onAddDoor, onAccessoryChange, selectedAccessories, useCalculoPrecios, selectedGlass }) => {

    const {
        marcoCocinaPrice,
        escuadrasCocinaPrice,
        escuadrasCocinaUnidadPrice,
        perfilNegroCocinaPrice,
        perfilMateCocinaPrice,
        marcoCocina,
        vidrioPrice, // Agregamos el precio del vidrio
        area // Agregamos el área del vidrio
    } = calculatedValues || {};

    const [escuadraCantidad, setEscuadraCantidad] = useState(1);

    const handleCheckboxChange = (accessory) => {
        if (accessory === "escuadrasCocinaUnidad") {
            onAccessoryChange(accessory, escuadraCantidad);
        } else {
            onAccessoryChange(accessory, 1); // Accesorios sin cantidad específica
        }
    };

    const handleCantidadChange = (e) => {
        const value = Math.max(1, Number(e.target.value));
        setEscuadraCantidad(value);

        if (selectedAccessories.includes("escuadrasCocinaUnidad")) {
            onAccessoryChange({ ...selectedAccessories, escuadrasCocinaUnidad: value });
        }
    };


    return (
        <>
            <div className="parts-list">
                <strong><h1>PUERTA COCINA CON BATIENTE DE 1CM</h1></strong>
                <Table aria-label="TABLA MARCO">
                    <TableHeader>
                        <TableColumn><h1>Marco</h1></TableColumn>
                        <TableColumn></TableColumn>
                        <TableColumn></TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell><strong><h2>Pieza</h2></strong></TableCell>
                            <TableCell><strong><h2>Tamaño</h2></strong></TableCell>
                            <TableCell><strong><h2>Precio</h2></strong></TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell><strong>Marco:</strong></TableCell>
                            <TableCell>{marcoCocina} mm</TableCell>
                            <TableCell>${marcoCocinaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <br />

                <Table aria-label="TABLA ACCESORIOS">
                    <TableHeader>
                        <TableColumn><h1>ACCESORIOS</h1></TableColumn>

                        <TableColumn></TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell><strong><h2>Pieza</h2></strong></TableCell>
                            <TableCell><strong><h2>Precio</h2></strong></TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('escuadrasCocina')}
                                    onChange={() => onAccessoryChange('escuadrasCocina')}
                                />
                                <strong>Kit 4 Escuadras para Puerta Cocina</strong>
                            </TableCell>
                            <TableCell>${escuadrasCocinaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('escuadrasCocinaUnidad')}
                                    onChange={() => handleCheckboxChange('escuadrasCocinaUnidad')}
                                />
                                <strong>Unidad de Escuadra para Puerta Cocina</strong>
                                <input
                                    type="number"
                                    min="1"
                                    value={escuadraCantidad}
                                    onChange={handleCantidadChange}
                                    style={{ width: "50px", marginLeft: "10px" }}
                                />
                            </TableCell>
                            <TableCell>${(escuadrasCocinaUnidadPrice * escuadraCantidad).toFixed(2)}</TableCell>
                        </TableRow>

                        <TableRow key="4">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('perfilNegroCocina')}
                                    onChange={() => onAccessoryChange('perfilNegroCocina')}
                                />
                                <strong>Perfil 6 mtr Negro Puerta Cocina</strong>
                            </TableCell>
                            <TableCell>${perfilNegroCocinaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="5">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('perfilMateCocina')}
                                    onChange={() => onAccessoryChange('perfilMateCocina')}
                                />
                                <strong>Perfil 6 mtr Mate Puerta Cocina</strong>
                            </TableCell>
                            <TableCell>${perfilMateCocinaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <br />
                <Table aria-label="TABLA VIDRIO">
                    <TableHeader>
                        <TableColumn><h1>Vidrio</h1></TableColumn>
                        <TableColumn></TableColumn>
                        <TableColumn></TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell><strong><h2>Pieza</h2></strong></TableCell>
                            <TableCell><strong><h2>Área (m²)</h2></strong></TableCell>
                            <TableCell><strong><h2>Precio</h2></strong></TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell><strong>Vidrio:</strong></TableCell>
                            <TableCell>{area?.toFixed(2)} m²</TableCell>
                            <TableCell>${vidrioPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <br />
                <CotizadorAdd
                    dimensions={dimensions}
                    onAddDoor={onAddDoor}
                    useCalculoPrecios={useCalculoPrecios}
                    selectedAccessories={selectedAccessories}
                    selectedGlass={selectedGlass} // ✅ Ahora lo estamos pasando a CotizadorAdd
                />
            </div>

        </>
    );
};

DetalleTablasCocinas.propTypes = {
    calculatedValues: PropTypes.shape({
        marcoCocinaPrice: PropTypes.number,
        escuadrasCocinaPrice: PropTypes.number,
        perfilNegroCocinaPrice: PropTypes.number,
    }),
    dimensions: PropTypes.object.isRequired,
    onAddDoor: PropTypes.func.isRequired,
    onAccessoryChange: PropTypes.func.isRequired,
    selectedAccessories: PropTypes.array.isRequired,
    useCalculoPrecios: PropTypes.func.isRequired,
    selectedGlass: PropTypes.string.isRequired, 
};

export default DetalleTablasCocinas;
