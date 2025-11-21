// ========================================
// RISE ABOVE GBVF - MAIN JAVASCRIPT FILE
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
    
    // ========================================
    // STICKY HEADER ON SCROLL
    // ========================================
    const header = document.querySelector('.main-header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        }
        
        lastScroll = currentScroll;
    });
    
    // ========================================
    // ANIMATED STATISTICS COUNTER
    // ========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    function animateStats() {
        if (hasAnimated) return;
        
        const statsSection = document.querySelector('.stats-section');
        if (!statsSection) return;
        
        const rect = statsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible) {
            hasAnimated = true;
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        stat.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target;
                    }
                };
                
                updateCounter();
            });
        }
    }
    
    window.addEventListener('scroll', animateStats);
    animateStats();
    
    // ========================================
    // TESTIMONIALS CAROUSEL
    // ========================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.remove('active');
            if (i === index) {
                card.classList.add('active');
            }
        });
        
        dots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === index) {
                dot.classList.add('active');
            }
        });
    }
    
    // Auto-rotate testimonials
    if (testimonialCards.length > 0) {
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        }, 5000);
        
        // Manual navigation with dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentTestimonial = index;
                showTestimonial(index);
            });
        });
    }
    
    // ========================================
    // NEWSLETTER FORM SUBMISSION
    // ========================================
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterMessage = document.getElementById('newsletter-message');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Simulate form submission
            newsletterMessage.textContent = 'Thank you for subscribing! Check your email for confirmation.';
            newsletterMessage.className = 'form-message success';
            newsletterForm.reset();
            
            setTimeout(() => {
                newsletterMessage.style.display = 'none';
            }, 5000);
        });
    }
    
    // ========================================
    // CONTACT FORM VALIDATION & SUBMISSION
    // ========================================
    const contactForm = document.getElementById('contact-form');
    const contactMessage = document.getElementById('contact-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validation
            if (!name || !email || !subject || !message) {
                contactMessage.textContent = 'Please fill in all required fields.';
                contactMessage.className = 'form-message error';
                return;
            }
            
            if (!isValidEmail(email)) {
                contactMessage.textContent = 'Please enter a valid email address.';
                contactMessage.className = 'form-message error';
                return;
            }
            
            // Success
            contactMessage.textContent = 'Thank you for reaching out! We will get back to you soon.';
            contactMessage.className = 'form-message success';
            contactForm.reset();
            
            setTimeout(() => {
                contactMessage.style.display = 'none';
            }, 5000);
        });
    }
    
    // ========================================
    // VOLUNTEER FORM SUBMISSION
    // ========================================
    const volunteerForm = document.getElementById('volunteer-form');
    const volunteerMessage = document.getElementById('volunteer-message');
    
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('volunteer-name').value.trim();
            const email = document.getElementById('volunteer-email').value.trim();
            const phone = document.getElementById('volunteer-phone').value.trim();
            const availability = document.getElementById('availability').value;
            const skills = document.getElementById('skills').value.trim();
            
            if (!name || !email || !phone || !availability) {
                volunteerMessage.textContent = 'Please fill in all required fields.';
                volunteerMessage.className = 'form-message error';
                return;
            }
            
            if (!isValidEmail(email)) {
                volunteerMessage.textContent = 'Please enter a valid email address.';
                volunteerMessage.className = 'form-message error';
                return;
            }
            
            volunteerMessage.textContent = 'Thank you for your interest! We will contact you soon with next steps.';
            volunteerMessage.className = 'form-message success';
            volunteerForm.reset();
            
            setTimeout(() => {
                volunteerMessage.style.display = 'none';
            }, 5000);
        });
    }
    
    // ========================================
    // DONATION FORM HANDLING
    // ========================================
    const donationAmounts = document.querySelectorAll('.donation-amount');
    const customAmount = document.getElementById('custom-amount');
    const donationForm = document.getElementById('donation-form');
    const donationMessage = document.getElementById('donation-message');
    
    donationAmounts.forEach(btn => {
        btn.addEventListener('click', function() {
            donationAmounts.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            if (customAmount) {
                customAmount.value = '';
            }
        });
    });
    
    if (customAmount) {
        customAmount.addEventListener('input', function() {
            donationAmounts.forEach(b => b.classList.remove('selected'));
        });
    }
    
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const selectedAmount = document.querySelector('.donation-amount.selected');
            const amount = selectedAmount ? selectedAmount.dataset.amount : customAmount.value;
            
            if (!amount || amount <= 0) {
                donationMessage.textContent = 'Please select or enter a donation amount.';
                donationMessage.className = 'form-message error';
                return;
            }
            
            donationMessage.textContent = `Thank you for your generous donation of R${amount}! Processing your payment...`;
            donationMessage.className = 'form-message success';
            
            // In a real application, this would process the payment
            setTimeout(() => {
                donationMessage.textContent = 'Payment successful! Thank you for supporting our mission.';
            }, 2000);
        });
    }
    
    // ========================================
    // NEWS/BLOG SEARCH FUNCTIONALITY
    // ========================================
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const blogPosts = document.querySelectorAll('.blog-post');
    
    function searchPosts() {
        const searchTerm = searchInput.value.toLowerCase();
        
        blogPosts.forEach(post => {
            const title = post.querySelector('h3').textContent.toLowerCase();
            const excerpt = post.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                post.style.display = 'block';
                post.style.animation = 'fadeInUp 0.5s ease';
            } else {
                post.style.display = 'none';
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', searchPosts);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                searchPosts();
            }
        });
    }
    
    // ========================================
    // CATEGORY FILTERING FOR NEWS
    // ========================================
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            blogPosts.forEach(post => {
                if (category === 'all' || post.dataset.category === category) {
                    post.style.display = 'block';
                    post.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });
    
    // ========================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ========================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ========================================
    // FADE IN ON SCROLL ANIMATION
    // ========================================
    const fadeElements = document.querySelectorAll('.glass-effect, .gallery-item, .blog-post');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        fadeInObserver.observe(element);
    });
    
    // ========================================
    // MODAL FOR GALLERY IMAGES
    // ========================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const overlay = this.querySelector('.gallery-overlay p');
            
            // Create modal
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.innerHTML = `
                <div class="modal-content glass-effect">
                    <span class="modal-close">&times;</span>
                    <img src="${img.src}" alt="${overlay.textContent}">
                    <p>${overlay.textContent}</p>
                </div>
            `;
            
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
            
            // Close modal
            const closeBtn = modal.querySelector('.modal-close');
            closeBtn.addEventListener('click', function() {
                modal.remove();
                document.body.style.overflow = 'auto';
            });
            
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.remove();
                    document.body.style.overflow = 'auto';
                }
            });
        });
    });
    
    // ========================================
    // UTILITY FUNCTIONS
    // ========================================
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
    }
    
    // ========================================
    // ACTIVE PAGE INDICATOR
    // ========================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
    
    // ========================================
    // LOADING ANIMATION
    // ========================================
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
    
});