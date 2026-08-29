import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  ShieldAlert,
  FileCheck,
  RotateCcw
} from 'lucide-react';
import { formatCurrency, calculatePhysicalFinancialGap } from '../../utils/calculations';
import { BudgetBreakdown } from './BudgetBreakdown';
import { TooltipHelp } from '../common/TooltipHelp';

export const PhysicalFinancialCockpit = () => {
  const { selectedProject, updateProjectProgress, resetProjectProgress } = useProjects();

  const [physicalInput, setPhysicalInput] = useState(selectedProject?.actualPhysical || 0);
  const [financialInput, setFinancialInput] = useState(selectedProject?.actualFinancial || 0);
  const [showSavedFeedback, setShowSavedFeedback] = useState(false);

  React.useEffect(() => {
    if (selectedProject) {
      setPhysicalInput(selectedProject.actualPhysical);
      setFinancialInput(selectedProject.actualFinancial);
    }
  }, [selectedProject?.id, selectedProject?.actualPhysical, selectedProject?.actualFinancial]);

  if (!selectedProject) return null;

  const gapAnalysis = calculatePhysicalFinancialGap(selectedProject.actualPhysical, selectedProject.actualFinancial);

  const handleUpdate = () => {
    updateProjectProgress(selectedProject.id, physicalInput, financialInput);
    setShowSavedFeedback(true);
    setTimeout(() => setShowSavedFeedback(false), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner / Project Info */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">{selectedProject.name}</h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Meta Vinculada: <strong className="text-slate-800">{selectedProject.strategicObjective}</strong>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-slate-400">Orçamento Aprovado</p>
              <p className="text-base font-extrabold text-slate-900">{formatCurrency(selectedProject.totalBudget)}</p>
            </div>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="text-right">
              <p className="text-xs text-slate-400">Gasto Executado</p>
              <p className="text-base font-extrabold text-[#2D5A27]">{formatCurrency(selectedProject.executedBudget)}</p>
            </div>
          </div>
        </div>

        {/* Dynamic Alert Banner */}
        <div className={`p-4 rounded-xl border flex items-start gap-3 ${
          gapAnalysis.severity === 'high' ? 'bg-rose-50 border-rose-200 text-rose-900' :
          gapAnalysis.severity === 'medium' ? 'bg-amber-50 border-amber-200 text-amber-900' :
          'bg-emerald-50 border-emerald-200 text-[#1E3F20]'
        }`}>
          {gapAnalysis.severity === 'high' ? (
            <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          ) : gapAnalysis.severity === 'medium' ? (
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-[#2D5A27] shrink-0 mt-0.5" />
          )}
          <div className="text-xs space-y-0.5">
            <div className="flex items-center gap-2 font-bold">
              <span>{gapAnalysis.status}</span>
              <span>• Desvio: {gapAnalysis.gap > 0 ? `+${gapAnalysis.gap.toFixed(1)}%` : `${gapAnalysis.gap.toFixed(1)}%`}</span>
            </div>
            <p className="text-slate-700 leading-relaxed font-normal">{gapAnalysis.message}</p>
          </div>
        </div>
      </div>

      {/* Grid: Curve S Chart + Interactive Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Curva S Chart */}
        <div className="lg:col-span-2 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#2D5A27]" />
                <span>Ritmo de Avanço Físico vs Gastos</span>
                <TooltipHelp
                  title="Como funciona este gráfico?"
                  text="Mapeia a evolução temporal do projeto: a linha verde representa as entregas concluídas em campo e a linha azul o orçamento desembolsado."
                />
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Comparativo mês a mês do percentual de entregas realizadas contra os recursos financeiros consumidos.
              </p>
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={selectedProject.curveS} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} unit="%" domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '0.75rem', fontSize: '12px' }}
                  formatter={(val) => [`${val}%`, '']}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="actualPhysical" name="Entrega Física Real" stroke="#2D5A27" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="actualFinancial" name="Gasto Financeiro Real" stroke="#0284c7" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Simulador Interativo */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-5 flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#2D5A27]" />
                <span>Atualizar Medições</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Simule ou atualize o percentual de entrega física e o gasto financeiro do projeto.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">Entrega Física Real:</span>
                  <span className="text-[#2D5A27]">{physicalInput}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={physicalInput}
                  onChange={(e) => setPhysicalInput(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2D5A27]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">Gasto Financeiro Real:</span>
                  <span className="text-sky-700">{financialInput}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={financialInput}
                  onChange={(e) => setFinancialInput(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={handleUpdate}
              className="w-full py-2.5 bg-[#2D5A27] hover:bg-[#1E3F20] text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Salvar Medição Atualizada</span>
            </button>

            <button
              onClick={() => {
                resetProjectProgress(selectedProject.id);
                setShowSavedFeedback(true);
                setTimeout(() => setShowSavedFeedback(false), 2500);
              }}
              className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 font-semibold text-xs rounded-xl border border-slate-200 transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar Valores Originais</span>
            </button>

            {showSavedFeedback && (
              <p className="text-center text-[11px] font-bold text-[#2D5A27] bg-emerald-50 py-1.5 px-3 rounded-lg border border-emerald-200 animate-in fade-in duration-150">
                ✓ Medição salva e sincronizada!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Detalhamento de Despesas */}
      <BudgetBreakdown project={selectedProject} />
    </div>
  );
};

