import { ReactNode } from "react";
import { NotificationCenter } from "@/components/common/NotificationCenter";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      {/* Sidebar Placeholder */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <div className="font-bold text-xl text-slate-800">Diano App</div>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <a href="/dashboard" className="px-3 py-2 text-slate-700 rounded-md hover:bg-slate-50 hover:text-slate-900 transition-colors">Dashboard</a>
          <a href="/assessment" className="px-3 py-2 text-slate-700 rounded-md hover:bg-slate-50 hover:text-slate-900 transition-colors">Assessment</a>
          <a href="/radar" className="px-3 py-2 text-slate-700 rounded-md hover:bg-slate-50 hover:text-slate-900 transition-colors">Skills Radar</a>
          <a href="/pathways" className="px-3 py-2 text-slate-700 rounded-md hover:bg-slate-50 hover:text-slate-900 transition-colors">Pathways</a>
          <a href="/growth-plan" className="px-3 py-2 text-slate-700 rounded-md hover:bg-slate-50 hover:text-slate-900 transition-colors">Growth Plan</a>
          <a href="/coach" className="px-3 py-2 text-slate-700 rounded-md hover:bg-slate-50 hover:text-slate-900 transition-colors">AI Coach</a>
          <a href="/marketplace" className="px-3 py-2 text-slate-700 rounded-md hover:bg-slate-50 hover:text-slate-900 transition-colors">Marketplace</a>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <header className="bg-white border-b border-slate-200 py-4 px-6 md:px-8 flex items-center justify-end sticky top-0 z-10 w-full h-16 gap-4">
          <NotificationCenter />
          <div className="h-8 w-8 rounded-full bg-slate-200 border border-slate-300 items-center justify-center flex text-[10px] font-bold text-slate-500">
            JD
          </div>
          <div className="text-sm font-medium text-slate-600">John Doe</div>
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
