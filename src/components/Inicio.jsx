import cocina1 from '../img/img_Principal/cocina3.png'; // Importar la imagen
import cocina2 from '../img/img_Principal/cocina4.png';
import cocina3 from '../img/img_Principal/cocina1.png';
import cocina4 from '../img/img_Principal/cocina5.png';
import espejo from '../img/img_Principal/espejo.png';
import espejo2 from '../img/img_Principal/espejo2.png';
import espejo3 from '../img/img_Principal/espejo3.png';
import colosal from '../img/img_Principal/vidrio2.png';
import puerta from '../img/img_Principal/vidrio1.png';
import luces from '../img/img_Principal/luces.png';
import luces2 from '../img/img_Principal/luces2.png';
import logo1 from '../img/img_Principal/1.png';
import logo2 from '../img/img_Principal/2.png';
import logo3 from '../img/img_Principal/3.png';
import logo4 from '../img/img_Principal/4.png';
import logo5 from '../img/img_Principal/5.png';
import logo6 from '../img/img_Principal/6.png'
import { Divider } from "@nextui-org/divider";
import '../css/colosal.css'; // Archivo CSS para estilos

const links = [
  { name: 'Productos', href: '/productos' },
  { name: 'Acerca de nosotros', href: '/nosotros' },
]

const stats = [

]

export function Inicio() {
  const features = [
    { name: 'Origen', description: 'Fabricado por Vidrio al Arte SAS en Bogotá, Colombia.' },
    { name: 'Material', description: 'Estructura de acero inoxidable con paneles de vidrio templado de alta resistencia.' },
    { name: 'Dimensiones', description: 'Personalizable en tamaño y diseño, según las especificaciones del cliente.' },
    { name: 'Acabado', description: 'Acero pulido con opciones de acabado mate o brillante, combinado con vidrio .' },
    { name: 'Incluye', description: 'Puerta o división con herrajes de acero inoxidable y componentes de instalación.' },
    { name: 'Consideraciones', description: 'Los materiales utilizados son de origen natural. Las variaciones en la textura y color del vidrio o el acero son parte del diseño.' },
  ]

  return (
    <>
      <div className="relative isolate overflow-hidden bg-gradient-to-br from-cyan-500 via-cyan-600 to-gray-500 py-24 sm:py-32">
        {/* <img
    alt=""
    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=0a0f14&sat=-20&exp=8&blend-mode=multiply"
    className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center opacity-70"
  />*/}
        <div
          aria-hidden="true"
          className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-cyan-700 to-gray-700 opacity-30"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-cyan-600 to-gray-800 opacity-25"
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">Vidrio al Arte SAS</h2>
            <p className="mt-8 text-lg font-medium text-gray-300 sm:text-xl/8">
              Especialistas en vidrios y espejos personalizados de alta calidad. ¡Confía en nosotros para todas tus necesidades de vidrio y espejo!
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-3xl font-semibold text-white sm:grid-cols-2 md:flex lg:gap-x-10">
              {links.map((link) => (
                <a key={link.name} href={link.href}>
                  {link.name} <span aria-hidden="true">&rarr;</span>
                </a>
              ))}
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.name} className="flex flex-col-reverse gap-1">
                  <dt className="text-base/7 text-gray-400">{stat.name}</dt>
                  <dd className="text-4xl font-semibold tracking-tight text-white">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      <br />
      <div className="relative overflow-hidden bg-white" /*</>style={{ backgroundImage: `url(${cocina1})` }}*/>
        <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight text-gray-700 sm:text-6xl">
                Nuestros Servicios
              </h1>
              <p className="mt-4  text-default-400">
                En Vidrio al Arte transformamos tus ideas en realidad, tanto en interiores como en exteriores. Ofrecemos soluciones a medida en vidrio y acero, diseñadas para satisfacer tus necesidades con la más alta calidad y estilo. Confía en nosotros para llevar tus proyectos al siguiente nivel.
              </p>
            </div>
            <br />
            <div className="max-w-md">
              <div className="space-y-1">
                <p className=" text-default-400">Tenemos la mejor disposición para proveerte toda la información que necesites</p>
              </div>
              <Divider className="my-4" />
              <div className="flex h-5 items-center space-x-4 text-small">
                <div>
                  <br />
                  <a
                    href="/tipos"
                    className=" hover:text-cyan-600  "
                  >
                    Productos Vitral
                  </a></div>
                <Divider orientation="vertical" />
                <div>
                  <br />                   <a
                    href="/p2"
                    className="hover:text-cyan-600 "
                  >
                    Espejos
                  </a></div>
                <Divider orientation="vertical" />
                <div>
                  <br />                   <a
                    href="/servicios"
                    className="hover:text-cyan-600 "
                  >
                    Mas Información
                  </a></div>
              </div>
            </div>

            <div>
              <div className="mt-10">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                          <img
                            alt=""
                            src={colosal}
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src={puerta}
                            className="size-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src={espejo3}
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src={espejo}
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src={espejo2}
                            className="size-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src={luces}
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src={luces2}
                            className="size-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="bg-white">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
          <div>

            <h2 className="text-3xl font-bold tracking-tight text-gray-700 sm:text-4xl">Nuestros Productos</h2>
            <p className="mt-4 text-default-400">
              Vidrio al Arte SAS ofrece una amplia gama de productos de vidrio decorativo y funcional, diseñados para aportar elegancia y estilo a cualquier espacio. Desde puertas y ventanas de vidrio templado hasta espejos personalizados y divisiones para oficinas, nuestros productos combinan calidad y diseño para satisfacer las necesidades de nuestros clientes.
            </p>

            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
              {features.map((feature) => (
                <div key={feature.name} className="border-t border-gray-200 pt-4">
                  <dt className="font-medium text-cyan-600">{feature.name}</dt>
                  <dd className="mt-2 text-sm text-default-400">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
            <img
              alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
              src={cocina1}
              className="rounded-lg bg-gray-100"
            />
            <img
              alt="Top down view of walnut card tray with embedded magnets and card groove."
              src={cocina2}
              className="rounded-lg bg-gray-100"
            />
            <img
              alt="Side of walnut card tray with card groove and recessed card area."
              src={cocina3}
              className="rounded-lg bg-gray-100"
            />
            <img
              alt="Walnut card tray filled with cards and card angled in dedicated groove."
              src={cocina4}
              className="rounded-lg bg-gray-100"
            />
          </div>
        </div>
      </div>

      <br />

<div className="bg-white  sm:py-10">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <h2 className="text-center text-lg/8 font-semibold text-gray-900">
      En colaboración con 
          </h2>
          <div className="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-6">
            <img
              alt="Espejos SAS"
              src={logo1}
              width={158}
              height={48}
              className="col-span-2 max-h-40 w-full object-contain lg:col-span-1"
            />
            <img
              alt="Vidrio Andino"
              src={logo2}
              width={158}
              height={48}
              className="col-span-2 max-h-40 w-full object-contain lg:col-span-1"
            />
            <img
              alt="Sky Leds"
              src={logo3}
              width={158}
              height={48}
              className="col-span-2 max-h-40 w-full object-contain lg:col-span-1"
            />
            <img
              alt="Vitral"
              src={logo4}
              width={158}
              height={48}
              className="col-span-2 max-h-40 w-full object-contain sm:col-start-2 lg:col-span-1"
            />
            <img
              alt="Aluminark"
              src={logo5}
              width={158}
              height={48}
              className="col-span-2 max-h-40 w-full object-contain lg:col-span-1"
            />
            <img
              alt="Vitelsa"
              src={logo6}
              width={158}
              height={48}
              className="col-span-2 max-h-40 w-full object-contain sm:col-start-2 lg:col-span-1"
            />
          </div>
        </div>
      </div>
    </>
  );
}
