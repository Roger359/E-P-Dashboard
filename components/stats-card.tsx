'use client';

import { Card } from '@/components/ui/card';
import { TrendingUp, Database, MapPin, Fuel } from 'lucide-react';
import { useTheme } from 'next-themes';

interface StatsCardProps {
  title: string;
  value: string;
  subtitle?: string;
  iconName: 'TrendingUp' | 'Database' | 'MapPin' | 'Fuel';
  color?: string;
}

const iconMap = {
  TrendingUp,
  Database,
  MapPin,
  Fuel
};

export default function StatsCard({ 
  title, 
  value, 
  subtitle, 
  iconName, 
  color = 'text-amber-500 dark:text-amber-400' 
}: StatsCardProps) {
  const Icon = iconMap?.[iconName] ?? Fuel;
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{title}</p>
          <h3 className={`text-3xl font-bold mt-2 ${color}`}>{value}</h3>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-slate-100 dark:bg-slate-800 ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  );
}
