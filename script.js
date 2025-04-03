// DOM Elements
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-items');
const navLinks = document.querySelectorAll('.nav-items a');
const header = document.querySelector('header');
const skillLevels = document.querySelectorAll('.skill-level');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-item');
const contactForm = document.getElementById('contactForm');

// Mobile Navigation
burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('nav-active');

    // Burger Animation
    burger.classList.toggle('toggle');

    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        header.style.padding = '10px 0';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        header.style.padding = '20px 0';
    }
});

// Smooth Scrolling
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        // Close mobile nav if open
        if (nav.classList.contains('nav-active')) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');

            navLinks.forEach(link => {
                link.style.animation = '';
            });
        }

        const targetId = this.getAttribute('href');
        const targetPosition = document.querySelector(targetId).offsetTop - 80;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // Set active nav link
        navLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');

            // Animate skill bars when they come into view
            if (entry.target.classList.contains('skill-item')) {
                const skillBar = entry.target.querySelector('.skill-level');
                if (skillBar) {
                    const skillLevel = skillBar.style.width;
                    skillBar.style.width = '0';
                    setTimeout(() => {
                        skillBar.style.width = skillLevel;
                    }, 200);
                }
            }

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Start observing elements
revealElements.forEach(element => {
    revealObserver.observe(element);
});

// Portfolio Filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        // Filter portfolio items
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'block';

                // Add animation
                setTimeout(() => {
                    item.style.transform = 'scale(1)';
                    item.style.opacity = '1';
                }, 200);
            } else {
                item.style.transform = 'scale(0.8)';
                item.style.opacity = '0';

                setTimeout(() => {
                    item.style.display = 'none';
                }, 500);
            }
        });
    });
});

// Form Submission with Animation
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const formValues = Object.fromEntries(formData.entries());

    // Simple validation
    let isValid = true;
    for (const key in formValues) {
        if (!formValues[key]) {
            isValid = false;
            break;
        }
    }

    if (isValid) {
        // Add loading animation
        const submitBtn = contactForm.querySelector('.submit-btn');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Simulate form submission (replace with actual submission)
        setTimeout(() => {
            // Reset form
            contactForm.reset();

            // Show success message
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.backgroundColor = '#4CAF50';

            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = 'Send Message';
                submitBtn.style.backgroundColor = '';
            }, 3000);
        }, 2000);
    }
});

// Video Editing Animation Effects
// These are example animations specific to video editing

// Glitch Effect for Hero Section
const glitchText = document.querySelector('.highlight');
if (glitchText) {
    setInterval(() => {
        glitchText.classList.add('glitch-effect');

        setTimeout(() => {
            glitchText.classList.remove('glitch-effect');
        }, 200);
    }, 5000);
}

// Cinematic Animation
const heroImage = document.querySelector('.hero-image img');
if (heroImage) {
    // Add a slight parallax effect
    window.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth - e.pageX * 2) / 100;
        const y = (window.innerHeight - e.pageY * 2) / 100;

        heroImage.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
}

// Add Glitch CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .glitch-effect {
        position: relative;
        animation: glitch 0.5s linear;
    }
    
    @keyframes glitch {
        0% {
            transform: translate(0);
        }
        20% {
            transform: translate(-2px, 2px);
        }
        40% {
            transform: translate(-2px, -2px);
        }
        60% {
            transform: translate(2px, 2px);
        }
        80% {
            transform: translate(2px, -2px);
        }
        100% {
            transform: translate(0);
        }
    }
    
    .nav-items a {
        position: relative;
    }
    
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .burger.toggle .line1 {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .burger.toggle .line2 {
        opacity: 0;
    }
    
    .burger.toggle .line3 {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;

document.head.appendChild(style);

// Dynamic Text Typing Effect for the Video Editor title
const typewriter = document.querySelector('.hero-content h2');
if (typewriter) {
    const text = typewriter.textContent;
    typewriter.textContent = '';

    let i = 0;
    const speed = 100; // typing speed in milliseconds

    function type() {
        if (i < text.length) {
            typewriter.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    // Start typing after a delay
    setTimeout(type, 1000);
}

// Initialize active nav based on scroll position
function setActiveNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveNavOnScroll);

// Initialize on page load
window.addEventListener('load', () => {
    // Initialize skill bars to show 0% initially, then animate
    skillLevels.forEach(skillBar => {
        const originalWidth = skillBar.style.width;
        skillBar.style.width = '0';

        setTimeout(() => {
            skillBar.style.width = originalWidth;
        }, 500);
    });

    // Set correct nav active state on page load
    setActiveNavOnScroll();
}); 