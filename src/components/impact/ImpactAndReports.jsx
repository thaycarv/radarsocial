import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import {
  Target,
  Printer,
  ExternalLink,
  Plus,
  Trash2,
  FileText,
  Edit2,
  Check,
  X,
  Users
} from 'lucide-react';
import {
  formatCurrency,
  formatPercent,
  formatPP,
  formatIndex
} from '../../utils/calculations';
import { TooltipHelp } from '../common/TooltipHelp';

export const ImpactAndReports = () => {
  const {
    cutoff,
    projects,
    portfolioMetrics,
    evidences,
    updateImpactActual,
    addEvidence,
    deleteEvidence
  } = useProjects();

  const [programFilter, setProgramFilter] = useState('Todos');
  const [showReportModal, setShowReportModal] = useState(false);
  const [editingMetricId, setEditingMetricId] = useState(null);
  const [metricInput, setMetricInput] = useState(0);

  const [showEvidenceForm, setShowEvidenceForm] = useState(false);
  const [evidenceForm, setEvidenceForm] = useState({
    projectId: projects[0]?.id || 'prog-101',
    category: 'Prestação de Contas',
    title: '',
    referenceCode: '',
    responsible: '',
    externalUrl: '',
    notes: ''
  });

  const visibleProjects =
    programFilter === 'Todos'
      ? projects
      : projects.filter((p) => p.id === programFilter);

  const visibleEvidences =
    programFilter === 'Todos'
      ? evidences
      : evidences.filter((e) => e.projectId === programFilter);

  const handleSaveMetric = (projectId, metricId) => {
    updateImpactActual(projectId, metricId, metricInput);
    setEditingMetricId(null);
  };

  const handleAddEvidence = (e) => {
    e.preventDefault();
    if (!evidenceForm.title.trim() || !evidenceForm.referenceCode.trim()) return;
    addEvidence({
      ...evidenceForm,
      date: cutoff.formattedDate,
      externalUrl: evidenceForm.externalUrl.trim() || 'https://drive.google.com/'
    });
    setEvidenceForm({
      projectId: projects[0]?.id || 'prog-101',
      category: 'Prestação de Contas',
      title: '',
      referenceCode: '',
      responsible: '',
      externalUrl: '',
      notes: ''
    });
    setShowEvidenceForm(false);
  };

  return (
    <>
      <div className="space-y-6 print:hidden">
        {/* Cabeçalho de Impacto & Relatório Executivo */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-[#2D5A27]">
              Marco Lógico & Prestação de Contas
            </p>
            <h1 className="text-xl font-bold text-slate-900">
              Indicadores de Produto, Resultado e Relatório Executivo (A4)
            </h1>
            <p className="text-xs text-slate-600 max-w-2xl">
              Acompanhamento das entregas diretas (Produto) e das transformações geradas no público e território (Resultado), com fonte de verificação auditável.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <select
              aria-label="Filtrar por programa"
              value={programFilter}
              onChange={(e) => setProgramFilter(e.target.value)}
              className="bg-slate-50 text-slate-800 font-semibold text-xs py-2 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#2D5A27] cursor-pointer"
            >
              <option value="Todos">Todos os Programas ({projects.length})</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.code} — {p.name}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setShowReportModal(true)}
              className="px-4 py-2 bg-[#2D5A27] hover:bg-[#1E3F20] text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition shadow-xs cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Emitir Relatório Executivo (1 Página A4)</span>
            </button>
          </div>
        </div>

        {/* Matriz de Indicadores de Produto e Resultado */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-[#2D5A27]" />
              <h2 className="text-base font-bold text-slate-900">
                Matriz de Indicadores Socioambientais (Linha de Base → Meta → Realizado)
              </h2>
              <TooltipHelp
                position="right"
                title="Produto vs. Resultado"
                text="Produto mede a entrega direta do programa (ex.: polos abertos, jovens formados). Resultado mede o efeito real gerado na vida do beneficiário ou empresa (ex.: inserção no trabalho, aumento de renda, redução de resíduos)."
              />
            </div>
            <span className="text-xs text-slate-500">
              Custo efetivo calculado por público diretamente alcançado até {cutoff.formattedDate}
            </span>
          </div>

          <div className="space-y-5">
            {visibleProjects.map((p) => (
              <div
                key={p.id}
                className="rounded-xl border border-slate-200 overflow-hidden"
              >
                <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="font-mono font-bold text-[#2D5A27] mr-2">{p.code}</span>
                    <strong className="text-slate-900 text-sm">{p.name}</strong>
                    <span className="text-slate-500 ml-2">({p.funder})</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700 font-medium">
                    <span className="inline-flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#2D5A27]" />
                      Alcance: <strong>{p.beneficiariesActual}</strong> de {p.beneficiariesTarget} {p.beneficiaryUnit}
                    </span>
                    {p.costPerBeneficiary && (
                      <span className="px-2 py-0.5 rounded bg-white border border-slate-200">
                        Custo atual / alcance: <strong>{formatCurrency(p.costPerBeneficiary)}</strong>
                      </span>
                    )}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-white text-slate-600 font-semibold uppercase border-b border-slate-100">
                      <tr>
                        <th className="py-2 px-4">Nível</th>
                        <th className="py-2 px-4">Indicador</th>
                        <th className="py-2 px-4 text-center">Linha de Base</th>
                        <th className="py-2 px-4 text-center">Meta Final</th>
                        <th className="py-2 px-4 text-center">Realizado</th>
                        <th className="py-2 px-4 text-center">Alcance da Meta</th>
                        <th className="py-2 px-4">Fonte de Verificação</th>
                        <th className="py-2 px-4 text-right">Atualizar</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {p.impactMetrics.map((m) => {
                        const denominator = m.target - m.baseline;
                        const pct =
                          denominator > 0
                            ? Math.max(0, Math.min(100, ((m.actual - m.baseline) / denominator) * 100))
                            : 0;
                        const isEditing = editingMetricId === m.id;
                        const formatVal = (val) =>
                          m.unit === 'R$' ? formatCurrency(val) : `${val} ${m.unit}`;

                        return (
                          <tr key={m.id} className="hover:bg-slate-50/60">
                            <td className="py-2.5 px-4">
                              <span
                                className={`px-2 py-0.5 rounded text-[11px] font-bold border ${
                                  m.level === 'Resultado'
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                    : 'bg-sky-50 text-sky-800 border-sky-200'
                                }`}
                              >
                                {m.level}
                              </span>
                            </td>
                            <td className="py-2.5 px-4 font-semibold text-slate-900">
                              {m.indicator}
                            </td>
                            <td className="py-2.5 px-4 text-center text-slate-600">
                              {formatVal(m.baseline)}
                            </td>
                            <td className="py-2.5 px-4 text-center font-semibold text-slate-800">
                              {formatVal(m.target)}
                            </td>
                            <td className="py-2.5 px-4 text-center font-bold text-[#2D5A27]">
                              {isEditing ? (
                                <input
                                  type="number"
                                  min={0}
                                  value={metricInput}
                                  onChange={(e) => setMetricInput(e.target.value)}
                                  className="w-20 bg-white border border-slate-300 rounded px-2 py-1 text-center text-xs text-slate-900"
                                />
                              ) : (
                                formatVal(m.actual)
                              )}
                            </td>
                            <td className="py-2.5 px-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <span className="font-bold text-slate-800">
                                  {formatPercent(pct)}
                                </span>
                                <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                  <div
                                    className="bg-[#2D5A27] h-full rounded-full"
                                    style={{ width: `${pct}%` }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="py-2.5 px-4 text-slate-600">
                              {m.verificationSource} <span className="text-slate-400">({m.frequency})</span>
                            </td>
                            <td className="py-2.5 px-4 text-right">
                              {isEditing ? (
                                <div className="inline-flex items-center gap-1">
                                  <button
                                    type="button"
                                    onClick={() => handleSaveMetric(p.id, m.id)}
                                    className="p-1 bg-[#2D5A27] text-white rounded cursor-pointer"
                                    title="Salvar"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setEditingMetricId(null)}
                                    className="p-1 bg-slate-200 text-slate-700 rounded cursor-pointer"
                                    title="Cancelar"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingMetricId(m.id);
                                    setMetricInput(m.actual);
                                  }}
                                  className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded border border-slate-200 cursor-pointer"
                                >
                                  <Edit2 className="w-3 h-3" />
                                  <span>Medir</span>
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Catálogo de Evidências e Dossiê de Prestação de Contas */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#2D5A27]" />
                <span>Registro de Evidências e Protocolos de Prestação de Contas ({visibleEvidences.length})</span>
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Índice rastreável de notas fiscais, termos de vistoria e listas de presença arquivados no repositório institucional (Drive / SEI).
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowEvidenceForm(!showEvidenceForm)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{showEvidenceForm ? 'Cancelar' : 'Vincular Evidência'}</span>
            </button>
          </div>

          {showEvidenceForm && (
            <form
              onSubmit={handleAddEvidence}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs"
            >
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Programa</label>
                <select
                  value={evidenceForm.projectId}
                  onChange={(e) => setEvidenceForm({ ...evidenceForm, projectId: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.code} — {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Tipo de Comprovação</label>
                <select
                  value={evidenceForm.category}
                  onChange={(e) => setEvidenceForm({ ...evidenceForm, category: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
                >
                  <option>Prestação de Contas</option>
                  <option>Comprovação Física</option>
                  <option>Evidência Pedagógica</option>
                  <option>Indicador de Resultado</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Código / Protocolo *</label>
                <input
                  type="text"
                  required
                  value={evidenceForm.referenceCode}
                  onChange={(e) => setEvidenceForm({ ...evidenceForm, referenceCode: e.target.value })}
                  placeholder="Ex.: NF #4510 / SEI 2026.07"
                  className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-slate-700">Título do Documento / Evidência *</label>
                <input
                  type="text"
                  required
                  value={evidenceForm.title}
                  onChange={(e) => setEvidenceForm({ ...evidenceForm, title: e.target.value })}
                  placeholder="Ex.: Termo de Recebimento Lote Final de Computadores"
                  className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Responsável pela Conferência</label>
                <input
                  type="text"
                  value={evidenceForm.responsible}
                  onChange={(e) => setEvidenceForm({ ...evidenceForm, responsible: e.target.value })}
                  placeholder="Nome do responsável"
                  className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-slate-700">Observação de Conciliação</label>
                <input
                  type="text"
                  value={evidenceForm.notes}
                  onChange={(e) => setEvidenceForm({ ...evidenceForm, notes: e.target.value })}
                  placeholder="Rubrica ou entrega comprovada..."
                  className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Link da Pasta Externa (Drive/SEI)</label>
                <input
                  type="url"
                  value={evidenceForm.externalUrl}
                  onChange={(e) => setEvidenceForm({ ...evidenceForm, externalUrl: e.target.value })}
                  placeholder="https://drive.google.com/..."
                  className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
                />
              </div>

              <div className="sm:col-span-2 md:col-span-3 flex justify-end pt-1">
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#2D5A27] hover:bg-[#1E3F20] text-white font-semibold rounded-lg cursor-pointer"
                >
                  Salvar Vínculo de Evidência
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {visibleEvidences.map((ev) => {
              const proj = projects.find((p) => p.id === ev.projectId);
              return (
                <div
                  key={ev.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between gap-2 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2 py-0.5 rounded bg-white border border-slate-200 font-semibold text-slate-700 text-[11px]">
                        {proj?.code} • {ev.category}
                      </span>
                      <span className="font-mono text-[11px] text-[#2D5A27] font-bold">
                        {ev.referenceCode}
                      </span>
                    </div>
                    <p className="font-bold text-slate-900 text-sm pt-0.5">{ev.title}</p>
                    {ev.notes && <p className="text-slate-600">{ev.notes}</p>}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/70 text-[11px] text-slate-500">
                    <span>
                      Conferido em {ev.date} {ev.responsible ? `por ${ev.responsible}` : ''}
                    </span>
                    <div className="flex items-center gap-2">
                      <a
                        href={ev.externalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-[#2D5A27] hover:underline"
                      >
                        <span>Repositório</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <button
                        type="button"
                        onClick={() => deleteEvidence(ev.id)}
                        className="text-slate-400 hover:text-rose-600 cursor-pointer"
                        title="Remover registro"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* MODAL / IMPRESSÃO A4: Relatório Executivo de 1 Página */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto print-modal-backdrop">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 print-report-container">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between rounded-t-2xl print:hidden">
              <div className="flex items-center gap-2">
                <Printer className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-xs">
                  Visualização do Relatório Executivo (1 Página A4 • Mesma Base Ponderada da Carteira)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition cursor-pointer flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimir / Salvar PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg text-xs transition cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-4 text-slate-900 bg-white">
              {/* Cabeçalho A4 */}
              <div className="border-b-2 border-slate-900 pb-3 flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">
                    RadarSocial — Boletim Executivo de Monitoramento de Programas
                  </h2>
                  <p className="text-xs text-slate-600">
                    Posição consolidada físico-financeira, comprovação fiscal e indicadores de resultado
                  </p>
                </div>
                <div className="text-right text-xs">
                  <p className="font-bold text-slate-900">Data de corte: {cutoff.formattedDate}</p>
                  <p className="text-slate-500">Emissão: {new Date().toLocaleDateString('pt-BR')}</p>
                </div>
              </div>

              {/* KPIs Globais Ponderados */}
              <div className="grid grid-cols-4 gap-2.5 text-center text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-[10px] font-bold uppercase text-slate-500">Orçamento Aprovado</p>
                  <p className="text-sm font-extrabold text-slate-900 mt-0.5">
                    {formatCurrency(portfolioMetrics.totalBudget)}
                  </p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-[10px] font-bold uppercase text-slate-500">Executado (Pago)</p>
                  <p className="text-sm font-extrabold text-sky-800 mt-0.5">
                    {formatCurrency(portfolioMetrics.totalExecuted)} ({formatPercent(portfolioMetrics.weightedActualFinancial)})
                  </p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-[10px] font-bold uppercase text-slate-500">Físico Ponderado</p>
                  <p className="text-sm font-extrabold text-[#2D5A27] mt-0.5">
                    {formatPercent(portfolioMetrics.weightedActualPhysical)} (IDP {formatIndex(portfolioMetrics.portfolioSPI)})
                  </p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-[10px] font-bold uppercase text-slate-500">Comprov. Pendente</p>
                  <p className="text-sm font-extrabold text-amber-800 mt-0.5">
                    {formatCurrency(portfolioMetrics.totalPendingProofs)} (IDC {formatIndex(portfolioMetrics.portfolioCPI)})
                  </p>
                </div>
              </div>

              {/* Tabela 1: Físico-Financeiro */}
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  1. Posição Físico-Financeira por Programa (Data de corte: {cutoff.formattedDate})
                </h3>
                <table className="w-full text-left text-[11px] border border-slate-300">
                  <thead className="bg-slate-100 text-slate-800 font-bold">
                    <tr>
                      <th className="py-1.5 px-2">Programa / Financiador</th>
                      <th className="py-1.5 px-2">Orçado</th>
                      <th className="py-1.5 px-2">Pago</th>
                      <th className="py-1.5 px-2 text-center">Físico (Prev/Real)</th>
                      <th className="py-1.5 px-2 text-center">Financ. Real</th>
                      <th className="py-1.5 px-2 text-center">Prazo (p.p.)</th>
                      <th className="py-1.5 px-2 text-center">Custo (p.p.)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {projects.map((p) => (
                      <tr key={p.id}>
                        <td className="py-1.5 px-2">
                          <strong>{p.code} — {p.name}</strong>
                          <span className="block text-[10px] text-slate-600">{p.funder}</span>
                        </td>
                        <td className="py-1.5 px-2">{formatCurrency(p.totalBudget)}</td>
                        <td className="py-1.5 px-2 font-semibold">{formatCurrency(p.executedBudget)}</td>
                        <td className="py-1.5 px-2 text-center">
                          {formatPercent(p.plannedPhysical)} / <strong>{formatPercent(p.actualPhysical)}</strong>
                        </td>
                        <td className="py-1.5 px-2 text-center font-semibold">
                          {formatPercent(p.actualFinancial)}
                        </td>
                        <td className="py-1.5 px-2 text-center font-semibold">
                          {p.schedule.label} ({formatPP(p.schedule.gap)})
                        </td>
                        <td className="py-1.5 px-2 text-center font-semibold">
                          {p.cost.label} ({formatPP(p.cost.gap)})
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Tabela 2: Síntese de Resultado / Impacto */}
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  2. Indicadores de Resultado no Público Beneficiário
                </h3>
                <table className="w-full text-left text-[11px] border border-slate-300">
                  <thead className="bg-slate-100 text-slate-800 font-bold">
                    <tr>
                      <th className="py-1.5 px-2">Programa</th>
                      <th className="py-1.5 px-2">Indicador Principal de Resultado</th>
                      <th className="py-1.5 px-2 text-center">Base → Meta</th>
                      <th className="py-1.5 px-2 text-center">Realizado</th>
                      <th className="py-1.5 px-2">Fonte de Verificação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {projects.map((p) => {
                      const outcome = p.impactMetrics.find((m) => m.level === 'Resultado') || p.impactMetrics[0];
                      const fmtOutcome = (v) =>
                        outcome.unit === 'R$' ? formatCurrency(v) : `${v} ${outcome.unit}`;
                      return (
                        <tr key={p.id}>
                          <td className="py-1.5 px-2 font-semibold">{p.code}</td>
                          <td className="py-1.5 px-2">{outcome.indicator}</td>
                          <td className="py-1.5 px-2 text-center">
                            {fmtOutcome(outcome.baseline)} → {fmtOutcome(outcome.target)}
                          </td>
                          <td className="py-1.5 px-2 text-center font-bold">
                            {fmtOutcome(outcome.actual)}
                          </td>
                          <td className="py-1.5 px-2 text-slate-600">{outcome.verificationSource}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Rodapé A4 */}
              <div className="pt-3 border-t border-slate-300 flex justify-between items-end text-[11px] text-slate-600">
                <div>
                  <p className="font-bold text-slate-800">Nota Metodológica:</p>
                  <p>
                    Avanço físico apurado pela ponderação de marcos entregues; execução financeira apurada por rubricas pagas; médias da carteira ponderadas pelo orçamento aprovado.
                  </p>
                </div>
                <div className="text-center shrink-0 ml-6">
                  <div className="w-44 border-b border-slate-400 mb-1"></div>
                  <p className="font-medium">Responsável pelo Monitoramento</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
