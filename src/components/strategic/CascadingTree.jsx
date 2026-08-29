import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import {
  Layers,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FolderGit2,
  Sparkles
} from 'lucide-react';
import { formatCurrency } from '../../utils/calculations';

export const CascadingTree = ({ onSelectProject }) => {
  const { strategyTree, setSelectedProjectId } = useProjects();
  const [expandedNodes, setExpandedNodes] = useState({
    'oe-1': true,
    'oe-2': true,
    'proj-101': true,
    'proj-102': true
  });

  const toggleNode = (id) => {
    setExpandedNodes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
            <h2 className="text-base font-bold text-slate-900">Mapa de Desdobramento Estratégico & Tático</h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Fluxo contínuo: <strong>Nível 1 (Estratégico)</strong> ➔ <strong>Nível 2 (Tático / Projetos)</strong> ➔ <strong>Nível 3 (Operacional / Entregas)</strong>
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
            Nível 1: Estratégico
          </span>
          <span className="px-2.5 py-1 rounded-md bg-teal-50 text-teal-700 border border-teal-200 font-semibold">
            Nível 2: Tático
          </span>
          <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
            Nível 3: Operacional
          </span>
        </div>
      </div>

      {/* Visual Cascading Blocks */}
      <div className="space-y-4">
        {strategyTree.map((strat) => {
          const isStratExpanded = expandedNodes[strat.id];
          return (
            <div key={strat.id} className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/40">
              {/* Nível 1: Estratégico (Card Branco com Borda Lateral) */}
              <div
                onClick={() => toggleNode(strat.id)}
                className="p-4 bg-white hover:bg-slate-50/80 cursor-pointer flex items-center justify-between transition border-l-4 border-l-emerald-500 shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <button className="text-slate-400 hover:text-slate-700">
                    {isStratExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded border border-emerald-200">
                        {strat.code}
                      </span>
                      <h3 className="font-bold text-sm text-slate-900">{strat.title}</h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
                      <span>Meta de Impacto: <strong className="text-slate-800">{strat.kpi}</strong></span>
                      <span>•</span>
                      <span className="text-slate-400">{strat.horizon}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                    {strat.tacticalProjects.length} Projetos Vinculados
                  </span>
                </div>
              </div>

              {/* Nível 2: Tático (Projetos Conectados) */}
              {isStratExpanded && (
                <div className="p-4 pl-8 space-y-3 bg-slate-50/80 border-t border-slate-200/80">
                  {strat.tacticalProjects.map((proj) => {
                    const isProjExpanded = expandedNodes[proj.id];
                    return (
                      <div key={proj.id} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
                        <div
                          onClick={() => toggleNode(proj.id)}
                          className="p-3.5 hover:bg-slate-50 cursor-pointer flex items-center justify-between transition border-l-4 border-l-teal-500"
                        >
                          <div className="flex items-center gap-3">
                            <button className="text-slate-400 hover:text-slate-700">
                              {isProjExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                            </button>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[10px] font-bold text-teal-800 bg-teal-100/70 px-2 py-0.5 rounded border border-teal-200">
                                  {proj.code}
                                </span>
                                <span className="font-semibold text-xs text-slate-900">{proj.title}</span>
                                <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                                  {proj.area}
                                </span>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                                <span>Orçamento: <strong className="text-slate-800">{formatCurrency(proj.budget)}</strong></span>
                                <span>Avanço Físico: <strong className="text-teal-700">{proj.physicalProgress}%</strong></span>
                                <span>Financeiro: <strong className={proj.financialProgress > proj.physicalProgress + 10 ? 'text-rose-600' : 'text-slate-700'}>{proj.financialProgress}%</strong></span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                              proj.status === 'Em Risco'
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : 'bg-teal-50 text-teal-700 border border-teal-200'
                            }`}>
                              {proj.status}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedProjectId(proj.id);
                                if (onSelectProject) onSelectProject('physicalFinancial');
                              }}
                              className="px-2.5 py-1 text-xs font-semibold bg-slate-100 hover:bg-teal-600 text-slate-700 hover:text-white rounded-lg transition border border-slate-200 hover:border-transparent flex items-center gap-1"
                            >
                              <span>Curva S</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Nível 3: Operacional (Entregas de Campo) */}
                        {isProjExpanded && (
                          <div className="p-3 pl-8 bg-slate-50/60 border-t border-slate-100 space-y-2">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                              Entregas Operacionais & Pacotes de Trabalho
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                              {proj.deliverables.map((del) => (
                                <div key={del.id} className="p-3 rounded-lg bg-white border border-slate-200 text-xs flex flex-col justify-between shadow-2xs">
                                  <div className="flex items-start justify-between gap-1">
                                    <span className="font-semibold text-slate-800 leading-tight">{del.name}</span>
                                    <span className={`text-[10px] font-bold shrink-0 px-2 py-0.5 rounded ${
                                      del.status === 'Concluído' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                      del.status === 'Atrasado' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-slate-100 text-slate-600 border border-slate-200'
                                    }`}>
                                      {del.status}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2.5 pt-2 border-t border-slate-100">
                                    <span>Prazo: {del.deadline}</span>
                                    <span className="font-semibold text-amber-700">Peso: {del.physicalWeight}%</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

