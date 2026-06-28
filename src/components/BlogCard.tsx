import React from 'react';
import { BlogPost } from '../types';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { getBlogPath } from '../seo';

interface BlogCardProps {
  key?: string;
  post: BlogPost;
  onSelectBlog: (slug: string) => void;
}

export default function BlogCard({ post, onSelectBlog }: BlogCardProps) {
  return (
    <article 
      id={`blog_card_${post.slug}`}
      className="group cursor-pointer border-b border-[#E5E5E5] pb-8 pt-6 transition-all block text-left focus:outline-none"
    >
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-mono font-semibold text-neutral-400 uppercase tracking-widest">
            {post.category}
          </span>
          {post.readingTime ? (
            <span className="text-xs font-mono text-neutral-400">
              {post.readingTime}
            </span>
          ) : null}
        </div>
        <span className="text-xs font-mono text-neutral-400 md:text-right">
          {post.date}
        </span>
      </div>

      <h3 className="font-serif font-bold text-xl md:text-2xl text-neutral-900 group-hover:text-neutral-700 transition-colors leading-tight mb-3">
        <a
          href={getBlogPath(post.slug)}
          onClick={(event) => {
            event.preventDefault();
            onSelectBlog(post.slug);
          }}
        >
          {post.title}
        </a>
      </h3>

      <p className="text-sm text-neutral-600 leading-relaxed max-w-3xl mb-4 font-sans">
        {post.excerpt}
      </p>

      <a
        href={getBlogPath(post.slug)}
        onClick={(event) => {
          event.preventDefault();
          onSelectBlog(post.slug);
        }}
        className="inline-flex items-center gap-1 text-xs font-mono text-neutral-900 group-hover:gap-2 transition-all"
      >
        <span>Read Journal Entry</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </article>
  );
}
