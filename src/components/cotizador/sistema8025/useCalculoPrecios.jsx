import { useEffect, useState, useMemo } from "react";

const useCalculoPrecios = ({ width, height }, selectedAccessories = [], selectedGlass = 'sinVidrio') => {
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
                console.error('Error al cargar los precios', error);
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

        const halfwidth = Number(width) / 2;
        const totalHeight = Number(height);
        const totalWidth = Number(width);
        const doubleHeight = totalHeight * 2;
        const doubleHalfWidth = halfwidth * 2;
        const empaque744Height = totalHeight * 4;
        const empaque744Width = totalWidth * 2;
        const felpaHeight = totalHeight * 6;
        const felpaWidth = totalWidth * 2;
        const totalFelpa = felpaHeight + felpaWidth;
        const getPrice = (key, factor = 1) => (memoizedPrices[key] ? Number(memoizedPrices[key]) * factor / 1000 : 0);
        const area = (totalHeight / 1000) * (totalWidth / 1000);

        const cabezal8025Price = getPrice("cabezal8025", totalWidth);
        const sillar8025Price = getPrice("sillar8025", totalWidth);
        const jamba8025Price = getPrice("jamba8025", doubleHeight);
        const horizontalSuperior8025Price = getPrice("horizontalSuperior8025", doubleHalfWidth);
        const horizontalInferior8025Price = getPrice("horizontalInferior8025", doubleHalfWidth);
        const traslape8025Price = getPrice("traslape8025", doubleHeight);
        const enganche8025Price = getPrice("enganche8025", doubleHeight);
        const empaque744Price = getPrice("empaque744", empaque744Height + empaque744Width);
        const felpaPrice = getPrice("felpacol", felpaHeight + felpaWidth);
        const glassUnitPrice = selectedGlass === "sinVidrio" ? 0 : (memoizedPrices[selectedGlass] || 0);
        const vidrioPrice = glassUnitPrice * area;

        const tornillosPrice = (memoizedPrices.tornillos ? Number(memoizedPrices.tornillos) : 0) * 44;
        const siliconaPrice = (memoizedPrices.silicona ? Number(memoizedPrices.silicona) : 0) * 1;

        const accesoriosPrice = memoizedAccessories.reduce((sum, acc) => {
            if (acc === "rodamientoSimple8025" || acc === "rodamientoDoble8025") {
                return sum + (memoizedPrices[acc] ? Number(memoizedPrices[acc]) * 2 : 0);
            }
            return sum + (memoizedPrices[acc] ? Number(memoizedPrices[acc]) : 0);
        }, 0);

        const total =
            cabezal8025Price + sillar8025Price + jamba8025Price +
            horizontalSuperior8025Price + horizontalInferior8025Price + vidrioPrice +
            traslape8025Price + enganche8025Price + empaque744Price + tornillosPrice + siliconaPrice + accesoriosPrice + felpaPrice;

        setTotalPrice(total);
        setCalculatedValues({
            totalWidth,
            doubleHeight,
            halfwidth,
            doubleHalfWidth,
            cabezal8025Price,
            sillar8025Price,
            jamba8025Price,
            horizontalSuperior8025Price,
            horizontalInferior8025Price,
            traslape8025Price,
            enganche8025Price,
            empaque744Price,
            tornillosPrice,
            siliconaPrice,
            empaque744Height,
            empaque744Width,
            felpaHeight,
            felpaWidth,
            felpaPrice,
            totalFelpa,
            vidrioPrice,
            area,
            kitCierre8025Price: memoizedPrices.kitCierre8025 ? Number(memoizedPrices.kitCierre8025) : 0,
            kitCierreConLlave8025Price: memoizedPrices.kitCierreConLlave8025Price ? Number(memoizedPrices.kitCierre8025) : 0,
            rodamientoSimple8025Price: memoizedPrices.rodamientoSimple8025 ? Number(memoizedPrices.rodamientoSimple8025) * 2 : 0,
            rodamientoDoble8025Price: memoizedPrices.rodamientoDoble8025 ? Number(memoizedPrices.rodamientoDoble8025) * 2 : 0,
        });
    }, [width, height, memoizedPrices, memoizedAccessories, selectedGlass]);

    return { totalPrice, calculatedValues };
};

export default useCalculoPrecios;