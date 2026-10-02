// Builder library: returns API S. Called as new Function('BRIEF', src)(briefText)
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const IC = 'font-family:var(--mono);font-size:0.86em;background:#ECECE8;border-radius:8px;padding:0.04em 0.24em;color:var(--ink)';
function md(s){
  if (s == null) return '';
  return esc(s)
    .replace(/`([^`]+)`/g, (m,c)=>`<code style="${IC}">${c.replace(/\*/g,'&#42;')}</code>`)
    .replace(/\*\*([^*]+)\*\*/g,'<strong style="font-weight:700">$1</strong>')
    .replace(/\*([^*]+)\*/g,'<em>$1</em>');
}
// ---------- brief parsing ----------
const SEC = {};
BRIEF.split(/^### Слайд /m).slice(1).forEach(part => {
  const n = parseInt(part, 10);
  const defs = [];
  part.replace(/\*\*\[ОПРЕДЕЛЕНИЕ · (?:книга, с\. (\d+)|курс)\]:\*\* (.+)$/gm, (m, p, t) => { defs.push({ page: p || null, text: t.trim() }); return m; });
  const code = [];
  part.replace(/```csharp\n([\s\S]*?)\n```/g, (m, c) => { code.push(c); return m; });
  SEC[n] = { defs, code };
});
// ---------- icons ----------
const IP = {
  book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>',
  warn: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path>',
  check: '<circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path>',
  talk: '<path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z"></path><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path>',
  coin: '<circle cx="8" cy="8" r="6"></circle><path d="M18.09 10.37A6 6 0 1 1 10.34 18"></path><path d="M7 6h1v4"></path><path d="m16.71 13.88.7.71-2.82 2.82"></path>',
  arrow: '<path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path>',
  down: '<path d="M12 5v14"></path><path d="m19 12-7 7-7-7"></path>',
  x: '<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>',
  loop: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path>',
  minus: '<circle cx="12" cy="12" r="10"></circle><path d="M8 12h8"></path>'
};
const icon = (n, size = 32, color = 'currentColor', extra = '') => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex:none;display:block;${extra}">${IP[n]}</svg>`;
// ---------- atoms ----------
const PATTERNS = ['Фабричный метод', 'Фабрика', 'Строитель', 'Прототип', 'Одиночка'];
const BOOK = 'А. Швец, «Погружение в паттерны проектирования»';
const srcBook = p => `<div style="display:flex;align-items:center;gap:14px;font-size:var(--t-small);color:var(--ink2)">${icon('book', 30, 'var(--ink2)')}<span>${BOOK}${p ? ', с. ' + p : ''}</span></div>`;
const srcBookShort = t => `<div style="display:flex;align-items:center;gap:14px;font-size:var(--t-small);color:var(--ink2)">${icon('book', 30, 'var(--ink2)')}<span>${md(t)}</span></div>`;
const srcCourse = () => `<div style="display:flex;align-items:center;gap:14px;font-size:var(--t-small);color:var(--ac);font-weight:600"><span style="flex:none;width:18px;height:18px;border-radius:6px;border:3px solid var(--ac)"></span><span>формулировка курса</span></div>`;
const labBadge = () => `<div style="display:flex;align-items:center;height:44px;padding:0 16px;border:3px solid var(--ac);border-radius:12px;color:var(--ac);font-size:26px;font-weight:700;letter-spacing:0.02em"><span>ЛР3</span></div>`;
const miniInd = cur => `<div data-mini-ind="1" style="display:flex;align-items:center;gap:14px"><div style="display:flex;gap:8px">${PATTERNS.map((p, i) => `<span style="width:20px;height:20px;border-radius:7px;box-sizing:border-box;${i === cur ? 'background:var(--ac)' : 'border:2px solid #9A9A9A'}"></span>`).join('')}</div><span style="font-size:24px;color:var(--ink2);font-weight:500">${PATTERNS[cur]}</span></div>`;
const bigInd = cur => `<div style="display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:20px">${PATTERNS.map((p, i) => `<div style="height:120px;border-radius:28px;display:flex;align-items:center;justify-content:center;font-size:32px;box-sizing:border-box;${i === cur ? 'background:var(--ac);color:#fff;font-weight:700' : 'border:3px solid var(--ln);color:var(--ink2);font-weight:500'}"><span>${p}</span></div>`).join('')}</div>`;
const marker = (kind, i) => {
  if (kind === 'num') return `<span style="flex:none;min-width:44px;color:var(--ac);font-weight:700">${i + 1}</span>`;
  if (kind === 'check') return `<span style="flex:none;padding-top:0.12em">${icon('check', 34, 'var(--ac)')}</span>`;
  if (kind === 'minus') return `<span style="flex:none;padding-top:0.12em">${icon('minus', 34, 'var(--ink2)')}</span>`;
  return `<span style="flex:none;width:14px;height:14px;border-radius:5px;background:var(--ac);margin-top:0.5em"></span>`;
};
const bullets = (items, o = {}) => `<ul style="margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:${o.gap || 'var(--gap-item)'}">${items.map((t, i) => `<li style="display:flex;gap:24px;align-items:flex-start;font-size:${o.size || 'var(--t-body)'};line-height:1.3;color:var(--ink)">${marker(o.kind, i)}<span style="text-wrap:pretty">${md(t)}</span></li>`).join('')}</ul>`;
const plate = (text, o = {}) => `<div style="border:3px solid var(--ac);border-left-width:16px;border-radius:20px;padding:${o.pad || '36px 48px'};font-size:${o.size || 'var(--t-def)'};line-height:1.32;font-weight:500;color:var(--ink);text-wrap:pretty;background:#fff">${esc(text)}</div>`;
const header = (t, key, o = {}) => `<div style="display:flex;flex-direction:column;gap:18px;max-width:${o.tw || '1720px'}"><h2 style="margin:0;font-size:var(--t-title);font-weight:700;line-height:1.1;letter-spacing:-0.02em;text-wrap:balance;display:flex;gap:20px;align-items:center;${o.warnTitle ? 'color:var(--wr)' : ''}">${o.warnTitle || o.warnIcon ? icon('warn', 56, 'var(--wr)') : ''}<span>${md(t)}</span></h2>${key ? (o.keyBig ? `<p style="margin:12px 0 0;font-size:52px;font-weight:700;line-height:1.2;color:var(--ac);text-wrap:balance;max-width:1500px">${md(key)}</p>` : `<p style="margin:0;font-size:var(--t-key);font-weight:500;line-height:1.3;color:var(--ink);text-wrap:pretty">${md(key)}</p>`) : ''}</div>`;
const small = t => `<div style="font-size:var(--t-small);color:var(--ink2);line-height:1.35">${md(t)}</div>`;
const box = (inner, st = '') => `<div style="border:3px solid var(--ink);border-radius:16px;padding:18px 26px;background:#fff;font-size:30px;line-height:1.25;box-sizing:border-box;${st}">${inner}</div>`;
const mono = (t, st = '') => `<span style="font-family:var(--mono);${st}">${esc(t)}</span>`;
// ---------- code ----------
const KW = new Set('public private protected internal static readonly abstract override virtual class interface record new return void int char long decimal string bool object var get set this where out in lock if is not null throw true false using sealed base typeof extension'.split(' '));
function tokLine(line) {
  const re = /(\/\/.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)')|(\b\d+(?:\.\d+)?m?\b)|([A-Za-z_][A-Za-z0-9_]*)|(\s+)|([^\sA-Za-z0-9_"'\/]+|\/)/g;
  const out = []; let m;
  while ((m = re.exec(line))) {
    let kind = null, t = m[0];
    if (m[1]) kind = 'cm'; else if (m[2]) kind = 'st'; else if (m[3]) kind = 'nm';
    else if (m[4]) kind = KW.has(t) ? 'kw' : (/^[A-Z]/.test(t) ? 'ty' : null);
    else if (m[5]) kind = 'ws';
    out.push({ kind, t });
  }
  // attach whitespace to previous token
  const merged = [];
  for (const k of out) { if (k.kind === 'ws' && merged.length) merged[merged.length - 1].t += k.t; else merged.push(k); }
  // merge consecutive plain tokens
  const fin = [];
  for (const k of merged) { const p = fin[fin.length - 1]; if (p && p.kind === null && (k.kind === null || k.kind === 'ws')) p.t += k.t; else fin.push({ ...k }); }
  const ST = { kw: 'color:#5B1FA8;font-weight:600', ty: 'color:#00626A', st: 'color:#9A4500', nm: 'color:#9A4500', cm: 'color:#4F4F4F;font-style:italic' };
  return fin.map(k => k.kind && ST[k.kind] ? `<span style="${ST[k.kind]}">${esc(k.t)}</span>` : esc(k.t).replace(/^ +$/, s => s)).join('');
}
function codeBlock(src, o = {}) {
  const lines = src.split('\n');
  const innerW = (o.width || 1060) - 64;
  const maxLen = Math.max(...lines.map(l => l.length));
  const avail = (o.availH || 724) - 32;
  const fitW = innerW / (maxLen * 0.6);
  let fs = Math.min(o.maxFs || 30, fitW, avail / (lines.length * 1.22));
  fs = Math.max(22, Math.floor(fs * 2) / 2);
  const wr = f => lines.reduce((a, l) => a + Math.max(1, Math.ceil((l.length + 4) * 0.6 * f / innerW)), 0);
  while (wr(fs) * fs * 1.22 > avail + 2 && fs > 22) fs -= 0.5;
  if (wr(fs) * fs * 1.22 > avail + 2) fs = 21.5;
  const wrapped = lines.reduce((a, l) => a + Math.max(1, Math.ceil((l.length + 4) * 0.6 * fs / innerW)), 0);
  if (wrapped * fs * 1.22 > avail + 2) WARN.push(`slide ${o.n}: code overflow ${lines.length} lines (${wrapped} wrapped) at ${fs}px`);
  const hl = o.hl || [];
  const rows = lines.map(l => {
    const ind = l.match(/^ */)[0].length; const body = l.slice(ind);
    const h = hl.find(x => body && l.includes(x[0]));
    const bg = h ? `background:var(--${h[1] === 'wr' ? 'wr' : 'ac'}-t);box-shadow:inset 8px 0 0 var(--${h[1] === 'wr' ? 'wr' : 'ac'});` : '';
    const label = h && h[2] ? `<span style="font-family:var(--sans);font-weight:700;color:var(--wr);font-size:0.95em;white-space:nowrap;margin-left:28px">${'← ' + esc(h[2])}</span>` : '';
    const content = body ? tokLine(body) + label : '';
    return `<div style="white-space:pre-wrap;word-break:break-word;min-height:1.22em;padding-left:calc(32px + ${ind + 4}ch);padding-right:32px;text-indent:-4ch;${bg}">${content}</div>`;
  }).join('');
  return `<div style="background:var(--code);border-radius:20px;padding:16px 0;font-family:var(--mono);font-size:${fs}px;line-height:1.22;color:var(--ink);font-variant-ligatures:none;box-sizing:border-box;min-width:0">${rows}</div>`;
}
const WARN = [];
// ---------- frame ----------
let BLOCK = 0, IDX = 0; const OUT = [];
function frame(o, body) {
  IDX++;
  const pat = BLOCK >= 1 && BLOCK <= 5 ? BLOCK - 1 : -1;
  const corner = [o.coin ? `<div title="пример: платежи" style="color:var(--ink2)">${icon('coin', 40, 'var(--ink2)')}</div>` : '', o.lab ? labBadge() : '', pat >= 0 && !o.sep ? miniInd(pat) : ''].filter(Boolean).join('');
  const num = o.noNum ? '' : `<div style="position:absolute;right:100px;bottom:34px;font-size:24px;font-weight:500;color:var(--ink2);font-variant-numeric:tabular-nums"><span>${BLOCK}.${IDX}</span></div>`;
  const wf = o.warn ? `<div style="position:absolute;inset:0;border:8px solid var(--wr);pointer-events:none"></div>` : '';
  OUT.push(`<section data-label="${esc(o.label || '')}" style="background:#fff;color:var(--ink);font-family:var(--sans);overflow:hidden">${wf}${corner ? `<div style="position:absolute;top:36px;right:100px;display:flex;align-items:center;gap:24px;height:48px">${corner}</div>` : ''}<div style="position:absolute;left:100px;right:100px;top:104px;bottom:56px;display:flex;flex-direction:column">${body}</div>${num}</section>`);
}
const S = {
  WARN, OUT, md, esc, icon, box, mono, small, bullets, plate, srcBook, srcBookShort, srcCourse, header, codeBlock, labBadge, SEC,
  block(b) { BLOCK = b; IDX = 0; },
  raw(o, body) { frame(o, body); },
  title(o) {
    IDX++;
    OUT.push(`<section data-label="Титул" style="background:#fff;color:var(--ink);font-family:var(--sans);overflow:hidden"><div style="position:absolute;left:100px;right:100px;top:120px;bottom:100px;display:flex;flex-direction:column;justify-content:space-between"><div style="display:flex;flex-direction:column;gap:28px"><div style="font-size:44px;font-weight:600;color:var(--ac)"><span>Лекция 5</span></div><h1 style="margin:0;font-size:150px;font-weight:700;line-height:1;letter-spacing:-0.03em"><span>Порождающие паттерны</span></h1><div style="font-size:40px;color:var(--ink2);margin-top:12px"><span>Дисциплина «ООП и проектирование»</span></div></div>${bigInd(-1)}</div></section>`);
  },
  sep(o) {
    frame({ ...o, sep: true, label: o.label }, `<div style="flex:1;display:flex;flex-direction:column;justify-content:space-between;padding-top:40px;padding-bottom:40px"><div style="display:flex;flex-direction:column;gap:28px"><div style="font-size:44px;font-weight:700;color:var(--ac)"><span>${BLOCK}</span></div><h2 style="margin:0;font-size:var(--t-hero);font-weight:700;line-height:1.05;letter-spacing:-0.03em"><span>${md(o.t)}</span></h2>${o.sub ? `<div style="font-size:44px;color:var(--ink2)"><span>${md(o.sub)}</span></div>` : ''}</div>${bigInd(BLOCK - 1)}</div>`);
  },
  A(o) {
    const d = SEC[o.n].defs;
    if (!d.length) WARN.push('no defs ' + o.n);
    let body = header(o.t, o.key);
    const srcOf = x => x.page ? srcBook(x.page) : srcCourse();
    if (o.layout === 'row') {
      body += `<div style="margin-top:56px;display:grid;grid-template-columns:repeat(${d.length},minmax(0,1fr));gap:32px">${d.map(x => plate(x.text, { size: '34px', pad: '32px 36px' })).join('')}</div><div style="margin-top:24px">${srcOf(d[0])}</div>`;
    } else if (o.layout === 'stack') {
      body += `<div style="margin-top:48px;display:flex;flex-direction:column;gap:24px;max-width:1560px">${d.map(x => plate(x.text, { size: '36px', pad: '26px 40px' })).join('')}</div><div style="margin-top:24px">${srcOf(d[0])}</div>`;
    } else if (o.layout === 'codes') {
      body += `<div style="margin-top:48px;display:flex;flex-direction:column;gap:44px;max-width:1500px">${d.map((x, i) => `<div style="display:flex;flex-direction:column;gap:18px">${plate(x.text)}<div style="max-width:1100px">${codeBlock(SEC[o.n].code[i], { maxFs: 32, width: 1100, n: o.n })}</div></div>`).join('')}</div><div style="margin-top:24px">${srcOf(d[0])}</div>`;
    } else if (o.left) {
      body += `<div style="margin-top:56px;display:grid;grid-template-columns:620px minmax(0,1fr);gap:72px;align-items:start"><div style="display:flex;flex-direction:column;gap:28px">${o.left}</div><div style="display:flex;flex-direction:column;gap:24px">${d.map(x => plate(x.text)).join('')}${srcOf(d[0])}</div></div>`;
    } else {
      body += `<div style="margin-top:${o.key ? 56 : 64}px;display:flex;flex-direction:column;gap:24px;max-width:1560px">${d.map(x => plate(x.text)).join('')}${srcOf(d[0])}</div>`;
    }
    if (o.sub) body += `<div style="margin-top:44px;font-size:var(--t-body);line-height:1.35;color:var(--ink);max-width:1500px;text-wrap:pretty">${md(o.sub)}</div>`;
    if (o.below) body += `<div style="margin-top:40px">${o.below}</div>`;
    if (o.under) body += `<div style="margin-top:28px;display:flex;gap:40px;align-items:center">${o.under}</div>`;
    frame({ ...o, label: o.label || o.t }, body);
  },
  B(o) {
    const codes = SEC[o.n].code; let src = codes[o.ci || 0];
    if (o.range) src = src.split('\n').slice(o.range[0], o.range[1]).join('\n');
    if (o.half) { const ls = src.split('\n'); const mid = ls.length / 2; let best = -1; ls.forEach((x, i) => { if (x.trim() === '' && (best < 0 || Math.abs(i - mid) < Math.abs(best - mid))) best = i; }); src = (o.half === 1 ? ls.slice(0, best) : ls.slice(best + 1)).join('\n'); }
    const hasSide = o.side || o.sideWarn || o.cpp;
    const keyLines = o.key ? 1 + Math.floor(o.key.length * 0.52 * 34 / 1720) : 0;
    const titleLines = 1 + Math.floor(o.t.length * 0.55 * 56 / 1720);
    const availH = 1040 - 104 - (titleLines * 62) - (o.key ? 18 + keyLines * 44 : 0) - 20 - (o.cont ? 44 : 0) - 8;
    const cw = hasSide ? 1060 : 1720;
    const cb = codeBlock(src, { width: cw, availH, hl: o.hl, maxFs: o.maxFs || (hasSide ? 30 : 32), n: o.n });
    const left = `<div style="display:flex;flex-direction:column;gap:12px;min-width:0">${o.cont ? `<div style="font-size:24px;color:var(--ink2);font-weight:500;height:32px"><span>продолжение</span></div>` : ''}${cb}</div>`;
    let side = '';
    if (hasSide) {
      side = `<div style="display:flex;flex-direction:column;justify-content:space-between;gap:32px;min-width:0;padding-top:${o.cont ? 44 : 0}px;padding-bottom:0">`;
      side += `<div style="display:flex;flex-direction:column;gap:22px">`;
      if (o.side) side += `<div style="font-size:24px;font-weight:600;color:var(--ink2);letter-spacing:0.08em;text-transform:uppercase"><span>На что смотреть</span></div>` + bullets(o.side, { size: '30px', gap: '22px' }) + (o.sideCourse ? srcCourse() : '');
      if (o.sideWarn) side += `<div style="display:flex;gap:18px;align-items:flex-start;font-size:30px;line-height:1.3;color:var(--wr);font-weight:600">${icon('warn', 36, 'var(--wr)', 'margin-top:2px')}<span>${md(o.sideWarn)}</span></div>`;
      side += `</div>`;
      if (o.cpp) side += `<div data-cpp="1" style="border-top:2px solid var(--ln);padding-top:20px;margin-bottom:44px;display:flex;flex-direction:column;gap:12px"><div style="display:flex;align-items:center;gap:10px;font-family:var(--mono);font-size:24px;font-weight:600;color:var(--ink2)"><span>C++</span>${icon('arrow', 26, 'var(--ink2)')}<span>C#</span><span style="font-family:var(--sans);font-weight:600;margin-left:8px">Для C++-человека</span></div><div style="font-size:26px;line-height:1.35;font-style:italic;color:var(--ink)">${md(o.cpp)}</div></div>`;
      side += `</div>`;
    }
    const body = header(o.t, o.key, { warnIcon: o.warn }) + `<div style="margin-top:20px;flex:1;min-height:0;display:grid;grid-template-columns:${hasSide ? '1060px minmax(0,1fr)' : 'minmax(0,1fr)'};gap:60px;align-items:stretch">${left}${side}</div>`;
    frame({ ...o, label: o.label || o.t }, body);
  },
  C(o) {
    let body = header(o.t, o.key, { keyBig: o.keyBig, warnTitle: o.warnTitle });
    const list = o.items ? bullets(o.items, { kind: o.kind }) : '';
    body += `<div style="margin-top:${o.keyBig ? 64 : 56}px;display:grid;grid-template-columns:minmax(0,1160px) minmax(0,1fr);gap:80px;align-items:start"><div style="display:flex;flex-direction:column;gap:40px">${list}${o.course ? srcCourse() : ''}${o.after || ''}</div><div>${o.right || ''}</div></div>`;
    if (o.foot) body += `<div style="margin-top:auto;margin-bottom:24px;font-size:32px;font-style:italic;color:var(--ink);max-width:1500px;line-height:1.35">${md(o.foot)}</div>`;
    frame({ ...o, label: o.label || o.t }, body);
  },
  D(o) {
    let body = header(o.t, o.key);
    if (o.caps) body += `<div style="margin-top:48px;flex:1;display:grid;grid-template-columns:420px minmax(0,1fr);gap:72px;align-items:start"><div style="display:flex;flex-direction:column;gap:28px">${o.caps.map(c => `<div style="font-size:30px;line-height:1.35;color:var(--ink);padding-left:24px;border-left:4px solid var(--ln)">${md(c)}</div>`).join('')}</div><div style="min-width:0">${o.body}</div></div>`;
    else body += `<div style="margin-top:${o.mt || 56}px;min-width:0">${o.body}</div>`;
    frame({ ...o, label: o.label || o.t }, body);
  },
  E(o) {
    frame({ ...o, label: o.label || 'Дискуссия' }, `<div style="flex:1;display:flex;flex-direction:column;justify-content:center;padding-bottom:40px"><div style="display:grid;grid-template-columns:160px minmax(0,1fr);gap:56px;align-items:start"><div style="color:var(--ac);padding-top:8px">${icon('talk', 140, 'var(--ac)', 'stroke-width:1.6')}</div><div style="display:flex;flex-direction:column;gap:20px"><div style="font-size:26px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--ink2)"><span>Дискуссия</span></div><h2 style="margin:0;font-size:68px;font-weight:700;line-height:1.15;letter-spacing:-0.02em;text-wrap:balance;max-width:1400px"><span>${md(o.q)}</span></h2></div></div></div>${o.hint ? `<div style="font-size:30px;color:var(--ink2);padding-left:216px;margin-bottom:24px;line-height:1.35;display:flex;gap:12px"><span style="font-weight:700">Подсказка:</span><span>${md(o.hint)}</span></div>` : ''}`);
  },
  F(o) {
    const col = (items, sz) => bullets(items, { size: sz || '30px', gap: '20px' });
    const bookCol = `<div style="border:3px solid #A8A8A8;border-radius:28px;padding:36px 40px;display:flex;flex-direction:column;gap:26px;min-width:0"><div style="display:flex;align-items:center;gap:16px">${icon('book', 40, 'var(--ink)')}<span style="font-size:36px;font-weight:700">Книга Швеца</span><span style="margin-left:auto;font-size:28px;color:var(--ink2);font-weight:500">${esc(o.page)}</span></div>${col(o.book)}${o.bookMinus ? `<div style="font-size:24px;font-weight:600;color:var(--ink2);letter-spacing:0.08em;text-transform:uppercase;margin-top:4px"><span>Минусы</span></div>` + bullets(o.bookMinus, { size: '30px', gap: '20px', kind: 'minus' }) : ''}</div>`;
    const courseCol = `<div style="border:4px solid var(--ac);border-radius:28px;padding:36px 40px;display:flex;flex-direction:column;gap:26px;min-width:0"><div style="display:flex;align-items:center;gap:16px"><span style="flex:none;width:30px;height:30px;border-radius:10px;background:var(--ac)"></span><span style="font-size:36px;font-weight:700;color:var(--ac)">Курс</span></div>${col(o.course)}</div>`;
    const rule = `<div style="margin-top:32px;display:flex;align-items:center;gap:28px;border-top:3px solid var(--ac);padding-top:26px">${labBadge()}<div style="font-size:32px;font-weight:600;color:var(--ac);line-height:1.3;text-wrap:pretty"><span style="font-weight:700">Правило для ЛР3: </span>${md(o.rule)}</div></div>`;
    const body = header(o.t, o.key) + `<div style="margin-top:40px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:40px;align-items:stretch">${bookCol}${courseCol}</div>${rule}`;
    frame({ ...o, label: o.label || o.t }, body);
  }
};
return S;
