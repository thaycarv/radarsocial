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

export const evaluateCostStatus = (actualPhysical, actualFinancial) => {
  const gap = Number((actualFinancial - actualPhysical).toFixed(1));

  if (gap > 15) {
    return {
      gap,
      label: 'Acima do físico',
      severity: 'high',
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200'
    };
  }
  if (gap > 5) {
    return {
      gap,
      label: 'Adiantado',
      severity: 'medium',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-200'
    };
  }
  if (gap < -10) {
    return {
      gap,
      label: 'NF retida',
      severity: 'info',
      badgeClass: 'bg-sky-50 text-sky-800 border-sky-200'
    };
  }
  return {
    gap,
    label: 'Equilibrado',
    severity: 'low',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200'
  };
};

export const deriveProjectMetrics = (project) => {
  const rawDeliverables = project.deliverables || [];
  const rubrics = project.budgetBreakdown || [];

  const deliverables = rawDeliverables.map((d) => {
    const score = MILESTONE_STATUS_VALUE[d.status] ?? 0;
    const isOverdue = d.status !== 'done' && Boolean(d.deadlineISO && d.deadlineISO < PORTFOLIO_CUTOFF.date);
    return {
      ...d,
      score,
      isOverdue
    };
  });

  const totalMilestones = deliverables.length || 1;
  const completedMilestones = deliverables.filter((d) => d.status === 'done').length;
  const sumScores = deliverables.reduce((acc, d) => acc + d.score, 0);
  const actualPhysical = Number((sumScores / totalMilestones).toFixed(1));

  const totalBudget = rubrics.reduce((acc, r) => acc + Number(r.budgeted || 0), 0);
  const executedBudget = rubrics.reduce((acc, r) => acc + Number(r.executed || 0), 0);
  const approvedProofs = rubrics.reduce((acc, r) => acc + Number(r.approvedProofs || 0), 0);
  const pendingProofs = Math.max(0, executedBudget - approvedProofs);
  const remainingBudget = Math.max(0, totalBudget - executedBudget);

  const actualFinancial = totalBudget > 0 ? Number(((executedBudget / totalBudget) * 100).toFixed(1)) : 0;

  const plannedValue = (Number(project.plannedPhysical || 0) / 100) * totalBudget;
  const earnedValue = (actualPhysical / 100) * totalBudget;

  const schedule = evaluateScheduleStatus(actualPhysical, project.plannedPhysical);
  const cost = evaluateCostStatus(actualPhysical, actualFinancial);

  let overallStatus = 'Normal';
  if (schedule.severity === 'high' || cost.severity === 'high') {
    overallStatus = 'Crítico';
  } else if (schedule.severity === 'medium' || cost.severity === 'medium' || cost.severity === 'info') {
    overallStatus = 'Atenção';
  }

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
    totalMilestones: rawDeliverables.length,
    completedMilestones,
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
    schedule,
    cost,
    overallStatus,
    curveS,
    costPerBeneficiary
  };
};

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
    criticalCount,
    warningCount,
    healthyCount
  };
};

export const generateGovernanceAlerts = (derivedProjects) => {
  const alerts = [];

  derivedProjects.forEach((p) => {
    if (p.cost.gap > 15) {
      alerts.push({
        id: `alert-cost-${p.id}`,
        projectId: p.id,
        projectName: p.name,
        severity: 'high',
        category: 'Orçamento',
        title: `${formatPercent(p.actualFinancial)} do orçamento já pago para ${formatPercent(p.actualPhysical)} de entregas`,
        detail: `Restam ${formatCurrency(p.remainingBudget)} em caixa para concluir ${formatPercent(p.remainingScope)} do programa.`,
        targetTab: 'physicalFinancial'
      });
    }

    if (p.schedule.gap < -10) {
      alerts.push({
        id: `alert-sched-${p.id}`,
        projectId: p.id,
        projectName: p.name,
        severity: 'high',
        category: 'Cronograma',
        title: `Cronograma atrasado (${formatPercent(p.actualPhysical)} entregue vs. ${formatPercent(p.plannedPhysical)} previsto)`,
        detail: `Existem etapas com prazo vencido aguardando conclusão.`,
        targetTab: 'operations'
      });
    }

    if (p.pendingProofs >= 10000) {
      alerts.push({
        id: `alert-proof-${p.id}`,
        projectId: p.id,
        projectName: p.name,
        severity: 'medium',
        category: 'Notas Fiscais',
        title: `${formatCurrency(p.pendingProofs)} pagos aguardando nota fiscal ou recibo`,
        detail: `Regularizar comprovantes antes do fechamento da prestação de contas.`,
        targetTab: 'physicalFinancial'
      });
    }

    if (p.cost.gap < -10) {
      alerts.push({
        id: `alert-lag-${p.id}`,
        projectId: p.id,
        projectName: p.name,
        severity: 'info',
        category: 'Fornecedor',
        title: `Etapas concluídas (${formatPercent(p.actualPhysical)}) com pagamento retido (${formatPercent(p.actualFinancial)})`,
        detail: `Verificar notas fiscais aguardando regularização cadastral para baixa.`,
        targetTab: 'operations'
      });
    }
  });

  return alerts;
};
