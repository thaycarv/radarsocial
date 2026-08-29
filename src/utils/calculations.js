/**
 * Funções utilitárias e fórmulas de controle Físico-Financeiro
 */

// Formatar Moeda Real (BRL)
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(value || 0);
};

// Formatar Porcentagem
export const formatPercent = (value) => {
  return `${Number(value || 0).toFixed(1)}%`;
};

// Análise de Desvio Físico vs Financeiro (Descompasso)
export const calculatePhysicalFinancialGap = (actualPhysical, actualFinancial) => {
  const gap = actualFinancial - actualPhysical;
  let status = "Saudável";
  let color = "text-emerald-400";
  let bg = "bg-emerald-500/10 border-emerald-500/30";
  let severity = "low";
  let message = "Avanço físico e consumo orçamentário em harmonia.";

  if (gap > 15) {
    status = "Crítico (Sobre-gasto)";
    color = "text-rose-400";
    bg = "bg-rose-500/10 border-rose-500/30";
    severity = "high";
    message = `Alerta de Risco: Execução financeira supera o avanço físico em ${gap.toFixed(1)} pontos percentuais. Risco de esgotamento prematuro do orçamento.`;
  } else if (gap > 5) {
    status = "Atenção (Descompasso Leve)";
    color = "text-amber-400";
    bg = "bg-amber-500/10 border-amber-500/30";
    severity = "medium";
    message = `Descompasso moderado de ${gap.toFixed(1)} pontos. Acompanhar entregas da próxima quinzena.`;
  } else if (gap < -10) {
    status = "Alta Eficiência / Desembolso Pendente";
    color = "text-cyan-400";
    bg = "bg-cyan-500/10 border-cyan-500/30";
    severity = "low";
    message = `Avanço físico superior ao financeiro em ${Math.abs(gap).toFixed(1)} pontos. Verificar se há notas ou pagamentos pendentes de liquidação.`;
  }

  return { gap, status, color, bg, severity, message };
};

// Análise de Desvio de Cronograma (Físico Realizado vs Planejado)
export const calculateScheduleGap = (actualPhysical, plannedPhysical) => {
  const scheduleGap = actualPhysical - plannedPhysical;
  return {
    scheduleGap,
    isDelayed: scheduleGap < -5,
    delayPoints: Math.abs(scheduleGap)
  };
};

// Consolidação de KPIs de Portfólio
export const calculatePortfolioMetrics = (projects) => {
  const totalBudget = projects.reduce((acc, p) => acc + p.totalBudget, 0);
  const totalExecuted = projects.reduce((acc, p) => acc + p.executedBudget, 0);
  const avgPhysical = projects.reduce((acc, p) => acc + p.actualPhysical, 0) / (projects.length || 1);
  const avgFinancial = (totalExecuted / (totalBudget || 1)) * 100;

  const criticalProjects = projects.filter(p => p.status === "Crítico").length;
  const warningProjects = projects.filter(p => p.status === "Atenção").length;
  const healthyProjects = projects.filter(p => p.status === "Normal").length;

  return {
    totalProjects: projects.length,
    totalBudget,
    totalExecuted,
    avgPhysical,
    avgFinancial,
    criticalProjects,
    warningProjects,
    healthyProjects,
    overallGap: avgFinancial - avgPhysical
  };
};
