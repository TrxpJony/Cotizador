import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import '../../../../css/carrusel.css'
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { Image } from "@heroui/react";
import gsap from 'gsap';
import { useLayoutEffect, useRef } from 'react';
import { AnimateEspejosCarrusel } from '../../../../utils/serviciosAnimations/gsapAnimationEpejos';

const EspejosCarruselPage = () => {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            AnimateEspejosCarrusel(containerRef.current); // <-- Pase la referencia aqui
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <>
            <div ref={containerRef}>
                <div className="hero-carrusel max-w-5xl mx-auto px-6 sm:mb-3">

                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        spaceBetween={30}
                        initialSlide={2}
                        slidesPerView={3} // Valor por defecto
                        breakpoints={{
                            0: {
                                slidesPerView: 1.5,
                            },
                            640: {
                                slidesPerView: 2,
                            },
                            768: {
                                slidesPerView: 3,
                            },
                        }}
                        coverflowEffect={{
                            rotate: 30,
                            stretch: 10,
                            depth: 120,
                            modifier: 1,
                            slideShadows: false,
                        }}
                        modules={[EffectCoverflow, Pagination]}
                        className="Swiperespejos mySwiper rounded-2xl"
                    >
                        <SwiperSlide>
                            <Image
                                isBlurred
                                alt="HeroUI Album Cover"
                                className="rounded-2xl"
                                src="https://res.cloudinary.com/dtxmsbsjd/image/upload/v1745681359/carrusel/euuontwwmbd7t2sr0uho.png"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image
                                isBlurred
                                alt="HeroUI Album Cover"
                                className="rounded-2xl"
                                src="https://res.cloudinary.com/dtxmsbsjd/image/upload/v1745681360/carrusel/qyl7uypz82kbsyfao0bj.png"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image
                                isBlurred
                                alt="HeroUI Album Cover"
                                className="rounded-2xl"
                                src="https://res.cloudinary.com/dtxmsbsjd/image/upload/v1745681359/carrusel/cydxqygddkixgv89uv70.png"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image
                                isBlurred
                                alt="HeroUI Album Cover"
                                className="rounded-2xl"
                                src="https://res.cloudinary.com/dtxmsbsjd/image/upload/v1745681359/carrusel/qwd0jv4mgnlqk6vsvpp3.png"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image
                                isBlurred
                                alt="HeroUI Album Cover"
                                className="rounded-2xl"
                                src="https://res.cloudinary.com/dtxmsbsjd/image/upload/v1745681359/carrusel/wxm6ywwviysm42aeg6j5.png"
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </>
    );
};
export default EspejosCarruselPage;