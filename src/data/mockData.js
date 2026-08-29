export const INITIAL_IDENTITY = {
  mission: "Promover transformação social e inclusão produtiva por meio da capacitação tecnológica e fortalecimento de comunidades vulneráveis.",
  vision: "Garantir que 100.000 jovens e adultos de comunidades em vulnerabilidade alcancem autonomia econômica e inserção digital qualificada até 2028.",
  values: [
    "Protagonismo comunitário e escuta ativa",
    "Rigor na governança e transparência na prestação de contas",
    "Eficiência na aplicação e alocação de recursos",
    "Inovação socioambiental orientada a impacto mensurável",
    "Melhoria contínua e foco em resultados sustentáveis"
  ]
};

export const INITIAL_SWOT = {
  strengths: [
    { id: "s1", text: "Metodologia própria de ensino digital validada em mais de 15 polos comunitários." },
    { id: "s2", text: "Equipe técnica multidisciplinar com alta aderência aos valores do projeto." },
    { id: "s3", text: "Relacionamento de confiança e engajamento direto com lideranças locais." }
  ],
  weaknesses: [
    { id: "w1", text: "Dependência de editais sazonais e financiamentos de curto prazo." },
    { id: "w2", text: "Necessidade de digitalizar e automatizar rotinas de follow-up e controle físico-financeiro." },
    { id: "w3", text: "Capacidade instalada limitada de laboratórios de informática em regiões periféricas." }
  ],
  opportunities: [
    { id: "o1", text: "Crescimento da demanda do setor produtivo por profissionais juniores de tecnologia e dados." },
    { id: "o2", text: "Ampliação de editais de fundos socioambientais com foco em ESG e impacto comprovado." },
    { id: "o3", text: "Parcerias estratégicas com empresas privadas para contratação direta de formandos." }
  ],
  threats: [
    { id: "t1", text: "Instabilidade econômica impactando desembolsos e fluxo de caixa de patrocinadores." },
    { id: "t2", text: "Evasão de alunos devido a necessidades urgentes de renda informal." },
    { id: "t3", text: "Atrasos em processos de aprovação burocrática de prestação de contas governamentais." }
  ]
};

export const INITIAL_STRATEGY_TREE = [
  {
    id: "oe-1",
    code: "OE.1",
    title: "Capacitação Profissional e Oportunidades para Jovens",
    level: "Estratégico",
    horizon: "Prazo: 3 anos",
    kpi: "20.000 jovens capacitados, com 70% de inserção profissional em até 6 meses",
    tacticalProjects: [
      {
        id: "proj-101",
        code: "Laboratórios Digitais",
        title: "Laboratórios Comunitários de Inclusão Digital",
        area: "Infraestrutura",
        budget: 450000,
        spent: 315000,
        physicalProgress: 78,
        financialProgress: 70,
        status: "Em Dia",
        deliverables: [
          { id: "del-1", name: "Reforma e adequação de 5 polos", deadline: "15/03/2026", status: "Concluído", physicalWeight: 40 },
          { id: "del-2", name: "Aquisição e instalação de 120 computadores", deadline: "30/04/2026", status: "Em Andamento", physicalWeight: 40 },
          { id: "del-3", name: "Instalação e testes de conexão de fibra óptica de 500Mbps", deadline: "20/05/2026", status: "Concluído", physicalWeight: 20 }
        ]
      },
      {
        id: "proj-102",
        code: "Bootcamp Jovem",
        title: "Programa Bootcamp Dev e Dados para a Juventude",
        area: "Formação",
        budget: 280000,
        spent: 238000,
        physicalProgress: 45,
        financialProgress: 85,
        status: "Em Risco",
        deliverables: [
          { id: "del-4", name: "Desenvolvimento da grade curricular e apostilas", deadline: "10/02/2026", status: "Concluído", physicalWeight: 30 },
          { id: "del-5", name: "Capacitação de 15 instrutores locais", deadline: "25/03/2026", status: "Atrasado", physicalWeight: 30 },
          { id: "del-6", name: "Execução das 4 primeiras turmas piloto", deadline: "30/06/2026", status: "Em Andamento", physicalWeight: 40 }
        ]
      }
    ]
  },
  {
    id: "oe-2",
    code: "OE.2",
    title: "Gestão Responsável e Transparência",
    level: "Estratégico",
    horizon: "Prazo: 2 anos",
    kpi: "100% de aprovação na prestação de contas dos recursos e zero pendências de auditoria",
    tacticalProjects: [
      {
        id: "proj-201",
        code: "Rotinas de Gestão",
        title: "Controle de Projetos e Rotinas de Gestão",
        area: "Qualidade e Governança",
        budget: 120000,
        spent: 60000,
        physicalProgress: 60,
        financialProgress: 50,
        status: "Em Dia",
        deliverables: [
          { id: "del-7", name: "Implantação de rotinas de acompanhamento semanais", deadline: "01/03/2026", status: "Concluído", physicalWeight: 50 },
          { id: "del-8", name: "Treinamento das equipes em rituais ágeis e plano de ação", deadline: "15/04/2026", status: "Em Andamento", physicalWeight: 50 }
        ]
      }
    ]
  }
];

export const INITIAL_PROJECTS = [
  {
    id: "proj-101",
    name: "Laboratórios Comunitários de Inclusão Digital",
    code: "Laboratórios Digitais",
    strategicObjective: "Capacitação Profissional e Oportunidades para Jovens",
    manager: "Carlos Mendonça",
    sponsor: "Fundo Socioambiental Alfa",
    startDate: "2026-01-10",
    endDate: "2026-08-30",
    totalBudget: 450000,
    executedBudget: 315000,
    plannedPhysical: 80,
    actualPhysical: 78,
    plannedFinancial: 72,
    actualFinancial: 70,
    status: "Normal",
    stage: "Execução",
    lastFollowUp: "2026-08-20",
    healthScore: 92,
    curveS: [
      { month: "Jan", plannedPhysical: 10, actualPhysical: 10, plannedFinancial: 15, actualFinancial: 14 },
      { month: "Fev", plannedPhysical: 25, actualPhysical: 24, plannedFinancial: 30, actualFinancial: 28 },
      { month: "Mar", plannedPhysical: 45, actualPhysical: 46, plannedFinancial: 45, actualFinancial: 45 },
      { month: "Abr", plannedPhysical: 60, actualPhysical: 58, plannedFinancial: 58, actualFinancial: 56 },
      { month: "Mai", plannedPhysical: 75, actualPhysical: 74, plannedFinancial: 68, actualFinancial: 65 },
      { month: "Jun", plannedPhysical: 80, actualPhysical: 78, plannedFinancial: 72, actualFinancial: 70 },
      { month: "Jul", plannedPhysical: 90, actualPhysical: null, plannedFinancial: 85, actualFinancial: null },
      { month: "Ago", plannedPhysical: 100, actualPhysical: null, plannedFinancial: 100, actualFinancial: null }
    ],
    budgetBreakdown: [
      { category: "Infraestrutura e Obras", budgeted: 180000, executed: 145000, approvedProofs: 140000, pendingProofs: 5000 },
      { category: "Equipamentos de Informática", budgeted: 190000, executed: 135000, approvedProofs: 135000, pendingProofs: 0 },
      { category: "Equipe Técnica e Coordenação", budgeted: 50000, executed: 25000, approvedProofs: 25000, pendingProofs: 0 },
      { category: "Despesas Administrativas", budgeted: 30000, executed: 10000, approvedProofs: 8000, pendingProofs: 2000 }
    ],
    risks: [
      { id: "r1", description: "Variação de preço no fornecimento de equipamentos de rede", impact: "Médio", probability: "Baixa", mitigation: "Cotação antecipada com fornecedores homologados" }
    ]
  },
  {
    id: "proj-102",
    name: "Programa Bootcamp Dev e Dados para a Juventude",
    code: "Bootcamp Jovem",
    strategicObjective: "Capacitação Profissional e Oportunidades para Jovens",
    manager: "Juliana Duarte",
    sponsor: "Instituto Futuro Presente",
    startDate: "2026-02-01",
    endDate: "2026-09-15",
    totalBudget: 280000,
    executedBudget: 238000,
    plannedPhysical: 65,
    actualPhysical: 45,
    plannedFinancial: 60,
    actualFinancial: 85,
    status: "Crítico",
    stage: "Execução",
    lastFollowUp: "2026-08-18",
    healthScore: 54,
    curveS: [
      { month: "Fev", plannedPhysical: 15, actualPhysical: 12, plannedFinancial: 15, actualFinancial: 20 },
      { month: "Mar", plannedPhysical: 30, actualPhysical: 25, plannedFinancial: 30, actualFinancial: 42 },
      { month: "Abr", plannedPhysical: 45, actualPhysical: 34, plannedFinancial: 42, actualFinancial: 60 },
      { month: "Mai", plannedPhysical: 55, actualPhysical: 40, plannedFinancial: 50, actualFinancial: 75 },
      { month: "Jun", plannedPhysical: 65, actualPhysical: 45, plannedFinancial: 60, actualFinancial: 85 },
      { month: "Jul", plannedPhysical: 80, actualPhysical: null, plannedFinancial: 75, actualFinancial: null },
      { month: "Ago", plannedPhysical: 95, actualPhysical: null, plannedFinancial: 90, actualFinancial: null },
      { month: "Set", plannedPhysical: 100, actualPhysical: null, plannedFinancial: 100, actualFinancial: null }
    ],
    budgetBreakdown: [
      { category: "Instrutores e Mentoria", budgeted: 120000, executed: 110000, approvedProofs: 95000, pendingProofs: 15000 },
      { category: "Bolsas de Apoio aos Alunos", budgeted: 80000, executed: 78000, approvedProofs: 65000, pendingProofs: 13000 },
      { category: "Licenças de Softwares e Plataformas", budgeted: 50000, executed: 35000, approvedProofs: 35000, pendingProofs: 0 },
      { category: "Gestão do Projeto e Suporte", budgeted: 30000, executed: 15000, approvedProofs: 15000, pendingProofs: 0 }
    ],
    risks: [
      { id: "r2", description: "Descompasso acentuado: 85% do orçamento consumido com apenas 45% do avanço físico entregue", impact: "Alto", probability: "Alta", mitigation: "Readequar escala de mentores e congelar desembolsos não críticos" }
    ]
  },
  {
    id: "proj-201",
    name: "Controle de Projetos e Rotinas de Gestão",
    code: "Rotinas de Gestão",
    strategicObjective: "Gestão Responsável e Transparência",
    manager: "Thayâne Carvalho",
    sponsor: "Diretoria Executiva",
    startDate: "2026-01-15",
    endDate: "2026-07-30",
    totalBudget: 120000,
    executedBudget: 60000,
    plannedPhysical: 60,
    actualPhysical: 60,
    plannedFinancial: 50,
    actualFinancial: 50,
    status: "Normal",
    stage: "Execução",
    lastFollowUp: "2026-08-22",
    healthScore: 95,
    curveS: [
      { month: "Jan", plannedPhysical: 10, actualPhysical: 10, plannedFinancial: 10, actualFinancial: 10 },
      { month: "Fev", plannedPhysical: 25, actualPhysical: 25, plannedFinancial: 20, actualFinancial: 20 },
      { month: "Mar", plannedPhysical: 40, actualPhysical: 40, plannedFinancial: 35, actualFinancial: 35 },
      { month: "Abr", plannedPhysical: 60, actualPhysical: 60, plannedFinancial: 50, actualFinancial: 50 },
      { month: "Mai", plannedPhysical: 80, actualPhysical: null, plannedFinancial: 75, actualFinancial: null },
      { month: "Jun", plannedPhysical: 100, actualPhysical: null, plannedFinancial: 100, actualFinancial: null }
    ],
    budgetBreakdown: [
      { category: "Consultoria e Metodologia", budgeted: 60000, executed: 35000, approvedProofs: 35000, pendingProofs: 0 },
      { category: "Capacitação das Equipes", budgeted: 40000, executed: 15000, approvedProofs: 15000, pendingProofs: 0 },
      { category: "Ferramentas de Painel e Acompanhamento", budgeted: 20000, executed: 10000, approvedProofs: 10000, pendingProofs: 0 }
    ],
    risks: []
  }
];

export const INITIAL_FOLLOW_UPS = [
  {
    id: "chk-1",
    projectId: "proj-102",
    projectName: "Programa Bootcamp Dev e Dados para a Juventude",
    date: "2026-08-25",
    responsible: "Thayâne Carvalho",
    frequency: "Semanal",
    items: [
      { id: "i1", title: "Verificar desvio físico vs financeiro (>15% acende alerta vermelho)", checked: true, note: "Desvio crítico detectado: Físico 45% vs Financeiro 85%" },
      { id: "i2", title: "Revisar comprovações fiscais e extratos das rubricas de bolsistas", checked: true, note: "R$ 28.000 pendentes de conciliação e recibos" },
      { id: "i3", title: "Confirmar realização dos rituais de alinhamento com instrutores locais", checked: false, note: "Ritual atrasado em 4 dias" },
      { id: "i4", title: "Atualizar cronograma de marcos e entregas na árvore de desdobramento", checked: false, note: "Necessário postergar marco del-5" },
      { id: "i5", title: "Registrar ata e disparar plano de ação para contenção de custos", checked: false, note: "Pendente aprovação da coordenação" }
    ],
    actionPlan5W2H: {
      what: "Readequar o formato das oficinas práticas e otimizar cronograma de aulas",
      why: "Equilibrar a velocidade das entregas pedagógicas com o orçamento planejado",
      where: "Polos Regionais 1 e 2",
      who: "Coordenação Pedagógica",
      when: "Até 30/08/2026",
      how: "Consolidar módulos teóricos em ambiente digital e concentrar encontros presenciais em projetos práticos integrados",
      howMuch: "Otimização orçamentária estimada em R$ 38.000 para as etapas finais"
    }
  },
  {
    id: "chk-2",
    projectId: "proj-101",
    projectName: "Laboratórios Comunitários de Inclusão Digital",
    date: "2026-08-24",
    responsible: "Thayâne Carvalho",
    frequency: "Quinzenal",
    items: [
      { id: "i21", title: "Conferência de entrega física dos 120 computadores", checked: true, note: "100% recebidos e testados em bancada" },
      { id: "i22", title: "Verificação da prestação de contas com fornecedor de TI", checked: true, note: "Notas fiscais e relatórios técnicos aprovados" },
      { id: "i23", title: "Aferição de conexão de fibra óptica instalada", checked: true, note: "Velocidade atingiu 500Mbps contratados em todos os polos" },
      { id: "i24", title: "Envio de status report executivo para o comitê gestor", checked: true, note: "Enviado no prazo em 22/08" }
    ],
    actionPlan5W2H: null
  },
  {
    id: "chk-3",
    projectId: "proj-201",
    projectName: "Controle de Projetos e Rotinas de Gestão",
    date: "2026-08-26",
    responsible: "Thayâne Carvalho",
    frequency: "Semanal",
    items: [
      { id: "i31", title: "Checagem de preenchimento dos status reports pelas lideranças", checked: true, note: "100% dos líderes de projeto atualizaram suas entregas no painel" },
      { id: "i32", title: "Acompanhamento da oficina prática de plano de ação com os times", checked: true, note: "Oficina realizada com 18 participantes" },
      { id: "i33", title: "Validação do cumprimento dos combinados da semana anterior", checked: true, note: "85% das ações combinadas foram concluídas no prazo" }
    ],
    actionPlan5W2H: null
  }
];

export const INITIAL_DOCUMENTS = [
  {
    id: "doc-1",
    projectId: "proj-101",
    projectName: "Laboratórios Comunitários de Inclusão Digital",
    title: "Termo de Homologação e Conectividade Fibra 500Mbps",
    category: "Comprovação Técnica",
    fileName: "laudo_homologacao_conectividade_polos.pdf",
    fileSize: "2.4 MB",
    uploadDate: "2026-08-20",
    uploadedBy: "Carlos Mendonça",
    description: "Relatório de medição e ateste técnico de velocidade de rede nos 5 polos com comprovação fotográfica dos racks instalados.",
    type: "pdf"
  },
  {
    id: "doc-2",
    projectId: "proj-101",
    projectName: "Laboratórios Comunitários de Inclusão Digital",
    title: "Nota Fiscal & Termo de Recebimento de 120 Computadores",
    category: "Prestação de Contas",
    fileName: "nf_equipamentos_lote1_aprovada.pdf",
    fileSize: "4.1 MB",
    uploadDate: "2026-08-15",
    uploadedBy: "Carlos Mendonça",
    description: "Comprovante fiscal aprovado em auditoria prévia correspondente à rubrica de Equipamentos de Informática.",
    type: "pdf"
  },
  {
    id: "doc-3",
    projectId: "proj-102",
    projectName: "Programa Bootcamp Dev e Dados para a Juventude",
    title: "Grade Curricular e Matriz de Competências Pedagógicas",
    category: "Plano Pedagógico",
    fileName: "matriz_pedagogica_bootcamp_2026.pdf",
    fileSize: "1.8 MB",
    uploadDate: "2026-08-10",
    uploadedBy: "Juliana Duarte",
    description: "Documento oficial do plano pedagógico contendo a ementa de desenvolvimento e análise de dados para as turmas piloto.",
    type: "pdf"
  },
  {
    id: "doc-4",
    projectId: "proj-201",
    projectName: "Controle de Projetos e Rotinas de Gestão",
    title: "Manual de Rituais e Governança de Portfólio",
    category: "Governança",
    fileName: "guia_governanca_rotinas_radarsocial.pdf",
    fileSize: "3.2 MB",
    uploadDate: "2026-08-22",
    uploadedBy: "Thayâne Carvalho",
    description: "Metodologia padronizada de checagem semanal, planos de ação corretivos e aferição contínua físico-financeira.",
    type: "pdf"
  }
];

export const NAMING_OPTIONS = [
  {
    id: "desdobra",
    name: "Desdobra",
    tagline: "Do Propósito à Execução Físico-Financeira",
    description: "Foco claro no cascateamento estruturado da estratégia até as entregas de ponta."
  },
  {
    id: "radarimpacto",
    name: "RadarImpacto",
    tagline: "Cockpit Executivo & Monitoramento de Desvios",
    description: "Enfoque em visualização 360°, semáforos de risco e tomada de decisão preditiva."
  },
  {
    id: "elosocial",
    name: "EloSocial",
    tagline: "A Conexão Contínua entre Recursos e Resultados",
    description: "Evidencia o elo ininterrupto entre orçamento, entregas físicas e impacto social gerado."
  },
  {
    id: "nortesocial",
    name: "NorteSocial",
    tagline: "Navegação Estratégica para Projetos Socioambientais",
    description: "Forte apelo de orientação, governança e conformidade institucional."
  },
  {
    id: "desdobre",
    name: "Desdobre.io",
    tagline: "Plataforma de Gestão Físico-Financeira & Rituais Ágeis",
    description: "Identidade moderna no modelo SaaS para aceleração de portfólios sociais."
  }
];
