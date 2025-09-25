/**
 * Debounce function to limit the rate at which a function gets called.
 * @param {Function} func The function to debounce.
 * @param {number} wait The time to wait before executing the function.
 * @returns {Function} The debounced function.
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionalities
    initSmoothScrolling();
    initNavbarEffects();
    initMobileMenu();
    initScrollAnimations();
    initCurvedGallery();
    initCurvedInteractions();
    initNumberCounters();
    initCtaButtons();
    initScrollProgress();
    initHeroTilt();
});

// Smooth Scrolling for Navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Number Counter Animation
function initNumberCounters() {
    const observerOptions = {
        threshold: 0.5, // Start when 50% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                animateCount(el);
                observer.unobserve(el); // Animate only once
            }
        });
    }, observerOptions);

    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(el => {
        observer.observe(el);
    });
}

function animateCount(el) {
    const text = el.textContent;
    const duration = 2000; // Animation duration in ms

    // Extract number and suffix from text like "$1M+", "20K+", "99.9%"
    const match = text.match(/([$]?)([0-9,.]+)([a-zA-Z%+]?)/);
    if (!match) return;

    const prefix = match[1] || '';
    const targetValue = parseFloat(match[2].replace(/,/g, ''));
    const suffix = match[3] || '';

    if (isNaN(targetValue)) return;

    let startTime = null;

    function step(currentTime) {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const currentVal = progress * targetValue;

        // Handle decimal places for numbers like 99.9 or 2.5
        if (targetValue % 1 !== 0) {
            el.textContent = prefix + currentVal.toFixed(1) + suffix;
        } else {
            el.textContent = prefix + Math.floor(currentVal).toLocaleString() + suffix;
        }

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            el.textContent = text; // Ensure final value is exactly as in HTML
        }
    }

    requestAnimationFrame(step);
}

// Navbar Effects
function initNavbarEffects() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    const handleScroll = debounce(() => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
    }, 10);

    window.addEventListener('scroll', handleScroll);
}

// Mobile menu (hamburger) toggle
function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.getElementById('primary-nav');
    if (!toggle || !nav) return;

    function closeMenu() {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close when clicking a link
    nav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => closeMenu());
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });
}

// Gallery Interactions
function initGalleryInteractions() {
    const galleryItems = document.querySelectorAll('.gallery-item');
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .stat-card, .testimonial-card, .stat-item, .nft-display');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// CTA Button Effects
function initCtaButtons() {
    const ctaButton = document.querySelector('.cta-button');

    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);

            // Scroll to gallery section
            const gallery = document.querySelector('#full-curved-gallery');
            if (gallery) {
                gallery.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// Curved Gallery Initialization
function initCurvedGallery() {
    const container = document.querySelector('.full-curved-container');
    if (!container) return;

    const items = Array.from(container.querySelectorAll('.curved-item'));
    let positions = [];

    function getResponsivePositions() {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 480) { // Mobile
            return [
                'translateX(-200px) translateZ(-150px) rotateY(50deg) scale(0.8)',
                'translateX(-100px) translateZ(-75px) rotateY(25deg) scale(0.9)',
                'translateX(0) translateZ(0) rotateY(0deg) scale(0.7)',
                'translateX(100px) translateZ(-75px) rotateY(-25deg) scale(0.9)',
                'translateX(200px) translateZ(-150px) rotateY(-50deg) scale(0.8)'
            ];
        } else if (screenWidth <= 768) { // Tablet
            return [
                'translateX(-400px) translateZ(-250px) rotateY(50deg) scale(1.0)',
                'translateX(-200px) translateZ(-125px) rotateY(25deg) scale(0.9)',
                'translateX(0) translateZ(0) rotateY(0deg) scale(0.8)',
                'translateX(200px) translateZ(-125px) rotateY(-25deg) scale(0.9)',
                'translateX(400px) translateZ(-250px) rotateY(-50deg) scale(1.0)'
            ];
        } else { // Desktop
            return [
                'translateX(-600px) translateZ(-400px) rotateY(50deg) scale(1.1)',
                'translateX(-300px) translateZ(-200px) rotateY(25deg) scale(0.95)',
                'translateX(0) translateZ(0) rotateY(0deg) scale(0.8)',
                'translateX(300px) translateZ(-200px) rotateY(-25deg) scale(0.95)',
                'translateX(600px) translateZ(-400px) rotateY(-50deg) scale(1.1)'
            ];
        }
    }

    function updatePositions(isInitial = false) {
        positions = getResponsivePositions();
        items.forEach((item, index) => {
            const transform = positions[index] || positions[0];
            if (isInitial) {
                item.style.opacity = '0';
                item.style.transform = transform + ' translateY(50px)';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = transform;
                }, 150 * index);
            } else {
                item.style.transform = transform;
            }
        });
    }

    // Initial setup
    updatePositions(true);

    // Update on resize
    window.addEventListener('resize', debounce(updatePositions, 200));
}

// Curved Gallery Interactions
function initCurvedInteractions() {
    const curvedItems = document.querySelectorAll('.curved-item');
    if (curvedItems.length > 0) {
        // Individual item interactions
        curvedItems.forEach((item) => {
            // Click to zoom in and out
            item.addEventListener('click', function() {
                // If already zoomed, do nothing.
                if (this.classList.contains('zoomed')) {
                    return;
                }
                // Add the 'zoomed' class to trigger the CSS transition
                this.classList.add('zoomed');

                // Set a timer to remove the class, which will make it go back
                setTimeout(() => {
                    this.classList.remove('zoomed');
                }, 1500); // The image will stay zoomed for 1.5 seconds
            });
        });
    }
}

// Scroll progress bar
function initScrollProgress() {
    const bar = document.querySelector('.scroll-progress__bar');
    if (!bar) return;
    const update = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.max(0, Math.min(1, scrollTop / docHeight));
        bar.style.width = (progress * 100).toFixed(2) + '%';
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', debounce(update, 100));
}

// Hero card tilt interaction
function initHeroTilt() {
    const card = document.querySelector('.nft-display .nft-card-inner');
    const container = document.querySelector('.nft-display');
    if (!card || !container) return;
    const strength = 12;
    function handle(e) {
        const rect = container.getBoundingClientRect();
        const x = (e.clientX ?? (e.touches && e.touches[0].clientX)) - rect.left;
        const y = (e.clientY ?? (e.touches && e.touches[0].clientY)) - rect.top;
        const rx = ((y / rect.height) - 0.5) * -strength;
        const ry = ((x / rect.width) - 0.5) * strength;
        card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
    function reset() {
        card.style.transform = 'rotateX(0) rotateY(0)';
    }
    container.addEventListener('mousemove', handle);
    container.addEventListener('mouseleave', reset);
    container.addEventListener('touchmove', handle, { passive: true });
    container.addEventListener('touchend', reset);

    // Flip on click/tap only (no auto flip)
    container.addEventListener('click', () => {
        container.classList.toggle('is-flipped');
    });
}
