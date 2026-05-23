import { Project } from '../types';
import { ArrowLeft, Github, ExternalLink, Calendar, CheckCircle, HelpCircle, Code, ShieldCheck } from 'lucide-react';
import { getProjectPath, getRoutePath } from '../seo';

interface CaseStudyLayoutProps {
  project: Project;
  relatedProjects?: Project[];
  onBack: () => void;
  onNavigate: (route: string) => void;
}

export default function CaseStudyLayout({ project, relatedProjects = [], onBack, onNavigate }: CaseStudyLayoutProps) {
  return (
    <article id={`case_study_${project.slug}`} className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs font-mono text-neutral-500">
        <a 
          href={getRoutePath('projects')}
          onClick={(event) => {
            event.preventDefault();
            onBack();
          }}
          className="hover:text-neutral-900 flex items-center gap-1 cursor-pointer py-1 focus:outline-none"
        >
          <ArrowLeft className="w-4.5 h-4.5" />
          <span>Back to Projects</span>
        </a>
        <span>/</span>
        <span className="text-neutral-800 font-medium">{project.title}</span>
      </nav>

      {/* Header Profile Section */}
      <header className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono font-semibold tracking-widest text-neutral-450 text-neutral-400 uppercase">
              {project.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-neutral-900">
              {project.title}
            </h1>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-semibold border bg-neutral-100 text-neutral-800 border-neutral-300">
            {project.status}
          </span>
        </div>

        <p className="text-lg md:text-xl font-serif italic text-neutral-650 text-neutral-600 border-l-2 border-neutral-300 pl-4 py-1">
          "{project.shortDescription}"
        </p>

        {/* Project Meta Metrics List */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 border border-neutral-200/90 bg-white rounded-sm text-sm">
          <div>
            <span className="font-mono text-[10px] text-neutral-400 block uppercase tracking-wider">Role</span>
            <span className="font-sans font-medium text-neutral-800">{project.role}</span>
          </div>
          <div>
            <span className="font-mono text-[10px] text-neutral-400 block uppercase tracking-wider">Timeline</span>
            <span className="font-sans font-medium text-neutral-800">{project.year}</span>
          </div>
          <div>
            <span className="font-mono text-[10px] text-neutral-400 block uppercase tracking-wider">Key Impact</span>
            <span className="font-sans font-medium text-neutral-800">{project.impact || "Evaluation Draft"}</span>
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-mono text-[10px] text-neutral-400 block uppercase tracking-wider mb-1">Source</span>
            <div className="flex items-center gap-2">
              {project.links.github && (
                <a 
                  href={project.links.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-1 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-sm"
                  title="GitHub Repository"
                  referrerPolicy="no-referrer"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {project.links.live && (
                <a 
                  href={project.links.live} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-1 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-sm"
                  title="Live Website"
                  referrerPolicy="no-referrer"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Project banner */}
      <section className={`h-64 md:h-80 rounded-sm border border-[#E5E5E5] bg-gradient-to-br ${project.imagePlaceholderColor} flex flex-col items-center justify-center relative overflow-hidden`}>
        {project.image ? (
          <>
            <img
              src={project.image}
              alt={project.imageAlt || `${project.title} project banner`}
              width={1200}
              height={630}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            <div className="absolute left-5 bottom-5 right-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono text-white/75 uppercase tracking-widest">{project.category}</span>
                <h2 className="mt-1 text-2xl md:text-3xl font-serif font-bold text-white drop-shadow-sm">{project.title}</h2>
              </div>
              <span className="self-start sm:self-auto text-xs font-mono text-white bg-black/45 border border-white/20 px-3 py-1 rounded-sm backdrop-blur-sm">
                {project.year}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
            
            <div className="w-96 h-96 border border-neutral-300/30 rounded-full flex items-center justify-center pointer-events-none">
              <div className="w-72 h-72 border border-dashed border-neutral-400/25 rounded-full flex items-center justify-center">
                <div className="w-48 h-48 border border-neutral-500/20 rounded-sm flex items-center justify-center rotate-12">
                  <span className="text-xs font-mono text-neutral-400 tracking-wider">PROJECT BLUEPRINT</span>
                </div>
              </div>
            </div>

            <div className="absolute top-4 left-4 text-xs font-mono text-neutral-500 bg-white/80 border border-[#E5E5E5] px-2.5 py-0.5 rounded-sm">
              SCHEMATIC: CS PORTFOLIO OUTLINE
            </div>
          </>
        )}
      </section>

      {/* Structured Case Study Sections */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
        {/* Left Side: Tech Specs Sidebar (4 cols) */}
        <div className="md:col-span-4 space-y-6">
          
          <div className="border border-neutral-200 bg-white rounded-sm p-5 space-y-4">
            <h3 className="font-serif font-bold text-base text-neutral-800">Technical Context</h3>
            
            <div className="space-y-4">
              <div>
                <span className="font-mono text-[10px] text-neutral-400 block uppercase">Infrastructure</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {project.techStack.map(tech => (
                    <span key={tech} className="text-xs font-mono bg-neutral-100 text-neutral-700 px-2.5 py-0.5 rounded-xs border border-neutral-200/50">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-mono text-[10px] text-neutral-400 block uppercase">Objective</span>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Solve real high-school constraints via rapid, zero-bloat client engineering, maintaining high UX transparency.
                </p>
              </div>

              <div>
                <span className="font-mono text-[10px] text-neutral-400 block uppercase">Primary Focus</span>
                <ul className="text-xs text-neutral-600 mt-1 space-y-1 list-disc list-inside">
                  <li>Performance under constraints</li>
                  <li>Security guidelines</li>
                  <li>Human-centric layout flow</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border border-neutral-200 bg-neutral-50 rounded-sm p-5 space-y-3">
            <h4 className="text-xs font-mono font-semibold tracking-wider text-neutral-400 uppercase">Reviewer Note</h4>
            <p className="text-xs text-neutral-600 leading-relaxed italic">
              "This project showcases honest documentation. All technical trade-offs have been recorded objectively, highlighting real-world hurdles faced during the drafting process."
            </p>
          </div>

        </div>

        {/* Right Side: Editorial Case Body (8 cols) */}
        <div id="case_study_body" className="md:col-span-8 space-y-8">
          
          {/* Loop through case study sections */}
          {project.caseStudySections.map((section, idx) => (
            <div key={idx} id={`case_section_${idx}`} className="space-y-3 pb-6 border-b border-[#E5E5E5]/65 last:border-0 text-left">
              <h3 className="text-lg font-serif font-bold text-neutral-900 flex items-center gap-2">
                <span className="text-xs font-mono text-neutral-400 font-normal">0{idx + 1}.</span>
                {section.title}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed font-sans whitespace-pre-line">
                {section.content}
              </p>
            </div>
          ))}

        </div>
      </section>

      {relatedProjects.length > 0 && (
        <section className="border-t border-neutral-200 pt-8 space-y-4">
          <h2 className="text-lg font-serif font-bold text-neutral-900">Related Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedProjects.map((relatedProject) => (
              <a
                key={relatedProject.slug}
                href={getProjectPath(relatedProject.slug)}
                onClick={(event) => {
                  event.preventDefault();
                  window.scrollTo({ top: 0 });
                  window.history.pushState(null, '', getProjectPath(relatedProject.slug));
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                className="block border border-neutral-200 bg-white hover:border-neutral-400 rounded-sm p-4 transition-colors"
              >
                <span className="text-[10px] font-mono text-neutral-400 uppercase">{relatedProject.category}</span>
                <h3 className="mt-1 font-serif font-bold text-base text-neutral-900">{relatedProject.title}</h3>
                <p className="mt-2 text-xs text-neutral-500 leading-relaxed line-clamp-2">{relatedProject.shortDescription}</p>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Case Study Footer Navigation */}
      <footer className="pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <a
          href={getRoutePath('projects')}
          onClick={(event) => {
            event.preventDefault();
            onBack();
          }}
          className="inline-flex items-center gap-1.5 text-xs font-mono py-2 px-4 text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200/80 rounded-sm border border-[#E5E5E5] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Project Index</span>
        </a>

        <a
          href={getRoutePath('blog')}
          onClick={(event) => {
            event.preventDefault();
            onNavigate('blog');
            window.scrollTo({ top: 0 });
          }}
          className="inline-flex items-center gap-1 text-xs font-mono py-2 px-4 text-neutral-800 hover:text-black border-b border-neutral-400 hover:border-black transition-colors cursor-pointer"
        >
          <span>{"Read My Architectural Journal ->"}</span>
        </a>
      </footer>
      
    </article>
  );
}
