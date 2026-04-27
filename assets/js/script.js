window.addEventListener('touchmove', handleTouch, { passive: true});
const navToggle = document.getElementById('nav-toggle');

navToggle.addEventListener('change',() => {
    if (navToggle.checked) {
        document.body.classList.add('is-active');
    }else {
        document.body.classList.remove('is-active');
    }
});