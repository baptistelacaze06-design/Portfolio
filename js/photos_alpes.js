/* ------------------------------ SCROLL ------------------------------------ */
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

/* ------------------------------ CARROUSEL ---------------------------------- */

const wrapper = document.querySelector('.horizontal-scroll-wrapper');
const track = document.querySelector('.horizontal-track');

function updateHorizontalScroll() {
    if (!wrapper || !track) return; 
    
    const wrapperRect = wrapper.getBoundingClientRect();
    const wrapperTop = wrapperRect.top;
    const wrapperHeight = wrapperRect.height;
    const windowHeight = window.innerHeight;
    
    const maxScroll = wrapperHeight - windowHeight;
    let progress = -wrapperTop / maxScroll;
    progress = Math.max(0, Math.min(1, progress)); 
    
    const trackWidth = track.scrollWidth;
    const maxTranslate = trackWidth - window.innerWidth;
    
    track.style.transform = `translateX(${-progress * maxTranslate}px)`;
}

window.addEventListener('scroll', updateHorizontalScroll);
window.addEventListener('resize', updateHorizontalScroll);
updateHorizontalScroll(); // Appel initial

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-lightbox');
const galleryImages = document.querySelectorAll('.gallery-item img');

galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        if(lightbox && lightboxImg) {
            lightbox.style.display = "flex";
            lightboxImg.src = img.src; 
            lenis.stop(); 
        }
    });
});

if(closeBtn) {
    function closeLightbox() {
        lightbox.style.display = "none";
        lenis.start(); 
    }
    
    closeBtn.onclick = closeLightbox;
    
    lightbox.onclick = function(e) {
        if(e.target !== lightboxImg) {
            closeLightbox();
        }
    }
}

/* ------------------------------ FOOTER -------------------------------- */
const legalModal = document.getElementById("legal-modal");
const legalTriggers = document.querySelectorAll(".trigger-modal");
const legalClose = document.querySelector(".close-modal");

if(legalTriggers.length > 0) {
    legalTriggers.forEach(btn => {
        btn.onclick = function(e) {
            e.preventDefault();
            if(legalModal) {
                legalModal.style.display = "block";
                lenis.stop();
            }
        }
    });
    if(legalClose) {
        legalClose.onclick = function() { 
            legalModal.style.display = "none"; 
            lenis.start();
        }
    }
    window.onclick = function(event) {
        if (event.target == legalModal) {
            legalModal.style.display = "none";
            lenis.start();
        }
    }
}