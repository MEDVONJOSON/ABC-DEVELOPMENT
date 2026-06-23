import PageHero from '../components/PageHero.jsx';
import Stats from '../components/Stats.jsx';
import { stats, testimonials } from '../data/site.js';
import { useEffect, useState } from 'react';
import { Quote } from 'lucide-react';

const storageKey = 'abc-development-impact-comments';

export default function Impact() {
  const [commentForm, setCommentForm] = useState({ name: '', comment: '' });
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) {
      setComments(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(comments));
  }, [comments]);

  const postComment = (e) => {
    e.preventDefault();
    const trimmedName = commentForm.name.trim();
    const trimmedComment = commentForm.comment.trim();
    if (!trimmedName || !trimmedComment) return;

    const nextComment = {
      id: Date.now(),
      name: trimmedName,
      comment: trimmedComment,
      date: new Date().toLocaleDateString(),
    };

    setComments((current) => [nextComment, ...current]);
    setCommentForm({ name: '', comment: '' });
  };

  const updateField = (field, value) => {
    setCommentForm((current) => ({ ...current, [field]: value }));
  };

  return (
    <>
      <PageHero
        eyebrow="Our Impact"
        title="Measuring Change in Sierra Leone"
        subtitle="See the measurable impact of ABC Development's programs across Sierra Leone. Real numbers, real stories, real change."
        image="/images/hero-health.jpg"
      />

      <Stats variant="dark" />

      <section className="section">
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="eyebrow mb-3">Our Impact</div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900">
              Measurable change, transformed lives.
            </h2>
            <p className="text-slate-600 mt-4 text-lg leading-relaxed">
              Our impact is measured not just in numbers, but in lives transformed and communities strengthened. Every program we run is designed to create lasting, self-sustaining impact.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((s) => (
              <div key={s.id} className="card p-7 text-center">
                <div className="font-display font-bold text-4xl md:text-5xl text-gradient">
                  {s.value.toLocaleString()}{s.suffix}
                </div>
                <div className="text-sm md:text-base text-slate-600 mt-2 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container-page">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="eyebrow mb-3 text-brand-700 font-bold">Real Stories</div>
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-slate-900 leading-tight mb-6">
              Real stories of transformation from the people we serve.
            </h2>
            <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
              These are the voices of our community members—people whose lives have been transformed by dedicated support, education, and opportunity.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="card p-8 relative ring-0 hover:ring-2 hover:ring-sky-400/20 transition-all duration-300 hover:shadow-[0_28px_80px_rgba(14,165,233,0.08)]"
              >
                <Quote className="absolute top-6 right-6 text-brand-100/40" size={42} />
                <div className="relative z-10">
                  <p className="text-slate-700 leading-relaxed italic text-base md:text-lg">&quot;{t.quote}&quot;</p>
                  <div className="mt-8 pt-6 border-t-2 border-slate-100">
                    <div className="font-display font-bold text-slate-900 text-lg md:text-xl">{t.author}</div>
                    <div className="text-sm md:text-base text-brand-600 font-medium mt-1">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-white rounded-[32px] border border-slate-200 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
                <div>
                  <div className="eyebrow mb-2 text-brand-700 font-bold">Share Your Feedback</div>
                  <h3 className="font-display font-bold text-3xl text-slate-900">Write a comment for this community.</h3>
                </div>
                <div className="text-sm text-slate-500">Comments are saved locally in your browser.</div>
              </div>
              <form onSubmit={postComment} className="grid gap-4 md:grid-cols-[1fr_1fr]">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Your comment</label>
                  <textarea
                    rows={4}
                    value={commentForm.comment}
                    onChange={(e) => updateField('comment', e.target.value)}
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 focus:border-sky-400 focus:ring-4 focus:ring-sky-200/50 outline-none transition"
                    placeholder="Share what ABC Development means to you..."
                    required
                  />
                </div>
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Your name</label>
                    <input
                      type="text"
                      value={commentForm.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 focus:border-sky-400 focus:ring-4 focus:ring-sky-200/50 outline-none transition"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-brand-700 px-6 py-3 text-base font-semibold text-white transition hover:bg-brand-800 shadow-[0_18px_60px_rgba(14,165,233,0.18)] focus:outline-none focus:ring-4 focus:ring-sky-400/30"
                  >
                    Post comment
                  </button>
                </div>
              </form>

              {comments.length > 0 && (
                <div className="mt-10 grid gap-4">
                  {comments.map((entry) => (
                    <div key={entry.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-semibold text-slate-900">{entry.name}</div>
                          <div className="text-sm text-slate-500">{entry.date}</div>
                        </div>
                      </div>
                      <p className="mt-4 text-slate-700 leading-relaxed text-base">{entry.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
