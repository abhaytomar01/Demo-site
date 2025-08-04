        // Hero Slider Class
        class HeroSlider {
            constructor() {
                this.slides = document.querySelectorAll('.slide');
                this.navDots = document.querySelectorAll('.nav-dot');
                this.prevArrow = document.querySelector('.prev-arrow');
                this.nextArrow = document.querySelector('.next-arrow');
                this.currentSlide = 0;
                this.slideInterval = null;
                this.autoSlideDelay = 3000;
                
                this.init();
            }
            
            init() {
                this.navDots.forEach((dot, index) => {
                    dot.addEventListener('click', () => this.goToSlide(index));
                });
                
                this.prevArrow.addEventListener('click', () => this.prevSlide());
                this.nextArrow.addEventListener('click', () => this.nextSlide());
                
                this.startAutoPlay();
                
                const sliderContainer = document.querySelector('.hero-slider');
                sliderContainer.addEventListener('mouseenter', () => this.stopAutoPlay());
                sliderContainer.addEventListener('mouseleave', () => this.startAutoPlay());
                
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft') {
                        this.prevSlide();
                        this.resetAutoPlay();
                    }
                    if (e.key === 'ArrowRight') {
                        this.nextSlide();
                        this.resetAutoPlay();
                    }
                });
                
                this.addTouchSupport();
            }
            
            goToSlide(index) {
                this.slides[this.currentSlide].classList.remove('active');
                this.navDots[this.currentSlide].classList.remove('active');
                
                this.currentSlide = index;
                
                this.slides[this.currentSlide].classList.add('active');
                this.navDots[this.currentSlide].classList.add('active');
                
                const slideContent = this.slides[this.currentSlide].querySelector('.slide-content');
                slideContent.style.animation = 'none';
                setTimeout(() => {
                    slideContent.style.animation = 'slideUp 1s ease-out';
                }, 50);
            }
            
            nextSlide() {
                const nextIndex = (this.currentSlide + 1) % this.slides.length;
                this.goToSlide(nextIndex);
            }
            
            prevSlide() {
                const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
                this.goToSlide(prevIndex);
            }
            
            startAutoPlay() {
                this.slideInterval = setInterval(() => {
                    this.nextSlide();
                }, this.autoSlideDelay);
            }
            
            stopAutoPlay() {
                if (this.slideInterval) {
                    clearInterval(this.slideInterval);
                    this.slideInterval = null;
                }
            }
            
            resetAutoPlay() {
                this.stopAutoPlay();
                this.startAutoPlay();
            }
            
            addTouchSupport() {
                const slider = document.querySelector('.slider-container');
                let startX = 0;
                let endX = 0;
                
                slider.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                });
                
                slider.addEventListener('touchend', (e) => {
                    endX = e.changedTouches[0].clientX;
                    const diff = startX - endX;
                    
                    if (Math.abs(diff) > 50) {
                        if (diff > 0) {
                            this.nextSlide();
                        } else {
                            this.prevSlide();
                        }
                        this.resetAutoPlay();
                    }
                });
            }
        }

        // Scroll Animation
        function handleScrollAnimations() {
            const elements = document.querySelectorAll('.fade-in-up');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                }
            });
        }

        // Newsletter Form
        function handleNewsletterSubmission() {
            const newsletterForm = document.querySelector('.newsletter-form');
            
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = newsletterForm.querySelector('input[type="email"]').value;
                
                if (email) {
                    const submitBtn = newsletterForm.querySelector('.newsletter-btn');
                    const originalText = submitBtn.textContent;
                    
                    submitBtn.textContent = 'Subscribing...';
                    submitBtn.disabled = true;
                    
                    setTimeout(() => {
                        submitBtn.textContent = 'Subscribed!';
                        setTimeout(() => {
                            submitBtn.textContent = originalText;
                            submitBtn.disabled = false;
                            newsletterForm.reset();
                        }, 2000);
                    }, 1500);
                }
            });
        }

        // Mobile menu functionality
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
        const mobileMenu = document.querySelector('.mobile-menu');
        const closeMobileMenu = document.querySelector('.close-mobile-menu');

        function openMobileMenu() {
            mobileMenuOverlay.style.display = 'block';
            setTimeout(() => {
                mobileMenu.classList.add('active');
            }, 10);
            document.body.style.overflow = 'hidden';
        }

        function closeMobileMenuFunc() {
            mobileMenu.classList.remove('active');
            setTimeout(() => {
                mobileMenuOverlay.style.display = 'none';
            }, 300);
            document.body.style.overflow = 'auto';
        }

        mobileMenuToggle.addEventListener('click', openMobileMenu);
        closeMobileMenu.addEventListener('click', closeMobileMenuFunc);

        mobileMenuOverlay.addEventListener('click', (e) => {
            if (e.target === mobileMenuOverlay) {
                closeMobileMenuFunc();
            }
        });

        // Navigation link interactions
        const navLinks = document.querySelectorAll('.nav-link');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                closeMobileMenuFunc();
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Handle scroll animations
            handleScrollAnimations();
        });

        // CTA Button functionality
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('cta-button') || e.target.classList.contains('founder-btn')) {
                const buttonText = e.target.textContent;
                
                e.target.style.opacity = '0.7';
                e.target.textContent = 'Loading...';
                
                setTimeout(() => {
                    e.target.style.opacity = '1';
                    e.target.textContent = buttonText;
                    alert(`Navigating to ${buttonText} section...`);
                }, 1500);
            }
        });

        // Search functionality
        const searchIcon = document.querySelector('.fa-search');
        searchIcon.addEventListener('click', () => {
            const searchTerm = prompt('Enter search term:');
            if (searchTerm) {
                alert(`Searching for: ${searchTerm}`);
            }
        });

        // Shopping bag functionality
        const shoppingBag = document.querySelector('.fa-shopping-bag');
        shoppingBag.addEventListener('click', () => {
            alert('Shopping bag clicked! Cart functionality would be implemented here.');
        });

        // Wishlist functionality
        const heartIcon = document.querySelector('.fa-heart');
        heartIcon.addEventListener('click', () => {
            heartIcon.style.color = heartIcon.style.color === 'red' ? '' : 'red';
            alert('Item added to wishlist!');
        });

        // User account functionality
        const userIcon = document.querySelector('.fa-user');
        userIcon.addEventListener('click', () => {
            alert('User account clicked! Login/Register functionality would be implemented here.');
        });

        // Logo click functionality
        const logo = document.querySelector('.logo');
        logo.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMobileMenuFunc();
            }
        });

        // Responsive navigation handling
        function handleResize() {
            if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
                closeMobileMenuFunc();
            }
        }

        window.addEventListener('resize', handleResize);

        // Portfolio Filter Functionality
        function initPortfolioFilters() {
            const filterBtns = document.querySelectorAll('.filter-btn');
            const portfolioItems = document.querySelectorAll('.portfolio-item');
            
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const filter = btn.getAttribute('data-filter');
                    
                    // Update active button
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    // Filter portfolio items
                    portfolioItems.forEach(item => {
                        const category = item.getAttribute('data-category');
                        
                        if (filter === 'all' || category === filter) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            }, 100);
                        } else {
                            item.style.opacity = '0';
                            item.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    });
                });
            });
        }

        // Testimonials Slider Functionality
        class TestimonialsSlider {
            constructor() {
                this.slides = document.querySelectorAll('.testimonial-slide');
                this.dots = document.querySelectorAll('.testimonial-dot');
                this.prevBtn = document.querySelector('.prev-testimonial');
                this.nextBtn = document.querySelector('.next-testimonial');
                this.currentSlide = 0;
                this.autoSlideInterval = null;
                
                this.init();
            }
            
            init() {
                // Dot navigation
                this.dots.forEach((dot, index) => {
                    dot.addEventListener('click', () => this.goToSlide(index));
                });
                
                // Arrow navigation
                this.prevBtn.addEventListener('click', () => this.prevSlide());
                this.nextBtn.addEventListener('click', () => this.nextSlide());
                
                // Auto-slide
                this.startAutoSlide();
                
                // Pause on hover
                const slider = document.querySelector('.testimonials-slider');
                slider.addEventListener('mouseenter', () => this.stopAutoSlide());
                slider.addEventListener('mouseleave', () => this.startAutoSlide());
            }
            
            goToSlide(index) {
                // Remove active class from current slide and dot
                this.slides[this.currentSlide].classList.remove('active');
                this.dots[this.currentSlide].classList.remove('active');
                
                // Update current slide
                this.currentSlide = index;
                
                // Add active class to new slide and dot
                this.slides[this.currentSlide].classList.add('active');
                this.dots[this.currentSlide].classList.add('active');
            }
            
            nextSlide() {
                const nextIndex = (this.currentSlide + 1) % this.slides.length;
                this.goToSlide(nextIndex);
            }
            
            prevSlide() {
                const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
                this.goToSlide(prevIndex);
            }
            
            startAutoSlide() {
                this.autoSlideInterval = setInterval(() => {
                    this.nextSlide();
                }, 5000);
            }
            
            stopAutoSlide() {
                if (this.autoSlideInterval) {
                    clearInterval(this.autoSlideInterval);
                    this.autoSlideInterval = null;
                }
            }
        }

        // Service Card Interactions
        function initServiceCards() {
            const serviceCards = document.querySelectorAll('.service-card');
            
            serviceCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-10px) scale(1.02)';
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(0) scale(1)';
                });
            });
        }

        // Add to the existing DOMContentLoaded event listener
        document.addEventListener('DOMContentLoaded', () => {
            new HeroSlider();
            handleScrollAnimations();
            handleNewsletterSubmission();
            
            // Initialize new functionality
            initPortfolioFilters();
            new TestimonialsSlider();
            initServiceCards();
            
            setTimeout(() => {
                document.body.classList.add('loaded');
            }, 500);
        });
