import React from 'react';
import { useProjects } from '../../context/ProjectContext';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer
} from 'recharts';
import {
  ListTodo,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileCheck2
} from 'lucide-react';
import { formatCurrency, formatPercent } from '../../utils/calculations';
import { BudgetBreakdown } from './BudgetBreakdown';
import { ProgramSelectorBar } from '../common/ProgramSelectorBar';

export const PhysicalFinancialCockpit = ({ onNavigate }) => {
  const { cutoff, selectedProject, updateDeliverableStatus } = useProjects();

  if (!selectedProject) return null;
  const p = selectedProject;

  const getSelectStyle = (del) => {
    if (del.status === 'done') {
      return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    }
    if (del.isOverdue) {
      return 'bg-rose-50 text-rose-700 border-rose-200';
    }
    if (del.status === 'in_progress') {
      return 'bg-sky-50 text-sky-800 border-sky-200';
    }
    return 'bg-white text-slate-700 border-slate-300';
  };

  return (
    <div className="space-y-5">
      <ProgramSelectorBar />

      {/* Cabeçalho do Programa com Status Unificado */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
            <span className="font-mono font-bold text-[#2D5A27]">{p.code}</span>
            <span>·</span>
            <span>{p.funder}</span>
            <span>·</span>
            <span>Vigência: {p.startDate} a {p.endDate}</span>
          </div>
          <h1 className="text-lg font-bold text-slate-900">{p.name}</h1>
          <p className="text-xs text-slate-600">
            Coordenação: <strong className="text-slate-800">{p.manager}</strong> · {p.operationalHeadline}
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${p.statusMeta.badgeClass}`}>
            {p.statusMeta.label}
          </span>
          <button
            type="button"
            onClick={() => onNavigate('operations')}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <ListTodo className="w-3.5 h-3.5 text-[#2D5A27]" />
            <span>Ver Plano de Ação</span>
          </button>
        </div>
      </div>

      {/* 4 Indicadores Executivos de Execução e Conciliação */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs">
          <p className="text-xs text-slate-500 font-medium">Entregas Realizadas</p>
          <p
            className={`text-xl font-extrabold mt-1 ${
              p.schedule.severity === 'high' ? 'text-rose-600' : 'text-[#2D5A27]'
            }`}
          >
            {formatPercent(p.actualPhysical)}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Meta até {p.cutoffMonth.toLowerCase()}: <strong>{formatPercent(p.plannedPhysical)}</strong> ({p.completedMilestones}/{p.totalMilestones} concluídas)
          </p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs">
          <p className="text-xs text-slate-500 font-medium">Desembolso Pago</p>
          <p
            className={`text-xl font-extrabold mt-1 ${
              p.cost.severity === 'high' ? 'text-rose-600' : 'text-sky-700'
            }`}
          >
            {formatCurrency(p.executedBudget)}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {formatPercent(p.actualFinancial)} do orçamento ({formatCurrency(p.totalBudget)})
          </p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs">
          <p className="text-xs text-slate-500 font-medium">
            {p.retainedBudget > 0 ? 'Saldo Livre (Desimpedido)' : 'Saldo Disponível'}
          </p>
          <p className="text-xl font-extrabold text-slate-900 mt-1">
            {formatCurrency(p.freeBalance)}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {p.retainedBudget > 0 ? (
              <>
                Caixa total: <strong>{formatCurrency(p.remainingBudget)}</strong> ({formatCurrency(p.retainedBudget)} retidos)
              </>
            ) : (
              <>
                Para concluir <strong>{formatPercent(p.remainingScope)}</strong> do escopo
              </>
            )}
          </p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs">
          <p className="text-xs text-slate-500 font-medium">Conciliação Fiscal</p>
          {p.pendingProofs > 0 ? (
            <>
              <p className="text-xl font-extrabold text-amber-700 mt-1">
                {formatCurrency(p.pendingProofs)} <span className="text-xs font-semibold">sem NF</span>
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Comprovado: <strong>{formatCurrency(p.approvedProofs)}</strong> · cobrar recibo
              </p>
            </>
          ) : p.retainedBudget > 0 ? (
            <>
              <p className="text-xl font-extrabold text-amber-700 mt-1">
                {formatCurrency(p.retainedBudget)} <span className="text-xs font-semibold">retidos</span>
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Pago 100% comprovado · 1 NF aguarda CND
              </p>
            </>
          ) : (
            <>
              <p className="text-xl font-extrabold text-emerald-700 mt-1">100% regular</p>
              <p className="text-xs text-slate-500 mt-1">
                {formatCurrency(p.approvedProofs)} com NF validada
              </p>
            </>
          )}
        </div>
      </div>

      {/* Evolução Físico-Financeira (Curva S enxuta) */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Evolução Mensal — Entregas vs. Desembolso
            </h2>
            <p className="text-xs text-slate-500">
              Curva acumulada prevista no plano de trabalho frente ao realizado até {cutoff.formattedDate}
            </p>
          </div>
          {p.retainedBudget > 0 && (
            <span className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 self-start sm:self-auto">
              Diferença financeira reflete {formatCurrency(p.retainedBudget)} com liquidação retida por CND
            </span>
          )}
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={p.curveS} margin={{ top: 8, right: 16, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 12 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 12 }} unit="%" domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderColor: '#cbd5e1',
                  borderRadius: '0.75rem',
                  fontSize: '12px',
                  color: '#0f172a'
                }}
                formatter={(val, name) => [val !== null ? `${val}%` : 'Ciclo futuro', name]}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '4px' }} />
              <ReferenceLine x={p.cutoffMonth} stroke="#94a3b8" strokeDasharray="4 4" />
              <Line
                type="monotone"
                dataKey="plannedPhysical"
                name="Físico planejado"
                stroke="#65a30d"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 2.5 }}
              />
              <Line
                type="monotone"
                dataKey="actualPhysical"
                name="Físico realizado"
                stroke="#2D5A27"
                strokeWidth={3}
                dot={{ r: 3.5 }}
                connectNulls={false}
              />
              <Line
                type="monotone"
                dataKey="plannedFinancial"
                name="Desembolso planejado"
                stroke="#38bdf8"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 2.5 }}
              />
              <Line
                type="monotone"
                dataKey="actualFinancial"
                name="Desembolso pago"
                stroke="#0284c7"
                strokeWidth={3}
                dot={{ r: 3.5 }}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cronograma de Entregas do Plano de Trabalho (Linha do Tempo Estruturada) */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Cronograma de Entregas do Plano de Trabalho
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Acompanhamento por etapa pactuada, prazo contratual e documento comprobatório (peso de {formatPercent(100 / p.totalMilestones)} por etapa)
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
              {p.completedMilestones}/{p.totalMilestones} concluídas
            </span>
            {p.overdueMilestones > 0 && (
              <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 font-semibold">
                {p.overdueMilestones} {p.overdueMilestones === 1 ? 'etapa atrasada' : 'etapas atrasadas'}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-0">
          {p.deliverables.map((del, idx) => {
            const isLast = idx === p.deliverables.length - 1;

            return (
              <div key={del.id} className="flex items-stretch gap-3.5">
                {/* Trilho vertical conectado */}
                <div className="flex flex-col items-center shrink-0 pt-1">
                  {del.status === 'done' ? (
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-2xs">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  ) : del.isOverdue ? (
                    <div className="w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-2xs">
                      <AlertCircle className="w-4 h-4" />
                    </div>
                  ) : del.status === 'in_progress' ? (
                    <div className="w-7 h-7 rounded-full bg-sky-600 text-white flex items-center justify-center shadow-2xs">
                      <Clock className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 border border-slate-300 text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </div>
                  )}

                  {!isLast && (
                    <div
                      className={`w-0.5 flex-1 my-1 ${
                        del.status === 'done' ? 'bg-emerald-300' : 'bg-slate-200'
                      }`}
                    />
                  )}
                </div>

                {/* Card estruturado da etapa */}
                <div
                  className={`flex-1 mb-3 p-3.5 rounded-xl border transition ${
                    del.isOverdue
                      ? 'bg-rose-50/30 border-rose-200'
                      : del.status === 'done'
                      ? 'bg-slate-50/50 border-slate-200/80'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                    {/* Bloco Principal: Período, Título, Contexto e Meio de Verificação */}
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap text-[11px]">
                        <span className="font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          Etapa {idx + 1} · {del.period}
                        </span>

                        {del.status === 'done' ? (
                          <span className="text-emerald-800 font-medium">
                            Entregue em <strong>{del.completedAt}</strong> (meta {del.deadline})
                          </span>
                        ) : del.isOverdue ? (
                          <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 font-semibold">
                            Prazo vencido em {del.deadline} ({del.daysOverdue} dias de atraso)
                          </span>
                        ) : (
                          <span className="text-slate-500">
                            Prazo contratual: <strong className="text-slate-700">{del.deadline}</strong>
                          </span>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {del.name}
                      </p>

                      {del.fieldNote && (
                        <p className="text-xs text-slate-600 leading-normal">
                          {del.fieldNote}
                        </p>
                      )}

                      {del.deliverableDoc && (
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-0.5">
                          <FileCheck2 className="w-3.5 h-3.5 text-[#2D5A27] shrink-0" />
                          <span>
                            Meio de verificação: <strong className="font-medium text-slate-700">{del.deliverableDoc}</strong>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Bloco de Governança: Contribuição Física + Seletor Limpo de Status */}
                    <div className="flex items-center justify-between sm:justify-end gap-2.5 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-200/70 shrink-0">
                      <div className="text-left sm:text-right">
                        <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                          Avanço na meta
                        </span>
                        <span
                          className={`text-xs font-bold ${
                            del.status === 'done'
                              ? 'text-emerald-700'
                              : del.status === 'in_progress'
                              ? 'text-sky-700'
                              : 'text-slate-500'
                          }`}
                        >
                          +{formatPercent(del.contribution)}{' '}
                          <span className="text-[11px] font-normal text-slate-400">
                            / {formatPercent(del.weight)}
                          </span>
                        </span>
                      </div>

                      <select
                        aria-label={`Status da etapa ${del.name}`}
                        value={del.status}
                        onChange={(e) => updateDeliverableStatus(p.id, del.id, e.target.value)}
                        className={`text-xs font-semibold rounded-lg px-2.5 py-1.5 border cursor-pointer focus:outline-none ${getSelectStyle(
                          del
                        )}`}
                      >
                        <option value="pending">Não iniciada (0%)</option>
                        <option value="in_progress">Em andamento (50%)</option>
                        <option value="done">Concluída (100%)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Execução Orçamentária por Rubrica e Conciliação de Notas */}
      <BudgetBreakdown key={p.id} project={p} />
    </div>
  );
};
