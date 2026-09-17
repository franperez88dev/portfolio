const themeSwitch = document.documentElement;
const botonSwitch = document.querySelector('.switchTheme');

botonSwitch.addEventListener('click', function() {
    if (themeSwitch.getAttribute('data-theme') == 'light') {
        themeSwitch.setAttribute('data-theme', 'dark');
        botonSwitch.textContent = '☀️';
    } else {
        themeSwitch.setAttribute('data-theme', 'light');
        botonSwitch.textContent = '🌙';
    }
});

document.querySelectorAll('*').forEach(el => {
    if (el.scrollWidth > document.documentElement.clientWidth) {
        console.log(el, el.scrollWidth);
    }
});