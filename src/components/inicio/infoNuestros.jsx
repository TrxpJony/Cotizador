import { useRef, useEffect } from "react";
import gsap from "gsap";
import espejo from '../../img/img_Principal/espejo.png';
import espejo2 from '../../img/img_Principal/espejo2.png';
import espejo3 from '../../img/img_Principal/espejo3.png';
import colosal from '../../img/img_Principal/division1.png';
import puerta from '../../img/img_Principal/division2.png';
import luces from '../../img/img_Principal/luces.png';
import luces2 from '../../img/img_Principal/luces2.png';
import { Divider } from "@heroui/divider";
import '../../css/colosal.css'; // Archivo CSS para estilos

export function NuestrosInfo() {
    // refs para animaciones
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const linksRef = useRef(null);
    // Array de refs para las imágenes
    const imageRefs = useRef([]);

    useEffect(() => {
        gsap.fromTo(
            titleRef.current,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        );
        gsap.fromTo(
            descRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out" }
        );
        gsap.fromTo(
            linksRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, delay: 0.6, ease: "power3.out" }
        );
        // Animación secuencial para imágenes
        gsap.fromTo(
            imageRefs.current,
            { y: 40, opacity: 0, scale: 0.9 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                stagger: 0.18,
                delay: 1,
                ease: "power3.out"
            }
        );
    }, []);

    // Helper para asignar refs a cada imagen
    const setImageRef = (el, idx) => {
        imageRefs.current[idx] = el;
    };

    return (
        <>
            <div
                ref={containerRef}
                className="relative overflow-hidden bg-white"
                /*</>style={{ backgroundImage: `url(${cocina1})` }}*/
            >
                <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
                    <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                        <div className="sm:max-w-lg">
                            <h2
                                ref={titleRef}
                                className="text-4xl font-bold tracking-tight text-gray-700 sm:text-6xl"
                            >
                                Nuestros Servicios
                            </h2>
                            <p
                                ref={descRef}
                                className="mt-4  text-default-400"
                            >
                                En Vidrio al Arte transformamos tus ideas en realidad, tanto en interiores como en exteriores. Ofrecemos soluciones a medida en vidrio y acero, diseñadas para satisfacer tus necesidades con la más alta calidad y estilo. Confía en nosotros para llevar tus proyectos al siguiente nivel.
                            </p>
                        </div>
                        <br />
                        <div className="max-w-md" ref={linksRef}>
                            <div className="space-y-1">
                                <p className=" text-default-400">Tenemos la mejor disposición para proveerte toda la información que necesites</p>
                            </div>
                            <Divider className="my-4" />
                            <div className="flex h-5 items-center space-x-4 text-small">
                                <div>
                                    <br />
                                    <a
                                        href="/Productos"
                                        className=" hover:text-cyan-500  hover:underline"
                                    >
                                        Productos
                                    </a>
                                </div>
                                <Divider orientation="vertical" />
                                <div>
                                    <br />
                                    <a
                                        href="/servicios"
                                        className="hover:text-cyan-500 hover:underline"
                                    >
                                        Servicios
                                    </a>
                                </div>
                                <Divider orientation="vertical" />
                                <div>
                                    <br />
                                    <a
                                        href="/contact"
                                        className="hover:text-cyan-600 hover:underline"
                                    >
                                        Mas Información
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="mt-10">
                                {/* Decorative image grid */}
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                                >
                                    <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                                        <div className="flex items-center space-x-6 lg:space-x-8">
                                            <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                                                    <img
                                                        ref={el => setImageRef(el, 0)}
                                                        alt="imagen puerta colosal"
                                                        src={colosal}
                                                        className="size-full object-cover"
                                                    />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img
                                                        ref={el => setImageRef(el, 1)}
                                                        alt="imagen puerta"
                                                        src={puerta}
                                                        className="size-full object-cover"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img
                                                        ref={el => setImageRef(el, 2)}
                                                        alt="imagen espejo con forma"
                                                        src={espejo3}
                                                        className="size-full object-cover"
                                                    />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img
                                                        ref={el => setImageRef(el, 3)}
                                                        alt="imagen espejo redondo"
                                                        src={espejo}
                                                        className="size-full object-cover"
                                                    />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img
                                                        ref={el => setImageRef(el, 4)}
                                                        alt="imagen espejo elipse"
                                                        src={espejo2}
                                                        className="size-full object-cover"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img
                                                        ref={el => setImageRef(el, 5)}
                                                        alt="imagen luces led cob blanca"
                                                        src={luces}
                                                        className="size-full object-cover"
                                                    />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img
                                                        ref={el => setImageRef(el, 6)}
                                                        alt="imagen luces led neutras"
                                                        src={luces2}
                                                        className="size-full object-cover"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* ...existing code... */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
