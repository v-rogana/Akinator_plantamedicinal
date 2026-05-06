export default function StartScreen({
  onStart,
  onCatalog,
  onChallenge,
  onReferences,
  total
}) {
  return (
    <section className="fade-in flex min-h-[80vh] flex-col items-center justify-center text-center">
      <div className="mb-4 text-5xl">🌿</div>
      <h1 className="font-display text-4xl sm:text-5xl font-bold text-tinta">
        Herbário Vivo
      </h1>
      <p className="mt-3 font-serif italic text-tinta/80">
        das plantas medicinais de Minas Gerais
      </p>
      <div className="mx-auto my-6 h-[2px] w-24 bg-folha/50" />
      <p className="max-w-sm font-serif text-tinta/90">
        Pense em uma planta medicinal mineira. Responda a algumas perguntas e
        deixe que eu a descubra — como um naturalista em campo, pergunta a
        pergunta.
      </p>
      <div className="mt-8 w-full max-w-sm space-y-3">
        <button className="btn-primary" onClick={onStart}>
          Começar a adivinhação
        </button>
        <button className="btn-option" onClick={onChallenge}>
          🎯 Modo Desafio — escolha a planta-alvo
        </button>
        <button className="btn-ghost" onClick={onCatalog}>
          Ver catálogo das {total} plantas
        </button>
        <button className="btn-ghost" onClick={onReferences}>
          Referências bibliográficas
        </button>
      </div>
      <p className="mt-4 max-w-sm font-serif text-xs italic text-tinta/60">
        No Desafio você escolhe uma planta em segredo, responde como se ela
        estivesse na sua cabeça e vê se o naturalista chega na mesma.
      </p>
    </section>
  );
}
