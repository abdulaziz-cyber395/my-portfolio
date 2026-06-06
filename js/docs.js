/* Documentation Page Scripts */

/* Mobile Sidebar Toggle */
const mobileSidebarToggle = document.querySelector('.mobile-sidebar-toggle');
const docsSidebar = document.querySelector('.docs-sidebar');
const sidebarOverlay = document.querySelector('.docs-sidebar-overlay');

function toggleSidebar(open) {
  if (open) {
    docsSidebar.classList.add('open');
    mobileSidebarToggle.classList.add('active');
    mobileSidebarToggle.setAttribute('aria-expanded', 'true');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    docsSidebar.classList.remove('open');
    mobileSidebarToggle.classList.remove('active');
    mobileSidebarToggle.setAttribute('aria-expanded', 'false');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

if (mobileSidebarToggle && docsSidebar && sidebarOverlay) {
  // Initialize aria-expanded
  mobileSidebarToggle.setAttribute('aria-expanded', 'false');

  mobileSidebarToggle.addEventListener('click', () => {
    const isOpen = docsSidebar.classList.contains('open');
    toggleSidebar(!isOpen);
  });

  sidebarOverlay.addEventListener('click', () => {
    toggleSidebar(false);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && docsSidebar.classList.contains('open')) {
      toggleSidebar(false);
      mobileSidebarToggle.focus();
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        toggleSidebar(false);
      }
    });
  });
}

/* Scroll Spy - Highlight active section in sidebar */
const sections = document.querySelectorAll('.docs-section');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveLink() {
  let currentSection = '';
  const scrollPosition = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollPosition >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('resize', setActiveLink);
setActiveLink();

/* Smooth scroll for anchor links */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 40,
        behavior: 'smooth'
      });
    }
  });
});

/* Reset sidebar on resize to desktop */
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (window.innerWidth > 1024) {
      if (docsSidebar && mobileSidebarToggle) {
        docsSidebar.classList.remove('open');
        mobileSidebarToggle.classList.remove('active');
        mobileSidebarToggle.setAttribute('aria-expanded', 'false');
      }
      if (sidebarOverlay) {
        sidebarOverlay.classList.remove('active');
      }
      document.body.style.overflow = '';
    }
  }, 250);
});

/* Optional: Scroll progress indicator */
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  // Uncomment to use CSS custom property for progress bar
  // document.documentElement.style.setProperty('--scroll-progress', `${scrollPercent}%`);
}

window.addEventListener('scroll', updateScrollProgress);
