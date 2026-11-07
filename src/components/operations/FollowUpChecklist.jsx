import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import {
  ListTodo,
  CheckCircle2,
  Circle,
  Calendar,
  User,
  ClipboardList,
  Plus
} from 'lucide-react';
import { ActionPlan5W2H } from './ActionPlan5W2H';

export const FollowUpChecklist = () => {
  const {
    projects,
    selectedProjectId,
    setSelectedProjectId,
    followUps,
    toggleChecklistItem,
    addChecklistItem
  } = useProjects();

  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemResp, setNewItemResp] = useState('');
  const [newItemDeadline, setNewItemDeadline] = useState('');

  const activeFollowUp =
    followUps.find((f) => f.projectId === selectedProjectId) || followUps[0];

  const totalItems = activeFollowUp?.items.length || 0;
  const completedItems = activeFollowUp?.items.filter((i) => i.checked).length || 0;
  const progressPercent = totalItems ? Math.round((completedItems / totalItems) * 100) : 0;

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemTitle.trim() || !activeFollowUp) return;
    addChecklistItem(activeFollowUp.id, {
      title: newItemTitle.trim(),
      responsible: newItemResp.trim() || activeFollowUp.responsible,
      deadline: newItemDeadline
        ? newItemDeadline.split('-').reverse().join('/')
        : activeFollowUp.date,
      note: 'Adicionado durante acompanhamento'
    });
    setNewItemTitle('');
    setNewItemResp('');
    setNewItemDeadline('');
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho da Reunião de Acompanhamento */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-[#2D5A27]" />
              <span>Pauta de Acompanhamento e Plano de Ação 5W2H</span>
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Registro padronizado de verificações periódicas, encaminhamentos nominais e ações corretivas por programa.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="followup-project-select" className="text-xs text-slate-600 font-semibold">
              Programa:
            </label>
            <select
              id="followup-project-select"
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="bg-slate-50 text-slate-800 font-semibold text-xs py-1.5 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#2D5A27] cursor-pointer"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.code} — {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <p className="text-slate-500 font-medium">Programa em Pauta</p>
            <p className="font-bold text-slate-900 mt-0.5">{activeFollowUp?.projectName}</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <p className="text-slate-500 font-medium">Facilitação PMO & Participantes</p>
            <p className="font-bold text-slate-900 mt-0.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#2D5A27] shrink-0" />
              <span>{activeFollowUp?.responsible}</span>
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5 truncate" title={activeFollowUp?.participants}>
              {activeFollowUp?.participants}
            </p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <p className="text-slate-500 font-medium">Última Reunião & Cadência</p>
            <p className="font-bold text-slate-900 mt-0.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span>
                {activeFollowUp?.date} ({activeFollowUp?.frequency})
              </span>
            </p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <p className="text-slate-500 font-medium">Checklist da Reunião</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-extrabold text-[#2D5A27] text-sm">
                {completedItems} de {totalItems}
              </span>
              <span className="text-slate-600 font-semibold">({progressPercent}%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Checklist Padronizado da Reunião */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <ListTodo className="w-4 h-4 text-[#2D5A27]" />
            <span>Checklist de Verificação e Combinados da Reunião</span>
          </h2>
          <span className="text-xs text-slate-500">
            Clique sobre um item para marcar como verificado
          </span>
        </div>

        <div className="space-y-2.5">
          {activeFollowUp?.items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => toggleChecklistItem(activeFollowUp.id, item.id)}
              className={`w-full text-left p-3.5 rounded-xl border cursor-pointer flex items-start gap-3 transition ${
                item.checked
                  ? 'bg-emerald-50/70 border-emerald-300'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {item.checked ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-400" />
                )}
              </div>

              <div className="flex-1 text-xs space-y-1">
                <p
                  className={`font-semibold ${
                    item.checked ? 'line-through text-slate-500' : 'text-slate-900'
                  }`}
                >
                  {item.title}
                </p>
                {item.note && (
                  <p className="text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded border border-slate-200/80">
                    <strong>Registro:</strong> {item.note}
                  </p>
                )}
                <div className="flex items-center gap-3 text-[11px] text-slate-600 pt-0.5">
                  <span>
                    Responsável: <strong>{item.responsible}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Prazo: <strong>{item.deadline}</strong>
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Adicionar Novo Item ao Checklist */}
        <form
          onSubmit={handleAddItem}
          className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 text-xs"
        >
          <input
            type="text"
            value={newItemTitle}
            onChange={(e) => setNewItemTitle(e.target.value)}
            placeholder="Novo combinado ou item de verificação..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-[#2D5A27]"
          />
          <input
            type="text"
            value={newItemResp}
            onChange={(e) => setNewItemResp(e.target.value)}
            placeholder="Responsável nominal"
            className="sm:w-44 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-[#2D5A27]"
          />
          <input
            type="date"
            aria-label="Prazo do item"
            value={newItemDeadline}
            onChange={(e) => setNewItemDeadline(e.target.value)}
            className="sm:w-38 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-800 focus:outline-none focus:border-[#2D5A27]"
          />
          <button
            type="submit"
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Adicionar</span>
          </button>
        </form>
      </div>

      {/* Planos de Ação 5W2H */}
      <ActionPlan5W2H followUp={activeFollowUp} />
    </div>
  );
};
