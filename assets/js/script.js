document.addEventListener('DOMContentLoaded', () => {

    const parts = [{
            id: '#header',
            url: 'header.html'
        },
        {
            id: '#footer',
            url: 'footer.html'
        }
    ];

    parts.forEach(part => {
        fetch(part.url)
            .then(Response => Response.text())
            .then(data => {
                const target = document.querySelector(part.id);
                if (target) {
                    target.innerHTML = data;
                    if (part.id === '#header') {
                        setupNav();
                    }
                }
            })
            .catch(error => console.log(`Error Loading ${part.url}$`, error));
    });

    function setupNav() {
        const navToggle = document.getElementById('nav-toggle');
        if (!navToggle) return;

        navToggle.addEventListener('change', () => {
            if (navToggle.checked) {
                document.body.classList.add('is-active');
            } else {
                document.body.classList.remove('is-active');
            }
        });

        window.addEventListener('touchmove', (e) => {
            if (navToggle.checked) {
                e.preventDefault();
            }
        }, {passive: false});
    }
});