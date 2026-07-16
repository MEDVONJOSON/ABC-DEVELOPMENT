import { useState } from 'react';
import { Heart, Users, Briefcase, CheckCircle, BookOpen, Stethoscope, Laptop, Megaphone, Globe, Sprout, HeartPulse, GraduationCap } from 'lucide-react';
import PageHero from '../components/PageHero.jsx';
import { donationTiers, volunteerRoles } from '../data/site.js';
import { siteInfo } from '../data/site.js';

const tierIcons = { BookOpen, Stethoscope, Briefcase };
const roleIcons = {
  GraduationCap, HeartPulse, Megaphone, Laptop, Globe, Sprout,
};

export default function GetInvolved() {
  const [donationForm, setDonationForm] = useState({ name: '', email: '', amount: 100, message: '' });
  const [volunteerForm, setVolunteerForm] = useState({
    name: '', email: '', role: 'teaching', motivation: '', skills: '',
  });
  const [partnerForm, setPartnerForm] = useState({
    org: '', contactName: '', email: '', type: 'corporate', message: '',
  });
  const [submitted, setSubmitted] = useState({ donate: false, volunteer: false, partner: false });

  const submitDonation = (e) => {
    e.preventDefault();
    // In production, this would call your payment processor / Supabase.
    console.log('Donation submitted:', donationForm);
    setSubmitted((s) => ({ ...s, donate: true }));
  };
  const submitVolunteer = (e) => {
    e.preventDefault();
    const roleName = volunteerRoles.find(r => r.id === volunteerForm.role)?.title || volunteerForm.role;
    const body = [
      `Name: ${volunteerForm.name}`,
      `Email: ${volunteerForm.email}`,
      `Preferred Area: ${roleName}`,
      `Skills & Experience: ${volunteerForm.skills}`,
      `Motivation: ${volunteerForm.motivation}`,
    ].join('%0D%0A');
    const subject = encodeURIComponent(`Volunteer Application – ${volunteerForm.name}`);
    window.open(`mailto:info@abcdevelopmentsl.org?subject=${subject}&body=${body}`, '_self');
    setSubmitted((s) => ({ ...s, volunteer: true }));
  };
  const submitPartner = (e) => {
    e.preventDefault();
    console.log('Partnership inquiry:', partnerForm);
    setSubmitted((s) => ({ ...s, partner: true }));
  };

  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Volunteer & Partner"
        subtitle="Support ABC Development's mission by volunteering your time and skills, or partnering with us to create lasting change in Sierra Leone."
        image="/images/hero-community.jpg"
      />

      <section className="section">
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="eyebrow mb-3">There Are Many Ways To Join Us</div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900">
              There are many ways you can join us in transforming lives across Sierra Leone.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5 max-w-2xl mx-auto">
            <a href="#volunteer" className="card p-7 text-center hover:shadow-lg transition-shadow group">
              <div className="w-14 h-14 rounded-xl bg-brand-100 text-brand-800 flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-800 group-hover:text-white transition-colors">
                <Users size={24} />
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900">Volunteer</h3>
              <p className="text-sm text-slate-600 mt-2">Share your skills and time to make a direct impact in communities.</p>
            </a>
            <a href="#partner" className="card p-7 text-center hover:shadow-lg transition-shadow group">
              <div className="w-14 h-14 rounded-xl bg-brand-100 text-brand-800 flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-800 group-hover:text-white transition-colors">
                <Briefcase size={24} />
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900">Partner</h3>
              <p className="text-sm text-slate-600 mt-2">Collaborate with us as an organization, foundation, or corporate partner.</p>
            </a>
          </div>
        </div>
      </section>

      {/* DONATE */}
      <section id="donate" className="section bg-slate-50 scroll-mt-20">
        <div className="container-page grid lg:grid-cols-2 gap-10">
          <div>
            <div className="eyebrow mb-3">Donate</div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-slate-900 leading-tight">
              Your donation helps us provide education, healthcare, and economic opportunities.
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed text-lg">
              Every contribution, no matter the size, makes a real difference in the lives of people across Sierra Leone. We believe in full transparency — your support creates impact you can see.
            </p>
            <div className="mt-6 space-y-3">
              {donationTiers.map((t) => {
                const Icon = tierIcons[t.icon] || Heart;
                return (
                  <div key={t.id} className="card p-6 flex items-center gap-4 ring-0 hover:ring-2 hover:ring-sky-400/20 hover:shadow-[0_18px_60px_rgba(14,165,233,0.06)] transition-all">
                    <div className="w-14 h-14 rounded-xl bg-brand-100 text-brand-800 flex items-center justify-center flex-shrink-0">
                      <Icon size={24} />
                    </div>
                    <div>
                      <div className="font-display font-bold text-2xl md:text-3xl text-brand-800">${t.amount}</div>
                      <div className="text-sm md:text-base text-slate-600">{t.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 text-sm text-slate-500">
              Secure payment via bank transfer or mobile money. Tax-deductible where applicable.
            </div>
          </div>

          <div className="card p-7">
            {submitted.donate ? (
              <div className="text-center py-12">
                <CheckCircle size={48} className="text-brand-600 mx-auto mb-3" />
                <h3 className="font-display font-bold text-2xl text-slate-900">Thank you!</h3>
                <p className="text-slate-600 mt-2">Your donation form has been received. We'll be in touch with payment instructions shortly.</p>
              </div>
            ) : (
              <form onSubmit={submitDonation} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">Your name</label>
                  <input
                    type="text"
                    required
                    value={donationForm.name}
                    onChange={(e) => setDonationForm({ ...donationForm, name: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-300"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Email</label>
                  <input
                    type="email"
                    required
                    value={donationForm.email}
                    onChange={(e) => setDonationForm({ ...donationForm, email: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-300"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Amount (USD)</label>
                  <div className="mt-1 flex gap-2 flex-wrap">
                    {[50, 100, 250, 500].map((amt) => (
                      <button
                        type="button"
                        key={amt}
                        onClick={() => setDonationForm({ ...donationForm, amount: amt })}
                        className={`px-5 py-3 rounded-xl border text-base md:text-lg font-semibold transition-all ${
                          donationForm.amount === amt
                            ? 'bg-brand-800 text-white border-brand-800 ring-2 ring-sky-400/30 shadow-[0_12px_40px_rgba(14,165,233,0.14)]'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-brand-300 hover:shadow-[0_8px_24px_rgba(2,132,199,0.06)]'
                        }`}
                      >
                        ${amt}
                      </button>
                    ))}
                    <input
                      type="number"
                      min="10"
                      value={donationForm.amount}
                      onChange={(e) => setDonationForm({ ...donationForm, amount: Number(e.target.value) })}
                      className="w-24 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Message (optional)</label>
                  <textarea
                    rows={3}
                    value={donationForm.message}
                    onChange={(e) => setDonationForm({ ...donationForm, message: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-300"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-brand-700 text-white text-lg font-semibold py-3 shadow-sm transition-all hover:shadow-[0_18px_60px_rgba(14,165,233,0.18)] focus:outline-none focus:ring-4 focus:ring-sky-400/25"
                >
                  Continue to Payment
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* VOLUNTEER */}
      <section id="volunteer" className="section scroll-mt-20">
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="eyebrow mb-3">Volunteer</div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900">
              Join our network of passionate volunteers.
            </h2>
            <p className="text-slate-600 mt-4 text-lg leading-relaxed">
              Whether you have a few hours a week or can commit long-term, there's a place for you.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {volunteerRoles.map((r) => {
              const Icon = roleIcons[r.icon] || Users;
              return (
                <div key={r.id} className="card p-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-800 flex items-center justify-center mb-4">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-slate-900">{r.title}</h3>
                  <p className="text-sm text-slate-600 mt-2">{r.description}</p>
                </div>
              );
            })}
          </div>

          <div className="card p-7 max-w-3xl mx-auto">
            {submitted.volunteer ? (
              <div className="text-center py-12">
                <CheckCircle size={48} className="text-brand-600 mx-auto mb-3" />
                <h3 className="font-display font-bold text-2xl text-slate-900">Application received!</h3>
                <p className="text-slate-600 mt-2">We'll contact you soon with next steps.</p>
              </div>
            ) : (
              <form onSubmit={submitVolunteer} className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">Your name</label>
                  <input
                    type="text"
                    required
                    value={volunteerForm.name}
                    onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-300"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Email</label>
                  <input
                    type="email"
                    required
                    value={volunteerForm.email}
                    onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-300"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-slate-700">Preferred area</label>
                  <select
                    value={volunteerForm.role}
                    onChange={(e) => setVolunteerForm({ ...volunteerForm, role: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-300 bg-white"
                  >
                    {volunteerRoles.map((r) => (
                      <option key={r.id} value={r.id}>{r.title}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-slate-700">Skills & experience</label>
                  <textarea
                    rows={3}
                    value={volunteerForm.skills}
                    onChange={(e) => setVolunteerForm({ ...volunteerForm, skills: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-300"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-slate-700">Why do you want to volunteer with us?</label>
                  <textarea
                    rows={3}
                    required
                    value={volunteerForm.motivation}
                    onChange={(e) => setVolunteerForm({ ...volunteerForm, motivation: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-300"
                  />
                </div>
                <div className="sm:col-span-2">
                  <button type="submit" className="btn-primary w-full">Apply to Volunteer</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* PARTNER */}
      <section id="partner" className="section bg-slate-50 scroll-mt-20">
        <div className="container-page grid lg:grid-cols-2 gap-10">
          <div>
            <div className="eyebrow mb-3">Partner With Us</div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900">
              We collaborate to maximize our impact.
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              We collaborate with international NGOs, foundations, government agencies, corporations, and community organizations to maximize our impact.
            </p>
            <ul className="mt-6 space-y-3 text-slate-700">
              <li className="flex items-start gap-3"><CheckCircle size={20} className="text-brand-600 mt-1 flex-shrink-0" />Program partnerships and grant collaborations.</li>
              <li className="flex items-start gap-3"><CheckCircle size={20} className="text-brand-600 mt-1 flex-shrink-0" />Policy alignment and public service delivery.</li>
              <li className="flex items-start gap-3"><CheckCircle size={20} className="text-brand-600 mt-1 flex-shrink-0" />Employee engagement and funding partnerships.</li>
            </ul>
            <div className="mt-6 text-sm text-slate-600">
              Reach us at <a href={`mailto:${siteInfo.partnershipEmail}`} className="text-brand-700 underline">{siteInfo.partnershipEmail}</a>
            </div>
          </div>

          <div className="card p-7">
            {submitted.partner ? (
              <div className="text-center py-12">
                <CheckCircle size={48} className="text-brand-600 mx-auto mb-3" />
                <h3 className="font-display font-bold text-2xl text-slate-900">Thank you for reaching out!</h3>
                <p className="text-slate-600 mt-2">Our partnerships team will get back to you within 2 business days.</p>
              </div>
            ) : (
              <form onSubmit={submitPartner} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">Organization</label>
                  <input
                    type="text"
                    required
                    value={partnerForm.org}
                    onChange={(e) => setPartnerForm({ ...partnerForm, org: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-300"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Contact name</label>
                  <input
                    type="text"
                    required
                    value={partnerForm.contactName}
                    onChange={(e) => setPartnerForm({ ...partnerForm, contactName: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-300"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Email</label>
                  <input
                    type="email"
                    required
                    value={partnerForm.email}
                    onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-300"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Partnership type</label>
                  <select
                    value={partnerForm.type}
                    onChange={(e) => setPartnerForm({ ...partnerForm, type: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-300 bg-white"
                  >
                    <option value="corporate">Corporate Sponsorship</option>
                    <option value="foundation">Foundation / Funder</option>
                    <option value="ngo">NGO Collaboration</option>
                    <option value="government">Government / Public Sector</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Tell us about your partnership idea</label>
                  <textarea
                    rows={4}
                    required
                    value={partnerForm.message}
                    onChange={(e) => setPartnerForm({ ...partnerForm, message: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-300"
                  />
                </div>
                <button type="submit" className="btn-primary w-full">Submit Partnership Inquiry</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
