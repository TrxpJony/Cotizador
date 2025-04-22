import { useState, useEffect } from "react";
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

const baseUrl = import.meta.env.VITE_API_URL + "/api/blog-images";

const Blog = () => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [images, setImages] = useState([]);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false); // Estado para controlar la visibilidad del calendario
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

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
                let fetchedImages = response.data.map(img => img.secure_url);

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
            {/* Sección del encabezado con fondo dinámico */}
            <div className="relative w-full h-96 overflow-hidden">
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

            <hr className="border-t-1 border-black mx-auto max-w-7xl w-full mt-10" />

            <div className="min-h-screen relative">
                <div className="container mx-auto mb-4 max-w-7xl">
                    {/* Barra de búsqueda con diseño mejorado */}
                    <div className="mt-10">
                        <input
                            type="text"
                            placeholder="Buscar posts..."
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row py-4 justify-center gap-4 sm:gap-8">
                        <button
                            className={`border border-black py-1 px-2 rounded-2xl hover:bg-black hover:text-white transition-all w-full sm:w-auto ${selectedCategory === "" && !selectedDate ? "bg-black text-white" : ""
                                }`}
                            onClick={() => handleCategoryFilter("")}
                        >
                            <MdOutlineDensitySmall />
                        </button>
                        <button
                            className={`border border-black py-1 px-4 sm:px-10 rounded-2xl hover:bg-black hover:text-white transition-all w-full sm:w-auto ${selectedCategory === "Regalos" ? "bg-black text-white" : ""
                                }`}
                            onClick={() => handleCategoryFilter("Regalos")}
                        >
                            Regalos
                        </button>
                        <button
                            className={`border border-black py-1 px-4 sm:px-10 rounded-2xl hover:bg-black hover:text-white transition-all w-full sm:w-auto ${selectedCategory === "Eventos" ? "bg-black text-white" : ""
                                }`}
                            onClick={() => handleCategoryFilter("Eventos")}
                        >
                            Eventos
                        </button>
                        <button
                            className={`border border-black py-1 px-4 sm:px-10 rounded-2xl hover:bg-black hover:text-white transition-all w-full sm:w-auto ${selectedCategory === "Salidas" ? "bg-black text-white" : ""
                                }`}
                            onClick={() => handleCategoryFilter("Salidas")}
                        >
                            Salidas
                        </button>
                        <button
                            className={`border border-black py-1 px-4 sm:px-10 rounded-2xl hover:bg-black hover:text-white transition-all w-full sm:w-auto ${selectedCategory === "Premios" ? "bg-black text-white" : ""
                                }`}
                            onClick={() => handleCategoryFilter("Premios")}
                        >
                            Premios
                        </button>
                        <div className="relative">
                            <button
                                className="border border-black py-2 px-2 rounded-2xl hover:bg-black hover:text-white transition-all w-full sm:w-auto flex items-center justify-center"
                                onClick={() => setIsCalendarOpen(!isCalendarOpen)} // Alternar visibilidad del calendario
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

                    {/* Tarjetas con mejor diseño */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
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
        </>
    );
};

export default Blog;