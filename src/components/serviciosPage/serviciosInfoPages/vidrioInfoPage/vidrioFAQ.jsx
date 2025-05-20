import { Accordion, AccordionItem } from "@heroui/react";

const VidrioFAQ = () => {

    const Faqtext1 = "Manejamos una amplia variedad de espesores, desde 3 mm hasta 15 mm, según el tipo de vidrio y su uso. Esto nos permite adaptarnos tanto a aproyectos decorativos como estructurales o de seguridad."
    const Faqtext2 = "El vidrio templado es resistente a impactos y temperaturas, se fragmenta en pequeños trozos. El laminado está compuesto por capas que evitan que se desintegre completamente, ideal para mayor seguridad."
    const Faqtext3 = "Contamos con un amplio catálogo de diseños para vidrio, ideales para todo tipo de espacops. Además, si tienes un diseño personalizado en mente, también lo podemos trabajar según tus especificaciones. ¡Nos adaptamos a tu estilo!"
    const Faqtext4 = "Puedes traer tu plantilla en el material que prefieras: cartulina, papel periódico, madera o cualquier otro que permita marcar de la forma deseada. Nosotros nos encargamos de cortar el vidrio con precisión según esa plantilla, asegurando un ajuste perfecto para tu proyecto.";
    const Faqtext5 = "El tiempo de entrega depende del tipo de vidrio, la cantidad solicitada y el tipo de maquinado, pero normalmente manejamos tiempos rápidos y seguros.";
    return (
        <>
            <section className="relative mt-6 md:mt-8">
                <div className="mx-auto max-w-7xl w-full px-5 sm:px-8 md:px-14 lg:px-5">
                    <div className="" >
                        <h2 className="text-3xl font-bold text-center text-black mb-2">
                            Preguntas Frecuentes
                        </h2>
                        <p
                            className="text-center text-default-600 mb-6"
                        >
                            Resuelve tus dudas sobre nuestros vidrios, callibres, diseños, plantillas y mas. Si tienes otra pregunta, contáctanos.
                        </p>
                        <div>
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