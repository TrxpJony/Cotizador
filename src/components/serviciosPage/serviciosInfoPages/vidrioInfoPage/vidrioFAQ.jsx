import { Accordion, AccordionItem } from "@heroui/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const VidrioFAQ = () => {
    const faqRef = useRef(null);
    const h2Ref = useRef(null);
    const pRef = useRef(null);
    const accordionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (faqRef.current) {
                gsap.from(faqRef.current, {
                    opacity: 0,
                    y: 60,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: faqRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                });
            }
        }, faqRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        let observer;
        if (faqRef.current) {
            observer = new window.IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            gsap.to(
                                [h2Ref.current, pRef.current, accordionRef.current],
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.8,
                                    ease: "power3.out",
                                    stagger: 0.4,
                                }
                            );
                            observer.disconnect();
                        }
                    });
                },
                { threshold: 0.2 }
            );
            observer.observe(faqRef.current);
        }
        if (h2Ref.current && pRef.current && accordionRef.current) {
            gsap.set([h2Ref.current, pRef.current, accordionRef.current], { opacity: 0, y: 40 });
        }
        return () => observer && observer.disconnect();
    }, []);

    const Faqtext1 = "Manejamos una amplia variedad de espesores, desde 3 mm hasta 15 mm, según el tipo de vidrio y su uso. Esto nos permite adaptarnos tanto a aproyectos decorativos como estructurales o de seguridad."
    const Faqtext2 = "El vidrio templado es resistente a impactos y temperaturas, se fragmenta en pequeños trozos. El laminado está compuesto por capas que evitan que se desintegre completamente, ideal para mayor seguridad."
    const Faqtext3 = "Contamos con un amplio catálogo de diseños para vidrio, ideales para todo tipo de espacops. Además, si tienes un diseño personalizado en mente, también lo podemos trabajar según tus especificaciones. ¡Nos adaptamos a tu estilo!"
    const Faqtext4 = "Puedes traer tu plantilla en el material que prefieras: cartulina, papel periódico, madera o cualquier otro que permita marcar de la forma deseada. Nosotros nos encargamos de cortar el vidrio con precisión según esa plantilla, asegurando un ajuste perfecto para tu proyecto.";
    const Faqtext5 = "El tiempo de entrega depende del tipo de vidrio, la cantidad solicitada y el tipo de maquinado, pero normalmente manejamos tiempos rápidos y seguros.";

    return (
        <>
            <section className="relative mt-6 md:mt-8">
                <div className="mx-auto max-w-7xl w-full px-5 sm:px-8 md:px-14 lg:px-5" ref={faqRef}>
                    <div className="" >
                        <h2 className="text-3xl font-bold text-center text-black mb-2" ref={h2Ref}>
                            Preguntas Frecuentes
                        </h2>
                        <p
                            className="text-center text-default-600 mb-6"
                            ref={pRef}
                        >
                            Resuelve tus dudas sobre nuestros vidrios, callibres, diseños, plantillas y mas. Si tienes otra pregunta, contáctanos.
                        </p>
                        <div ref={accordionRef}>
                            <Accordion>
                                <AccordionItem key="1" aria-label="pregunta frecuente: ¿Que calibres de vidiro manejan?" title="¿Que calibres de vidrio manejan?">
                                    {Faqtext1}
                                </AccordionItem>
                                <AccordionItem key="2" aria-label="Pregunta frecuente: ¿Que diferencia hay entre el vidrio templado y el laminado?" title="¿Que diferencia hay entre el vidrio templado y el laminado?">
                                    {Faqtext2}
                                </AccordionItem>
                                <AccordionItem key="3" aria-label="pregunta frecuente: ¿Que diseños de sandblasting se pueden realizar?" title="¿Que diseños de sandblasting se pueden realizar?">
                                    {Faqtext3}
                                </AccordionItem>
                                <AccordionItem key="4" aria-label="Pregunta frecuente: ¿Como puedo llevar una plantilla?" title="¿Como puedo llevar una plantilla?">
                                    {Faqtext4}
                                </AccordionItem>
                                <AccordionItem key="5" aria-label="Pregunta frecuente: ¿Cuánto tarda la entrega?" title="¿Cuánto tarda la entrega?">
                                    {Faqtext5}
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default VidrioFAQ;