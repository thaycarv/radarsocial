/**
 * Motor de cálculos de controle Físico-Financeiro, Valor Agregado (EVM) e Governança de Portfólio.
 *
 * Princípios metodológicos aplicados:
 * 1. Avanço Físico Realizado vem da soma ponderada das entregas: Σ (peso * progresso / 100).
 * 2. Execução Financeira vem da soma das despesas pagas nas rubricas dividida pelo orçamento aprovado.
 * 3. Prazo e Custo são avaliados em semáforos independentes (evita mascarar projetos atrasados).
 * 4. Desvios entre percentuais são expressos em pontos percentuais (p.p.), nunca em "%".
 * 5. Médias da carteira são ponderadas pelo orçamento de cada programa (mesma base contábil).
 */

export const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(Number(value) || 0);
};

export const formatPercent = (value) => {
  return `${Number(value || 0).toFixed(1).replace('.', ',')}%`;
};

export const formatPP = (value) => {
  const num = Number(value || 0);
  const sign = num > 0 ? '+' : '';
  return `${sign}${num.toFixed(1).replace('.', ',')} p.p.`;
};

export const formatIndex = (value) => {
  if (value === null || value === undefined || Number.isNaN(value)) return '—';
  return Number(value).toFixed(2).replace('.', ',');
};

/**
 * Avalia o Desvio de Prazo: Físico Realizado - Físico Planejado (em p.p.)
 */
export const evaluateScheduleStatus = (actualPhysical, plannedPhysical) => {
  const gap = Number((actualPhysical - plannedPhysical).toFixed(1));

  if (gap < -10) {
    return {
      gap,
      label: 'Atraso Crítico',
      severity: 'high',
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
      summary: `Entrega física ${formatPP(gap)} abaixo da linha de base planejada para a data de corte.`
    };
  }
  if (gap < -5) {
    return {
      gap,
      label: 'Atenção no Prazo',
      severity: 'medium',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
      summary: `Leve atraso de ${formatPP(gap)} frente ao cronograma previsto.`
    };
  }
  return {
    gap,
    label: 'No Prazo',
    severity: 'low',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    summary: `Execução física aderente ao cronograma planejado (${formatPP(gap)}).`
  };
};

/**
 * Avalia o Desvio de Custo vs. Entrega: Financeiro Realizado - Físico Realizado (em p.p.)
 * Limiares adotados:
 * - > +15 p.p.: Crítico (consumo orçamentário descolado das entregas físicas)
 * - > +5 p.p.: Atenção (adiantamento moderado de despesas/contratações)
 * - < -10 p.p.: Desembolso Represado (entrega física ocorreu sem pagamento/lançamento contábil correspondente)
 */
export const evaluateCostStatus = (actualPhysical, actualFinancial) => {
  const gap = Number((actualFinancial - actualPhysical).toFixed(1));

  if (gap > 15) {
    return {
      gap,
      label: 'Sobre-custo Crítico',
      severity: 'high',
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
      summary: `Gasto executado supera o avanço físico em ${formatPP(gap)}. Risco de faltar saldo para concluir o escopo.`
    };
  }
  if (gap > 5) {
    return {
      gap,
      label: 'Atenção (Adiantado)',
      severity: 'medium',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
      summary: `Desembolso ${formatPP(gap)} acima do avanço físico (verificar adiantamentos contratuais).`
    };
  }
  if (gap < -10) {
    return {
      gap,
      label: 'Pagamento Represado',
      severity: 'info',
      badgeClass: 'bg-sky-50 text-sky-800 border-sky-200',
      summary: `Financeiro ${formatPP(gap)} abaixo do físico. Verificar notas fiscais retidas ou pendentes de liquidação.`
    };
  }
  return {
    gap,
    label: 'Equilibrado',
    severity: 'low',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    summary: `Proporção saudável entre entregas físicas e execução orçamentária (${formatPP(gap)}).`
  };
};

/**
 * Deriva todos os indicadores físico-financeiros e de Valor Agregado (EVM) a partir das entregas e rubricas.
 */
export const deriveProjectMetrics = (project) => {
  const deliverables = project.deliverables || [];
  const rubrics = project.budgetBreakdown || [];

  const totalWeight = deliverables.reduce((acc, d) => acc + Number(d.physicalWeight || 0), 0) || 100;
  const rawPhysical = deliverables.reduce(
    (acc, d) => acc + (Number(d.physicalWeight || 0) * Number(d.progress || 0)) / 100,
    0
  );
  const actualPhysical = Number(((rawPhysical / totalWeight) * 100).toFixed(1));

  const totalBudget = rubrics.reduce((acc, r) => acc + Number(r.budgeted || 0), 0);
  const executedBudget = rubrics.reduce((acc, r) => acc + Number(r.executed || 0), 0);
  const approvedProofs = rubrics.reduce((acc, r) => acc + Number(r.approvedProofs || 0), 0);
  const pendingProofs = Math.max(0, executedBudget - approvedProofs);
  const remainingBudget = Math.max(0, totalBudget - executedBudget);

  const actualFinancial = totalBudget > 0 ? Number(((executedBudget / totalBudget) * 100).toFixed(1)) : 0;

  // Gerenciamento de Valor Agregado (EVM)
  // VP (Valor Planejado) = % Físico Planejado * Orçamento Total
  // VA (Valor Agregado)  = % Físico Realizado * Orçamento Total
  // CR (Custo Real)      = Orçamento Executado (Pago)
  const plannedValue = (Number(project.plannedPhysical || 0) / 100) * totalBudget;
  const earnedValue = (actualPhysical / 100) * totalBudget;
  const actualCost = executedBudget;

  const spi = plannedValue > 0 ? earnedValue / plannedValue : 1; // IDP
  const cpi = actualCost > 0 ? earnedValue / actualCost : 1; // IDC
  const eac = cpi > 0 ? totalBudget / cpi : totalBudget; // ENT (Estimativa no Término)
  const projectedVariance = totalBudget - eac; // Negativo = estouro projetado

  const schedule = evaluateScheduleStatus(actualPhysical, project.plannedPhysical);
  const cost = evaluateCostStatus(actualPhysical, actualFinancial);

  let overallStatus = 'Normal';
  if (schedule.severity === 'high' || cost.severity === 'high') {
    overallStatus = 'Crítico';
  } else if (schedule.severity === 'medium' || cost.severity === 'medium' || cost.severity === 'info') {
    overallStatus = 'Atenção';
  }

  // Sincroniza o ponto da data de corte na Curva S sem alterar meses futuros
  const curveS = (project.curveS || []).map((pt) => {
    if (pt.month === project.cutoffMonth) {
      return {
        ...pt,
        actualPhysical,
        actualFinancial
      };
    }
    return pt;
  });

  const costPerBeneficiary =
    project.beneficiariesActual > 0 ? Math.round(executedBudget / project.beneficiariesActual) : null;

  return {
    ...project,
    totalBudget,
    executedBudget,
    approvedProofs,
    pendingProofs,
    remainingBudget,
    actualPhysical,
    actualFinancial,
    remainingScope: Number(Math.max(0, 100 - actualPhysical).toFixed(1)),
    plannedValue,
    earnedValue,
    actualCost,
    spi,
    cpi,
    eac,
    projectedVariance,
    schedule,
    cost,
    overallStatus,
    curveS,
    costPerBeneficiary
  };
};

/**
 * Consolida KPIs de toda a carteira na mesma base (ponderada pelo orçamento aprovado).
 */
export const calculatePortfolioMetrics = (derivedProjects) => {
  const totalBudget = derivedProjects.reduce((acc, p) => acc + p.totalBudget, 0);
  const totalExecuted = derivedProjects.reduce((acc, p) => acc + p.executedBudget, 0);
  const totalApprovedProofs = derivedProjects.reduce((acc, p) => acc + p.approvedProofs, 0);
  const totalPendingProofs = derivedProjects.reduce((acc, p) => acc + p.pendingProofs, 0);
  const totalPV = derivedProjects.reduce((acc, p) => acc + p.plannedValue, 0);
  const totalEV = derivedProjects.reduce((acc, p) => acc + p.earnedValue, 0);

  const weightedPlannedPhysical = totalBudget > 0 ? Number(((totalPV / totalBudget) * 100).toFixed(1)) : 0;
  const weightedActualPhysical = totalBudget > 0 ? Number(((totalEV / totalBudget) * 100).toFixed(1)) : 0;
  const weightedActualFinancial = totalBudget > 0 ? Number(((totalExecuted / totalBudget) * 100).toFixed(1)) : 0;

  const portfolioSPI = totalPV > 0 ? totalEV / totalPV : 1;
  const portfolioCPI = totalExecuted > 0 ? totalEV / totalExecuted : 1;

  const criticalCount = derivedProjects.filter((p) => p.overallStatus === 'Crítico').length;
  const warningCount = derivedProjects.filter((p) => p.overallStatus === 'Atenção').length;
  const healthyCount = derivedProjects.filter((p) => p.overallStatus === 'Normal').length;

  return {
    totalProjects: derivedProjects.length,
    totalBudget,
    totalExecuted,
    totalApprovedProofs,
    totalPendingProofs,
    totalRemaining: Math.max(0, totalBudget - totalExecuted),
    weightedPlannedPhysical,
    weightedActualPhysical,
    weightedActualFinancial,
    weightedCostGap: Number((weightedActualFinancial - weightedActualPhysical).toFixed(1)),
    weightedScheduleGap: Number((weightedActualPhysical - weightedPlannedPhysical).toFixed(1)),
    portfolioSPI,
    portfolioCPI,
    criticalCount,
    warningCount,
    healthyCount
  };
};

/**
 * Gera alertas transparentes por regras determinísticas de governança (sem falso "chat de IA").
 */
export const generateGovernanceAlerts = (derivedProjects, followUps = []) => {
  const alerts = [];

  derivedProjects.forEach((p) => {
    if (p.cost.gap > 15) {
      alerts.push({
        id: `alert-cost-${p.id}`,
        projectId: p.id,
        projectName: p.name,
        severity: 'high',
        rule: 'Regra: Financeiro − Físico > +15,0 p.p.',
        title: `Sobre-custo crítico (${formatPP(p.cost.gap)} | IDC = ${formatIndex(p.cpi)})`,
        detail: `Restam ${formatCurrency(p.remainingBudget)} de saldo para concluir ${formatPercent(p.remainingScope)} das entregas físicas.`,
        targetTab: 'physicalFinancial'
      });
    }

    if (p.schedule.gap < -10) {
      alerts.push({
        id: `alert-sched-${p.id}`,
        projectId: p.id,
        projectName: p.name,
        severity: 'high',
        rule: 'Regra: Físico Real − Planejado < −10,0 p.p.',
        title: `Atraso crítico no cronograma (${formatPP(p.schedule.gap)} | IDP = ${formatIndex(p.spi)})`,
        detail: `Entregue ${formatPercent(p.actualPhysical)} frente a ${formatPercent(p.plannedPhysical)} previstos até ${p.cutoffMonth}/2026.`,
        targetTab: 'operations'
      });
    }

    if (p.pendingProofs >= 10000) {
      alerts.push({
        id: `alert-proof-${p.id}`,
        projectId: p.id,
        projectName: p.name,
        severity: 'medium',
        rule: 'Regra: Comprovação fiscal pendente ≥ R$ 10.000',
        title: `${formatCurrency(p.pendingProofs)} pagos aguardando nota fiscal ou recibo`,
        detail: `Regularizar comprovantes antes do próximo fechamento de prestação de contas ao financiador.`,
        targetTab: 'physicalFinancial'
      });
    }

    if (p.cost.gap < -10) {
      alerts.push({
        id: `alert-lag-${p.id}`,
        projectId: p.id,
        projectName: p.name,
        severity: 'info',
        rule: 'Regra: Financeiro − Físico < −10,0 p.p.',
        title: `Desembolso represado (${formatPP(p.cost.gap)})`,
        detail: `Avanço físico superior ao pagamento contábil. Verificar notas retidas por pendência cadastral.`,
        targetTab: 'operations'
      });
    }
  });

  followUps.forEach((f) => {
    const openActions = (f.actionPlans || []).filter((a) => a.status !== 'Concluída').length;
    if (openActions > 0 && alerts.some((al) => al.projectId === f.projectId && al.severity === 'high')) {
      // Já coberto, mantém enxuto
    }
  });

  return alerts;
};
