import { Accordion, AccordionItem } from "@heroui/react";

const AluminioFaqSection = () => {
    const Faqtext1 = "¿Tienes preguntas sobre nuestros servicios de aluminio? Aquí encontrarás respuestas a las preguntas más frecuentes que recibimos de nuestros clientes. Si no encuentras la información que buscas, no dudes en contactarnos directamente.";
    const Faqtext2 = "Ofrecemos una amplia gama de servicios en aluminio, incluyendo fabricación e instalación de ventanas, puertas, barandas, estructuras metálicas y más. Nuestro equipo está capacitado para adaptarse a las necesidades específicas de cada proyecto.";
    const Faqtext3 = "El tiempo de entrega varía según el tipo de proyecto y la complejidad del mismo. Generalmente, nuestros plazos de entrega oscilan entre 2 a 4 semanas. Para proyectos más grandes o personalizados, te recomendamos consultar directamente con nuestro equipo.";

    return (
        <>
            <div className="w-full py-16 lg:pt-32  bg-white px-6">
                    <h2
                        className="text-3xl font-bold text-center text-black mb-2"
                    >
                        Preguntas Frecuentes
                    </h2>
                    <p className="text-center text-default-600 mb-6 text-lg">
                        Aquí encontrarás respuestas a las preguntas más comunes sobre nuestros servicios de aluminio. Si tienes otra pregunta, contáctanos.
                    </p>
                <div>
                    <Accordion>
                        <AccordionItem key="1" aria-label="Acordion 1" title="¿Qué servicios ofrecen en aluminio?">
                            {Faqtext1}
                        </AccordionItem>
                        <AccordionItem key="2" aria-label="Acordion 2" title="¿Qué tipo de proyectos pueden realizar?">
                            {Faqtext2}
                        </AccordionItem>
                        <AccordionItem key="3" aria-label="Acordion 3" title="¿Cuál es el tiempo de entrega para un proyecto?">
                            {Faqtext3}
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </>
    );
};
export default AluminioFaqSection;