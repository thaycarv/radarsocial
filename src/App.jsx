import React, { useState, Suspense, lazy } from 'react';
import { ProjectProvider, useProjects } from './context/ProjectContext';
import { Header } from './components/layout/Header';
import { NamingModal } from './components/layout/NamingModal';
import { ProjectDetailDrawer } from './components/physicalFinancial/ProjectDetailDrawer';
import { TabSkeleton } from './components/common/TabSkeleton';

// Code Splitting & Lazy Loading dos Módulos Principais
const LinearFlowBoard = lazy(() => import('./components/strategic/LinearFlowBoard').then(m => ({ default: m.LinearFlowBoard })));
const PhysicalFinancialCockpit = lazy(() => import('./components/physicalFinancial/PhysicalFinancialCockpit').then(m => ({ default: m.PhysicalFinancialCockpit })));
const PortfolioOverview = lazy(() => import('./components/dashboard/PortfolioOverview').then(m => ({ default: m.PortfolioOverview })));
const FollowUpChecklist = lazy(() => import('./components/operations/FollowUpChecklist').then(m => ({ default: m.FollowUpChecklist })));
const DocumentationHub = lazy(() => import('./components/documentation/DocumentationHub').then(m => ({ default: m.DocumentationHub })));
const StrategicCopilot = lazy(() => import('./components/aiCopilot/StrategicCopilot').then(m => ({ default: m.StrategicCopilot })));

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

      {/* Main Fluid Canvas com Motion Transitions */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8">
        <Suspense fallback={<TabSkeleton />}>
          <div key={activeTab} className="animate-fade-scale">
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
          </div>
        </Suspense>
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


