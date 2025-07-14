import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import PropTypes from 'prop-types';
import CotizadorAdd from '../CotizadorAdd';

const DetalleTablas = ({ calculatedValues, dimensions, onAddDoor, selectedAccessories, useCalculoPrecios, selectedGlass, selectedAlfajia }) => {
    const {
        ALK416_mm,
        ALK416Price,
        ALK177_mm,
        ALK177Price,
        ALK176_mm,
        ALK176Price,
        EmpaquePrice,
        Empaque_mm,
        vidrioPrice,
        tornillosPrice,
        brazoPrice,
        manijaPrice,
        area,
    } = calculatedValues || {};

    return (
        <>
            <div className="parts-list">
                <Table aria-label="TABLA PERFILES">
                    <TableHeader>
                        <TableColumn><h1>Perfil</h1></TableColumn>
                        <TableColumn><h1>Longitud (mm)</h1></TableColumn>
                        <TableColumn><h1>Precio</h1></TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell><strong>ALK416</strong></TableCell>
                            <TableCell>{ALK416_mm} mm</TableCell>
                            <TableCell>${ALK416Price?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell><strong>ALK177</strong></TableCell>
                            <TableCell>{ALK177_mm} mm</TableCell>
                            <TableCell>${ALK177Price?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><strong>ALK176</strong></TableCell>
                            <TableCell>{ALK176_mm} mm</TableCell>
                            <TableCell>${ALK176Price?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell><strong>Empaque</strong></TableCell>
                            <TableCell>{Empaque_mm} mm</TableCell>
                            <TableCell>${EmpaquePrice}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <br />
                <Table aria-label="TABLA ACCESORIOS">
                    <TableHeader>
                        <TableColumn><h1>Accesorios</h1></TableColumn>
                        <TableColumn></TableColumn>
                        <TableColumn></TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell><strong><h2>Pieza</h2></strong></TableCell>
                            <TableCell><strong><h2>Cantidad</h2></strong></TableCell>
                            <TableCell><strong><h2>Precio</h2></strong></TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell><strong>Manija:</strong></TableCell>
                            <TableCell>1</TableCell>
                            <TableCell>${manijaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><strong>brazos:</strong></TableCell>
                            <TableCell>2</TableCell>
                            <TableCell>${brazoPrice?.toFixed(2)}</TableCell>
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
                            <TableCell><strong>Tornillos:</strong></TableCell>
                            <TableCell>${tornillosPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <br />
                <CotizadorAdd
                    dimensions={dimensions}
                    onAddDoor={onAddDoor}
                    useCalculoPrecios={useCalculoPrecios}
                    selectedAccessories={selectedAccessories}
                    selectedGlass={selectedGlass}
                    selectedAlfajia={selectedAlfajia}
                />
            </div>
        </>
    );
};

DetalleTablas.propTypes = {
    calculatedValues: PropTypes.object,
    dimensions: PropTypes.object.isRequired,
    onAddDoor: PropTypes.func.isRequired,
    onAccessoryChange: PropTypes.func.isRequired,
    selectedAccessories: PropTypes.array.isRequired,
    useCalculoPrecios: PropTypes.func.isRequired,
    selectedGlass: PropTypes.string.isRequired,
    selectedAlfajia: PropTypes.string.isRequired,
};

export default DetalleTablas;