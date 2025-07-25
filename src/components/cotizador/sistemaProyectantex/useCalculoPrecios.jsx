import { useEffect, useState, useMemo } from "react";

const useCalculoPrecios = (
  { width, height },
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

    // ALK416: (ALTO *2 )+ (ANCHO*2)
    const ALK416_mm = (alto * 2) + (ancho * 2);
    const ALK416Price = memoizedPrices.ALK416 ? (memoizedPrices.ALK416 * ALK416_mm) / 1000 : 0;

    // ALK177: ((ALTO*CANTIDAD)*2)+(ALTO*2 +ANCHO*2)
    const ALK177_mm = (alto  * 2) + (alto * 2 + ancho * 2);
    const ALK177Price = memoizedPrices.ALK177 ? (memoizedPrices.ALK177 * ALK177_mm) / 1000 : 0;

    // ALK176: ((ALTO *2) + (ANCHO2 * 2))*CANTIDAD
    const ALK176_mm = ((alto * 2) + (ancho * 2));
    const ALK176Price = memoizedPrices.ALK176 ? (memoizedPrices.ALK176 * ALK176_mm) / 1000 : 0;
    // Precio del empaque contorno del pisavidrio
    const Empaque_mm = (ALK177_mm + ALK176_mm + (ALK416_mm * 2));
    const EmpaquePrice = memoizedPrices.ALK_EPM ? (memoizedPrices.ALK_EPM * Empaque_mm) / 1000 : 0;
    // Vidrio y Alfajia (opcional, si aplica)
    const area = (alto / 1000) * (ancho / 1000);
    const glassUnitPrice = selectedGlass === "sinVidrio" ? 0 : (memoizedPrices[selectedGlass] || 0);
    const vidrioPrice = glassUnitPrice * area;
    const alfajiaPrice = selectedAlfajia === "sinAlfajia" ? 0 : (memoizedPrices[selectedAlfajia] || 0);
    const AlfajiaPriceRaw = alfajiaPrice * ancho / 1000;

    // Accesorios (igual que antes)
    const accesoriosPrice = memoizedAccessories.reduce((sum, acc) => {
      return sum + (memoizedPrices[acc] ? Number(memoizedPrices[acc]) : 0);
    }, 0);

    // Utilitarios (puedes ajustar si necesitas)
    const tornillosPrice = (memoizedPrices.tornillos ? Number(memoizedPrices.tornillos) : 0) * 20;
    const manijaPrice = (memoizedPrices.ALK_MAN ? Number(memoizedPrices.ALK_MAN) : 0) * 1;
    const brazoPrice = (memoizedPrices.ALK_BRA ? Number(memoizedPrices.ALK_BRA) : 0) * 2;

    const total =
      ALK416Price +
      ALK177Price +
      ALK176Price +
      accesoriosPrice +
      EmpaquePrice +
      vidrioPrice +
      AlfajiaPriceRaw +
      tornillosPrice +
      brazoPrice +
      manijaPrice;

    setTotalPrice(total);
    setCalculatedValues({
      alto,
      ancho,
      ALK416_mm,
      ALK416Price,
      ALK177_mm,
      EmpaquePrice,
      Empaque_mm,
      ALK177Price,
      ALK176_mm,
      ALK176Price,
      accesoriosPrice,
      vidrioPrice,
      AlfajiaPriceRaw,
      tornillosPrice,
      brazoPrice,
      manijaPrice,
      area,
    });
  }, [width, height, memoizedPrices, memoizedAccessories, selectedGlass, selectedAlfajia]);

  return { totalPrice, calculatedValues };
};

export default useCalculoPrecios;