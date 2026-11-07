import React from 'react';
import { useProjects } from '../../context/ProjectContext';

export const ProgramSelectorBar = () => {
  const { projects, selectedProjectId, setSelectedProjectId } = useProjects();

  const dotColor = (status) => {
    if (status === 'Crítico') return 'bg-rose-500';
    if (status === 'Atenção') return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1">
      {projects.map((p) => {
        const isActive = p.id === selectedProjectId;
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => setSelectedProjectId(p.id)}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition shrink-0 cursor-pointer ${
              isActive
                ? 'bg-[#2D5A27] text-white border-[#2D5A27] shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : dotColor(p.overallStatus)}`} />
            <span className="font-mono text-[11px] opacity-80">{p.code}</span>
            <span>{p.shortName || p.name}</span>
          </button>
        );
      })}
    </div>
  );
};
