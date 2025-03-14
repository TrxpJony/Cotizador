import { ArrowPathIcon, PlusCircleIcon, TrashIcon, Bars3BottomLeftIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Crear Registros',
    description:
      'Agrega nuevos registros al sistema de forma sencilla con una interfaz amigable. Asegúrate de capturar todos los datos necesarios con precisión.',
    icon: PlusCircleIcon,
  },
  {
    name: 'Leer Registros',
    description:
      'Accede y visualiza información detallada sobre los registros existentes. Utiliza funciones de búsqueda y filtros para encontrar datos específicos rápidamente.',
    icon: Bars3BottomLeftIcon,
  },
  {
    name: 'Actualizar Registros',
    description:
      'Modifica registros existentes con facilidad. Mantén tus datos actualizados y precisos con nuestras funciones intuitivas de edición.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Eliminar Registros',
    description:
      'Elimina registros obsoletos o innecesarios del sistema. Mantén una base de datos limpia y organizada sin esfuerzo.',
    icon: TrashIcon,
  },
];

export default function Example() {
  return (
    <>
      <div className="bg-white py-24 sm:py-32 h-full">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base/7 font-semibold text-cyan-600">Administrador</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-700 sm:text-5xl lg:text-balance">
              Todo lo que necesitas para administrar el sitio
            </p>
            <p className="mt-6 text-lg/8 text-default-400">
              Administra y gestiona todos los aspectos del sitio con nuestras herramientas CRUD. Facilita la creación, lectura, actualización y eliminación de registros.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base/7 font-semibold text-gray-700">
                    <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500">
                      <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base/7 text-default-400">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <br />
        <br />
        <br />
      </div>
    </>
  );
}
