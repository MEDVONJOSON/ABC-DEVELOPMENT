import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Eye,
  GraduationCap,
  HeartPulse,
  Target,
  Users,
  Sprout,
  Scale,
  Trees,
  Quote,
  ChevronLeft,
  ChevronRight,
  Heart,
  Newspaper,
  Calendar
} from 'lucide-react';
import SectionHeader from '../components/SectionHeader.jsx';
import Stats from '../components/Stats.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import NewsCard from '../components/NewsCard.jsx';
import { categories, projects } from '../data/projects.js';
import { news } from '../data/news.js';
import { testimonials, partners, donationTiers } from '../data/site.js';

const iconMap = {
  GraduationCap, HeartPulse, Users, Sprout, Scale, Trees,
};

const categoryStyles = {
  education: {
    gradient: 'from-blue-500 to-indigo-600',
    cardBorder: 'border-b-blue-500/50 hover:border-blue-500',
    cardHoverShadow: 'hover:shadow-blue-500/15',
    cardHoverBg: 'hover:bg-blue-50/10',
    iconContainer: 'bg-blue-50 text-blue-600 border-blue-100 group-hover:from-blue-500 group-hover:to-indigo-600 group-hover:text-white',
    iconColor: 'text-blue-600 group-hover:text-white',
    textBrand: 'text-blue-700 group-hover:text-blue-800'
  },
  health: {
    gradient: 'from-emerald-500 to-teal-600',
    cardBorder: 'border-b-emerald-500/50 hover:border-emerald-500',
    cardHoverShadow: 'hover:shadow-emerald-500/15',
    cardHoverBg: 'hover:bg-emerald-50/10',
    iconContainer: 'bg-emerald-50 text-emerald-600 border-emerald-100 group-hover:from-emerald-500 group-hover:to-teal-600 group-hover:text-white',
    iconColor: 'text-emerald-600 group-hover:text-white',
    textBrand: 'text-emerald-700 group-hover:text-emerald-800'
  },

  livelihood: {
    gradient: 'from-amber-500 to-orange-600',
    cardBorder: 'border-b-amber-500/50 hover:border-amber-500',
    cardHoverShadow: 'hover:shadow-amber-500/15',
    cardHoverBg: 'hover:bg-amber-50/10',
    iconContainer: 'bg-amber-50 text-amber-600 border-amber-100 group-hover:from-amber-500 group-hover:to-orange-600 group-hover:text-white',
    iconColor: 'text-amber-600 group-hover:text-white',
    textBrand: 'text-amber-700 group-hover:text-amber-800'
  },
  governance: {
    gradient: 'from-violet-500 to-indigo-600',
    cardBorder: 'border-b-violet-500/50 hover:border-violet-500',
    cardHoverShadow: 'hover:shadow-violet-500/15',
    cardHoverBg: 'hover:bg-violet-50/10',
    iconContainer: 'bg-violet-50 text-violet-600 border-violet-100 group-hover:from-violet-500 group-hover:to-indigo-600 group-hover:text-white',
    iconColor: 'text-violet-600 group-hover:text-white',
    textBrand: 'text-violet-700 group-hover:text-violet-800'
  },
  rural: {
    gradient: 'from-green-500 to-emerald-600',
    cardBorder: 'border-b-green-500/50 hover:border-green-500',
    cardHoverShadow: 'hover:shadow-green-500/15',
    cardHoverBg: 'hover:bg-green-50/10',
    iconContainer: 'bg-green-50 text-green-600 border-green-100 group-hover:from-green-500 group-hover:to-emerald-600 group-hover:text-white',
    iconColor: 'text-green-600 group-hover:text-white',
    textBrand: 'text-green-700 group-hover:text-green-800'
  }
};


const heroSlides = [
  {
    id: 1,
    image: "/images/hero-education.jpg",
    eyebrow: "CHILD EDUCATION",
    title: "IMPROVED\nGIRLS'\nEDUCATION",
    description: "Rehabilitated a rural primary school, distributed learning materials, and supported 60 out-of-school girls to re-enter and remain in formal education, creating pathways for lifelong learning."
  },
  {
    id: 2,
    image: "/images/hero-landscape.jpg",
    eyebrow: "LIVELIHOOD",
    title: "ENHANCED\nFOOD SECURITY\n& LIVELIHOOD",
    description: "Provided seed inputs, post-harvest management support, and agronomic training to smallholder farmers—strengthening local food systems and community resilience."
  },

];

const missionItems = [
  {
    id: 'vision',
    icon: Eye,
    title: 'VISION',
    gradient: 'from-teal-500 to-emerald-600',
    cardBg: 'bg-emerald-100',
    cardBorder: 'border-emerald-200',
    iconBg: 'bg-white text-teal-700 border border-teal-300',
    titleColor: 'text-teal-800',
    textColor: 'text-teal-900/80',
    text: 'We envisage a nation of inclusive and participatory governance providing equal opportunities for all citizens irrespective of ethnic group, region, gender, age, political and religious affiliations.',
  },
  {
    id: 'mission',
    icon: Target,
    title: 'MISSION',
    gradient: 'from-amber-400 to-yellow-500',
    cardBg: 'bg-amber-100',
    cardBorder: 'border-amber-200',
    iconBg: 'bg-white text-amber-700 border border-amber-300',
    titleColor: 'text-amber-800',
    textColor: 'text-amber-900/80',
    text: 'The Mission of ABC-DEVELOPMENT is to promote, support and enhance the process of Development and Community Well-being through awareness raising and capacity building of members of communities to enhance their participation in the social, economic and political processes of their communities.',
  },
  {
    id: 'value',
    icon: Heart,
    title: 'CORE VALUE',
    gradient: 'from-sky-400 to-cyan-500',
    cardBg: 'bg-sky-100',
    cardBorder: 'border-sky-200',
    iconBg: 'bg-white text-sky-700 border border-sky-300',
    titleColor: 'text-sky-800',
    textColor: 'text-sky-900/80',
    text: 'We firmly believe that poverty is not an inescapable trap, and that development, poverty reduction and the promotion of community wellbeing depend mostly on accountable, transparent and inclusive policies and practices that empower and build the capacities of Civil Society Organizations and Community Groups to actively participate in the social, economic and political processes of their communities without any restriction based on gender, age, religious and political affiliation.',
  },
];

export default function Home() {
  const featuredProjects = projects.slice(0, 3);
  const latestNews = news.slice(0, 3);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentMission, setCurrentMission] = useState(0);
  const [currentAchievement, setCurrentAchievement] = useState(0);
  const [currentPartner, setCurrentPartner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMission((prev) => (prev + 1) % missionItems.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAchievement((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPartner((prev) => (prev + 1) % partners.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  const nextMission = () => setCurrentMission((prev) => (prev + 1) % missionItems.length);
  const prevMission = () => setCurrentMission((prev) => (prev === 0 ? missionItems.length - 1 : prev - 1));

  return (
    <>
      {/* HERO */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden bg-brand-900">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image with Tint */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt=""
                className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-linear ${
                  index === currentSlide ? 'scale-110' : 'scale-100'
                }`}
              />
              <div className="absolute inset-0 bg-teal-800/60 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-brand-800/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="container-page relative w-full">
                <div className="max-w-3xl">
                  <div className="text-sm md:text-base font-semibold uppercase tracking-wider text-white/90 mb-4">
                    {slide.eyebrow}
                  </div>
                  <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] text-white whitespace-pre-line mb-6">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-20 container-page pointer-events-none flex justify-between px-0 sm:px-4">
          <button
            onClick={prevSlide}
            className="pointer-events-auto bg-amber-400 hover:bg-amber-500 text-white p-2 md:p-3 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="pointer-events-auto bg-purple-700 hover:bg-purple-800 text-white p-2 md:p-3 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </section>

      {/* MISSION / VISION / CORE VALUE — Horizontal Sliding Carousel */}
      <section className="section bg-slate-50 overflow-hidden">
        <div className="container-page">
          <SectionHeader
            eyebrow="Who We Are"
            title="Our Mission, Vision & Core Value"
            description="The principles that guide everything we do at ABC-Development."
          />

          {/* Slider track */}
          <div className="relative">
            {/* Overflow window */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentMission * 100}%)` }}
              >
                {missionItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      className="w-full shrink-0 px-2"
                    >
                      <div className={`relative flex items-start gap-6 p-8 rounded-2xl border ${item.cardBorder} ${item.cardBg} overflow-hidden group hover:shadow-2xl transition-all duration-300 ease-out`}>
                        {/* Left gradient accent bar */}
                        <div className={`absolute top-0 bottom-0 left-0 w-[5px] bg-gradient-to-b ${item.gradient}`} />

                        {/* Icon */}
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${item.iconBg} transition-all duration-300 group-hover:scale-110 group-hover:rotate-[8deg]`}>
                          <Icon size={28} />
                        </div>

                        {/* Content */}
                        <div className="pl-1 flex-1">
                          <h3 className={`font-display font-bold text-sm tracking-widest uppercase mb-3 ${item.titleColor}`}>
                            {item.title}
                          </h3>
                          <p className={`leading-relaxed text-base ${item.textColor}`}>
                            {item.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Prev / Next arrows */}
            <button
              onClick={prevMission}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:shadow-lg transition-all duration-200"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextMission}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:shadow-lg transition-all duration-200"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-3 mt-7">
            {missionItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setCurrentMission(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentMission
                    ? `w-9 bg-gradient-to-r ${item.gradient}`
                    : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to ${item.title}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <Stats />

      {/* FOCUS AREAS */}
      <section className="section">
        <div className="container-page">
          <SectionHeader
            eyebrow="Our Focus Areas"
            title="Six sectors, one mission"
            description="We work across six key sectors to create lasting change in Sierra Leonean communities."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((c) => {
              const Icon = iconMap[c.icon] || Users;
              const style = categoryStyles[c.id] || categoryStyles.education;
              return (
                <Link
                  key={c.id}
                  to={`/projects?category=${c.id}`}
                  className={`card relative flex flex-col justify-between p-6 pt-8 group border border-slate-200/80 border-b-4 ${style.cardBorder} bg-white ${style.cardHoverBg} hover:-translate-y-2 hover:shadow-2xl ${style.cardHoverShadow} transition-all duration-300 ease-out overflow-hidden`}
                >
                  {/* Decorative Top Accent Bar (Coloring & Thickening) */}
                  <div className={`absolute top-0 left-0 right-0 h-[5px] bg-gradient-to-r ${style.gradient}`} />
                  
                  <div>
                    {/* Icon Container with Pop, Spin, Gradient Reveal & Glow */}
                    <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-6 shadow-sm ${style.iconContainer} bg-gradient-to-br transition-all duration-300 group-hover:scale-110 group-hover:rotate-[8deg]`}>
                      <Icon size={26} className="transition-colors duration-300" />
                    </div>
                    
                    <h3 className="font-display font-bold text-2xl text-slate-800 group-hover:text-slate-900 transition-colors leading-tight">
                      {c.name}
                    </h3>
                    <p className="text-sm text-slate-600 mt-3 leading-relaxed font-normal">
                      {c.description}
                    </p>
                  </div>
                  
                  {/* Explore Link with Shifting Arrow */}
                  <div className={`mt-6 text-sm font-semibold ${style.textBrand} flex items-center gap-1.5 transition-colors`}>
                    <span className="group-hover:underline">Explore Projects</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-200" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* RECENT SUCCESS STORIES */}
      <section className="section bg-slate-50">
        <div className="container-page">
          <SectionHeader
            eyebrow="Recent Success Stories"
            title="Impact across every sector"
            description="From classrooms to clinics, our work is transforming lives across Sierra Leone."
          />
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Stories List */}
            <div className="lg:col-span-2 space-y-8">
              {categories.map((c) => {
                const Icon = iconMap[c.icon] || Users;
                const style = categoryStyles[c.id] || categoryStyles.education;
                return (
                  <div 
                    key={c.id} 
                    className={`card relative p-6 pl-8 flex gap-5 group border border-slate-200/80 bg-white ${style.cardHoverBg} hover:-translate-y-1 hover:shadow-2xl ${style.cardHoverShadow} transition-all duration-300 ease-out overflow-hidden`}
                  >
                    {/* Decorative Left Accent Bar (Coloring & Thickening) */}
                    <div className={`absolute top-0 bottom-0 left-0 w-[5px] bg-gradient-to-b ${style.gradient}`} />
                    
                    {/* Icon Container with Pop, Spin, Gradient Reveal & Glow */}
                    <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 mt-1 shadow-sm ${style.iconContainer} bg-gradient-to-br transition-all duration-300 group-hover:scale-110 group-hover:rotate-[8deg]`}>
                      <Icon size={26} className="transition-colors duration-300" />
                    </div>
                    
                    <div>
                      <h3 className="font-display font-bold text-2xl text-slate-800 group-hover:text-slate-900 transition-colors mb-2 leading-tight">
                        {c.name}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed font-normal">
                        {c.description}
                      </p>
                      <Link
                        to={`/projects?category=${c.id}`}
                        className={`inline-flex items-center gap-1.5 mt-4 text-sm font-semibold ${style.textBrand} transition-colors group-hover:gap-2`}
                      >
                        <span className="group-hover:underline">Read Details</span>
                        <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Stories Quick List */}
              <div className="card p-6">
                <h4 className="font-display font-bold text-lg text-slate-900 border-l-4 border-amber-400 pl-3 mb-5">
                  Recent Success Stories
                </h4>
                <ul className="space-y-4">
                  {categories.slice(0, 3).map((c) => {
                    const Icon = iconMap[c.icon] || Users;
                    const style = categoryStyles[c.id] || categoryStyles.education;
                    return (
                      <li key={c.id}>
                        <Link
                          to={`/projects?category=${c.id}`}
                          className="flex items-center gap-3 group p-1.5 rounded-xl hover:bg-slate-50 transition-colors"
                        >
                          {/* Small Icon Container with subtle animation & theme color */}
                          <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 shadow-sm ${style.iconContainer} bg-gradient-to-br transition-all duration-300 group-hover:scale-105`}>
                            <Icon size={18} />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-800 group-hover:text-slate-900 transition-colors leading-tight">
                              {c.name}
                            </div>
                            <div className="text-xs text-slate-400 mt-0.5">Mon Nov 2023</div>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Story Categories */}
              <div className="card p-6">
                <h4 className="font-display font-bold text-lg text-slate-900 border-l-4 border-amber-400 pl-3 mb-5">
                  Success Story Categories
                </h4>
                <ul className="space-y-2">
                  {categories.map((c) => {
                    const style = categoryStyles[c.id] || categoryStyles.education;
                    return (
                      <li key={c.id}>
                        <Link
                          to={`/projects?category=${c.id}`}
                          className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 font-medium transition-all py-1 group"
                        >
                          <ArrowRight size={14} className="text-slate-400 group-hover:translate-x-1 group-hover:text-slate-800 transition-all" />
                          <span>{c.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="section bg-slate-50">
        <div className="container-page">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <div className="eyebrow mb-3">Featured Projects</div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-sky-500">
                See how we're making a difference on the ground.
              </h2>
            </div>
            <Link to="/projects" className="btn-secondary">
              View All Projects <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>



      {/* KEY ACHIEVEMENTS */}
      <section className="section bg-white">
        <div className="container-page">
          <SectionHeader
            eyebrow="Key Achievements"
            title="Making a difference, one milestone at a time"
            description="ABC-Development has delivered real, measurable impact across communities in Sierra Leone."
          />
          <div className="slider-container slider-achievements mx-auto -mx-3">
            <div className="overflow-hidden px-3 py-4">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(calc(-${currentAchievement} * var(--slide-shift)))` }}
              >
                {[
                  {
                    num: '01',
                    gradient: 'from-teal-500 to-emerald-600',
                    bg: 'bg-teal-50',
                    numColor: 'text-teal-700',
                    text: 'Empowered 100 women and young Girls for leadership and political participation in Kambia district through training on basic Local Government Tools and their Roles and Responsibilities in the Local Governance Process accompanied to perform better in their new roles.',
                  },
                  {
                    num: '02',
                    gradient: 'from-brand-500 to-teal-600',
                    bg: 'bg-brand-50',
                    numColor: 'text-brand-700',
                    text: 'Supported Gender equality and social accountability processes in four political wards in Kambia district through rights awareness raising, citizens monitoring and advocacy for effective service delivery in vulnerable communities.',
                  },
                  {
                    num: '03',
                    gradient: 'from-amber-500 to-orange-600',
                    bg: 'bg-amber-50',
                    numColor: 'text-amber-700',
                    text: 'Reduced politically motivated conflict in Kambia district through the training of 150 Peace Ambassadors, providing the right information on governance to women and youth and providing access to financial resources and alternative livelihood support to women and youth.',
                  },
                  {
                    num: '04',
                    gradient: 'from-violet-500 to-indigo-600',
                    bg: 'bg-violet-50',
                    numColor: 'text-violet-700',
                    text: 'Supported the free quality education in vulnerable communities through the rehabilitation of community schools, distribution of teaching and learning materials primary schools, and introducing reading circles in community schools in Kambia district.',
                  },
                ].map((item, idx) => (
                  <div key={item.num} className="w-full md:w-1/2 lg:w-1/4 shrink-0 px-3">
                    <div className="relative h-full flex flex-col items-start gap-5 p-7 rounded-2xl border border-slate-200/80 bg-white overflow-hidden group hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 ease-out">
                      {/* Left gradient accent bar */}
                      <div className={`absolute top-0 bottom-0 left-0 w-[5px] bg-gradient-to-b ${item.gradient}`} />

                      {/* Number badge */}
                      <div className={`w-16 h-16 rounded-2xl ${item.bg} flex items-center justify-center shrink-0 shadow-sm border border-slate-100 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[4deg]`}>
                        <span className={`font-display font-black text-2xl ${item.numColor}`}>{item.num}</span>
                      </div>

                      {/* Text */}
                      <p className="text-slate-600 leading-relaxed text-sm pt-1 flex-1">
                        {item.text}
                      </p>

                      {/* Subtle bottom separator */}
                      <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STRATEGIC PARTNERS & DONORS */}
      <section className="section bg-slate-50">
        <div className="container-page">
          <SectionHeader
            eyebrow="Strategic Partners & Donors"
            title="Trusted by leading organizations"
            description="ABC-Development collaborates with both local and international partners to implement its programs and achieve its objectives."
          />
          <div className="slider-container slider-partners -mx-2.5">
            <div className="overflow-hidden px-2.5 py-4">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(calc(-${currentPartner} * var(--slide-shift)))` }}
              >
                {partners.map((p, idx) => (
                  <div key={p.id} className="w-1/2 md:w-1/3 lg:w-1/6 shrink-0 px-2.5">
                    <div className="h-full group relative bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col items-center justify-center text-center overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-out cursor-default">
                      {/* Top gradient accent bar */}
                      <div className={`absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r ${p.color}`} />

                      {/* Shimmer sweep on hover */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

                      {/* Logo or Initials avatar */}
                      {p.logo ? (
                        <div className="w-full h-16 flex items-center justify-center mb-3 px-2">
                          <img
                            src={p.logo}
                            alt={p.name}
                            className="max-h-12 max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-3 shadow-md group-hover:scale-110 group-hover:rotate-[6deg] transition-all duration-300`}>
                          <span className="text-white font-display font-black text-sm tracking-wide">{p.initials}</span>
                        </div>
                      )}

                      <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors leading-tight">
                        {p.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Description note */}
          <p className="text-center text-sm text-slate-500 mt-8 max-w-2xl mx-auto leading-relaxed">
            Key partners include: <span className="font-semibold text-slate-700">Trocaire, Action Aid, the European Union,</span> and <span className="font-semibold text-slate-700">CARE International</span>
          </p>
        </div>
      </section>


      {/* NEWS */}
      <section className="section">
        <div className="container-page">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <div className="eyebrow mb-3">Latest News & Updates</div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-sky-500">
                Stay informed about our work and impact.
              </h2>
            </div>
            <Link to="/news" className="btn-secondary">
              All News <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.map((a, idx) => {
              const newsGradients = [
                { gradient: 'from-brand-500 to-teal-600', iconBg: 'bg-brand-50 text-brand-700 border border-brand-100', titleHover: 'group-hover:text-brand-700', shadow: 'hover:shadow-brand-500/15', link: 'text-brand-700' },
                { gradient: 'from-amber-500 to-orange-600', iconBg: 'bg-amber-50 text-amber-700 border border-amber-100', titleHover: 'group-hover:text-amber-700', shadow: 'hover:shadow-amber-500/15', link: 'text-amber-700' },
                { gradient: 'from-violet-500 to-indigo-600', iconBg: 'bg-violet-50 text-violet-700 border border-violet-100', titleHover: 'group-hover:text-violet-700', shadow: 'hover:shadow-violet-500/15', link: 'text-violet-700' },
              ];
              const style = newsGradients[idx % newsGradients.length];
              return (
                <Link
                  key={a.id}
                  to={`/news/${a.slug}`}
                  className={`card relative flex flex-col group border border-slate-200/80 bg-white hover:-translate-y-2 hover:shadow-2xl ${style.shadow} transition-all duration-300 ease-out overflow-hidden`}
                >
                  {/* Top gradient accent bar */}
                  <div className={`absolute top-0 left-0 right-0 h-[5px] bg-gradient-to-r ${style.gradient}`} />

                  {/* Image */}
                  <div className="aspect-[16/9] overflow-hidden mt-[5px]">
                    <img
                      src={a.cover}
                      alt={a.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-6">
                    {/* Category chip */}
                    {(() => { const cat = [{id:'education',name:'Education'},{id:'health',name:'Healthcare'},{id:'livelihood',name:'Livelihood'},{id:'governance',name:'Governance'},{id:'rural',name:'Climate Change'}].find(c => c.id === a.category); return cat ? <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600 mb-3 w-fit capitalize">{cat.name}</span> : null; })()}

                    <h3 className={`font-display font-bold text-lg text-slate-800 ${style.titleHover} transition-colors leading-snug flex-1`}>
                      {a.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {a.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Calendar size={13} />
                        <span>{new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className={`text-sm font-semibold ${style.link} flex items-center gap-1 group-hover:gap-2 transition-all`}>
                        Read <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* DONATE / VOLUNTEER CTA */}
      <section className="section">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="card p-8 md:p-10 bg-gradient-brand text-white border-0">
              <h3 className="font-display font-bold text-2xl md:text-3xl">Support Our Mission</h3>
              <p className="mt-3 text-white/90">
                Your donation helps us provide education, healthcare, and economic opportunities to vulnerable communities across Sierra Leone.
              </p>
              <ul className="mt-5 space-y-2 text-white/90">
                {donationTiers.map((t) => (
                  <li key={t.id} className="flex items-start gap-3">
                    <span className="font-display font-bold text-xl">${t.amount}</span>
                    <span>{t.description}</span>
                  </li>
                ))}
              </ul>
              <Link to="/get-involved#donate" className="inline-flex items-center gap-2 mt-7 px-6 py-3 rounded-full bg-white text-brand-800 font-semibold hover:bg-brand-50 transition-colors">
                Donate Now <ArrowRight size={18} />
              </Link>
            </div>

            <div className="card p-8 md:p-10 bg-white">
              <h3 className="font-display font-bold text-2xl md:text-3xl text-slate-900">Become a Volunteer</h3>
              <p className="mt-3 text-slate-600">
                Join our team of dedicated volunteers making real impact. Whether locally or remotely, there's a place for you.
              </p>
              <ul className="mt-5 space-y-2 text-slate-700">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-600"></span> Teaching & mentoring opportunities</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-600"></span> Skills-based volunteering</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-600"></span> Community outreach programs</li>
              </ul>
              <Link to="/get-involved#volunteer" className="btn-primary mt-7">
                Apply Now <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
