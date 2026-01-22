import { FloodData } from '../App';

type DatasetEDAProps = {
  data: FloodData[] | null;
};

export function DatasetEDA({ data }: DatasetEDAProps) {
  if (!data) {
    return (
      <div className="card bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
        <p className="text-yellow-800">⚠️ Please upload a dataset to continue.</p>
      </div>
    );
  }

  const headers = Object.keys(data[0] || {});
  const numericColumns = headers.filter(h => typeof data[0][h] === 'number');

  const calculateStats = (column: string) => {
    const values = data.map(row => row[column]).filter(v => typeof v === 'number') as number[];
    if (values.length === 0) return null;

    const sorted = [...values].sort((a, b) => a - b);
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    const median = sorted[Math.floor(sorted.length / 2)];
    const std = Math.sqrt(values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length);

    return { count: values.length, mean, std, min, median, max };
  };

  return (
    <div className="animate-fadeIn">
      <div className="card bg-white rounded-2xl p-8 shadow-xl mb-6">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">📊 Dataset Overview</h2>
        <p className="text-gray-600 mb-4">
          Shape: <span className="font-semibold">{data.length} rows × {headers.length} columns</span>
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-50">
                {headers.map(header => (
                  <th key={header} className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b-2 border-blue-200">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 10).map((row, idx) => (
                <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                  {headers.map(header => (
                    <td key={header} className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
                      {row[header] !== undefined && row[header] !== null ? String(row[header]) : '—'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-white rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">📈 Summary Statistics</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-blue-50 to-purple-50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b-2 border-blue-200">Statistic</th>
                {numericColumns.map(col => (
                  <th key={col} className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b-2 border-blue-200">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {['count', 'mean', 'std', 'min', 'median', 'max'].map(stat => (
                <tr key={stat} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-4 py-3 text-sm font-semibold text-gray-700 border-b border-gray-200">
                    {stat}
                  </td>
                  {numericColumns.map(col => {
                    const stats = calculateStats(col);
                    const value = stats ? stats[stat as keyof typeof stats] : '—';
                    return (
                      <td key={col} className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
                        {typeof value === 'number' ? value.toFixed(2) : value}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
