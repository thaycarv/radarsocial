import React from 'react';
import { useProjects } from '../../context/ProjectContext';
import {
  Layers,
  LayoutDashboard,
  LineChart,
  ListTodo,
  Target,
  HeartHandshake,
  Printer,
  RotateCcw,
  Sun,
  Moon
} from 'lucide-react';

export const Header = ({ activeTab, setActiveTab }) => {
  const {
    cutoff,
    resetToDefault,
    theme,
    setTheme,
    setShowReportModal
  } = useProjects();

  const tabs = [
    { id: 'dashboard', label: 'Portfólio', icon: LayoutDashboard },
    { id: 'physicalFinancial', label: 'Execução e Orçamento', icon: LineChart },
    { id: 'operations', label: 'Plano de Ação', icon: ListTodo },
    { id: 'escuta', label: 'Escuta Comunitária', icon: HeartHandshake },
    { id: 'impact', label: 'Impacto', icon: Target }
  ];

  return (
    <header className="bg-white border-b border-slate-200/90 sticky top-0 z-30 shadow-2xs transition-colors duration-200 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
        {/* Marca + Referência */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-[#2D5A27] flex items-center justify-center text-white shadow-2xs">
            <Layers className="w-4 h-4 stroke-[2.5]" />
          </div>
          <span className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight">
            RadarSocial
          </span>
          <span className="hidden md:inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium border border-slate-200">
            Ref: {cutoff.shortRef}
          </span>
        </div>

        {/* Abas Centrais */}
        <nav aria-label="Navegação principal" className="flex items-center gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-50 text-[#2D5A27] border border-emerald-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#2D5A27]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Ações Rápidas */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setShowReportModal(true)}
            className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exportar PDF</span>
          </button>

          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'default' : 'dark')}
            className="p-1.5 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/70 rounded-lg border border-slate-200 transition cursor-pointer"
            title={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
            aria-label="Alternar tema"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={resetToDefault}
            className="p-1.5 text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/70 rounded-lg border border-slate-200 transition cursor-pointer"
            title="Restaurar dados iniciais da demonstração"
            aria-label="Restaurar dados iniciais"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
