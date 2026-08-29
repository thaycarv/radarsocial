import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { ShieldAlert, Edit2, Check, Target } from 'lucide-react';
import { TooltipHelp } from '../common/TooltipHelp';

export const ActionPlan5W2H = ({ followUp }) => {
  const { addActionPlan } = useProjects();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(followUp?.actionPlan5W2H || {
    what: '',
    why: '',
    where: '',
    who: '',
    when: '',
    how: '',
    howMuch: ''
  });

  if (!followUp) return null;

  const plan = followUp.actionPlan5W2H;

  const handleSave = () => {
    addActionPlan(followUp.id, formData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Target className="w-4 h-4 text-[#2D5A27]" />
            <span>Plano de Ação para Correção de Desvios</span>
            <TooltipHelp
              title="O que é o Plano de Ação?"
              text="Ferramenta prática para registrar as decisões tomadas pela equipe para corrigir atrasos ou conter gastos fora da meta."
            />
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Registro claro de responsabilidades, prazos e medidas de contenção para manter o projeto no ritmo planejado.
          </p>
        </div>

        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
            isEditing
              ? 'bg-[#2D5A27] hover:bg-[#1E3F20] text-white shadow-xs'
              : 'bg-slate-50 hover:bg-emerald-50 text-[#1E3F20] border border-slate-200 hover:border-emerald-300'
          }`}
        >
          {isEditing ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Salvar Plano</span>
            </>
          ) : (
            <>
              <Edit2 className="w-3.5 h-3.5" />
              <span>{plan ? 'Editar Plano' : 'Criar Plano de Ação'}</span>
            </>
          )}
        </button>
      </div>

      {isEditing ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-[#2D5A27]">O que fazer?</label>
            <input
              type="text"
              value={formData.what}
              onChange={(e) => setFormData({ ...formData, what: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#2D5A27]"
              placeholder="Ação corretiva..."
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-[#2D5A27]">Por que fazer?</label>
            <input
              type="text"
              value={formData.why}
              onChange={(e) => setFormData({ ...formData, why: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#2D5A27]"
              placeholder="Justificativa..."
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-[#2D5A27]">Onde será feito?</label>
            <input
              type="text"
              value={formData.where}
              onChange={(e) => setFormData({ ...formData, where: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#2D5A27]"
              placeholder="Localidade / polo..."
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-[#2D5A27]">Quem é o responsável?</label>
            <input
              type="text"
              value={formData.who}
              onChange={(e) => setFormData({ ...formData, who: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#2D5A27]"
              placeholder="Responsável nominal..."
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-amber-800">Até quando? (Prazo)</label>
            <input
              type="text"
              value={formData.when}
              onChange={(e) => setFormData({ ...formData, when: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#2D5A27]"
              placeholder="Prazo limite..."
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-amber-800">Impacto no Orçamento?</label>
            <input
              type="text"
              value={formData.howMuch}
              onChange={(e) => setFormData({ ...formData, howMuch: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#2D5A27]"
              placeholder="Impacto financeiro ou economia..."
            />
          </div>

          <div className="sm:col-span-2 md:col-span-3 space-y-1">
            <label className="text-[10px] font-bold uppercase text-sky-800">Como será feito? (Passo a passo)</label>
            <input
              type="text"
              value={formData.how}
              onChange={(e) => setFormData({ ...formData, how: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#2D5A27]"
              placeholder="Método e etapas de execução..."
            />
          </div>
        </div>
      ) : plan ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
            <p className="text-[10px] font-bold uppercase text-[#2D5A27] tracking-wider">O que fazer?</p>
            <p className="text-xs font-semibold text-slate-900">{plan.what}</p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
            <p className="text-[10px] font-bold uppercase text-[#2D5A27] tracking-wider">Por que fazer?</p>
            <p className="text-xs text-slate-600">{plan.why}</p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
            <p className="text-[10px] font-bold uppercase text-[#2D5A27] tracking-wider">Onde será feito?</p>
            <p className="text-xs text-slate-600">{plan.where}</p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
            <p className="text-[10px] font-bold uppercase text-[#2D5A27] tracking-wider">Quem é o responsável?</p>
            <p className="text-xs font-semibold text-slate-900">{plan.who}</p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
            <p className="text-[10px] font-bold uppercase text-amber-800 tracking-wider">Até quando? (Prazo)</p>
            <p className="text-xs font-semibold text-amber-800">{plan.when}</p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
            <p className="text-[10px] font-bold uppercase text-amber-800 tracking-wider">Impacto no Orçamento?</p>
            <p className="text-xs font-semibold text-[#2D5A27]">{plan.howMuch}</p>
          </div>

          <div className="sm:col-span-2 md:col-span-3 p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
            <p className="text-[10px] font-bold uppercase text-sky-800 tracking-wider">Como será feito?</p>
            <p className="text-xs text-slate-600">{plan.how}</p>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-2">
          <p className="text-xs text-slate-500">Nenhum plano de ação registrado para esta reunião.</p>
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-[#1E3F20] border border-emerald-200 rounded-lg text-xs font-semibold transition"
          >
            Cadastrar Plano de Ação
          </button>
        </div>
      )}
    </div>
  );
};

