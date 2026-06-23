import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import PageHero from '../components/PageHero.jsx';
import NewsCard from '../components/NewsCard.jsx';
import { news as newsSeed } from '../data/news.js';
import { categories } from '../data/projects.js';
import { getCollection } from '../lib/api.js';

export default function News() {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [articles, setArticles] = useState(newsSeed);

  useEffect(() => {
    Promise.all([
      getCollection('news', newsSeed),
      getCollection('blogs', []),
    ]).then(([news, blogs]) => setArticles([...blogs, ...news]));
  }, []);

  const filtered = articles.filter((a) => {
    const matchesCat = category === 'all' || a.category === category;
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <>
      <PageHero
        eyebrow="News & Blog"
        title="Latest Updates & Impact Stories"
        subtitle="Stories of impact, updates, and insights from our work across Sierra Leone."
        image="/images/hero-education.jpg"
      />

      <section className="section">
        <div className="container-page">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-8">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCategory('all')}
                className={`chip ${category === 'all' ? 'bg-brand-800 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                All News
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCategory(c.id)}
                  className={`chip ${category === c.id ? c.color : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
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
                placeholder="Search articles…"
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
              {filtered.map((a) => (
                <NewsCard key={a.id} article={a} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
