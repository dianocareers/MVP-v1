'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  ChevronDown, 
  Sparkles, 
  ArrowRight, 
  RefreshCw,
  Trophy,
  Star,
  Zap,
  Lightbulb
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';

interface ExerciseFeedbackViewProps {
  onContinue: () => void;
  onRetry: () => void;
  feedback: {
    summary: string;
    strengths: string[];
    improvements: string[];
    coachingTip: string;
    masteryScore: number;
  };
}

/**
 * Premium post-exercise celebration and feedback screen.
 * Uses Framer Motion for success transitions.
 */
export function ExerciseFeedbackView({ onContinue, onRetry, feedback }: ExerciseFeedbackViewProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto py-8 px-4"
    >
      {/* 1. SUCCESS HEADER */}
      <div className="text-center space-y-4 mb-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-2"
        >
          <Trophy className="w-10 h-10 text-emerald-600" />
        </motion.div>
        
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Session Complete!</h2>
        <p className="text-slate-500 max-w-sm mx-auto">
          Great work on that session. Your career roadmap has been updated with your new mastery signals.
        </p>
        
        <div className="flex items-center justify-center gap-2">
          <div className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100 flex items-center gap-1.5">
            <Zap className="w-3 h-3 fill-emerald-500" />
            +{Math.round(feedback.masteryScore * 10)}% Momentum
          </div>
          <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100 flex items-center gap-1.5">
            <Star className="w-3 h-3 fill-blue-500" />
            L3 Proficiency Detected
          </div>
        </div>
      </div>

      {/* 2. COACH SUMMARY */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mb-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <Sparkles className="w-24 h-24" />
        </div>
        
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-xs shrink-0">
            D
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-800">Diano Coach</h4>
            <p className="text-xs text-slate-400">Senior Mentor Insights</p>
          </div>
        </div>

        <p className="text-slate-700 text-lg leading-relaxed font-serif italic mb-8">
          "{feedback.summary}"
        </p>

        {/* 3. EXPANDABLE INSIGHTS */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="strengths" className="border-slate-100">
            <AccordionTrigger className="hover:no-underline py-4 text-slate-600 font-semibold text-sm">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Strengths Identified
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 space-y-2 pb-4">
              {feedback.strengths.map((s, i) => (
                <div key={i} className="flex items-start gap-2 text-sm pl-6">
                  <span className="text-emerald-500 mt-1">•</span> {s}
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="improvements" className="border-slate-100">
            <AccordionTrigger className="hover:no-underline py-4 text-slate-600 font-semibold text-sm">
              <span className="flex items-center gap-2">
                <ChevronDown className="w-4 h-4 text-amber-500" />
                Growth Opportunities
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 space-y-2 pb-4">
              {feedback.improvements.map((imp, i) => (
                <div key={i} className="flex items-start gap-2 text-sm pl-6">
                  <span className="text-amber-500 mt-1">•</span> {imp}
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="tip" className="border-none">
            <AccordionTrigger className="hover:no-underline py-4 text-slate-600 font-semibold text-sm">
              <span className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-blue-500" />
                Mentor's Secret
              </span>
            </AccordionTrigger>
            <AccordionContent className="bg-blue-50/50 p-4 rounded-xl border border-blue-100/50 text-blue-900 text-sm leading-relaxed mb-4">
              {feedback.coachingTip}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>

      {/* 4. CALLS TO ACTION */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={onContinue}
          className="flex-1 h-12 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all group"
        >
          Continue to Growth Roadmap
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
        <Button 
          onClick={onRetry}
          variant="outline"
          className="flex-1 h-12 border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Similar Exercise
        </Button>
      </div>
    </motion.div>
  );
}
