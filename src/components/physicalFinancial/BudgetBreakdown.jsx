import React, { useState } from 'react';
import { CheckCircle2, Clock, FileCheck, Edit2, Check, X } from 'lucide-react';
import { formatCurrency, formatPercent } from '../../utils/calculations';
import { TooltipHelp } from '../common/TooltipHelp';
import { useProjects } from '../../context/ProjectContext';

export const BudgetBreakdown = ({ project }) => {
  const { updateRubricValues } = useProjects();
  const [editingId, setEditingId] = useState(null);
  const [execInput, setExecInput] = useState(0);
  const [approvedInput, setApprovedInput] = useState(0);

  if (!project || !project.budgetBreakdown) return null;

  const startEdit = (rubric) => {
    setEditingId(rubric.id);
    setExecInput(rubric.executed);
    setApprovedInput(rubric.approvedProofs);
  };

  const saveEdit = (rubricId) => {
    updateRubricValues(project.id, rubricId, execInput, approvedInput);
    setEditingId(null);
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-[#2D5A27]" />
            <span>Execução Financeira por Rubrica e Prestação de Contas</span>
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            O % financeiro do programa deriva automaticamente da soma paga nas rubricas dividida pelo orçamento aprovado.
          </p>
        </div>
        <span className="text-xs text-slate-500">
          Clique em <strong>Editar</strong> em uma rubrica para atualizar pagamentos ou comprovantes
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-700 font-semibold uppercase tracking-wider border-y border-slate-200">
            <tr>
              <th className="py-2.5 px-3">Rubrica Orçamentária</th>
              <th className="py-2.5 px-3">Orçado</th>
              <th className="py-2.5 px-3">Executado (Pago)</th>
              <th className="py-2.5 px-3">Comprovado (NF/Recibo)</th>
              <th className="py-2.5 px-3">
                <div className="flex items-center gap-1.5">
                  <span>Aguardando Comprovante</span>
                  <TooltipHelp
                    position="bottom"
                    title="Despesas Aguardando Comprovação"
                    text="Diferença entre o valor já pago ao fornecedor/bolsista e o valor cujos documentos fiscais já foram conferidos e aprovados."
                  />
                </div>
              </th>
              <th className="py-2.5 px-3 text-center">Execução da Rubrica</th>
              <th className="py-2.5 px-3 text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {project.budgetBreakdown.map((item) => {
              const pending = Math.max(0, item.executed - item.approvedProofs);
              const execRate = item.budgeted > 0 ? (item.executed / item.budgeted) * 100 : 0;
              const isEditing = editingId === item.id;

              return (
                <tr key={item.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 px-3 font-semibold text-slate-800">{item.category}</td>
                  <td className="py-3 px-3 text-slate-600">{formatCurrency(item.budgeted)}</td>

                  <td className="py-3 px-3 font-semibold text-slate-900">
                    {isEditing ? (
                      <input
                        type="number"
                        min={0}
                        step={1000}
                        aria-label={`Valor pago em ${item.category}`}
                        value={execInput}
                        onChange={(e) => setExecInput(Number(e.target.value))}
                        className="w-28 bg-white border border-slate-300 rounded px-2 py-1 text-xs font-semibold text-slate-900"
                      />
                    ) : (
                      formatCurrency(item.executed)
                    )}
                  </td>

                  <td className="py-3 px-3 text-emerald-700 font-medium">
                    {isEditing ? (
                      <input
                        type="number"
                        min={0}
                        max={execInput}
                        step={1000}
                        aria-label={`Valor comprovado em ${item.category}`}
                        value={approvedInput}
                        onChange={(e) => setApprovedInput(Number(e.target.value))}
                        className="w-28 bg-white border border-slate-300 rounded px-2 py-1 text-xs font-semibold text-slate-900"
                      />
                    ) : (
                      <span className="inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {formatCurrency(item.approvedProofs)}
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-3">
                    {pending > 0 ? (
                      <span className="inline-flex items-center gap-1 text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        <Clock className="w-3 h-3 text-amber-600" />
                        {formatCurrency(pending)}
                      </span>
                    ) : (
                      <span className="text-slate-500">100% comprovado</span>
                    )}
                  </td>

                  <td className="py-3 px-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-bold text-slate-800">{formatPercent(execRate)}</span>
                      <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            execRate > 100 ? 'bg-rose-600' : 'bg-sky-600'
                          }`}
                          style={{ width: `${Math.min(execRate, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3 text-right">
                    {isEditing ? (
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => saveEdit(item.id)}
                          className="p-1.5 bg-[#2D5A27] text-white rounded hover:bg-[#1E3F20] cursor-pointer"
                          title="Salvar valores"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="p-1.5 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 cursor-pointer"
                          title="Cancelar"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => startEdit(item)}
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded border border-slate-200 cursor-pointer"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Editar</span>
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="bg-slate-50 border-t-2 border-slate-200 font-bold text-slate-900">
            <tr>
              <td className="py-3 px-3">Total do Programa</td>
              <td className="py-3 px-3">{formatCurrency(project.totalBudget)}</td>
              <td className="py-3 px-3">{formatCurrency(project.executedBudget)}</td>
              <td className="py-3 px-3 text-emerald-700">{formatCurrency(project.approvedProofs)}</td>
              <td className="py-3 px-3 text-amber-800">{formatCurrency(project.pendingProofs)}</td>
              <td className="py-3 px-3 text-center text-sky-700">
                {formatPercent(project.actualFinancial)}
              </td>
              <td className="py-3 px-3"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
