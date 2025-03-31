import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import PropTypes from 'prop-types';
import CotizadorAdd from '../../../components/cotizador/CotizadorAdd'; // Import CotizadorAdd

const DetalleTablasCocinas = ({ calculatedValues, dimensions, onAddDoor, onAccessoryChange, selectedAccessories, useCalculoPrecios, selectedGlass }) => {

    const {
        marcoCocinaPrice,
        escuadrasCocinaPrice,
        manijaPuertaCocinaPrice,
        marcoCocina,
        vidrioPrice, // Agregamos el precio del vidrio
        area // Agregamos el área del vidrio
    } = calculatedValues || {};




    return (
        <>
            <div className="parts-list">
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
                        <TableColumn><h1>Accesorios</h1></TableColumn>

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
                                    checked={selectedAccessories.includes('manijaPuertaCocina')}
                                    onChange={() => {
                                        onAccessoryChange('manijaPuertaCocina');
                                    }}
                                />
                                <strong>Manija</strong>
                            </TableCell>
                            <TableCell>${manijaPuertaCocinaPrice?.toFixed(2)}</TableCell>
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
