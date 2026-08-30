# 🤖 Diretrizes de Governança e Contribuição com IA (AGENTS.md)
**Repositório**: `RadarSocial`  
**Responsável**: Thayâne Carvalho (Gestão de Projetos & PMO)

---

## 🎯 Objetivo & Padrão de Trabalho
Este documento estabelece o protocolo mandatório de engenharia e gestão de mudanças para qualquer agente de IA ou desenvolvedor que atue no projeto **RadarSocial**.

Toda e qualquer evolução técnica, correção ou melhoria deve seguir estritamente o fluxo de **Rastreabilidade e Governança**:

---

## 1. 📌 Gestão de Demandas via GitHub Issues

Nenhuma alteração de código ou funcionalidade deve ser realizada sem uma **Issue** correspondente previamente criada e categorizada:

1. **`[Correção]`** *(Bugfix)*: Resolução de falhas de renderização, quebras de layout, erros de compilação ou inconsistências de dados.
2. **`[Melhoria]`** *(Enhancement)*: Refinamento de usabilidade, aprimoramento de contraste/temas, clareza metodológica ou otimização de performance.
3. **`[Nova Função]`** *(Feature)*: Criação de novas abas, novos módulos analíticos, novos componentes ou integração com ferramentas de relatórios.

---

## 2. 🔀 Fluxo de Branches e Pull Requests (PRs)

1. **Nunca realizar alterações diretas na branch `main`**.
2. Criar branches nomeadas a partir da Issue correspondente:
   * `fix/nome-da-correcao`
   * `feat/nome-da-feature`
   * `refactor/nome-da-melhoria`
3. Todas as entregas e deploys devem ser gerenciados exclusivamente através de **Pull Requests** direcionados à branch `main`.

---

## 3. 📝 Estrutura Obrigatória de todo Pull Request (PR Template)

Todo Pull Request aberto deve conter obrigatoriamente as seguintes 4 seções detalhadas:

```markdown
### 🔗 Issue Vinculada
- Resolve: #[Número da Issue] (ou link para a Issue)

### 📋 O que mudou?
- Descrição clara, técnica e objetiva das alterações realizadas no código ou na arquitetura.

### ✅ Como foi validado?
- Comandos de build executados (ex: `npm run build`).
- Validações visuais nos 3 temas (Padrão, Boho, Dark Mode).
- Testes de usabilidade e integridade funcional realizados.

### ⚠️ Riscos, Limitações & Próximos Passos
- Riscos mapeados ou dependências técnicas.
- Limitações da implementação atual.
- Próximos passos e melhorias futuras recomendadas.
```

---

## 4. 🛡️ Critérios de Aceite & Governança Ética
* **Acessibilidade**: Manter contraste legível em todos os temas conforme as diretrizes WCAG.
* **Integridade dos Dados**: Preservar a consistência matemática entre Curva S, avanço territorial e desembolso contábil.
* **Respeito & Foco em Processos**: Diagnósticos e planos de ação devem orientar soluções para cronogramas e logística, sem atribuições punitivas individuais.
