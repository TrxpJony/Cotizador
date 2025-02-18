import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import PropTypes from 'prop-types';
import CotizadorAdd from '../../../components/cotizador/CotizadorAdd';

const DetalleTablas = ({ calculatedValues, dimensions, onAddDoor, onAccessoryChange, selectedAccessories, useCalculoPrecios }) => {
    const {
        cuadHeight,
        marcoPerimetralTresCol345,
        perimetralNaveCol345,
        marcoPerimetralTresCol345Price,
        perimetralNaveCol345Price,
        engancheCol345Price,
        empaquecolPrice,
        tornillosPrice,
        siliconaPrice,
        empaquecolHeight,
        empaquecolWidth,
        felpaPrice,
        totalFelpa,
        kitCierrecol345Price,
        kitCierreConLlavecol345Price,
        Kit8Escuadrascol345Price,
        kit4Anclascol345Price,
        kit4Alzacol345Price,
        kit4Tapacol345Price,
        kit2Cortavientoscol345Price,
        kit4Seguroscol345Price,
        cubetaAngeoPrice,
        rodamientoSimple70colPrice,
        rodamientoDoble140colPrice,
        cajaDeflectoraPrice,
    } = calculatedValues || {};

    return (
        <>
            <div className="parts-list">
                <strong><h1>COLOSAL 345 XXX</h1></strong>
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
                            <TableCell><strong>Marco Perimetral:</strong></TableCell>
                            <TableCell>{marcoPerimetralTresCol345} mm (4)</TableCell>
                            <TableCell>${marcoPerimetralTresCol345Price?.toFixed(2)}</TableCell>
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
                            <TableCell><strong>Perimetral Nave:</strong></TableCell>
                            <TableCell>{perimetralNaveCol345} mm (12)</TableCell>
                            <TableCell>${perimetralNaveCol345Price?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><strong>Enganche:</strong></TableCell>
                            <TableCell>{cuadHeight} mm (2)</TableCell>
                            <TableCell>${engancheCol345Price?.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <br />
                <Table aria-label="Tabla Accessorios">
                    <TableHeader>
                        <TableColumn><h1>Accessorios</h1></TableColumn>
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
                                    checked={selectedAccessories.includes('kitCierrecol345')}
                                    onChange={() => onAccessoryChange('kitCierrecol345')}
                                />
                                <strong>Kit de Cierre</strong>
                            </TableCell>
                            <TableCell>${kitCierrecol345Price?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('kitCierreConLlavecol345')}
                                    onChange={() => onAccessoryChange('kitCierreConLlavecol345')}
                                />
                                <strong>Kit de Cierre con Llave</strong>
                            </TableCell>
                            <TableCell>${kitCierreConLlavecol345Price?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="4">
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
                        <TableRow key="5">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('rodamientoSimple70col')}
                                    onChange={() => onAccessoryChange('rodamientoSimple70col')}
                                />
                                <strong>Rodamiento Simple en Agujas 70 Kilos</strong>
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
                                <strong>Rodamiento Doble en Agujas 140 Kilos</strong>
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
                        <TableRow key="8">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('Kit8Escuadrascol345')}
                                    onChange={() => onAccessoryChange('Kit8Escuadrascol345')}
                                />
                                <strong>Kit 8 Escuadras de Alineacion</strong>
                            </TableCell>
                            <TableCell>${Kit8Escuadrascol345Price?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="9">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('kit4Anclascol345')}
                                    onChange={() => onAccessoryChange('kit4Anclascol345')}
                                />
                                <strong>Kit 4 Anclas Esquinero</strong>
                            </TableCell>
                            <TableCell>${kit4Anclascol345Price?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="10">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('kit4Alzacol345')}
                                    onChange={() => onAccessoryChange('kit4Alzacol345')}
                                />
                                <strong>Kit 4 Alza Guia/Tope Hoja Fija/Movil</strong>
                            </TableCell>
                            <TableCell>${kit4Alzacol345Price?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="11">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('kit4Tapacol345')}
                                    onChange={() => onAccessoryChange('kit4Tapacol345')}
                                />
                                <strong>Kit 4 Tapa y Tapeta Enganche</strong>
                            </TableCell>
                            <TableCell>${kit4Tapacol345Price?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="12">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('kit2Cortavientoscol345')}
                                    onChange={() => onAccessoryChange('kit2Cortavientoscol345')}
                                />
                                <strong>Kit 2 Cortavientos</strong>
                            </TableCell>
                            <TableCell>${kit2Cortavientoscol345Price?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="13">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('kit4seguroscol345')}
                                    onChange={() => onAccessoryChange('kit4seguroscol345')}
                                />
                                <strong>Kit 4 Seguros de Hoja Fija</strong>
                            </TableCell>
                            <TableCell>${kit4Seguroscol345Price?.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <br />
                <Table aria-label="Tabla Utilitarios">
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
                            <TableCell><strong>Silicona:</strong></TableCell>
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
                                Empaque (Ancho) :</strong></TableCell>
                            <TableCell>{empaquecolHeight} mm
                                <br /> {empaquecolWidth} mm
                            </TableCell>
                            <TableCell>${empaquecolPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><strong>Felpa 5.00 x 7.00</strong></TableCell>
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

DetalleTablas.propTypes = {
    calculatedValues: PropTypes.shape({
        doubleHeight: PropTypes.number,
        cuadHeight: PropTypes.number,
        marcoPerimetralTrescol345: PropTypes.number,
        perimetralNaveCol345: PropTypes.number,
        marcoPerimetralTresCol345Price: PropTypes.number,
        engancheCol345Price: PropTypes.number,
        empaquecolPrice: PropTypes.number,
        tornillosPrice: PropTypes.number,
        siliconaPrice: PropTypes.number,
        empaquecolHeight: PropTypes.number,
        empaquecolWidth: PropTypes.number,
        felpaPrice: PropTypes.number,
        totalFelpa: PropTypes.number,
        kitCierrecol345Price: PropTypes.number,
        kitCierreConLlavecol345Price: PropTypes.number,
        Kit8Escuadrascol345Price: PropTypes.number,
        kit4Anclascol345Price: PropTypes.number,
        kit4alzacol345Price: PropTypes.number,
        kit4Tapacol345Price: PropTypes.number,
        kit2Cortavientoscol345Price: PropTypes.number,
        kit4Seguroscol345Price: PropTypes.number,
        cubetaAngeoPrice: PropTypes.number,
        rodamientoSimple70colPrice: PropTypes.number,
        rodamientoDoble140colPrice: PropTypes.number,
        cajaDeflectoraPrice: PropTypes.number
    }),
    dimensions: PropTypes.object.isRequired,
    onAddDoor: PropTypes.func.isRequired,
    onAccessoryChange: PropTypes.func.isRequired,
    selectedAccessories: PropTypes.array.isRequired,
    useCalculoPrecios: PropTypes.func.isRequired
};

export default DetalleTablas;