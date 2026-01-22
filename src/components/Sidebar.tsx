import { Home, BarChart3, Brain, CloudRain, Map, TrendingUp, Upload } from 'lucide-react';
import { Panel } from '../App';

type SidebarProps = {
  currentPanel: Panel;
  onPanelChange: (panel: Panel) => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileName: string;
};

export function Sidebar({ currentPanel, onPanelChange, onFileUpload, fileName }: SidebarProps) {
  const menuItems: { label: Panel; icon: any }[] = [
    { label: '🏠 Main Panel', icon: Home },
    { label: '📊 Dataset & EDA', icon: BarChart3 },
    { label: '🧠 Feature Engineering', icon: Brain },
    { label: '🌧️ Anomaly Detection', icon: CloudRain },
    { label: '🗺️ Geospatial Mapping', icon: Map },
    { label: '📈 Insights & Aggregations', icon: TrendingUp },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-blue-600 to-blue-400 text-white p-6 shadow-2xl overflow-y-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-2xl">🌊</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">PROJECT</h1>
            <h2 className="text-2xl font-bold">AHON</h2>
          </div>
        </div>
      </div>

      <nav className="mb-8">
        <p className="text-xs uppercase tracking-wider mb-3 opacity-80">Navigate</p>
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPanel === item.label;
            return (
              <li key={item.label}>
                <button
                  onClick={() => onPanelChange(item.label)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-white text-blue-600 shadow-lg'
                      : 'hover:bg-white/20'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {item.label.replace(/[🏠📊🧠🌧️🗺️📈]/g, '').trim()}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
        <label className="block mb-3">
          <div className="flex items-center gap-2 mb-2">
            <Upload className="w-4 h-4" />
            <span className="text-sm font-medium">Upload Dataset (CSV)</span>
          </div>
          <input
            type="file"
            accept=".csv"
            onChange={onFileUpload}
            className="block w-full text-sm text-white
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-white file:text-blue-600
              hover:file:bg-blue-50 file:cursor-pointer
              cursor-pointer"
          />
        </label>
        {fileName && (
          <p className="text-xs opacity-80 mt-2 truncate">
            📁 {fileName}
          </p>
        )}
      </div>

      <div className="mt-8 bg-white/10 rounded-xl p-4 backdrop-blur-sm">
        <p className="text-xs font-semibold mb-1">Status</p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs">System Online</span>
        </div>
        <p className="text-xs opacity-70 mt-1">v1.2.0 Stable</p>
      </div>
    </aside>
  );
}
