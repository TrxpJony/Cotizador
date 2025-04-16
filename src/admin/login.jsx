import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import logo from '../../src/img/logo.png';
import Cookies from 'universal-cookie';
import { Input, Form } from "@heroui/react";
import { Icon } from "@iconify/react"
const cookies = new Cookies();
const baseUrl = import.meta.env.VITE_API_URL + "/api/vidrioalarte/login";
const API_URL = import.meta.env.VITE_API_URL;
// Cambié la URL al endpoint del backend real

function Login() {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

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

  return (
    <>
      <div className='flex items-start mt-0 sm:mt-20 justify-center px-4 py-20 mb-20'>
        <div className='w-full max-w-md rounded-2xl bg-white px-8 pb-10 pt-6 shadow-xl'>
          <div className='flex flex-col items-center gap-3'>
            <img alt="Vidrio al Arte" src={logo} className='h-14 w-auto' />
            <h1 className='text-xl font-semibold text-gray-900 text-center'>Introduzca las credenciales</h1>
            <p className='text-sm text-default-500 text-center'>Para acceder al cotizador</p>
          </div>

          <Form className='mt-6 flex flex-col gap-8' onSubmit={handleLogin}>
            <Input
              classNames={{
                inputWrapper: "group-data-[focus-visible=true]:ring-0 group-data-[focus-visible=true]:ring-offset-0",
              }}
              isRequired
              label="Usuario"
              name='usuario'
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder='Ingrese su usuario'
              type='text'
            />
            <Input
              classNames={{
                inputWrapper: "group-data-[focus-visible=true]:ring-0 group-data-[focus-visible=true]:ring-offset-0",
              }}
              isRequired
              endContent={
                <button type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <Icon
                      className="pointer-events-none text-2xl text-default-400"
                      icon="solar:eye-closed-linear"
                    />
                  ) : (
                    <Icon
                      className="pointer-events-none text-2xl text-default-400"
                      icon="solar:eye-bold"
                    />
                  )}
                </button>
              }
              label="Contraseña"
              name='password'
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              placeholder='Ingrese su contraseña'
              type={isVisible ? "text" : "password"}
            />

            {error && (
              <p className='text-sm text-red-600 px-1'>{error}</p>
            )}
            <button
              type="submit"
              className='mt-2 w-full px-3 py-2 outline outline-cyan-500 rounded-xl text-cyan-500 hover:bg-cyan-500 hover:text-white hover:outline-none transition-all'
            >
              Acceder
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;
