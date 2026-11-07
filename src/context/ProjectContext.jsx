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
  projects: 'radarsocial_v2_projects',
  followUps: 'radarsocial_v2_followups',
  evidences: 'radarsocial_v2_evidences',
  theme: 'radarsocial_v2_theme'
};

const ProjectContext = createContext();

const loadFromStorage = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

export const ProjectProvider = ({ children }) => {
  const [rawProjects, setRawProjects] = useState(() =>
    loadFromStorage(STORAGE_KEYS.projects, INITIAL_PROJECTS)
  );
  const [followUps, setFollowUps] = useState(() =>
    loadFromStorage(STORAGE_KEYS.followUps, INITIAL_FOLLOW_UPS)
  );
  const [evidences, setEvidences] = useState(() =>
    loadFromStorage(STORAGE_KEYS.evidences, INITIAL_EVIDENCES)
  );
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.theme);
    return saved === 'dark' ? 'dark' : 'default';
  });

  const [selectedProjectId, setSelectedProjectId] = useState(
    () => rawProjects[0]?.id || 'prog-101'
  );

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

  // Todos os projetos com indicadores derivados das entregas e rubricas
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
    () => generateGovernanceAlerts(projects, followUps),
    [projects, followUps]
  );

  // Atualiza o avanço percentual (0-100) de uma entrega física específica
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

  // Atualiza os valores executado (pago) e comprovado de uma rubrica orçamentária
  const updateRubricValues = (projectId, rubricId, executedValue, approvedValue) => {
    const executed = Math.max(0, Math.round(Number(executedValue) || 0));
    const approvedProofs = Math.max(0, Math.min(executed, Math.round(Number(approvedValue) || 0)));

    setRawProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          budgetBreakdown: p.budgetBreakdown.map((r) =>
            r.id === rubricId ? { ...r, executed, approvedProofs } : r
          )
        };
      })
    );
  };

  // Atualiza valor realizado de um indicador de produto/resultado
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

  // Restaura apenas um programa aos valores originais da demonstração
  const resetProjectToDefault = (projectId) => {
    const original = INITIAL_PROJECTS.find((p) => p.id === projectId);
    if (!original) return;
    setRawProjects((prev) => prev.map((p) => (p.id === projectId ? original : p)));
  };

  // Marca/desmarca item de verificação da reunião
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

  // Adiciona novo item ao checklist da reunião
  const addChecklistItem = (followUpId, itemData) => {
    setFollowUps((prev) =>
      prev.map((f) => {
        if (f.id !== followUpId) return f;
        return {
          ...f,
          items: [
            ...f.items,
            {
              id: `chk-item-${Date.now()}`,
              title: itemData.title,
              responsible: itemData.responsible || 'Equipe do Programa',
              deadline: itemData.deadline || PORTFOLIO_CUTOFF.formattedDate,
              note: itemData.note || '',
              checked: false
            }
          ]
        };
      })
    );
  };

  // Adiciona nova ação corretiva 5W2H vinculada ao programa
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
              originGap: actionData.originGap || 'Desvio identificado em reunião',
              what: actionData.what,
              why: actionData.why,
              where: actionData.where,
              who: actionData.who,
              when: actionData.when,
              how: actionData.how,
              howMuch: Math.max(0, Number(actionData.howMuch) || 0),
              costNote: actionData.costNote || '',
              status: 'Pendente'
            }
          ]
        };
      })
    );
  };

  // Alterna status de uma ação 5W2H: Pendente -> Em Andamento -> Concluída
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
            a.id === actionId ? { ...a, status: nextStatus[a.status] || 'Pendente' } : a
          )
        };
      })
    );
  };

  // Registra vínculo de evidência / documento de prestação de contas
  const addEvidence = (evidenceData) => {
    setEvidences((prev) => [
      {
        id: `ev-${Date.now()}`,
        ...evidenceData
      },
      ...prev
    ]);
  };

  const deleteEvidence = (id) => {
    setEvidences((prev) => prev.filter((e) => e.id !== id));
  };

  // Restaura toda a demonstração removendo APENAS chaves do RadarSocial
  const resetToDefault = () => {
    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
    setRawProjects(INITIAL_PROJECTS);
    setFollowUps(INITIAL_FOLLOW_UPS);
    setEvidences(INITIAL_EVIDENCES);
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
        updateDeliverableProgress,
        updateRubricValues,
        updateImpactActual,
        resetProjectToDefault,
        toggleChecklistItem,
        addChecklistItem,
        addActionPlanItem,
        cycleActionStatus,
        addEvidence,
        deleteEvidence,
        resetToDefault
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

// oxlint-disable-next-line react/only-export-components
export const useProjects = () => useContext(ProjectContext);
