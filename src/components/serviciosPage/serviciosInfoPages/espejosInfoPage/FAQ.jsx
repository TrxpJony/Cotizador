import { Accordion, AccordionItem } from "@heroui/react";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const EspejosFaqs = () => {
    const FAQ1 =
        "No, todos nuestros sensores y luces están diseñados para funcionar a 12V. Sin embargo, nuestros sistemas cuentan con entrada a 12V y salida a 110V, lo que permite un funcionamiento seguro y eficiente. Esto se debe a que, a 110V, los componentes tienden a sufrir un desgaste más rápido, lo que podría reducir su durabilidad y rendimiento. Para garantizar una mayor eficiencia y vida útil, recomendamos el uso de sistemas a 12V.";
    const FAQ2 =
        "¡Sí! Si en nuestro catálogo no encuentras algo que te llame la atención, puedes traernos tu propio diseño. Estamos encantados de trabajar contigo para crear una solución personalizada que se ajuste a tus necesidades y gustos. ";
    const FAQ3 =
        "No, no manejamos servicios de instalación. Sin embargo, nuestros espejos están diseñados para ser fáciles de instalar. Te proporcionaremos instrucciones claras y sencillas para que puedas hacerlo tú mismo. Si tienes alguna duda, no dudes en contactarnos.";
    const FAQ4 =
        "No, no contamos con servicio de envíos para nuestros espejos. La única opción disponible es recogerlo directamente en nuestras instalaciones. ";
    const FAQ5 =
        "Sí, todos nuestros productos cuentan con una garantía limitada que cubre defectos de fabricación, la duración y los términos de la garantía pueden variar según el producto.";
    const FAQ6 =
        "Puedes enviarnos tu idea o diseño para que nuestro equipo lo revise. Te asesoraremos sobre su viabilidad y te informaremos sobre los materiales y procesos más adecuados para llevarlo a cabo."
    const FAQ7 =
        "Puedes contactarnos a través de nuestro correo electrónico, teléfono o visitándonos en nuestras instalaciones. Estaremos encantados de ayudarte con cualquier consulta que tengas.";

    const h2Ref = useRef(null);
    const pRef = useRef(null);
    const sectionRef = useRef(null);
    const accordionRef = useRef(null);

    useEffect(() => {
        let observer;
        if (sectionRef.current) {
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
                                    stagger: 0.4, // mismo tiempo entre apariciones
                                }
                            );
                            observer.disconnect();
                        }
                    });
                },
                { threshold: 0.2 }
            );
            observer.observe(sectionRef.current);
        }
        // Set initial state
        if (h2Ref.current && pRef.current && accordionRef.current) {
            gsap.set([h2Ref.current, pRef.current, accordionRef.current], { opacity: 0, y: 40 });
        }
        return () => observer && observer.disconnect();
    }, []);

    return (
        <section
            className="max-w-5xl px-4 w-full"
            aria-label="Preguntas frecuentes sobre espejos personalizados"
            ref={sectionRef}
        >
            <h2
                className="text-3xl font-bold text-center text-white mb-2"
                ref={h2Ref}
            >
                Preguntas Frecuentes
            </h2>
            <p
                className="text-center text-default-400 mb-6"
                ref={pRef}
            >
                Resuelve tus dudas sobre espejos a medida, sensores, instalación, garantía y más. Si tienes otra pregunta, contáctanos.
            </p>
            <div ref={accordionRef}>
                <Accordion>
                    <AccordionItem
                        key="1"
                        aria-label="¿Manejan sensores a 110v?"
                        title="¿Manejan sensores a 110v en los espejos personalizados?"
                        classNames={{
                            title: "text-white",
                            indicator: "text-white",
                            content: "text-white",
                        }}
                    >
                        {FAQ1}
                    </AccordionItem>
                    <AccordionItem
                        key="2"
                        aria-label="¿Puedo llevar mi propio diseño?"
                        title="¿Puedo llevar mi propio diseño de espejo?"
                        classNames={{
                            title: "text-white",
                            indicator: "text-white",
                            content: "text-white",
                        }}
                    >
                        {FAQ2}
                    </AccordionItem>
                    <AccordionItem
                        key="3"
                        aria-label="¿Los espejos vienen con instalación?"
                        title="¿Los espejos vienen con instalación incluida?"
                        classNames={{
                            title: "text-white",
                            indicator: "text-white",
                            content: "text-white",
                        }}
                    >
                        {FAQ3}
                    </AccordionItem>
                    <AccordionItem
                        key="4"
                        aria-label="¿Hacen envíos?"
                        title="¿Hacen envíos de espejos personalizados?"
                        classNames={{
                            title: "text-white",
                            indicator: "text-white",
                            content: "text-white",
                        }}
                    >
                        {FAQ4}
                    </AccordionItem>
                    <AccordionItem
                        key="5"
                        aria-label="¿Tienen garantía los productos?"
                        title="¿Tienen garantía los espejos personalizados?"
                        classNames={{
                            title: "text-white",
                            indicator: "text-white",
                            content: "text-white",
                        }}
                    >
                        {FAQ5}
                    </AccordionItem>
                    <AccordionItem
                        key="6"
                        aria-label="¿Cómo saber si el diseño es viable?"
                        title="¿Cómo puedo saber si el diseño de espejo que quiero es viable?"
                        classNames={{
                            title: "text-white",
                            indicator: "text-white",
                            content: "text-white",
                        }}
                    >
                        {FAQ6}
                    </AccordionItem>
                    <AccordionItem
                        key="7"
                        aria-label="¿Cómo contactar para más detalles?"
                        title="¿Cómo puedo contactar con ustedes para más detalles o dudas?"
                        classNames={{
                            title: "text-white",
                            indicator: "text-white",
                            content: "text-white",
                        }}
                    >
                        {FAQ7}
                    </AccordionItem>
                </Accordion>
            </div>
        </section>
    );
};

export default EspejosFaqs;