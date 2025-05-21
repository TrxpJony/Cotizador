import { IoMdCut } from "react-icons/io";
import { FaWandMagicSparkles, FaSprayCan } from "react-icons/fa6";
import { FaLayerGroup } from "react-icons/fa";
import gsap from "gsap";
import { animateVidrioServicios } from "../../../../utils/gsapAnimations";
import { useLayoutEffect, useRef } from "react";

const servicios = [
    {
        icon: <IoMdCut size={30} />,
        title: "Corte",
        description: "Realizamos cortes precisos a medida, en diferentes calibres y tipos de vidrio.",
    },
    {
        icon: <FaWandMagicSparkles size={30} />,
        title: "Pulido y brillado",
        description: "Damos un acabado liso y brillante a los bordes para mayor seguridad y estética.",
    },
    {
        icon: <FaLayerGroup size={30} />,
        title: "Biselado",
        description: "Aplicamos un rebaje decorativo en los bordes, ideal para espejos y vitrales.",
    },
    {
        icon: <FaSprayCan size={30} />,
        title: "Sandblasting",
        description: "Grabamos diseños o patrones sobre el vidrio con chorro de arena para un efecto esperilado.",
    }
]

const VidrioServicios = () => {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            animateVidrioServicios(containerRef.current); // <-- Pasa la referencia aqui
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <>
            <div ref={containerRef}>
                <section className="relative mt-12 md:mt-16">
                    <div className="mx-auto max-w-7xl w-full px-5 sm:px-8 md:px-14 lg:px-5 space-y-10 md:space-y-12">
                        <div className="text-center max-w-3xl mx-auto space-y-4">
                            <h2 className="servicios-title font-bold text-2xl sm:text-3xl md:text-4xl">
                                {" "} Acabados Para Vidrios{" "}
                            </h2>
                            <p className="servicios-desc md:text-lg">
                                Contamos con una variedad de acabados y procesos para transformar el vidrio según tus necesidades estéticas y funcionales.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                            {servicios.map((servicio, key) => (
                                <div
                                    key={key}
                                    className="servicios-servio-card p-5 sm:p-6 lg:p-8 rounded-3xl border shadow-lg
                                           border-gray-200 shadow-slate-200/50 bg-white 
                                           text-gray-700 relative overflow-hidden"
                                >
                                    <div className="servicios-servicios">
                                        <div className="rounded-xl bg-body p-3 w-max relative">
                                            {" "}{servicio.icon}{" "}
                                        </div>
                                        <div className="mt-6 space-y-4 relative">
                                            <h2 className="text-lg md:text-xl font-bold text-heading-2">
                                                {" "}
                                                {servicio.title}
                                            </h2>
                                            <p className="text-gray-600">{servicio.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default VidrioServicios
