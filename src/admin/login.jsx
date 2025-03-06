import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import logo from '../../src/img/logo.png';
import Cookies from 'universal-cookie';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid'

const cookies = new Cookies();
const baseUrl = import.meta.env.VITE_API_URL + "/api/vidrioalarte/login";
const API_URL = import.meta.env.VITE_API_URL; 
// Cambié la URL al endpoint del backend real

function Login() {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mostrarContraseña, setMostrarContraseña] = useState(false); // Estado para manejar la visibilidad
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Enviar solicitud POST con usuario y contraseña al backend
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, contraseña }),  // Enviar las credenciales en el cuerpo de la solicitud
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.text();  // El backend solo retorna un mensaje de texto, no es necesario convertir a JSON
      // Usar la variable de entorno
      if (data === 'Login exitoso.') {
        // Si el login es exitoso, obtener los datos del usuario
        const userResponse = await fetch(`${API_URL}/api/usuarios/${usuario}`); // Endpoint para obtener los detalles del usuario
        const userData = await userResponse.json();

        // Guardar datos en cookies
        cookies.set('id', userData.id, { path: '/' });
        cookies.set('usuario', userData.usuario, { path: '/' });
        cookies.set('rol', userData.rol, { path: '/' });

        // Redirigir según el rol del usuario
        if (userData.rol === 'administrador') {
          navigate('/admin');
        } else {
          navigate('/');
        }
        window.location.reload();  // Reiniciar la página
      } else {
        setError('Usuario o contraseña incorrectos.');
      }
    } catch (err) {
      console.error('Error al conectarse a la API:', err);
      setError('Usuario o contraseña incorrectos.');
    }
  };

  const toggleMostrarContraseña = () => {
    setMostrarContraseña((prevState) => !prevState);
  };

  return (
    <>
      <br />
      <br />
      <br />
      <div className="flex min-h-full flex-1 flex-col px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img alt="Your Company" src={logo} className="mx-auto h-10 w-auto" />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Introduzca las Credenciales para Acceder al Cotizador
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="usuario" className="block text-sm/6 font-medium text-gray-900">
                Usuario
              </label>
              <div className="mt-2">
                <input
                  id="usuario"
                  name="usuario"
                  type="text"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Contraseña
              </label>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={mostrarContraseña ? 'text' : 'password'}
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
                />
                {contraseña && (
                  <button
                    type="button"
                    onClick={toggleMostrarContraseña}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  >
                    {mostrarContraseña ? <EyeIcon className="h-4 w-4" /> : <EyeSlashIcon className="h-4 w-4" />}
                  </button>
                )}
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-cyan-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
              >
                Acceder
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
