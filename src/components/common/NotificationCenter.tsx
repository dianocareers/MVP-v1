'use client';

import React from 'react';
import { 
  Bell, 
  Check, 
  Trophy, 
  Flame, 
  Coffee, 
  Zap,
  MoreVertical
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface AppNotification {
  id: string;
  type: 'daily_reminder' | 'streak_milestone' | 'mastery_unlock' | 're-engagement';
  message: string;
  isRead: boolean;
  timestamp: string;
}

export function NotificationCenter() {
  // Mock notifications for demonstration
  const [notifications, setNotifications] = React.useState<AppNotification[]>([
    {
      id: '1',
      type: 'mastery_unlock',
      message: "🏆 Mastery Achieved! You've unlocked 'Strategic Technical Architecture'.",
      isRead: false,
      timestamp: '2m ago'
    },
    {
      id: '2',
      type: 'streak_milestone',
      message: "🔥 7-Day Growth Streak! Keep up the momentum.",
      isRead: false,
      timestamp: '1h ago'
    },
    {
      id: '3',
      type: 'daily_reminder',
      message: "Your 10-minute growth session is ready for you.",
      isRead: true,
      timestamp: '5h ago'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'mastery_unlock': return <Trophy className="w-4 h-4 text-emerald-500" />;
      case 'streak_milestone': return <Flame className="w-4 h-4 text-orange-500" />;
      case 'daily_reminder': return <Zap className="w-4 h-4 text-blue-500" />;
      case 're-engagement': return <Coffee className="w-4 h-4 text-purple-500" />;
      default: return <Bell className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hover:bg-slate-100 rounded-full transition-colors">
          <Bell className="w-5 h-5 text-slate-600" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white ring-2 ring-transparent animate-pulse" />
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-80 mr-4 p-0 rounded-xl shadow-2xl border-slate-200" align="end">
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <DropdownMenuLabel className="p-0 font-bold text-slate-800">Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-6 text-[10px] text-blue-600 hover:text-blue-700 hover:bg-blue-50">
              Mark all as read
            </Button>
          )}
        </div>

        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              All caught up!
            </div>
          ) : (
            notifications.map((notif) => (
              <DropdownMenuItem key={notif.id} className="p-4 flex gap-4 cursor-pointer hover:bg-slate-50 border-b border-slate-50 last:border-0 focus:bg-slate-50">
                <div className={`mt-1 h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${notif.isRead ? 'bg-slate-100' : 'bg-slate-50'}`}>
                  {getIcon(notif.type)}
                </div>
                <div className="space-y-1 overflow-hidden">
                  <p className={`text-sm leading-tight ${notif.isRead ? 'text-slate-500' : 'text-slate-800 font-medium'}`}>
                    {notif.message}
                  </p>
                  <p className="text-[10px] text-slate-400 flex items-center gap-2">
                    {notif.timestamp}
                    {!notif.isRead && <span className="w-1 h-1 bg-blue-500 rounded-full" />}
                  </p>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </div>

        <div className="p-3 bg-slate-50/50 rounded-b-xl text-center border-t border-slate-100">
          <Button variant="ghost" size="sm" className="w-full text-[10px] font-bold text-slate-500 hover:text-slate-800 uppercase tracking-widest">
            View All Notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
