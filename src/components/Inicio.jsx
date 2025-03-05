import '../css/colosal.css'; // Archivo CSS para estilos
import { motion } from 'framer-motion';
import { CortinaMovimiento } from './inicio/cotinaMovimiento';
import { NuestrosInfo } from './inicio/infoNuestros';
import { InfoProductos } from './inicio/infoProductos';
import { Colaboración } from './inicio/colaboracion';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1] } 
  },
};

export function Inicio() {
  return (
    <>
      {[CortinaMovimiento, NuestrosInfo, InfoProductos, Colaboración].map((Component, index) => (
        <motion.div
          key={index}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // Se activa cuando el 20% del elemento es visible
          style={{ marginBottom: '40px' }} // Espaciado entre secciones
        >
          <Component />
        </motion.div>
      ))}
    </>
  );
}
