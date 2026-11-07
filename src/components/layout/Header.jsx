import React from 'react';
import { useProjects } from '../../context/ProjectContext';
import {
  Layers,
  LayoutDashboard,
  LineChart,
  ListTodo,
  Target,
  ChevronDown,
  RotateCcw,
  Calendar
} from 'lucide-react';
import { formatPercent } from '../../utils/calculations';

export const Header = ({ activeTab, setActiveTab }) => {
  const {
    cutoff,
    projects,
    selectedProjectId,
    setSelectedProjectId,
    selectedProject,
    resetToDefault,
    theme,
    setTheme
  } = useProjects();

  const tabs = [
    { id: 'dashboard', label: 'Carteira de Programas', icon: LayoutDashboard },
    { id: 'physicalFinancial', label: 'Medição Físico-Financeira', icon: LineChart },
    { id: 'operations', label: 'Reuniões e Plano 5W2H', icon: ListTodo },
    { id: 'impact', label: 'Indicadores e Relatório A4', icon: Target }
  ];

  return (
    <header className="bg-white border-b border-slate-200/90 sticky top-0 z-30 shadow-xs transition-colors duration-200 print:hidden">
      <div className="max-w-7xl mx-auto px-6 py-2.5 flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#2D5A27] flex items-center justify-center text-white font-bold shadow-xs shrink-0">
            <Layers className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 text-base tracking-tight leading-none">
                RadarSocial
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[11px] font-medium border border-slate-200">
                <Calendar className="w-3 h-3 text-[#2D5A27]" />
                Corte: {cutoff.formattedDate}
              </span>
            </div>
            <p className="text-slate-600 text-xs mt-0.5 leading-tight">
              Acompanhamento físico-financeiro, prestação de contas e indicadores de programas
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Seletor de Tema: Padrão vs Escuro */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-medium">
            <button
              type="button"
              onClick={() => setTheme('default')}
              className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                theme === 'default'
                  ? 'bg-white text-[#2D5A27] font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Padrão
            </button>
            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-800 text-emerald-400 font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Escuro
            </button>
          </div>

          <div className="h-5 w-px bg-slate-200 hidden sm:block"></div>

          {/* Seletor de Programa Ativo */}
          <div className="flex items-center gap-2 text-xs">
            <label htmlFor="header-program-select" className="text-slate-600 font-medium hidden sm:inline">
              Programa ativo:
            </label>
            <div className="relative">
              <select
                id="header-program-select"
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="appearance-none bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-xs py-1.5 pl-3 pr-8 rounded-lg border border-slate-200 focus:outline-none focus:border-[#2D5A27] cursor-pointer transition"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.code} — {p.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="hidden xl:flex items-center gap-3 text-xs border-l border-slate-200 pl-3">
            <div>
              <span className="text-slate-500">Físico: </span>
              <span className="font-bold text-[#2D5A27]">
                {formatPercent(selectedProject?.actualPhysical)}
              </span>
            </div>
            <div>
              <span className="text-slate-500">Financeiro: </span>
              <span
                className={`font-bold ${
                  selectedProject?.cost.severity === 'high' ? 'text-rose-600' : 'text-slate-800'
                }`}
              >
                {formatPercent(selectedProject?.actualFinancial)}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={resetToDefault}
            className="px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition cursor-pointer flex items-center gap-1.5"
            title="Restaurar dados originais da demonstração"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Restaurar</span>
          </button>
        </div>
      </div>

      {/* Navegação em 4 Abas Coesas */}
      <nav
        aria-label="Navegação principal"
        className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between bg-slate-50/50"
      >
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#2D5A27] shadow-xs border border-slate-200/90 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#2D5A27]' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
