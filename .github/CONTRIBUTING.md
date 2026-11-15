# Diretrizes de Contribuição

Este projeto adota fluxo de trabalho rastreável para manter consistência financeira, visual e técnica.

## Fluxo via Issue e Pull Request
1. Abra uma **Issue** usando os modelos em `.github/ISSUE_TEMPLATE/`.
2. Desenvolva em uma branch dedicada (`fix/`, `feat/` ou `refactor/`).
3. Abra um **Pull Request** com referência explícita à Issue (`Resolve #N`).

## Portões de Qualidade
Antes de concluir qualquer PR, execute localmente e aguarde aprovação no GitHub Actions:
- `npm run lint` (`oxlint`)
- `npm test` (`vitest run` cobrindo reconciliação contábil e Curva S)
- `npm run build` (`vite build`)

Preserve `prefers-reduced-motion: reduce` em CSS e o `ErrorBoundary` na raiz da aplicação.
