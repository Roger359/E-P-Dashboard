'use client';

import { useTheme } from 'next-themes';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';
import { ProductorPais } from '@/lib/oil-types';
import { formatNumber } from '@/lib/oil-utils';
import { getFlagUrl } from '@/lib/country-flags';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface YearsProductionChartProps {
  data: ProductorPais[];
}

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0]?.payload;
  const flagUrl = getFlagUrl(data?.pais);

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-200 dark:border-slate-700">
        {flagUrl && (
          <img 
            src={flagUrl} 
            alt={`Bandera de ${data?.pais}`}
            className="w-6 h-4 object-cover rounded"
          />
        )}
        <p className="font-bold text-slate-900 dark:text-white">{data?.pais}</p>
      </div>
      <div className="space-y-1.5 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-blue-500 dark:bg-blue-400 rounded"></span>
          <span className="text-slate-600 dark:text-slate-300">Producción:</span>
          <span className="font-mono font-bold text-slate-900 dark:text-white ml-auto">
            {formatNumber(data?.produccion)} bbl/d
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 dark:bg-red-400 rounded-full"></span>
          <span className="text-slate-600 dark:text-slate-300">Años Restantes:</span>
          <span className="font-mono font-bold text-slate-900 dark:text-white ml-auto">
            {data?.anosProduccion?.toFixed(1)} años
          </span>
        </div>
        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
          <span className="text-xs text-slate-500 dark:text-slate-400">Reservas:</span>
          <span className="font-mono text-xs font-bold text-slate-900 dark:text-white ml-auto">
            {formatNumber(data?.reservas)} MMM bbl
          </span>
        </div>
      </div>
    </div>
  );
};

export default function YearsProductionChart({ data }: YearsProductionChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const chartData = (data ?? [])?.map(item => ({
    pais: item?.pais ?? 'N/A',
    produccion: item?.produccion_bbl_d ?? 0,
    anosProduccion: item?.anos_produccion ?? 0,
    reservas: item?.reservas_probadas_MMM_bbl ?? 0,
  })) ?? [];

  const tickColor = isDark ? '#e2e8f0' : '#334155';
  const labelColor = isDark ? '#f1f5f9' : '#1e293b';
  const gridColor = isDark ? '#334155' : '#cbd5e1';

  // Calculate max years for better visualization
  const maxYears = Math.max(...chartData.map(d => d.anosProduccion), 100);
  const yAxisMaxYears = maxYears > 500 ? Math.ceil(maxYears / 100) * 100 : 900;

  return (
    <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
      <CardHeader className="px-4 md:px-6">
        <CardTitle className="text-base md:text-lg text-slate-900 dark:text-white flex items-center gap-2">
          <span className="text-xl md:text-2xl">⏳</span>
          <span className="leading-tight">Años de Producción</span>
        </CardTitle>
        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1">
          Duración de reservas vs producción
        </p>
      </CardHeader>
      <CardContent className="px-2 md:px-6">
        <ResponsiveContainer width="100%" height={350} className="md:h-[450px]">
          <ComposedChart 
            data={chartData}
            margin={{ top: 10, right: 40, bottom: 80, left: 40 }}
            className="md:!mr-20 md:!ml-14 md:!mt-5"
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={gridColor}
              opacity={0.3}
            />
            <XAxis 
              dataKey="pais" 
              angle={-45}
              textAnchor="end"
              height={100}
              tick={{ fill: tickColor, fontSize: 12, fontWeight: 500 }}
              stroke={tickColor}
            />
            <YAxis 
              yAxisId="left"
              orientation="left"
              tick={{ fill: tickColor, fontSize: 12, fontWeight: 500 }}
              stroke={tickColor}
              label={{ 
                value: 'Producción (mbbl/d)', 
                angle: -90, 
                position: 'insideLeft',
                style: { fill: labelColor, fontWeight: 600, fontSize: 14 }
              }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}`}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              tick={{ fill: tickColor, fontSize: 12, fontWeight: 500 }}
              stroke={tickColor}
              label={{ 
                value: 'Años de Producción Restantes', 
                angle: 90, 
                position: 'insideRight',
                style: { fill: labelColor, fontWeight: 600, fontSize: 14 }
              }}
              domain={[0, yAxisMaxYears]}
              tickFormatter={(value) => `${value.toFixed(0)}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{
                paddingTop: '20px',
                fontSize: '14px',
                fontWeight: 600,
              }}
              iconType="square"
            />
            <Bar 
              yAxisId="left"
              dataKey="produccion" 
              name="Producción (bbl/d)"
              fill={isDark ? '#3b82f6' : '#2563eb'}
              radius={[4, 4, 0, 0]}
              opacity={0.8}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="anosProduccion" 
              name="Años Restantes"
              stroke={isDark ? '#ef4444' : '#dc2626'}
              strokeWidth={3}
              dot={{ 
                fill: isDark ? '#ef4444' : '#dc2626', 
                r: 5,
                strokeWidth: 2,
                stroke: isDark ? '#1e293b' : '#ffffff'
              }}
              activeDot={{ r: 7 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
