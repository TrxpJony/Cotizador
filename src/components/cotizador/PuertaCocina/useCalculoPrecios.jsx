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

    // Convertimos en números las dimensiones para evitar NaN
    const totalHeight = Number(height) || 0;
    const totalWidth = Number(width) || 0;

    const felpaHeight = totalHeight * 6;
    const felpaWidth = totalWidth * 2;
    const totalFelpa = felpaHeight + felpaWidth;

    const marcoCocina = (totalWidth && totalHeight) ? (totalWidth * 2 + totalHeight * 2) : 0;

    const getPrice = (key, factor = 1) => (memoizedPrices[key] ? Number(memoizedPrices[key]) * factor / 1000 : 0);

    const marcoCocinaPrice = getPrice("marcoCocina", marcoCocina);
    const felpaPrice = getPrice("felpacol", felpaHeight + felpaWidth);
    const siliconaPrice = (memoizedPrices.silicona ? Number(memoizedPrices.silicona) : 0) * 1;

    // Aquí permitimos que los accesorios se sumen sin importar si las dimensiones están establecidas
    const accesoriosPrice = memoizedAccessories.reduce((sum, acc) => sum + (memoizedPrices[acc] ? Number(memoizedPrices[acc]) : 0), 0);

    // Se suma siempre el precio de los accesorios al total, aunque width y height sean 0
    const total = marcoCocinaPrice + siliconaPrice + accesoriosPrice + felpaPrice;

    setTotalPrice(total);
    setCalculatedValues({
      totalWidth,
      marcoCocinaPrice,
      siliconaPrice,
      felpaHeight,
      felpaWidth,
      felpaPrice,
      totalFelpa,
      escuadrasCocinaPrice: memoizedPrices.escuadrasCocina ? Number(memoizedPrices.escuadrasCocina) : 0,
      perfilNegroCocinaPrice: memoizedPrices.perfilNegroCocina ? Number(memoizedPrices.perfilNegroCocina) : 0,
    });
}, [width, height, memoizedPrices, memoizedAccessories]);


  return { totalPrice, calculatedValues };
};

export default useCalculoPrecios;