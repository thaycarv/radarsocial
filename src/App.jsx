import React, { useState } from 'react';
import { ProjectProvider, useProjects } from './context/ProjectContext';
import { Header } from './components/layout/Header';
import { NamingModal } from './components/layout/NamingModal';
import { LinearFlowBoard } from './components/strategic/LinearFlowBoard';
import { ProjectDetailDrawer } from './components/physicalFinancial/ProjectDetailDrawer';
import { PortfolioOverview } from './components/dashboard/PortfolioOverview';
import { PhysicalFinancialCockpit } from './components/physicalFinancial/PhysicalFinancialCockpit';
import { FollowUpChecklist } from './components/operations/FollowUpChecklist';
import { DocumentationHub } from './components/documentation/DocumentationHub';
import { StrategicCopilot } from './components/aiCopilot/StrategicCopilot';

function MainApp() {
  const { theme } = useProjects();
  const [activeTab, setActiveTab] = useState('flow');
  const [selectedDrawerProject, setSelectedDrawerProject] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  React.useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const handleOpenProjectDrawer = (project) => {
    setSelectedDrawerProject(project);
    setIsDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col transition-colors duration-200">
      {/* Header Fixo com RadarSocial */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Fluid Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8">
        {activeTab === 'flow' && (
          <LinearFlowBoard onSelectProject={handleOpenProjectDrawer} />
        )}

        {activeTab === 'physicalFinancial' && (
          <PhysicalFinancialCockpit />
        )}

        {activeTab === 'dashboard' && (
          <PortfolioOverview onNavigate={setActiveTab} />
        )}

        {activeTab === 'operations' && (
          <FollowUpChecklist />
        )}

        {activeTab === 'documentation' && (
          <DocumentationHub />
        )}

        {activeTab === 'copilot' && (
          <StrategicCopilot />
        )}
      </main>

      {/* Footer minimalista */}
      <footer className="border-t border-slate-200/80 bg-white py-4 px-6 text-center text-xs text-slate-400 transition-colors duration-200">
        RadarSocial • Transparência e ritmo na execução dos recursos que movem a sociedade
      </footer>

      {/* Gaveta Lateral da Curva S */}
      <ProjectDetailDrawer
        project={selectedDrawerProject}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
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


