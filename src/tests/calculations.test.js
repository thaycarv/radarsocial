import { describe, it, expect } from 'vitest';
import {
  PORTFOLIO_CUTOFF,
  INITIAL_PROJECTS,
  INITIAL_FOLLOW_UPS
} from '../data/mockData.js';
import {
  calcDaysOverdue,
  evaluateScheduleStatus,
  evaluateCostStatus,
  deriveProjectMetrics,
  calculatePortfolioMetrics,
  generateGovernanceAlerts
} from '../utils/calculations.js';

describe('RadarSocial - Reconciliacao Contabil e Governanca', () => {
  it('mantem invariantes contabeis em toda a carteira inicial', () => {
    const derived = INITIAL_PROJECTS.map(deriveProjectMetrics);
    const portfolio = calculatePortfolioMetrics(derived);

    expect(portfolio.totalBudget).toBe(portfolio.totalExecuted + portfolio.totalRemaining);
    expect(portfolio.totalBudget).toBe(1100000);
    expect(portfolio.totalExecuted).toBe(793000);
    expect(portfolio.totalRetained).toBe(18000);
    expect(portfolio.totalRemaining).toBe(307000);

    derived.forEach((p) => {
      expect(p.totalBudget).toBe(p.executedBudget + p.remainingBudget);
      expect(p.freeBalance).toBe(Math.max(0, p.totalBudget - p.executedBudget - p.retainedBudget));
      expect(p.executedBudget).toBe(p.approvedProofs + p.pendingProofs);
    });
  });

  it('calcula a Curva S ate o mes de corte sem vazar despesas futuras', () => {
    const derived = INITIAL_PROJECTS.map(deriveProjectMetrics);

    derived.forEach((p) => {
      const cutoffPoint = p.curveS.find((pt) => pt.month === p.cutoffMonth);
      expect(cutoffPoint).toBeDefined();
      expect(cutoffPoint.actualFinancial).toBe(p.actualFinancial);
      expect(cutoffPoint.actualPhysical).toBe(p.actualPhysical);

      p.budgetBreakdown.forEach((rubric) => {
        (rubric.expenses || []).forEach((exp) => {
          const [dd, mm, yyyy] = exp.date.split('/');
          const isoDate = `${yyyy}-${mm}-${dd}`;
          expect(isoDate <= PORTFOLIO_CUTOFF.date).toBe(true);
        });
      });
    });
  });

  it('avalia prazos, retenções fiscais e alertas com coerencia', () => {
    expect(calcDaysOverdue('2026-06-20', '2026-06-30')).toBe(10);
    expect(calcDaysOverdue('2026-07-05', '2026-06-30')).toBe(0);

    expect(evaluateScheduleStatus(55, 70).label).toBe('Atrasado');
    expect(evaluateScheduleStatus(62, 70).label).toBe('Leve atraso');
    expect(evaluateScheduleStatus(70, 70).label).toBe('No prazo');

    expect(evaluateCostStatus(60, 80, 0).label).toBe('Desembolso elevado');
    expect(evaluateCostStatus(70, 70, 18000).label).toBe('NF retida');
    expect(evaluateCostStatus(70, 70, 0).label).toBe('Equilibrado');

    const derived = INITIAL_PROJECTS.map(deriveProjectMetrics);
    const alerts = generateGovernanceAlerts(derived);
    expect(alerts.length).toBeGreaterThanOrEqual(2);

    const formalOwners = new Set(['Thayâne Carvalho', ...INITIAL_PROJECTS.map((p) => p.manager)]);
    INITIAL_FOLLOW_UPS.forEach((followup) => {
      expect(formalOwners.has(followup.responsible)).toBe(true);
      followup.items.forEach((item) => {
        expect(formalOwners.has(item.responsible)).toBe(true);
      });
    });
  });
});
