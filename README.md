# RadarSocial

Painel web para acompanhamento físico-financeiro, gestão de rotinas (5W2H) e prestação de contas de programas socioambientais financiados por convênios, fundos e patrocínios incentivados.

🔗 **Demonstração publicada:** [https://thaycarv.github.io/radarsocial/](https://thaycarv.github.io/radarsocial/)

---

## O problema que o protótipo resolve

Em projetos sociais e socioambientais, dois erros de acompanhamento costumam comprometer a governança perante conselhos e financiadores:
1. **Olhar apenas para o saldo bancário** sem cruzar quanto do escopo físico previsto para aquela data efetivamente foi entregue.
2. **Atualizar percentuais de avanço no "olhômetro"**, desconectados dos pacotes de entrega e das notas fiscais conciliadas por rubrica.

O **RadarSocial** foi estruturado para demonstrar, na prática, uma rotina enxuta de PMO aplicada ao terceiro setor e ao investimento social privado, conectando entregas ponderadas, execução orçamentária por rubrica, planos corretivos e indicadores de resultado.

---

## Metodologia e regras de negócio implementadas

### 1. Medição Bottom-Up (sem edição manual solta de `%`)
* **Avanço Físico Realizado (`%`):** calculado pela soma ponderada dos pacotes de trabalho do programa (`Σ [peso físico × % concluído da entrega]`). A soma dos pesos de cada programa fecha em `100%`.
* **Execução Financeira (`%`):** calculada diretamente da razão entre o total pago nas rubricas orçamentárias e o orçamento aprovado (`Orçamento Executado ÷ Orçamento Aprovado`).
* **Conciliação Documental:** separa o valor já pago (`Executado`) do valor com nota fiscal/recibo validado (`Comprovado`), destacando automaticamente as **pendências de prestação de contas** (`Executado − Comprovado`).

### 2. Curva S com Linha de Base e Valor Agregado (EVM)
* Gráfico comparativo de **4 séries** até a data de corte (`Físico Planejado`, `Físico Realizado`, `Financeiro Planejado` e `Financeiro Realizado`), sem projetar execução fictícia em meses futuros.
* Cálculo explícito de:
  * **VP (Valor Planejado):** `Orçamento Total × % Físico Planejado`
  * **VA (Valor Agregado):** `Orçamento Total × % Físico Realizado`
  * **CR (Custo Real):** soma executada nas rubricas até a data de corte
  * **IDP / SPI (`VA ÷ VP`):** ritmo de cronograma
  * **IDC / CPI (`VA ÷ CR`):** eficiência de custo por real desembolsado

### 3. Semáforo Duplo Independente (Prazo e Custo em `p.p.`)
Em vez de um status único que mascara atrasos quando o gasto também está baixo, cada programa é avaliado em duas dimensões:
* **Desvio de Cronograma (`Físico Real − Físico Planejado`):**
  * `≥ -5,0 p.p.`: No Prazo
  * `< -5,0 p.p.` até `-10,0 p.p.`: Atenção no Prazo
  * `< -10,0 p.p.`: Atraso Crítico
* **Descompasso Custo vs. Avanço (`Financeiro Real − Físico Real`):**
  * Desembolso acima do avanço físico entre `+5,1 p.p.` e `+15,0 p.p.` gera alerta de **Atenção (Adiantado)**; acima de `+15,0 p.p.` sinaliza **Sobre-custo Crítico** (risco de faltar saldo para concluir o escopo).
  * Quando o desembolso está mais de `10,0 p.p.` abaixo do avanço físico entregue (`< -10,0 p.p.`), o painel sinaliza **Pagamento Represado** (despesas já incorridas em campo aguardando liquidação de nota fiscal), evitando confundir passivo pendente com economia real.

### 4. Ponderação de Carteira, 5W2H e Quadro Lógico
* **KPIs de Portfólio:** os percentuais consolidados da carteira (físico planejado, físico realizado e execução financeira) são **ponderados pelo orçamento de cada programa**, evitando distorção entre projetos de portes diferentes.
* **Reuniões e Plano 5W2H:** checklist operacional vinculado ao programa selecionado e registro de múltiplas ações corretivas (`O quê`, `Por quê`, `Onde`, `Quem`, `Quando`, `Como`, `Quanto custa` e `Status`).
* **Indicadores e Relatório A4:** distinção entre indicadores de **Produto (Output)** e de **Resultado (Outcome)** com linha de base, meta, realizado e fonte de verificação, além de catálogo de referências documentais e impressão limpa em **1 página A4** via `@media print`.

---

## Estrutura da aplicação

```text
src/
├── components/
│   ├── common/             # Tooltip conceitual acessível (teclado + clique)
│   ├── dashboard/          # Carteira consolidada, alertas determinísticos e tabela ponderada
│   ├── impact/             # Quadro Lógico (Produto vs. Resultado), evidências e One-Pager A4
│   ├── layout/             # Cabeçalho institucional, seletor de programa e alternância de tema
│   ├── operations/         # Checklist de reunião mensal e planos de ação 5W2H
│   └── physicalFinancial/  # Curva S (4 séries), painel EVM, entregas ponderadas e rubricas
├── context/
│   └── ProjectContext.jsx  # Estado reativo com persistência isolada em localStorage
├── data/
│   └── mockData.js         # Carteira demonstrativa (4 programas, corte em 30/06/2026)
└── utils/
    └── calculations.js     # Fórmulas de medição bottom-up, EVM, semáforos e alertas
```

> **Escopo técnico deste repositório:** protótipo funcional *client-side* (SPA). Os dados iniciais representam uma carteira fictícia coerente para demonstração metodológica, e todas as simulações feitas pelo usuário (avanço de entregas, edição de rubricas, ações 5W2H e evidências) ficam salvas localmente no navegador (`localStorage`), podendo ser restauradas a qualquer momento pelo botão **Restaurar dados** no topo.

---

## Tecnologias utilizadas

* **React 19** + **Vite 8**
* **Tailwind CSS 4** (temas Padrão Institucional e Modo Escuro)
* **Recharts** (Curva S comparativa)
* **Lucide React** (iconografia)
* **Oxlint** + **GitHub Actions** (lint e build automatizados antes do deploy no GitHub Pages)

---

## Como executar localmente

```bash
# 1. Clonar o repositório
git clone https://github.com/thaycarv/radarsocial.git

# 2. Acessar a pasta do projeto
cd radarsocial

# 3. Instalar dependências
npm install

# 4. Executar verificação de código e iniciar ambiente local
npm run lint
npm run dev
```

---

## Autoria e Concepção

Concebido e especificado por **Thayâne Carvalho** — Engenheira de Produção, Gestora de Projetos e Especialista em Operações e Impacto Social ([LinkedIn](https://www.linkedin.com/in/thaycc/)).

Distribuído sob a licença [MIT](./LICENSE).
