import "keen-slider/keen-slider.min.css";
import PropTypes from 'prop-types';
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useKeenSlider } from "keen-slider/react";

const imageGroups = [
    [
        "https://res.cloudinary.com/dtxmsbsjd/image/upload/v1742225947/carrusel/gusqg3uomrdzto0qjnw6.png",
        "https://res.cloudinary.com/dtxmsbsjd/image/upload/v1742225947/carrusel/walaaeds9whokr4dpqtl.png",
        "https://res.cloudinary.com/dtxmsbsjd/image/upload/v1742225948/carrusel/mzwh8i6zitdlro9kcwsl.png",
        "https://res.cloudinary.com/dtxmsbsjd/image/upload/v1742225950/carrusel/zgf36vwcfdqlmbsigvav.png"
    ],
    [
        "https://res.cloudinary.com/dtxmsbsjd/image/upload/v1742225952/carrusel/kqnqfpq4n9r0ilunvvai.png",
        "https://res.cloudinary.com/dtxmsbsjd/image/upload/v1742225952/carrusel/czovjmeghsqjur2scrog.png",
        "https://res.cloudinary.com/dtxmsbsjd/image/upload/v1742225951/carrusel/n5qjndqvyydyxrfufilz.png",
        "https://res.cloudinary.com/dtxmsbsjd/image/upload/v1742225949/carrusel/kn6sthkzhhpkdk2tz29h.png"
    ],
    [
        "https://res.cloudinary.com/dtxmsbsjd/image/upload/v1742225953/carrusel/kmyr9nojp7fslnsjz87v.png",
        "https://res.cloudinary.com/dtxmsbsjd/image/upload/v1742225951/carrusel/jbcwq3mj1nnslj7iphth.png",
        "https://res.cloudinary.com/dtxmsbsjd/image/upload/v1742225950/carrusel/orol9go6xsnfyynu7njn.png",
        "https://res.cloudinary.com/dtxmsbsjd/image/upload/v1742225948/carrusel/tmdgltvt6tsdade5m7mn.png"
    ],
    [
        "https://res.cloudinary.com/dtxmsbsjd/image/upload/v1742227120/carrusel/mau83xazezvkfrii7ahw.png",
        "https://res.cloudinary.com/dtxmsbsjd/image/upload/v1742227120/carrusel/bamb4gcxqtsswohwjzfb.png",
        "https://res.cloudinary.com/dtxmsbsjd/image/upload/v1742227120/carrusel/ztmuznc7m0oko7aigq6c.png",
        "https://res.cloudinary.com/dtxmsbsjd/image/upload/v1742227120/carrusel/nn05sfhhziqcqfmeabej.png"
    ]
];

const ImageCarousel = ({ images }) => {
    const [sliderRef] = useKeenSlider({
        loop: true,
        slides: images.length,
        duration: 3000, // transición más lenta
        drag: false,
        easing: (t) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t, // easeInOut
        created(slider) {
            setInterval(() => {
                slider.next();
            }, 5000);
        }
    });

    return (
        <div ref={sliderRef} className="keen-slider rounded-2xl">
            {images.map((img, index) => (
                <div className="keen-slider__slide" key={index}>
                    <img className="mx-auto rounded-2xl w-full h-auto" src={img} alt={`Slide ${index}`} />
                </div>
            ))}
        </div>
    );
};

const CarruselesComponent = () => {
    const carruselRefs = useRef([]);
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
            carruselRefs.current.forEach((el, i) => {
                gsap.fromTo(
                    el,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        delay: i * 0.3,
                        ease: "power2.out"
                    }
                );
            });
        }
    }, [isVisible]);

    return (
        <>
            <div
                ref={gridRef}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
                {imageGroups.map((images, index) => (
                    <div
                        key={index}
                        className="shadow-md rounded-2xl"
                        ref={el => (carruselRefs.current[index] = el)}
                        style={{ opacity: 0 }}
                    >
                        <ImageCarousel images={images} />
                    </div>
                ))}
            </div>
        </>
    );
};

ImageCarousel.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CarruselesComponent;

