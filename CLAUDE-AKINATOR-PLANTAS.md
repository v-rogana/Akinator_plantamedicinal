# Projeto: Akinator de Plantas Medicinais de Minas Gerais

## Visão Geral

Construir um app web interativo no estilo "Akinator" que adivinha qual planta medicinal mineira o usuário está pensando. Funciona como uma **chave taxonômica iterativa**: faz perguntas uma a uma, elimina candidatas, e converge para uma resposta.

**Contexto:** Será usado numa apresentação universitária sobre plantas medicinais brasileiras. O público são estudantes de graduação. Vai rodar como link público (GitHub Pages), acessível pelo celular de cada pessoa na sala.

**Deploy target:** GitHub Pages (site estático, sem backend).

---

## Stack

- **React** (single-page app)
- **Vite** como bundler (build estático para GitHub Pages)
- **Tailwind CSS** para estilização
- **Sem backend** — toda a lógica e dados vivem no frontend
- **GitHub Pages** deploy via `gh-pages` branch ou `/docs`

---

## Dados: Base de Plantas

Criar um arquivo `src/data/plants.json` com **15 plantas medicinais nativas de Minas Gerais**, cobrindo os dois principais biomas do estado (Cerrado e Mata Atlântica).

### Estrutura de cada planta:

```json
{
  "id": "barbatimao",
  "nomeCientifico": "Stryphnodendron adstringens",
  "nomePopular": ["Barbatimão", "Barba-de-timão"],
  "familia": "Fabaceae",
  "bioma": "cerrado",
  "porte": "arvore",
  "parteUsada": ["casca"],
  "categoriaUso": ["cicatrizante", "anti-inflamatorio", "antisseptico"],
  "habitatEspecifico": "Campos rupestres e cerrado sensu stricto",
  "caracteristicas": {
    "aromaForte": false,
    "latex": false,
    "espinhos": false,
    "flores_vistosas": true,
    "frutoComestivel": false,
    "folhasCompostas": true,
    "usoCha": true,
    "usoTopico": true,
    "sabor_amargo": true
  },
  "curiosidade": "A casca do barbatimão tem até 30% de taninos, o que explica seu poder cicatrizante. É uma das plantas do cerrado mais estudadas cientificamente.",
  "imagem": "barbatimao.webp"
}
```

### Atributos-chave para o motor de perguntas:

**Categóricos (perguntas de múltipla escolha):**
- `bioma`: "cerrado" | "mata_atlantica" | "ambos"
- `porte`: "arvore" | "arbusto" | "herbacea" | "trepadeira"
- `parteUsada`: ["folha", "raiz", "casca", "fruto", "flor", "semente", "resina", "planta_inteira"]
- `categoriaUso`: ["anti-inflamatorio", "cicatrizante", "calmante", "digestivo", "respiratorio", "analgesico", "antisseptico", "febrífugo", "hepatoprotetor", "diuretico"]

**Booleanos (perguntas sim/não):**
- `aromaForte`, `latex`, `espinhos`, `flores_vistosas`, `frutoComestivel`, `folhasCompostas`, `usoCha`, `usoTopico`, `sabor_amargo`

### Lista sugerida de plantas (VERIFICAR TODAS — dados podem ter imprecisões):

1. **Barbatimão** (Stryphnodendron adstringens) — Cerrado
2. **Arnica-do-cerrado** (Lychnophora ericoides) — Cerrado/Campos rupestres
3. **Carqueja** (Baccharis trimera) — Cerrado/Mata Atlântica
4. **Espinheira-santa** (Maytenus ilicifolia) — Mata Atlântica
5. **Guaco** (Mikania glomerata) — Mata Atlântica
6. **Aroeira** (Schinus terebinthifolia) — Mata Atlântica/Cerrado
7. **Ipê-roxo** (Handroanthus impetiginosus) — Cerrado
8. **Embaúba** (Cecropia pachystachya) — Mata Atlântica
9. **Catuaba** (Anemopaegma mirandum) — Cerrado
10. **Cavalinha** (Equisetum arvense) — Mata Atlântica (áreas úmidas)
11. **Chapéu-de-couro** (Echinodorus macrophyllus) — Cerrado (veredas)
12. **Pacari** (Lafoensia pacari) — Cerrado
13. **Sucupira** (Pterodon pubescens) — Cerrado
14. **Poejo** (Mentha pulegium) — cultivada/Mata Atlântica
15. **Stévia** (Stevia rebaudiana) — naturalizada em MG

> **IMPORTANTE:** O Claude Code deve buscar informações confiáveis sobre cada planta para preencher os atributos corretamente. Marcar com `// VERIFICAR` qualquer dado incerto. O usuário fará revisão manual antes do deploy.

---

## Motor de Decisão (Algoritmo)

### Abordagem: Eliminação por entropia (Information Gain)

A cada rodada:
1. Calcular, para cada pergunta possível ainda não feita, qual delas **melhor divide** o conjunto de plantas restantes (maximiza o ganho de informação / minimiza a entropia).
2. Fazer a pergunta que mais reduz a incerteza.
3. Atualizar o conjunto de candidatas com base na resposta.
4. Repetir até restar 1 planta ou até que a confiança seja alta o suficiente para um palpite.

### Fluxo de perguntas:

```
FASE 1 — Categóricas (múltipla escolha):
  → "Em qual bioma essa planta é encontrada?"  [Cerrado / Mata Atlântica / Ambos / Não sei]
  → "Qual o porte da planta?"  [Árvore / Arbusto / Herbácea / Trepadeira / Não sei]
  → "Para que ela é mais usada?"  [Anti-inflamatório / Cicatrizante / Calmante / Digestivo / Respiratório / Outro / Não sei]
  → "Qual parte da planta é usada?"  [Folha / Casca / Raiz / Fruto / Flor / Outra / Não sei]

FASE 2 — Booleanas (sim/não/não sei):
  → "Essa planta tem aroma forte?"
  → "Ela tem látex?"
  → "Ela tem espinhos?"
  → "As flores são vistosas?"
  → "O fruto é comestível?"
  → ...etc (selecionadas por entropia)
```

### Regras:
- **"Não sei"** é sempre uma opção — não elimina nada, apenas avança.
- Quando restar **1 planta**, mostrar o resultado com confiança alta.
- Quando restarem **2-3 plantas** e não houver mais perguntas discriminantes, mostrar um ranking com % de match.
- Se **0 plantas** restarem (contradição), fazer backtrack suave: "Hmm, nenhuma planta bateu exatamente. As mais próximas são..."

---

## UI/UX

### Direção estética: **Botanical Journal / Naturalista Científico**
Pense num caderno de campo de um naturalista do século XIX explorando Minas Gerais. Cores terrosas, tipografia serifada elegante, texturas de papel, ilustrações botânicas como referência visual.

### Paleta de cores:
- **Fundo:** creme/bege (#F5F0E8 ou similar, textura de papel sutil)
- **Texto principal:** marrom escuro (#3D2B1F)
- **Acento primário:** verde-folha (#4A7C59)
- **Acento secundário:** dourado/sépia (#B8860B)
- **Erro/alerta:** terracota (#C75B39)

### Tipografia:
- **Display/títulos:** Fonte serifada elegante (Playfair Display, Crimson Text, ou similar do Google Fonts)
- **Corpo:** Fonte serifada legível (Lora, Source Serif Pro)
- **Nomes científicos:** itálico, como convenção botânica

### Telas:

#### 1. Tela Inicial
- Título: "Herbário Vivo" (ou nome similar evocativo)
- Subtítulo: "Descubra qual planta medicinal de Minas Gerais você está pensando"
- Breve explicação (1-2 frases)
- Botão "Começar" estilizado
- Decoração: borda botânica sutil, ícone de folha/lupa

#### 2. Tela de Pergunta
- Contador de progresso (pergunta X, Y plantas restantes)
- Pergunta em destaque
- Opções como botões/cards tocáveis (mobile-first!)
- Opção "Não sei" sempre visível mas secundária
- Animação suave de transição entre perguntas
- Barra lateral ou indicador mostrando quantas plantas ainda são candidatas

#### 3. Tela de Resultado
- Nome popular grande e nome científico em itálico
- Família botânica
- Bioma com ícone/cor
- Lista de propriedades medicinais
- Curiosidade em destaque (tipo card especial)
- Botão "Jogar de novo"
- Botão "Ver todas as plantas" (abre catálogo)

#### 4. Tela de Catálogo (bonus)
- Grid/lista de todas as plantas
- Filtro por bioma
- Ao clicar, abre ficha completa da planta
- Útil como material de estudo

### Mobile-first:
- **Todo o design deve priorizar telas de celular** (a turma vai acessar pelo celular)
- Botões grandes, touch-friendly (mínimo 44px de altura)
- Sem hover-dependent interactions
- Scroll vertical quando necessário
- Testar em viewport de 375px (iPhone SE) até 428px (iPhone Pro Max)

---

## Micro-interações e Polish

- Transição suave entre perguntas (slide ou fade)
- Quando uma planta é eliminada, efeito sutil de "folha caindo" ou fade-out no contador
- Resultado aparece com reveal dramático (tipo Akinator quando adivinha)
- Confetti de folhas no acerto (sutil, não exagerado)
- Haptic feedback nos botões se possível (navigator.vibrate)

---

## Estrutura de Arquivos

```
herbario-vivo/
├── public/
│   └── images/          # imagens das plantas (adicionar depois)
├── src/
│   ├── data/
│   │   └── plants.json  # base de dados das plantas
│   ├── engine/
│   │   └── decision.js  # motor de decisão (entropia, eliminação)
│   ├── components/
│   │   ├── StartScreen.jsx
│   │   ├── QuestionScreen.jsx
│   │   ├── ResultScreen.jsx
│   │   ├── CatalogScreen.jsx
│   │   ├── PlantCard.jsx
│   │   └── ProgressBar.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css         # Tailwind + custom styles
├── index.html
├── tailwind.config.js
├── vite.config.js        # configurar base para GitHub Pages
├── package.json
└── README.md
```

---

## Deploy: GitHub Pages

- Configurar `vite.config.js` com `base: '/herbario-vivo/'` (nome do repo)
- Adicionar script no `package.json`:
  ```json
  "scripts": {
    "deploy": "vite build && gh-pages -d dist"
  }
  ```
- Instalar `gh-pages` como devDependency

---

## Checklist de Qualidade

- [ ] Todas as 15 plantas têm dados completos e verificáveis
- [ ] Motor de decisão converge em ≤8 perguntas na maioria dos casos
- [ ] "Não sei" funciona sem quebrar o fluxo
- [ ] Resultado mostra informações educativas completas
- [ ] Funciona bem em celular (testar responsividade)
- [ ] Deploy no GitHub Pages funciona
- [ ] Nomes científicos em itálico (convenção)
- [ ] Sem dependência de imagens para funcionar (imagens são bonus)
- [ ] Catálogo acessível como material de referência
- [ ] Código limpo, componentes bem separados

---

## Notas para o Claude Code

1. **Comece pelo `plants.json`** — é a fundação de tudo. Pesquise bem cada planta. Marque dados incertos com comentários.
2. **Depois o motor de decisão** (`decision.js`) — teste isoladamente que ele converge para cada planta em ≤8 perguntas.
3. **Depois a UI** — mobile-first, bonita, temática.
4. **Por último o deploy config** — GitHub Pages com Vite.
5. **Use `// VERIFICAR` em qualquer dado botânico que não tenha certeza.** O usuário vai revisar.