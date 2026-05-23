export const SITE_URL = "https://prvnydvr.com";
export const SITE_NAME = "Praveen Yadav";
export const DEFAULT_OG_IMAGE = "/og/default-og.png";

export const SOCIAL_LINKS = {
  github: "https://github.com/prvnydvr",
  linkedin: "https://www.linkedin.com/in/prvnydvr/",
  instagram: "https://www.instagram.com/prvnydvr/",
};

export const PROJECT_SLUG_ALIASES = {
  "inventory-system": "school-inventory-management-system",
  "tools-hub": "student-tools-hub",
  "3d-library": "3d-design-library",
};

export const PAGE_SEO = {
  home: {
    title: "Praveen Yadav — Student Builder, Frontend Developer & 3D Designer",
    description:
      "Praveen Yadav is a student builder from Lucknow, India, creating web products, student tools, 3D work, and AI-powered product ideas.",
    path: "/",
    image: "/og/home-og.png",
    type: "profile",
  },
  projects: {
    title: "Projects — Praveen Yadav",
    description:
      "Explore projects by Praveen Yadav, including Peernest, Parchhain, Temp Clipboard, Finger Cursor Controller, and student-focused tools.",
    path: "/projects",
    image: "/og/projects-og.png",
    type: "website",
  },
  blog: {
    title: "Writing — Praveen Yadav",
    description:
      "Read writing by Praveen Yadav on building projects, frontend development, student tools, research, and creative technology.",
    path: "/blog",
    image: "/og/blog-og.png",
    type: "website",
  },
  "3d": {
    title: "3D Design Library — Praveen Yadav",
    description:
      "Explore 3D design experiments, Blender work, creative technology concepts, and visual projects by Praveen Yadav.",
    path: "/3d",
    image: "/og/3d-library-og.png",
    type: "website",
  },
  about: {
    title: "About — Praveen Yadav",
    description:
      "Learn about Praveen Yadav, a Class 12 student focused on Computer Science, frontend development, product design, and 3D design.",
    path: "/about",
    image: "/og/about-og.png",
    type: "profile",
  },
  resume: {
    title: "Resume — Praveen Yadav",
    description:
      "View the education, skills, projects, tools, and timeline of Praveen Yadav, a student builder from Lucknow, India.",
    path: "/resume",
    image: "/og/resume-og.png",
    type: "website",
  },
  contact: {
    title: "Contact — Praveen Yadav",
    description:
      "Contact Praveen Yadav for projects, collaborations, college/application communication, and student-builder opportunities.",
    path: "/contact",
    image: "/og/contact-og.png",
    type: "website",
  },
  "404": {
    title: "Page Not Found — Praveen Yadav",
    description: "The page you are looking for does not exist or has moved.",
    path: "/404",
    image: DEFAULT_OG_IMAGE,
    type: "website",
  },
};

export const PROJECT_SEO = {
  peernest: {
    title: "Peernest — Student Collaboration Platform by Praveen Yadav",
    description:
      "Peernest is a student collaboration platform by Praveen Yadav for project ideas, research, teams, and serious student builders.",
    path: "/projects/peernest",
    image: "/og/peernest-og.png",
    schemaType: "SoftwareApplication",
    applicationCategory: "SocialNetworkingApplication",
    repository: "https://github.com/prvnydvr/peernest",
  },
  parchhain: {
    title: "Parchhain — AI-Powered Journal App by Praveen Yadav",
    description:
      "Parchhain is an AI-powered journal and memory app concept by Praveen Yadav for saving, searching, and reflecting on memories.",
    path: "/projects/parchhain",
    image: "/og/parchhain-og.png",
    schemaType: "SoftwareApplication",
    applicationCategory: "ProductivityApplication",
    repository: "https://github.com/prvnydvr/parchhain",
  },
  "temp-clipboard": {
    title: "Temp Clipboard — Privacy-Focused Utility by Praveen Yadav",
    description:
      "Temp Clipboard is a privacy-focused utility by Praveen Yadav for temporary text and image sharing with automatic expiry.",
    path: "/projects/temp-clipboard",
    image: "/og/temp-clipboard-og.png",
    schemaType: "SoftwareApplication",
    applicationCategory: "UtilitiesApplication",
    repository: "https://github.com/prvnydvr/temp-clipboard",
  },
  "finger-cursor-controller": {
    title: "Finger Cursor Controller — Computer Vision Project by Praveen Yadav",
    description:
      "Finger Cursor Controller is a computer vision project by Praveen Yadav for webcam-based gesture cursor control.",
    path: "/projects/finger-cursor-controller",
    image: "/og/finger-cursor-controller-og.png",
    schemaType: "SoftwareApplication",
    applicationCategory: "DeveloperApplication",
    repository: "https://github.com/prvnydvr/finger-cursor-controller",
  },
  "school-inventory-management-system": {
    title: "School Inventory Management System — Institutional Tool by Praveen Yadav",
    description:
      "School Inventory Management System is an institutional inventory workflow tool by Praveen Yadav for organized item tracking.",
    path: "/projects/school-inventory-management-system",
    image: "/og/school-inventory-management-system-og.png",
    schemaType: "SoftwareApplication",
    applicationCategory: "BusinessApplication",
    repository: "https://github.com/prvnydvr/school-inventory-management-system",
  },
  "student-tools-hub": {
    title: "Student Tools Hub — Student Utility Platform by Praveen Yadav",
    description:
      "Student Tools Hub is a student utility platform by Praveen Yadav for academic calculators, study tools, and learning resources.",
    path: "/projects/student-tools-hub",
    image: "/og/student-tools-hub-og.png",
    schemaType: "SoftwareApplication",
    applicationCategory: "EducationalApplication",
    repository: "https://github.com/prvnydvr/student-tools-hub",
  },
  "3d-design-library": {
    title: "3D Design Library — Creative Technology Work by Praveen Yadav",
    description:
      "3D Design Library collects Blender models, visual experiments, render studies, and creative technology work by Praveen Yadav.",
    path: "/projects/3d-design-library",
    image: "/og/3d-design-library-og.png",
    schemaType: "CreativeWork",
  },
  "research-and-writing": {
    title: "Research and Writing — Praveen Yadav",
    description:
      "Research and Writing collects notes by Praveen Yadav on social media, rural India, student life, and technology's impact.",
    path: "/projects/research-and-writing",
    image: "/og/research-and-writing-og.png",
    schemaType: "CreativeWork",
  },
};

export const BLOG_SEO = {
  "why-building-peernest": {
    title: "Why I’m Building Peernest — Praveen Yadav",
    description: "Notes by Praveen Yadav on building Peernest, a student collaboration platform for high-school project builders.",
    path: "/blog/why-building-peernest",
    image: "/og/blog-og.png",
    datePublished: "2026-01-01",
  },
  "designing-parchhain": {
    title: "Designing Parchhain — Praveen Yadav",
    description: "Notes by Praveen Yadav on designing Parchhain, an AI-powered memory journal and personal knowledge concept.",
    path: "/blog/designing-parchhain",
    image: "/og/parchhain-og.png",
    datePublished: "2026-01-01",
  },
  "learned-temp-clipboard": {
    title: "What I Learned from Building Temp Clipboard — Praveen Yadav",
    description: "A short reflection by Praveen Yadav on building Temp Clipboard, a temporary privacy-focused sharing utility.",
    path: "/blog/learned-temp-clipboard",
    image: "/og/temp-clipboard-og.png",
    datePublished: "2026-01-01",
  },
  "designing-student-tools": {
    title: "Designing Tools for Students — Praveen Yadav",
    description: "Thoughts by Praveen Yadav on designing simple, useful, and accessible web tools for students.",
    path: "/blog/designing-student-tools",
    image: "/og/projects-og.png",
    datePublished: "2026-01-01",
  },
  "learning-frontend-development": {
    title: "My Process for Learning Frontend Development — Praveen Yadav",
    description: "Praveen Yadav documents how he learns frontend development by building projects and iterating on interfaces.",
    path: "/blog/learning-frontend-development",
    image: "/og/home-og.png",
    datePublished: "2026-01-01",
  },
  "social-media-rural-india": {
    title: "Social Media and Rural India — Praveen Yadav",
    description: "Research notes by Praveen Yadav on social media, youth, education, and opportunity in rural India.",
    path: "/blog/social-media-rural-india",
    image: "/og/research-and-writing-og.png",
    datePublished: "2026-01-01",
  },
};

export const STATIC_ROUTES = [
  PAGE_SEO.home,
  PAGE_SEO.projects,
  ...Object.values(PROJECT_SEO),
  PAGE_SEO.blog,
  ...Object.values(BLOG_SEO),
  PAGE_SEO["3d"],
  PAGE_SEO.about,
  PAGE_SEO.resume,
  PAGE_SEO.contact,
];
