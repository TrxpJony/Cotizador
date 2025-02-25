import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import PropTypes from "prop-types";
import CotizadorAdd from "../CotizadorAdd";

const DetalleTablas = ({ calculatedValues, dimensions, onAddDoor, onAccessoryChange, selectedAccessories, useCalculoPrecios }) => {
    const {
        doubleTotalDimensions,
        totalHeight,
        marcoPerimetralZinuPrice,
        divisorZinuPrice,
        perimetralNaveZinuPrice,
        pisaVidrioZinuPrice,
        verticalHorizontalesCaZinuPrice,
        empaqueZinuPrice,
        felpaPrice,
        tornillosPrice,
        siliconaPrice,
        empaqueZinuHeight,
        empaqueZinuWidth,
        totalFelpa,
        kitCierreZinuPrice,
        kitCierreConLlaveZinuPrice,
        limitador150ZinuPrice,
        limitador220ZinuPrice,
        escuadraEnsambleZinuPrice,
        escuadraEnsambleHZinuPrice,
        bisagra2ZinuPrice,
        cierreHZinuPrice,
        soporteHTaironaPrice,
        bisagraOcultaPrice,
        pletinaPoliamidaPrice,
    } = calculatedValues || {};

    return (
        <>
            <div className="parts-list">
                <strong><h1>SISTEMA ZINU OX</h1></strong>
                <Table aria-label="Tabla Marco">
                    <TableHeader>
                        <TableColumn><h1>Maroc</h1></TableColumn>
                        <TableColumn></TableColumn>
                        <TableColumn></TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell><strong><h1>Pieza</h1></strong></TableCell>
                            <TableCell><strong><h1>Tamaño</h1></strong></TableCell>
                            <TableCell><strong><h1>Precio</h1></strong></TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell><strong>Marco Perimetral:</strong></TableCell>
                            <TableCell>{doubleTotalDimensions} mm</TableCell>
                            <TableCell>${marcoPerimetralZinuPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><strong>Divisor Zinu:</strong></TableCell>
                            <TableCell>{totalHeight} mm</TableCell>
                            <TableCell>${divisorZinuPrice?.toFixed(2)}</TableCell>
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
                            <TableCell>{doubleTotalDimensions} mm</TableCell>
                            <TableCell>${perimetralNaveZinuPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><strong>Pisavidrio:</strong></TableCell>
                            <TableCell>{doubleTotalDimensions} mm</TableCell>
                            <TableCell>${pisaVidrioZinuPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell><strong>Vertical Horizontales Vidrio Camara:</strong></TableCell>
                            <TableCell>{doubleTotalDimensions} mm</TableCell>
                            <TableCell>${verticalHorizontalesCaZinuPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <br />
                <Table aria-label="tabla accessorios">
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
                                    checked={selectedAccessories.includes('kitCierreZinu')}
                                    onChange={() => onAccessoryChange('kitCierreZinu')}
                                />
                                <strong>Kit Manija Bidireccional con Transmision</strong>
                            </TableCell>
                            <TableCell>${kitCierreZinuPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('kitCierreConLlaveZinu')}
                                    onChange={() => onAccessoryChange('kitCierreConLlaveZinu')}
                                />
                                <strong>Kit Manija Bidireccional con Transmision con Llave</strong>
                            </TableCell>
                            <TableCell>${kitCierreConLlaveZinuPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('limitador150Zinu')}
                                    onChange={() => onAccessoryChange('limitador150Zinu')}
                                />
                                <strong>Limitador de Apertura L = 150</strong>
                            </TableCell>
                            <TableCell>${limitador150ZinuPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="5">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('limitador220Zinu')}
                                    onChange={() => onAccessoryChange('limitador220Zinu')}
                                />
                                <strong>Limitador de Apertura L = 220</strong>
                            </TableCell>
                            <TableCell>${limitador220ZinuPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="6">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('escuadraEnsambleZinu')}
                                    onChange={() => onAccessoryChange('escuadraEnsambleZinu')}
                                />
                                <strong>Escuadra Ensamble Marco Sideral:</strong>
                            </TableCell>
                            <TableCell>${escuadraEnsambleZinuPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="7">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('escuadraEnsambleHZinu')}
                                    onChange={() => onAccessoryChange('escuadraEnsambleHZinu')}
                                />
                                <strong>Escuadra Ensamble Hoja:</strong>
                            </TableCell>
                            <TableCell>${escuadraEnsambleHZinuPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="8">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('bisagra2Zinu')}
                                    onChange={() => onAccessoryChange('bisagra2Zinu')}
                                />
                                <strong>Bisagra 2 Aletas Negra 70K</strong>
                            </TableCell>
                            <TableCell>${bisagra2ZinuPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="9">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('cierreHZinu')}
                                    onChange={() => onAccessoryChange('cierreHZinu')}
                                />
                                <strong>Cierre Hojas y Encuentros Regulables:</strong>
                            </TableCell>
                            <TableCell>${cierreHZinuPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="10">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('soporteHZinu')}
                                    onChange={() => onAccessoryChange('soporteHZinu')}
                                />
                                <strong>Soporte Compensador de Hoja</strong>
                            </TableCell>
                            <TableCell>${soporteHTaironaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="11">
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
                        <TableRow key="12">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('pletinaPoliamida')}
                                    onChange={() => onAccessoryChange('pletinaPoliamida')}
                                />
                                <strong>Pletina de Poliamida Negra</strong>
                            </TableCell>
                            <TableCell>${pletinaPoliamidaPrice?.toFixed(2)}</TableCell>
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
                                Empaque(Ancho):</strong></TableCell>
                            <TableCell>{empaqueZinuHeight} mm
                                <br /> {empaqueZinuWidth} mm</TableCell>
                            <TableCell>${empaqueZinuPrice?.toFixed(2)}</TableCell>
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
        doubleTotalDimensions: PropTypes.number,
        totalHeight: PropTypes.number,
        marcoPerimetralZinuPrice: PropTypes.number,
        divisorZinuPrice: PropTypes.number,
        perimetralNaveZinuPrice: PropTypes.number,
        pisaVidrioZinuPrice: PropTypes.number,
        verticalHorizontalesCaZinuPrice: PropTypes.number,
        empaqueZinuPrice: PropTypes.number,
        felpaPrice: PropTypes.number,
        tornillosPrice: PropTypes.number,
        siliconaPrice: PropTypes.number,
        empaqueZinuHeight: PropTypes.number,
        empaqueZinuWidth: PropTypes.number,
        totalFelpa: PropTypes.number,
        kitCierreZinuPrice: PropTypes.number,
        kitCierreConLlaveZinuPrice: PropTypes.number,
        limitador150ZinuPrice: PropTypes.number,
        limitador220ZinuPrice: PropTypes.number,
        escuadraEnsambleZinuPrice: PropTypes.number,
        escuadraEnsambleHZinuPrice: PropTypes.number,
        bisagra2ZinuPrice: PropTypes.number,
        cierreHZinuPrice: PropTypes.number,
        soporteHTaironaPrice: PropTypes.number,
        bisagraOcultaPrice: PropTypes.number,
        pletinaPoliamidaPrice: PropTypes.number,
    }),
    dimensions: PropTypes.object.isRequired,
    onAddDoor: PropTypes.func.isRequired,
    onAccessoryChange: PropTypes.func.isRequired,
    selectedAccessories: PropTypes.array.isRequired,
    useCalculoPrecios: PropTypes.func.isRequired,
};

export default DetalleTablas;