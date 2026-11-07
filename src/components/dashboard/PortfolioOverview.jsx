import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import {
  TrendingUp,
  DollarSign,
  Briefcase,
  AlertTriangle,
  FileCheck,
  ChevronRight,
  X
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

  const toggleStatusFilter = (targetStatus) => {
    setFilter((prev) => (prev === targetStatus ? 'Todos' : targetStatus));
  };

  const filteredProjects = projects.filter((p) => {
    if (filter === 'Todos') return true;
    if (filter === 'No prazo') return p.overallStatus === 'Normal';
    if (filter === 'Em atenção') return p.overallStatus !== 'Normal';
    return true;
  });

  const visibleProjectIds = new Set(filteredProjects.map((p) => p.id));
  const filteredAlerts = governanceAlerts.filter((a) => visibleProjectIds.has(a.projectId));

  const renderStatusBadge = (project) => {
    if (project.overallStatus === 'Crítico') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
          Requer ação
        </span>
      );
    }
    if (project.cost.label === 'NF retida') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
          No prazo · NF retida
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
        No prazo
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Título enxuto + indicador de filtro ativo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Portfólio de Programas</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Posição consolidada em {cutoff.formattedDate}
          </p>
        </div>

        {filter !== 'Todos' && (
          <button
            type="button"
            onClick={() => setFilter('Todos')}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition cursor-pointer"
          >
            <span>Filtro: {filter} ({filteredProjects.length})</span>
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* 4 Cards Principais - Limpos e Executivos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Saúde da Carteira */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs flex items-start justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Saúde da Carteira</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">
              {portfolioMetrics.totalProjects} programas
            </p>
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              <button
                type="button"
                onClick={() => toggleStatusFilter('No prazo')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold border transition cursor-pointer ${
                  filter === 'No prazo'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                {portfolioMetrics.healthyCount} no prazo
              </button>
              <button
                type="button"
                onClick={() => toggleStatusFilter('Em atenção')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold border transition cursor-pointer ${
                  filter === 'Em atenção'
                    ? 'bg-rose-600 text-white border-rose-600 shadow-2xs'
                    : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                }`}
              >
                {portfolioMetrics.criticalCount + portfolioMetrics.warningCount} em atenção
              </button>
            </div>
          </div>
          <div className="p-2 bg-slate-50 rounded-lg text-[#2D5A27] border border-slate-200">
            <Briefcase className="w-4 h-4" />
          </div>
        </div>

        {/* Card 2: Orçamento Total */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs flex items-start justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Orçamento Total</p>
            <p className="text-xl font-extrabold text-slate-900 mt-1">
              {formatCurrency(portfolioMetrics.totalBudget)}
            </p>
            <p className="text-xs text-slate-500 mt-1.5">
              Utilizado: <strong className="text-slate-800">{formatCurrency(portfolioMetrics.totalExecuted)}</strong> ({formatPercent(portfolioMetrics.weightedActualFinancial)})
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Saldo em caixa: {formatCurrency(portfolioMetrics.totalRemaining)}
            </p>
          </div>
          <div className="p-2 bg-slate-50 rounded-lg text-[#2D5A27] border border-slate-200">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>

        {/* Card 3: Entregas Realizadas */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs flex items-start justify-between">
          <div className="flex-1 pr-2">
            <p className="text-xs text-slate-500 font-medium">Entregas Realizadas</p>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-extrabold text-[#2D5A27]">
                {formatPercent(portfolioMetrics.weightedActualPhysical)}
              </span>
              <span className="text-xs text-slate-400">concluído</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
              <div
                className="bg-[#2D5A27] h-full rounded-full"
                style={{ width: `${Math.min(100, portfolioMetrics.weightedActualPhysical)}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Média ponderada do escopo físico
            </p>
          </div>
          <div className="p-2 bg-slate-50 rounded-lg text-[#2D5A27] border border-slate-200">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>

        {/* Card 4: Prestação de Contas */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs flex items-start justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Prestação de Contas</p>
            <p className="text-xl font-extrabold text-slate-900 mt-1">
              {formatPercent(portfolioMetrics.proofRegularityPercent)} <span className="text-xs font-normal text-slate-500">regular</span>
            </p>
            <p className="text-xs text-slate-500 mt-1.5">
              Aprovado: <strong className="text-emerald-700">{formatCurrency(portfolioMetrics.totalApprovedProofs)}</strong>
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Em validação: {formatCurrency(portfolioMetrics.totalPendingProofs)}
            </p>
          </div>
          <div className="p-2 bg-slate-50 rounded-lg text-emerald-700 border border-slate-200">
            <FileCheck className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Tabela de Programas - 5 Colunas Claras e Humanas */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900">
              {filter === 'Todos' ? 'Programas em Execução' : `Programas · ${filter}`}
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold border border-slate-200">
              {filteredProjects.length}
            </span>
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs self-start">
            {['Todos', 'No prazo', 'Em atenção'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setFilter(st)}
                className={`px-3 py-1 rounded-md font-medium transition cursor-pointer ${
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
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3">Entregas</th>
                <th className="py-2.5 px-3">Orçamento Utilizado</th>
                <th className="py-2.5 px-3">Situação Atual</th>
                <th className="py-2.5 px-2 w-8"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    Nenhum programa encontrado com o filtro <strong>{filter}</strong>.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((p) => {
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
                      {/* 1. Programa & Financiador */}
                      <td className="py-3.5 px-3">
                        <div className="font-bold text-slate-900 text-xs">
                          <span className="font-mono text-[11px] text-[#2D5A27] mr-1.5">{p.code}</span>
                          {p.name}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {p.funder} · {p.manager}
                        </div>
                      </td>

                      {/* 2. Status Geral Unificado */}
                      <td className="py-3.5 px-3 text-center whitespace-nowrap">
                        {renderStatusBadge(p)}
                      </td>

                      {/* 3. Entregas Físicas */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{formatPercent(p.actualPhysical)}</span>
                          <span className="text-[11px] text-slate-400">meta {formatPercent(p.plannedPhysical)}</span>
                        </div>
                        <div className="w-24 bg-slate-100 h-1.5 rounded-full mt-1 overflow-hidden">
                          <div
                            className="bg-[#2D5A27] h-full rounded-full"
                            style={{ width: `${Math.min(100, p.actualPhysical)}%` }}
                          />
                        </div>
                      </td>

                      {/* 4. Orçamento Utilizado */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="font-bold text-slate-900">
                          {formatCurrency(p.executedBudget)}{' '}
                          <span className="text-[11px] font-normal text-slate-500">
                            ({formatPercent(p.actualFinancial)})
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Total: {formatCurrency(p.totalBudget)}
                        </div>
                      </td>

                      {/* 5. Situação Atual / Headline */}
                      <td className="py-3.5 px-3 max-w-xs sm:max-w-sm">
                        <p className="text-xs text-slate-700 leading-snug">
                          {p.operationalHeadline || p.name}
                        </p>
                      </td>

                      {/* 6. Seta de Navegação */}
                      <td className="py-3.5 px-2 text-right">
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#2D5A27] inline" />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Prioridades de Gestão do Mês (apenas ações reais necessárias) */}
      {filteredAlerts.length > 0 && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <h2 className="text-sm font-bold text-slate-900">
              Prioridades de Gestão do Mês ({filteredAlerts.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredAlerts.map((alert) => {
              const borderStyle =
                alert.severity === 'high'
                  ? 'border-l-4 border-l-rose-600 bg-rose-50/40 border-slate-200'
                  : 'border-l-4 border-l-amber-500 bg-amber-50/40 border-slate-200';

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
                    <p className="text-xs font-semibold text-slate-800">{alert.title}</p>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{alert.detail}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 shrink-0" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
