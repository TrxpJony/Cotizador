import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";
import { motion } from 'framer-motion';
import GoogleMap from '../nosotros/direccion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.2 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20},
    visible: { opacity: 1, y: 0, trnasition: { diration: 0.3 } },
}

export default function InfoContact() {
    return (
        <>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center justify-center space-y-8 text-geay-700 "
            >
                {/* Información de Contacto  */}
                <motion.div variants={itemVariants} className="text-center space-y-1">
                    <h2 className="text-3xl font-bold">Contáctanos</h2>
                    <p className="text-lg">Télefonos: <span className="font-semibold">3204391328 - 3223065279</span></p>
                    <p className="text-lg">Correo: <a href="mailto:ventas@vidrioalarte.com" className="text-cyan-500 font-semibold">ventas@vidrioalarte.com</a></p>
                    <p className="text-lg">Direccion: <span className="font-semibold">Cl. 71A #75 36, Bogotá, Colombia</span></p>
                </motion.div>
                {/* Horarios de Atención */}
                <motion.div variants={itemVariants} className="text-center space-y-1">
                    <h3 className="text-2xl font-semibold">Horario de Entregas</h3>
                    <p className="text-lg">Lunes a Viernes: <span className="font-semibold">8:00 AM - 12:00 AM / 1:30 PM - 4:00 PM</span></p>
                    <p className="text-lg">Sábados: <span className="font-semibold">8:00 AM - 11:30 AM</span></p>
                </motion.div>

                {/* Redes Sociales */}
                <motion.div variants={itemVariants} className="flex space-x-6 text-4xl">
                    <motion.a href="https://api.whatsapp.com/send/?phone=3223065256&text&type=phone_number&app:absent=0" target="_blanck" rel="noopener noreferrer" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9}}>
                        <FaWhatsapp/>
                    </motion.a>
                    <motion.a href="https://www.facebook.com/vidrio.a.arte" target="_blanck" rel="noopener noreferrer" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} >
                        <FaFacebook/>
                    </motion.a>
                    <motion.a href="https://www.instagram.com/vidrioalartesas" target="_blanck" rel="noopener noreferrer" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9}} >
                        <FaInstagram/>
                    </motion.a>
                </motion.div>
                {/* Mapa */}
                <motion.div variants={itemVariants} className="w-full mt-6">
                    <GoogleMap/>
                </motion.div>
            </motion.div>
        </>
    );
}