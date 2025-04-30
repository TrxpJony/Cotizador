import Servicios from "./serviciosPage/servicios";
import ServiciosContact from "./serviciosPage/servicioscontact";
import ServiciosText from "./serviciosPage/serviciostext";
import { motion } from 'framer-motion';

const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ServiciosPage = () => {
    return (
        <>
            <motion.div
                className="mx-auto mt-10 max-w-7xl px-6 lg:px-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <ServiciosText />
                <div className="border-t border-gray-600 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none">
                    <Servicios />
                </div>
            </motion.div>
            <motion.div
                variants={variants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <ServiciosContact />
            </motion.div>
        </>
    );
};
export default ServiciosPage