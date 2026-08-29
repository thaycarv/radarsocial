import React from 'react';
import { useProjects } from '../../context/ProjectContext';
import {
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  DollarSign,
  Briefcase,
  Layers,
  ArrowRight,
  ShieldAlert,
  Search
} from 'lucide-react';
import { formatCurrency, calculatePortfolioMetrics, calculatePhysicalFinancialGap } from '../../utils/calculations';

export const PortfolioOverview = ({ onNavigate }) => {
  const { projects, setSelectedProjectId, currentBrand } = useProjects();
  const [filter, setFilter] = React.useState('Todos');
  const [searchTerm, setSearchTerm] = React.useState('');

  const metrics = calculatePortfolioMetrics(projects);

  const filteredProjects = projects.filter((p) => {
    const matchesFilter = filter === 'Todos' || p.status === filter;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.manager.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner Clean */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 text-[#1E3F20] text-xs font-semibold border border-emerald-200/80">
            <Layers className="w-3.5 h-3.5" />
            <span>Visão Consolidada do Portfólio</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Painel Geral de Acompanhamento
          </h2>
          <p className="text-xs text-slate-500 max-w-2xl">
            Resumo de todos os projetos ativos: comparação entre entregas físicas, orçamento consumido e status de cada iniciativa.
          </p>
        </div>

        <button
          onClick={() => onNavigate('physicalFinancial')}
          className="px-4 py-2 bg-[#2D5A27] hover:bg-[#1E3F20] text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition shadow-xs shrink-0 cursor-pointer"
        >
          <span>Ver Ritmo de Entrega do Projeto Ativo</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* KPI Cards Clean */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Projetos Ativos</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{metrics.totalProjects}</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Em acompanhamento contínuo</p>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-xl text-[#2D5A27] border border-slate-200">
            <Briefcase className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Orçamento Aprovado</p>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">{formatCurrency(metrics.totalBudget)}</h3>
            <p className="text-[11px] text-[#2D5A27] font-medium mt-0.5">{formatCurrency(metrics.totalExecuted)} gastos</p>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-xl text-[#2D5A27] border border-slate-200">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Média Físico vs Gastos</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-xl font-extrabold text-[#2D5A27]">{metrics.avgPhysical.toFixed(1)}%</span>
              <span className="text-xs text-slate-400 font-medium">fís. /</span>
              <span className="text-xl font-extrabold text-slate-800">{metrics.avgFinancial.toFixed(1)}%</span>
              <span className="text-xs text-slate-400 font-medium">gasto</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Desvio médio: {(metrics.overallGap).toFixed(1)} p.p.</p>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-xl text-[#2D5A27] border border-slate-200">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Saúde do Portfólio</p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                {metrics.healthyProjects} Normais
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                {metrics.warningProjects} Atenção
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-50 text-rose-800 border border-rose-200">
                {metrics.criticalProjects} Críticos
              </span>
            </div>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-xl text-rose-600 border border-slate-200">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Projects Table & Filters */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Projetos em Acompanhamento Ativo</h3>
            <p className="text-xs text-slate-500">Clique para selecionar e abrir os detalhes do projeto</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar projeto, código..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 w-52"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
              {['Todos', 'Normal', 'Atenção', 'Crítico'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilter(st)}
                  className={`px-2.5 py-1 rounded-md font-medium transition ${
                    filter === st ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider border-y border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Código / Projeto</th>
                <th className="py-2.5 px-4">Gestor & Sponsor</th>
                <th className="py-2.5 px-4">Orçamento</th>
                <th className="py-2.5 px-4 text-center">Físico (% Prev / Real)</th>
                <th className="py-2.5 px-4 text-center">Financeiro (% Prev / Real)</th>
                <th className="py-2.5 px-4 text-center">Descompasso</th>
                <th className="py-2.5 px-4 text-center">Status</th>
                <th className="py-2.5 px-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProjects.map((project) => {
                const gapAnalysis = calculatePhysicalFinancialGap(project.actualPhysical, project.actualFinancial);
                return (
                  <tr
                    key={project.id}
                    className="hover:bg-slate-50/80 transition cursor-pointer"
                    onClick={() => {
                      setSelectedProjectId(project.id);
                      onNavigate('physicalFinancial');
                    }}
                  >
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 text-sm hover:text-teal-700 transition">
                        {project.name}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">{project.code}</div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="text-slate-800 font-medium">{project.manager}</div>
                      <div className="text-[11px] text-slate-400">{project.sponsor}</div>
                    </td>

                    <td className="py-3 px-4 font-semibold text-slate-800">
                      <div>{formatCurrency(project.totalBudget)}</div>
                      <div className="text-[11px] text-slate-400">{formatCurrency(project.executedBudget)} gasto</div>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1 font-medium">
                        <span className="text-slate-400">{project.plannedPhysical}%</span>
                        <span className="text-slate-300">/</span>
                        <span className="font-bold text-teal-700">{project.actualPhysical}%</span>
                      </div>
                      <div className="w-20 bg-slate-100 h-1.5 rounded-full mx-auto mt-1 overflow-hidden">
                        <div className="bg-teal-600 h-full rounded-full" style={{ width: `${project.actualPhysical}%` }}></div>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1 font-medium">
                        <span className="text-slate-400">{project.plannedFinancial}%</span>
                        <span className="text-slate-300">/</span>
                        <span className={`font-bold ${project.actualFinancial > project.actualPhysical + 10 ? 'text-rose-600' : 'text-slate-800'}`}>
                          {project.actualFinancial}%
                        </span>
                      </div>
                      <div className="w-20 bg-slate-100 h-1.5 rounded-full mx-auto mt-1 overflow-hidden">
                        <div className="bg-sky-600 h-full rounded-full" style={{ width: `${project.actualFinancial}%` }}></div>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className={`inline-block font-bold text-xs px-2 py-0.5 rounded-md border ${
                        gapAnalysis.severity === 'high' ? 'bg-rose-50 border-rose-200 text-rose-700' :
                        gapAnalysis.severity === 'medium' ? 'bg-amber-50 border-amber-200 text-amber-800' :
                        'bg-emerald-50 border-emerald-200 text-emerald-800'
                      }`}>
                        {gapAnalysis.gap > 0 ? `+${gapAnalysis.gap.toFixed(1)}%` : `${gapAnalysis.gap.toFixed(1)}%`}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        project.status === 'Crítico'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : project.status === 'Atenção'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}>
                        {project.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProjectId(project.id);
                          onNavigate('operations');
                        }}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-teal-600 text-slate-700 hover:text-white rounded-md transition font-medium text-xs border border-slate-200"
                      >
                        Follow-up
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

