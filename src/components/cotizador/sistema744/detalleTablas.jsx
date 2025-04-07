import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import PropTypes from 'prop-types';
import CotizadorAdd from '../../../components/cotizador/CotizadorAdd'; // Import CotizadorAdd

const DetalleTablas = ({ calculatedValues, dimensions, onAddDoor, onAccessoryChange, selectedAccessories, useCalculoPrecios, selectedGlass }) => { // Add new props
    const {
        totalWidth,
        doubleHeight,
        doubleHalfWidth,
        cabezal744Price,
        sillar744Price,
        jamba744Price,
        horizontalSuperior744Price,
        horizontalInferior744Price,
        traslape744Price,
        enganche744Price,
        kitCierre744Price,
        rodamientoSimple744Price,
        tornillosPrice,
        siliconaPrice,
        empaque744Price,
        empaque744Height,
        empaque744Width,
        felpaPrice,
        totalFelpa,
        vidrioPrice,
        area,
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
                            <TableCell><strong>Cabezal:</strong></TableCell>
                            <TableCell>{totalWidth} mm</TableCell>
                            <TableCell>${cabezal744Price?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><strong>Sillar:</strong></TableCell>
                            <TableCell>{totalWidth} mm</TableCell>
                            <TableCell>${sillar744Price?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell><strong>Jamba:</strong></TableCell>
                            <TableCell>{doubleHeight} mm (2)</TableCell>
                            <TableCell>${jamba744Price?.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <br />

                <Table aria-label="TABLA NAVE">
                    <TableHeader>
                        <TableColumn><h1>Nave</h1></TableColumn>
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
                            <TableCell><strong>Horizontal Superior:</strong></TableCell>
                            <TableCell>{doubleHalfWidth} mm (2)</TableCell>
                            <TableCell>${horizontalSuperior744Price?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><strong>Horizontal Inferior:</strong> </TableCell>
                            <TableCell>{doubleHalfWidth} mm </TableCell>
                            <TableCell>${horizontalInferior744Price?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell><strong>Traslape:</strong> </TableCell>
                            <TableCell>{doubleHeight} mm (2) </TableCell>
                            <TableCell>${traslape744Price?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="5">
                            <TableCell><strong>Enganche:</strong> </TableCell>
                            <TableCell>{doubleHeight} mm (2) </TableCell>
                            <TableCell>${enganche744Price?.toFixed(2)}</TableCell>
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
                                    checked={selectedAccessories.includes('kitCierre744')}
                                    onChange={() => onAccessoryChange('kitCierre744')}
                                />
                                <strong>Kit Cierre</strong>
                            </TableCell>
                            <TableCell>${kitCierre744Price?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('rodamientoSimple744')}
                                    onChange={() => onAccessoryChange('rodamientoSimple744')}
                                />
                                <strong>Rodamiento Simple 70</strong>
                            </TableCell>
                            <TableCell>${rodamientoSimple744Price?.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <br />
                <Table aria-label="Tabla Vidrio">
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
                        <TableRow key="2">
                            <TableCell><strong>Tornillos:</strong></TableCell>
                            <TableCell>${tornillosPrice?.toFixed(2)}</TableCell>
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
                        <TableRow key="2">
                            <TableCell><strong>Empaque (Alto):
                                <br />
                                Empaque (Ancho): </strong></TableCell>
                            <TableCell>{empaque744Height} mm
                                <br /> {empaque744Width} mm
                            </TableCell>
                            <TableCell>${empaque744Price?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><strong>Felpa 5.00 x 7.00:</strong></TableCell>
                            <TableCell>{totalFelpa} mm</TableCell>
                            <TableCell>${felpaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <br />
                <CotizadorAdd dimensions={dimensions} onAddDoor={onAddDoor} useCalculoPrecios={useCalculoPrecios} selectedAccessories={selectedAccessories} selectedGlass={selectedGlass} />
            </div>

        </>
    );
};

DetalleTablas.propTypes = {
    calculatedValues: PropTypes.shape({
        totalWidth: PropTypes.number,
        doubleHeight: PropTypes.number,
        doubleHalfWidth: PropTypes.number,
        cabezal744Price: PropTypes.number,
        sillar744Price: PropTypes.number,
        jamba744Price: PropTypes.number,
        horizontalSuperior744Price: PropTypes.number,
        horizontalInferior744Price: PropTypes.number,
        traslape744Price: PropTypes.number,
        enganche744Price: PropTypes.number,
        kitCierre744Price: PropTypes.number,
        rodamientoSimple744Price: PropTypes.number,
    }),
    dimensions: PropTypes.object.isRequired,
    onAddDoor: PropTypes.func.isRequired,
    onAccessoryChange: PropTypes.func.isRequired,
    selectedAccessories: PropTypes.array.isRequired,
    useCalculoPrecios: PropTypes.func.isRequired,
    selectedGlass: PropTypes.string.isRequired,
};

export default DetalleTablas;
