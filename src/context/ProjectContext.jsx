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
  projects: 'radarsocial_v8_projects',
  followUps: 'radarsocial_v8_followups',
  evidences: 'radarsocial_v8_evidences',
  theme: 'radarsocial_v8_theme'
};

// Purge all legacy storage keys to guarantee no cached institutional names linger in client browsers
if (typeof window !== 'undefined' && window.localStorage) {
  const legacyKeys = [
    'radarsocial_projects',
    'radarsocial_v2_projects',
    'radarsocial_v3_projects',
    'radarsocial_v4_projects',
    'radarsocial_v5_projects',
    'radarsocial_v6_projects',
    'radarsocial_followups',
    'radarsocial_v2_followups',
    'radarsocial_v3_followups',
    'radarsocial_v4_followups',
    'radarsocial_v5_followups',
    'radarsocial_evidences',
    'radarsocial_v2_evidences',
    'radarsocial_v3_evidences',
    'radarsocial_v4_evidences',
    'radarsocial_v5_evidences'
  ];
  legacyKeys.forEach((k) => {
    try {
      localStorage.removeItem(k);
    } catch {
      // ignore
    }
  });
}

const sanitizeFictitiousNames = (data) => {
  if (!data) return data;
  let str = JSON.stringify(data);
  str = str.replace(/Fundo Socioambiental BNDES/gi, 'Fundo Socioambiental Horizonte');
  str = str.replace(/BNDES/gi, 'Fundo Horizonte');
  str = str.replace(/ACIF\s*&\s*Sebrae/gi, 'Aliança Empresarial Regional');
  str = str.replace(/ACIF/gi, 'Aliança Empresarial');
  str = str.replace(/Sebrae/gi, 'Rede Regional');
  return JSON.parse(str);
};

const safeLoad = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    const parsed = JSON.parse(saved);
    return sanitizeFictitiousNames(parsed);
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
    // Immediate sanitization check on mount
    const serialized = JSON.stringify(rawProjects);
    if (/bndes|acif|sebrae/i.test(serialized)) {
      setRawProjects(INITIAL_PROJECTS);
    }
  }, []);

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

  const updateDeliverableStatus = (projectId, deliverableId, newStatus) => {
    if (!['pending', 'in_progress', 'done'].includes(newStatus)) return;
    setRawProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          deliverables: p.deliverables.map((d) =>
            d.id === deliverableId ? { ...d, status: newStatus } : d
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
    try {
      localStorage.clear();
    } catch {
      // ignore
    }
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
        updateDeliverableStatus,
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
