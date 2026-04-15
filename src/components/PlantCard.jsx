import { useState } from 'react';

const BIOMA_LABEL = {
  cerrado: 'Cerrado',
  mata_atlantica: 'Mata Atlântica',
  ambos: 'Cerrado e Mata Atlântica'
};

const PORTE_LABEL = {
  arvore: 'Árvore',
  arbusto: 'Arbusto',
  herbacea: 'Herbácea',
  trepadeira: 'Trepadeira'
};

function PlantImage({ plant }) {
  const [erro, setErro] = useState(false);
  if (!plant.imagem || erro) {
    return (
      <div className="flex h-48 w-full items-center justify-center rounded-xl border-2 border-dashed border-tinta/20 bg-papelEscuro/40 text-5xl text-tinta/40">
        🌿
      </div>
    );
  }
  const src = `${import.meta.env.BASE_URL}images/${plant.imagem}`;
  return (
    <img
      src={src}
      alt={plant.nomePopular[0]}
      onError={() => setErro(true)}
      className="h-48 w-full rounded-xl object-cover shadow-caderno"
      loading="lazy"
    />
  );
}

export default function PlantCard({ plant, compact = false }) {
  return (
    <article className={compact ? '' : 'card-paper'}>
      <div className="mb-4">
        <PlantImage plant={plant} />
      </div>

      <header>
        <h2 className="font-display text-3xl leading-tight text-tinta">
          {plant.nomePopular[0]}
        </h2>
        <p className="scientific text-folha">{plant.nomeCientifico}</p>
        <p className="mt-1 font-serif text-xs text-tinta/70">
          Família {plant.familia} • {PORTE_LABEL[plant.porte]} •{' '}
          {BIOMA_LABEL[plant.bioma]}
        </p>
      </header>

      {plant.nomePopular.length > 1 && (
        <p className="mt-3 font-serif text-sm text-tinta/80">
          Também conhecida como:{' '}
          <em>{plant.nomePopular.slice(1).join(', ')}</em>
        </p>
      )}

      <div className="mt-4">
        <p className="font-serif text-xs uppercase tracking-widest text-folha">
          Usos medicinais
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {plant.categoriaUso.map((c) => (
            <span key={c} className="chip">
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <p className="font-serif text-xs uppercase tracking-widest text-folha">
          Parte usada
        </p>
        <p className="font-serif text-sm text-tinta/90">
          {plant.parteUsada.join(', ')}
        </p>
      </div>

      <div className="mt-3">
        <p className="font-serif text-xs uppercase tracking-widest text-folha">
          Habitat
        </p>
        <p className="font-serif text-sm text-tinta/90">{plant.habitatEspecifico}</p>
      </div>

      {plant.principiosAtivos && (
        <div className="mt-4 rounded-xl border border-folha/30 bg-folha/5 p-4">
          <p className="font-serif text-xs uppercase tracking-widest text-folhaEscura">
            Fitoquímica — classes e princípios ativos
          </p>
          {plant.principiosAtivos.classes?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {plant.principiosAtivos.classes.map((c) => (
                <span
                  key={c}
                  className="inline-block rounded-full border border-folhaEscura/40 bg-papel px-3 py-1 text-xs font-serif text-folhaEscura"
                >
                  {c}
                </span>
              ))}
            </div>
          )}
          {plant.principiosAtivos.destaques?.length > 0 && (
            <ul className="mt-3 space-y-1 font-serif text-sm text-tinta/90">
              {plant.principiosAtivos.destaques.map((d) => (
                <li key={d} className="flex gap-2">
                  <span className="text-folha">•</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="mt-4 rounded-xl border-l-4 border-sepia bg-sepia/10 p-4">
        <p className="font-serif text-xs uppercase tracking-widest text-sepia">
          Do caderno de campo
        </p>
        <p className="mt-1 font-serif text-sm italic text-tinta">
          {plant.curiosidade}
        </p>
      </div>
    </article>
  );
}
