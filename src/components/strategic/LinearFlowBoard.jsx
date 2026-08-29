import React from 'react';
import { useProjects } from '../../context/ProjectContext';
import {
  Target,
  ArrowRight,
  TrendingUp,
  Sliders,
  DollarSign,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { formatCurrency, calculatePhysicalFinancialGap } from '../../utils/calculations';
import { TooltipHelp } from '../common/TooltipHelp';

export const LinearFlowBoard = ({ onSelectProject }) => {
  const { strategyTree, projects, selectedProjectId, setSelectedProjectId } = useProjects();
  const objectives = Array.isArray(strategyTree) ? strategyTree : [];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Cabeçalho Limpo e Direto */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Painel de Controle Integrado</h2>
          <p className="text-xs text-slate-500">
            Visão das metas da organização, andamento das entregas e execução do orçamento.
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-[#2D5A27]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2D5A27]"></span> % Físico Realizado
          </span>
          <span className="flex items-center gap-1.5 text-sky-700">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-600"></span> % Orçamento Gasto
          </span>
        </div>
      </div>

      {/* Grid de Eixos de Impacto */}
      <div className="space-y-8">
        {objectives.map((obj, objIdx) => {
          const relatedProjects = (obj.tacticalProjects && obj.tacticalProjects.length > 0)
            ? obj.tacticalProjects
            : projects.filter(p => p.strategicObjective?.includes(obj.code));

          return (
            <div key={obj.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
              
              {/* Topo do Eixo */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-[#1E3F20] font-bold text-xs border border-emerald-200/80">
                      Eixo {objIdx + 1}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{obj.horizon}</span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900">{obj.title}</h3>
                </div>

                <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-right">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Resultado Esperado</p>
                  <p className="text-xs font-extrabold text-[#2D5A27] mt-0.5">{obj.kpi || obj.target}</p>
                </div>
              </div>

              {/* Linhas de Projetos e Entregas do Eixo */}
              <div className="space-y-4">
                {relatedProjects.map((tacProj) => {
                  const fullProject = projects.find(p => p.id === tacProj.id || p.code === tacProj.code) || {
                    id: tacProj.id,
                    name: tacProj.title || tacProj.name,
                    code: tacProj.code,
                    totalBudget: tacProj.budget || 300000,
                    executedBudget: tacProj.spent || 150000,
                    actualPhysical: tacProj.physicalProgress || tacProj.actualPhysical || 50,
                    actualFinancial: tacProj.financialProgress || tacProj.actualFinancial || 50,
                    status: tacProj.status || 'Normal',
                    curveS: [
                      { month: 'Jan', actualPhysical: 10, actualFinancial: 15 },
                      { month: 'Fev', actualPhysical: 30, actualFinancial: 35 },
                      { month: 'Mar', actualPhysical: 50, actualFinancial: 50 }
                    ],
                    deliverables: tacProj.deliverables || []
                  };

                  const gap = calculatePhysicalFinancialGap(fullProject.actualPhysical, fullProject.actualFinancial);
                  const isSelected = selectedProjectId === fullProject.id;
                  const deliverables = tacProj.deliverables || fullProject.deliverables || [];

                  return (
                    <div
                      key={fullProject.id}
                      className={`grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-slate-50/70 border-[#2D5A27] ring-1 ring-[#2D5A27]/20'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {/* Bloco do Projeto (Col 1 a 6) */}
                      <div className="lg:col-span-6 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-sm font-bold text-slate-900">{fullProject.name || tacProj.title}</h4>
                            <p className="text-xs text-slate-500 mt-1">
                              Orçamento: <strong className="text-slate-800">{formatCurrency(fullProject.totalBudget)}</strong> • Gasto: <strong className="text-[#2D5A27]">{formatCurrency(fullProject.executedBudget)}</strong>
                            </p>
                          </div>

                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 border ${
                            fullProject.status === 'Crítico' || fullProject.status === 'Em Risco'
                              ? 'bg-rose-50 border-rose-200 text-rose-700'
                              : fullProject.status === 'Atenção'
                              ? 'bg-amber-50 border-amber-200 text-amber-800'
                              : 'bg-emerald-50 border-emerald-200 text-[#2D5A27]'
                          }`}>
                            {fullProject.status}
                          </span>
                        </div>

                        {/* Comparativo Físico vs Financeiro */}
                        <div className="space-y-1.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                          <div className="space-y-0.5">
                            <div className="flex justify-between text-[11px] font-medium text-slate-600">
                              <span>Entrega Física Realizada</span>
                              <span className="font-bold text-[#2D5A27]">{fullProject.actualPhysical}%</span>
                            </div>
                            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-[#2D5A27] h-full rounded-full" style={{ width: `${fullProject.actualPhysical}%` }}></div>
                            </div>
                          </div>

                          <div className="space-y-0.5">
                            <div className="flex justify-between text-[11px] font-medium text-slate-600">
                              <span>Orçamento Consumido</span>
                              <span className={`font-bold ${fullProject.actualFinancial > fullProject.actualPhysical + 10 ? 'text-rose-600' : 'text-sky-700'}`}>
                                {fullProject.actualFinancial}%
                              </span>
                            </div>
                            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-sky-600 h-full rounded-full" style={{ width: `${fullProject.actualFinancial}%` }}></div>
                            </div>
                          </div>
                        </div>

                        {/* Ação de abrir Curva S */}
                        <div className="flex items-center justify-between pt-1 text-xs">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] text-slate-400">
                              Desvio: <strong className={gap.severity === 'high' ? 'text-rose-600' : gap.severity === 'medium' ? 'text-amber-600' : 'text-[#2D5A27]'}>
                                {gap.gap > 0 ? `+${gap.gap.toFixed(1)}%` : `${gap.gap.toFixed(1)}%`}
                              </strong>
                            </span>
                            <TooltipHelp
                              title="O que indica o Desvio?"
                              text="Mede a diferença percentual entre o orçamento já gasto e a entrega física concluída em campo."
                            />
                          </div>
                          <button
                            onClick={() => {
                              setSelectedProjectId(fullProject.id);
                              onSelectProject(fullProject);
                            }}
                            className="px-2.5 py-1 bg-white hover:bg-emerald-50 text-[#2D5A27] font-bold rounded-lg border border-slate-200 hover:border-emerald-300 transition text-[11px] flex items-center gap-1 shadow-2xs cursor-pointer"
                          >
                            <span>Ver Ritmo & Detalhes</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Bloco de Entregas Práticas de Campo (Col 7 a 12) */}
                      <div className="lg:col-span-6 border-t lg:border-t-0 lg:border-l border-slate-200 pt-3 lg:pt-0 lg:pl-4 space-y-2">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Principais Entregas & Marcos ({deliverables.length})
                        </p>

                        <div className="space-y-1.5">
                          {deliverables.map((del) => (
                            <div
                              key={del.id}
                              className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-200/60 flex items-center justify-between gap-2 text-xs"
                            >
                              <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${
                                  del.status === 'Concluído' ? 'bg-[#2D5A27]' :
                                  del.status === 'Em Andamento' ? 'bg-sky-500' : 'bg-rose-500'
                                }`}></span>
                                <span className="font-semibold text-slate-800">{del.name}</span>
                              </div>

                              <div className="flex items-center gap-2 shrink-0 text-[11px]">
                                <span className="text-slate-400">Prazo: {del.deadline}</span>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                                  del.status === 'Concluído'
                                    ? 'bg-emerald-50 text-[#2D5A27] border-emerald-200'
                                    : del.status === 'Em Andamento'
                                    ? 'bg-sky-50 text-sky-800 border-sky-200'
                                    : 'bg-rose-50 text-rose-700 border-rose-200'
                                }`}>
                                  {del.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
