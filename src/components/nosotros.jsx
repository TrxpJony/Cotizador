import '../css/colosal.css'; // Archivo CSS para estilos
import { Mision } from './nosotros/mision';
import { Oficinas } from './nosotros/oficinas';
import { motion } from 'framer-motion';

export function Nosotros() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Mision />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Oficinas />
      </motion.div>
    </>
  );
}
