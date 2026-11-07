import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import {
  TrendingUp,
  DollarSign,
  Briefcase,
  AlertTriangle,
  FileCheck,
  ChevronRight
} from 'lucide-react';
import { formatCurrency, formatPercent } from '../../utils/calculations';

export const PortfolioOverview = ({ onNavigate }) => {
  const {
    cutoff,
    projects,
    selectedProjectId,
    setSelectedProjectId,
    portfolioMetrics,
    governanceAlerts
  } = useProjects();

  const [filter, setFilter] = useState('Todos');

  const filteredProjects = projects.filter(
    (p) => filter === 'Todos' || p.overallStatus === filter
  );

  return (
    <div className="space-y-6">
      {/* Título enxuto */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Portfólio de Programas</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Posição consolidada em {cutoff.formattedDate}
          </p>
        </div>
      </div>

      {/* 4 Cards Principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs flex items-start justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Programas Ativos</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">
              {portfolioMetrics.totalProjects}
            </p>
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                {portfolioMetrics.healthyCount} normal
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                {portfolioMetrics.warningCount} atenção
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                {portfolioMetrics.criticalCount} crítico
              </span>
            </div>
          </div>
          <div className="p-2 bg-slate-50 rounded-lg text-[#2D5A27] border border-slate-200">
            <Briefcase className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs flex items-start justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Orçamento Total</p>
            <p className="text-xl font-extrabold text-slate-900 mt-1">
              {formatCurrency(portfolioMetrics.totalBudget)}
            </p>
            <p className="text-xs text-slate-500 mt-1.5">
              Pago: <strong className="text-slate-800">{formatCurrency(portfolioMetrics.totalExecuted)}</strong> · Saldo: {formatCurrency(portfolioMetrics.totalRemaining)}
            </p>
          </div>
          <div className="p-2 bg-slate-50 rounded-lg text-[#2D5A27] border border-slate-200">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs flex items-start justify-between">
          <div className="flex-1 pr-2">
            <p className="text-xs text-slate-500 font-medium">Execução da Carteira</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-extrabold text-[#2D5A27]">
                {formatPercent(portfolioMetrics.weightedActualPhysical)}
              </span>
              <span className="text-xs text-slate-400">físico ·</span>
              <span className="text-base font-bold text-sky-700">
                {formatPercent(portfolioMetrics.weightedActualFinancial)}
              </span>
              <span className="text-xs text-slate-400">pago</span>
            </div>
            <div className="mt-2 space-y-1">
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#2D5A27] h-full rounded-full"
                  style={{ width: `${Math.min(100, portfolioMetrics.weightedActualPhysical)}%` }}
                />
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-sky-600 h-full rounded-full"
                  style={{ width: `${Math.min(100, portfolioMetrics.weightedActualFinancial)}%` }}
                />
              </div>
            </div>
          </div>
          <div className="p-2 bg-slate-50 rounded-lg text-[#2D5A27] border border-slate-200">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs flex items-start justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Pendente de Nota</p>
            <p className="text-xl font-extrabold text-amber-700 mt-1">
              {formatCurrency(portfolioMetrics.totalPendingProofs)}
            </p>
            <p className="text-xs text-slate-500 mt-1.5">
              Comprovado: <strong className="text-emerald-700">{formatCurrency(portfolioMetrics.totalApprovedProofs)}</strong>
            </p>
          </div>
          <div className="p-2 bg-slate-50 rounded-lg text-amber-600 border border-slate-200">
            <FileCheck className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Pontos de Atenção */}
      {governanceAlerts.length > 0 && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <h2 className="text-sm font-bold text-slate-900">
              Pontos de Atenção ({governanceAlerts.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {governanceAlerts.map((alert) => {
              const borderStyle =
                alert.severity === 'high'
                  ? 'border-l-4 border-l-rose-600 bg-rose-50/40 border-slate-200'
                  : alert.severity === 'medium'
                  ? 'border-l-4 border-l-amber-500 bg-amber-50/40 border-slate-200'
                  : 'border-l-4 border-l-sky-600 bg-sky-50/40 border-slate-200';

              return (
                <button
                  key={alert.id}
                  type="button"
                  onClick={() => {
                    setSelectedProjectId(alert.projectId);
                    onNavigate(alert.targetTab);
                  }}
                  className={`text-left p-3.5 rounded-xl border ${borderStyle} hover:shadow-xs transition cursor-pointer flex items-center justify-between gap-3 group`}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                        {alert.category}
                      </span>
                      <span className="text-xs font-bold text-slate-900 truncate">
                        {alert.projectName}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-800">{alert.title}</p>
                    <p className="text-[11px] text-slate-500">{alert.detail}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 shrink-0" />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Tabela de Programas */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-sm font-bold text-slate-900">Programas</h2>

          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs self-start">
            {['Todos', 'Crítico', 'Atenção', 'Normal'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setFilter(st)}
                className={`px-2.5 py-1 rounded-md font-medium transition cursor-pointer ${
                  filter === st
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-y border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Programa</th>
                <th className="py-2.5 px-3">Orçamento</th>
                <th className="py-2.5 px-3 text-center">Avanço Físico</th>
                <th className="py-2.5 px-3 text-center">Pago</th>
                <th className="py-2.5 px-3 text-center">Prazo</th>
                <th className="py-2.5 px-3 text-center">Custo</th>
                <th className="py-2.5 px-2 w-8"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProjects.map((p) => {
                const isSelected = selectedProjectId === p.id;
                return (
                  <tr
                    key={p.id}
                    onClick={() => {
                      setSelectedProjectId(p.id);
                      onNavigate('physicalFinancial');
                    }}
                    className={`hover:bg-slate-50/80 transition cursor-pointer group ${
                      isSelected ? 'bg-emerald-50/30' : ''
                    }`}
                  >
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-slate-900 text-xs">
                        <span className="font-mono text-[11px] text-[#2D5A27] mr-1.5">{p.code}</span>
                        {p.name}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {p.funder} · {p.manager}
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <div className="font-bold text-slate-900">{formatCurrency(p.totalBudget)}</div>
                      <div className="text-[11px] text-slate-500">
                        Pago: {formatCurrency(p.executedBudget)}
                      </div>
                    </td>

                    <td className="py-3.5 px-3 text-center">
                      <div>
                        <span className="font-bold text-[#2D5A27]">{formatPercent(p.actualPhysical)}</span>
                        <span className="text-[11px] text-slate-400 ml-1">
                          / meta {formatPercent(p.plannedPhysical)}
                        </span>
                      </div>
                      <div className="w-20 bg-slate-100 h-1.5 rounded-full mx-auto mt-1 overflow-hidden">
                        <div
                          className="bg-[#2D5A27] h-full rounded-full"
                          style={{ width: `${Math.min(100, p.actualPhysical)}%` }}
                        />
                      </div>
                    </td>

                    <td className="py-3.5 px-3 text-center">
                      <div
                        className={`font-bold ${
                          p.cost.severity === 'high' ? 'text-rose-600' : 'text-sky-700'
                        }`}
                      >
                        {formatPercent(p.actualFinancial)}
                      </div>
                      <div className="w-20 bg-slate-100 h-1.5 rounded-full mx-auto mt-1 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            p.cost.severity === 'high' ? 'bg-rose-500' : 'bg-sky-600'
                          }`}
                          style={{ width: `${Math.min(100, p.actualFinancial)}%` }}
                        />
                      </div>
                    </td>

                    <td className="py-3.5 px-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full border font-semibold text-[11px] ${p.schedule.badgeClass}`}
                      >
                        {p.schedule.label}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full border font-semibold text-[11px] ${p.cost.badgeClass}`}
                      >
                        {p.cost.label}
                      </span>
                    </td>

                    <td className="py-3.5 px-2 text-right">
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#2D5A27] inline" />
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
