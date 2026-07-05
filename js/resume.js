(function () {
  'use strict';

  const rd = typeof resumeData !== 'undefined' ? resumeData : null;
  if (!rd) return;

  if (window.location.search.includes('print=true')) {
    window.addEventListener('load', () => {
      setTimeout(() => window.print(), 400);
    });
  }

  const renderHeader = () => {
    const header = document.getElementById('resume-header');
    if (!header) return;
    header.innerHTML = `
      <h1>${rd.name}</h1>
      <h2>${rd.title}</h2>
      <div class="resume-contact">
        <a href="mailto:${rd.email}"><i class="fa-solid fa-envelope"></i> ${rd.email}</a>
        ${rd.location ? `<span><i class="fa-solid fa-location-dot"></i> ${rd.location}</span>` : ''}
        <a href="https://${rd.github}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> ${rd.github}</a>
        <a href="https://${rd.linkedin}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-linkedin"></i> ${rd.linkedin}</a>
      </div>`;
  };

  const renderSummary = () => {
    const section = document.getElementById('resume-summary');
    if (!section) return;
    section.innerHTML = `<h3>Professional Summary</h3><p>${rd.summary}</p>`;
  };

  const renderSkills = () => {
    const section = document.getElementById('resume-skills');
    if (!section) return;

    const technicalHtml = rd.skills.technical.map(s =>
      `<span class="resume-skill-tag"><i class="${s.icon} skill-icon"></i> ${s.name}</span>`
    ).join('');

    const learningHtml = rd.skills.learning.map(s =>
      `<span class="resume-skill-tag resume-skill-learning"><i class="${s.icon} skill-icon"></i> ${s.name}</span>`
    ).join('');

    const softHtml = rd.softSkills.map(s =>
      `<span class="resume-skill-tag resume-skill-soft">${s}</span>`
    ).join('');

    section.innerHTML = `
      <h3>Skills</h3>
      <div class="resume-skills-group">
        <h4 class="resume-skills-heading">Technical Skills</h4>
        <div class="resume-skills">${technicalHtml}</div>
      </div>
      <div class="resume-skills-group">
        <h4 class="resume-skills-heading">Currently Learning</h4>
        <div class="resume-skills">${learningHtml}</div>
      </div>
      <div class="resume-skills-group">
        <h4 class="resume-skills-heading">Soft Skills</h4>
        <div class="resume-skills">${softHtml}</div>
      </div>`;
  };

  const CATEGORY_LABELS = {
    educational: 'Educational Platform',
    corporate: 'Corporate Website',
    'design-system': 'Design System',
    interactive: 'Interactive App',
    'form-design': 'Form Design'
  };

  const renderProjects = () => {
    const section = document.getElementById('resume-projects');
    if (!section) return;

    // Single source of truth: js/projects-data.js. There's no separate
    // resume-only project list anymore, so descriptions can't drift out of
    // sync between the portfolio and the resume.
    const projectList = (typeof projects !== 'undefined' && Array.isArray(projects))
      ? projects.map(p => ({
          title: p.title,
          category: CATEGORY_LABELS[p.category] || p.category,
          description: p.summary,
          tech: p.tech,
          liveUrl: p.liveUrl,
          githubUrl: p.githubUrl
        }))
      : [];

    const itemsHtml = projectList.map(p => {
      const techHtml = p.tech.map(t => `<span class="resume-project-tech">${t}</span>`).join('');
      const links = [];
      if (p.liveUrl && p.liveUrl !== '#') {
        links.push(`<a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="resume-project-link">Live Demo</a>`);
      }
      if (p.githubUrl) {
        links.push(`<a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="resume-project-link">GitHub</a>`);
      }
      const linksHtml = links.join(' <span class="resume-project-separator">|</span> ');

      return `
      <div class="resume-item">
        <div class="resume-item-header">
          <span class="resume-item-title">${p.title}</span>
        </div>
        <div class="resume-item-subtitle">${p.category || 'Project'} ${linksHtml ? '&mdash; ' + linksHtml : ''}</div>
        <p>${p.description || ''}</p>
        <div class="resume-project-techs">${techHtml}</div>
      </div>`;
    }).join('');

    section.innerHTML = `<h3>Selected Projects</h3>${itemsHtml || '<p class="resume-empty">No projects configured yet. Add projects to <code>js/projects-data.js</code> to see them here.</p>'}`;
  };

  const renderEducation = () => {
    const section = document.getElementById('resume-education');
    if (!section) return;

    const itemsHtml = rd.education.map(ed => `
      <div class="resume-item">
        <div class="resume-item-header">
          <span class="resume-item-title">${ed.title}</span>
          <span class="resume-item-date">${ed.period}</span>
        </div>
        <div class="resume-item-subtitle">${ed.institution}</div>
        <p>${ed.description}</p>
      </div>
    `).join('');

    section.innerHTML = `<h3>Education</h3>${itemsHtml}`;
  };

  window.downloadPDF = () => {
    const actions = document.querySelector('.resume-actions');
    const originalDisplay = actions.style.display;
    actions.style.display = 'none';
    
    const container = document.querySelector('.resume-container').cloneNode(true);
    
    const overrideStyles = (root) => {
      root.style.setProperty('background', 'white', 'important');
      root.style.setProperty('color', '#1a1a1a', 'important');
      root.style.setProperty('padding', '2rem', 'important');
      root.style.setProperty('max-width', '820px', 'important');
      root.style.setProperty('font-family', 'Inter, sans-serif', 'important');
      
      root.querySelectorAll('*').forEach(el => {
        el.style.setProperty('color', '#1a1a1a', 'important');
        el.style.setProperty('background', 'transparent', 'important');
      });
      
      root.querySelectorAll('.resume-header h1, .resume-section h3, .resume-item-title').forEach(el => {
        el.style.setProperty('color', '#111827', 'important');
      });
      root.querySelectorAll('.resume-header h2').forEach(el => {
        el.style.setProperty('color', '#059669', 'important');
      });
      root.querySelectorAll('.resume-contact a, .resume-project-link').forEach(el => {
        el.style.setProperty('color', '#059669', 'important');
      });
      root.querySelectorAll('.resume-skill-tag').forEach(el => {
        el.style.setProperty('background', '#f3f4f6', 'important');
        el.style.setProperty('color', '#374151', 'important');
        el.style.setProperty('border', '1px solid #d1d5db', 'important');
      });
      root.querySelectorAll('.resume-project-tech').forEach(el => {
        el.style.setProperty('background', '#f3f4f6', 'important');
        el.style.setProperty('color', '#4b5563', 'important');
        el.style.setProperty('border', '1px solid #e5e7eb', 'important');
      });
    };
    
    overrideStyles(container);
    
    const opt = {
      margin: [0.5, 0.5],
      filename: 'Inusah-Abdul-Aziz-Resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(container).save().then(() => {
      actions.style.display = originalDisplay;
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderSummary();
    renderSkills();
    renderProjects();
    renderEducation();
  });
})();
