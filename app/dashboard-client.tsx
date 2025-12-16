'use client';

import { useState } from 'react';
import { OilData, FilterState } from '@/lib/oil-types';
import { filterExportaciones, filterProductores } from '@/lib/oil-utils';
import Filters from '@/components/filters';
import ExportsBar from '@/components/charts/exports-bar';
import ExportsLine from '@/components/charts/exports-line';
import ExportsPie from '@/components/charts/exports-pie';
import ProductionChart from '@/components/charts/production-chart';
import ReservesChart from '@/components/charts/reserves-chart';
import PopulationChart from '@/components/charts/population-chart';
import FrackingChart from '@/components/charts/fracking-chart';
import ProductionDependencyChart from '@/components/charts/production-dependency-chart';
import YearsProductionChart from '@/components/charts/years-production-chart';

interface DashboardClientProps {
  oilData: OilData;
}

export default function DashboardClient({ oilData }: DashboardClientProps) {
  const [filters, setFilters] = useState<FilterState>({
    topRange: 'all',
    pibCategories: [],
    selectedCountries: [],
    selectedRegions: []
  });

  // Filter and sort data by specific fields for each chart
  // This ensures Top N filters work correctly for each metric
  const exportsByProduction = filterExportaciones(oilData?.datos?.exportaciones ?? [], filters, 'produccion_bbl_d');
  const exportsByPopulation = filterExportaciones(oilData?.datos?.exportaciones ?? [], filters, 'poblacion_2024_mm');
  const producersByProduction = filterProductores(oilData?.datos?.productores ?? [], filters, 'produccion_bbl_d');
  const producersByReserves = filterProductores(oilData?.datos?.productores ?? [], filters, 'reservas_probadas_MMM_bbl');

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-4 gap-4 md:gap-6">
      {/* Filters Sidebar */}
      <div className="lg:col-span-1 order-2 lg:order-1">
        <div className="lg:sticky lg:top-6">
          <Filters 
            countries={oilData?.paises ?? []} 
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>

      {/* Charts Area */}
      <div className="lg:col-span-3 space-y-4 md:space-y-6 order-1 lg:order-2">
        {/* Export Charts - Three Variants */}
        <div className="space-y-4 md:space-y-6">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-1.5 md:w-2 h-6 md:h-8 bg-amber-500 dark:bg-amber-400 rounded"></span>
            <span className="leading-tight">Exportaciones de Crudo</span>
          </h2>
          <ExportsBar data={exportsByProduction} />
          <ExportsLine data={exportsByProduction} />
          {/* <ExportsPie data={exportsByProduction} /> */}
        </div>

        {/* Production Dependency Chart */}
        <div className="space-y-4 md:space-y-6 mt-6 md:mt-8">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-1.5 md:w-2 h-6 md:h-8 bg-red-500 dark:bg-red-400 rounded"></span>
            <span className="leading-tight">Relación Producción y Economía</span>
          </h2>
          <ProductionDependencyChart data={exportsByProduction} />
        </div>

        {/* Years Production Chart */}
        <div className="space-y-4 md:space-y-6 mt-6 md:mt-8">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-1.5 md:w-2 h-6 md:h-8 bg-purple-500 dark:bg-purple-400 rounded"></span>
            <span className="leading-tight">Años de Producción</span>
          </h2>
          <YearsProductionChart data={producersByProduction} />
        </div>

        {/* Other Charts */}
        <div className="space-y-4 md:space-y-6 mt-6 md:mt-8">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-1.5 md:w-2 h-6 md:h-8 bg-orange-500 dark:bg-orange-400 rounded"></span>
            <span className="leading-tight">Otros Indicadores</span>
          </h2>
          <ProductionChart data={producersByProduction} />
          <ReservesChart data={producersByReserves} />
          <PopulationChart data={exportsByPopulation} />
          <FrackingChart data={producersByProduction} />
        </div>
      </div>
    </div>
  );
}
