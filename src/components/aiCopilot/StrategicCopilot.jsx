import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { Bot, Sparkles, Send, ShieldAlert, CheckCircle2, Lightbulb, TrendingUp } from 'lucide-react';
import { formatCurrency, calculatePhysicalFinancialGap } from '../../utils/calculations';

export const StrategicCopilot = () => {
  const { selectedProject, projects } = useProjects();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'copilot',
      text: `Olá! Sou o assistente de análise do RadarSocial. Consigo avaliar todo o portfólio de projetos, comparar desempenhos físicos e financeiros, apontar riscos de sobre-gasto ou atrasos e sugerir planos de ação práticos. Como posso ajudar?`
    }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const quickPrompts = [
    "Qual é o melhor projeto e o pior em desempenho?",
    "Quais projetos estão com risco de gastar mais do que entregam?",
    "Como recuperar o descompasso deste projeto ativo?",
    "Fazer um resumo executivo de todo o portfólio."
  ];

  const handleSend = (userText) => {
    const textToSend = userText || input;
    if (!textToSend.trim()) return;

    const userMessage = { id: Date.now(), sender: 'user', text: textToSend };
    setMessages(prev => [...prev, userMessage]);
    if (!userText) setInput('');
    setIsThinking(true);

    setTimeout(() => {
      let aiResponseText = "";
      const lowerQuery = textToSend.toLowerCase();

      // Análise de Melhor e Pior Projeto
      if (
        lowerQuery.includes("melhor") ||
        lowerQuery.includes("pior") ||
        lowerQuery.includes("desempenho") ||
        lowerQuery.includes("ranking")
      ) {
        // Cálculo de Score de Desempenho Real (Avanço Físico - Desvio Financeiro)
        const ranked = [...projects].map(p => {
          const gap = p.actualFinancial - p.actualPhysical;
          return {
            ...p,
            gap,
            performanceScore: p.actualPhysical - Math.max(0, gap)
          };
        }).sort((a, b) => b.performanceScore - a.performanceScore);

        const best = ranked[0];
        const worst = ranked[ranked.length - 1];

        aiResponseText = `📊 **Análise Comparativa de Desempenho do Portfólio**:

🏆 **Maior Equilíbrio: ${best.name}**
- **Execução Física**: ${best.actualPhysical}%
- **Execução Financeira**: ${best.actualFinancial}%
- **Diagnóstico**: Ritmo estável com desembolsos proporcionais às entregas realizadas.

⚠️ **Ponto de Atenção: ${worst.name}**
- **Execução Física**: ${worst.actualPhysical}%
- **Execução Financeira**: ${worst.actualFinancial}%
- **Desvio**: **+${worst.gap.toFixed(1)}%**
- **Insight de Correção**: O projeto requer readequação do cronograma de entregas físicas para convergir com o ritmo de liquidação financeira.`;
      } 
      // Análise de Riscos de Sobre-gasto
      else if (lowerQuery.includes("risco") || lowerQuery.includes("sobre-gasto") || lowerQuery.includes("gastar mais")) {
        const atRisk = projects.filter(p => (p.actualFinancial - p.actualPhysical) > 10);
        if (atRisk.length > 0) {
          aiResponseText = `🚨 **Identificação de Desvios no Portfólio (${atRisk.length})**:\n\n` +
            atRisk.map(p => {
              const gap = p.actualFinancial - p.actualPhysical;
              return `• **${p.name}**: Desvio de **+${gap.toFixed(1)}%** (Físico: ${p.actualPhysical}% | Gasto: ${p.actualFinancial}%).`;
            }).join('\n') +
            `\n\n💡 **Insight de Correção**: Recomenda-se priorizar o avanço dos marcos de maior peso físico antes de novas etapas de desembolso.`;
        } else {
          aiResponseText = `✅ Todos os projetos estão operando dentro das margens normais de execução físico-financeira.`;
        }
      }
      // Resumo Geral do Portfólio
      else if (lowerQuery.includes("resumo") || lowerQuery.includes("portfolio") || lowerQuery.includes("geral")) {
        const totalBudget = projects.reduce((acc, p) => acc + p.totalBudget, 0);
        const totalSpent = projects.reduce((acc, p) => acc + p.executedBudget, 0);
        const avgPhysical = (projects.reduce((acc, p) => acc + p.actualPhysical, 0) / projects.length).toFixed(1);
        const avgFinancial = (projects.reduce((acc, p) => acc + p.actualFinancial, 0) / projects.length).toFixed(1);

        aiResponseText = `📈 **Síntese Executiva do Portfólio**:
- **Projetos Ativos**: ${projects.length} iniciativas.
- **Orçamento Global**: ${formatCurrency(totalBudget)} (Executado: ${formatCurrency(totalSpent)} - ${((totalSpent / totalBudget) * 100).toFixed(1)}%).
- **Avanço Físico Médio**: ${avgPhysical}%
- **Execução Financeira Média**: ${avgFinancial}%
- **Insight Geral**: Portfólio com evolução contínua, demandando foco no alinhamento de marcos físicos nos projetos com dispersão de medição.`;
      }
      // Análise do Projeto Específico Selecionado
      else {
        const gap = selectedProject.actualFinancial - selectedProject.actualPhysical;
        aiResponseText = `Diagnóstico de **${selectedProject.name}**:
- **Avanço Físico**: ${selectedProject.actualPhysical}%
- **Execução Financeira**: ${selectedProject.actualFinancial}%
- **Desvio**: ${gap > 0 ? `+${gap.toFixed(1)}%` : `${gap.toFixed(1)}%`} (${gap > 15 ? 'Crítico' : gap > 5 ? 'Atenção' : 'Normal'})

**Insight de Correção**:
• Acelerar a homologação das entregas de maior peso estrutural para recompor a curva planejada.
• Realizar acompanhamento periódico das rubricas até a convergência dos indicadores.`;
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'copilot', text: aiResponseText }]);
      setIsThinking(false);
    }, 600);
  };


  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4 flex flex-col h-[calc(100vh-140px)] animate-in fade-in duration-200">
      {/* Copilot Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-50 border border-emerald-200/80 rounded-xl text-[#2D5A27]">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>Assistente de Análise do Portfólio</span>
              <span className="text-[10px] bg-emerald-50 text-[#1E3F20] border border-emerald-200 px-2 py-0.5 rounded-full font-bold">RadarSocial</span>
            </h2>
            <p className="text-xs text-slate-500">
              Pergunte sobre desempenhos, riscos de sobre-gasto ou diagnósticos rápidos de qualquer projeto.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Prompt Chips */}
      <div className="flex flex-wrap gap-2 shrink-0">
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(qp)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-xs text-slate-700 hover:text-[#1E3F20] transition"
          >
            <Lightbulb className="w-3 h-3 text-[#2D5A27]" />
            <span>{qp}</span>
          </button>
        ))}
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-2xl p-4 rounded-2xl text-xs leading-relaxed space-y-2 ${
                m.sender === 'user'
                  ? 'bg-[#2D5A27] text-white rounded-br-none shadow-xs'
                  : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-bl-none shadow-2xs'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-[10px] uppercase opacity-75">
                {m.sender === 'copilot' ? (
                  <>
                    <Sparkles className="w-3 h-3 text-[#2D5A27]" />
                    <span className="text-[#1E3F20] font-bold">Assistente RadarSocial</span>
                  </>
                ) : (
                  <span>Você (Gestor)</span>
                )}
              </div>
              <div className="whitespace-pre-line">{m.text}</div>
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="flex justify-start">
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl text-xs text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2D5A27] animate-pulse"></span>
              <span>Consultando dados dos projetos e gerando diagnóstico...</span>
            </div>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="pt-2 border-t border-slate-100 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite uma pergunta sobre o desempenho, riscos ou gastos dos projetos..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2D5A27] transition"
          />
          <button
            type="submit"
            disabled={isThinking || !input.trim()}
            className="p-2.5 bg-[#2D5A27] hover:bg-[#1E3F20] disabled:opacity-50 text-white rounded-xl transition shadow-xs cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};

