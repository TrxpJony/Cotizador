import '../../css/colosal.css';
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

const links = [
    { name: 'Productos', href: '/productos' },
    { name: 'Acerca de nosotros', href: '/nosotros' },
];

export function CortinaMovimiento() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const btnRefs = useRef([]);
    const [isVisible, setIsVisible] = useState(false);

    // Fondo animado con GSAP
    useEffect(() => {
        let bgAnim;
        if (sectionRef.current) {
            bgAnim = gsap.to(sectionRef.current, {
                backgroundPosition: "100% 50%",
                duration: 50,
                ease: "linear",
                repeat: -1,
                backgroundSize: "800% 800%"
            });
        }
        return () => {
            if (bgAnim) bgAnim.kill();
        };
    }, []);

    // Intersection Observer para animar contenido al ser visible
    useEffect(() => {
        const observer = new window.IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isVisible) {
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: 40, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power2.out" }
            );
            gsap.fromTo(
                textRef.current,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power2.out" }
            );
            btnRefs.current.forEach((el, i) => {
                gsap.fromTo(
                    el,
                    { opacity: 0, y: 30, scale: 0.9 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.7, delay: 0.4 + i * 0.15, ease: "back.out(1.7)" }
                );
            });
        }
    }, [isVisible]);

    return (
        <div
            ref={sectionRef}
            className="relative isolate overflow-hidden py-24 sm:py-32 text-center"
            style={{
                background: "linear-gradient(90deg, #22d3ee, #0891b2, #9ca3af, #374151, #374151, #9ca3af, #0891b2, #22d3ee, #0891b2)",
                backgroundSize: "800% 800%",
                backgroundPosition: "0% 50%",
            }}
        >
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                <h1
                    ref={titleRef}
                    className="text-5xl font-bold tracking-tight text-white sm:text-7xl"
                    style={{ opacity: 0 }}
                >
                    Vidrio al Arte SAS
                </h1>
                <p
                    ref={textRef}
                    className="mt-6 text-lg text-gray-300 sm:text-xl"
                    style={{ opacity: 0 }}
                >
                    Expertos en soluciones de vidrio, aluminio y acero. Fabricamos divisiones de baño, ventanas, puertas y espejos personalizados con tecnología LED.
                </p>
                <div className="mt-10 flex justify-center gap-6">
                    {links.map((link, idx) => (
                        <a
                            key={link.name}
                            href={link.href}
                            ref={el => (btnRefs.current[idx] = el)}
                            className="px-6 py-2 rounded-2xl text-sm sm:text-lg font-medium text-white bg-cyan-600 hover:bg-cyan-400 transition-all"
                            style={{ opacity: 0, transform: "scale(0.9)" }}
                            onMouseEnter={e => {
                                gsap.to(e.currentTarget, {
                                    scale: 1.1,
                                    backgroundColor: "#22d3ee",
                                    boxShadow: "0px 4px 15px rgba(34, 211, 238, 0.6)",
                                    duration: 0.2
                                });
                            }}
                            onMouseLeave={e => {
                                gsap.to(e.currentTarget, {
                                    scale: 1,
                                    backgroundColor: "#06b6d4",
                                    boxShadow: "none",
                                    duration: 0.2
                                });
                            }}
                            onMouseDown={e => {
                                gsap.to(e.currentTarget, { scale: 0.9, duration: 0.1 });
                            }}
                            onMouseUp={e => {
                                gsap.to(e.currentTarget, { scale: 1.1, duration: 0.1 });
                            }}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
