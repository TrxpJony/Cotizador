import { useEffect, useRef, useState } from "react";
import EspejosDescription from "../../components/serviciosPage/serviciosInfoPages/espejosInfoPage/espejosDescription";
import EspejosGalery from "../../components/serviciosPage/serviciosInfoPages/espejosInfoPage/espejosgalery";
import EspejosHeaderInfo from "../../components/serviciosPage/serviciosInfoPages/espejosInfoPage/espejosHeaderInfo";
import EspejosFaqs from "../../components/serviciosPage/serviciosInfoPages/espejosInfoPage/FAQ";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";

const EspejosInfoPage = () => {
    const mainDivRef = useRef(null);
    const [socialBottom, setSocialBottom] = useState(20);
    const [showDescription, setShowDescription] = useState(false);

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

    return (
        <>
            <Helmet>
                <title>Espejos Personalizados | ACERVID</title>
                <meta name="description" content="Espejos personalizados en Colombia: diseños modernos, iluminación LED, sensores inteligentes y acabados de alta calidad. Transforma tus espacios con espejos a medida para hogar y negocio. Solicita tu cotización en ACERVID." />
                <meta name="keywords" content="espejos personalizados, espejos LED, espejos modernos, espejos a medida, espejos con sensores, espejos para baño, espejos decorativos, ACERVID, espejos Colombia" />
            </Helmet>
            <main ref={mainDivRef} className="bg-gradient-to-b from-gray-800 to-black shadow-lg" aria-label="Información sobre espejos personalizados">
                <section
                    className="sm:h-auto flex flex-col mt-20 sm:mt-32 sm:justify-center sm:mb-20"
                    aria-label="Encabezado de espejos"
                >
                    <EspejosHeaderInfo onAnimationComplete={() => setShowDescription(true)} />
                </section>

                <section
                    className="flex justify-center items-center flex-col sm:mb-20"
                    aria-label="Descripción de espejos"
                >
                    {showDescription && <EspejosDescription />}
                </section>

                <section
                    className="flex justify-center items-center flex-col sm:mb-20"
                    aria-label="Galería de espejos"
                >
                    <EspejosGalery />
                </section>

                <section
                    className="flex justify-center items-center flex-col mt-5 mb-20"
                    aria-label="Preguntas frecuentes sobre espejos"
                >
                    <EspejosFaqs />
                </section>
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
                    <a
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${social.bg} text-white p-2 rounded-full shadow-lg ${social.hover}`}
                        aria-label={`Ir a ${["Facebook", "WhatsApp", "Instagram"][i]}`}
                    >
                        {social.icon}
                    </a>
                ))}
            </nav>
        </>
    );
};

export default EspejosInfoPage;
