// Navbar JavaScript


const nav = document.querySelector(".nav"),
navOpenBtn = document.querySelector(".navOpenBtn"),
navCloseBtn = document.querySelector(".navCloseBtn");


navOpenBtn.addEventListener("click", () => {
    nav.classList.add("openNav");
    nav.classList.remove("openSearch");
    searchIcon.classList.replace("uil-times", "uil-search");
});


navCloseBtn.addEventListener("click", () => {
    nav.classList.remove("openNav");
});




// Animation

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".content-wrapper");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    {
      threshold: 0.2
    }
  );

  elements.forEach(el => observer.observe(el));
});




// Our Work

const journals = document.querySelector('.journals');
const items = journals.querySelectorAll('.journal-item');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const dotsContainer = document.querySelector('.carousel-dots');

let currentIndex = 0;
let imagesPerView = 4;

// Calculate images per view based on screen size
function calculateImagesPerView() {
    const width = window.innerWidth;
    if (width <= 576) return 1;
    if (width <= 768) return 2;
    if (width <= 992) return 3;
    return 4;
}

imagesPerView = calculateImagesPerView();
const totalSlides = Math.ceil(items.length / imagesPerView);

// Create dots
function createDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
}

createDots();

function updateCarousel() {
    const itemWidth = items[0].offsetWidth;
    const gap = parseFloat(getComputedStyle(journals).gap);
    const offset = -(currentIndex * imagesPerView * (itemWidth + gap));
    journals.style.transform = `translateX(${offset}px)`;
    
    // Update dots - query them fresh each time
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });

    // Update button states
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === totalSlides - 1;
}

function goToSlide(index) {
    currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
    updateCarousel();
}

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < totalSlides - 1) {
        currentIndex++;
        updateCarousel();
    }
});

// Initialize
updateCarousel();

// Recalculate on window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const newImagesPerView = calculateImagesPerView();
        if (newImagesPerView !== imagesPerView) {
            imagesPerView = newImagesPerView;
            currentIndex = 0;
            const newTotalSlides = Math.ceil(items.length / imagesPerView);
            if (newTotalSlides !== totalSlides) {
                totalSlides = newTotalSlides;
                createDots();
            }
        }
        updateCarousel();
    }, 250);
});

// Auto-play (optional)
let autoplayInterval;
function startAutoplay() {
    autoplayInterval = setInterval(() => {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    }, 4000);
}

function stopAutoplay() {
    clearInterval(autoplayInterval);
}

// Start autoplay
startAutoplay();

// Pause on hover
const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', stopAutoplay);
carouselContainer.addEventListener('mouseleave', startAutoplay);




// What our Customers say about us
const tTrack = document.querySelector('.testimonial-track');
const tCards = document.querySelectorAll('.testimonial-card');
const tPrevBtn = document.querySelector('.testimonial-nav.prev');
const tNextBtn = document.querySelector('.testimonial-nav.next');
const tDotsContainer = document.querySelector('.testimonial-dots');
const tProgressBar = document.querySelector('.scroll-progress');

let tCurrentIndex = 0;
let tIsDragging = false;
let tStartPos = 0;
let tCurrentTranslate = 0;
let tPrevTranslate = 0;

const tTotalSlides = tCards.length;

// Create dots
function tCreateDots() {
    tDotsContainer.innerHTML = '';
    for (let i = 0; i < tTotalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('testimonial-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => tGoToSlide(i));
        tDotsContainer.appendChild(dot);
    }
}

tCreateDots();

function tUpdateCarousel() {
    const cardWidth = tCards[0].offsetWidth;
    const gap = 40;
    const offset = -(tCurrentIndex * (cardWidth + gap));
    tTrack.style.transform = `translateX(${offset}px)`;
    
    // Update dots
    const dots = document.querySelectorAll('.testimonial-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === tCurrentIndex);
    });

    // Update button states
    tPrevBtn.disabled = tCurrentIndex === 0;
    tNextBtn.disabled = tCurrentIndex === tTotalSlides - 1;

    // Update progress bar
    const progress = ((tCurrentIndex + 1) / tTotalSlides) * 100;
    tProgressBar.style.width = progress + '%';
}

function tGoToSlide(index) {
    tCurrentIndex = Math.max(0, Math.min(index, tTotalSlides - 1));
    tUpdateCarousel();
}

tPrevBtn.addEventListener('click', () => {
    if (tCurrentIndex > 0) {
        tCurrentIndex--;
        tUpdateCarousel();
    }
});

tNextBtn.addEventListener('click', () => {
    if (tCurrentIndex < tTotalSlides - 1) {
        tCurrentIndex++;
        tUpdateCarousel();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') tPrevBtn.click();
    else if (e.key === 'ArrowRight') tNextBtn.click();
});

// Touch/Drag support
tTrack.addEventListener('mousedown', tDragStart);
tTrack.addEventListener('touchstart', tDragStart);
tTrack.addEventListener('mouseup', tDragEnd);
tTrack.addEventListener('touchend', tDragEnd);
tTrack.addEventListener('mousemove', tDragMove);
tTrack.addEventListener('touchmove', tDragMove);
tTrack.addEventListener('mouseleave', tDragEnd);

function tDragStart(e) {
    tIsDragging = true;
    tStartPos = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    tTrack.style.cursor = 'grabbing';
}

function tDragMove(e) {
    if (!tIsDragging) return;
    e.preventDefault();
    const currentPosition = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    const diff = currentPosition - tStartPos;
    
    if (Math.abs(diff) > 50) {
        if (diff > 0 && tCurrentIndex > 0) {
            tCurrentIndex--;
            tUpdateCarousel();
            tIsDragging = false;
        } else if (diff < 0 && tCurrentIndex < tTotalSlides - 1) {
            tCurrentIndex++;
            tUpdateCarousel();
            tIsDragging = false;
        }
    }
}

function tDragEnd() {
    tIsDragging = false;
    tTrack.style.cursor = 'grab';
}

// Initialize
tUpdateCarousel();
tTrack.style.cursor = 'grab';

// Auto-play
let tAutoplayInterval;
function tStartAutoplay() {
    tAutoplayInterval = setInterval(() => {
        if (tCurrentIndex < tTotalSlides - 1) {
            tCurrentIndex++;
        } else {
            tCurrentIndex = 0;
        }
        tUpdateCarousel();
    }, 4000);
}

function tStopAutoplay() {
    clearInterval(tAutoplayInterval);
}

tStartAutoplay();

const tSection = document.querySelector('.testimonial-section');
tSection.addEventListener('mouseenter', tStopAutoplay);
tSection.addEventListener('mouseleave', tStartAutoplay);

// Resize handler
window.addEventListener('resize', () => {
    tUpdateCarousel();
});
