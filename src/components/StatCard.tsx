import { type LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color?: 'violet' | 'green' | 'blue' | 'orange' | 'red';
  change?: string;
  changeType?: 'positive' | 'negative';
}

const colorMap = {
  violet: { bg: 'bg-violet-100', text: 'text-violet-600', icon: 'text-violet-500' },
  green: { bg: 'bg-emerald-100', text: 'text-emerald-600', icon: 'text-emerald-500' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-600', icon: 'text-blue-500' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-600', icon: 'text-orange-500' },
  red: { bg: 'bg-red-100', text: 'text-red-600', icon: 'text-red-500' },
};

export default function StatCard({ label, value, icon: Icon, color = 'violet', change, changeType }: StatCardProps) {
  const c = colorMap[color];

  return (
    <div className="glass-strong rounded-2xl p-5 hover:shadow-violet transition-all duration-300 animate-fade-in group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-text-secondary mb-1">{label}</p>
          <p className="text-2xl font-display font-bold text-text-primary">{value}</p>
          {change && (
            <p className={`text-xs font-medium mt-1 ${changeType === 'positive' ? 'text-success' : 'text-danger'}`}>
              {changeType === 'positive' ? '↑' : '↓'} {change}
            </p>
          )}
        </div>
        <div className={`w-11 h-11 rounded-xl ${c.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
          <Icon className={`w-5 h-5 ${c.icon}`} />
        </div>
      </div>
    </div>
  );
}
