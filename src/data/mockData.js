export const PORTFOLIO_CUTOFF = {
  date: '2026-06-30',
  formattedDate: '30/06/2026',
  shortRef: 'Jun/2026',
  monthLabel: 'Jun'
};

export const INITIAL_PROJECTS = [
  {
    id: 'prog-101',
    code: 'PRG-01',
    shortName: 'Laboratórios Digitais',
    name: 'Laboratórios Comunitários de Inclusão Digital',
    strategicAxis: 'Inclusão Digital',
    manager: 'Carlos Mendonça',
    funder: 'Fundo Socioambiental Horizonte',
    operationalHeadline: 'Instalação de rede lógica e bancadas em andamento',
    startDate: '10/01/2026',
    endDate: '31/08/2026',
    plannedPhysical: 70,
    plannedFinancial: 72,
    cutoffMonth: 'Jun',
    deliverables: [
      {
        id: 'del-101-1',
        name: 'Vistoria técnica e projeto elétrico dos 5 polos',
        deadline: '15/02/2026',
        deadlineISO: '2026-02-15',
        status: 'done'
      },
      {
        id: 'del-101-2',
        name: 'Adequação civil, rede lógica e mobiliário',
        deadline: '31/03/2026',
        deadlineISO: '2026-03-31',
        status: 'done'
      },
      {
        id: 'del-101-3',
        name: 'Compra e entrega dos 100 computadores',
        deadline: '25/05/2026',
        deadlineISO: '2026-05-25',
        status: 'done'
      },
      {
        id: 'del-101-4',
        name: 'Montagem das bancadas e ativação de internet fibra',
        deadline: '15/07/2026',
        deadlineISO: '2026-07-15',
        status: 'in_progress'
      },
      {
        id: 'del-101-5',
        name: 'Abertura dos 5 polos e treinamento dos monitores',
        deadline: '25/08/2026',
        deadlineISO: '2026-08-25',
        status: 'pending'
      }
    ],
    budgetBreakdown: [
      { id: 'rub-101-1', category: 'Adequação Civil e Mobiliário', budgeted: 180000, executed: 145000, approvedProofs: 140000 },
      { id: 'rub-101-2', category: 'Equipamentos de Informática e Rede', budgeted: 190000, executed: 135000, approvedProofs: 135000 },
      { id: 'rub-101-3', category: 'Equipe Técnica de Implantação', budgeted: 50000, executed: 25000, approvedProofs: 25000 },
      { id: 'rub-101-4', category: 'Logística e Seguro Patrimonial', budgeted: 30000, executed: 10000, approvedProofs: 8000 }
    ],
    curveS: [
      { month: 'Jan', plannedPhysical: 10, actualPhysical: 10, plannedFinancial: 15, actualFinancial: 14 },
      { month: 'Fev', plannedPhysical: 20, actualPhysical: 20, plannedFinancial: 28, actualFinancial: 26 },
      { month: 'Mar', plannedPhysical: 40, actualPhysical: 40, plannedFinancial: 44, actualFinancial: 43 },
      { month: 'Abr', plannedPhysical: 50, actualPhysical: 50, plannedFinancial: 56, actualFinancial: 55 },
      { month: 'Mai', plannedPhysical: 60, actualPhysical: 60, plannedFinancial: 65, actualFinancial: 63 },
      { month: 'Jun', plannedPhysical: 70, actualPhysical: 70, plannedFinancial: 72, actualFinancial: 70 },
      { month: 'Jul', plannedPhysical: 85, actualPhysical: null, plannedFinancial: 88, actualFinancial: null },
      { month: 'Ago', plannedPhysical: 100, actualPhysical: null, plannedFinancial: 100, actualFinancial: null }
    ],
    impactMetrics: [
      {
        id: 'imp-101-1',
        level: 'Entrega',
        indicator: 'Polos equipados e em operação',
        unit: 'polos',
        baseline: 0,
        target: 5,
        actual: 4,
        verificationSource: 'Termo de vistoria e tombamento'
      },
      {
        id: 'imp-101-2',
        level: 'Resultado',
        indicator: 'Moradores utilizando os laboratórios mensalmente',
        unit: 'pessoas',
        baseline: 0,
        target: 300,
        actual: 215,
        verificationSource: 'Cadastro ativo de acesso nos polos'
      }
    ],
    beneficiariesTarget: 300,
    beneficiariesActual: 215,
    beneficiaryUnit: 'moradores',
    risks: [
      {
        id: 'r-101-1',
        description: 'Atraso da operadora local na instalação de fibra do Polo Norte',
        impact: 'Médio',
        mitigation: 'Acionar fornecedor secundário de internet via rádio caso passe de 10/07'
      }
    ]
  },
  {
    id: 'prog-102',
    code: 'PRG-02',
    shortName: 'Trilha Jovem Dev',
    name: 'Trilha Jovem Dev e Análise de Dados',
    strategicAxis: 'Qualificação e Empregabilidade',
    manager: 'Juliana Duarte',
    funder: 'Instituto Futuro Presente',
    operationalHeadline: 'Atraso em turmas presenciais · contenção de horas-aula',
    startDate: '01/02/2026',
    endDate: '30/09/2026',
    plannedPhysical: 60,
    plannedFinancial: 60,
    cutoffMonth: 'Jun',
    deliverables: [
      {
        id: 'del-102-1',
        name: 'Ementa técnica (360h) e material prático das aulas',
        deadline: '28/02/2026',
        deadlineISO: '2026-02-28',
        status: 'done'
      },
      {
        id: 'del-102-2',
        name: 'Formação dos 12 instrutores e monitores locais',
        deadline: '30/04/2026',
        deadlineISO: '2026-04-30',
        status: 'in_progress'
      },
      {
        id: 'del-102-3',
        name: 'Ciclo de aulas presenciais — Turmas 1 e 2 (60 vagas)',
        deadline: '15/06/2026',
        deadlineISO: '2026-06-15',
        status: 'in_progress'
      },
      {
        id: 'del-102-4',
        name: 'Ciclo de aulas presenciais — Turmas 3 e 4 (60 vagas)',
        deadline: '15/08/2026',
        deadlineISO: '2026-08-15',
        status: 'pending'
      },
      {
        id: 'del-102-5',
        name: 'Mostra de projetos e encaminhamento profissional',
        deadline: '30/09/2026',
        deadlineISO: '2026-09-30',
        status: 'pending'
      }
    ],
    budgetBreakdown: [
      { id: 'rub-102-1', category: 'Hora-aula de Instrutores e Mentoria', budgeted: 120000, executed: 110000, approvedProofs: 95000 },
      { id: 'rub-102-2', category: 'Bolsas-auxílio e Transporte', budgeted: 80000, executed: 78000, approvedProofs: 65000 },
      { id: 'rub-102-3', category: 'Licenças e Ambiente em Nuvem', budgeted: 50000, executed: 35000, approvedProofs: 35000 },
      { id: 'rub-102-4', category: 'Coordenação Pedagógica', budgeted: 30000, executed: 15000, approvedProofs: 15000 }
    ],
    curveS: [
      { month: 'Fev', plannedPhysical: 20, actualPhysical: 20, plannedFinancial: 15, actualFinancial: 20 },
      { month: 'Mar', plannedPhysical: 30, actualPhysical: 25, plannedFinancial: 30, actualFinancial: 42 },
      { month: 'Abr', plannedPhysical: 40, actualPhysical: 30, plannedFinancial: 42, actualFinancial: 60 },
      { month: 'Mai', plannedPhysical: 50, actualPhysical: 35, plannedFinancial: 50, actualFinancial: 75 },
      { month: 'Jun', plannedPhysical: 60, actualPhysical: 40, plannedFinancial: 60, actualFinancial: 85 },
      { month: 'Jul', plannedPhysical: 75, actualPhysical: null, plannedFinancial: 75, actualFinancial: null },
      { month: 'Ago', plannedPhysical: 90, actualPhysical: null, plannedFinancial: 90, actualFinancial: null },
      { month: 'Set', plannedPhysical: 100, actualPhysical: null, plannedFinancial: 100, actualFinancial: null }
    ],
    impactMetrics: [
      {
        id: 'imp-102-1',
        level: 'Entrega',
        indicator: 'Jovens formados com frequência mínima de 75%',
        unit: 'jovens',
        baseline: 0,
        target: 120,
        actual: 32,
        verificationSource: 'Diários de classe e certificados'
      },
      {
        id: 'imp-102-2',
        level: 'Resultado',
        indicator: 'Formados empregados ou estagiando em até 6 meses',
        unit: '%',
        baseline: 0,
        target: 65,
        actual: 22,
        verificationSource: 'Pesquisa trimestral com egressos'
      }
    ],
    beneficiariesTarget: 120,
    beneficiariesActual: 48,
    beneficiaryUnit: 'jovens',
    risks: [
      {
        id: 'r-102-1',
        description: 'Saldo curto de hora-aula (restam R$ 42 mil para concluir metade das turmas)',
        impact: 'Alto',
        mitigation: 'Unificar aulas teóricas das Turmas 3 e 4 e bloquear adiantamentos sem nota fiscal'
      }
    ]
  },
  {
    id: 'prog-103',
    code: 'PRG-03',
    shortName: 'Negócios ESG',
    name: 'Aceleração de Pequenos Negócios em Práticas ESG',
    strategicAxis: 'Empreendedorismo Sustentável',
    manager: 'Marina Alencar',
    funder: 'Aliança Empresarial Regional',
    operationalHeadline: 'Oficinas em andamento · reserva de espaço paga',
    startDate: '05/02/2026',
    endDate: '30/10/2026',
    plannedPhysical: 60,
    plannedFinancial: 58,
    cutoffMonth: 'Jun',
    deliverables: [
      {
        id: 'del-103-1',
        name: 'Edital e seleção dos 30 pequenos negócios',
        deadline: '15/03/2026',
        deadlineISO: '2026-03-15',
        status: 'done'
      },
      {
        id: 'del-103-2',
        name: 'Diagnóstico ambiental individual das 30 empresas',
        deadline: '30/04/2026',
        deadlineISO: '2026-04-30',
        status: 'done'
      },
      {
        id: 'del-103-3',
        name: 'Oficinas coletivas de energia e gestão de resíduos',
        deadline: '10/07/2026',
        deadlineISO: '2026-07-10',
        status: 'in_progress'
      },
      {
        id: 'del-103-4',
        name: 'Consultorias técnicas de adequação nos negócios',
        deadline: '31/08/2026',
        deadlineISO: '2026-08-31',
        status: 'in_progress'
      },
      {
        id: 'del-103-5',
        name: 'Rodada comercial com empresas âncoras da região',
        deadline: '15/10/2026',
        deadlineISO: '2026-10-15',
        status: 'pending'
      }
    ],
    budgetBreakdown: [
      { id: 'rub-103-1', category: 'Consultorias Técnicas em Gestão e ESG', budgeted: 110000, executed: 77000, approvedProofs: 71000 },
      { id: 'rub-103-2', category: 'Apoio para Adequações Ambientais', budgeted: 70000, executed: 45000, approvedProofs: 45000 },
      { id: 'rub-103-3', category: 'Oficinas e Rodada de Negócios', budgeted: 40000, executed: 28000, approvedProofs: 25000 }
    ],
    curveS: [
      { month: 'Fev', plannedPhysical: 10, actualPhysical: 10, plannedFinancial: 12, actualFinancial: 15 },
      { month: 'Mar', plannedPhysical: 25, actualPhysical: 25, plannedFinancial: 26, actualFinancial: 30 },
      { month: 'Abr', plannedPhysical: 40, actualPhysical: 40, plannedFinancial: 38, actualFinancial: 45 },
      { month: 'Mai', plannedPhysical: 50, actualPhysical: 50, plannedFinancial: 48, actualFinancial: 57 },
      { month: 'Jun', plannedPhysical: 60, actualPhysical: 60, plannedFinancial: 58, actualFinancial: 68.2 },
      { month: 'Jul', plannedPhysical: 75, actualPhysical: null, plannedFinancial: 72, actualFinancial: null },
      { month: 'Ago', plannedPhysical: 85, actualPhysical: null, plannedFinancial: 84, actualFinancial: null },
      { month: 'Set', plannedPhysical: 95, actualPhysical: null, plannedFinancial: 94, actualFinancial: null },
      { month: 'Out', plannedPhysical: 100, actualPhysical: null, plannedFinancial: 100, actualFinancial: null }
    ],
    impactMetrics: [
      {
        id: 'imp-103-1',
        level: 'Entrega',
        indicator: 'Pequenos negócios com plano ambiental implantado',
        unit: 'empresas',
        baseline: 0,
        target: 30,
        actual: 18,
        verificationSource: 'Relatório técnico assinado pela empresa'
      },
      {
        id: 'imp-103-2',
        level: 'Resultado',
        indicator: 'Redução média em energia ou descarte em aterro',
        unit: '%',
        baseline: 0,
        target: 18,
        actual: 11,
        verificationSource: 'Faturas de energia e manifesto de resíduos'
      }
    ],
    beneficiariesTarget: 30,
    beneficiariesActual: 30,
    beneficiaryUnit: 'empresas',
    risks: [
      {
        id: 'r-103-1',
        description: 'Sinal de reserva do espaço da Rodada elevou o gasto antes da realização do evento',
        impact: 'Baixo',
        mitigation: 'Concluir ciclo de consultorias em agosto para equilibrar entrega e desembolso'
      }
    ]
  },
  {
    id: 'prog-104',
    code: 'PRG-04',
    shortName: 'Economia Circular',
    name: 'Economia Circular e Cooperativas de Triagem',
    strategicAxis: 'Reciclagem e Geração de Renda',
    manager: 'Roberto Tavares',
    funder: 'Convênio Municipal de Desenvolvimento',
    operationalHeadline: 'Coleta ativa · liberação de balança aguarda certidão',
    startDate: '15/01/2026',
    endDate: '31/08/2026',
    plannedPhysical: 75,
    plannedFinancial: 72,
    cutoffMonth: 'Jun',
    deliverables: [
      {
        id: 'del-104-1',
        name: 'Reforma dos galpões e entrega de EPIs (2 cooperativas)',
        deadline: '15/03/2026',
        deadlineISO: '2026-03-15',
        status: 'done'
      },
      {
        id: 'del-104-2',
        name: 'Instalação das prensas hidráulicas e balanças digitais',
        deadline: '15/05/2026',
        deadlineISO: '2026-05-15',
        status: 'done'
      },
      {
        id: 'del-104-3',
        name: 'Ativação da rota de coleta seletiva em 40 empresas',
        deadline: '28/06/2026',
        deadlineISO: '2026-06-28',
        status: 'done'
      },
      {
        id: 'del-104-4',
        name: 'Controle digital de pesagem e divisão mensal de receitas',
        deadline: '20/08/2026',
        deadlineISO: '2026-08-20',
        status: 'pending'
      }
    ],
    budgetBreakdown: [
      { id: 'rub-104-1', category: 'Prensas, Balanças e EPIs', budgeted: 75000, executed: 55000, approvedProofs: 55000 },
      { id: 'rub-104-2', category: 'Logística de Coleta e Educação Ambiental', budgeted: 50000, executed: 25000, approvedProofs: 25000 },
      { id: 'rub-104-3', category: 'Apoio Contábil e Regularização', budgeted: 25000, executed: 10000, approvedProofs: 10000 }
    ],
    curveS: [
      { month: 'Jan', plannedPhysical: 10, actualPhysical: 10, plannedFinancial: 10, actualFinancial: 10 },
      { month: 'Fev', plannedPhysical: 25, actualPhysical: 25, plannedFinancial: 24, actualFinancial: 22 },
      { month: 'Mar', plannedPhysical: 40, actualPhysical: 40, plannedFinancial: 42, actualFinancial: 38 },
      { month: 'Abr', plannedPhysical: 50, actualPhysical: 50, plannedFinancial: 54, actualFinancial: 46 },
      { month: 'Mai', plannedPhysical: 65, actualPhysical: 65, plannedFinancial: 64, actualFinancial: 53 },
      { month: 'Jun', plannedPhysical: 75, actualPhysical: 75, plannedFinancial: 72, actualFinancial: 60 },
      { month: 'Jul', plannedPhysical: 90, actualPhysical: null, plannedFinancial: 88, actualFinancial: null },
      { month: 'Ago', plannedPhysical: 100, actualPhysical: null, plannedFinancial: 100, actualFinancial: null }
    ],
    impactMetrics: [
      {
        id: 'imp-104-1',
        level: 'Entrega',
        indicator: 'Volume mensal de recicláveis vendidos sem atravessador',
        unit: 't/mês',
        baseline: 12,
        target: 45,
        actual: 36,
        verificationSource: 'Notas de pesagem e certificados de destinação'
      },
      {
        id: 'imp-104-2',
        level: 'Resultado',
        indicator: 'Renda média mensal por cooperado (42 cooperados)',
        unit: 'R$',
        baseline: 1350,
        target: 1950,
        actual: 1780,
        verificationSource: 'Folha mensal de rateio das cooperativas'
      }
    ],
    beneficiariesTarget: 42,
    beneficiariesActual: 42,
    beneficiaryUnit: 'cooperados',
    risks: [
      {
        id: 'r-104-1',
        description: 'Pagamento de R$ 18 mil da segunda balança retido por certidão vencida do fornecedor',
        impact: 'Médio',
        mitigation: 'Notificar fornecedor para regularizar certidão fiscal até 10/07'
      }
    ]
  }
];

export const INITIAL_FOLLOW_UPS = [
  {
    id: 'chk-102',
    projectId: 'prog-102',
    projectName: 'Trilha Jovem Dev e Análise de Dados',
    date: '26/06/2026',
    responsible: 'Thayâne Carvalho',
    frequency: 'Semanal',
    items: [
      {
        id: 'i-102-1',
        title: 'Revisar consumo de hora-aula e travar novos adiantamentos',
        checked: true,
        responsible: 'Thayâne Carvalho',
        deadline: '26/06/2026',
        note: '85% da verba já consumida; novos adiantamentos suspensos até avanço das turmas.'
      },
      {
        id: 'i-102-2',
        title: 'Cobrar R$ 28.000 em recibos e notas pendentes de maio',
        checked: false,
        responsible: 'Juliana Duarte',
        deadline: '05/07/2026',
        note: 'Faltam 14 recibos de auxílio-transporte e 2 notas de mentoria.'
      },
      {
        id: 'i-102-3',
        title: 'Concluir formação dos 7 instrutores restantes (atrasada desde 30/04)',
        checked: false,
        responsible: 'Rafael Nunes',
        deadline: '12/07/2026',
        note: 'Banca prática reagendada para os dois primeiros sábados de julho.'
      }
    ],
    actionPlans: [
      {
        id: 'act-102-1',
        originGap: 'Orçamento',
        what: 'Unificar aulas teóricas das Turmas 3 e 4 em encontros conjuntos',
        who: 'Juliana Duarte',
        when: '2026-07-15',
        how: 'Reduzir custo restante de hora-aula para caber no saldo de R$ 42 mil sem cortar bolsas.',
        status: 'Em Andamento'
      },
      {
        id: 'act-102-2',
        originGap: 'Notas Fiscais',
        what: 'Condicionar liberação do próximo lote de bolsas à entrega dos recibos anteriores',
        who: 'Camila Borges',
        when: '2026-07-05',
        how: 'Conferência quinzenal pela secretaria antes do envio para pagamento.',
        status: 'Pendente'
      }
    ]
  },
  {
    id: 'chk-101',
    projectId: 'prog-101',
    projectName: 'Laboratórios Comunitários de Inclusão Digital',
    date: '24/06/2026',
    responsible: 'Thayâne Carvalho',
    frequency: 'Quinzenal',
    items: [
      {
        id: 'i-101-1',
        title: 'Conferir tombamento dos 80 computadores instalados nos Polos 1 a 4',
        checked: true,
        responsible: 'Carlos Mendonça',
        deadline: '24/06/2026',
        note: 'Notas fiscais e números de série validados.'
      },
      {
        id: 'i-101-2',
        title: 'Confirmar entrega dos últimos 20 computadores no Polo Norte',
        checked: true,
        responsible: 'Carlos Mendonça',
        deadline: '30/06/2026',
        note: 'Entrega agendada com a transportadora para 02/07.'
      },
      {
        id: 'i-101-3',
        title: 'Baixar R$ 7.000 de comprovantes pendentes (reforma e seguro)',
        checked: false,
        responsible: 'Patrícia Lima',
        deadline: '08/07/2026',
        note: 'Aguardando comprovante quitado da seguradora.'
      }
    ],
    actionPlans: [
      {
        id: 'act-101-1',
        originGap: 'Cronograma',
        what: 'Deixar pré-aprovado link de internet via rádio para o Polo Norte',
        who: 'Carlos Mendonça',
        when: '2026-07-10',
        how: 'Acionar fornecedor local caso a operadora de fibra não instale até dia 10/07.',
        status: 'Concluída'
      }
    ]
  },
  {
    id: 'chk-103',
    projectId: 'prog-103',
    projectName: 'Aceleração de Pequenos Negócios em Práticas ESG',
    date: '25/06/2026',
    responsible: 'Thayâne Carvalho',
    frequency: 'Quinzenal',
    items: [
      {
        id: 'i-103-1',
        title: 'Validar planos ambientais assinados pelas primeiras 18 empresas',
        checked: true,
        responsible: 'Marina Alencar',
        deadline: '25/06/2026',
        note: 'Documentação arquivada na pasta do programa.'
      },
      {
        id: 'i-103-2',
        title: 'Recolher notas fiscais de R$ 9.000 referentes à consultoria e espaço',
        checked: false,
        responsible: 'Marina Alencar',
        deadline: '10/07/2026',
        note: 'Emissão prevista no fechamento mensal da consultoria.'
      }
    ],
    actionPlans: []
  },
  {
    id: 'chk-104',
    projectId: 'prog-104',
    projectName: 'Economia Circular e Cooperativas de Triagem',
    date: '23/06/2026',
    responsible: 'Thayâne Carvalho',
    frequency: 'Quinzenal',
    items: [
      {
        id: 'i-104-1',
        title: 'Conferir volume coletado nas 30 empresas já ativas na rota',
        checked: true,
        responsible: 'Roberto Tavares',
        deadline: '23/06/2026',
        note: '36 toneladas comercializadas em junho.'
      },
      {
        id: 'i-104-2',
        title: 'Destravar pagamento da balança digital retido por certidão vencida',
        checked: false,
        responsible: 'Roberto Tavares',
        deadline: '10/07/2026',
        note: 'Equipamento já entregue em campo; pagamento de R$ 18 mil aguarda CND renovada.'
      }
    ],
    actionPlans: [
      {
        id: 'act-104-1',
        originGap: 'Fornecedor',
        what: 'Notificar fornecedor da balança para envio de certidão negativa atualizada',
        who: 'Roberto Tavares',
        when: '2026-07-10',
        how: 'Prazo de 5 dias úteis para regularização e baixa do pagamento de R$ 18.000.',
        status: 'Em Andamento'
      }
    ]
  }
];

export const INITIAL_EVIDENCES = [
  {
    id: 'ev-1',
    projectId: 'prog-101',
    category: 'Financeiro',
    title: 'Notas fiscais e termo de tombamento — 80 computadores (Polos 1 a 4)',
    referenceCode: 'NF #4180-09',
    date: '18/06/2026',
    responsible: 'Carlos Mendonça'
  },
  {
    id: 'ev-2',
    projectId: 'prog-101',
    category: 'Engenharia',
    title: 'ART e relatório fotográfico da adequação elétrica dos 5 polos',
    referenceCode: 'ART #884120',
    date: '02/04/2026',
    responsible: 'Carlos Mendonça'
  },
  {
    id: 'ev-3',
    projectId: 'prog-102',
    category: 'Pedagógico',
    title: 'Diários de frequência e certificados emitidos — Turma 1 (32 alunos)',
    referenceCode: 'ATA #T1-2026',
    date: '15/06/2026',
    responsible: 'Juliana Duarte'
  },
  {
    id: 'ev-4',
    projectId: 'prog-103',
    category: 'Técnico',
    title: 'Planos de eficiência energética e resíduos assinados (18 empresas)',
    referenceCode: 'REL #ESG-18',
    date: '22/06/2026',
    responsible: 'Marina Alencar'
  },
  {
    id: 'ev-5',
    projectId: 'prog-104',
    category: 'Operacional',
    title: 'Certificados de destinação (36 t) e folha de rateio das cooperativas',
    referenceCode: 'MTR #06-2026',
    date: '28/06/2026',
    responsible: 'Roberto Tavares'
  }
];
