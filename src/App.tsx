import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CampusProvider } from './context/CampusContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { DemoBanner } from './components/common/DemoBanner';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { DigitalTwinPage } from './pages/DigitalTwinPage';
import { WasteAnalyzerPage } from './pages/WasteAnalyzerPage';
import { EnergyMonitoringPage } from './pages/EnergyMonitoringPage';
import { WaterMonitoringPage } from './pages/WaterMonitoringPage';
import { IssueManagementPage } from './pages/IssueManagementPage';
import { AssistantPage } from './pages/AssistantPage';
import { CarbonCalculatorPage } from './pages/CarbonCalculatorPage';
import { ReportsPage } from './pages/ReportsPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { SettingsPage } from './pages/SettingsPage';

export function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <CampusProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-campus-darkest text-slate-100 flex flex-col font-sans selection:bg-eco-green selection:text-campus-darkest">
          {/* Hackathon Demo Banner */}
          <DemoBanner />

          {/* Top Navbar */}
          <Navbar
            isMobileMenuOpen={isMobileMenuOpen}
            onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />

          {/* Main Layout Area: Sidebar + Content */}
          <div className="flex-1 flex max-w-7xl w-full mx-auto">
            {/* Sidebar Navigation */}
            <Sidebar
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
            />

            {/* Main Page Route View */}
            <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/digital-twin" element={<DigitalTwinPage />} />
                <Route path="/waste-analyzer" element={<WasteAnalyzerPage />} />
                <Route path="/energy" element={<EnergyMonitoringPage />} />
                <Route path="/water" element={<WaterMonitoringPage />} />
                <Route path="/issues" element={<IssueManagementPage />} />
                <Route path="/assistant" element={<AssistantPage />} />
                <Route path="/carbon" element={<CarbonCalculatorPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </CampusProvider>
  );
}

export default App;
