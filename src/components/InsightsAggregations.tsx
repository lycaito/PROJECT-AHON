import { FloodData } from '../App';
import { TrendingUp, Droplets, AlertCircle } from 'lucide-react';

type InsightsAggregationsProps = {
  data: FloodData[] | null;
};

export function InsightsAggregations({ data }: InsightsAggregationsProps) {
  if (!data) {
    return (
      <div className="card bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
        <p className="text-yellow-800">⚠️ Upload dataset first.</p>
      </div>
    );
  }

  const avgRainfall = data.reduce((sum, row) => sum + row.Rainfall_mm, 0) / data.length;
  const floodOccurrences = data.filter(row => row.FloodOccurrence === 1).length;
  const floodRate = (floodOccurrences / data.length) * 100;

  const maxRainfall = Math.max(...data.map(row => row.Rainfall_mm));
  const minRainfall = Math.min(...data.map(row => row.Rainfall_mm));

  const avgWaterLevel = data
    .filter(row => row.WaterLevel_m !== undefined)
    .reduce((sum, row) => sum + (row.WaterLevel_m || 0), 0) / data.length;

  return (
    <div className="animate-fadeIn">
      <div className="card bg-white rounded-2xl p-8 shadow-xl mb-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">📈 Key Insights</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-700">Average Rainfall</h3>
            </div>
            <p className="text-4xl font-bold text-blue-600">{avgRainfall.toFixed(2)}</p>
            <p className="text-sm text-gray-600 mt-1">millimeters</p>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-700">Flood Rate</h3>
            </div>
            <p className="text-4xl font-bold text-red-600">{floodRate.toFixed(2)}%</p>
            <p className="text-sm text-gray-600 mt-1">{floodOccurrences} occurrences</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-700">Avg Water Level</h3>
            </div>
            <p className="text-4xl font-bold text-purple-600">
              {avgWaterLevel ? avgWaterLevel.toFixed(2) : 'N/A'}
            </p>
            <p className="text-sm text-gray-600 mt-1">meters</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-6 text-gray-800">Comparative Analysis</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Average Rainfall</span>
                <span className="text-sm font-bold text-blue-600">{avgRainfall.toFixed(2)} mm</span>
              </div>
              <div className="h-8 bg-gray-200 rounded-lg overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all"
                  style={{ width: `${(avgRainfall / maxRainfall) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Flood Occurrence Rate</span>
                <span className="text-sm font-bold text-red-600">{floodRate.toFixed(2)}%</span>
              </div>
              <div className="h-8 bg-gray-200 rounded-lg overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all"
                  style={{ width: `${floodRate}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-white rounded-2xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">📊 Statistical Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border-2 border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">Total Records</p>
            <p className="text-2xl font-bold text-gray-800">{data.length}</p>
          </div>
          <div className="border-2 border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">Max Rainfall</p>
            <p className="text-2xl font-bold text-gray-800">{maxRainfall.toFixed(1)} mm</p>
          </div>
          <div className="border-2 border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">Min Rainfall</p>
            <p className="text-2xl font-bold text-gray-800">{minRainfall.toFixed(1)} mm</p>
          </div>
          <div className="border-2 border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">Flood Events</p>
            <p className="text-2xl font-bold text-gray-800">{floodOccurrences}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
