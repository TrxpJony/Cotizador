import '../css/colosal.css'; // Archivo CSS para estilos
import { Mision } from './nosotros/mision';
import { Oficinas } from './nosotros/oficinas';
import { motion } from 'framer-motion';
import ServiciosContact from './serviciosPage/servicioscontact';
import { Helmet } from "react-helmet-async";

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Nosotros() {
  return (
    <>
      <Helmet>
        <title>Vidrio al Arte SAS | Conócenos</title>
        <meta
          name="description" content="Descubre quiénes somos en Vidrio al Arte SAS: conoce nuestra historia, valores, misión, visión, sedes y compromiso con la calidad en productos de vidrio y aluminio."/>
        <meta name="keywords" content="oficinas vidrio al arte, mision y vision vidrio al arte, vidrio al arte" />
      </Helmet>
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
}
