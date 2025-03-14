import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from 'framer-motion';
import { motion } from 'framer-motion';
import GoogleMap from '../nosotros.direccion';

const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function InfoContact() {
    return (
        <>
            <div className="flex flex-col item-center justify-center space-y-4 p-8 bg-gradient-to-r text-gray-700 rounded-lg">
                <div className="flex space-x-8">
                    <motion.a
                        href="https://api.whastapp.com/send/?phone=3223065256&tex&type=phone_number$app_absent=0"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-6xl"
                    >
                        <FaWhatsapp />
                    </motion.a>
                    <motion.a
                        href="https://facebook.com"
                        target="_blanck"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-6xl"
                    >
                        <FaFacebook />
                    </motion.a>
                    <motion.a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-6xl"
                    >
                        <FaInstagram />
                    </motion.a>
                </div>
                <div className="text-center mt-4">
                    <h2 className="text-2xl font-semibold">Contáctanos</h2>
                    <p>Teléfono Ventas: 3204391328 - 3223065279</p>
                    <p>Direccion: Cl. 71 A #75 36, Bogotá, Colombia</p>
                </div>
                <motion.div
                    variants={variants}
                    initial="hidden"
                    whileInView={"visible"}
                    viewport={{ once: true }}
                    className="w-full mt-8"
                >
                    <GoogleMap />
                </motion.div>
            </div>
        </>
    )
}