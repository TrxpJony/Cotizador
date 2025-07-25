import { useEffect, useState, useMemo } from "react";

const useCalculoPrecios = ({ width, height }, selectedAccessories = [], selectedGlass = 'sinVidrio', selectedPerfil = 'sinPerfil') => { // Asegúrate de agregar 'vidrioPrice' como prop
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

    // Convertimos en números las dimensiones para evitar NaN
    const totalHeight = Number(height) || 0;
    const totalWidth = Number(width) || 0;

    const area = (totalHeight / 1000) * (totalWidth / 1000);
    const glassUnitPrice = selectedGlass === "sinVidrio" ? 0 : (memoizedPrices[selectedGlass] || 0);
    const perfilUnitPrice = selectedPerfil === "sinPerfil" ? 0 : (memoizedPrices[selectedPerfil] || 0);


    const felpaHeight = totalHeight * 6;
    const felpaWidth = totalWidth * 2;
    const totalFelpa = felpaHeight + felpaWidth;

    const marcoCocina = (totalWidth && totalHeight) ? (totalWidth * 2 + totalHeight * 2) : 0;

    const getPrice = (key, factor = 1) => (memoizedPrices[key] ? Number(memoizedPrices[key]) * factor / 1000 : 0);

    const felpaPrice = getPrice("felpacol", felpaHeight + felpaWidth);
    const siliconaPrice = (memoizedPrices.silicona ? Number(memoizedPrices.silicona) : 0) * 1;
    // Aquí permitimos que los accesorios se sumen sin importar si las dimensiones están establecidas
    const accesoriosPrice = memoizedAccessories.reduce((sum, acc) => {
      if (acc === "manijaPuertaCocina") {
        return sum + (memoizedPrices.manijaPuertaCocina ? Number(memoizedPrices.manijaPuertaCocina) * (totalHeight / 1000) : 0);
      }
      return sum + (memoizedPrices[acc] ? Number(memoizedPrices[acc]) : 0);
    }, 0);
    const vidrioPrice = (glassUnitPrice * area); // Si es "sinVidrio", será 0
    const marcoPrice = (perfilUnitPrice * marcoCocina) / 1000;

    // Determinar el precio de mano de obra según el área
    let manoDeObra = 0;
    if (totalHeight < 1900 || totalWidth < 1900) {
      manoDeObra = memoizedPrices.PUC_MO1 || 0;
    } else if (totalHeight > 1900 || totalWidth > 1900) {
      manoDeObra = memoizedPrices.PUC_MO2 || 0;
    }

    // Se suma siempre el precio de los accesorios al total, aunque width y height sean 
    const total =  accesoriosPrice + manoDeObra + vidrioPrice + marcoPrice;

    setTotalPrice(total);
    setCalculatedValues({
      marcoCocina,
      siliconaPrice,
      felpaHeight,
      felpaWidth,
      felpaPrice,
      totalFelpa,
      area,
      vidrioPrice,
      marcoPrice,
      escuadrasCocinaPrice: memoizedPrices.escuadrasCocina ? Number(memoizedPrices.escuadrasCocina) : 0,
      manijaPuertaCocinaPrice: memoizedPrices.manijaPuertaCocina ? (Number(memoizedPrices.manijaPuertaCocina) * (totalHeight / 1000)) : 0,

    });
  }, [width, height, memoizedPrices, memoizedAccessories, selectedGlass, selectedPerfil]); // Asegúrate de agregar vidrioPrice en las dependencias


  return { totalPrice, calculatedValues };
};

export default useCalculoPrecios;