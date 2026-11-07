# RadarSocial

Painel web para acompanhar a execução física, o orçamento e a prestação de contas de programas socioambientais.

🔗 **Acesse a aplicação:** [https://thaycarv.github.io/radarsocial/](https://thaycarv.github.io/radarsocial/)

---

## O que o projeto resolve

Na rotina de convênios, fundos e patrocínios incentivados, olhar apenas para o saldo bancário costuma esconder atrasos de entrega ou notas fiscais pendentes. O **RadarSocial** organiza essa operação em quatro frentes diretas:

* **Portfólio:** visão consolidada da carteira com alertas automáticos de prazo, orçamento e notas pendentes.
* **Execução e Orçamento:** evolução mensal (planejado vs. realizado), acompanhamento de marcos do cronograma e controle de pagamentos por rubrica.
* **Plano de Ação:** acompanhamento da última reunião, riscos mapeados e encaminhamentos com responsável e prazo.
* **Impacto e Exportação PDF:** indicadores de entrega e resultado no público atendido, registro de protocolos e resumo executivo pronto para impressão em 1 página.

---

## Regras de cálculo nos bastidores

* **Avanço físico (regra 0 / 50 / 100):** medido por marcos sequenciais do cronograma (`Não iniciada` = `0%`, `Em andamento` = `50%`, `Concluída` = `100%`), evitando percentuais subjetivos e sinalizando automaticamente etapas com prazo vencido.
* **Execução financeira:** calculada diretamente sobre os valores pagos nas rubricas frente ao orçamento aprovado, separando o que já possui comprovante validado do que aguarda nota fiscal.
* **Carteira consolidada:** médias ponderadas pelo orçamento de cada programa, evitando que projetos menores distorçam o indicador global.
* **Persistência:** aplicação *client-side* com salvamento automático no `localStorage` do navegador e opção de restaurar os dados iniciais a qualquer momento.

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

Desenvolvido por **Thayâne Carvalho** — Gestão de Projetos, Operações e Inovação ([LinkedIn](https://www.linkedin.com/in/thaycc/)).  
Licença [MIT](./LICENSE).
