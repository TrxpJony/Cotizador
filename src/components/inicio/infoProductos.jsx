import { motion } from "framer-motion";
import cocina1 from "../../img/img_Principal/cocina3.png";
import cocina2 from "../../img/img_Principal/cocina4.png";
import cocina3 from "../../img/img_Principal/cocina1.png";
import cocina4 from "../../img/img_Principal/cocina5.png";
import "../../css/colosal.css";

const features = [
  { name: "Origen", description: "Fabricado por Vidrio al Arte SAS en Bogotá, Colombia." },
  { name: "Material", description: "Estructura de acero inoxidable con paneles de vidrio templado de alta resistencia." },
  { name: "Dimensiones", description: "Personalizable en tamaño y diseño, según las especificaciones del cliente." },
  { name: "Acabado", description: "Acero pulido con opciones de acabado mate o brillante, combinado con vidrio." },
  { name: "Incluye", description: "Puerta o división con herrajes de acero inoxidable y componentes de instalación." },
  { name: "Consideraciones", description: "Los materiales utilizados son de origen natural. Las variaciones en la textura y color del vidrio o el acero son parte del diseño." },
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
            Vidrio al Arte SAS ofrece una amplia gama de productos de vidrio decorativo y funcional, diseñados para aportar elegancia y estilo a cualquier espacio. Desde puertas y ventanas de vidrio templado hasta espejos personalizados y divisiones para oficinas, nuestros productos combinan calidad y diseño para satisfacer las necesidades de nuestros clientes.
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
                <dt className="font-medium text-cyan-600">{feature.name}</dt>
                <dd className="mt-2 text-sm text-default-400">{feature.description}</dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>

        {/* Sección de imágenes con animaciones */}
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          {[cocina1, cocina2, cocina3, cocina4].map((image, index) => (
            <motion.img
              key={index}
              src={image}
              alt={`Producto ${index + 1}`}
              className="rounded-lg bg-gray-100"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
