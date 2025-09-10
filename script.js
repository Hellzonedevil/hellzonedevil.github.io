// Enhanced Modern Portfolio JavaScript
document.addEventListener('DOMContentLoaded', () => {
  // ===== Scroll progress bar =====
  const scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  document.body.prepend(scrollProgress);

  // Cache common nodes
  const nav = document.querySelector('nav');
  const parallaxEls = document.querySelectorAll('.section__pic-container img');

  // Throttled scroll (rAF)
  let ticking = false;
  const onScroll = () => {
    const scrollTotal = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const y = window.pageYOffset || document.documentElement.scrollTop || 0;

    // progress bar
    if (scrollProgress) {
      scrollProgress.style.width = `${(y / scrollTotal) * 100}%`;
    }
    // nav shrink
    if (nav) {
      nav.classList.toggle('scrolled', y > 100);
    }
    // parallax (desktop only)
    if (window.innerWidth > 768) {
      const yPos = -(y * 0.5);
      parallaxEls.forEach((el) => (el.style.transform = `translateY(${yPos}px)`));
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  });

  // ===== Hamburger menu =====
  const hamburgerIcon = document.querySelector('.hamburger-icon');
  const menuLinks = document.querySelector('.menu-links');

  const closeMenu = () => {
    if (!hamburgerIcon || !menuLinks) return;
    menuLinks.classList.remove('open');
    hamburgerIcon.classList.remove('open');
    hamburgerIcon.setAttribute('aria-expanded', 'false');
  };

  const toggleMenu = () => {
    if (!hamburgerIcon || !menuLinks) return;
    menuLinks.classList.toggle('open');
    hamburgerIcon.classList.toggle('open');
    const expanded = hamburgerIcon.classList.contains('open');
    hamburgerIcon.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  };

  if (hamburgerIcon && menuLinks) {
    hamburgerIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close on link click
    menuLinks.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', closeMenu);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!menuLinks.contains(e.target) && !hamburgerIcon.contains(e.target)) {
        closeMenu();
      }
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    // Close if resized to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) closeMenu();
    });
  }

  // ===== Buttons with ripple =====
  function createRippleEffect(button, event) {
    if (!button || !event) return;

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  }

  const onClickWithRipple = (el, cb) => (e) => {
    createRippleEffect(el, e);
    if (cb) setTimeout(cb, 200);
  };

  const downloadCvBtn = document.getElementById('download-cv-btn');
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener(
      'click',
      onClickWithRipple(downloadCvBtn, () => {
        window.open('./assets/Sarvesh-Sai-Rajesh-Resume.pdf', '_blank', 'noopener,noreferrer');
      })
    );
  }

  const contactMeBtn = document.getElementById('contact-me-btn');
  if (contactMeBtn) {
    contactMeBtn.addEventListener(
      'click',
      onClickWithRipple(contactMeBtn, () => {
        location.assign('#contact');
      })
    );
  }

  // ===== Social icons are now semantic <a> links in HTML (no JS needed) =====

  // ===== Project filtering (single source of truth) =====
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length && projectCards.length) {
    // Initial staggered appearance
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

    // Filtering
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        createRippleEffect(btn, e);

        // toggle active
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');
        projectCards.forEach((card, idx) => {
          const category = card.getAttribute('data-category');
          const show = filterValue === 'all' || category === filterValue;

          if (show) {
            setTimeout(() => {
              card.style.display = 'block';
              card.classList.remove('fade-out');
              card.classList.add('fade-in');
            }, idx * 80);
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

    // Hover lift
    projectCards.forEach((card) => {
      card.addEventListener('mouseenter', function () {
        if (!this.classList.contains('fade-out')) {
          this.style.transform = 'translateY(-10px) scale(1.02)';
        }
      });
      card.addEventListener('mouseleave', function () {
        if (!this.classList.contains('fade-out')) {
          this.style.transform = 'translateY(0) scale(1)';
        }
      });
    });
  }

  // ===== Smooth internal anchor scrolling =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      const navHeight = (document.querySelector('nav')?.offsetHeight || 0);
      const y = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  // ===== Intersection animations for skills/containers =====
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.style.transform = 'translateY(0)';
      entry.target.style.opacity = '1';
    });
  }, observerOptions);

  document.querySelectorAll('.skill-item, .details-container').forEach((item) => {
    item.style.transform = 'translateY(30px)';
    item.style.opacity = '0';
    item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(item);
  });

  // ===== Typing effect (optional) =====
  function typeWriter(element, text, speed = 100) {
    if (!element) return;
    element.innerHTML = '';
    let i = 0;
    (function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i++);
        setTimeout(type, speed);
      }
    })();
  }
  setTimeout(() => {
    const mainTitle = document.querySelector('#profile .title');
    if (mainTitle) typeWriter(mainTitle, mainTitle.textContent, 80);
  }, 1000);

  // ===== Fancy cursor on desktop only (optional) =====
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  if (window.innerWidth > 768) {
    document.body.appendChild(cursor);
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX - 10}px`;
      cursor.style.top = `${e.clientY - 10}px`;
    });
    // grow on hover
    const interactive = document.querySelectorAll('button, a, .skill-item, .project-card');
    interactive.forEach((el) => {
      el.addEventListener('mouseenter', () => (cursor.style.transform = 'scale(2)'));
      el.addEventListener('mouseleave', () => (cursor.style.transform = 'scale(1)'));
    });
  }

  // Loaded class
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });

  console.log('🚀 Modern Portfolio Loaded Successfully!');
});
