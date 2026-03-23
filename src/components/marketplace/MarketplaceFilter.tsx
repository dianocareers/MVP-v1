'use client';

import React from 'react';
import { 
  Shield, 
  Users, 
  Code, 
  GraduationCap, 
  Briefcase, 
  Trophy 
} from 'lucide-react';

export type MarketplaceCategory = 'all' | 'course' | 'certification' | 'training' | 'leadership_dev';

interface MarketplaceFilterProps {
  activeCategory: MarketplaceCategory;
  onCategoryChange: (category: MarketplaceCategory) => void;
}

export function MarketplaceFilter({ activeCategory, onCategoryChange }: MarketplaceFilterProps) {
  const categories = [
    { id: 'all', label: 'All Resources', icon: Briefcase },
    { id: 'course', label: 'Online Courses', icon: GraduationCap },
    { id: 'certification', label: 'Certifications', icon: Trophy },
    { id: 'training', label: 'Technical Training', icon: Code },
    { id: 'leadership_dev', label: 'Leadership', icon: Users },
  ];

  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id as MarketplaceCategory)}
          aria-label={`Filter resources by ${cat.label}`}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeCategory === cat.id 
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 flex-shrink-0' 
            : 'bg-white text-slate-500 border border-slate-200 hover:border-blue-400 flex-shrink-0'
          }`}
        >
          <cat.icon className={`w-3.5 h-3.5 ${activeCategory === cat.id ? 'text-white' : 'text-slate-400'}`} />
          {cat.label}
        </button>
      ))}
    </div>
  );
}
