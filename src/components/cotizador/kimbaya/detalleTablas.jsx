import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import PropTypes from "prop-types";
import CotizadorAdd from "../CotizadorAdd";

const DetalleTablas = ({ calculatedValues, dimensions, onAddDoor, onAccessoryChange, selectedAccessories, useCalculoPrecios }) => {
    const {
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
        empaquekimPrice,
        felpaPrice,
        tornillosPrice,
        siliconaPrice,
        empaquekimHeight,
        empaquekimWidth,
        totalFelpa,
        escuadraEnsamblekimPrice,
        escuadraHojaPrice,
        escuadraMovilPrice,
        espumaSelloSukimPrice,
        espumaSelloInkimPrice,
        sifonSistemaskimPrice,
        kit6HPrice,
        kit6MPrice,
        kit2MPrice,
        kit2HPrice,
        topesHPrice,
        topesMPrice,
        espumaTapaMPrice,
        espumaTapaHPrice,
        portaEsponjaHPrice,
        portaEsponjaMPrice,
        tapaCierreHPrice,
        tapaCierreMPrice,
        kitHojaFijakimPrice,
        rodamientoSimplekimPrice,
        rodamientoDoblekimPrice,
        kitPuntoCierrekimPrice,
        kitManijakimPrice,
        kitManijaConLlavekimPrice,
        pletinaPoliamidaPrice,
        empaqueBurbujakimPrice,
        cajaDeflectoraPrice,
    } = calculatedValues || {};

    return (
        <>
            <div className="parts-list">
                <strong><h1>SISTEMA KIMBAYA</h1></strong>
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
                            <TableCell><strong>Marco Perimetrak:</strong></TableCell>
                            <TableCell>{doubleSum} mm </TableCell>
                            <TableCell>${marcoPerimetralkimPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><strong>Pista Rodamiento Kalima:</strong></TableCell>
                            <TableCell>{doubleWidth} mm (2)</TableCell>
                            <TableCell>${pistaRodamientokalPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell><strong>Pista Rodamiento Kimbaya:</strong></TableCell>
                            <TableCell>{doubleSumCuad} mm</TableCell>
                            <TableCell>${pistaRodamientokimPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="5">
                            <TableCell><strong>Complemento Superior Marco:</strong></TableCell>
                            <TableCell>{doubleWidth} mm (2)</TableCell>
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
                            <TableCell><strong>Vertical Horizontales Vidrios:</strong></TableCell>
                            <TableCell>{horizontales} mm (6)</TableCell>
                            <TableCell>${verticalHorizontaleskimPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><strong>Enganche Vidrio:</strong></TableCell>
                            <TableCell>{doubleHeight} mm (2)</TableCell>
                            <TableCell>${enganchekimPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell><strong>Vertical Vidrio Camara:</strong></TableCell>
                            <TableCell>{horizontales} mm (6)</TableCell>
                            <TableCell>${verticalHorizontalesCakimPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="5">
                            <TableCell><strong>Enganche Vidrio Camara:</strong></TableCell>
                            <TableCell>{doubleHeight} mm (2)</TableCell>
                            <TableCell>${engancheVidrioCakimPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <br />
                <Table aria-label="Tabla Accessorios Marco">
                    <TableHeader>
                        <TableColumn><h1>Accesorios de Marco</h1></TableColumn>
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
                                    checked={selectedAccessories.includes('escuadraEnsamblekim')}
                                    onChange={() => onAccessoryChange('escuadraEnsamblekim')}
                                />
                                <strong>Escuadra Ensamble Marco</strong>
                            </TableCell>
                            <TableCell>${escuadraEnsamblekimPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('espumaSelloSukim')}
                                    onChange={() => onAccessoryChange('espumaSelloSukim')}
                                />
                                <strong>Espuma Sello Superior</strong>
                            </TableCell>
                            <TableCell>${espumaSelloSukimPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('espumaSelloInkim')}
                                    onChange={() => onAccessoryChange('espumaSelloInkim')}
                                />
                                <strong>Espuma Sello Inferior</strong>
                            </TableCell>
                            <TableCell>${espumaSelloInkimPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="5">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('sifonSistemaskim')}
                                    onChange={() => onAccessoryChange('sifonSistemaskim')} />
                                <strong>Sifon Sistemas Eurovitral</strong>
                            </TableCell>
                            <TableCell>${sifonSistemaskimPrice?.toFixed(2)}</TableCell>
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
                <Table aria-label="Tabla Accessorios Hoja">
                    <TableHeader>
                        <TableColumn><h1>Accessorios Hoja Fija</h1></TableColumn>
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
                                    checked={selectedAccessories.includes('escuadraHoja')}
                                    onChange={() => onAccessoryChange('escuadraHoja')}
                                />
                                <strong>Escuadra Ensamble Hoja fija</strong>
                            </TableCell>
                            <TableCell>${escuadraHojaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('kit6H')}
                                    onChange={() => onAccessoryChange('kit6H')}
                                />
                                <strong>Kit de 6 Escuadras de Alineación Hoja Fija</strong>
                            </TableCell>
                            <TableCell>${kit6HPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes("kit2H")}
                                    onChange={() => onAccessoryChange("kit2H")}
                                />
                                <strong>Kit 2 Escuadras de Alineación con guia</strong>
                            </TableCell>
                            <TableCell>${kit2HPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="5">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes("topesH")}
                                    onChange={() => onAccessoryChange("topesH")}
                                />
                                <strong>Topes Para Hojas</strong>
                            </TableCell>
                            <TableCell>${topesHPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="6">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes("espumaTapaH")}
                                    onChange={() => onAccessoryChange("espumaTapaH")}
                                />
                                <strong>Espuma Tapa Guia Superior/Inferior</strong>
                            </TableCell>
                            <TableCell>${espumaTapaHPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="7">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes("portaEsponjaH")}
                                    onChange={() => onAccessoryChange("portaEsponjaH")}
                                />
                                <strong>Tapa y Tapete Porta Esponja Superior e Inferior</strong>
                            </TableCell>
                            <TableCell>${portaEsponjaHPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="8">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes("tapaCierreH")}
                                    onChange={() => onAccessoryChange("tapaCierreH")}
                                />
                                <strong>Tapa Entrecierre Superior e Inferior</strong>
                            </TableCell>
                            <TableCell>${tapaCierreHPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="9">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes("KitHojaFijakim")}
                                    onChange={() => onAccessoryChange("kitHojaFijakim")}
                                />
                                <strong>Kit Hojas Fija</strong>
                            </TableCell>
                            <TableCell>${kitHojaFijakimPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table >
                <br />
                <Table aria-label="Tabla Accessorios Hoja Mobil">
                    <TableHeader>
                        <TableColumn><h1>Accessorios Hoja Mobil</h1></TableColumn>
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
                                    checked={selectedAccessories.includes('escuadraMovil')}
                                    onChange={() => onAccessoryChange('escuadraMovil')}
                                />
                                <strong>Escuadra Ensamble Hoja Movil</strong>
                            </TableCell>
                            <TableCell>${escuadraMovilPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('kit6M')}
                                    onChange={() => onAccessoryChange('kit6M')}
                                />
                                <strong>Kit de 6 Escuadras de Alineación Hoja Mobil</strong>
                            </TableCell>
                            <TableCell>${kit6MPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('kit2M')}
                                    onChange={() => onAccessoryChange('kit2M')}
                                />
                                <strong>Kit de 2 Escuadras de Alineación con Guia</strong>
                            </TableCell>
                            <TableCell>${kit2MPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="5">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('topesM')}
                                    onChange={() => onAccessoryChange('topesM')}
                                />
                                <strong>Topes Para Hojas</strong>
                            </TableCell>
                            <TableCell>${topesMPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="6">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('espumaTapaM')}
                                    onChange={() => onAccessoryChange('espumaTapaM')}
                                />
                                <strong>Espuma Tapa Guia Superior/inferior</strong>
                            </TableCell>
                            <TableCell>${espumaTapaMPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="7">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('portaEsponjaM')}
                                    onChange={() => onAccessoryChange('portaEsponjaM')}
                                />
                                <strong>Tapa y Tapete Porta Esponja Superior e Inferior</strong>
                            </TableCell>
                            <TableCell>${portaEsponjaMPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="8">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('tapaCierreM')}
                                    onChange={() => onAccessoryChange('tapaCierreM')}
                                />
                                <strong>Tapa Entrecierre Superior e Inferior</strong>
                            </TableCell>
                            <TableCell>${tapaCierreMPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="9">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('rodamientoSimplekim')}
                                    onChange={() => onAccessoryChange('rodamientoSimplekim')}
                                />
                                <strong>Rodamiento Simple en Agujas 100 Kilos</strong>
                            </TableCell>
                            <TableCell>${rodamientoSimplekimPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="10">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('rodamientoDoblekim')}
                                    onChange={() => onAccessoryChange('rodamientoDoblekim')}
                                />
                                <strong>Rodamiento Doble en Agujas 200 Kilos</strong>
                            </TableCell>
                            <TableCell>${rodamientoDoblekimPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <br />
                <Table aria-label="Tabla Accesorios">
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
                                    checked={selectedAccessories.includes('kitPuntoCierrekim')}
                                    onChange={() => onAccessoryChange('kitPuntoCierrekim')}
                                />
                                <strong>Kit Punto de Cierre</strong>
                            </TableCell>
                            <TableCell>${kitPuntoCierrekimPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('kitManijakim')}
                                    onChange={() => onAccessoryChange('kitManijakim')}
                                />
                                <strong>Kit Manija Bidireccional con Transmisión</strong>
                            </TableCell>
                            <TableCell>${kitManijakimPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="4">
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
                        <TableRow key="5">
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
                        <TableRow key="6">
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
                            <TableCell>{empaquekimWidth} mm
                                <br /> {empaquekimHeight} mm</TableCell>
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
        empaquekimPrice: PropTypes.number,
        felpaPrice: PropTypes.number,
        tornillosPrice: PropTypes.number,
        siliconaPrice: PropTypes.number,
        empaquekimHeight: PropTypes.number,
        empaquekimWidth: PropTypes.number,
        totalFelpa: PropTypes.number,
        escuadraEnsamblekimPrice: PropTypes.number,
        escuadraHojaPrice: PropTypes.number,
        escuadraMovilPrice: PropTypes.number,
        espumaSelloSukimPrice: PropTypes.number,
        espumaSelloInkimPrice: PropTypes.number,
        sifonSistemaskimPrice: PropTypes.number,
        kit6HPrice: PropTypes.number,
        kit6MPrice: PropTypes.number,
        kit2MPrice: PropTypes.number,
        kit2HPrice: PropTypes.number,
        topesHPrice: PropTypes.number,
        topesMPrice: PropTypes.number,
        espumaTapaMPrice: PropTypes.number,
        espumaTapaHPrice: PropTypes.number,
        portaEsponjaHPrice: PropTypes.number,
        portaEsponjaMPrice: PropTypes.number,
        tapaCierreHPrice: PropTypes.number,
        tapaCierreMPrice: PropTypes.number,
        kitHojaFijakimPrice: PropTypes.number,
        rodamientoSimplekimPrice: PropTypes.number,
        rodamientoDoblekimPrice: PropTypes.number,
        kitPuntoCierrekimPrice: PropTypes.number,
        kitManijakimPrice: PropTypes.number,
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

export default DetalleTablas;