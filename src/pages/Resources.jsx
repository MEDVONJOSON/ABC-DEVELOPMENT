import { useEffect, useState } from 'react';
import { Download, ExternalLink, BookOpen } from 'lucide-react';
import PageHero from '../components/PageHero.jsx';
import { getCollection } from '../lib/api.js';

const resourceSeed = [
  {
    id: 1,
    type: 'Annual Report',
    title: '2023 Annual Report',
    description: 'Our programs, financials, and impact for 2023.',
    size: '2.4 MB',
  },
  {
    id: 2,
    type: 'Annual Report',
    title: '2022 Annual Report',
    description: 'Our programs, financials, and impact for 2022.',
    size: '2.1 MB',
  },
  {
    id: 3,
    type: 'Publication',
    title: 'Education Program Impact Study',
    description: 'A multi-year study of literacy and enrollment outcomes in partner schools.',
    size: '1.6 MB',
  },
  {
    id: 4,
    type: 'Toolkit',
    title: 'Community Health Worker Handbook',
    description: 'Field manual used by our 150 community health workers.',
    size: '3.2 MB',
  },

  {
    id: 6,
    type: 'Research',
    title: 'Civic Participation in Rural Sierra Leone',
    description: 'Findings from our governance program across 30 communities.',
    size: '1.4 MB',
  },
];

export default function Resources() {
  const [resources, setResources] = useState(resourceSeed);

  useEffect(() => {
    getCollection('resources', resourceSeed).then(setResources);
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Reports, Publications & Toolkits"
        subtitle="Access our reports, publications, guides, toolkits, and research on community development in Sierra Leone."
        image="/images/hero-education.jpg"
      />

      <section className="section">
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="eyebrow mb-3">Open Resources</div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900">
              Reports and tools for development practitioners.
            </h2>
            <p className="text-slate-600 mt-4">
              We believe in full transparency. Download our annual reports and resources to see exactly how support creates impact.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((r) => (
              <div key={r.id} className="card p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="chip bg-brand-100 text-brand-800">{r.type}</span>
                  <span className="text-xs text-slate-500">{r.size}</span>
                </div>
                <h3 className="font-display font-semibold text-lg text-slate-900">{r.title}</h3>
                <p className="text-sm text-slate-600 mt-2">{r.description}</p>
                <div className="mt-5 flex gap-2">
                  <a
                    href={r.fileUrl || '#'}
                    target={r.fileUrl ? '_blank' : undefined}
                    rel="noreferrer"
                    className={`btn-primary text-sm flex-1 ${!r.fileUrl ? 'pointer-events-none opacity-60' : ''}`}
                  >
                    <Download size={16} /> Download
                  </a>
                  <a
                    href={r.fileUrl || '#'}
                    target={r.fileUrl ? '_blank' : undefined}
                    rel="noreferrer"
                    className={`btn-secondary text-sm ${!r.fileUrl ? 'pointer-events-none opacity-60' : ''}`}
                    aria-label={`Open ${r.title}`}
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container-page text-center">
          <BookOpen size={40} className="text-brand-700 mx-auto mb-4" />
          <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-900">
            Subscribe to updates
          </h2>
          <p className="text-slate-600 mt-3 max-w-xl mx-auto">
            Stay updated with our latest news, stories, and updates from ABC Development's work in Sierra Leone.
          </p>
          <form className="mt-6 max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 rounded-full px-4 py-3 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-300"
            />
            <button type="submit" className="btn-primary">Subscribe</button>
          </form>
        </div>
      </section>
    </>
  );
}
