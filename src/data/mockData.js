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
    funder: 'Fundo de Inovação e Inclusão Digital',
    operationalHeadline: 'Salas reformadas e mobiliadas; finalizando instalação dos computadores',
    startDate: '10/01/2026',
    endDate: '31/08/2026',
    plannedPhysical: 70,
    plannedFinancial: 72,
    cutoffMonth: 'Jun',
    deliverables: [
      {
        id: 'del-101-1',
        period: 'Jan–Fev/2026',
        name: 'Vistoria técnica e projeto elétrico dos 5 polos',
        deadline: '15/02/2026',
        deadlineISO: '2026-02-15',
        completedAt: '12/02/2026',
        deliverableDoc: 'ART #884120 e plantas elétricas aprovadas',
        fieldNote: 'Quadro de carga dimensionado para 20 computadores por polo.',
        status: 'done'
      },
      {
        id: 'del-101-2',
        period: 'Fev–Mar/2026',
        name: 'Adequação civil, cabeamento interno e mobiliário dos 5 polos',
        deadline: '31/03/2026',
        deadlineISO: '2026-03-31',
        completedAt: '28/03/2026',
        deliverableDoc: 'Termo de entrega civil (NF-e #1904 e #2041)',
        fieldNote: 'Salas pintadas, climatizadas e com pontos de rede instalados.',
        status: 'done'
      },
      {
        id: 'del-101-3',
        period: 'Abr–Mai/2026',
        name: 'Compra, entrega e tombamento dos 100 computadores',
        deadline: '25/05/2026',
        deadlineISO: '2026-05-25',
        completedAt: '22/05/2026',
        deliverableDoc: 'NF-e #4180 e planilha de patrimônio (100 números de série)',
        fieldNote: 'Lote integral recebido e etiquetado nos 5 espaços.',
        status: 'done'
      },
      {
        id: 'del-101-4',
        period: 'Jun–Jul/2026',
        name: 'Montagem das bancadas finais e ativação da internet fibra',
        deadline: '15/07/2026',
        deadlineISO: '2026-07-15',
        completedAt: null,
        deliverableDoc: 'Laudo de conectividade e aceite dos 5 laboratórios',
        fieldNote: '4 dos 5 polos já conectados e em operação; 5º polo (Polo Norte) em conclusão até 15/07.',
        status: 'in_progress'
      },
      {
        id: 'del-101-5',
        period: 'Jul–Ago/2026',
        name: 'Capacitação dos monitores locais e abertura plena das turmas',
        deadline: '25/08/2026',
        deadlineISO: '2026-08-25',
        completedAt: null,
        deliverableDoc: 'Lista de presença dos monitores e grade horária publicada',
        fieldNote: 'Seleção dos monitores concluída; treinamento inicia após ativação do 5º polo.',
        status: 'pending'
      }
    ],
    budgetBreakdown: [
      {
        id: 'rub-101-1',
        category: 'Adequação Civil e Mobiliário',
        budgeted: 180000,
        expenses: [
          {
            id: 'exp-101-1a',
            date: '18/02/2026',
            supplier: 'MestreObra Engenharia Ltda',
            description: 'Adequação elétrica, iluminação e pintura dos Polos 1 a 3',
            docRef: 'NF-e #1904',
            amount: 85000,
            status: 'approved'
          },
          {
            id: 'exp-101-1b',
            date: '27/03/2026',
            supplier: 'MestreObra Engenharia Ltda',
            description: 'Reforma civil e bancadas sob medida dos Polos 4 e 5',
            docRef: 'NF-e #2041',
            amount: 55000,
            status: 'approved'
          },
          {
            id: 'exp-101-1c',
            date: '19/06/2026',
            supplier: 'Marcenaria Sul Projetos',
            description: 'Parcela final de montagem das bancadas do Polo Norte',
            docRef: 'PIX #8821 · aguarda NF-e',
            amount: 5000,
            status: 'pending_proof'
          }
        ]
      },
      {
        id: 'rub-101-2',
        category: 'Equipamentos de Informática e Rede',
        budgeted: 190000,
        expenses: [
          {
            id: 'exp-101-2a',
            date: '12/05/2026',
            supplier: 'TecnoRede Distribuidora S.A.',
            description: 'Aquisição dos 100 computadores desktop e monitores LED',
            docRef: 'NF-e #4180',
            amount: 115000,
            status: 'approved'
          },
          {
            id: 'exp-101-2b',
            date: '24/05/2026',
            supplier: 'ConectaFibra Suprimentos',
            description: 'Switches gerenciáveis, roteadores Wi-Fi e nobreaks',
            docRef: 'NF-e #0912',
            amount: 20000,
            status: 'approved'
          }
        ]
      },
      {
        id: 'rub-101-3',
        category: 'Equipe Técnica de Implantação',
        budgeted: 50000,
        expenses: [
          {
            id: 'exp-101-3a',
            date: '05/04/2026',
            supplier: 'Ricardo Prado Engenharia · ME',
            description: 'Coordenação técnica de obras e laudos elétricos (Jan–Mar)',
            docRef: 'NFS-e #0311',
            amount: 12500,
            status: 'approved'
          },
          {
            id: 'exp-101-3b',
            date: '05/06/2026',
            supplier: 'Ricardo Prado Engenharia · ME',
            description: 'Configuração dos computadores e rede lógica (Abr–Mai)',
            docRef: 'NFS-e #0389',
            amount: 12500,
            status: 'approved'
          }
        ]
      },
      {
        id: 'rub-101-4',
        category: 'Logística e Seguro Patrimonial',
        budgeted: 30000,
        expenses: [
          {
            id: 'exp-101-4a',
            date: '22/05/2026',
            supplier: 'TransRápido Cargas Urbanas',
            description: 'Frete dedicado com seguro de transporte para os 5 polos',
            docRef: 'CT-e #7740',
            amount: 8000,
            status: 'approved'
          },
          {
            id: 'exp-101-4b',
            date: '24/06/2026',
            supplier: 'SeguraMais Corretora Patrimonial',
            description: 'Endosso da apólice anual contra furto para o Polo Norte',
            docRef: 'Boleto #4410 · aguarda apólice/NF',
            amount: 2000,
            status: 'pending_proof'
          }
        ]
      }
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
        indicator: 'Laboratórios equipados e abertos à comunidade',
        unit: 'polos',
        baseline: 0,
        target: 5,
        actual: 4,
        verificationSource: 'Termo de vistoria e registro patrimonial dos equipamentos'
      },
      {
        id: 'imp-101-2',
        level: 'Resultado',
        syncsBeneficiaries: true,
        indicator: 'Moradores utilizando os laboratórios mensalmente',
        unit: 'pessoas',
        baseline: 0,
        target: 300,
        actual: 215,
        verificationSource: 'Controle mensal de acesso e frequência nos polos'
      }
    ],
    beneficiariesTarget: 300,
    beneficiariesActual: 215,
    beneficiaryUnit: 'moradores',
    risks: [
      {
        id: 'r-101-1',
        description: 'Atraso da operadora local na ativação de fibra óptica do Polo Norte comprometer abertura final',
        impact: 'Médio',
        mitigation: 'Acionar link secundário via rádio já pré-aprovado caso a fibra passe de 10/07'
      }
    ]
  },
  {
    id: 'prog-102',
    code: 'PRG-02',
    shortName: 'Hortas Urbanas',
    name: 'Hortas Urbanas e Agricultura Sustentável',
    strategicAxis: 'Agricultura Urbana e Sustentabilidade',
    manager: 'Juliana Duarte',
    funder: 'Instituto Futuro Presente',
    operationalHeadline: 'Canteiros iniciais ativos; expansão das hortas em revisão orçamentária',
    startDate: '01/02/2026',
    endDate: '30/09/2026',
    plannedPhysical: 60,
    plannedFinancial: 60,
    cutoffMonth: 'Jun',
    deliverables: [
      {
        id: 'del-102-1',
        period: 'Fev/2026',
        name: 'Análise de solo, limpeza e cercamento dos 6 terrenos',
        deadline: '28/02/2026',
        deadlineISO: '2026-02-28',
        completedAt: '26/02/2026',
        deliverableDoc: 'Laudo agronômico LAUDO #SOLO-06 e NF-e #1120',
        fieldNote: 'Todos os 6 terrenos delimitados e cercados com tela galvanizada.',
        status: 'done'
      },
      {
        id: 'del-102-2',
        period: 'Mar–Abr/2026',
        name: 'Instalação da rede de irrigação e pontos de água nos 6 terrenos',
        deadline: '30/04/2026',
        deadlineISO: '2026-04-30',
        completedAt: null,
        deliverableDoc: 'Termo de medição hidráulica por terreno',
        fieldNote: '3 de 6 terrenos concluídos; os outros 3 atrasaram por sobrecusto em conexões e hidrômetros.',
        status: 'in_progress'
      },
      {
        id: 'del-102-3',
        period: 'Mai–Jun/2026',
        name: 'Preparo dos canteiros, adubagem orgânica e plantio inicial',
        deadline: '15/06/2026',
        deadlineISO: '2026-06-15',
        completedAt: null,
        deliverableDoc: 'Registro fotográfico e recibo de distribuição de mudas',
        fieldNote: '3 hortas já em produção (48 famílias); expansão para os outros 3 terrenos aguarda revisão de verba.',
        status: 'in_progress'
      },
      {
        id: 'del-102-4',
        period: 'Jul–Ago/2026',
        name: 'Montagem das estufas de mudas e pátios de compostagem',
        deadline: '15/08/2026',
        deadlineISO: '2026-08-15',
        completedAt: null,
        deliverableDoc: 'Termo de aceite de estrutura e nota fiscal de montagem',
        fieldNote: 'Cotação unificada em renegociação para caber no saldo restante do projeto.',
        status: 'pending'
      },
      {
        id: 'del-102-5',
        period: 'Ago–Set/2026',
        name: 'Oficinas de cultivo orgânico e manejo para as 120 famílias',
        deadline: '30/09/2026',
        deadlineISO: '2026-09-30',
        completedAt: null,
        deliverableDoc: 'Listas de presença assinadas e certificados de participação',
        fieldNote: 'Cronograma pedagógico pronto para início após entrega dos novos canteiros.',
        status: 'pending'
      }
    ],
    budgetBreakdown: [
      {
        id: 'rub-102-1',
        category: 'Preparo do Solo, Adubo e Cercamento',
        budgeted: 120000,
        expenses: [
          {
            id: 'exp-102-1a',
            date: '25/02/2026',
            supplier: 'AgroSolo Terraplenagem e Cercas',
            description: 'Limpeza mecanizada e cercamento completo dos 6 terrenos',
            docRef: 'NF-e #1120',
            amount: 58000,
            status: 'approved'
          },
          {
            id: 'exp-102-1b',
            date: '18/04/2026',
            supplier: 'BioHumus Composto Orgânico Ltda',
            description: 'Fornecimento de 40 t de terra vegetal, composto e calcário',
            docRef: 'NF-e #0542',
            amount: 37000,
            status: 'approved'
          },
          {
            id: 'exp-102-1c',
            date: '22/05/2026',
            supplier: 'Cooperativa de Transporte Rural Sul',
            description: 'Adiantamento de fretes de terra e adubo entre os terrenos',
            docRef: 'TED #5591 · faltam recibos fiscais',
            amount: 15000,
            status: 'pending_proof'
          }
        ]
      },
      {
        id: 'rub-102-2',
        category: 'Sistema de Irrigação e Estufas',
        budgeted: 80000,
        expenses: [
          {
            id: 'exp-102-2a',
            date: '28/03/2026',
            supplier: 'HidroCampo Irrigação Ltda',
            description: 'Reservatórios, bombas e linhas de gotejamento (Terrenos 1 a 3)',
            docRef: 'NF-e #3310',
            amount: 65000,
            status: 'approved'
          },
          {
            id: 'exp-102-2b',
            date: '29/05/2026',
            supplier: 'HidroCampo Irrigação Ltda',
            description: 'Adiantamento para registros, valas e conexões extras de rede',
            docRef: 'PIX #9104 · aguarda NF de medição',
            amount: 13000,
            status: 'pending_proof'
          }
        ]
      },
      {
        id: 'rub-102-3',
        category: 'Mudas Orgânicas e Ferramentas',
        budgeted: 50000,
        expenses: [
          {
            id: 'exp-102-3a',
            date: '04/05/2026',
            supplier: 'Viveiro VerdeVida Orgânicos',
            description: '1º lote de mudas certificadas, sementes e kits de ferramentas',
            docRef: 'NF-e #0887',
            amount: 35000,
            status: 'approved'
          }
        ]
      },
      {
        id: 'rub-102-4',
        category: 'Oficinas Técnicas e Mobilização',
        budgeted: 30000,
        expenses: [
          {
            id: 'exp-102-4a',
            date: '10/06/2026',
            supplier: 'Raízes Assessoria Agronômica S/S',
            description: 'Assistência técnica de plantio inicial e mobilização das famílias',
            docRef: 'NFS-e #0214',
            amount: 15000,
            status: 'approved'
          }
        ]
      }
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
        indicator: 'Hortas comunitárias implantadas e em produção',
        unit: 'hortas',
        baseline: 0,
        target: 6,
        actual: 3,
        verificationSource: 'Termo de implantação e registro fotográfico de campo'
      },
      {
        id: 'imp-102-2',
        level: 'Resultado',
        syncsBeneficiaries: true,
        indicator: 'Famílias colhendo alimentos orgânicos regularmente',
        unit: 'famílias',
        baseline: 0,
        target: 120,
        actual: 48,
        verificationSource: 'Cadastro das famílias e listas de retirada semanal'
      }
    ],
    beneficiariesTarget: 120,
    beneficiariesActual: 48,
    beneficiaryUnit: 'famílias',
    risks: [
      {
        id: 'r-102-1',
        description: 'Demora na aprovação do remanejamento entre rubricas paralisar o plantio de julho nos 3 terrenos restantes',
        impact: 'Alto',
        mitigation: 'Protocolar pedido formal ao financiador até 08/07 priorizando irrigação antes das estufas'
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
        period: 'Fev–Mar/2026',
        name: 'Edital público e seleção dos 30 pequenos negócios',
        deadline: '15/03/2026',
        deadlineISO: '2026-03-15',
        completedAt: '13/03/2026',
        deliverableDoc: 'Ata da comissão avaliadora e 30 termos de adesão',
        fieldNote: 'Comércios, padarias e pequenas oficinas selecionados na região.',
        status: 'done'
      },
      {
        id: 'del-103-2',
        period: 'Mar–Abr/2026',
        name: 'Diagnóstico ambiental individual das 30 empresas',
        deadline: '30/04/2026',
        deadlineISO: '2026-04-30',
        completedAt: '28/04/2026',
        deliverableDoc: '30 diagnósticos de consumo de água, energia e resíduos (NFS-e #0412)',
        fieldNote: 'Metas individuais de redução pactuadas com cada proprietário.',
        status: 'done'
      },
      {
        id: 'del-103-3',
        period: 'Mai–Jul/2026',
        name: 'Oficinas coletivas de eficiência energética e gestão de resíduos',
        deadline: '10/07/2026',
        deadlineISO: '2026-07-10',
        completedAt: null,
        deliverableDoc: 'Listas de presença e cadernos práticos aplicados',
        fieldNote: '3 de 4 encontros realizados; oficina de encerramento confirmada para 08/07.',
        status: 'in_progress'
      },
      {
        id: 'del-103-4',
        period: 'Mai–Ago/2026',
        name: 'Consultorias presenciais de adequação ambiental nos negócios',
        deadline: '31/08/2026',
        deadlineISO: '2026-08-31',
        completedAt: null,
        deliverableDoc: 'Relatórios técnicos assinados (REL #ESG-18)',
        fieldNote: '18 empresas já implantaram melhorias; 12 seguem em visitas técnicas.',
        status: 'in_progress'
      },
      {
        id: 'del-103-5',
        period: 'Set–Out/2026',
        name: 'Rodada comercial com empresas compradoras da região',
        deadline: '15/10/2026',
        deadlineISO: '2026-10-15',
        completedAt: null,
        deliverableDoc: 'Catálogo de fornecedores locais e registro de negócios gerados',
        fieldNote: 'Auditório já reservado mediante pagamento de sinal contratual.',
        status: 'pending'
      }
    ],
    budgetBreakdown: [
      {
        id: 'rub-103-1',
        category: 'Consultorias Técnicas em Gestão e ESG',
        budgeted: 110000,
        expenses: [
          {
            id: 'exp-103-1a',
            date: '29/04/2026',
            supplier: 'Ciclo Limpo Consultoria Ambiental',
            description: 'Diagnósticos presenciais nas 30 empresas participantes',
            docRef: 'NFS-e #0412',
            amount: 45000,
            status: 'approved'
          },
          {
            id: 'exp-103-1b',
            date: '02/06/2026',
            supplier: 'Ciclo Limpo Consultoria Ambiental',
            description: 'Horas técnicas de implantação no 1º grupo (18 empresas)',
            docRef: 'NFS-e #0468',
            amount: 26000,
            status: 'approved'
          },
          {
            id: 'exp-103-1c',
            date: '26/06/2026',
            supplier: 'Ciclo Limpo Consultoria Ambiental',
            description: 'Adiantamento de visitas técnicas da 2ª quinzena de junho',
            docRef: 'TED #6320 · aguarda NFS-e mensal',
            amount: 6000,
            status: 'pending_proof'
          }
        ]
      },
      {
        id: 'rub-103-2',
        category: 'Apoio para Adequações Ambientais',
        budgeted: 70000,
        expenses: [
          {
            id: 'exp-103-2a',
            date: '20/05/2026',
            supplier: 'EcoLuz Eficiência & Coleta Ltda',
            description: 'Kits de iluminação LED, arejadores e coletores seletivos (18 negócios)',
            docRef: 'NF-e #2290',
            amount: 45000,
            status: 'approved'
          }
        ]
      },
      {
        id: 'rub-103-3',
        category: 'Oficinas e Rodada de Negócios',
        budgeted: 40000,
        expenses: [
          {
            id: 'exp-103-3a',
            date: '15/05/2026',
            supplier: 'Espaço Conecta Eventos Ltda',
            description: 'Salas, sonorização e alimentação das 3 primeiras oficinas',
            docRef: 'NFS-e #1105',
            amount: 17000,
            status: 'approved'
          },
          {
            id: 'exp-103-3b',
            date: '12/06/2026',
            supplier: 'Centro de Convenções Serra Azul',
            description: 'Sinal de reserva do auditório para a Rodada Comercial de outubro',
            docRef: 'NFS-e #0890',
            amount: 8000,
            status: 'approved'
          },
          {
            id: 'exp-103-3c',
            date: '25/06/2026',
            supplier: 'Gráfica Expressa Regional',
            description: 'Impressão de guias práticos e crachás da 4ª oficina',
            docRef: 'PIX #7712 · aguarda NF-e',
            amount: 3000,
            status: 'pending_proof'
          }
        ]
      }
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
        verificationSource: 'Relatório técnico assinado pela empresa (REL #ESG-18)'
      },
      {
        id: 'imp-103-2',
        level: 'Resultado',
        indicator: 'Redução média no consumo de energia elétrica (grupo concluído)',
        unit: '%',
        baseline: 0,
        target: 15,
        actual: 9,
        verificationSource: 'Comparativo de faturas de energia antes e após kits LED'
      }
    ],
    beneficiariesTarget: 30,
    beneficiariesActual: 30,
    beneficiaryUnit: 'empresas',
    risks: [
      {
        id: 'r-103-1',
        description: 'Desengajamento das 12 empresas ainda em consultoria comprometer fechamento antes da Rodada de outubro',
        impact: 'Baixo',
        mitigation: 'Manter visitas presenciais quinzenais de apoio técnico até a conclusão do ciclo em agosto'
      }
    ]
  },
  {
    id: 'prog-104',
    code: 'PRG-04',
    shortName: 'Cozinhas Comunitárias',
    name: 'Segurança Alimentar e Cozinhas Comunitárias',
    strategicAxis: 'Segurança Alimentar e Nutrição',
    manager: 'Roberto Tavares',
    funder: 'Convênio Municipal de Desenvolvimento',
    operationalHeadline: '3 cozinhas equipadas; pagamento de fornos aguarda certidão do fornecedor',
    startDate: '15/01/2026',
    endDate: '31/08/2026',
    plannedPhysical: 75,
    plannedFinancial: 72,
    cutoffMonth: 'Jun',
    deliverables: [
      {
        id: 'del-104-1',
        period: 'Jan–Mar/2026',
        name: 'Reforma civil, exaustão e adequação sanitária das 3 cozinhas',
        deadline: '15/03/2026',
        deadlineISO: '2026-03-15',
        completedAt: '12/03/2026',
        deliverableDoc: 'Termo de vistoria civil e laudo de GLP (NF-e #1192)',
        fieldNote: 'Piso lavável, telas milimétricas e exaustores instalados nas 3 unidades.',
        status: 'done'
      },
      {
        id: 'del-104-2',
        period: 'Abr–Mai/2026',
        name: 'Entrega e instalação de fornos industriais, freezers e bancadas inox',
        deadline: '15/05/2026',
        deadlineISO: '2026-05-15',
        completedAt: '14/05/2026',
        deliverableDoc: 'Aceite técnico (NF-e #2844 paga · NF-e #3019 retida por CND)',
        fieldNote: 'Equipamentos instalados e operando; liquidação dos fornos retida até CND fiscal.',
        status: 'done'
      },
      {
        id: 'del-104-3',
        period: 'Mai–Jun/2026',
        name: 'Capacitação sanitária (RDC 216) e operação regular do 1º turno',
        deadline: '28/06/2026',
        deadlineISO: '2026-06-28',
        completedAt: '26/06/2026',
        deliverableDoc: 'Alvará sanitário ALV #COZ-2026 e controle diário de refeições',
        fieldNote: 'Equipes habilitadas; 3.600 refeições/mês servidas regularmente em junho.',
        status: 'done'
      },
      {
        id: 'del-104-4',
        period: 'Jul–Ago/2026',
        name: 'Abertura do turno complementar e avaliação nutricional das famílias',
        deadline: '20/08/2026',
        deadlineISO: '2026-08-20',
        completedAt: null,
        deliverableDoc: 'Relatório nutricional consolidado (meta de 4.500 refeições/mês)',
        fieldNote: 'Início do turno complementar agendado para a segunda quinzena de julho.',
        status: 'pending'
      }
    ],
    budgetBreakdown: [
      {
        id: 'rub-104-1',
        category: 'Fornos, Freezers e Bancadas Inox',
        budgeted: 75000,
        expenses: [
          {
            id: 'exp-104-1a',
            date: '18/04/2026',
            supplier: 'InoxSul Cozinhas Profissionais',
            description: 'Freezers horizontais, fogões industriais e bancadas em aço inox',
            docRef: 'NF-e #2844',
            amount: 55000,
            status: 'approved'
          },
          {
            id: 'exp-104-1b',
            date: '14/05/2026',
            supplier: 'TermoFornos Equipamentos Ltda',
            description: '3 fornos combinados instalados (pagamento retido até renovação de CND municipal)',
            docRef: 'NF-e #3019 · CND pendente',
            amount: 18000,
            status: 'retained'
          }
        ]
      },
      {
        id: 'rub-104-2',
        category: 'Reforma Civil e Instalação de Gás',
        budgeted: 50000,
        expenses: [
          {
            id: 'exp-104-2a',
            date: '10/03/2026',
            supplier: 'Construtora Alvorada Serviços',
            description: 'Adequação de revestimentos, exaustão e central GLP das 3 cozinhas',
            docRef: 'NF-e #1192',
            amount: 25000,
            status: 'approved'
          }
        ]
      },
      {
        id: 'rub-104-3',
        category: 'Capacitação Sanitária e Utensílios',
        budgeted: 25000,
        expenses: [
          {
            id: 'exp-104-3a',
            date: '12/06/2026',
            supplier: 'Instituto Nutrir & Cuidar',
            description: 'Capacitação em boas práticas (RDC 216), EPIs e caixas térmicas',
            docRef: 'NFS-e #0641',
            amount: 10000,
            status: 'approved'
          }
        ]
      }
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
        indicator: 'Refeições balanceadas ofertadas mensalmente',
        unit: 'refeições/mês',
        baseline: 0,
        target: 4500,
        actual: 3600,
        verificationSource: 'Mapa diário de produção e entrega das 3 cozinhas'
      },
      {
        id: 'imp-104-2',
        level: 'Resultado',
        syncsBeneficiaries: true,
        indicator: 'Famílias em vulnerabilidade atendidas com regularidade',
        unit: 'famílias',
        baseline: 0,
        target: 250,
        actual: 210,
        verificationSource: 'Cadastro referenciado (CRAS) e lista de presença'
      }
    ],
    beneficiariesTarget: 250,
    beneficiariesActual: 210,
    beneficiaryUnit: 'famílias',
    risks: [
      {
        id: 'r-104-1',
        description: 'Demora do fornecedor na renovação da CND impedir quitação da NF-e #3019 até o fechamento do convênio',
        impact: 'Médio',
        mitigation: 'Manter bloqueio preventivo na tesouraria e notificar formalmente com prazo até 10/07'
      }
    ]
  }
];

export const INITIAL_FOLLOW_UPS = [
  {
    id: 'chk-102',
    projectId: 'prog-102',
    projectName: 'Hortas Urbanas e Agricultura Sustentável',
    date: '26/06/2026',
    responsible: 'Thayâne Carvalho',
    frequency: 'Semanal',
    items: [
      {
        id: 'i-102-1',
        title: 'Conferir saldo livre por rubrica e travar novos adiantamentos sem NF',
        checked: true,
        responsible: 'Thayâne Carvalho',
        deadline: '26/06/2026',
        note: 'Rubrica de irrigação restou com R$ 2 mil livres; saldo global de R$ 42 mil mapeado.'
      },
      {
        id: 'i-102-2',
        title: 'Validar produção e listas de retirada das 48 famílias nas 3 hortas ativas',
        checked: true,
        responsible: 'Juliana Duarte',
        deadline: '26/06/2026',
        note: 'Cadastro CAD #HORTAS-03 arquivado no dossiê de evidências.'
      },
      {
        id: 'i-102-3',
        title: 'Aprovar cotações unificadas para protocolar pedido de remanejamento',
        checked: false,
        responsible: 'Juliana Duarte',
        deadline: '03/07/2026',
        note: 'Necessário para destravar ligação de água dos 3 terrenos em atraso.'
      }
    ],
    actionPlans: [
      {
        id: 'act-102-1',
        originGap: 'Orçamento',
        what: 'Protocolar pedido de remanejamento de saldo entre rubricas junto ao financiador',
        who: 'Juliana Duarte',
        when: '2026-07-08',
        how: 'Redirecionar folga de mudas e oficinas para concluir irrigação nos 3 terrenos dentro dos R$ 42 mil.',
        status: 'Em Andamento'
      },
      {
        id: 'act-102-2',
        originGap: 'Notas Fiscais',
        what: 'Recolher comprovantes pendentes de R$ 28 mil (TED #5591 e PIX #9104)',
        who: 'Juliana Duarte',
        when: '2026-07-05',
        how: 'Condicionar qualquer novo pagamento ao envio prévio dos recibos e notas fiscais pendentes.',
        status: 'Pendente'
      },
      {
        id: 'act-102-3',
        originGap: 'Cronograma',
        what: 'Concluir pontos de água e irrigação dos terrenos 4 a 6 (atrasado desde 30/04)',
        who: 'Rafael Nunes',
        when: '2026-07-12',
        how: 'Executar frentes em mutirão comunitário imediatamente após autorização do remanejamento.',
        status: 'Em Andamento'
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
        title: 'Conferir tombamento patrimonial dos 100 computadores nos 5 polos',
        checked: true,
        responsible: 'Carlos Mendonça',
        deadline: '24/06/2026',
        note: 'NF-e #4180 e planilha com 100 números de série validados.'
      },
      {
        id: 'i-101-2',
        title: 'Confirmar frequência de acesso nos 4 laboratórios já em funcionamento',
        checked: true,
        responsible: 'Carlos Mendonça',
        deadline: '24/06/2026',
        note: '215 moradores atendidos regularmente no mês de junho.'
      },
      {
        id: 'i-101-3',
        title: 'Monitorar ativação de fibra e montagem final das bancadas no Polo Norte',
        checked: false,
        responsible: 'Carlos Mendonça',
        deadline: '10/07/2026',
        note: 'Dentro do prazo contratual (15/07); contingência via rádio em prontidão.'
      }
    ],
    actionPlans: [
      {
        id: 'act-101-1',
        originGap: 'Cronograma',
        what: 'Manter fornecedor secundário de internet via rádio pré-aprovado para o Polo Norte',
        who: 'Carlos Mendonça',
        when: '2026-07-10',
        how: 'Acionar contingência automaticamente caso a operadora local não instale a fibra até 10/07.',
        status: 'Concluída'
      },
      {
        id: 'act-101-2',
        originGap: 'Notas Fiscais',
        what: 'Baixar R$ 7 mil sem NF (Marcenaria Sul · PIX #8821 e SeguraMais · Boleto #4410)',
        who: 'Patrícia Lima',
        when: '2026-07-08',
        how: 'Conferir emissão da NF-e de montagem e endosso formal da apólice para arquivar no dossiê.',
        status: 'Em Andamento'
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
        title: 'Auditar relatórios e faturas comparativas das primeiras 18 empresas concluídas',
        checked: true,
        responsible: 'Marina Alencar',
        deadline: '25/06/2026',
        note: 'REL #ESG-18 arquivado; redução média aferida de 9% no consumo de energia.'
      },
      {
        id: 'i-103-2',
        title: 'Confirmar reserva de auditório para Rodada Comercial de outubro',
        checked: true,
        responsible: 'Marina Alencar',
        deadline: '25/06/2026',
        note: 'Sinal de R$ 8 mil quitado com NFS-e #0890.'
      },
      {
        id: 'i-103-3',
        title: 'Acompanhar adesão das 12 empresas restantes às visitas presenciais de julho',
        checked: false,
        responsible: 'Marina Alencar',
        deadline: '10/07/2026',
        note: 'Agenda de visitas confirmada para fechamento até agosto.'
      }
    ],
    actionPlans: [
      {
        id: 'act-103-1',
        originGap: 'Notas Fiscais',
        what: 'Recolher notas fiscais de R$ 9 mil pendentes (Ciclo Limpo · TED #6320 e Gráfica · PIX #7712)',
        who: 'Marina Alencar',
        when: '2026-07-10',
        how: 'Validar NFS-e do fechamento mensal da consultoria e NF-e de impressão dos guias.',
        status: 'Em Andamento'
      },
      {
        id: 'act-103-2',
        originGap: 'Cronograma',
        what: 'Concluir implantação dos planos ambientais nas 12 empresas restantes',
        who: 'Marina Alencar',
        when: '2026-08-20',
        how: 'Realizar acompanhamento quinzenal em campo para manter equilíbrio físico-financeiro.',
        status: 'Em Andamento'
      }
    ]
  },
  {
    id: 'chk-104',
    projectId: 'prog-104',
    projectName: 'Segurança Alimentar e Cozinhas Comunitárias',
    date: '23/06/2026',
    responsible: 'Thayâne Carvalho',
    frequency: 'Quinzenal',
    items: [
      {
        id: 'i-104-1',
        title: 'Conferir mapas de produção (3.600 refeições) e alvarás sanitários das 3 cozinhas',
        checked: true,
        responsible: 'Roberto Tavares',
        deadline: '23/06/2026',
        note: 'Boas práticas RDC 216 e atendimento a 210 famílias CRAS regulares em junho.'
      },
      {
        id: 'i-104-2',
        title: 'Manter retenção financeira da NF-e #3019 (R$ 18 mil) até regularização de CND',
        checked: true,
        responsible: 'Thayâne Carvalho',
        deadline: '23/06/2026',
        note: 'Fornos entregues e instalados; bloqueio preventivo mantido na tesouraria.'
      }
    ],
    actionPlans: [
      {
        id: 'act-104-1',
        originGap: 'Fornecedor',
        what: 'Cobrar CND municipal da TermoFornos Equipamentos para liberar NF-e #3019 (R$ 18 mil)',
        who: 'Roberto Tavares',
        when: '2026-07-10',
        how: 'Validar certidão atualizada no portal municipal antes de autorizar o pagamento na tesouraria.',
        status: 'Em Andamento'
      },
      {
        id: 'act-104-2',
        originGap: 'Cronograma',
        what: 'Iniciar 2º turno de atendimento nas 3 cozinhas para atingir 4.500 refeições/mês',
        who: 'Roberto Tavares',
        when: '2026-07-20',
        how: 'Escalar escala de manipuladores treinados e ampliar encaminhamentos via CRAS local.',
        status: 'Pendente'
      }
    ]
  }
];

export const INITIAL_EVIDENCES = [
  {
    id: 'ev-1',
    projectId: 'prog-101',
    category: 'Financeiro',
    title: 'Nota fiscal e planilha patrimonial dos 100 computadores (5 polos)',
    referenceCode: 'NF-e #4180',
    date: '22/05/2026',
    responsible: 'Carlos Mendonça'
  },
  {
    id: 'ev-2',
    projectId: 'prog-101',
    category: 'Engenharia',
    title: 'ART elétrica, projeto aprovado e fotos da adequação civil dos 5 polos',
    referenceCode: 'ART #884120',
    date: '28/03/2026',
    responsible: 'Carlos Mendonça'
  },
  {
    id: 'ev-3',
    projectId: 'prog-102',
    category: 'Técnico',
    title: 'Laudo agronômico de solo e termo de cercamento dos 6 terrenos',
    referenceCode: 'LAUDO #SOLO-06',
    date: '26/02/2026',
    responsible: 'Juliana Duarte'
  },
  {
    id: 'ev-4',
    projectId: 'prog-102',
    category: 'Atendimento',
    title: 'Termo de entrega dos 3 canteiros ativos e cadastro das 48 famílias',
    referenceCode: 'CAD #HORTAS-03',
    date: '15/06/2026',
    responsible: 'Juliana Duarte'
  },
  {
    id: 'ev-5',
    projectId: 'prog-103',
    category: 'Técnico',
    title: 'Planos ambientais assinados e faturas comparativas (18 empresas concluídas)',
    referenceCode: 'REL #ESG-18',
    date: '22/06/2026',
    responsible: 'Marina Alencar'
  },
  {
    id: 'ev-6',
    projectId: 'prog-104',
    category: 'Sanitário',
    title: 'Alvará sanitário vigente (RDC 216) e aceite técnico dos fornos',
    referenceCode: 'ALV #COZ-2026',
    date: '26/06/2026',
    responsible: 'Roberto Tavares'
  },
  {
    id: 'ev-7',
    projectId: 'prog-104',
    category: 'Atendimento',
    title: 'Mapa mensal de 3.600 refeições servidas e cadastro CRAS (210 famílias)',
    referenceCode: 'MAPA #COZ-JUN26',
    date: '30/06/2026',
    responsible: 'Roberto Tavares'
  }
];
