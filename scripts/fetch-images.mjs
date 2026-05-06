import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const ROOT = new URL('..', import.meta.url);
const PLANTS_PATH = new URL('src/data/plants.json', ROOT);
const OUT_DIR = new URL('public/images/', ROOT);
const CREDITS_PATH = new URL('public/images/CREDITS.md', ROOT);

const UA = 'HerbarioVivo/1.0 (https://github.com/v-rogana/Akinator_plantamedicinal; educational)';
const TARGET_SIZE = 640;
const QUALITY = 82;

mkdirSync(OUT_DIR, { recursive: true });

const plants = JSON.parse(readFileSync(PLANTS_PATH, 'utf8'));

function fetchJSON(url) {
  return fetch(url, { headers: { 'User-Agent': UA, 'Accept': 'application/json' } }).then((r) => r.json());
}

function stripHTML(s) {
  return (s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

async function searchCommons(query) {
  // search files with the scientific name; bias toward jpg/png photos
  const url =
    'https://commons.wikimedia.org/w/api.php?action=query&format=json&list=search' +
    `&srsearch=${encodeURIComponent(query + ' filetype:bitmap')}` +
    '&srnamespace=6&srlimit=10';
  const data = await fetchJSON(url);
  return data?.query?.search?.map((r) => r.title) || [];
}

async function getImageInfo(title) {
  const url =
    'https://commons.wikimedia.org/w/api.php?action=query&format=json' +
    `&titles=${encodeURIComponent(title)}` +
    '&prop=imageinfo&iiprop=url|extmetadata|size|mime' +
    `&iiurlwidth=${TARGET_SIZE * 2}`;
  const data = await fetchJSON(url);
  const pages = data?.query?.pages || {};
  const page = Object.values(pages)[0];
  return page?.imageinfo?.[0] || null;
}

function isAcceptable(info) {
  if (!info) return false;
  if (!info.mime || !/^image\/(jpeg|png|webp)$/.test(info.mime)) return false;
  if (info.width < 400 || info.height < 400) return false;
  const ratio = info.width / info.height;
  if (ratio < 0.5 || ratio > 2.0) return false;
  return true;
}

async function downloadAndConvert(url, outFile) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await sharp(buf)
    .resize(TARGET_SIZE, TARGET_SIZE, { fit: 'cover', position: 'center' })
    .webp({ quality: QUALITY })
    .toFile(outFile);
}

const credits = [
  '# Créditos de Imagens',
  '',
  'Imagens baixadas automaticamente do Wikimedia Commons via `npm run fetch:images`.',
  'Cada arquivo abaixo lista a fonte original, autor e licença.',
  ''
];
const failures = [];

for (const plant of plants) {
  const target = new URL(`${plant.id}.webp`, OUT_DIR);
  const targetPath = target.pathname.replace(/^\/([A-Z]:)/, '$1');

  if (existsSync(target)) {
    console.log(`= ${plant.id} (já existe, pulando)`);
    continue;
  }

  try {
    const candidates = await searchCommons(plant.nomeCientifico);
    if (candidates.length === 0) {
      console.error(`x ${plant.id}: nenhum resultado para "${plant.nomeCientifico}"`);
      failures.push({ id: plant.id, reason: 'sem resultados' });
      continue;
    }

    let chosen = null;
    let chosenInfo = null;
    for (const title of candidates) {
      const info = await getImageInfo(title);
      if (isAcceptable(info)) {
        chosen = title;
        chosenInfo = info;
        break;
      }
      await new Promise((r) => setTimeout(r, 100));
    }

    if (!chosen) {
      console.error(`x ${plant.id}: nenhuma imagem aceitável (verifique manualmente)`);
      failures.push({ id: plant.id, reason: 'sem imagem aceitável', candidates: candidates.slice(0, 3) });
      continue;
    }

    const dlUrl = chosenInfo.thumburl || chosenInfo.url;
    await downloadAndConvert(dlUrl, targetPath);

    const meta = chosenInfo.extmetadata || {};
    const author = stripHTML(meta.Artist?.value) || 'desconhecido';
    const license = stripHTML(meta.LicenseShortName?.value) || 'ver fonte';
    const desc = chosenInfo.descriptionurl || `https://commons.wikimedia.org/wiki/${encodeURIComponent(chosen)}`;

    credits.push(`## ${plant.nomePopular[0]} (${plant.id})`);
    credits.push(`- *${plant.nomeCientifico}*`);
    credits.push(`- Arquivo: \`${plant.id}.webp\``);
    credits.push(`- Fonte: ${desc}`);
    credits.push(`- Autor: ${author}`);
    credits.push(`- Licença: ${license}`);
    credits.push('');

    console.log(`+ ${plant.id}: ${chosen} (${license})`);
    await new Promise((r) => setTimeout(r, 250));
  } catch (e) {
    console.error(`x ${plant.id}: erro ${e.message}`);
    failures.push({ id: plant.id, reason: e.message });
  }
}

writeFileSync(CREDITS_PATH, credits.join('\n'));

console.log(`\nConcluído. ${plants.length - failures.length}/${plants.length} imagens.`);
if (failures.length) {
  console.error('\nFALHAS (precisam de seleção manual):');
  for (const f of failures) {
    console.error(`  - ${f.id}: ${f.reason}`);
    if (f.candidates) for (const c of f.candidates) console.error(`      candidato: ${c}`);
  }
}
