import gsap from "gsap";
import EspejosCarruselPage from "./epejoscarruselPage";
import PropTypes from "prop-types";
import { useLayoutEffect, useRef } from "react";
import { AnimateEspejosHero } from "../../../../utils/serviciosAnimations/gsapAnimationEpejos";

const EspejosHeaderInfo = () => {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            AnimateEspejosHero(containerRef.current); // <-- Pase la referencia aqui
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef}>
            <section
                className="text-center mt-20 sm:mt-40"
                aria-label="Encabezado principal de espejos personalizados"
            >
                {/* Cotización */}
                <div
                    className="flex justify-center hero-acervid"
                >
                    <div className="relative rounded-full px-3 py-1 text-sm/6 text-white ring-1 ring-white hover:ring-cyan-500 transition-all duration-300">
                        <div className="hero-acervidtx ">
                            Solicita tu cotización personalizada de&nbsp;
                            <a
                                href="https://api.whatsapp.com/send?phone=573223065256"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-cyan-500 hover:underline"
                            >
                                <span aria-hidden="true" className="absolute inset-0" />
                                Espejos <span aria-hidden="true">&rarr;</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Título */}
                <div
                    className="tracking-tight"
                >
                    <h1 className="hero-tile mt-2 text-timberWolf font-black md:text-[60px] sm:text-[48px] xs:text-[40px] text-[30px] font-poppins text-white px-6">
                        Espejos Personalizados
                    </h1>
                    <h2 className="sr-only">Diseños únicos, tecnología LED y sensores inteligentes</h2>
                </div>

                {/* Descripción */}
                <p
                    className="hero-desc  px-4 text-center text-base sm:text-lg leading-8 text-default-400 mx-auto"
                >
                    Descubre diseños de espejos elegantes y totalmente personalizados, creados para aportar luminosidad, amplitud y estilo a tus espacios. Refleja tu esencia y transforma cada ambiente en un lugar único y sofisticado con nuestras soluciones a medida. Espejos con iluminación LED, sensores inteligentes y acabados de alta calidad.
                </p>

                {/* Carrusel */}
                <div
                >
                    <EspejosCarruselPage />
                </div>

                {/* Botón de explorar */}
                <div
                    className="hero-link mb-10 flex items-center justify-center gap-x-6"
                >
                    <a
                        href="https://drive.google.com/file/d/1ckkOc3OAFvWl-GOVH3BXEamDIDiP1xFA/view"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm/6 font-semibold text-cyan-500 hover:text-white hover:underline transition duration-300"
                    >
                        Explora más diseños <span aria-hidden="true">→</span>
                    </a>
                </div>
            </section>
        </div>
    );
};
EspejosHeaderInfo.propTypes = {
    onAnimationComplete: PropTypes.func,
};

export default EspejosHeaderInfo;
