import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useShortlistStore } from "@/store/useShortlistStore";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  const { shortlist } = useShortlistStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-violet-600 to-purple-700 shadow-lg">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-white tracking-tight">
              Wobb
            </span>
            <span className="text-violet-200 text-sm font-medium">
              Influencer Search
            </span>
          </Link>
          {shortlist.length > 0 && (
            <div className="flex items-center gap-2 bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
              <span>Shortlist</span>
              <span className="bg-white text-violet-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {shortlist.length}
              </span>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {title && (
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            {title}
          </h1>
        )}
        {children}
      </main>
    </div>
  );
}
