import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ServiciosText = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Título con zoom + fade
      gsap.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        },
      });

      // Párrafos con stagger (uno tras otro)
      gsap.from(paragraphsRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      });
    }, containerRef);

    return () => ctx.revert(); // Limpia animaciones al desmontar
  }, []);

  return (
    <div ref={containerRef} className="p-8 text-center rounded-xl">
      <div className="flex justify-center items-center">
        {/* Aquí puedes poner una imagen si lo deseas */}
      </div>

      <p
        className="text-base font-semibold text-cyan-500 tracking-tight mt-4"
        ref={el => (paragraphsRef.current[0] = el)}
      >
        Vidrio al Arte SAS
      </p>

      <h1
        className="mt-2 text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl"
        ref={titleRef}
      >
        Servicios
      </h1>

      <p
        className="mt-6 text-lg text-gray-600"
        ref={el => (paragraphsRef.current[1] = el)}
      >
        En Vidrio al Arte SAS convertimos ideas en espacios únicos. Nos apasiona crear soluciones funcionales y estéticas que se adapten a cada necesidad. Combinamos experiencia, compromiso y calidad para llevar cada proyecto al siguiente nivel.
      </p>

      <p
        className="text-lg text-gray-600"
        ref={el => (paragraphsRef.current[2] = el)}
      >
        Cada detalle importa. Cada espacio cuenta.
      </p>
    </div>
  );
};

export default ServiciosText;
