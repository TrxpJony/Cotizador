import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Card, Image, CardBody } from "@heroui/react";

import collage from "../../../../img/img_nosotros/collage.png";
import vidrio from "../../../../img/img_nosotros/vidrio-templado.jpg";
import { animateDivisionesGalery } from "../../../../utils/serviciosAnimations/gsapAnimationsDivisiones";




const DivisionesGalery = () => {
    const containerRef = useRef(null);
    // Referencias para los cards y sus elementos internos

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            animateDivisionesGalery(containerRef.current); // <-- pasa la referencia aqui
        }, containerRef);
        return () => ctx.revert();
    }, []);


    return (
        <div ref={containerRef}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
                className="mb-20 w-full"
            >

                {/* Galería de imágenes */}

                <div>
                    <div>
                        <Card
                            className="px-1 w-full bg-transparent sm:mb-10"
                            shadow="none"
                        >
                            <CardBody className="flex flex-row flex-wrap p-0 sm:flex-nowrap">
                                <Image
                                    removeWrapper
                                    alt="Espejo personalizado con iluminación LED de ACERVID"
                                    className="galery-cards-img h-auto w-full flex-none object-cover object-top md:w-64 lg:w-96"
                                    src={collage}
                                />
                                <div className="px-6 py-8">
                                    <h2
                                        className="galery-title text-2xl text-black font-medium"
                                    >¡Cenefa personalizable al gusto!</h2>
                                    <div className=" galery-desc flex flex-col gap-4 pt-3 text-base text-default-600">
                                        <p>
                                            En Vidrio al Arte fabricamos divisiones de baño a medida con vidrio templado, combinando funcionalidad, seguridad y diseño moderno.
                                        </p>
                                        <p>
                                            Personaliza tu división con diseños exclusivos de cenefa, eligiendo el estilo que mejor se adapte a tu espacio y gusto.
                                        </p>
                                    </div>
                                    <div className="mt-6 text-center sm:text-left">
                                        <a href="/productos/divisiones-de-baño/diseños">
                                            <button
                                                className="galery-button text-black px-3 py-1 rounded-2xl border border-black hover:bg-black hover:outline-none hover:text-white transition-all"
                                            >¡EXPLORAR CATALOGO!</button>
                                        </a>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
                <div>
                    <div>
                        <Card
                            className="w-full bg-transparent mb-10 sm:mt-10 px-1"
                            shadow="none"
                        >
                            <CardBody className="flex flex-row flex-wrap p-0 sm:flex-nowrap">
                                <Image
                                    removeWrapper
                                    alt="Variedad de diseños de espejos modernos, clásicos y minimalistas"
                                    className="galery-temp-img h-auto w-full flex-none object-cover object-top md:w-64 lg:w-96 order-none sm:order-1"
                                    src={vidrio}
                                />
                                <div className="px-6 py-8 order-1 sm:order-none">
                                    <h2
                                        className="galery-temp-title text-2xl text-right text-black font-medium"
                                    >¡Vidrio Templado de la Mejor Calidad!</h2>
                                    <div className="galery-temp-desc text-right flex flex-col gap-4 pt-3 text-base text-default-600">
                                        <p>
                                            Nuestras divisiones de baño están fabricadas en vidrio templado de alta resistencia, pensado para brindar seguridad, durabilidad y un acabado impecable.
                                        </p>
                                        <p>
                                            En Vidrio al Arte garantizamos precisión en cada medida y un diseño que se adapta perfectamente a tu espacio.
                                        </p>
                                    </div>
                                    <div className="mt-6 text-center sm:text-right">
                                        <a href="https://api.whatsapp.com/send/?phone=3223065256&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
                                            <button
                                                className="galery-temp-button text-black px-14 py-1 rounded-2xl border border-black hover:bg-black hover:outline-none hover:text-white transition-all"
                                            >¡COTIZAR!</button>
                                        </a>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DivisionesGalery;
