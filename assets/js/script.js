window.addEventListener('touchmove', handleTouch, { passive: true});
const navToggle = document.getElementById('nav-toggle');

function handleTouch(e) {
    if(navToggle.checked) {
        e.preventDefault();
    }
}

window.addEventListener('touchmove',handleTouch,{passive: false});

navToggle.addEventListener('change', () => {
    if (navToggle.checked) {
        document.body.classList.add('is-active');
    }else {
        document.body.classList.remove('is-active');
    }
});