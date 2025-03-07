import { useEffect, useState, useMemo } from "react";

const useCalculoPrecios = ({ width, height }, selectedAccessories = []) => {
    const [dbPrices, setDbPrices] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [calculatedValues, setCalculatedValues] = useState({});

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL; // Obtener la URL base del backend
                const response = await fetch(`${API_URL}/api/precios`);
                const data = await response.json();

                const pricesObject = data.reduce((acc, item) => {
                    acc[item.nombre] = Number(item.precio) || 0;
                    return acc;
                }, {});

                setDbPrices(pricesObject);
            } catch (error) {
                console.error('Error al cargar los precios:', error);
            }
        };

        fetchPrices();
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const memoizedPrices = useMemo(() => dbPrices, [JSON.stringify(dbPrices)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const memoizedAccessories = useMemo(() => selectedAccessories, [JSON.stringify(selectedAccessories)]);

    useEffect(() => {
        if (Object.keys(memoizedPrices).length === 0) return;

        const totalHeight = Number(height);
        const totalWidth = Number(width);
        const doubleHeight = totalHeight * 2;
        const doubleWidth = totalWidth * 2;
        const cuadHeight = totalHeight * 4;
        const empaqueastHeight = totalHeight * 4;
        const empaqueastWidth = totalWidth * 2;
        const felpaHeight = totalHeight * 6;
        const felpaWidth = totalWidth * 2;
        const totalFelpa = felpaWidth + felpaHeight;
        const getPrice = (key, factor = 1) => (memoizedPrices[key] ? Number(memoizedPrices[key]) * factor / 1000 : 0);

        const cabezalastPrice = getPrice("cabezalast", totalWidth);
        const sillarastPrice = getPrice("sillarast", totalWidth);
        const sillarAlfajiaastPrice = getPrice("sillarAlfajiaast", totalWidth);
        const jambaastPrice = getPrice("jambaast", doubleHeight);
        const horizontalSuperiorastPrice = getPrice("horizontalSuperiorast", doubleWidth);
        const horizontalInferiorFijaastPrice = getPrice("horizontalInferiorFijaast", totalWidth);
        const horizontalInferiorMovilastPrice = getPrice("horizontalInferiorMovilast", totalWidth);
        const traslapeastPrice = getPrice("traslapeast", cuadHeight);
        const engancheastPrice = getPrice("engancheast", cuadHeight);
        const adaptadorReforzadoastPrice = getPrice("adaptadorReforzadoast", totalHeight);
        const empaqueastPrice = getPrice("empaqueast", empaqueastHeight + empaqueastWidth);
        const felpaPrice = getPrice("felpacol", felpaHeight + felpaWidth);

        const tornillosPrice = (memoizedPrices.tornillos ? Number(memoizedPrices.tornillos) : 0) * 76;
        const siliconaPrice = (memoizedPrices.silicona ? Number(memoizedPrices.silicona) : 0) * 1;

        const accesoriosPrice = memoizedAccessories.reduce((sum, acc) => sum + (memoizedPrices[acc] ? Number(memoizedPrices[acc]) : 0), 0);

        const total =
            cabezalastPrice + sillarastPrice + sillarAlfajiaastPrice + jambaastPrice +
            horizontalSuperiorastPrice + horizontalInferiorFijaastPrice + horizontalInferiorMovilastPrice +
            adaptadorReforzadoastPrice + traslapeastPrice + engancheastPrice + empaqueastPrice + tornillosPrice + siliconaPrice + accesoriosPrice + felpaPrice;
        setTotalPrice(total);
        setCalculatedValues({
            totalWidth,
            totalHeight,
            doubleHeight,
            doubleWidth,
            cuadHeight,
            cabezalastPrice,
            sillarastPrice,
            sillarAlfajiaastPrice,
            jambaastPrice,
            horizontalSuperiorastPrice,
            horizontalInferiorFijaastPrice,
            horizontalInferiorMovilastPrice,
            adaptadorReforzadoastPrice,
            traslapeastPrice,
            engancheastPrice,
            empaqueastPrice,
            tornillosPrice,
            siliconaPrice,
            empaqueastHeight,
            empaqueastWidth,
            felpaHeight,
            felpaWidth,
            felpaPrice,
            totalFelpa,
            kitCierreastPrice: memoizedPrices.kitCierreast ? Number(memoizedPrices.kitCierreast) : 0,
            cubetaAngeoPrice: memoizedPrices.cubetaAngeo ? Number(memoizedPrices.cubetaAngeo) : 0,
            rodamiento80astPrice: memoizedPrices.rodamiento80ast ? Number(memoizedPrices.rodamiento80ast) : 0,
            rodamiento40astPrice: memoizedPrices.rodamiento40ast ? Number(memoizedPrices.rodamiento40ast) : 0,
            cajaDeflectoraPrice: memoizedPrices.cajaDeflectora ? Number(memoizedPrices.cajaDeflectora) : 0,
            rodamientoNave22astPrice: memoizedPrices.rodamientoNave22ast ? Number(memoizedPrices.rodamientoNave22ast) : 0,
            guiaSuperiorangeoPrice: memoizedPrices.guiaSuperiorangeo ? Number(memoizedPrices.guiaSuperiorangeo) : 0
        });
    }, [width, height, memoizedPrices, memoizedAccessories]);

    return { totalPrice, calculatedValues };
};

export default useCalculoPrecios;