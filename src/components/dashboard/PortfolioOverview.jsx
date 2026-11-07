import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import {
  TrendingUp,
  DollarSign,
  Briefcase,
  ArrowRight,
  AlertTriangle,
  Search,
  FileCheck,
  Printer
} from 'lucide-react';
import {
  formatCurrency,
  formatPercent,
  formatPP,
  formatIndex
} from '../../utils/calculations';
import { TooltipHelp } from '../common/TooltipHelp';

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
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter((p) => {
    const matchesFilter = filter === 'Todos' || p.overallStatus === filter;
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q) ||
      p.funder.toLowerCase().includes(q) ||
      p.manager.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Cabeçalho da Carteira */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-[#2D5A27]">
            Visão Consolidada • Data de corte: {cutoff.formattedDate}
          </p>
          <h1 className="text-xl font-bold text-slate-900">
            Carteira de Programas Socioambientais
          </h1>
          <p className="text-xs text-slate-600 max-w-2xl">
            Monitoramento simultâneo de prazo (avanço físico ponderado por entregas), execução orçamentária por rubrica e pendências de comprovação fiscal.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <button
            type="button"
            onClick={() => onNavigate('impact')}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200/80 text-slate-800 text-xs font-semibold rounded-lg border border-slate-200 flex items-center gap-1.5 transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-[#2D5A27]" />
            <span>Indicadores & Relatório A4</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('physicalFinancial')}
            className="px-4 py-2 bg-[#2D5A27] hover:bg-[#1E3F20] text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition shadow-xs cursor-pointer"
          >
            <span>Abrir Medição do Programa</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4 Cards de Síntese Ponderada */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs flex items-start justify-between">
          <div>
            <p className="text-xs text-slate-600 font-semibold">Situação da Carteira</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">
              {portfolioMetrics.totalProjects} programas
            </p>
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                {portfolioMetrics.healthyCount} Normal
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                {portfolioMetrics.warningCount} Atenção
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                {portfolioMetrics.criticalCount} Crítico
              </span>
            </div>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-xl text-[#2D5A27] border border-slate-200">
            <Briefcase className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs flex items-start justify-between">
          <div>
            <p className="text-xs text-slate-600 font-semibold">Orçamento Total Aprovado</p>
            <p className="text-xl font-extrabold text-slate-900 mt-1">
              {formatCurrency(portfolioMetrics.totalBudget)}
            </p>
            <p className="text-xs text-slate-600 mt-1">
              Pago: <strong className="text-slate-900">{formatCurrency(portfolioMetrics.totalExecuted)}</strong> • Saldo: {formatCurrency(portfolioMetrics.totalRemaining)}
            </p>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-xl text-[#2D5A27] border border-slate-200">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-xs text-slate-600 font-semibold">Avanço Ponderado</p>
              <TooltipHelp
                position="bottom"
                title="Por que média ponderada?"
                text="Tanto o % físico quanto o % financeiro da carteira são ponderados pelo orçamento de cada programa (VA Total / Orçamento Total), evitando que projetos menores distorçam a leitura global."
              />
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-extrabold text-[#2D5A27]">
                {formatPercent(portfolioMetrics.weightedActualPhysical)}
              </span>
              <span className="text-xs text-slate-500">fís. /</span>
              <span className="text-xl font-extrabold text-sky-700">
                {formatPercent(portfolioMetrics.weightedActualFinancial)}
              </span>
              <span className="text-xs text-slate-500">fin.</span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              IDP: <strong>{formatIndex(portfolioMetrics.portfolioSPI)}</strong> • IDC: <strong>{formatIndex(portfolioMetrics.portfolioCPI)}</strong>
            </p>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-xl text-[#2D5A27] border border-slate-200">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-xs text-slate-600 font-semibold">Comprovação Fiscal</p>
              <TooltipHelp
                position="bottom"
                title="Risco de Glosa em Prestação de Contas"
                text="Soma das despesas já pagas cujas notas fiscais, recibos ou termos de aceite ainda aguardam conferência para prestação de contas."
              />
            </div>
            <p className="text-xl font-extrabold text-amber-700 mt-1">
              {formatCurrency(portfolioMetrics.totalPendingProofs)}
            </p>
            <p className="text-xs text-slate-600 mt-1">
              Aprovado: <strong className="text-emerald-700">{formatCurrency(portfolioMetrics.totalApprovedProofs)}</strong>
            </p>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-xl text-amber-600 border border-slate-200">
            <FileCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Painel de Alertas Automáticos por Regras Explícitas */}
      {governanceAlerts.length > 0 && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <h2 className="text-sm font-bold text-slate-900">
                Alertas Automáticos por Regras de Governança ({governanceAlerts.length})
              </h2>
              <TooltipHelp
                position="right"
                title="Como os alertas funcionam?"
                text="Alertas determinísticos calculados diretamente sobre os dados das entregas e rubricas: atraso > 10 p.p., sobre-custo > 15 p.p., comprovação pendente ≥ R$ 10 mil ou pagamento retido < -10 p.p."
              />
            </div>
            <span className="text-xs text-slate-500">
              Clique em um alerta para inspecionar a medição ou o plano 5W2H
            </span>
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
                  className={`text-left p-3.5 rounded-xl border ${borderStyle} hover:shadow-xs transition cursor-pointer space-y-1`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-900">{alert.projectName}</span>
                    <span className="text-[11px] font-mono text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {alert.rule}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-800">{alert.title}</p>
                  <p className="text-xs text-slate-600">{alert.detail}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Tabela da Carteira de Programas */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Quadro Comparativo dos Programas
            </h2>
            <p className="text-xs text-slate-600">
              Semáforos separados de <strong>Prazo</strong> (Físico Real − Planejado) e <strong>Custo</strong> (Financeiro − Físico), expressos em pontos percentuais (p.p.).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                aria-label="Buscar programa"
                placeholder="Buscar programa, financiador..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-500 focus:outline-none focus:border-[#2D5A27] w-56"
              />
            </div>

            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
              {['Todos', 'Normal', 'Atenção', 'Crítico'].map((st) => (
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
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-semibold uppercase tracking-wider border-y border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Programa / Eixo</th>
                <th className="py-2.5 px-3">Financiador / Gestor</th>
                <th className="py-2.5 px-3">Orçamento / Pago</th>
                <th className="py-2.5 px-3 text-center">Físico (Prev / Real)</th>
                <th className="py-2.5 px-3 text-center">Financ. (Prev / Real)</th>
                <th className="py-2.5 px-3 text-center">Semáforo Prazo</th>
                <th className="py-2.5 px-3 text-center">Semáforo Custo</th>
                <th className="py-2.5 px-3 text-right">Ações</th>
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
                    className={`hover:bg-slate-50/80 transition cursor-pointer ${
                      isSelected ? 'bg-emerald-50/30' : ''
                    }`}
                  >
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900 text-xs">
                        <span className="font-mono text-[11px] text-[#2D5A27] mr-1.5">{p.code}</span>
                        {p.name}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{p.strategicAxis}</div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="text-slate-800 font-medium">{p.funder}</div>
                      <div className="text-[11px] text-slate-500">Gestão: {p.manager}</div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900">{formatCurrency(p.totalBudget)}</div>
                      <div className="text-[11px] text-slate-600">
                        Pago: {formatCurrency(p.executedBudget)}
                      </div>
                    </td>

                    <td className="py-3 px-3 text-center">
                      <div className="font-medium">
                        <span className="text-slate-500">{formatPercent(p.plannedPhysical)}</span>
                        <span className="text-slate-400 mx-1">/</span>
                        <span className="font-bold text-[#2D5A27]">
                          {formatPercent(p.actualPhysical)}
                        </span>
                      </div>
                      <div className="w-20 bg-slate-100 h-1.5 rounded-full mx-auto mt-1 overflow-hidden">
                        <div
                          className="bg-[#2D5A27] h-full rounded-full"
                          style={{ width: `${Math.min(100, p.actualPhysical)}%` }}
                        />
                      </div>
                    </td>

                    <td className="py-3 px-3 text-center">
                      <div className="font-medium">
                        <span className="text-slate-500">{formatPercent(p.plannedFinancial)}</span>
                        <span className="text-slate-400 mx-1">/</span>
                        <span
                          className={`font-bold ${
                            p.cost.severity === 'high' ? 'text-rose-600' : 'text-sky-700'
                          }`}
                        >
                          {formatPercent(p.actualFinancial)}
                        </span>
                      </div>
                      <div className="w-20 bg-slate-100 h-1.5 rounded-full mx-auto mt-1 overflow-hidden">
                        <div
                          className="bg-sky-600 h-full rounded-full"
                          style={{ width: `${Math.min(100, p.actualFinancial)}%` }}
                        />
                      </div>
                    </td>

                    <td className="py-3 px-3 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-md border font-semibold text-[11px] ${p.schedule.badgeClass}`}
                      >
                        {p.schedule.label} ({formatPP(p.schedule.gap)})
                      </span>
                    </td>

                    <td className="py-3 px-3 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-md border font-semibold text-[11px] ${p.cost.badgeClass}`}
                      >
                        {p.cost.label} ({formatPP(p.cost.gap)})
                      </span>
                    </td>

                    <td className="py-3 px-3 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProjectId(p.id);
                            onNavigate('physicalFinancial');
                          }}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-[#2D5A27] text-slate-700 hover:text-white rounded-md transition font-medium text-xs border border-slate-200 cursor-pointer"
                        >
                          Medição
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProjectId(p.id);
                            onNavigate('operations');
                          }}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-800 text-slate-700 hover:text-white rounded-md transition font-medium text-xs border border-slate-200 cursor-pointer"
                        >
                          5W2H
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-slate-50 border-t-2 border-slate-200 font-bold text-slate-900">
              <tr>
                <td className="py-3 px-3" colSpan={2}>
                  Total / Média Ponderada da Carteira ({projects.length} programas)
                </td>
                <td className="py-3 px-3">
                  <div>{formatCurrency(portfolioMetrics.totalBudget)}</div>
                  <div className="text-[11px] font-medium text-slate-600">
                    Pago: {formatCurrency(portfolioMetrics.totalExecuted)}
                  </div>
                </td>
                <td className="py-3 px-3 text-center">
                  <span className="text-slate-500 font-medium">
                    {formatPercent(portfolioMetrics.weightedPlannedPhysical)}
                  </span>
                  <span className="mx-1 text-slate-400">/</span>
                  <span className="text-[#2D5A27]">
                    {formatPercent(portfolioMetrics.weightedActualPhysical)}
                  </span>
                </td>
                <td className="py-3 px-3 text-center text-sky-700">
                  {formatPercent(portfolioMetrics.weightedActualFinancial)}
                </td>
                <td className="py-3 px-3 text-center text-slate-700">
                  {formatPP(portfolioMetrics.weightedScheduleGap)} (IDP {formatIndex(portfolioMetrics.portfolioSPI)})
                </td>
                <td className="py-3 px-3 text-center text-slate-700">
                  {formatPP(portfolioMetrics.weightedCostGap)} (IDC {formatIndex(portfolioMetrics.portfolioCPI)})
                </td>
                <td className="py-3 px-3"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
