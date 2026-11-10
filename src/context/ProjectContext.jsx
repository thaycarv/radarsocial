import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  PORTFOLIO_CUTOFF,
  INITIAL_PROJECTS,
  INITIAL_FOLLOW_UPS,
  INITIAL_EVIDENCES,
  INITIAL_COMMUNITY_FEEDBACKS,
  INITIAL_COMMUNITY_ACTIONS
} from '../data/mockData';
import {
  deriveProjectMetrics,
  deriveRubricMetrics,
  calculatePortfolioMetrics,
  generateGovernanceAlerts
} from '../utils/calculations';

const STORAGE_KEYS = {
  projects: 'radarsocial_v14_projects',
  followUps: 'radarsocial_v14_followups',
  evidences: 'radarsocial_v14_evidences',
  communityFeedbacks: 'radarsocial_v14_feedbacks',
  communityActions: 'radarsocial_v14_actions',
  theme: 'radarsocial_v14_theme'
};

// Purge legacy storage keys so client browsers always initialize with the current schema
if (typeof window !== 'undefined' && window.localStorage) {
  const versions = ['', '_v2', '_v3', '_v4', '_v5', '_v6', '_v7', '_v8', '_v9', '_v10', '_v11', '_v12', '_v13'];
  const suffixes = ['projects', 'followups', 'evidences', 'theme'];
  versions.forEach((v) => {
    suffixes.forEach((s) => {
      try {
        localStorage.removeItem(`radarsocial${v}_${s}`);
      } catch {
        // ignore
      }
    });
  });
}

const safeLoad = (key, fallback, validator) => {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    const parsed = JSON.parse(saved);
    if (validator && !validator(parsed)) return fallback;
    return parsed;
  } catch {
    return fallback;
  }
};

const hasCurrentProjectSchema = (arr) =>
  Array.isArray(arr) &&
  arr.length > 0 &&
  Array.isArray(arr[0]?.budgetBreakdown?.[0]?.expenses) &&
  typeof arr[0]?.deliverables?.[0]?.deliverableDoc === 'string';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [rawProjects, setRawProjects] = useState(() =>
    safeLoad(STORAGE_KEYS.projects, INITIAL_PROJECTS, hasCurrentProjectSchema)
  );
  const [followUps, setFollowUps] = useState(() =>
    safeLoad(STORAGE_KEYS.followUps, INITIAL_FOLLOW_UPS)
  );
  const [evidences, setEvidences] = useState(() =>
    safeLoad(STORAGE_KEYS.evidences, INITIAL_EVIDENCES)
  );
  const [communityFeedbacks, setCommunityFeedbacks] = useState(() =>
    safeLoad(STORAGE_KEYS.communityFeedbacks, INITIAL_COMMUNITY_FEEDBACKS)
  );
  const [communityActions, setCommunityActions] = useState(() =>
    safeLoad(STORAGE_KEYS.communityActions, INITIAL_COMMUNITY_ACTIONS)
  );

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.theme);
    return saved === 'dark' ? 'dark' : 'default';
  });

  const [selectedProjectId, setSelectedProjectId] = useState(
    () => rawProjects[0]?.id || 'prog-101'
  );
  const [showReportModal, setShowReportModal] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(rawProjects));
  }, [rawProjects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.followUps, JSON.stringify(followUps));
  }, [followUps]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.evidences, JSON.stringify(evidences));
  }, [evidences]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.communityFeedbacks, JSON.stringify(communityFeedbacks));
    } catch {
      // ignore
    }
  }, [communityFeedbacks]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.communityActions, JSON.stringify(communityActions));
    } catch {
      // ignore
    }
  }, [communityActions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.theme, theme);
  }, [theme]);

  const projects = useMemo(
    () => rawProjects.map((p) => deriveProjectMetrics(p)),
    [rawProjects]
  );

  const selectedProject = useMemo(
    () => projects.find((p) => p.id === selectedProjectId) || projects[0],
    [projects, selectedProjectId]
  );

  const portfolioMetrics = useMemo(
    () => calculatePortfolioMetrics(projects),
    [projects]
  );

  const governanceAlerts = useMemo(
    () => generateGovernanceAlerts(projects),
    [projects]
  );

  const updateDeliverableStatus = (projectId, deliverableId, newStatus) => {
    if (!['pending', 'in_progress', 'done'].includes(newStatus)) return;
    setRawProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          deliverables: p.deliverables.map((d) => {
            if (d.id !== deliverableId) return d;
            return {
              ...d,
              status: newStatus,
              completedAt:
                newStatus === 'done' ? d.completedAt || PORTFOLIO_CUTOFF.formattedDate : null
            };
          })
        };
      })
    );
  };

  const validateExpenseProof = (projectId, rubricId, expenseId, docRef) => {
    const cleanDoc = (docRef || '').trim();
    if (!cleanDoc) return;

    setRawProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          budgetBreakdown: p.budgetBreakdown.map((r) => {
            if (r.id !== rubricId) return r;
            return {
              ...r,
              expenses: (r.expenses || []).map((exp) =>
                exp.id === expenseId
                  ? { ...exp, status: 'approved', docRef: cleanDoc }
                  : exp
              )
            };
          })
        };
      })
    );
  };

  const releaseRetainedExpense = (projectId, rubricId, expenseId) => {
    setRawProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          budgetBreakdown: p.budgetBreakdown.map((r) => {
            if (r.id !== rubricId) return r;
            return {
              ...r,
              expenses: (r.expenses || []).map((exp) =>
                exp.id === expenseId ? { ...exp, status: 'approved' } : exp
              )
            };
          })
        };
      })
    );
  };

  const addRubricExpense = (projectId, rubricId, payload) => {
    const amount = Math.round(Number(payload.amount) || 0);
    if (amount <= 0) return { ok: false, error: 'Informe um valor válido maior que zero.' };

    const targetProject = rawProjects.find((p) => p.id === projectId);
    const targetRubric = targetProject?.budgetBreakdown?.find((r) => r.id === rubricId);
    if (!targetRubric) return { ok: false, error: 'Rubrica não localizada.' };

    const metrics = deriveRubricMetrics(targetRubric);
    if (amount > metrics.availableBalance) {
      return {
        ok: false,
        error: `Valor excede o saldo livre da rubrica (${metrics.availableBalance}). Acima do teto exige remanejamento formal.`
      };
    }

    const newEntry = {
      id: `exp-${Date.now()}`,
      date: payload.date || PORTFOLIO_CUTOFF.formattedDate,
      supplier: payload.supplier.trim(),
      description: payload.description.trim(),
      docRef: payload.docRef.trim(),
      amount,
      status: payload.status || 'approved'
    };

    setRawProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          budgetBreakdown: p.budgetBreakdown.map((r) =>
            r.id === rubricId
              ? { ...r, expenses: [...(r.expenses || []), newEntry] }
              : r
          )
        };
      })
    );

    return { ok: true };
  };

  const updateImpactActual = (projectId, metricId, newActual) => {
    const val = Math.max(0, Number(newActual) || 0);
    setRawProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        const targetMetric = p.impactMetrics.find((m) => m.id === metricId);
        return {
          ...p,
          beneficiariesActual: targetMetric?.syncsBeneficiaries
            ? Math.round(val)
            : p.beneficiariesActual,
          impactMetrics: p.impactMetrics.map((m) =>
            m.id === metricId ? { ...m, actual: val } : m
          )
        };
      })
    );
  };

  const toggleChecklistItem = (followUpId, itemId) => {
    setFollowUps((prev) =>
      prev.map((f) => {
        if (f.id !== followUpId) return f;
        return {
          ...f,
          items: f.items.map((item) =>
            item.id === itemId ? { ...item, checked: !item.checked } : item
          )
        };
      })
    );
  };

  const addChecklistItem = (followUpId, newItem) => {
    setFollowUps((prev) =>
      prev.map((f) => {
        if (f.id !== followUpId) return f;
        return {
          ...f,
          items: [
            ...f.items,
            {
              id: `item-${Date.now()}`,
              checked: false,
              ...newItem
            }
          ]
        };
      })
    );
  };

  const addActionPlanItem = (followUpId, actionData) => {
    setFollowUps((prev) =>
      prev.map((f) => {
        if (f.id !== followUpId) return f;
        return {
          ...f,
          actionPlans: [
            ...(f.actionPlans || []),
            {
              id: `act-${Date.now()}`,
              status: 'Pendente',
              ...actionData
            }
          ]
        };
      })
    );
  };

  const updateActionStatus = (followUpId, actionId, newStatus) => {
    if (!['Pendente', 'Em Andamento', 'Concluída'].includes(newStatus)) return;
    setFollowUps((prev) =>
      prev.map((f) => {
        if (f.id !== followUpId) return f;
        return {
          ...f,
          actionPlans: (f.actionPlans || []).map((a) =>
            a.id === actionId ? { ...a, status: newStatus } : a
          )
        };
      })
    );
  };

  const addEvidence = (doc) => {
    setEvidences((prev) => [{ id: `ev-${Date.now()}`, ...doc }, ...prev]);
  };

  const updateCommunityFeedback = (id, updatedFields) => {
    setCommunityFeedbacks((prev) =>
      prev.map((f) => {
        if (f.id !== id) return f;
        const updatedHistory = [...(f.history || [])];
        if (updatedFields.status && updatedFields.status !== f.status) {
          const timeNow = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
          updatedHistory.push(`${timeNow} · Status alterado para ${updatedFields.status}`);
        }
        return {
          ...f,
          ...updatedFields,
          history: updatedHistory
        };
      })
    );
  };

  const addCommunityFeedback = (newFeedback) => {
    setCommunityFeedbacks((prev) => [
      {
        id: `ESC-${Date.now().toString().slice(-4)}`,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        slaHours: 0.5,
        status: 'Aberto',
        contingencyCost: 0,
        history: [`${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} · Manifestação recebida e protocolada`],
        ...newFeedback
      },
      ...prev
    ]);
  };

  const toggleCommunityAction = (actionId) => {
    setCommunityActions((prev) =>
      prev.map((a) => {
        if (a.id !== actionId) return a;
        return {
          ...a,
          status: a.status === 'Concluída' ? 'Em andamento' : 'Concluída'
        };
      })
    );
  };

  const resetToDefault = () => {
    try {
      localStorage.clear();
    } catch {
      // ignore
    }
    setRawProjects(INITIAL_PROJECTS);
    setFollowUps(INITIAL_FOLLOW_UPS);
    setEvidences(INITIAL_EVIDENCES);
    setCommunityFeedbacks(INITIAL_COMMUNITY_FEEDBACKS);
    setCommunityActions(INITIAL_COMMUNITY_ACTIONS);
    setTheme('default');
    setSelectedProjectId(INITIAL_PROJECTS[0].id);
  };

  return (
    <ProjectContext.Provider
      value={{
        cutoff: PORTFOLIO_CUTOFF,
        projects,
        selectedProjectId,
        setSelectedProjectId,
        selectedProject,
        portfolioMetrics,
        governanceAlerts,
        followUps,
        evidences,
        communityFeedbacks,
        updateCommunityFeedback,
        addCommunityFeedback,
        communityActions,
        toggleCommunityAction,
        theme,
        setTheme,
        showReportModal,
        setShowReportModal,
        updateDeliverableStatus,
        validateExpenseProof,
        releaseRetainedExpense,
        addRubricExpense,
        updateImpactActual,
        toggleChecklistItem,
        addChecklistItem,
        addActionPlanItem,
        updateActionStatus,
        addEvidence,
        resetToDefault
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

// oxlint-disable-next-line react/only-export-components
export const useProjects = () => useContext(ProjectContext);
