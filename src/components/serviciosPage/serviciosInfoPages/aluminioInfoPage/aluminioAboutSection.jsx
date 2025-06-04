import { FaRecycle, FaBolt, FaPalette } from "react-icons/fa";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import { animateAluminioAbout } from "../../../../utils/serviciosAnimations/gsapAnimationAluminio";
import { Container } from "../../../common/tags";

const AluminioAboutSection = () => {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            animateAluminioAbout(containerRef.current);
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef}>
            <section className="relative py-24 lg:py-36  overflow-hidden">
                {/* Imagen decorativa sutil */}
                <div className="absolute inset-0 bg-[url('/path-to-subtle-bg.jpg')] bg-cover bg-center opacity-5 pointer-events-none" />

                <Container>
                    <div className="relative z-10 mx-auto lg:px-0 px-6">
                        <div className="text-center mb-16">
                            <div className="aluminio-about-text inline-block bg-cyan-500 text-white font-semibold px-4 py-1 rounded-full mb-2 shadow-sm">
                                Calidad Garantizada
                            </div>
                            <h2 className="aluminio-about-text text-3xl md:text-4xl font-extrabold text-gray-800 mt-2 mb-4">
                                Aluminio: El Material del Futuro para Diseño Moderno
                            </h2>
                            <p className="aluminio-about-text text-gray-600 max-w-2xl text-lg mx-auto">
                                El aluminio es ideal para proyectos arquitectónicos y de diseño moderno por su resistencia, ligereza y capacidad de personalización. Es una solución eficiente y sustentable para puertas, ventanas y estructuras livianas. </p>
                        </div>

                        {/* Cards de ventajas */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="aluminio-card-container bg-white rounded-2xl shadow-md p-8 flex flex-col items-center hover:shadow-xl transition-shadow">
                                <FaRecycle className="aluminio-card-logo text-cyan-500 text-4xl mb-4" />
                                <h3 className="font-bold text-lg mb-2 text-gray-800 aluminio-card-text">100% Reciclable</h3>
                                <p className="text-gray-600 text-center text-sm aluminio-card-text">
                                    El aluminio es un material 100% reciclable y ecológico, ideal para construcciones sostenibles sin comprometer la calidad.
                                </p>
                            </div>
                            <div className="aluminio-card-container bg-white rounded-2xl shadow-md p-8 flex flex-col items-center hover:shadow-xl transition-shadow">
                                <FaBolt className="aluminio-card-logo text-cyan-500 text-4xl mb-4" />
                                <h3 className="font-bold text-lg mb-2 text-gray-800 aluminio-card-text">Ligero y Resistente</h3>
                                <p className="text-gray-600 text-center text-sm aluminio-card-text">
                                    Gracias a su ligereza y alta resistencia, el aluminio es perfecto para estructuras modernas en viviendas, oficinas y fachadas.
                                </p>
                            </div>
                            <div className="aluminio-card-container bg-white rounded-2xl shadow-md p-8 flex flex-col items-center hover:shadow-xl transition-shadow">
                                <FaPalette className="aluminio-card-logo text-cyan-500 text-4xl mb-4" />
                                <h3 className="font-bold text-lg mb-2 text-gray-800 aluminio-card-text">Acabados Personalizables</h3>
                                <p className="text-gray-600 text-center text-sm aluminio-card-text">
                                    El aluminio permite una amplia gama de acabados y colores para adaptarse a cualquier estilo.
                                </p>
                            </div>
                        </div>


                        {/* CTA inferior */}
                        <div className="aluminio-card-container text-center mt-8 bg-white rounded-2xl shadow-md p-8 flex flex-col items-center hover:shadow-xl transition-shadow">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4 aluminio-card-text">¿Listo para construir con aluminio?</h3>
                            <p className="text-gray-600 mb-6 max-w-xl mx-auto aluminio-card-text">
                                Da el siguiente paso hacia un diseño moderno, eficiente y duradero. Nuestro equipo está listo para asesorarte.
                            </p>
                            <a href="" aria-label="Llamado a la acción" className="aluminio-card-button inline-flex items-center gap-2 border-cyan-500 border bg-transparent text-cyan-500 hover:text-white px-6 py-2 rounded-2xl font-semibold hover:shadow-xl hover:bg-cyan-500 hover:border-transparent transition-shadow">
                                Contactar Asesor
                            </a>

                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
};

export default AluminioAboutSection;
