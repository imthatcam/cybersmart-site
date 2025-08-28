// main.js

(function() {
    'use strict';

    // Update copyright year
    function updateYear() {
        const yearEl = document.getElementById('current-year');
        if (yearEl) yearEl.textContent = new Date().getFullYear();
    }

    // Smooth scroll for anchor links
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Enhanced newsletter form (fallback)
    function enhanceNewsletterForm() {
        const form = document.querySelector('.newsletter-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            
            if (validateEmail(email)) {
                // Show success state
                showFormMessage('Thanks! We\'ll be in touch soon.', 'success');
            } else {
                showFormMessage('Please enter a valid email address.', 'error');
            }
        });
    }

    // Email validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Show form messages
    function showFormMessage(message, type) {
        const form = document.querySelector('.newsletter-form');
        if (!form) return;

        // Remove existing messages
        const existingMsg = form.querySelector('.form-message');
        if (existingMsg) existingMsg.remove();

        // Create new message
        const messageEl = document.createElement('div');
        messageEl.className = `form-message form-message--${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            margin-top: 1rem; 
            padding: 0.75rem; 
            border-radius: 4px; 
            font-size: 0.875rem;
            ${type === 'success' ? 'background: rgba(34, 197, 94, 0.2); color: #22c55e; border: 1px solid #22c55e;' : 'background: rgba(239, 68, 68, 0.2); color: #ef4444; border: 1px solid #ef4444;'}
        `;
        
        form.appendChild(messageEl);

        // Remove message after 5 seconds
        setTimeout(() => messageEl.remove(), 5000);
    }

    // Intersection Observer for fade-in animations
    function initAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        // Observe elements for animation
        document.querySelectorAll('.service-card, .faq-item, .why-us-text').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });
    }

    // Initialize everything when DOM is ready
    function init() {
        updateYear();
        initSmoothScroll();
        enhanceNewsletterForm();
        initAnimations();
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();