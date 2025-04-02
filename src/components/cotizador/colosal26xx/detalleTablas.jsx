import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import PropTypes from 'prop-types';
import CotizadorAdd from '../../../components/cotizador/CotizadorAdd'; // Import CotizadorAdd

const DetalleTablas = ({ calculatedValues, dimensions, onAddDoor, onAccessoryChange, selectedAccessories, useCalculoPrecios }) => { // Add new props
    const {
        totalWidth,
        doubleHeight,
        halfWidth,
        doubleHalfWidth,
        cabezalcolPrice,
        sillarcolPrice,
        jambacolPrice,
        horizontalSuperiorcolPrice,
        guiaSimplecolPrice,
        horizontalInferiorMovilcolPrice,
        traslapecolPrice,
        enganchecolPrice,
        kitCierrecolPrice,
        kitCierreConLlavecolPrice,
        cubetaAngeoPrice,
        rodamientoSimple70colPrice,
        rodamientoDoble140colPrice,
        cajaDeflectoraPrice,
        tornillosPrice,
        siliconaPrice,
        empaquecolPrice,
        empaquecolHeight,
        empaquecolWidth,
        felpaPrice,
        totalFelpa,
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
                            <TableCell>${cabezalcolPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><strong>Sillar:</strong></TableCell>
                            <TableCell>{totalWidth} mm</TableCell>
                            <TableCell>${sillarcolPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell><strong>Jamba:</strong></TableCell>
                            <TableCell>{doubleHeight} mm (2)</TableCell>
                            <TableCell>${jambacolPrice?.toFixed(2)}</TableCell>
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
                            <TableCell>${horizontalSuperiorcolPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><strong>Horizontal Inferior Móvil:</strong> </TableCell>
                            <TableCell>{halfWidth} mm </TableCell>
                            <TableCell>${horizontalInferiorMovilcolPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell><strong>Guia Simple:</strong></TableCell>
                            <TableCell>{totalWidth} mm</TableCell>
                            <TableCell>${guiaSimplecolPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="5">
                            <TableCell><strong>Traslape:</strong> </TableCell>
                            <TableCell>{doubleHeight} mm (2) </TableCell>
                            <TableCell>${traslapecolPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="6">
                            <TableCell><strong>Enganche:</strong> </TableCell>
                            <TableCell>{doubleHeight} mm (2) </TableCell>
                            <TableCell>${enganchecolPrice?.toFixed(2)}</TableCell>
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
                                    checked={selectedAccessories.includes('kitCierrecol')}
                                    onChange={() => onAccessoryChange('kitCierrecol')}
                                />
                                <strong>Kit Cierre</strong>
                            </TableCell>
                            <TableCell>${kitCierrecolPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('kitCierreConLlavecol')}
                                    onChange={() => onAccessoryChange('kitCierreConLlavecol')}
                                />
                                <strong>Kit Cierre con Llave</strong>
                            </TableCell>
                            <TableCell>${kitCierreConLlavecolPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('cubetaAngeo')}
                                    onChange={() => onAccessoryChange('cubetaAngeo')}
                                />
                                <strong>Cubeta Angeo</strong>
                            </TableCell>
                            <TableCell>${cubetaAngeoPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="5">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('rodamientoSimple70col')}
                                    onChange={() => onAccessoryChange('rodamientoSimple70col')}
                                />
                                <strong>Rodamiento Simple 70</strong>
                            </TableCell>
                            <TableCell>${rodamientoSimple70colPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="6">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('rodamientoDoble140col')}
                                    onChange={() => onAccessoryChange('rodamientoDoble140col')}
                                />
                                <strong>Rodamiento Doble 140</strong>
                            </TableCell>
                            <TableCell>${rodamientoDoble140colPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="7">
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
                            <TableCell>{empaquecolHeight} mm
                                <br /> {empaquecolWidth} mm
                            </TableCell>
                            <TableCell>${empaquecolPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><strong>Felpa 5.00 x 7.00:</strong></TableCell>
                            <TableCell>{totalFelpa} mm</TableCell>
                            <TableCell>${felpaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <br />
                <CotizadorAdd dimensions={dimensions} onAddDoor={onAddDoor} useCalculoPrecios={useCalculoPrecios} selectedAccessories={selectedAccessories} /> {/* Pass selectedAccessories as a prop */}
            </div>

        </>
    );
};

DetalleTablas.propTypes = {
    calculatedValues: PropTypes.shape({
        totalWidth: PropTypes.number,
        doubleHeight: PropTypes.number,
        halfWidth: PropTypes.number,
        doubleHalfWidth: PropTypes.number,
        cabezalcolPrice: PropTypes.number,
        sillarcolPrice: PropTypes.number,
        jambacolPrice: PropTypes.number,
        horizontalSuperiorcolPrice: PropTypes.number,
        guiaSimplecolPrice: PropTypes.number,
        horizontalInferiorMovilcolPrice: PropTypes.number,
        traslapecolPrice: PropTypes.number,
        enganchecolPrice: PropTypes.number,
        kitCierrecolPrice: PropTypes.number,
        kitCierreConLlavecolPrice: PropTypes.number,
        cubetaAngeoPrice: PropTypes.number,
        rodamientoSimple70colPrice: PropTypes.number,
        rodamientoDoble140colPrice: PropTypes.number,
        cajaDeflectoraPrice: PropTypes.number
    }),
    dimensions: PropTypes.object.isRequired,
    onAddDoor: PropTypes.func.isRequired,
    onAccessoryChange: PropTypes.func.isRequired,
    selectedAccessories: PropTypes.array.isRequired,
    useCalculoPrecios: PropTypes.func.isRequired // Add prop type for useCalculoPrecios
};

export default DetalleTablas;
