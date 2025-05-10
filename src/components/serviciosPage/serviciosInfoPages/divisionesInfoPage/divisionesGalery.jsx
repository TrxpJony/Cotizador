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
    // Referencias para los cards
    const card1Ref = useRef(null);
    const card2Ref = useRef(null);

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
            // Animación para el primer card
            if (card1Ref.current) {
                gsap.from(card1Ref.current, {
                    opacity: 0,
                    y: 80,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card1Ref.current,
                        start: "top 70%", // antes: "top 85%"
                        toggleActions: "play none none none",
                    },
                });
            }
            // Animación para el segundo card
            if (card2Ref.current) {
                gsap.from(card2Ref.current, {
                    opacity: 0,
                    y: 80,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card2Ref.current,
                        start: "top 70%", // antes: "top 85%"
                        toggleActions: "play none none none",
                    },
                });
            }
        }, galeryRef);

        return () => ctx.revert();
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
                <Card
                    ref={card1Ref}
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
                            <h2 className="text-2xl text-black font-medium">¡Cenefa personalizable al gusto!</h2>
                            <div className="flex flex-col gap-4 pt-3 text-base text-default-600">
                                <p>
                                    En Vidrio al Arte fabricamos divisiones de baño a medida con vidrio templado, combinando funcionalidad, seguridad y diseño moderno.
                                </p>
                                <p>
                                    Personaliza tu división con diseños exclusivos de cenefa, eligiendo el estilo que mejor se adapte a tu espacio y gusto.
                                </p>
                            </div>
                            <div className="mt-6 text-center sm:text-left">
                                <a href="/productos/divisiones-de-baño/estilos">
                                    <button className="text-black px-3 py-1 rounded-2xl border border-black hover:bg-black hover:outline-none hover:text-white transition-all">¡EXPLORAR CATALOGO!</button>
                                </a>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div>
                <Card
                    ref={card2Ref}
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
                            <h2 className="text-2xl text-black font-medium">¡Vidrio Templado de la Mejor Calidad!</h2>
                            <div className="flex flex-col gap-4 pt-3 text-base text-default-600">
                                <p>
                                    Nuestras divisiones de baño están fabricadas en vidrio templado de alta resistencia, pensado para brindar seguridad, durabilidad y un acabado impecable.
                                </p>
                                <p>
                                    En Vidrio al Arte garantizamos precisión en cada medida y un diseño que se adapta perfectamente a tu espacio.
                                </p>
                            </div>
                            <div className="mt-6 text-center sm:text-left">
                                <a href="" target="_blank" rel="noopener noreferrer">
                                    <button className="text-black px-3 py-1 rounded-2xl border border-black hover:bg-black hover:outline-none hover:text-white transition-all">¡COTIZAR!</button>
                                </a>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default DivisionesGalery;
