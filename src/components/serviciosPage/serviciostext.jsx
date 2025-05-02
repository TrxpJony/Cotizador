

import { motion } from 'framer-motion';

const ServiciosText = () => {
    return (
        <>
        <motion.div
            className="p-8 text-center rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="flex justify-center items-center">
            </div>
            <p className="text-base font-semibold text-cyan-500  tracking-tight mt-4">
                Vidrio al Arte SAS
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl">
                Servicios
            </h1>
            <p className="mt-6 text-lg  text-gray-600">
                En Vidrio al Arte SAS convertimos ideas en espacios únicos. Nos apasiona crear soluciones funcionales y estéticas que se adapten a cada necesidad. Combinamos experiencia, compromiso y calidad para llevar cada proyecto al siguiente nivel.
            </p>
            <p className="mt-4 text-lg  text-gray-600">
                Cada detalle importa. Cada espacio cuenta.
            </p>
        </motion.div>
        </>
    );
};
export default ServiciosText;