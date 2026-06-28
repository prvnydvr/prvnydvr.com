import { Mail, Github, Linkedin, Instagram, ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data';
import { getRoutePath } from '../seo';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const scrollValueToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main_footer" className="bg-[#FAF9F5] border-t border-[#E5E5E5] py-16 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start justify-between gap-10">
        
        {/* Left Side: Brand and Ethos */}
        <div className="max-w-md space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-semibold text-neutral-800 tracking-tight text-base">{PERSONAL_INFO.name}</span>
          </div>
          <p className="text-sm text-neutral-500 leading-relaxed font-sans">
            Student builder based in {PERSONAL_INFO.cityShort}. Documenting web products, student tools, AI product ideas, 3D experiments, and research writing.
          </p>
          <div className="pt-2 text-xs font-mono text-neutral-400">
            © 2026 {PERSONAL_INFO.name}. Built with React and Tailwind CSS.
          </div>
        </div>

        {/* Middle/Right: Quick Nav & Social Connect */}
        <div className="flex flex-wrap gap-x-16 gap-y-8">
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold tracking-wider text-neutral-400 uppercase">Navigation</h4>
            <ul className="space-y-1.5">
              {[
                { label: "Home", id: "home" },
                { label: "Projects", id: "projects" },
                { label: "Blog", id: "blog" },
                { label: "3D Library", id: "3d" },
                { label: "About", id: "about" },
                { label: "Resume", id: "resume" },
                { label: "Contact", id: "contact" }
              ].map((link) => (
                <li key={link.id}>
                  <a
                    href={getRoutePath(link.id)}
                    onClick={(event) => {
                      event.preventDefault();
                      onNavigate(link.id);
                      window.scrollTo({ top: 0 });
                    }}
                    className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer text-left focus:outline-none"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold tracking-wider text-neutral-400 uppercase">Connect</h4>
            <div className="flex flex-col space-y-2">
              <a 
                href={`mailto:${PERSONAL_INFO.email}`} 
                className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-950 transition-colors"
                referrerPolicy="no-referrer"
              >
                <Mail className="w-4 h-4 text-neutral-400" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
              <a 
                href={`mailto:${PERSONAL_INFO.workEmail}`} 
                className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-950 transition-colors"
                referrerPolicy="no-referrer"
              >
                <Mail className="w-4 h-4 text-neutral-400" />
                <span>{PERSONAL_INFO.workEmail}</span>
              </a>
              <a 
                href={PERSONAL_INFO.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-950 transition-colors"
                referrerPolicy="no-referrer"
              >
                <Github className="w-4 h-4 text-neutral-400" />
                <span>GitHub</span>
              </a>
              <a 
                href={PERSONAL_INFO.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-950 transition-colors"
                referrerPolicy="no-referrer"
              >
                <Linkedin className="w-4 h-4 text-neutral-400" />
                <span>LinkedIn</span>
              </a>
              <a 
                href={PERSONAL_INFO.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-950 transition-colors"
                referrerPolicy="no-referrer"
              >
                <Instagram className="w-4 h-4 text-neutral-400" />
                <span>Instagram</span>
              </a>
              <span className="text-sm font-mono text-neutral-400">{PERSONAL_INFO.handle}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-12 pt-8 border-t border-[#E5E5E5]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-sm text-neutral-500">
          Learning by building
        </span>
        <button
          onClick={scrollValueToTop}
          className="inline-flex items-center gap-1.5 text-xs font-mono py-1.5 px-3 text-neutral-500 hover:text-neutral-850 bg-neutral-100 hover:bg-neutral-200/60 rounded-sm border border-[#E5E5E5] transition-all cursor-pointer"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
