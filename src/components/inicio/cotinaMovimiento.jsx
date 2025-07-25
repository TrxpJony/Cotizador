import '../../css/colosal.css';
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

const links = [
    { name: 'Productos', href: '/productos', px: 'px-10' },
    { name: 'Acerca de nosotros', href: '/nosotros', px: 'px-4' },
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
            className="relative isolate overflow-hidden py-24 sm:py-60"
            style={{
                background: "linear-gradient(90deg, #22d3ee, #0891b2, #0891b2, #374151, #374151, #0891b2, #0891b2, #22d3ee, #0891b2)",
                backgroundSize: "800% 800%",
                backgroundPosition: "0% 50%",
            }}
        >
            <img
                alt=""
                src="https://res.cloudinary.com/dtxmsbsjd/image/upload/v1748984838/peszlbcfdskolhuqxp4l_tgxmkc.jpg"
                className="opacity-50 absolute inset-0 -z-10 size-full object-cover object-center"
            />
            <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center sm:text-left"> {/*max-w-screen-2xl */}
                <p
                    ref={textRef}
                    className="text-lg text-gray-300 sm:text-2xl max-w-xl"
                    style={{ opacity: 0 }}
                >
                    Expertos en soluciones de vidrio, aluminio y acero. Fabricamos divisiones de baño, ventanas, puertas y espejos personalizados con tecnología LED.
                </p>
                <h1
                    ref={titleRef}
                    className="mt-6 text-5xl font-bold tracking-tight text-white sm:text-8xl max-w-xl"
                    style={{ opacity: 0 }}
                >
                    Vidrio al Arte SAS
                </h1>
                <div className="mt-10 flex  gap-6">
                    {links.map((link, idx) => (
                        <a
                            key={link.name}
                            href={link.href}
                            ref={el => (btnRefs.current[idx] = el)}
                            className={`${link.px} py-2 rounded-2xl text-sm sm:text-lg font-medium text-white bg-cyan-600 hover:bg-cyan-400 transition-all`}
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
