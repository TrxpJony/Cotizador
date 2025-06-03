import { FaArrowRight } from "react-icons/fa";
import puerta from "../../../../img/img_servicios/puer.png";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import { animateAluminioHero } from "../../../../utils/serviciosAnimations/gsapAnimationAluminio";
import { Container } from "../../../common/tags";


const AluminioHeroSection = () => {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            animateAluminioHero(containerRef.current); // <-- pasa la referencia aqui
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef}>
            <section className="relative py-16 lg:py-64 w-full min-h-screen flex items-center justify-center bg-gray-900 text-white overflow-hidden">
                <img
                    src="https://png.pngtree.com/thumb_back/fw800/background/20250512/pngtree-a-charming-contemporary-single-story-home-featuring-modern-design-with-clean-image_17280669.jpg"
                    alt="Fondo de aluminio"
                    className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 z-0"/>
                <Container>
                    <div className="container mx-auto px-6 lg:px-0 flex flex-col-reverse lg:flex-row items-center justify-between relative z-10">
                        {/* Texto */}
                        <div className="w-full lg:w-2/3 text-center lg:text-left space-y-6 ">
                            <span className="aluminio-hero-up inline-block bg-cyan-500 text-white font-semibold px-4 py-1 rounded-full mb-2 shadow-sm">
                                Soluciones en Aluminio
                            </span>
                            <h1 className="aluminio-hero-text text-4xl md:text-5xl font-extrabold text-white mb-2 leading-tight drop-shadow-sm">
                                Perfilería en Aluminio <br className="hidden md:inline" />
                                Para Puertas y Ventanas
                            </h1>
                            <p className="aluminio-hero-text text-lg text-white mb-4">
                                En{" "}
                                <span className="font-semibold text-cyan-500">
                                    Vidrio al Arte SAS
                                </span>
                                , ofrecemos soluciones personalizadas en aluminio para tus
                                proyectos. Desde puertas y ventanas hasta estructuras
                                arquitectónicas, nuestro equipo está listo para ayudarte a
                                crear espacios únicos y funcionales.
                            </p>
                            {/* Botones de acción */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-6">
                                <a href="/servicios/aluminio">
                                    <button className="aluminio-hero-button inline-flex items-center gap-2 border-white border bg-transparent text-white hover:text-white px-6 py-2 rounded-2xl font-semibold hover:shadow-xl hover:bg-cyan-500 hover:border-transparent transition-shadow">
                                        Ver catálogo <FaArrowRight />
                                    </button>
                                </a>
                                <a href="/contact">
                                    <button className="aluminio-hero-button inline-flex items-center gap-2 border-transparent border bg-cyan-500 text-white hover:bg-transparent hover:border-white hover:text-white px-6 py-2 rounded-2xl font-semibold hover:shadow-xl transition-shadow">
                                        Solicita una Cotización
                                    </button>
                                </a>
                            </div>

                        </div>
                        {/* Imagen principal */}
                        <div className=" flex justify-center mb-10 lg:mb-0 -slow">
                            <img
                                src={puerta}
                                alt="Puerta de aluminio moderna"
                                className="aluminio-heroi-img rounded-3xl shadow-md sm:shadow-2xl w-96 h-96 object-cover border-4 border-white"
                            />
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
};

export default AluminioHeroSection;