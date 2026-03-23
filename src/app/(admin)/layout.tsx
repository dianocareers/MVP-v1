import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 flex flex-col md:flex-row font-sans">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-slate-950 border-r border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <div className="font-bold text-xl text-white">Diano Admin</div>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <a href="/admin" className="px-3 py-2 rounded-md hover:bg-slate-800 hover:text-white transition-colors">Overview</a>
          <a href="/admin/analytics" className="px-3 py-2 rounded-md hover:bg-slate-800 hover:text-white transition-colors">Analytics</a>
        </nav>
      </aside>
      {/* Admin Content */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <header className="bg-slate-950 border-b border-slate-800 py-4 px-6 md:px-8 flex items-center justify-end sticky top-0 z-10 w-full h-16">
          <div className="text-sm font-medium text-slate-400">Admin Controls</div>
        </header>
        <div className="flex-1 overflow-auto p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
