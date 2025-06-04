import { useEffect, useState, useRef, useLayoutEffect } from "react";
import AluminioAboutSection from "../../components/serviciosPage/serviciosInfoPages/aluminioInfoPage/aluminioAboutSection";
import AluminioFaqSection from "../../components/serviciosPage/serviciosInfoPages/aluminioInfoPage/aluminioFAQSection";
import AluminioGalerySection from "../../components/serviciosPage/serviciosInfoPages/aluminioInfoPage/aluminioGalerySection";
import AluminioHeroSection from "../../components/serviciosPage/serviciosInfoPages/aluminioInfoPage/aluminioHeroSection";
import { FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa";
import gsap from "gsap";
import { animateDivisionesSocial } from "../../utils/serviciosAnimations/gsapAnimationsDivisiones";
import { Helmet } from "react-helmet-async";

const AluminioInfoPage = () => {
    const containerRef = useRef(null);
    const mainDivRef = useRef(null);
    const [socialBottom, setSocialBottom] = useState(20)

    useEffect(() => {
        const handleScroll = () => {
            if (!mainDivRef.current) return;
            const mainRect = mainDivRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (mainRect.bottom < windowHeight - 20) {
                setSocialBottom(windowHeight - mainRect.bottom + 20);
            } else {
                setSocialBottom(20)
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
    }, []);

    return (
        <>
            <Helmet>
                <title>Vidrio al Arte SAS | Soluciones en aluminio</title>
                <meta name="description" content="En Vidrio al Arte SAS, ofrecemos soluciones personalizadas en aluminio para tus proyectos. Nos especializamos en puertas, ventanas y sistemas con perfilería en aluminio. Nuestro equipo está listo para ayudarte a crear espacios únicos y funcionales."/>
                <meta name="keywords" content="aluminio, puertas de aluminio, ventanas de aluminio, sistemas de aluminio, perfilería en aluminio, soluciones personalizadas, Vidrio al Arte SAS, carpintería de aluminio, proyectos en aluminio"/>
            </Helmet>
            <div ref={mainDivRef} >
                <AluminioHeroSection />
                <AluminioAboutSection />
                <AluminioGalerySection />
                <AluminioFaqSection />
            </div>
            {/* Redes sociales */}
            <div ref={containerRef}>
                <nav
                    className="fixed right-3 md:right-5 flex flex-col space-y-2 md:space-y-3 z-50"
                    style={{ bottom: socialBottom }}
                    aria-label="Redes sociales"
                >
                    {[{
                        href: "https://www.facebook.com/p/Vidrios-Al-Arte-SAS-100069565487546/?locale=es_LA",
                        icon: <FaFacebookF className="rounded-full text-lg md:text-xl lg:text-2xl text-white" aria-label="Facebook" />,
                        bg: "bg-black",
                        hover: "hover:bg-blue-500",
                    }, {
                        href: "https://api.whatsapp.com/send/?phone=573223065279&text&type=phone_number&app_absent=0",
                        icon: <FaWhatsapp className="rounded-full text-lg md:text-xl lg:text-2xl text-white" aria-label="Whatsapp" />,
                        bg: "bg-black",
                        hover: "hover:bg-green-500",
                    }, {
                        href: "https://www.instagram.com/vidrioalartesas?igsh=MXd5ODdlOGpnMmt6ag==",
                        icon: <FaInstagram className="rounded-full text-lg md:text-xl lg:text-2xl text-white" aria-label="Instagram" />,
                        bg: "bg-black",
                        hover: "hover:bg-gradient-to-r hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF]"
                    }].map((social, i) => (
                        <a
                            key={i}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${social.bg} social text-white p-1.5 md:p-2 lg:p-3 rounded-full shadow-lg ${social.hover}`}
                            aria-label={`Ir a ${["Facebook", "Whatsapp", "Instagram"][i]}`}
                        >
                            {social.icon}
                        </a>
                    ))}
                </nav>
            </div>
        </>
    );
};

export default AluminioInfoPage;