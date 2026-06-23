import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { news as newsSeed } from '../data/news.js';
import { categories } from '../data/projects.js';
import NewsCard from '../components/NewsCard.jsx';
import { getCollection } from '../lib/api.js';

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });
}

export default function NewsDetail() {
  const { slug } = useParams();
  const [articles, setArticles] = useState(newsSeed);

  useEffect(() => {
    Promise.all([
      getCollection('news', newsSeed),
      getCollection('blogs', []),
    ]).then(([news, blogs]) => setArticles([...blogs, ...news]));
  }, []);

  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <section className="section">
        <div className="container-page text-center">
          <h1 className="font-display font-bold text-3xl">Article not found</h1>
          <Link to="/news" className="btn-primary mt-6 inline-flex">
            <ArrowLeft size={18} /> Back to News
          </Link>
        </div>
      </section>
    );
  }

  const cat = categories.find((c) => c.id === article.category);
  const related = articles.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <>
      <section className="bg-white">
        <div className="container-page py-10 max-w-4xl">
          <Link to="/news" className="text-sm text-brand-700 hover:underline inline-flex items-center gap-1">
            <ArrowLeft size={14} /> Back to all news
          </Link>
          {cat && <span className={`chip ${cat.color} mt-5 capitalize`}>{cat.name}</span>}
          <h1 className="font-display font-bold text-3xl md:text-5xl text-slate-900 mt-3 leading-tight">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 mt-5 text-sm text-slate-500">
            <span className="flex items-center gap-1"><Calendar size={14} />{formatDate(article.date)}</span>
            <span className="flex items-center gap-1"><User size={14} />{article.author}</span>
          </div>
        </div>
      </section>

      <div className="container-page max-w-4xl">
        <img src={article.cover} alt={article.title} className="w-full aspect-[16/9] object-cover rounded-2xl shadow-soft" />
      </div>

      <section className="section">
        <div className="container-page max-w-3xl">
          <div className="prose prose-lg max-w-none">
            {(article.body || [article.excerpt]).map((para, i) => (
              <p key={i} className="text-slate-700 leading-relaxed mb-5 text-lg">{para}</p>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-slate-200">
            <Link to="/news" className="btn-secondary">
              <ArrowLeft size={16} /> All news
            </Link>
          </div>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container-page">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-900 mb-8">
            More stories
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((a) => (
              <NewsCard key={a.id} article={a} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
