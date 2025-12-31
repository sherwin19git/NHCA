// Smooth scroll functionality
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Modal functionality for charity rides
const charityModal = document.getElementById('charityModal');
const charityBtn = document.getElementById('charityImagesBtn');
const closeBtn = document.querySelector('.close-modal');

if (charityBtn) {
    charityBtn.addEventListener('click', () => {
        charityModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        charityModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });
}

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === charityModal) {
        charityModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            location: document.getElementById('location').value,
            bikeModel: document.getElementById('bikeModel').value,
            inquiry: document.getElementById('inquiry').value,
            message: document.getElementById('message').value
        };

        // Validate form
        if (!formData.name || !formData.email || !formData.location || !formData.inquiry) {
            alert('Please fill in all required fields (marked with *)');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address');
            return;
        }

        // In a real application, you would send this to a server
        // For now, we'll show a success message
        console.log('Form Data:', formData);

        // Show success message
        showSuccessMessage();

        // Reset form
        contactForm.reset();
    });
}

// Success message function
function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.textContent = '✓ Your inquiry has been sent successfully! We\'ll get back to you soon.';
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4caf50;
        color: white;
        padding: 20px 30px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 2000;
        animation: slideIn 0.3s ease-out;
        font-weight: 500;
    `;

    document.body.appendChild(message);

    // Add slide-in animation if not already defined
    if (!document.querySelector('style[data-success-animation]')) {
        const style = document.createElement('style');
        style.setAttribute('data-success-animation', 'true');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Remove message after 4 seconds
    setTimeout(() => {
        message.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => {
            message.remove();
        }, 300);
    }, 4000);
}

// Scroll animation for cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe work cards for animation
const workCards = document.querySelectorAll('.work-card');
workCards.forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (charityModal.classList.contains('show')) {
            charityModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    }
});

// Prevent form submission if running on local file
document.addEventListener('DOMContentLoaded', () => {
    // Initialize tooltips or other interactive elements if needed
    console.log('NHCA Website loaded successfully!');
});
