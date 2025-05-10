import { Accordion, AccordionItem } from "@heroui/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DivisionesFaq = () => {

    const faqRef = useRef(null);

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

    const Faqtext1 = (
        <div className="space-y-3 text-default-600">
            <p>
                En Vidrio al Arte SAS ofrecemos distintos sistemas para nuestras divisiones de baño en vidrio templado, según la necesidad de cada espacio:
            </p>
            <ul className="list-disc pl-8 ">
                <li><strong>Sistema redondo:</strong> Ideal para puertas abatibles, con herrajes cilíndricos que ofrecen un diseño moderno y elegante.</li>
                <li><strong>Sistema corredizo:</strong> Perfecto para baños con poco espacio, ya que permite abrir la puerta deslizando el vidrio sobre rieles sin necesidad de giro.</li>
                <li><strong>Sistema batiente:</strong> Utiliza bisagras que permiten abrir hacia adentro o hacia afuera, brindando robustez y facilidad de uso.</li>
                <li><strong>Sistema en L:</strong> Pensado para baños en esquina, combina paneles fijos y móviles para una cobertura completa y funcional.</li>
            </ul>
            <p>
                Todos los sistemas incluyen vidrio templado de alta calidad y pueden personalizarse con diseños de cenefa.
            </p>
        </div>
    );
    const Faqtext2 = "Trabajamos divisiones de baño en vidrio templado con calibres de 6 mm y 8 mm. generalmente se recomienda el de 6 mm por ser adecuado para la mayoría de espacios, pero tambien ofrecemos 8 mm si se requiere mayor robustez.  ";
    const Faqtext3 = "El vidrio templado es muy resistente, pero no debe recibir golpes en los bordes o esquinas, ya que es su punto mas vulnerable. Es importante manipularlo con cuidado para evitar que se fracture.";
    const Faqtext4 = "Sí, ofrecemos personalización en medidas, tipo de sistema, tipo de vidrio (transparente, esmerilado, con cenefa, etc.) y herrajes.";
    const Faqtext5 = "Solo necesitas limpiarlas regularmente con agua y un paño suave o limpiavidrios. Evita productos abrasivos para preservar el brillo del vidrio y los herrajes.";
    return (
        <>
            <div className="mb-20" ref={faqRef}>
                <h2 className="text-3xl font-bold text-center text-black mb-2">
                    Preguntas Frecuentes
                </h2>
                <p className="text-center text-default-600 mb-6">
                    Resuelve tus dudas sobre las divisiones de baño, diseños, instalación, garantía y más. Si tienes otra pregunta, contáctanos.
                </p>
                <Accordion>
                    <AccordionItem key="1" aria-label="Acordion 1" title="¿Que sistemas manejan para las divisiones de baño?">
                        {Faqtext1}
                    </AccordionItem>
                    <AccordionItem key="2" aria-label="Acordion 2" title="¿En que calibre de vidrio son las divisiones de baño?">
                        {Faqtext2}
                    </AccordionItem>
                    <AccordionItem key="3" aria-label="Acordion 3" title="¿El vidrio templado es resistente?">
                        {Faqtext3}
                    </AccordionItem>
                    <AccordionItem key="4" aria-label="Acordion 4" title="¿Se pueden personalizar las divisiones?">
                        {Faqtext4}
                    </AccordionItem>
                    <AccordionItem key="5" aria-label="Acordion 5" title="¿Qué mantenimiento requieren?">
                        {Faqtext5}
                    </AccordionItem>
                </Accordion>
            </div>

        </>
    );
};

export default DivisionesFaq;