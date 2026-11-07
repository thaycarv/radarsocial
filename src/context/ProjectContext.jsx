import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  PORTFOLIO_CUTOFF,
  INITIAL_PROJECTS,
  INITIAL_FOLLOW_UPS,
  INITIAL_EVIDENCES
} from '../data/mockData';
import {
  deriveProjectMetrics,
  calculatePortfolioMetrics,
  generateGovernanceAlerts
} from '../utils/calculations';

const STORAGE_KEYS = {
  projects: 'radarsocial_v3_projects',
  followUps: 'radarsocial_v3_followups',
  evidences: 'radarsocial_v3_evidences',
  theme: 'radarsocial_v3_theme'
};

const safeLoad = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [rawProjects, setRawProjects] = useState(() =>
    safeLoad(STORAGE_KEYS.projects, INITIAL_PROJECTS)
  );
  const [followUps, setFollowUps] = useState(() =>
    safeLoad(STORAGE_KEYS.followUps, INITIAL_FOLLOW_UPS)
  );
  const [evidences, setEvidences] = useState(() =>
    safeLoad(STORAGE_KEYS.evidences, INITIAL_EVIDENCES)
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

  const updateDeliverableProgress = (projectId, deliverableId, newProgress) => {
    const clamped = Math.max(0, Math.min(100, Number(newProgress) || 0));
    setRawProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          deliverables: p.deliverables.map((d) =>
            d.id === deliverableId ? { ...d, progress: clamped } : d
          )
        };
      })
    );
  };

  const updateRubricValues = (projectId, rubricId, executed, approvedProofs) => {
    const execVal = Math.max(0, Number(executed) || 0);
    const approvedVal = Math.max(0, Math.min(execVal, Number(approvedProofs) || 0));
    setRawProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          budgetBreakdown: p.budgetBreakdown.map((r) =>
            r.id === rubricId
              ? { ...r, executed: execVal, approvedProofs: approvedVal }
              : r
          )
        };
      })
    );
  };

  const updateImpactActual = (projectId, metricId, newActual) => {
    const val = Math.max(0, Number(newActual) || 0);
    setRawProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
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

  const cycleActionStatus = (followUpId, actionId) => {
    const nextStatus = {
      Pendente: 'Em Andamento',
      'Em Andamento': 'Concluída',
      Concluída: 'Pendente'
    };
    setFollowUps((prev) =>
      prev.map((f) => {
        if (f.id !== followUpId) return f;
        return {
          ...f,
          actionPlans: (f.actionPlans || []).map((a) =>
            a.id === actionId
              ? { ...a, status: nextStatus[a.status] || 'Pendente' }
              : a
          )
        };
      })
    );
  };

  const addEvidence = (doc) => {
    setEvidences((prev) => [{ id: `ev-${Date.now()}`, ...doc }, ...prev]);
  };

  const resetToDefault = () => {
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
    setRawProjects(INITIAL_PROJECTS);
    setFollowUps(INITIAL_FOLLOW_UPS);
    setEvidences(INITIAL_EVIDENCES);
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
        theme,
        setTheme,
        showReportModal,
        setShowReportModal,
        updateDeliverableProgress,
        updateRubricValues,
        updateImpactActual,
        toggleChecklistItem,
        addChecklistItem,
        addActionPlanItem,
        cycleActionStatus,
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
