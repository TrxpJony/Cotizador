import { useEffect, useState, useMemo } from "react";

const useCalculoPrecios = ({ width, height }, selectedAccessories = [], selectedGlass = 'sinVidrio') => {
    const [dbPrices, setDbPrices] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [calculatedValues, setCalculatedValues] = useState({});

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await fetch('http://localhost:3002/api/precios');
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

        const halfWidth = Number(width) / 2;
        const totalHeight = Number(height);
        const totalWidth = Number(width);

        const area = (totalHeight / 1000) * (totalWidth / 1000);
        const glassUnitPrice = selectedGlass === "sinVidrio" ? 0 : (memoizedPrices[selectedGlass] || 0);

        const doubleHeight = totalHeight * 2;
        const cuadHeight = totalHeight * 4;
        const doubleHalfWidth = halfWidth * 2;
        const empaque744Height = totalHeight * 6;
        const empaque744Width = totalWidth * 2;
        const felpaHeight = totalHeight * 8;
        const felpaWidth = totalWidth * 2;
        const totalFelpa = felpaHeight + felpaWidth;
        const getPrice = (key, factor = 1) => (memoizedPrices[key] ? Number(memoizedPrices[key]) * factor / 1000 : 0);

        const cabezal744Price = getPrice("cabezal744", totalWidth);
        const sillar744Price = getPrice("sillar744", totalWidth);
        const jamba744Price = getPrice("jamba744", doubleHeight);
        const horizontalSuperior744Price = getPrice("horizontalSuperior744", doubleHalfWidth);
        const horizontalInferior744Price = getPrice("horizontalInferior744", doubleHalfWidth);
        const traslape744Price = getPrice("traslape744", doubleHeight);
        const enganche744Price = getPrice("enganche744", cuadHeight);
        const empaque744Price = getPrice("empaque744", empaque744Height + empaque744Width);
        const felpaPrice = getPrice("felpacol", felpaHeight + felpaWidth);

        const tornillosPrice = (memoizedPrices.tornillos ? Number(memoizedPrices.tornillos) : 0) * 60;
        const siliconaPrice = (memoizedPrices.silicona ? Number(memoizedPrices.silicona) : 0) * 1;

        const accessoriosPrice = memoizedAccessories.reduce((sum, acc) => sum + (memoizedPrices[acc] ? Number(memoizedPrices[acc]) : 0), 0);
        const vidrioPrice = (glassUnitPrice * area);
        const total =
            cabezal744Price + sillar744Price + jamba744Price +
            horizontalInferior744Price + horizontalSuperior744Price +
            traslape744Price + enganche744Price + empaque744Price + felpaPrice +
            tornillosPrice + siliconaPrice + vidrioPrice + accessoriosPrice;

        setTotalPrice(total);
        setCalculatedValues({
            totalWidth,
            doubleHeight,
            cuadHeight,
            doubleHalfWidth,
            cabezal744Price,
            sillar744Price,
            jamba744Price,
            horizontalSuperior744Price,
            horizontalInferior744Price,
            traslape744Price,
            enganche744Price,
            empaque744Price,
            tornillosPrice,
            siliconaPrice,
            empaque744Height,
            empaque744Width,
            felpaHeight,
            felpaWidth,
            felpaPrice,
            totalFelpa,
            area,
            vidrioPrice,
            kitCierre744Price: memoizedPrices.kitCierre744 ? Number(memoizedPrices.kitCierre744) : 0,
            rodamientoSimple744Price: memoizedPrices.rodamientoSimple744 ? Number(memoizedPrices.rodamientoSimple744) * 4 : 0,

        });
    }, [width, height, memoizedPrices, memoizedAccessories, selectedGlass]);

    return { totalPrice, calculatedValues };
};

export default useCalculoPrecios;