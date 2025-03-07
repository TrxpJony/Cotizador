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
        const doubleheight = totalHeight * 2;
        const doubleWidth = totalWidth * 2;
        const doubleTotalDimensions = doubleheight + doubleWidth;
        const empaqueZinuHeight = totalHeight * 4;
        const empaqueZinuWidth = totalWidth * 2;
        const felpaHeight = totalHeight * 6;
        const felpaWidth = totalWidth * 2;
        const totalFelpa = felpaWidth + felpaHeight;
        const getPrice = (key, factor = 1) => (memoizedPrices[key] ? Number(memoizedPrices[key]) * factor / 1000 : 0);

        const marcoPerimetralZinuPrice = getPrice("marcoPerimetralZinu", doubleTotalDimensions);
        const divisorZinuPrice = getPrice("divisorZinu", totalHeight);
        const perimetralNaveZinuPrice = getPrice("perimetralNaveZinu", doubleTotalDimensions);
        const pisaVidrioZinuPrice = getPrice("pisaVidrioZinu", doubleTotalDimensions);
        const verticalHorizontalesCaZinuPrice = getPrice("verticalHorizontalesCaZinu", doubleTotalDimensions);
        const empaqueZinuPrice = getPrice("empaqueZinu", empaqueZinuHeight + empaqueZinuWidth);
        const felpaPrice = getPrice("felpacol", felpaHeight + felpaWidth);

        const tornillosPrice = (memoizedPrices.tornillos ? Number(memoizedPrices.tornillos) : 0) * 28;
        const siliconaPrice = (memoizedPrices.silicona ? Number(memoizedPrices.silicona) : 0) * 1;

        const accessoriesPrice = memoizedAccessories.reduce((sum, acc) => sum + (memoizedPrices[acc] ? Number(memoizedPrices[acc]) : 0), 0);

        const total =
            marcoPerimetralZinuPrice + divisorZinuPrice + perimetralNaveZinuPrice +
            pisaVidrioZinuPrice + verticalHorizontalesCaZinuPrice + empaqueZinuPrice + felpaPrice
            + tornillosPrice + siliconaPrice + accessoriesPrice;

        setTotalPrice(total);
        setCalculatedValues({
            doubleTotalDimensions,
            totalHeight,
            marcoPerimetralZinuPrice,
            divisorZinuPrice,
            perimetralNaveZinuPrice,
            pisaVidrioZinuPrice,
            verticalHorizontalesCaZinuPrice,
            empaqueZinuPrice,
            felpaPrice,
            tornillosPrice,
            siliconaPrice,
            empaqueZinuHeight,
            empaqueZinuWidth,
            totalFelpa,
            kitCierreZinuPrice: memoizedPrices.kitCierreZinu ? Number(memoizedPrices.kitCierreZinu) : 0,
            kitCierreConLlaveZinuPrice: memoizedPrices.kitCierreConLlaveZinu ? Number(memoizedPrices.kitCierreConLlaveZinu) : 0,
            limitador150ZinuPrice: memoizedPrices.limitador150Zinu ? Number(memoizedPrices.limitador150Zinu) : 0,
            limitador220ZinuPrice: memoizedPrices.limitador220Zinu ? Number(memoizedPrices.limitador220Zinu) : 0,
            escuadraEnsambleZinuPrice: memoizedPrices.escuadraEnsambleZinu ? Number(memoizedPrices.escuadraEnsambleZinu) : 0,
            escuadraEnsambleHZinuPrice: memoizedPrices.escuadraEnsambleHZinu ? Number(memoizedPrices.escuadraEnsambleHZinu) : 0,
            bisagra2ZinuPrice: memoizedPrices.bisagra2Zinu ? Number(memoizedPrices.bisagra2Zinu) : 0,
            cierreHZinuPrice: memoizedPrices.cierreHZinu ? Number(memoizedPrices.bisagra2Zinu) : 0,
            soporteHTaironaPrice: memoizedPrices.soporteHTairona ? Number(memoizedPrices.soporteHTairona) : 0,
            bisagraOcultaPrice: memoizedPrices.bisagraOculta ? Number(memoizedPrices.bisagraOculta) : 0,
            pletinaPoliamidaPrice: memoizedPrices.pletinaPoliamida ? Number(memoizedPrices.pletinaPoliamida) : 0,
        });
    }, [width, height, memoizedPrices, memoizedAccessories]);

    return { totalPrice, calculatedValues };
};

export default useCalculoPrecios;