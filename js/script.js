gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function () {
    const heroTl = gsap.timeline();
    
    gsap.set(".hero-banneri", { visibility: "visible" });

    heroTl
        .to(".hero-banneri h1", {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out"
        })
        .to(".hero-banneri p", {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        }, "-=0.8")
        .to(".btn-primary-custom, .btn-secondary-custom", {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.2,
            ease: "back.out(1.7)"
        }, "-=0.5")
        .to(".hero-img", {
            x: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power2.out"
        }, "-=1");

    gsap.to(".tech-badge", {
        scrollTrigger: {
            trigger: "#teknologiat",
            start: "top 90%"
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
    });

    // Etsitään mobiilivalikon elementti ja kaikki sen sisällä olevat linkit
    const mobiiliValikko = document.getElementById('mobileMenu');
    const navLinkit = document.querySelectorAll('#mobileMenu .nav-link');

    // Alustetaan Boostrapin Collapse-toiminto kyseiselle elementille
    const bsCollapse = new bootstrap.Collapse(mobiiliValikko, {
        toggle: false
    });

    // Lisätään jokaiselle linkille kuuntelija
    navLinkit.forEach(function (linkki) {
        linkki.addEventListener('click', function () {

        
            if (mobiiliValikko.classList.contains('show')) {
                bsCollapse.hide();
            }
        });
    });
});