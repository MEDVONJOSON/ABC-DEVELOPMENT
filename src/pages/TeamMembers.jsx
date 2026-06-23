import { useState, useEffect } from 'react';
import PageHero from '../components/PageHero.jsx';
import { getCollection } from '../lib/api.js';

const fallbackTeam = [
  { name: 'Mohamed Haddi', role: 'Leadership Team' },
  { name: 'Nabieu Conteh', role: 'Programs Team' },
  { name: 'Bafoday Suma', role: 'Operations Team' },
];

export default function TeamMembers() {
  const [team, setTeam] = useState(fallbackTeam);

  useEffect(() => {
    getCollection('teamMembers', fallbackTeam).then((items) => {
      if (items.length > 0) setTeam(items);
    });
  }, []);

  return (
    <>
      <PageHero
        eyebrow="About ABC"
        title="Team Members"
        subtitle="Meet the people supporting ABC Development's work with communities across Sierra Leone."
        image="/images/hero-community.jpg"
      />
      <section className="section">
        <div className="container-page">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member.id || member.email || member.name} className="card p-6">
                <div className="w-14 h-14 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center font-display font-bold text-xl mb-4">
                  {String(member.name || '').charAt(0) || '?'}
                </div>
                <h2 className="font-display font-bold text-xl text-slate-900">{member.name}</h2>
                <p className="text-slate-600 mt-1">{member.role}</p>
                {member.email && <p className="text-sm text-slate-500 mt-2">{member.email}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
