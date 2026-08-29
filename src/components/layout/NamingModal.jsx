import React from 'react';
import { useProjects } from '../../context/ProjectContext';
import { Sparkles, Check, X } from 'lucide-react';

export const NamingModal = ({ isOpen, onClose }) => {
  const { currentBrand, setCurrentBrand, namingOptions } = useProjects();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 shadow-xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-50 border border-teal-200 rounded-lg text-teal-700">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Laboratório de Naming & Posicionamento</h3>
              <p className="text-xs text-slate-500">Alterne a marca e a proposta de valor do protótipo em tempo real</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
          {namingOptions.map((opt) => {
            const isSelected = currentBrand.id === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => setCurrentBrand(opt)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-teal-50/60 border-teal-500 shadow-2xs'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{opt.name}</span>
                      {isSelected && (
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 border border-teal-200">
                          Ativo
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-teal-700 mt-0.5">{opt.tagline}</p>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{opt.description}</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center border mt-1 ${
                    isSelected ? 'bg-teal-600 border-teal-600 text-white' : 'border-slate-300'
                  }`}>
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg transition shadow-xs"
          >
            Confirmar e Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

