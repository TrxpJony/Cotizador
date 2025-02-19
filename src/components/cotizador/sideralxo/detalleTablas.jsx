import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import PropTypes from 'prop-types';
import CotizadorAdd from '../../../components/cotizador/CotizadorAdd';

const DetalleTablas = ({ calculatedValues, dimensions, onAddDoor, onAccessoryChange, selectedAccessories, useCalculoPrecios }) => {
    const {
        totalHeight,
        cuadHeight,
        cuadWidth,
        marcoPerimetralSid,
        marcoPerimetralSidPrice,
        horizontalFelperosSidPrice,
        verticalSidPrice,
        verticalReforzadoSidPrice,
        adaptadorSidPrice,
        empaqueSidPrice,
        felpaPrice,
        tornillosPrice,
        siliconaPrice,
        empaqueSidHeight,
        empaqueSidWidth,
        totalFelpa,
        kitManijaDobleSidPrice,
        bisagra2SidPrice,
        bisagra2aletasregulablePrice,
        bisagra3SidPrice,
        escuadraEnsambleMSidPrice,
        bisagraOcultaPrice,
        kitFallevbaSidPrice,
        terminalesSidPrice,
        kit50puntoCierreSidPrice,
    } = calculatedValues || {};

    return (
        <>
            <div className="parts-list">
                <strong><h1>SIDERAL 2.4 XO PLUS</h1></strong>
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
                            <TableCell><strong>Marco Perimetral Sideral:</strong></TableCell>
                            <TableCell>{marcoPerimetralSid} mm</TableCell>
                            <TableCell>${marcoPerimetralSidPrice?.toFixed(2)}</TableCell>
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
                            <TableCell><strong>Horizontal con Felperos:</strong></TableCell>
                            <TableCell>{cuadWidth} mm (4)</TableCell>
                            <TableCell>${horizontalFelperosSidPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><strong>Vertical:</strong></TableCell>
                            <TableCell>{cuadHeight} mm (4)</TableCell>
                            <TableCell>${verticalSidPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell><strong>Vertical Reforzado:</strong></TableCell>
                            <TableCell>{cuadHeight} mm (4)</TableCell>
                            <TableCell>${verticalReforzadoSidPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="5">
                            <TableCell><strong>Adaptador:</strong></TableCell>
                            <TableCell>{totalHeight} mm</TableCell>
                            <TableCell>${adaptadorSidPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <br />
                <Table aria-label="tabla accessorios">
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
                                    checked={selectedAccessories.includes('kitManijaDobleSid')}
                                    onChange={() => onAccessoryChange("kitManijaDobleSid")}
                                />
                                <strong>Kit Manija Doble Bidireccional con Bloqueo</strong>
                            </TableCell>
                            <TableCell>${kitManijaDobleSidPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('bisagra2Sid')}
                                    onChange={() => onAccessoryChange('bisagra2Sid')}
                                />
                                <strong>Bisagra 2 Aletas Negra para 70K</strong>
                            </TableCell>
                            <TableCell>${bisagra2SidPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('bisagra3Sid')}
                                    onChange={() => onAccessoryChange('bisagra3Sid')}
                                />
                                <strong>Bisagra 3 Aletas para 90K</strong>
                            </TableCell>
                            <TableCell>${bisagra3SidPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="5">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('bisagra2aletasregulable')}
                                    onChange={() => onAccessoryChange('bisagra2aletasregulable')}
                                />
                                <strong>Bisagras 2 Aletas Regulables Para 120K</strong>
                            </TableCell>
                            <TableCell>${bisagra2aletasregulablePrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="6">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('escuadraEnsambleSid')}
                                    onChange={() => onAccessoryChange('escuadraEnsambleSid')}
                                />
                                <strong>Escuadra Ensamble Marco</strong>
                            </TableCell>
                            <TableCell>${escuadraEnsambleMSidPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="7">
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
                        <TableRow key="8">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('kitFallevbaSid')}
                                    onChange={() => onAccessoryChange('kitFallevbaSid')}
                                />
                                <strong>Kit Falleba de Palanca con Terminal y Encuentro</strong>
                            </TableCell>
                            <TableCell>${kitFallevbaSidPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="9">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('kit50puntoCierreSid')}
                                    onChange={() => onAccessoryChange('kit50puntoCierreSid')}
                                />
                                <strong>kit 50 Puntos de Cierre y 50 Encuentros Regulables</strong>
                            </TableCell>
                            <TableCell>${kit50puntoCierreSidPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="10">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('terminalesSid')}
                                    onChange={() => onAccessoryChange('terminalesSid')}
                                />
                                <strong>Terminales y Encuentros</strong>
                            </TableCell>
                            <TableCell>${terminalesSidPrice?.toFixed(2)}</TableCell>
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
                <Table aria-label="Table Empaque">
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
                                Empaque (Ancho):</strong></TableCell>
                            <TableCell>{empaqueSidHeight} mm
                                <br /> {empaqueSidWidth} mm
                            </TableCell>
                            <TableCell>${empaqueSidPrice?.toFixed(2)}</TableCell>
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
        totalHeight: PropTypes.number,
        cuadHeight: PropTypes.number,
        cuadWidth: PropTypes.number,
        marcoPerimetralSid: PropTypes.number,
        marcoPerimetralSidPrice: PropTypes.number,
        horizontalFelperosSidPrice: PropTypes.number,
        verticalSidPrice: PropTypes.number,
        verticalReforzadoSidPrice: PropTypes.number,
        adaptadorSidPrice: PropTypes.number,
        empaqueSidPrice: PropTypes.number,
        felpaPrice: PropTypes.number,
        tornillosPrice: PropTypes.number,
        siliconaPrice: PropTypes.number,
        empaqueSidHeight: PropTypes.number,
        empaqueSidWidth: PropTypes.number,
        totalFelpa: PropTypes.number,
        kitManijaDobleSidPrice: PropTypes.number,
        bisagra2SidPrice: PropTypes.number,
        bisagra2aletasregulablePrice: PropTypes.number,
        bisagra3SidPrice: PropTypes.number,
        escuadraEnsambleMSidPrice: PropTypes.number,
        bisagraOcultaPrice: PropTypes.number,
        kitFallavbaSidPrice: PropTypes.number,
        terminalesSidPrice: PropTypes.number,
        kit50puntoCierreSidPrice: PropTypes.number,
    }),
    dimensions: PropTypes.object.isRequired,
    onAddDoor: PropTypes.func.isRequired,
    onAccessoryChange: PropTypes.func.isRequired,
    selectedAccessories: PropTypes.array.isRequired,
    useCalculoPrecios: PropTypes.func.isRequired
};

export default DetalleTablas;