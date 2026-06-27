const resumeData = {
  name: "INUSAH ABDUL AZIZ",
  title: "Frontend Developer",
  email: "abdulazizinusah82@gmail.com",
  github: "github.com/abdulaziz-cyber395",
  linkedin: "linkedin.com/in/inusah-abdul-aziz-988445328",
  location: "Accra, Ghana",
  summary: "Aspiring software developer focused on building reliable and meaningful digital systems. Currently strengthening foundations in Information Technology at the Design and Technology Institute while developing practical skills in web development. Interested in AI-driven solutions and creating technology that improves human well-being.",

  skills: {
    technical: [
      { name: "HTML5", icon: "fa-brands fa-html5" },
      { name: "CSS3", icon: "fa-brands fa-css3-alt" },
      { name: "JavaScript (ES6+)", icon: "fa-brands fa-js" },
      { name: "Responsive Design", icon: "fa-solid fa-mobile-screen" },
      { name: "Figma", icon: "fa-brands fa-figma" },
      { name: "Git & GitHub", icon: "fa-brands fa-git-alt" },
      { name: "VS Code", icon: "fa-solid fa-code" },
      { name: "Netlify / Vercel", icon: "fa-solid fa-cloud-arrow-up" }
    ],
    learning: [
      { name: "React", icon: "fa-brands fa-react" },
      { name: "Tailwind CSS", icon: "fa-solid fa-wind" },
      { name: "Node.js", icon: "fa-brands fa-node-js" },
      { name: "APIs & Backend", icon: "fa-solid fa-server" }
    ]
  },

  softSkills: [
    "Problem Solving",
    "System Thinking",
    "Critical Thinking",
    "Attention to Detail",
    "Planning Before Execution",
    "Communication"
  ],

  projects: [
    {
      title: "Ghana National Symbols",
      category: "Educational Platform",
      description: "A research-driven educational platform centralizing Ghanaian national symbols with historical depth and cultural context, making this knowledge accessible to students and curious learners.",
      tech: ["HTML", "CSS", "JavaScript", "Figma"],
      liveUrl: "https://national-symbols-ghana.netlify.app/",
      githubUrl: "https://github.com/abdulaziz-cyber395/symbols-Ghana.git"
    },
    {
      title: "Revas Tech",
      category: "Corporate Website",
      description: "A professional corporate website that transformed how a tech company presents itself online, turning confusion into clarity with strategic design and user-focused architecture.",
      tech: ["HTML", "CSS", "JavaScript"],
      liveUrl: "https://revas-tech.vercel.app/",
      githubUrl: "https://github.com/abdulaziz-cyber395/RevasTech.git"
    },
    {
      title: "Calculator App",
      category: "Interactive Application",
      description: "A foundation project demonstrating JavaScript fundamentals through a clean, intuitive interface that prioritizes user experience.",
      tech: ["HTML", "CSS", "JavaScript"],
      liveUrl: "#",
      githubUrl: "https://github.com/abdulaziz-cyber395/calculator-app"
    },
    {
      title: "Modern Sign Up Form",
      category: "Form Design",
      description: "A user-centric form demonstrating accessibility, validation, and the importance of respecting user time with thoughtful design.",
      tech: ["HTML5", "CSS3", "JavaScript"],
      liveUrl: "#",
      githubUrl: "https://github.com/abdulaziz-cyber395/signup-form"
    }
  ],

  education: [
    {
      title: "NOCTI Certification in Web Development",
      institution: "Design and Technology Institute (DTI)",
      period: "2025 – Present",
      description: "Intensive, project-based training focused on designing, developing, testing, and maintaining modern, responsive websites. Emphasizes real-world projects, professional development workflows, and industry best practices."
    },
    {
      title: "General Science",
      institution: "Tamale Islamic Science Senior High School",
      period: "2023 – 2025",
      description: "Completed a three-year programme that strengthened analytical thinking, research, and problem-solving abilities."
    }
  ]
};

function getAllUniqueTech() {
  const techSet = new Set();
  if (typeof projects !== "undefined" && Array.isArray(projects)) {
    projects.forEach(p => p.tech.forEach(t => techSet.add(t)));
  }
  resumeData.projects.forEach(p => p.tech.forEach(t => techSet.add(t)));
  return Array.from(techSet);
}
