import React from 'react';
import { DollarSign, CheckCircle2, Clock, FileCheck } from 'lucide-react';
import { formatCurrency } from '../../utils/calculations';
import { TooltipHelp } from '../common/TooltipHelp';

export const BudgetBreakdown = ({ project }) => {
  if (!project || !project.budgetBreakdown) return null;

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-teal-600" />
          <span>Detalhamento por Rubricas & Comprovação Financeira</span>
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Comprovantes fiscais aprovados vs. pendências de liquidação.
        </p>
      </div>

      <div>
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider border-y border-slate-200">
            <tr>
              <th className="py-2.5 px-4">Rubrica Orçamentária</th>
              <th className="py-2.5 px-4">Orçado</th>
              <th className="py-2.5 px-4">Gasto Executado</th>
              <th className="py-2.5 px-4">Comprovações Aprovadas</th>
              <th className="py-2.5 px-4">
                <div className="flex items-center gap-1.5">
                  <span>Comprovações Pendentes</span>
                  <TooltipHelp
                    position="bottom"
                    title="O que são Comprovações Pendentes?"
                    text="Despesas já realizadas que aguardam a validação de notas fiscais, recibos ou relatórios de entrega para regularização."
                  />
                </div>
              </th>
              <th className="py-2.5 px-4 text-center">Taxa de Execução</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {project.budgetBreakdown.map((item, idx) => {
              const execRate = Math.round((item.executed / item.budgeted) * 100);
              return (
                <tr key={idx} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 px-4 font-semibold text-slate-800">{item.category}</td>
                  <td className="py-3 px-4 text-slate-500">{formatCurrency(item.budgeted)}</td>
                  <td className="py-3 px-4 font-semibold text-slate-900">{formatCurrency(item.executed)}</td>
                  <td className="py-3 px-4 text-emerald-700 font-medium">
                    <span className="inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {formatCurrency(item.approvedProofs)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {item.pendingProofs > 0 ? (
                      <span className="inline-flex items-center gap-1 text-amber-800 font-medium bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        <Clock className="w-3 h-3 text-amber-600" />
                        {formatCurrency(item.pendingProofs)}
                      </span>
                    ) : (
                      <span className="text-slate-400">Regularizado</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-bold text-slate-700">{execRate}%</span>
                      <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${execRate > 90 ? 'bg-rose-500' : 'bg-teal-600'}`}
                          style={{ width: `${Math.min(execRate, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

