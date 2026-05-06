import { useMemo, useState } from 'react';

function normalize(s) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

export default function ChallengeSelectScreen({ plants, onPick, onBack }) {
  const [busca, setBusca] = useState('');

  const lista = useMemo(() => {
    const q = normalize(busca.trim());
    if (!q) return plants;
    return plants.filter((p) => {
      const alvo = [p.nomeCientifico, ...p.nomePopular, p.familia].map(normalize).join(' ');
      return alvo.includes(q);
    });
  }, [plants, busca]);

  return (
    <section className="fade-in">
      <button className="btn-ghost mb-4" onClick={onBack}>
        ← voltar ao início
      </button>
      <h1 className="font-display text-3xl text-tinta">Modo Desafio</h1>
      <p className="mt-1 font-serif italic text-tinta/80">
        Escolha uma planta secretamente e veja se o naturalista chega até ela.
      </p>
      <p className="mt-2 font-serif text-sm text-tinta/70">
        Você responderá às perguntas pensando nessa planta. No fim, comparamos
        o que você descreveu com o palpite final.
      </p>

      <input
        type="text"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Buscar por nome popular, científico ou família…"
        className="mt-5 w-full rounded-xl border-2 border-tinta/20 bg-papel px-4 py-3 font-serif text-tinta shadow-caderno focus:border-folha focus:outline-none"
      />

      <p className="mt-3 font-serif text-xs uppercase tracking-widest text-folha">
        {lista.length} {lista.length === 1 ? 'planta' : 'plantas'}
      </p>

      <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {lista.map((p) => (
          <li key={p.id}>
            <button
              onClick={() => onPick(p)}
              className="w-full rounded-xl border border-tinta/15 bg-papel p-4 text-left shadow-caderno transition active:scale-[0.98] hover:border-folha"
            >
              <p className="font-display text-lg text-tinta">{p.nomePopular[0]}</p>
              <p className="scientific text-sm text-folha">{p.nomeCientifico}</p>
              <p className="mt-1 font-serif text-xs text-tinta/60">{p.familia}</p>
            </button>
          </li>
        ))}
      </ul>

      {lista.length === 0 && (
        <p className="mt-6 text-center font-serif italic text-tinta/60">
          Nenhuma planta encontrada com esse termo.
        </p>
      )}
    </section>
  );
}
