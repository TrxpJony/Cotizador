import { useEffect, useState, useMemo } from "react";

const useCalculoPrecios = (
  { width, height, width2, cantidad },
  selectedAccessories = [],
  selectedGlass = 'sinVidrio',
  selectedAlfajia = 'sinAlfajia'
) => {
  const [dbPrices, setDbPrices] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [calculatedValues, setCalculatedValues] = useState({});

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
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

    const alto = Number(height) || 0;
    const ancho = Number(width) || 0;
    const ancho2 = Number(width2) || 0;
    const cant = Number(cantidad) || 1;

    // ALK416: (ALTO *2 )+ (ANCHO*2)
    const ALK416_mm = (alto * 2) + (ancho * 2);
    const ALK416Price = memoizedPrices.ALK416 ? (memoizedPrices.ALK416 * ALK416_mm) / 1000 : 0;

    // ALK292: ALTO * CANTIDAD
    const ALK292_mm = alto * cant;
    const ALK292Price = memoizedPrices.ALK292 ? (memoizedPrices.ALK292 * ALK292_mm) / 1000 : 0;

    // ALK177: ((ALTO*CANTIDAD)*2)+(ALTO*2 +ANCHO*2)
    const ALK177_mm = ((alto * cant) * 2) + (alto * 2 + ancho * 2);
    const ALK177Price = memoizedPrices.ALK177 ? (memoizedPrices.ALK177 * ALK177_mm) / 1000 : 0;

    // ALK176: ((ALTO *2) + (ANCHO2 * 2))*CANTIDAD
    const ALK176_mm = ((alto * 2) + (ancho2 * 2)) * cant;
    const ALK176Price = memoizedPrices.ALK176 ? (memoizedPrices.ALK176 * ALK176_mm) / 1000 : 0;
    // Precio del empaque contorno del pisavidrio
    const EmpaquePrice = memoizedPrices.ALK_EPM ? (memoizedPrices.ALK_EPM * ALK177_mm) / 1000 : 0;
    // Vidrio y Alfajia (opcional, si aplica)
    const area = (alto / 1000) * (ancho / 1000) * cant;
    const glassUnitPrice = selectedGlass === "sinVidrio" ? 0 : (memoizedPrices[selectedGlass] || 0);
    const vidrioPrice = glassUnitPrice * area;
    const alfajiaPrice = selectedAlfajia === "sinAlfajia" ? 0 : (memoizedPrices[selectedAlfajia] || 0);
    const AlfajiaPriceRaw = alfajiaPrice * ancho / 1000;

    // Accesorios (igual que antes)
    const accesoriosPrice = memoizedAccessories.reduce((sum, acc) => {
      return sum + (memoizedPrices[acc] ? Number(memoizedPrices[acc]) : 0);
    }, 0);

    // Utilitarios (puedes ajustar si necesitas)
    const tornillosPrice = (memoizedPrices.tornillos ? Number(memoizedPrices.tornillos) : 0) * 44;
    const siliconaPrice = (memoizedPrices.silicona ? Number(memoizedPrices.silicona) : 0) * 1;

    const total =
      ALK416Price +
      ALK292Price +
      ALK177Price +
      ALK176Price +
      accesoriosPrice +
      EmpaquePrice +
      vidrioPrice +
      AlfajiaPriceRaw +
      tornillosPrice +
      siliconaPrice;

    setTotalPrice(total);
    setCalculatedValues({
      alto,
      ancho,
      ancho2,
      cant,
      ALK416_mm,
      ALK416Price,
      ALK292_mm,
      ALK292Price,
      ALK177_mm,
      EmpaquePrice,
      ALK177Price,
      ALK176_mm,
      ALK176Price,
      accesoriosPrice,
      vidrioPrice,
      AlfajiaPriceRaw,
      tornillosPrice,
      siliconaPrice,
      area,
    });
  }, [width, height, width2, cantidad, memoizedPrices, memoizedAccessories, selectedGlass, selectedAlfajia]);

  return { totalPrice, calculatedValues };
};

export default useCalculoPrecios;