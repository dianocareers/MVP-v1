import React from 'react';
import { brandingResolver } from '@/services/admin/brandingResolver';
import { Sidebar } from '@/components/common/Sidebar';
import { ShieldAlert, BarChart3, Settings, Users } from 'lucide-react';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // In a real app, we'd fetch the user's orgId from the session
  const orgId = 'diano-corp-id'; 
  const branding = await brandingResolver.getBranding(orgId);
  const cssVars = brandingResolver.generateCssVariables(branding);

  return (
    <div className="flex h-screen bg-slate-50">
      <style dangerouslySetInnerHTML={{ __html: cssVars }} />
      
      {/* ADMIN SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded bg-blue-500" />
             <span className="font-bold tracking-tight">Diano Admin</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="/admin" className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-medium">
            <BarChart3 className="w-4 h-4" />
            Dashboard
          </a>
          <a href="/admin/users" className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white text-sm font-medium transition-colors">
            <Users className="w-4 h-4" />
            User Insights
          </a>
          <a href="/admin/settings" className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white text-sm font-medium transition-colors">
            <Settings className="w-4 h-4" />
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

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
           <h2 className="text-sm font-bold text-slate-600 uppercase tracking-widest">
            {branding.terminologyOverrides['assessment'] || 'Assessment'} Console
           </h2>
           <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs font-bold text-slate-900">Admin User</div>
                <div className="text-[10px] text-slate-500 uppercase font-bold">Standard Org</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-200" />
           </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
