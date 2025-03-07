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
        const marcoPerimetralSid = totalWidth + doubleHeight;
        const empaqueSidHeight = totalHeight * 4;
        const empaqueSidWidth = totalWidth * 2;
        const felpaHeight = totalHeight * 6;
        const felpaWidth = totalWidth * 2;
        const totalFelpa = felpaHeight + felpaWidth;
        const getPrice = (key, factor = 1) => (memoizedPrices[key] ? Number(memoizedPrices[key]) * factor / 1000 : 0);

        const marcoPerimetralSidPrice = getPrice("marcoPerimetralSid", marcoPerimetralSid);
        const horizontalFelperosSidPrice = getPrice("horizontalFelperosSid", doubleWidth);
        const verticalSidPrice = getPrice("verticalSid", doubleHeight);
        const verticalReforzadoSidPrice = getPrice("verticalReforzadoSid", doubleHeight);
        const empaqueSidPrice = getPrice("empaqueSid", empaqueSidHeight + empaqueSidWidth);
        const felpaPrice = getPrice("felpacol", felpaHeight + felpaWidth);

        const tornillosPrice = (memoizedPrices.tornillos ? Number(memoizedPrices.tornillos) : 0) * 28;
        const siliconaPrice = (memoizedPrices.silicona ? Number(memoizedPrices.silicona) : 0) * 1;

        const accessoriesPrice = memoizedAccessories.reduce((sum, acc) => sum + (memoizedPrices[acc] ? Number(memoizedPrices[acc]) : 0), 0);

        const total =
            marcoPerimetralSidPrice + horizontalFelperosSidPrice + verticalSidPrice +
            verticalReforzadoSidPrice + empaqueSidPrice + felpaPrice + tornillosPrice + siliconaPrice + accessoriesPrice;

        setTotalPrice(total);
        setCalculatedValues({
            doubleHeight,
            doubleWidth,
            marcoPerimetralSid,
            marcoPerimetralSidPrice,
            horizontalFelperosSidPrice,
            verticalSidPrice,
            verticalReforzadoSidPrice,
            empaqueSidPrice,
            felpaPrice,
            tornillosPrice,
            siliconaPrice,
            empaqueSidHeight,
            empaqueSidWidth,
            felpaHeight,
            felpaWidth,
            totalFelpa,
            kitManijaDobleSidPrice: memoizedPrices.kitManijaDobleSid ? Number(memoizedPrices.kitManijaDobleSid) : 0,
            bisagra2SidPrice: memoizedPrices.bisagra2Sid ? Number(memoizedPrices.bisagra2Sid) : 0,
            bisagra2aletasregulablePrice: memoizedPrices.bisagra2aletasregulable ? Number(memoizedPrices.bisagra2aletasregulable) : 0,
            bisagra3SidPrice: memoizedPrices.bisagra3Sid ? Number(memoizedPrices.bisagra3Sid) : 0,
            escuadraEnsambleSidPrice: memoizedPrices.escuadraEnsambleSid ? Number(memoizedPrices.escuadraEnsambleSid) : 0,
            bisagraOcultaPrice: memoizedPrices.bisagraOculta ? Number(memoizedPrices.bisagraOculta) : 0,
            kitFallevbaSidPrice: memoizedPrices.kitFallevbaSid ? Number(memoizedPrices.kitFallevbaSid) : 0,
            terminalesSidPrice: memoizedPrices.terminalesSid ? Number(memoizedPrices.terminalesSid) : 0,
            kit50puntoCierreSidPrice: memoizedPrices.kit50puntoCierreSid ? Number(memoizedPrices.kit50puntoCierreSid) : 0,
        });
    }, [width, height, memoizedPrices, memoizedAccessories]);

    return { totalPrice, calculatedValues };
};

export default useCalculoPrecios;