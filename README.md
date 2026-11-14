# RadarSocial

Painel web para acompanhar a execução física, o orçamento e a prestação de contas de programas sociais e ambientais.

🔗 **Acesse a aplicação:** [https://thaycarv.github.io/radarsocial/](https://thaycarv.github.io/radarsocial/)

---

## O que o projeto resolve

Na gestão de convênios, fundos e patrocínios incentivados, olhar apenas para o saldo bancário costuma esconder atrasos de entrega, estouros de rubrica ou notas fiscais pendentes. O **RadarSocial** organiza essa governança em quatro frentes integradas:

* **Portfólio:** visão consolidada da carteira com status unificado e alertas automáticos de prazo, orçamento e retenções fiscais.
* **Execução e Orçamento:** Curva S mensal (planejado vs. realizado derivado das despesas), cronograma de entregas do plano de trabalho e razão analítico por rubrica com trava de teto orçamentário e conciliação de notas/CND.
* **Plano de Ação:** verificações da última reunião de acompanhamento, riscos em monitoramento e encaminhamentos com responsável, prazo e status.
* **Impacto e Exportação PDF:** matriz de indicadores de entrega e resultado (alinhada ao MROSC), dossiê de evidências comprobatórias e resumo executivo pronto para impressão em 1 página.

---

## Regras de cálculo e governança

* **Avanço físico (regra 0 / 50 / 100):** medido por etapas sequenciais do plano de trabalho (`Não iniciada` = `0%`, `Em andamento` = `50%`, `Concluída` = `100%`), com peso explícito e cálculo automático de dias de atraso na data de corte.
* **Execução orçamentária *bottom-up*:** totais por rubrica são calculados diretamente a partir dos lançamentos fiscais vinculados (`NF validada`, `Sem NF` ou `Retido por CND`), bloqueando novas despesas acima do saldo livre da rubrica sem remanejamento.
* **Carteira consolidada:** médias ponderadas pelo orçamento de cada programa, evitando que projetos menores distorçam o indicador global.
* **Persistência:** aplicação *client-side* com salvamento automático no `localStorage` do navegador e botão para restaurar o cenário inicial de demonstração.

---

## Stack e execução local

* **Frontend:** React 19, Vite 8, Tailwind CSS 4, Recharts e Lucide React
* **Qualidade & Deploy:** Oxlint + GitHub Actions (GitHub Pages)

```bash
git clone https://github.com/thaycarv/radarsocial.git
cd radarsocial
npm install
npm run dev
```

---

## Autoria

Desenvolvido por **Thayâne Carvalho**, Engenharia de Produção, Gestão de Projetos e Operações ([LinkedIn](https://www.linkedin.com/in/thaycc/)).  
Licença [MIT](./LICENSE).
