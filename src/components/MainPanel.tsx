import { CloudRain, Activity, Shield } from 'lucide-react';

export function MainPanel() {
  return (
    <div className="animate-fadeIn">
      <div className="hero-card bg-gradient-to-br from-blue-600 to-blue-400 rounded-3xl p-16 text-center text-white shadow-2xl mb-8 animate-pulse-subtle">
        <div className="inline-block bg-blue-500/50 px-4 py-1 rounded-full text-sm mb-4">
          <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
          Live System Monitoring
        </div>
        <h1 className="text-6xl font-bold mb-2">Predict Floods.</h1>
        <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
          Protect Communities.
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Project AHON leverages AI-powered meteorological analysis and temporal pattern recognition to provide early flood risk insights for smarter decision making.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg">
            Explore Dataset
          </button>
          <button className="bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg">
            View Risk Map
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all">
          <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
            <CloudRain className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-gray-800">Anomaly Detection</h3>
          <p className="text-gray-600">
            Identifies extreme rainfall deviations using Isolation Forest algorithms for early warning systems.
          </p>
        </div>

        <div className="card bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all">
          <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
            <Activity className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-gray-800">Predictive Analytics</h3>
          <p className="text-gray-600">
            Time-aware feature engineering for accurate water level trend predictions and risk assessment.
          </p>
        </div>

        <div className="card bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all">
          <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-gray-800">Risk Intelligence</h3>
          <p className="text-gray-600">
            Geospatial visualization of flood-prone areas for rapid response and community protection.
          </p>
        </div>
      </div>
    </div>
  );
}
