// Version 3: Main JavaScript - Warm & Inviting Theme

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Listen for components being loaded
    document.addEventListener('componentLoaded', function(e) {
        // When navbar is loaded, set up mobile menu
        if (e.detail.containerId === 'navbar-container') {
            setupMobileMenu();
        }
        
        // When footer is loaded, set up scroll to top functionality
        if (e.detail.containerId === 'footer-container') {
            setupScrollToTop();
        }
    });
    
    // Mobile Menu Toggle
    function setupMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const body = document.body;
        const header = document.querySelector('.header');
        
        if (menuToggle) {
            menuToggle.addEventListener('click', function() {
                menuToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                header.classList.toggle('menu-open');
            });
        }
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu && navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                header.classList.remove('menu-open');
            }
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                if (this.getAttribute('href') !== '#') {
                    e.preventDefault();
                    
                    // Close mobile menu if open
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        menuToggle.classList.remove('active');
                        header.classList.remove('menu-open');
                    }
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 100,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
    
    // Scroll to top button
    function setupScrollToTop() {
        const scrollTopBtn = document.querySelector('.scroll-top');
        
        if (scrollTopBtn) {
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    scrollTopBtn.classList.add('visible');
                } else {
                    scrollTopBtn.classList.remove('visible');
                }
            });
            
            scrollTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.animate');
    
    function checkInView() {
        animateElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top <= windowHeight * 0.85) {
                element.classList.add('in-view');
            }
        });
    }
    
    // Initial check on load
    checkInView();
    
    // Check on scroll
    window.addEventListener('scroll', checkInView);
    
    // Gallery Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-button');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                        
                        // Add a slight delay for animation
                        setTimeout(() => {
                            item.classList.add('in-view');
                        }, 50);
                    } else {
                        item.style.display = 'none';
                        item.classList.remove('in-view');
                    }
                });
            });
        });
    }
    
    // Lightbox Functionality
    const lightboxLinks = document.querySelectorAll('.gallery-lightbox');
    const lightboxModal = document.querySelector('.lightbox-modal');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (lightboxLinks.length > 0 && lightboxModal && lightboxImage) {
        lightboxLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const imageUrl = this.getAttribute('href');
                lightboxImage.setAttribute('src', imageUrl);
                lightboxModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });

        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }

        lightboxModal.addEventListener('click', function(e) {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });

        function closeLightbox() {
            lightboxModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        // Close lightbox with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightboxModal.style.display === 'flex') {
                closeLightbox();
            }
        });
    }
    
    // Contact Form Functionality
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const requiredFields = contactForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                // In a real application, you would send the form data to a server here
                // For this demo, we'll just show the success message
                
                // Hide the form fields
                const formElements = contactForm.querySelectorAll('.form-group, .form-submit, .form-grid');
                formElements.forEach(element => {
                    element.style.display = 'none';
                });
                
                // Show success message
                if (formSuccess) {
                    formSuccess.style.display = 'block';
                }
                
                // Reset the form (would typically happen after successful submission)
                contactForm.reset();
                
                // In a real application, you might redirect or show a different message
                // setTimeout(() => {
                //     window.location.href = 'thank-you.html';
                // }, 3000);
            }
        });
        
        // Remove error class on input
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.classList.remove('error');
                }
            });
        });
    }
    
    // Testimonial Slider Functionality (if needed)
    // This would be implemented here if required
    
    // Current Year for Copyright
    const year = document.querySelector('.current-year');
    
    if (year) {
        year.textContent = new Date().getFullYear();
    }
}); 