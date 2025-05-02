import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import EspejosDescription from "../../components/serviciosPage/serviciosInfoPages/espejosInfoPage/espejosDescription";
import EspejosGalery from "../../components/serviciosPage/serviciosInfoPages/espejosInfoPage/espejosgalery";
import EspejosHeaderInfo from "../../components/serviciosPage/serviciosInfoPages/espejosInfoPage/espejosHeaderInfo";
import EspejosFaqs from "../../components/serviciosPage/serviciosInfoPages/espejosInfoPage/FAQ";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { Helmet } from "react-helmet";

const EspejosInfoPage = () => {
    const mainDivRef = useRef(null);
    const [socialBottom, setSocialBottom] = useState(20);

    useEffect(() => {
        const handleScroll = () => {
            if (!mainDivRef.current) return;
            const mainRect = mainDivRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (mainRect.bottom < windowHeight - 20) {
                setSocialBottom(windowHeight - mainRect.bottom + 20);
            } else {
                setSocialBottom(20);
            }
        };
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);
        handleScroll();
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);

    // Variantes de animación
    const fadeInUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1.0 } },
    };

    return (
        <>
            <Helmet>
                <title>Espejos Personalizados | ACERVID</title>
                <meta name="description" content="Descubre espejos personalizados con iluminación LED, sensores inteligentes y diseños únicos para tu hogar o negocio. Calidad y tecnología en ACERVID." />
                <meta name="keywords" content="espejos personalizados, espejos LED, espejos modernos, espejos a medida, espejos con sensores, ACERVID, espejos Colombia" />
                <link rel="canonical" href="https://acervid.com/servicios/espejos" />

                <meta property="og:title" content="Espejos Personalizados | ACERVID" />
                <meta property="og:description" content="Descubre nuestros hermosos espejos diseñados a medida" />
            </Helmet>
            <main ref={mainDivRef} className="bg-gradient-to-b from-gray-800 to-black shadow-lg" aria-label="Información sobre espejos personalizados">
                <motion.section
                    className="sm:h-auto flex flex-col mt-20 sm:mt-32 sm:justify-center sm:mb-20"
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    aria-label="Encabezado de espejos"
                >
                    <EspejosHeaderInfo />
                </motion.section>

                <motion.section
                    className="flex justify-center items-center flex-col sm:mb-20"
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    aria-label="Descripción de espejos"
                >
                    <EspejosDescription />
                </motion.section>

                <motion.section
                    className="flex justify-center items-center flex-col sm:mb-20"
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                    aria-label="Galería de espejos"
                >
                    <EspejosGalery />
                </motion.section>

                <motion.section
                    className="flex justify-center items-center flex-col mt-5 mb-20"
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    aria-label="Preguntas frecuentes sobre espejos"
                >
                    <EspejosFaqs />
                </motion.section>
            </main>

            {/* Floating social media bar con efectos personalizados */}
            <nav
                className="fixed right-5 flex flex-col space-y-3 z-50"
                style={{ bottom: socialBottom }}
                aria-label="Redes sociales"
            >
                {[{
                    href: "https://www.facebook.com/people/Acervid/61556144607224/?locale=es_LA",
                    icon: <FaFacebookF className="text-white rounded-full text-2xl" aria-label="Facebook" />,
                    bg: "bg-blue-600",
                    hover: "hover:bg-blue-700"
                }, {
                    href: "https://api.whatsapp.com/send?phone=573223065256",
                    icon: <FaWhatsapp className="text-white rounded-full text-2xl" aria-label="WhatsApp" />,
                    bg: "bg-green-500",
                    hover: "hover:bg-green-600"
                }, {
                    href: "https://www.instagram.com/acervid_/#",
                    icon: <FaInstagram className="text-white rounded-full text-2xl" aria-label="Instagram" />,
                    bg: "bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
                    hover: "hover:bg-gradient-to-r hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF]"
                }].map((social, i) => (
                    <motion.a
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${social.bg} text-white p-2 rounded-full shadow-lg ${social.hover}`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        aria-label={`Ir a ${["Facebook", "WhatsApp", "Instagram"][i]}`}
                    >
                        {social.icon}
                    </motion.a>
                ))}
            </nav>
        </>
    );
};

export default EspejosInfoPage;
