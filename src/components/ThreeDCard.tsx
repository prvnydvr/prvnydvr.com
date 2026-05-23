import React from 'react';
import { ThreeDItem } from '../types';
import { Layers, HardDrive, Cpu, ArrowUpRight } from 'lucide-react';

interface ThreeDCardProps {
  key?: string;
  item: ThreeDItem;
  onSelect: (item: ThreeDItem) => void;
}

export default function ThreeDCard({ item, onSelect }: ThreeDCardProps) {
  return (
    <div 
      id={`threed_card_${item.id}`}
      onClick={() => onSelect(item)}
      className="bg-white border border-[#E5E5E5] rounded-sm hover:border-neutral-500 hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer flex flex-col h-full text-left"
    >
      {/* 3D Wireframe / Mesh Placeholder Rendering Area */}
      <div className={`h-48 relative bg-gradient-to-tr ${item.imagePlaceholderColor} flex items-center justify-center border-b border-[#E5E5E5] p-6`}>
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
        
        {/* Geometrical overlay representing 3D wireframe / viewport */}
        <div className="absolute inset-4 border border-dashed border-neutral-400/20 rounded-sm pointer-events-none flex items-center justify-center">
          <div className="w-12 h-12 border border-dotted border-neutral-500/25 rotate-45 flex items-center justify-center">
            <span className="text-[9px] font-mono text-neutral-450 tracking-normal text-slate-500 font-semibold">{item.category === "Product Render" ? "Cycles" : "Grid" }</span>
          </div>
        </div>

        {/* Floating details */}
        <span className="absolute top-3 left-3 text-[9px] font-mono text-neutral-500 bg-white/70 px-2 py-0.5 rounded-full border border-neutral-100 uppercase">
          {item.category}
        </span>

        {/* Dynamic Center Concept Icon */}
        <div className="text-neutral-700/80 p-3 bg-white/60 backdrop-blur-xs rounded-full border border-white/60 shadow-xs z-10">
          <Layers className="w-6 h-6 text-neutral-600 animate-pulse" />
        </div>

        <span className="absolute bottom-3 right-3 text-[9px] font-mono text-neutral-400 bg-white/60 px-1.5 py-0.5 rounded-sm">
          {item.tools[0]}
        </span>
      </div>

      {/* Description Info */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-1">
            <h4 className="font-serif font-bold text-base text-neutral-800 line-clamp-1">
              {item.title}
            </h4>
            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          </div>
          
          <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Tools tag footer */}
        <div className="pt-3 border-t border-[#E5E5E5]/40 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1">
            {item.tools.slice(0, 2).map((tool) => (
              <span 
                key={tool} 
                className="text-[9px] font-mono text-neutral-500 bg-neutral-105 px-1.5 py-0.5 rounded-xs"
              >
                {tool}
              </span>
            ))}
          </div>
          <span className="text-[10px] font-mono text-neutral-400">
            {item.date}
          </span>
        </div>
      </div>
    </div>
  );
}
