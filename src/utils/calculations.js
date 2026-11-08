import { PORTFOLIO_CUTOFF } from '../data/mockData.js';

export const MILESTONE_STATUS_VALUE = {
  pending: 0,
  in_progress: 50,
  done: 100
};

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

export const calcDaysOverdue = (deadlineISO, cutoffISO = PORTFOLIO_CUTOFF.date) => {
  if (!deadlineISO || !cutoffISO || deadlineISO >= cutoffISO) return 0;
  const [dY, dM, dD] = deadlineISO.split('-').map(Number);
  const [cY, cM, cD] = cutoffISO.split('-').map(Number);
  const deadlineUTC = Date.UTC(dY, dM - 1, dD);
  const cutoffUTC = Date.UTC(cY, cM - 1, cD);
  return Math.max(0, Math.round((cutoffUTC - deadlineUTC) / 86400000));
};

export const evaluateScheduleStatus = (actualPhysical, plannedPhysical) => {
  const gap = Number((actualPhysical - plannedPhysical).toFixed(1));

  if (gap < -10) {
    return {
      gap,
      label: 'Atrasado',
      severity: 'high',
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200'
    };
  }
  if (gap < -5) {
    return {
      gap,
      label: 'Leve atraso',
      severity: 'medium',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-200'
    };
  }
  return {
    gap,
    label: 'No prazo',
    severity: 'low',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200'
  };
};

export const evaluateCostStatus = (actualPhysical, actualFinancial, retainedBudget = 0) => {
  const gap = Number((actualFinancial - actualPhysical).toFixed(1));

  if (gap > 15) {
    return {
      gap,
      label: 'Desembolso elevado',
      severity: 'high',
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200'
    };
  }
  if (gap > 10) {
    return {
      gap,
      label: 'Desembolso adiantado',
      severity: 'medium',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-200'
    };
  }
  if (retainedBudget > 0 || gap < -10) {
    return {
      gap,
      label: 'NF retida',
      severity: 'info',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-200'
    };
  }
  return {
    gap,
    label: 'Equilibrado',
    severity: 'low',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200'
  };
};

export const getProjectStatusMeta = (overallStatus, costLabel) => {
  if (overallStatus === 'Crítico') {
    return {
      label: 'Requer ação',
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200'
    };
  }
  if (costLabel === 'NF retida') {
    return {
      label: 'No prazo · NF retida',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-200'
    };
  }
  if (overallStatus === 'Atenção') {
    return {
      label: 'Em atenção',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-200'
    };
  }
  return {
    label: 'No prazo',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200'
  };
};

export const deriveRubricMetrics = (rubric) => {
  const budgeted = Number(rubric.budgeted || 0);
  const expenses = Array.isArray(rubric.expenses) ? rubric.expenses : null;

  if (expenses) {
    const approvedProofs = expenses
      .filter((e) => e.status === 'approved')
      .reduce((acc, e) => acc + Number(e.amount || 0), 0);
    const pendingProofs = expenses
      .filter((e) => e.status === 'pending_proof')
      .reduce((acc, e) => acc + Number(e.amount || 0), 0);
    const retainedAmount = expenses
      .filter((e) => e.status === 'retained')
      .reduce((acc, e) => acc + Number(e.amount || 0), 0);

    const executed = approvedProofs + pendingProofs;
    const committed = executed + retainedAmount;
    const availableBalance = Math.max(0, budgeted - committed);
    const execRate = budgeted > 0 ? Number(((executed / budgeted) * 100).toFixed(1)) : 0;
    const committedRate = budgeted > 0 ? Number(((committed / budgeted) * 100).toFixed(1)) : 0;

    return {
      ...rubric,
      budgeted,
      expenses,
      executed,
      approvedProofs,
      pendingProofs,
      retainedAmount,
      committed,
      availableBalance,
      execRate,
      committedRate
    };
  }

  const executed = Number(rubric.executed || 0);
  const approvedProofs = Number(rubric.approvedProofs || 0);
  const pendingProofs = Math.max(0, executed - approvedProofs);
  const retainedAmount = Number(rubric.retainedAmount || 0);
  const committed = executed + retainedAmount;
  const availableBalance = Math.max(0, budgeted - committed);
  const execRate = budgeted > 0 ? Number(((executed / budgeted) * 100).toFixed(1)) : 0;
  const committedRate = budgeted > 0 ? Number(((committed / budgeted) * 100).toFixed(1)) : 0;

  return {
    ...rubric,
    budgeted,
    expenses: [],
    executed,
    approvedProofs,
    pendingProofs,
    retainedAmount,
    committed,
    availableBalance,
    execRate,
    committedRate
  };
};

export const deriveProjectMetrics = (project) => {
  const rawDeliverables = project.deliverables || [];
  const rawRubrics = project.budgetBreakdown || [];

  const totalMilestones = rawDeliverables.length || 1;
  const stageWeight = Number((100 / totalMilestones).toFixed(1));

  const deliverables = rawDeliverables.map((d) => {
    const score = MILESTONE_STATUS_VALUE[d.status] ?? 0;
    const isOverdue = d.status !== 'done' && Boolean(d.deadlineISO && d.deadlineISO < PORTFOLIO_CUTOFF.date);
    const daysOverdue = isOverdue ? calcDaysOverdue(d.deadlineISO) : 0;
    const contribution = Number(((score / 100) * (100 / totalMilestones)).toFixed(1));
    return {
      ...d,
      score,
      weight: stageWeight,
      contribution,
      isOverdue,
      daysOverdue
    };
  });

  const completedMilestones = deliverables.filter((d) => d.status === 'done').length;
  const inProgressMilestones = deliverables.filter((d) => d.status === 'in_progress').length;
  const overdueMilestones = deliverables.filter((d) => d.isOverdue).length;
  const sumScores = deliverables.reduce((acc, d) => acc + d.score, 0);
  const actualPhysical = Number((sumScores / totalMilestones).toFixed(1));

  const budgetBreakdown = rawRubrics.map(deriveRubricMetrics);

  const totalBudget = budgetBreakdown.reduce((acc, r) => acc + r.budgeted, 0);
  const executedBudget = budgetBreakdown.reduce((acc, r) => acc + r.executed, 0);
  const approvedProofs = budgetBreakdown.reduce((acc, r) => acc + r.approvedProofs, 0);
  const pendingProofs = budgetBreakdown.reduce((acc, r) => acc + r.pendingProofs, 0);
  const retainedBudget = budgetBreakdown.reduce((acc, r) => acc + r.retainedAmount, 0);
  const remainingBudget = Math.max(0, totalBudget - executedBudget);
  const freeBalance = Math.max(0, totalBudget - executedBudget - retainedBudget);

  const actualFinancial = totalBudget > 0 ? Number(((executedBudget / totalBudget) * 100).toFixed(1)) : 0;

  const plannedValue = (Number(project.plannedPhysical || 0) / 100) * totalBudget;
  const earnedValue = (actualPhysical / 100) * totalBudget;

  const schedule = evaluateScheduleStatus(actualPhysical, project.plannedPhysical);
  const cost = evaluateCostStatus(actualPhysical, actualFinancial, retainedBudget);

  let overallStatus = 'Normal';
  if (schedule.severity === 'high' || cost.severity === 'high') {
    overallStatus = 'Crítico';
  } else if (schedule.severity === 'medium' || cost.severity === 'medium' || cost.label === 'NF retida') {
    overallStatus = 'Atenção';
  }

  const statusMeta = getProjectStatusMeta(overallStatus, cost.label);

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
    deliverables,
    budgetBreakdown,
    totalMilestones: rawDeliverables.length,
    completedMilestones,
    inProgressMilestones,
    overdueMilestones,
    totalBudget,
    executedBudget,
    approvedProofs,
    pendingProofs,
    retainedBudget,
    remainingBudget,
    freeBalance,
    actualPhysical,
    actualFinancial,
    remainingScope: Number(Math.max(0, 100 - actualPhysical).toFixed(1)),
    plannedValue,
    earnedValue,
    schedule,
    cost,
    overallStatus,
    statusMeta,
    curveS,
    costPerBeneficiary
  };
};

export const calculatePortfolioMetrics = (derivedProjects) => {
  const totalBudget = derivedProjects.reduce((acc, p) => acc + p.totalBudget, 0);
  const totalExecuted = derivedProjects.reduce((acc, p) => acc + p.executedBudget, 0);
  const totalApprovedProofs = derivedProjects.reduce((acc, p) => acc + p.approvedProofs, 0);
  const totalPendingProofs = derivedProjects.reduce((acc, p) => acc + p.pendingProofs, 0);
  const totalRetained = derivedProjects.reduce((acc, p) => acc + p.retainedBudget, 0);
  const totalPV = derivedProjects.reduce((acc, p) => acc + p.plannedValue, 0);
  const totalEV = derivedProjects.reduce((acc, p) => acc + p.earnedValue, 0);

  const weightedPlannedPhysical = totalBudget > 0 ? Number(((totalPV / totalBudget) * 100).toFixed(1)) : 0;
  const weightedActualPhysical = totalBudget > 0 ? Number(((totalEV / totalBudget) * 100).toFixed(1)) : 0;
  const weightedActualFinancial = totalBudget > 0 ? Number(((totalExecuted / totalBudget) * 100).toFixed(1)) : 0;
  const proofRegularityPercent = totalExecuted > 0 ? Number(((totalApprovedProofs / totalExecuted) * 100).toFixed(1)) : 100;

  const criticalCount = derivedProjects.filter((p) => p.overallStatus === 'Crítico').length;
  const warningCount = derivedProjects.filter((p) => p.overallStatus === 'Atenção').length;
  const healthyCount = derivedProjects.filter((p) => p.overallStatus === 'Normal').length;

  return {
    totalProjects: derivedProjects.length,
    totalBudget,
    totalExecuted,
    totalApprovedProofs,
    totalPendingProofs,
    totalRetained,
    totalRemaining: Math.max(0, totalBudget - totalExecuted),
    weightedPlannedPhysical,
    weightedActualPhysical,
    weightedActualFinancial,
    proofRegularityPercent,
    criticalCount,
    warningCount,
    healthyCount
  };
};

export const generateGovernanceAlerts = (derivedProjects) => {
  const alerts = [];

  derivedProjects.forEach((p) => {
    if (p.overallStatus === 'Crítico') {
      const proofSuffix =
        p.pendingProofs > 0
          ? ` e recolher ${formatCurrency(p.pendingProofs)} em comprovantes`
          : '';
      alerts.push({
        id: `action-crit-${p.id}`,
        projectId: p.id,
        projectName: p.name,
        severity: 'high',
        category: 'Ação Prioritária',
        title: `Remanejar rubricas para concluir canteiros${proofSuffix}`,
        detail: `${formatPercent(p.actualFinancial)} do orçamento utilizado para ${formatPercent(p.actualPhysical)} de entregas físicas. Suspender adiantamentos e formalizar remanejamento de saldo.`,
        targetTab: 'operations'
      });
    }

    if (p.cost.label === 'NF retida') {
      alerts.push({
        id: `action-compliance-${p.id}`,
        projectId: p.id,
        projectName: p.name,
        severity: 'medium',
        category: 'Conformidade',
        title: `Liberar pagamento de ${formatCurrency(p.retainedBudget || 18000)} após CND do fornecedor`,
        detail: `Entregas em ${formatPercent(p.actualPhysical)} com liquidação retida na tesouraria até regularização fiscal da empresa fornecedora.`,
        targetTab: 'physicalFinancial'
      });
    }
  });

  return alerts;
};
