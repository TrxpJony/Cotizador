import { Card, CardBody } from "@heroui/react";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { AnimateEspejosDescription } from "../../../../utils/serviciosAnimations/gsapAnimationEpejos";

export default function EspejosDescription(props) {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            AnimateEspejosDescription(containerRef.current); // <-- Pase la Referencia aqui
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef}>
            <section
                aria-label="Descripción de espejos personalizados"
            >
                {/* Primer Card */}
                <div>
                    <Card shadow="none" className="px-1 w-full bg-transparent sm:mb-10" {...props}>
                        <CardBody className="flex flex-row flex-wrap p-0 sm:flex-nowrap">
                            <img

                                alt="Espejo personalizado con iluminación LED de ACERVID"
                                className="desc-cards-img rounded-2xl h-auto w-full flex-none object-cover object-top md:w-64 lg:w-96"
                                src="https://res.cloudinary.com/dtxmsbsjd/image/upload/v1745854239/carrusel/zpf983bzgtsneydi3q08.jpg"
                            />
                            <div className="px-6 py-8">
                                <h2
                                    className="desc-title text-center sm:text-left text-2xl text-white font-medium"
                                >
                                    ¡Diseños Personalizados de Espejos!
                                </h2>
                                <div className="desc-desc text-center sm:text-left flex flex-col gap-4 pt-3 text-base text-default-400">
                                    <p>
                                        Personaliza tus espejos al gusto: elige tamaño, forma, iluminación y más para que se adapten perfectamente a tu estilo y espacio.
                                    </p>
                                    <p>
                                        ¡Dale un toque único a tu hogar con los espejos iluminados!
                                    </p>
                                </div>
                                <div className="mb-5 sm:mb-0 mt-6 text-center sm:text-left">
                                    <a href="https://api.whatsapp.com/send?phone=573223065256" target='_blank' rel='noopener noreferrer'>
                                        <button
                                            className="desc-button text-white px-3 py-1 rounded-2xl border border-white hover:bg-white hover:outline-none hover:text-black transition-all"
                                        >¡COTIZA EL TUYO!</button>
                                    </a>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                {/* Segundo Card */}
                <div>
                    <Card shadow="none" className="w-full  px-6 bg-transparent mb-10 sm:mt-10" {...props}>
                        <CardBody className="flex flex-row flex-wrap p-0 sm:flex-nowrap overflow-x-hidden">
                            <img
                                alt="Variedad de diseños de espejos modernos, clásicos y minimalistas"
                                className="desc-desg-img rounded-2xl h-auto w-full flex-none object-cover object-top md:w-64 lg:w-96 order-none sm:order-1"
                                src="https://res.cloudinary.com/dtxmsbsjd/image/upload/v1745857478/carrusel/lu5lzt58gxitmgfeihwu.jpg"
                            />
                            <div className="px-6 py-8 order-1 sm:order-none">
                                <h2
                                    className="desc-desg-title text-2xl text-white font-medium text-center sm:text-right"
                                >
                                    ¡Gran Variedad De Diseños de Espejos!
                                </h2>
                                <div className="desc-desg-desc flex flex-col gap-4 pt-3 text-base text-default-400 text-center sm:text-right">
                                    <p>
                                        Descubre nuestra amplia colección de espejos diseñados para todos los gustos. Contamos con estilos modernos, clásicos y minimalistas, listos para embellecer cualquier espacio.
                                    </p>
                                    <p>
                                        ¡Encuentra el espejo perfecto para tu hogar o negocio!
                                    </p>
                                </div>
                                <div className="mt-6 text-center sm:text-right">
                                    <a href="https://www.canva.com/design/DAGWfFjnEC8/YtzVi3d6LVzHV5XLNmUYvg/edit" target="_blank" rel="noopener noreferrer">
                                        <button
                                            className="desc-desg-button text-white px-3 py-1 rounded-2xl border border-white hover:bg-white hover:outline-none hover:text-black transition-all"
                                        >¡EXPLORAR CATALOGO!</button>
                                    </a>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </section>
        </div>
    );
}