import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ServiciosContact = () => {
    return (
        <>
            <motion.div
                className='relative isolate overflow-hidden py-24 sm:py-32 text-center'
                style={{
                    background: "linear-gradient(90deg, #22d3ee, #0891b2, #9ca3af, #374151, #374151, #9ca3af, #0891b2, #22d3ee, #0891b2)",
                    backgroundSize: "800% 800%"
                }}
                animate={{
                    backgroundPosition: [
                        "0% 50%", "25% 50%", "50% 50%", "75% 50%", "100% 50%"
                    ],
                }}
                transition={{
                    duration: 50,
                    ease: "linear",
                    repeat: Infinity,
                }}
            >
                <div className='max-w-4xl mx-auto px-6 lg:px-8'>
                    <motion.h2
                        className='text-2xl font-bold tracking-tight text-white sm:text-3xl'
                    >
                        ¡Contáctanos!
                    </motion.h2>
                    <p className='mt-4 text-lg text-gray-200'>
                        Estamos aquí para ayudarte con tus proyectos. No dudes en comunicarte con nosotros para obtener más información o resolver tus dudas.
                    </p>
                    <Link to="/contact">
                        <motion.button
                            className='mt-4 px-6 py-3 rounded-lg text-lg font-medium text-white bg-cyan-600 hover:bg-cyan-400 transition-all'
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            ¿Charlamos un momento?
                        </motion.button>
                    </Link>
                </div>


            </motion.div>
        </>
    );
};
export default ServiciosContact; 