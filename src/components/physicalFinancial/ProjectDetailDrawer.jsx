import React, { useState } from 'react';
import {
  X,
  TrendingUp,
  Sliders,
  DollarSign,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert
} from 'lucide-react';
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
import { formatCurrency, calculatePhysicalFinancialGap } from '../../utils/calculations';
import { useProjects } from '../../context/ProjectContext';

export const ProjectDetailDrawer = ({ project, isOpen, onClose }) => {
  const { updateProjectProgress } = useProjects();
  const [physicalInput, setPhysicalInput] = useState(project?.actualPhysical || 0);
  const [financialInput, setFinancialInput] = useState(project?.actualFinancial || 0);

  React.useEffect(() => {
    if (project) {
      setPhysicalInput(project.actualPhysical);
      setFinancialInput(project.actualFinancial);
    }
  }, [project?.id]);

  if (!isOpen || !project) return null;

  const gapAnalysis = calculatePhysicalFinancialGap(project.actualPhysical, project.actualFinancial);

  const handleUpdate = () => {
    updateProjectProgress(project.id, physicalInput, financialInput);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-2xl h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto space-y-6">
        
        {/* Header Drawer */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                {project.code}
              </span>
              <h3 className="text-base font-bold text-slate-900">{project.name}</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Gestor: {project.manager} • Sponsor: {project.sponsor}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Resumo Financeiro & Alerta de Risco */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-[11px] text-slate-500">Orçamento Aprovado</p>
            <p className="text-sm font-extrabold text-slate-900 mt-0.5">{formatCurrency(project.totalBudget)}</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-[11px] text-slate-500">Executado</p>
            <p className="text-sm font-extrabold text-[#2D5A27] mt-0.5">{formatCurrency(project.executedBudget)}</p>
          </div>
        </div>

        {/* Status de Descompasso */}
        <div className={`p-3.5 rounded-xl border flex items-start gap-2.5 ${
          gapAnalysis.severity === 'high' ? 'bg-rose-50 border-rose-200 text-rose-900' :
          gapAnalysis.severity === 'medium' ? 'bg-amber-50 border-amber-200 text-amber-900' :
          'bg-emerald-50 border-emerald-200 text-[#1E3F20]'
        }`}>
          {gapAnalysis.severity === 'high' ? (
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          ) : gapAnalysis.severity === 'medium' ? (
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-[#2D5A27] shrink-0 mt-0.5" />
          )}
          <div className="text-xs space-y-0.5">
            <p className="font-bold">{gapAnalysis.status} (Desvio: {gapAnalysis.gap > 0 ? `+${gapAnalysis.gap.toFixed(1)}%` : `${gapAnalysis.gap.toFixed(1)}%`})</p>
            <p className="text-slate-600 font-normal leading-relaxed">{gapAnalysis.message}</p>
          </div>
        </div>

        {/* Curva S */}
        <div className="space-y-2 border border-slate-200 rounded-xl p-4 bg-white">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-[#2D5A27]" />
              <span>Ritmo de Avanço Físico vs Execução Financeira</span>
            </h4>
          </div>
          <div className="h-56 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={project.curveS} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 10 }} unit="%" domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '0.5rem', fontSize: '11px' }}
                  formatter={(val) => [`${val}%`, '']}
                />
                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '6px' }} />
                <Line type="monotone" dataKey="actualPhysical" name="Entrega Física Real" stroke="#2D5A27" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="actualFinancial" name="Gasto Financeiro Real" stroke="#0284c7" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Simulador rápido de progresso */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
          <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-[#2D5A27]" />
            <span>Ajustar Medição de Campo</span>
          </h4>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-600 font-medium">Físico:</span>
                <span className="font-bold text-[#2D5A27]">{physicalInput}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={physicalInput}
                onChange={(e) => setPhysicalInput(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2D5A27]"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-600 font-medium">Financeiro:</span>
                <span className="font-bold text-sky-700">{financialInput}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={financialInput}
                onChange={(e) => setFinancialInput(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
              />
            </div>
          </div>

          <button
            onClick={handleUpdate}
            className="w-full py-1.5 bg-[#2D5A27] hover:bg-[#1E3F20] text-white text-xs font-bold rounded-lg transition cursor-pointer"
          >
            Atualizar Indicadores
          </button>
        </div>


        {/* Fechar */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition"
          >
            Fechar Painel
          </button>
        </div>

      </div>
    </div>
  );
};
