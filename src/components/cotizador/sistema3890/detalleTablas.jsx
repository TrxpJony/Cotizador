import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import PropTypes from "prop-types";
import CotizadorAdd from '../../../components/cotizador/CotizadorAdd'; // importar cotizaciones

const DetalleTablas = ({ calculatedValues, dimensions, onAddDoor, onAccessoryChange, selectedAccessories, useCalculoPrecios }) => {
    const {
        totalWidth,
        aln1101s3890,
        aln1101s3890Price,
        aln1102s3890Price,
        tornillosPrice,
        siliconaPrice,
        empaque3890Price,
        empaque3890Height,
        empaque3890Width,
        felpaPrice,
        totalFelpa,
        kitCierre3890Price,
        kitCierreConLlave3890Price,
        enchapePieces,
        enchapeTotalPrice
    } = calculatedValues || {};

    return (
        <>
            <div className="parts-list">
                <strong><h1>SISTEMA 3890 X</h1></strong>
                <Table aria-label="Tabla Marco">
                    <TableHeader>
                        <TableColumn><h1>Marco</h1></TableColumn>
                        <TableColumn></TableColumn>
                        <TableColumn></TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell><strong><h1>Pieza</h1></strong></TableCell>
                            <TableCell><strong><h2>Tamaño</h2></strong></TableCell>
                            <TableCell><strong><h2>Precio</h2></strong></TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell><strong>ALN: 1101 Tubular:</strong></TableCell>
                            <TableCell>{aln1101s3890} mm</TableCell>
                            <TableCell>${aln1101s3890Price?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><strong>ALN: 1102 Tubular:</strong></TableCell>
                            <TableCell>{totalWidth} mm</TableCell>
                            <TableCell>${aln1102s3890Price?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('enchape')}
                                    onChange={() => onAccessoryChange('enchape')}
                                />
                                <strong>Enchape</strong>
                            </TableCell>
                            <TableCell>({enchapePieces})</TableCell>
                            <TableCell>${enchapeTotalPrice?.toFixed(2)}</TableCell>
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
                                    checked={selectedAccessories.includes('kitCierre3890')}
                                    onChange={() => onAccessoryChange('kitCierre3890')}
                                />
                                <strong>Kit de Cierre</strong>
                            </TableCell>
                            <TableCell>${kitCierre3890Price?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedAccessories.includes('kitCierreConLlave3890')}
                                    onChange={() => onAccessoryChange('kitCierreConLlave3890')}
                                />
                                <strong>Kit de Cierre Con Llave</strong>
                            </TableCell>
                            <TableCell>${kitCierreConLlave3890Price?.toFixed(2)}</TableCell>
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
                            <TableCell>{empaque3890Height} mm
                                <br />{empaque3890Width} mm
                            </TableCell>
                            <TableCell>${empaque3890Price?.toFixed(2)}</TableCell>
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
        aln1101s3890: PropTypes.number,
        aln1101s3890Price: PropTypes.number,
        aln1102s3890Price: PropTypes.number,
        tornillosPrice: PropTypes.number,
        siliconaPrice: PropTypes.number,
        empaque3890Price: PropTypes.number,
        empaque3890Height: PropTypes.number,
        empaque3890Width: PropTypes.number,
        felpaPrice: PropTypes.number,
        totalFelpa: PropTypes.number,
        kitCierre3890Price: PropTypes.number,
        kitCierreConLlave3890Price: PropTypes.number,
        enchapePieces: PropTypes.number,
        enchapeTotalPrice: PropTypes.number
    }),
    dimensions: PropTypes.object.isRequired,
    onAddDoor: PropTypes.func.isRequired,
    onAccessoryChange: PropTypes.func.isRequired,
    selectedAccessories: PropTypes.array.isRequired,
    useCalculoPrecios: PropTypes.func.isRequired,
};

export default DetalleTablas;