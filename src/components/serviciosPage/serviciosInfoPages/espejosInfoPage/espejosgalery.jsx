import { Card, CardHeader, CardFooter, Image } from "@heroui/react";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const EspejosGalery = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const cardsRef = useRef([]);
    // Nuevos refs para los textos principales
    const acervidPRef = useRef(null);
    const h2Ref = useRef(null);
    const descPRef = useRef(null);

    useEffect(() => {
        let textObserver, cardsObserver;

        // Animación secuencial para los textos principales
        if (acervidPRef.current && h2Ref.current && descPRef.current) {
            gsap.set([acervidPRef.current, h2Ref.current, descPRef.current], { opacity: 0, y: 40 });
            textObserver = new window.IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            gsap.to(acervidPRef.current, {
                                opacity: 1,
                                y: 0,
                                duration: 0.7,
                                ease: "power3.out"
                            });
                            gsap.to(h2Ref.current, {
                                opacity: 1,
                                y: 0,
                                duration: 0.7,
                                delay: 0.3,
                                ease: "power3.out"
                            });
                            gsap.to(descPRef.current, {
                                opacity: 1,
                                y: 0,
                                duration: 0.7,
                                delay: 0.6,
                                ease: "power3.out"
                            });
                            textObserver.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.2 }
            );
            textObserver.observe(textRef.current);
        }

        // Cards
        cardsRef.current.forEach(card => {
            if (card) gsap.set(card, { opacity: 0, y: 60, scale: 0.97 });
        });

        cardsObserver = new window.IntersectionObserver(
            (entries) => {
                const visible = entries.filter(e => e.isIntersecting);
                if (visible.length > 0) {
                    gsap.to(cardsRef.current, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 1.3,
                        ease: "power2.out",
                        stagger: 0.25
                    });
                    cardsRef.current.forEach(card => cardsObserver.unobserve(card));
                }
            },
            { threshold: 0.2 }
        );
        cardsRef.current.forEach(card => {
            if (card) cardsObserver.observe(card);
        });

        return () => {
            if (textObserver) textObserver.disconnect();
            if (cardsObserver) cardsObserver.disconnect();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            aria-label="Galería de proyectos de espejos"
        >
            <div ref={textRef} className=" ">
                <div className="mb-10">
                    <div>
                        <p
                            className="font-semibold text-cyan-500 text-center sm:text-left "
                            ref={acervidPRef}
                        >Espejos</p>
                        <h2
                            className="text-timberWolf font-black md:text-[60px] sm:text-[48px] xs:text-[40px] text-[30px] font-poppins text-white text-center sm:text-left"
                            ref={h2Ref}
                        >
                            Nuestros Proyectos de Espejos Personalizados
                        </h2>
                    </div>
                    <div className="w-full flex">
                        <p
                            className=" leading-[30px]  flex flex-col gap-4 pt-3 text-base text-default-400 text-center sm:text-left"
                            ref={descPRef}
                        >
                            Llevamos la innovación a cada detalle de nuestros proyectos.
                            Diseñamos espejos únicos con iluminación LED integrada, estructuras flotantes
                            con elegantes perfiles de aluminio y una variedad de sensores inteligentes,
                            como sensores touch, de proximidad y movimiento, para brindar una experiencia moderna
                            y funcional. Cada proyecto refleja nuestro compromiso con la calidad, el diseño
                            y la tecnología.
                        </p>
                    </div>
                </div>
            </div>
            <div className="  gap-2 grid grid-cols-12 grid-rows-2 mt-10 mb-10">
                {/* Card 1 */}
                <div
                    ref={el => cardsRef.current[0] = el}
                    className="col-span-12 sm:col-span-4 h-[300px]"
                >
                    <Card className="h-full bg-gradient-to-br from-cyan-900/40 to-cyan-700/10 backdrop-blur-md shadow-lg transition-all duration-300">
                        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                            <p className="text-tiny text-white/60 uppercase font-bold">Diseños</p>
                            <h3 className="text-white font-medium text-large">Diseñados a tu gusto</h3>
                        </CardHeader>
                        <Image
                            removeWrapper
                            alt="Espejo personalizado con diseño a medida"
                            className="z-0 w-full h-full object-cover"
                            src="https://res.cloudinary.com/dtxmsbsjd/image/upload/v1745872377/carrusel/zwik7ywxa5j8rahuuxzx.jpg"
                        />
                    </Card>
                </div>
                {/* Card 2 */}
                <div
                    ref={el => cardsRef.current[1] = el}
                    className="col-span-12 sm:col-span-4 h-[300px]"
                >
                    <Card className="h-full bg-gradient-to-br from-cyan-900/40 to-cyan-700/10 backdrop-blur-md shadow-lg transition-all duration-300">
                        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                            <p className="text-tiny text-white/60 uppercase font-bold">Sensores</p>
                            <h3 className="text-white font-medium text-large">Sensores tecnológicos</h3>
                        </CardHeader>
                        <Image
                            removeWrapper
                            alt="Espejo con sensores inteligentes y tecnología avanzada"
                            className="z-0 w-full h-full object-cover"
                            src="https://res.cloudinary.com/dtxmsbsjd/image/upload/v1745871950/carrusel/hns1twb2obbxltzeymti.png"
                        />
                    </Card>
                </div>
                {/* Card 3 */}
                <div
                    ref={el => cardsRef.current[2] = el}
                    className="col-span-12 sm:col-span-4 h-[300px]"
                >
                    <Card className="h-full bg-gradient-to-br from-cyan-900/40 to-cyan-700/10 backdrop-blur-md shadow-lg transition-all duration-300">
                        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                            <p className="text-tiny text-white/60 uppercase font-bold">Marcos</p>
                            <h3 className="text-white font-medium text-large">Hermosos espejos con marco</h3>
                        </CardHeader>
                        <Image
                            removeWrapper
                            alt="Espejo con marco elegante y personalizado"
                            className="z-0 w-full h-full object-cover"
                            src="https://res.cloudinary.com/dtxmsbsjd/image/upload/v1745870906/carrusel/onpyfjk7lottvtu4zzca.jpg"
                        />
                    </Card>
                </div>
                {/* Card 4 */}
                <div
                    ref={el => cardsRef.current[3] = el}
                    className="w-full h-[300px] col-span-12 sm:col-span-5"
                >
                    <Card isFooterBlurred className="h-full bg-gradient-to-br from-cyan-900/40 to-cyan-700/10 backdrop-blur-md shadow-lg transition-all duration-300">
                        <CardHeader className="absolute z-10 top-1 flex-col items-start">
                            <p className="text-tiny text-white/60 uppercase font-bold">Luz</p>
                            <h3 className="text-black font-medium text-2xl">Luces LED</h3>
                        </CardHeader>
                        <Image
                            removeWrapper
                            alt="Espejo con luces LED integradas para iluminación moderna"
                            className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                            src="https://res.cloudinary.com/dtxmsbsjd/image/upload/v1745874701/carrusel/yb1fxnzvh6uape8jbvkr.png"
                        />
                        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                            <div>
                                <p className="text-black text-tiny">Lleva la mejor iluminación a tu hogar.</p>
                                <p className="text-black text-tiny">Dale a tu espacio el brillo que merece.</p>
                            </div>
                            <a href="https://www.canva.com/design/DAGP0f_nmzY/ke2SXTvvemap2y4EBAzXSw/view?utm_content=DAGP0f_nmzY&utm_campaign=designshare&utm_medium=link&utm_source=editor#1" target='_blank' rel='noopener noreferrer' className="text-cyan-500 px-3 py-1 rounded-2xl border border-cyan-500 hover:bg-cyan-500 hover:outline-none hover:text-white transition-all">
                                Catálogo de luces
                            </a>
                        </CardFooter>
                    </Card>
                </div>
                {/* Card 5 */}
                <div
                    ref={el => cardsRef.current[4] = el}
                    className="w-full h-[300px] col-span-12 sm:col-span-7"
                >
                    <Card isFooterBlurred className="h-full bg-gradient-to-br from-cyan-900/40 to-cyan-700/10 backdrop-blur-md shadow-lg transition-all duration-300">
                        <CardHeader className="absolute z-10 top-1 flex-col items-start">
                            <p className="text-tiny text-white/60 uppercase font-bold">Espejos</p>
                            <h3 className="text-white/90 font-medium text-xl">Elige el espejo perfecto para tu espacio</h3>
                        </CardHeader>
                        <Image
                            removeWrapper
                            alt="Espejo de alta calidad para decoración de interiores"
                            className="z-0 w-full h-full object-cover"
                            src="https://res.cloudinary.com/dtxmsbsjd/image/upload/v1749143509/espejo_largo_fidam2.jpg"
                        />
                        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                            <div className="flex flex-grow gap-2 items-center">
                                <div className="flex flex-col">
                                    <p className="text-tiny text-white/60">Espejos de alta calidad</p>
                                    <p className="text-tiny text-white/60">No te quedes sin el tuyo.</p>
                                </div>
                            </div>
                            <a href="https://api.whatsapp.com/send/?phone=573223065279&text&type=phone_number&app_absent=0" target='_blank' rel='noopener noreferrer'>
                                <button className="text-white px-3 py-1 rounded-2xl border border-white hover:bg-white hover:outline-none hover:text-black transition-all">
                                    Cotiza el tuyo
                                </button>
                            </a>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default EspejosGalery;