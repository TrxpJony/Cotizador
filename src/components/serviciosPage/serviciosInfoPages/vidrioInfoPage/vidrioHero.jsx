import { useLayoutEffect, useRef } from "react";
import { animateVidrioHero } from "../../../../utils/gsapAnimationsVidrio";
import { FaRegFileLines } from "react-icons/fa6";
import gsap from "gsap";

const VidrioHero = () => {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            animateVidrioHero(containerRef.current); // <-- Pasa la referencia aquí
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef}>
            <section className="relative pt-24 lg:pt-36">
                <div className="mx-auto max-w-7xl w-full px-5 sm:px-8 md:px-14 lg:px-5 flex flex-col lg:flex-row gap-10 lg:gap-12">
                    {/* Fondos de luz */}
                    <div className="absolute w-full lg:w-1/2 inset-y-0 lg:right-0">
                        <span className="absolute -left-6 md:left-4 top-24 lg:top-28 w-24 h-24 rotate-90 skew-x-12 rounded-3xl bg-gradient-to-r from-cyan-500 to-gray-400 blur-xl opacity-60 lg:opacity-95 lg:block hidden" />
                        <span className="bg-cyan-500 absolute w-24 h-24 right-4 bottom-12 rounded-3xl blur-xl opacity-80" />
                    </div>

                    {/* Texto */}
                    <div className="relative flex flex-col items-center text-center lg:text-left lg:py-8 lg:items-start lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2">
                        <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold">
                            Expertos en Vidrios Personalizados{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-gray-400 ml-2">
                                Vidrio al Arte{" "}
                            </span>
                        </h1>
                        <p className="hero-desc md:text-lg mt-8">
                            Fabricamos vidrios en diferentes colores, acabados y procesos: crudo, gris, bronce, azul, esmerilado, reflectivo y más. Personalizamos tus proyectos con técnicas como sandblasting para diseños únicos, pulido y brillado, biselado y procesos decorativos de alta precisión.
                        </p>

                        <div className="btn-container mt-10 w-full flex max-w-md mx-auto lg:mx-0">
                            <div className="flex sm:flex-row flex-col gap-5 w-full">
                                <div className=" py-1 pl-6 w-full pr-1 flex gap-3 items-center rounded-full border border-gray-200 shadow-md shadow-slate-200/50 bg-white text-gray-700 ease-linear focus-within:bg-white focus-within:border-cyan-500">
                                    <span className="min-w-max pr-2 border-r border-box-border">
                                        <FaRegFileLines size={20} />
                                    </span>
                                    <p className="w-full text-xs sm:text-base px-4 text-center">
                                        Solicita una cotización{" "}
                                    </p>
                                    <a href="contact">
                                        <button className="hero-btn bg-cyan-500 rounded-full py-2 px-3 outline-none cursor-pointer relative overflow-hidden min-w-max text-white border border-transparent">
                                            <span className="relative z-[5]">Contáctanos</span>
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Imagen */}
                    <div className="hero-img flex flex-1 lg:w-1/2 lg:h-auto relative lg:max-w-non lg:mx-0 mx-auto max-w-3xl">
                        <img
                            src="https://res.cloudinary.com/dtxmsbsjd/image/upload/v1747498377/Imagenes_utilizadas/uglr2vqorlheyof4e9gb.png"
                            alt="vidrios personalizados"
                            width={2359}
                            height={2359}
                            className="lg:absolute lg:w-full lg:h-full rounded-3xl object-cover lg:max-h-none max-h-96"
                        />
                    </div>
                </div>
            </section>

            {/* Sección de beneficios */}
            <section className="relative mt-12 md:mt-16 mb-16">
                <div className=" benefit-container mx-auto max-w-7xl w-full px-5 sm:px-8 md:px-10 lg:px-5">
                    <div className="mx-auto lg:mx-0 p-5 sm:p-6 sm:py-8 rounded-3xl border shadow-lg md:divide-x border-gray-200 shadow-slate-200/50 bg-white text-gray-700 grid grid-cols-2 md:grid-cols-4">
                        <div className="benefit text-center px-5">
                            <h2 className="font-bold text-lg sm:text-xl">Calidad Garantizada</h2>
                            <p className="mt-2 text-gray-600">Materiales de alta durabilidad y acabados profesionales.</p>
                        </div>
                        <div className="benefit text-center px-5">
                            <h2 className="font-bold text-lg sm:text-xl">Diseños Únicos</h2>
                            <p className="mt-2 text-gray-600">Personalizamos cada pieza de vidrio según tu estilo.</p>
                        </div>
                        <div className="benefit text-center px-5">
                            <h2 className="font-bold text-lg sm:text-xl">Entrega Oportuna</h2>
                            <p className="mt-2 text-gray-600">Cumplimos los plazos pactados sin excusas.</p>
                        </div>
                        <div className="benefit text-center px-5">
                            <h2 className="font-bold text-lg sm:text-xl">Atención Cercana</h2>
                            <p className="mt-2 text-gray-600">Servicio al cliente directo y confiable.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default VidrioHero;
