import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { Shield, AlertTriangle, Zap, Target, Plus, Trash2 } from 'lucide-react';

export const SwotAnalysis = () => {
  const { swot, addSwotItem, removeSwotItem } = useProjects();
  const [newItems, setNewItems] = useState({
    strengths: '',
    weaknesses: '',
    opportunities: '',
    threats: ''
  });

  const handleAdd = (quadrant) => {
    if (newItems[quadrant].trim()) {
      addSwotItem(quadrant, newItems[quadrant].trim());
      setNewItems(prev => ({ ...prev, [quadrant]: '' }));
    }
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Shield className="w-4 h-4 text-teal-600" />
          <span>Diagnóstico de Cenário: Matriz SWOT / FOFA</span>
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Forças e fraquezas da iniciativa combinadas às oportunidades e riscos externos.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Forças */}
        <div className="bg-emerald-50/40 border border-emerald-200/80 rounded-xl p-3.5 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-emerald-200/60">
              <span className="font-bold text-emerald-800 text-[11px] uppercase flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-emerald-600" />
                Forças (Interno)
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                {swot.strengths.length}
              </span>
            </div>

            <ul className="mt-2.5 space-y-1.5">
              {swot.strengths.map((item) => (
                <li key={item.id} className="flex items-start justify-between gap-2 p-2 rounded-lg bg-white border border-emerald-100 text-xs text-slate-700 shadow-2xs">
                  <span>{item.text}</span>
                  <button onClick={() => removeSwotItem('strengths', item.id)} className="text-slate-400 hover:text-rose-600 transition mt-0.5">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-1.5 pt-1">
            <input
              type="text"
              placeholder="Adicionar força..."
              value={newItems.strengths}
              onChange={(e) => setNewItems({ ...newItems, strengths: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd('strengths')}
              className="flex-1 bg-white border border-emerald-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={() => handleAdd('strengths')}
              className="p-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-lg transition"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Fraquezas */}
        <div className="bg-amber-50/40 border border-amber-200/80 rounded-xl p-3.5 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-amber-200/60">
              <span className="font-bold text-amber-800 text-[11px] uppercase flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                Fraquezas (Interno)
              </span>
              <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                {swot.weaknesses.length}
              </span>
            </div>

            <ul className="mt-2.5 space-y-1.5">
              {swot.weaknesses.map((item) => (
                <li key={item.id} className="flex items-start justify-between gap-2 p-2 rounded-lg bg-white border border-amber-100 text-xs text-slate-700 shadow-2xs">
                  <span>{item.text}</span>
                  <button onClick={() => removeSwotItem('weaknesses', item.id)} className="text-slate-400 hover:text-rose-600 transition mt-0.5">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-1.5 pt-1">
            <input
              type="text"
              placeholder="Adicionar fraqueza..."
              value={newItems.weaknesses}
              onChange={(e) => setNewItems({ ...newItems, weaknesses: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd('weaknesses')}
              className="flex-1 bg-white border border-amber-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
            />
            <button
              onClick={() => handleAdd('weaknesses')}
              className="p-1 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg transition"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Oportunidades */}
        <div className="bg-teal-50/40 border border-teal-200/80 rounded-xl p-3.5 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-teal-200/60">
              <span className="font-bold text-teal-800 text-[11px] uppercase flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-teal-600" />
                Oportunidades (Externo)
              </span>
              <span className="text-[10px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-bold">
                {swot.opportunities.length}
              </span>
            </div>

            <ul className="mt-2.5 space-y-1.5">
              {swot.opportunities.map((item) => (
                <li key={item.id} className="flex items-start justify-between gap-2 p-2 rounded-lg bg-white border border-teal-100 text-xs text-slate-700 shadow-2xs">
                  <span>{item.text}</span>
                  <button onClick={() => removeSwotItem('opportunities', item.id)} className="text-slate-400 hover:text-rose-600 transition mt-0.5">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-1.5 pt-1">
            <input
              type="text"
              placeholder="Adicionar oportunidade..."
              value={newItems.opportunities}
              onChange={(e) => setNewItems({ ...newItems, opportunities: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd('opportunities')}
              className="flex-1 bg-white border border-teal-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
            />
            <button
              onClick={() => handleAdd('opportunities')}
              className="p-1 bg-teal-100 hover:bg-teal-200 text-teal-800 rounded-lg transition"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Ameaças */}
        <div className="bg-rose-50/40 border border-rose-200/80 rounded-xl p-3.5 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-rose-200/60">
              <span className="font-bold text-rose-800 text-[11px] uppercase flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-rose-600" />
                Ameaças (Externo)
              </span>
              <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-bold">
                {swot.threats.length}
              </span>
            </div>

            <ul className="mt-2.5 space-y-1.5">
              {swot.threats.map((item) => (
                <li key={item.id} className="flex items-start justify-between gap-2 p-2 rounded-lg bg-white border border-rose-100 text-xs text-slate-700 shadow-2xs">
                  <span>{item.text}</span>
                  <button onClick={() => removeSwotItem('threats', item.id)} className="text-slate-400 hover:text-rose-600 transition mt-0.5">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-1.5 pt-1">
            <input
              type="text"
              placeholder="Adicionar risco..."
              value={newItems.threats}
              onChange={(e) => setNewItems({ ...newItems, threats: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd('threats')}
              className="flex-1 bg-white border border-rose-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:border-rose-500"
            />
            <button
              onClick={() => handleAdd('threats')}
              className="p-1 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-lg transition"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

