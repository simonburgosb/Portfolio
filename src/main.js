/* ====================================
   FUNCIONALIDAD DEL PORTAFOLIO
   ==================================== */

/* Manejo de navegación activa */
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initButtons();
    initAnimations();
});

function initNavigation() {
    const navLinks = document.querySelectorAll('.navbar-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                    updateActiveLink(this);
                }
            }
        });
    });
    
    window.addEventListener('scroll', updateActiveNavigation);
}

function updateActiveLink(link) {
    const navLinks = document.querySelectorAll('.navbar-menu a');
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
}

function updateActiveNavigation() {
    const navLinks = document.querySelectorAll('.navbar-menu a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        if (href.startsWith('#')) {
            const section = document.querySelector(href);
            
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const scrollPosition = window.scrollY + 100;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    updateActiveLink(link);
                }
            }
        }
    });
}

function initButtons() {
    const ctaButtons = document.querySelectorAll('.btn-cta, .btn-primary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.textContent.includes('Let\'s Go')) {
                e.preventDefault();
                scrollToSection('#services');
            } else if (this.textContent.includes('Get in Touch')) {
                e.preventDefault();
                scrollToSection('#contact');
            }
        });
    });
}

function scrollToSection(selector) {
    const section = document.querySelector(selector);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.service-card, .project-card, .timeline-item').forEach(el => {
        observer.observe(el);
        el.classList.add('fade-in');
    });
}

/* ====================================
   ESTILOS DINÁMICOS DE ANIMACIÓN
   ==================================== */

const style = document.createElement('style');
style.textContent = `
    .navbar-menu a.active {
        color: var(--dark-green);
        font-weight: 600;
    }
    
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in.in-view {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
