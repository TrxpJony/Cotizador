import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import '../../../../css/carrusel.css'
// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { Image } from "@heroui/react";

const EspejosCarruselPage = () => {
    return (
        <>
            <div className="max-w-5xl mx-auto px-6 sm:mb-3">

                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={3}
                    spaceBetween={30}
                    initialSlide={2} // Start with the center slide
                    coverflowEffect={{
                        rotate: 30,
                        stretch: 10,
                        depth: 120,
                        modifier: 1,
                        slideShadows: false,
                    }}
                    modules={[EffectCoverflow, Pagination]}
                    className="Swiperespejos mySwiper rounded-2xl "
                >
                    <SwiperSlide>
                        <Image
                            isBlurred
                            alt="HeroUI Album Cover"
                            className="rounded-2xl "
                            src="https://res.cloudinary.com/dtxmsbsjd/image/upload/v1745681359/carrusel/euuontwwmbd7t2sr0uho.png" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image
                            isBlurred
                            alt="HeroUI Album Cover"
                            className="rounded-2xl "
                            src="https://res.cloudinary.com/dtxmsbsjd/image/upload/v1745681360/carrusel/qyl7uypz82kbsyfao0bj.png" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image
                            isBlurred
                            alt="HeroUI Album Cover"
                            className="rounded-2xl "
                            src="https://res.cloudinary.com/dtxmsbsjd/image/upload/v1745681359/carrusel/cydxqygddkixgv89uv70.png" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image
                            isBlurred
                            alt="HeroUI Album Cover"
                            className="rounded-2xl "
                            src="https://res.cloudinary.com/dtxmsbsjd/image/upload/v1745681359/carrusel/qwd0jv4mgnlqk6vsvpp3.png" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image
                            isBlurred
                            alt="HeroUI Album Cover"
                            className="rounded-2xl "
                            src="https://res.cloudinary.com/dtxmsbsjd/image/upload/v1745681359/carrusel/wxm6ywwviysm42aeg6j5.png" />
                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    );
};
export default EspejosCarruselPage;