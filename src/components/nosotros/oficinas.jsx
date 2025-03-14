import { motion } from 'framer-motion';
import '../../css/colosal.css'; // Archivo CSS para estilos
import oficina from '../../img/img_nosotros/oficina.png'
import Logo from '../../img/img_nosotros/logo.png'
import ubica from '../../img/img_nosotros/ubica.png'
import compro from '../../img/img_nosotros/compro.png'
import GoogleMap from '../nosotros/direccion';

export function Oficinas() {
  return (
    <>
      <div className="bg-gray-50 py-24 sm:py-8">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-center text-base/7 font-semibold text-cyan-500">Ubicación Centralizada</h2>
          <p className="mx-auto mt-2 max-w-lg text-balance text-center text-4xl font-semibold tracking-tight text-gray-700 sm:text-5xl">
            Nuestras Oficinas y Espacios de Trabajo
          </p>
          <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
            <motion.div
              className="relative lg:row-span-2"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              whileHover={{ scale: 1.02, boxShadow: "5px 10px 20px rgba(0, 0, 0, 0.2)" }}
            >
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-700 max-lg:text-center">
                    Infraestructura Moderna
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    En Vidrio al Arte SAS, contamos con instalaciones diseñadas para garantizar la eficiencia operativa, la comodidad de nuestros empleados, y la satisfacción de nuestros clientes.
                  </p>
                </div>
                <motion.div
                  className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                >
                  <div className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                    <img
                      className="size-full object-cover object-top"
                      src={oficina}
                      alt=""
                    />
                  </div>
                </motion.div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
            </motion.div>
            <motion.div
              className="relative max-lg:row-start-1"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              whileHover={{ scale: 1.02, boxShadow: "5px 10px 20px rgba(0, 0, 0, 0.2)" }}
            >
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-700 max-lg:text-center">Nosotros</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Fundada el 5 de enero de 2009, Vidrio al Arte SAS se dedica principalmente al comercio al por mayor de materiales de construcción, artículos de ferretería, pinturas, productos de vidrio, equipos y materiales de fontanería y calefacción.
                  </p>
                </div>
                <div className="flex flex-1 items-center justify-center [container-type:inline-size] max-lg:py-6 lg:pb-2">
                  <motion.img
                    className=" object-cover mx-auto"
                    src={Logo}
                    alt=""
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]"></div>
            </motion.div>
            <motion.div
              className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              whileHover={{ scale: 1.02, boxShadow: "5px 10px 20px rgba(0, 0, 0, 0.2)" }}
            >
              <div className="absolute inset-px rounded-lg bg-white"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-700 max-lg:text-center">Ubicación</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Nuestras oficinas principales están ubicadas en Carrera Cl. 71A #75 36, Bogotá.
                  </p>
                </div>
                <div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                  <motion.img
                    className="object-cover  max-h-40"
                    src={ubica}
                    alt=""
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5"></div>
            </motion.div>
            <motion.div
              className="relative lg:row-span-2"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              whileHover={{ scale: 1.02, boxShadow: "5px 10px 20px rgba(0, 0, 0, 0.2)" }}
            >
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-700 max-lg:text-center">
                    Compromiso con la Excelencia.
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    En Vidrio al Arte SAS, nos enfocamos en ofrecer soluciones innovadoras y sostenibles, priorizando la calidad de nuestros productos y la satisfacción de nuestros clientes en cada proyecto.
                  </p>
                </div>
                <motion.div
                  className="relative min-h-[30rem] w-full grow"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                >
                  <div className="absolute bottom-0 left-10 right-0 top-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">

                    <img
                      className="size-full object-cover object-top"
                      src={compro}
                      alt=""

                    />

                  </div>
                </motion.div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
            </motion.div>
          </div>
        </div>
        <br />
        <br />
        <div className="max-w-screen-2xl mx-auto">
            <GoogleMap />
        </div>
      </div>
    </>
  );
}
