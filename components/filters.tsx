'use client';

import { useState } from 'react';
import { FilterState, PIB_CATEGORIES, PIB_CATEGORY_LABELS } from '@/lib/oil-types';
import { REGIONES } from '@/lib/country-flags';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Filter, X } from 'lucide-react';

interface FiltersProps {
  countries: string[];
  onFilterChange: (filters: FilterState) => void;
}

export default function Filters({ countries, onFilterChange }: FiltersProps) {
  const [topRange, setTopRange] = useState<'all' | 'top5' | 'top10' | 'top20'>('all');
  const [pibCategories, setPibCategories] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [showCountryList, setShowCountryList] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleTopRangeChange = (value: string) => {
    const newRange = value as 'all' | 'top5' | 'top10' | 'top20';
    setTopRange(newRange);
    onFilterChange?.({ topRange: newRange, pibCategories, selectedCountries, selectedRegions });
  };

  const handlePibCategoryToggle = (category: string) => {
    const newCategories = pibCategories?.includes(category)
      ? pibCategories?.filter(c => c !== category) ?? []
      : [...(pibCategories ?? []), category];
    setPibCategories(newCategories);
    onFilterChange?.({ topRange, pibCategories: newCategories, selectedCountries, selectedRegions });
  };

  const handleRegionToggle = (region: string) => {
    const newRegions = selectedRegions?.includes(region)
      ? selectedRegions?.filter(r => r !== region) ?? []
      : [...(selectedRegions ?? []), region];
    setSelectedRegions(newRegions);
    onFilterChange?.({ topRange, pibCategories, selectedCountries, selectedRegions: newRegions });
  };

  const handleCountryToggle = (country: string) => {
    const newCountries = selectedCountries?.includes(country)
      ? selectedCountries?.filter(c => c !== country) ?? []
      : [...(selectedCountries ?? []), country];
    setSelectedCountries(newCountries);
    onFilterChange?.({ topRange, pibCategories, selectedCountries: newCountries, selectedRegions });
  };

  const handleReset = () => {
    setTopRange('all');
    setPibCategories([]);
    setSelectedCountries([]);
    setSelectedRegions([]);
    onFilterChange?.({ topRange: 'all', pibCategories: [], selectedCountries: [], selectedRegions: [] });
  };

  return (
    <Card className="p-4 md:p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 lg:cursor-default w-full lg:w-auto"
        >
          <Filter className="w-5 h-5 text-amber-500 dark:text-amber-400" />
          <h3 className="text-base md:text-lg font-semibold text-slate-900 dark:text-white">Filtros</h3>
          <span className="lg:hidden ml-auto text-slate-500">
            {isOpen ? '▲' : '▼'}
          </span>
        </button>
        {(pibCategories?.length > 0 || selectedCountries?.length > 0 || selectedRegions?.length > 0 || topRange !== 'all') && (
          <Button 
            onClick={handleReset} 
            variant="ghost" 
            size="sm"
            className="text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-slate-100 dark:hover:bg-slate-700 hidden lg:flex"
          >
            <X className="w-4 h-4 mr-1" />
            Limpiar
          </Button>
        )}
      </div>

      <div className={`space-y-4 md:space-y-6 ${isOpen ? 'block' : 'hidden'} lg:block`}>

      {/* Top Range Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Rango de países</Label>
        <RadioGroup value={topRange} onValueChange={handleTopRangeChange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" className="border-slate-400 dark:border-slate-500 text-amber-500" />
            <Label htmlFor="all" className="text-sm text-slate-700 dark:text-slate-300 cursor-pointer">Todos (50 países)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="top5" id="top5" className="border-slate-400 dark:border-slate-500 text-amber-500" />
            <Label htmlFor="top5" className="text-sm text-slate-700 dark:text-slate-300 cursor-pointer">Top 5</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="top10" id="top10" className="border-slate-400 dark:border-slate-500 text-amber-500" />
            <Label htmlFor="top10" className="text-sm text-slate-700 dark:text-slate-300 cursor-pointer">Top 10</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="top20" id="top20" className="border-slate-400 dark:border-slate-500 text-amber-500" />
            <Label htmlFor="top20" className="text-sm text-slate-700 dark:text-slate-300 cursor-pointer">Top 20</Label>
          </div>
        </RadioGroup>
      </div>

      {/* PIB Categories Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Categorías de PIB Petrolero</Label>
        <div className="space-y-2">
          {PIB_CATEGORIES?.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox 
                id={`pib-${category}`}
                checked={pibCategories?.includes(category) ?? false}
                onCheckedChange={() => handlePibCategoryToggle(category)}
                className="border-slate-400 dark:border-slate-500 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
              />
              <Label 
                htmlFor={`pib-${category}`} 
                className="text-sm text-slate-700 dark:text-slate-300 cursor-pointer"
              >
                {PIB_CATEGORY_LABELS?.[category] ?? category}
              </Label>
            </div>
          )) ?? null}
        </div>
      </div>

      {/* Regions Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Regiones Geográficas</Label>
        <div className="space-y-2">
          {Object.keys(REGIONES)?.map(region => (
            <div key={region} className="flex items-center space-x-2">
              <Checkbox 
                id={`region-${region}`}
                checked={selectedRegions?.includes(region) ?? false}
                onCheckedChange={() => handleRegionToggle(region)}
                className="border-slate-400 dark:border-slate-500 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
              />
              <Label 
                htmlFor={`region-${region}`} 
                className="text-sm text-slate-700 dark:text-slate-300 cursor-pointer"
              >
                {region}
              </Label>
            </div>
          )) ?? null}
        </div>
      </div>

      {/* Countries Filter */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Países específicos</Label>
          <Button
            onClick={() => setShowCountryList(!showCountryList)}
            variant="ghost"
            size="sm"
            className="text-xs text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            {showCountryList ? 'Ocultar' : 'Mostrar'} lista
          </Button>
        </div>
        {selectedCountries?.length > 0 && (
          <div className="text-xs text-slate-600 dark:text-slate-400">
            {selectedCountries?.length} país{selectedCountries?.length !== 1 ? 'es' : ''} seleccionado{selectedCountries?.length !== 1 ? 's' : ''}
          </div>
        )}
        {showCountryList && (
          <div className="max-h-64 overflow-y-auto space-y-2 border border-slate-200 dark:border-slate-700 rounded-md p-3 bg-slate-50 dark:bg-slate-800/50">
            {countries?.sort()?.map(country => (
              <div key={country} className="flex items-center space-x-2">
                <Checkbox 
                  id={`country-${country}`}
                  checked={selectedCountries?.includes(country) ?? false}
                  onCheckedChange={() => handleCountryToggle(country)}
                  className="border-slate-400 dark:border-slate-500 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                />
                <Label 
                  htmlFor={`country-${country}`} 
                  className="text-sm text-slate-700 dark:text-slate-300 cursor-pointer"
                >
                  {country}
                </Label>
              </div>
            )) ?? null}
          </div>
        )}
      </div>

      {/* Mobile Clear Button */}
      {(pibCategories?.length > 0 || selectedCountries?.length > 0 || selectedRegions?.length > 0 || topRange !== 'all') && (
        <Button 
          onClick={handleReset} 
          variant="ghost" 
          size="sm"
          className="w-full mt-4 lg:hidden text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-slate-100 dark:hover:bg-slate-700"
        >
          <X className="w-4 h-4 mr-1" />
          Limpiar Filtros
        </Button>
      )}
      </div>
    </Card>
  );
}
