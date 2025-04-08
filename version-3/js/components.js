// Component Loader
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Load components
    loadComponent('navbar-container', 'components/navbar.html');
    loadComponent('footer-container', 'components/footer.html');
    
    // Function to load a component
    function loadComponent(containerId, componentPath) {
        const container = document.getElementById(containerId);
        
        if (!container) return;
        
        fetch(componentPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load component: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                container.innerHTML = html;
                
                // After loading the navbar, set active state
                if (containerId === 'navbar-container') {
                    setActiveNavLink();
                }
                
                // Dispatch a custom event to signal component is loaded
                const event = new CustomEvent('componentLoaded', { 
                    detail: { containerId: containerId }
                });
                document.dispatchEvent(event);
            })
            .catch(error => {
                console.error(`Error loading component ${componentPath}:`, error);
            });
    }
    
    // Set active state for navigation links
    function setActiveNavLink() {
        const currentPage = window.location.pathname;
        const links = document.querySelectorAll('.nav-link');
        
        links.forEach(link => {
            const linkPath = link.getAttribute('href');
            const pageName = link.getAttribute('data-page');
            
            // Check if current URL contains the link's href
            if (currentPage.includes(linkPath) && linkPath !== 'index.html') {
                link.classList.add('active');
            } 
            // Special handling for home page
            else if ((currentPage.endsWith('/') || 
                     currentPage.endsWith('version-3/') || 
                     currentPage.includes('index.html')) && 
                     (linkPath === 'index.html' || pageName === 'index')) {
                link.classList.add('active');
            }
        });
    }
}); 