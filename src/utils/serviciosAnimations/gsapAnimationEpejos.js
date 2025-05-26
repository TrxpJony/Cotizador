import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function AnimateEspejosHero(container) {

    gsap.from(".hero-acervid", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: -50,
        duration: 0.8,
        ease: "power2.out",
        scale: 0.8,
    });
    gsap.from(".hero-acervidtx", {
        scrollTrigger: {
            trigger: container,
            start: "top 78%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 10,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out",
    });
    gsap.from(".hero-tile", {
        scrollTrigger: {
            trigger: container,
            start: "top 76%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: "power2.out"
    });
    gsap.from(".hero-desc", {
        scrollTrigger: {
            trigger: container,
            start: "top 74%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: "power2.out"
    });
    gsap.from(".hero-link", {
        scrollTrigger: {
            trigger: container,
            start: "top 70%",
            toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 1,
        ease: "power2.out"
    });
};

export const AnimateEspejosCarrusel = (container) => {
    const slides = container.querySelectorAll(".swiper-slide");

    gsap.from(slides, {
        scrollTrigger: {
            trigger: container,
            start: "top 72%",
            toggleActions: "play none none none",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        delay: window.innerWidth <= 768 ? 0 : 0.8, // Sin delay en móvil
    });
};

export const AnimateEspejosDescription = (container) => {
    gsap.from(".desc-cards-img", {
        scrollTrigger: {
            trigger: container,
            start: "top 70%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        x: -50,
        duration: 1,
        stagger: 0.2,
        ease: "power2.in",
    });
    gsap.from(".desc-title", {
        scrollTrigger: {
            trigger: container,
            start: "top 70%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
    });
    gsap.from(".desc-desc", {
        scrollTrigger: {
            trigger: container,
            start: "top 70%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        delay: 0.4,
        duration: 1,
        ease: "power2.out",
    });
    gsap.from(".desc-button", {
        scrollTrigger: {
            trigger: container,
            start: "top 70%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        x: 50,
        delay: 0.6,
        duration: 0.8,
        ease: "power2.out",
        scale: 0.8,
    });


    //card 2
    gsap.from(".desc-desg-img", {
        scrollTrigger: {
            trigger: container,
            start: "top 70%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        x: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power2.in",
        delay: 0.8
    });
    gsap.from(".desc-desg-title", {
        scrollTrigger: {
            trigger: container,
            start: "top 70%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power3.out",
        delay: 1.2
    });
    gsap.from(".desc-desg-desc", {
        scrollTrigger: {
            trigger: container,
            start: "top 70%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        delay: 1.4,
        duration: 1,
        ease: "power2.out",
    });
    gsap.from(".desc-desg-button", {
        scrollTrigger: {
            trigger: container,
            start: "top 70%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        x: -50,
        delay: 1.4,
        duration: 0.8,
        ease: "power2.out",
        scale: 0.8,
    });
}