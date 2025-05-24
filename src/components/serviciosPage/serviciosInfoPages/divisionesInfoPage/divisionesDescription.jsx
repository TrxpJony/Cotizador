import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ShieldCheck, Sparkles, Hammer, UserRoundCheck } from "lucide-react";
import { animateDivisionesDescription } from "../../../../utils/serviciosAnimations/gsapAnimationsDivisiones";
import div2 from "../../../../img/img_nosotros/division2.png";
import div3 from "../../../../img/img_nosotros/division3.png";
import div4 from "../../../../img/img_nosotros/division4.png";
import div5 from "../../../../img/img_nosotros/division5.png";

const images = [
    { src: div3, alt: "División 1" },
    { src: div2, alt: "División de baño 2" },
    { src: div4, alt: "División de baño 3" },
    { src: div5, alt: "División de baño 4" },
];

const description = [
    {
        icon: <ShieldCheck className="w-12 h-12 text-cyan-500" />,
        title: "Alta Durabilidad",
        description: "Materiales resistentes que garantizan años de uso sin desgaste.",
    },
    {
        icon: <Sparkles className="w-12 h-12 text-cyan-500" />,
        title: "Diseño Moderno",
        description: "Estilo minimalista y elegante que se adapta a cualquier baño.",
    },
    {
        icon: <Hammer className="w-12 h-12 text-cyan-500" />,
        title: "Instalación Rápida",
        description: "Proceso ágil, limpio y profesional en pocas horas.",
    },
]

const DivisionesDescription = () => {
    const containerRef = useRef(null);

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (src) => {
        setSelectedImage(src)
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            animateDivisionesDescription(containerRef.current); // <-- pasa la referencia aqui
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef}>
            <section
                className="py-20 text-center "
            >

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto mb-6">

                    {description.map((beneficio, key) => (
                        <div
                            key={key}
                            className="description-container bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="description-container-text">
                                <div className="mb-4 flex justify-center">{beneficio.icon}</div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-700">
                                    {beneficio.title}
                                </h3>
                                <p className="text-gray-600">{beneficio.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Card 4: ocupa toda la fila debajo */}
                <div
                    className="description-container-2 mb-6 bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 md:col-span-3"
                >
                    <div className="description-container-text">
                        <div className="mb-4 flex justify-center">
                            <UserRoundCheck className="w-12 h-12 text-cyan-500" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-700">
                            Atención Personalizada
                        </h3>
                        <p className="text-gray-600">
                            Recibe un acompañamiento cercano y experto en cada etapa del proceso, asegurando una solución a tu medida y una experiencia sin complicaciones.
                        </p>
                    </div>
                </div>

                {/* imagenes de galeria */}
                <div>
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
                                style={{
                                    border: "1px solid #ccc",
                                    // borderRadius: "8px", // Elimina esta línea o déjala comentada
                                    overflow: "hidden",
                                    width: "300px",
                                }}
                                className="description-images shadow-md hover:shadow-xl transition-shadow duration-300  rounded-2xl"
                            >
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        display: "block",
                                    }}
                                    onClick={() => handleImageClick(img.src)}
                                    className="bg-gray-200 hover:opacity-75 "
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
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
        </div>

    );
};

export default DivisionesDescription;
