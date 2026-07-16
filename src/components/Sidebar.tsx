import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Store,
  Users,
  BarChart3,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/colleges', icon: Building2, label: 'Colleges' },
  { to: '/canteens', icon: Store, label: 'Canteens' },
  { to: '/users', icon: Users, label: 'Users' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
];

interface SidebarProps {
  onLogout: () => void;
}

export default function Sidebar({ onLogout }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`${
        collapsed ? 'w-20' : 'w-64'
      } flex flex-col transition-all duration-300 ease-in-out bg-white border-r border-border shadow-sm`}
    >
      <div className="flex items-center gap-3 px-5 h-16 border-b border-border">
        <div className="w-9 h-9 rounded-xl gradient-violet flex items-center justify-center flex-shrink-0 shadow-violet">
          <span className="text-white font-bold text-sm font-display">SQ</span>
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <h1 className="font-display font-bold text-lg text-text-primary leading-tight">SkipQ</h1>
            <p className="text-[11px] text-text-muted font-medium uppercase tracking-wider">Super Admin</p>
          </div>
        )}
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-violet-50 text-violet-700 shadow-sm'
                  : 'text-text-secondary hover:bg-lavender-100 hover:text-text-primary'
              }`
            }
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="animate-fade-in">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-border space-y-1">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-text-secondary hover:bg-lavender-100 hover:text-text-primary transition-colors"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          {!collapsed && <span className="animate-fade-in">Collapse</span>}
        </button>
        <button
          onClick={onLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-danger hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="animate-fade-in">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
