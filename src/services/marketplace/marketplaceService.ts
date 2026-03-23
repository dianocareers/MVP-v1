import { MarketplaceListing, MarketplaceCategory } from '@/types/database';

/**
 * Mock Service for Marketplace MVP
 */
export const MOCK_LISTINGS: MarketplaceListing[] = [
  {
    id: '1',
    title: 'High-Performance Leadership & Strategy',
    provider: 'Diano Executive',
    description: 'Master the art of strategic influence and high-stakes decision making for senior staff transitions.',
    type: 'leadership_dev',
    priceLabel: 'Employer Sponsored',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
    externalUrl: 'https://example.com',
    alignmentTags: ['Leadership', 'Influence', 'Strategy'],
    isCurated: true
  },
  {
    id: '2',
    title: 'Advanced System Architecture',
    provider: 'Coursera (Stanford)',
    description: 'Deep dive into distributed systems, scalability patterns, and operational excellence for staff engineers.',
    type: 'course',
    priceLabel: '$49.99',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    externalUrl: 'https://example.com',
    alignmentTags: ['Architecture', 'Technical', 'Execution'],
    isCurated: true
  },
  {
    id: '3',
    title: 'Cloud Native Professional Architect',
    provider: 'Google Cloud',
    description: 'Official certification for designing secure and robust cloud solutions in complex enterprise environments.',
    type: 'certification',
    priceLabel: '$200',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    externalUrl: 'https://example.com',
    alignmentTags: ['Cloud', 'Technical', 'Security'],
    isCurated: true
  },
  {
    id: '4',
    title: 'Communication for Staff+ Engineers',
    provider: 'LeadDev',
    description: 'Bridging the gap between technical excellence and executive communication. Managing sideways and up.',
    type: 'training',
    priceLabel: 'Free',
    imageUrl: 'https://images.unsplash.com/photo-1557426272-fc759fbb7a8d?auto=format&fit=crop&q=80&w=800',
    externalUrl: 'https://example.com',
    alignmentTags: ['Foundation', 'Communication'],
    isCurated: true
  },
  {
    id: '5',
    title: 'Mentorship and People Growth',
    provider: 'Evergreen Learning',
    description: 'Build your sponsorship and mentorship muscle to multiply your team\'s impact without manual intervention.',
    type: 'leadership_dev',
    priceLabel: 'Free',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',
    externalUrl: 'https://example.com',
    alignmentTags: ['Leadership', 'Mentorship'],
    isCurated: true
  }
];

export async function getMarketplaceListings(category?: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!category || category === 'all') {
    return MOCK_LISTINGS;
  }
  
  return MOCK_LISTINGS.filter(l => l.type === category);
}

export async function getPathwayRecommendations() {
  // In reality, this would fetch user scores and recommend based on gaps
  return MOCK_LISTINGS.slice(0, 2);
}
