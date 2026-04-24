const motionTiming = {
    threshold: 0.12,
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, motionTiming);

const scrollProgress = document.querySelector('.progress span');
const heroImage = document.querySelector('.hero-image');
const header = document.querySelector('.site-header');
const staggerGroups = document.querySelectorAll('.stagger-group');

staggerGroups.forEach((group) => {
    group.classList.add('reveal');
    const items = Array.from(group.querySelectorAll('.stagger-item'));
    items.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.12}s`;
        observer.observe(item);
    });
    observer.observe(group);
});

document.querySelectorAll('.reveal').forEach((section) => observer.observe(section));

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (scrollProgress) {
        scrollProgress.style.width = `${progress}%`;
    }

    if (heroImage) {
        heroImage.style.transform = `translateY(${scrollTop * 0.12}px)`;
    }

    if (header) {
        header.classList.toggle('scrolled', scrollTop > 24);
    }
});

const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

function createCarousel() {
    const track = document.querySelector('.carousel-track');
    const trackWrapper = document.querySelector('.carousel-track-wrapper');
    if (!track || !trackWrapper) return;

    let position = 0;
    let isPaused = false;
    let halfWidth = 0;
    const speed = 2;
    const slides = Array.from(track.querySelectorAll('.carousel-slide'));
    if (slides.length === 0) return;

    const updateHalfWidth = () => {
        halfWidth = track.scrollWidth / 2;
    };
    updateHalfWidth();

    const loop = () => {
        if (!isPaused) {
            position += speed;
            if (position >= halfWidth) {
                position -= halfWidth;
            }
            track.style.transform = `translateX(-${position}px)`;
        }
        requestAnimationFrame(loop);
    };

    const pause = () => { isPaused = true; };
    const resume = () => { isPaused = false; };

    trackWrapper.addEventListener('mouseenter', pause);
    trackWrapper.addEventListener('mouseleave', resume);
    trackWrapper.addEventListener('pointerdown', pause);
    trackWrapper.addEventListener('pointerup', resume);
    trackWrapper.addEventListener('touchstart', pause, { passive: true });
    trackWrapper.addEventListener('touchend', resume);
    window.addEventListener('resize', updateHalfWidth);

    loop();
}

window.addEventListener('load', createCarousel);

