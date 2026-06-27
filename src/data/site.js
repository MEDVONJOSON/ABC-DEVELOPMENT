// Site-wide content extracted from the deployed bundle.

export const siteInfo = {
  name: 'ABC-Development-SL',
  tagline: 'Empowering Communities in Sierra Leone',
  mission:
    'To catalyze sustainable community development in Sierra Leone by empowering individuals and communities with the knowledge, skills, and resources needed to build prosperous, healthy, and equitable societies.',
  vision:
    'To be the leading development organization in West Africa for community-driven change.',
  founded: 2008,
  email: 'Info@abcdevsl.org',
  partnershipEmail: 'Pm@abcdevsl.org',
  emails: [
    { label: 'Mohamed Haddi', address: 'Mohamedhaddi@abcdevsl.org' },
    { label: 'Nabieu Conteh', address: 'Nabieuconteh@abcdevsl.org' },
    { label: 'General Inquiries', address: 'Info@abcdevsl.org' },
    { label: 'Board', address: 'Board@abcdevsl.org' },
    { label: 'Bafoday Suma', address: 'Bafoday.suma@abcsl.org' },
    { label: 'Project Management', address: 'Pm@abcdevsl.org' },
    { label: 'Finance', address: 'Finance@abcdevsl.org' },
    { label: 'Field Staff', address: 'Fieldstaff@abcdevsl.org' },
    { label: 'Maria Maceray', address: 'mariamaceray@abcdevsl.org' },
    { label: 'Thomasia', address: 'thomasia@abcdevsl.org' },
  ],
  address: '11 Madia Road, Kambia, Sierra Leone',
  phone: '+232 76 767163',
  phones: ['+232 76 767163', '+232 76 552797'],
  hours: 'Monday – Friday: 8:00 AM – 5:00 PM',
  social: {
    facebook: 'https://www.facebook.com/share/p/1CvBewEUc5/',
    twitter: 'https://twitter.com/abcdev',
    instagram: 'https://instagram.com/abcdev',
    linkedin: 'https://linkedin.com/company/abcdev',
  },
};

export const stats = [
  { id: 'supported', value: 500, suffix: '+', label: 'Supported' },
  { id: 'volunteers', value: 10, suffix: '+', label: 'Total Volunteers' },
  { id: 'awards', value: 10, suffix: '+', label: 'Award Won' },
  { id: 'donations', value: 500, suffix: '+', label: 'Donation Completed' },
];

export const testimonials = [
  {
    id: 1,
    quote:
      'ABC Development changed my life completely. Before the women\'s program, I could barely feed my children. Now I run my own tailoring shop and employ 5 other women from my village. My children are all in school. This is what empowerment looks like.',
    author: 'Fatmata K.',
    role: 'Women\'s Program Graduate, Bo District',
  },
  {
    id: 2,
    quote:
      'The agricultural training program taught me modern farming techniques that transformed my yield. My crop production increased by 300%, and now I supply vegetables to markets across the district. ABC Development didn\'t just give me skills — they gave me hope.',
    author: 'Mohamed S.',
    role: 'Youth Cooperative Leader, Bombali District',
  },
  {
    id: 3,
    quote:
      'Thanks to ABC Development\'s scholarship program, I became the first person in my village to attend university. I\'m now studying to become a teacher so I can give back to children in my community. The investment they made in me will keep giving for generations.',
    author: 'Aminata T.',
    role: 'University Scholarship Recipient',
  },
];

export const partners = [
  { id: 1, name: 'Trocaire', initials: 'TR', color: 'from-rose-500 to-red-600', logo: '/images/Trocaire Logo.png' },
  { id: 2, name: 'Action Aid', initials: 'AA', color: 'from-orange-500 to-amber-600', logo: '/images/actionaid logo.png' },
  { id: 3, name: 'European Union', initials: 'EU', color: 'from-blue-600 to-indigo-700', logo: '/images/European Union Logo.png' },
  { id: 4, name: 'CARE International', initials: 'CI', color: 'from-teal-500 to-emerald-600', logo: '/images/CARE_Logo_ (1).png' },
  { id: 5, name: 'UN Women', initials: 'UNW', color: 'from-violet-500 to-purple-600' },
  { id: 6, name: 'UNICEF', initials: 'UC', color: 'from-sky-500 to-cyan-600', logo: '/images/UNICEF LOGO.jpg' },
];

export const timeline = [
  {
    year: 2008,
    title: 'Founded in Freetown',
    description: 'Founded in Freetown with a mission to support post-war recovery efforts.',
  },
  {
    year: 2010,
    title: 'First Education Program',
    description: 'Launched first major education program reaching 5,000 children.',
  },
  {
    year: 2014,
    title: 'Healthcare Expansion',
    description: 'Expanded to healthcare during the Ebola crisis response.',
  },
  {
    year: 2017,
    title: 'Women Empowerment Initiative',
    description: 'Launched Women Empowerment Initiative with microfinance program.',
  },
  {
    year: 2021,
    title: '50,000 Beneficiaries',
    description: 'Reached 50,000 beneficiaries milestone across 5 districts.',
  },
  {
    year: 2023,
    title: 'International Recognition',
    description: 'Received international recognition for governance and transparency.',
  },
];

export const values = [
  {
    id: 'community-led',
    title: 'Community-Led',
    description: 'Communities lead their own development; we facilitate, not dictate.',
  },
  {
    id: 'dignity',
    title: 'Dignity First',
    description: 'We approach our work with empathy and respect for human dignity.',
  },
  {
    id: 'creativity',
    title: 'Creative Solutions',
    description: 'We embrace creative solutions to complex challenges.',
  },
  {
    id: 'transparency',
    title: 'Transparency',
    description: 'We operate with transparency and accountability in all we do.',
  },
  {
    id: 'collaboration',
    title: 'Collaboration',
    description: 'We collaborate with governments, NGOs, and local leaders.',
  },
];

export const goals = [
  {
    id: 'education-goal',
    title: 'Education for All',
    description:
      'Expand educational programs to 3 new districts, reaching 10,000 additional students.',
    icon: 'GraduationCap',
  },
  {
    id: 'health-goal',
    title: 'Rural Healthcare',
    description:
      'Establish 5 new healthcare outposts in underserved rural areas.',
    icon: 'HeartPulse',
  },
  {
    id: 'women-goal',
    title: 'Women Entrepreneurship',
    description:
      'Launch national women entrepreneurship initiative with 1,000 participants.',
    icon: 'Briefcase',
  },
  {
    id: 'livelihood-goal',
    title: 'Youth Employment',
    description:
      'Achieve 50% increase in youth employment through livelihood programs.',
    icon: 'Sprout',
  },
];

export const donationTiers = [
  {
    id: 'small',
    amount: 50,
    description: 'Provides school supplies for 10 children',
    icon: 'BookOpen',
  },
  {
    id: 'medium',
    amount: 100,
    description: 'Funds a medical outreach camp',
    icon: 'Stethoscope',
  },
  {
    id: 'large',
    amount: 500,
    description: "Supports a women's business startup",
    icon: 'Briefcase',
  },
];

export const volunteerRoles = [
  {
    id: 'teaching',
    title: 'Teaching & Mentoring',
    description: 'Help students with tutoring, literacy programs, and skills training.',
    icon: 'GraduationCap',
  },
  {
    id: 'skills',
    title: 'Skills-Based Volunteering',
    description: 'Contribute remotely through translation, design, IT support, and more.',
    icon: 'Laptop',
  },
  {
    id: 'outreach',
    title: 'Community Outreach',
    description: 'Engage with communities, organize events, and support field operations.',
    icon: 'Megaphone',
  },
  {
    id: 'medical',
    title: 'Medical Volunteers',
    description: 'Assist in medical camps, health awareness campaigns, and patient care.',
    icon: 'HeartPulse',
  },
  {
    id: 'digital',
    title: 'Digital Volunteering',
    description: 'Help us with our digital presence, content, and online campaigns.',
    icon: 'Globe',
  },
  {
    id: 'fund',
    title: 'Business Seed Fund Mentors',
    description: 'Mentor women entrepreneurs who received seed funding from our programs.',
    icon: 'Sprout',
  },
];
