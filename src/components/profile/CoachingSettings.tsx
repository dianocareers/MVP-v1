'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  Mail, 
  Smartphone, 
  Timer, 
  Calendar, 
  Bot, 
  CheckCircle2, 
  Save,
  Rocket
} from 'lucide-react';
import { UserFrequency, NotificationChannel } from '@/types/database';

/**
 * User Coaching Preferences Screen
 * Allows users to customize their coaching experience, including frequency, duration, and AI model.
 */
export default function CoachingSettings() {
  const [preferences, setPreferences] = useState({
    frequency: '3x_week' as UserFrequency,
    duration: 10,
    notifications: ['in_app', 'email'] as NotificationChannel[],
    aiModel: 'gemini-3.1-flash-lite'
  });

  const [isSaving, setIsSaving] = useState(false);

  const toggleNotification = (channel: NotificationChannel) => {
    setPreferences(prev => ({
      ...prev,
      notifications: prev.notifications.includes(channel) 
        ? prev.notifications.filter(c => c !== channel)
        : [...prev.notifications, channel]
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000); // Mock saving
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Coaching Preferences</h1>
          <p className="text-slate-500 font-medium">Customize how Diano Career Coach works for you.</p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-slate-900 text-white h-11 px-6 rounded-xl font-bold gap-2"
        >
          {isSaving ? <Timer className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* ENHANCEMENT: FREQUENCY & DURATION */}
        <div className="space-y-8">
          <Card className="border-slate-200">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
              <CardTitle className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                Coaching Cadence
              </CardTitle>
              <CardDescription className="text-xs">How often do you want to receive new exercises?</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'daily', label: 'Daily' },
                  { id: '3x_week', label: '3x / Week' },
                  { id: 'weekly', label: 'Weekly' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setPreferences({ ...preferences, frequency: f.id as UserFrequency })}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                      preferences.frequency === f.id 
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100' 
                      : 'bg-white border-slate-200 text-slate-600 hover:border-blue-400'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
              <CardTitle className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <Timer className="w-4 h-4 text-emerald-500" />
                Session Duration
              </CardTitle>
              <CardDescription className="text-xs">Maximum time per micro-exercise session.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-3 gap-3">
                {[5, 10, 15].map((d) => (
                  <button
                    key={d}
                    onClick={() => setPreferences({ ...preferences, duration: d })}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                      preferences.duration === d 
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-100' 
                      : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-400'
                    }`}
                  >
                    {d} Min
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* NOTIFICATIONS & AI MODEL */}
        <div className="space-y-8">
          <Card className="border-slate-200">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
              <CardTitle className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <Bell className="w-4 h-4 text-purple-500" />
                Notification Channels
              </CardTitle>
              <CardDescription className="text-xs">Where should we nudge you?</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-3">
              <div 
                onClick={() => toggleNotification('in_app')}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                  preferences.notifications.includes('in_app') ? 'bg-purple-50 border-purple-200' : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Smartphone className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-bold text-slate-700">In-App Alerts</span>
                </div>
                {preferences.notifications.includes('in_app') && <CheckCircle2 className="w-4 h-4 text-purple-600" />}
              </div>
              <div 
                onClick={() => toggleNotification('email')}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                  preferences.notifications.includes('email') ? 'bg-purple-50 border-purple-200' : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-bold text-slate-700">Email Updates</span>
                </div>
                {preferences.notifications.includes('email') && <CheckCircle2 className="w-4 h-4 text-purple-600" />}
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
              <CardTitle className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <Bot className="w-4 h-4 text-amber-500" />
                Coaching Engine Model
              </CardTitle>
              <CardDescription className="text-xs">Powered by Google Gemini.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-3">
                {[
                  { id: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro', desc: 'Deep reasoning, best for complex scenarios.' },
                  { id: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash', desc: 'Fast, high-performance daily coaching.' },
                  { id: 'gemini-3.1-flash-lite', label: 'Gemini 3.1 Flash Lite', desc: 'Optimized for mobile & quick insights.' }
                ].map((m) => (
                  <div 
                    key={m.id}
                    onClick={() => setPreferences({ ...preferences, aiModel: m.id })}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      preferences.aiModel === m.id ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-black text-slate-900">{m.label}</span>
                      {preferences.aiModel === m.id && <Rocket className="w-3 h-3 text-amber-600" />}
                    </div>
                    <p className="text-[10px] text-slate-500">{m.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
