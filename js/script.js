const dials = document.querySelectorAll(".tv-dial");
const contents = document.querySelectorAll(".tv-content");
const slides = document.querySelectorAll(".project-slide");
const tvBg = document.getElementById("tv-bg");
const tvScreen = document.querySelector(".tv-screen");

let currentSlide = 0;
let slideInterval = null;
let tvOn = false;

/* =========================
   AUDIO CONFIGURATION
========================= */
const soundClick = new Audio('audio/click.wav');
const soundStatic = new Audio('audio/tv-static.wav');
soundClick.volume = 0.4;
soundStatic.volume = 0.3;

/* =========================
   SLIDESHOW PROJECTS
========================= */
function showSlide(index){
    slides.forEach(s => s.classList.remove("active"));
    if(slides[index]){
        slides[index].classList.add("active");
    }
}

function nextSlide(){
    currentSlide++;
    if(currentSlide >= slides.length){
        currentSlide = 0;
    }
    showSlide(currentSlide);
}

function startSlideshow(){
    stopSlideshow();
    slideInterval = setInterval(nextSlide, 4000);
}

function stopSlideshow(){
    clearInterval(slideInterval);
}

/* =========================
   CONTENIDO TV
========================= */
function showContent(target){
    contents.forEach(c => c.classList.remove("active"));
    const el = document.querySelector(`[data-content="${target}"]`);
    if(el){
        el.classList.add("active");
    }
}

/* =========================
   EVENTOS BOTONES (CON AUDIO UNIFICADO)
========================= */
dials.forEach(dial => {
    dial.addEventListener("click", () => {

        // Cualquier botón que toques hace "click"
        soundClick.currentTime = 0;
        soundClick.play();

        const target = dial.dataset.content;

        /* =====================
           BOTÓN ON / OFF
        ===================== */
        if(dial.classList.contains("dial-on")){
            tvOn = !tvOn;

            soundStatic.currentTime = 0;
            soundStatic.play();

            if(tvOn){
                // ENCENDER TV
                tvScreen.classList.add("tv-on");
                tvBg.classList.add("apagado-oculto");
                dial.textContent = "OFF";
                showContent("home");
                dials.forEach(d => d.classList.remove("active"));
                document.querySelector('.dial-1')?.classList.add("active");
            } else {
                // APAGAR TV
                tvScreen.classList.remove("tv-on");
                tvBg.classList.remove("apagado-oculto");
                dial.textContent = "ON"; 
                contents.forEach(c => c.classList.remove("active"));
                stopSlideshow();
            }
            return;
        }

        /* =====================
           BLOQUEO SI ESTÁ OFF
        ===================== */
        if(!tvOn) return;

        /* =====================
           CAMBIO DE CANAL
        ===================== */
        soundStatic.currentTime = 0;
        soundStatic.play();

        dials.forEach(d => d.classList.remove("active"));
        dial.classList.add("active");
        showContent(target);

        /* =====================
           SLIDESHOW PROJECTS
        ===================== */
        if(target === "projects"){
            currentSlide = 0;
            showSlide(currentSlide);
            startSlideshow();
        } else {
            stopSlideshow();
        }
    });
});