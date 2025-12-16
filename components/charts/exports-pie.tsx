'use client';

import { ExportacionPais } from '@/lib/oil-types';
import { formatNumber } from '@/lib/oil-utils';
import { Card } from '@/components/ui/card';
import { PieChart as PieChartIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { getFlagUrl } from '@/lib/country-flags';
import Image from 'next/image';
import { 
  PieChart, 
  Pie, 
  Cell,
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

interface ExportsPieProps {
  data: ExportacionPais[];
}

const COLORS = [
  '#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6',
  '#ec4899', '#14b8a6', '#f97316', '#06b6d4', '#84cc16',
  '#6366f1', '#f43f5e', '#0ea5e9', '#a855f7', '#22c55e',
  '#eab308', '#d946ef', '#0891b2', '#65a30d', '#7c3aed'
];

const CustomTooltip = ({ active, payload, isDark }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const flagUrl = getFlagUrl(data.pais);
    const percentage = data.percentage || 0;
    
    return (
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-lg min-w-[240px]">
        <div className="flex items-center gap-3 mb-3 pb-3 border-b border-slate-200 dark:border-slate-700">
          {flagUrl && (
            <div className="relative w-10 h-7 flex-shrink-0 rounded overflow-hidden border border-slate-300 dark:border-slate-600">
              <Image 
                src={flagUrl} 
                alt={`${data.pais} flag`}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}
          <p className="font-bold text-base text-slate-900 dark:text-white">{data.pais}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            <span className="font-semibold" style={{ color: data.fill }}>Producción:</span>{' '}
            <span className="font-mono font-bold">{formatNumber(data.value)} bbl/d</span>
          </p>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            <span className="font-semibold">Porcentaje:</span>{' '}
            <span className="font-mono font-bold">{percentage.toFixed(1)}%</span>
          </p>
          {data.poblacion && (
            <p className="text-sm text-slate-700 dark:text-slate-300">
              <span className="font-semibold">Población:</span>{' '}
              <span className="font-mono">{formatNumber(data.poblacion)}M</span>
            </p>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export default function ExportsPie({ data }: ExportsPieProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const totalProduction = (data ?? []).reduce((sum, item) => sum + (item?.produccion_bbl_d ?? 0), 0);

  const chartData = (data ?? [])?.map((item, index) => ({
    pais: item?.pais ?? 'N/A',
    value: item?.produccion_bbl_d ?? 0,
    poblacion: item?.poblacion_2024_mm ?? 0,
    percentage: totalProduction > 0 ? ((item?.produccion_bbl_d ?? 0) / totalProduction) * 100 : 0,
    fill: COLORS[index % COLORS.length]
  })) ?? [];

  const labelColor = isDark ? '#f1f5f9' : '#1e293b';

  if (chartData?.length === 0) {
    return (
      <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <PieChartIcon className="w-5 h-5 text-pink-500 dark:text-pink-400" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Distribución de Exportaciones</h3>
        </div>
        <div className="h-96 flex items-center justify-center text-slate-400 dark:text-slate-500">
          No hay datos que coincidan con los filtros seleccionados
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-2 mb-4">
        <PieChartIcon className="w-5 h-5 text-pink-500 dark:text-pink-400" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Distribución de Exportaciones</h3>
      </div>
      <ResponsiveContainer width="100%" height={450}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ pais, percentage }) => percentage > 3 ? `${pais} (${percentage.toFixed(0)}%)` : ''}
            outerRadius={130}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip isDark={isDark} />} />
          <Legend 
            wrapperStyle={{ fontSize: 12, color: labelColor, fontWeight: 500 }}
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}
