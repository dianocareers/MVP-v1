import React from 'react';
import { BarChart3, Users, Settings, ShieldAlert } from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-full">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
           <div className="w-8 h-8 rounded bg-blue-500" />
           <span className="font-bold tracking-tight">Diano Admin</span>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <a 
          href="/admin" 
          aria-label="Access Admin Dashboard"
          className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-medium"
        >
          <BarChart3 className="w-4 h-4" aria-hidden="true" />
          Dashboard
        </a>
        <a 
          href="/admin/users" 
          aria-label="View User Insights and Engagement"
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white text-sm font-medium transition-colors"
        >
          <Users className="w-4 h-4" aria-hidden="true" />
          User Insights
        </a>
        <a 
          href="/admin/settings" 
          aria-label="Configure Branding and Global Settings"
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white text-sm font-medium transition-colors"
        >
          <Settings className="w-4 h-4" aria-hidden="true" />
          Branding
        </a>
      </nav>
      <div className="p-6 border-t border-white/10">
        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
           <ShieldAlert className="w-4 h-4 text-amber-400" />
           <div className="text-[10px] text-slate-400 uppercase font-black">Institutional Access</div>
        </div>
      </div>
    </aside>
  );
}
