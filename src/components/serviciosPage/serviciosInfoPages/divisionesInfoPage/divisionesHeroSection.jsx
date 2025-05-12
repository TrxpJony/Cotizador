import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroImage from "../../../../img/img_nosotros/imagenherodivision.png";

gsap.registerPlugin(ScrollTrigger);

const DivisionesHeroSection = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".hero-title", { y: 50, opacity: 0, duration: 1, delay: 0.2 });
            gsap.from(".hero-subtitle", { y: 50, opacity: 0, duration: 1, delay: 0.4 });
            gsap.from(".hero-button", { y: 50, opacity: 0, duration: 1, delay: 0.6 });

            gsap.to(textRef.current, {
                y: -120,
                opacity: 0,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative h-[85vh] flex items-center justify-center text-white bg-black overflow-hidden rounded-2xl mt-10"
        >
            <img
                src={HeroImage}
                alt="Imagen destacada"
                className="absolute top-0 left-0 w-full h-full object-cover opacity-70 z-0 pointer-events-none"
            />
            <div
                ref={textRef}
                className="relative z-20 text-center px-6 max-w-2xl"
            >
                <h1 className="hero-title text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                    Nuestras Divisiones de Baño
                </h1>
                <p className="hero-subtitle text-lg md:text-xl mb-6 drop-shadow-md">
                    La mejor solución para tus necesidades
                </p>
                <a href="/productos/divisiones-de-baño/estilos">
                    <button className="hero-button border-1 border-white bg-transparent hover:bg-cyan-500 hover:border-none  text-white font-semibold px-6 py-3 rounded-full shadow-lg z-20 transition-colors">
                        Explorar Divisiones
                    </button>
                </a>
            </div>
        </section>
    );
};

export default DivisionesHeroSection;
