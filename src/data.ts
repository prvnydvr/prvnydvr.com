import { Project, BlogPost, ThreeDItem, SkillGroup } from './types';
import peernestBanner from '../assets/images/peernest-project-banner.png';
import parchhainBanner from '../assets/images/parchhain-project-banner.png';
import tempClipboardBanner from '../assets/images/temp-clipboard-project-banner.png';
import fingerCursorBanner from '../assets/images/finger-cursor-controller-banner.png';
import schoolInventoryBanner from '../assets/images/school-inventory-project-banner.png';
import studentToolsBanner from '../assets/images/stud-tools-project-banner.png';
import threeDLibraryBanner from '../assets/images/3d-library-project-banner.png';
import researchWritingBanner from '../assets/images/research-writing-banner.png';

export const PERSONAL_INFO = {
  name: "Praveen Yadav",
  handle: "@prvnydvr",
  location: "Lucknow, Uttar Pradesh, India",
  cityShort: "Lucknow, India",
  email: "praveenyadav.contact@gmail.com",
  workEmail: "work.praveenyadav@gmail.com",
  github: "https://github.com/prvnydvr",
  linkedin: "https://www.linkedin.com/in/prvnydvr/",
  instagram: "https://www.instagram.com/prvnydvr/",
  website: "https://prvnydvr.com",
  role: "Class 12 Student / Frontend Developer / 3D Designer",
  headline: "Student builder working at the intersection of Computer Science, product design, and creative technology.",
  shortIntro: "I’m a high-school student from Lucknow, India, building web products, student tools, 3D experiments, and AI-powered product ideas.",
  chips: [
    "Class 12 · PCM + Computer Science",
    "Frontend Developer · 3D Designer",
    "Building student-focused products"
  ],
  credibilityStrip: "Selected projects: Peernest · Parchhain · Temp Clipboard · Finger Cursor Controller · School Inventory Management System · Student Tools Hub · 3D Design Library",
  aboutFull: "I’m Praveen Yadav, a Class 12 student from Lucknow, India, focused on Computer Science, frontend development, product design, and 3D design. I like building practical tools, student-focused products, and creative digital experiences. My work includes collaboration platforms, privacy-focused utilities, institutional tools, AI-powered product ideas, research writing, and 3D design experiments. I use this portfolio to document what I build, how I think, and what I learn through real projects.",
  academics: {
    currentClass: "Class 12, session 2026–27",
    board: "CBSE",
    stream: "PCM + Computer Science",
    school: "Lucknow Public Schools and Colleges, Gomti Nagar, Lucknow",
    class10: "88.2%",
    targetMajors: "Computer Science, Software Engineering, Product Design, Human-Computer Interaction, Entrepreneurship, Creative Technology",
    languages: "English, Hindi"
  },
  currentlyFocused: [
    { title: "Computer Science fundamentals", desc: "Strengthening core programming, problem solving, and software architecture foundations." },
    { title: "Frontend development", desc: "Building responsive interfaces with React, Next.js basics, Tailwind CSS, and clean UI systems." },
    { title: "AI-assisted product building", desc: "Exploring how AI and LLM workflows can support useful, privacy-aware product ideas." },
    { title: "Student-focused web products", desc: "Designing practical tools and collaboration systems for students and young builders." },
    { title: "3D design and interactive experiences", desc: "Creating Blender scenes, visual experiments, and interactive creative technology concepts." },
    { title: "Product design and documentation", desc: "Documenting decisions, user flows, and what I learn while building real projects." }
  ],
  principles: [
    { title: "Build useful things", desc: "Prioritize practical tools and products that solve real problems." },
    { title: "Learn by building", desc: "Use projects as the main way to learn, test ideas, and improve." },
    { title: "Keep design clear and honest", desc: "Make interfaces simple, readable, and direct without unnecessary overclaiming." },
    { title: "Document the process", desc: "Write down decisions, mistakes, iterations, and lessons from each project." },
    { title: "Solve real student problems", desc: "Start with the friction students actually face and build from there." }
  ]
};

export const PROJECTS_DATA: Project[] = [
  {
    title: "Peernest",
    slug: "peernest",
    category: "Web App / Student Collaboration / Social Platform",
    year: "2026",
    status: "In progress",
    shortDescription: "A social platform for high-school students to collaborate on projects, research, ideas, and brainstorming.",
    problem: "High-school students often have project ideas, research interests, and creative goals, but finding serious collaborators outside their immediate circle can be difficult.",
    solution: "Peernest is being built as a focused student collaboration platform where high-school students can share ideas, discover projects, and connect around research, brainstorming, and opportunities.",
    role: "Founder, designer, and developer",
    techStack: ["React / Next.js", "Tailwind CSS", "Supabase / Firebase", "TypeScript"],
    impact: "Currently being developed as a student-focused collaboration platform.",
    imagePlaceholderColor: "bg-blue-50 text-blue-700 border-blue-100",
    links: {
      github: "https://github.com/prvnydvr/peernest",
      casestudy: "/projects/peernest"
    },
    image: peernestBanner,
    imageAlt: "Peernest student collaboration platform project banner",
    caseStudySections: [
      {
        title: "Problem",
        content: "Many high-school students work on ideas alone because they do not have an easy way to find peers interested in the same projects, research topics, or product ideas. Peernest starts from that collaboration gap."
      },
      {
        title: "Solution",
        content: "The product is planned as a project-first collaboration space. Instead of treating students as generic social profiles, Peernest focuses on ideas, project needs, research interests, and clear ways to start working together."
      },
      {
        title: "My Role",
        content: "I am the founder, designer, and developer. I am responsible for the product direction, interface design, frontend implementation, and database-backed collaboration flow."
      },
      {
        title: "Design Decisions",
        content: "The interface is designed to stay direct and low-friction: readable project cards, clear status labels, focused discovery, and simple actions that help students understand what a project needs."
      },
      {
        title: "Build Process",
        content: "The build process includes designing the product structure, mapping student use cases, experimenting with React or Next.js, and connecting the frontend to Supabase or Firebase depending on the final implementation."
      },
      {
        title: "Challenges",
        content: "The main challenges are trust, clarity, and safety. A student collaboration product needs simple onboarding, thoughtful privacy choices, and clear moderation boundaries."
      },
      {
        title: "Learnings & Next Steps",
        content: "Peernest is teaching me how to think beyond interface screens and into user trust, product constraints, and long-term community design. Next steps include refining the core flows and validating the idea with real student use cases."
      }
    ]
  },
  {
    title: "Parchhain",
    slug: "parchhain",
    category: "AI App / Journal / Memory / Personal Knowledge",
    year: "2026",
    status: "Concept / In progress",
    shortDescription: "An AI-powered personal journal and memory app designed to help users save, search, and reflect on personal memories, screenshots, thoughts, photos, songs, places, and emotional moments.",
    problem: "Personal memories are scattered across screenshots, photos, notes, songs, places, and small emotional moments. Most tools store them, but do not help people meaningfully search or reflect on them later.",
    solution: "Parchhain is a thoughtful AI-powered memory and journaling experience for saving personal moments and rediscovering them through natural language, emotional context, and reflective prompts.",
    role: "Founder, product designer, and developer",
    techStack: ["React / Next.js", "Tailwind CSS", "AI / LLM integration planned", "Privacy-focused storage planned"],
    impact: "Currently being designed as a thoughtful AI-powered memory and journaling experience.",
    imagePlaceholderColor: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100",
    links: {
      github: "https://github.com/prvnydvr/parchhain",
      casestudy: "/projects/parchhain"
    },
    image: parchhainBanner,
    imageAlt: "Parchhain AI-powered journal and memory app project banner",
    caseStudySections: [
      {
        title: "Concept",
        content: "Parchhain is an AI-powered memory journal concept built around personal recall. It is meant for thoughts, screenshots, photos, songs, places, and emotional moments that people want to preserve and revisit."
      },
      {
        title: "Problem",
        content: "Most digital memory tools are organized by date, folder, or media type. Human memory is often emotional and contextual, so users may remember a feeling, a place, a song, or a partial detail instead of an exact filename."
      },
      {
        title: "Product Vision",
        content: "The goal is to make a calm personal knowledge space where users can save memories and later search through them using natural language and emotional context."
      },
      {
        title: "User Experience",
        content: "The experience is planned around simple capture, clean organization, gentle search, and reflection. The product should feel private, personal, and useful without becoming noisy."
      },
      {
        title: "AI Features",
        content: "Planned AI features include semantic memory search, reflective summaries, emotional tagging, and retrieval based on partial descriptions such as a place, mood, screenshot, or moment."
      },
      {
        title: "Privacy Considerations",
        content: "Because the app handles personal memories, privacy is a core product constraint. The project will need careful storage choices, transparent AI usage, and a design that avoids exposing sensitive user data unnecessarily."
      },
      {
        title: "Challenges & Next Steps",
        content: "The main challenge is balancing powerful AI retrieval with user trust. Next steps include designing the capture flow, defining the data model, and prototyping privacy-focused search."
      }
    ]
  },
  {
    title: "Temp Clipboard",
    slug: "temp-clipboard",
    category: "Student Tool / Utility / Privacy Tool",
    year: "2026",
    status: "Live / Built",
    shortDescription: "A temporary clipboard web app for uploading text or images with password protection and automatic self-destruction after 10 minutes.",
    problem: "Students sometimes need to move temporary text or images between devices without keeping long-term traces in email, chats, or shared computers.",
    solution: "Temp Clipboard creates short-lived clipboard entries with password protection and automatic expiry after 10 minutes.",
    role: "Designer and developer",
    techStack: ["HTML", "CSS", "JavaScript", "Firebase"],
    impact: "Built as a simple privacy-focused utility for temporary sharing.",
    imagePlaceholderColor: "bg-amber-50 text-amber-700 border-amber-100",
    links: {
      live: "https://temp-clipboard.web.app",
      github: "https://github.com/prvnydvr/temp-clipboard",
      casestudy: "/projects/temp-clipboard"
    },
    image: tempClipboardBanner,
    imageAlt: "Temp Clipboard privacy-focused sharing utility project banner",
    caseStudySections: [
      {
        title: "Why I Built It",
        content: "Temp Clipboard was built around a simple student need: quickly moving text or images between devices without turning temporary data into permanent chat or email history."
      },
      {
        title: "Temporary Storage",
        content: "The tool is designed around temporary uploads, password protection, and automatic self-destruction after 10 minutes. The goal is to keep the sharing flow short, clear, and privacy-focused."
      },
      {
        title: "Design Choices",
        content: "The interface keeps the main actions visible: add content, protect it, share it, and let it expire. The design avoids unnecessary screens because utility tools should feel fast."
      },
      {
        title: "What I Learned",
        content: "The project helped me understand how small tools can still involve important product decisions: expiry behavior, password handling, user clarity, and trust."
      }
    ]
  },
  {
    title: "Finger Cursor Controller",
    slug: "finger-cursor-controller",
    category: "Computer Vision / Human-Computer Interaction / Python",
    year: "2026",
    status: "Built / Prototype",
    shortDescription: "A computer vision project that lets users control the cursor using finger gestures through a webcam-based interaction system.",
    problem: "Most cursor interaction depends on a mouse or trackpad. Gesture-based control is a useful experiment for learning how computer vision can translate human movement into interface actions.",
    solution: "The project uses webcam input and finger gesture tracking to explore cursor control through hand movement and simple interaction rules.",
    role: "Developer",
    techStack: ["Python", "OpenCV", "MediaPipe", "Computer vision", "Gesture tracking"],
    impact: "Built as an experimental human-computer interaction project exploring gesture-based control.",
    imagePlaceholderColor: "bg-cyan-50 text-cyan-700 border-cyan-100",
    links: {
      github: "https://github.com/prvnydvr/finger-cursor-controller",
      casestudy: "/projects/finger-cursor-controller"
    },
    image: fingerCursorBanner,
    imageAlt: "Finger Cursor Controller computer vision gesture interface project",
    caseStudySections: [
      {
        title: "Problem",
        content: "The project starts from a simple interaction question: can a webcam and hand tracking create a usable cursor-control prototype without relying on a mouse or trackpad?"
      },
      {
        title: "Concept",
        content: "Finger Cursor Controller is an experimental human-computer interaction prototype. It maps finger movement and gestures into cursor behavior, making the hand itself the input device."
      },
      {
        title: "How Gesture Tracking Works",
        content: "The system uses webcam frames, hand landmark detection, and gesture logic to identify finger position. Cursor actions are then triggered from those tracked hand positions and movement patterns."
      },
      {
        title: "Challenges",
        content: "The main challenges are stability, smooth cursor movement, gesture accuracy, lighting conditions, and avoiding accidental clicks or movements."
      },
      {
        title: "What I Learned",
        content: "This prototype helped me understand how computer vision projects connect camera input, landmark detection, interaction rules, and real-time user feedback."
      },
      {
        title: "Next Steps",
        content: "Next steps include improving gesture accuracy, adding clearer calibration, and testing the interaction flow across different lighting and camera setups."
      }
    ]
  },
  {
    title: "School Inventory Management System",
    slug: "school-inventory-management-system",
    category: "Dashboard / Management System / Institutional Tool",
    year: "2025–2026",
    status: "Built / Institutional project",
    shortDescription: "An inventory management system designed for school/institutional inventory workflows.",
    problem: "School and institutional inventory workflows can become difficult to manage when items, counts, and updates are handled manually or across disconnected records.",
    solution: "A simple inventory dashboard designed to support organized item tracking, stock updates, and clearer management workflows.",
    role: "Developer",
    techStack: ["HTML", "CSS", "JavaScript", "Firebase / Supabase if applicable"],
    impact: "Built for institutional inventory management workflows. Exact usage details are kept careful until confirmed.",
    imagePlaceholderColor: "bg-emerald-50 text-emerald-700 border-emerald-100",
    links: {
      github: "https://github.com/prvnydvr/school-inventory-management-system",
      casestudy: "/projects/school-inventory-management-system"
    },
    image: schoolInventoryBanner,
    imageAlt: "School Inventory Management System dashboard project banner",
    caseStudySections: [
      {
        title: "Short Case Study",
        content: "This project is an inventory management system designed for school or institutional workflows. The current public description stays careful and professional: it focuses on the intended workflow, the technical build, and the management problem without overclaiming confirmed usage."
      }
    ]
  },
  {
    title: "Student Tools Hub",
    slug: "student-tools-hub",
    category: "Student Tools / Education / Productivity",
    year: "2026",
    status: "Concept / In progress",
    shortDescription: "A collection of useful tools for students, including academic calculators, study utilities, file tools, and learning resources.",
    problem: "Students often need simple academic utilities, but many online tools are cluttered, distracting, or split across many unrelated sites.",
    solution: "Student Tools Hub is planned as a free collection of focused student utilities in one clean place.",
    role: "Designer and developer",
    techStack: ["HTML", "CSS", "JavaScript", "Tailwind CSS"],
    impact: "Planned as a free tool hub for students.",
    imagePlaceholderColor: "bg-purple-50 text-purple-700 border-purple-100",
    links: {
      github: "https://github.com/prvnydvr/student-tools-hub",
      casestudy: "/projects/student-tools-hub"
    },
    image: studentToolsBanner,
    imageAlt: "Student Tools Hub academic utility platform project banner",
    caseStudySections: [
      {
        title: "Short Case Study",
        content: "Student Tools Hub is planned as a set of useful student utilities, including academic calculators, study tools, file tools, and learning resources. The focus is simple, accessible, student-first design."
      }
    ]
  },
  {
    title: "3D Design Library",
    slug: "3d-design-library",
    category: "3D / Creative Technology / Blender",
    year: "2025–2026",
    status: "Ongoing",
    shortDescription: "A curated library of 3D models, renders, scenes, and visual experiments made using Blender.",
    problem: "3D design practice needs a place where experiments can be collected, reviewed, and presented as part of a broader creative technology portfolio.",
    solution: "The 3D Design Library organizes Blender renders, scenes, and creative experiments into a gallery-style section.",
    role: "3D designer",
    techStack: ["Blender", "Visual design tools"],
    impact: "Ongoing creative and technical practice in 3D design.",
    imagePlaceholderColor: "bg-indigo-50 text-indigo-700 border-indigo-100",
    links: {
      casestudy: "/3d"
    },
    image: threeDLibraryBanner,
    imageAlt: "3D Design Library creative technology project banner",
    caseStudySections: [
      {
        title: "Short Case Study",
        content: "This section is used mainly as a gallery and library for 3D models, renders, scenes, and visual experiments made using Blender. Real renders can be added as they are finalized."
      }
    ]
  },
  {
    title: "Research and Writing",
    slug: "research-and-writing",
    category: "Research / Writing / Social Impact",
    year: "2025–2026",
    status: "In progress",
    shortDescription: "Research and writing projects exploring social media, rural India, student life, and technology’s impact on society.",
    problem: "Technology affects students and communities differently depending on access, location, culture, and opportunity.",
    solution: "This writing track collects research notes and long-form ideas about social media, rural India, student life, and technology’s social impact.",
    role: "Researcher and writer",
    techStack: ["Writing", "Interviews", "Research", "Documentation"],
    impact: "Includes research notes and long-form writing ideas such as social media’s impact on rural youth and Voices of India.",
    imagePlaceholderColor: "bg-rose-50 text-rose-700 border-rose-100",
    links: {
      casestudy: "/projects/research-and-writing"
    },
    image: researchWritingBanner,
    imageAlt: "Research and Writing project banner by Praveen Yadav",
    caseStudySections: [
      {
        title: "Short Case Study",
        content: "Research and Writing is a developing section for notes and long-form writing on social media, rural India, student life, and technology’s impact on society."
      }
    ]
  }
];

export const BLOG_POSTS_DATA: BlogPost[] = [
  {
    title: "Why I’m Building Peernest",
    slug: "why-building-peernest",
    category: "Building in Public",
    date: "2026",
    excerpt: "Notes on building a student collaboration platform for high-school students.",
    readingTime: "Editable draft",
    content: "Placeholder draft. This post will document the product thinking, design decisions, and build process behind Peernest."
  },
  {
    title: "Designing Parchhain: An AI-Powered Memory Journal",
    slug: "designing-parchhain",
    category: "AI Product Design",
    date: "2026",
    excerpt: "Notes on designing a personal memory app that combines journaling, screenshots, photos, emotional search, and AI-powered reflection.",
    readingTime: "Editable draft",
    content: "Placeholder draft. This post will explore the product vision, AI features, privacy questions, and user experience behind Parchhain."
  },
  {
    title: "What I Learned from Building Temp Clipboard",
    slug: "learned-temp-clipboard",
    category: "Student Tools",
    date: "2026",
    excerpt: "A short reflection on building a temporary, privacy-focused sharing tool.",
    readingTime: "Editable draft",
    content: "Placeholder draft. This post will cover what I learned while building Temp Clipboard and thinking through temporary sharing flows."
  },
  {
    title: "Designing Tools for Students",
    slug: "designing-student-tools",
    category: "Product Design",
    date: "2026",
    excerpt: "Thoughts on making simple, useful, and accessible student tools.",
    readingTime: "Editable draft",
    content: "Placeholder draft. This post will collect thoughts on building focused tools for students without clutter."
  },
  {
    title: "My Process for Learning Frontend Development",
    slug: "learning-frontend-development",
    category: "Learning",
    date: "2026",
    excerpt: "How I learn by building projects and improving through iteration.",
    readingTime: "Editable draft",
    content: "Placeholder draft. This post will describe my project-based approach to learning frontend development."
  },
  {
    title: "Social Media and Rural India: Research Notes",
    slug: "social-media-rural-india",
    category: "Research Notes",
    date: "2026",
    excerpt: "Research notes on how social media affects youth, education, and opportunity in rural India.",
    readingTime: "Editable draft",
    content: "Placeholder draft. This post will hold early research notes about social media, rural youth, education, and opportunity."
  }
];

export const THREED_DATA: ThreeDItem[] = [
  {
    id: "3d-1",
    title: "Product Render Placeholder",
    category: "Product renders",
    date: "2025–2026",
    tools: ["Blender", "Visual design tools"],
    imagePlaceholderColor: "from-slate-100 to-zinc-300",
    description: "Placeholder entry for future product renders made in Blender.",
    process: "Real process notes will be added after the final Blender renders are selected.",
    learning: "This section is reserved for ongoing 3D product design practice."
  },
  {
    id: "3d-2",
    title: "Abstract Scene Placeholder",
    category: "Abstract scenes",
    date: "2025–2026",
    tools: ["Blender"],
    imagePlaceholderColor: "from-blue-100 to-indigo-300",
    description: "Placeholder entry for abstract visual experiments and material studies.",
    process: "Real scene notes, materials, and render decisions will be added later.",
    learning: "This space will document lighting, material, and composition experiments."
  },
  {
    id: "3d-3",
    title: "UI/3D Experiment Placeholder",
    category: "UI/3D experiments",
    date: "2025–2026",
    tools: ["Blender", "Figma"],
    imagePlaceholderColor: "from-neutral-100 to-gray-400",
    description: "Placeholder entry for experiments connecting interface design and 3D visuals.",
    process: "Future notes will explain how UI ideas are translated into 3D visual systems.",
    learning: "This section connects product interface thinking with spatial design."
  },
  {
    id: "3d-4",
    title: "Environment Design Placeholder",
    category: "Environment design",
    date: "2025–2026",
    tools: ["Blender"],
    imagePlaceholderColor: "from-amber-100 to-stone-300",
    description: "Placeholder entry for environment scenes and architectural visual experiments.",
    process: "Real environment design notes will be added with final renders.",
    learning: "This section will document composition, lighting, and scene-building practice."
  },
  {
    id: "3d-5",
    title: "Creative Technology Placeholder",
    category: "Creative technology experiments",
    date: "2025–2026",
    tools: ["Blender", "Frontend tools"],
    imagePlaceholderColor: "from-emerald-100 to-teal-300",
    description: "Placeholder entry for experiments at the intersection of 3D design and interactive web experiences.",
    process: "Future notes will connect 3D assets with web-based creative technology experiments.",
    learning: "This section is reserved for interactive and experimental visual work."
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Frontend Skills",
    skills: ["HTML", "CSS", "JavaScript", "React", "Next.js basics", "Tailwind CSS", "Responsive UI design"]
  },
  {
    category: "Backend & Database Skills",
    skills: ["Firebase", "Supabase", "Firestore", "Basic PostgreSQL", "Authentication flows", "Database-backed web apps"]
  },
  {
    category: "Design & Creative Skills",
    skills: ["UI/UX design", "Landing page design", "Product design", "3D design", "Blender", "Visual systems"]
  },
  {
    category: "Tools & Platforms",
    skills: ["GitHub", "VS Code", "Figma", "Firebase", "Supabase", "Blender", "Vercel", "Netlify", "AI coding tools"]
  }
];

export const RESUME_TIMELINE = [
  {
    period: "2026–Present",
    title: "Class 12 Student — PCM + Computer Science",
    institution: "Lucknow Public Schools and Colleges",
    description: "Studying Physics, Chemistry, Mathematics, and Computer Science while building technical and creative projects."
  },
  {
    period: "2026–Present",
    title: "Founder / Builder",
    institution: "Peernest",
    description: "Building a student collaboration platform for high-school students to share ideas, projects, research, and opportunities."
  },
  {
    period: "2026–Present",
    title: "Founder / Product Designer",
    institution: "Parchhain",
    description: "Designing an AI-powered journal and memory app focused on personal memories, emotional search, and reflective writing."
  },
  {
    period: "2026",
    title: "Developer",
    institution: "Temp Clipboard",
    description: "Built a temporary clipboard utility for sharing text and images with password protection and automatic expiry."
  },
  {
    period: "2025–2026",
    title: "Developer",
    institution: "School Inventory Management System",
    description: "Built an inventory management system designed for school/institutional inventory workflows."
  },
  {
    period: "2025–Present",
    title: "3D Designer",
    institution: "Independent Creative Work",
    description: "Creating 3D models, renders, scenes, and visual experiments using Blender."
  }
];
