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
    operationalHeadline: '4 laboratórios já em operação; ativando a última unidade no prazo',
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
        fieldNote: 'Quadro elétrico dimensionado para as 10 estações, climatização e projetor em cada polo.',
        status: 'done'
      },
      {
        id: 'del-101-2',
        period: 'Fev–Mar/2026',
        name: 'Adequação civil, elétrica e cabeamento estruturado dos 5 polos',
        deadline: '31/03/2026',
        deadlineISO: '2026-03-31',
        completedAt: '28/03/2026',
        deliverableDoc: 'Termo de entrega civil (NF-e #1904 e #2041)',
        fieldNote: 'Salas pintadas, climatizadas e com pontos de rede lógica instalados nos 5 polos.',
        status: 'done'
      },
      {
        id: 'del-101-3',
        period: 'Abr–Mai/2026',
        name: 'Compra, entrega e tombamento dos 50 computadores (10 por polo)',
        deadline: '25/05/2026',
        deadlineISO: '2026-05-25',
        completedAt: '22/05/2026',
        deliverableDoc: 'NF-e #4180 / #4295 e planilha patrimonial (50 números de série)',
        fieldNote: 'Lote integral recebido e etiquetado nos 5 espaços (10 estações completas por polo).',
        status: 'done'
      },
      {
        id: 'del-101-4',
        period: 'Jun–Jul/2026',
        name: 'Montagem das bancadas finais, 50 cadeiras ergonômicas e internet fibra',
        deadline: '15/07/2026',
        deadlineISO: '2026-07-15',
        completedAt: null,
        deliverableDoc: 'Laudo de conectividade e aceite do mobiliário nos 5 laboratórios',
        fieldNote: 'Mobiliário entregue nos polos 1 a 4 (em operação); 5º polo (Polo Norte) conclui fibra até 15/07.',
        status: 'in_progress'
      },
      {
        id: 'del-101-5',
        period: 'Jul–Ago/2026',
        name: 'Kits multimídia (projetores e impressoras), capacitação de monitores e turmas',
        deadline: '25/08/2026',
        deadlineISO: '2026-08-25',
        completedAt: null,
        deliverableDoc: 'NF-e dos kits multimídia, lista de presença dos monitores e grade horária',
        fieldNote: 'Equipamentos audiovisuais e treinamento iniciam após ativação completa do 5º polo.',
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
            date: '28/01/2026',
            supplier: 'MestreObra Engenharia Ltda',
            description: 'Mobilização civil e material elétrico inicial dos 5 polos',
            docRef: 'NF-e #1790',
            amount: 53000,
            status: 'approved'
          },
          {
            id: 'exp-101-1b',
            date: '20/02/2026',
            supplier: 'MestreObra Engenharia Ltda',
            description: 'Adequação elétrica, iluminação e pintura dos Polos 1 a 3',
            docRef: 'NF-e #1904',
            amount: 54000,
            status: 'approved'
          },
          {
            id: 'exp-101-1c',
            date: '27/03/2026',
            supplier: 'MestreObra Engenharia Ltda',
            description: 'Reforma civil e bancadas dos Polos 4 e 5',
            docRef: 'NF-e #2041',
            amount: 33000,
            status: 'approved'
          },
          {
            id: 'exp-101-1d',
            date: '19/06/2026',
            supplier: 'Marcenaria Sul Projetos',
            description: 'Ajuste final e montagem de bancadas do Polo Norte',
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
            date: '25/03/2026',
            supplier: 'ConectaFibra Suprimentos',
            description: 'Switches gerenciáveis, roteadores Wi-Fi e nobreaks (5 polos)',
            docRef: 'NF-e #0912',
            amount: 20000,
            status: 'approved'
          },
          {
            id: 'exp-101-2b',
            date: '24/04/2026',
            supplier: 'TecnoRede Distribuidora S.A.',
            description: '1º lote: 30 computadores desktop com monitor LED (Polos 1 a 3)',
            docRef: 'NF-e #4180',
            amount: 69000,
            status: 'approved'
          },
          {
            id: 'exp-101-2c',
            date: '22/05/2026',
            supplier: 'TecnoRede Distribuidora S.A.',
            description: '2º lote: 20 computadores desktop com monitor LED (Polos 4 e 5)',
            docRef: 'NF-e #4295',
            amount: 46000,
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
            date: '15/01/2026',
            supplier: 'Ricardo Prado Engenharia · ME',
            description: 'Vistorias iniciais e projeto elétrico dos 5 polos',
            docRef: 'NFS-e #0274',
            amount: 10000,
            status: 'approved'
          },
          {
            id: 'exp-101-3b',
            date: '30/03/2026',
            supplier: 'Ricardo Prado Engenharia · ME',
            description: 'Fiscalização de reforma e emissão de ART (#884120)',
            docRef: 'NFS-e #0311',
            amount: 10000,
            status: 'approved'
          },
          {
            id: 'exp-101-3c',
            date: '26/05/2026',
            supplier: 'Ricardo Prado Engenharia · ME',
            description: 'Configuração lógica dos 50 computadores e rede local',
            docRef: 'NFS-e #0389',
            amount: 5000,
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
      { month: 'Mar', plannedPhysical: 40, actualPhysical: 40, plannedFinancial: 44, actualFinancial: 40 },
      { month: 'Abr', plannedPhysical: 50, actualPhysical: 50, plannedFinancial: 56, actualFinancial: 55.3 },
      { month: 'Mai', plannedPhysical: 60, actualPhysical: 60, plannedFinancial: 68, actualFinancial: 68.4 },
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
      { month: 'Fev', plannedPhysical: 20, actualPhysical: 20, plannedFinancial: 15, actualFinancial: 20.7 },
      { month: 'Mar', plannedPhysical: 30, actualPhysical: 25, plannedFinancial: 30, actualFinancial: 43.9 },
      { month: 'Abr', plannedPhysical: 40, actualPhysical: 30, plannedFinancial: 42, actualFinancial: 57.1 },
      { month: 'Mai', plannedPhysical: 50, actualPhysical: 35, plannedFinancial: 50, actualFinancial: 79.6 },
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
            date: '20/02/2026',
            supplier: 'Ciclo Limpo Consultoria Ambiental',
            description: 'Estruturação metodológica e triagem inicial do edital',
            docRef: 'NFS-e #0355',
            amount: 25000,
            status: 'approved'
          },
          {
            id: 'exp-103-1b',
            date: '25/03/2026',
            supplier: 'Ciclo Limpo Consultoria Ambiental',
            description: 'Levantamento ambiental inicial nas 30 empresas selecionadas',
            docRef: 'NFS-e #0412',
            amount: 20000,
            status: 'approved'
          },
          {
            id: 'exp-103-1c',
            date: '29/04/2026',
            supplier: 'Ciclo Limpo Consultoria Ambiental',
            description: 'Entrega dos 30 diagnósticos e planos individuais de ação',
            docRef: 'NFS-e #0449',
            amount: 13000,
            status: 'approved'
          },
          {
            id: 'exp-103-1d',
            date: '02/06/2026',
            supplier: 'Ciclo Limpo Consultoria Ambiental',
            description: 'Horas técnicas de implantação no 1º grupo (18 empresas)',
            docRef: 'NFS-e #0468',
            amount: 13000,
            status: 'approved'
          },
          {
            id: 'exp-103-1e',
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
            date: '24/04/2026',
            supplier: 'EcoLuz Eficiência & Coleta Ltda',
            description: '1º lote: kits LED e coletores seletivos (8 negócios piloto)',
            docRef: 'NF-e #2198',
            amount: 20000,
            status: 'approved'
          },
          {
            id: 'exp-103-2b',
            date: '20/05/2026',
            supplier: 'EcoLuz Eficiência & Coleta Ltda',
            description: '2º lote: kits de iluminação LED e arejadores (10 negócios)',
            docRef: 'NF-e #2290',
            amount: 25000,
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
            date: '28/03/2026',
            supplier: 'Espaço Conecta Eventos Ltda',
            description: 'Oficina de abertura e nivelamento ESG com os 30 negócios',
            docRef: 'NFS-e #1042',
            amount: 8000,
            status: 'approved'
          },
          {
            id: 'exp-103-3b',
            date: '15/05/2026',
            supplier: 'Espaço Conecta Eventos Ltda',
            description: 'Salas, sonorização e alimentação das oficinas temáticas 2 e 3',
            docRef: 'NFS-e #1105',
            amount: 9000,
            status: 'approved'
          },
          {
            id: 'exp-103-3c',
            date: '12/06/2026',
            supplier: 'Centro de Convenções Serra Azul',
            description: 'Sinal de reserva do auditório para a Rodada Comercial de outubro',
            docRef: 'NFS-e #0890',
            amount: 8000,
            status: 'approved'
          },
          {
            id: 'exp-103-3d',
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
      { month: 'Fev', plannedPhysical: 10, actualPhysical: 10, plannedFinancial: 12, actualFinancial: 11.4 },
      { month: 'Mar', plannedPhysical: 25, actualPhysical: 25, plannedFinancial: 26, actualFinancial: 24.1 },
      { month: 'Abr', plannedPhysical: 40, actualPhysical: 40, plannedFinancial: 38, actualFinancial: 39.1 },
      { month: 'Mai', plannedPhysical: 50, actualPhysical: 50, plannedFinancial: 50, actualFinancial: 54.5 },
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
            date: '20/03/2026',
            supplier: 'InoxSul Cozinhas Profissionais',
            description: 'Bancadas, pias e coifas em aço inox das 3 cozinhas',
            docRef: 'NF-e #2610',
            amount: 30000,
            status: 'approved'
          },
          {
            id: 'exp-104-1b',
            date: '18/04/2026',
            supplier: 'InoxSul Cozinhas Profissionais',
            description: 'Freezers horizontais e fogões industriais das 3 cozinhas',
            docRef: 'NF-e #2844',
            amount: 25000,
            status: 'approved'
          },
          {
            id: 'exp-104-1c',
            date: '14/05/2026',
            supplier: 'TermoFornos Equipamentos Ltda',
            description: '3 fornos industriais a gás (6 esteiras) instalados — retido por CND',
            docRef: 'NF-e #3019 · CND pendente',
            amount: 18000,
            status: 'retained'
          }
        ]
      },
      {
        id: 'rub-104-2',
        category: 'Reforma Civil e Instalação de Gás',
        budgeted: 30000,
        expenses: [
          {
            id: 'exp-104-2a',
            date: '26/01/2026',
            supplier: 'Construtora Alvorada Serviços',
            description: 'Projetos sanitários, revisão GLP e preparo civil das 3 unidades',
            docRef: 'NF-e #1045',
            amount: 10000,
            status: 'approved'
          },
          {
            id: 'exp-104-2b',
            date: '24/02/2026',
            supplier: 'Construtora Alvorada Serviços',
            description: 'Revestimentos laváveis, exaustão e central GLP concluídos',
            docRef: 'NF-e #1192',
            amount: 15000,
            status: 'approved'
          }
        ]
      },
      {
        id: 'rub-104-3',
        category: 'Capacitação, Utensílios e Insumos do 2º Turno',
        budgeted: 45000,
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
      { month: 'Jan', plannedPhysical: 10, actualPhysical: 10, plannedFinancial: 10, actualFinancial: 6.7 },
      { month: 'Fev', plannedPhysical: 20, actualPhysical: 20, plannedFinancial: 22, actualFinancial: 16.7 },
      { month: 'Mar', plannedPhysical: 35, actualPhysical: 35, plannedFinancial: 38, actualFinancial: 36.7 },
      { month: 'Abr', plannedPhysical: 50, actualPhysical: 50, plannedFinancial: 54, actualFinancial: 53.3 },
      { month: 'Mai', plannedPhysical: 65, actualPhysical: 65, plannedFinancial: 64, actualFinancial: 53.3 },
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
        who: 'Juliana Duarte',
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
        title: 'Conferir tombamento patrimonial dos 50 computadores nos 5 polos',
        checked: true,
        responsible: 'Carlos Mendonça',
        deadline: '24/06/2026',
        note: 'NF-e #4180 e #4295 e planilha com 50 números de série validados (10 por polo).'
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
        what: 'Pré-aprovar fornecedor secundário de internet via rádio para o Polo Norte',
        who: 'Carlos Mendonça',
        when: '2026-06-24',
        how: 'Proposta técnica pré-aprovada em ata para acionamento imediato caso a fibra passe de 10/07.',
        status: 'Concluída'
      },
      {
        id: 'act-101-2',
        originGap: 'Notas Fiscais',
        what: 'Baixar R$ 7 mil sem NF (Marcenaria Sul · PIX #8821 e SeguraMais · Boleto #4410)',
        who: 'Carlos Mendonça',
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
    title: 'Notas fiscais e planilha patrimonial dos 50 computadores (10 por polo)',
    referenceCode: 'NF-e #4180 / #4295',
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

export const INITIAL_COMMUNITY_FEEDBACKS = [
  {
    id: "ESC-101",
    projectId: "proj-101",
    projectName: "Laboratórios Comunitários de Inclusão Digital",
    hub: "Polo Comunitário Norte",
    channel: "WhatsApp Comunitário",
    beneficiary: "Dona Maria Clara (Mãe de aluno)",
    date: "2026-08-24",
    time: "14:30",
    text: "Boa tarde, meu filho foi para a aula hoje no Polo Norte e os computadores estavam sem conexão com a internet. A professora precisou passar atividade teórica no quadro e eles não conseguiram praticar no laboratório.",
    category: "Conectividade & Infraestrutura",
    severity: "Alta",
    sector: "Infraestrutura & Redes",
    rootCause: "Rompimento de fibra óptica na entrada da comunidade por obras na rede de drenagem.",
    immediateAction: "Modem 4G de redundância acionado no polo em 40 minutos + Reposição prática agendada no sábado.",
    contingencyCost: 85,
    status: "Em Tratamento",
    slaHours: 0.7,
    history: [
      "24/08 14:30 · Ocorrência registrada via canal comunitário",
      "24/08 14:45 · Coordenação de infraestrutura acionou operadora e liberou roteador reserva",
      "24/08 15:10 · Conexão provisória restabelecida para os 24 alunos da turma"
    ]
  },
  {
    id: "ESC-102",
    projectId: "proj-102",
    projectName: "Programa Bootcamp Dev e Dados para a Juventude",
    hub: "Polo Regional Centro",
    channel: "Formulário de Aluno/Turma",
    beneficiary: "Lucas Ferreira (Aluno Bolsista)",
    date: "2026-08-23",
    time: "19:15",
    text: "O ritmo das aulas de banco de dados e APIs está muito acelerado para quem não tinha base de lógica. Estamos com receio de não entregar o projeto prático final e perder a bolsa de apoio.",
    category: "Pedagógico & Nivelamento",
    severity: "Média",
    sector: "Coordenação Pedagógica",
    rootCause: "Descompasso na formação básica inicial de programação entre bolsistas recém-ingressos.",
    immediateAction: "Plantão de monitoria técnica aos sábados com instrutores locais + prorrogação de 5 dias no prazo de entrega.",
    contingencyCost: 150,
    status: "Resolvido",
    slaHours: 2.5,
    history: [
      "23/08 19:15 · Formulário de avaliação de módulo recebido",
      "23/08 20:30 · Coordenadora Juliana Duarte reuniu equipe de instrutores",
      "24/08 09:00 · Calendário de monitorias aos sábados publicado para as 4 turmas"
    ]
  },
  {
    id: "ESC-103",
    projectId: "proj-201",
    projectName: "Cozinhas Comunitárias e Segurança Alimentar",
    hub: "Cozinha Solidária Esperança",
    channel: "Reunião de Polo / Presencial",
    beneficiary: "Dona Tereza (Liderança do Coletivo de Mães)",
    date: "2026-08-22",
    time: "10:00",
    text: "Quatro crianças atendidas na distribuição de almoço têm diagnóstico médico de alergia severa a leite e derivados. Precisamos garantir que não haja contaminação cruzada no preparo dos caldos.",
    category: "Segurança Sanitária & Alérgenos",
    severity: "Crítica",
    sector: "Qualidade & Nutrição (Thayâne Carvalho)",
    rootCause: "Necessidade de protocolo operacional rigoroso conforme RDC 216 / RDC 727 para manipulação comunitária de alérgenos.",
    immediateAction: "Visita técnica da nutricionista com cartilha de boas práticas, rotulagem e kit de panelas e tábuas exclusivas identificadas.",
    contingencyCost: 120,
    status: "Resolvido",
    slaHours: 1.0,
    history: [
      "22/08 10:00 · Demanda apresentada na roda de alinhamento com a comunidade",
      "22/08 11:30 · Nutricionista Thayâne realizou auditoria in loco na bancada",
      "22/08 14:00 · Procedimento padrão RDC 727 fixado e equipe treinada"
    ]
  },
  {
    id: "ESC-104",
    projectId: "proj-101",
    projectName: "Laboratórios Comunitários de Inclusão Digital",
    hub: "Polo Comunitário Sul",
    channel: "Ouvidoria Digital",
    beneficiary: "Camila Rocha (Educadora Voluntária)",
    date: "2026-08-21",
    time: "16:40",
    text: "Três teclados e dois mouses da bancada de atendimento infantil estão com defeito e cabos rompidos após as oficinas do fim de semana.",
    category: "Equipamentos & Suprimentos",
    severity: "Média",
    sector: "Infraestrutura & TI",
    rootCause: "Desgaste natural de uso contínuo em bancadas comunitárias sem checklist de fechamento diário.",
    immediateAction: "Reposição imediata a partir do estoque de reserva técnica do projeto + implantação de checklist diário.",
    contingencyCost: 0,
    status: "Resolvido",
    slaHours: 3.0,
    history: [
      "21/08 16:40 · Chamado aberto na ouvidoria",
      "21/08 18:00 · Peças substituídas com garantia de lote homologado",
      "21/08 18:30 · Checklist de vistoria diária entregue ao responsável do polo"
    ]
  },
  {
    id: "ESC-105",
    projectId: "proj-102",
    projectName: "Programa Bootcamp Dev e Dados para a Juventude",
    hub: "Polo Regional Norte",
    channel: "WhatsApp Comunitário",
    beneficiary: "Gabriel Souza (Bolsista do Programa)",
    date: "2026-08-20",
    time: "11:20",
    text: "Gostaria de registrar um agradecimento! Fui contratado como Desenvolvedor Júnior na empresa parceira do projeto após a apresentação do projeto de conclusão de curso na semana passada.",
    category: "Elogio & Impacto Social",
    severity: "Baixa",
    sector: "Parcerias & Empregabilidade",
    rootCause: "Eficácia da metodologia prática e da ponte direta com o setor produtivo.",
    immediateAction: "Registro do depoimento para o relatório trimestral aos financiadores e convite para mentoria com novos alunos.",
    contingencyCost: 0,
    status: "Resolvido",
    slaHours: 4.0,
    history: [
      "20/08 11:20 · Mensagem de agradecimento recebida",
      "20/08 12:00 · Caso de sucesso documentado no portfólio de impacto"
    ]
  },
  {
    id: "ESC-106",
    projectId: "proj-101",
    projectName: "Laboratórios Comunitários de Inclusão Digital",
    hub: "Polo Digital Leste",
    channel: "Reunião de Polo / Presencial",
    beneficiary: "Marcos Vinicius (Líder Comunitário)",
    date: "2026-08-19",
    time: "18:00",
    text: "Jovens do bairro que trabalham no comércio só chegam em casa após as 19h30 e não conseguem frequentar as turmas da tarde. A comunidade solicita uma turma noturna de informática básica.",
    category: "Acesso & Grade Horária",
    severity: "Média",
    sector: "Planejamento & Operações",
    rootCause: "Pesquisa diagnóstica inicial subdimensionou a demanda de trabalhadores diurnos.",
    immediateAction: "Readequação da grade de instrutores para abertura de turma das 20h às 21h30 a partir de setembro.",
    contingencyCost: 0,
    status: "Em Tratamento",
    slaHours: 5.0,
    history: [
      "19/08 18:00 · Demanda acolhida no conselho comunitário",
      "20/08 14:00 · Ajuste de escala de instrutores planejado com a gerência do projeto"
    ]
  }
];

export const INITIAL_COMMUNITY_ACTIONS = [
  {
    id: "ACT-COM-01",
    title: "Contingência 4G Redundante nos 5 Polos Comunitários",
    projectId: "proj-101",
    problem: "Quedas de fibra óptica em bairros periféricos interrompem aulas práticas dos jovens.",
    action: "Instalação de roteadores com chip de dados de comutação automática para contingência imediata.",
    sector: "Infraestrutura & Redes",
    owner: "Coord. de Infraestrutura",
    deadline: "30/08/2026",
    metric: "Disponibilidade de conexão nos laboratórios > 98,5%",
    status: "Em andamento"
  },
  {
    id: "ACT-COM-02",
    title: "Plantão de Monitoria Pedagógica aos Sábados",
    projectId: "proj-102",
    problem: "Evasão e descompasso de alunos com menor base de lógica de programação.",
    action: "2 turmas presenciais de reforço aos sábados lideradas por monitores bolsistas seniores.",
    sector: "Coordenação Pedagógica",
    owner: "Juliana Duarte",
    deadline: "25/08/2026",
    metric: "Reduzir taxa de desistência dos módulos técnicos para < 5%",
    status: "Em andamento"
  },
  {
    id: "ACT-COM-03",
    title: "Protocolo de Alérgenos e Boas Práticas (RDC 727)",
    projectId: "proj-201",
    problem: "Risco de contaminação cruzada para crianças alérgicas atendidas nas cozinhas comunitárias.",
    action: "Treinamento presencial de voluntárias, cartilha plastificada e segregação de utensílios exclusivos.",
    sector: "Qualidade & Nutrição",
    owner: "Thayâne Carvalho (Nutricionista/PMO)",
    deadline: "20/08/2026",
    metric: "100% de conformidade com os requisitos da RDC 727 / RDC 26",
    status: "Concluída"
  },
  {
    id: "ACT-COM-04",
    title: "Abertura de Turma Noturna para Trabalhadores",
    projectId: "proj-101",
    problem: "Jovens inseridos no comércio informal não conseguiam frequentar turmas vespertinas.",
    action: "Remanejamento de escala para ofertar turma das 20h às 21h30 no Polo Digital Leste.",
    sector: "Planejamento & Operações",
    owner: "Carlos Mendonça",
    deadline: "05/09/2026",
    metric: "Ocupação de 25 vagas para trabalhadores no turno da noite",
    status: "Planejada"
  }
];
