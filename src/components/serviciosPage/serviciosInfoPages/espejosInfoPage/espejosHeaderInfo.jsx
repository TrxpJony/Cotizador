import { motion } from "framer-motion";
import EspejosCarruselPage from "./epejoscarruselPage";
import PropTypes from "prop-types";

const EspejosHeaderInfo = ({ onAnimationComplete }) => {
    return (
        <motion.section
            className="text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            aria-label="Encabezado principal de espejos personalizados"
            onAnimationComplete={onAnimationComplete}
        >
            {/* Cotización */}
            <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
            >
                <div className="relative rounded-full px-3 py-1 text-sm/6 text-white ring-1 ring-white hover:ring-cyan-500 transition-all duration-300">
                    Solicita tu cotización personalizada&nbsp;
                    <a
                        href="https://api.whatsapp.com/send?phone=573223065256"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-cyan-500 hover:underline"
                    >
                        <span aria-hidden="true" className="absolute inset-0" />
                        Acervid <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </motion.div>

            {/* Título */}
            <motion.div
                className="tracking-tight"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
            >
                <h1 className="mt-2 text-timberWolf font-black md:text-[60px] sm:text-[48px] xs:text-[40px] text-[30px] font-poppins text-white px-6">
                    Espejos Personalizados
                </h1>
                <h2 className="sr-only">Diseños únicos, tecnología LED y sensores inteligentes</h2>
            </motion.div>

            {/* Descripción */}
            <motion.p
                className="max-w-5xl px-4 text-center text-base sm:text-lg leading-8 text-default-400 mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
            >
                Descubre diseños de espejos elegantes y totalmente personalizados, creados para aportar luminosidad, amplitud y estilo a tus espacios. Refleja tu esencia y transforma cada ambiente en un lugar único y sofisticado con nuestras soluciones a medida. Espejos con iluminación LED, sensores inteligentes y acabados de alta calidad.
            </motion.p>

            {/* Carrusel */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 1 }}
            >
                <EspejosCarruselPage />
            </motion.div>

            {/* Botón de explorar */}
            <motion.div
                className="mb-10 flex items-center justify-center gap-x-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.7 }}
            >
                <a
                    href="https://drive.google.com/file/d/1ckkOc3OAFvWl-GOVH3BXEamDIDiP1xFA/view"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm/6 font-semibold text-cyan-500 hover:text-white hover:underline transition duration-300"
                >
                    Explora más diseños <span aria-hidden="true">→</span>
                </a>
            </motion.div>
        </motion.section>
    );
};
EspejosHeaderInfo.propTypes = {
    onAnimationComplete: PropTypes.func,
};

export default EspejosHeaderInfo;
