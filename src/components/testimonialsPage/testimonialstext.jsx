import '../../css/colosal.css'; // Archivo CSS para estilos
import { motion } from 'framer-motion'; // Importar framer-motion

const TestimonialsText = () => {
    return (
        <>
            <motion.div 
                className="mx-auto max-w-7xl px-6 lg:px-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-base/7 font-semibold text-gray-600 ">Vidrio al Arte SAS</h2>
                    <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-700 sm:text-5xl">
                        Proyectos
                    </p>
                    <p className="mt-2 text-lg/8 text-gray-600">
                        En Vidrio al Arte SAS, nos especializamos en proyectos de instalación de divisiones de baño, espejos personalizados, productos de vidrio y trabajos en aluminio. Nuestro equipo trabaja en estrecha colaboración con los clientes para garantizar la más alta calidad y atención al detalle. Ya sea que estés renovando tu hogar o desarrollando un nuevo espacio comercial, estamos aquí para transformar tus ideas en realidad con soluciones innovadoras y acabados profesionales.
                    </p>
                </div>
            </motion.div>
        </>
    );
};

export default TestimonialsText;
