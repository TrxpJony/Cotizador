import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import PropTypes from 'prop-types';

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

const ImageCarousel = ({ images }) => (
    <Carousel showThumbs={false} autoPlay infiniteLoop interval={5000}>
        {images.map((img, index) => (
            <div key={index}>
                <img src={img} alt={`Slide ${index}`} />
            </div>
        ))}
    </Carousel>
)

const CarruselesComponent = () => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {imageGroups.map((images, index) => (
                    <div key={index} className="p-2 border rounded-lg shadow-md ml-4">
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

