// Otetaan käyttöön GSAP-lisäosa rullausanimaatioita varten
gsap.registerPlugin(ScrollTrigger);

// Koodi suoritetaan kun sivu on latautunut
document.addEventListener('DOMContentLoaded', function () {

    // Hero osion animaatiot
    const heroTl = gsap.timeline();
    
    // Asetetaan banneri näkyväksi (ettei vilahtele alussa) koska tämä on css tiedostossa opacity 0
    gsap.set(".hero-banneri", { visibility: "visible" });

    // Luodaan timeline animaatio bannerin elementeille
    heroTl
        .to(".hero-banneri h1", { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" })
        .to(".hero-banneri p", { x: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.8")
        .to(".btn-primary-custom, .btn-secondary-custom", { scale: 1, opacity: 1, duration: 0.5, stagger: 0.2, ease: "back.out(1.7)" }, "-=0.5")
        .to(".hero-img", { x: 0, opacity: 1, duration: 1.5, ease: "power2.out" }, "-=1");

        // Teknologia badget animaatio, badget tulevat näkyviin kun käyttäjä rullaa teknologiat osioon
    gsap.to(".tech-badge", { scrollTrigger: { trigger: "#teknologiat", start: "top 90%" }, opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" });

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

    // Taustan kelluvat koodin pätkät
    const bg = document.getElementById("code-background");

    // Lista kelluvista koodin pätkistä
    const codeSnippets = ['<div>', '</div>', '() => { }', 'id="main-content"', '<div class="container">', '@media (min-width: 992px)', 'const x = () => {}', 'display: flex;', 'z-index: 999;', 'foreach($a)', '$_GET["id"]', 'for i in x:'];

    // Koodin pätkien määrä ruudun koon mukaan
    const count = window.innerWidth < 768 ? 4 : 7;

    // Luodaan kelluvat koodit silmukalla
    for (let i = 0; i < count; i++) {
        const span = document.createElement("span");
        span.className = "floating-code";
        span.innerText = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        bg.appendChild(span);

        // Arvotaan satunnainen aloituspiste ruudulta
        let x = Math.random() * (window.innerWidth - 100);
        let y = Math.random() * (window.innerHeight - 50);
        
        // Asetetaan alkupiste heti
        span.style.left = x + "px";
        span.style.top = y + "px";

        // Arvotaan liikenopeus, suunta ja kiertokulma
        let dx = (Math.random() - 0.5) * 1;
        let dy = (Math.random() - 0.5) * 1;
        let rotation = Math.random() * 360;

        // Animaatiofunktio joka pyörii jatkuvasti
        function animate() {
            
            // Luetaan nukyinen sijainti tekstistä numeroksi
            let currentTop = parseFloat(span.style.top);
            let currentLeft = parseFloat(span.style.left);

            // Törmäystarkistus, jos osuu reunaan, käännetään suunta
            if (currentLeft <= 0 || currentLeft >= window.innerWidth - 80) dx *= -1;
            if (currentTop <= 0 || currentTop >= window.innerHeight - 30) dy *= -1;

            // Päivitetään elementin paikka ja pyöritys
            span.style.left = (currentLeft + dx) + "px";
            span.style.top = (currentTop + dy) + "px";
            rotation += 0.1;
            span.style.transform = `rotate(${rotation}deg)`;

            // Pyydetään selainta ajamaan animaatio seuraavassa framessa
            requestAnimationFrame(animate);
        }
        // Käynnistetään animaatio
        animate();
    }

    // ScrollSpy toiminto
    // Haetaan kaikki sectionit, joilla on ID
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".sidebar-nav .nav-link, #mobileMenu .nav-link");

    sections.forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: "top 30%",
            end: "bottom 30%",
            onToggle: (self) => {
                if (self.isActive) {
                    activateLink(section.getAttribute("id"));
                }
            }
        });
    });

    function activateLink(id) {
        // Poistetaan active luokka kaikilta linkeiltä
        navLinks.forEach(link => {
            link.classList.remove("active");
        });

        const activeLinks = document.querySelectorAll(`a[href="#${id}"]`);
        activeLinks.forEach(link => {
            link.classList.add("active");
        })
    }
});