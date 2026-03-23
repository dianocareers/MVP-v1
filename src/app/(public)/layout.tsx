import { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="w-full bg-white border-b border-slate-200 py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50">
        <div className="font-bold text-xl text-slate-800 tracking-tight">Diano Careers</div>
        <nav className="flex gap-4">
          <a href="/login" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">Log In</a>
          <a href="/signup" className="bg-slate-900 text-white px-4 py-1.5 rounded-md hover:bg-slate-800 transition-colors font-medium">Sign Up</a>
        </nav>
      </header>
      <main className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-12">
        {children}
      </main>
      <footer className="w-full bg-slate-900 text-slate-400 py-8 text-center text-sm">
        &copy; {new Date().getFullYear()} Diano Careers. All rights reserved.
      </footer>
    </div>
  );
}
