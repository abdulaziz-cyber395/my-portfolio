// Figma design showcase — data-driven grid, same pattern as projects-data.js
// To wire up a design's live link, replace its `liveUrl` below with the
// Figma PROTOTYPE link (figma.com/proto/...), not the file/edit link.
// See README note in DEVELOPER_GUIDE.md for why.
const figmaDesigns = [
  {
    id: "figma-design-1",
    title: "Financial Services Landing Page",
    image: "assets/figma img/figma design1.png",
    liveUrl: "https://www.figma.com/proto/IuF1lrFXFFGc4aVI0KzA59/aziz?t=SAu9yIWB2AzUf9ae-1"
  },
  {
    id: "figma-design-2",
    title: "Payze — Fintech App Landing",
    image: "assets/figma img/figma design 2.png",
    liveUrl: "https://www.figma.com/proto/BwZhXeUrkqSkmmQUd0yuOw/Untitled?t=SAu9yIWB2AzUf9ae-1"
  },
  {
    id: "figma-design-3",
    title: "K Good Food — Restaurant & Delivery",
    image: "assets/figma img/figma design 3.png",
    liveUrl: "https://www.figma.com/proto/2tsb36eZDA4HurR0jqy84s/aziz?t=SAu9yIWB2AzUf9ae-1"
  },
  {
    id: "figma-design-4",
    title: "VRTech.ID — Virtual Reality Landing",
    image: "assets/figma img/figma design 4.png",
    liveUrl: "https://www.figma.com/proto/XT3OJuSapZTj0Qz6fuYaWR/herosection?t=SAu9yIWB2AzUf9ae-1"
  },
  {
    id: "figma-design-5",
    title: "RevasTech — Corporate Website",
    image: "assets/figma img/figma design 5.png",
    liveUrl: "https://www.figma.com/proto/BGFiynEBeU8HXPRSAfEemX/RevasTech-website?t=SAu9yIWB2AzUf9ae-1"
  },
  {
    id: "figma-design-6",
    title: "Poveda — Travel & Tourism Landing",
    image: "assets/figma img/figma design 6.png",
    liveUrl: "https://www.figma.com/proto/kAwUv21DRsK87AhLZmjyB4/Untitled?t=SAu9yIWB2AzUf9ae-1"
  },
  {
    id: "figma-design-7",
    title: "Ghana Symbols — Educational Platform",
    image: "assets/figma img/figma design 7.png",
    liveUrl: "https://www.figma.com/proto/8eMyaIHdodwTqgL3HorKdI/GH-webpage-design?t=SAu9yIWB2AzUf9ae-1"
  }
];

function renderFigmaDesigns(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const cardsHtml = figmaDesigns.map(design => `
    <a href="${design.liveUrl}" class="figma-card" ${design.liveUrl !== '#' ? 'target="_blank" rel="noopener noreferrer"' : ''} aria-label="See live design: ${design.title}">
      <div class="figma-card-image">
        <img src="${design.image}" alt="${design.title} — Figma design screenshot" width="320" height="240" loading="lazy">
      </div>
      <div class="figma-card-overlay" aria-hidden="true">
        <i class="fa-solid fa-eye"></i>
        <span>See Live Design</span>
      </div>
      <div class="figma-card-title">${design.title}</div>
    </a>
  `).join('');

  container.innerHTML = cardsHtml;
}

document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('figma-designs-grid')) {
    renderFigmaDesigns('figma-designs-grid');
  }
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { figmaDesigns, renderFigmaDesigns };
}
