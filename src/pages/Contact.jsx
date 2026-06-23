import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare } from 'lucide-react';
import PageHero from '../components/PageHero.jsx';
import { siteInfo } from '../data/site.js';

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', subject: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    console.log('Contact form:', form);
    setSubmitted(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Get in Touch"
        subtitle="Contact ABC Development for inquiries about our programs, partnerships, volunteering, or donations."
        image="/images/hero-community.jpg"
      />

      <section className="section">
        <div className="container-page grid lg:grid-cols-5 gap-10">
          {/* Info */}
          <div className="lg:col-span-2">
            <div className="eyebrow mb-3">Reach Out</div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900">
              Have questions? We'd love to hear from you.
            </h2>
            <p className="text-slate-600 mt-4 leading-relaxed">
              Have questions or want to get involved? Reach out to us using the details below or send us a message.
            </p>

            <div className="mt-8 space-y-4">
              <div className="card p-5 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-brand-100 text-brand-800 flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Office Address</div>
                  <div className="text-sm text-slate-600 mt-1">{siteInfo.address}</div>
                </div>
              </div>
              <div className="card p-5 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-brand-100 text-brand-800 flex items-center justify-center flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-slate-900">Email Contacts</div>
                  <div className="mt-2 space-y-2">
                    {siteInfo.emails.map((contact) => (
                      <a
                        key={contact.address}
                        href={`mailto:${contact.address}`}
                        className="block text-sm text-brand-700 hover:underline break-words"
                      >
                        <span className="font-medium text-slate-700">{contact.label}: </span>
                        {contact.address}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="card p-5 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-brand-100 text-brand-800 flex items-center justify-center flex-shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Phone</div>
                  <div className="mt-2 space-y-2">
                    {siteInfo.phones.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone.replace(/\s/g, '')}`}
                        className="block text-sm text-brand-700 hover:underline"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="card p-5 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-brand-100 text-brand-800 flex items-center justify-center flex-shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Office Hours</div>
                  <div className="text-sm text-slate-600 mt-1">{siteInfo.hours}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="card p-7">
              <h3 className="font-display font-bold text-2xl text-slate-900 flex items-center gap-2">
                <MessageSquare size={20} className="text-brand-700" /> Send us a message
              </h3>
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle size={48} className="text-brand-600 mx-auto mb-3" />
                  <h4 className="font-display font-bold text-xl text-slate-900">Message sent successfully!</h4>
                  <p className="text-slate-600 mt-2">We'll respond within 24–48 hours.</p>
                </div>
              ) : (
                <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4 mt-5">
                  <div>
                    <label className="text-sm font-medium text-slate-700">Your name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-300"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-300"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Phone (optional)</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-300"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Subject</label>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-300"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium text-slate-700">Your message</label>
                    <textarea
                      rows={5}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-300"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button type="submit" className="btn-primary w-full">
                      <Send size={16} /> Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
