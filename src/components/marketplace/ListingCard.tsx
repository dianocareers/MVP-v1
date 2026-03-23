'use client';

import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Bookmark, Clock, Star } from 'lucide-react';
import { MarketplaceListing } from '@/types/database';

interface ListingCardProps {
  listing: MarketplaceListing;
  isSaved?: boolean;
  onToggleSave?: (id: string) => void;
  isRecommended?: boolean;
}

export function ListingCard({ listing, isSaved, onToggleSave, isRecommended }: ListingCardProps) {
  return (
    <Card className={`group border-slate-200 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col h-full relative ${isRecommended ? 'ring-2 ring-blue-500/20' : ''}`}>
      {isRecommended && (
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-blue-600 text-white border-none text-[10px] font-bold px-2 py-0.5 shadow-lg">
            Pathway Match
          </Badge>
        </div>
      )}
      
      {/* Thumbnail Area */}
      <div className="relative aspect-video bg-slate-100 overflow-hidden">
        <img 
          src={listing.imageUrl} 
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <button 
            onClick={() => onToggleSave?.(listing.id)}
            aria-label={isSaved ? "Remove from saved resources" : "Save this resource"}
            className={`p-2 rounded-full backdrop-blur-md transition-all ${
              isSaved ? 'bg-blue-500 text-white' : 'bg-white/80 text-slate-400 hover:text-blue-500'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} aria-hidden="true" />
          </button>
        </div>
      </div>

      <CardContent className="pt-5 flex-1 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{listing.provider}</span>
          <Badge variant="outline" className="text-[9px] font-bold border-slate-200 text-slate-500 bg-slate-50/50">
            {listing.type.replace('_', ' ')}
          </Badge>
        </div>
        
        <h3 className="font-bold text-slate-900 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
          {listing.title}
        </h3>
        
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {listing.description}
        </p>

        <div className="flex flex-wrap gap-1 pt-2">
          {listing.alignmentTags.slice(0, 2).map(tag => (
            <span key={tag} className="text-[9px] font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-4 border-t border-slate-50 flex items-center justify-between">
        <div className="text-sm font-black text-slate-900">
          {listing.priceLabel}
        </div>
        <Button 
          variant="ghost" 
          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-9 p-2 group/btn"
          onClick={() => window.open(listing.externalUrl, '_blank')}
        >
          <span className="text-xs font-bold mr-2">Learn More</span>
          <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
}
