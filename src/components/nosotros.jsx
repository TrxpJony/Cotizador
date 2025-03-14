import '../css/colosal.css'; // Archivo CSS para estilos
import { Mision } from './nosotros/mision';
import { Oficinas } from './nosotros/oficinas';
import { motion } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Nosotros() {
  return (
    <>
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
      >
        <Mision />
      </motion.div>
      <motion.div
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Oficinas />
      </motion.div>

    </>
  );
}
