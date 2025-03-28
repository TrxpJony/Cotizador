import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import PropTypes from "prop-types";
import CotizadorAdd from "../CotizadorAdd";

const DetalleTablas = ({ calculatedValues, dimensions, onAddDoor, onAccessoryChange, selectedAccessories, useCalculoPrecios }) => {
    const {
        totalWidth,
        totalHeight,
        doubleSum,
        doubleSumCuad,
        doubleWidth,
        doubleHeight,
        horizontales,
        pistaRodamientokimPrice,
        marcoPerimetralkimPrice,
        pistaRodamientokalPrice,
        complementoSuperiorkimPrice,
        enganchekimPrice,
        engancheVidrioCakimPrice,
        verticalHorizontaleskimPrice,
        verticalHorizontalesCakimPrice,
        adaptadorKimPrice,
        empaquekimPrice,
        felpaPrice,
        tornillosPrice,
        siliconaPrice,
        escuadraEnsamblekimPrice,
        espumaSelloSukimPrice,
        espumaSelloInkimPrice,
        sifonSistemaskimPrice,
        kit6kimPrice,
        kit2kimPrice,
        topeskimPrice,
        espumaTapaGuiakimPrice,
        portaEsponjaKimPrice,
        tapaEntrecierrekimPrice,
        kitHojaFijakimPrice,
        kitPuntoCierrekimPrice,
        empaquekimWidth,
        empaquekimHeight,
        totalFelpa,
        kitManijakimPrice,
        kitManijaConLlavekimPrice,
        pletinaPoliamidaPrice,
        empaqueBurbujakimPrice,
        cajaDeflectoraPrice,
    } = calculatedValues || {};

    return (
        <>
            <div className="parts-list">
                <strong><h1>SISTEMA KIMBAYA OXXO</h1></strong>
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
                            <TableCell>{doubleSum} mm</TableCell>
                            <TableCell>${marcoPerimetralkimPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><strong>Pista Rodamiento Kalima:</strong></TableCell>
                            <TableCell>{doubleWidth} mm</TableCell>
                            <TableCell>${pistaRodamientokalPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell><strong>Pista Rodamiento Kimbaya:</strong></TableCell>
                            <TableCell>{doubleSumCuad} mm</TableCell>
                            <TableCell>${pistaRodamientokimPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="5">
                            <TableCell><strong>Complemento Superior Marco:</strong></TableCell>
                            <TableCell>{doubleWidth} mm</TableCell>
                            <TableCell>${complementoSuperiorkimPrice?.toFixed(2)}</TableCell>
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
                            <TableCell><strong>Vertical Horizontales Vidrio:</strong></TableCell>
                            <TableCell>{horizontales} mm</TableCell>
                            <TableCell>${verticalHorizontaleskimPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><strong>Enganche Vidrio:</strong></TableCell>
                            <TableCell>{doubleHeight} mm</TableCell>
                            <TableCell>${enganchekimPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell><strong>Vertical Vidrio Camara:</strong></TableCell>
                            <TableCell>{horizontales} mm</TableCell>
                            <TableCell>${verticalHorizontalesCakimPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="5">
                            <TableCell><strong>Enganche Vidrio Camara:</strong></TableCell>
                            <TableCell>{totalWidth} mm</TableCell>
                            <TableCell>${engancheVidrioCakimPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="6">
                            <TableCell><strong>Adaptador:</strong></TableCell>
                            <TableCell>{totalHeight} mm</TableCell>
                            <TableCell>${adaptadorKimPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <br />
                <Table aria-label="Tabla Accessorios Marco Nave">
                    <TableHeader>
                        <TableColumn><h1>Accessorios Marco - Nave</h1></TableColumn>
                        <TableColumn></TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell><strong><h2>Pieza</h2></strong></TableCell>
                            <TableCell><strong><h2>Precio</h2></strong></TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell><strong>Escuadra Ensamble:</strong></TableCell>
                            <TableCell>${escuadraEnsamblekimPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><strong>Espuma Sello Superior:</strong></TableCell>
                            <TableCell>${espumaSelloSukimPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell><strong>Espuma Sello Inferior:</strong></TableCell>
                            <TableCell>${espumaSelloInkimPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="5">
                            <TableCell><strong>Sifon Sistemas Eurovitral:</strong></TableCell>
                            <TableCell>${sifonSistemaskimPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="6">
                            <TableCell><strong>kit 6 Escuadras de Alineacion:</strong></TableCell>
                            <TableCell>${kit6kimPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="7">
                            <TableCell><strong>Kit 2 Escuadras de Alineacion con Guias:</strong></TableCell>
                            <TableCell>${kit2kimPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="8">
                            <TableCell><strong>Topes Para Hojas:</strong></TableCell>
                            <TableCell>${topeskimPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="9">
                            <TableCell><strong>Espuma Tapa Guia: </strong></TableCell>
                            <TableCell>${espumaTapaGuiakimPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="10">
                            <TableCell><strong>Tapa y Tapeta Porta Esponja:</strong></TableCell>
                            <TableCell>${portaEsponjaKimPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="11">
                            <TableCell><strong>Tapa Entrecierre Superior</strong></TableCell>
                            <TableCell>${tapaEntrecierrekimPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="12">
                            <TableCell><strong>Kit Hoja Fija</strong></TableCell>
                            <TableCell>${kitHojaFijakimPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="13">
                            <TableCell><strong>Kit Punto de Cierre</strong></TableCell>
                            <TableCell>${kitPuntoCierrekimPrice?.toFixed(2)}</TableCell>
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
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('kitManijakim')}
                                    onChange={() => onAccessoryChange('kitManijakim')}
                                />
                                <strong>Kit Manija Bidireccional con Transmision</strong>
                            </TableCell>
                            <TableCell>${kitManijakimPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('kitManijaConLlavekim')}
                                    onChange={() => onAccessoryChange('kitManijaConLlavekim')}
                                />
                                <strong>Kit Manija Bidireccional con Transmision con Llave</strong>
                            </TableCell>
                            <TableCell>${kitManijaConLlavekimPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('pletinaPoliamida')}
                                    onChange={() => onAccessoryChange('pletinaPoliamida')}
                                />
                                <strong>Pletina Poliamida Negra</strong>
                            </TableCell>
                            <TableCell>${pletinaPoliamidaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="5">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('empaqueBurbujakim')}
                                    onChange={() => onAccessoryChange('empaqueBurbujakim')}
                                />
                                <strong>Empaque Burbuja Sello X 250M</strong>
                            </TableCell>
                            <TableCell>${empaqueBurbujakimPrice?.toFixed(2)}</TableCell>
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
                            <TableCell><strong><h2>Precios</h2></strong></TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell><strong>Empaque (Alto):
                                <br />
                                Empaque (Ancho): </strong></TableCell>
                            <TableCell>{empaquekimWidth} mm
                                <br /> {empaquekimHeight} mm
                            </TableCell>
                            <TableCell>${empaquekimPrice?.toFixed(2)}</TableCell>
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
        totalHeight: PropTypes.number,
        totalWidth: PropTypes.number,
        doubleSum: PropTypes.number,
        doubleSumCuad: PropTypes.number,
        doubleWidth: PropTypes.number,
        doubleHeight: PropTypes.number,
        horizontales: PropTypes.number,
        pistaRodamientokimPrice: PropTypes.number,
        marcoPerimetralkimPrice: PropTypes.number,
        pistaRodamientokalPrice: PropTypes.number,
        complementoSuperiorkimPrice: PropTypes.number,
        enganchekimPrice: PropTypes.number,
        engancheVidrioCakimPrice: PropTypes.number,
        verticalHorizontaleskimPrice: PropTypes.number,
        verticalHorizontalesCakimPrice: PropTypes.number,
        adaptadorKimPrice: PropTypes.number,
        empaquekimPrice: PropTypes.number,
        felpaPrice: PropTypes.number,
        tornillosPrice: PropTypes.number,
        siliconaPrice: PropTypes.number,
        escuadraEnsamblekimPrice: PropTypes.number,
        espumaSelloSukimPrice: PropTypes.number,
        espumaSelloInkimPrice: PropTypes.number,
        sifonSistemaskimPrice: PropTypes.number,
        kit6kimPrice: PropTypes.number,
        kit2kimPrice: PropTypes.number,
        topeskimPrice: PropTypes.number,
        espumaTapaGuiakimPrice: PropTypes.number,
        portaEsponjaKimPrice: PropTypes.number,
        tapaEntrecierrekimPrice: PropTypes.number,
        kitHojaFijakimPrice: PropTypes.number,
        kitManijaConLlavekimPrice: PropTypes.number,
        pletinaPoliamidaPrice: PropTypes.number,
        empaqueBurbujakimPrice: PropTypes.number,
        cajaDeflectoraPrice: PropTypes.number,
    }),
    dimensions: PropTypes.object.isRequired,
    onAddDoor: PropTypes.func.isRequired,
    onAccessoryChange: PropTypes.func.isRequired,
    selectedAccessories: PropTypes.array.isRequired,
    useCalculoPrecios: PropTypes.func.isRequired,
};

export default DetalleTablas