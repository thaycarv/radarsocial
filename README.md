# 🌐 RadarSocial
> **"Transparência e ritmo na execução dos recursos que movem a sociedade"**

O **RadarSocial** é uma plataforma executiva desenvolvida para desdobramento estratégico, controle de rituais ágeis e aferição contínua do **descompasso físico-financeiro** em projetos socioambientais e iniciativas de inovação.

---

## 🎯 Proposta de Valor
Historicamente, projetos de impacto social e parcerias com o terceiro setor enfrentam desafios na conciliação entre o desembolso contábil e a entrega territorial concreta em campo. O **RadarSocial** soluciona esse gargalo ao integrar em um único cockpit:
1. **Mapa de Fluxo Estratégico**: Desdobramento claro de Eixos Estratégicos ➔ Iniciativas ➔ Entregas em Campo.
2. **Ritmo Físico vs. Gastos (Cockpit Físico-Financeiro)**: Curva S analítica, medição de desvios e cálculo em tempo real de descompasso orçamentário.
3. **Painel Geral de Portfólio**: Visão consolidada dos projetos ativos com semáforos de risco e filtragem rápida.
4. **Plano de Ação & Rituais Ágeis (5W2H Humanizado)**: Checklists periódicos de acompanhamento e planos de ação focados em resolução de gargalos operacionais.
5. **Documentação & Relatórios Executivos**: Repositório de evidências (laudos, fotos e NFs) com emissão de relatório oficial em **1 página A4 (*One-Pager*)** pronto para conselhos e financiadores.
6. **Copiloto IA**: Diagnósticos preditivos orientados a dados sem exposição ou julgamentos operacionais.

---

## 🎨 Sistema de Temas & Acessibilidade
A plataforma possui alternância instantânea entre 3 perfis visuais acessíveis:
* 🟢 **Padrão**: Tons de verde militar institucional (`#2D5A27`), refletindo sustentabilidade e solidez.
* 🍂 **Boho**: Tons de terracota acolhedores (`#A64B2A`), comunicando acolhimento socioambiental.
* 🌙 **Modo Escuro (Dark Mode)**: Alto contraste calibrado para análises prolongadas sem fadiga visual.

---

## 🤝 Matriz de Cocriação do Projeto (RACI)

Este projeto foi construído em um modelo de **cocriação ágil orientada por Product Management**:

| Dimensão | Líder de Produto (Product Lead / Concepção) | Engenharia & IA (Antigravity / Execução) |
| :--- | :--- | :--- |
| **Visão de Produto & Negócio** | Definição da tese de impacto, regras de negócio e governança. | Arquitetura SPA em React, Vite, Tailwind CSS e Recharts. |
| **UX & Design Estratégico** | Direcionamento dos 3 temas, acessibilidade e micro-ajudas (`?`). | Codificação responsiva, componentes de tooltip flutuantes e CSS dark mode. |
| **Metodologia & Rituais** | Estruturação de termos 100% em português e foco em soluções pedagógicas. | Modelagem do estado global (`ProjectContext`) com persistência no LocalStorage. |
| **Comprovações & PDF** | Exigência de hub documental e emissão de One-Pager para conselhos. | Criação de formulários de upload e regras de impressão `@media print`. |
| **Qualidade & Homologação** | Auditoria de consistência, teste de usabilidade e validação de relatórios. | Refatoração contínua, correção de contraste e sanitização de build. |

---

## 🛠️ Tecnologias Utilizadas
* **Frontend**: React 19, Vite, Tailwind CSS
* **Ícones & Gráficos**: Lucide React, Recharts
* **Armazenamento**: LocalStorage com sincronização reativa
* **Impressão**: CSS Print Engine com `@media print` otimizado para A4

---

## 🚀 Como Executar o Projeto Localmente

```bash
# 1. Clonar o repositório
git clone https://github.com/SEU_USUARIO/radarsocial.git

# 2. Acessar a pasta do projeto
cd radarsocial

# 3. Instalar dependências
npm install

# 4. Iniciar servidor de desenvolvimento
npm run dev
```

Acesse em seu navegador: `http://localhost:5173/`

---

## 📄 Licença
Distribuído sob a licença MIT. Projeto concebido para fins de inovação social e governança pública/privada.
