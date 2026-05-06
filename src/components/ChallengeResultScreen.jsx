import { useMemo, useState } from 'react';
import PlantCard from './PlantCard.jsx';
import { getDivergences } from '../engine/decision.js';

function MiniPlant({ plant }) {
  return (
    <div>
      <p className="font-display text-lg leading-tight text-tinta">{plant.nomePopular[0]}</p>
      <p className="scientific text-sm text-folha">{plant.nomeCientifico}</p>
      <p className="mt-1 font-serif text-xs text-tinta/60">{plant.familia}</p>
    </div>
  );
}

const STATUS_STYLE = {
  correct: {
    border: 'border-folha/50',
    bg: 'bg-folha/10',
    badge: 'bg-folha text-papel',
    badgeText: 'bateu'
  },
  wrong: {
    border: 'border-terracota/60',
    bg: 'bg-terracota/10',
    badge: 'bg-terracota text-papel',
    badgeText: 'divergiu'
  },
  skipped: {
    border: 'border-sepia/40',
    bg: 'bg-sepia/10',
    badge: 'bg-sepia text-papel',
    badgeText: 'pulou'
  }
};

export default function ChallengeResultScreen({
  target,
  result,
  history,
  onReplay,
  onChooseAnother,
  onHome
}) {
  const [verFicha, setVerFicha] = useState(null);

  const palpite = result.plants[0];
  const acertou = result.status === 'solved' && palpite && palpite.id === target.id;
  const naFinal = result.plants.some((p) => p.id === target.id);

  const divergencias = useMemo(() => getDivergences(history, target), [history, target]);
  const totais = useMemo(() => {
    const t = { correct: 0, wrong: 0, skipped: 0 };
    for (const d of divergencias) t[d.status] += 1;
    return t;
  }, [divergencias]);

  if (verFicha) {
    return (
      <section className="fade-in">
        <button className="btn-ghost mb-4" onClick={() => setVerFicha(null)}>
          ← voltar à comparação
        </button>
        <PlantCard plant={verFicha} />
      </section>
    );
  }

  const tituloCor = acertou ? 'text-folha' : naFinal ? 'text-sepia' : 'text-terracota';
  const titulo = acertou
    ? 'O naturalista chegou na sua planta!'
    : naFinal
    ? 'Quase — sua planta apareceu no ranking, mas não foi o palpite final.'
    : 'Errou. O naturalista seguiu por outro caminho.';

  return (
    <section className="reveal">
      <p className="text-center font-mono text-xs uppercase tracking-widest text-folha">
        Modo Desafio
      </p>
      <h1 className={`mt-1 text-center font-display text-2xl leading-snug ${tituloCor}`}>
        {titulo}
      </h1>

      {/* Side by side comparison */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-folha/30 bg-papel/80 p-4 shadow-caderno">
          <p className="mb-2 font-serif text-xs uppercase tracking-widest text-folha">
            Sua planta
          </p>
          <MiniPlant plant={target} />
          <button
            className="mt-3 font-serif text-sm italic text-folha underline underline-offset-4"
            onClick={() => setVerFicha(target)}
          >
            ver ficha completa →
          </button>
        </div>

        {palpite && (
          <div
            className={`rounded-2xl border p-4 shadow-caderno ${
              acertou ? 'border-folha/30 bg-folha/10' : 'border-terracota/40 bg-terracota/5'
            }`}
          >
            <p
              className={`mb-2 font-serif text-xs uppercase tracking-widest ${
                acertou ? 'text-folha' : 'text-terracota'
              }`}
            >
              Palpite do naturalista
            </p>
            <MiniPlant plant={palpite} />
            {palpite._matchPct != null && !acertou && (
              <p className="mt-2 font-serif text-xs text-tinta/60">
                {palpite._matchPct}% de compatibilidade com suas respostas
              </p>
            )}
            {!acertou && palpite.id !== target.id && (
              <button
                className="mt-3 font-serif text-sm italic text-terracota underline underline-offset-4"
                onClick={() => setVerFicha(palpite)}
              >
                ver ficha completa →
              </button>
            )}
          </div>
        )}
      </div>

      {/* Summary line */}
      <div className="mt-5 flex flex-wrap justify-center gap-2 font-serif text-xs">
        <span className="rounded-full bg-folha/15 px-3 py-1 text-folhaEscura">
          {totais.correct} bateram
        </span>
        <span className="rounded-full bg-terracota/15 px-3 py-1 text-terracota">
          {totais.wrong} divergiram
        </span>
        <span className="rounded-full bg-sepia/15 px-3 py-1 text-sepia">
          {totais.skipped} puladas
        </span>
      </div>

      {/* Divergences list */}
      <div className="mt-6">
        <h2 className="font-display text-xl text-tinta">
          Comparando suas respostas
        </h2>
        <p className="font-serif text-sm italic text-tinta/70">
          Cada pergunta da rodada × o que seria correto para a {target.nomePopular[0]}.
        </p>

        <ul className="mt-4 space-y-3">
          {divergencias.map((d, i) => {
            const s = STATUS_STYLE[d.status];
            return (
              <li
                key={i}
                className={`rounded-xl border ${s.border} ${s.bg} p-4 shadow-caderno`}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-serif text-sm text-tinta">{d.texto}</p>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${s.badge}`}
                  >
                    {s.badgeText}
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3 font-serif text-sm">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-tinta/50">
                      Você disse
                    </p>
                    <p className="mt-0.5 text-tinta">{d.userLabel}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-tinta/50">
                      O correto era
                    </p>
                    <p className="mt-0.5 text-tinta">{d.correctLabel}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-8 space-y-3">
        <button className="btn-primary" onClick={onReplay}>
          Tentar de novo com a {target.nomePopular[0]}
        </button>
        <button className="btn-option" onClick={onChooseAnother}>
          Escolher outra planta
        </button>
        <button className="btn-ghost" onClick={onHome}>
          ← voltar ao início
        </button>
      </div>
    </section>
  );
}
