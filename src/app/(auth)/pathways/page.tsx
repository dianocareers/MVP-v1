export default function PathwaysPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Career Pathways</h1>
      <p className="text-slate-600">Explore potential roles based on your skills and market demand.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Senior Frontend Engineer</h3>
          <p className="text-slate-600 mb-4">You have 85% of the required skills. High market demand.</p>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div className="bg-slate-800 h-2 rounded-full" style={{ width: "85%" }}></div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Full Stack Specialist</h3>
          <p className="text-slate-600 mb-4">You have 65% of the required skills. Growing market demand.</p>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div className="bg-slate-800 h-2 rounded-full" style={{ width: "65%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
