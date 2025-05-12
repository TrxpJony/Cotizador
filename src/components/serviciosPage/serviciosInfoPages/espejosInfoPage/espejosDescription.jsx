import { Card, Image, CardBody } from "@heroui/react";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function EspejosDescription(props) {
    const ref = useRef(null);
    const cardRefs = useRef([]);
    const h2Refs = useRef([]);
    const pRefs = useRef([[], []]);
    const btnRefs = useRef([]);

    useEffect(() => {
        let observer;
        if (cardRefs.current.length) {
            // Set initial state for all elements
            cardRefs.current.forEach(card => {
                if (card) gsap.set(card, { opacity: 0, scale: 0.96 });
            });
            h2Refs.current.forEach(h2 => {
                if (h2) gsap.set(h2, { opacity: 0, y: 40 });
            });
            pRefs.current.forEach(parrArr => {
                parrArr.forEach(p => {
                    if (p) gsap.set(p, { opacity: 0, y: 30 });
                });
            });
            btnRefs.current.forEach(btn => {
                if (btn) gsap.set(btn, { opacity: 0, y: 30, scale: 0.95 });
            });

            observer = new window.IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && entry.intersectionRatio > 0.7) {
                            const idx = cardRefs.current.indexOf(entry.target);
                            // Card fade-in + scale
                            gsap.to(entry.target, {
                                opacity: 1,
                                scale: 1,
                                duration: 0.7,
                                ease: "power2.out"
                            });
                            // h2 animación elegante
                            gsap.to(h2Refs.current[idx], {
                                opacity: 1,
                                y: 0,
                                duration: 0.7,
                                delay: 0.15,
                                ease: "power3.out"
                            });
                            // p animación con stagger
                            gsap.to(pRefs.current[idx], {
                                opacity: 1,
                                y: 0,
                                duration: 0.7,
                                delay: 0.35,
                                stagger: 0.13,
                                ease: "power2.out"
                            });
                            // botón con rebote
                            gsap.to(btnRefs.current[idx], {
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                duration: 0.7,
                                delay: 0.65,
                                ease: "back.out(1.7)"
                            });
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: [0, 0.7, 1] }
            );
            cardRefs.current.forEach(card => {
                if (card) observer.observe(card);
            });
        }
        return () => {
            if (observer) observer.disconnect();
        };
    }, []);

    return (
        <section
            ref={ref}
            aria-label="Descripción de espejos personalizados"
        >
            {/* Primer Card */}
            <div ref={el => cardRefs.current[0] = el}>
                <Card className="w-full max-w-5xl px-6 bg-transparent sm:mb-10" {...props}>
                    <CardBody className="flex flex-row flex-wrap p-0 sm:flex-nowrap">
                        <Image
                            removeWrapper
                            alt="Espejo personalizado con iluminación LED de ACERVID"
                            className="h-auto w-full flex-none object-cover object-top md:w-64 lg:w-96"
                            src="https://res.cloudinary.com/dtxmsbsjd/image/upload/v1745854239/carrusel/zpf983bzgtsneydi3q08.jpg"
                        />
                        <div className="px-6 py-8">
                            <h2
                                className="text-2xl text-white font-medium"
                                ref={el => h2Refs.current[0] = el}
                            >
                                ¡Diseños Personalizados de Espejos!
                            </h2>
                            <div className="flex flex-col gap-4 pt-3 text-base text-default-400">
                                <p ref={el => pRefs.current[0][0] = el}>
                                    Personaliza tus espejos al gusto: elige tamaño, forma, iluminación y más para que se adapten perfectamente a tu estilo y espacio.
                                </p>
                                <p ref={el => pRefs.current[0][1] = el}>
                                    ¡Dale un toque único a tu hogar con los espejos iluminados de ACERVID!
                                </p>
                            </div>
                            <div className="mt-6 text-center sm:text-left">
                                <a href="https://api.whatsapp.com/send?phone=573223065256" target='_blank' rel='noopener noreferrer'>
                                    <button
                                        className="text-white px-3 py-1 rounded-2xl border border-white hover:bg-white hover:outline-none hover:text-black transition-all"
                                        ref={el => btnRefs.current[0] = el}
                                    >¡COTIZA EL TUYO!</button>
                                </a>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* Segundo Card */}
            <div ref={el => cardRefs.current[1] = el}>
                <Card className="w-full max-w-5xl px-6 bg-transparent mb-10 sm:mt-10" {...props}>
                    <CardBody className="flex flex-row flex-wrap p-0 sm:flex-nowrap">
                        <Image
                            removeWrapper
                            alt="Variedad de diseños de espejos modernos, clásicos y minimalistas"
                            className="h-auto w-full flex-none object-cover object-top md:w-64 lg:w-96 order-none sm:order-1"
                            src="https://res.cloudinary.com/dtxmsbsjd/image/upload/v1745857478/carrusel/lu5lzt58gxitmgfeihwu.jpg"
                        />
                        <div className="px-6 py-8 order-1 sm:order-none">
                            <h2
                                className="text-2xl text-white font-medium"
                                ref={el => h2Refs.current[1] = el}
                            >
                                ¡Gran Variedad De Diseños de Espejos!
                            </h2>
                            <div className="flex flex-col gap-4 pt-3 text-base text-default-400">
                                <p ref={el => pRefs.current[1][0] = el}>
                                    Descubre nuestra amplia colección de espejos diseñados para todos los gustos. Contamos con estilos modernos, clásicos y minimalistas, listos para embellecer cualquier espacio.
                                </p>
                                <p ref={el => pRefs.current[1][1] = el}>
                                    ¡Encuentra en ACERVID el espejo perfecto para tu hogar o negocio!
                                </p>
                            </div>
                            <div className="mt-6 text-center sm:text-left">
                                <a href="https://www.canva.com/design/DAGWfFjnEC8/YtzVi3d6LVzHV5XLNmUYvg/edit" target="_blank" rel="noopener noreferrer">
                                    <button
                                        className="text-white px-3 py-1 rounded-2xl border border-white hover:bg-white hover:outline-none hover:text-black transition-all"
                                        ref={el => btnRefs.current[1] = el}
                                    >¡EXPLORAR CATALOGO!</button>
                                </a>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </section>
    );
}