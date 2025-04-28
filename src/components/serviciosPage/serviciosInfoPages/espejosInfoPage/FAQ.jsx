import { Accordion, AccordionItem } from "@heroui/react";




const EspejosFaqs = () => {

    const FAQ1 =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

    return (
        <>
            <section className="max-w-5xl px-4 w-full">
                <h2 className="text-3xl font-bold text-center text-white mb-6">Preguntas Frecuentes</h2>
                    <Accordion>
                        <AccordionItem key="1" aria-label="Accordion 1" title="¿Manejan sensores a 110v?"
                            classNames={{
                                title: "text-white",
                                indicator: "text-white",
                                content: "text-white",
                            }}
                        >
                            {FAQ1}
                        </AccordionItem>
                        <AccordionItem key="2" aria-label="Accordion 2" title="¿Puedo llevar mi propio diseño?"
                            classNames={{
                                title: "text-white",
                                indicator: "text-white",
                                content: "text-white",
                            }}
                        >
                            {FAQ1}
                        </AccordionItem>
                        <AccordionItem key="3" aria-label="Accordion 3" title="¿Los espejos vienen con instalacion?"
                            classNames={{
                                title: "text-white",
                                indicator: "text-white",
                                content: "text-white",
                            }}
                        >
                            {FAQ1}
                        </AccordionItem>
                        <AccordionItem key="4" aria-label="Accordion 4" title="¿Hacen envios?"
                            classNames={{
                                title: "text-white",
                                indicator: "text-white",
                                content: "text-white",
                            }}
                        >
                            {FAQ1}
                        </AccordionItem>
                    </Accordion>
            </section>
        </>
    );
};

export default EspejosFaqs;