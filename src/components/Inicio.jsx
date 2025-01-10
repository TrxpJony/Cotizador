import cocina3 from '../img/cocina3.png'; // Importar la imagen
import { Divider } from "@nextui-org/divider";
import '../css/colosal.css'; // Archivo CSS para estilos

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
      <br />
      <div className="relative overflow-hidden bg-white" /*</>style={{ backgroundImage: `url(${cocina3})` }}*/>
        <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Vidrio al Arte SAS
              </h1>
              <p className="mt-4  text-gray-500">
                Especialistas en vidrios y espejos personalizados de alta calidad. ¡Confía en nosotros para todas tus necesidades de vidrio y espejo!
              </p>
            </div>
            <br />
            <br />
            <div className="max-w-md">
              <div className="space-y-1">
                <h4 className="text-3xl font-bold text-cyan-400">Nuestros Servicios</h4>
                <p className=" text-default-400">Tenemos la mejor disposición para proveerte toda la información que necesites</p>
              </div>
              <Divider className="my-4" />
              <div className="flex h-5 items-center space-x-4 text-small">
                <div>
                  <br />
                  <a
                    href="/tip"
                    className=" hover:text-cyan-600  "
                  >
                    Servicios
                  </a></div>
                <Divider orientation="vertical" />
                <div>
                  <br />                   <a
                    href="/nosotros"
                    className="hover:text-cyan-600 "
                  >
                    Acerca de Nosotros
                  </a></div>
                <Divider orientation="vertical" />
                <div>
                  <br />                   <a
                    href="/tipos"
                    className="hover:text-cyan-600 "
                  >
                    Cotizador
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
                            src="https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src="https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg"
                            className="size-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src="https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg"
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src="https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg"
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src="https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg"
                            className="size-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src="https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg"
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src="https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg"
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
            <h2 className="text-3xl font-bold tracking-tight text-cyan-400 sm:text-4xl">Nuestros Productos</h2>
            <p className="mt-4 text-gray-500">
              Vidrio al Arte SAS ofrece una amplia gama de productos de vidrio decorativo y funcional, diseñados para aportar elegancia y estilo a cualquier espacio. Desde puertas y ventanas de vidrio templado hasta espejos personalizados y divisiones para oficinas, nuestros productos combinan calidad y diseño para satisfacer las necesidades de nuestros clientes.
            </p>

            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
              {features.map((feature) => (
                <div key={feature.name} className="border-t border-gray-200 pt-4">
                  <dt className="font-medium text-cyan-600">{feature.name}</dt>
                  <dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
            <img
              alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
              src={cocina3}
              className="rounded-lg bg-gray-100"
            />
            <img
              alt="Top down view of walnut card tray with embedded magnets and card groove."
              src="https://tailwindui.com/plus/img/ecommerce-images/product-feature-03-detail-02.jpg"
              className="rounded-lg bg-gray-100"
            />
            <img
              alt="Side of walnut card tray with card groove and recessed card area."
              src="https://tailwindui.com/plus/img/ecommerce-images/product-feature-03-detail-03.jpg"
              className="rounded-lg bg-gray-100"
            />
            <img
              alt="Walnut card tray filled with cards and card angled in dedicated groove."
              src="https://tailwindui.com/plus/img/ecommerce-images/product-feature-03-detail-04.jpg"
              className="rounded-lg bg-gray-100"
            />
          </div>
        </div>
      </div>

    </>
  );
}
