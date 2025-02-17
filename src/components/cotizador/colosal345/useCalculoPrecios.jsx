import { useEffect, useState, useMemo } from "react";

const useCalculoPrecios = ({ width, height }, selectedAccessories = []) => {
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

        const totalHeight = Number(height);
        const totalWidth = Number(width);
        const doubleHeight = totalHeight * 2;
        const empaquecolHeight = totalHeight * 4;
        const empaquecolWidth = totalWidth * 2;
        const felpaHeight = totalHeight * 6;
        const felpaWidth = totalWidth * 2;
        const totalFelpa = felpaHeight + felpaWidth;
        const marcoPerimetralCol345 = (totalWidth * 2) + (totalHeight * 2);
        const perimetralNaveCol345 = (totalWidth / 2 + 13) * 4 + totalHeight * 4;
        const getPrice = (key, factor = 1) => (memoizedPrices[key] ? Number(memoizedPrices[key]) * factor / 1000 : 0);

        const marcoPerimetralCol345Price = getPrice("marcoPerimetralCol345", marcoPerimetralCol345);
        const perimetralNaveCol345Price = getPrice("perimetralNaveCol345", perimetralNaveCol345);
        const engancheCol345Price = getPrice("engancheCol345", doubleHeight);
        const empaquecolPrice = getPrice("empaquecol", empaquecolHeight + empaquecolWidth);
        const felpaPrice = getPrice("felpacol", felpaHeight + felpaWidth);

        const tornillosPrice = (memoizedPrices.tornillos ? Number(memoizedPrices.tornillos) : 0) * 44;
        const siliconaPrice = (memoizedPrices.silicona ? Number(memoizedPrices.silicona) : 0) * 1;

        const accessoriesPrice = memoizedAccessories.reduce((sum, acc) => sum + (memoizedPrices[acc] ? Number(memoizedPrices[acc]) : 0), 0);

        const total =
            marcoPerimetralCol345Price + perimetralNaveCol345Price + engancheCol345Price +
            empaquecolPrice + felpaPrice + tornillosPrice + siliconaPrice + accessoriesPrice;

        setTotalPrice(total);
        setCalculatedValues({
            totalWidth,
            doubleHeight,
            marcoPerimetralCol345,
            perimetralNaveCol345,
            marcoPerimetralCol345Price,
            perimetralNaveCol345Price,
            engancheCol345Price,
            empaquecolPrice,
            tornillosPrice,
            siliconaPrice,
            empaquecolHeight,
            empaquecolWidth,
            felpaHeight,
            felpaWidth,
            felpaPrice,
            totalFelpa,
            kitCierrecol345Price: memoizedPrices.kitCierrecol345 ? Number(memoizedPrices.kitCierrecol345) : 0,
            kitCierreConLlavecol345Price: memoizedPrices.kitCierreConLlavecol345 ? Number(memoizedPrices.kitCierreConLlavecol345) : 0,
            Kit8Escuadrascol345Price: memoizedPrices.Kit8Escuadrascol345 ? Number(memoizedPrices.Kit8Escuadrascol345) : 0,
            kit4Anclascol345Price: memoizedPrices.kit4Anclascol345 ? Number(memoizedPrices.kit4Anclascol345) : 0,
            kit4Alzacol345Price: memoizedPrices.kit4Alzacol345 ? Number(memoizedPrices.kit4Alzacol345) : 0,
            kit4Tapacol345Price: memoizedPrices.kit4Tapacol345 ? Number(memoizedPrices.kit4Tapacol345) : 0,
            kit2Cortavientoscol345Price: memoizedPrices.kit2Cortavientoscol345 ? Number(memoizedPrices.kit2Cortavientoscol345) : 0,
            kit4Seguroscol345Price: memoizedPrices.kit4Seguroscol345 ? Number(memoizedPrices.kit4Seguroscol345) : 0,
            cubetaAngeoPrice: memoizedPrices.cubetaAngeo ? Number(memoizedPrices.cubetaAngeo) : 0,
            rodamientoSimple70colPrice: memoizedPrices.rodamientoSimple70col ? Number(memoizedPrices.rodamientoSimple70col) : 0,
            rodamientoDoble140colPrice: memoizedPrices.rodamientoDoble140col ? Number(memoizedPrices.rodamientoDoble140col) : 0,
            cajaDeflectoraPrice: memoizedPrices.cajaDeflectora ? Number(memoizedPrices.cajaDeflectora) : 0,
        });
    }, [width, height, memoizedPrices, memoizedAccessories]);
    
    return { totalPrice, calculatedValues };
};

export default useCalculoPrecios;