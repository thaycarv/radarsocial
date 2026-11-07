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
  RotateCcw,
  CheckSquare,
  AlertTriangle,
  Info,
  ListTodo
} from 'lucide-react';
import {
  formatCurrency,
  formatPercent,
  formatPP,
  formatIndex
} from '../../utils/calculations';
import { BudgetBreakdown } from './BudgetBreakdown';
import { TooltipHelp } from '../common/TooltipHelp';

export const PhysicalFinancialCockpit = ({ onNavigate }) => {
  const {
    cutoff,
    selectedProject,
    updateDeliverableProgress,
    resetProjectToDefault
  } = useProjects();

  if (!selectedProject) return null;

  const p = selectedProject;

  return (
    <div className="space-y-6">
      {/* Cabeçalho do Programa Selecionado */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded bg-emerald-50 text-[#1E3F20] text-xs font-bold border border-emerald-200">
              {p.code} • {p.strategicAxis}
            </span>
            <span className="text-xs text-slate-600">
              Vigência: <strong>{p.startDate}</strong> a <strong>{p.endDate}</strong>
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">{p.name}</h1>
          <p className="text-xs text-slate-600">
            Financiador: <strong className="text-slate-800">{p.funder}</strong> • Responsável técnico: <strong className="text-slate-800">{p.manager}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className={`px-3 py-1 rounded-lg border text-xs font-bold ${p.schedule.badgeClass}`}>
            Prazo: {p.schedule.label} ({formatPP(p.schedule.gap)})
          </span>
          <span className={`px-3 py-1 rounded-lg border text-xs font-bold ${p.cost.badgeClass}`}>
            Custo: {p.cost.label} ({formatPP(p.cost.gap)})
          </span>
          <button
            type="button"
            onClick={() => onNavigate('operations')}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <ListTodo className="w-3.5 h-3.5 text-[#2D5A27]" />
            <span>Plano 5W2H</span>
          </button>
          <button
            type="button"
            onClick={() => resetProjectToDefault(p.id)}
            className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg border border-slate-200 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
            title="Restaurar medições deste programa"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar programa</span>
          </button>
        </div>
      </div>

      {/* Painel de Valor Agregado (EVM) e Saldo vs. Escopo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">Valor Planejado vs. Agregado</span>
            <TooltipHelp
              position="bottom"
              title="VP e VA (Valor Agregado)"
              text="VP = % Físico Planejado × Orçamento. VA = % Físico Realizado × Orçamento. Mede quanto do orçamento já se converteu efetivamente em entregas concluídas."
            />
          </div>
          <p className="text-lg font-extrabold text-[#2D5A27]">
            VA: {formatCurrency(p.earnedValue)}
          </p>
          <p className="text-xs text-slate-600">
            Previsto até {p.cutoffMonth} (VP): <strong>{formatCurrency(p.plannedValue)}</strong>
          </p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">Desempenho de Prazo (IDP)</span>
            <TooltipHelp
              position="bottom"
              title="IDP = VA / VP"
              text="Índice ≥ 1,00 indica entregas no ritmo previsto. Abaixo de 0,90 indica atraso relevante de cronograma."
            />
          </div>
          <p
            className={`text-lg font-extrabold ${
              p.spi < 0.9 ? 'text-rose-600' : p.spi < 0.95 ? 'text-amber-700' : 'text-[#2D5A27]'
            }`}
          >
            IDP = {formatIndex(p.spi)}
          </p>
          <p className="text-xs text-slate-600">
            Físico: <strong>{formatPercent(p.actualPhysical)}</strong> real vs. {formatPercent(p.plannedPhysical)} prev.
          </p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">Eficiência de Custo (IDC)</span>
            <TooltipHelp
              position="bottom"
              title="IDC = VA / CR"
              text="Compara o Valor Agregado (VA) com o Custo Real pago (CR). IDC = 0,53 significa que cada R$ 1,00 gasto gerou apenas R$ 0,53 em entrega física."
            />
          </div>
          <p
            className={`text-lg font-extrabold ${
              p.cpi < 0.85 ? 'text-rose-600' : p.cpi < 0.95 ? 'text-amber-700' : 'text-sky-700'
            }`}
          >
            IDC = {formatIndex(p.cpi)}
          </p>
          <p className="text-xs text-slate-600">
            Pago (CR): <strong>{formatCurrency(p.executedBudget)}</strong> ({formatPercent(p.actualFinancial)})
          </p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">Saldo vs. Escopo Restante</span>
            <TooltipHelp
              position="bottom"
              title="Leitura Preventiva de Saldo"
              text="Mostra quanto recurso financeiro ainda resta em caixa para entregar a parcela faltante do escopo físico."
            />
          </div>
          <p className="text-lg font-extrabold text-slate-900">
            {formatCurrency(p.remainingBudget)}
          </p>
          <p className="text-xs text-slate-600">
            Para entregar os <strong>{formatPercent(p.remainingScope)}</strong> restantes do escopo
          </p>
        </div>
      </div>

      {/* Curva S com Linha de Base + Quadro de Entregas Ponderadas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Curva S Real com 4 séries e linha de corte */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-start justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>Curva S Acumulada (Linha de Base vs. Realizado)</span>
                <TooltipHelp
                  position="right"
                  title="Leitura da Curva S"
                  text="As linhas tracejadas representam a linha de base planejada no início do programa. As linhas contínuas mostram a medição real acumulada até a data de corte (Jun/2026)."
                />
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Evolução mensal acumulada até a data de corte ({cutoff.formattedDate}) e projeção planejada até o encerramento.
              </p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={p.curveS} margin={{ top: 12, right: 20, left: -15, bottom: 0 }}>
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
                  formatter={(val, name) => [val !== null ? `${val}%` : 'Não medido', name]}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                <ReferenceLine
                  x={p.cutoffMonth}
                  stroke="#94a3b8"
                  strokeDasharray="4 4"
                  label={{ value: `Corte (${p.cutoffMonth})`, position: 'top', fontSize: 11, fill: '#475569' }}
                />
                <Line
                  type="monotone"
                  dataKey="plannedPhysical"
                  name="Físico Planejado"
                  stroke="#65a30d"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="actualPhysical"
                  name="Físico Realizado"
                  stroke="#2D5A27"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  connectNulls={false}
                />
                <Line
                  type="monotone"
                  dataKey="plannedFinancial"
                  name="Financeiro Planejado"
                  stroke="#38bdf8"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="actualFinancial"
                  name="Financeiro Realizado"
                  stroke="#0284c7"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
            <Info className="w-4 h-4 text-[#2D5A27] shrink-0 mt-0.5" />
            <div>
              <strong>Síntese na data de corte:</strong> {p.schedule.summary} {p.cost.summary}
            </div>
          </div>
        </div>

        {/* Medição Física por Entregas Ponderadas */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-[#2D5A27]" />
                <span>Critério de Medição Física (Entregas)</span>
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Atualize o percentual concluído de cada entrega para recalcular automaticamente o avanço físico ponderado do programa.
              </p>
            </div>

            <div className="space-y-3">
              {p.deliverables.map((del) => {
                const contribution = ((del.physicalWeight * del.progress) / 100).toFixed(1).replace('.', ',');
                return (
                  <div
                    key={del.id}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-bold text-slate-900 leading-snug">{del.name}</p>
                      <span className="shrink-0 px-2 py-0.5 rounded bg-white border border-slate-200 text-[11px] font-bold text-slate-700">
                        Peso: {del.physicalWeight}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-600">
                      <span>Prazo previsto: <strong>{del.deadline}</strong></span>
                      <span>
                        Contribuição: <strong className="text-[#2D5A27]">{contribution}%</strong> de {del.physicalWeight}%
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      {[0, 25, 40, 60, 75, 80, 100].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => updateDeliverableProgress(p.id, del.id, preset)}
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold border transition cursor-pointer ${
                            del.progress === preset
                              ? 'bg-[#2D5A27] text-white border-[#2D5A27]'
                              : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                          }`}
                        >
                          {preset}%
                        </button>
                      ))}
                      <input
                        type="number"
                        min={0}
                        max={100}
                        aria-label={`Percentual concluído de ${del.name}`}
                        value={del.progress}
                        onChange={(e) => updateDeliverableProgress(p.id, del.id, e.target.value)}
                        className="w-14 ml-auto bg-white border border-slate-300 rounded px-1.5 py-0.5 text-xs font-bold text-center text-slate-900"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600">
              Soma dos pesos: <strong>100%</strong>
            </span>
            <span className="font-bold text-slate-900 text-sm">
              Avanço Físico Calculado: <span className="text-[#2D5A27]">{formatPercent(p.actualPhysical)}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Tabela Interativa de Rubricas Orçamentárias */}
      <BudgetBreakdown project={p} />

      {/* Riscos Mapeados do Programa */}
      {p.risks && p.risks.length > 0 && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Riscos Mapeados e Resposta Preventiva</span>
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {p.risks.map((risk) => (
              <div
                key={risk.id}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <p className="font-bold text-slate-900">{risk.description}</p>
                  <p className="text-slate-600">
                    <strong>Plano de mitigação:</strong> {risk.mitigation}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2.5 py-1 rounded bg-white border border-slate-200 font-semibold text-slate-700">
                    Impacto: {risk.impact}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-white border border-slate-200 font-semibold text-slate-700">
                    Probabilidade: {risk.probability}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
