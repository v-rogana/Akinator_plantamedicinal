import ProgressBar from './ProgressBar.jsx';
import plantsData from '../data/plants.json';

function vibrate() {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(10);
  }
}

export default function QuestionScreen({ question, state, onAnswer, onRestart }) {
  const principais = question.opcoes.filter((o) => o.id !== 'nao_sei');
  const naoSei = question.opcoes.find((o) => o.id === 'nao_sei');

  const handle = (id) => {
    vibrate();
    onAnswer(id);
  };

  return (
    <section className="fade-in" key={question.id}>
      <ProgressBar
        questionCount={state.questionCount}
        candidates={state.candidates.length}
        total={plantsData.length}
      />
      <div className="card-paper">
        <p className="mb-1 font-serif text-xs uppercase tracking-widest text-folha">
          {question.phase === 1 ? 'Caracterização' : 'Detalhes botânicos'}
        </p>
        <h2 className="font-display text-2xl leading-snug text-tinta sm:text-3xl">
          {question.texto}
        </h2>
      </div>

      <div className="mt-5 space-y-3">
        {principais.map((o) => (
          <button key={o.id} className="btn-option" onClick={() => handle(o.id)}>
            {o.label}
          </button>
        ))}
        {naoSei && (
          <button className="btn-ghost" onClick={() => handle('nao_sei')}>
            Não sei / pular
          </button>
        )}
      </div>

      <button className="btn-ghost mt-6" onClick={onRestart}>
        ← recomeçar
      </button>
    </section>
  );
}
