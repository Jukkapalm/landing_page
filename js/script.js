document.addEventListener('DOMContentLoaded', function () {

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