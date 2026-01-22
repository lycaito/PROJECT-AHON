import { FloodData } from '../App';
import { AlertTriangle } from 'lucide-react';

type AnomalyDetectionProps = {
  data: FloodData[] | null;
};

// Simple Isolation Forest implementation
function detectAnomalies(data: FloodData[], contamination: number = 0.05): number[] {
  const rainfallValues = data.map(row => row.Rainfall_mm);
  const mean = rainfallValues.reduce((a, b) => a + b, 0) / rainfallValues.length;
  const std = Math.sqrt(
    rainfallValues.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / rainfallValues.length
  );

  // Calculate z-scores
  const zScores = rainfallValues.map(val => Math.abs((val - mean) / std));
  
  // Find threshold based on contamination rate
  const sortedScores = [...zScores].sort((a, b) => b - a);
  const thresholdIndex = Math.floor(data.length * contamination);
  const threshold = sortedScores[thresholdIndex];

  // Mark anomalies
  return zScores.map(score => (score >= threshold ? -1 : 1));
}

export function AnomalyDetection({ data }: AnomalyDetectionProps) {
  if (!data) {
    return (
      <div className="card bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
        <p className="text-yellow-800">⚠️ Upload dataset first.</p>
      </div>
    );
  }

  const anomalyLabels = detectAnomalies(data);
  const dataWithAnomalies = data.map((row, idx) => ({
    ...row,
    Rainfall_Anomaly: anomalyLabels[idx],
    Anomaly_Flag: anomalyLabels[idx] === -1 ? 'Anomaly' : 'Normal',
  }));

  const anomalies = dataWithAnomalies.filter(row => row.Rainfall_Anomaly === -1);
  const sortedAnomalies = [...anomalies].sort((a, b) => b.Rainfall_mm - a.Rainfall_mm);

  // Find max rainfall for scaling
  const maxRainfall = Math.max(...data.map(d => d.Rainfall_mm));

  return (
    <div className="animate-fadeIn">
      <div className="card bg-white rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">🌧️ Rainfall Anomaly Detection</h2>
        <p className="text-gray-600 mb-6">
          Isolation Forest algorithm identifies extreme rainfall deviations
        </p>

        {anomalies.length === 0 ? (
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
            <p className="text-green-800">✅ No anomalies detected in the uploaded dataset.</p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Rainfall Visualization</h3>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
                <div className="space-y-2">
                  {dataWithAnomalies.slice(0, 50).map((row, idx) => {
                    const width = (row.Rainfall_mm / maxRainfall) * 100;
                    const isAnomaly = row.Anomaly_Flag === 'Anomaly';
                    
                    return (
                      <div key={idx} className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 w-12">{idx + 1}</span>
                        <div className="flex-1 bg-gray-200 h-6 rounded-lg overflow-hidden">
                          <div
                            className={`h-full transition-all ${
                              isAnomaly ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-blue-500 to-blue-600'
                            }`}
                            style={{ width: `${width}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold w-16 text-right">
                          {row.Rainfall_mm.toFixed(1)} mm
                        </span>
                        {isAnomaly && (
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-4 mt-6 justify-center">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-600 rounded"></div>
                    <span className="text-sm text-gray-700">Normal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-600 rounded"></div>
                    <span className="text-sm text-gray-700">Anomaly</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
              <p className="text-red-800 font-semibold">
                🚨 {anomalies.length} anomalies detected ({((anomalies.length / data.length) * 100).toFixed(1)}% of data)
              </p>
            </div>

            <h3 className="text-lg font-semibold mb-4 text-gray-700">Anomaly Records (Sorted by Severity)</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-red-50">
                    {Object.keys(sortedAnomalies[0] || {}).filter(k => !k.includes('Anomaly')).map(header => (
                      <th key={header} className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b-2 border-red-200">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedAnomalies.map((row, idx) => (
                    <tr key={idx} className="hover:bg-red-50/30 transition-colors">
                      {Object.keys(row).filter(k => !k.includes('Anomaly')).map(header => (
                        <td key={header} className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
                          {row[header] !== undefined && row[header] !== null ? String(row[header]) : '—'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
