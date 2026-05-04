// ----------------------------------------------------- SCROLL SMOOTH ------------------------------------------------------------------------------
console.log("Portfolio chargé");

const lenis = new Lenis({
    duration: 1.2, 
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false, 
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// ----------------------------------------------- CLIQUE BTN VOIR MES PROJETS -------------------------------------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); 
        
        const targetId = this.getAttribute('href'); 
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            lenis.scrollTo(targetSection, {
                offset: -50,
                duration: 2
            });
        }
    });
});

//---------------------------------------------------- FOOTER ------------------------------------------------------------------
const modal = document.getElementById("legal-modal");
const modalTriggers = document.querySelectorAll(".trigger-modal");
const span = document.getElementsByClassName("close-modal")[0];

modalTriggers.forEach(btn => {
    btn.onclick = function(e) {
        e.preventDefault();
        modal.style.display = "block";
    }
});

if(span) {
    span.onclick = function() {
        modal.style.display = "none";
    }
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
