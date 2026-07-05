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

  // Note: project data intentionally lives only in js/projects-data.js now —
  // resume.js reads that array directly. Don't re-add a hardcoded project
  // list here; it drifted out of sync with projects-data.js before (missing
  // the "Personal Portfolio" project, stale descriptions).

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
