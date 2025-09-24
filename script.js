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
