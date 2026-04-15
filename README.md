# Herbário Vivo — Akinator de Plantas Medicinais de Minas Gerais

App web estilo Akinator que adivinha qual planta medicinal mineira você está pensando, fazendo perguntas e eliminando candidatas por ganho de informação (entropia). Feito para uma apresentação universitária; roda no celular dos alunos via GitHub Pages.

- **Stack:** React + Vite + Tailwind CSS, 100% estático, sem backend.
- **Dados:** 15 plantas em `src/data/plants.json` (Cerrado e Mata Atlântica).
- **Motor:** `src/engine/decision.js` — algoritmo de eliminação por entropia.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra o endereço mostrado pelo Vite (em geral `http://localhost:5173`).

## Build de produção

```bash
npm run build
npm run preview
```

## Deploy no GitHub Pages

O `vite.config.js` está com `base: '/Akinator_plantamedicinal/'` — se o nome do repositório for outro, ajuste esse campo antes de fazer deploy.

```bash
npm run deploy
```

Isso builda para `dist/` e publica na branch `gh-pages` via o pacote `gh-pages`. Depois, em **Settings → Pages** do repositório, selecione a branch `gh-pages` como fonte.

## Estrutura

```
src/
├── data/plants.json           # base de dados
├── engine/decision.js         # motor de decisão (entropia)
├── components/
│   ├── StartScreen.jsx
│   ├── QuestionScreen.jsx
│   ├── ResultScreen.jsx
│   ├── CatalogScreen.jsx
│   ├── PlantCard.jsx
│   └── ProgressBar.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Revisão de dados botânicos

Os campos de cada planta em `plants.json` foram preenchidos a partir de conhecimento botânico geral — **revise antes da apresentação**, especialmente `caracteristicas` (booleanos), `parteUsada` e `categoriaUso`, que afetam diretamente o motor de decisão.

Para testar a convergência do motor sem a UI, você pode rodar no console do navegador:

```js
import('./src/engine/decision.js').then(m => console.table(m.__selfTest()));
```

Cada planta deve sair com `ok: true` e `steps <= 8` na maioria dos casos.
