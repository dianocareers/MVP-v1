'use client';

import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, BookOpen, Target, ArrowRight, Lock } from 'lucide-react';

interface MicroExerciseCardProps {
  title: string;
  type: string;
  durationMinutes: number;
  objective: string;
  status: 'locked' | 'unlocked' | 'completed';
  onStart?: () => void;
}

/**
 * A card representing a single daily micro-learning exercise.
 */
export function MicroExerciseCard({
  title,
  type,
  durationMinutes,
  objective,
  status,
  onStart
}: MicroExerciseCardProps) {
  const isLocked = status === 'locked';

  return (
    <Card className={`relative border-slate-200 shadow-sm transition-all duration-300 ${isLocked ? 'opacity-60 grayscale bg-slate-50' : 'hover:border-slate-300 hover:shadow-md'}`}>
      {isLocked && (
        <div className="absolute top-4 right-4 z-10">
          <Lock className="w-4 h-4 text-slate-400" />
        </div>
      )}
      
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline" className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
            {type}
          </Badge>
          <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
            <Clock className="w-3 h-3" />
            {durationMinutes} MIN
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">
          {title}
        </h3>
        
        <div className="flex items-start gap-2 mb-4">
          <Target className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
          <p className="text-sm text-slate-600 leading-snug">
            {objective}
          </p>
        </div>
      </CardContent>

      <CardFooter className={`${isLocked ? 'bg-slate-100/50' : 'bg-slate-50/50'} border-t border-slate-100 p-4`}>
        {status === 'completed' ? (
          <Button variant="ghost" disabled className="w-full text-emerald-600 font-bold opacity-100">
            Completed
          </Button>
        ) : (
          <Button 
            onClick={onStart}
            disabled={isLocked}
            className={`w-full font-bold transition-all ${isLocked ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
          >
            {isLocked ? 'Locked' : 'Start Session'}
            {!isLocked && <ArrowRight className="w-4 h-4 ml-2" />}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
