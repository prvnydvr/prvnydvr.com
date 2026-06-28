import { ThreeDItem } from '../types';
import { X, Cpu, PenTool, Lightbulb, Compass } from 'lucide-react';

interface ThreeDDetailModalProps {
  item: ThreeDItem;
  onClose: () => void;
}

export default function ThreeDDetailModal({ item, onClose }: ThreeDDetailModalProps) {
  return (
    <div 
      id={`threed_modal_${item.id}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-sm animate-fade-in"
    >
      <div 
        className="bg-white border border-[#E5E5E5] w-full max-w-4xl max-h-[90vh] rounded-sm overflow-hidden shadow-2xl flex flex-col animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#E5E5E5] flex items-center justify-between bg-[#FAFAF7]">
          <div>
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">{item.category}</span>
            <h3 className="text-lg font-serif font-bold text-neutral-900">{item.title}</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 rounded-sm focus:outline-none transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scrollable Area */}
        <div className="overflow-y-auto flex-1 p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Side: Massive Technical Graphic Frame (5 cols) */}
          <div className="md:col-span-5 flex flex-col space-y-4">
            <div className={`h-64 rounded-sm bg-gradient-to-br ${item.imagePlaceholderColor} border border-[#E5E5E5] flex flex-col items-center justify-center relative p-6 overflow-hidden`}>
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
              
              {/* Abstract mesh representation wireframes */}
              <div className="w-40 h-40 border-2 border-dashed border-neutral-600/10 rounded-full flex items-center justify-center animate-spin" style={{ animationDuration: '40s' }}>
                <div className="w-28 h-28 border border-neutral-700/15 rotate-45 flex items-center justify-center">
                  <div className="w-16 h-16 border-2 border-dotted border-neutral-800/20 rounded-xs" />
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-center z-10 bg-white/70 backdrop-blur-xs py-2 px-3 rounded-xs border border-white/60">
                <span className="text-[10px] font-mono text-neutral-600 font-medium tracking-wide">
                  Render preview
                </span>
              </div>
            </div>

            {/* Spec Sheet Table */}
            <div className="border border-[#E5E5E5] rounded-sm p-4 bg-[#FAFAF7] space-y-3">
              <h5 className="text-[10px] font-mono font-bold tracking-wider text-neutral-400 uppercase">Details</h5>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between border-b border-[#E5E5E5]/50 pb-1">
                  <span className="text-neutral-500 font-mono">RENDER ENGINE</span>
                  <span className="text-neutral-800 font-mono font-medium">Cycles</span>
                </div>
                <div className="flex justify-between border-b border-[#E5E5E5]/50 pb-1">
                  <span className="text-neutral-500 font-mono">LIGHT BOUNCES</span>
                  <span className="text-neutral-800 font-mono font-medium">32 Refractions Max</span>
                </div>
                <div className="flex justify-between border-b border-[#E5E5E5]/50 pb-1">
                  <span className="text-neutral-500 font-mono">TOOLS</span>
                  <div className="flex gap-1">
                    {item.tools.map(tool => (
                      <span key={tool} className="text-[9px] font-mono bg-neutral-200/55 px-1 py-0.2 rounded-xs text-neutral-700">{tool}</span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500 font-mono">YEAR</span>
                  <span className="text-neutral-800 font-mono font-medium">{item.date}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Process Notes & Learning (7 cols) */}
          <div className="md:col-span-7 space-y-6">
            
            {/* Concept section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-neutral-500" />
                <h4 className="text-xs font-mono font-bold tracking-wider text-neutral-400 uppercase">Concept</h4>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed font-sans">
                {item.description}
              </p>
            </div>

            {/* Design & Modelling Process */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <PenTool className="w-4 h-4 text-neutral-500" />
                <h4 className="text-xs font-mono font-bold tracking-wider text-neutral-400 uppercase">Process</h4>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed font-sans">
                {item.process}
              </p>
            </div>

            {/* Key Creative Learnings */}
            <div className="space-y-2 border-l-2 border-neutral-700 pl-4 py-1 bg-neutral-50 rounded-r-sm pr-3">
              <div className="flex items-center gap-2 mb-1">
                <Lightbulb className="w-4 h-4 text-neutral-700" />
                <h4 className="text-xs font-mono font-bold tracking-wider text-neutral-600 uppercase">Learning</h4>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {item.learning}
              </p>
            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[#E5E5E5] bg-[#FAFAF7] flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono text-neutral-700 hover:text-neutral-900 hover:bg-neutral-150 rounded-sm border border-[#E5E5E5] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
