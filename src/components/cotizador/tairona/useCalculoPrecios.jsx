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
        const doubleWidth = totalWidth * 2;
        const doubleTotalDimensions = doubleHeight + doubleWidth;
        const empaqueTaironaHeight = totalHeight * 4;
        const empaqueTaironaWidth = totalWidth * 2;
        const felpaHeight = totalHeight * 6;
        const felpaWidth = totalWidth * 2;
        const totalFelpa = felpaWidth + felpaHeight;
        const getPrice = (key, factor = 1) => (memoizedPrices[key] ? Number(memoizedPrices[key]) * factor / 1000 : 0);

        const marcoPerimetralTaironaPrice = getPrice("marcoPerimetralTairona", doubleTotalDimensions);
        const perimetralNaveTaironaPrice = getPrice("perimetralNaveTairona", doubleTotalDimensions);
        const pisaVidrioTaironaPrice = getPrice("pisaVidrioTairona", doubleTotalDimensions);
        const verticalHorizontalesCaTaironaPrice = getPrice("verticalHorizontalesCaTairona", doubleTotalDimensions)
        const empaqueTaironaPrice = getPrice("empaqueTairon", empaqueTaironaHeight + empaqueTaironaWidth);
        const felpaPrice = getPrice("felpacol", felpaHeight + felpaWidth);

        const tornillosPrice = (memoizedPrices.tornillos ? Number(memoizedPrices.tornillos) : 0) * 28;
        const siliconaPrice = (memoizedPrices.silicona ? Number(memoizedPrices.silicona) : 0) * 1;

        const accessoriesPrice = memoizedAccessories.reduce((sum, acc) => sum + (memoizedPrices[acc] ? Number(memoizedPrices[acc]) : 0), 0);

        const total =
            marcoPerimetralTaironaPrice + perimetralNaveTaironaPrice + pisaVidrioTaironaPrice +
            verticalHorizontalesCaTaironaPrice + empaqueTaironaPrice + felpaPrice + tornillosPrice + siliconaPrice + accessoriesPrice;

        setTotalPrice(total);
        setCalculatedValues({
            doubleTotalDimensions,
            marcoPerimetralTaironaPrice,
            perimetralNaveTaironaPrice,
            pisaVidrioTaironaPrice,
            verticalHorizontalesCaTaironaPrice,
            empaqueTaironaPrice,
            felpaPrice,
            tornillosPrice,
            siliconaPrice,
            empaqueTaironaHeight,
            empaqueTaironaWidth,
            felpaHeight,
            felpaWidth,
            totalFelpa,
            kitCierreTaironaPrice: memoizedPrices.kitCierreTairona ? Number(memoizedPrices.kitCierreTairona) : 0,
            kitCierreConLlaveTaironaPrice: memoizedPrices.kitCierreConLlaveTairona ? Number(memoizedPrices.kitCierreConLlaveTairona) : 0,
            limitador150TaironaPrice: memoizedPrices.limitador150Tairona ? Number(memoizedPrices.limitador150Tairona) : 0,
            limitador220TaironaPrice: memoizedPrices.limitador220Tairona ? Number(memoizedPrices.limitador220Tairona) : 0,
            escuadraEnsambleTaironaPrice: memoizedPrices.escuadraEnsambleTairona ? Number(memoizedPrices.escuadraEnsambleTairona) : 0,
            escuadraEnsambleHTaironaPrice: memoizedPrices.escuadraEnsambleHTairona ? Number(memoizedPrices.escuadraEnsambleHTairona) : 0,
            bisagra2TaironaPrice: memoizedPrices.bisagra2Tairona ? Number(memoizedPrices.bisagra2Tairona) : 0,
            bisagra3TaironaPrice: memoizedPrices.bisagra3Tairona ? Number(memoizedPrices.bisagra2Tairona) : 0,
            bisagraOcultaPrice: memoizedPrices.bisagraOculta ? Number(memoizedPrices.bisagraOculta) : 0,
            cierreHTaironaPrice: memoizedPrices.cierreHTairona ? Number(memoizedPrices.cierreHTairona) : 0,
            soporteHTaironaPrice: memoizedPrices.soporteHTairona ? Number(memoizedPrices.soporteHTairona) : 0,   
        });
    }, [width, height, memoizedPrices, memoizedAccessories]);

    return { totalPrice, calculatedValues };
};

export default useCalculoPrecios;