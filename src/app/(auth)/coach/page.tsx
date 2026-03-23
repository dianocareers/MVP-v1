export default function CoachPage() {
  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <h1 className="text-3xl font-bold text-slate-900 tracking-tight">AI Career Coach</h1>
      <p className="text-slate-600">Chat with your personalized mentor to get advice on negotiations, resume tips, and learning.</p>
      
      <div className="flex-1 bg-white border border-slate-200 rounded-xl flex flex-col overflow-hidden shadow-sm">
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50">
          <div className="flex gap-4 max-w-2xl">
            <div className="w-8 h-8 rounded-full bg-slate-900 flex-shrink-0"></div>
            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm text-slate-700">
              Hello! I'm your Diano AI coach. How can I help you accelerate your career today?
            </div>
          </div>
        </div>
        <div className="p-4 bg-white border-t border-slate-200">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Ask for resume feedback, interview prep..." 
              className="w-full pl-4 pr-24 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
            />
            <button className="absolute right-2 top-2 bg-slate-900 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-slate-800">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
