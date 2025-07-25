import '../../css/colosal.css'; // Archivo CSS para estilos
import oficina from '../../img/img_nosotros/oficina.png'
import Logo from '../../img/img_nosotros/logo.png'
import ubica from '../../img/img_nosotros/ubica.png'
import compro from '../../img/img_nosotros/compro.png'
import GoogleMap from '../nosotros/direccion';
import gsap from 'gsap';
import { useLayoutEffect, useRef } from 'react';
import { AnimateNosotrosOficinas } from '../../utils/homeAnimation/gsapAnimationNosotros';

export function Oficinas() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      AnimateNosotrosOficinas(containerRef.current); // <-- pasa  la referencia aqui
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div ref={containerRef} className="bg-gray-50 py-24 sm:py-8">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <p className="oficinas-ubicacion text-center text-base/7 font-semibold text-cyan-500">Ubicación Centralizada</p>
          <h2 className="oficinas-titles mx-auto mt-2 max-w-lg text-balance text-center text-4xl font-semibold tracking-tight text-gray-700 sm:text-5xl">
            Nuestras Oficinas y Espacios de Trabajo
          </h2>
          <div className=" mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
            <div
              className="oficinas-container relative lg:row-span-2 rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)] hover:shadow-2xl transition-shadow"
            >
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                  <h3 className="oficinas-titles mt-2 text-lg font-medium tracking-tight text-gray-700 max-lg:text-center">
                    Infraestructura Moderna
                  </h3>
                  <p className="oficinas-text mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    En Vidrio al Arte SAS, contamos con instalaciones diseñadas para garantizar la eficiencia operativa, la comodidad de nuestros empleados, y la satisfacción de nuestros clientes.
                  </p>
                </div>
                <div
                  className="oficinas-images relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm"
                >
                  <div className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                    <img
                      className=" size-full object-cover object-top"
                      src={oficina}
                      alt="Fotografía de las oficinas modernas de Vidrio al Arte SAS en Bogotá"
                    />
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
            </div>
            <div
              className="oficinas-container hover:shadow-2xl transition-shadow relative max-lg:row-start-1 rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]"
            >
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <h3 className="oficinas-titles mt-2 text-lg font-medium tracking-tight text-gray-700 max-lg:text-center">Nosotros</h3>
                  <p className="oficinas-text mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Vidrio al Arte SAS es una empresa dedicada principalmente al comercio al por mayor de sistemas de aluminio para puertas, ventanas y divisiones de baño, así como vidrio, espejos, herrajes, accesorios y otros insumos complementarios para su instalación y acabado.
                  </p>
                </div>
                <div className="flex flex-1 items-center justify-center [container-type:inline-size] max-lg:py-6 lg:pb-2">
                  <img
                    className="oficinas-images object-cover mx-auto"
                    src={Logo}
                    alt="Logo oficial de Vidrio al Arte SAS"
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]"></div>
            </div>
            <div
              className="oficinas-container hover:shadow-2xl transition-shadow relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2 rounded-[calc(theme(borderRadius.lg)+1px)]"
            >
              <div className="absolute inset-px rounded-lg bg-white"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <h3 className="oficinas-titles mt-2 text-lg font-medium tracking-tight text-gray-700 max-lg:text-center">Ubicación</h3>
                  <p className="oficinas-text mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Nuestras oficinas principales están ubicadas en Carrera Cl. 71A #75 36, Bogotá.
                  </p>
                </div>
                <div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                  <img
                    className="oficinas-images object-cover  max-h-40"
                    src={ubica}
                    alt="Icono que representa la ubicación geográfica de la empresa"
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5"></div>
            </div>
            <div
              className="oficinas-container hover:shadow-2xl transition-shadow relative lg:row-span-2 rounded-lg max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"
            >
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                  <h3 className="oficinas-titles mt-2 text-lg font-medium tracking-tight text-gray-700 max-lg:text-center">
                    Compromiso con la Excelencia.
                  </h3>
                  <p className="oficinas-text mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    En Vidrio al Arte SAS, nos enfocamos en ofrecer soluciones innovadoras y sostenibles, priorizando la calidad de nuestros productos y la satisfacción de nuestros clientes en cada proyecto.
                  </p>
                </div>
                <div
                  className="oficinas-images relative min-h-[30rem] w-full grow"
                >
                  <div className="absolute bottom-0 left-10 right-0 top-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">

                    <img
                      className="rounded-ss-xl size-full object-cover object-top"
                      src={compro}
                      alt="Imagen que representa el compromiso con la excelencia empresarial"
                    />

                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
            </div>
          </div>
          <div className='oficinas-images mt-5 shadow-lg rounded-2xl hover:shadow-2xl transition-shadow'>
            <GoogleMap />
          </div>
        </div>
        <br />
        <br />

      </div>
    </>
  );
}
