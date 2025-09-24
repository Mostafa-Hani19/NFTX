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
    initScrollAnimations();
    initCurvedGallery();
    initCurvedInteractions();
    initNumberCounters();
    initCtaButtons();
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
    const curvedItems = document.querySelectorAll('.curved-item');
    
    // Set initial positions with a staggered entrance animation
    curvedItems.forEach((item, index) => {
        item.style.opacity = '0';
        // Set initial transform to something off-screen or faded
        item.style.transform = getCurvedTransform(index) + ' translateY(50px)';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = getCurvedTransform(index);
        }, 150 * index);
    });
}

// Get curved transform for each item
function getCurvedTransform(index) {
    const transforms = [
        'translateX(-600px) translateZ(-400px) rotateY(50deg) scale(1.1)',
        'translateX(-300px) translateZ(-200px) rotateY(25deg) scale(0.95)',
        'translateX(0) translateZ(0) rotateY(0deg) scale(0.8)', // Center - Smallest
        'translateX(300px) translateZ(-200px) rotateY(-25deg) scale(0.95)',
        'translateX(600px) translateZ(-400px) rotateY(-50deg) scale(1.1)'
    ];
    return transforms[index] || transforms[0];
}

// Curved Gallery Interactions
function initCurvedInteractions() {
    const curvedItems = document.querySelectorAll('.curved-item');

    // Individual item interactions
    curvedItems.forEach((item, index) => {
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
