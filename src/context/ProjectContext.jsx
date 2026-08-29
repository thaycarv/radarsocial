import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_IDENTITY,
  INITIAL_SWOT,
  INITIAL_STRATEGY_TREE,
  INITIAL_PROJECTS,
  INITIAL_FOLLOW_UPS,
  INITIAL_DOCUMENTS,
  NAMING_OPTIONS
} from '../data/mockData';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [identity, setIdentity] = useState(() => {
    const saved = localStorage.getItem('radarsocial_identity_v7');
    return saved ? JSON.parse(saved) : INITIAL_IDENTITY;
  });

  const [swot, setSwot] = useState(() => {
    const saved = localStorage.getItem('radarsocial_swot_v7');
    return saved ? JSON.parse(saved) : INITIAL_SWOT;
  });

  const [strategyTree, setStrategyTree] = useState(() => {
    const saved = localStorage.getItem('radarsocial_strategy_tree_v7');
    return saved ? JSON.parse(saved) : INITIAL_STRATEGY_TREE;
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('radarsocial_projects_v7');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [followUps, setFollowUps] = useState(() => {
    const saved = localStorage.getItem('radarsocial_follow_ups_v7');
    return saved ? JSON.parse(saved) : INITIAL_FOLLOW_UPS;
  });

  const [documents, setDocuments] = useState(() => {
    const saved = localStorage.getItem('radarsocial_documents_v7');
    return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
  });

  const [selectedProjectId, setSelectedProjectId] = useState("proj-101");
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('radarsocial_theme') || 'default';
  });
  const [currentBrand, setCurrentBrand] = useState(() => {
    const saved = localStorage.getItem('radarsocial_current_brand_v7');
    return saved ? JSON.parse(saved) : NAMING_OPTIONS[0];
  });

  useEffect(() => {
    localStorage.setItem('radarsocial_theme', theme);
  }, [theme]);

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('radarsocial_identity_v7', JSON.stringify(identity));
  }, [identity]);

  useEffect(() => {
    localStorage.setItem('radarsocial_swot_v7', JSON.stringify(swot));
  }, [swot]);

  useEffect(() => {
    localStorage.setItem('radarsocial_strategy_tree_v7', JSON.stringify(strategyTree));
  }, [strategyTree]);

  useEffect(() => {
    localStorage.setItem('radarsocial_projects_v7', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('radarsocial_follow_ups_v7', JSON.stringify(followUps));
  }, [followUps]);

  useEffect(() => {
    localStorage.setItem('radarsocial_documents_v7', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('desdobra_follow_ups', JSON.stringify(followUps));
  }, [followUps]);

  useEffect(() => {
    localStorage.setItem('desdobra_current_brand', JSON.stringify(currentBrand));
  }, [currentBrand]);

  const selectedProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  const updateIdentity = (newIdentity) => setIdentity(newIdentity);

  const addSwotItem = (quadrant, text) => {
    setSwot(prev => ({
      ...prev,
      [quadrant]: [...prev[quadrant], { id: `swot-${Date.now()}`, text }]
    }));
  };

  const removeSwotItem = (quadrant, id) => {
    setSwot(prev => ({
      ...prev,
      [quadrant]: prev[quadrant].filter(item => item.id !== id)
    }));
  };

  const updateProjectProgress = (id, actualPhysical, actualFinancial) => {
    const physical = Number(actualPhysical);
    const financial = Number(actualFinancial);

    let status = "Normal";
    if (financial - physical > 15) status = "Crítico";
    else if (financial - physical > 5) status = "Atenção";

    setProjects(prev => prev.map(p => {
      if (p.id === id) {
        // Atualizar o último ponto medido na Curva S para refletir no gráfico imediatamente
        const updatedCurveS = p.curveS ? p.curveS.map((pt, idx, arr) => {
          // Encontrar o último mês com medição real ou o mês atual (Jun)
          if (idx === 5 || idx === arr.findIndex(item => item.actualPhysical === null) - 1 || idx === arr.length - 1) {
            return { ...pt, actualPhysical: physical, actualFinancial: financial };
          }
          return pt;
        }) : [];

        return {
          ...p,
          actualPhysical: physical,
          actualFinancial: financial,
          status,
          executedBudget: Math.round((financial / 100) * p.totalBudget),
          curveS: updatedCurveS
        };
      }
      return p;
    }));

    // Sincronizar também na árvore de desdobramento
    setStrategyTree(prev => prev.map(oe => ({
      ...oe,
      tacticalProjects: oe.tacticalProjects ? oe.tacticalProjects.map(tp => {
        if (tp.id === id) {
          return {
            ...tp,
            physicalProgress: physical,
            financialProgress: financial,
            spent: Math.round((financial / 100) * (tp.budget || 300000)),
            status: status === "Normal" ? "Em Dia" : status === "Crítico" ? "Em Risco" : "Atenção"
          };
        }
        return tp;
      }) : []
    })));
  };

  const resetProjectProgress = (id) => {
    const original = INITIAL_PROJECTS.find(p => p.id === id);
    if (!original) return;

    updateProjectProgress(id, original.actualPhysical, original.actualFinancial);
  };

  const toggleChecklistItem = (followUpId, itemId) => {
    setFollowUps(prev => prev.map(f => {
      if (f.id === followUpId) {
        return {
          ...f,
          items: f.items.map(item => item.id === itemId ? { ...item, checked: !item.checked } : item)
        };
      }
      return f;
    }));
  };

  const addActionPlan = (followUpId, plan) => {
    setFollowUps(prev => prev.map(f => {
      if (f.id === followUpId) {
        return { ...f, actionPlan5W2H: plan };
      }
      return f;
    }));
  };

  const addDocument = (newDoc) => {
    setDocuments(prev => [
      {
        id: `doc-${Date.now()}`,
        uploadDate: new Date().toISOString().split('T')[0],
        ...newDoc
      },
      ...prev
    ]);
  };

  const deleteDocument = (docId) => {
    setDocuments(prev => prev.filter(d => d.id !== docId));
  };

  const resetToDefault = () => {
    localStorage.clear();
    setIdentity(INITIAL_IDENTITY);
    setSwot(INITIAL_SWOT);
    setStrategyTree(INITIAL_STRATEGY_TREE);
    setProjects(INITIAL_PROJECTS);
    setFollowUps(INITIAL_FOLLOW_UPS);
    setDocuments(INITIAL_DOCUMENTS);
    setCurrentBrand(NAMING_OPTIONS[0]);
  };

  return (
    <ProjectContext.Provider value={{
      identity,
      updateIdentity,
      swot,
      addSwotItem,
      removeSwotItem,
      strategyTree,
      setStrategyTree,
      projects,
      selectedProject,
      selectedProjectId,
      setSelectedProjectId,
      updateProjectProgress,
      resetProjectProgress,
      followUps,
      toggleChecklistItem,
      addActionPlan,
      documents,
      addDocument,
      deleteDocument,
      currentBrand,
      setCurrentBrand,
      theme,
      setTheme,
      namingOptions: NAMING_OPTIONS,
      resetToDefault
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);
