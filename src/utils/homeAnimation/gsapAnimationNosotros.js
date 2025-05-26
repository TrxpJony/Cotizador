import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function AnimateNosotrosMision(container) {
    gsap.from(".mision-vidrio", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.inOut",
        scale: 0.8
    });
    gsap.from(".mision-images", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        scale: 1,
        duration: 1,
        ease: "power2.in",
        delay: 0.6
        ,
    })
    gsap.from(".mision-title", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.4,
        ease: "power2.inOut",
        delay: 0.2
    });
    gsap.from(".mision-text", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power2.inOut",
        delay: 0.4
    });
    gsap.from(".mision-icon", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        x: -50,
        delay: 0.6,
        stagger: 0.2,
        scale: 10,
    });
};

export function AnimateNosotrosOficinas(container) {
    gsap.from(".oficinas-ubicacion", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.inOut",
        scale: 0.8
    });
    gsap.from(".oficinas-container", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.in",
        stagger: 0.2,
    });
    gsap.from(".oficinas-titles", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power2.inOut",
        delay: 0.2
    });
    gsap.from(".oficinas-text", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        x: 20,
        duration: 1,
        stagger: 0.2,
        ease: "power2.in",
        delay: 0.4
    });
    gsap.from(".oficinas-images", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        scale: 1,
        duration: 1,
        x: 50,
        ease: "power2.inOut",
        stagger: 0.2,
        delay: 0.6,
    });
};

export function GoogleMapAnimations (container) {
    gsap.from(".google-map", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.in",
    });
}