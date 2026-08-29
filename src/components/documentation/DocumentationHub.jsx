import React, { useState, useRef } from 'react';
import { useProjects } from '../../context/ProjectContext';
import {
  FileText,
  UploadCloud,
  FileCheck,
  FolderArchive,
  Download,
  Trash2,
  Printer,
  File,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  Layers,
  TrendingUp,
  Search,
  ExternalLink,
  Plus
} from 'lucide-react';
import { formatCurrency, calculatePhysicalFinancialGap } from '../../utils/calculations';
import { TooltipHelp } from '../common/TooltipHelp';

export const DocumentationHub = () => {
  const { projects, documents, addDocument, deleteDocument, selectedProjectId } = useProjects();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [filterProjectId, setFilterProjectId] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const fileInputRef = useRef(null);

  // Form de Upload
  const [uploadData, setUploadData] = useState({
    projectId: selectedProjectId || 'proj-101',
    title: '',
    category: 'Comprovação Técnica',
    description: '',
    uploadedBy: 'Gestão do Projeto',
    fileName: '',
    fileSize: ''
  });

  const categories = ['Todos', 'Comprovação Técnica', 'Prestação de Contas', 'Plano Pedagógico', 'Governança', 'Outros'];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
      const isImg = file.type.startsWith('image/');
      setUploadData(prev => ({
        ...prev,
        fileName: file.name,
        fileSize: `${sizeInMb > 0 ? sizeInMb : '0.5'} MB`,
        type: isImg ? 'image' : file.name.endsWith('.pdf') ? 'pdf' : 'doc'
      }));
    }
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!uploadData.title.trim() || !uploadData.fileName) {
      alert('Por favor, informe o título e selecione um arquivo.');
      return;
    }

    const proj = projects.find(p => p.id === uploadData.projectId);
    addDocument({
      ...uploadData,
      projectName: proj ? proj.name : 'Iniciativa Geral'
    });

    setUploadData({
      projectId: selectedProjectId || 'proj-101',
      title: '',
      category: 'Comprovação Técnica',
      description: '',
      uploadedBy: 'Gestão do Projeto',
      fileName: '',
      fileSize: ''
    });
    setIsUploading(false);
  };

  const filteredDocs = documents.filter(doc => {
    const matchesCat = selectedCategory === 'Todos' || doc.category === selectedCategory;
    const matchesProj = filterProjectId === 'all' || doc.projectId === filterProjectId;
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.fileName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesProj && matchesSearch;
  });

  // Métricas do Portfólio para o Relatório One-Pager
  const totalBudget = projects.reduce((acc, p) => acc + p.totalBudget, 0);
  const totalSpent = projects.reduce((acc, p) => acc + p.executedBudget, 0);
  const avgPhysical = Math.round(projects.reduce((acc, p) => acc + p.actualPhysical, 0) / projects.length);
  const avgFinancial = Math.round(projects.reduce((acc, p) => acc + p.actualFinancial, 0) / projects.length);

  return (
    <>
      {/* Conteúdo da Tela Interativa (Ocultado 100% durante a impressão) */}
      <div className="space-y-6 animate-in fade-in duration-200 print:hidden">
        {/* Top Banner */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>Documentação e Relatórios Executivos</span>
            <TooltipHelp
              title="Central de Documentação"
              text="Repositório para armazenar laudos, fotos de entregas e comprovantes, além de emissão do relatório executivo consolidado."
            />
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Upload de laudos, fotos de entregas físicas, comprovantes fiscais e demais documentos. Emissão de relatório executivo.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <button
            onClick={() => setShowReportModal(true)}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition shadow-xs cursor-pointer border border-slate-800"
          >
            <Printer className="w-4 h-4 text-emerald-400" />
            <span>Gerar Relatório Executivo</span>
          </button>

          <button
            onClick={() => setIsUploading(!isUploading)}
            className="px-4 py-2.5 bg-[#2D5A27] hover:bg-[#1E3F20] text-white text-xs font-bold rounded-xl flex items-center gap-2 transition shadow-xs cursor-pointer"
          >
            <UploadCloud className="w-4 h-4" />
            <span>{isUploading ? 'Fechar Formulário' : 'Upload de Arquivo'}</span>
          </button>
        </div>
      </div>

      {/* Formulário de Upload Expandível */}
      {isUploading && (
        <form onSubmit={handleUploadSubmit} className="bg-white border border-emerald-300 rounded-2xl p-6 shadow-sm space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <UploadCloud className="w-4 h-4 text-[#2D5A27]" />
              <span>Anexar Documento, Imagem ou Evidência de Entrega</span>
            </h3>
            <span className="text-[11px] text-slate-400">Formatos aceitos: PDF, PNG, JPG, DOCX (até 15MB)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Iniciativa Vinculada</label>
              <select
                value={uploadData.projectId}
                onChange={(e) => setUploadData({ ...uploadData, projectId: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#2D5A27]"
              >
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Categoria do Documento</label>
              <select
                value={uploadData.category}
                onChange={(e) => setUploadData({ ...uploadData, category: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#2D5A27]"
              >
                {categories.filter(c => c !== 'Todos').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Título Identificador</label>
              <input
                type="text"
                value={uploadData.title}
                onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                placeholder="Ex: Laudo Técnico de Entrega de Racks / NF 4022"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#2D5A27]"
                required
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-bold text-slate-700">Descrição / Finalidade da Evidência</label>
              <input
                type="text"
                value={uploadData.description}
                onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
                placeholder="Breve resumo da comprovação física ou contábil contida neste arquivo..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#2D5A27]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Selecionar Arquivo do Computador</label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-[#1E3F20] hover:file:bg-emerald-100 cursor-pointer"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsUploading(false)}
              className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-semibold transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-1.5 bg-[#2D5A27] hover:bg-[#1E3F20] text-white rounded-lg text-xs font-bold transition cursor-pointer shadow-xs"
            >
              Concluir Upload
            </button>
          </div>
        </form>
      )}

      {/* Filtros & Barra de Pesquisa */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Categorias em Pílulas */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#2D5A27] text-white shadow-2xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filtro por Projeto & Busca */}
        <div className="flex items-center gap-3">
          <select
            value={filterProjectId}
            onChange={(e) => setFilterProjectId(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#2D5A27] cursor-pointer"
          >
            <option value="all">Todos os Projetos</option>
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar documento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2D5A27] w-48"
            />
          </div>
        </div>
      </div>

      {/* Grid de Documentos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map(doc => {
          const isPdf = doc.type === 'pdf' || doc.fileName.endsWith('.pdf');
          const isImg = doc.type === 'image' || doc.fileName.endsWith('.png') || doc.fileName.endsWith('.jpg');

          return (
            <div key={doc.id} className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4 transition">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2.5 rounded-xl ${
                      isPdf ? 'bg-rose-50 text-rose-600 border border-rose-200' :
                      isImg ? 'bg-sky-50 text-sky-600 border border-sky-200' :
                      'bg-emerald-50 text-[#2D5A27] border border-emerald-200'
                    }`}>
                      {isImg ? <ImageIcon className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">{doc.category}</span>
                      <span className="text-xs font-bold text-slate-900 line-clamp-1">{doc.title}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteDocument(doc.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                    title="Excluir Documento"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {doc.description || 'Comprovação registrada e vinculada ao acompanhamento do projeto.'}
                </p>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] space-y-1">
                  <div className="flex justify-between text-slate-500">
                    <span>Projeto:</span>
                    <span className="font-semibold text-slate-800 text-right truncate max-w-[170px]">{doc.projectName}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Arquivo:</span>
                    <span className="font-mono text-slate-700 truncate max-w-[170px]">{doc.fileName}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="text-[11px] text-slate-400">{doc.uploadDate} • {doc.fileSize}</span>
                <button
                  onClick={() => alert(`Simulando download do arquivo: ${doc.fileName}`)}
                  className="px-3 py-1 bg-slate-50 hover:bg-emerald-50 text-[#2D5A27] font-bold rounded-lg border border-slate-200 hover:border-emerald-300 transition flex items-center gap-1.5 shadow-2xs cursor-pointer text-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar</span>
                </button>
              </div>
            </div>
          );
        })}

        {filteredDocs.length === 0 && (
          <div className="col-span-full py-12 text-center bg-white border border-slate-200 rounded-2xl space-y-3">
            <FolderArchive className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold text-slate-700">Nenhum documento localizado com os filtros atuais.</p>
            <button
              onClick={() => { setSelectedCategory('Todos'); setFilterProjectId('all'); setSearchTerm(''); }}
              className="text-xs text-[#2D5A27] font-bold hover:underline"
            >
              Limpar filtros
            </button>
          </div>
        )}
        </div>
      </div>

      {/* MODAL / VIEW: Relatório Executivo Formatado */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150 print:p-0 print:m-0 print:bg-white print:static print:block print:w-full">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 print:max-w-none print:max-h-none print:shadow-none print:border-none print:overflow-visible print-report-container">
            {/* Modal Actions Bar (não sai na impressão) */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between rounded-t-2xl print:hidden">
              <div className="flex items-center gap-2">
                <Printer className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-xs">Visualização de Impressão • Relatório Executivo</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition cursor-pointer flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimir / Salvar em PDF</span>
                </button>
                <button
                  onClick={() => setShowReportModal(false)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg text-xs transition cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </div>

            {/* Documento One-Pager Formatado */}
            <div className="p-6 md:p-8 space-y-4 text-slate-800 bg-white print:p-0 print:m-0 print-page-exact">
              {/* Header do Relatório */}
              <div className="border-b-2 border-slate-900 pb-3 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[#2D5A27] text-white font-bold flex items-center justify-center text-xs">
                      R
                    </div>
                    <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">RadarSocial</h1>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Relatório Executivo de Acompanhamento Físico-Financeiro de Portfólio
                  </p>
                </div>
                <div className="text-right text-xs">
                  <p className="font-bold text-slate-900">Emissão: {new Date().toLocaleDateString('pt-BR')}</p>
                  <p className="text-slate-500 text-[11px]">Consolidado Oficial</p>
                </div>
              </div>

              {/* Síntese dos Indicadores Globais */}
              <div className="grid grid-cols-4 gap-2.5 text-center">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-[10px] font-bold uppercase text-slate-400">Total de Projetos</p>
                  <p className="text-base font-extrabold text-slate-900 mt-0.5">{projects.length} iniciativas</p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-[10px] font-bold uppercase text-slate-400">Orçamento Aprovado</p>
                  <p className="text-base font-extrabold text-slate-900 mt-0.5">{formatCurrency(totalBudget)}</p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-[10px] font-bold uppercase text-slate-400">Desembolso Executado</p>
                  <p className="text-base font-extrabold text-[#2D5A27] mt-0.5">{formatCurrency(totalSpent)}</p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-[10px] font-bold uppercase text-slate-400">Média Físico vs Gasto</p>
                  <p className="text-base font-extrabold text-slate-900 mt-0.5">{avgPhysical}% / {avgFinancial}%</p>
                </div>
              </div>

              {/* Tabela Resumo dos Projetos */}
              <div className="space-y-1.5">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-700">1. Desempenho Físico-Financeiro das Iniciativas</h3>
                <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="py-1.5 px-3">Iniciativa / Eixo</th>
                      <th className="py-1.5 px-3">Orçado</th>
                      <th className="py-1.5 px-3">Gasto</th>
                      <th className="py-1.5 px-3 text-center">Físico</th>
                      <th className="py-1.5 px-3 text-center">Financeiro</th>
                      <th className="py-1.5 px-3 text-center">Desvio</th>
                      <th className="py-1.5 px-3 text-center">Situação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs">
                    {projects.map(p => {
                      const gap = calculatePhysicalFinancialGap(p.actualPhysical, p.actualFinancial);
                      return (
                        <tr key={p.id}>
                          <td className="py-1.5 px-3 font-semibold text-slate-900">
                            {p.name}
                            <span className="block text-[10px] text-slate-400 font-normal">{p.strategicObjective}</span>
                          </td>
                          <td className="py-1.5 px-3 text-slate-700">{formatCurrency(p.totalBudget)}</td>
                          <td className="py-1.5 px-3 text-slate-700 font-semibold">{formatCurrency(p.executedBudget)}</td>
                          <td className="py-1.5 px-3 text-center font-bold text-[#2D5A27]">{p.actualPhysical}%</td>
                          <td className="py-1.5 px-3 text-center font-bold text-sky-700">{p.actualFinancial}%</td>
                          <td className="py-1.5 px-3 text-center font-bold">
                            <span className={gap.severity === 'high' ? 'text-rose-600' : gap.severity === 'medium' ? 'text-amber-600' : 'text-[#2D5A27]'}>
                              {gap.gap > 0 ? `+${gap.gap.toFixed(1)}%` : `${gap.gap.toFixed(1)}%`}
                            </span>
                          </td>
                          <td className="py-1.5 px-3 text-center">
                            <span className="font-semibold text-[11px]">{gap.status}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Documentos de Comprovação Vinculados */}
              <div className="space-y-1.5">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-700">2. Evidências Técnicas & Comprovações Registradas ({documents.length})</h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {documents.slice(0, 4).map(d => (
                    <div key={d.id} className="p-2 bg-slate-50 border border-slate-200 rounded-lg space-y-0.5">
                      <p className="font-bold text-slate-900 text-xs truncate">{d.title}</p>
                      <p className="text-[10px] text-slate-500 truncate">{d.category} • {d.projectName} ({d.uploadDate})</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Parecer de Governança / Assinatura */}
              <div className="pt-3 border-t border-slate-200 flex justify-between items-end text-xs">
                <div className="space-y-0.5">
                  <p className="font-bold text-slate-900">RadarSocial Governança Integrada</p>
                  <p className="text-[10px] text-slate-500">Transparência e ritmo na execução dos recursos que movem a sociedade</p>
                </div>
                <div className="text-center">
                  <div className="w-44 border-b border-slate-400 pb-0.5 mb-1"></div>
                  <p className="text-[10px] text-slate-500 font-medium">Coordenação de Projetos & Auditoria</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
