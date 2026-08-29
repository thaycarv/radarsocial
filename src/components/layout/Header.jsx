import React from 'react';
import { useProjects } from '../../context/ProjectContext';
import {
  Layers,
  LayoutDashboard,
  Target,
  LineChart,
  ListTodo,
  FileText,
  Bot,
  Sparkles,
  ChevronDown,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { formatCurrency } from '../../utils/calculations';

export const Header = ({ activeTab, setActiveTab }) => {
  const {
    projects,
    selectedProjectId,
    setSelectedProjectId,
    selectedProject,
    resetToDefault,
    theme,
    setTheme
  } = useProjects();

  const tabs = [
    { id: 'flow', label: 'Mapa de Fluxo', icon: Layers },
    { id: 'physicalFinancial', label: 'Ritmo de Entrega e Gastos', icon: LineChart },
    { id: 'dashboard', label: 'Painel Geral de Projetos', icon: LayoutDashboard },
    { id: 'operations', label: 'Plano de Ação e Rotinas', icon: ListTodo },
    { id: 'documentation', label: 'Documentação & Relatórios', icon: FileText },
    { id: 'copilot', label: 'Copiloto IA', icon: Bot }
  ];

  return (
    <header className="bg-white border-b border-slate-200/90 sticky top-0 z-30 shadow-xs transition-colors duration-200">
      {/* Top Brand Bar */}
      <div className="max-w-7xl mx-auto px-6 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100/80">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#2D5A27] flex items-center justify-center text-white font-bold shadow-xs shrink-0 transition-colors">
            <Layers className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <span className="font-extrabold text-slate-900 text-base tracking-tight leading-none block">RadarSocial</span>
            <p className="text-slate-500 text-[11px] font-medium mt-0.5 leading-tight">
              Transparência e ritmo na execução dos recursos que movem a sociedade
            </p>
          </div>
        </div>

        {/* Theme Picker, Project Selector & Quick Stats */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Seletor de Temas */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-[11px] font-medium">
            <button
              onClick={() => setTheme('default')}
              className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                theme === 'default'
                  ? 'bg-white text-[#2D5A27] font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Tema Padrão Verde Militar"
            >
              Padrão
            </button>
            <button
              onClick={() => setTheme('boho')}
              className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                theme === 'boho'
                  ? 'bg-white text-[#A64B2A] font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Tema Boho Terracota"
            >
              Boho
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-800 text-emerald-400 font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Modo Escuro Acessível"
            >
              Escuro
            </button>
          </div>

          <div className="h-5 w-px bg-slate-200 hidden sm:block"></div>

          {/* Seletor de Projeto Ativo */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium hidden sm:inline">Projeto:</span>
            <div className="relative">
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="appearance-none bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-xs py-1.5 pl-3 pr-8 rounded-lg border border-slate-200 focus:outline-none focus:border-[#2D5A27] cursor-pointer transition"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="h-5 w-px bg-slate-200 hidden md:block"></div>

          <div className="hidden md:flex items-center gap-3 text-xs">
            <div>
              <span className="text-slate-400">Físico: </span>
              <span className="font-bold text-[#2D5A27]">{selectedProject?.actualPhysical}%</span>
            </div>
            <div>
              <span className="text-slate-400">Gasto: </span>
              <span className={`font-bold ${selectedProject?.actualFinancial > selectedProject?.actualPhysical + 10 ? 'text-rose-600' : 'text-slate-700'}`}>
                {selectedProject?.actualFinancial}%
              </span>
            </div>
          </div>

          <button
            onClick={resetToDefault}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
            title="Restaurar Demonstração"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Segmented Pill Tabs Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                  isActive
                    ? 'bg-white text-[#2D5A27] shadow-xs border border-slate-200/90 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#2D5A27]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

