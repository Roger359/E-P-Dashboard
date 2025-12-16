'use client';

import { ProductorPais } from '@/lib/oil-types';
import { formatNumber } from '@/lib/oil-utils';
import { Card } from '@/components/ui/card';
import { Database } from 'lucide-react';
import { useTheme } from 'next-themes';
import { getFlagUrl } from '@/lib/country-flags';
import Image from 'next/image';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  CartesianGrid
} from 'recharts';

interface ReservesChartProps {
  data: ProductorPais[];
}

const CustomTooltip = ({ active, payload, isDark }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const flagUrl = getFlagUrl(data.pais);
    
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
            <span className="font-semibold text-purple-500">Reservas:</span>{' '}
            <span className="font-mono font-bold">{formatNumber(data.reservas)} MMM bbl</span>
          </p>
          {data.produccion && (
            <p className="text-sm text-slate-700 dark:text-slate-300">
              <span className="font-semibold">Producción:</span>{' '}
              <span className="font-mono">{formatNumber(data.produccion)} bbl/d</span>
            </p>
          )}
          {data.anios_produccion && data.anios_produccion > 0 && (
            <p className="text-sm text-slate-700 dark:text-slate-300">
              <span className="font-semibold">Años restantes:</span>{' '}
              <span className="font-mono">{data.anios_produccion.toFixed(1)} años</span>
            </p>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export default function ReservesChart({ data }: ReservesChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Data is already sorted by reserves in the parent component
  const chartData = (data ?? [])?.map(item => ({
    pais: item?.pais ?? 'N/A',
    reservas: item?.reservas_probadas_MMM_bbl ?? 0,
    produccion: item?.produccion_bbl_d ?? 0,
    anios_produccion: item?.anos_produccion ?? 0,
  })) ?? [];

  const tickColor = isDark ? '#e2e8f0' : '#334155';
  const labelColor = isDark ? '#f1f5f9' : '#1e293b';
  const gridColor = isDark ? '#334155' : '#cbd5e1';

  if (chartData?.length === 0) {
    return (
      <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <Database className="w-5 h-5 text-purple-500 dark:text-purple-400" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Reservas Probadas</h3>
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
        <Database className="w-5 h-5 text-purple-500 dark:text-purple-400" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Reservas Probadas</h3>
      </div>
      <ResponsiveContainer width="100%" height={450}>
        <BarChart 
          data={chartData} 
          margin={{ top: 20, right: 30, left: 80, bottom: 90 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis 
            dataKey="pais" 
            tickLine={false}
            tick={{ fontSize: 12, fill: tickColor, fontWeight: 500 }}
            angle={-45}
            textAnchor="end"
            height={90}
            label={{ 
              value: 'País', 
              position: 'insideBottom', 
              offset: -20, 
              style: { textAnchor: 'middle', fontSize: 13, fill: labelColor, fontWeight: 600 } 
            }}
          />
          <YAxis 
            tickLine={false}
            tick={{ fontSize: 13, fill: tickColor, fontWeight: 500 }}
            tickFormatter={(value) => `${value?.toFixed(0)}`}
            label={{ 
              value: 'Reservas (MMM bbl)', 
              angle: -90, 
              position: 'insideLeft', 
              style: { textAnchor: 'middle', fontSize: 14, fill: labelColor, fontWeight: 600 } 
            }}
          />
          <Tooltip content={<CustomTooltip isDark={isDark} />} />
          <Legend 
            verticalAlign="top" 
            wrapperStyle={{ fontSize: 13, color: labelColor, fontWeight: 500 }}
          />
          <Bar 
            dataKey="reservas" 
            fill="#a855f7" 
            radius={[8, 8, 0, 0]}
            name="Reservas probadas"
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
