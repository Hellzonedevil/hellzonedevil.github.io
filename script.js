// Enhanced Modern Portfolio JavaScript
document.addEventListener('DOMContentLoaded', () => {
    
    // Create and add scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.prepend(scrollProgress);

    // Scroll Progress Indicator
    window.addEventListener('scroll', () => {
        const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
        const scrollCurrent = window.pageYOffset;
        const scrollPercentage = (scrollCurrent / scrollTotal) * 100;
        scrollProgress.style.width = scrollPercentage + '%';
        
        // Add scrolled class to nav
        const nav = document.querySelector('nav');
        if (scrollCurrent > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // --- Hamburger Menu Logic ---
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const menuLinks = document.querySelector('.menu-links');
    
    if (hamburgerIcon && menuLinks) {
        const navLinks = menuLinks.querySelectorAll('a');

        function toggleMenu() {
            menuLinks.classList.toggle('open');
            hamburgerIcon.classList.toggle('open');
        }

        hamburgerIcon.addEventListener('click', toggleMenu);

        navLinks.forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }

    // --- Button and Icon Click Logic ---
    
    // Download CV Button
    const downloadCvBtn = document.getElementById('download-cv-btn');
    if (downloadCvBtn) {
        downloadCvBtn.addEventListener('click', () => {
            // Add ripple effect
            createRippleEffect(downloadCvBtn, event);
            setTimeout(() => {
                window.open('./assets/Sarvesh-Sai-Rajesh-Resume.pdf', '_blank');
            }, 200);
        });
    }

    // Contact Me Button
    const contactMeBtn = document.getElementById('contact-me-btn');
    if (contactMeBtn) {
        contactMeBtn.addEventListener('click', () => {
            createRippleEffect(contactMeBtn, event);
            setTimeout(() => {
                location.href = './#contact';
            }, 200);
        });
    }

    // Social Media Icons with enhanced effects
    const linkedinIcon = document.getElementById('linkedin-icon');
    if (linkedinIcon) {
        linkedinIcon.addEventListener('click', () => {
            window.open('https://www.linkedin.com/in/ssr55/', '_blank');
        });
    }

    const githubIcon = document.getElementById('github-icon');
    if (githubIcon) {
        githubIcon.addEventListener('click', () => {
            window.open('https://github.com/Hellzonedevil', '_blank');
        });
    }

    // --- Projects Section Filtering Logic ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Add ripple effect
                createRippleEffect(btn, event);
                
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                // Filter project cards with staggered animation
                projectCards.forEach((card, index) => {
                    const category = card.getAttribute('data-category');

                    if (filterValue === 'all' || category === filterValue) {
                        setTimeout(() => {
                            card.style.display = 'block';
                            card.classList.remove('fade-out');
                            card.classList.add('fade-in');
                        }, index * 100);
                    } else {
                        card.classList.remove('fade-in');
                        card.classList.add('fade-out');
                        setTimeout(() => {
                            if (card.classList.contains('fade-out')) {
                                card.style.display = 'none';
                            }
                        }, 300);
                    }
                });
            });
        });

        // Initialize projects with staggered fade-in animation
        projectCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.classList.add('fade-in');
            }, index * 150);
        });

        // Enhanced hover effects for project cards
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                if (!this.classList.contains('fade-out')) {
                    this.style.transform = 'translateY(-15px) scale(1.02)';
                }
            });

            card.addEventListener('mouseleave', function() {
                if (!this.classList.contains('fade-out')) {
                    this.style.transform = 'translateY(0) scale(1)';
                }
            });
        });
    }

    // --- Project Button Handlers ---
    
    // Portfolio Project Buttons
    const portfolioGithubBtn = document.querySelector('[data-project="portfolio"] .btn-color-2');
    const portfolioLiveBtn = document.querySelector('[data-project="portfolio"] .btn-color-1');
    
    if (portfolioGithubBtn) {
        portfolioGithubBtn.addEventListener('click', () => {
            window.open('https://github.com/Hellzonedevil/portfolio-website', '_blank');
        });
    }
    
    if (portfolioLiveBtn) {
        portfolioLiveBtn.addEventListener('click', () => {
            window.open('https://your-portfolio-url.com', '_blank');
        });
    }

    // Sumobot Robowars Project
    const sumobotLinkedInBtn = document.querySelector('[data-project="sumobot-robowars"] .btn-color-1');
    
    if (sumobotLinkedInBtn) {
        sumobotLinkedInBtn.addEventListener('click', () => {
            window.open('https://www.linkedin.com/posts/ssr55_robowars-stem-engineering-activity-7347976965779243008-h-Bk?utm_source=share&utm_medium=member_desktop&rcm=ACoAADNTxGwBrImmSNXiL213VqDfhAaL3jH0YY0', '_blank');
        });
    }

    // ChatHaven Communication App
    const chathavenGithubBtn = document.querySelector('[data-project="chathaven"] .btn-color-2');
    const chathavenPresentationBtn = document.querySelector('[data-project="chathaven"] .btn-color-1');
    
    if (chathavenGithubBtn) {
        chathavenGithubBtn.addEventListener('click', () => {
            window.open('https://github.com/First-Time-Coders/FirstTimeCoders-SOEN341_Project_W25.git', '_blank');
        });
    }
    
    if (chathavenPresentationBtn) {
        chathavenPresentationBtn.addEventListener('click', () => {
            // You'll need to upload the PDF to your assets folder and update this path
            window.open('./assets/chathaven-presentation.pdf', '_blank');
        });
    }

    // ARM Assembly Calculator
    const armGithubBtn = document.querySelector('[data-project="arm-calculator"] .btn-color-2');
    const armDemoBtn = document.querySelector('[data-project="arm-calculator"] .btn-color-1');
    
    if (armGithubBtn) {
        armGithubBtn.addEventListener('click', () => {
            window.open('https://github.com/Hellzonedevil/arm-assembly-calculator', '_blank');
        });
    }
    
    if (armDemoBtn) {
        armDemoBtn.addEventListener('click', () => {
            window.open('https://youtube.com/watch?v=your-demo-video', '_blank');
        });
    }

    // Arduino Home Automation
    const arduinoGithubBtn = document.querySelector('[data-project="arduino-home"] .btn-color-2');
    const arduinoProgressBtn = document.querySelector('[data-project="arduino-home"] .btn-color-1');
    
    if (arduinoGithubBtn) {
        arduinoGithubBtn.addEventListener('click', () => {
            window.open('https://github.com/Hellzonedevil/arduino-home-automation', '_blank');
        });
    }
    
    if (arduinoProgressBtn) {
        arduinoProgressBtn.addEventListener('click', () => {
            showNotification('Project in active development. 70% complete! 🏠', 'success');
        });
    }

    // Data Visualization Dashboard
    const dashboardGithubBtn = document.querySelector('[data-project="data-dashboard"] .btn-color-2');
    const dashboardPreviewBtn = document.querySelector('[data-project="data-dashboard"] .btn-color-1');
    
    if (dashboardGithubBtn) {
        dashboardGithubBtn.addEventListener('click', () => {
            window.open('https://github.com/Hellzonedevil/data-visualization-dashboard', '_blank');
        });
    }
    
    if (dashboardPreviewBtn) {
        dashboardPreviewBtn.addEventListener('click', () => {
            showNotification('Dashboard preview available soon! 📊', 'info');
        });
    }

    // --- Enhanced Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Calculate offset for fixed nav
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Skills Animation on Scroll ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('skill-item')) {
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.opacity = '1';
                } else if (entry.target.classList.contains('details-container')) {
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.opacity = '1';
                }
            }
        });
    }, observerOptions);

    // Observe skill items and detail containers
    document.querySelectorAll('.skill-item, .details-container').forEach(item => {
        item.style.transform = 'translateY(30px)';
        item.style.opacity = '0';
        item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(item);
    });

    // --- Enhanced Button Ripple Effect ---
    function createRippleEffect(button, event) {
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // --- Modern Notification System ---
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'rgba(16, 185, 129, 0.9)' : 
                         type === 'warning' ? 'rgba(245, 158, 11, 0.9)' : 
                         type === 'error' ? 'rgba(239, 68, 68, 0.9)' : 
                         'rgba(99, 102, 241, 0.9)'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            font-family: 'Poppins', sans-serif;
            font-weight: 500;
            transform: translateX(100%);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            max-width: 350px;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // --- Parallax Effect for Background ---
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.section__pic-container img');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // --- Enhanced Loading Animation ---
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Animate elements on page load
        setTimeout(() => {
            const elementsToAnimate = document.querySelectorAll('.title, .section__text__p1, .section__text__p2');
            elementsToAnimate.forEach((element, index) => {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }, 500);
    });

    // --- Enhanced Typing Effect for Title ---
    function typeWriter(element, text, speed = 100) {
        if (!element) return;
        
        element.innerHTML = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Apply typing effect to main title after load
    setTimeout(() => {
        const mainTitle = document.querySelector('#profile .title');
        if (mainTitle) {
            const originalText = mainTitle.textContent;
            typeWriter(mainTitle, originalText, 80);
        }
    }, 1000);

    // --- Keyboard Navigation Enhancement ---
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close hamburger menu if open
            if (menuLinks && menuLinks.classList.contains('open')) {
                menuLinks.classList.remove('open');
                hamburgerIcon.classList.remove('open');
            }
        }
    });

    // --- Enhanced Skill Hover Effects ---
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05) rotateY(5deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
        });
    });

    // --- Dynamic Cursor Effect (Optional) ---
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(99, 102, 241, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
        display: none;
    `;
    document.body.appendChild(cursor);

    if (window.innerWidth > 768) {
        cursor.style.display = 'block';
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });

        // Scale cursor on hover over interactive elements
        const interactiveElements = document.querySelectorAll('button, a, .skill-item, .project-card');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
            });
        });
    }

    console.log('🚀 Modern Portfolio Loaded Successfully!');
});