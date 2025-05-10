import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Sparkles, Hammer, UserRoundCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const DivisionesDescription = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(cardsRef.current, {
                opacity: 0,
                y: 50,
                duration: 1,
                stagger: 0.3,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%", // cuando el top del section llega al 80% de la ventana
                    toggleActions: "play none none none",
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-20 text-center "
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
                {[
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
                ].map((beneficio, index) => (
                    <div
                        key={index}
                        ref={(el) => (cardsRef.current[index] = el)}
                        className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="mb-4 flex justify-center">{beneficio.icon}</div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-700">
                            {beneficio.title}
                        </h3>
                        <p className="text-gray-600">{beneficio.description}</p>
                    </div>
                ))}
                {/* Card 4: ocupa toda la fila debajo */}
                <div
                    ref={(el) => (cardsRef.current[3] = el)}
                    className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 md:col-span-3"
                >
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
        </section>
    );
};

export default DivisionesDescription;
