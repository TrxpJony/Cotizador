import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, Image, CardBody } from "@heroui/react";
import div2 from "../../../../img/img_nosotros/division2.png";
import div3 from "../../../../img/img_nosotros/division3.png";
import div4 from "../../../../img/img_nosotros/division4.png";
import div5 from "../../../../img/img_nosotros/division5.png";
import collage from "../../../../img/img_nosotros/collage.png";
import vidrio from "../../../../img/img_nosotros/vidrio-templado.jpg";

gsap.registerPlugin(ScrollTrigger);

const images = [
    { src: div3, alt: "División 1" },
    { src: div2, alt: "División de baño 2" },
    { src: div4, alt: "División de baño 3" },
    { src: div5, alt: "División de baño 4" },
];

const DivisionesGalery = () => {
    const galeryRef = useRef(null);
    const imageRefs = useRef([]);
    // Referencias para los cards y sus elementos internos
    const cardRefs = useRef([]);
    const h2Refs = useRef([]);
    const pRefs = useRef([[], []]);
    const btnRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(imageRefs.current, {
                opacity: 0,
                y: 50,
                duration: 1,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: galeryRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });
        }, galeryRef);

        // Animaciones tipo espejosDescription para los cards
        let observer;
        if (cardRefs.current.length) {
            // Estado inicial
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
            ctx.revert();
            if (observer) observer.disconnect();
        };
    }, []);

    return (
        <div
            ref={galeryRef}
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
            className="mb-20 w-full"
        >

            {/* Galería de imágenes */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "16px",
                    justifyContent: "center",
                }}
            >
                {images.map((img, idx) => (
                    <div
                        key={idx}
                        ref={(el) => (imageRefs.current[idx] = el)}
                        style={{
                            border: "1px solid #ccc",
                            // borderRadius: "8px", // Elimina esta línea o déjala comentada
                            overflow: "hidden",
                            width: "300px",
                        }}
                        className="shadow-xl rounded-2xl"
                    >
                        <img
                            src={img.src}
                            alt={img.alt}
                            style={{
                                width: "100%",
                                height: "auto",
                                display: "block",
                            }}
                        />
                    </div>
                ))}
            </div>
            <div>
                <div ref={el => cardRefs.current[0] = el}>
                    <Card
                        className="px-1 w-full mt-20 bg-transparent sm:mb-10"
                        shadow="none"
                    >
                        <CardBody className="flex flex-row flex-wrap p-0 sm:flex-nowrap">
                            <Image
                                removeWrapper
                                alt="Espejo personalizado con iluminación LED de ACERVID"
                                className="h-auto w-full flex-none object-cover object-top md:w-64 lg:w-96"
                                src={collage}
                            />
                            <div className="px-6 py-8">
                                <h2
                                    className="text-2xl text-black font-medium"
                                    ref={el => h2Refs.current[0] = el}
                                >¡Cenefa personalizable al gusto!</h2>
                                <div className="flex flex-col gap-4 pt-3 text-base text-default-600">
                                    <p ref={el => pRefs.current[0][0] = el}>
                                        En Vidrio al Arte fabricamos divisiones de baño a medida con vidrio templado, combinando funcionalidad, seguridad y diseño moderno.
                                    </p>
                                    <p ref={el => pRefs.current[0][1] = el}>
                                        Personaliza tu división con diseños exclusivos de cenefa, eligiendo el estilo que mejor se adapte a tu espacio y gusto.
                                    </p>
                                </div>
                                <div className="mt-6 text-center sm:text-left">
                                    <a href="/productos/divisiones-de-baño/diseños">
                                        <button
                                            className="text-black px-3 py-1 rounded-2xl border border-black hover:bg-black hover:outline-none hover:text-white transition-all"
                                            ref={el => btnRefs.current[0] = el}
                                        >¡EXPLORAR CATALOGO!</button>
                                    </a>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div>
                <div ref={el => cardRefs.current[1] = el}>
                    <Card
                        className="w-full bg-transparent mb-10 sm:mt-10 px-1"
                        shadow="none"
                    >
                        <CardBody className="flex flex-row flex-wrap p-0 sm:flex-nowrap">
                            <Image
                                removeWrapper
                                alt="Variedad de diseños de espejos modernos, clásicos y minimalistas"
                                className="h-auto w-full flex-none object-cover object-top md:w-64 lg:w-96 order-none sm:order-1"
                                src={vidrio}
                            />
                            <div className="px-6 py-8 order-1 sm:order-none">
                                <h2
                                    className="text-2xl text-black font-medium"
                                    ref={el => h2Refs.current[1] = el}
                                >¡Vidrio Templado de la Mejor Calidad!</h2>
                                <div className="flex flex-col gap-4 pt-3 text-base text-default-600">
                                    <p ref={el => pRefs.current[1][0] = el}>
                                        Nuestras divisiones de baño están fabricadas en vidrio templado de alta resistencia, pensado para brindar seguridad, durabilidad y un acabado impecable.
                                    </p>
                                    <p ref={el => pRefs.current[1][1] = el}>
                                        En Vidrio al Arte garantizamos precisión en cada medida y un diseño que se adapta perfectamente a tu espacio.
                                    </p>
                                </div>
                                <div className="mt-6 text-center sm:text-left">
                                    <a href="https://api.whatsapp.com/send/?phone=3223065256&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
                                        <button
                                            className="text-black px-3 py-1 rounded-2xl border border-black hover:bg-black hover:outline-none hover:text-white transition-all"
                                            ref={el => btnRefs.current[1] = el}
                                        >¡COTIZAR!</button>
                                    </a>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DivisionesGalery;
