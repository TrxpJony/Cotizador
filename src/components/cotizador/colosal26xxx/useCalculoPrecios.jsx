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
    const cuadrupleHeight = totalHeight * 4;
    const empaquecolHeight = totalWidth * 4;
    const empaquecolWidth = totalWidth * 2;
    const felpaHeight = totalHeight * 6;
    const felpaWidth = totalWidth * 2;
    const totalFelpa = felpaHeight + felpaWidth;
    const getPrice = (key, factor = 1) => (memoizedPrices[key] ? Number(memoizedPrices[key]) * factor / 1000 : 0);

    const cabezalcolPrice = getPrice("cabezalcol", totalWidth);
    const sillarcolPrice = getPrice("sillarcol", totalWidth);
    const guiaDoblecolPrice = getPrice("guiaDoblecol", totalWidth);
    const jambacolPrice = getPrice("jambacol", doubleHeight);
    const horizontalSuperiorcolPrice = getPrice("horizontalSuperiorcol", totalWidth);
    const horizontalInferiorMovilcolPrice = getPrice("horizontalInferiorMovilcol", totalWidth);
    const translapecolPrice = getPrice("traslapecol", doubleHeight);
    const enganchecolPrice = getPrice("enganchecol", cuadrupleHeight);
    const complementoCabezalcolPrice = getPrice("complementoCabezalcol", totalWidth);
    const complementoJambacolPrice = getPrice("complementoJambacol", doubleHeight);
    const empaquecolPrice = getPrice("empaquecol", empaquecolHeight + empaquecolWidth);
    const felpaPrice = getPrice("felpacol", felpaHeight + felpaWidth);

    const tornillosPrice = (memoizedPrices.tornillos ? Number(memoizedPrices.tornillos) : 0) * 60;
    const siliconaPrice = (memoizedPrices.silicona ? Number(memoizedPrices.silicona) : 0) * 1;
    
    const accesoriosPrice = memoizedAccessories.reduce((sum, acc) => {
      if (acc === "rodamientoSimple70col" || acc === "rodamientoDoble140col") {
        return sum + (memoizedPrices[acc] ? Number(memoizedPrices[acc]) * 4 : 0);
      }
      return sum + (memoizedPrices[acc] ? Number(memoizedPrices[acc]) : 0);
    }, 0);

    const total =
      cabezalcolPrice + sillarcolPrice + jambacolPrice +
      horizontalSuperiorcolPrice + horizontalInferiorMovilcolPrice + guiaDoblecolPrice +
      translapecolPrice + enganchecolPrice + complementoCabezalcolPrice + complementoJambacolPrice +
      empaquecolPrice + felpaPrice + tornillosPrice + siliconaPrice + accesoriosPrice;
    setTotalPrice(total);
    setCalculatedValues({
      totalWidth,
      doubleHeight,
      cuadrupleHeight,
      cabezalcolPrice,
      sillarcolPrice,
      jambacolPrice,
      guiaDoblecolPrice,
      horizontalSuperiorcolPrice,
      horizontalInferiorMovilcolPrice,
      translapecolPrice,
      enganchecolPrice,
      complementoCabezalcolPrice,
      complementoJambacolPrice,
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
      rodamientoSimple70colPrice: memoizedPrices.rodamientoSimple70col ? Number(memoizedPrices.rodamientoSimple70col) * 4 : 0,
      rodamientoDoble140colPrice: memoizedPrices.rodamientoDoble140col ? Number(memoizedPrices.rodamientoDoble140col) * 4 : 0,
      cajaDeflectoraPrice: memoizedPrices.cajaDeflectora ? Number(memoizedPrices.cajaDeflectora) : 0,
    });
  }, [width, height, memoizedPrices, memoizedAccessories]);

  return { totalPrice, calculatedValues };
};

export default useCalculoPrecios;
