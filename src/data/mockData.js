/**
 * Dados de demonstração coerentes para carteira de programas socioambientais.
 * Data de corte oficial desta carteira: 30/06/2026 (mês de referência: Jun).
 *
 * Regras de integridade garantidas:
 * - Soma dos pesos físicos (physicalWeight) de cada programa = 100%.
 * - % Físico Realizado = Σ (physicalWeight * progress / 100).
 * - Orçamento Total = Σ rubricas (budgeted); Executado = Σ rubricas (executed).
 * - Comprovado + Pendente = Executado em todas as rubricas.
 * - O ponto "Jun" da Curva S reflete exatamente o acumulado na data de corte.
 */

export const PORTFOLIO_CUTOFF = {
  date: "2026-06-30",
  formattedDate: "30/06/2026",
  monthLabel: "Jun"
};

export const INITIAL_PROJECTS = [
  {
    id: "prog-101",
    code: "PRG-01",
    name: "Laboratórios Comunitários de Inclusão Digital",
    strategicAxis: "Inclusão Produtiva e Tecnologia",
    manager: "Carlos Mendonça",
    funder: "Fundo Socioambiental BNDES (Não Reembolsável)",
    startDate: "10/01/2026",
    endDate: "31/08/2026",
    plannedPhysical: 80,
    plannedFinancial: 72,
    cutoffMonth: "Jun",
    deliverables: [
      {
        id: "del-101-1",
        name: "Adequação elétrica, lógica e mobiliário dos 5 polos comunitários",
        deadline: "31/03/2026",
        physicalWeight: 35,
        progress: 100
      },
      {
        id: "del-101-2",
        name: "Aquisição, tombamento e bancada de 100 computadores",
        deadline: "30/06/2026",
        physicalWeight: 45,
        progress: 80
      },
      {
        id: "del-101-3",
        name: "Ativação e homologação de fibra óptica (500 Mbps) nos 5 polos",
        deadline: "31/07/2026",
        physicalWeight: 20,
        progress: 35
      }
    ],
    budgetBreakdown: [
      { id: "rub-101-1", category: "Adequação Civil e Mobiliário", budgeted: 180000, executed: 145000, approvedProofs: 140000 },
      { id: "rub-101-2", category: "Equipamentos de Informática e Rede", budgeted: 190000, executed: 135000, approvedProofs: 135000 },
      { id: "rub-101-3", category: "Equipe Técnica de Implantação", budgeted: 50000, executed: 25000, approvedProofs: 25000 },
      { id: "rub-101-4", category: "Logística e Seguro Patrimonial", budgeted: 30000, executed: 10000, approvedProofs: 8000 }
    ],
    curveS: [
      { month: "Jan", plannedPhysical: 10, actualPhysical: 10, plannedFinancial: 15, actualFinancial: 14 },
      { month: "Fev", plannedPhysical: 25, actualPhysical: 24, plannedFinancial: 30, actualFinancial: 28 },
      { month: "Mar", plannedPhysical: 45, actualPhysical: 46, plannedFinancial: 45, actualFinancial: 45 },
      { month: "Abr", plannedPhysical: 60, actualPhysical: 58, plannedFinancial: 58, actualFinancial: 56 },
      { month: "Mai", plannedPhysical: 72, actualPhysical: 70, plannedFinancial: 66, actualFinancial: 64 },
      { month: "Jun", plannedPhysical: 80, actualPhysical: 78, plannedFinancial: 72, actualFinancial: 70 },
      { month: "Jul", plannedPhysical: 92, actualPhysical: null, plannedFinancial: 88, actualFinancial: null },
      { month: "Ago", plannedPhysical: 100, actualPhysical: null, plannedFinancial: 100, actualFinancial: null }
    ],
    impactMetrics: [
      {
        id: "imp-101-1",
        level: "Produto",
        indicator: "Polos comunitários equipados e em operação",
        unit: "polos",
        baseline: 0,
        target: 5,
        actual: 4,
        verificationSource: "Termo de Vistoria e Tombamento Patrimonial",
        frequency: "Mensal"
      },
      {
        id: "imp-101-2",
        level: "Resultado",
        indicator: "Moradores utilizando regularmente os laboratórios",
        unit: "pessoas",
        baseline: 0,
        target: 300,
        actual: 215,
        verificationSource: "Registro Nominal de Acesso nos Polos",
        frequency: "Mensal"
      }
    ],
    beneficiariesTarget: 300,
    beneficiariesActual: 215,
    beneficiaryUnit: "moradores atendidos",
    risks: [
      {
        id: "r-101-1",
        description: "Atraso da operadora local na fusão de fibra óptica do Polo Norte",
        impact: "Médio",
        probability: "Média",
        mitigation: "Acionar link secundário via rádio já cotado caso passe de 10/07"
      }
    ]
  },
  {
    id: "prog-102",
    code: "PRG-02",
    name: "Trilha Jovem Dev e Análise de Dados",
    strategicAxis: "Inclusão Produtiva e Tecnologia",
    manager: "Juliana Duarte",
    funder: "Instituto Futuro Presente (Investimento Social Privado)",
    startDate: "01/02/2026",
    endDate: "30/09/2026",
    plannedPhysical: 65,
    plannedFinancial: 60,
    cutoffMonth: "Jun",
    deliverables: [
      {
        id: "del-102-1",
        name: "Matriz curricular (360h) e cadernos de exercícios práticos",
        deadline: "28/02/2026",
        physicalWeight: 25,
        progress: 100
      },
      {
        id: "del-102-2",
        name: "Capacitação pedagógica de 12 instrutores e monitores locais",
        deadline: "30/04/2026",
        physicalWeight: 25,
        progress: 40
      },
      {
        id: "del-102-3",
        name: "Execução das 4 turmas presenciais (120 vagas totais)",
        deadline: "31/08/2026",
        physicalWeight: 50,
        progress: 20
      }
    ],
    budgetBreakdown: [
      { id: "rub-102-1", category: "Hora-aula de Instrutores e Mentoria", budgeted: 120000, executed: 110000, approvedProofs: 95000 },
      { id: "rub-102-2", category: "Bolsas-auxílio Permanência e Transporte", budgeted: 80000, executed: 78000, approvedProofs: 65000 },
      { id: "rub-102-3", category: "Licenças Educacionais e Ambiente Nuvem", budgeted: 50000, executed: 35000, approvedProofs: 35000 },
      { id: "rub-102-4", category: "Coordenação Pedagógica", budgeted: 30000, executed: 15000, approvedProofs: 15000 }
    ],
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
    impactMetrics: [
      {
        id: "imp-102-1",
        level: "Produto",
        indicator: "Jovens concluintes com frequência ≥ 75% e projeto integrador",
        unit: "jovens",
        baseline: 0,
        target: 120,
        actual: 32,
        verificationSource: "Diário de Classe Assinado e Certificados Emitidos",
        frequency: "Por turma"
      },
      {
        id: "imp-102-2",
        level: "Resultado",
        indicator: "Taxa de inserção profissional de formados em até 6 meses",
        unit: "%",
        baseline: 0,
        target: 65,
        actual: 22,
        verificationSource: "Acompanhamento de Egressos (CTPS / MEI / Estágio)",
        frequency: "Trimestral"
      }
    ],
    beneficiariesTarget: 120,
    beneficiariesActual: 48,
    beneficiaryUnit: "jovens em formação",
    risks: [
      {
        id: "r-102-1",
        description: "Consumo acelerado da rubrica de hora-aula e bolsas (restam R$ 42 mil para concluir 55% do escopo)",
        impact: "Alto",
        probability: "Alta",
        mitigation: "Suspender adiantamentos, conciliar R$ 28 mil de recibos pendentes e unificar oficinas teóricas das Turmas 3 e 4"
      }
    ]
  },
  {
    id: "prog-103",
    code: "PRG-03",
    name: "Aceleração de Pequenos Negócios em Práticas ESG",
    strategicAxis: "Empreendedorismo Sustentável e ESG",
    manager: "Marina Alencar",
    funder: "Cota Associativa Empresarial & Sebrae",
    startDate: "05/02/2026",
    endDate: "30/10/2026",
    plannedPhysical: 60,
    plannedFinancial: 58,
    cutoffMonth: "Jun",
    deliverables: [
      {
        id: "del-103-1",
        name: "Edital de seleção e diagnóstico de maturidade ESG de 30 empresas",
        deadline: "31/03/2026",
        physicalWeight: 30,
        progress: 100
      },
      {
        id: "del-103-2",
        name: "Consultorias individuais em eficiência energética e gestão de resíduos",
        deadline: "31/07/2026",
        physicalWeight: 45,
        progress: 60
      },
      {
        id: "del-103-3",
        name: "Rodada de negócios sustentáveis com empresas âncoras da região",
        deadline: "30/09/2026",
        physicalWeight: 25,
        progress: 0
      }
    ],
    budgetBreakdown: [
      { id: "rub-103-1", category: "Consultorias Especializadas em Gestão e ESG", budgeted: 110000, executed: 70000, approvedProofs: 64000 },
      { id: "rub-103-2", category: "Subsídio para Adequações Ambientais nos Negócios", budgeted: 70000, executed: 45000, approvedProofs: 45000 },
      { id: "rub-103-3", category: "Oficinas Coletivas e Rodada Empresarial", budgeted: 40000, executed: 28000, approvedProofs: 25000 }
    ],
    curveS: [
      { month: "Fev", plannedPhysical: 10, actualPhysical: 10, plannedFinancial: 12, actualFinancial: 15 },
      { month: "Mar", plannedPhysical: 30, actualPhysical: 30, plannedFinancial: 26, actualFinancial: 30 },
      { month: "Abr", plannedPhysical: 42, actualPhysical: 40, plannedFinancial: 38, actualFinancial: 44 },
      { month: "Mai", plannedPhysical: 52, actualPhysical: 49, plannedFinancial: 48, actualFinancial: 55 },
      { month: "Jun", plannedPhysical: 60, actualPhysical: 57, plannedFinancial: 58, actualFinancial: 65 },
      { month: "Jul", plannedPhysical: 75, actualPhysical: null, plannedFinancial: 72, actualFinancial: null },
      { month: "Ago", plannedPhysical: 85, actualPhysical: null, plannedFinancial: 84, actualFinancial: null },
      { month: "Set", plannedPhysical: 95, actualPhysical: null, plannedFinancial: 94, actualFinancial: null },
      { month: "Out", plannedPhysical: 100, actualPhysical: null, plannedFinancial: 100, actualFinancial: null }
    ],
    impactMetrics: [
      {
        id: "imp-103-1",
        level: "Produto",
        indicator: "Pequenos negócios com plano de sustentabilidade implementado",
        unit: "empresas",
        baseline: 0,
        target: 30,
        actual: 18,
        verificationSource: "Relatório Técnico de Consultoria Assinado pelo Sócio",
        frequency: "Bimestral"
      },
      {
        id: "imp-103-2",
        level: "Resultado",
        indicator: "Redução média na conta de energia ou descarte em aterro",
        unit: "%",
        baseline: 0,
        target: 18,
        actual: 11,
        verificationSource: "Comparativo de Faturas e Manifesto de Transporte de Resíduos",
        frequency: "Semestral"
      }
    ],
    beneficiariesTarget: 30,
    beneficiariesActual: 30,
    beneficiaryUnit: "pequenos negócios",
    risks: [
      {
        id: "r-103-1",
        description: "Adiantamento de pagamento de espaço para a Rodada de Negócios elevou o % financeiro antes da entrega física",
        impact: "Baixo",
        probability: "Baixa",
        mitigation: "Monitorar conclusão do ciclo de consultorias até 31/07 para reequilibrar curva"
      }
    ]
  },
  {
    id: "prog-104",
    code: "PRG-04",
    name: "Economia Circular e Cooperativas de Triagem",
    strategicAxis: "Sustentabilidade Ambiental e Renda",
    manager: "Roberto Tavares",
    funder: "Convênio Municipal & Fundo Ambiental",
    startDate: "15/01/2026",
    endDate: "31/08/2026",
    plannedPhysical: 75,
    plannedFinancial: 72,
    cutoffMonth: "Jun",
    deliverables: [
      {
        id: "del-104-1",
        name: "Adequação de galpão de triagem e entrega de EPIs (2 cooperativas)",
        deadline: "31/03/2026",
        physicalWeight: 40,
        progress: 100
      },
      {
        id: "del-104-2",
        name: "Implantação de rota de coleta seletiva em 40 empresas parceiras",
        deadline: "30/06/2026",
        physicalWeight: 40,
        progress: 75
      },
      {
        id: "del-104-3",
        name: "Implantação de controle mensal de pesagem e rateio contábil",
        deadline: "15/08/2026",
        physicalWeight: 20,
        progress: 25
      }
    ],
    budgetBreakdown: [
      { id: "rub-104-1", category: "Prensas Hidráulicas, Balanças e EPIs", budgeted: 75000, executed: 55000, approvedProofs: 55000 },
      { id: "rub-104-2", category: "Logística de Rotas e Educação Ambiental", budgeted: 50000, executed: 25000, approvedProofs: 25000 },
      { id: "rub-104-3", category: "Assessoria Contábil e Regularização", budgeted: 25000, executed: 10000, approvedProofs: 10000 }
    ],
    curveS: [
      { month: "Jan", plannedPhysical: 10, actualPhysical: 10, plannedFinancial: 10, actualFinancial: 10 },
      { month: "Fev", plannedPhysical: 25, actualPhysical: 26, plannedFinancial: 24, actualFinancial: 22 },
      { month: "Mar", plannedPhysical: 45, actualPhysical: 45, plannedFinancial: 42, actualFinancial: 38 },
      { month: "Abr", plannedPhysical: 58, actualPhysical: 58, plannedFinancial: 54, actualFinancial: 46 },
      { month: "Mai", plannedPhysical: 68, actualPhysical: 67, plannedFinancial: 64, actualFinancial: 53 },
      { month: "Jun", plannedPhysical: 75, actualPhysical: 75, plannedFinancial: 72, actualFinancial: 60 },
      { month: "Jul", plannedPhysical: 90, actualPhysical: null, plannedFinancial: 88, actualFinancial: null },
      { month: "Ago", plannedPhysical: 100, actualPhysical: null, plannedFinancial: 100, actualFinancial: null }
    ],
    impactMetrics: [
      {
        id: "imp-104-1",
        level: "Produto",
        indicator: "Volume mensal de recicláveis comercializados diretamente",
        unit: "t/mês",
        baseline: 12,
        target: 45,
        actual: 36,
        verificationSource: "Notas de Pesagem e Certificados de Destinação Final",
        frequency: "Mensal"
      },
      {
        id: "imp-104-2",
        level: "Resultado",
        indicator: "Renda média mensal por cooperado ativo (42 cooperados)",
        unit: "R$",
        baseline: 1350,
        target: 1950,
        actual: 1780,
        verificationSource: "Folha de Rateio Mensal Auditada",
        frequency: "Mensal"
      }
    ],
    beneficiariesTarget: 42,
    beneficiariesActual: 42,
    beneficiaryUnit: "cooperados",
    risks: [
      {
        id: "r-104-1",
        description: "Fornecedor da segunda balança digital entregou o equipamento, mas está com certidão negativa vencida para pagamento (R$ 18 mil retidos)",
        impact: "Médio",
        probability: "Alta",
        mitigation: "Notificar fornecedor para regularizar certidão fiscal até 10/07 antes do fechamento trimestral"
      }
    ]
  }
];

export const INITIAL_FOLLOW_UPS = [
  {
    id: "chk-102",
    projectId: "prog-102",
    projectName: "Trilha Jovem Dev e Análise de Dados",
    date: "26/06/2026",
    responsible: "Thayâne Carvalho",
    frequency: "Semanal",
    participants: "Juliana Duarte (Gestora), Coordenação Financeira e Representante do Financiador",
    items: [
      {
        id: "i-102-1",
        title: "Analisar desvio de custo (+40,0 p.p.) e atraso físico (-20,0 p.p.) na data de corte",
        checked: true,
        responsible: "Thayâne Carvalho",
        deadline: "26/06/2026",
        note: "IDC atual em 0,53; bloqueados novos adiantamentos de hora-aula até regularização física."
      },
      {
        id: "i-102-2",
        title: "Conciliar R$ 28.000 de comprovantes fiscais pendentes nas rubricas de instrutores e bolsas",
        checked: false,
        responsible: "Juliana Duarte",
        deadline: "05/07/2026",
        note: "Faltam 14 recibos assinados de auxílio-transporte de maio e 2 notas fiscais de mentoria."
      },
      {
        id: "i-102-3",
        title: "Concluir formação dos 7 instrutores restantes (entrega del-102-2 atrasada desde 30/04)",
        checked: false,
        responsible: "Rafael Nunes",
        deadline: "12/07/2026",
        note: "Banca prática reagendada para os dois primeiros sábados de julho."
      }
    ],
    actionPlans: [
      {
        id: "act-102-1",
        originGap: "Desvio de Custo (+40,0 p.p.) e Saldo Curto (R$ 42 mil)",
        what: "Unificar os módulos teóricos das Turmas 3 e 4 em encontros síncronos compartilhados",
        why: "Reduzir em 35% o custo de hora-aula restante para caber no saldo de R$ 42.000 sem cortar bolsas dos alunos",
        where: "Polos Centro e Continente",
        who: "Juliana Duarte",
        when: "2026-07-15",
        how: "Transmitir aulas expositivas conjuntas e manter instrutores presenciais exclusivamente nos laboratórios de prática",
        howMuch: 0,
        costNote: "Sem custo adicional (remanejamento interno de carga horária)",
        status: "Em Andamento"
      },
      {
        id: "act-102-2",
        originGap: "Comprovação Pendente (R$ 28.000)",
        what: "Implantar trava de prestação de contas quinzenal antes da liberação do lote seguinte de bolsas",
        why: "Evitar glosa financeira na auditoria semestral do Instituto Futuro Presente",
        where: "Secretaria Escolar / Financeiro",
        who: "Camila Borges",
        when: "2026-07-05",
        how: "Conferência de lista de presença + comprovante bancário individual até o dia 5 de cada mês",
        howMuch: 0,
        costNote: "Sem custo adicional",
        status: "Pendente"
      }
    ]
  },
  {
    id: "chk-101",
    projectId: "prog-101",
    projectName: "Laboratórios Comunitários de Inclusão Digital",
    date: "24/06/2026",
    responsible: "Thayâne Carvalho",
    frequency: "Quinzenal",
    participants: "Carlos Mendonça (Gestor) e Engenharia/TI",
    items: [
      {
        id: "i-101-1",
        title: "Conferir termos de tombamento dos 80 computadores já entregues nos Polos 1 a 4",
        checked: true,
        responsible: "Carlos Mendonça",
        deadline: "24/06/2026",
        note: "Notas fiscais e números de série conferidos e aprovados para prestação de contas BNDES."
      },
      {
        id: "i-101-2",
        title: "Cobrar entrega do lote final de 20 computadores para o Polo Norte",
        checked: true,
        responsible: "Carlos Mendonça",
        deadline: "30/06/2026",
        note: "Transportadora confirmou entrega para 02/07."
      },
      {
        id: "i-101-3",
        title: "Regularizar R$ 7.000 em comprovantes pendentes (adequação civil e seguro)",
        checked: false,
        responsible: "Patrícia Lima",
        deadline: "08/07/2026",
        note: "Aguardando emissão de boleto quitado da seguradora."
      }
    ],
    actionPlans: [
      {
        id: "act-101-1",
        originGap: "Risco de Atraso na Fibra Óptica (Polo Norte)",
        what: "Contratar contingência de link rádio dedicado caso operadora de fibra não instale até 10/07",
        why: "Garantir abertura da agenda de cursos do Polo Norte na segunda quinzena de julho",
        where: "Polo Comunitário Norte",
        who: "Carlos Mendonça",
        when: "2026-07-10",
        how: "Usar saldo da rubrica de Equipamentos e Rede com fornecedor local já cotado",
        howMuch: 1800,
        costNote: "Coberto dentro do saldo da rubrica de Rede",
        status: "Concluída"
      }
    ]
  },
  {
    id: "chk-103",
    projectId: "prog-103",
    projectName: "Aceleração de Pequenos Negócios em Práticas ESG",
    date: "25/06/2026",
    responsible: "Thayâne Carvalho",
    frequency: "Quinzenal",
    participants: "Marina Alencar (Gestora) e Consultores ESG",
    items: [
      {
        id: "i-103-1",
        title: "Validar relatórios parciais das 18 empresas que já concluíram diagnóstico e plano de ação",
        checked: true,
        responsible: "Marina Alencar",
        deadline: "25/06/2026",
        note: "18 planos entregues e assinados pelos empreendedores."
      },
      {
        id: "i-103-2",
        title: "Baixar comprovação fiscal de R$ 9.000 adiantados para locação e consultoria",
        checked: false,
        responsible: "Marina Alencar",
        deadline: "10/07/2026",
        note: "Aguardando nota fiscal de medição da consultoria ambiental."
      }
    ],
    actionPlans: []
  },
  {
    id: "chk-104",
    projectId: "prog-104",
    projectName: "Economia Circular e Cooperativas de Triagem",
    date: "23/06/2026",
    responsible: "Thayâne Carvalho",
    frequency: "Quinzenal",
    participants: "Roberto Tavares (Gestor) e Lideranças das 2 Cooperativas",
    items: [
      {
        id: "i-104-1",
        title: "Verificar adesão das 30 empresas já ativas na rota de coleta seletiva",
        checked: true,
        responsible: "Roberto Tavares",
        deadline: "23/06/2026",
        note: "36 toneladas/mês atingidas em junho (80% da meta final)."
      },
      {
        id: "i-104-2",
        title: "Destravar pagamento retido da balança digital por certidão fiscal vencida do fornecedor",
        checked: false,
        responsible: "Roberto Tavares",
        deadline: "10/07/2026",
        note: "Explica o financeiro 15 p.p. abaixo do físico na data de corte."
      }
    ],
    actionPlans: [
      {
        id: "act-104-1",
        originGap: "Desembolso Abaixo do Físico (-15,0 p.p.)",
        what: "Notificar formalmente o fornecedor da balança para apresentação de CND atualizada e liquidação da NF",
        why: "Regularizar o passivo financeiro de R$ 18.000 já entregue fisicamente antes do fechamento do convênio",
        where: "Setor de Compras e Convênios",
        who: "Roberto Tavares",
        when: "2026-07-10",
        how: "Envio de notificação contratual com prazo de 5 dias úteis para regularização cadastral",
        howMuch: 0,
        costNote: "Valor já previsto na rubrica de Prensas e Balanças",
        status: "Em Andamento"
      }
    ]
  }
];

export const INITIAL_EVIDENCES = [
  {
    id: "ev-1",
    projectId: "prog-101",
    category: "Prestação de Contas BNDES",
    title: "Notas Fiscais e Termo de Tombamento — Lote 1 a 4 (80 Computadores)",
    referenceCode: "SEI/BNDES #2026.0418-09",
    date: "18/06/2026",
    responsible: "Carlos Mendonça",
    externalUrl: "https://drive.google.com/",
    notes: "Conciliado 100% com a rubrica de Equipamentos de Informática (R$ 135.000 aprovados)."
  },
  {
    id: "ev-2",
    projectId: "prog-101",
    category: "Comprovação Física",
    title: "Laudo Fotográfico e ART de Adequação Elétrica dos 5 Polos",
    referenceCode: "ART-SC #884120",
    date: "02/04/2026",
    responsible: "Carlos Mendonça",
    externalUrl: "https://drive.google.com/",
    notes: "Comprova conclusão integral (100%) da Entrega 1 (peso físico 35%)."
  },
  {
    id: "ev-3",
    projectId: "prog-102",
    category: "Evidência Pedagógica",
    title: "Diários de Frequência e Projetos Finais — Turma 1 Concluída",
    referenceCode: "PASTA-ISP #T1-2026",
    date: "15/06/2026",
    responsible: "Juliana Duarte",
    externalUrl: "https://drive.google.com/",
    notes: "32 jovens certificados; R$ 28.000 em recibos de transporte das Turmas 2 e 3 seguem em conciliação."
  },
  {
    id: "ev-4",
    projectId: "prog-103",
    category: "Indicador de Resultado",
    title: "Planos de Descarbonização e Resíduos Assinados (18 Pequenos Negócios)",
    referenceCode: "ESG-ACIF #2026-18",
    date: "22/06/2026",
    responsible: "Marina Alencar",
    externalUrl: "https://drive.google.com/",
    notes: "Evidência de alcance parcial do indicador de produto (18 de 30 empresas)."
  },
  {
    id: "ev-5",
    projectId: "prog-104",
    category: "Impacto Socioambiental",
    title: "Certificados de Destinação Final (36 t/mês) e Folha de Rateio das Cooperativas",
    referenceCode: "MTR-FATMA #06-2026",
    date: "28/06/2026",
    responsible: "Roberto Tavares",
    externalUrl: "https://drive.google.com/",
    notes: "Comprova renda média de R$ 1.780/mês para 42 cooperados em junho/2026."
  }
];
