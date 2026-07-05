import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import PageHero from '../components/PageHero.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import { projects as projectSeed, categories } from '../data/projects.js';
import { getCollection } from '../lib/api.js';

export default function Projects() {
  const [params, setParams] = useSearchParams();
  const initialCategory = params.get('category') || 'all';
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState('');
  const [projects, setProjects] = useState(projectSeed);

  useEffect(() => {
    const c = params.get('category') || 'all';
    setCategory(c);
  }, [params]);

  useEffect(() => {
    getCollection('projects', projectSeed).then(setProjects);
  }, []);

  const setCategoryAndUrl = (c) => {
    setCategory(c);
    if (c === 'all') {
      setParams({});
    } else {
      setParams({ category: c });
    }
  };

  const filtered = projects.filter((p) => {
    const matchesCat = category === 'all' || p.category === category;
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <>
      <PageHero
        eyebrow="Our Projects"
        title="Sustainable Development Programs"
        subtitle="Explore ABC Development's projects in education, healthcare, livelihoods, governance, and climate change across Sierra Leone."
        image="/images/hero-community.jpg"
      />

      <section className="section">
        <div className="container-page">
          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-8">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCategoryAndUrl('all')}
                className={`chip ${category === 'all' ? 'bg-brand-800 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                All Projects
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCategoryAndUrl(c.id)}
                  className={`chip ${category === c.id ? c.color + ' ring-2 ring-offset-1 ring-current' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                >
                  {c.name}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects…"
                className="pl-10 pr-4 py-2.5 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-500 w-full sm:w-72"
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              Try adjusting your filters or search terms.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
