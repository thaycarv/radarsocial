import React from 'react';
import { Printer, X } from 'lucide-react';
import { useProjects } from '../../context/ProjectContext';
import { formatCurrency, formatPercent } from '../../utils/calculations';

export const ExecutiveReportModal = () => {
  const {
    cutoff,
    projects,
    portfolioMetrics,
    showReportModal,
    setShowReportModal
  } = useProjects();

  if (!showReportModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto print-modal-backdrop">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 print-report-container">
        <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between rounded-t-2xl print:hidden">
          <span className="font-semibold text-xs">
            Resumo Executivo para Impressão / PDF
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs transition cursor-pointer flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Salvar PDF</span>
            </button>
            <button
              type="button"
              onClick={() => setShowReportModal(false)}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition cursor-pointer"
              aria-label="Fechar resumo"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-5 text-slate-900 bg-white">
          <div className="border-b-2 border-slate-900 pb-3 flex items-start justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">
                RadarSocial — Posição Consolidada de Programas
              </h2>
              <p className="text-xs text-slate-600">
                Relatório de entregas físicas, execução orçamentária, conciliação fiscal e resultados
              </p>
            </div>
            <div className="text-right text-xs">
              <p className="font-bold text-slate-900">Referência: {cutoff.formattedDate}</p>
              <p className="text-slate-500">Emitido em {new Date().toLocaleDateString('pt-BR')}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-[11px] font-medium text-slate-500">Orçamento Total</p>
              <p className="text-sm font-extrabold text-slate-900 mt-0.5">
                {formatCurrency(portfolioMetrics.totalBudget)}
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-[11px] font-medium text-slate-500">Orçamento Utilizado</p>
              <p className="text-sm font-extrabold text-sky-800 mt-0.5">
                {formatCurrency(portfolioMetrics.totalExecuted)} ({formatPercent(portfolioMetrics.weightedActualFinancial)})
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-[11px] font-medium text-slate-500">Entregas Realizadas</p>
              <p className="text-sm font-extrabold text-[#2D5A27] mt-0.5">
                {formatPercent(portfolioMetrics.weightedActualPhysical)} (meta {formatPercent(portfolioMetrics.weightedPlannedPhysical)})
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-[11px] font-medium text-slate-500">Prestação de Contas</p>
              <p className="text-sm font-extrabold text-emerald-800 mt-0.5">
                {formatPercent(portfolioMetrics.proofRegularityPercent)} regular ({formatCurrency(portfolioMetrics.totalPendingProofs)} em validação)
              </p>
            </div>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              1. Execução Física, Orçamento e Conciliação por Programa
            </h3>
            <table className="w-full text-left text-[11px] border border-slate-300">
              <thead className="bg-slate-100 text-slate-800 font-bold">
                <tr>
                  <th className="py-1.5 px-2.5">Programa</th>
                  <th className="py-1.5 px-2.5 text-center">Status</th>
                  <th className="py-1.5 px-2.5 text-center">Entregas (Real / Meta)</th>
                  <th className="py-1.5 px-2.5">Orçado</th>
                  <th className="py-1.5 px-2.5">Pago</th>
                  <th className="py-1.5 px-2.5">Saldo Livre</th>
                  <th className="py-1.5 px-2.5">Conciliação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {projects.map((p) => (
                  <tr key={p.id}>
                    <td className="py-1.5 px-2.5">
                      <strong>{p.code} — {p.name}</strong>
                      <span className="block text-[10px] text-slate-600">
                        {p.funder} · Coord.: {p.manager}
                      </span>
                    </td>
                    <td className="py-1.5 px-2.5 text-center font-semibold">
                      {p.statusMeta.label}
                    </td>
                    <td className="py-1.5 px-2.5 text-center">
                      <strong>{formatPercent(p.actualPhysical)}</strong> / {formatPercent(p.plannedPhysical)}
                    </td>
                    <td className="py-1.5 px-2.5">{formatCurrency(p.totalBudget)}</td>
                    <td className="py-1.5 px-2.5 font-semibold">
                      {formatCurrency(p.executedBudget)} ({formatPercent(p.actualFinancial)})
                    </td>
                    <td className="py-1.5 px-2.5">{formatCurrency(p.freeBalance)}</td>
                    <td className="py-1.5 px-2.5 text-slate-700">
                      {p.pendingProofs > 0
                        ? `${formatCurrency(p.pendingProofs)} sem NF`
                        : p.retainedBudget > 0
                        ? `${formatCurrency(p.retainedBudget)} retidos (CND)`
                        : '100% comprovado'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              2. Principais Resultados Apurados
            </h3>
            <table className="w-full text-left text-[11px] border border-slate-300">
              <thead className="bg-slate-100 text-slate-800 font-bold">
                <tr>
                  <th className="py-1.5 px-2.5">Programa</th>
                  <th className="py-1.5 px-2.5">Indicador de Resultado</th>
                  <th className="py-1.5 px-2.5 text-center">Inicial → Meta</th>
                  <th className="py-1.5 px-2.5 text-center">Atual</th>
                  <th className="py-1.5 px-2.5">Meio de Verificação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {projects.map((p) => {
                  const outcome = p.impactMetrics.find((m) => m.level === 'Resultado') || p.impactMetrics[0];
                  const fmtVal = (v) =>
                    outcome.unit === 'R$' ? formatCurrency(v) : `${v} ${outcome.unit}`;
                  return (
                    <tr key={p.id}>
                      <td className="py-1.5 px-2.5 font-semibold">{p.code}</td>
                      <td className="py-1.5 px-2.5">{outcome.indicator}</td>
                      <td className="py-1.5 px-2.5 text-center">
                        {fmtVal(outcome.baseline)} → {fmtVal(outcome.target)}
                      </td>
                      <td className="py-1.5 px-2.5 text-center font-bold">{fmtVal(outcome.actual)}</td>
                      <td className="py-1.5 px-2.5 text-slate-600">{outcome.verificationSource}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-[11px] text-slate-500">
            <span>RadarSocial · Posição em {cutoff.formattedDate}</span>
            <span>Coordenação de Projetos e Operações</span>
          </div>
        </div>
      </div>
    </div>
  );
};
