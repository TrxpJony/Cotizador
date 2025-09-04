import { useState, useEffect, useRef, useLayoutEffect } from "react";
import axios from "axios";
import PostText from "../../components/post/postText";
import PostVa from "../../components/post/postVa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import { MdOutlineDensitySmall, MdCalendarMonth } from "react-icons/md"
import { Calendar } from "@heroui/react";
import { parseDate } from "@internationalized/date";
import { Pagination } from "@heroui/react";// Importa Pagination aquí
import { Helmet } from "react-helmet-async";
import gsap from "gsap";
import { animateBlogContent } from "../../utils/homeAnimation/gsapAnimationBlog";

const baseUrl = import.meta.env.VITE_API_URL + "/api/blog-images";

const Blog = () => {
    const containerRef = useRef(null);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [images, setImages] = useState([]);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false); // Estado para controlar la visibilidad del calendario
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            animateBlogContent(containerRef.current); //<-- pasa la referencia aqui
        }, containerRef);
        return () => ctx.revert();
    }, []);

    // Para filtrar y paginar los posts, necesitamos obtener la lista filtrada aquí
    // Creamos un estado para guardar la cantidad total de posts filtrados
    const [filteredCount, setFilteredCount] = useState(0);

    // Handler para actualizar el número total de posts filtrados desde PostVa
    const handleFilteredCount = (count) => {
        setFilteredCount(count);
    };

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(baseUrl);
                let fetchedImages = response.data;

                // Si hay menos de 2 imágenes, duplicarlas para evitar el error de Swiper
                if (fetchedImages.length === 1) {
                    fetchedImages = [...fetchedImages, ...fetchedImages];
                }
                setImages(fetchedImages);
            } catch (error) {
                console.error("Error cargando imágenes de Cloudinary", error);
            }
        };
        fetchImages();
    }, []);

    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
        setSelectedDate(null); // Resetear la fecha al filtrar por categoría
    };

    const handleDateFilter = (date) => {
        setSelectedDate(date);
        setSelectedCategory(""); // Resetear la categoría al filtrar por fecha
        setIsCalendarOpen(false); // Cerrar el calendario después de seleccionar una fecha
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    return (
        <>
            <Helmet>
                <title>Vidrio al Arte SAS | Blog </title>
                <meta name="description" content="Blog de Vidrio al Arte SAS: Inspírate con ideas, consejos y novedades sobre vidrio, aluminio y decoración. Descubre tendencias, proyectos, regalos personalizados y soluciones innovadoras para tu hogar o negocio en Colombia." />
                <meta name="keywords" content="blog vidrio, blog aluminio, decoración, tendencias vidrio, regalos personalizados, proyectos vidrio, Vidrio al Arte SAS, Colombia" />
            </Helmet>
            {/* Sección del encabezado con fondo dinámico */}
            <div ref={containerRef}>
                <div className="blog-bg relative w-full h-96 overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        {images.length > 0 && (
                            <Swiper
                                spaceBetween={0}
                                slidesPerView={1}
                                loop={true}
                                autoplay={{ delay: 5000, disableOnInteraction: false }}
                                effect="fade"
                                modules={[Autoplay, EffectFade]}
                                className="w-full h-full"
                            >
                                {images.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <div
                                            className="w-full h-96 bg-cover bg-center"
                                            style={{ backgroundImage: `url(${image})` }}
                                        >

                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                    </div>
                    <div className="relative z-10 w-full h-96 flex items-center justify-center bg-black/50">
                        <PostText />
                    </div>
                </div>

                <hr className="blog-hr border-t-1 border-black mx-auto max-w-7xl w-full mt-10 px-6 sm:px-0" />

                <div className="min-h-screen relative px-6 sm:px-0">
                    <div className="container mx-auto mb-4 max-w-7xl">
                        {/* Barra de búsqueda con diseño mejorado */}
                        <div className="mt-10 blog-filter">
                            <input
                                type="text"
                                placeholder="Buscar publicación..."
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>

                        <div className="blog-filter w-full overflow-x-auto ">
                            <div className="flex flex-nowrap sm:flex-wrap py-4 justify-start sm:justify-center gap-4 sm:gap-8 px-2">
                                <button
                                    className={`border border-black py-1 px-2 rounded-2xl hover:bg-black hover:text-white transition-all flex-shrink-0 ${selectedCategory === "" && !selectedDate ? "bg-black text-white" : ""}`}
                                    onClick={() => handleCategoryFilter("")}
                                >
                                    <MdOutlineDensitySmall />
                                </button>
                                <button
                                    className={`border border-black py-1 px-4 sm:px-10 rounded-2xl hover:bg-black hover:text-white transition-all flex-shrink-0 ${selectedCategory === "Regalos" ? "bg-black text-white" : ""}`}
                                    onClick={() => handleCategoryFilter("Regalos")}
                                >
                                    Regalos
                                </button>
                                <button
                                    className={`border border-black py-1 px-4 sm:px-10 rounded-2xl hover:bg-black hover:text-white transition-all flex-shrink-0 ${selectedCategory === "Eventos" ? "bg-black text-white" : ""}`}
                                    onClick={() => handleCategoryFilter("Eventos")}
                                >
                                    Eventos
                                </button>
                                <button
                                    className={`border border-black py-1 px-4 sm:px-10 rounded-2xl hover:bg-black hover:text-white transition-all flex-shrink-0 ${selectedCategory === "Salidas" ? "bg-black text-white" : ""}`}
                                    onClick={() => handleCategoryFilter("Salidas")}
                                >
                                    Salidas
                                </button>
                                <button
                                    className={`border border-black py-1 px-4 sm:px-10 rounded-2xl hover:bg-black hover:text-white transition-all flex-shrink-0 ${selectedCategory === "Premios" ? "bg-black text-white" : ""}`}
                                    onClick={() => handleCategoryFilter("Premios")}
                                >
                                    Premios
                                </button>
                                <div className="relative flex-shrink-0">
                                    <button
                                        className="border  border-black py-2 px-2 rounded-2xl hover:bg-black hover:text-white transition-all flex items-center justify-center"
                                        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                                    >
                                        <MdCalendarMonth />
                                    </button>
                                    {isCalendarOpen && (
                                        <div className="absolute mt-2 z-50 bg-transparent rounded-lg p-2">
                                            <Calendar
                                                aria-label="Seleccionar fecha"
                                                value={selectedDate ? parseDate(selectedDate.toISOString().split('T')[0]) : null}
                                                onChange={(date) => handleDateFilter(date.toDate("UTC"))}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Tarjetas con mejor diseño */}
                        <div className="blog-filter grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            <PostVa
                                searchTerm={searchTerm}
                                selectedCategory={selectedCategory}
                                selectedDate={selectedDate}
                                currentPage={currentPage}
                                itemsPerPage={itemsPerPage}
                                onFilteredCount={handleFilteredCount}
                            />
                        </div>
                        <div className="flex justify-center mt-6">
                            <Pagination
                                showControls
                                classNames={{
                                    base: "",
                                    wrapper: "",
                                    prev: "bg-white",
                                    next: "bg-white",
                                    item: "bg-transparent ",
                                    cursor: "bg-cyan-500"
                                }}
                                initialPage={1}
                                page={currentPage}
                                total={Math.ceil(filteredCount / itemsPerPage)}
                                onChange={(page) => {
                                    setCurrentPage(page);
                                    window.scrollTo(0, 0);
                                }}
                                color="primary"
                            />
                        </div>
                        {/* aqui paginacion */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Blog;