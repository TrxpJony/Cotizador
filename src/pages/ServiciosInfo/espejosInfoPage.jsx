import { useEffect, useLayoutEffect, useRef, useState } from "react";
import EspejosDescription from "../../components/serviciosPage/serviciosInfoPages/espejosInfoPage/espejosDescription";
import EspejosGalery from "../../components/serviciosPage/serviciosInfoPages/espejosInfoPage/espejosgalery";
import EspejosHeaderInfo from "../../components/serviciosPage/serviciosInfoPages/espejosInfoPage/espejosHeaderInfo";
import EspejosFaqs from "../../components/serviciosPage/serviciosInfoPages/espejosInfoPage/FAQ";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";
import gsap from "gsap";
import { animateDivisionesSocial } from "../../utils/serviciosAnimations/gsapAnimationsDivisiones";

const EspejosInfoPage = () => {
    const containerRef = useRef(null);

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

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            animateDivisionesSocial(containerRef.current); // <-- pasa la referencia aqui
        }, containerRef);
        return () => ctx.revert();
    }, [])

    return (
        <>
            <Helmet>
                <title>Espejos Personalizados | Vidrio al Arte</title>
                <meta name="description" content="Espejos personalizados en Colombia: diseños modernos, iluminación LED, sensores inteligentes y acabados de alta calidad. Transforma tus espacios con espejos a medida para hogar y negocio. Solicita tu cotización en ACERVID." />
                <meta name="keywords" content="espejos personalizados, espejos LED, espejos modernos, espejos a medida, espejos con sensores, espejos para baño, espejos decorativos, ACERVID, espejos Colombia" />
            </Helmet>
            <main ref={mainDivRef} className="bg-black shadow-lg" aria-label="Información sobre espejos personalizados">
                <div className="mx-auto max-w-7xl w-full px-5 sm:px-8 md:px-14 lg:px-5 mb-16">
                    <div
                        className="mb-24 sm:mb-40"
                        aria-label="Encabezado de espejos"
                    >
                        <EspejosHeaderInfo />
                    </div>

                    <div
                        className="mb-20 sm:mb-40"
                        aria-label="Descripción de espejos"
                    >
                        <EspejosDescription />
                    </div>

                    <div
                        className="mb-20 sm:mb-40"
                        aria-label="Galería de espejos"
                    >
                        <EspejosGalery />
                    </div>

                    <div
                        className="mb-20 sm:mb-40"
                        aria-label="Preguntas frecuentes sobre espejos"
                    >
                        <EspejosFaqs />
                    </div>
                </div>
            </main>

            {/* Floating social media bar con efectos personalizados */}
            <div ref={containerRef}>
                <nav
                    className="fixed right-3 md:right-5 flex flex-col space-y-2 md:space-y-3 z-50"
                    style={{ bottom: socialBottom }}
                    aria-label="Redes sociales"
                >
                    {[{
                        href: "https://www.facebook.com/people/Acervid/61556144607224/?locale=es_LA",
                        icon: <FaFacebookF className="text-white rounded-full text-lg md:text-xl lg:text-2xl" aria-label="Facebook" />,
                        bg: "bg-blue-600",
                        hover: "hover:bg-blue-700"
                    }, {
                        href: "https://api.whatsapp.com/send?phone=573223065256",
                        icon: <FaWhatsapp className="text-white rounded-full text-lg md:text-xl lg:text-2xl" aria-label="WhatsApp" />,
                        bg: "bg-green-500",
                        hover: "hover:bg-green-600"
                    }, {
                        href: "https://www.instagram.com/acervid_/#",
                        icon: <FaInstagram className="text-white rounded-full text-lg md:text-xl lg:text-2xl" aria-label="Instagram" />,
                        bg: "bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
                        hover: "hover:bg-gradient-to-r hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF]"
                    }].map((social, i) => (
                        <a
                            key={i}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${social.bg} social text-white p-1.5 md:p-2 lg:p-3 rounded-full shadow-lg ${social.hover}`}
                            aria-label={`Ir a ${["Facebook", "WhatsApp", "Instagram"][i]}`}
                        >
                            {social.icon}
                        </a>
                    ))}
                </nav>
            </div>
        </>
    );
};

export default EspejosInfoPage;
