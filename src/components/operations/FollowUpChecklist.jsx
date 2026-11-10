import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import {
  CheckCircle2,
  Circle,
  Plus,
  AlertTriangle,
  LineChart
} from 'lucide-react';
import { ActionPlan5W2H } from './ActionPlan5W2H';
import { ProgramSelectorBar } from '../common/ProgramSelectorBar';

export const FollowUpChecklist = ({ onNavigate }) => {
  const {
    cutoff,
    selectedProjectId,
    selectedProject,
    followUps,
    toggleChecklistItem,
    addChecklistItem
  } = useProjects();

  const [newItemTitle, setNewItemTitle] = useState('');

  const activeFollowUp =
    followUps.find((f) => f.projectId === selectedProjectId) || followUps[0];

  if (!selectedProject || !activeFollowUp) return null;

  const p = selectedProject;
  const completedItems = activeFollowUp.items.filter((i) => i.checked).length;
  const totalItems = activeFollowUp.items.length;

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemTitle.trim()) return;
    addChecklistItem(activeFollowUp.id, {
      title: newItemTitle.trim(),
      responsible: p.manager || activeFollowUp.responsible,
      deadline: cutoff.formattedDate,
      note: 'Incluído no acompanhamento da carteira.'
    });
    setNewItemTitle('');
  };

  return (
    <div className="space-y-5">
      <ProgramSelectorBar />

      {/* Cabeçalho consistente com a aba de Execução e Orçamento */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
            <span className="font-mono font-bold text-[#2D5A27]">{p.code}</span>
            <span>·</span>
            <span>{p.funder}</span>
            <span>·</span>
            <span>Rotina {activeFollowUp.frequency?.toLowerCase()}</span>
          </div>
          <h1 className="text-lg font-bold text-slate-900">{p.name}</h1>
          <p className="text-xs text-slate-600">
            Reunião conduzida por <strong className="text-slate-800">{activeFollowUp.responsible}</strong> com{' '}
            <strong className="text-slate-800">{p.manager}</strong> · Última ata: <strong>{activeFollowUp.date}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          {p.statusMeta && (
            <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${p.statusMeta.badgeClass}`}>
              {p.statusMeta.label}
            </span>
          )}
          {onNavigate && (
            <button
              type="button"
              onClick={() => onNavigate('physicalFinancial')}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <LineChart className="w-3.5 h-3.5 text-[#2D5A27]" />
              <span>Ver Execução e Orçamento</span>
            </button>
          )}
        </div>
      </div>

      {/* Layout em 2 Colunas: Conferências + Riscos | Plano de Ação */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className="lg:col-span-5 space-y-5">
          {/* Verificações da Última Reunião */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Verificações da Última Reunião</h2>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Pontos checados junto à coordenação local em {activeFollowUp.date}
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-500 shrink-0">
                {completedItems}/{totalItems} conferidos
              </span>
            </div>

            <div className="space-y-2">
              {activeFollowUp.items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleChecklistItem(activeFollowUp.id, item.id)}
                  className={`w-full text-left p-3 rounded-xl border cursor-pointer flex items-start gap-2.5 transition ${
                    item.checked
                      ? 'bg-emerald-50/40 border-emerald-200/80'
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
                      {item.responsible} · Ref.: {item.deadline}
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
                placeholder="Registrar novo ponto de verificação..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-800 focus:outline-none focus:border-[#2D5A27]"
              />
              <button
                type="submit"
                className="p-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition cursor-pointer shrink-0"
                title="Registrar ponto"
                aria-label="Registrar ponto de verificação"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Riscos em Monitoramento */}
          {p.risks && p.risks.length > 0 && (
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-3">
              <div>
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Riscos em Monitoramento</span>
                </h2>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Eventos que podem afetar entregas futuras e resposta preventiva definida
                </p>
              </div>
              <div className="space-y-2.5">
                {p.risks.map((risk) => (
                  <div
                    key={risk.id}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-slate-900 leading-snug">
                        {risk.description}
                      </p>
                      <span
                        className={`shrink-0 px-2 py-0.5 rounded border text-[11px] font-semibold ${
                          risk.impact === 'Alto'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : risk.impact === 'Médio'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-white text-slate-600 border-slate-200'
                        }`}
                      >
                        Impacto {risk.impact}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-normal">
                      <strong>Mitigação:</strong> {risk.mitigation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Coluna Direita: Plano de Ação (Providências) */}
        <div className="lg:col-span-7">
          <ActionPlan5W2H key={p.id} followUp={activeFollowUp} project={p} />
        </div>
      </div>
    </div>
  );
};
