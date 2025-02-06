import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import PropTypes from 'prop-types';
import CotizadorAdd from '../../../components/cotizador/CotizadorAdd'; // Import CotizadorAdd

const DetalleTablas744 = ({ calculatedValues, dimensions, onAddDoor, onAccessoryChange, selectedAccessories, useCalculoPrecios }) => { // Add new props
    const {
        totalWidth,
        marcoCocinaPrice,
        siliconaPrice,
        felpaPrice,
        totalFelpa,
        escuadrasCocinaPrice,
        perfilNegroCocinaPrice,
    } = calculatedValues || {};

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
                            <TableCell><strong>Cabezal:</strong></TableCell>
                            <TableCell>{totalWidth} mm</TableCell>
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
                                    checked={selectedAccessories.includes('perfilNegroCocina')}
                                    onChange={() => onAccessoryChange('perfilNegroCocina')}
                                />
                                <strong>Perfil 6 mtr Negro Puerta Cocina</strong>
                            </TableCell>
                            <TableCell>${perfilNegroCocinaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <br />

                <Table aria-label="TABLA utilitarios">
                    <TableHeader>
                        <TableColumn><h1>Utilitarios</h1></TableColumn>

                        <TableColumn></TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell><strong><h2>Pieza</h2></strong></TableCell>
                            <TableCell><strong><h2>Precio</h2></strong></TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><strong>silicona:</strong></TableCell>
                            <TableCell>${siliconaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <br />

                <Table aria-label="TABLA EMPAQUE">
                    <TableHeader>
                        <TableColumn><h1>Empaque</h1></TableColumn>
                        <TableColumn></TableColumn>
                        <TableColumn></TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell><strong><h2>Pieza</h2></strong></TableCell>
                            <TableCell><strong><h2>Tamaño</h2></strong></TableCell>
                            <TableCell><strong><h2>Precio</h2></strong></TableCell>
                        </TableRow>
                          <TableRow key="3">
                                      <TableCell><strong>Felpa 5.00 x 7.00:</strong></TableCell>
                                      <TableCell>{totalFelpa} mm</TableCell>
                                      <TableCell>${felpaPrice?.toFixed(2)}</TableCell>
                                    </TableRow>
                    </TableBody>
                </Table>
                <br />
                <CotizadorAdd dimensions={dimensions} onAddDoor={onAddDoor} useCalculoPrecios={useCalculoPrecios} selectedAccessories={selectedAccessories} />
            </div>

        </>
    );
};

DetalleTablas744.propTypes = {
    calculatedValues: PropTypes.shape({
        totalWidth: PropTypes.number,     
        marcoCocinaPrice: PropTypes.number,
        escuadrasCocinaPrice: PropTypes.number,
        perfilNegroCocinaPrice: PropTypes.number,
    }),
    dimensions: PropTypes.object.isRequired,
    onAddDoor: PropTypes.func.isRequired,
    onAccessoryChange: PropTypes.func.isRequired,
    selectedAccessories: PropTypes.array.isRequired,
    useCalculoPrecios: PropTypes.func.isRequired
};

export default DetalleTablas744;
