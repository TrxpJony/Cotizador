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

                const PricesObject = data.reduce((acc, item) => {
                    acc[item.nombre] = Number(item.precio) || 0;
                    return acc;
                }, {});

                setDbPrices(PricesObject);
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
        const verticalInferiorAwa = totalWidth + totalHeight * 2;
        const halfCuadDouble = ((totalWidth / 2) * 4) + totalHeight * 4;
        const empaqueAwaHeight = totalHeight * 4;
        const empaqueAwaWidth = totalWidth * 2;
        const felpaHeight = totalHeight * 6;
        const felpaWidth = totalWidth * 2;
        const totalFelpa = felpaHeight + felpaWidth;
        const getPrice = (key, factor = 1) => (memoizedPrices[key] ? Number(memoizedPrices[key]) * factor / 1000 : 0);

        const compensadorAwaPrice = getPrice("compensadorAwa", totalWidth);
        const cabezalAwaPrice = getPrice("cabezalAwa", totalWidth);
        const verticalInferiorAwaPrice = getPrice("verticalInferiorAwa", verticalInferiorAwa);
        const sillarEmpotrarAwaPrice = getPrice("sillarEmpotrarAwa", totalWidth);
        const sillaSobreponerAwaPrice = getPrice("sillaSobreponerAwa", totalWidth);
        const perimetralAwaPrice = getPrice("perimetralAwa", halfCuadDouble);
        const pisavidrioPerimetralAwaPrice = getPrice("pisavidrioPerimetralAwa", halfCuadDouble);
        const empaqueAwaPrice = getPrice("empaqueAwa", empaqueAwaHeight + empaqueAwaWidth);
        const felpaPrice = getPrice("felpacol", felpaHeight + felpaWidth);

        const tornillosPrice = (memoizedPrices.tornillos ? Number(memoizedPrices.tornillos) : 0) * 44;
        const siliconaPrice = (memoizedPrices.silicona ? Number(memoizedPrices.silicona) : 0) * 1;

        const AccesoriosPrice = memoizedAccessories.reduce((sum, acc) => sum + (memoizedPrices[acc] ? Number(memoizedPrices[acc]) : 0), 0);

        const total =
            compensadorAwaPrice + cabezalAwaPrice + verticalInferiorAwaPrice +
            sillarEmpotrarAwaPrice + sillaSobreponerAwaPrice + perimetralAwaPrice + pisavidrioPerimetralAwaPrice +
            empaqueAwaPrice + felpaPrice + tornillosPrice + siliconaPrice + AccesoriosPrice;

        setTotalPrice(total);
        setCalculatedValues({
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
            kitManijaAwaPrice: memoizedPrices.kitManijaAwa ? Number(memoizedPrices.kitManijaAwa) : 0,
            kitManijaConLlaveAwaPrice: memoizedPrices.kitManijaConLlaveAwa ? Number(memoizedPrices.kitManijaConLlaveAwa) : 0,
            escuadraEnsambleAwaPrice: memoizedPrices.escuadraEnsambleAwa ? Number(memoizedPrices.escuadraEnsambleAwa) : 0,
            escuadraEnsambleHAwaPrice: memoizedPrices.escuadraEnsambleHAwa ? Number(memoizedPrices.escuadraEnsambleHAwa) : 0,
            bisagra3AwaPrice: memoizedPrices.bisagra3Awa ? Number(memoizedPrices.bisagra3Awa) : 0,
            kitRodamientosAwaPrice: memoizedPrices.kitRodamientosAwa ? Number(memoizedPrices.kitRodamientosAwa) : 0,
            frenoRodamientoAwaPrice: memoizedPrices.frenoRodamientoAwa ? Number(memoizedPrices.frenoRodamientoAwa) : 0,
            kitGuiaHAwaPrice: memoizedPrices.kitGuiaHAwa ? Number(memoizedPrices.kitGuiaHAwa) : 0,
        });
    }, [width, height, memoizedPrices, memoizedAccessories]);

    return { totalPrice, calculatedValues };
};

export default useCalculoPrecios;
