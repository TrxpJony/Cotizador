import { useState } from "react"; 
import CompareImage from "react-compare-image";
import { Pagination } from "@heroui/react";

const itemsPerPage = 3;

const testimonials = [
  {
    id: 1,
    title: "Instalación de Espejo Asimétrico",
    description: "Montaje de un espejo moderno en baño residencial.",
    before: "https://uploads.codesandbox.io/uploads/user/1120444e-ad0a-4e92-b2a4-75a2e23d94e1/s2FV-schilthorn-3033448_960_720.webp",
    after: "https://uploads.codesandbox.io/uploads/user/1120444e-ad0a-4e92-b2a4-75a2e23d94e1/Sii3-hut-1681485_960_720.webp",
  },
  {
    id: 2,
    title: "Cambio de Ventanal Panorámico",
    description: "Reemplazo de un ventanal antiguo por vidrio templado de alta resistencia.",
    before: "",
    after: "",
  },
  {
    id: 3,
    title: "Puerta Cocina",
    description: "Instalación de una puerta moderna de vidrio templado.",
    before: "/images/before2.jpg",
    after: "/images/after2.jpg",
  },
];

const Testimonials = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedItems = testimonials.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="py-10 bg-gray-100">
      <div className="text-center">
        <p className="text-4xl font-semibold text-gray-700">Proyectos</p>
        <p className="mt-2 text-lg text-gray-600">Algunos de nuestros trabajos recientes</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-10 max-w-6xl mx-auto">
        {selectedItems.map((project) => (
          <article 
            key={project.id} 
            className="flex flex-col items-start bg-white shadow-lg rounded-lg overflow-hidden"
          >
            {/* Sección de imagen */}
            <div className="w-full flex items-center justify-center bg-gray-200">
              <CompareImage 
                leftImage={project.before} 
                rightImage={project.after} 
                className="object-cover"
              />
            </div>

            {/* Sección de contenido */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{project.description}</p>
            </div>
          </article>
        ))}
      </div>
      
      <div className="flex justify-center mt-6">
        <Pagination
          initialPage={1}
          page={currentPage}
          total={Math.ceil(testimonials.length / itemsPerPage)}
          onChange={(page) => setCurrentPage(page)}
          color="primary"
        />
      </div>
    </section>
  );
};

export default Testimonials;
