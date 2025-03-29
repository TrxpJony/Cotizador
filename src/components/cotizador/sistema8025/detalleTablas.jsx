import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import PropTypes from 'prop-types';
import CotizadorAdd from '../../../components/cotizador/CotizadorAdd';

const DetalleTablas8025 = ({ calculatedValues, dimensions, onAddDoor, onAccessoryChange, selectedAccessories, useCalculoPrecios }) => {
    const {
        totalWidth,
        doubleHeight,
        doubleHalfWidth,
        cabezal8025Price,
        sillar8025Price,
        jamba8025Price,
        horizontalSuperior8025Price,
        horizontalInferior8025Price,
        traslape8025Price,
        enganche8025Price,
        empaque744Price,
        tornillosPrice,
        siliconaPrice,
        empaque744Height,
        empaque744Width,
        felpaPrice,
        totalFelpa,
        kitCierre8025Price,
        kitCierreConLlave8025Price,
        rodamientoSimple8025Price,
        rodamientoDoble8025Price,
    } = calculatedValues || {};

    return (
        <>
            <div className="parts-list">
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
                            <TableCell>{totalWidth} mm</TableCell>
                            <TableCell>${cabezal8025Price?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><strong>Sillar:</strong></TableCell>
                            <TableCell>{totalWidth} mm</TableCell>
                            <TableCell>${sillar8025Price?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell><strong>Jamba:</strong></TableCell>
                            <TableCell>{doubleHeight} mm (2)</TableCell>
                            <TableCell>${jamba8025Price?.toFixed(2)}</TableCell>
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
                            <TableCell>{doubleHalfWidth} mm (2)</TableCell>
                            <TableCell>${horizontalSuperior8025Price?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><strong>Horizontal Inferior:</strong></TableCell>
                            <TableCell>{doubleHalfWidth} mm</TableCell>
                            <TableCell>${horizontalInferior8025Price?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell><strong>Traslape:</strong></TableCell>
                            <TableCell>{doubleHeight} mm (2)</TableCell>
                            <TableCell>${traslape8025Price?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="5">
                            <TableCell><strong>Enganche:</strong></TableCell>
                            <TableCell>{doubleHeight} mm (2)</TableCell>
                            <TableCell>${enganche8025Price?.toFixed(2)}</TableCell>
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
                            <TableCell><strong><h2>Prieza</h2></strong></TableCell>
                            <TableCell><strong><h2>Precio</h2></strong></TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('kitCierre8025')}
                                    onChange={() => onAccessoryChange('kitCierre8025')}
                                />
                                <strong>kit Cierre</strong>
                            </TableCell>
                            <TableCell>${kitCierre8025Price?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('kitCierreConLlave8025')}
                                    onChange={() => onAccessoryChange('kitCierreConLlave8025')}
                                />
                                <strong>Kit de Cierre con Llave</strong>
                            </TableCell>
                            <TableCell>${kitCierreConLlave8025Price?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('rodamientoSimple8025')}
                                    onChange={() => onAccessoryChange('rodamientoSimple8025')}
                                />
                                <strong>Rodamiento Simple en Agujas (2)</strong>
                            </TableCell>
                            <TableCell>${rodamientoSimple8025Price?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="5">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('rodamientoDoble8025')}
                                    onChange={() => onAccessoryChange('rodamientoDoble8025')}
                                />
                                <strong>Rodamiento Doble (2)</strong>
                            </TableCell>
                            <TableCell>${rodamientoDoble8025Price?.toFixed(2)}</TableCell>
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
                            <TableCell><strong>silicona</strong></TableCell>
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
                            <TableCell>{empaque744Height} mm 
                                <br />
                                {empaque744Width} mm</TableCell>
                            <TableCell>${empaque744Price?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><strong>Felpa 5.00 x 7.00</strong></TableCell>
                            <TableCell>{totalFelpa} mm</TableCell>
                            <TableCell>${felpaPrice?.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <br />
                <CotizadorAdd dimensions={dimensions} onAddDoor={onAddDoor} useCalculoPrecios={useCalculoPrecios} selectedAccessories={selectedAccessories}/>
            </div>

        </>
    )
};

DetalleTablas8025.propTypes ={
    calculatedValues: PropTypes.shape({
        totalWidth: PropTypes.number,
        doubleHeight: PropTypes.number,
        doubleHalfWidth: PropTypes.number,
        cabezal8025Price: PropTypes.number,
        sillar8025Price: PropTypes.number,
        jamba8025Price: PropTypes.number,
        horizontalSuperior8025Price: PropTypes.number,
        horizontalInferior8025Price: PropTypes.number,
        traslape8025Price: PropTypes.number,
        enganche8025Price: PropTypes.number,
        kitCierre8025Price: PropTypes.number,
        kitCierreConLlave8025Price: PropTypes.number,
        rodamientoSimple8025Price: PropTypes.number,
        rodamientoDoble8025Price: PropTypes.number,
    }),
    dimensions: PropTypes.object.isRequired,
    onAddDoor: PropTypes.func.isRequired,
    onAccessoryChange: PropTypes.func.isRequired,
    selectedAccessories: PropTypes.array.isRequired,
    useCalculoPrecios: PropTypes.func.isRequired
}

export default DetalleTablas8025