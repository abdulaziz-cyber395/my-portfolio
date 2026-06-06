// Project filtering functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectDetails = document.querySelectorAll('.project-detail');

  if (filterButtons.length && projectDetails.length) {
    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach((btn) => {
          btn.classList.remove('active');
          btn.setAttribute('aria-pressed', 'false');
        });
        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');

        const filter = button.dataset.filter;

        // Filter projects
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
    // Highlight current project when page loads with hash
    const currentHash = window.location.hash.slice(1);
    if (currentHash) {
      const targetElement = document.getElementById(currentHash);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Add visual highlight
        targetElement.style.borderColor = 'rgba(110, 231, 183, 0.3)';
        setTimeout(() => {
          targetElement.style.transition = 'border-color 280ms ease';
          targetElement.style.borderColor = 'rgba(255, 255, 255, 0.07)';
        }, 1000);
      }
    }

    // Handle hash changes
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