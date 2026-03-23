'use client';

import React, { useState, useEffect } from 'react';
import { MarketplaceFilter, MarketplaceCategory } from '@/components/marketplace/MarketplaceFilter';
import { ListingCard } from '@/components/marketplace/ListingCard';
import { getMarketplaceListings, getPathwayRecommendations } from '@/services/marketplace/marketplaceService';
import { MarketplaceListing } from '@/types/database';
import { Sparkles, Search, Compass, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState<MarketplaceCategory>('all');
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [recommendations, setRecommendations] = useState<MarketplaceListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const [all, recs] = await Promise.all([
        getMarketplaceListings(activeCategory),
        getPathwayRecommendations()
      ]);
      setListings(all);
      setRecommendations(recs);
      setIsLoading(false);
    }
    loadData();
  }, [activeCategory]);

  const filteredListings = listings.filter(l => 
    l.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-24">
      {/* HEADER & SEARCH */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 px-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <Compass className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Curated Growth</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">Marketplace</h1>
          <p className="text-slate-500 font-medium">Resources optimized for your staff engineering pathway.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Search providers or skills..." 
            className="h-12 pl-11 rounded-xl bg-white border-slate-200 shadow-sm focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* RECOMMENDED FOR YOUR PATHWAY */}
      {!searchQuery && activeCategory === 'all' && (
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-blue-600" />
               </div>
               <div>
                  <h2 className="text-lg font-bold text-slate-900">Recommended for your Staff Pathway</h2>
                  <p className="text-xs text-slate-500">Based on your latest Technical and Leadership gaps.</p>
               </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 px-2">
            {recommendations.map(listing => (
              <ListingCard key={`rec-${listing.id}`} listing={listing} isRecommended />
            ))}
          </div>
        </section>
      )}

      {/* FILTERS & LISTINGS */}
      <section className="space-y-8">
        <div className="px-2 border-b border-slate-100 pb-2">
          <MarketplaceFilter 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 px-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-[4/5] bg-slate-50 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
            {filteredListings.length > 0 ? (
              filteredListings.map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                   <BookOpen className="w-6 h-6 text-slate-300" />
                </div>
                <h3 className="text-slate-900 font-bold">No resources found</h3>
                <p className="text-slate-500 text-sm">Try adjusting your search or category filters.</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* CTA FOR CUSTOM TRAINING */}
      <section className="px-2 pt-12">
        <div className="bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-3xl -mr-32 -mt-32" />
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div>
                <h3 className="text-2xl font-bold mb-2">Need Custom Training for your Team?</h3>
                <p className="text-slate-400 max-w-lg">Get curated pathways, employer-sponsored programs, and group learning for your engineering organization.</p>
              </div>
              <Button className="h-12 px-8 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold">
                Contact Enterprise Sales
              </Button>
           </div>
        </div>
      </section>
    </div>
  );
}
