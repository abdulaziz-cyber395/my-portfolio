// Project filtering functionality
// ===== THEME TOGGLE =====
const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

// ===== SCROLL PROGRESS BAR =====
const scrollProgress = document.querySelector('.scroll-progress');
if (scrollProgress) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = `${scrollPercent}%`;
  }, { passive: true });
}

// ===== BACK TO TOP BUTTON =====
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== TYPING ANIMATION =====
const typingElement = document.querySelector('.typing-text');
if (typingElement) {
  const words = ['modern web applications', 'clean interfaces', 'scalable systems', 'intuitive experiences', 'AI-driven solutions'];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 80;
  const deletingSpeed = 40;
  const pauseTime = 2000;

  function measureLongestWord() {
    const computed = getComputedStyle(typingElement);
    const testSpan = document.createElement('span');
    testSpan.style.visibility = 'hidden';
    testSpan.style.position = 'absolute';
    testSpan.style.whiteSpace = 'nowrap';
    testSpan.style.font = `${computed.fontWeight} ${computed.fontSize} ${computed.fontFamily}`;
    document.body.appendChild(testSpan);

    let maxWidth = 0;
    words.forEach(word => {
      testSpan.textContent = word;
      maxWidth = Math.max(maxWidth, testSpan.offsetWidth);
    });

    document.body.removeChild(testSpan);
    typingElement.style.display = 'inline-block';
    typingElement.style.whiteSpace = 'nowrap';
    typingElement.style.minWidth = `${maxWidth}px`;
    typingElement.style.width = `${maxWidth}px`;
  }

  if (prefersReducedMotion) {
    typingElement.textContent = words[0];
  } else {
    measureLongestWord();

    function startAnimation() {
      function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
          typingElement.textContent = currentWord.substring(0, charIndex - 1);
          charIndex--;
        } else {
          typingElement.textContent = currentWord.substring(0, charIndex + 1);
          charIndex++;
        }

        let typeDelay = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentWord.length) {
          typeDelay = pauseTime;
          isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          typeDelay = 300;
        }

        setTimeout(type, typeDelay);
      }

      setTimeout(type, 1000);
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(startAnimation);
    } else {
      window.addEventListener('load', startAnimation);
    }
  }
}

// ===== SCROLL SPY =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#main-nav a');

function updateActiveNav() {
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

// ===== CUSTOM CURSOR =====
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

if (cursorDot && cursorRing && window.matchMedia('(min-width: 1081px)').matches) {
  document.addEventListener('mousemove', (e) => {
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;
    cursorRing.style.left = `${e.clientX}px`;
    cursorRing.style.top = `${e.clientY}px`;
  });

  const hoverElements = document.querySelectorAll('a, button, .card, input, textarea');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
  });
}

// ===== PARALLAX HERO BACKGROUND =====
const parallaxBg = document.querySelector('.parallax-bg');
if (parallaxBg) {
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    parallaxBg.style.transform = `translate(${x}px, ${y}px)`;
  });
}

// ===== GLASSMORPHISM ON SCROLL =====
const cards = document.querySelectorAll('.card');
if (cards.length) {
  const glassObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('glass');
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => glassObserver.observe(card));
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
  // '/' to open shortcuts
  if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
    e.preventDefault();
    const modal = document.querySelector('.shortcuts-modal');
    if (modal) modal.classList.add('active');
  }
  // 'Esc' to close modal
  if (e.key === 'Escape') {
    const modal = document.querySelector('.shortcuts-modal');
    if (modal) modal.classList.remove('active');
  }
  // 'T' for back to top
  if (e.key === 't' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  // 'D' for toggle theme
  if (e.key === 'd' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
    e.preventDefault();
    if (themeToggle) themeToggle.click();
  }
});

// Close shortcuts modal
const shortcutsClose = document.querySelector('.shortcuts-close');
const shortcutsModal = document.querySelector('.shortcuts-modal');
if (shortcutsClose && shortcutsModal) {
  shortcutsClose.addEventListener('click', () => shortcutsModal.classList.remove('active'));
  shortcutsModal.addEventListener('click', (e) => {
    if (e.target === shortcutsModal) shortcutsModal.classList.remove('active');
  });
}

// Resume download opens the dedicated resume page

// ===== AVAILABILITY BADGE =====
const badge = document.querySelector('.availability-badge');
if (badge) {
  const hour = new Date().getHours();
  if (hour >= 9 && hour < 18) {
    badge.querySelector('.pulse-dot').style.background = '#6ee7b7';
  } else {
    badge.querySelector('.pulse-dot').style.background = '#fbbf24';
    badge.querySelector('.pulse-dot').nextSibling.textContent = 'Open to Collaborate';
  }
}

// ===== CONTACT FORM ENHANCEMENTS =====
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const nameInput = contactForm.querySelector('#name');
  const emailInput = contactForm.querySelector('#email');
  const subjectInput = contactForm.querySelector('#subject');
  const messageInput = contactForm.querySelector('#message');

  [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
    if (!input) return;
    const icon = document.createElement('span');
    icon.className = 'validation-icon valid-icon fa-solid fa-check';
    icon.setAttribute('aria-hidden', 'true');
    input.parentElement.appendChild(icon);
  });

  function validateField(field, type) {
    const value = field.value.trim();
    const group = field.closest('.form-group');
    const icon = group.querySelector('.validation-icon');

    if (!value) {
      group.classList.remove('valid', 'invalid');
      if (icon) icon.style.opacity = '0';
      return false;
    }

    let isValid = true;
    if (type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(value);
    } else if (type === 'name' || type === 'subject' || type === 'message') {
      isValid = value.length >= 2;
    }

    if (isValid) {
      group.classList.add('valid');
      group.classList.remove('invalid');
      if (icon) {
        icon.className = 'validation-icon valid-icon fa-solid fa-check';
        icon.style.opacity = '1';
      }
    } else {
      group.classList.add('invalid');
      group.classList.remove('valid');
      if (icon) {
        icon.className = 'validation-icon invalid-icon fa-solid fa-xmark';
        icon.style.opacity = '1';
      }
    }

    return isValid;
  }

  if (messageInput) {
    const counter = document.createElement('span');
    counter.className = 'char-counter';
    messageInput.parentElement.appendChild(counter);
    messageInput.addEventListener('input', () => {
      const remaining = 500 - messageInput.value.length;
      counter.textContent = `${messageInput.value.length}/500`;
      if (remaining < 0) {
        counter.style.color = '#f43f5e';
      } else if (remaining < 50) {
        counter.style.color = '#fbbf24';
      } else {
        counter.style.color = 'var(--text-muted)';
      }
    });
  }

  if (nameInput) nameInput.addEventListener('blur', () => validateField(nameInput, 'name'));
  if (emailInput) emailInput.addEventListener('blur', () => validateField(emailInput, 'email'));
  if (subjectInput) subjectInput.addEventListener('blur', () => validateField(subjectInput, 'subject'));
  if (messageInput) messageInput.addEventListener('blur', () => validateField(messageInput, 'message'));
}

// ===== PROJECT DETAIL NAVIGATION =====
// Handled after DOMContentLoaded to ensure dynamic elements exist

// ===== CONTACT FORM SUBMISSION =====
const contactFormEl = document.getElementById('contact-form');
if (contactFormEl) {
  const submitBtn = contactFormEl.querySelector('button[type="submit"]');
  const statusEl = document.getElementById('contact-status');

  const setStatus = (message, type) => {
    if (!statusEl) return;
    statusEl.textContent = message || '';
    statusEl.classList.remove('is-success', 'is-error');
    if (type === 'success') statusEl.classList.add('is-success');
    if (type === 'error') statusEl.classList.add('is-error');
  };

  contactFormEl.addEventListener('submit', function(e) {
    e.preventDefault();

    if (!submitBtn) return;

    const nameInput = contactFormEl.querySelector('#name');
    const emailInput = contactFormEl.querySelector('#email');
    const subjectInput = contactFormEl.querySelector('#subject');
    const messageInput = contactFormEl.querySelector('#message');

    let isValid = true;
    if (nameInput && !validateField(nameInput, 'name')) isValid = false;
    if (emailInput && !validateField(emailInput, 'email')) isValid = false;
    if (subjectInput && !validateField(subjectInput, 'subject')) isValid = false;
    if (messageInput && !validateField(messageInput, 'message')) isValid = false;

    if (!isValid) {
      setStatus('Please fill in all fields correctly.', 'error');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    contactFormEl.setAttribute('aria-busy', 'true');
    setStatus('Sending your message...', null);

    const formData = new FormData(contactFormEl);

    fetch(contactFormEl.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(async (response) => {
      if (response.ok) {
        contactFormEl.reset();
        setStatus('Message sent! Thanks for reaching out — I\'ll get back to you soon.', 'success');
        submitBtn.textContent = 'Sent ✓';

        contactFormEl.querySelectorAll('.form-group').forEach(g => g.classList.remove('valid', 'invalid'));
        const charCounter = contactFormEl.querySelector('.char-counter');
        if (charCounter) charCounter.textContent = '0/500';

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
          contactFormEl.removeAttribute('aria-busy');
        }, 2500);
        return;
      }

      let data = null;
      try {
        data = await response.json();
      } catch {
        // ignore JSON parsing errors
      }

      const msg = data?.error || 'Failed to send message. Please try again.';
      setStatus(msg, 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
      contactFormEl.removeAttribute('aria-busy');
    })
    .catch(() => {
      setStatus('Network error — please try again in a moment.', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
      contactFormEl.removeAttribute('aria-busy');
    });
  });
}

// ===== MOBILE MENU =====
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#main-nav');
const navLinksAll = document.querySelectorAll('#navbar a');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.classList.toggle('active');
    mainNav.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinksAll.forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      mainNav.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ===== PROJECT FILTERING =====
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.getAttribute('data-filter');

    filterButtons.forEach(b => {
      const isActive = b.getAttribute('data-filter') === category;
      b.classList.toggle('active', isActive);
      b.setAttribute('aria-pressed', String(isActive));
    });

    document.querySelectorAll('.project-detail').forEach(detail => {
      const detailCategory = detail.getAttribute('data-category');
      if (category === 'all' || detailCategory === category) {
        detail.classList.remove('hidden');
      } else {
        detail.classList.add('hidden');
      }
    });
  });
});

// ===== DYNAMIC CONTENT HANDLING =====
document.addEventListener('DOMContentLoaded', () => {
  // Project detail navigation
  const projectDetailNav = document.querySelectorAll('.project-detail');
  if (projectDetailNav.length > 0) {
    const currentHash = window.location.hash.slice(1);
    if (currentHash) {
      const targetElement = document.getElementById(currentHash);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        targetElement.style.borderColor = 'rgba(110, 231, 183, 0.3)';
        setTimeout(() => {
          targetElement.style.transition = 'border-color 280ms ease';
          targetElement.style.borderColor = 'rgba(255, 255, 255, 0.07)';
        }, 1000);
      }
    }

    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const targetElement = document.getElementById(hash);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  }

  // Reveal animations for dynamically rendered project details
  const detailTargets = document.querySelectorAll('.project-detail:not(.reveal)');
  if (detailTargets.length) {
    detailTargets.forEach((target, index) => {
      target.classList.add('reveal');
      target.style.transitionDelay = `${Math.min(index * 24, 160)}ms`;
    });

    if ('IntersectionObserver' in window) {
      const detailObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

      detailTargets.forEach(target => detailObserver.observe(target));
    } else {
      detailTargets.forEach(target => target.classList.add('is-visible'));
    }
  }
});

// ===== REVEAL ANIMATIONS =====
const revealTargets = document.querySelectorAll([
  '.hero-text',
  '.hero-image',
  '.section-title',
  '.section-intro',
  '.card',
  '.project-card',
  '.project-detail',
  '.skill-group',
  '.contact-method',
  '.timeline-content',
].join(','));

revealTargets.forEach((target) => target.classList.add('reveal'));

if ('IntersectionObserver' in window && revealTargets.length) {
  const observer = new IntersectionObserver((entries, revealObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

  revealTargets.forEach((target, index) => {
    target.style.transitionDelay = `${Math.min(index * 24, 160)}ms`;
    observer.observe(target);
  });
} else {
  revealTargets.forEach((target) => target.classList.add('is-visible'));
}
