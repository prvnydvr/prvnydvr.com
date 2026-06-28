import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Mail, 
  Check, 
  Send,
  AlertCircle
} from 'lucide-react';

import { 
  PERSONAL_INFO, 
  PROJECTS_DATA, 
  BLOG_POSTS_DATA, 
  THREED_DATA, 
  SKILL_GROUPS, 
  RESUME_TIMELINE 
} from './data';
import { Project, BlogPost, ThreeDItem } from './types';

// Child components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProjectCard from './components/ProjectCard';
import BlogCard from './components/BlogCard';
import ThreeDCard from './components/ThreeDCard';
import ThreeDDetailModal from './components/ThreeDDetailModal';
import CaseStudyLayout from './components/CaseStudyLayout';
import { applySeo, getRoutePath, parseLocationToRoute } from './seo';

export default function App() {
  const [route, setRoute] = useState<string>('home');
  const [slug, setSlug] = useState<string>('');
  
  // Interactive UI states
  const [projectFilter, setProjectFilter] = useState<string>('All');
  const [selected3DItem, setSelected3DItem] = useState<ThreeDItem | null>(null);
  
  // Contact Form states
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactRole, setContactRole] = useState('collaboration');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [formError, setFormError] = useState('');

  // Synchronize layout with Hash URL router
  useEffect(() => {
    const syncLocation = () => {
      const parsed = parseLocationToRoute(window.location);
      setRoute(parsed.route);
      setSlug(parsed.slug);

      if (window.location.hash.startsWith('#/')) {
        window.history.replaceState(null, '', getRoutePath(parsed.route, parsed.slug));
      }
    };

    syncLocation();

    window.addEventListener('popstate', syncLocation);
    window.addEventListener('hashchange', syncLocation);
    return () => {
      window.removeEventListener('popstate', syncLocation);
      window.removeEventListener('hashchange', syncLocation);
    };
  }, []);

  // Set the current URL path while preserving SPA navigation.
  const navigateTo = (newRoute: string, newSlug = '') => {
    const targetPath = getRoutePath(newRoute, newSlug);
    window.history.pushState(null, '', targetPath);
    setRoute(newRoute);
    setSlug(newSlug);
    window.scrollTo({ top: 0 });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      setFormError('Please fill out all fields before submitting.');
      return;
    }
    
    // Quick validation regex check 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
      setFormError('Please provide a valid email address.');
      return;
    }

    setFormError('');
    setIsSubmitSuccessful(true);
    
    // Clear state
    setContactName('');
    setContactEmail('');
    setContactMessage('');
    
    // Revert success notification after 5 secs
    setTimeout(() => {
      setIsSubmitSuccessful(false);
    }, 6000);
  };

  // Get project data by matching slug
  const activeProject = PROJECTS_DATA.find(p => p.slug === slug);
  // Get blog details by matching slug
  const activeBlog = BLOG_POSTS_DATA.find(b => b.slug === slug);
  const isKnownRoute = ['home', 'projects', 'blog', '3d', 'about', 'resume', 'contact', '404'].includes(route);
  const isNotFound = !isKnownRoute || route === '404' || (route === 'projects' && Boolean(slug) && !activeProject) || (route === 'blog' && Boolean(slug) && !activeBlog);

  useEffect(() => {
    applySeo({ route, slug, project: activeProject, blog: activeBlog, isNotFound });
  }, [activeBlog, activeProject, isNotFound, route, slug]);

  // Featured project list for the homepage.
  const featuredProjects = PROJECTS_DATA.filter(p => 
    p.slug === 'peernest' || p.slug === 'parchhain' || p.slug === 'temp-clipboard'
  );
  const projectCategories = ["All", ...Array.from(new Set(PROJECTS_DATA.map((project) => project.category)))];

  return (
    <div id="portfolio_root" className="min-h-screen bg-[#FAFAF7] text-neutral-900 selection:bg-neutral-200 selection:text-neutral-900 flex flex-col font-sans">
      
      {/* Sticky Header Navbar */}
      <Navbar currentRoute={route === 'projects' && slug ? `projects-${slug}` : (route === 'blog' && slug ? `blog-${slug}` : route)} onNavigate={(r) => navigateTo(r)} />

      {/* Main Page View Router Switch with standard Motion Container */}
      <main className="flex-1 w-full">
        <AnimatePresence mode="wait">
          
          {/* RENDER CASE STUDY PAGE DETAILED ROUTE */}
          {route === 'projects' && slug && activeProject && !isNotFound ? (
            <motion.div
              key={`case-study-${slug}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CaseStudyLayout 
                project={activeProject} 
                relatedProjects={PROJECTS_DATA.filter((project) => project.slug !== activeProject.slug).slice(0, 2)}
                onBack={() => navigateTo('projects')} 
                onNavigate={(r) => navigateTo(r)} 
              />
            </motion.div>
          ) : null}

          {/* RENDER BLOG READER ROUTE */}
          {route === 'blog' && slug && activeBlog && !isNotFound ? (
            <motion.div
              key={`blog-${slug}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto px-6 py-16 space-y-10 text-left"
            >
              {/* Back breadcrumb */}
              <button 
                onClick={() => navigateTo('blog')}
                className="inline-flex items-center gap-1 text-xs font-mono text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer focus:outline-none"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                <span>Return to Journal</span>
              </button>

              <header className="space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-400">
                  <span className="uppercase font-semibold tracking-wider text-neutral-550">{activeBlog.category}</span>
                  <span>{activeBlog.date}</span>
                  {activeBlog.readingTime ? (
                    <>
                      <span>{activeBlog.readingTime}</span>
                    </>
                  ) : null}
                </div>
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-neutral-900 leading-tight">
                  {activeBlog.title}
                </h1>
              </header>

              <div className="border-t border-[#E5E5E5] pt-10 text-neutral-800 leading-relaxed font-serif text-base md:text-lg space-y-6 max-w-2xl whitespace-pre-line">
                {activeBlog.content}
              </div>

              {/* Reflective student signoff */}
              <div className="mt-16 p-6 border border-neutral-200 bg-white rounded-sm">
                <h4 className="text-sm font-semibold text-neutral-800 mb-1">Notes from {PERSONAL_INFO.name}</h4>
                <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                  I use this journal to keep short notes on projects, code, design decisions, and what I am learning.
                </p>
                <button
                  onClick={() => navigateTo('contact')}
                  className="mt-3 text-xs font-mono text-neutral-900 hover:text-neutral-600 font-semibold"
                >
                  Write a message
                </button>
              </div>
            </motion.div>
          ) : null}

          {/* HOMEPAGE VIEW */}
          {route === 'home' && !isNotFound ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-24 md:space-y-36 pb-24"
            >
              {/* SECTION 1: HERO */}
              <section id="hero_section" className="max-w-4xl mx-auto px-6 pt-16 md:pt-24 text-left">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h1 className="text-4xl sm:text-6xl font-bold text-neutral-900 leading-none">
                      {PERSONAL_INFO.name}
                    </h1>
                    <p className="text-lg sm:text-xl text-neutral-600 font-normal leading-relaxed max-w-2xl">
                      {PERSONAL_INFO.headline}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-neutral-500 leading-relaxed max-w-xl font-sans">
                    {PERSONAL_INFO.shortIntro}
                  </p>

                  {/* 3 compact status chips requested */}
                  <div className="flex flex-wrap gap-2.5">
                    {PERSONAL_INFO.chips.map((chip, idx) => (
                      <span 
                        key={idx}
                        id={`hero_chip_${idx}`} 
                        className="text-[11px] font-mono bg-white border border-[#E5E5E5] px-3 py-1 rounded-sm text-neutral-600 shadow-3xs"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button 
                      onClick={() => navigateTo('projects')}
                      className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs font-semibold rounded-sm tracking-wide cursor-pointer flex items-center gap-2 group transition-all"
                    >
                      <span>Explore Projects</span>
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                    <button 
                      onClick={() => navigateTo('blog')}
                      className="px-5 py-2.5 bg-white hover:bg-neutral-50 text-neutral-800 border border-[#E5E5E5] hover:border-neutral-450 font-mono text-xs font-semibold rounded-sm transition-all cursor-pointer"
                    >
                      Read Journal
                    </button>
                    <button 
                      onClick={() => navigateTo('contact')}
                      className="text-neutral-500 hover:text-neutral-900 font-mono text-xs font-semibold underline underline-offset-4 py-2 px-1 cursor-pointer transition-colors"
                    >
                      Contact
                    </button>
                  </div>
                </div>

              </section>

              {/* CREDIBILITY STRIP */}
              <div className="border-y border-neutral-200 bg-white/55 py-5 px-6">
                <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4 text-left">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold">Selected Projects</span>
                  <p className="text-xs font-mono text-neutral-500">
                    {PERSONAL_INFO.credibilityStrip}
                  </p>
                </div>
              </div>

              {/* SECTION 2: FEATURED PROJECTS */}
              <section id="featured_projects" className="max-w-6xl mx-auto px-6 space-y-12 text-left">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="h-[1px] w-8 bg-neutral-300" />
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">Projects</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-black text-neutral-900 tracking-tight">
                    Featured Projects
                  </h2>
                  <p className="text-sm text-neutral-500 max-w-xl">
                    A simple list of web apps, student tools, writing, and 3D work.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {featuredProjects.map((project) => (
                    <ProjectCard 
                      key={project.slug} 
                      project={project} 
                      onSelectCaseStudy={(s) => navigateTo('projects', s)} 
                    />
                  ))}
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => navigateTo('projects')}
                    className="inline-flex items-center gap-1 text-xs font-mono font-semibold hover:gap-2 transition-all cursor-pointer border-b border-neutral-350 pb-1"
                  >
                    <span>View all projects</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </section>

              {/* SECTION 3: CURRENT FOCUS */}
              <section id="current_focus" className="max-w-6xl mx-auto px-6 space-y-12 text-left">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="h-[1px] w-8 bg-neutral-300" />
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">Current Work</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-black text-neutral-900 tracking-tight">
                    Current Focus
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {PERSONAL_INFO.currentlyFocused.map((focus, idx) => (
                    <div 
                      key={idx}
                      className="p-6 bg-white border border-[#E5E5E5] rounded-sm hover:border-neutral-400 hover:shadow-xs transition-all space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-neutral-400 font-bold">0{idx + 1}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-600 animate-pulse" />
                      </div>
                      <h4 className="font-serif font-bold text-base text-neutral-800">{focus.title}</h4>
                      <p className="text-xs text-neutral-500 leading-relaxed font-sans">{focus.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 4: 3D / CREATIVE TECHNOLOGY PREVIEW */}
              <section id="threed_preview" className="max-w-6xl mx-auto px-6 space-y-12 text-left">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="h-[1px] w-8 bg-neutral-300" />
                      <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">3D Work</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif font-black text-neutral-900 tracking-tight">
                      3D Work
                    </h2>
                    <p className="text-sm text-neutral-500 max-w-sm">
                      Blender studies, render tests, and small visual experiments.
                    </p>
                  </div>
                  <button
                    onClick={() => navigateTo('3d')}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-sm py-1.5 px-3 border border-neutral-200 self-start sm:self-auto cursor-pointer"
                  >
                    <span>Open 3D Library</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {THREED_DATA.slice(0, 4).map((item) => (
                    <ThreeDCard 
                      key={item.id} 
                      item={item} 
                      onSelect={(i) => setSelected3DItem(i)} 
                    />
                  ))}
                </div>
              </section>

              {/* SECTION 5: WRITING / BLOG PREVIEW */}
              <section id="blog_preview" className="max-w-4xl mx-auto px-6 space-y-12 text-left">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="h-[1px] w-8 bg-neutral-300" />
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">Diary</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-black text-neutral-900 tracking-tight">
                    The Student Builder Journal
                  </h2>
                </div>

                <div className="divide-y divide-neutral-200">
                  {BLOG_POSTS_DATA.slice(0, 2).map((post) => (
                    <BlogCard 
                      key={post.slug} 
                      post={post} 
                      onSelectBlog={(s) => navigateTo('blog', s)} 
                    />
                  ))}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => navigateTo('blog')}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold border-b border-neutral-350 pb-1 cursor-pointer"
                  >
                    <span>Read all journal entries</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </section>

              {/* SECTION 6: ABOUT / STORY */}
              <section id="about_story" className="max-w-4xl mx-auto px-6 space-y-12 text-left">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  
                  {/* Words (8 cols) */}
                  <div className="md:col-span-8 space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="h-[1px] w-8 bg-neutral-300" />
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">About</span>
                      </div>
                      <h2 className="text-3xl font-serif font-black text-neutral-900 tracking-tight">
                        About the Builder
                      </h2>
                    </div>

                    <p className="text-base text-neutral-700 font-sans leading-relaxed">
                      {PERSONAL_INFO.aboutFull}
                    </p>

                    <div className="space-y-4">
                      <h4 className="text-xs font-mono font-bold tracking-wider text-neutral-400 uppercase">How I work</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {PERSONAL_INFO.principles.slice(0, 4).map((p, idx) => (
                          <div key={idx} className="border-l border-neutral-850 pl-3">
                            <span className="text-xs font-mono text-neutral-400 font-semibold block">0{idx +1}. {p.title}</span>
                            <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">{p.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Aesthetic Frame (4 cols) */}
                  <div className="md:col-span-4 border border-neutral-200 bg-white p-5 rounded-sm space-y-4">
                    <span className="text-[10px] font-mono text-neutral-400 block uppercase font-bold">{PERSONAL_INFO.location}</span>
                    <hr className="border-neutral-100" />
                    
                    <div className="space-y-3.5 text-xs text-neutral-600 font-sans leading-relaxed">
                      <div>
                        <strong>School:</strong> {PERSONAL_INFO.academics.school}
                      </div>
                      <div>
                        <strong>Academics:</strong> {PERSONAL_INFO.academics.currentClass}. {PERSONAL_INFO.academics.stream}
                      </div>
                      <div>
                        <strong>Class 10:</strong> {PERSONAL_INFO.academics.board}. {PERSONAL_INFO.academics.class10}
                      </div>
                      <div>
                        <strong>Interests:</strong> {PERSONAL_INFO.academics.targetMajors}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => navigateTo('about')}
                      className="text-xs font-mono font-semibold text-neutral-900 underline underline-offset-3 cursor-pointer select-none"
                    >
                      Read full profile
                    </button>
                  </div>

                </div>
              </section>

              {/* SECTION 7: SKILLS MATRIX */}
              <section id="skills_matrix" className="max-w-6xl mx-auto px-6 space-y-12 text-left">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="h-[1px] w-8 bg-neutral-300" />
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">Toolkit</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-black text-neutral-900 tracking-tight">
                    Skills
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {SKILL_GROUPS.map((group, idx) => (
                    <div 
                      key={idx}
                      className="p-6 bg-[#FAF9F5] border border-neutral-250/90 rounded-sm space-y-4"
                    >
                      <h4 className="font-serif font-bold text-base text-neutral-800 border-b border-[#E5E5E5] pb-2.5">
                        {group.category}
                      </h4>
                      <ul className="space-y-2">
                        {group.skills.map((skill, sIdx) => (
                          <li key={sIdx} className="flex items-center gap-2 text-xs text-neutral-650 font-sans">
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 shrink-0" />
                            <span>{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 8: RESUME CTA */}
              <section id="resume_cta" className="max-w-4xl mx-auto px-6 text-left">
                <div className="border border-neutral-300 rounded-sm bg-neutral-50 px-8 py-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="space-y-2 max-w-lg">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-bold">Curriculum Vitae</span>
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-neutral-900 tracking-tight">
                      CV and Timeline
                    </h3>
                    <p className="text-xs text-neutral-500 leading-relaxed font-sans">
                      My profile documents academics, projects, product ideas, technical skills, 3D design practice, and research writing.
                    </p>
                  </div>
                  <button
                    onClick={() => navigateTo('resume')}
                    className="inline-flex items-center gap-1.5 py-3 px-5 text-xs font-mono font-semibold text-white bg-neutral-950 hover:bg-neutral-850 transition-colors uppercase rounded-sm cursor-pointer whitespace-nowrap self-start sm:self-auto"
                  >
                    <span>View CV Timeline</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </section>

              {/* SECTION 9: CONTACT CTA */}
              <section id="contact_cta" className="max-w-4xl mx-auto px-6 text-left">
                <div className="border border-neutral-200 rounded-sm bg-white p-8 md:p-12 space-y-8 shadow-sm">
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-bold">Contact</span>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-neutral-900 leading-tight">
                      Contact Me
                    </h3>
                    <p className="text-sm text-neutral-500 leading-relaxed max-w-xl font-sans">
                      If you are a mentor, peer builder, researcher, recruiter, or collaborator, my inbox is open for serious project and learning conversations.
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-1 flex-wrap">
                    <button
                      onClick={() => navigateTo('contact')}
                      className="px-5 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs font-semibold rounded-sm transition-colors cursor-pointer"
                    >
                      Contact Me
                    </button>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="inline-flex items-center gap-2 text-xs font-mono text-neutral-600 hover:text-black py-2 px-1"
                      referrerPolicy="no-referrer"
                    >
                      <Mail className="w-4 h-4" />
                      <span>{PERSONAL_INFO.email}</span>
                    </a>
                  </div>
                </div>
              </section>

            </motion.div>
          ) : null}

          {/* PROJECTS DIRECTORY VIEW */}
          {route === 'projects' && !slug && !isNotFound ? (
            <motion.div
              key="projects-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-6xl mx-auto px-6 py-12 space-y-12 text-left"
            >
              <header className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="h-[1px] w-8 bg-neutral-300" />
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#B45309]">Projects</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-serif font-black text-neutral-900 tracking-tight">
                  Projects
                </h1>
                <p className="text-sm text-neutral-500 max-w-xl">
                  Web apps, student tools, 3D work, and writing projects.
                </p>
              </header>

              {/* Filtering Controls */}
              <div className="flex flex-wrap items-center gap-2 border-b border-[#E5E5E5] pb-4">
                {projectCategories.map((filterTab) => (
                  <button
                    key={filterTab}
                    id={`filter_tab_${filterTab.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`}
                    onClick={() => setProjectFilter(filterTab)}
                    className={`px-3 py-1.5 text-xs font-mono font-medium rounded-sm border cursor-pointer transition-colors focus:outline-none ${
                      projectFilter === filterTab 
                        ? 'bg-neutral-900 border-neutral-900 text-white font-semibold' 
                        : 'bg-white border-[#E5E5E5] text-neutral-500 hover:border-neutral-450 hover:text-neutral-900'
                    }`}
                  >
                    {filterTab}
                  </button>
                ))}
              </div>

              {/* Grid outputs dynamic filtering */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PROJECTS_DATA.filter((proj) => 
                  projectFilter === 'All' || proj.category === projectFilter
                ).map((project) => (
                  <ProjectCard 
                    key={project.slug} 
                    project={project} 
                    onSelectCaseStudy={(s) => navigateTo('projects', s)} 
                  />
                ))}
              </div>
            </motion.div>
          ) : null}

          {/* DYNAMIC JOURNAL BLOG FEED VIEW */}
          {route === 'blog' && !slug && !isNotFound ? (
            <motion.div
              key="blog-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-4xl mx-auto px-6 py-12 space-y-12 text-left"
            >
              <header className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="h-[1px] w-8 bg-neutral-300" />
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#B45309]">Journal</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-serif font-black text-neutral-900 tracking-tight">
                  Journal
                </h1>
                <p className="text-sm text-neutral-500 max-w-xl">
                  Short notes on projects, code, design, and student life.
                </p>
              </header>

              <div id="blog_magazine" className="divide-y divide-[#E5E5E5] border-t border-[#E5E5E5]">
                {BLOG_POSTS_DATA.map((post) => (
                  <BlogCard 
                    key={post.slug} 
                    post={post} 
                    onSelectBlog={(s) => navigateTo('blog', s)} 
                  />
                ))}
              </div>
            </motion.div>
          ) : null}

          {/* 3D LIBRARY ARCHIVE VIEW */}
          {route === '3d' && !isNotFound ? (
            <motion.div
              key="threed-vault"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-6xl mx-auto px-6 py-12 space-y-12 text-left"
            >
              <header className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="h-[1px] w-8 bg-neutral-300" />
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">3D Work</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-serif font-black text-neutral-900 tracking-tight">
                  3D Library
                </h1>
                <p className="text-sm text-neutral-500 max-w-xl">
                  Blender renders, material studies, and small visual experiments.
                </p>
              </header>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {THREED_DATA.map((item) => (
                  <ThreeDCard 
                    key={item.id} 
                    item={item} 
                    onSelect={(i) => setSelected3DItem(i)} 
                  />
                ))}
              </div>
            </motion.div>
          ) : null}

          {/* ABOUT PROFILE DETAILED VIEW */}
          {route === 'about' && !isNotFound ? (
            <motion.div
              key="about-long"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-4xl mx-auto px-6 py-12 space-y-12 text-left"
            >
              <header className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="h-[1px] w-8 bg-neutral-300" />
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">Bio</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-serif font-black text-neutral-900 tracking-tight">
                  About {PERSONAL_INFO.name}
                </h1>
                <p className="text-sm font-mono text-neutral-500">
                   {PERSONAL_INFO.location}. {PERSONAL_INFO.email}
                </p>
              </header>

              {/* Comprehensive visual prose split */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                <div className="md:col-span-8 space-y-6 text-sm text-neutral-700 font-sans leading-relaxed">
                  <p>
                    {PERSONAL_INFO.aboutFull}
                  </p>
                  
                  <p>
                    I focus on practical developer tools, local institutional databases, and 3D work. I am preparing for undergraduate study in Computer Science, with interest in Human Computer Interaction and software engineering.
                  </p>

                  <h3 className="font-serif font-bold text-lg text-neutral-950 pt-2 border-b border-[#E5E5E5] pb-2">
                    Why I build simple tools
                  </h3>
                  <p>
                    Living and studying in Lucknow taught me that software has to work under real constraints. Many students use shared devices, limited networks, and small screens.
                  </p>
                  <p>
                    I try to keep my tools simple, fast, and clear. Temp Clipboard taught me how much product trust depends on small choices like expiry, passwords, and plain instructions.
                  </p>

                  <h3 className="font-serif font-bold text-lg text-neutral-950 pt-2 border-b border-[#E5E5E5] pb-2">
                    Research and writing
                  </h3>
                  <p>
                    Outside programming, I write about how technology affects students, learning, and access in India.
                  </p>
                </div>

                {/* Right side specifications sheet */}
                <div className="md:col-span-4 space-y-6">
                  <div className="border border-neutral-200 bg-[#FAF9F5] p-5 rounded-sm space-y-4">
                    <h4 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">School</h4>
                    
                    <div className="space-y-4 text-xs font-sans text-neutral-600">
                      <div>
                        <strong className="block text-neutral-800">Grade Path:</strong>
                        {PERSONAL_INFO.academics.currentClass}. {PERSONAL_INFO.academics.stream}
                      </div>
                      <div>
                        <strong className="block text-neutral-800">Matriculation (Grade 10):</strong>
                        {PERSONAL_INFO.academics.class10}
                      </div>
                      <div>
                        <strong className="block text-neutral-800">Target Majors:</strong>
                        {PERSONAL_INFO.academics.targetMajors}
                      </div>
                      <div>
                        <strong className="block text-neutral-800">Study Languages:</strong>
                        {PERSONAL_INFO.academics.languages}
                      </div>
                    </div>
                  </div>

                  <div className="border border-neutral-200 bg-white p-5 rounded-sm space-y-3">
                    <h5 className="text-xs font-mono font-bold text-neutral-800 uppercase">How I work</h5>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      I learn by building real projects, documenting what worked, and improving the next version.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom CTA block */}
              <div className="pt-8 border-t border-neutral-200 flex justify-end">
                <button
                  onClick={() => navigateTo('resume')}
                  className="px-5 py-3 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-white font-mono text-xs font-semibold rounded-sm select-none cursor-pointer"
                >
                  View CV Timeline
                </button>
              </div>
            </motion.div>
          ) : null}

          {/* RESUME / ADMISSIONS PROFILE TIMELINE VIEW */}
          {route === 'resume' && !isNotFound ? (
            <motion.div
              key="resume-timeline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-4xl mx-auto px-6 py-12 space-y-12 text-left"
            >
              <header className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="h-[1px] w-8 bg-neutral-300" />
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#B45309]">Timeline</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-serif font-black text-neutral-900 tracking-tight">
                  Portfolio Timeline
                </h1>
                <p className="text-sm text-neutral-500">
                  Education, projects, tools, and creative practice.
                </p>
              </header>

              {/* Profile Grid splits info */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-4">
                
                {/* Left timeline (8 cols) */}
                <div className="md:col-span-8 space-y-8">
                  <h3 className="text-lg font-serif font-bold text-neutral-900 border-b border-[#E5E5E5] pb-2 text-left">
                    Timeline
                  </h3>
                  
                  <div className="space-y-8 relative pl-6 border-l-2 border-[#E5E5E5]">
                    {RESUME_TIMELINE.map((item, idx) => (
                      <div key={idx} className="relative space-y-1.5 text-left">
                        {/* Bullet point on line */}
                        <span className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 bg-neutral-900 rounded-full border-4 border-[#FAFAF7]" />
                        
                        <div className="flex flex-wrap items-baseline justify-between gap-1">
                          <span className="text-xs font-mono text-neutral-450 font-bold text-slate-500">{item.period}</span>
                          <span className="text-xs font-mono text-neutral-400 font-semibold">{item.institution}</span>
                        </div>
                        <h4 className="font-serif font-bold text-base text-neutral-900">
                          {item.title}
                        </h4>
                        <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Research & Publications Section */}
                  <h3 className="text-lg font-serif font-bold text-neutral-900 border-b border-[#E5E5E5] pb-2 pt-6 text-left">
                    Research and Writing
                  </h3>
                  <div className="space-y-4">
                    <div className="p-5 border border-neutral-200 bg-white rounded-sm space-y-2">
                      <span className="text-[10px] font-mono text-neutral-450 text-neutral-400 block uppercase font-bold">Writing</span>
                      <h4 className="font-serif font-bold text-base text-neutral-900">Research and Writing Notes</h4>
                      <p className="text-xs text-neutral-550 text-neutral-600 leading-relaxed font-sans">
                        Developing research and writing notes on social media, rural India, student life, and technology’s impact on society.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Specs sidebar (4 cols) */}
                <div className="md:col-span-4 space-y-6 text-left">
                  <div className="border border-neutral-200 bg-white p-5 rounded-sm space-y-4">
                    <h4 className="font-serif font-bold text-neutral-800 text-sm">Skills Inventory</h4>
                    <hr className="border-neutral-100" />
                    
                    <div className="space-y-4 text-xs font-sans">
                      {SKILL_GROUPS.map((group, idx) => (
                        <div key={idx} className="space-y-1.5">
                          <span className="font-mono text-[9px] text-neutral-400 block uppercase tracking-wider">{group.category}</span>
                          <p className="text-neutral-700 leading-normal font-medium">
                            {group.skills.join(', ')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border border-neutral-200 bg-[#FAF9F5] p-5 rounded-sm space-y-3">
                    <h5 className="text-[10px] font-mono text-neutral-400 block uppercase tracking-wider font-bold">Academic Details</h5>
                    <div className="text-xs font-mono space-y-1 text-neutral-600">
                      <div>Board: {PERSONAL_INFO.academics.board}</div>
                      <div>Class 10: {PERSONAL_INFO.academics.class10}</div>
                      <div>Class 12: {PERSONAL_INFO.academics.currentClass}</div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          ) : null}

          {/* CONTACT FORM VIEW */}
          {route === 'contact' && !isNotFound ? (
            <motion.div
              key="contact-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-2xl mx-auto px-6 py-12 space-y-12 text-left"
            >
              <header className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="h-[1px] w-8 bg-neutral-300" />
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#B45309]">Contact</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-serif font-black text-neutral-900 tracking-tight">
                  Contact
                </h1>
                <p className="text-sm text-neutral-500">
                  Send feedback, project notes, mentorship advice, or collaboration ideas.
                </p>
              </header>

              {/* Clean client interface */}
              <div className="bg-white border border-[#E5E5E5] rounded-sm p-6 sm:p-10 space-y-8 shadow-xs">
                
                {/* Form state alert loops */}
                {isSubmitSuccessful && (
                  <div className="p-4 bg-emerald-50 border border-emerald-250 rounded-sm text-emerald-800 text-xs flex gap-2 items-start animate-fade-in">
                    <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-medium">Message ready</strong>
                      <p className="mt-0.5 leading-relaxed text-emerald-700">
                        Thank you. This demo form saved the message state.
                      </p>
                    </div>
                  </div>
                )}

                {formError && (
                  <div className="p-4 bg-rose-50 border border-rose-200 rounded-sm text-rose-800 text-xs flex gap-2 items-start">
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-medium">Check the form</strong>
                      <p className="mt-0.5 leading-relaxed text-rose-700">{formError}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono font-medium text-neutral-500 uppercase">Your Name</label>
                      <input 
                        type="text" 
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Your name" 
                        className="w-full text-sm font-sans bg-[#FAFAF8] border border-neutral-250 py-3 px-4 rounded-xs text-neutral-800 focus:outline-none focus:border-neutral-500 focus:bg-white transition-all transition-colors"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono font-medium text-neutral-500 uppercase">Email Address</label>
                      <input 
                        type="email" 
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="sarah@institution.edu" 
                        className="w-full text-sm font-sans bg-[#FAFAF8] border border-neutral-250 py-3 px-4 rounded-xs text-neutral-800 focus:outline-none focus:border-neutral-500 focus:bg-white transition-all transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-medium text-neutral-500 uppercase">Message Type</label>
                    <select 
                      value={contactRole}
                      onChange={(e) => setContactRole(e.target.value)}
                      className="w-full text-sm font-sans bg-[#FAFAF8] border border-neutral-250 py-3 px-4 rounded-xs text-neutral-800 focus:outline-none focus:border-neutral-500 focus:bg-white transition-all"
                    >
                      <option value="collaboration">Research and Project Collaboration</option>
                      <option value="portfolio">Portfolio or Project Question</option>
                      <option value="mentorship">Mentorship or CS Guidance</option>
                      <option value="critique">General Critique or Feedback</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-medium text-neutral-500 uppercase font-bold">Your Message</label>
                    <textarea 
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      rows={5} 
                      placeholder="Write your message"
                      className="w-full text-sm font-sans bg-[#FAFAF8] border border-neutral-250 py-3 px-4 rounded-xs text-neutral-850 focus:outline-none focus:border-neutral-500 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 hover:bg-neutral-850 text-white font-mono text-xs font-semibold rounded-sm transition-colors cursor-pointer"
                    >
                      <span>Send Message</span>
                      <Send className="w-3.5 h-3.5 text-neutral-400" />
                    </button>
                  </div>
                </form>

              </div>
              
              {/* Secondary direct links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-neutral-500">
                <div className="p-4 border border-neutral-200 rounded-sm bg-neutral-50">
                  <strong className="block text-neutral-800 mb-1">Personal Email:</strong>
                  <p className="mb-2 text-neutral-500 leading-relaxed">For general contact, college/application communication, and direct messages.</p>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:underline break-all">{PERSONAL_INFO.email}</a>
                  <strong className="block text-neutral-800 mt-4 mb-1">Work Email:</strong>
                  <p className="mb-2 text-neutral-500 leading-relaxed">For projects, collaborations, professional inquiries, and building-related conversations.</p>
                  <a href={`mailto:${PERSONAL_INFO.workEmail}`} className="hover:underline break-all">{PERSONAL_INFO.workEmail}</a>
                </div>
                <div className="p-4 border border-neutral-200 rounded-sm bg-neutral-50">
                  <strong className="block text-neutral-800 mb-1">Active Social Accounts:</strong>
                  <div className="flex gap-3 flex-wrap">
                    <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="hover:text-black">GitHub</a>
                    <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-black">LinkedIn</a>
                    <a href={PERSONAL_INFO.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-black">Instagram</a>
                    <span>{PERSONAL_INFO.handle}</span>
                  </div>
                </div>
              </div>

            </motion.div>
          ) : null}

          {/* NOT FOUND VIEW */}
          {isNotFound ? (
            <motion.div
              key="not-found"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-3xl mx-auto px-6 py-20 space-y-8 text-left"
            >
              <header className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="h-[1px] w-8 bg-neutral-300" />
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#B45309]">404</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-serif font-black text-neutral-900 tracking-tight">
                  Page Not Found
                </h1>
                <p className="text-sm text-neutral-500 max-w-xl">
                  The page you are looking for does not exist or has moved.
                </p>
              </header>

              <div className="flex flex-wrap gap-3">
                <a
                  href={getRoutePath('home')}
                  onClick={(event) => {
                    event.preventDefault();
                    navigateTo('home');
                  }}
                  className="px-5 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs font-semibold rounded-sm transition-colors"
                >
                  Go Home
                </a>
                <a
                  href={getRoutePath('projects')}
                  onClick={(event) => {
                    event.preventDefault();
                    navigateTo('projects');
                  }}
                  className="px-5 py-3 bg-white hover:bg-neutral-50 text-neutral-800 border border-[#E5E5E5] font-mono text-xs font-semibold rounded-sm transition-colors"
                >
                  View Projects
                </a>
              </div>
            </motion.div>
          ) : null}

        </AnimatePresence>
      </main>

      {/* Structured Curated Footer */}
      <Footer onNavigate={(r) => navigateTo(r)} />

      {/* 3D PORT DETAIL DIALOG VIEW */}
      <AnimatePresence>
        {selected3DItem && (
          <ThreeDDetailModal 
            item={selected3DItem} 
            onClose={() => setSelected3DItem(null)} 
          />
        )}
      </AnimatePresence>

    </div>
  );
}
