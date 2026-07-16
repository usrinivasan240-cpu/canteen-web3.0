import { Bell, Search, User } from 'lucide-react';
import { useState } from 'react';

interface TopBarProps {
  user: { email: string; name: string; role: string };
}

export default function TopBar({ user }: TopBarProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="h-16 glass-strong border-b border-border flex items-center justify-between px-6 z-10">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-display font-semibold text-text-primary hidden sm:block">
          Welcome back, {user.name || user.email}
        </h2>
      </div>

      <div className="flex items-center gap-3">
        {searchOpen && (
          <div className="animate-fade-in">
            <input
              type="text"
              placeholder="Search..."
              className="w-48 px-3 py-1.5 text-sm rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400"
              autoFocus
              onBlur={() => setSearchOpen(false)}
            />
          </div>
        )}
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="p-2 rounded-lg hover:bg-lavender-100 text-text-secondary hover:text-text-primary transition-colors"
        >
          <Search className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-lg hover:bg-lavender-100 text-text-secondary hover:text-text-primary transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full"></span>
        </button>
        <div className="flex items-center gap-2 pl-3 border-l border-border">
          <div className="w-8 h-8 rounded-full gradient-violet flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-text-primary leading-tight">{user.name || 'Admin'}</p>
            <p className="text-xs text-text-muted capitalize">{user.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
