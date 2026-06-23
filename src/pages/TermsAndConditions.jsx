import { useState, useEffect } from 'react';
import PageHero from '../components/PageHero.jsx';
import { getCollection } from '../lib/api.js';

const fallbackTerms = {
  title: 'Terms & Conditions',
  content:
    'By using this website, visitors agree to use ABC Development content, resources, and contact channels respectfully and lawfully.\n\nWebsite content is provided for information about our programs, reports, news, and community development work. Documents may be downloaded for personal, educational, or partner reference.\n\nABC Development may update website content, resources, and these terms as programs and organizational needs change.',
};

export default function TermsAndConditions() {
  const [terms, setTerms] = useState(fallbackTerms);

  useEffect(() => {
    getCollection('terms', [fallbackTerms]).then((items) => {
      if (items.length > 0) setTerms(items[0]);
    });
  }, []);

  return (
    <>
      <PageHero
        eyebrow="About ABC"
        title={terms.title}
        subtitle="Guidelines for using the ABC Development website and resources."
        image="/images/hero-education.jpg"
      />
      <section className="section">
        <div className="container-page max-w-3xl">
          <div className="card p-8 space-y-5 text-slate-700 leading-relaxed">
            {String(terms.content || fallbackTerms.content)
              .split(/\n{2,}/)
              .map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
