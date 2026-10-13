import React from 'react';
import { WasteScanner } from '../components/wasteAnalyzer/WasteScanner';

export const WasteAnalyzerPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <WasteScanner />
    </div>
  );
};
