import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { Compass, Eye, Heart, Edit2, Check, Plus, Trash2 } from 'lucide-react';

export const StrategicIdentity = () => {
  const { identity, updateIdentity } = useProjects();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(identity);
  const [newValue, setNewValue] = useState('');

  const handleSave = () => {
    updateIdentity(formData);
    setIsEditing(false);
  };

  const handleAddValue = () => {
    if (newValue.trim()) {
      setFormData(prev => ({ ...prev, values: [...prev.values, newValue.trim()] }));
      setNewValue('');
    }
  };

  const handleRemoveValue = (index) => {
    setFormData(prev => ({
      ...prev,
      values: prev.values.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Compass className="w-4 h-4 text-teal-600" />
            <span>Diretrizes & Princípios Organizacionais</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Propósito social, transformação esperada para os beneficiários e valores.
          </p>
        </div>

        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
            isEditing
              ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs'
              : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          {isEditing ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Salvar Diretrizes</span>
            </>
          ) : (
            <>
              <Edit2 className="w-3.5 h-3.5" />
              <span>Editar</span>
            </>
          )}
        </button>
      </div>

      <div className="space-y-4">
        {/* Missão */}
        <div className="bg-slate-50/60 border border-slate-200/70 rounded-xl p-4 space-y-1.5">
          <div className="flex items-center gap-1.5 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            <span>Missão (Propósito & Aonde se quer chegar)</span>
          </div>
          {isEditing ? (
            <textarea
              rows={3}
              value={formData.mission}
              onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
            />
          ) : (
            <p className="text-xs text-slate-700 leading-relaxed font-medium">{identity.mission}</p>
          )}
        </div>

        {/* Visão de Futuro */}
        <div className="bg-slate-50/60 border border-slate-200/70 rounded-xl p-4 space-y-1.5">
          <div className="flex items-center gap-1.5 text-teal-800 text-[11px] font-bold uppercase tracking-wider">
            <Eye className="w-3.5 h-3.5 text-teal-600" />
            <span>Visão (Impacto Futuro dos Beneficiários)</span>
          </div>
          {isEditing ? (
            <textarea
              rows={3}
              value={formData.vision}
              onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
            />
          ) : (
            <p className="text-xs text-slate-700 leading-relaxed font-medium">{identity.vision}</p>
          )}
        </div>

        {/* Valores */}
        <div className="bg-slate-50/60 border border-slate-200/70 rounded-xl p-4 space-y-2.5">
          <div className="flex items-center gap-1.5 text-amber-800 text-[11px] font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-amber-600" />
            <span>Valores & Princípios Inegociáveis</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {(isEditing ? formData.values : identity.values).map((val, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs text-slate-700 font-medium shadow-2xs"
              >
                <span>{val}</span>
                {isEditing && (
                  <button
                    onClick={() => handleRemoveValue(idx)}
                    className="text-rose-500 hover:text-rose-700 transition"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </span>
            ))}
          </div>

          {isEditing && (
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                placeholder="Adicionar novo valor..."
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddValue()}
                className="flex-1 bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
              />
              <button
                onClick={handleAddValue}
                className="px-3 py-1 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-lg text-xs font-semibold border border-teal-200"
              >
                <Plus className="w-3.5 h-3.5 inline mr-1" />
                Adicionar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

