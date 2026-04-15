export default function ProgressBar({ questionCount, candidates, total }) {
  const pct = Math.max(0, Math.min(100, ((total - candidates) / total) * 100));
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between font-serif text-xs text-tinta/70">
        <span>Pergunta {questionCount + 1}</span>
        <span>
          {candidates} de {total} plantas restantes
        </span>
      </div>
      <div className="mt-1 h-1.5 w-full rounded-full bg-tinta/10">
        <div
          className="h-full rounded-full bg-folha transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
