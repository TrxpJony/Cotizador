import '../css/colosal.css'; // Archivo CSS para estilos
import { motion } from 'framer-motion';
import { CortinaMovimiento } from './inicio/cotinaMovimiento';
import { NuestrosInfo } from './inicio/infoNuestros';
import { InfoProductos } from './inicio/infoProductos';
import { Colaboración } from './inicio/colaboracion';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export function Inicio() {
  return (
    <>
      <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <CortinaMovimiento />
      </motion.div>
      <br />
      <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <NuestrosInfo />
      </motion.div>
      <br />
      <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <InfoProductos />
      </motion.div>
      <br />
      <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <Colaboración />
      </motion.div>
    </>
  );
}