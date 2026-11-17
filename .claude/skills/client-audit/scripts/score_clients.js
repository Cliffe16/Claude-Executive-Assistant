// Scores every client in QuickBooks-style AR ageing dumps against a company ICP profile.
// Usage: node score_clients.js --profile <profile.json> --ageing <latest.txt> [--ageing <older.txt>] [--schedule <delinquent.txt>] [--crm <customer master.txt>] --out <dir>
// Ageing dumps come from xlsx2txt.ps1 (columns: B/C name, E current, F 1-30, G 31-60, H 61-90, I >90, J total).
// The schedule (optional) is a collections ledger dump with C client, B segment, L collectability, M status, N prospect, R owner.
// The CRM (optional, --crm) is a Customer Master dump with B legal name, C trading name, E sub-segment, J status;
// sub-segments listed in the profile's crmSubSegmentMap override the name rules.
const fs = require('fs');
const path = require('path');

const args = { ageing: [] };
for (let i = 2; i < process.argv.length; i += 2) {
  const k = process.argv[i].replace(/^--/, ''), v = process.argv[i + 1];
  if (k === 'ageing') args.ageing.push(v); else args[k] = v;
}
if (!args.profile || !args.ageing.length || !args.out) {
  console.error('Usage: node score_clients.js --profile p.json --ageing latest.txt [--ageing older.txt] [--schedule s.txt] --out dir');
  process.exit(1);
}
const profile = JSON.parse(fs.readFileSync(args.profile, 'utf8'));
const RULES = profile.rules.map(([seg, re]) => [seg, new RegExp(re, 'i')]);

function parseRow(line) {
  const cells = {};
  for (const part of line.split('\t')) {
    const m = part.match(/^([A-Z]+)(\d+)=(.*)$/);
    if (m) cells[m[1]] = m[3];
  }
  return cells;
}
const num = v => (v === undefined || v === '' ? 0 : Number(v) || 0);
const norm = s => s.toLowerCase().replace(/\s+/g, ' ').replace(/[.,]+$/, '').replace(/\s*-\s*/g, ' - ').trim();

// Leaf rows are B or C names with figures, excluding "Total ..." rows; duplicate names are summed.
function readAgeing(file) {
  const out = new Map();
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const c = parseRow(line);
    const name = c.C || c.B;
    if (!name || /^total\b/i.test(name) || name === 'CUSTOMERS' || c.J === undefined) continue;
    const rec = { name: name.trim(), current: num(c.E), d30: num(c.F), d60: num(c.G), d90: num(c.H), d90p: num(c.I), total: num(c.J) };
    const k = norm(rec.name);
    if (out.has(k)) { const o = out.get(k); for (const f of ['current', 'd30', 'd60', 'd90', 'd90p', 'total']) o[f] += rec[f]; }
    else out.set(k, rec);
  }
  return out;
}

function readSchedule(file) {
  const out = new Map();
  if (!file) return out;
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const c = parseRow(line);
    if (!c.C || !c.B || c.B === 'Segment') continue;
    out.set(norm(c.C), { segment: c.B, collectability: c.L || '', status: c.M || '', prospect: c.N || '', owner: c.R || '' });
  }
  return out;
}

function readCrm(file) {
  const out = new Map();
  if (!file) return out;
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const c = parseRow(line);
    if (!c.B || c.B === 'Legal Name') continue;
    const rec = { subSegment: c.E || '', status: c.J || '' };
    for (const n of [c.B, c.C]) if (n) out.set(norm(n), rec);
  }
  return out;
}

function segmentOf(name, schedSeg, crmRec) {
  const forced = profile.scheduleSegmentOverrides && profile.scheduleSegmentOverrides[schedSeg];
  if (forced) return forced;
  const fromCrm = crmRec && profile.crmSubSegmentMap && profile.crmSubSegmentMap[crmRec.subSegment];
  if (fromCrm) return fromCrm;
  for (const [seg, re] of RULES) if (re.test(name)) return seg;
  // Case-sensitive fallback, e.g. "Firstname Lastname" -> Individual.
  const fb = profile.nameFallback;
  if (fb && new RegExp(fb.pattern).test(name.trim())) return fb.segment;
  return profile.defaultSegment;
}

const snapshots = args.ageing.map(readAgeing);   // [latest, older...]
const sched = readSchedule(args.schedule);
const crm = readCrm(args.crm);
const keys = new Set([...snapshots.flatMap(s => [...s.keys()]), ...sched.keys()]);

const clients = [];
for (const k of keys) {
  const recs = snapshots.map(s => s.get(k));
  const latest = recs.find(Boolean);
  const s = sched.get(k);
  const cr = crm.get(k);
  const name = latest ? latest.name : k;
  const seg = segmentOf(name, s && s.segment, cr);
  const w = profile.segments[seg] || profile.segments[profile.defaultSegment];

  // Monthly billing estimate: the 1-30 bucket holds one month's invoice; fall back to current.
  // Take the (upper) median of the non-zero snapshot estimates, so one month with two invoices
  // in a bucket, or one small part-payment, doesn't skew it.
  const inv = r => (r ? (r.d30 > 0 ? r.d30 : Math.max(0, r.current)) : 0);
  const ests = recs.map(inv).filter(v => v > 0).sort((a, b) => a - b);
  const monthly = ests.length ? ests[Math.floor(ests.length / 2)] : 0;
  const bal = latest ? latest.total : 0;
  const over60 = latest ? Math.max(0, latest.d90 + latest.d90p) : 0;
  const over60Share = bal > 0 ? Math.min(1, over60 / bal) : 0;
  const active = monthly > 0;

  const value = monthly >= 50000 ? 25 : monthly >= 25000 ? 20 : monthly >= 10000 ? 15 : monthly >= 5000 ? 10 : monthly > 0 ? 5 : 0;
  let pay = over60Share < 0.1 ? 30 : over60Share < 0.3 ? 22 : over60Share < 0.5 ? 15 : over60Share < 0.75 ? 8 : 0;
  if (bal <= 0 && active) pay = 30;
  const st = s ? s.status : '';
  if (/write-off|legal/i.test(st)) pay = 0;
  else if (/not responding/i.test(st)) pay = Math.min(pay, 5);
  else if (/payment promised|withholding/i.test(st)) pay = Math.max(pay, 12);

  const growth = active ? w.growth : Math.round(w.growth / 2);
  const score = w.fit + value + pay + growth;
  // A small account can be healthy but is not a growth priority, so band A needs at least KES 10,000/month.
  const band = !active && bal <= 0 ? 'Win-back'
    : score >= 70 && monthly >= 10000 ? 'A Grow'
    : score >= 50 ? 'B Retain & upsell' : score >= 35 ? 'C Fix terms' : 'D Recover or exit';

  clients.push({ name, segment: seg, band, score, fit: w.fit, value, pay, growth, monthly: Math.round(monthly),
    balance: Math.round(bal), over60: Math.round(over60), over60Share: +over60Share.toFixed(2), active,
    ledgerStatus: st, ledgerProspect: s ? s.prospect : '', owner: s ? s.owner : '', crmStatus: cr ? cr.status : '', crmSubSegment: cr ? cr.subSegment : '' });
}
clients.sort((a, b) => b.score - a.score || b.monthly - a.monthly);

fs.mkdirSync(args.out, { recursive: true });
fs.writeFileSync(path.join(args.out, 'clients.json'), JSON.stringify(clients, null, 1));
const cols = Object.keys(clients[0]);
const esc = v => (/[",\n]/.test(String(v)) ? '"' + String(v).replace(/"/g, '""') + '"' : String(v));
fs.writeFileSync(path.join(args.out, 'clients.csv'), [cols.join(','), ...clients.map(c => cols.map(k => esc(c[k])).join(','))].join('\n'));

const group = f => clients.reduce((acc, c) => { (acc[f(c)] ||= []).push(c); return acc; }, {});
const sum = (l, f) => l.reduce((t, c) => t + c[f], 0);
console.log(`${profile.company}: ${clients.length} accounts, ${clients.filter(c => c.active).length} billed recently`);
for (const [b, l] of Object.entries(group(c => c.band)).sort()) console.log(`${b.padEnd(20)} ${String(l.length).padStart(4)}  monthly ${sum(l, 'monthly')}  balance ${sum(l, 'balance')}`);
console.log('By segment (monthly = billed accounts only):');
for (const [g, l] of Object.entries(group(c => c.segment)).sort()) {
  const a = l.filter(c => c.active);
  console.log(`${g.padEnd(30)} accounts ${String(l.length).padStart(3)}  billed ${String(a.length).padStart(3)}  monthly ${String(sum(a, 'monthly')).padStart(8)}  balance ${String(sum(l, 'balance')).padStart(9)}`);
}
