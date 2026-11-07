import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { Plus, Edit2, Check, X, Users } from 'lucide-react';
import { formatCurrency, formatPercent } from '../../utils/calculations';

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
      category: 'Comprovante',
      title: docForm.title.trim(),
      referenceCode: docForm.referenceCode.trim(),
      date: cutoff.formattedDate,
      responsible: proj?.manager || 'Coordenação'
    });
    setDocForm({
      projectId: projects[0]?.id || 'prog-101',
      title: '',
      referenceCode: ''
    });
    setShowDocForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Topo com filtro rápido por pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Indicadores de Impacto</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Entregas diretas e resultados apurados até {cutoff.formattedDate}
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

      {/* Tabelas de Indicadores por Programa */}
      <div className="space-y-4">
        {visibleProjects.map((p) => (
          <div
            key={p.id}
            className="bg-white border border-slate-200/90 rounded-2xl shadow-2xs overflow-hidden"
          >
            <div className="px-5 py-3.5 bg-slate-50/70 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div>
                <span className="font-mono font-bold text-[#2D5A27] mr-2">{p.code}</span>
                <strong className="text-slate-900 text-sm">{p.name}</strong>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Users className="w-3.5 h-3.5 text-[#2D5A27]" />
                <span>
                  Público: <strong>{p.beneficiariesActual}</strong> / {p.beneficiariesTarget} {p.beneficiaryUnit}
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-slate-500 font-semibold border-b border-slate-100">
                  <tr>
                    <th className="py-2.5 px-4 w-24">Tipo</th>
                    <th className="py-2.5 px-4">Indicador</th>
                    <th className="py-2.5 px-4 text-center">Inicial</th>
                    <th className="py-2.5 px-4 text-center">Meta</th>
                    <th className="py-2.5 px-4 text-center">Atual</th>
                    <th className="py-2.5 px-4 text-center">Progresso</th>
                    <th className="py-2.5 px-4">Comprovação</th>
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
                    const formatVal = (val) =>
                      m.unit === 'R$' ? formatCurrency(val) : `${val} ${m.unit}`;

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
                        <td className="py-3 px-4 text-center text-slate-500">
                          {formatVal(m.baseline)}
                        </td>
                        <td className="py-3 px-4 text-center font-medium text-slate-700">
                          {formatVal(m.target)}
                        </td>
                        <td className="py-3 px-4 text-center font-bold text-[#2D5A27]">
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
                        <td className="py-3 px-4 text-center">
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
                        <td className="py-3 px-4 text-slate-500">{m.verificationSource}</td>
                        <td className="py-3 px-4 text-right">
                          {isEditing ? (
                            <div className="inline-flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => handleSaveMetric(p.id, m.id)}
                                className="p-1 bg-[#2D5A27] text-white rounded cursor-pointer"
                                aria-label="Salvar"
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
                              title="Atualizar indicador"
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

      {/* Documentos e Comprovantes em formato compacto */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-3.5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-bold text-slate-900">
            Documentos Validados ({visibleEvidences.length})
          </h2>

          <button
            type="button"
            onClick={() => setShowDocForm(!showDocForm)}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#2D5A27]" />
            <span>{showDocForm ? 'Cancelar' : 'Registrar protocolo'}</span>
          </button>
        </div>

        {showDocForm && (
          <form
            onSubmit={handleAddDoc}
            className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 text-xs"
          >
            <select
              aria-label="Programa"
              value={docForm.projectId}
              onChange={(e) => setDocForm({ ...docForm, projectId: e.target.value })}
              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 sm:w-36"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.code}
                </option>
              ))}
            </select>
            <input
              type="text"
              required
              value={docForm.referenceCode}
              onChange={(e) => setDocForm({ ...docForm, referenceCode: e.target.value })}
              placeholder="Protocolo ou NF (ex.: NF #4510)"
              className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-800 sm:w-52"
            />
            <input
              type="text"
              required
              value={docForm.title}
              onChange={(e) => setDocForm({ ...docForm, title: e.target.value })}
              placeholder="Descrição do documento..."
              className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-800"
            />
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#2D5A27] hover:bg-[#1E3F20] text-white font-semibold rounded-lg cursor-pointer shrink-0"
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
                <th className="py-2 px-3">Documento</th>
                <th className="py-2 px-3 w-28">Programa</th>
                <th className="py-2 px-3 w-48">Conferência</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visibleEvidences.map((ev) => {
                const proj = projects.find((p) => p.id === ev.projectId);
                return (
                  <tr key={ev.id} className="hover:bg-slate-50/70">
                    <td className="py-2.5 px-3 font-mono font-semibold text-[#2D5A27]">
                      {ev.referenceCode}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-slate-800">{ev.title}</td>
                    <td className="py-2.5 px-3 text-slate-600">{proj?.code}</td>
                    <td className="py-2.5 px-3 text-slate-500">
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
