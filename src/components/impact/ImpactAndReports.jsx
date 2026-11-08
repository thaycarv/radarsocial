import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { Plus, Edit2, Check, X, Users, FileCheck2 } from 'lucide-react';
import { formatCurrency, formatPercent } from '../../utils/calculations';

const EVIDENCE_CATEGORIES = [
  'Técnico',
  'Financeiro',
  'Atendimento',
  'Sanitário',
  'Engenharia'
];

export const ImpactAndReports = () => {
  const {
    cutoff,
    projects,
    evidences,
    updateImpactActual,
    addEvidence
  } = useProjects();

  const [programFilter, setProgramFilter] = useState('Todos');
  const [editingMetricId, setEditingMetricId] = useState(null);
  const [metricInput, setMetricInput] = useState(0);

  const [showDocForm, setShowDocForm] = useState(false);
  const [docForm, setDocForm] = useState({
    projectId: projects[0]?.id || 'prog-101',
    category: 'Técnico',
    title: '',
    referenceCode: ''
  });

  const visibleProjects =
    programFilter === 'Todos'
      ? projects
      : projects.filter((p) => p.id === programFilter);

  const visibleEvidences =
    programFilter === 'Todos'
      ? evidences
      : evidences.filter((e) => e.projectId === programFilter);

  const formatMetricValue = (val, unit) => {
    if (unit === 'R$') return formatCurrency(val);
    if (unit === '%') return `${val}%`;
    return `${val} ${unit}`;
  };

  const handleSaveMetric = (projectId, metricId) => {
    updateImpactActual(projectId, metricId, metricInput);
    setEditingMetricId(null);
  };

  const handleAddDoc = (e) => {
    e.preventDefault();
    if (!docForm.title.trim() || !docForm.referenceCode.trim()) return;
    const proj = projects.find((p) => p.id === docForm.projectId);
    addEvidence({
      projectId: docForm.projectId,
      category: docForm.category,
      title: docForm.title.trim(),
      referenceCode: docForm.referenceCode.trim(),
      date: cutoff.formattedDate,
      responsible: proj?.manager || 'Coordenação'
    });
    setDocForm({
      projectId: projects[0]?.id || 'prog-101',
      category: 'Técnico',
      title: '',
      referenceCode: ''
    });
    setShowDocForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho com filtro rápido por programa */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Resultados e Evidências de Impacto
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Indicadores de entrega e resultado pactuados no plano de trabalho até {cutoff.formattedDate}
          </p>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setProgramFilter('Todos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer shrink-0 ${
              programFilter === 'Todos'
                ? 'bg-[#2D5A27] text-white border-[#2D5A27]'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Todos
          </button>
          {projects.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setProgramFilter(p.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer shrink-0 ${
                programFilter === p.id
                  ? 'bg-[#2D5A27] text-white border-[#2D5A27]'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {p.code}
            </button>
          ))}
        </div>
      </div>

      {/* Matrizes de Indicadores por Programa (Entregas vs. Resultados) */}
      <div className="space-y-4">
        {visibleProjects.map((p) => (
          <div
            key={p.id}
            className="bg-white border border-slate-200/90 rounded-2xl shadow-2xs overflow-hidden"
          >
            <div className="px-5 py-3.5 bg-slate-50/70 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono font-bold text-[#2D5A27]">{p.code}</span>
                <strong className="text-slate-900 text-sm">{p.name}</strong>
                {p.statusMeta && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${p.statusMeta.badgeClass}`}
                  >
                    {p.statusMeta.label}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-slate-600 shrink-0">
                <Users className="w-3.5 h-3.5 text-[#2D5A27]" />
                <span>
                  Público atendido: <strong>{p.beneficiariesActual}</strong> / {p.beneficiariesTarget}{' '}
                  {p.beneficiaryUnit}
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-slate-500 font-semibold border-b border-slate-100">
                  <tr>
                    <th className="py-2.5 px-4 w-24">Tipo</th>
                    <th className="py-2.5 px-4">Indicador</th>
                    <th className="py-2.5 px-4 text-center whitespace-nowrap">Linha de Base</th>
                    <th className="py-2.5 px-4 text-center whitespace-nowrap">Meta</th>
                    <th className="py-2.5 px-4 text-center whitespace-nowrap">Atual</th>
                    <th className="py-2.5 px-4 text-center whitespace-nowrap">Alcance</th>
                    <th className="py-2.5 px-4">Fonte de Verificação</th>
                    <th className="py-2.5 px-4 text-right w-16"></th>
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

                    return (
                      <tr key={m.id} className="hover:bg-slate-50/60">
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                              m.level === 'Resultado'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : 'bg-sky-50 text-sky-800 border-sky-200'
                            }`}
                          >
                            {m.level}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-900">{m.indicator}</td>
                        <td className="py-3 px-4 text-center text-slate-500 whitespace-nowrap">
                          {formatMetricValue(m.baseline, m.unit)}
                        </td>
                        <td className="py-3 px-4 text-center font-medium text-slate-700 whitespace-nowrap">
                          {formatMetricValue(m.target, m.unit)}
                        </td>
                        <td className="py-3 px-4 text-center font-bold text-[#2D5A27] whitespace-nowrap">
                          {isEditing ? (
                            <input
                              type="number"
                              min={0}
                              step="any"
                              aria-label={`Apuração atual de ${m.indicator}`}
                              value={metricInput}
                              onChange={(e) => setMetricInput(e.target.value)}
                              className="w-20 bg-white border border-slate-300 rounded px-2 py-1 text-center text-xs text-slate-900"
                            />
                          ) : (
                            formatMetricValue(m.actual, m.unit)
                          )}
                        </td>
                        <td className="py-3 px-4 text-center whitespace-nowrap">
                          <div className="flex items-center justify-center gap-2">
                            <span className="font-bold text-slate-800 w-10 text-right">
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
                        <td className="py-3 px-4 text-slate-600">{m.verificationSource}</td>
                        <td className="py-3 px-4 text-right">
                          {isEditing ? (
                            <div className="inline-flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => handleSaveMetric(p.id, m.id)}
                                className="p-1 bg-[#2D5A27] text-white rounded cursor-pointer"
                                aria-label="Salvar apuração"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingMetricId(null)}
                                className="p-1 bg-slate-200 text-slate-700 rounded cursor-pointer"
                                aria-label="Cancelar"
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
                              className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded transition cursor-pointer"
                              title="Atualizar apuração mensal"
                              aria-label={`Atualizar ${m.indicator}`}
                            >
                              <Edit2 className="w-3.5 h-3.5" />
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

      {/* Dossiê de Evidências (Relatório de Execução do Objeto - MROSC) */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-[#2D5A27]" />
              <span>Dossiê de Evidências e Prestação de Contas ({visibleEvidences.length})</span>
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Documentos comprobatórios que sustentam entregas, medições e quitações fiscais do plano de trabalho
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowDocForm(!showDocForm)}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto shrink-0"
          >
            <Plus className="w-3.5 h-3.5 text-[#2D5A27]" />
            <span>{showDocForm ? 'Cancelar' : 'Registrar documento'}</span>
          </button>
        </div>

        {showDocForm && (
          <form
            onSubmit={handleAddDoc}
            className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-12 gap-2.5 text-xs"
          >
            <select
              aria-label="Programa"
              value={docForm.projectId}
              onChange={(e) => setDocForm({ ...docForm, projectId: e.target.value })}
              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 sm:col-span-2"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.code}
                </option>
              ))}
            </select>

            <select
              aria-label="Categoria do documento"
              value={docForm.category}
              onChange={(e) => setDocForm({ ...docForm, category: e.target.value })}
              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 sm:col-span-2"
            >
              {EVIDENCE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <input
              type="text"
              required
              value={docForm.referenceCode}
              onChange={(e) => setDocForm({ ...docForm, referenceCode: e.target.value })}
              placeholder="Protocolo / NF (ex.: NF-e #4510)"
              className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-800 sm:col-span-3"
            />

            <input
              type="text"
              required
              value={docForm.title}
              onChange={(e) => setDocForm({ ...docForm, title: e.target.value })}
              placeholder="Descrição objetiva da evidência..."
              className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-800 sm:col-span-4"
            />

            <button
              type="submit"
              className="px-4 py-1.5 bg-[#2D5A27] hover:bg-[#1E3F20] text-white font-semibold rounded-lg cursor-pointer sm:col-span-1"
            >
              Salvar
            </button>
          </form>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-y border-slate-200">
              <tr>
                <th className="py-2 px-3 w-36">Protocolo</th>
                <th className="py-2 px-3 w-28">Categoria</th>
                <th className="py-2 px-3">Documento Comprobatório</th>
                <th className="py-2 px-3 w-24">Programa</th>
                <th className="py-2 px-3 w-48">Conferência</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visibleEvidences.map((ev) => {
                const proj = projects.find((p) => p.id === ev.projectId);
                return (
                  <tr key={ev.id} className="hover:bg-slate-50/70">
                    <td className="py-2.5 px-3 font-mono font-semibold text-[#2D5A27] whitespace-nowrap">
                      {ev.referenceCode}
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-medium">
                        {ev.category}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-medium text-slate-800">{ev.title}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-600 whitespace-nowrap">
                      {proj?.code}
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 whitespace-nowrap">
                      {ev.responsible} · {ev.date}
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
