import React, { useState, useEffect } from 'react';
import { ProjectProvider, useProjects } from './context/ProjectContext';
import { Header } from './components/layout/Header';
import { PortfolioOverview } from './components/dashboard/PortfolioOverview';
import { PhysicalFinancialCockpit } from './components/physicalFinancial/PhysicalFinancialCockpit';
import { FollowUpChecklist } from './components/operations/FollowUpChecklist';
import { ImpactAndReports } from './components/impact/ImpactAndReports';

function MainApp() {
  const { theme, cutoff } = useProjects();
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col transition-colors duration-200">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8">
        <div key={activeTab} className="animate-fade-scale">
          {activeTab === 'dashboard' && <PortfolioOverview onNavigate={setActiveTab} />}
          {activeTab === 'physicalFinancial' && <PhysicalFinancialCockpit onNavigate={setActiveTab} />}
          {activeTab === 'operations' && <FollowUpChecklist />}
          {activeTab === 'impact' && <ImpactAndReports />}
        </div>
      </main>

      <footer className="border-t border-slate-200/80 bg-white py-4 px-6 text-center text-xs text-slate-500 transition-colors duration-200 print:hidden">
        RadarSocial • Monitoramento físico-financeiro e de resultados (Data de corte da carteira: {cutoff.formattedDate})
      </footer>
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
