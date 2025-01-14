import '../css/colosal.css'; // Archivo CSS para estilos
import { GlobeAmericasIcon, EyeIcon } from '@heroicons/react/20/solid'
import mision from '../img/img_nosotros/vaperso.png'
import oficina from '../img/img_nosotros/oficina.png'
import Logo from '../img/img_nosotros/logo.png'
import ubica from '../img/img_nosotros/ubica.png'
import compro from '../img/img_nosotros/compro.png'
const features = [
  {
    name: 'Misión.',
    description:
      'Aprovechar la capacidad organizativa y tecnológica con mano de obra calificada, con la que podamos garantizar un producto de alta calidad acorde a las necesidades de nuestros clientes y a precios competitivos.',
    icon: GlobeAmericasIcon,
  },
  {
    name: 'Visión.',
    description: 'En Vidrio al Arte SAS, buscamos ser líderes en el mercado, ofreciendo productos de vidrio y de acero de gran calidad con el reconocimiento de ser la empresa más confiable en el servicio, innovación, calidad, precio y puntualidad para la satisfacción de nuestros clientes.',
    icon: EyeIcon,
  },
];
export function Nosotros() {

  return (
    <>
    <br />
 <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-cyan-500">Nosotros</h2>
              <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-700 sm:text-5xl">
              Vidrio al Arte SAS
              </p>
              <p className="mt-6 text-lg/8 text-default-400">
              En Vidrio al Arte SAS, nos guiamos por principios que reflejan nuestro compromiso con la excelencia y la innovación. 
              Creemos en la importancia de ofrecer productos de alta calidad y en la satisfacción total de nuestros clientes. 
              Nuestra dedicación y pasión por el arte del vidrio nos impulsan a superar constantemente nuestras propias expectativas.

              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-default-400 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-700">
                      <feature.icon aria-hidden="true" className="absolute left-1 top-1 size-5 text-cyan-600" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            alt="Product screenshot"
            src={mision}
            width={2432}
            height={1442}
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
    <div className="bg-gray-50 py-24 sm:py-8">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-center text-base/7 font-semibold text-cyan-500">Ubicación Centralizada</h2>
        <p className="mx-auto mt-2 max-w-lg text-balance text-center text-4xl font-semibold tracking-tight text-gray-700 sm:text-5xl">
          Nuestras Oficinas y Espacios de Trabajo
        </p>
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          <div className="relative lg:row-span-2">
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
              <div className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
                <div className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                  <img
                    className="size-full object-cover object-top"
                    src={oficina}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
          </div>
          <div className="relative max-lg:row-start-1">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-700 max-lg:text-center">Ubicación</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                Nuestra dirección principal es Carrera Cl. 71A #75 36, Bogotá, con una bodega adicional ubicada en Cl 71a No 76 - 08.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                <img
                  className="object-cover  max-h-40"
                  src={ubica}
                  alt=""
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]"></div>
          </div>
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <div className="absolute inset-px rounded-lg bg-white"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-700 max-lg:text-center">Nosotros</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                Fundada el 5 de enero de 2009, Vidrio al Arte SAS se dedica principalmente al comercio al por mayor de materiales de construcción, artículos de ferretería, pinturas, productos de vidrio, equipos y materiales de fontanería y calefacción.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center [container-type:inline-size] max-lg:py-6 lg:pb-2">
                <img
                  className=" object-cover mx-auto"
                  src={Logo}
                  alt=""
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5"></div>
          </div>
          <div className="relative lg:row-span-2">
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
              <div className="relative min-h-[30rem] w-full grow">
                <div className="absolute bottom-0 left-10 right-0 top-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">
                  
                  <img
                    className="size-full object-cover object-top"
                    src={compro}
                    alt=""
                  />
                 
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
