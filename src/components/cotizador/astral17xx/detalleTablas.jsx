import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import PropTypes from "prop-types";
import CotizadorAdd from "../CotizadorAdd";

const DetalleTablas = ({ calculatedValues, dimensions, onAddDoor, onAccessoryChange, selectedAccessories, useCalculoPrecios }) => {
    const {
        totalWidth,
        doubleHeight,
        cabezalastPrice,
        sillarastPrice,
        jambaastPrice,
        horizontalSuperiorastPrice,
        horizontalInferiorMovilastPrice,
        traslapeastPrice,
        engancheastPrice,
        empaqueastPrice,
        tornillosPrice,
        siliconaPrice,
        empaqueastHeight,
        empaqueastWidth,
        felpaPrice,
        totalFelpa,
        kitCierreastPrice,
        cubetaAngeoPrice,
        rodamiento80astPrice,
        rodamiento40astPrice,
        cajaDeflectoraPrice,
        rodamientoNave22astPrice,
        guiaSuperiorangeoPrice
    } = calculatedValues || {};

    return (
        <>
            <div className="parts-list">
                <strong><h1>ASTRAL 1.7 XX</h1></strong>
                <Table aria-label="Tabla Marco">
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
                            <TableCell>{totalWidth} mm </TableCell>
                            <TableCell>${cabezalastPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><strong>Sillar un Riel:</strong></TableCell>
                            <TableCell>{totalWidth} mm</TableCell>
                            <TableCell>${sillarastPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell><strong>Jamba:</strong></TableCell>
                            <TableCell>{doubleHeight} mm (2)</TableCell>
                            <TableCell>${jambaastPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <br />
                <Table aria-label="Tabla Nave">
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
                            <TableCell>{totalWidth} mm </TableCell>
                            <TableCell>${horizontalSuperiorastPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><strong>Horizontal Inferior Movil:</strong></TableCell>
                            <TableCell>{totalWidth} mm</TableCell>
                            <TableCell>${horizontalInferiorMovilastPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell><strong>Traslape:</strong></TableCell>
                            <TableCell>{doubleHeight} mm (2) </TableCell>
                            <TableCell>${traslapeastPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="5">
                            <TableCell><strong>Enganche:</strong></TableCell>
                            <TableCell>{doubleHeight} mm (2)</TableCell>
                            <TableCell>${engancheastPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <br />
                <Table aria-label="Tabla Accesorios">
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
                            <TableCell><input
                                type="checkbox"
                                checked={selectedAccessories.includes('kitCierreast')}
                                onChange={() => onAccessoryChange('kitCierreast')}
                            />
                                <strong>Kit Cierre</strong>
                            </TableCell>
                            <TableCell>${kitCierreastPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('rodamiento80ast')}
                                    onChange={() => onAccessoryChange('rodamiento80ast')}
                                />
                                <strong>Rodamiento 80 Kilos en Agujas</strong>
                            </TableCell>
                            <TableCell>${rodamiento80astPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('rodamiento40ast')}
                                    onChange={() => onAccessoryChange('rodamiento40ast')}
                                />
                                <strong>Rodamiento 40 Kilos en Bolas</strong>
                            </TableCell>
                            <TableCell>${rodamiento40astPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="5">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('cubetaAngeo')}
                                    onChange={() => onAccessoryChange('cubetaAngeo')}
                                />
                                <strong>Cubeta de Angeo Negra</strong>
                            </TableCell>
                            <TableCell>${cubetaAngeoPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="6">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('cajaDeflectora')}
                                    onChange={() => onAccessoryChange('cajaDeflectora')}
                                />
                                <strong>Caja Deflectora</strong>
                            </TableCell>
                            <TableCell>${cajaDeflectoraPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="7">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('rodamientoNave22ast')}
                                    onChange={() => onAccessoryChange('rodamientoNave22ast')}
                                />
                                <strong>Rodamiento 22 Kilos en Bolas Para Nave</strong>
                            </TableCell>
                            <TableCell>${rodamientoNave22astPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="8">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('guiaSuperiorangeo')}
                                    onChange={() => onAccessoryChange('guiaSuperiorangeo')}
                                />
                                <strong>Guia Superior Angeo Linea Universal</strong>
                            </TableCell>
                            <TableCell>${guiaSuperiorangeoPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <br />
                <Table aria-label="Table Utilitarios">
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
                <Table aria-label="Tabla Empaque">
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
                            <TableCell>{empaqueastHeight} mm
                                <br />
                                {empaqueastWidth} mm
                            </TableCell>
                            <TableCell>${empaqueastPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><strong>Felpa 5.00 x 7.00</strong></TableCell>
                            <TableCell>{totalFelpa} mm</TableCell>
                            <TableCell>${felpaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <br />
                <CotizadorAdd dimensions={dimensions} onAddDoor={onAddDoor}  useCalculoPrecios={useCalculoPrecios} selectedAccessories={selectedAccessories}/>
            </div>
        </>
    );
};

DetalleTablas.propTypes = {
    calculatedValues: PropTypes.shape({
        totalWidth: PropTypes.number,
        doubleHeight: PropTypes.number,
        cabezalastPrice: PropTypes.number,
        sillarastPrice: PropTypes.number,
        jambaastPrice: PropTypes.number,
        horizontalSuperiorastPrice: PropTypes.number,
        horizontalInferiorMovilastPrice: PropTypes.number,
        traslapeastPrice: PropTypes.number,
        engancheastPrice: PropTypes.number,
        kitCierreastPrice: PropTypes.number,
        cubetaAngeoPrice: PropTypes.number,
        rodamiento80astPrice: PropTypes.number,
        rodamiento40astPrice: PropTypes.number,
        cajaDeflectoraPrice: PropTypes.number,
        rodamientoNave22astPrice: PropTypes.number,
        guiaSuperiorangeoPrice: PropTypes.number,
    }),
    dimensions: PropTypes.object.isRequired,
    onAddDoor: PropTypes.func.isRequired,
    onAccessoryChange: PropTypes.func.isRequired,
    selectedAccessories: PropTypes.array.isRequired,
    useCalculoPrecios: PropTypes.func.isRequired
};

export default DetalleTablas;