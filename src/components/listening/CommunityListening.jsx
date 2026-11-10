import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import {
  HeartHandshake,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Search,
  Filter,
  Plus,
  Copy,
  ChevronRight,
  User,
  MapPin,
  Calendar,
  Layers,
  ArrowRight,
  TrendingUp,
  X
} from 'lucide-react';
import { formatCurrency } from '../../utils/calculations';

export const CommunityListening = () => {
  const {
    projects,
    communityFeedbacks,
    updateCommunityFeedback,
    addCommunityFeedback,
    communityActions,
    toggleCommunityAction
  } = useProjects();

  const [activeSubTab, setActiveSubTab] = useState('feedbacks'); // 'feedbacks' | 'rootCause'
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(communityFeedbacks[0]?.id || null);
  const [filters, setFilters] = useState({
    project: 'Todos',
    channel: 'Todos',
    sector: 'Todos',
    status: 'Todos',
    search: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Métricas calculadas dinamicamente
  const total = communityFeedbacks.length;
  const openCount = communityFeedbacks.filter(f => f.status === 'Aberto').length;
  const inTreatmentCount = communityFeedbacks.filter(f => f.status === 'Em Tratamento').length;
  const resolvedCount = communityFeedbacks.filter(f => f.status === 'Resolvido').length;
  const resolvedRate = total > 0 ? Math.round((resolvedCount / total) * 100) : 0;
  
  const totalContingencyCost = communityFeedbacks.reduce((sum, f) => sum + (Number(f.contingencyCost) || 0), 0);
  const avgSla = total > 0 
    ? (communityFeedbacks.reduce((sum, f) => sum + (Number(f.slaHours) || 0), 0) / total).toFixed(1)
    : '0.0';

  // Filtros
  const filteredFeedbacks = communityFeedbacks.filter(f => {
    const matchProject = filters.project === 'Todos' || f.projectName === filters.project;
    const matchChannel = filters.channel === 'Todos' || f.channel === filters.channel;
    const matchSector = filters.sector === 'Todos' || f.sector === filters.sector;
    const matchStatus = filters.status === 'Todos' || f.status === filters.status;
    const matchSearch = filters.search === '' || 
      f.text.toLowerCase().includes(filters.search.toLowerCase()) ||
      f.beneficiary.toLowerCase().includes(filters.search.toLowerCase()) ||
      f.hub.toLowerCase().includes(filters.search.toLowerCase());

    return matchProject && matchChannel && matchSector && matchStatus && matchSearch;
  });

  const selectedFeedback = communityFeedbacks.find(f => f.id === selectedFeedbackId) || filteredFeedbacks[0];

  // Opções para dropdowns de filtro
  const projectOptions = ['Todos', ...new Set(communityFeedbacks.map(f => f.projectName))];
  const channelOptions = ['Todos', ...new Set(communityFeedbacks.map(f => f.channel))];
  const sectorOptions = ['Todos', ...new Set(communityFeedbacks.map(f => f.sector))];
  const statusOptions = ['Todos', 'Aberto', 'Em Tratamento', 'Resolvido'];

  // Agrupamentos para gráficos de causa raiz
  const categoryCounts = {};
  communityFeedbacks.forEach(f => {
    categoryCounts[f.category] = (categoryCounts[f.category] || 0) + 1;
  });
  const sortedCategories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);
  const maxCategory = sortedCategories.length > 0 ? sortedCategories[0][1] : 1;

  const sectorCounts = {};
  communityFeedbacks.forEach(f => {
    sectorCounts[f.sector] = (sectorCounts[f.sector] || 0) + 1;
  });
  const sortedSectors = Object.entries(sectorCounts).sort((a, b) => b[1] - a[1]);
  const maxSector = sortedSectors.length > 0 ? sortedSectors[0][1] : 1;

  const handleCopySummary = (f) => {
    const text = `[MANIFESTAÇÃO ${f.id} · ${f.hub}]\nBeneficiário: ${f.beneficiary} (${f.channel})\nProjeto: ${f.projectName}\nRelato: "${f.text}"\nCausa Raiz: ${f.rootCause}\nTratativa: ${f.immediateAction} (Custo de Apoio: ${formatCurrency(f.contingencyCost)})\nStatus: ${f.status}`;
    navigator.clipboard.writeText(text)
      .then(() => triggerToast('Resumo copiado para a área de transferência!'))
      .catch(() => triggerToast('Erro ao copiar resumo.'));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-lg text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 text-[#1E3F20] text-xs font-semibold border border-emerald-200/80">
            <HeartHandshake className="w-3.5 h-3.5 text-[#2D5A27]" />
            <span>Protagonismo Comunitário &amp; Ouvidoria dos Polos</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Escuta Comunitária &amp; Qualidade Operacional
          </h2>
          <p className="text-xs text-slate-500 max-w-2xl">
            Acolhimento de relatos dos beneficiários e lideranças territoriais, identificação de causa raiz nos polos e disparo de melhorias contínuas.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-[#2D5A27] hover:bg-[#1E3F20] text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Nova Manifestação</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Manifestações dos Polos</span>
            <span className="text-2xl font-extrabold text-slate-900 mt-1 block">{total}</span>
            <span className="text-[11px] text-slate-400 font-medium">
              {openCount} em aberto · {inTreatmentCount} em tratamento
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
            <MessageSquare className="w-5 h-5 text-[#2D5A27]" />
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Tempo Médio de Resposta</span>
            <span className="text-2xl font-extrabold text-slate-900 mt-1 block">{avgSla}h</span>
            <span className="text-[11px] text-emerald-600 font-medium">SLA comunitário (Meta: &lt; 4h)</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Clock className="w-5 h-5 text-emerald-600" />
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Resolução Confirmada</span>
            <span className="text-2xl font-extrabold text-emerald-600 mt-1 block">{resolvedRate}%</span>
            <span className="text-[11px] text-slate-400 font-medium">{resolvedCount} de {total} solucionadas</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Apoio &amp; Reparos Emergenciais</span>
            <span className="text-2xl font-extrabold text-slate-900 mt-1 block">{formatCurrency(totalContingencyCost)}</span>
            <span className="text-[11px] text-slate-400 font-medium">Contingência e insumos de apoio</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
            <ShieldCheck className="w-5 h-5 text-slate-600" />
          </div>
        </div>
      </div>

      {/* Sub Navigation (Abas internas: Fila vs Diagnóstico) */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveSubTab('feedbacks')}
          className={`pb-3 px-3 text-xs font-bold transition cursor-pointer flex items-center gap-2 border-b-2 -mb-px ${
            activeSubTab === 'feedbacks'
              ? 'border-[#2D5A27] text-[#2D5A27]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Fila de Ocorrências dos Polos ({filteredFeedbacks.length})</span>
        </button>
        <button
          onClick={() => setActiveSubTab('rootCause')}
          className={`pb-3 px-3 text-xs font-bold transition cursor-pointer flex items-center gap-2 border-b-2 -mb-px ${
            activeSubTab === 'rootCause'
              ? 'border-[#2D5A27] text-[#2D5A27]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Causa Raiz &amp; Ações Corretivas ({communityActions.length})</span>
        </button>
      </div>

      {/* VIEW 1: FILA DE OCORRÊNCIAS */}
      {activeSubTab === 'feedbacks' && (
        <div className="space-y-6">
          
          {/* Tabela de Manifestações */}
          <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
            {/* Filtros */}
            <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/60">
              <div className="flex items-center gap-2 flex-wrap">
                <select
                  value={filters.project}
                  onChange={(e) => setFilters(prev => ({ ...prev, project: e.target.value }))}
                  className="bg-white border border-slate-200 text-xs text-slate-700 py-1.5 px-3 rounded-lg focus:outline-none focus:border-[#2D5A27] cursor-pointer"
                >
                  {projectOptions.map(opt => <option key={opt} value={opt}>Iniciativa: {opt}</option>)}
                </select>

                <select
                  value={filters.channel}
                  onChange={(e) => setFilters(prev => ({ ...prev, channel: e.target.value }))}
                  className="bg-white border border-slate-200 text-xs text-slate-700 py-1.5 px-3 rounded-lg focus:outline-none focus:border-[#2D5A27] cursor-pointer"
                >
                  {channelOptions.map(opt => <option key={opt} value={opt}>Canal: {opt}</option>)}
                </select>

                <select
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                  className="bg-white border border-slate-200 text-xs text-slate-700 py-1.5 px-3 rounded-lg focus:outline-none focus:border-[#2D5A27] cursor-pointer"
                >
                  {statusOptions.map(opt => <option key={opt} value={opt}>Status: {opt}</option>)}
                </select>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar beneficiário, polo ou relato..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2D5A27]"
                />
              </div>
            </div>

            {/* Tabela */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-[11px] uppercase font-bold text-slate-500 border-b border-slate-200/80">
                  <tr>
                    <th className="py-3 px-4">Protocolo / Data</th>
                    <th className="py-3 px-4">Beneficiário &amp; Polo</th>
                    <th className="py-3 px-4">Iniciativa</th>
                    <th className="py-3 px-4">Relato da Comunidade</th>
                    <th className="py-3 px-4">Categoria</th>
                    <th className="py-3 px-4">Frente Responsável</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredFeedbacks.map(f => {
                    const isSelected = selectedFeedback?.id === f.id;
                    return (
                      <tr
                        key={f.id}
                        onClick={() => setSelectedFeedbackId(f.id)}
                        className={`cursor-pointer transition hover:bg-slate-50/80 ${
                          isSelected ? 'bg-emerald-50/60 font-medium' : ''
                        }`}
                      >
                        <td className="py-3 px-4 whitespace-nowrap">
                          <strong className="text-slate-900 block font-bold">{f.id}</strong>
                          <span className="text-[11px] text-slate-400">{f.date} · {f.time}</span>
                        </td>
                        <td className="py-3 px-4">
                          <strong className="text-slate-900 block">{f.beneficiary}</strong>
                          <span className="text-[11px] text-slate-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {f.hub}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200">
                            {f.projectName}
                          </span>
                        </td>
                        <td className="py-3 px-4 max-w-xs">
                          <p className="line-clamp-2 text-slate-600 text-[11.5px] italic">
                            "{f.text}"
                          </p>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="block font-semibold text-slate-800">{f.category}</span>
                          <span className={`inline-block text-[10px] font-bold px-1.5 py-0.2 rounded mt-0.5 ${
                            f.severity === 'Crítica' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                            f.severity === 'Alta' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                            'bg-slate-100 text-slate-600'
                          }`}>
                            {f.severity}
                          </span>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap text-slate-600">
                          {f.sector}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                            f.status === 'Resolvido' ? 'bg-emerald-100 text-emerald-800' :
                            f.status === 'Em Tratamento' ? 'bg-amber-100 text-amber-800' :
                            'bg-rose-100 text-rose-800'
                          }`}>
                            {f.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Painel do Caso Selecionado em 3 Blocos */}
          {selectedFeedback && (
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#2D5A27] flex items-center justify-center font-bold text-xs">
                    {selectedFeedback.id}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <span>Tratativa da Ocorrência · {selectedFeedback.hub}</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      Iniciativa: <strong>{selectedFeedback.projectName}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopySummary(selectedFeedback)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Resumo para Relatório</span>
                  </button>
                </div>
              </div>

              {/* Grid de 3 Colunas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
                
                {/* Bloco 1: O que a comunidade relatou */}
                <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/80 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider text-slate-400 mb-2">
                      1. Relato Original do Beneficiário
                    </span>
                    <div className="bg-white p-3 rounded-lg border border-slate-200/90 text-slate-700 italic leading-relaxed">
                      "{selectedFeedback.text}"
                    </div>
                  </div>

                  <div className="space-y-1.5 text-slate-600 pt-2 border-t border-slate-200/60">
                    <p>Beneficiário: <strong className="text-slate-900">{selectedFeedback.beneficiary}</strong></p>
                    <p>Canal de Entrada: <strong className="text-slate-900">{selectedFeedback.channel}</strong></p>
                    <p>Data e Hora: <strong className="text-slate-900">{selectedFeedback.date} às {selectedFeedback.time}</strong></p>
                  </div>
                </div>

                {/* Bloco 2: Contexto & Diagnóstico da Causa Raiz */}
                <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/80 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider text-slate-400 mb-2">
                      2. Diagnóstico da Causa Raiz
                    </span>
                    <div className="bg-amber-50/80 p-3 rounded-lg border border-amber-200/80 text-amber-900 leading-relaxed font-medium">
                      {selectedFeedback.rootCause}
                    </div>
                  </div>

                  <div className="space-y-1.5 text-slate-600 pt-2 border-t border-slate-200/60">
                    <p>Frente de Atuação: <strong className="text-slate-900">{selectedFeedback.sector}</strong></p>
                    <p>Categoria: <strong className="text-slate-900">{selectedFeedback.category}</strong></p>
                    <p>Tempo de 1º Contato: <strong className="text-slate-900">{selectedFeedback.slaHours} hora(s)</strong></p>
                  </div>
                </div>

                {/* Bloco 3: Tratativa Imediata & Desfecho */}
                <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/80 space-y-3">
                  <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider text-slate-400 mb-2">
                    3. Ação Imediata &amp; Atualização
                  </span>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                      Medida de Acolhimento / Solução Adotada
                    </label>
                    <textarea
                      rows={3}
                      value={selectedFeedback.immediateAction}
                      onChange={(e) => updateCommunityFeedback(selectedFeedback.id, { immediateAction: e.target.value })}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-[#2D5A27]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                        Custo de Apoio (R$)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="5"
                        value={selectedFeedback.contingencyCost}
                        onChange={(e) => updateCommunityFeedback(selectedFeedback.id, { contingencyCost: parseFloat(e.target.value) || 0 })}
                        className="w-full p-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#2D5A27]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                        Status do Chamado
                      </label>
                      <select
                        value={selectedFeedback.status}
                        onChange={(e) => {
                          updateCommunityFeedback(selectedFeedback.id, { status: e.target.value });
                          triggerToast(`Status atualizado para ${e.target.value}`);
                        }}
                        className="w-full p-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#2D5A27]"
                      >
                        <option value="Aberto">Aberto</option>
                        <option value="Em Tratamento">Em Tratamento</option>
                        <option value="Resolvido">Resolvido</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60">
                    <span className="text-[11px] text-slate-400 block mb-1 font-semibold">Histórico de Encaminhamentos:</span>
                    <div className="space-y-1">
                      {selectedFeedback.history.map((h, idx) => (
                        <p key={idx} className="text-[10.5px] text-slate-500 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A27] shrink-0"></span>
                          <span>{h}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      )}

      {/* VIEW 2: CAUSA RAIZ & PLANOS DE AÇÃO (PDCA) */}
      {activeSubTab === 'rootCause' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Pareto por Categoria */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Pareto de Manifestações por Categoria
                  </h3>
                  <p className="text-xs text-slate-500">
                    Principais ofensores relatados pelos polos comunitários
                  </p>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  {sortedCategories.length} categorias
                </span>
              </div>

              <div className="space-y-3">
                {sortedCategories.map(([cat, count]) => {
                  const percent = Math.round((count / total) * 100);
                  return (
                    <div key={cat} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium text-slate-700">
                        <span>{cat}</span>
                        <span className="font-bold text-slate-900">{count} caso(s) · {percent}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#2D5A27] rounded-full transition-all duration-300"
                          style={{ width: `${(count / maxCategory) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Distribuição por Frente Responsável */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Distribuição por Frente Responsável
                  </h3>
                  <p className="text-xs text-slate-500">
                    Setores acionados para solução e melhoria contínua
                  </p>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  {sortedSectors.length} frentes
                </span>
              </div>

              <div className="space-y-3">
                {sortedSectors.map(([sec, count]) => {
                  const percent = Math.round((count / total) * 100);
                  return (
                    <div key={sec} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium text-slate-700">
                        <span>{sec}</span>
                        <span className="font-bold text-slate-900">{count} chamado(s) · {percent}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-sky-600 rounded-full transition-all duration-300"
                          style={{ width: `${(count / maxSector) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Planos de Ação Operacional (PDCA) */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#2D5A27]" />
                  <span>Planos de Ação Corretiva em Andamento (PDCA Comunitário)</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Ações estruturadas para eliminar as causas raízes reincidentes identificadas nas manifestações
                </p>
              </div>

              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                {communityActions.filter(a => a.status === 'Concluída').length} de {communityActions.length} concluídas
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {communityActions.map(action => (
                <div
                  key={action.id}
                  className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/60 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs font-bold text-slate-900">{action.title}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        action.status === 'Concluída' ? 'bg-emerald-100 text-emerald-800' :
                        action.status === 'Em andamento' ? 'bg-amber-100 text-amber-800' :
                        'bg-slate-200 text-slate-700'
                      }`}>
                        {action.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500">
                      <strong>Gargalo nos Polos:</strong> {action.problem}
                    </p>
                    <p className="text-xs text-slate-700 font-medium">
                      <strong>Medida de Processo:</strong> {action.action}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Resp: <strong className="text-slate-800">{action.owner}</strong></span>
                    <span>Prazo: {action.deadline}</span>
                    <button
                      onClick={() => toggleCommunityAction(action.id)}
                      className="text-xs font-semibold px-2 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition cursor-pointer"
                    >
                      {action.status === 'Concluída' ? 'Reabrir' : 'Concluir'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* MODAL DE NOVA MANIFESTAÇÃO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-[#2D5A27]" />
                <span>Registrar Manifestação Comunitária</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.target);
                addCommunityFeedback({
                  beneficiary: fd.get('beneficiary'),
                  hub: fd.get('hub'),
                  projectName: fd.get('projectName'),
                  channel: fd.get('channel'),
                  category: fd.get('category'),
                  severity: fd.get('severity'),
                  sector: fd.get('sector'),
                  text: fd.get('text'),
                  rootCause: 'Manifestação acolhida para investigação técnica pela coordenação local.',
                  immediateAction: 'Contato inicial de acolhimento realizado com o beneficiário.',
                  contingencyCost: 0
                });
                setIsModalOpen(false);
                triggerToast('Manifestação protocolada com sucesso!');
              }}
              className="p-6 space-y-4 text-xs"
            >
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nome do Beneficiário / Liderança *</label>
                <input
                  name="beneficiary"
                  required
                  placeholder="Ex: Dona Maria Aparecida (Conselheira Tutelar)"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#2D5A27]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Polo / Comunidade *</label>
                  <input
                    name="hub"
                    required
                    placeholder="Ex: Polo Digital Norte"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#2D5A27]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Iniciativa Vinculada *</label>
                  <select
                    name="projectName"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#2D5A27]"
                  >
                    <option>Laboratórios Comunitários de Inclusão Digital</option>
                    <option>Programa Bootcamp Dev e Dados para a Juventude</option>
                    <option>Cozinhas Comunitárias e Segurança Alimentar</option>
                    <option>Hortas Urbanas e Agroecologia</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Canal de Entrada</label>
                  <select
                    name="channel"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#2D5A27]"
                  >
                    <option>WhatsApp Comunitário</option>
                    <option>Reunião de Polo / Presencial</option>
                    <option>Ouvidoria Digital</option>
                    <option>Formulário de Aluno/Turma</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Categoria</label>
                  <select
                    name="category"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#2D5A27]"
                  >
                    <option>Conectividade &amp; Infraestrutura</option>
                    <option>Equipamentos &amp; Suprimentos</option>
                    <option>Pedagógico &amp; Nivelamento</option>
                    <option>Segurança Sanitária &amp; Alérgenos</option>
                    <option>Acesso &amp; Grade Horária</option>
                    <option>Elogio &amp; Impacto Social</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Gravidade</label>
                  <select
                    name="severity"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#2D5A27]"
                  >
                    <option value="Alta">Alta</option>
                    <option value="Média">Média</option>
                    <option value="Crítica">Crítica</option>
                    <option value="Baixa">Baixa</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Frente de Atuação Responsável</label>
                <select
                  name="sector"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#2D5A27]"
                >
                  <option>Infraestrutura &amp; Redes</option>
                  <option>Coordenação Pedagógica</option>
                  <option>Qualidade &amp; Nutrição</option>
                  <option>Planejamento &amp; Operações</option>
                  <option>Parcerias &amp; Empregabilidade</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Relato Fiel da Comunidade *</label>
                <textarea
                  name="text"
                  required
                  rows={3}
                  placeholder="Descreva exatamente o que a liderança ou beneficiário relatou..."
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#2D5A27]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2D5A27] hover:bg-[#1E3F20] text-white font-semibold rounded-lg transition cursor-pointer"
                >
                  Protocolar Manifestação
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
