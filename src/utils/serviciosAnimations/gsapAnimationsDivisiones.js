// animations.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


export function animateDivisionesHero(sectionRef, textRef) {
    const ctx = gsap.context(() => {
        gsap.from(".hero-title", {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: "power3.in"
        });
        gsap.from(".hero-subtitle", {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.4,
            ease: "power3.in"
        });
        gsap.from(".hero-button", {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.6,
            ease: "power3.in"
        });

        gsap.to(textRef.current, {
            y: -120,
            opacity: 0,
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        });
    }, sectionRef);
    return ctx;
};

export function animateDivisionesDescription(container) {

    gsap.from(".description-container", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2,
    });
    gsap.from(".description-container-text", {
        scrollTrigger: {
            trigger: container,
            start: "top 78%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.in",
        stagger: 0.2,
    });
    gsap.from(".description-container-2", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        x: 50,
        delay: 0.8,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2,
    });
    gsap.from(".description-images", {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        delay: 1.2,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
    });
};

export function animateDivisionesGalery(container) {
    gsap.from(".galery-cards-img", {
        scrollTrigger: {
            trigger: container,
            start: "top 70%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power2.in",
    });
    gsap.from(".galery-title", {
        scrollTrigger: {
            trigger: container,
            start: "top 68%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
    });
    gsap.from(".galery-desc", {
        scrollTrigger: {
            trigger: container,
            start: "top 66%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        delay: 0.4,
        duration: 1,
        ease: "power2.out",
    });
    gsap.from(".galery-button", {
        scrollTrigger: {
            trigger: container,
            start: "top 66%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        x: 50,
        delay: 0.4,
        duration: 0.4,
        ease: "power2.in"
    });


    //card 2
    gsap.from(".galery-temp-img", {
        scrollTrigger: {
            trigger: container,
            start: "top 70%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        x: 50,
        duration: 1,
        ease: "power2.in",
    });
    gsap.from(".galery-temp-title", {
        scrollTrigger: {
            trigger: container,
            start: "top 68%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power3.out",
        delay: 1.2
    });
    gsap.from(".galery-temp-desc", {
        scrollTrigger: {
            trigger: container,
            start: "top 66%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        delay: 1.4,
        duration: 1,
        ease: "power2.out",
    });
    gsap.from(".galery-temp-button", {
        scrollTrigger: {
            trigger: container,
            start: "top 66%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        x: -50,
        delay: 1.4,
        duration: 0.4,
        ease: "power2.in"
    });
};

export function animateDivisionesSocial() {
    gsap.from(".social", {
        opacity: 0,
        duration: 1,
        x: 100,
        stagger: 0.4,
    })
}
