import { motion } from "framer-motion";
import CarruselesComponent from "../inicio/carrusel/carruseles.jsx"; // Import the CarruselesComponent

import "../../css/colosal.css";

const features = [
  { name: "Origen", description: "Fabricado por Vidrio al Arte SAS en Bogotá, Colombia." },
  { name: "Materiales", description: "Estructuras de vidrio, espejos o aluminio de alta calidad." },
  { name: "Dimensiones", description: "Personalizable en tamaño y diseño, según las especificaciones del cliente." },
  { name: "Personalización", description: "Fabricamos piezas en vidrio, espejos personalizados y sistemas de aluminio según tus necesidades." },
  { name: "Componentes", description: "Incluye herrajes y accesorios en acero inoxidable para una instalación segura y duradera." },
  { name: "Detalles", description: "Las variaciones en textura, color y acabado son propias de los materiales utilizados en la fabricación." }
];

export function InfoProductos() {
  return (
    <div className="bg-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8"
      >
        {/* Sección de texto con animación de entrada */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-700 sm:text-4xl">
            Nuestros Productos
          </h2>
          <p className="mt-4 text-default-400">
            Vidrio al Arte SAS ofrece una amplia gama de productos de vidrio, Espejo y aluminio, diseñados para aportar elegancia y estilo a cualquier espacio. Desde puertas y ventanas de vidrio templado y aluminio hasta espejos personalizados con luz led, nuestros productos combinan calidad y diseño para satisfacer las necesidades de nuestros clientes.
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-t border-gray-200 pt-4"
              >
                <dt className="font-medium text-gray-700">{feature.name}</dt>
                <dd className="mt-2 text-sm text-default-400">{feature.description}</dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>

        {/* Sección de imágenes reemplazada por el componente de carruseles */}
        <CarruselesComponent />
      </motion.div>
    </div>
  );
}
