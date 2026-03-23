'use client';

import { ReactNode } from "react";
import { NotificationCenter } from "@/components/common/NotificationCenter";
import { 
  LayoutDashboard, 
  ClipboardCheck, 
  Zap, 
  Map, 
  Target, 
  MessageSquare, 
  ShoppingBag,
  User,
  LogOut,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Assessment', href: '/assessment', icon: ClipboardCheck },
  { name: 'Skills Radar', href: '/radar', icon: Zap },
  { name: 'Pathways', href: '/pathways', icon: Map },
  { name: 'Growth Plan', href: '/growth-plan', icon: Target },
  { name: 'AI Coach', href: '/coach', icon: MessageSquare },
  { name: 'Marketplace', href: '/marketplace', icon: ShoppingBag },
];

export default function AuthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#F5F2E9] flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-[#1A1A1A] text-white flex flex-col z-20 shadow-2xl">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#C89B3C] rounded-xl flex items-center justify-center shadow-lg shadow-[#C89B3C]/20 transition-transform group-hover:scale-110">
              <span className="text-white font-black text-xl">D</span>
            </div>
            <span className="font-bold text-xl tracking-tight">Diano Careers</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 mt-4">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-4 py-3.5 text-sm font-bold rounded-xl transition-all duration-200",
                  isActive 
                    ? "bg-[#C89B3C] text-white shadow-lg shadow-[#C89B3C]/20" 
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className={cn(
                  "mr-3 h-5 w-5 transition-colors",
                  isActive ? "text-white" : "text-white/40 group-hover:text-white"
                )} />
                {item.name}
                {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[#F5F2E9]/10 border border-white/10 flex items-center justify-center text-xs font-bold text-white">
                JD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">John Doe</p>
                <p className="text-xs text-white/40 truncate">Free Tier</p>
              </div>
              <button className="text-white/20 hover:text-red-400 transition-colors">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
        <header className="h-20 bg-white/40 backdrop-blur-md border-b border-[#1A1A1A]/5 px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-bold text-[#1A1A1A]/40 uppercase tracking-[0.2em]">
              {navigation.find(n => pathname.startsWith(n.href))?.name || 'Portal'}
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <NotificationCenter />
            <div className="h-1 bg-[#1A1A1A]/5 w-px h-6" />
            <button className="w-10 h-10 rounded-full bg-white border border-[#1A1A1A]/5 flex items-center justify-center hover:bg-[#F5F2E9] transition-colors shadow-sm">
              <User className="h-5 w-5 text-[#1A1A1A]" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8 md:p-12">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
        
        {/* Background blobs for depth */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C89B3C]/5 rounded-full blur-[120px] -z-10 -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1A1A1A]/5 rounded-full blur-[120px] -z-10 -ml-48 -mb-48" />
      </main>
    </div>
  );
}
