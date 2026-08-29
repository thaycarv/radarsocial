import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import {
  ListTodo,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Calendar,
  User,
  ClipboardList
} from 'lucide-react';
import { ActionPlan5W2H } from './ActionPlan5W2H';

export const FollowUpChecklist = () => {
  const { followUps, toggleChecklistItem } = useProjects();
  const [selectedChecklistId, setSelectedChecklistId] = useState(followUps[0]?.id);

  const activeFollowUp = followUps.find(f => f.id === selectedChecklistId) || followUps[0];

  const totalItems = activeFollowUp?.items.length || 0;
  const completedItems = activeFollowUp?.items.filter(i => i.checked).length || 0;
  const progressPercent = totalItems ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-[#2D5A27]" />
              <span>Plano de Ação e Acompanhamento de Rotinas</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Registro de combinados, checagens periódicas e ações para manter as entregas no prazo.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Reunião Selecionada:</span>
            <select
              value={selectedChecklistId}
              onChange={(e) => setSelectedChecklistId(e.target.value)}
              className="bg-slate-50 text-slate-800 font-semibold text-xs py-1.5 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#2D5A27] cursor-pointer"
            >
              {followUps.map(f => (
                <option key={f.id} value={f.id}>
                  {f.date} - {f.projectName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70">
            <p className="text-slate-400">Iniciativa</p>
            <p className="font-bold text-slate-800 mt-0.5">{activeFollowUp?.projectName}</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70">
            <p className="text-slate-400">Responsável</p>
            <p className="font-bold text-slate-800 mt-0.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#2D5A27]" />
              {activeFollowUp?.responsible}
            </p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70">
            <p className="text-slate-400">Data e Frequência</p>
            <p className="font-bold text-slate-800 mt-0.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-sky-600" />
              {activeFollowUp?.date} ({activeFollowUp?.frequency})
            </p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70">
            <p className="text-slate-400">Itens Verificados</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="font-extrabold text-[#2D5A27]">{completedItems} de {totalItems}</span>
              <span className="text-slate-400">({progressPercent}%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Checklist Items Interactive List */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <ListTodo className="w-4 h-4 text-[#2D5A27]" />
            <span>Itens de Verificação e Combinados</span>
          </h3>
          <span className="text-xs text-slate-400">Clique para marcar ou desmarcar o item</span>
        </div>

        <div className="space-y-2.5">
          {activeFollowUp?.items.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleChecklistItem(activeFollowUp.id, item.id)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                item.checked
                  ? 'bg-emerald-50/50 border-emerald-200'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="mt-0.5">
                {item.checked ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-300" />
                )}
              </div>

              <div className="flex-1 space-y-1">
                <p className={`text-xs font-semibold ${item.checked ? 'text-emerald-900' : 'text-slate-800'}`}>
                  {item.title}
                </p>
                {item.note && (
                  <p className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-md border border-slate-200/80">
                    <strong className="text-slate-700">Observação:</strong> {item.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5W2H Action Plan Section */}
      <ActionPlan5W2H followUp={activeFollowUp} />
    </div>
  );
};

