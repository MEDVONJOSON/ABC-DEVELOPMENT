// Project data — sourced from the deployed site bundle.
// Edit freely, or wire up to a CMS / Supabase later.

export const categories = [
  {
    id: 'education',
    name: 'Education',
    description: 'ABC-Development prioritizes inclusive and quality education, particularly for girls and marginalized children. The organization works to improve school infrastructure, train teachers, and provide learning materials. Additionally, it advocates for gender equality in education, ensuring girls have the resources and support needed to stay in school.',
    color: 'bg-brand-100 text-brand-800',
    icon: 'GraduationCap',
  },
  {
    id: 'health',
    name: 'Healthcare',
    description: 'The organization implements community-based health interventions, improving access to quality healthcare services in rural areas. ABC-Development also promotes health education, particularly in maternal and child health, HIV/AIDS awareness, and water, sanitation, and hygiene (WASH) programs to enhance the well-being of vulnerable populations.',
    color: 'bg-brand-100 text-brand-700',
    icon: 'HeartPulse',
  },
  {
    id: 'women',
    name: 'Women Empowerment',
    description: 'Economic opportunities and rights for women',
    color: 'bg-brand-100 text-brand-800',
    icon: 'Users',
  },
  {
    id: 'livelihood',
    name: 'Peace & Livelihood',
    description: 'ABC-Development has played a pivotal role in strengthening peace infrastructures, particularly in Kambia District. The organization focuses on fostering peaceful coexistence through community dialogue, conflict resolution, and livelihood support programs.',
    color: 'bg-brand-100 text-brand-700',
    icon: 'Sprout',
  },
  {
    id: 'governance',
    name: 'Gender Equality & Governance',
    description: 'ABC-Development is a strong advocate for gender equality, with programs designed to promote women\'s leadership and participation in decision making processes at both community and national levels. The organization uses community-based approaches to challenge gender norms and support women in leadership roles.',
    color: 'bg-brand-100 text-brand-800',
    icon: 'Scale',
  },
  {
    id: 'rural',
    name: 'Rural Development',
    description: 'Building resilient rural communities',
    color: 'bg-brand-100 text-brand-700',
    icon: 'Trees',
  },
];

export const projects = [
  {
    id: 1,
    slug: 'quality-education-rural-children',
    title: 'Quality Education for Rural Children',
    category: 'education',
    summary:
      'Improving access to quality education for 10,000+ rural children through teacher training, infrastructure development, and community engagement.',
    location: 'Bo, Kenema, Kono Districts',
    districts: ['Bo', 'Kenema', 'Kono'],
    image: '/images/featured.png',
    beneficiaries: 10000,
    duration: '2020 – Present',
    budget: '$2.4M',
    partners: ['UNICEF Sierra Leone', 'Ministry of Education Sierra Leone'],
    objectives: [
      'Train 500+ teachers in modern pedagogy',
      'Build and renovate 25 schools in underserved districts',
      'Provide learning materials to 10,000+ children',
      'Improve literacy rates by 40% and girls\' enrollment by 60%',
    ],
    story:
      'Before the program reached Bo district, fewer than 30% of children in the most remote villages completed primary school. Today, school attendance is near universal and girls now outnumber boys in our partner schools.',
  },
  {
    id: 2,
    slug: 'maternal-child-health',
    title: 'Maternal & Child Health Initiative',
    category: 'health',
    summary:
      'Reducing maternal and child mortality through community health workers, mobile clinics, and health education across rural Sierra Leone.',
    location: 'Port Loko, Kambia, Tonkolili Districts',
    districts: ['Port Loko', 'Kambia', 'Tonkolili'],
    image: '/images/featured2.png',
    beneficiaries: 50000,
    duration: '2018 – Present',
    budget: '$1.8M',
    partners: ['UN Women', 'Ministry of Health & Sanitation'],
    objectives: [
      'Train 150 community health workers',
      'Operate 3 mobile clinics serving 80+ villages',
      'Provide prenatal care to 5,000+ mothers annually',
      'Reduce under-5 mortality by 35%',
    ],
    story:
      'Our network of community health workers is the backbone of this program. Trained locally and equipped with the basics, they bring care to families who would otherwise walk hours for help.',
  },
  {
    id: 3,
    slug: 'womens-economic-empowerment',
    title: "Women's Economic Empowerment Program",
    category: 'women',
    summary:
      'Empowering 15,000 women with microfinance, vocational training, and business mentorship to achieve economic independence.',
    location: 'Freetown, Bo, Kenema Districts',
    districts: ['Freetown', 'Bo', 'Kenema'],
    image: '/images/featured3.png',
    beneficiaries: 15000,
    duration: '2019 – Present',
    budget: '$3.1M',
    partners: ['African Development Bank', 'UN Women'],
    objectives: [
      'Provide microloans to 5,000+ women entrepreneurs',
      'Run vocational training in tailoring, agriculture, and tech',
      'Match every loan recipient with a local business mentor',
      'Reach 15,000 direct beneficiaries across three districts',
    ],
    story:
      'Fatmata was one of our first cohort members. She started a small tailoring business with a $75 microloan. Today she employs 5 women and all her children are in school.',
  },
  {
    id: 4,
    slug: 'youth-livelihoods',
    title: 'Youth Livelihoods & Skills Training',
    category: 'livelihood',
    summary:
      'Equipping young people with market-relevant skills in agriculture, technology, and trades to break cycles of unemployment.',
    location: 'Western Area, Bombali District',
    districts: ['Western Area', 'Bombali'],
    image: '/images/hero-landscape.jpg',
    beneficiaries: 4200,
    duration: '2021 – Present',
    budget: '$900K',
    partners: ['European Union Delegation'],
    objectives: [
      'Train 4,200 youth in vocational and digital skills',
      'Place 70% of graduates into jobs or self-employment',
      'Launch 12 youth-run cooperatives',
      'Achieve a 50% increase in youth employment in target areas',
    ],
    story:
      'When Mohamed finished our digital skills program, he started a small phone repair shop. Two years later he has two employees and trains apprentices from his old neighbourhood.',
  },
  {
    id: 5,
    slug: 'governance-accountability',
    title: 'Governance & Civic Participation',
    category: 'governance',
    summary:
      'Strengthening democratic participation through civic education, community councils, and transparent local governance.',
    location: 'Nationwide',
    districts: ['All districts'],
    image: '/images/hero-community.jpg',
    beneficiaries: 8000,
    duration: '2022 – Present',
    budget: '$650K',
    partners: ['European Union Delegation'],
    objectives: [
      'Run civic education workshops in 30 communities',
      'Support 18 community councils with transparent tools',
      'Train 200 local government officials',
      'Increase civic participation by 25% in target districts',
    ],
    story:
      'Civic participation starts with information. Our workshops help residents understand how decisions are made and how to engage with their local councils.',
  },
  {
    id: 6,
    slug: 'rural-water-infrastructure',
    title: 'Rural Water & Sanitation',
    category: 'rural',
    summary:
      'Building resilient rural communities through clean water infrastructure, sanitation, and climate-smart agriculture.',
    location: 'Koinadugu, Falaba Districts',
    districts: ['Koinadugu', 'Falaba'],
    image: '/images/hero-landscape.jpg',
    beneficiaries: 6500,
    duration: '2020 – Present',
    budget: '$1.2M',
    partners: ['African Development Bank'],
    objectives: [
      'Drill and rehabilitate 40 community wells',
      'Train 100 local well-maintenance teams',
      'Reduce waterborne illness by 45%',
      'Support 200 families in climate-smart agriculture',
    ],
    story:
      'Access to clean water changes everything — school attendance, women\'s time, child health. We work alongside communities to ensure wells stay working long after installation.',
  },
];
