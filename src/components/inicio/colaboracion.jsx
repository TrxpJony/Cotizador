import logo1 from '../../img/img_Principal/1.png';
import logo2 from '../../img/img_Principal/2.png';
import logo3 from '../../img/img_Principal/3.png';
import logo4 from '../../img/img_Principal/4.png';
import logo5 from '../../img/img_Principal/5.png';
import logo6 from '../../img/img_Principal/6.png'
import '../../css/colosal.css'; // Archivo CSS para estilos
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

export function Colaboración() {
  const logoRefs = useRef([]);
  const gridRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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
    if (gridRef.current) {
      observer.observe(gridRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      logoRefs.current.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.2,
            ease: "power2.out"
          }
        );
      });
    }
  }, [isVisible]);

  return (
    <>
      <div className="bg-white sm:py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center items-center">
          <h2 className="text-center text-lg/8 font-semibold text-gray-900">
            En colaboración con
          </h2>
          <div
            className="grid-cols-2 sm:grid-cols-3 mx-auto grid max-w-lg gap-x-4 sm:max-w-xl sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-6 justify-items-center"
            ref={gridRef}
          >
            <a href="https://espejossas.com/" target="_blank" rel="noopener noreferrer">
              <img
                alt="Espejos SAS"
                src={logo1}
                className=" w-32 sm:w-38 md:w-40 lg:w-full object-contain cursor-pointer"

                ref={el => (logoRefs.current[0] = el)}
                style={{ opacity: 0 }}
              />
            </a>
            <a href="https://www.vidrioandino.com" target='_blank' rel='noopener noreferrer'>
              <img
                alt="Vidrio Andino"
                src={logo2}
                className=" w-32 sm:w-32 md:w-40 lg:w-full object-contain cursor-pointer"

                ref={el => (logoRefs.current[1] = el)}
                style={{ opacity: 0 }}
              />
            </a>
            <a href='https://linktr.ee/skyleds?utm_source=linktree_profile_share&ltsid=cced0ac7-6c44-426a-8007-15f389bcf4ab' target='_blank' rel='noopener noreferrer'>
              <img
                alt="Sky Leds"
                src={logo3}
                className=" w-32 sm:w-32 md:w-40 lg:w-full object-contain cursor-pointer"

                ref={el => (logoRefs.current[2] = el)}
                style={{ opacity: 0 }}
              />
            </a>
            <a href="https://vitral.com.co/" target='_blank' rel='noopener noreferrer'>
              <img
                alt="Vitral"
                src={logo4}
                className=" w-32 sm:w-32 md:w-40 lg:w-full object-contain cursor-pointer"

                ref={el => (logoRefs.current[3] = el)}
                style={{ opacity: 0 }}
              />
            </a>
            <a href="https://aluminark.com/" target='_black' rel='noopener noreferrer'>
              <img
                alt="Aluminark"
                src={logo5}
                className=" w-32 sm:w-32 md:w-40 lg:w-full object-contain cursor-pointer"

                ref={el => (logoRefs.current[4] = el)}
                style={{ opacity: 0 }}
              />
            </a>
            <a href="https://vitelsa.com.co/" target='_black' rel='noopener noreferrer'>
              <img
                alt="Vitelsa"
                src={logo6}
                className=" w-32 sm:w-32 md:w-40 lg:w-full object-contain cursor-pointer"

                ref={el => (logoRefs.current[5] = el)}
                style={{ opacity: 0 }}
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
