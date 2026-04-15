import PlantCard from './PlantCard.jsx';

export default function ResultScreen({ result, onRestart, onCatalog }) {
  const { status, plants } = result;

  return (
    <section className="reveal">
      {status === 'solved' && (
        <>
          <p className="text-center font-serif italic text-folha">
            Encontrei! Sua planta deve ser…
          </p>
          <div className="mt-3">
            <PlantCard plant={plants[0]} />
          </div>
        </>
      )}

      {status === 'ranking' && (
        <>
          <p className="text-center font-serif italic text-sepia">
            Faltam pistas para decidir. Os palpites mais prováveis são:
          </p>
          <div className="mt-3 space-y-4">
            {plants.slice(0, 3).map((p) => (
              <div key={p.id}>
                <p className="mb-1 text-right font-serif text-xs text-folha">
                  {p._matchPct}% de compatibilidade
                </p>
                <PlantCard plant={p} />
              </div>
            ))}
          </div>
        </>
      )}

      {status === 'empty' && (
        <>
          <p className="text-center font-serif italic text-terracota">
            Nenhuma planta bateu exatamente. As mais próximas do que você
            descreveu foram:
          </p>
          <div className="mt-3 space-y-4">
            {plants.map((p) => (
              <div key={p.id}>
                <p className="mb-1 text-right font-serif text-xs text-sepia">
                  {p._matchPct}% de compatibilidade
                </p>
                <PlantCard plant={p} />
              </div>
            ))}
          </div>
        </>
      )}

      <div className="mt-8 space-y-3">
        <button className="btn-primary" onClick={onRestart}>
          Jogar de novo
        </button>
        <button className="btn-ghost" onClick={onCatalog}>
          Ver catálogo completo
        </button>
      </div>
    </section>
  );
}
