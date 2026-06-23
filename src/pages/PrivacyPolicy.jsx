import { useState, useEffect } from 'react';
import PageHero from '../components/PageHero.jsx';
import { getCollection } from '../lib/api.js';

const fallbackPrivacy = {
  title: 'Privacy Policy',
  content:
    'ABC Development respects the privacy of visitors, partners, volunteers, and community members who contact us through this website.\n\nInformation submitted through forms or email links is used to respond to inquiries, coordinate programs, manage partnerships, and improve our services.\n\nWe do not sell personal information. Access to submitted information is limited to authorized team members who need it for organizational work.',
};

export default function PrivacyPolicy() {
  const [privacy, setPrivacy] = useState(fallbackPrivacy);

  useEffect(() => {
    getCollection('privacy', [fallbackPrivacy]).then((items) => {
      if (items.length > 0) setPrivacy(items[0]);
    });
  }, []);

  return (
    <>
      <PageHero
        eyebrow="About ABC"
        title={privacy.title}
        subtitle="How ABC Development handles information shared through this website."
        image="/images/hero-landscape.jpg"
      />
      <section className="section">
        <div className="container-page max-w-3xl">
          <div className="card p-8 space-y-5 text-slate-700 leading-relaxed">
            {String(privacy.content || fallbackPrivacy.content)
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
