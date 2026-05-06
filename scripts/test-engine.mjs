import { __selfTest } from '../src/engine/decision.js';
import { readFileSync } from 'node:fs';

const r = __selfTest();
const fails = r.filter((x) => !x.ok);

console.table(
  r.map(({ target, steps, status, ok }) => ({ target, steps, status, ok }))
);

console.log(`\n${r.length - fails.length}/${r.length} resolvidas`);
console.log(`média de passos: ${(r.reduce((a, x) => a + x.steps, 0) / r.length).toFixed(2)}`);
console.log(`máx de passos:  ${Math.max(...r.map((x) => x.steps))}`);

const plants = JSON.parse(
  readFileSync(new URL('../src/data/plants.json', import.meta.url), 'utf8')
);

const PARTES = ['folha', 'raiz', 'casca', 'fruto', 'flor', 'semente', 'resina', 'planta_inteira'];
const CATS = ['anti-inflamatorio', 'cicatrizante', 'calmante', 'digestivo', 'respiratorio', 'analgesico', 'antisseptico', 'febrífugo', 'hepatoprotetor', 'diuretico'];
const QUIMS = ['taninos', 'flavonoides', 'alcaloides', 'oleos_essenciais', 'saponinas', 'cumarinas', 'mucilagens', 'naftoquinonas', 'glicosideos', 'terpenos', 'iridoides', 'fenois_simples'];
const BOOLS = ['aromaForte', 'latex', 'espinhos', 'flores_vistosas', 'frutoComestivel', 'folhasCompostas', 'usoCha', 'usoTopico', 'sabor_amargo'];

function fingerprint(p) {
  const parts = [];
  parts.push('bioma:' + p.bioma);
  parts.push('porte:' + p.porte);
  for (const c of CATS) parts.push('c:' + c + '=' + (p.categoriaUso.includes(c) ? '1' : '0'));
  for (const x of PARTES) parts.push('p:' + x + '=' + (p.parteUsada.includes(x) ? '1' : '0'));
  for (const b of BOOLS) parts.push('b:' + b + '=' + (p.caracteristicas[b] ? '1' : '0'));
  for (const q of QUIMS) parts.push('q:' + q + '=' + ((p.classesQuimicas || []).includes(q) ? '1' : '0'));
  return parts.join('|');
}

const groups = new Map();
for (const p of plants) {
  const fp = fingerprint(p);
  if (!groups.has(fp)) groups.set(fp, []);
  groups.get(fp).push(p.id);
}

const dupes = [...groups.values()].filter((g) => g.length > 1);
if (dupes.length) {
  console.error('\nVETORES IDÊNTICOS (impossível distinguir):');
  for (const g of dupes) console.error('  - ' + g.join(', '));
} else {
  console.log('\nNenhum par de plantas com vetor idêntico ✓');
}

if (fails.length) {
  console.error('\nFALHAS:');
  for (const f of fails) console.error(`  - ${f.target} (status=${f.status}, steps=${f.steps})`);
  process.exit(1);
}
