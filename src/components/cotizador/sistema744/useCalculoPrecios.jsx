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
    
    const halfWidth = Number(width) / 2;
    const totalHeight = Number(height);
    const totalWidth = Number(width);
    const doubleHeight = totalHeight * 2;
    const doubleHalfWidth = halfWidth * 2;
    const empaque744Height = totalHeight * 4;
    const empaque744Width = totalWidth * 2;
    const felpaHeight = totalHeight * 6;
    const felpaWidth = totalWidth * 2;
    const totalFelpa = felpaHeight + felpaWidth;
    const getPrice = (key, factor = 1) => (memoizedPrices[key] ? Number(memoizedPrices[key]) * factor / 1000 : 0);

    const cabezal744Price = getPrice("cabezal744", totalWidth);
    const sillar744Price = getPrice("sillar744", totalWidth);
    const jamba744Price = getPrice("jamba744", doubleHeight);
    const horizontalSuperior744Price = getPrice("horizontalSuperior744", doubleHalfWidth);
    const horizontalInferior744Price = getPrice("horizontalInferior744", doubleHalfWidth);
    const traslape744Price = getPrice("traslape744", doubleHeight);
    const enganche744Price = getPrice("enganche744", doubleHeight);
    const empaque744Price = getPrice("empaque744", empaque744Height + empaque744Width);
    const felpaPrice = getPrice("felpacol", felpaHeight + felpaWidth);

    const tornillosPrice = (memoizedPrices.tornillos ? Number(memoizedPrices.tornillos) : 0) * 44;
    const siliconaPrice = (memoizedPrices.silicona ? Number(memoizedPrices.silicona) : 0) * 1;

    const accesoriosPrice = memoizedAccessories.reduce((sum, acc) => sum + (memoizedPrices[acc] ? Number(memoizedPrices[acc]) : 0), 0);

    const total = 
      cabezal744Price + sillar744Price + jamba744Price + 
      horizontalSuperior744Price + horizontalInferior744Price + 
      traslape744Price + enganche744Price + empaque744Price + tornillosPrice + siliconaPrice + accesoriosPrice + felpaPrice;

    setTotalPrice(total);
    setCalculatedValues({
      totalWidth,
      doubleHeight,
      halfWidth,
      doubleHalfWidth,
      cabezal744Price,
      sillar744Price,
      jamba744Price,
      horizontalSuperior744Price,
      horizontalInferior744Price,
      traslape744Price,
      enganche744Price,
      empaque744Price,
      tornillosPrice,
      siliconaPrice,
      empaque744Height,
      empaque744Width,
      felpaHeight,
      felpaWidth,
      felpaPrice,
      totalFelpa,
      kitCierre744Price: memoizedPrices.kitCierre744 ? Number(memoizedPrices.kitCierre744) : 0,
      rodamientoSimple744Price: memoizedPrices.rodamientoSimple744 ? Number(memoizedPrices.rodamientoSimple744) : 0,
     
    });
  }, [width, height, memoizedPrices, memoizedAccessories]);

  return { totalPrice, calculatedValues };
};

export default useCalculoPrecios;