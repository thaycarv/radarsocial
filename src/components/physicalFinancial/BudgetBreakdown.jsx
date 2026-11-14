import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  ShieldAlert,
  ChevronDown,
  ChevronRight,
  Plus,
  FileCheck,
  Unlock,
  X
} from 'lucide-react';
import { formatCurrency, formatPercent } from '../../utils/calculations';
import { useProjects } from '../../context/ProjectContext';

export const BudgetBreakdown = ({ project }) => {
  const {
    cutoff,
    validateExpenseProof,
    releaseRetainedExpense,
    addRubricExpense,
    addEvidence
  } = useProjects();

  // Abre automaticamente a primeira rubrica que possua pendência documental ou retenção (ou a primeira rubrica)
  const initialOpenId =
    project?.budgetBreakdown?.find((r) => r.pendingProofs > 0 || r.retainedAmount > 0)?.id ||
    project?.budgetBreakdown?.[0]?.id ||
    null;

  const [expandedIds, setExpandedIds] = useState(() =>
    initialOpenId ? [initialOpenId] : []
  );

  const [validatingExpId, setValidatingExpId] = useState(null);
  const [proofInput, setProofInput] = useState('');

  const [showAddForm, setShowAddForm] = useState(false);
  const [formError, setFormError] = useState('');
  const [expenseForm, setExpenseForm] = useState({
    rubricId: project?.budgetBreakdown?.[0]?.id || '',
    supplier: '',
    description: '',
    amount: '',
    status: 'approved',
    docRef: ''
  });

  if (!project || !project.budgetBreakdown) return null;

  const toggleExpand = (rubricId) => {
    setExpandedIds((prev) =>
      prev.includes(rubricId) ? prev.filter((id) => id !== rubricId) : [...prev, rubricId]
    );
  };

  const selectedRubric =
    project.budgetBreakdown.find((r) => r.id === expenseForm.rubricId) ||
    project.budgetBreakdown[0];

  const typedAmount = Math.round(Number(expenseForm.amount) || 0);
  const exceedsCeiling =
    selectedRubric && typedAmount > 0 && typedAmount > selectedRubric.availableBalance;

  const handleStartValidation = (exp) => {
    setValidatingExpId(exp.id);
    setProofInput('');
  };

  const handleConfirmValidation = (rubric, exp) => {
    const cleanRef = proofInput.trim();
    if (!cleanRef) return;
    validateExpenseProof(project.id, rubric.id, exp.id, cleanRef);
    addEvidence({
      projectId: project.id,
      category: 'Financeiro',
      title: `${exp.supplier}: ${exp.description}`,
      referenceCode: cleanRef,
      date: cutoff.formattedDate,
      responsible: project.manager
    });
    setValidatingExpId(null);
    setProofInput('');
  };

  const handleCreateExpense = (e) => {
    e.preventDefault();
    setFormError('');

    if (
      !expenseForm.supplier.trim() ||
      !expenseForm.description.trim() ||
      !expenseForm.docRef.trim() ||
      typedAmount <= 0
    ) {
      setFormError('Preencha fornecedor, descrição, documento e um valor válido.');
      return;
    }

    const res = addRubricExpense(project.id, selectedRubric.id, {
      date: cutoff.formattedDate,
      supplier: expenseForm.supplier,
      description: expenseForm.description,
      docRef: expenseForm.docRef,
      amount: typedAmount,
      status: expenseForm.status
    });

    if (!res.ok) {
      setFormError(res.error);
      return;
    }

    if (expenseForm.status === 'approved') {
      addEvidence({
        projectId: project.id,
        category: 'Financeiro',
        title: `${expenseForm.supplier.trim()}: ${expenseForm.description.trim()}`,
        referenceCode: expenseForm.docRef.trim(),
        date: cutoff.formattedDate,
        responsible: project.manager
      });
    }

    if (!expandedIds.includes(selectedRubric.id)) {
      setExpandedIds((prev) => [...prev, selectedRubric.id]);
    }

    setExpenseForm({
      rubricId: selectedRubric.id,
      supplier: '',
      description: '',
      amount: '',
      status: 'approved',
      docRef: ''
    });
    setShowAddForm(false);
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-4">
      {/* Cabeçalho de Governança Financeira */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            Execução Orçamentária por Rubrica e Conciliação Fiscal
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Valores apurados pelos pagamentos e notas fiscais vinculados a cada rubrica (clique na rubrica para ver os lançamentos)
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setShowAddForm((prev) => !prev);
            setFormError('');
          }}
          className="px-3 py-1.5 bg-[#2D5A27] hover:bg-[#1E3F20] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{showAddForm ? 'Cancelar lançamento' : 'Registrar despesa'}</span>
        </button>
      </div>

      {/* Formulário de Registro Analítico de Despesa com Trava de Teto de Rubrica */}
      {showAddForm && (
        <form
          onSubmit={handleCreateExpense}
          className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs"
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-800">
              Novo lançamento financeiro no plano de trabalho
            </span>
            <span className="text-[11px] text-slate-500">
              Data de competência: <strong>{cutoff.formattedDate}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Rubrica orçamentária *</label>
              <select
                aria-label="Rubrica orçamentária"
                value={selectedRubric?.id || ''}
                onChange={(e) =>
                  setExpenseForm({ ...expenseForm, rubricId: e.target.value })
                }
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
              >
                {project.budgetBreakdown.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.category} (Livre: {formatCurrency(r.availableBalance)})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Fornecedor / Prestador *</label>
              <input
                type="text"
                required
                value={expenseForm.supplier}
                onChange={(e) =>
                  setExpenseForm({ ...expenseForm, supplier: e.target.value })
                }
                placeholder="Ex.: ConectaFibra Suprimentos"
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Descrição do item/serviço *</label>
              <input
                type="text"
                required
                value={expenseForm.description}
                onChange={(e) =>
                  setExpenseForm({ ...expenseForm, description: e.target.value })
                }
                placeholder="Ex.: Cabeamento óptico interno do Polo Norte"
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Valor (R$) *</label>
              <input
                type="number"
                required
                min={1}
                step={1}
                value={expenseForm.amount}
                onChange={(e) =>
                  setExpenseForm({ ...expenseForm, amount: e.target.value })
                }
                placeholder="Ex.: 4500"
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Situação documental *</label>
              <select
                aria-label="Situação documental"
                value={expenseForm.status}
                onChange={(e) =>
                  setExpenseForm({ ...expenseForm, status: e.target.value })
                }
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
              >
                <option value="approved">Pago com NF validada</option>
                <option value="pending_proof">Adiantamento aguardando NF</option>
                <option value="retained">NF emitida · pagamento retido (CND)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Nº Documento / Protocolo *</label>
              <input
                type="text"
                required
                value={expenseForm.docRef}
                onChange={(e) =>
                  setExpenseForm({ ...expenseForm, docRef: e.target.value })
                }
                placeholder="Ex.: NF-e #4590 ou PIX #9120"
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
              />
            </div>
          </div>

          {exceedsCeiling && (
            <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-medium">
              Bloqueio de teto orçamentário: o valor de{' '}
              <strong>{formatCurrency(typedAmount)}</strong> ultrapassa o saldo livre de{' '}
              <strong>{formatCurrency(selectedRubric.availableBalance)}</strong> na rubrica{' '}
              <strong>{selectedRubric.category}</strong>. Acima do teto aprovado exige remanejamento prévio junto ao financiador.
            </div>
          )}

          {formError && !exceedsCeiling && (
            <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-medium">
              {formError}
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
            <span className="text-[11px] text-slate-500">
              Saldo livre na rubrica selecionada:{' '}
              <strong className="text-slate-800">
                {formatCurrency(selectedRubric?.availableBalance || 0)}
              </strong>
              {typedAmount > 0 && !exceedsCeiling && (
                <>
                  {' '}→ após registro:{' '}
                  <strong className="text-[#2D5A27]">
                    {formatCurrency(selectedRubric.availableBalance - typedAmount)}
                  </strong>
                </>
              )}
            </span>

            <button
              type="submit"
              disabled={exceedsCeiling}
              className={`px-4 py-1.5 rounded-lg font-semibold text-white transition ${
                exceedsCeiling
                  ? 'bg-slate-300 cursor-not-allowed'
                  : 'bg-[#2D5A27] hover:bg-[#1E3F20] cursor-pointer'
              }`}
            >
              Confirmar lançamento
            </button>
          </div>
        </form>
      )}

      {/* Tabela Sintética de Rubricas com Razão Analítico Expansível */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600 font-semibold border-y border-slate-200">
            <tr>
              <th className="py-2.5 px-3">Rubrica do Plano de Trabalho</th>
              <th className="py-2.5 px-3 whitespace-nowrap">Orçado (Teto)</th>
              <th className="py-2.5 px-3 whitespace-nowrap">Pago</th>
              <th className="py-2.5 px-3">Conciliação Fiscal</th>
              <th className="py-2.5 px-3 whitespace-nowrap">Saldo Livre</th>
              <th className="py-2.5 px-3 text-center whitespace-nowrap">% Uso</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {project.budgetBreakdown.map((item) => {
              const isExpanded = expandedIds.includes(item.id);
              const isTight = item.committedRate >= 95;

              return (
                <React.Fragment key={item.id}>
                  <tr
                    onClick={() => toggleExpand(item.id)}
                    className={`hover:bg-slate-50/80 transition cursor-pointer ${
                      isExpanded ? 'bg-slate-50/50' : ''
                    }`}
                  >
                    <td className="py-3 px-3 font-semibold text-slate-900">
                      <div className="flex items-center gap-2">
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-[#2D5A27] shrink-0" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                        <span>{item.category}</span>
                        <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-500 text-[10px] font-medium border border-slate-200 shrink-0">
                          {item.expenses.length} {item.expenses.length === 1 ? 'nota' : 'notas'}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                      {formatCurrency(item.budgeted)}
                    </td>

                    <td className="py-3 px-3 font-bold text-slate-900 whitespace-nowrap">
                      {formatCurrency(item.executed)}
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-medium whitespace-nowrap">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {formatCurrency(item.approvedProofs)}
                        </span>

                        {item.pendingProofs > 0 && (
                          <span className="inline-flex items-center gap-1 text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-[11px] whitespace-nowrap">
                            <Clock className="w-3 h-3 text-amber-600" />
                            {formatCurrency(item.pendingProofs)} sem NF
                          </span>
                        )}

                        {item.retainedAmount > 0 && (
                          <span className="inline-flex items-center gap-1 text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-[11px] whitespace-nowrap">
                            <ShieldAlert className="w-3 h-3 text-amber-600" />
                            {formatCurrency(item.retainedAmount)} retidos (CND)
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`font-semibold ${
                          isTight ? 'text-rose-700' : 'text-slate-800'
                        }`}
                      >
                        {formatCurrency(item.availableBalance)}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-bold text-slate-800 w-11 text-right">
                          {formatPercent(item.committedRate)}
                        </span>
                        <div className="w-14 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              item.committedRate >= 95 ? 'bg-amber-600' : 'bg-sky-600'
                            }`}
                            style={{ width: `${Math.min(item.committedRate, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>

                  {/* Razão Analítico da Rubrica (Notas Fiscais, Adiantamentos e Retenções) */}
                  {isExpanded && (
                    <tr>
                      <td colSpan={6} className="p-0 bg-slate-50/70">
                        <div className="px-4 py-3 border-l-4 border-l-[#2D5A27] space-y-2">
                          <div className="flex items-center justify-between text-[11px] text-slate-500">
                            <span className="font-semibold text-slate-700">
                              Lançamentos vinculados · {item.category}
                            </span>
                            <span>
                              Teto: {formatCurrency(item.budgeted)} · Comprometido:{' '}
                              {formatCurrency(item.committed)} · Saldo livre:{' '}
                              <strong>{formatCurrency(item.availableBalance)}</strong>
                            </span>
                          </div>

                          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                            <table className="w-full text-left text-[11px]">
                              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                                <tr>
                                  <th className="py-2 px-3 w-24">Data</th>
                                  <th className="py-2 px-3">Fornecedor e Objeto</th>
                                  <th className="py-2 px-3 w-48">Documento Fiscal</th>
                                  <th className="py-2 px-3 w-28 text-right">Valor</th>
                                  <th className="py-2 px-3 w-56 text-right">Status / Ação</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {item.expenses.map((exp) => {
                                  const isValidatingThis = validatingExpId === exp.id;

                                  return (
                                    <tr key={exp.id} className="hover:bg-slate-50/60">
                                      <td className="py-2.5 px-3 text-slate-500 whitespace-nowrap">
                                        {exp.date}
                                      </td>
                                      <td className="py-2.5 px-3">
                                        <span className="font-semibold text-slate-900 block">
                                          {exp.supplier}
                                        </span>
                                        <span className="text-slate-500">{exp.description}</span>
                                      </td>
                                      <td className="py-2.5 px-3 font-mono text-slate-700">
                                        {exp.docRef}
                                      </td>
                                      <td className="py-2.5 px-3 text-right font-bold text-slate-900 whitespace-nowrap">
                                        {formatCurrency(exp.amount)}
                                      </td>
                                      <td
                                        className="py-2.5 px-3 text-right"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        {exp.status === 'approved' && (
                                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                                            <CheckCircle2 className="w-3 h-3" />
                                            NF validada
                                          </span>
                                        )}

                                        {exp.status === 'pending_proof' && !isValidatingThis && (
                                          <div className="inline-flex items-center gap-1.5">
                                            <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                                              Sem NF
                                            </span>
                                            <button
                                              type="button"
                                              onClick={() => handleStartValidation(exp)}
                                              className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-white font-semibold inline-flex items-center gap-1 cursor-pointer transition"
                                            >
                                              <FileCheck className="w-3 h-3" />
                                              <span>Anexar NF</span>
                                            </button>
                                          </div>
                                        )}

                                        {exp.status === 'pending_proof' && isValidatingThis && (
                                          <div className="inline-flex items-center gap-1">
                                            <input
                                              type="text"
                                              value={proofInput}
                                              onChange={(e) => setProofInput(e.target.value)}
                                              placeholder="Ex.: NF-e #5012"
                                              aria-label="Número da nota fiscal"
                                              className="w-28 bg-white border border-slate-300 rounded px-2 py-0.5 text-[11px] text-slate-900"
                                            />
                                            <button
                                              type="button"
                                              onClick={() => handleConfirmValidation(item, exp)}
                                              className="px-2 py-0.5 rounded bg-[#2D5A27] hover:bg-[#1E3F20] text-white font-semibold cursor-pointer"
                                            >
                                              OK
                                            </button>
                                            <button
                                              type="button"
                                              onClick={() => setValidatingExpId(null)}
                                              className="p-0.5 rounded bg-slate-200 text-slate-700 hover:bg-slate-300 cursor-pointer"
                                              aria-label="Cancelar validação"
                                            >
                                              <X className="w-3 h-3" />
                                            </button>
                                          </div>
                                        )}

                                        {exp.status === 'retained' && (
                                          <div className="inline-flex items-center gap-1.5">
                                            <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                                              Retido · CND
                                            </span>
                                            <button
                                              type="button"
                                              onClick={() => {
                                                releaseRetainedExpense(
                                                  project.id,
                                                  item.id,
                                                  exp.id
                                                );
                                                addEvidence({
                                                  projectId: project.id,
                                                  category: 'Financeiro',
                                                  title: `${exp.supplier}: quitação liberada após renovação da CND`,
                                                  referenceCode:
                                                    (exp.docRef || '')
                                                      .replace(/\s*·\s*CND pendente/i, '')
                                                      .trim() || 'CND regularizada',
                                                  date: cutoff.formattedDate,
                                                  responsible: project.manager
                                                });
                                              }}
                                              className="px-2 py-0.5 rounded bg-[#2D5A27] hover:bg-[#1E3F20] text-white font-semibold inline-flex items-center gap-1 cursor-pointer transition"
                                              title="Registrar renovação da certidão negativa e liberar pagamento"
                                            >
                                              <Unlock className="w-3 h-3" />
                                              <span>Liberar CND</span>
                                            </button>
                                          </div>
                                        )}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
          <tfoot className="bg-slate-50 border-t border-slate-200 font-bold text-slate-900">
            <tr>
              <td className="py-2.5 px-3">Total do Programa</td>
              <td className="py-2.5 px-3">{formatCurrency(project.totalBudget)}</td>
              <td className="py-2.5 px-3">{formatCurrency(project.executedBudget)}</td>
              <td className="py-2.5 px-3">
                <span className="text-emerald-700">{formatCurrency(project.approvedProofs)} comprovados</span>
                {project.pendingProofs > 0 && (
                  <span className="text-amber-800 ml-2">
                    · {formatCurrency(project.pendingProofs)} sem NF
                  </span>
                )}
                {project.retainedBudget > 0 && (
                  <span className="text-amber-800 ml-2">
                    · {formatCurrency(project.retainedBudget)} retidos
                  </span>
                )}
              </td>
              <td className="py-2.5 px-3">{formatCurrency(project.freeBalance)}</td>
              <td className="py-2.5 px-3 text-center text-sky-700">
                {formatPercent(project.actualFinancial)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
