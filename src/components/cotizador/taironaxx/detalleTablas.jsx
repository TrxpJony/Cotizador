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
        felpaHeight,
        felpaWidth,
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
            <div>
                <strong><h1></h1></strong>
                <Table>
                    <TableHeader>
                        <TableColumn></TableColumn>
                        <TableColumn></TableColumn>
                        <TableColumn></TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <br />
                <CotizadorAdd/>
            </div>
        </>
    );
};

DetalleTablas.propTypes = {
    
}

export default DetalleTablas;