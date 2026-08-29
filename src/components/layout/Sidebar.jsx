import React from 'react';
import {
  LayoutDashboard,
  Target,
  LineChart,
  ListTodo,
  Bot,
  Sparkles,
  Layers,
  RotateCcw
} from 'lucide-react';
import { useProjects } from '../../context/ProjectContext';

export const Sidebar = ({ activeTab, setActiveTab, onOpenNamingModal }) => {
  const { currentBrand, resetToDefault } = useProjects();

  const menuItems = [
    { id: 'dashboard', label: 'Cockpit & Portfólio', icon: LayoutDashboard, badge: 'Visão Geral' },
    { id: 'strategic', label: 'Identidade & Desdobramento', icon: Target, badge: '3 Níveis' },
    { id: 'physicalFinancial', label: 'Curva S & Físico-Financeiro', icon: LineChart, badge: 'DNA Rigor' },
    { id: 'operations', label: 'Checklist & Rituais de Gestão', icon: ListTodo, badge: 'Operação' },
    { id: 'copilot', label: 'Copiloto de Decisão (IA)', icon: Bot, badge: 'Inteligência' },
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between shrink-0 h-screen sticky top-0">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-950/60">
              <Layers className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-white text-base tracking-tight">{currentBrand.name}</h1>
                <span className="text-[9px] bg-emerald-500/10 text-emerald-400 font-semibold px-1.5 py-0.5 rounded border border-emerald-500/20">
                  PROTÓTIPO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium truncate max-w-[140px]">{currentBrand.tagline}</p>
            </div>
          </div>

          <button
            onClick={onOpenNamingModal}
            className="mt-3 w-full flex items-center justify-center gap-2 py-1.5 px-2.5 rounded-lg bg-slate-900 border border-slate-700/70 hover:border-emerald-500/50 hover:bg-slate-850 text-slate-300 hover:text-emerald-300 text-xs font-medium transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Testar outros Nomes</span>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1.5">
          <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-3 py-2">Navegação Principal</p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-400 font-semibold border border-emerald-500/30 shadow-md shadow-emerald-950/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-900 text-slate-500'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info & Reset */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950 space-y-3">
        <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 text-[11px] text-slate-400 space-y-1">
          <div className="flex items-center justify-between text-slate-300 font-medium">
            <span>Status do Sistema</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <p className="text-slate-500">Alinhamento Físico-Financeiro Ativo</p>
        </div>

        <button
          onClick={resetToDefault}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-slate-400 hover:text-slate-300 hover:bg-slate-900 text-xs transition"
          title="Restaura os dados originais do protótipo"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restaurar Demonstração</span>
        </button>
      </div>
    </aside>
  );
};
