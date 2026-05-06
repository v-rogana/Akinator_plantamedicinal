import { useMemo } from 'react';
import { formatReferencia } from '../utils/parseFootnotes.js';

export default function ReferencesScreen({ plants, onBack }) {
  const { referencias, ordenadas } = useMemo(() => {
    const map = new Map();
    for (const p of plants) {
      if (!p.referencias) continue;
      for (const ref of p.referencias) {
        const chave = ref.id || `${ref.titulo || ''}|${ref.ano || ''}`;
        const existente = map.get(chave);
        if (existente) {
          existente.plantas.push({ id: p.id, nome: p.nomePopular[0] });
        } else {
          map.set(chave, { ref, plantas: [{ id: p.id, nome: p.nomePopular[0] }] });
        }
      }
    }
    const arr = Array.from(map.values());
    arr.sort((a, b) => {
      const ax = (a.ref.autores || a.ref.titulo || '').toLowerCase();
      const bx = (b.ref.autores || b.ref.titulo || '').toLowerCase();
      return ax.localeCompare(bx);
    });
    return { referencias: map, ordenadas: arr };
  }, [plants]);

  const semReferencia = plants.filter((p) => !p.referencias || p.referencias.length === 0);

  return (
    <section className="fade-in">
      <button className="btn-ghost mb-4" onClick={onBack}>
        ← voltar ao início
      </button>
      <h1 className="font-display text-3xl text-tinta">Referências</h1>
      <p className="mt-1 font-serif italic text-tinta/80">
        Fontes utilizadas no caderno de campo deste herbário.
      </p>
      <p className="mt-2 font-serif text-sm text-tinta/70">
        Apenas afirmações com fonte verificável (ANVISA, OMS, periódicos
        científicos, livros consagrados de etnobotânica) foram mantidas.
        {ordenadas.length > 0 && (
          <>
            {' '}Ao todo, {ordenadas.length}{' '}
            {ordenadas.length === 1 ? 'referência única' : 'referências únicas'}.
          </>
        )}
      </p>

      {ordenadas.length === 0 && (
        <div className="mt-6 rounded-xl border border-sepia/40 bg-sepia/10 p-4">
          <p className="font-serif text-sm text-tinta">
            Nenhuma referência cadastrada ainda. Conforme as fontes forem sendo
            verificadas e adicionadas a cada planta, elas aparecerão aqui
            agregadas.
          </p>
        </div>
      )}

      {ordenadas.length > 0 && (
        <ol className="mt-5 space-y-4">
          {ordenadas.map(({ ref, plantas }, i) => (
            <li
              key={ref.id || i}
              className="rounded-xl border border-tinta/15 bg-papel p-4 shadow-caderno"
            >
              <div className="flex gap-2">
                <span className="font-mono text-sm text-folha">[{i + 1}]</span>
                <div className="flex-1">
                  <p className="font-serif text-sm text-tinta leading-snug">
                    {formatReferencia(ref)}
                  </p>
                  {ref.url && (
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block break-all font-serif text-xs text-folha underline underline-offset-2"
                    >
                      {ref.url}
                    </a>
                  )}
                  <p className="mt-2 font-serif text-xs text-tinta/60">
                    Citada em:{' '}
                    {plantas.map((pl, j) => (
                      <span key={pl.id}>
                        <em>{pl.nome}</em>
                        {j < plantas.length - 1 && ', '}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}

      {semReferencia.length > 0 && (
        <div className="mt-8 rounded-xl border border-sepia/40 bg-sepia/5 p-4">
          <p className="font-serif text-xs uppercase tracking-widest text-sepia">
            Plantas sem referências cadastradas
          </p>
          <p className="mt-1 font-serif text-sm text-tinta/80">
            As curiosidades destas plantas ainda não passaram pela curadoria de
            fontes — as informações exibidas devem ser tratadas como provisórias:
          </p>
          <p className="mt-2 font-serif text-sm italic text-tinta/70">
            {semReferencia.map((p) => p.nomePopular[0]).join(' · ')}
          </p>
        </div>
      )}
    </section>
  );
}
