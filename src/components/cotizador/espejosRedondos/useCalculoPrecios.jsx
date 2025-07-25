import { useEffect, useState, useMemo } from "react";

const useCalculoPrecios = ({ Diameter, width, height }, selectedAccessories = [], selectedGlass = 'sinVidrio', selectedCenefa = 'sinCenefa', selectedPerfil = "sinPerfil") => {
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
        if (!Diameter || Object.keys(memoizedPrices).length === 0) return;

        const totalDiameter = Number(Diameter);
        const totalHeight = height ?? (totalDiameter + 50);
        const totalWidth = width ?? (totalDiameter + 50);
        const mtrsLineal = totalHeight * 2 + totalWidth * 2; // Perimeter for cenefa calculation
        const area = (totalHeight / 1000) * (totalWidth / 1000);
        const totalArea = area;

        const glassUnitPrice = selectedGlass === "sinVidrio" ? 0 : (memoizedPrices[selectedGlass] || 0);
        const cenefaUnitPrice = selectedCenefa === "sinCenefa" ? 0 : (memoizedPrices[selectedCenefa] || 0);
        const perfilUnitPrice = selectedPerfil === "sinPerfil" ? 0 : (memoizedPrices[selectedPerfil] || 0);

        // Determinar el precio de mano de obra según el área
        let manoDeObra = 0;
        if (totalArea <= 0.3) {
            manoDeObra = memoizedPrices.ESP_MO1 || 0;
        } else if (totalArea > 0.3 && totalArea <= 0.7) {
            manoDeObra = memoizedPrices.ESP_MO2 || 0;
        } else if (totalArea > 0.7 && totalArea <= 1.3) {
            manoDeObra = memoizedPrices.ESP_MO3 || 0;
        } else if (totalArea > 1.3) {
            manoDeObra = memoizedPrices.ESP_MO4 || 0;
        }

        const vidrioPriceRaw = (glassUnitPrice * area);
        const vidrioPrice = Math.ceil(vidrioPriceRaw / 5000) * 5000; // Redondear a múltiplos de 5000
        const accessoriesPrice = memoizedAccessories.reduce((acc, accessory) => acc + (accessory.precio || 0), 0);
        const cenefaPriceRaw = cenefaUnitPrice * mtrsLineal / 1000; // Adjusted to use the perimeter for cenefa
        const perfilPriceRaw = perfilUnitPrice * mtrsLineal / 1000; // Adjusted to use the perimeter for perfil

        // Apply minimum price logic for cenefa
        let cenefaPrice = cenefaPriceRaw;
        if (selectedCenefa === "CEN_BOT") {
            cenefaPrice = memoizedPrices.CEN_BOT || 0; // Directly use the database price for CEN_BOT
        } else if (selectedCenefa === "CEN_FAC") {
            cenefaPrice = Math.max(cenefaPriceRaw, 25000);
        } else if (selectedCenefa === "CEN_INT") {
            cenefaPrice = Math.max(cenefaPriceRaw, 30000);
        } else if (selectedCenefa === "CEN_DIF") {
            cenefaPrice = Math.max(cenefaPriceRaw, 35000);
        }

        // Redondear cenefaPrice a múltiplo de 5000
        cenefaPrice = Math.ceil(cenefaPrice / 5000) * 5000;

        // Redondear perfilPrice a múltiplo de 5000
        const perfilPrice = selectedPerfil === "sinPerfil" ? 0 : Math.ceil(Math.max(perfilPriceRaw, 25000) / 5000) * 5000;

        const total = manoDeObra + perfilPrice + vidrioPrice + cenefaPrice + accessoriesPrice;

        setTotalPrice(total);
        setCalculatedValues({
            perfilPrice,
            totalWidth,
            totalHeight,
            vidrioPrice,
            cenefaPrice,
            mtrsLineal,
            manoDeObra,
            totalArea,
        });
    }, [Diameter, width, height, memoizedPrices, memoizedAccessories, selectedGlass, selectedCenefa, selectedPerfil]);

    return { totalPrice, calculatedValues };
};

export default useCalculoPrecios;
