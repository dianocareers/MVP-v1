import { MotivatorDomain } from '@/types/database';

export interface CareerClusterRecommendation {
  title: string;
  description: string;
  matchReason: string;
}

// Map single motivators to generic broad clusters
const primaryMappings: Record<MotivatorDomain, CareerClusterRecommendation[]> = {
  Theoretical: [
    { title: 'Tech & Software Engineering', description: 'Building complex systems and solving deep technical problems.', matchReason: 'Your drive for truth and knowledge aligns securely with the constant learning required in tech.' },
    { title: 'Data Science & Research', description: 'Analyzing complex datasets to uncover hidden truths and trends.', matchReason: 'Your theoretical drive thrives on objective data and research.' }
  ],
  Utilitarian: [
    { title: 'Finance & Investment', description: 'Managing capital, assessing risk, and optimizing returns.', matchReason: 'Your focus on ROI and utility makes financial markets a natural fit.' },
    { title: 'Business Operations & Sales', description: 'Streamlining processes and driving tangible revenue.', matchReason: 'You value efficiency and practical, measurable outcomes.' }
  ],
  Social: [
    { title: 'Healthcare & Medicine', description: 'Directly improving the physical or mental well-being of others.', matchReason: 'Your strong empathy and desire to help naturally aligns with caregiving professions.' },
    { title: 'Education & Counseling', description: 'Guiding others to reach their full potential.', matchReason: 'Your focus on the growth of others makes you an excellent mentor or educator.' }
  ],
  Aesthetic: [
    { title: 'Design & UX', description: 'Crafting beautiful, functional, and user-centric experiences.', matchReason: 'Your appreciation for form and harmony is essential in design.' },
    { title: 'Marketing & Content Creation', description: 'Telling compelling stories and building brand identities.', matchReason: 'Your need for self-expression flourishes in creative fields.' }
  ],
  Individualistic: [
    { title: 'Executive Leadership & Management', description: 'Guiding organizations, making high-stakes decisions, and leading teams.', matchReason: 'Your drive for influence and leadership is critical for executives.' },
    { title: 'Law & Politics', description: 'Advocating for positions, driving policy, and standing out.', matchReason: 'You are comfortable taking bold stances and leading from the front.' }
  ],
  Traditional: [
    { title: 'Accounting & Compliance', description: 'Ensuring rules are followed and standards are maintained.', matchReason: 'Your preference for structure and clear rules makes you excellent at managing defined systems.' },
    { title: 'Public Administration & QA', description: 'Maintaining order, quality, and established processes.', matchReason: 'You thrive in environments where methodology and reliability are paramount.' }
  ]
};

// Map combinations of top 2 motivators to specific niche clusters
const intersectionMappings: Record<string, CareerClusterRecommendation[]> = {
  'Theoretical_Utilitarian': [
    { title: 'FinTech & Quantitative Analysis', description: 'Applying deep mathematical models to financial markets.', matchReason: 'Combines your love for complex theory with your drive for measurable ROI.' },
    { title: 'Engineering Management', description: 'Leading technical teams to deliver profitable products.', matchReason: 'Balances your technical depth with operational efficiency.' }
  ],
  'Aesthetic_Utilitarian': [
    { title: 'Product Management', description: 'Owning the intersection of user experience and business viability.', matchReason: 'Leverages your eye for design while ensuring the product generates revenue.' },
    { title: 'E-Commerce Strategy', description: 'Optimizing online storefronts for beauty and conversion.', matchReason: 'Merges aesthetic appeal with utilitarian profit metrics.' }
  ],
  'Social_Theoretical': [
    { title: 'EdTech & Learning Sciences', description: 'Building the tools that educate the next generation.', matchReason: 'Pairs your deep intellectual curiosity with your desire to help others grow.' },
    { title: 'Medical Research & Psychology', description: 'Studying the human condition to improve lives.', matchReason: 'Your drive for truth is focused directly on societal wellbeing.' }
  ],
  'Individualistic_Social': [
    { title: 'Public Health Administration & Politics', description: 'Leading large-scale initiatives to help communities.', matchReason: 'Satisfies your need for influence while serving the greater good.' },
    { title: 'HR Directorship', description: 'Driving organizational culture from the top down.', matchReason: 'Puts you in a position of power specifically focused on people operations.' }
  ]
};

export const getCareerClusterRecommendations = (topMotivators: MotivatorDomain[]): CareerClusterRecommendation[] => {
  if (!topMotivators || topMotivators.length < 2) return [];

  const [first, second] = topMotivators;
  const comboKey1 = `${first}_${second}`;
  const comboKey2 = `${second}_${first}`;

  let results: CareerClusterRecommendation[] = [];

  // Check for intersections first
  if (intersectionMappings[comboKey1]) {
    results = [...intersectionMappings[comboKey1]];
  } else if (intersectionMappings[comboKey2]) {
    results = [...intersectionMappings[comboKey2]];
  }

  // Pad with primary mappings from the top motivator to ensure we return 3
  const primaryRecs = primaryMappings[first] || [];
  
  results = [...results, ...primaryRecs];
  
  // Deduplicate by title just in case, and return top 3
  const uniqueResults = Array.from(new Map(results.map(item => [item.title, item])).values());

  return uniqueResults.slice(0, 3);
};
