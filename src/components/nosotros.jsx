
import '../css/colosal.css'; // Archivo CSS para estilos
import { GlobeAmericasIcon, EyeIcon } from '@heroicons/react/20/solid'
import mision from '../img/img_nosotros/mision.png'
const features = [
  {
    name: 'Misión.',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: GlobeAmericasIcon,
  },
  {
    name: 'Visión.',
    description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
    icon: EyeIcon,
  },
]
export function Nosotros() {

  return (
    <>
    <br />
 <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-cyan-500">Vidrio al Arte SAS</h2>
              <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-700 sm:text-5xl">
                Misión y Visión
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
    </>
  );
}
