export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Accelerate Your Career</h1>
      <p className="text-xl text-slate-600 max-w-2xl">
        Diano Careers is your AI-powered mentor. Assess your skills, discover pathways, and build your growth plan today.
      </p>
      <div className="flex gap-4 pt-4">
        <a href="/signup" className="bg-slate-900 text-white px-6 py-3 rounded-md hover:bg-slate-800 transition-colors font-medium text-lg">Get Started</a>
        <a href="/login" className="bg-white text-slate-900 border border-slate-300 px-6 py-3 rounded-md hover:bg-slate-50 transition-colors font-medium text-lg">Sign In</a>
      </div>
    </div>
  );
}
