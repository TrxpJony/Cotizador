import gsap from "gsap";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

export function animateAluminioHero(container) {
    gsap.from(".aluminio-heroi-img", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none",
        },
        opacity: 0,
        x: 50,
        ease: "power2.in",
        duration: 0.8,
    })
    gsap.from(".aluminio-hero-up", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none "
        },
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power2.out",
        scale: 0.8,
    })
    gsap.from(".aluminio-hero-text", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none "
        },
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power2.out",
        delay: 0.2,
        stagger: 0.2
    });
    gsap.from(".aluminio-hero-button", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none "
        },
        opacity: 0,
        duration: 1,
        x: -50,
        ease: "power2.out",
        delay: 0.6,
        scale: 0.8,
    });
};

export function animateAluminioAbout(container) {
    gsap.from(".aluminio-about-text", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none",
        },
        opacity: 0,
        duration: 1,
        ease: "power2.in",
        x: -50,
        stagger: 0.2
    });
    gsap.from(".aluminio-card-container", {
        scrollTrigger: {
            trigger: container,
            start: "top 76%",
            toggleActions: "play none none none",
        },
        opacity: 0,
        duration: 0.8,
        ease: "power2.in",
        y: 30,
        stagger: 0.2,
        delay: 0.4,
    });
    gsap.from(".aluminio-card-logo", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none",
        },
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        x: -30,
        scale: 0.8,
        stagger: 0.2,
        delay: 0.6,
    });
    gsap.from(".aluminio-card-text", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none",
        },
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        y: -30,
        stagger: 0.2,
        delay: 0.8,
    });
    gsap.from(".aluminio-card-button", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none",
        },
        opacity: 0,
        duration: 1,
        ease: "power2.in",
        y: 30,
        scale: 0.5,
        delay: 1.4,
    });
};

export function animateAluminioGalery(container) {
    gsap.from(".aluminio-galery-text", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none",
        },
        opacity: 0,
        duration: 1,
        ease: "power2.in",
        x: -50,
        stagger: 0.2
    });
    gsap.from(".aluminio-galery-img", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none",
        },
        opacity: 0,
        duration: 1,
        y: 50,
        ease: "power2.in",
        stagger: 0.2,
        delay: 0.4,
    });
    gsap.from(".aluminio-galery-imgtext", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none",
        },
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        y: 50,
        stagger: 0.2,
        delay: 0.6,
    })
}