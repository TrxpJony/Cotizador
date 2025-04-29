import { Accordion, AccordionItem } from "@heroui/react";




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
        "Puedes contactarnos a travéz de nuestro correo electrónico, teléfono o visitándonos en nuestras instalaciones. Estaremos encantados de ayudarte con cualquier consulta que tengas.";
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
                        {FAQ2}
                    </AccordionItem>
                    <AccordionItem key="3" aria-label="Accordion 3" title="¿Los espejos vienen con instalacion?"
                        classNames={{
                            title: "text-white",
                            indicator: "text-white",
                            content: "text-white",
                        }}
                    >
                        {FAQ3}
                    </AccordionItem>
                    <AccordionItem key="4" aria-label="Accordion 4" title="¿Hacen envios?"
                        classNames={{
                            title: "text-white",
                            indicator: "text-white",
                            content: "text-white",
                        }}
                    >
                        {FAQ4}
                    </AccordionItem>
                    <AccordionItem key="5" aria-label="Accordion 5" title="¿Tienen garantía los productos?"
                        classNames={{
                            title: "text-white",
                            indicator: "text-white",
                            content: "text-white",
                        }}
                    >
                        {FAQ5}
                    </AccordionItem>
                    <AccordionItem key="6" aria-label="Accordion 6" title="¿Cómo puedo saber si el diseño que quiero es viable?"
                        classNames={{
                            title: "text-white",
                            indicator: "text-white",
                            content: "text-white",
                        }}
                    >
                        {FAQ6}
                    </AccordionItem>
                    <AccordionItem key="7" aria-label="Accordion 7" title="¿Cómo puedo contactar con ustedes para más detalles o dudas?"
                        classNames={{
                            title: "text-white",
                            indicator: "text-white",
                            content: "text-white",
                        }}
                    >
                        {FAQ7}
                    </AccordionItem>
                </Accordion>
            </section >
        </>
    );
};

export default EspejosFaqs;