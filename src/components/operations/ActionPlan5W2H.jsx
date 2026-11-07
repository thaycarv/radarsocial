import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { Plus, CheckCircle2, Clock, Circle, User, Calendar } from 'lucide-react';

export const ActionPlan5W2H = ({ followUp }) => {
  const { addActionPlanItem, cycleActionStatus } = useProjects();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.what.trim() || !formData.who.trim() || !formData.when.trim()) return;
    addActionPlanItem(followUp.id, formData);
    setFormData({
      originGap: 'Cronograma',
      what: '',
      who: '',
      when: '',
      how: ''
    });
    setShowForm(false);
  };

  const renderStatusBadge = (status) => {
    if (status === 'Concluída') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
          <CheckCircle2 className="w-3 h-3" />
          Concluída
        </span>
      );
    }
    if (status === 'Em Andamento') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-800 border border-sky-200">
          <Clock className="w-3 h-3" />
          Em andamento
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
        <Circle className="w-3 h-3" />
        Pendente
      </span>
    );
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-bold text-slate-900">
          Ações em Andamento ({actions.length})
        </h2>

        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="px-3 py-1.5 bg-[#2D5A27] hover:bg-[#1E3F20] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shrink-0"
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
            <label className="font-semibold text-slate-700">Ação *</label>
            <input
              type="text"
              required
              value={formData.what}
              onChange={(e) => setFormData({ ...formData, what: e.target.value })}
              placeholder="O que precisa ser feito..."
              className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Responsável *</label>
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
              <label className="font-semibold text-slate-700">Prazo *</label>
              <input
                type="date"
                required
                value={formData.when}
                onChange={(e) => setFormData({ ...formData, when: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg px-2 py-1.5 text-slate-800"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Tema</label>
              <select
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
            <label className="font-semibold text-slate-700">Observação (opcional)</label>
            <input
              type="text"
              value={formData.how}
              onChange={(e) => setFormData({ ...formData, how: e.target.value })}
              placeholder="Contexto rápido ou encaminhamento..."
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
          Nenhuma ação pendente para este programa.
        </div>
      ) : (
        <div className="space-y-2.5">
          {actions.map((act) => {
            const formattedWhen = act.when.includes('-')
              ? act.when.split('-').reverse().join('/')
              : act.when;

            return (
              <div
                key={act.id}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2 text-xs"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold text-slate-900 text-xs leading-snug">{act.what}</p>
                  <button
                    type="button"
                    onClick={() => cycleActionStatus(followUp.id, act.id)}
                    className="shrink-0 cursor-pointer"
                    title="Alterar status"
                  >
                    {renderStatusBadge(act.status)}
                  </button>
                </div>

                {act.how && <p className="text-slate-600 leading-normal">{act.how}</p>}

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
                    <strong className="text-slate-700">{formattedWhen}</strong>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
