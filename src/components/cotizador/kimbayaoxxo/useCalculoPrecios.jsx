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
        const cuadHeight = totalHeight * 4
        const empaquekimHeight = totalHeight * 4;
        const empaquekimWidth = totalWidth * 2;
        const felpaHeight = totalHeight * 6;
        const felpaWidth = totalWidth * 2;
        const totalFelpa = felpaWidth + felpaHeight;
        const doubleSum = (totalWidth * 2) + (totalWidth * 2);
        const doubleSumCuad = (totalWidth * 2) + (totalHeight * 4);
        const horizontales = ((totalWidth / 4) * 8) + (totalHeight * 4);
        const getPrice = (key, factor = 1) => (memoizedPrices[key] ? Number(memoizedPrices[key]) * factor / 1000 : 0);

        const pistaRodamientokimPrice = getPrice("pistaRodamientokim", doubleSumCuad);
        const marcoPerimetralkimPrice = getPrice("marcoPerimetralkim", doubleSum);
        const pistaRodamientokalPrice = getPrice("pistaRodamientokal", doubleWidth);
        const complementoSuperiorkimPrice = getPrice("complementoSuperiorkim", doubleWidth);
        const enganchekimPrice = getPrice("enganchekim", cuadHeight);
        const engancheVidrioCakimPrice = getPrice("engancheVidrioCakim", totalWidth);
        const verticalHorizontaleskimPrice = getPrice("verticalHorizontaleskim", horizontales);
        const verticalHorizontalesCakimPrice = getPrice("verticalHorizontalesCakim", horizontales);
        const adaptadorKimPrice = getPrice("adaptadorKim", totalHeight);
        const empaquekimPrice = getPrice("empaquekim", empaquekimHeight + empaquekimWidth);
        const felpaPrice = getPrice("felpacol", felpaHeight + felpaWidth);

        const tornillosPrice = (memoizedPrices.tornillos ? Number(memoizedPrices.tornillos) : 0) * 76;
        const siliconaPrice = (memoizedPrices.silicona ? Number(memoizedPrices.silicona) : 0) * 1;
        const escuadraEnsamblekimPrice = (memoizedPrices.escuadraEnsamblekim ? Number(memoizedPrices.escuadraEnsamblekim) : 0) * 3;
        const espumaSelloSukimPrice = (memoizedPrices.espumaSelloSukim ? Number(memoizedPrices.espumaSelloSukim) : 0) * 1;
        const espumaSelloInkimPrice = (memoizedPrices.espumaSelloInkim ? Number(memoizedPrices.espumaSelloInkim) : 0) * 1;
        const sifonSistemaskimPrice = (memoizedPrices.sifonSistemaskim ? Number(memoizedPrices.sifonSistemaskim) : 0) * 1;
        const kit6kimPrice = (memoizedPrices.kit6kim ? Number(memoizedPrices.kit6kim) : 0) * 2;
        const kit2kimPrice = (memoizedPrices.kit2kim ? Number(memoizedPrices.kit2kim) : 0) * 2;
        const topeskimPrice = (memoizedPrices.topeskim ? Number(memoizedPrices.topeskim) : 0) * 2;
        const espumaTapaGuiakimPrice = (memoizedPrices.espumaTapaGuiakim ? Number(memoizedPrices.espumaTapaGuiakim) : 0) * 2;
        const portaEsponjaKimPrice = (memoizedPrices.portaEsponjakim ? Number(memoizedPrices.portaEsponjakim) : 0) * 2;
        const tapaEntrecierrekimPrice = (memoizedPrices.tapaEntrecierrekim ? Number(memoizedPrices.tapaEntrecierrekim) : 0) * 2;
        const kitHojaFijakimPrice = (memoizedPrices.kitHojaFijakim ? Number(memoizedPrices.kitHojaFijakim) : 0) * 1;
        const kitPuntoCierrekimPrice = (memoizedPrices.kitPuntoCierrekim ? Number(memoizedPrices.kitPuntoCierrekim) : 0) * 1;

        const accessoriesPrice = memoizedAccessories.reduce((sum, acc) => sum + (memoizedPrices[acc] ? Number(memoizedPrices[acc]) : 0), 0);

        const total =
            pistaRodamientokimPrice + marcoPerimetralkimPrice + pistaRodamientokalPrice +
            complementoSuperiorkimPrice + enganchekimPrice + engancheVidrioCakimPrice +
            verticalHorizontaleskimPrice + verticalHorizontalesCakimPrice + adaptadorKimPrice + empaquekimPrice +
            felpaPrice + tornillosPrice + siliconaPrice + accessoriesPrice +
            escuadraEnsamblekimPrice + espumaSelloSukimPrice + espumaSelloInkimPrice + sifonSistemaskimPrice +
            kit6kimPrice + kit2kimPrice + topeskimPrice + espumaTapaGuiakimPrice + portaEsponjaKimPrice +
            tapaEntrecierrekimPrice + kitHojaFijakimPrice + kitPuntoCierrekimPrice;

        setTotalPrice(total);
        setCalculatedValues({
            totalWidth,
            totalHeight,
            doubleSum,
            doubleSumCuad,
            doubleWidth,
            doubleHeight,
            horizontales,
            pistaRodamientokimPrice,
            marcoPerimetralkimPrice,
            pistaRodamientokalPrice,
            complementoSuperiorkimPrice,
            enganchekimPrice,
            engancheVidrioCakimPrice,
            verticalHorizontaleskimPrice,
            verticalHorizontalesCakimPrice,
            adaptadorKimPrice,
            empaquekimPrice,
            felpaPrice,
            tornillosPrice,
            siliconaPrice,
            escuadraEnsamblekimPrice,
            espumaSelloSukimPrice,
            espumaSelloInkimPrice,
            sifonSistemaskimPrice,
            kit6kimPrice,
            kit2kimPrice,
            topeskimPrice,
            espumaTapaGuiakimPrice,
            portaEsponjaKimPrice,
            tapaEntrecierrekimPrice,
            kitHojaFijakimPrice,
            kitPuntoCierrekimPrice,
            empaquekimHeight,
            empaquekimWidth,
            totalFelpa,
            kitManijakimPrice: memoizedPrices.kitManijakim ? Number(memoizedPrices.kitManijakim) : 0,
            kitManijaConLlavekimPrice: memoizedPrices.kitManijaConLlavekim ? Number(memoizedPrices.kitManijaConLlavekim) : 0,
            pletinaPoliamidaPrice: memoizedPrices.pletinaPoliamida ? Number(memoizedPrices.pletinaPoliamida) : 0,
            empaqueBurbujakimPrice: memoizedPrices.empaqueBurbujakim ? Number(memoizedPrices.empaqueBurbujakim) : 0,
            cajaDeflectoraPrice: memoizedPrices.cajaDeflectora ? Number(memoizedPrices.cajaDeflectora) : 0,
        });
    }, [width, height, memoizedPrices, memoizedAccessories])

    return { totalPrice, calculatedValues };
};

export default useCalculoPrecios;