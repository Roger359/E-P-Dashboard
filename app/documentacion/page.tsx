import { Card } from '@/components/ui/card';
import { BookOpen, FileText, Info, Database, TrendingUp, Filter } from 'lucide-react';

export const dynamic = 'force-static';

export default function Documentation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center gap-3">
            <BookOpen className="w-10 h-10 text-amber-400" />
            Documentación
          </h1>
          <p className="text-slate-400 text-lg">
            Guía completa sobre los datos, metodología y funcionalidades del dashboard
          </p>
        </div>

        <div className="space-y-6">
          {/* Data Source */}
          <Card className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-amber-400" />
              <h2 className="text-2xl font-bold text-white">Fuente de Datos</h2>
            </div>
            <div className="space-y-3 text-slate-300">
              <p>
                <strong className="text-white">Archivo original:</strong> Eficiencia Petrolera Por PIB.xlsx
              </p>
              <p>
                <strong className="text-white">Formato procesado:</strong> oil_data.json
              </p>
              <p>
                <strong className="text-white">Fecha de análisis:</strong> 4 de diciembre de 2025
              </p>
              <p>
                Los datos provienen de un archivo Excel que contiene información detallada sobre 50 países productores de petróleo, 
                incluyendo producción, reservas probadas, población y categorías de economía petrolera.
              </p>
            </div>
          </Card>

          {/* Data Format */}
          <Card className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">Estructura de Datos</h2>
            </div>
            <div className="space-y-4 text-slate-300">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Campos Principales:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong className="text-amber-400">Rank:</strong> Posición del país por producción
                  </li>
                  <li>
                    <strong className="text-amber-400">País:</strong> Nombre del país productor
                  </li>
                  <li>
                    <strong className="text-amber-400">Producción (bbl/d):</strong> Producción de crudo en barriles por día
                  </li>
                  <li>
                    <strong className="text-amber-400">Reservas Probadas (MMM bbl):</strong> Reservas en miles de millones de barriles
                  </li>
                  <li>
                    <strong className="text-amber-400">Población 2024 (millones):</strong> Población estimada para 2024
                  </li>
                  <li>
                    <strong className="text-amber-400">Años de Producción Restantes:</strong> Estimación basada en reservas actuales y tasa de producción
                  </li>
                  <li>
                    <strong className="text-amber-400">Categoría de Economía Petrolera:</strong> Clasificación según % del PIB
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Unidades de Medida:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-cyan-400">bbl/d:</strong> Barriles por día</li>
                  <li><strong className="text-cyan-400">mbbl/d:</strong> Miles de barriles por día</li>
                  <li><strong className="text-cyan-400">MMM bbl:</strong> Miles de millones de barriles</li>
                  <li><strong className="text-cyan-400">mm:</strong> Millones (para población)</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* PIB Categories */}
          <Card className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-bold text-white">Categorías de Economía Petrolera</h2>
            </div>
            <div className="space-y-3 text-slate-300">
              <p className="mb-4">
                Los países se clasifican según el porcentaje que representa el petróleo en su PIB:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                  <h4 className="font-semibold text-amber-400 mb-1">Muy alta (40-60%)</h4>
                  <p className="text-sm text-slate-400">Economías extremadamente dependientes del petróleo</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                  <h4 className="font-semibold text-amber-400 mb-1">Alta (30-45%)</h4>
                  <p className="text-sm text-slate-400">Fuerte dependencia del sector petrolero</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                  <h4 className="font-semibold text-amber-400 mb-1">Media-alta (20-30%)</h4>
                  <p className="text-sm text-slate-400">Dependencia significativa del petróleo</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                  <h4 className="font-semibold text-amber-400 mb-1">Media (10-20%)</h4>
                  <p className="text-sm text-slate-400">Dependencia moderada</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                  <h4 className="font-semibold text-amber-400 mb-1">Baja (5-10%)</h4>
                  <p className="text-sm text-slate-400">Baja dependencia del sector petrolero</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                  <h4 className="font-semibold text-amber-400 mb-1">Muy baja (&lt;5%)</h4>
                  <p className="text-sm text-slate-400">Mínima dependencia del petróleo en el PIB</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Filters Explanation */}
          <Card className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <Filter className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Filtros Interactivos</h2>
            </div>
            <div className="space-y-3 text-slate-300">
              <p className="mb-4">
                El dashboard permite filtrar los datos de múltiples formas:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-white">Rango de países:</strong> Visualiza todos los países o selecciona Top 5, Top 10, o Top 20 productores
                </li>
                <li>
                  <strong className="text-white">Categorías de PIB Petrolero:</strong> Filtra por nivel de dependencia económica del petróleo
                </li>
                <li>
                  <strong className="text-white">Países específicos:</strong> Selecciona uno o más países para análisis detallado
                </li>
              </ul>
              <p className="mt-4 text-amber-400">
                Los filtros se aplican instantáneamente a todos los gráficos del dashboard.
              </p>
            </div>
          </Card>

          {/* Fracking Information */}
          <Card className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <Info className="w-6 h-6 text-red-400" />
              <h2 className="text-2xl font-bold text-white">Información sobre Fracking</h2>
            </div>
            <div className="space-y-3 text-slate-300">
              <p>
                El gráfico de fracking muestra los principales países que utilizan esta técnica de extracción:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-white">Estados Unidos:</strong> Líder mundial en fracking</li>
                <li><strong className="text-white">Canadá:</strong> Importante productor mediante fracking</li>
                <li><strong className="text-white">China:</strong> Creciente uso de fracking</li>
                <li><strong className="text-white">Argentina:</strong> Desarrollo de yacimientos de Vaca Muerta</li>
                <li><strong className="text-white">Rusia:</strong> Exploración de fracking en algunas regiones</li>
              </ul>
              <p className="mt-4 text-slate-400 text-sm italic">
                Nota: Los datos de fracking se basan en países reconocidos por su uso significativo de esta tecnología.
              </p>
            </div>
          </Card>

          {/* Missing Data */}
          <Card className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <Info className="w-6 h-6 text-orange-400" />
              <h2 className="text-2xl font-bold text-white">Manejo de Datos Incompletos</h2>
            </div>
            <div className="space-y-3 text-slate-300">
              <p>
                Algunos países pueden presentar datos incompletos o valores en cero para ciertos campos:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Los países con datos faltantes se marcan con "N/A" en los tooltips</li>
                <li>Los valores en cero pueden indicar falta de información o producción negligible</li>
                <li>Los filtros permiten excluir países con datos incompletos si es necesario</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
