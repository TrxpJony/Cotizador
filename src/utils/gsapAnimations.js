// animations.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

//Animaciones del Hero de vidrios
export function animateVidrioHero(container) {
    gsap.from(".hero-title", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power3.out",
    });

    gsap.from(".hero-desc", {
        scrollTrigger: {
            trigger: container,
            start: "top 75%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 30,
        delay: 0.5,
        duration: 1,
        ease: "power2.out",
    });

    gsap.from(".btn-container", {
        scrollTrigger: {
            trigger: container,
            start: "top 70%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        x: -50,
        delay: 1,
        duration: 0.8,
        ease: "circ.inOut"
    });

    gsap.from(".hero-btn", {
        scrollTrigger: {
            trigger: container,
            start: "top 70%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        scale: 0.8,
        delay: 1.5,
        duration: 0.8,
        ease: "back.out(1.7)",
    });

    gsap.from(".hero-img", {
        scrollTrigger: {
            trigger: container,
            start: "top 75%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        x: 100,
        delay: 0.8,
        duration: 1,
        ease: "power2.out",
    });

    gsap.from(".benefit-container", {
        scrollTrigger: {
            trigger: container,
            start: "top 75%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
        delay: 1,
    });

    gsap.from(".benefit", {
        scrollTrigger: {
            trigger: container,
            start: "top 75%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.in",
        stagger: 0.2,
        delay: 1.5,
    });
};

//Animaciones de imagenes de hero
export function animateVidrioImagenes(container) {
    gsap.from(".img-container", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
    });

    gsap.from(".img-title", {
        scrollTrigger: {
            trigger: container,
            start: "top 78%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.5
    });

    gsap.from(".img-desc", {
        scrollTrigger: {
            trigger: container,
            start: "top 76%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out",
        delay: 0.8,
    });

    gsap.from(".img-images", {
        scrollTrigger: {
            trigger: container,
            start: "top 74%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2,
        delay: 1
    });
};

export function animateVidrioDescription(container) {
    gsap.from(".desc-title", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        x: 30,
        duration: 1,
        ease: "power3.Out"
    });
    gsap.from(".desc-desc", {
        scrollTrigger: {
            trigger: container,
            start: "top 78%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        x: 30,
        delay: 0.5,
        duration: 1,
        ease: "power2.out",
    });
    gsap.from(".desc-img", {
        scrollTrigger: {
            trigger: container,
            start: "top 76%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        x: -30,
        delay: 0.8,
        duration: 1,
        ease: "power2.out",
    });
    gsap.from(".desc-map", {
        scrollTrigger: {
            trigger: container,
            start: "top 76%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: -30,
        stagger: 0.2,
        delay: 1,
        ease: "power2.out"
    });
    gsap.from(".desc-map-content", {
        scrollTrigger: {
            trigger: container,
            start: "top 74%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: -30,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2,
        delay: 1,
    });
};

export function animateVidrioServicios(container) {
    gsap.from(".servicios-title", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power3.out",
    });
    gsap.from(".servicios-desc", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 30,
        delay: 0.5,
        duration: 1,
        ease: "power2.out",
    });
    gsap.from(".servicios-servio-card", {
        scrollTrigger: {
            trigger: container,
            start: "top 78%",
            toggleActions: "play none none none"
        },
        x: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.8,
    });
    gsap.from(".servicios-servicios", {
        scrollTrigger: {
            trigger: container,
            start: "top 76%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 1,
        stagger: 0.2,
    })
} 
