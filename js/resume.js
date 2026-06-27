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

  const renderProjects = () => {
    const section = document.getElementById('resume-projects');
    if (!section) return;

    let projectList = rd.projects || [];

    if (typeof projects !== 'undefined' && Array.isArray(projects) && projects.length > 0) {
      const usedTitle = new Set(projectList.map(p => p.title));
      projects.forEach(p => {
        if (!usedTitle.has(p.title)) {
          projectList.push({
            title: p.title,
            category: p.category,
            description: p.summary,
            tech: p.tech,
            liveUrl: p.liveUrl,
            githubUrl: p.githubUrl
          });
        }
      });
    }

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

  document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderSummary();
    renderSkills();
    renderProjects();
    renderEducation();
  });
})();
