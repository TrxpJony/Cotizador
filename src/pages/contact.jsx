import InfoContact from "../components/contact/info";
import FormContact from "../components/contact/form";
import { Helmet } from "react-helmet";

const ContactPage = () => {
    return (
        <>
            <Helmet>
                <title>Vidrio al Arte SAS | Contacto</title>
                <meta name="description" content="Contáctanos en Vidrio al Arte SAS. Encuentra nuestro formulario de contacto, WhatsApp, Facebook, Instagram, correos electrónicos y horarios de atención. Resolvemos tus dudas y te asesoramos en tus proyectos de vidrio y aluminio en Colombia." />
                <meta name="keywords" content="contacto Vidrio al Arte SAS, WhatsApp, Facebook, Instagram, correo, horarios de atención, asesoría vidrio, aluminio, Colombia" />
            </Helmet>
            <div className=" grid grid-cols-1 lg:grid-cols-2">
                <InfoContact />
                <FormContact />
            </div>
        </>
    );
};
export default ContactPage;