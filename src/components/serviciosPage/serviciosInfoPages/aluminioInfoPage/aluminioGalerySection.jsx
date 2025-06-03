import { Container } from "../../../common/tags";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import { animateAluminioGalery } from "../../../../utils/serviciosAnimations/gsapAnimationAluminio";

const callouts = [
    {
        name: 'Puertas de cocina',
        description: 'Perfil de hermosas puertas para cocinas',
        imageSrc: 'https://res.cloudinary.com/dtxmsbsjd/image/upload/v1748384214/cocinas_jsvqsa.png',
        imageAlt: 'Una cocina integrar con puertas en aluminio de cocina',
        href: '#',
    },
    {
        name: 'Sistemas de aluminio',
        description: 'Sistemas corredizos o bantientes en aluminio',
        imageSrc: 'https://res.cloudinary.com/dtxmsbsjd/image/upload/v1748440307/puerta_col_n4lqgg.png',
        imageAlt: 'unas oficinas con sistemas corredizos en aluminio',
        href: '#',
    },
    {
        name: 'Ventaneria en aluminio',
        description: 'Ventaneria de aluminio para todo tipo de proyectos',
        imageSrc: 'https://res.cloudinary.com/dtxmsbsjd/image/upload/v1748440756/ventana_ylzq4n.png',
        imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
        href: '#',
    },
]

const AluminioGalerySection = () => {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            animateAluminioGalery(containerRef.current); // <-- pasa la referencia aqui
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef}>
            <div className="w-full py-16 lg:py-32 bg-white">
                <Container>
                    <div className="mx-auto px-6 lg:px-0">
                        <div className="mx-auto  mb-12">
                            <span className=" aluminio-galery-text inline-block bg-cyan-500 text-white font-semibold px-4 py-1 rounded-full shadow-sm mb-3">
                                Galería de Proyectos
                            </span>
                            <h2 className="aluminio-galery-text text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">
                                Inspiración en Aluminio
                            </h2>
                            <p className="aluminio-galery-text text-gray-600 mx-auto text-lg">
                                Descubre algunos de nuestros trabajos destacados en aluminio. Cada proyecto refleja innovación, calidad y diseño adaptado a las necesidades de nuestros clientes.
                            </p>
                        </div>
                        <div className="mx-auto max-w-2xl lg:max-w-none">
                            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:space-y-0 lg:gap-x-6">
                                {callouts.map((callout) => (
                                    <div key={callout.name} className="aluminio-galery-img group relative">
                                        <img
                                            alt={callout.imageAlt}
                                            src={callout.imageSrc}
                                            className="w-full rounded-2xl bg-white object-cover group-hover:opacity-75 max-sm:h-80 sm:aspect-2/1 lg:aspect-square"
                                        />
                                        <h3 className="mt-6 text-sm text-gray-500 aluminio-galery-imgtext">
                                            <a href={callout.href}>
                                                <span className="absolute inset-0" />
                                                {callout.name}
                                            </a>
                                        </h3>
                                        <p className="aluminio-galery-imgtext text-base font-semibold text-gray-900">{callout.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
};
export default AluminioGalerySection;