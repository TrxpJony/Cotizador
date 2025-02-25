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
        const empaquekimHeight = totalHeight * 4;
        const empaquekimWidth = totalWidth * 2;
        const felpaHeight = totalHeight * 6;
        const felpaWidth = totalWidth * 2;
        const totalFelpa = felpaWidth + felpaHeight;
        const doubleSum = (totalWidth * 2) + (totalHeight * 2);
        const doubleSumCuad = (totalWidth * 2) + (totalHeight * 4);
        const horizontales = ((totalWidth / 2) * 4) + (totalHeight * 2);
        const getPrice = (key, factor = 1) => (memoizedPrices[key] ? Number(memoizedPrices[key]) * factor / 1000 : 0);

        const pistaRodamientokimPrice = getPrice("pistaRodamientokim", doubleSumCuad);
        const marcoPerimetralkimPrice = getPrice("marcoPerimetralkim", doubleSum);
        const pistaRodamientokalPrice = getPrice("pistaRodamientokal", doubleWidth);
        const complementoSuperiorkimPrice = getPrice("complementoSuperiorkim", doubleWidth);
        const enganchekimPrice = getPrice("enganchekim", doubleHeight);
        const engancheVidrioCakimPrice = getPrice("engancheVidrioCakim", doubleHeight);
        const verticalHorizontaleskimPrice = getPrice("verticalHorizontaleskim", horizontales);
        const verticalHorizontalesCakimPrice = getPrice("verticalHorizontalesCakim", horizontales);
        const empaquekimPrice = getPrice("empaquekim", empaquekimHeight + empaquekimWidth);
        const felpaPrice = getPrice("felpacol", felpaHeight + felpaWidth);

        const tornillosPrice = (memoizedPrices.tornillos ? Number(memoizedPrices.tornillos) : 0) * 44;
        const siliconaPrice = (memoizedPrices.silicona ? Number(memoizedPrices.silicona) : 0) * 1;

        const accessoriesPrice = memoizedAccessories.reduce((sum, acc) => sum + (memoizedPrices[acc] ? Number(memoizedPrices[acc]) : 0), 0);

        const total =
            pistaRodamientokimPrice + marcoPerimetralkimPrice + pistaRodamientokalPrice +
            complementoSuperiorkimPrice + enganchekimPrice + enganchekimPrice + engancheVidrioCakimPrice +
            verticalHorizontaleskimPrice + verticalHorizontalesCakimPrice + empaquekimPrice +
            felpaPrice + tornillosPrice + siliconaPrice + accessoriesPrice;

        setTotalPrice(total);
        setCalculatedValues({
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
            empaquekimPrice,
            felpaPrice,
            tornillosPrice,
            siliconaPrice,
            empaquekimHeight,
            empaquekimWidth,
            totalFelpa,
            escuadraEnsamblekimPrice: memoizedPrices.escuadraEnsamblekim ? Number(memoizedPrices.escuadraEnsamblekim) : 0,
            escuadraHojaPrice: memoizedPrices.escuadraHoja ? Number(memoizedPrices.escuadraHoja) : 0,
            escuadraMovilPrice: memoizedPrices.escuadraMovil ? Number(memoizedPrices.escuadraMovil) : 0,
            espumaSelloSukimPrice: memoizedPrices.espumaSelloSukim ? Number(memoizedPrices.espumaSelloSukim) : 0,
            espumaSelloInkimPrice: memoizedPrices.espumaSelloInkim ? Number(memoizedPrices.espumaSelloInkim) : 0,
            sifonSistemaskimPrice: memoizedPrices.sifonSistemaskim ? Number(memoizedPrices.sifonSistemaskim) : 0,
            kit6kimPrice: memoizedPrices.kit6kim ? Number(memoizedPrices.kit6kim) : 0,
            kit6HPrice: memoizedPrices.kit6H ? Number(memoizedPrices.kit6H) : 0,
            kit6MPrice: memoizedPrices.kit6M ? Number(memoizedPrices.kit6M) : 0,
            kit2MPrice: memoizedPrices.kit2kim ? Number(memoizedPrices.kit2kim) : 0,
            kit2HPrice: memoizedPrices.kit2H ? Number(memoizedPrices.kit2H) : 0,
            topeskimPrice: memoizedPrices.topeskim ? Number(memoizedPrices.topeskim) : 0,
            topesHPrice: memoizedPrices.topesH ? Number(memoizedPrices.topesH) : 0,
            topesMPrice: memoizedPrices.topesM ? Number(memoizedPrices.topesH) : 0,
            espumaTapaGuiakimPrice: memoizedPrices.espumaTapaGuiakim ? Number(memoizedPrices.espumaTapaGuiakim) : 0,
            espumaTapaHPrice: memoizedPrices.espumaTapaH ? Number(memoizedPrices.espumaTapaH) : 0,
            espumaTapaMPrice: memoizedPrices.espumaTapaM ? Number(memoizedPrices.espumaTapaM) : 0,
            portaEsponjakimPrice: memoizedPrices.portaEsponjakim ? Number(memoizedPrices.portaEsponjakim) : 0,
            portaEsponjaHPrice: memoizedPrices.portaEsponjaH ? Number(memoizedPrices.portaEsponjaH) : 0,
            portaEsponjaMPrice: memoizedPrices.portaEsponjaM ? Number(memoizedPrices.portaEsponjaM) : 0,
            tapaEntecierrekimPrice: memoizedPrices.tapaEntecierrekim ? Number(memoizedPrices.tapaEntecierrekim) : 0,
            tapaCierreHPrice: memoizedPrices.tapaCierreH ? Number(memoizedPrices.tapaCierreH) : 0,
            tapaCierreMPrice: memoizedPrices.tapaCierreM ? Number(memoizedPrices.tapaCierreM) : 0,
            kitHojaFijakimPrice: memoizedPrices.kitHojaFijakim ? Number(memoizedPrices.kitHojaFijakim) : 0,
            rodamientoSimplekimPrice: memoizedPrices.rodamientoSimpleKim ? Number(memoizedPrices.rodamientoSimplekim) : 0,
            rodamientoDobleKimPrice: memoizedPrices.rodamientoDoblekim ? Number(memoizedPrices.rodamientoDoblekim) : 0,
            kitPuntoCierrekimPrice: memoizedPrices.kitPuntoCierrekim ? Number(memoizedPrices.kitPuntoCierrekim) : 0,
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