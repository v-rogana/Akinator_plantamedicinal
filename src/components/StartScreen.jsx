import { Sprig, Lens, Divider, Book, Compass } from './Icons.jsx';

export default function StartScreen({
  onStart,
  onCatalog,
  onChallenge,
  onReferences,
  total
}) {
  const deckHref = `${import.meta.env.BASE_URL}apresentacao.html`;
  return (
    <section className="fade-in flex min-h-[80vh] flex-col items-center justify-center text-center">
      <div className="mb-2 text-folha">
        <Sprig size={88} />
      </div>
      <h1 className="font-display text-4xl sm:text-5xl font-normal tracking-tight text-tinta">
        Herbário Vivo
      </h1>
      <p className="mt-2 font-serif italic text-tintaSuave">
        das plantas medicinais de Minas Gerais
      </p>
      <div className="my-5 text-folha/60">
        <Divider width={200} />
      </div>
      <p className="max-w-sm font-sans text-[0.95rem] leading-relaxed text-tinta/85">
        Pense em uma planta medicinal mineira. Responda a algumas perguntas e
        deixe que o naturalista a descubra, pergunta a pergunta.
      </p>
      <div className="mt-7 w-full max-w-sm space-y-3">
        <button className="btn-primary" onClick={onStart}>
          Começar a adivinhação
        </button>
        <button className="btn-option flex items-center gap-3" onClick={onChallenge}>
          <span className="text-folha"><Lens size={20} /></span>
          <span>Modo Desafio — escolha a planta-alvo</span>
        </button>
        <button className="btn-ghost inline-flex items-center justify-center gap-2" onClick={onCatalog}>
          <Compass size={16} />
          <span>Ver catálogo das {total} plantas</span>
        </button>
        <button className="btn-ghost inline-flex items-center justify-center gap-2" onClick={onReferences}>
          <Book size={16} />
          <span>Referências bibliográficas</span>
        </button>
        <a className="btn-ghost inline-flex items-center justify-center gap-2" href={deckHref}>
          <span>Como funciona · apresentação</span>
        </a>
      </div>
      <p className="mt-5 max-w-sm font-serif text-xs italic text-tinta/55">
        No Desafio você escolhe uma planta em segredo, responde como se ela
        estivesse na sua cabeça e vê se o naturalista chega na mesma.
      </p>
    </section>
  );
}
