import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function animateBlogContent(container) {
    gsap.from(".blog-bg", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: -50,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2,
    });
    gsap.from(".blog-hr", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        x: 50,
        duration: 0.8,
        ease: "power2.out",
        scale: 0.8,
        delay: 0.2
    });
    gsap.from(".blog-filter", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.4,
        delay: 0.2
    });
};

export function animateBlogHero(container) {
    gsap.from(".hero-text", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.inOut",
        delay: 0.2,
        scale: 0.9,
        stagger: 0.2
    });
    gsap.from(".hero-p", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: -50,
        duration: 0.8,
        ease: "power2.inOut",
        delay: 0.4,
        scale: 0.9
    });
};

export function animateBlogPost(container) {
    gsap.from(".hero-post", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 0.1,
        ease: "power2.inOut",
        scale: 0.9,
        stagger: 0.2,
    });
}