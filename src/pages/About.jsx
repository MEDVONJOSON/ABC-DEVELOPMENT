import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Target,
  Eye,
  Heart,
  Lightbulb,
  Handshake,
  Shield,
  GraduationCap,
  HeartPulse,
  Briefcase,
  Sprout,
} from 'lucide-react';
import PageHero from '../components/PageHero.jsx';
import Stats from '../components/Stats.jsx';
import { siteInfo, timeline, values, goals } from '../data/site.js';

const valueIcons = {
  'community-led': Heart,
  'dignity': Shield,
  'creativity': Lightbulb,
  'transparency': Target,
  'collaboration': Handshake,
};

const goalIcons = {
  GraduationCap,
  HeartPulse,
  Briefcase,
  Sprout,
};

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Our Story, Vision & Mission"
        subtitle="Building stronger communities since 2008 through sustainable development programs across Sierra Leone."
        image="/images/hero-community.jpg"
      />

      {/* Intro */}
      <section className="section">
        <div className="container-page grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="eyebrow mb-3">Who We Are</div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900">
              A leading NGO transforming lives across Sierra Leone
            </h2>
            <p className="mt-5 text-slate-600 leading-relaxed">
              ABC Development is a leading NGO in Sierra Leone focused on education, healthcare, livelihoods, governance, and climate change.
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed">
              From clean water infrastructure to governance training, we work alongside rural communities to create lasting change from the ground up.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="/images/hero-education.jpg" alt="" className="rounded-2xl shadow-soft aspect-square object-cover" />
            <img src="/images/hero-health.jpg" alt="" className="rounded-2xl shadow-soft aspect-square object-cover mt-8" />
            <img src="/images/hero-community.jpg" alt="" className="rounded-2xl shadow-soft aspect-square object-cover" />
            <img src="/images/hero-landscape.jpg" alt="" className="rounded-2xl shadow-soft aspect-square object-cover mt-8" />
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="section bg-slate-50">
        <div className="container-page grid md:grid-cols-2 gap-6">
          <div className="card p-8">
            <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-800 flex items-center justify-center mb-5">
              <Target size={22} />
            </div>
            <h3 className="font-display font-bold text-2xl text-slate-900">Our Mission</h3>
            <p className="mt-4 text-slate-600 leading-relaxed">{siteInfo.mission}</p>
          </div>
          <div className="card p-8">
            <div className="w-12 h-12 rounded-xl bg-accent-100 text-accent-600 flex items-center justify-center mb-5">
              <Eye size={22} />
            </div>
            <h3 className="font-display font-bold text-2xl text-slate-900">Our Vision</h3>
            <p className="mt-4 text-slate-600 leading-relaxed">{siteInfo.vision}</p>
          </div>
        </div>
      </section>

      <Stats variant="dark" />

      {/* Values */}
      <section className="section">
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="eyebrow mb-3">Our Values</div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900">
              What guides our work
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {values.map((v) => {
              const Icon = valueIcons[v.id] || Heart;
              return (
                <div key={v.id} className="card p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-800 flex items-center justify-center mx-auto mb-4">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-slate-900">{v.title}</h3>
                  <p className="text-sm text-slate-600 mt-2">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className="section bg-slate-50">
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="eyebrow mb-3">Looking Ahead</div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900">
              Our goals for the next chapter
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {goals.map((g) => {
              const Icon = goalIcons[g.icon] || Target;
              return (
                <div key={g.id} className="card p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-brand text-white flex items-center justify-center mb-4">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-slate-900">{g.title}</h3>
                  <p className="text-sm text-slate-600 mt-2">{g.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="eyebrow mb-3">Our Journey</div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900">
              15+ years of community-led change
            </h2>
          </div>
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-brand-200 md:-translate-x-0.5" />
            <div className="space-y-8">
              {timeline.map((t, i) => (
                <div key={t.year} className={`relative md:grid md:grid-cols-2 md:gap-8`}>
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-brand-600 border-4 border-white shadow mt-2 z-10" />
                  <div className={`pl-12 md:pl-0 ${i % 2 === 0 ? 'md:text-right md:pr-10' : 'md:col-start-2 md:pl-10'}`}>
                    <div className="card p-6">
                      <div className="font-display font-bold text-brand-800 text-xl">{t.year}</div>
                      <h3 className="font-display font-semibold text-lg text-slate-900 mt-1">{t.title}</h3>
                      <p className="text-sm text-slate-600 mt-2">{t.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gradient-brand text-white">
        <div className="container-page text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl">Join Our Mission</h2>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
            Together we can create lasting, self-sustaining impact across Sierra Leone.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/get-involved#donate" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-brand-800 font-semibold hover:bg-brand-50 transition-colors">
              Donate Now <ArrowRight size={18} />
            </Link>
            <Link to="/get-involved#volunteer" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/40 text-white font-semibold hover:bg-white/10 transition-colors">
              Volunteer With Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
