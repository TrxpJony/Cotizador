
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
        const aln1101s3890 = doubleHeight + doubleWidth;
        const empaque3890Height = totalHeight * 4;
        const empaque3890Width = totalWidth * 2;
        const felpaHeight = felpaHeight * 6;
        const felpaWidth = totalWidth * 2;
        const totalFelpa = felpaWidth + felpaHeight;
        const getPrice = (key, factor = 1) => (memoizedPrices[key] ? Number(memoizedPrices[key]) * factor / 1000 : 0);

        const aln1101s3890Price = getPrice("aln1101s3890", aln1101s3890);
        const aln1102s3890Price = getPrice("aln1102s3890", totalWidth);
        const empaque3890Price = getPrice("empaque3890", empaque3890Height + empaque3890Width);
        const felpaPrice = getPrice("felpacol", felpaHeight + felpaWidth);

        const tornillosPrice = (memoizedPrices.tornillos ? Number(memoizedPrices.tornillos) : 0) * 44;
        const siliconaPrice = (memoizedPrices.silicona ? Number(memoizedPrices.silicona) : 0) * 1;

        const accessoriesPrice = memoizedAccessories.reduce((sum, acc) => sum + (memoizedPrices[acc] ? Number(memoizedPrices[acc]) : 0), 0);

        const total =
            aln1101s3890Price + aln1102s3890Price + empaque3890Price + felpaPrice +
            tornillosPrice + siliconaPrice + accessoriesPrice

        setTotalPrice(total),
            setCalculatedValues({
                totalWidth,
                aln1101s3890,
                aln1101s3890Price,
                aln1102s3890Price,
                empaque3890Price,
                felpaPrice,
                tornillosPrice,
                siliconaPrice,
                empaque3890Height,
                empaque3890Width,
                totalFelpa,
                kitCierre3890Price: memoizedPrices.kitCierre3890 ? Number(memoizedPrices.kitCierre3890) : 0,
                kitCierreConLlave3890Price: memoizedPrices.kitCierreConLlave3890 ? Number(memoizedPrices.kitCierreConLlave3890) : 0,
            });
    }, [width, height, memoizedPrices, memoizedAccessories]);

    return { totalPrice, calculatedValues };
};

export default useCalculoPrecios;