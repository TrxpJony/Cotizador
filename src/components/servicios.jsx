import '../css/colosal.css'; // Archivo CSS para estilos
import { motion } from 'framer-motion';
import division from '../img/img_servicios/division.png'
import accesorios from '../img/img_servicios/accesorios.png'
import vidrio from '../img/img_servicios/vidrio.png'
import espejo from '../img/img_servicios/espejo.png'
import corte from '../img/img_servicios/corte.png'
import puer from '../img/img_servicios/puer.png'
const posts = [
  {
    id: 1,
    title: 'Divisiones de baño',
    href: '#',
    description:
      'Ofrecemos divisiones de baño de alta calidad, diseñadas para brindar elegancia y funcionalidad a su espacio.',
    category: { title: 'Baño', href: '#' },
    author: {
      name: 'Vidrio al Arte SAS',
      role: 'Proveedor',
      href: '#',
      imageUrl: division,
    },
  },
  {
    id: 2,
    title: 'Accesorios',
    href: '#',
    description:
      'Encuentre una variedad de artículos de ferretería para todos sus proyectos, desde herramientas hasta accesorios.',
    category: { title: 'Ferretería', href: '#' },
    author: {
      name: 'Vidrio al Arte SAS',
      role: 'Proveedor',
      href: '#',
      imageUrl: accesorios,
    },
  },
  {
    id: 3,
    title: 'Espejos',
    href: '#',
    description:
      'Ofrecemos espejos con diseños personalizados de sandblasting y luces LED integradas para darle un toque moderno y elegante a su espacio.',
    category: { title: 'Espejos', href: '#' },
    author: {
      name: 'Vidrio al Arte SAS',
      role: 'Proveedor',
      href: '#',
      imageUrl:espejo,
    },
  },
  {
    id: 4,
    title: 'Productos de vidrio',
    href: '#',
    description:
      'Proveemos productos de vidrio de alta calidad para diversas aplicaciones, desde ventanas hasta decoraciones.',
    category: { title: 'Vidrio', href: '#' },
    author: {
      name: 'Vidrio al Arte SAS',
      role: 'Proveedor',
      href: '#',
      imageUrl: vidrio,
    },
  },
  {
    id: 5,
    title: 'Equipos para servicio',
    href: '#',
    description:
      'Ofrecemos servicios especializados de biselado, mesa de corte, pulido, ademas de otros para sus proyectos de vidrio.',
    category: { title: 'Servicios', href: '#' },
    author: {
      name: 'Vidrio al Arte SAS',
      role: 'Proveedor',
      href: '#',
      imageUrl: corte,
    },
  },
  {
    id: 6,
    title: 'Transformación de acero para crear puertas y ventanas',
    href: '#',
    description:
      'Nos especializamos en la transformación de acero para la creación de puertas y ventanas de alta calidad, combinando durabilidad y diseño.',
    category: { title: 'Acero', href: '#' },
    author: {
      name: 'Vidrio al Arte SAS',
      role: 'Proveedor',
      href: '#',
      imageUrl: puer,
    },
  },
];

export function Servicios() {

  return (
    <>
    <br />
      <motion.div 
        className="bg-gradient-to-r from-cyan-400 to-cyan-600 py-24 sm:py-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="text-base/7 font-semibold text-white">Vidrio al Arte SAS</h2>
        <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Servicios
              </p>
          <p className="mt-2 text-lg/8 text-white">
          En Vidrio al Arte SAS ofrecemos soluciones en vidrio y acero para una amplia variedad de proyectos, tanto en interiores como en exteriores. Ya sea que necesites divisiones de baño, espejos personalizados, productos de vidrio, equipos especializados o trabajos en acero, estamos aquí para materializar tus ideas con calidad y diseño. Nuestro compromiso es brindarte opciones que se adapten a tus necesidades con acabados profesionales y estilo único.
        </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-600 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <motion.article 
              key={post.id} 
              className="flex max-w-xl flex-col items-start justify-between transform transition-transform hover:scale-105 bg-white shadow-lg rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: post.id * 0.2 }}
            >
              <motion.img 
                src={post.author.imageUrl} 
                alt="" 
                className="w-full h-48 object-cover"
                whileHover={{ scale: 1.1 }}
              />
              <div className="flex items-center gap-x-4 text-xs mt-4">
              </div>
              <div className="group relative p-6">
                <h3 className="mt-3 text-lg/6 font-semibold text-gray-800 group-hover:text-cyan-600">
                  <a href={post.href}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm/6 text-gray-800">{post.description}</p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4 p-6">
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.div>

    </>
  );
}
