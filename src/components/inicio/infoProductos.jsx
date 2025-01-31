import { useState } from 'react';
import { motion } from 'framer-motion';
import cocina1 from '../../img/img_Principal/cocina3.png';
import cocina2 from '../../img/img_Principal/cocina4.png';
import cocina3 from '../../img/img_Principal/cocina1.png';
import cocina4 from '../../img/img_Principal/cocina5.png';
import '../../css/colosal.css';

const productImages = [
    { src: cocina1, alt: 'Diseño moderno de cocina con vidrio templado', category: 'Cocinas' },
    { src: cocina2, alt: 'Elegante división de vidrio para espacios', category: 'Divisiones' },
    { src: cocina3, alt: 'Acabados premium en vidrio y acero', category: 'Acabados' },
    { src: cocina4, alt: 'Soluciones personalizadas en vidrio', category: 'Personalizado' },
];

const features = [
    { name: 'Origen', description: 'Fabricado por Vidrio al Arte SAS en Bogotá, Colombia.' },
    { name: 'Material', description: 'Estructura de acero inoxidable con paneles de vidrio templado de alta resistencia.' },
    { name: 'Dimensiones', description: 'Personalizable en tamaño y diseño, según las especificaciones del cliente.' },
    { name: 'Acabado', description: 'Acero pulido con opciones de acabado mate o brillante, combinado con vidrio.' },
    { name: 'Incluye', description: 'Puerta o división con herrajes de acero inoxidable y componentes de instalación.' },
    { name: 'Consideraciones', description: 'Los materiales utilizados son de origen natural. Las variaciones en la textura y color del vidrio o el acero son parte del diseño.' },
];

export function InfoProductos() {
    const [modalImage, setModalImage] = useState(null);

    return (
        <div className="bg-gradient-to-b from-white to-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16"
                >
                    <div>
                        <motion.h2 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl font-bold text-gray-800 mb-8 leading-tight"
                        >
                            Innovación en <span className="text-cyan-600">Vidrio y Diseño</span>
                        </motion.h2>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-lg text-gray-600 mb-12"
                        >
                            Vidrio al Arte SAS transforma espacios ordinarios en extraordinarios, combinando la elegancia del vidrio con la durabilidad del acero inoxidable. Cada pieza es una obra maestra de artesanía moderna.
                        </motion.p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={feature.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 * index }}
                                    className="border-l-4 border-cyan-500 pl-4 hover:border-cyan-600 transition-all"
                                >
                                    <dt className="font-semibold text-cyan-600 mb-2">{feature.name}</dt>
                                    <dd className="text-gray-600">{feature.description}</dd>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="grid grid-cols-2 gap-6 mt-8"> {/* Changed mt-4 to mt-8 for more margin-top */}
                            {productImages.map((image, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 * index }}
                                    className="relative group"
                                    onClick={() => setModalImage(image)}
                                >
                                    <div className="overflow-hidden rounded-xl shadow-lg cursor-pointer">
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                            className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="absolute bottom-4 left-4 text-white">
                                                <span className="text-sm font-medium bg-cyan-600 px-2 py-1 rounded">
                                                    {image.category}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {modalImage && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-lg w-full">
                        <img src={modalImage.src} alt={modalImage.alt} className="w-full h-auto" />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800">{modalImage.category}</h3>
                            <p className="text-gray-600">{modalImage.alt}</p>
                            <button
                                onClick={() => setModalImage(null)}
                                className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-full"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
