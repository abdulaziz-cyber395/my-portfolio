// Project filtering functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectDetails = document.querySelectorAll('.project-detail');

  if (filterButtons.length && projectDetails.length) {
    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        filterButtons.forEach((btn) => {
          btn.classList.remove('active');
          btn.setAttribute('aria-pressed', 'false');
        });
        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');

        const filter = button.dataset.filter;

        projectDetails.forEach((project) => {
          if (filter === 'all') {
            project.classList.remove('hidden');
          } else {
            const category = project.dataset.category;
            if (category === filter) {
              project.classList.remove('hidden');
            } else {
              project.classList.add('hidden');
            }
          }
        });
      });
    });
  }

  // Handle project detail navigation with smooth scroll and highlighting
  const projectDetailSection = document.querySelectorAll('.project-detail');
  if (projectDetailSection.length > 0) {
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

  // Contact form submission with Formspree
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const statusEl = document.getElementById('contact-status');

    const setStatus = (message, type) => {
      if (!statusEl) return;
      statusEl.textContent = message || '';
      statusEl.classList.remove('is-success', 'is-error');
      if (type === 'success') statusEl.classList.add('is-success');
      if (type === 'error') statusEl.classList.add('is-error');
    };

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      if (!submitBtn) return;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      contactForm.setAttribute('aria-busy', 'true');
      setStatus('Sending your message...', null);

      const formData = new FormData(contactForm);

      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      .then(async (response) => {
        if (response.ok) {
          contactForm.reset();
          setStatus('Message sent! Thanks for reaching out — I’ll get back to you soon.', 'success');
          submitBtn.textContent = 'Sent ✓';

          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            contactForm.removeAttribute('aria-busy');
          }, 2500);
          return;
        }

        // Try to parse Formspree error message if possible.
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
        contactForm.removeAttribute('aria-busy');
      })
      .catch(() => {
        setStatus('Network error — please try again in a moment.', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        contactForm.removeAttribute('aria-busy');
      });
    });
  }

  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('#main-nav');
  const navLinks = document.querySelectorAll('#navbar a');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.classList.toggle('active');
      mainNav.classList.toggle('active', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const revealTargets = document.querySelectorAll([
    '.hero-text',
    '.hero-image',
    '.section-title',
    '.section-intro',
    '.card',
    '.project-card',
    '.project-detail',
    '.skill-group',
    '.contact-method'
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
});