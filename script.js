// Enhanced Typing Effect for Home Section
const typingText = document.getElementById('typing-text');
const textToType = "Hi, I'm Vishnu Vardhan";
let charIndex = 0;
let isDeleting = false;
let currentText = '';

function typeText() {
    if (!isDeleting && charIndex < textToType.length) {
        currentText += textToType.charAt(charIndex);
        typingText.textContent = currentText;
        charIndex++;
        setTimeout(typeText, 80 + Math.random() * 40); // Variable typing speed
    } else if (isDeleting && charIndex > 0) {
        currentText = currentText.slice(0, -1);
        typingText.textContent = currentText;
        charIndex--;
        setTimeout(typeText, 50);
    } else if (!isDeleting && charIndex === textToType.length) {
        // Pause before deleting
        setTimeout(() => {
            isDeleting = true;
            typeText();
        }, 2000);
    } else if (isDeleting && charIndex === 0) {
        // Pause before typing again
        setTimeout(() => {
            isDeleting = false;
            typeText();
        }, 500);
    }
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeText, 1000);
});

// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link Highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.pageYOffset + 100;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Scroll Animation for Sections
function revealSections() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.8) {
            section.classList.add('fade-in', 'visible');
        }
    });
}

// Enhanced Scroll Event Listeners with Navbar Effects and Particle Interaction
window.addEventListener('scroll', () => {
    updateActiveNavLink();
    revealSections();
    
    // Add scrolled class to navbar
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Add scroll-based particle effects
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    createScrollParticles(scrollPercent);
});

// Create particles based on scroll position
function createScrollParticles(scrollPercent) {
    if (Math.random() < 0.05 && scrollPercent > 0) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            right: 20px;
            top: ${Math.random() * window.innerHeight}px;
            width: 3px;
            height: 3px;
            background: rgba(103, 126, 234, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 100;
            animation: scrollParticle 1.5s ease-out forwards;
            box-shadow: 0 0 8px rgba(103, 126, 234, 0.4);
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 1500);
    }
}

// Add scroll particle animation
const scrollParticleStyle = document.createElement('style');
scrollParticleStyle.textContent = `
    @keyframes scrollParticle {
        0% {
            transform: translateX(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateX(-100px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(scrollParticleStyle);

// Initialize animations on page load
window.addEventListener('load', () => {
    updateActiveNavLink();
    revealSections();
    
    // Add fade-in class to all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });
});

// Enhanced Skill Cards with 3D Tilt Effect
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        card.style.transition = 'all 0.1s ease';
    });
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transition = 'all 0.5s ease';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
    });
});

// Project Cards Animation
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

// contactForm.addEventListener('submit', function(e) {
//     e.preventDefault();
    
//     // Get form data
//     const formData = new FormData(contactForm);
//     const name = formData.get('name');
//     const email = formData.get('email');
//     const message = formData.get('message');
    
//     // Simple form validation
//     if (!name || !email || !message) {
//         showNotification('Please fill in all fields', 'error');
//         return;
//     }
    
//     if (!isValidEmail(email)) {
//         showNotification('Please enter a valid email address', 'error');
//         return;
//     }
    
//     // Simulate form submission
//     showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
//     contactForm.reset();
// });

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
// function showNotification(message, type) {
//     // Remove existing notifications
//     const existingNotification = document.querySelector('.notification');
//     if (existingNotification) {
//         existingNotification.remove();
//     }
    
//     // Create notification element
//     const notification = document.createElement('div');
//     notification.className = `notification ${type}`;
//     notification.textContent = message;
    
//     // Style the notification
//     notification.style.cssText = `
//         position: fixed;
//         top: 100px;
//         right: 20px;
//         background: ${type === 'success' ? '#48bb78' : '#f56565'};
//         color: white;
//         padding: 1rem 1.5rem;
//         border-radius: 8px;
//         box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//         z-index: 1001;
//         font-weight: 500;
//         transform: translateX(100%);
//         transition: transform 0.3s ease;
//     `;
    
//     // Add to DOM
//     document.body.appendChild(notification);
    
//     // Animate in
//     setTimeout(() => {
//         notification.style.transform = 'translateX(0)';
//     }, 100);
    
//     // Remove after 5 seconds
//     setTimeout(() => {
//         notification.style.transform = 'translateX(100%)';
//         setTimeout(() => {
//             if (notification.parentNode) {
//                 notification.remove();
//             }
//         }, 300);
//     }, 5000);
// }

// Parallax effect for home section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const homeSection = document.querySelector('.home');
    const parallaxSpeed = 0.5;
    
    if (homeSection) {
        homeSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// Intersection Observer for better performance on scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animatable elements
document.addEventListener('DOMContentLoaded', () => {
    const animatableElements = document.querySelectorAll('.skill-card, .project-card, .achievement-card, .certification-card');
    animatableElements.forEach(el => {
        observer.observe(el);
    });
});

// Enhanced Page Loading Animation
window.addEventListener('load', () => {
    const pageLoader = document.getElementById('pageLoader');
    
    // Hide loader after content is loaded
    setTimeout(() => {
        pageLoader.classList.add('fade-out');
        setTimeout(() => {
            pageLoader.style.display = 'none';
        }, 800);
    }, 1500);
});

// Advanced cursor trail effect
let cursorTrails = [];

document.addEventListener('mousemove', (e) => {
    // Limit the number of trails for performance
    if (cursorTrails.length > 10) {
        const oldTrail = cursorTrails.shift();
        if (oldTrail && oldTrail.parentNode) {
            oldTrail.remove();
        }
    }
    
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = e.clientX - 10 + 'px';
    trail.style.top = e.clientY - 10 + 'px';
    
    document.body.appendChild(trail);
    cursorTrails.push(trail);
    
    // Remove trail after animation
    setTimeout(() => {
        if (trail && trail.parentNode) {
            trail.style.opacity = '0';
            trail.style.transform = 'scale(0)';
            setTimeout(() => {
                if (trail.parentNode) {
                    trail.remove();
                }
            }, 200);
        }
    }, 800);
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Add smooth reveal animation for timeline items
const timelineItems = document.querySelectorAll('.education-item, .experience-item');

timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    item.style.transitionDelay = `${index * 0.2}s`;
});

// Reveal timeline items on scroll
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.3 });

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// Enhanced Interactive Particle System
function createAdvancedParticles() {
    // Create multiple particle layers
    const particleTypes = [
        { count: 80, size: [2, 6], speed: [15, 25], opacity: [0.3, 0.7], color: 'rgba(255, 255, 255, ' },
        { count: 40, size: [1, 3], speed: [20, 35], opacity: [0.2, 0.5], color: 'rgba(103, 126, 234, ' },
        { count: 30, size: [3, 8], speed: [10, 20], opacity: [0.1, 0.4], color: 'rgba(240, 147, 251, ' }
    ];
    
    particleTypes.forEach((type, typeIndex) => {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = `particles-layer-${typeIndex}`;
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: ${1 + typeIndex};
            overflow: hidden;
        `;
        
        for (let i = 0; i < type.count; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * (type.size[1] - type.size[0]) + type.size[0];
            const speed = Math.random() * (type.speed[1] - type.speed[0]) + type.speed[0];
            const opacity = Math.random() * (type.opacity[1] - type.opacity[0]) + type.opacity[0];
            const delay = Math.random() * 20;
            const horizontalMovement = Math.random() * 400 - 200;
            
            particle.className = `particle-${typeIndex}`;
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${type.color}${opacity});
                border-radius: 50%;
                box-shadow: 0 0 ${size * 2}px ${type.color}${opacity * 0.5});
                animation: 
                    floatUp${typeIndex} ${speed}s linear infinite,
                    twinkle${typeIndex} ${Math.random() * 3 + 2}s ease-in-out infinite alternate;
                left: ${Math.random() * 100}%;
                animation-delay: ${delay}s;
                will-change: transform, opacity;
            `;
            particlesContainer.appendChild(particle);
        }
        
        // Add unique animations for each particle type
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatUp${typeIndex} {
                0% {
                    transform: translateY(100vh) translateX(0px) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100px) translateX(${Math.random() * 400 - 200}px) rotate(360deg);
                    opacity: 0;
                }
            }
            
            @keyframes twinkle${typeIndex} {
                0% { opacity: ${type.opacity[0]}; transform: scale(1); }
                100% { opacity: ${type.opacity[1]}; transform: scale(1.2); }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(particlesContainer);
    });
    
    // Add interactive mouse effects
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create temporary attraction particles on mouse move
        if (Math.random() < 0.1) {
            createMouseParticle(mouseX, mouseY);
        }
    });
}

function createMouseParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.8), rgba(103, 126, 234, 0.4));
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        animation: mouseParticleFloat 2s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, 2000);
}

// Add mouse particle animation
const mouseParticleStyle = document.createElement('style');
mouseParticleStyle.textContent = `
    @keyframes mouseParticleFloat {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(mouseParticleStyle);

// Enhanced button hover effects
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
        this.style.boxShadow = '0 10px 25px rgba(103, 126, 234, 0.4)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '';
    });
    
    btn.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(rippleStyle);

// Initialize advanced particles when page loads
window.addEventListener('load', () => {
    setTimeout(createAdvancedParticles, 1000);
    setTimeout(createGeometricShapes, 1500);
    setTimeout(createStarField, 2000);
});

// Add geometric shapes animation
function createGeometricShapes() {
    const shapesContainer = document.createElement('div');
    shapesContainer.className = 'geometric-shapes';
    shapesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 2;
        overflow: hidden;
    `;
    
    const shapes = ['triangle', 'square', 'hexagon', 'diamond'];
    
    for (let i = 0; i < 15; i++) {
        const shape = document.createElement('div');
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        const size = Math.random() * 30 + 10;
        const duration = Math.random() * 30 + 20;
        const delay = Math.random() * 10;
        
        shape.className = `geometric-shape ${shapeType}`;
        shape.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${Math.random() * 100}%;
            animation: geometricFloat ${duration}s linear infinite;
            animation-delay: ${delay}s;
            opacity: 0.1;
        `;
        
        // Different shape styles
        if (shapeType === 'triangle') {
            shape.style.background = 'transparent';
            shape.style.borderLeft = `${size/2}px solid transparent`;
            shape.style.borderRight = `${size/2}px solid transparent`;
            shape.style.borderBottom = `${size}px solid rgba(255, 255, 255, 0.2)`;
            shape.style.width = '0';
            shape.style.height = '0';
        } else if (shapeType === 'square') {
            shape.style.background = 'rgba(103, 126, 234, 0.2)';
            shape.style.border = '1px solid rgba(255, 255, 255, 0.3)';
        } else if (shapeType === 'hexagon') {
            shape.style.background = 'rgba(240, 147, 251, 0.2)';
            shape.style.clipPath = 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)';
        } else if (shapeType === 'diamond') {
            shape.style.background = 'rgba(255, 255, 255, 0.2)';
            shape.style.transform = 'rotate(45deg)';
        }
        
        shapesContainer.appendChild(shape);
    }
    
    document.body.appendChild(shapesContainer);
}

// Add starfield effect
function createStarField() {
    const starContainer = document.createElement('div');
    starContainer.className = 'star-field';
    starContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 2 + 1;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 5;
        
        star.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: white;
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: twinkle ${duration}s ease-in-out infinite alternate;
            animation-delay: ${delay}s;
            box-shadow: 0 0 ${size * 3}px rgba(255, 255, 255, 0.5);
        `;
        
        starContainer.appendChild(star);
    }
    
    // Add twinkle animation
    const starStyle = document.createElement('style');
    starStyle.textContent = `
        @keyframes twinkle {
            0% { opacity: 0.3; transform: scale(1); }
            100% { opacity: 1; transform: scale(1.5); }
        }
        
        @keyframes geometricFloat {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.1;
            }
            90% {
                opacity: 0.1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(starStyle);
    document.body.appendChild(starContainer);
}

// Enhanced scroll animations with stagger effect
function addStaggerAnimation() {
    const elements = document.querySelectorAll('.skill-card, .project-card, .achievement-card');
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
        element.classList.add('animate-in');
    });
}

// Initialize stagger animations
document.addEventListener('DOMContentLoaded', addStaggerAnimation);

// Add explosion particle effect on clicks
document.addEventListener('click', (e) => {
    createExplosionEffect(e.clientX, e.clientY);
});

function createExplosionEffect(x, y) {
    const particleCount = 12;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const angle = (360 / particleCount) * i;
        const velocity = Math.random() * 100 + 50;
        const size = Math.random() * 4 + 2;
        const hue = Math.random() * 60 + 200; // Blue to purple range
        
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            background: hsl(${hue}, 70%, 60%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            animation: explode 1s ease-out forwards;
            --angle: ${angle}deg;
            --velocity: ${velocity}px;
            box-shadow: 0 0 ${size * 2}px hsl(${hue}, 70%, 60%);
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 1000);
    }
}

// Add explosion animation
const explosionStyle = document.createElement('style');
explosionStyle.textContent = `
    @keyframes explode {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: 
                translate(
                    calc(cos(var(--angle)) * var(--velocity)),
                    calc(sin(var(--angle)) * var(--velocity))
                )
                scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(explosionStyle);

// Add photo spotlight effect
function addPhotoSpotlight() {
    const photos = document.querySelectorAll('.profile-photo');
    
    photos.forEach(photo => {
        photo.addEventListener('click', () => {
            // Create spotlight overlay
            const spotlight = document.createElement('div');
            spotlight.className = 'photo-spotlight';
            spotlight.innerHTML = `
                <div class="spotlight-content">
                    <img src="${photo.src}" alt="${photo.alt}" class="spotlight-image">
                    <div class="spotlight-close">&times;</div>
                    <div class="spotlight-caption">
                        <h3>Vishnuvardhan Koyalkar</h3>
                        <p>Computer Science Student & AI Enthusiast</p>
                    </div>
                </div>
            `;
            
            spotlight.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                z-index: 10001;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
                backdrop-filter: blur(5px);
            `;
            
            document.body.appendChild(spotlight);
            
            // Animate in
            setTimeout(() => {
                spotlight.style.opacity = '1';
            }, 10);
            
            // Close functionality
            const closeBtn = spotlight.querySelector('.spotlight-close');
            const closeSpotlight = () => {
                spotlight.style.opacity = '0';
                setTimeout(() => {
                    if (spotlight.parentNode) {
                        spotlight.remove();
                    }
                }, 300);
            };
            
            closeBtn.addEventListener('click', closeSpotlight);
            spotlight.addEventListener('click', (e) => {
                if (e.target === spotlight) {
                    closeSpotlight();
                }
            });
            
            // ESC key to close
            const handleKeydown = (e) => {
                if (e.key === 'Escape') {
                    closeSpotlight();
                    document.removeEventListener('keydown', handleKeydown);
                }
            };
            document.addEventListener('keydown', handleKeydown);
        });
    });
}

// Add spotlight styles
const spotlightStyle = document.createElement('style');
spotlightStyle.textContent = `
    .spotlight-content {
        text-align: center;
        max-width: 90%;
        max-height: 90%;
        position: relative;
        animation: spotlightZoom 0.3s ease-out;
    }
    
    .spotlight-image {
        max-width: 400px;
        max-height: 400px;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        margin-bottom: 1rem;
    }
    
    .spotlight-close {
        position: absolute;
        top: -10px;
        right: -10px;
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        font-weight: bold;
        cursor: pointer;
        color: #333;
        transition: all 0.3s ease;
    }
    
    .spotlight-close:hover {
        background: white;
        transform: scale(1.1);
    }
    
    .spotlight-caption {
        color: white;
        margin-top: 1rem;
    }
    
    .spotlight-caption h3 {
        font-size: 1.8rem;
        margin-bottom: 0.5rem;
        color: white;
    }
    
    .spotlight-caption p {
        font-size: 1.1rem;
        color: rgba(255, 255, 255, 0.8);
    }
    
    @keyframes spotlightZoom {
        from {
            transform: scale(0.8);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(spotlightStyle);

// Initialize photo spotlight
document.addEventListener('DOMContentLoaded', addPhotoSpotlight);
