import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export function animateNuestrosContent(container) {
    gsap.from(".nuestros-title", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        y:60,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }),
    gsap.from(".nuestros-desc", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out"
    }),
    gsap.from(".nuestros-links", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0, 
        duration: 1,
        delay: 0.6,
        ease: "power3.out",
    }),
    gsap.from(".nuestros-img", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        y: 40,
        opacity: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.18,
        delay: 1,
        ease: "power3.out"
    })
};

export function animateProductosContent(container) {
    gsap.fromTo(".productos-title", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none",
        },
        y: 60, 
        opacity: 0, 
        duration: 1, 
        ease: "power3.out"
    }),
    gsap.fromTo(".productos-desc", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out"
    }),
    gsap.fromTo(".productos-feature", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0,
        duration:0.7,
        stagger: 0.15,
        delay: 0.6,
        ease: "power3.out"
    }),
    gsap.fromTo(".productos-carrusel", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        delay: 1.2,
        ease: "elastic.out(1, 0.6)"
    })
}