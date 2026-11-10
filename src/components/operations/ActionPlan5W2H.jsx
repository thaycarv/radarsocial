import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { Plus, User, Calendar } from 'lucide-react';

export const ActionPlan5W2H = ({ followUp, project }) => {
  const { cutoff, addActionPlanItem, updateActionStatus } = useProjects();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    originGap: 'Cronograma',
    what: '',
    who: '',
    when: '',
    how: ''
  });

  if (!followUp) return null;

  const actions = followUp.actionPlans || [];
  const openCount = actions.filter((a) => a.status !== 'Concluída').length;
  const doneCount = actions.filter((a) => a.status === 'Concluída').length;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.what.trim() || !formData.who.trim() || !formData.when.trim()) return;
    addActionPlanItem(followUp.id, {
      ...formData,
      what: formData.what.trim(),
      who: formData.who.trim(),
      how: formData.how.trim()
    });
    setFormData({
      originGap: 'Cronograma',
      what: '',
      who: '',
      when: '',
      how: ''
    });
    setShowForm(false);
  };

  const getStatusSelectStyle = (status, isOverdue) => {
    if (status === 'Concluída') {
      return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    }
    if (isOverdue) {
      return 'bg-rose-50 text-rose-700 border-rose-200';
    }
    if (status === 'Em Andamento') {
      return 'bg-sky-50 text-sky-800 border-sky-200';
    }
    return 'bg-amber-50 text-amber-800 border-amber-200';
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            Plano de Ação e Encaminhamentos ({actions.length})
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {openCount} em aberto · {doneCount} {doneCount === 1 ? 'concluída' : 'concluídas'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setShowForm((prev) => !prev);
            if (!showForm && !formData.who && project?.manager) {
              setFormData((prev) => ({ ...prev, who: project.manager }));
            }
          }}
          className="px-3 py-1.5 bg-[#2D5A27] hover:bg-[#1E3F20] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{showForm ? 'Cancelar' : 'Nova ação'}</span>
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs"
        >
          <div className="space-y-1 sm:col-span-2">
            <label className="font-semibold text-slate-700">Providência (O quê) *</label>
            <input
              type="text"
              required
              value={formData.what}
              onChange={(e) => setFormData({ ...formData, what: e.target.value })}
              placeholder="Ex.: Protocolar pedido de remanejamento ou cobrar nota pendente..."
              className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Responsável (Quem) *</label>
            <input
              type="text"
              required
              value={formData.who}
              onChange={(e) => setFormData({ ...formData, who: e.target.value })}
              placeholder="Nome do responsável"
              className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Prazo (Quando) *</label>
              <input
                type="date"
                required
                value={formData.when}
                onChange={(e) => setFormData({ ...formData, when: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg px-2 py-1.5 text-slate-800"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Frente</label>
              <select
                aria-label="Frente da ação"
                value={formData.originGap}
                onChange={(e) => setFormData({ ...formData, originGap: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg px-2 py-1.5 text-slate-800"
              >
                <option>Cronograma</option>
                <option>Orçamento</option>
                <option>Notas Fiscais</option>
                <option>Fornecedor</option>
              </select>
            </div>
          </div>

          <div className="space-y-1 sm:col-span-2">
            <label className="font-semibold text-slate-700">Como executar (opcional)</label>
            <input
              type="text"
              value={formData.how}
              onChange={(e) => setFormData({ ...formData, how: e.target.value })}
              placeholder="Detalhe operacional ou critério de liberação..."
              className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
            />
          </div>

          <div className="sm:col-span-2 flex justify-end">
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#2D5A27] hover:bg-[#1E3F20] text-white font-semibold rounded-lg cursor-pointer"
            >
              Salvar ação
            </button>
          </div>
        </form>
      )}

      {actions.length === 0 ? (
        <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
          Nenhuma providência registrada para este programa.
        </div>
      ) : (
        <div className="space-y-2.5">
          {actions.map((act) => {
            const isOverdue =
              act.status !== 'Concluída' && Boolean(act.when && act.when < cutoff.date);
            const formattedWhen = act.when.includes('-')
              ? act.when.split('-').reverse().join('/')
              : act.when;

            return (
              <div
                key={act.id}
                className={`p-3.5 rounded-xl border space-y-2 text-xs transition ${
                  act.status === 'Concluída'
                    ? 'bg-slate-50/60 border-slate-200/80'
                    : isOverdue
                    ? 'bg-rose-50/30 border-rose-200'
                    : 'bg-slate-50 border-slate-200/90'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
                  <p className="font-semibold text-slate-900 text-xs leading-snug">
                    {act.what}
                  </p>

                  <select
                    aria-label={`Status da ação ${act.what}`}
                    value={act.status}
                    onChange={(e) => updateActionStatus(followUp.id, act.id, e.target.value)}
                    className={`shrink-0 text-[11px] font-semibold rounded-lg px-2.5 py-1 border cursor-pointer focus:outline-none ${getStatusSelectStyle(
                      act.status,
                      isOverdue
                    )}`}
                  >
                    <option value="Pendente">Pendente</option>
                    <option value="Em Andamento">Em andamento</option>
                    <option value="Concluída">Concluída</option>
                  </select>
                </div>

                {act.how && (
                  <p className="text-slate-600 leading-normal">{act.how}</p>
                )}

                <div className="flex items-center gap-3 flex-wrap pt-1 text-[11px] text-slate-500">
                  <span className="px-2 py-0.5 rounded bg-white border border-slate-200 font-medium text-slate-700">
                    {act.originGap}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <User className="w-3 h-3 text-slate-400" />
                    <strong className="text-slate-700">{act.who}</strong>
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <strong className={isOverdue ? 'text-rose-700' : 'text-slate-700'}>
                      {formattedWhen}
                    </strong>
                  </span>
                  {isOverdue && (
                    <span className="px-1.5 py-0.2 rounded bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-semibold">
                      Prazo vencido
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
