import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function animateAluminioHero(container) {
    gsap.from(".aluminio-hero-title", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none "
        },
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power2.out",
    })
 }