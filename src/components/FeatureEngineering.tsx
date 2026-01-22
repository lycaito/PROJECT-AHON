import { FloodData } from '../App';

type FeatureEngineeringProps = {
  data: FloodData[] | null;
};

export function FeatureEngineering({ data }: FeatureEngineeringProps) {
  if (!data) {
    return (
      <div className="card bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
        <p className="text-yellow-800">⚠️ Upload dataset first.</p>
      </div>
    );
  }

  // Feature engineering
  const engineeredData = data.map((row, idx) => {
    const rainfall3DayAvg = idx >= 2
      ? (data[idx - 2].Rainfall_mm + data[idx - 1].Rainfall_mm + row.Rainfall_mm) / 3
      : null;

    const rainfall7DayAvg = idx >= 6
      ? data.slice(idx - 6, idx + 1).reduce((sum, r) => sum + r.Rainfall_mm, 0) / 7
      : null;

    const waterLevelChange = idx > 0 && row.WaterLevel_m !== undefined && data[idx - 1].WaterLevel_m !== undefined
      ? row.WaterLevel_m - data[idx - 1].WaterLevel_m
      : null;

    const waterLevelRising = waterLevelChange !== null && waterLevelChange > 0 ? 1 : 0;

    return {
      ...row,
      Rainfall_3day_avg: rainfall3DayAvg,
      Rainfall_7day_avg: rainfall7DayAvg,
      WaterLevel_change: waterLevelChange,
      WaterLevel_rising: waterLevelRising,
    };
  });

  return (
    <div className="animate-fadeIn">
      <div className="card bg-white rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">🧠 Engineered Features</h2>
        <p className="text-gray-600 mb-6">
          Advanced temporal features for improved flood prediction accuracy
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
            <h3 className="font-semibold text-blue-800 mb-1">Rainfall 3-Day Average</h3>
            <p className="text-sm text-blue-700">Rolling average to smooth short-term fluctuations</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
            <h3 className="font-semibold text-purple-800 mb-1">Rainfall 7-Day Average</h3>
            <p className="text-sm text-purple-700">Weekly trend analysis for pattern detection</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
            <h3 className="font-semibold text-green-800 mb-1">Water Level Change</h3>
            <p className="text-sm text-green-700">Rate of change indicator for rising water</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl">
            <h3 className="font-semibold text-orange-800 mb-1">Water Level Rising Flag</h3>
            <p className="text-sm text-orange-700">Binary indicator for increasing water levels</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-blue-50 to-purple-50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b-2 border-blue-200">Rainfall 3-Day Avg</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b-2 border-blue-200">Rainfall 7-Day Avg</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b-2 border-blue-200">Water Level Change</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b-2 border-blue-200">Water Level Rising</th>
              </tr>
            </thead>
            <tbody>
              {engineeredData.slice(0, 20).map((row, idx) => (
                <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
                    {row.Rainfall_3day_avg !== null ? row.Rainfall_3day_avg.toFixed(2) : '—'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
                    {row.Rainfall_7day_avg !== null ? row.Rainfall_7day_avg.toFixed(2) : '—'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
                    {row.WaterLevel_change !== null ? row.WaterLevel_change.toFixed(2) : '—'}
                  </td>
                  <td className="px-4 py-3 text-sm border-b border-gray-200">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                      row.WaterLevel_rising === 1 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {row.WaterLevel_rising === 1 ? 'Rising' : 'Stable'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
