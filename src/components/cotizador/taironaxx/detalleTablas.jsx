import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import PropTypes from "prop-types";
import CotizadorAdd from "../CotizadorAdd";

const DetalleTablas = ({ calculatedValues, dimensions, onAddDoor, onAccessoryChange, selectedAccessories, useCalculoPrecios }) => {
    const {
        doubleTotalDimensions,
        cuadHalfTotalDimensions,
        totalHeight,
        marcoPerimetralTaironaPrice,
        perimetralNaveTaironaPrice,
        pisaVidrioTaironaPrice,
        verticalHorizontalesCaTaironaPrice,
        empaqueTaironaPrice,
        adaptadorTaironaPrice,
        felpaPrice,
        tornillosPrice,
        siliconaPrice,
        empaqueTaironaHeight,
        empaqueTaironaWidth,
        totalFelpa,
        kitCierreTaironaPrice,
        kitCierreConLlaveTaironaPrice,
        limitador150TaironaPrice,
        limitador220TaironaPrice,
        escuadraEnsambleTaironaPrice,
        escuadraEnsambleHTaironaPrice,
        bisagra2TaironaPrice,
        bisagra3TaironaPrice,
        bisagraOcultaPrice,
        cierreHTaironaPrice,
        soporteHTaironaPrice,
    } = calculatedValues || {};

    return (
        <>
            <div className="parts-list">
                <strong><h1>SISTEMA TAIRONA XX</h1></strong>
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
                            <TableCell>{doubleTotalDimensions} mm</TableCell>
                            <TableCell>${marcoPerimetralTaironaPrice?.toFixed(2)}</TableCell>
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
                            <TableCell><strong>Perimetral de Nave:</strong></TableCell>
                            <TableCell>{cuadHalfTotalDimensions} mm</TableCell>
                            <TableCell>${perimetralNaveTaironaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><strong>Pisavidrio:</strong></TableCell>
                            <TableCell>{cuadHalfTotalDimensions} mm</TableCell>
                            <TableCell>${pisaVidrioTaironaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell><strong>Vertical Horizontales Vidrio Camara</strong></TableCell>
                            <TableCell>{cuadHalfTotalDimensions} mm</TableCell>
                            <TableCell>${verticalHorizontalesCaTaironaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="5">
                            <TableCell><strong>Adaptador Dieseño XX:</strong></TableCell>
                            <TableCell>{totalHeight} mm</TableCell>
                            <TableCell>${adaptadorTaironaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <br />
                <Table aria-label="Tabla Accessoros">
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
                                    checked={selectedAccessories.includes('kitCierreTairona')}
                                    onChange={() => onAccessoryChange('kitCierreTairona')}
                                />
                                <strong>Kit Manija Bidireccional con Transmision</strong>
                            </TableCell>
                            <TableCell>${kitCierreTaironaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('kitCierreConLlaveTairona')}
                                    onChange={() => onAccessoryChange('kitCierreConLlaveTairona')}
                                />
                                <strong>Kit Manija Bidireccional con Transmision con Llave</strong>
                            </TableCell>
                            <TableCell>${kitCierreConLlaveTaironaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('limitador150Tairona')}
                                    onChange={() => onAccessoryChange('limitador150Tairona')}
                                />
                                <strong>Limitador de Apertura L = 150</strong>
                            </TableCell>
                            <TableCell>${limitador150TaironaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="5">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('limitador220Tairona')}
                                    onChange={() => onAccessoryChange('limitador220Tairona')}
                                />
                                <strong>Limitador de Apertura L = 220</strong>
                            </TableCell>
                            <TableCell>${limitador220TaironaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="6">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('escuadraEnsambleTairona')}
                                    onChange={() => onAccessoryChange('escuadraEnsambleTairona')}
                                />
                                <strong>Escuadra Ensamble Marco</strong>
                            </TableCell>
                            <TableCell>${escuadraEnsambleTaironaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="7">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('escuadraEnsambleHTairona')}
                                    onChange={() => onAccessoryChange('escuadraEnsambleHTairona')}
                                />
                                <strong>Escuadra Ensamble Hoja</strong>
                            </TableCell>
                            <TableCell>${escuadraEnsambleHTaironaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="8">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('bisagra2Tairona')}
                                    onChange={() => onAccessoryChange('bisagra2Tairona')}
                                />
                                <strong>Bisagra 2 Aletas Regulable Negra 120K:</strong>
                            </TableCell>
                            <TableCell>${bisagra2TaironaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="9">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('bisagra3Tairona')}
                                    onChange={() => onAccessoryChange('bisagra3Tairona')}
                                />
                                <strong>Bisagra 3 Aletas Negra 90K</strong>
                            </TableCell>
                            <TableCell>${bisagra3TaironaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="10">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('bisagraOculta')}
                                    onChange={() => onAccessoryChange('bisagraOculta')}
                                />
                                <strong>Bisagra Oculta de Ajuste</strong>
                            </TableCell>
                            <TableCell>${bisagraOcultaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="11">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('cierreHTairona')}
                                    onChange={() => onAccessoryChange('cierreHTairona')}
                                />
                                <strong>Cierre Hojas y Encuentros Regulables:</strong>
                            </TableCell>
                            <TableCell>${cierreHTaironaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="12">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('soporteHTairona')}
                                    onChange={() => onAccessoryChange('soporteHTairona')}
                                />
                                <strong>Soporte Compensador de Hoja:</strong>
                            </TableCell>
                            <TableCell>${soporteHTaironaPrice?.toFixed(2)}</TableCell>
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
                            <TableCell><strong><h1>Pecio</h1></strong></TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell><strong>Tornillos:</strong></TableCell>
                            <TableCell>${tornillosPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><strong>Silicona</strong></TableCell>
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
                                Empaque (Ancho):</strong></TableCell>
                            <TableCell>{empaqueTaironaHeight} mm
                                <br />
                                {empaqueTaironaWidth} mm
                            </TableCell>
                            <TableCell>${empaqueTaironaPrice?.toFixed(2)}</TableCell>
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
            </div >
        </>
    );
};

DetalleTablas.propTypes = {
    calculatedValues: PropTypes.shape({
        doubleTotalDimensions: PropTypes.number,
        cuadHalfTotalDimensions: PropTypes.number,
        totalHeight: PropTypes.number,
        marcoPerimetralTaironaPrice: PropTypes.number,
        perimetralNaveTaironaPrice: PropTypes.number,
        pisaVidrioTaironaPrice: PropTypes.number,
        verticalHorizontalesCaTaironaPrice: PropTypes.number,
        empaqueTaironaPrice: PropTypes.number,
        adaptadorTaironaPrice: PropTypes.number,
        felpaPrice: PropTypes.number,
        tornillosPrice: PropTypes.number,
        siliconaPrice: PropTypes.number,
        empaqueTaironaHeight: PropTypes.number,
        empaqueTaironaWidth: PropTypes.number,
        totalFelpa: PropTypes.number,
        kitCierreTaironaPrice: PropTypes.number,
        kitCierreConLlaveTaironaPrice: PropTypes.number,
        limitador150TaironaPrice: PropTypes.number,
        limitador220TaironaPrice: PropTypes.number,
        escuadraEnsambleTaironaPrice: PropTypes.number,
        escuadraEnsambleHTaironaPrice: PropTypes.number,
        bisagra2TaironaPrice: PropTypes.number,
        bisagra3TaironaPrice: PropTypes.number,
        bisagraOcultaPrice: PropTypes.number,
        cierreHTaironaPrice: PropTypes.number,
        soporteHTaironaPrice: PropTypes.number,
    }),
    dimensions: PropTypes.object.isRequired,
    onAddDoor: PropTypes.func.isRequired,
    onAccessoryChange: PropTypes.func.isRequired,
    selectedAccessories: PropTypes.array.isRequired,
    useCalculoPrecios: PropTypes.func.isRequired,
};

export default DetalleTablas;