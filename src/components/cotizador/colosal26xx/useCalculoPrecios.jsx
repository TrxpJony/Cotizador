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

    const halfWidth = Number(width) / 2;
    const totalHeight = Number(height);
    const totalWidth = Number(width);
    const doubleHeight = totalHeight * 2;
    const doubleHalfWidth = halfWidth * 2;
    const empaquecolHeight = totalHeight * 4;
    const empaquecolWidth = totalWidth * 2;
    const felpaHeight = totalHeight * 6;
    const felpaWidth = totalWidth * 2;
    const totalFelpa = felpaHeight + felpaWidth;
    const getPrice = (key, factor = 1) => (memoizedPrices[key] ? Number(memoizedPrices[key]) * factor / 1000 : 0);

    const cabezalcolPrice = getPrice("cabezalcol", totalWidth);
    const sillarcolPrice = getPrice("sillarcol", totalWidth);
    const jambacolPrice = getPrice("jambacol", doubleHeight);
    const guiaSimplecolPrice = getPrice("guiaSimplecol", totalWidth);
    const horizontalSuperiorcolPrice = getPrice("horizontalSuperiorcol", doubleHalfWidth);
    const horizontalInferiorMovilcolPrice = getPrice("horizontalInferiorMovilcol", doubleHalfWidth);
    const traslapecolPrice = getPrice("traslapecol", doubleHeight);
    const enganchecolPrice = getPrice("enganchecol", doubleHeight);
    const empaquecolPrice = getPrice("empaquecol", empaquecolHeight + empaquecolWidth);
    const felpaPrice = getPrice("felpacol", felpaHeight + felpaWidth);

    const tornillosPrice = (memoizedPrices.tornillos ? Number(memoizedPrices.tornillos) : 0) * 44;
    const siliconaPrice = (memoizedPrices.silicona ? Number(memoizedPrices.silicona) : 0) * 1;

    const accesoriosPrice = memoizedAccessories.reduce((sum, acc) => sum + (memoizedPrices[acc] ? Number(memoizedPrices[acc]) : 0), 0);

    const total =
      cabezalcolPrice + sillarcolPrice + jambacolPrice +
      horizontalSuperiorcolPrice + guiaSimplecolPrice + horizontalInferiorMovilcolPrice +
      traslapecolPrice + enganchecolPrice + empaquecolPrice + tornillosPrice + siliconaPrice + accesoriosPrice + felpaPrice;

    setTotalPrice(total);
    setCalculatedValues({
      totalWidth,
      doubleHeight,
      halfWidth,
      doubleHalfWidth,
      cabezalcolPrice,
      sillarcolPrice,
      jambacolPrice,
      horizontalSuperiorcolPrice,
      guiaSimplecolPrice,
      horizontalInferiorMovilcolPrice,
      traslapecolPrice,
      enganchecolPrice,
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