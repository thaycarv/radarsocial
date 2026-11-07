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
import { ListTodo } from 'lucide-react';
import { formatCurrency, formatPercent } from '../../utils/calculations';
import { BudgetBreakdown } from './BudgetBreakdown';
import { ProgramSelectorBar } from '../common/ProgramSelectorBar';

const STATUS_OPTIONS = [
  { id: 'pending', label: 'Não iniciada' },
  { id: 'in_progress', label: 'Em andamento' },
  { id: 'done', label: 'Concluída' }
];

export const PhysicalFinancialCockpit = ({ onNavigate }) => {
  const { selectedProject, updateDeliverableStatus } = useProjects();

  if (!selectedProject) return null;
  const p = selectedProject;

  return (
    <div className="space-y-5">
      <ProgramSelectorBar />

      {/* Cabeçalho direto do Programa */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-mono font-bold text-[#2D5A27]">{p.code}</span>
            <span>·</span>
            <span>{p.funder}</span>
            <span>·</span>
            <span>{p.startDate} a {p.endDate}</span>
          </div>
          <h1 className="text-lg font-bold text-slate-900">{p.name}</h1>
          <p className="text-xs text-slate-500">Responsável: {p.manager}</p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className={`px-2.5 py-1 rounded-full border text-xs font-semibold ${p.schedule.badgeClass}`}>
            Prazo: {p.schedule.label}
          </span>
          <span className={`px-2.5 py-1 rounded-full border text-xs font-semibold ${p.cost.badgeClass}`}>
            Custo: {p.cost.label}
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

      {/* 4 KPIs Humanos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs">
          <p className="text-xs text-slate-500 font-medium">Avanço Físico</p>
          <p className="text-xl font-extrabold text-[#2D5A27] mt-1">
            {formatPercent(p.actualPhysical)}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Previsto até {p.cutoffMonth.toLowerCase()}: <strong>{formatPercent(p.plannedPhysical)}</strong>
          </p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs">
          <p className="text-xs text-slate-500 font-medium">Orçamento Pago</p>
          <p
            className={`text-xl font-extrabold mt-1 ${
              p.cost.severity === 'high' ? 'text-rose-600' : 'text-sky-700'
            }`}
          >
            {formatCurrency(p.executedBudget)}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {formatPercent(p.actualFinancial)} de {formatCurrency(p.totalBudget)}
          </p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs">
          <p className="text-xs text-slate-500 font-medium">Saldo em Caixa</p>
          <p className="text-xl font-extrabold text-slate-900 mt-1">
            {formatCurrency(p.remainingBudget)}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Para concluir <strong>{formatPercent(p.remainingScope)}</strong> do cronograma
          </p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs">
          <p className="text-xs text-slate-500 font-medium">Sem Comprovante</p>
          <p
            className={`text-xl font-extrabold mt-1 ${
              p.pendingProofs > 0 ? 'text-amber-700' : 'text-emerald-700'
            }`}
          >
            {formatCurrency(p.pendingProofs)}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {p.pendingProofs > 0 ? 'Aguardando NF ou recibo' : '100% comprovado'}
          </p>
        </div>
      </div>

      {/* Gráfico + Marcos do Cronograma */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs flex flex-col justify-between space-y-3">
          <h2 className="text-sm font-bold text-slate-900">Evolução Físico-Financeira</h2>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={p.curveS} margin={{ top: 10, right: 16, left: -16, bottom: 0 }}>
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
                  formatter={(val, name) => [val !== null ? `${val}%` : 'Futuro', name]}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '6px' }} />
                <ReferenceLine
                  x={p.cutoffMonth}
                  stroke="#94a3b8"
                  strokeDasharray="4 4"
                />
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
                  name="Financeiro planejado"
                  stroke="#38bdf8"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 2.5 }}
                />
                <Line
                  type="monotone"
                  dataKey="actualFinancial"
                  name="Financeiro pago"
                  stroke="#0284c7"
                  strokeWidth={3}
                  dot={{ r: 3.5 }}
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Marcos do Cronograma (0 / 50 / 100) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-3.5">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-bold text-slate-900">Marcos do Cronograma</h2>
            <span className="text-xs font-semibold text-slate-500">
              {p.completedMilestones}/{p.totalMilestones} concluídos ·{' '}
              <strong className="text-[#2D5A27]">{formatPercent(p.actualPhysical)}</strong>
            </span>
          </div>

          <div className="space-y-2.5">
            {p.deliverables.map((del, idx) => (
              <div
                key={del.id}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-white border border-slate-200 text-[11px] font-bold text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-900 leading-snug">
                        {del.name}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] text-slate-500">Prazo: {del.deadline}</span>
                        {del.isOverdue && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                            Atrasada
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-1 bg-white p-1 rounded-lg border border-slate-200">
                  {STATUS_OPTIONS.map((opt) => {
                    const active = del.status === opt.id;
                    let activeStyle = 'text-slate-500 hover:text-slate-800';
                    if (active && opt.id === 'done') {
                      activeStyle = 'bg-emerald-600 text-white font-semibold shadow-2xs';
                    } else if (active && opt.id === 'in_progress') {
                      activeStyle = 'bg-sky-600 text-white font-semibold shadow-2xs';
                    } else if (active && opt.id === 'pending') {
                      activeStyle = 'bg-slate-600 text-white font-semibold shadow-2xs';
                    }

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => updateDeliverableStatus(p.id, del.id, opt.id)}
                        className={`py-1 px-1.5 rounded-md text-[11px] transition cursor-pointer text-center ${activeStyle}`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Orçamento por Rubrica */}
      <BudgetBreakdown project={p} />
    </div>
  );
};
