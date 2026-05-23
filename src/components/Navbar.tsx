import { useState, useEffect, type MouseEvent } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data';
import { getRoutePath } from '../seo';

interface NavbarProps {
  currentRoute: string; // e.g., 'home', 'projects', 'blog', '3d', 'about', 'resume', 'contact'
  onNavigate: (route: string) => void;
}

export default function Navbar({ currentRoute, onNavigate }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Projects", id: "projects" },
    { label: "Blog", id: "blog" },
    { label: "3D Library", id: "3d" },
    { label: "About", id: "about" },
    { label: "Resume", id: "resume" },
    { label: "Contact", id: "contact" }
  ];

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    onNavigate(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <header id="main_header" className={`sticky top-0 z-50 transition-all duration-300 w-full ${
      isScrolled 
        ? 'bg-[#FAFAF7]/80 backdrop-blur-md border-b border-[#E5E5E5] py-3' 
        : 'bg-[#FAFAF7] border-b border-transparent py-5'
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Brand/Name Logo */}
        <a 
          id="brand_logo"
          href={getRoutePath('home')}
          onClick={(event) => handleNavClick(event, 'home')}
          className="text-lg font-serif font-semibold tracking-tight text-neutral-900 cursor-pointer focus:outline-none"
        >
          {PERSONAL_INFO.name}
        </a>

        {/* Desktop Nav Items */}
        <nav id="desktop_nav" className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = currentRoute === item.id || (currentRoute.startsWith(item.id + '-'));
            return (
              <a
                key={item.id}
                id={`nav_link_${item.id}`}
                href={getRoutePath(item.id)}
                onClick={(event) => handleNavClick(event, item.id)}
                className={`text-sm font-medium tracking-wide transition-colors cursor-pointer focus:outline-none py-1 relative ${
                  isActive 
                    ? 'text-neutral-900 font-semibold' 
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-neutral-800 rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action button */}
        <div className="hidden md:flex items-center">
          <a
            id="nav_resume_cta"
            href={getRoutePath('resume')}
            onClick={(event) => handleNavClick(event, 'resume')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200/80 rounded-sm border border-[#E5E5E5] transition-all cursor-pointer"
          >
            Curriculum Vitae
            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          id="mobile_menu_trigger"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-neutral-700 hover:text-neutral-900 p-1 focus:outline-none cursor-pointer"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile nav drawer */}
      {isMobileMenuOpen && (
        <div id="mobile_nav_drawer" className="md:hidden absolute top-[100%] left-0 right-0 bg-[#FAFAF7] border-b border-[#E5E5E5] shadow-lg animate-fade-in divide-y divide-[#E5E5E5]/50">
          <div className="px-6 py-4 flex flex-col space-y-4">
            {navItems.map((item) => {
              const isActive = currentRoute === item.id || (currentRoute.startsWith(item.id + '-'));
              return (
                <a
                  key={item.id}
                  id={`mobile_nav_link_${item.id}`}
                  href={getRoutePath(item.id)}
                  onClick={(event) => handleNavClick(event, item.id)}
                  className={`text-left text-base font-medium py-2 transition-colors cursor-pointer w-full focus:outline-none ${
                    isActive ? 'text-neutral-900 font-semibold' : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
          <div className="px-6 py-4">
            <a
              id="mobile_nav_resume_cta"
              href={getRoutePath('resume')}
              onClick={(event) => handleNavClick(event, 'resume')}
              className="w-full text-center block px-4 py-3 text-sm font-mono font-medium text-neutral-800 bg-neutral-100 border border-[#E5E5E5] hover:bg-neutral-200 rounded-sm cursor-pointer"
            >
              Curriculum Vitae
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
