import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { Target, Plus, CheckCircle2, Clock, Circle } from 'lucide-react';
import { formatCurrency } from '../../utils/calculations';
import { TooltipHelp } from '../common/TooltipHelp';

export const ActionPlan5W2H = ({ followUp }) => {
  const { addActionPlanItem, cycleActionStatus } = useProjects();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    originGap: '',
    what: '',
    why: '',
    where: '',
    who: '',
    when: '',
    how: '',
    howMuch: 0,
    costNote: ''
  });

  if (!followUp) return null;

  const actions = followUp.actionPlans || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.what.trim() || !formData.who.trim() || !formData.when.trim()) return;
    addActionPlanItem(followUp.id, formData);
    setFormData({
      originGap: '',
      what: '',
      why: '',
      where: '',
      who: '',
      when: '',
      how: '',
      howMuch: 0,
      costNote: ''
    });
    setShowForm(false);
  };

  const renderStatusBadge = (status) => {
    if (status === 'Concluída') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
          <CheckCircle2 className="w-3 h-3" />
          Concluída
        </span>
      );
    }
    if (status === 'Em Andamento') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-50 text-sky-800 border border-sky-200">
          <Clock className="w-3 h-3" />
          Em Andamento
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
        <Circle className="w-3 h-3" />
        Pendente
      </span>
    );
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Target className="w-4 h-4 text-[#2D5A27]" />
            <span>Plano de Ação Corretiva (5W2H) — {actions.length} {actions.length === 1 ? 'ação' : 'ações'}</span>
            <TooltipHelp
              position="right"
              title="Uso correto do 5W2H"
              text="Cada ação nasce vinculada a um desvio ou risco concreto, possui um responsável nominal (pessoa física), data limite objetiva e custo adicional da ação (How Much)."
            />
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Clique no selo de status de uma ação para avançar entre <strong>Pendente → Em Andamento → Concluída</strong>.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="px-3 py-1.5 bg-[#2D5A27] hover:bg-[#1E3F20] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{showForm ? 'Cancelar' : 'Nova Ação 5W2H'}</span>
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs"
        >
          <div className="space-y-1">
            <label className="font-bold text-slate-700">Desvio ou Risco de Origem</label>
            <input
              type="text"
              value={formData.originGap}
              onChange={(e) => setFormData({ ...formData, originGap: e.target.value })}
              placeholder="Ex.: Atraso na entrega 2 (-15 p.p.)"
              className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
            />
          </div>

          <div className="space-y-1 sm:col-span-2">
            <label className="font-bold text-slate-700">O que será feito? (What) *</label>
            <input
              type="text"
              required
              value={formData.what}
              onChange={(e) => setFormData({ ...formData, what: e.target.value })}
              placeholder="Descreva a ação corretiva objetiva..."
              className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Por que? (Why)</label>
            <input
              type="text"
              value={formData.why}
              onChange={(e) => setFormData({ ...formData, why: e.target.value })}
              placeholder="Resultado esperado na curva ou rubrica..."
              className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Onde? (Where)</label>
            <input
              type="text"
              value={formData.where}
              onChange={(e) => setFormData({ ...formData, where: e.target.value })}
              placeholder="Polo, frente ou setor..."
              className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Quem? — Responsável nominal (Who) *</label>
            <input
              type="text"
              required
              value={formData.who}
              onChange={(e) => setFormData({ ...formData, who: e.target.value })}
              placeholder="Nome e sobrenome..."
              className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Até quando? (When) *</label>
            <input
              type="date"
              required
              value={formData.when}
              onChange={(e) => setFormData({ ...formData, when: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Custo adicional da ação — R$ (How Much)</label>
            <input
              type="number"
              min={0}
              step={100}
              value={formData.howMuch}
              onChange={(e) => setFormData({ ...formData, howMuch: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Como será executado? (How)</label>
            <input
              type="text"
              value={formData.how}
              onChange={(e) => setFormData({ ...formData, how: e.target.value })}
              placeholder="Etapas práticas..."
              className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
            />
          </div>

          <div className="sm:col-span-2 md:col-span-3 flex justify-end pt-1">
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#2D5A27] hover:bg-[#1E3F20] text-white font-semibold rounded-lg cursor-pointer"
            >
              Registrar Ação no Plano
            </button>
          </div>
        </form>
      )}

      {actions.length === 0 ? (
        <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-600">
          Nenhuma ação corretiva necessária no momento para este programa. Use o botão acima caso identifique novo desvio.
        </div>
      ) : (
        <div className="space-y-3">
          {actions.map((act) => {
            const formattedWhen = act.when.includes('-')
              ? act.when.split('-').reverse().join('/')
              : act.when;

            return (
              <div
                key={act.id}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/70 pb-2.5">
                  <div>
                    <span className="inline-block text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded mb-1">
                      Origem: {act.originGap}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">{act.what}</h4>
                  </div>

                  <button
                    type="button"
                    onClick={() => cycleActionStatus(followUp.id, act.id)}
                    className="shrink-0 cursor-pointer self-start sm:self-center"
                    title="Clique para alterar o status da ação"
                  >
                    {renderStatusBadge(act.status)}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase text-slate-500 block">Quem (Responsável)</span>
                    <span className="font-semibold text-slate-900">{act.who}</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-slate-500 block">Quando (Prazo)</span>
                    <span className="font-semibold text-slate-900">{formattedWhen}</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-slate-500 block">Onde</span>
                    <span className="text-slate-700">{act.where || '—'}</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-slate-500 block">Custo da Ação (How Much)</span>
                    <span className="font-semibold text-[#2D5A27]">
                      {formatCurrency(act.howMuch)} {act.costNote ? `(${act.costNote})` : ''}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 border-t border-slate-200/60">
                  <div>
                    <span className="text-[11px] font-bold uppercase text-slate-500 block">Por quê (Justificativa)</span>
                    <span className="text-slate-700">{act.why || '—'}</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-slate-500 block">Como (Método de Execução)</span>
                    <span className="text-slate-700">{act.how || '—'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
