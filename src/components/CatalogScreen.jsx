import { useMemo, useState } from 'react';
import PlantCard from './PlantCard.jsx';

const FILTROS = [
  { id: 'todos', label: 'Todas' },
  { id: 'cerrado', label: 'Cerrado' },
  { id: 'mata_atlantica', label: 'Mata Atlântica' }
];

export default function CatalogScreen({ plants, onBack }) {
  const [filtro, setFiltro] = useState('todos');
  const [selecionada, setSelecionada] = useState(null);

  const lista = useMemo(() => {
    if (filtro === 'todos') return plants;
    return plants.filter((p) => p.bioma === filtro || p.bioma === 'ambos');
  }, [plants, filtro]);

  if (selecionada) {
    return (
      <section className="fade-in">
        <button className="btn-ghost mb-4" onClick={() => setSelecionada(null)}>
          ← voltar ao catálogo
        </button>
        <PlantCard plant={selecionada} />
      </section>
    );
  }

  return (
    <section className="fade-in">
      <button className="btn-ghost mb-4" onClick={onBack}>
        ← voltar ao início
      </button>
      <h1 className="font-display text-3xl text-tinta">Catálogo</h1>
      <p className="font-serif italic text-tinta/70">
        {plants.length} plantas medicinais de Minas Gerais
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {FILTROS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFiltro(f.id)}
            className={`rounded-full border px-3 py-1 font-serif text-sm transition ${
              filtro === f.id
                ? 'border-folha bg-folha text-papel'
                : 'border-tinta/20 bg-papel text-tinta/80'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {lista.map((p) => (
          <li key={p.id}>
            <button
              onClick={() => setSelecionada(p)}
              className="w-full rounded-xl border border-tinta/15 bg-papel p-4 text-left shadow-caderno transition active:scale-[0.98] hover:border-folha"
            >
              <p className="font-display text-lg text-tinta">
                {p.nomePopular[0]}
              </p>
              <p className="scientific text-sm text-folha">{p.nomeCientifico}</p>
              <p className="mt-1 font-serif text-xs text-tinta/60">
                {p.familia}
              </p>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
