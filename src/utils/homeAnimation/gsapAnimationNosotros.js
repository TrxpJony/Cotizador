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

export function GoogleMapAnimations(container) {
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
};

export function AnimationFormContact(container) {
    gsap.from(".form-contact-text", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.inOut",
        delay: 0.2,
        stagger: 0.2,
    });
    gsap.from(".form-contact-label", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.in",
        stagger: 0.2,
        scale: 0.8,
        delay: 0.4
    });
    gsap.from(".form-contact-inputs", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.in",
        stagger: 0.2,
        delay: 0.6
    });
    gsap.from(".form-contact-button", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        scale: 0.9,
        duration: 0.8,
        ease: "power2.in",
        delay: 1.8
    });
};

export function AnimateInfoContact(container) {
    gsap.from(".info-contact-title", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        x: 50,
        duration: 1,
        ease: "power2.inOut",
        scale: 0.8
    });
    gsap.from(".info-contact-text", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        x: 40,
        duration: 1,
        stagger: 0.2,
        ease: "power2.inOut",
        delay: 0.2
    });
    gsap.from(".info-contact-contact", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        x: 30,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.8
    })
    gsap.from(".info-contact-icons", {
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
        delay: 1
    });
}