import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import PropTypes from 'prop-types';
import CotizadorAdd from '../../../components/cotizador/CotizadorAdd';

const DetalleTablas = ({ calculatedValues, dimensions, onAddDoor, onAccessoryChange, selectedAccessories, useCalculoPrecios }) => {
    const {
        totalWidth,
        verticalInferiorAwa,
        halfCuadDouble,
        compensadorAwaPrice,
        cabezalAwaPrice,
        verticalInferiorAwaPrice,
        sillarEmpotrarAwaPrice,
        sillaSobreponerAwaPrice,
        perimetralAwaPrice,
        pisavidrioPerimetralAwaPrice,
        empaqueAwaPrice,
        felpaPrice,
        tornillosPrice,
        siliconaPrice,
        empaqueAwaHeight,
        empaqueAwaWidth,
        totalFelpa,
        kitManijaAwaPrice,
        kitManijaConLlaveAwaPrice,
        escuadraEnsambleAwaPrice,
        escuadraEnsambleHAwaPrice,
        bisagra3AwaPrice,
        kitRodamientosAwaPrice,
        frenoRodamientoAwaPrice,
        kitGuiaHAwaPrice,
    } = calculatedValues || {};
    return (
        <>
            <div className="parts-list">
                <strong><h1>SISTEMA AWA 5 HOJAS</h1></strong>
                <Table aria-label="Tabma Marco">
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
                            <TableCell><strong>Compensador:</strong></TableCell>
                            <TableCell>{totalWidth} mm</TableCell>
                            <TableCell>${compensadorAwaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><strong>Cabezal:</strong></TableCell>
                            <TableCell>{totalWidth} mm</TableCell>
                            <TableCell>${cabezalAwaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell><strong>Vertical Inferior de Marco:</strong></TableCell>
                            <TableCell>{verticalInferiorAwa} mm</TableCell>
                            <TableCell>{verticalInferiorAwaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="5">
                            <TableCell><strong>Sillar de Empotrar:</strong></TableCell>
                            <TableCell>{totalWidth} mm</TableCell>
                            <TableCell>${sillarEmpotrarAwaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="6">
                            <TableCell><strong>Silla de Sobreponer:</strong></TableCell>
                            <TableCell>{totalWidth} mm</TableCell>
                            <TableCell>${sillaSobreponerAwaPrice?.toFixed(2)}</TableCell>
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
                            <TableCell><strong>Perimetral Hoja:</strong></TableCell>
                            <TableCell>{halfCuadDouble} mm (20)</TableCell>
                            <TableCell>${perimetralAwaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><strong>Pisa Vidrio Perimetral de Hoja</strong></TableCell>
                            <TableCell>{perimetralAwaPrice} mm (10)</TableCell>
                            <TableCell>${pisavidrioPerimetralAwaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <br />
                <Table aria-label="Table Accessorios">
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
                                    checked={selectedAccessories.includes('kitManijaAwa')}
                                    onChange={() => onAccessoryChange('kitManijaAwa')}
                                />
                                <strong>Kit de Manija Bidireccional</strong>
                            </TableCell>
                            <TableCell>${kitManijaAwaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('kitManijaConLlaveAwa')}
                                    onChange={() => onAccessoryChange('kitManijaConLlaveAwa')}
                                />
                                <strong>Kit Manija Bidireccional con Llave</strong>
                            </TableCell>
                            <TableCell>${kitManijaConLlaveAwaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes("escuadraEnsambleAwa")}
                                    onChange={() => onAccessoryChange("escuadraEnsambleAwa")}
                                />
                                <strong>Escuadra Ensamble Marco/Hoja</strong>
                            </TableCell>
                            <TableCell>${escuadraEnsambleAwaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="5">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes("escuadraEnsambleHAwa")}
                                    onChange={() => onAccessoryChange("escuadraEnsambleHAwa")}
                                />
                                <strong>Escuadra Ensamble Hoja</strong>
                            </TableCell>
                            <TableCell>${escuadraEnsambleHAwaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="6">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes("bisagra3Awa")}
                                    onChange={() => onAccessoryChange("bisagra3Awa")}
                                />
                                <strong>Bisagra 3 Aletas</strong>
                            </TableCell>
                            <TableCell>${bisagra3AwaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="7">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes("kitRodamientosAwa")}
                                    onChange={() => onAccessoryChange('kitRodamientosAwa')}
                                />
                                <strong>Kit Rodamiento Agujas Superior Guia Inferior 80K</strong>
                            </TableCell>
                            <TableCell>${kitRodamientosAwaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="8">
                            <TableCell>
                            <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes("frenoRodamientoAwa")}
                                    onChange={() => onAccessoryChange("frenoRodamientoAwa")}
                                />
                                <strong>Freno Rodamiento</strong>
                            </TableCell>
                            <TableCell>${frenoRodamientoAwaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="9">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes("kitGuiaHAwa")}
                                    onChange={() => onAccessoryChange("kitGuiaHAwa")}
                                />
                                <strong>Kit Guia Para Hoja Par</strong>
                            </TableCell>
                            <TableCell>${kitGuiaHAwaPrice?.toFixed(2)}</TableCell>
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
                                Empaque (Ancho): </strong></TableCell>
                            <TableCell>{empaqueAwaHeight} mm
                                <br /> {empaqueAwaWidth} mm
                            </TableCell>
                            <TableCell>${empaqueAwaPrice?.toFixed(2)}</TableCell>
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
        totalWidth: PropTypes.number,
        verticalInferiorAwa: PropTypes.number,
        halfCuadDouble: PropTypes.number,
        compensadorAwaPrice: PropTypes.number,
        cabezalAwaPrice: PropTypes.number,
        verticalInferiorAwaPrice: PropTypes.number,
        sillarEmpotrarAwaPrice: PropTypes.number,
        sillaSobreponerAwaPrice: PropTypes.number,
        perimetralAwaPrice: PropTypes.number,
        pisaVidrioPerimetralAwaPrice: PropTypes.number,
        empaqueAwaPrice: PropTypes.number,
        felpaPrice: PropTypes.number,
        tornillosPrice: PropTypes.number,
        siliconaPrice: PropTypes.number,
        EmpaqueAwaHeight: PropTypes.number,
        EmpaqueAwaWdith: PropTypes.number,
        totalFelpa: PropTypes.number,
        kitManijaAwaPrice: PropTypes.number,
        kitManijaConLlaveAwaPrice: PropTypes.number,
        escuadraEnsambleAwaPrice: PropTypes.number,
        escuadraEnsambleHAwaPrice: PropTypes.number,
        busagra3AwaPrice: PropTypes.number,
        kitRodamientosAwaPrice: PropTypes.number,
        frenoRodamientoAwaPrice: PropTypes.number,
        kitGuiaHAwaPrice: PropTypes.number,
    }),
    dimensions: PropTypes.object.isRequired,
    onAddDoor: PropTypes.func.isRequired,
    onAccessoryChange: PropTypes.func.isRequired,
    selectedAccessories: PropTypes.array.isRequired,
    useCalculoPrecios: PropTypes.func.isRequired,
};

export default DetalleTablas;