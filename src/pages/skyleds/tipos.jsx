import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";

export function TiposSkylesd() {
  const [productosPorCategoria, setProductosPorCategoria] = useState({});
  const [entrada, setEntrada] = useState({ producto_id: '', cantidad: 1, novedad: '' });
  const [salidasMultiples, setSalidasMultiples] = useState([{ producto_id: '', cantidad: 1 }]);
  const [salidaGlobal, setSalidaGlobal] = useState({ quien_saco: '', novedad: '' });
  const [salidas, setSalidas] = useState([]);
  const [detalleSalida, setDetalleSalida] = useState([]);
  const [salidaSeleccionada, setSalidaSeleccionada] = useState(null);

  // Nueva función para cargar salidas
  const cargarSalidas = () => {
    axios.get('http://localhost:3001/salidas')
      .then(res => setSalidas(res.data));
  };

  useEffect(() => {
    axios.get('http://localhost:3001/productos-por-categoria')
      .then(res => {
        // Ordenar los productos por id en cada categoría
        const ordenado = {};
        Object.entries(res.data).forEach(([categoria, productos]) => {
          ordenado[categoria] = [...productos].sort((a, b) => a.id - b.id);
        });
        setProductosPorCategoria(ordenado);
      });

    // Cargar salidas al inicio
    cargarSalidas();
  }, []);

  const registrarEntrada = () => {
    axios.post('http://localhost:3001/entradas', entrada)
      .then(() => alert('Entrada registrada'));
  };

  const agregarProductoSalida = () => {
    setSalidasMultiples([...salidasMultiples, { producto_id: '', cantidad: 1 }]);
  };

  const actualizarSalida = (index, campo, valor) => {
    const nuevas = [...salidasMultiples];
    if (campo === 'cantidad') {
      // Si el valor es vacío o no es número, pon 1 o ''
      const num = parseInt(valor, 10);
      nuevas[index][campo] = isNaN(num) ? '' : num;
    } else {
      nuevas[index][campo] = valor;
    }
    setSalidasMultiples(nuevas);
  };

  const verDetalleSalida = (salidaId) => {
    setSalidaSeleccionada(salidaId);
    axios.get(`http://localhost:3001/salidas/${salidaId}/detalle`)
      .then(res => setDetalleSalida(res.data));
  };

  const registrarSalidasMultiples = () => {
    const productosValidos = salidasMultiples
      .filter(s => s.producto_id && !isNaN(parseInt(s.cantidad)) && parseInt(s.cantidad) > 0)
      .map(s => ({
        producto_id: parseInt(s.producto_id, 10),
        cantidad: parseInt(s.cantidad, 10)
      }));

    const payload = {
      quien_saco: salidaGlobal.quien_saco,
      novedad: salidaGlobal.novedad,
      productos: productosValidos
    };

    axios.post('http://localhost:3001/salidas', payload)
      .then(() => {
        alert('Salida registrada');
        cargarSalidas(); // Recargar la lista de salidas después de registrar
      })
      .catch(err => {
        console.error(err);
        alert('Error al registrar la salida');
      });
  };
  return (
    <>


      <h2 className='text-4xl font-bold bg-white py-4 shadow-lg mb-4 px-16 text-center sm:text-left '>Inventario skyleds</h2>
      <div className='items-center mx-auto max-w-4xl px-4 w-full'>
        {Object.entries(productosPorCategoria).map(([categoria, productos]) => (
          <div key={categoria} className="mb-8">
            <h3 className='font-bold text-2xl mb-2'>{categoria}</h3>
            <Table aria-label={`Productos de ${categoria}`}>
              <TableHeader>
                <TableColumn>ID</TableColumn>
                <TableColumn>Referencia</TableColumn>
                <TableColumn>Nombre</TableColumn>
                <TableColumn>Stock</TableColumn>
              </TableHeader>
              <TableBody>
                {productos.map(p => (
                  <TableRow key={p.id}>
                    <TableCell>{p.id}</TableCell>
                    <TableCell>{p.referencia}</TableCell>
                    <TableCell>{p.nombre}</TableCell>
                    <TableCell>{p.stock_actual}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}

        <br />
        {/* NUEVO DISEÑO REGISTRAR SALIDA */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8  mx-auto">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            Registrar salida
          </h3>
          <div className="space-y-4">
            {salidasMultiples.map((s, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center gap-3 bg-default-100 rounded-lg p-4 shadow-sm">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Producto</label>
                  <select
                    className="w-full border border-gray-300 rounded px-2 py-1"
                    value={s.producto_id}
                    onChange={e => actualizarSalida(i, 'producto_id', e.target.value)}
                  >
                    <option value="">Seleccionar producto</option>
                    {Object.values(productosPorCategoria).flat().map(p => (
                      <option key={p.id} value={p.id}>
                        {p.nombre} (stock: {p.stock_actual})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
                  <input
                    type="number"
                    className="w-24 border border-gray-300 rounded px-2 py-1"
                    value={s.cantidad === '' ? '' : s.cantidad}
                    min="1"
                    onChange={e => actualizarSalida(i, 'cantidad', e.target.value)}
                    placeholder="Cantidad"
                  />
                </div>
                {salidasMultiples.length > 1 && (
                  <button
                    className="ml-2 text-red-500 hover:text-red-700"
                    title="Eliminar producto"
                    onClick={() => setSalidasMultiples(salidasMultiples.filter((_, idx) => idx !== i))}
                  >
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l8 8M6 14L14 6" /></svg>
                  </button>
                )}
              </div>
            ))}
            <button
              className="flex items-center gap-1 px-3 py-1 bg-default-100 text-gray-500 rounded hover:bg-blue-200 transition"
              onClick={agregarProductoSalida}
              type="button"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 3v12m6-6H3" /></svg>
              Añadir producto
            </button>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quién sacó</label>
              <input
                className="w-full border border-gray-300 rounded px-2 py-1"
                placeholder="Quién sacó"
                value={salidaGlobal.quien_saco}
                onChange={e => setSalidaGlobal({ ...salidaGlobal, quien_saco: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Novedad</label>
              <input
                className="w-full border border-gray-300 rounded px-2 py-1"
                placeholder="Novedad"
                value={salidaGlobal.novedad}
                onChange={e => setSalidaGlobal({ ...salidaGlobal, novedad: e.target.value })}
              />
            </div>
          </div>
          <button
            className="mt-6 w-full bg-default-100 text-gray-500 font-semibold py-2 rounded-lg shadow hover:bg-default-300 transition"
            onClick={registrarSalidasMultiples}
          >
            Registrar salida
          </button>
        </div>
        {/* FIN NUEVO DISEÑO REGISTRAR SALIDA */}
        <hr />
        <div>
          <h3>Registrar entrada</h3>
          <input
            placeholder="ID del producto"
            value={entrada.producto_id}
            onChange={e => setEntrada({ ...entrada, producto_id: e.target.value })}
          />
          <input
            placeholder="Cantidad"
            type="number"
            value={entrada.cantidad}
            onChange={e => setEntrada({ ...entrada, cantidad: parseInt(e.target.value) })}
          />
          <input
            placeholder="Novedad"
            value={entrada.novedad}
            onChange={e => setEntrada({ ...entrada, novedad: e.target.value })}
          />
          <button onClick={registrarEntrada}>Registrar entrada</button>
        </div>
        <div className='max-w-7xl items-center mx-auto mt-10 py-10'>
          <h3>Salidas registradas</h3>
          <button onClick={cargarSalidas}>Recargar salidas</button>
          <Table
            aria-label="Example static collection table"
            defaultSelectedKeys={["2"]}
          >
            <TableHeader>
              <TableColumn>ID</TableColumn>
              <TableColumn>Fecha</TableColumn>
              <TableColumn>Quién sacó</TableColumn>
              <TableColumn>Novedad</TableColumn>

            </TableHeader>
            <TableBody>
              {salidas.length === 0 ? (
                <TableRow key="1">
                  <TableCell colSpan={4}>No hay salidas registradas.</TableCell>
                </TableRow>
              ) : (
                salidas.map(s => (
                  <TableRow    className='hover:bg-black/5' key={s.id} onClick={() => verDetalleSalida(s.id)}>
                    <TableCell>{s.id}</TableCell>
                    <TableCell>
                      {(() => {
                        let fecha = s.fecha;
                        let dateObj = typeof fecha === 'string'
                          ? new Date(fecha.replace(' ', 'T'))
                          : new Date(fecha);
                        return isNaN(dateObj.getTime())
                          ? s.fecha
                          : dateObj.toLocaleString();
                      })()}
                    </TableCell>
                    <TableCell>{s.quien_saco}</TableCell>
                    <TableCell>{s.novedad}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Detalle de productos de la salida seleccionada en un modal */}
          {salidaSeleccionada && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000
              }}
              onClick={() => { setSalidaSeleccionada(null); setDetalleSalida([]); }}
            >
              <div
                style={{
                  background: 'white',
                  padding: 24,
                  borderRadius: 8,
                  minWidth: 350,
                  maxWidth: '90vw',
                  maxHeight: '80vh',
                  overflowY: 'auto',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
                  position: 'relative'
                }}
                onClick={e => e.stopPropagation()}
              >
                <h4>Productos de la salida #{salidaSeleccionada}</h4>
                <button
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    background: '#eee',
                    border: 'none',
                    borderRadius: 4,
                    padding: '4px 8px',
                    cursor: 'pointer'
                  }}
                  onClick={() => { setSalidaSeleccionada(null); setDetalleSalida([]); }}
                >
                  Cerrar
                </button>
                <table border="1" cellPadding={5} style={{ width: '100%', marginTop: 16 }}>
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Referencia</th>
                      <th>Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detalleSalida.length === 0 ? (
                      <tr>
                        <td colSpan={3}>No hay productos para esta salida.</td>
                      </tr>
                    ) : (
                      detalleSalida.map((d, idx) => (
                        <tr key={idx}>
                          <td>{d.producto}</td>
                          <td>{d.referencia}</td>
                          <td>{d.cantidad}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div >
      </div >
    </>
  );
}
