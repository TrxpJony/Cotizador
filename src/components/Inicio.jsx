import '../css/colosal.css'; // Archivo CSS para estilos
import { motion } from 'framer-motion';
import { CortinaMovimiento } from './inicio/cotinaMovimiento';
import { NuestrosInfo } from './inicio/infoNuestros';
import { InfoProductos } from './inicio/infoProductos';
import { Colaboración } from './inicio/colaboracion';
import ServiciosContact from './serviciosPage/servicioscontact';

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
          viewport={{ once: true, amount: 0.15 }} // Cambiado de 0.5 a 0.15 para móviles/tablets
          style={{ marginBottom: '20px' }} // Espaciado entre secciones
        >
          <Component />
        </motion.div>
      ))}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }} // Cambiado de 0.5 a 0.15
      >
        <ServiciosContact />
      </motion.div>

    </>
  );
}
