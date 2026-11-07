import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import {
  CheckCircle2,
  Circle,
  Plus,
  AlertTriangle
} from 'lucide-react';
import { ActionPlan5W2H } from './ActionPlan5W2H';
import { ProgramSelectorBar } from '../common/ProgramSelectorBar';

export const FollowUpChecklist = () => {
  const {
    selectedProjectId,
    selectedProject,
    followUps,
    toggleChecklistItem,
    addChecklistItem
  } = useProjects();

  const [newItemTitle, setNewItemTitle] = useState('');

  const activeFollowUp =
    followUps.find((f) => f.projectId === selectedProjectId) || followUps[0];

  const completedItems = activeFollowUp?.items.filter((i) => i.checked).length || 0;
  const totalItems = activeFollowUp?.items.length || 0;

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemTitle.trim() || !activeFollowUp) return;
    addChecklistItem(activeFollowUp.id, {
      title: newItemTitle.trim(),
      responsible: selectedProject?.manager || activeFollowUp.responsible,
      deadline: activeFollowUp.date,
      note: ''
    });
    setNewItemTitle('');
  };

  return (
    <div className="space-y-5">
      <ProgramSelectorBar />

      {/* Faixa limpa de contexto da reunião */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
        <div>
          <h1 className="text-lg font-bold text-slate-900">{selectedProject?.name}</h1>
          <p className="text-xs text-slate-500">
            Última reunião: <strong>{activeFollowUp?.date}</strong> · Rotina {activeFollowUp?.frequency?.toLowerCase()} · Coord.: {activeFollowUp?.responsible}
          </p>
        </div>
      </div>

      {/* Layout em 2 Colunas Equilibradas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Coluna Esquerda: Pauta + Riscos */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">Pauta da Última Reunião</h2>
              <span className="text-xs font-semibold text-slate-500">
                {completedItems}/{totalItems} concluídos
              </span>
            </div>

            <div className="space-y-2">
              {activeFollowUp?.items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleChecklistItem(activeFollowUp.id, item.id)}
                  className={`w-full text-left p-3 rounded-xl border cursor-pointer flex items-start gap-2.5 transition ${
                    item.checked
                      ? 'bg-emerald-50/50 border-emerald-200'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
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
                      className={`font-medium leading-snug ${
                        item.checked ? 'line-through text-slate-500' : 'text-slate-900'
                      }`}
                    >
                      {item.title}
                    </p>
                    {item.note && (
                      <p className="text-[11px] text-slate-500 leading-normal">{item.note}</p>
                    )}
                    <p className="text-[11px] text-slate-400">
                      {item.responsible} · até {item.deadline}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <form onSubmit={handleAddItem} className="flex items-center gap-2 pt-1 text-xs">
              <input
                type="text"
                value={newItemTitle}
                onChange={(e) => setNewItemTitle(e.target.value)}
                placeholder="Adicionar item à pauta..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-800 focus:outline-none focus:border-[#2D5A27]"
              />
              <button
                type="submit"
                className="p-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition cursor-pointer shrink-0"
                title="Adicionar item"
                aria-label="Adicionar item à pauta"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Riscos do Programa */}
          {selectedProject?.risks && selectedProject.risks.length > 0 && (
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-3">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Riscos Mapeados</span>
              </h2>
              <div className="space-y-2.5">
                {selectedProject.risks.map((risk) => (
                  <div
                    key={risk.id}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-slate-900 leading-snug">
                        {risk.description}
                      </p>
                      <span className="shrink-0 px-2 py-0.5 rounded bg-white border border-slate-200 text-[11px] font-medium text-slate-600">
                        {risk.impact}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px]">
                      <strong>Mitigação:</strong> {risk.mitigation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Coluna Direita: Plano de Ação */}
        <div className="lg:col-span-7">
          <ActionPlan5W2H followUp={activeFollowUp} />
        </div>
      </div>
    </div>
  );
};
