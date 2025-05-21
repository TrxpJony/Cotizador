import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { animateVidrioImagenes } from "../../../../utils/gsapAnimations";

const Imagenes = [
    {
        id: '1',
        name: 'transparente - martillado',
        imageSrc: 'https://res.cloudinary.com/dtxmsbsjd/image/upload/v1747751521/transparente_-_martillado_ajtphb.png',
    },
    {
        id: '4',
        name: '',
        imageSrc: 'https://res.cloudinary.com/dtxmsbsjd/image/upload/v1747755566/sandbla_-_esme_mlowcg.png',
    },
    {
        id: '3',
        name: 'tono azul',
        imageSrc: 'https://res.cloudinary.com/dtxmsbsjd/image/upload/v1747752471/azul_lrno3h.png',
    },
    {
        id: '2',
        name: 'bronce - gris',
        imageSrc: 'https://res.cloudinary.com/dtxmsbsjd/image/upload/v1747751261/bronce_-_gris_c4zcyp.png',
    },


]

const VidrioImagenes = () => {
    const containerRef = useRef(null);

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (imageSrc) => {
        setSelectedImage(imageSrc);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            animateVidrioImagenes(containerRef.current); // <-- Pasa la referencia aquí
        }, containerRef);
        return () => ctx.revert(); // Cleanup para evitar fugas de memoria
    }, []);


    return (
        <>
            <div ref={containerRef}>
                <section className="relative mt-6 md:mt-8">
                    <div className="mx-auto max-w-7xl w-full px-5 sm:px-8 md:px-14 lg:px-5">
                        <div className="img-container bg-white  rounded-3xl mt-10 sm:mt-12 border shadow-lg border-gray-200 
                                 shadow-slate-200/50 text-gray-700 objec ">
                            <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
                                <h2 className="img-title font-bold text-2xl sm:text-3xl md:text-4xl text-gray-900">Nuestros vidrios</h2>
                                <p className="img-desc md:text-lg">
                                    Cada espacio merece un vidrio que lo reprecente. En Vidrio al Arte SAS contamos con opciones que combinan estilo,
                                    elegancia y funcionalidad. Ya sea que busques privacidad, diseño o un acabado único, tenemos el vidrio perfecto para ti.
                                    A continuacion, te mostramos algunos de nuestros vidrios disponibles para transformar tus proyectos.
                                </p>
                                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
                                    {Imagenes.map((imagen) => (
                                        <div
                                            key={imagen.id} className="img-images group relative"
                                            onClick={() => handleImageClick(imagen.imageSrc)}
                                        >
                                            <img
                                                src={imagen.imageSrc}
                                                className="aspect-square w-full rounded-3xl bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80 "
                                                alt={imagen.name}
                                            />
                                            <div className="mt-4 flex justify-between">
                                                <div>
                                                    <h2 className="font-semibold  text-gray-700">
                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            {selectedImage && (
                <div
                    className="p-10 fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
                    onClick={handleCloseModal}
                >
                    <img
                        src={selectedImage}
                        alt="Imagen ampliada"
                        className="max-w-full max-h-full rounded-3xl shadow-2xl"
                    />
                </div>
            )}
        </>
    );
};

export default VidrioImagenes;

