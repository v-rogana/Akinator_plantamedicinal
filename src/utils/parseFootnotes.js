export function parseFootnotes(text) {
  if (!text) return [];
  const parts = [];
  const regex = /\[(\d+)\]/g;
  let lastIdx = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      parts.push({ type: 'text', value: text.slice(lastIdx, match.index) });
    }
    parts.push({ type: 'ref', n: parseInt(match[1], 10) });
    lastIdx = regex.lastIndex;
  }
  if (lastIdx < text.length) {
    parts.push({ type: 'text', value: text.slice(lastIdx) });
  }
  return parts;
}

export function formatReferencia(ref) {
  const partes = [];
  if (ref.autores) partes.push(ref.autores);
  if (ref.ano) partes.push(`(${ref.ano})`);
  let cabeca = partes.join(' ');
  if (cabeca && ref.titulo) cabeca += '. ';
  cabeca += ref.titulo || '';
  if (ref.fonte) cabeca += `. ${ref.fonte}`;
  return cabeca.trim();
}
