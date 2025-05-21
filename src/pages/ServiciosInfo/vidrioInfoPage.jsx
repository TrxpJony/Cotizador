import { useEffect, useRef } from "react";
import VidrioDescription from "../../components/serviciosPage/serviciosInfoPages/vidrioInfoPage/vidrioDesctiption";
import VidrioFAQ from "../../components/serviciosPage/serviciosInfoPages/vidrioInfoPage/vidrioFAQ";
import VidrioHero from "../../components/serviciosPage/serviciosInfoPages/vidrioInfoPage/vidrioHero";
import VidrioImagenes from "../../components/serviciosPage/serviciosInfoPages/vidrioInfoPage/vidrioImagenes";
import VidrioServicios from "../../components/serviciosPage/serviciosInfoPages/vidrioInfoPage/vidrioServicios";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VidrioInfoPage = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            ScrollTrigger.refresh();
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="mx-auto max-w-7xl w-full px-5 sm:px-8 md:px-14 lg:px-5 mb-16">
            <div className="mb-20 sm:mb-40">
                <VidrioHero />
            </div>

            <div className="mb-20 sm:mb-40">
                <VidrioImagenes />
            </div>

            <div className="mb-20 sm:mb-40">
                <VidrioDescription />
            </div>

            <div className="mb-20 sm:mb-40">
                <VidrioServicios />
            </div>

            <VidrioFAQ />
        </div>
    );
};

export default VidrioInfoPage;