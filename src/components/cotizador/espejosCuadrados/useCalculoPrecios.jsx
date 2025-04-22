import { useEffect, useState, useMemo } from "react";

const useCalculoPrecios = ({ width, height }, selectedAccessories = [], selectedGlass = 'sinVidrio', selectedCenefa = 'sinCenefa', selectedPerfil = "sinPerfil", selectedCut = "alCorte") => {
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
        if (!width || !height || Object.keys(memoizedPrices).length === 0) return;

        const totalHeight = Number(height);
        const totalWidth = Number(width);
        const mtrsLineal = totalHeight * 2 + totalWidth * 2; // Perimeter for cenefa calculation
        const area = (totalHeight / 1000) * (totalWidth / 1000);
        const totalArea = area;

        const glassUnitPrice = selectedGlass === "sinVidrio" ? 0 : (memoizedPrices[selectedGlass] || 0);
        const cenefaUnitPrice = selectedCenefa === "sinCenefa" ? 0 : (memoizedPrices[selectedCenefa] || 0);
        const perfilUnitPrice = selectedPerfil === "sinPerfil" ? 0 : (memoizedPrices[selectedPerfil] || 0);
        const cutUnitPrice = selectedCut === "alCorte" ? 0 : (memoizedPrices[selectedCut] || 0);

        // Determinar el precio de mano de obra según el área
        let manoDeObra = 0;
        if (totalArea <= 0.6) {
            manoDeObra = memoizedPrices.ESP_MO1 || 0;
        } else if (totalArea > 0.6 && totalArea <= 1.5) {
            manoDeObra = memoizedPrices.ESP_MO2 || 0;
        } else if (totalArea > 1.5 && totalArea <= 2) {
            manoDeObra = memoizedPrices.ESP_MO3 || 0;
        } else if (totalArea > 2) {
            manoDeObra = memoizedPrices.ESP_MO4 || 0;
        }
        
        const vidrioPriceRaw = (glassUnitPrice * area);
        const vidrioPrice = Math.ceil(vidrioPriceRaw / 5000) * 5000;
        const cutPrice = cutUnitPrice * mtrsLineal / 1000;
        const accessoriesPrice = memoizedAccessories.reduce((acc, accessory) => acc + (accessory.precio || 0), 0);
        const cenefaPriceRaw = cenefaUnitPrice * mtrsLineal / 1000; // Adjusted to use the perimeter for cenefa
        const perfilPriceRaw = perfilUnitPrice * mtrsLineal / 1000; // Adjusted to use the perimeter for perfil

        // Apply minimum price logic for cenefa
        let cenefaPrice = cenefaPriceRaw;
        if (selectedCenefa === "CEN_BOT") {
            cenefaPrice = memoizedPrices.CEN_BOT || 0; // directly use the database price for CEN_BOT
        } else if (selectedCenefa === "CEN_FAC") {
            cenefaPrice = Math.max(cenefaPriceRaw, 25000);
        } else if (selectedCenefa === "CEN_INT") {
            cenefaPrice = Math.max(cenefaPriceRaw, 30000);
        } else if (selectedCenefa === "CEN_DIF") {
            cenefaPrice = Math.max(cenefaPriceRaw, 35000);
        }

        const perfilPrice = selectedPerfil === "sinPerfil" ? 0 : Math.max(perfilPriceRaw, 25000);

        const total = perfilPrice + vidrioPrice + cenefaPrice + accessoriesPrice + manoDeObra + cutPrice;

        setTotalPrice(total);
        setCalculatedValues({
            perfilPrice,
            totalWidth,
            totalHeight,
            vidrioPrice,
            cenefaPrice,
            cutPrice,
            mtrsLineal,
            totalArea,
            manoDeObra,
        });
    }, [width, height, memoizedPrices, memoizedAccessories, selectedGlass, selectedCenefa, selectedPerfil, selectedCut]);

    return { totalPrice, calculatedValues };
};

export default useCalculoPrecios;
