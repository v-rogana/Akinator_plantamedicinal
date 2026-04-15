import plantsData from '../data/plants.json';

const BIOMA_OPTIONS = [
  { id: 'cerrado', label: 'Cerrado' },
  { id: 'mata_atlantica', label: 'Mata Atlântica' }
];

const PORTE_OPTIONS = [
  { id: 'arvore', label: 'Árvore' },
  { id: 'arbusto', label: 'Arbusto' },
  { id: 'herbacea', label: 'Herbácea' },
  { id: 'trepadeira', label: 'Trepadeira' }
];

const BOOL_META = {
  aromaForte: 'Ela tem aroma forte quando você esfrega as folhas?',
  latex: 'Ela solta látex (seiva leitosa) quando cortada?',
  espinhos: 'Ela tem espinhos ou acúleos?',
  flores_vistosas: 'As flores são vistosas, grandes ou coloridas?',
  frutoComestivel: 'O fruto é comestível ou aproveitado na culinária?',
  folhasCompostas: 'As folhas são compostas (divididas em folíolos)?',
  usoCha: 'É tradicionalmente preparada como chá?',
  usoTopico: 'É usada topicamente (cataplasma, pomada, banho)?',
  sabor_amargo: 'Tem sabor nitidamente amargo?'
};

const PARTE_LABELS = {
  folha: 'folha',
  raiz: 'raiz',
  casca: 'casca',
  fruto: 'fruto',
  flor: 'flor',
  semente: 'semente',
  resina: 'resina',
  planta_inteira: 'planta inteira'
};

const CAT_LABELS = {
  'anti-inflamatorio': 'anti-inflamatório',
  cicatrizante: 'cicatrizante',
  calmante: 'calmante',
  digestivo: 'digestivo',
  respiratorio: 'respiratório',
  analgesico: 'analgésico',
  antisseptico: 'antisséptico',
  'febrífugo': 'febrífugo',
  hepatoprotetor: 'hepatoprotetor',
  diuretico: 'diurético'
};

function buildQuestions() {
  const qs = [];

  qs.push({
    id: 'bioma',
    tipo: 'single',
    phase: 1,
    texto: 'Em qual bioma essa planta é encontrada?',
    opcoes: BIOMA_OPTIONS,
    match: (p, ans) => p.bioma === ans || p.bioma === 'ambos'
  });

  qs.push({
    id: 'porte',
    tipo: 'single',
    phase: 1,
    texto: 'Qual é o porte da planta?',
    opcoes: PORTE_OPTIONS,
    match: (p, ans) => p.porte === ans
  });

  for (const cat of Object.keys(CAT_LABELS)) {
    qs.push({
      id: `cat:${cat}`,
      tipo: 'bool',
      phase: 1,
      texto: `Ela é usada como ${CAT_LABELS[cat]}?`,
      match: (p, ans) =>
        ans === 'sim' ? p.categoriaUso.includes(cat) : !p.categoriaUso.includes(cat)
    });
  }

  for (const parte of Object.keys(PARTE_LABELS)) {
    qs.push({
      id: `parte:${parte}`,
      tipo: 'bool',
      phase: 1,
      texto: `A parte usada inclui a ${PARTE_LABELS[parte]}?`,
      match: (p, ans) =>
        ans === 'sim' ? p.parteUsada.includes(parte) : !p.parteUsada.includes(parte)
    });
  }

  for (const k of Object.keys(BOOL_META)) {
    qs.push({
      id: `bool:${k}`,
      tipo: 'bool',
      phase: 2,
      texto: BOOL_META[k],
      match: (p, ans) =>
        ans === 'sim' ? p.caracteristicas[k] === true : p.caracteristicas[k] === false
    });
  }

  return qs;
}

const ALL_QUESTIONS = buildQuestions();

function entropy(n) {
  return n <= 1 ? 0 : Math.log2(n);
}

function expectedEntropy(q, candidates) {
  if (q.tipo === 'single') {
    const answers = q.opcoes.map((o) => o.id);
    let total = 0;
    for (const a of answers) {
      const sub = candidates.filter((p) => q.match(p, a));
      total += entropy(sub.length);
    }
    return total / answers.length;
  }
  const yes = candidates.filter((p) => q.match(p, 'sim'));
  const no = candidates.filter((p) => q.match(p, 'nao'));
  return 0.5 * entropy(yes.length) + 0.5 * entropy(no.length);
}

function findQuestion(id) {
  return ALL_QUESTIONS.find((q) => q.id === id);
}

export function createGame(plants = plantsData) {
  return {
    allPlants: plants,
    candidates: plants.slice(),
    asked: new Set(),
    history: [],
    questionCount: 0
  };
}

export function getNextQuestion(state) {
  if (state.candidates.length <= 1) return null;
  if (state.questionCount >= 10) return null;

  const baseH = entropy(state.candidates.length);
  let best = null;
  let bestScore = -Infinity;

  for (const q of ALL_QUESTIONS) {
    if (state.asked.has(q.id)) continue;
    const eh = expectedEntropy(q, state.candidates);
    const gain = baseH - eh;
    if (gain <= 1e-9) continue;
    const score = gain - q.phase * 1e-4;
    if (score > bestScore) {
      bestScore = score;
      best = q;
    }
  }

  if (!best) return null;

  const opcoes =
    best.tipo === 'single'
      ? [...best.opcoes, { id: 'nao_sei', label: 'Não sei' }]
      : [
          { id: 'sim', label: 'Sim' },
          { id: 'nao', label: 'Não' },
          { id: 'nao_sei', label: 'Não sei' }
        ];

  return {
    id: best.id,
    tipo: best.tipo,
    texto: best.texto,
    opcoes,
    phase: best.phase
  };
}

export function answer(state, questionId, ans) {
  const q = findQuestion(questionId);
  const asked = new Set(state.asked);
  asked.add(questionId);
  const history = [...state.history, { questionId, ans }];
  let candidates = state.candidates;
  if (ans !== 'nao_sei') {
    candidates = candidates.filter((p) => q.match(p, ans));
  }
  return {
    ...state,
    asked,
    history,
    candidates,
    questionCount: state.questionCount + 1
  };
}

function scoreAgainstHistory(plant, history) {
  let matches = 0;
  let total = 0;
  for (const { questionId, ans } of history) {
    if (ans === 'nao_sei') continue;
    const q = findQuestion(questionId);
    total += 1;
    if (q.match(plant, ans)) matches += 1;
  }
  return total === 0 ? 1 : matches / total;
}

export function getResult(state) {
  if (state.candidates.length === 1) {
    return { status: 'solved', plants: [{ ...state.candidates[0], _matchPct: 100 }] };
  }
  if (state.candidates.length === 0) {
    const scored = state.allPlants
      .map((p) => ({ plant: p, score: scoreAgainstHistory(p, state.history) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((s) => ({ ...s.plant, _matchPct: Math.round(s.score * 100) }));
    return { status: 'empty', plants: scored };
  }
  const scored = state.candidates
    .map((p) => ({ plant: p, score: scoreAgainstHistory(p, state.history) }))
    .sort((a, b) => b.score - a.score)
    .map((s) => ({ ...s.plant, _matchPct: Math.round(s.score * 100) }));
  return { status: 'ranking', plants: scored };
}

export function shouldStop(state) {
  if (state.candidates.length <= 1) return true;
  if (state.questionCount >= 10) return true;
  return getNextQuestion(state) === null;
}

export function __selfTest() {
  const results = [];
  for (const target of plantsData) {
    let state = createGame(plantsData);
    let steps = 0;
    while (!shouldStop(state) && steps < 15) {
      const q = getNextQuestion(state);
      if (!q) break;
      const meta = findQuestion(q.id);
      let ans;
      if (q.tipo === 'single') {
        const matchingOpt = q.opcoes.find(
          (o) => o.id !== 'nao_sei' && meta.match(target, o.id)
        );
        ans = matchingOpt ? matchingOpt.id : 'nao_sei';
      } else {
        ans = meta.match(target, 'sim') ? 'sim' : 'nao';
      }
      state = answer(state, q.id, ans);
      steps += 1;
    }
    const res = getResult(state);
    const ok = res.status === 'solved' && res.plants[0].id === target.id;
    results.push({ target: target.id, steps, status: res.status, ok });
  }
  return results;
}
