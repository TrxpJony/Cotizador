import { GiCrackedGlass } from "react-icons/gi";
import { GiShatter } from "react-icons/gi";
import { useLayoutEffect, useState, useRef } from "react";
import gsap from "gsap";
import { animateVidrioDescription } from "../../../../utils/gsapAnimationsVidrio";

const mainImageSrc = "https://res.cloudinary.com/dtxmsbsjd/image/upload/v1747748882/vidrio_templado_y_laminado_yrqqey.png";

const seguridad = [
    {
        icon: <GiCrackedGlass size={28} className="text-cyan-500" />,
        title: "Laminado",
        description: "Formado por dos hojas de vidrio unidas con una lámina intermedia que evita el desprendimiento al romperse."
    },
    {
        icon: <GiShatter size={28} className="text-cyan-500" />,
        title: "Templado",
        description: "5 veces más resistente que el vidrio común. En caso de rotura, se fragmenta en pequeños trozos no filosos."
    }
]

const VidrioDescription = () => {
    const containerRef = useRef(null);
    const [showModal, setShowModal] = useState(false);

    const handleImageClick = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);


    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            animateVidrioDescription(containerRef.current); // <-- Pasa la referencia aqui
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <>
            <div ref={containerRef}>
                <section className="relative mt-10 md:mt-7">
                    <div
                        className="mx-auto w-full px-5 sm:px-8 md:px-14 lg:px-5 flex flex-col md:flex-row gap-10 lg:gap-12 items-center"
                    >
                        <div className="w-full md:w-5/12 lg:w-1/2">
                            <div
                                className="desc-img w-full h-80 sm:h-96 relative">
                                <img
                                    src={mainImageSrc}
                                    alt="foto de"
                                    className="aspect-square bg-gray-200 hover:opacity-75 w-full h-full object-cover rounded-3xl shadow-lg resize-none z-10"
                                    onClick={handleImageClick}
                                />
                            </div>
                        </div>

                        <div className="w-full md:w-7/12 lg:w-1/2 flex flex-col">
                            <h2 className="desc-title font-bold text-2xl sm:text-3xl md:text-4xl">
                                Vidrios de Seguridad
                            </h2>
                            <p className="desc-desc md:text-lg">
                                Los vidrios de seguridad están diseñados para ofrecer mayor resistencia, minimizar el riesgo de accidentes y brindar protección
                                en aplicaciones arquitectónicaso decorativas. Estos tipos de vidrio se fabrican mediante procesos especiales que aumentan su durabilidad.
                            </p>

                            <div className="pt-8 mb-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {seguridad.map((vidrio, key) => (

                                    <div
                                        key={key}
                                        className="desc-map px-5 sm:px-6 lg:px-8 py-5 rounded-3xl border shadow-lg
                                           border-gray-200 shadow-slate-200/50 bg-white 
                                           text-gray-700 relative overflow-hidden"
                                    >
                                        <div className="desc-map-content">
                                            <div className="rounded-xl bg-body p-3 w-max relative">
                                                {vidrio.icon}
                                            </div>
                                            <h2 className="w-max relative font-semibold md:text-xl">
                                                {vidrio.title}
                                            </h2>
                                            <p className="text-gray-600">
                                                {vidrio.description}
                                            </p>
                                        </div>
                                    </div>

                                ))}
                            </div>
                        </div>

                    </div>
                </section>
            </div>
            {showModal && (
                <div
                    className="p-10 fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
                    onClick={handleCloseModal}
                >
                    <img
                        src={mainImageSrc}
                        alt="Imagen ampliada"
                        className="max-w-full max-h-full rounded-3xl shadow-2xl"
                    />
                </div>
            )}
        </>
    );
};

export default VidrioDescription;