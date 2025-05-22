import DivisionesDescription from "../../components/serviciosPage/serviciosInfoPages/divisionesInfoPage/divisionesDescription";
import DivisionesFaq from "../../components/serviciosPage/serviciosInfoPages/divisionesInfoPage/divisionesFaq";
import DivisionesGalery from "../../components/serviciosPage/serviciosInfoPages/divisionesInfoPage/divisionesGalery";
import DivisionesHero from "../../components/serviciosPage/serviciosInfoPages/divisionesInfoPage/divisionesHeroSection";
import { Helmet } from "react-helmet-async";
import { FaFacebookF } from "react-icons/fa";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { animateDivisionesSocial } from "../../utils/serviciosAnimations/gsapAnimationsDivisiones";

const DivisionesInfoPage = () => {
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
                setSocialBottom(20)
            }
        };
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);
        handleScroll();
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll)
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
                <title>Vidrio al Arte SAS | Divisiones de baño</title>
                <meta name="description" content="" />
                <meta name="keywords" content="" />
            </Helmet>
            <main ref={mainDivRef}>
                <div className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-96">
                    <section>
                        <DivisionesHero />
                    </section>
                    <section>
                        <DivisionesDescription />
                    </section>
                    <section>
                        <div className="flex flex-col md:flex-row">
                            <DivisionesGalery />
                        </div>
                    </section>
                    <section>
                        <DivisionesFaq />
                    </section>
                </div>
            </main>
            {/* redes sociales flotantes con efectos personalizados */}
            <div ref={containerRef}>
                <nav
                    className="fixed right-3 md:right-5 flex flex-col space-y-2 md:space-y-3 z-50"
                    style={{ bottom: socialBottom }}
                    aria-label="Redes sociales"
                >
                    {[{
                        href: "https://www.facebook.com/vidrio.a.arte",
                        icon: <FaFacebookF className="rounded-full text-lg md:text-xl lg:text-2xl text-white" aria-label="Facebook" />,
                        bg: "bg-black",
                        hover: "hover:bg-blue-500",
                    }, {
                        href: "",
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

export default DivisionesInfoPage;