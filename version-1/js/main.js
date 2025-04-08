// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const isOpen = navMenu.classList.contains('active');
            menuToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-menu') && !event.target.closest('.menu-toggle')) {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
                
                // Close mobile menu after clicking a link
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
    
    // Add active class to nav links based on current page
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentLocation.endsWith(linkPath)) {
            link.classList.add('active');
        } else if (currentLocation.endsWith('/') && linkPath === 'index.html') {
            link.classList.add('active');
        }
    });
    
    // Simple testimonial slider functionality
    let currentTestimonial = 0;
    const testimonials = [
        {
            quote: "The stylists at Profile Beauty Salon are incredibly talented. My hair has never looked better!",
            name: "Sarah Johnson"
        },
        {
            quote: "I've been coming here for years and have never been disappointed. The service is always top-notch!",
            name: "Michael Williams"
        },
        {
            quote: "The spa treatments are heavenly. I always leave feeling completely relaxed and rejuvenated.",
            name: "Emma Davis"
        }
    ];
    
    const testimonialContainer = document.querySelector('.testimonial');
    
    if (testimonialContainer && testimonials.length > 1) {
        // Initial testimonial
        updateTestimonial();
        
        // Set up auto-rotation
        setInterval(nextTestimonial, 5000);
        
        // Create navigation dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'testimonial-dots';
        
        testimonials.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = index === 0 ? 'dot active' : 'dot';
            dot.addEventListener('click', () => {
                currentTestimonial = index;
                updateTestimonial();
            });
            dotsContainer.appendChild(dot);
        });
        
        testimonialContainer.appendChild(dotsContainer);
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonial();
    }
    
    function updateTestimonial() {
        if (!testimonialContainer) return;
        
        const testimonial = testimonials[currentTestimonial];
        const quoteElement = testimonialContainer.querySelector('.quote p');
        const nameElement = testimonialContainer.querySelector('.client-name');
        
        if (quoteElement && nameElement && testimonial) {
            // Add fade out effect
            testimonialContainer.style.opacity = 0;
            
            setTimeout(() => {
                quoteElement.textContent = testimonial.quote;
                nameElement.textContent = testimonial.name;
                
                // Update active dot
                const dots = testimonialContainer.querySelectorAll('.dot');
                dots.forEach((dot, index) => {
                    if (index === currentTestimonial) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
                
                // Add fade in effect
                testimonialContainer.style.opacity = 1;
            }, 300);
        }
    }
    
    // Add scroll animations
    const animatedElements = document.querySelectorAll('.service-card, .about-content, .gallery-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
    
    // Add animate class to observe elements when they come into view
    document.addEventListener('scroll', function() {
        document.querySelectorAll('.animate').forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    });
}); 