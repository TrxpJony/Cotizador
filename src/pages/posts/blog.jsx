import { useState, useEffect } from "react";
import axios from "axios";
import PostText from "../../components/post/postText";
import PostVa from "../../components/post/postVa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

const baseUrl = import.meta.env.VITE_API_URL + "/api/blog-images";

const Blog = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [images, setImages] = useState([]);

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
                                    ></div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>
                <div className="relative z-10 w-full h-96 flex items-center justify-center bg-black/50">
                    <PostText />
                </div>
            </div>

            <div className="min-h-screen relative">
                <div className="container mx-auto p-4 mb-4 max-w-7xl">
                    {/* Barra de búsqueda con diseño mejorado */}
                    <div className="py-10 ">
                        <input
                            type="text"
                            placeholder="Buscar posts..."
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>

                    {/* Tarjetas con mejor diseño */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        <PostVa searchTerm={searchTerm} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Blog;