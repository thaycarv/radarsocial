import React, { useState, useEffect } from 'react';
import { ProjectProvider, useProjects } from './context/ProjectContext';
import { Header } from './components/layout/Header';
import { PortfolioOverview } from './components/dashboard/PortfolioOverview';
import { PhysicalFinancialCockpit } from './components/physicalFinancial/PhysicalFinancialCockpit';
import { FollowUpChecklist } from './components/operations/FollowUpChecklist';
import { ImpactAndReports } from './components/impact/ImpactAndReports';
import { ExecutiveReportModal } from './components/common/ExecutiveReportModal';

function MainApp() {
  const { theme } = useProjects();
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col transition-colors duration-200">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 print:hidden">
        <div key={activeTab} className="animate-fade-scale">
          {activeTab === 'dashboard' && <PortfolioOverview onNavigate={setActiveTab} />}
          {activeTab === 'physicalFinancial' && <PhysicalFinancialCockpit onNavigate={setActiveTab} />}
          {activeTab === 'operations' && <FollowUpChecklist onNavigate={setActiveTab} />}
          {activeTab === 'impact' && <ImpactAndReports />}
        </div>
      </main>

      <ExecutiveReportModal />
    </div>
  );
}

export default function App() {
  return (
    <ProjectProvider>
      <MainApp />
    </ProjectProvider>
  );
}
