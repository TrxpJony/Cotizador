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
    const cuadrupleHeight = totalHeight * 4;
    const empaquecolHeight = totalHeight * 4;
    const empaquecolWidth = totalWidth * 2;
    const felpaHeight = totalHeight * 6;
    const felpaWidth = totalWidth * 2;
    const totalFelpa = felpaHeight + felpaWidth;
    const getPrice = (key, factor = 1) => (memoizedPrices[key] ? Number(memoizedPrices[key]) * factor / 1000 : 0);

    const cabezalcolPrice = getPrice("cabezalcol", totalWidth);
    const sillarcolPrice = getPrice("sillarcol", totalWidth);
    const jambacolPrice = getPrice("jambacol", doubleHeight);
    const horizontalSuperiorcolPrice = getPrice("horizontalSuperiorcol", doubleHalfWidth);
    const horizontalInferiorFijacolPrice = getPrice("horizontalInferiorFijacol", halfWidth);
    const horizontalInferiorMovilcolPrice = getPrice("horizontalInferiorMovilcol", halfWidth);
    const traslapecolPrice = getPrice("traslapecol", cuadrupleHeight);
    const enganchecolPrice = getPrice("enganchecol", cuadrupleHeight);
    const adaptadorcolPrice = getPrice("adaptadorcol", totalWidth);
    const empaquecolPrice = getPrice("empaquecol", empaquecolHeight + empaquecolWidth);
    const felpaPrice = getPrice("felpacol", felpaHeight + felpaWidth);

    const tornillosPrice = (memoizedPrices.tornillos ? Number(memoizedPrices.tornillos) : 0) * 76;
    const siliconaPrice = (memoizedPrices.silicona ? Number(memoizedPrices.silicona) : 0) * 1;

    // Aquí permitimos que los accesorios se sumen sin importar si las dimensiones están establecidas
    const accesoriosPrice = memoizedAccessories.reduce((sum, acc) => sum + (memoizedPrices[acc] ? Number(memoizedPrices[acc]) : 0), 0);

    const total = 
      cabezalcolPrice + sillarcolPrice + jambacolPrice + 
      horizontalSuperiorcolPrice + horizontalInferiorFijacolPrice + horizontalInferiorMovilcolPrice + 
      traslapecolPrice + enganchecolPrice + empaquecolPrice + tornillosPrice + siliconaPrice + accesoriosPrice + felpaPrice + adaptadorcolPrice;

    setTotalPrice(total);
    setCalculatedValues({
      totalWidth,
      doubleHeight,
      halfWidth,
      doubleHalfWidth,
      cuadrupleHeight,
      cabezalcolPrice,
      sillarcolPrice,
      jambacolPrice,
      horizontalSuperiorcolPrice,
      horizontalInferiorFijacolPrice,
      horizontalInferiorMovilcolPrice,
      traslapecolPrice,
      enganchecolPrice,
      adaptadorcolPrice,
      empaquecolPrice,
      tornillosPrice,
      siliconaPrice,
      empaquecolHeight,
      empaquecolWidth,
      felpaHeight,
      felpaWidth,
      felpaPrice,
      totalFelpa,
      kitCierrecolPrice: memoizedPrices.kitCierrecol ? Number(memoizedPrices.kitCierrecol) : 0,
      kitCierreConLlavecolPrice: memoizedPrices.kitCierreConLlavecol ? Number(memoizedPrices.kitCierreConLlavecol) : 0,
      cubetaAngeoPrice: memoizedPrices.cubetaAngeo ? Number(memoizedPrices.cubetaAngeo) : 0,
      rodamientoSimple70colPrice: memoizedPrices.rodamientoSimple70col ? Number(memoizedPrices.rodamientoSimple70col) : 0,
      rodamientoDoble140colPrice: memoizedPrices.rodamientoDoble140col ? Number(memoizedPrices.rodamientoDoble140col) : 0,
      cajaDeflectoraPrice: memoizedPrices.cajaDeflectora ? Number(memoizedPrices.cajaDeflectora) : 0,
    });
  }, [width, height, memoizedPrices, memoizedAccessories]);

  return { totalPrice, calculatedValues };
};

export default useCalculoPrecios;