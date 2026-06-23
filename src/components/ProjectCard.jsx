import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { categories } from '../data/projects.js';

const categoryStyles = {
  education: {
    gradient: 'from-blue-500 to-indigo-600',
    cardBorder: 'border-b-blue-500/50 hover:border-blue-500',
    cardHoverShadow: 'hover:shadow-blue-500/15',
    badgeBg: 'bg-blue-100 text-blue-800 border border-blue-200/50',
    textBrand: 'text-blue-700 group-hover:text-blue-800',
    iconColor: 'text-blue-600'
  },
  health: {
    gradient: 'from-emerald-500 to-teal-600',
    cardBorder: 'border-b-emerald-500/50 hover:border-emerald-500',
    cardHoverShadow: 'hover:shadow-emerald-500/15',
    badgeBg: 'bg-emerald-100 text-emerald-800 border border-emerald-200/50',
    textBrand: 'text-emerald-700 group-hover:text-emerald-800',
    iconColor: 'text-emerald-600'
  },
  women: {
    gradient: 'from-fuchsia-500 to-purple-600',
    cardBorder: 'border-b-fuchsia-500/50 hover:border-fuchsia-500',
    cardHoverShadow: 'hover:shadow-fuchsia-500/15',
    badgeBg: 'bg-fuchsia-100 text-purple-800 border border-fuchsia-200/50',
    textBrand: 'text-purple-700 group-hover:text-purple-800',
    iconColor: 'text-fuchsia-600'
  },
  livelihood: {
    gradient: 'from-amber-500 to-orange-600',
    cardBorder: 'border-b-amber-500/50 hover:border-amber-500',
    cardHoverShadow: 'hover:shadow-amber-500/15',
    badgeBg: 'bg-amber-100 text-amber-800 border border-amber-200/50',
    textBrand: 'text-amber-700 group-hover:text-amber-800',
    iconColor: 'text-amber-600'
  },
  governance: {
    gradient: 'from-violet-500 to-indigo-600',
    cardBorder: 'border-b-violet-500/50 hover:border-violet-500',
    cardHoverShadow: 'hover:shadow-violet-500/15',
    badgeBg: 'bg-violet-100 text-violet-800 border border-violet-200/50',
    textBrand: 'text-violet-700 group-hover:text-violet-800',
    iconColor: 'text-violet-600'
  },
  rural: {
    gradient: 'from-green-500 to-emerald-600',
    cardBorder: 'border-b-green-500/50 hover:border-green-500',
    cardHoverShadow: 'hover:shadow-green-500/15',
    badgeBg: 'bg-green-100 text-green-800 border border-green-200/50',
    textBrand: 'text-green-700 group-hover:text-green-800',
    iconColor: 'text-green-600'
  }
};

export default function ProjectCard({ project }) {
  const cat = categories.find((c) => c.id === project.category);
  const style = categoryStyles[project.category] || categoryStyles.education;

  return (
    <Link
      to={`/projects/${project.slug}`}
      className={`card relative group border border-slate-200/80 border-b-4 ${style.cardBorder} hover:-translate-y-2 hover:shadow-2xl ${style.cardHoverShadow} transition-all duration-300 ease-out`}
    >
      {/* Decorative Top Accent Line (Coloring & Thickening) */}
      <div className={`absolute top-0 left-0 right-0 h-[5px] bg-gradient-to-r ${style.gradient} z-10`} />

      <div className="aspect-[16/10] overflow-hidden relative">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-slate-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
      
      <div className="p-5">
        {cat && (
          <span className={`chip ${style.badgeBg} mb-3 capitalize`}>{cat.name}</span>
        )}
        <h3 className="font-display font-bold text-xl text-slate-800 group-hover:text-slate-950 transition-colors leading-tight">
          {project.title}
        </h3>
        <p className="text-sm text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">{project.summary}</p>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-4 font-medium">
          <MapPin size={14} className={style.iconColor} />
          <span>{project.location}</span>
        </div>
        <div className={`mt-5 flex items-center gap-1.5 text-sm font-semibold ${style.textBrand} transition-colors`}>
          <span className="group-hover:underline">Read more</span>
          <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-200" />
        </div>
      </div>
    </Link>
  );
}
