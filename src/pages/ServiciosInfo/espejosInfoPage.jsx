import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import EspejosDescription from "../../components/serviciosPage/serviciosInfoPages/espejosInfoPage/espejosDescription";
import EspejosGalery from "../../components/serviciosPage/serviciosInfoPages/espejosInfoPage/espejosgalery";
import EspejosHeaderInfo from "../../components/serviciosPage/serviciosInfoPages/espejosInfoPage/espejosHeaderInfo";
import EspejosFaqs from "../../components/serviciosPage/serviciosInfoPages/espejosInfoPage/FAQ";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

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
            <motion.div
                className="bg-gradient-to-b from-gray-800 to-black shadow-lg"
                ref={mainDivRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <motion.div
                    className="sm:h-auto flex flex-col mt-20 sm:mt-32 sm:justify-center sm:mb-20"
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-200px 0px" }}
                >
                    <EspejosHeaderInfo />
                </motion.div>

                <motion.div
                    className="flex justify-center items-center flex-col mb-10 sm:mb-20"
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-200px 0px" }}
                >
                    <EspejosDescription />
                </motion.div>

                <motion.div
                    className="flex justify-center items-center flex-col sm:mb-20"
                    layout
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-150px 0px" }}
                >
                    <EspejosGalery />
                </motion.div>

                <motion.div
                    className="flex justify-center items-center flex-col mt-5 mb-20"
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-200px 0px" }}
                >
                    <EspejosFaqs />
                </motion.div>
            </motion.div>

            {/* Floating social media bar con efectos personalizados */}
            <div
                className="fixed right-5 flex flex-col space-y-3 z-50"
                style={{ bottom: socialBottom }}
            >
                {[{
                    href: "https://www.facebook.com/people/Acervid/61556144607224/?locale=es_LA",
                    icon: <FaFacebookF className="text-white rounded-full text-2xl" />,
                    bg: "bg-blue-600",
                    hover: "hover:bg-blue-700"
                }, {
                    href: "https://api.whatsapp.com/send?phone=573223065256",
                    icon: <FaWhatsapp className="text-white rounded-full text-2xl" />,
                    bg: "bg-green-500",
                    hover: "hover:bg-green-600"
                }, {
                    href: "https://www.instagram.com/acervid/",
                    icon: <FaInstagram className="text-white rounded-full text-2xl" />,
                    bg: "bg-pink-400",
                    hover: "hover:bg-pink-600"
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
                    >
                        {social.icon}
                    </motion.a>
                ))}
            </div>
        </>
    );
};

export default EspejosInfoPage;
