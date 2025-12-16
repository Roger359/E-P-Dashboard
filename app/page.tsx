import { promises as fs } from 'fs';
import path from 'path';
import { OilData } from '@/lib/oil-types';
import { formatNumber } from '@/lib/oil-utils';
import StatsCard from '@/components/stats-card';
import DashboardClient from './dashboard-client';
import { Fuel } from 'lucide-react';

export const dynamic = 'force-static';

async function getOilData(): Promise<OilData> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'oil_data.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents) as OilData;
  } catch (error) {
    console.error('Error loading oil data:', error);
    // Return empty data structure
    return {
      metadata: {},
      datos: {
        exportaciones: [],
        productores: []
      },
      estadisticas: {},
      top10: {},
      paises: []
    };
  }
}

export default async function Home() {
  const oilData = await getOilData();

  // Calculate key statistics
  const topProducer = oilData?.top10?.produccion?.[0];
  const totalProduction = oilData?.datos?.productores?.reduce(
    (sum, p) => sum + (p?.produccion_bbl_d ?? 0), 
    0
  ) ?? 0;
  const totalReserves = oilData?.datos?.productores?.reduce(
    (sum, p) => sum + (p?.reservas_probadas_MMM_bbl ?? 0), 
    0
  ) ?? 0;
  const totalCountries = oilData?.paises?.length ?? 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-3 md:px-4 py-4 md:py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2 md:gap-3">
            <Fuel className="w-7 h-7 md:w-10 md:h-10 text-[#52ab32] dark:text-amber-400" />
            <span className="leading-tight">Cpven E&P - Dashboard</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-lg">
            Análisis de producción, reservas y economía de 50 países
          </p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Líder en Producción"
            value={topProducer?.pais ?? 'N/A'}
            subtitle={`${formatNumber(topProducer?.valor ?? 0)} bbl/d`}
            iconName="TrendingUp"
            color="text-amber-500 dark:text-amber-400"
          />
          <StatsCard
            title="Producción Total Global"
            value={`${(totalProduction / 1000000)?.toFixed(1)}M`}
            subtitle="barriles por día"
            iconName="Fuel"
            color="text-orange-500 dark:text-orange-400"
          />
          <StatsCard
            title="Reservas Totales"
            value={`${totalReserves?.toFixed(0)}`}
            subtitle="miles de millones de barriles"
            iconName="Database"
            color="text-purple-500 dark:text-purple-400"
          />
          <StatsCard
            title="Países Analizados"
            value={String(totalCountries)}
            subtitle="principales productores"
            iconName="MapPin"
            color="text-cyan-500 dark:text-cyan-400"
          />
        </div>

        {/* Dashboard with Filters and Charts */}
        <DashboardClient oilData={oilData} />
      </div>
    </div>
  );
}
