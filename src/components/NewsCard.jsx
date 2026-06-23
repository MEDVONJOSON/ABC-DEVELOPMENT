import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { categories } from '../data/projects.js';

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });
}

export default function NewsCard({ article, compact = false }) {
  const cat = categories.find((c) => c.id === article.category);
  return (
    <Link
      to={`/news/${article.slug}`}
      className={`card group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${compact ? '' : 'h-full flex flex-col'}`}
    >
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={article.cover}
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className={`p-5 ${compact ? '' : 'flex-1 flex flex-col'}`}>
        {cat && <span className={`chip ${cat.color} mb-3 capitalize`}>{cat.name}</span>}
        <h3 className="font-display font-semibold text-lg text-slate-900 group-hover:text-brand-800 transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-slate-600 mt-2 line-clamp-3 flex-1">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Calendar size={14} />
            <span>{formatDate(article.date)}</span>
          </div>
          <div className="text-sm font-medium text-brand-800 flex items-center gap-1 group-hover:gap-2 transition-all">
            Read <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </Link>
  );
}
