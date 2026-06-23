import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, MapPin, Users, Calendar, DollarSign, Handshake } from 'lucide-react';
import { projects as projectSeed, categories } from '../data/projects.js';
import ProjectCard from '../components/ProjectCard.jsx';
import { getCollection } from '../lib/api.js';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [projects, setProjects] = useState(projectSeed);

  useEffect(() => {
    getCollection('projects', projectSeed).then(setProjects);
  }, []);

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <section className="section">
        <div className="container-page text-center">
          <h1 className="font-display font-bold text-3xl">Project not found</h1>
          <Link to="/projects" className="btn-primary mt-6 inline-flex">
            <ArrowLeft size={18} /> Back to Projects
          </Link>
        </div>
      </section>
    );
  }

  const cat = categories.find((c) => c.id === project.category);
  const related = projects
    .filter((p) => p.category === project.category && p.id !== project.id)
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="aspect-[16/7] md:aspect-[16/5] overflow-hidden">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </div>
        <div className="container-page -mt-16 relative">
          <div className="card p-6 md:p-10 max-w-4xl">
            {cat && <span className={`chip ${cat.color} mb-4 capitalize`}>{cat.name}</span>}
            <h1 className="font-display font-bold text-3xl md:text-4xl text-slate-900">
              {project.title}
            </h1>
            <p className="mt-4 text-slate-600 leading-relaxed">{project.summary}</p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-700">
              <div className="flex items-center gap-2"><MapPin size={16} className="text-brand-700" />{project.location}</div>
              <div className="flex items-center gap-2"><Users size={16} className="text-brand-700" />{project.beneficiaries.toLocaleString()}+ beneficiaries</div>
              <div className="flex items-center gap-2"><Calendar size={16} className="text-brand-700" />{project.duration}</div>
              <div className="flex items-center gap-2"><DollarSign size={16} className="text-brand-700" />Budget {project.budget}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="font-display font-bold text-2xl text-slate-900 mb-4">About this project</h2>
            <p className="text-slate-700 leading-relaxed text-lg">{project.story}</p>

            <h2 className="font-display font-bold text-2xl text-slate-900 mt-10 mb-4">Key objectives</h2>
            <ul className="space-y-3">
              {(project.objectives || []).map((o, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700">
                  <span className="mt-1 w-5 h-5 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold">{i + 1}</span>
                  </span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:sticky lg:top-24 self-start">
            <div className="card p-6">
              <h3 className="font-display font-bold text-lg text-slate-900 mb-4">Project details</h3>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-slate-500 uppercase tracking-wide text-xs">Districts</dt>
                  <dd className="text-slate-900 mt-1">{(project.districts || []).join(', ') || project.location}</dd>
                </div>
                <div>
                  <dt className="text-slate-500 uppercase tracking-wide text-xs">Duration</dt>
                  <dd className="text-slate-900 mt-1">{project.duration}</dd>
                </div>
                <div>
                  <dt className="text-slate-500 uppercase tracking-wide text-xs">Total Budget</dt>
                  <dd className="text-slate-900 mt-1">{project.budget}</dd>
                </div>
                <div>
                  <dt className="text-slate-500 uppercase tracking-wide text-xs">Beneficiaries</dt>
                  <dd className="text-slate-900 mt-1">{project.beneficiaries.toLocaleString()}+</dd>
                </div>
              </dl>
              <div className="mt-6 pt-6 border-t border-slate-100">
                <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Handshake size={16} /> Partners
                </h4>
                <ul className="space-y-2">
                  {(project.partners || []).map((p) => (
                    <li key={p} className="text-sm text-slate-700">{p}</li>
                  ))}
                </ul>
              </div>
              <Link to="/get-involved#donate" className="btn-primary mt-6 w-full">
                Support This Project
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section bg-slate-50">
          <div className="container-page">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-900 mb-8">
              Related projects in {cat?.name}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
