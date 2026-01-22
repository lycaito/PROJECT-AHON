import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { MainPanel } from './components/MainPanel';
import { DatasetEDA } from './components/DatasetEDA';
import { FeatureEngineering } from './components/FeatureEngineering';
import { AnomalyDetection } from './components/AnomalyDetection';
import { GeospatialMapping } from './components/GeospatialMapping';
import { InsightsAggregations } from './components/InsightsAggregations';
import logoImage from 'figma:asset/73d2ae6918d11531ca4d1c26698b6962c428de92.png';

export type FloodData = {
  Date?: string;
  Rainfall_mm: number;
  WaterLevel_m?: number;
  FloodOccurrence?: number;
  Latitude?: number;
  Longitude?: number;
  [key: string]: any;
};

export type Panel = 
  | '🏠 Main Panel'
  | '📊 Dataset & EDA'
  | '🧠 Feature Engineering'
  | '🌧️ Anomaly Detection'
  | '🗺️ Geospatial Mapping'
  | '📈 Insights & Aggregations';

export default function App() {
  const [currentPanel, setCurrentPanel] = useState<Panel>('🏠 Main Panel');
  const [data, setData] = useState<FloodData[] | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const rows = text.split('\n').filter(row => row.trim());
      const headers = rows[0].split(',').map(h => h.trim());
      
      const parsedData: FloodData[] = rows.slice(1).map(row => {
        const values = row.split(',');
        const obj: any = {};
        headers.forEach((header, index) => {
          const value = values[index]?.trim();
          obj[header] = isNaN(Number(value)) ? value : Number(value);
        });
        return obj;
      });
      
      setData(parsedData);
    };
    
    reader.readAsText(file);
  };

  const renderPanel = () => {
    switch (currentPanel) {
      case '🏠 Main Panel':
        return <MainPanel />;
      case '📊 Dataset & EDA':
        return <DatasetEDA data={data} />;
      case '🧠 Feature Engineering':
        return <FeatureEngineering data={data} />;
      case '🌧️ Anomaly Detection':
        return <AnomalyDetection data={data} />;
      case '🗺️ Geospatial Mapping':
        return <GeospatialMapping data={data} />;
      case '📈 Insights & Aggregations':
        return <InsightsAggregations data={data} />;
      default:
        return <MainPanel />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="flex">
        <Sidebar
          currentPanel={currentPanel}
          onPanelChange={setCurrentPanel}
          onFileUpload={handleFileUpload}
          fileName={fileName}
        />
        <main className="flex-1 p-8 ml-64">
          {renderPanel()}
          
          <footer className="text-center opacity-70 mt-12 text-sm text-gray-600">
            <hr className="mb-4 border-gray-300" />
            <p>Developed by PROJECT – AHON Team</p>
            <p>AI • Flood Risk • Geospatial Intelligence</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
