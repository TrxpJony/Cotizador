import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

const ServiciosContact = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const buttonRef = useRef(null);
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
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
            );
            gsap.fromTo(
                textRef.current,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: "power2.out" }
            );
            gsap.fromTo(
                buttonRef.current,
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 0.7, delay: 0.4, ease: "back.out(1.7)" }
            );
        }
    }, [isVisible]);

    return (
        <>
            <div
                ref={sectionRef}
                className='relative isolate overflow-hidden py-24 sm:py-32 text-center'
                style={{
                    background: "linear-gradient(90deg, #22d3ee, #0891b2, #9ca3af, #374151, #374151, #9ca3af, #0891b2, #22d3ee, #0891b2)",
                    backgroundSize: "800% 800%",
                    backgroundPosition: "0% 50%",
                }}
            >
                <div className='max-w-4xl mx-auto px-6 lg:px-8'>
                    <h2
                        ref={titleRef}
                        className='text-2xl font-bold tracking-tight text-white sm:text-3xl'
                        style={{ opacity: 0 }}
                    >
                        ¡Contáctanos!
                    </h2>
                    <p
                        ref={textRef}
                        className='mt-4 text-lg text-gray-200'
                        style={{ opacity: 0 }}
                    >
                        Estamos aquí para ayudarte con tus proyectos. No dudes en comunicarte con nosotros para obtener más información o resolver tus dudas.
                    </p>
                    <a href="/contact">
                        <button
                            ref={buttonRef}
                            className='mt-4 px-6 py-3 rounded-lg text-lg font-medium text-white bg-cyan-600 hover:bg-cyan-400 transition-all'
                            style={{ opacity: 0, transform: "scale(0.8)" }}
                        >
                            ¿Charlamos un momento?
                        </button>
                    </a>
                </div>
            </div>
        </>
    );
};
export default ServiciosContact;