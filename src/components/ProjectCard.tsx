import React from 'react';
import { Project } from '../types';
import { Github, ExternalLink, ArrowRight, BookOpen, Clock, AlertCircle } from 'lucide-react';
import { getProjectPath } from '../seo';

interface ProjectCardProps {
  key?: string;
  project: Project;
  onSelectCaseStudy: (slug: string) => void;
}

export default function ProjectCard({ project, onSelectCaseStudy }: ProjectCardProps) {
  // Translate status to correct academic pill colors
  const statusColors: Record<string, string> = {
    'Live': 'bg-emerald-50 text-emerald-800 border-emerald-200',
    'Live / Built': 'bg-emerald-50 text-emerald-800 border-emerald-200',
    'In Progress': 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]',
    'In progress': 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]',
    'Prototype': 'bg-gray-150 text-gray-800 border-gray-300',
    'Built / Prototype': 'bg-gray-150 text-gray-800 border-gray-300',
    'Selected for Use': 'bg-indigo-50 text-indigo-800 border-indigo-200',
    'Built / Institutional project': 'bg-indigo-50 text-indigo-800 border-indigo-200',
    'Concept': 'bg-rose-50 text-rose-800 border-rose-200',
    'Concept / In progress': 'bg-rose-50 text-rose-800 border-rose-200',
    'Ongoing': 'bg-sky-50 text-sky-800 border-sky-200'
  };

  return (
    <div 
      id={`project_card_${project.slug}`}
      className="group bg-white border border-[#E5E5E5] rounded-sm transition-all duration-300 hover:border-neutral-400 hover:shadow-md overflow-hidden flex flex-col h-full"
    >
      {/* Visual Thumbnail Area */}
      <div className={`h-48 relative overflow-hidden flex items-center justify-center border-b border-[#E5E5E5]/60 bg-gradient-to-br ${project.imagePlaceholderColor.startsWith('bg-') ? 'from-neutral-50 to-neutral-100' : 'from-[#FAF8F5] to-[#EBE9E4]'}`}>
        {project.image ? (
          <>
            <img
              src={project.image}
              alt={project.imageAlt || `${project.title} project banner`}
              width={640}
              height={360}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent" />
            <div className="absolute left-4 bottom-4 right-4 flex items-end justify-between gap-3">
              <h4 className="font-serif font-bold text-xl text-white leading-tight drop-shadow-sm">{project.title}</h4>
              <span className="shrink-0 text-[10px] font-mono text-white bg-black/45 px-2 py-0.5 border border-white/25 rounded-sm backdrop-blur-sm">
                {project.year}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#111 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
            
            <div className="text-center p-6 space-y-2 z-10">
              <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">{project.category}</span>
              <h4 className="font-serif font-bold text-xl text-neutral-800 leading-tight">{project.title}</h4>
              <span className="inline-block text-xs font-mono text-neutral-500 bg-white/85 px-2 py-0.5 border border-[#E5E5E5] rounded-sm">
                Est. {project.year}
              </span>
            </div>

            <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full border border-neutral-200/50 bg-neutral-50/20 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border border-neutral-300/40" />
            </div>
          </>
        )}
      </div>

      {/* Main Content Area */}
      <div className="p-6 flex-col flex-1 flex justify-between space-y-6">
        <div className="space-y-4">
          
          {/* Header row with Title & Status pill */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">{project.category}</span>
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${statusColors[project.status] || 'bg-neutral-100 text-neutral-800'}`}>
              {project.status}
            </span>
          </div>

          <p className="text-sm font-serif italic text-neutral-700 leading-relaxed">
            "{project.shortDescription}"
          </p>

          <hr className="border-[#E5E5E5]/50" />

          {/* Structured Case Brief: Problem & Role */}
          <div className="space-y-3 text-xs leading-relaxed">
            <div>
              <span className="font-mono text-[10px] text-neutral-400 block uppercase font-medium tracking-wide">The Challenge / Problem</span>
              <p className="text-neutral-600 mt-0.5 line-clamp-3">
                {project.problem}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div>
                <span className="font-mono text-[10px] text-neutral-400 block uppercase font-medium tracking-wide">My Role</span>
                <p className="text-neutral-700 mt-0.5 font-medium">
                  {project.role}
                </p>
              </div>
              <div>
                <span className="font-mono text-[10px] text-neutral-400 block uppercase font-medium tracking-wide">Key Impact</span>
                <p className="text-neutral-700 mt-0.5 font-medium line-clamp-1">
                  {project.impact || "Product Prototype"}
                </p>
              </div>
            </div>
          </div>

          {/* Tech Stack List */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.techStack.map((tech) => (
              <span 
                key={tech} 
                className="text-[10px] font-mono text-neutral-600 bg-neutral-100 px-2 py-0.5 border border-[#E5E5E5]/60 rounded-sm"
              >
                {tech}
              </span>
            ))}
          </div>

        </div>

        {/* Action button row */}
        <div className="pt-4 border-t border-[#E5E5E5]/40 flex items-center justify-between">
          <a
            href={getProjectPath(project.slug)}
            onClick={(event) => {
              event.preventDefault();
              onSelectCaseStudy(project.slug);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-neutral-900 hover:text-neutral-750 cursor-pointer group"
          >
            <BookOpen className="w-3.5 h-3.5 text-neutral-500" />
            <span>Read Study</span>
            <ArrowRight className="w-3 h-3 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
          </a>

          <div className="flex items-center gap-3">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                title="View Codebase on GitHub"
                className="p-1 px-1.5 text-neutral-500 hover:text-neutral-950 hover:bg-neutral-100 rounded-sm border border-transparent hover:border-[#E5E5E5] transition-all"
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
                title="View Live Site"
                className="p-1 px-1.5 text-neutral-500 hover:text-neutral-950 hover:bg-neutral-100 rounded-sm border border-transparent hover:border-[#E5E5E5] transition-all"
                referrerPolicy="no-referrer"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
