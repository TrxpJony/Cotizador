import { useRef, useEffect } from "react";
import gsap from "gsap";
import CarruselesComponent from "../inicio/carrusel/carruseles.jsx";
import "../../css/colosal.css";

const features = [
  { name: "Origen", description: "Fabricado por Vidrio al Arte SAS en Bogotá, Colombia." },
  { name: "Materiales", description: "Estructuras de vidrio, espejos o aluminio de alta calidad." },
  { name: "Dimensiones", description: "Personalizable en tamaño y diseño, según las especificaciones del cliente." },
  { name: "Personalización", description: "Fabricamos piezas en vidrio, espejos personalizados y sistemas de aluminio según tus necesidades." },
  { name: "Componentes", description: "Incluye herrajes y accesorios en acero inoxidable para una instalación segura y duradera." },
  { name: "Detalles", description: "Las variaciones en textura, color y acabado son propias de los materiales utilizados en la fabricación." }
];

export function InfoProductos() {
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const featuresRef = useRef([]);
  const carruselRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
    gsap.fromTo(
      descRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out" }
    );
    gsap.fromTo(
      featuresRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.15,
        delay: 0.6,
        ease: "power3.out"
      }
    );
    gsap.fromTo(
      carruselRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, delay: 1.2, ease: "elastic.out(1, 0.6)" }
    );
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-x-16 gap-y-16 px-4 py-24 sm:px-0 sm:py-32 lg:max-w-7xl lg:grid-cols-2 ">
        {/* Sección de texto con animaciones */}
        <div>
          <h2
            ref={titleRef}
            className="text-4xl font-bold tracking-tight text-gray-700 sm:text-6xl"
          >
            Nuestros Productos
          </h2>
          <p
            ref={descRef}
            className="mt-4 text-default-400"
          >
            Vidrio al Arte SAS ofrece una amplia gama de productos de vidrio, Espejo y aluminio, diseñados para aportar elegancia y estilo a cualquier espacio. Desde puertas y ventanas de vidrio templado y aluminio hasta espejos personalizados con luz led, nuestros productos combinan calidad y diseño para satisfacer las necesidades de nuestros clientes.
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-10 lg:gap-x-8">
            {features.map((feature, idx) => (
              <div
                key={feature.name}
                className="border-t border-gray-200 pt-4"
                ref={el => featuresRef.current[idx] = el}
              >
                <dt className="text-lg  font-semibold text-gray-700 sm:text-xl">
                  <h3>{feature.name}</h3>
                </dt>
                <dd className="mt-2 text-default-400">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Carrusel animado */}
        <div ref={carruselRef} className="flex justify-end w-full">
          <div className="w-full">
            <CarruselesComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
