'use client';

import { ExportacionPais } from '@/lib/oil-types';
import { formatNumber } from '@/lib/oil-utils';
import { Card } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { useTheme } from 'next-themes';
import { getFlagUrl } from '@/lib/country-flags';
import Image from 'next/image';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  CartesianGrid
} from 'recharts';

interface ExportsLineProps {
  data: ExportacionPais[];
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
            <span className="font-semibold text-blue-500">Producción:</span>{' '}
            <span className="font-mono font-bold">{formatNumber(data.exportaciones)} bbl/d</span>
          </p>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            <span className="font-semibold">Población:</span>{' '}
            <span className="font-mono">{formatNumber(data.poblacion)}M</span>
          </p>
          {data.categoria && data.categoria !== 'N/A' && (
            <p className="text-sm text-slate-700 dark:text-slate-300">
              <span className="font-semibold">PIB Petrolero:</span>{' '}
              <span className="font-mono">{data.categoria}</span>
            </p>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export default function ExportsLine({ data }: ExportsLineProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const chartData = (data ?? [])?.map(item => ({
    pais: item?.pais ?? 'N/A',
    exportaciones: item?.produccion_bbl_d ?? 0,
    reservas: item?.reservas_probadas_MMM_bbl ?? 0,
    poblacion: item?.poblacion_2024_mm ?? 0,
    categoria: item?.pib_petrolero_categoria ?? 'N/A'
  })) ?? [];

  const tickColor = isDark ? '#e2e8f0' : '#334155';
  const labelColor = isDark ? '#f1f5f9' : '#1e293b';
  const gridColor = isDark ? '#334155' : '#cbd5e1';

  if (chartData?.length === 0) {
    return (
      <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-500 dark:text-blue-400" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Exportaciones por País - Líneas</h3>
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
        <TrendingUp className="w-5 h-5 text-blue-500 dark:text-blue-400" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Exportaciones por País - Líneas</h3>
      </div>
      <ResponsiveContainer width="100%" height={450}>
        <LineChart 
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
            tickFormatter={(value) => `${(value / 1000000)?.toFixed(1)}M`}
            label={{ 
              value: 'Producción (bbl/d)', 
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
          <Line 
            type="monotone"
            dataKey="exportaciones" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={{ fill: '#3b82f6', r: 5 }}
            activeDot={{ r: 7 }}
            name="Exportaciones de crudo"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
