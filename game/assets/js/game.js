/* MAMAZAN Legend (妈妈赞传奇 · 엄마찬 레전드) – K-Chicken Sauce Master
   Time-management cooking game for MAMAZAN sauces by Qingdao Deesheng Hengxin Food (deesheng.food). */
(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));
  const stage = $('#stage');
  const LS = { best: 'mcl_best', tut: 'mcl_tutorial_done', samples: 'mcl_sample_requests' };
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  const qs = new URLSearchParams(location.search);
  const DAY_LEN = Math.max(10, Math.min(300, +qs.get('daylen') || 75));

  const SAUCES = [
    { id: 'soy', name: 'Soy Garlic', color: '#7b3f14', day: 1 },
    { id: 'sweet', name: 'Sweet & Spicy', color: '#e5391f', day: 1 },
    { id: 'gochu', name: 'Gochujang', color: '#a0141f', day: 2 },
    { id: 'honey', name: 'Honey Mustard', color: '#e9ad00', day: 3 },
    { id: 'yang', name: 'Extra Spicy', color: '#d8501a', day: 4 }
  ];
  const PRODUCTS = [
    { id: 'soy', name: 'Soy Garlic Fried Chicken Sauce', note: 'Glaze fried chicken with our soy garlic sauce.', interest: 'Korean fried chicken sauces' },
    { id: 'sweet', name: 'Sweet & Spicy Fried Chicken Sauce', note: 'Coat fried chicken with a sweet and spicy finish.', interest: 'Korean fried chicken sauces' },
    { id: 'gochu', name: 'Korean Gochujang', note: 'Use Korean gochujang as a base for marinades, sauces and rice dishes.', interest: 'Gochujang / Korean pastes' },
    { id: 'honey', name: 'Honey Mustard Sauce', note: 'Serve honey mustard as a dip alongside fried chicken.', interest: 'Korean fried chicken sauces' },
    { id: 'yang', name: 'Extra Spicy Fried Chicken Sauce', note: 'Give fried chicken an extra spicy coating.', interest: 'Korean fried chicken sauces' }
  ];
  const TOPS = [
    { id: 'sesame', name: 'Sesame', day: 1 },
    { id: 'onion', name: 'Green Onion', day: 2 },
    { id: 'radish', name: 'Pickled Radish', day: 4 }
  ];
  const KIMCHI_DAY = 3;
  const UPGRADES = [
    { id: 'fryer3', icon: '🍳', name: '3rd Fryer', desc: 'Fry three batches at once', cost: 60 },
    { id: 'fast', icon: '⚡', name: 'Turbo Oil', desc: 'Chicken fries 30% faster', cost: 50 },
    { id: 'music', icon: '🎵', name: 'K-Pop Speakers', desc: 'Customers are 20% more patient', cost: 40 }
  ];
  const sauceById = id => SAUCES.find(s => s.id === id);
  const topById = id => TOPS.find(t => t.id === id);
  const dayParams = d => ({
    len: DAY_LEN,
    goal: 40 + (d - 1) * 35,
    spawn: Math.max(3.0, 8.5 - (d - 1) * 1.0),
    patience: Math.max(15, 40 - (d - 1) * 4.5),
    cook: 4.0,
    window: Math.max(2.5, 4.5 - (d - 1) * 0.35)
  });

  let S = null, scale = 1, fryerEls = [], sauceEls = {}, topEls = {};

  /* ---------- layout ---------- */
  function fit() {
    scale = Math.min(innerWidth / 420, innerHeight / 760);
    stage.style.setProperty('--s', scale);
    stage.style.transform = `translate(-50%,-50%) scale(${scale})`;
  }
  addEventListener('resize', fit); fit();

  /* ---------- helpers ---------- */
  function tap(el, fn) {
    el.addEventListener('pointerdown', e => {
      if (e.button > 0) return;
      e.preventDefault(); SFX.init(); fn(e);
      el.classList.add('press'); setTimeout(() => el.classList.remove('press'), 110);
    });
  }
  function nest(svg, x, y, w, h) { return svg.replace('<svg ', `<svg x="${x}" y="${y}" width="${w}" height="${h}" `); }
  function lerpColor(a, b, t) {
    t = Math.max(0, Math.min(1, t));
    const pa = [1, 3, 5].map(i => parseInt(a.substr(i, 2), 16)), pb = [1, 3, 5].map(i => parseInt(b.substr(i, 2), 16));
    return '#' + pa.map((v, i) => Math.round(v + (pb[i] - v) * t).toString(16).padStart(2, '0')).join('');
  }
  function posOf(el) {
    const r = el.getBoundingClientRect(), sr = stage.getBoundingClientRect();
    return { x: (r.left + r.width / 2 - sr.left) / scale, y: (r.top + r.height / 2 - sr.top) / scale };
  }
  function floatAt(el, text, cls = '', dy = 0) {
    const p = el.x != null ? el : posOf(el);
    const d = document.createElement('div');
    d.className = 'float ' + cls; d.textContent = text;
    d.style.left = p.x + 'px'; d.style.top = (p.y + dy) + 'px';
    $('#fx').appendChild(d); setTimeout(() => d.remove(), 1200);
  }
  function sparks(el, color = '#ffd23f', n = 10) {
    const p = posOf(el);
    for (let i = 0; i < n; i++) {
      const d = document.createElement('div'), a = Math.random() * Math.PI * 2, r = 30 + Math.random() * 40;
      d.className = 'spark'; d.style.left = p.x + 'px'; d.style.top = p.y + 'px'; d.style.background = color;
      d.style.setProperty('--dx', Math.cos(a) * r + 'px'); d.style.setProperty('--dy', Math.sin(a) * r + 'px');
      $('#fx').appendChild(d); setTimeout(() => d.remove(), 650);
    }
  }
  let toastT = 0;
  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 1400);
  }
  let bigT = 0;
  function bigMsg(title, sub = '') {
    const b = $('#bigMsg'); b.innerHTML = `${title}${sub ? `<small>${sub}</small>` : ''}`;
    b.classList.remove('hidden'); b.style.animation = 'none'; void b.offsetWidth; b.style.animation = '';
    clearTimeout(bigT); bigT = setTimeout(() => b.classList.add('hidden'), 1650);
  }
  function deny(el, msg) { SFX.deny(); if (msg) toast(msg); if (el) { el.classList.remove('deny'); void el.offsetWidth; el.classList.add('deny'); } }
  function shakeStage() { stage.classList.remove('shake'); void stage.offsetWidth; stage.classList.add('shake'); }
  const emptyPlate = () => ({ chicken: false, sauce: null, tops: [], kimchi: false });
  const unlocked = item => S.day >= item.day;

  /* ---------- screens ---------- */
  const SCREENS = { title: '#scrTitle', day: '#scrDay', over: '#scrOver' };
  function showScreen(name) {
    Object.values(SCREENS).forEach(s => $(s).classList.add('hidden'));
    $('#scrPause').classList.add('hidden');
    if (SCREENS[name]) $(SCREENS[name]).classList.remove('hidden');
    if (S) S.screen = name;
    if (name === 'title') renderTitle();
  }
  function renderTitle() {
    const b = store.get(LS.best, null);
    $('#bestLine').textContent = b && b.score ? `🏆 Best: $${b.score} · reached Day ${b.day}` : '';
  }
  const overlayOpeners = new Map();
  function openOverlay(selector, opener = document.activeElement) {
    const panel = $(selector);
    overlayOpeners.set(selector, opener);
    panel.classList.remove('hidden');
    const firstControl = panel.querySelector('input, button, a, select, textarea');
    if (firstControl) firstControl.focus();
  }
  function closeOverlay(selector) {
    $(selector).classList.add('hidden');
    const opener = overlayOpeners.get(selector);
    if (opener && typeof opener.focus === 'function') opener.focus();
  }

  /* ---------- game flow ---------- */
  function newGame() {
    S = { day: 1, wallet: 0, score: 0, hearts: 5, upgrades: {}, totalServed: 0, totalAngry: 0 };
    startDay(1);
  }
  function startDay(d) {
    S.day = d; S.p = dayParams(d);
    S.snapshot = { day: d, wallet: S.wallet, score: S.score, hearts: S.hearts, upgrades: { ...S.upgrades }, totalServed: S.totalServed, totalAngry: S.totalAngry };
    Object.assign(S, { time: S.p.len, dayCoins: 0, tips: 0, served: 0, angry: 0, combo: 0, bestCombo: 0, burnt: 0,
      spawnT: 1.2, customers: [null, null, null], nextId: 1, tray: [null, null, null], plate: emptyPlate(),
      ended: false, lastCall: false, paused: false });
    S.fryers = Array.from({ length: S.upgrades.fryer3 ? 3 : 2 }, () => ({ state: 'empty', t: 0, burnt: false, ready: false }));
    S.tut = (d === 1 && !store.get(LS.tut, false)) ? 0 : -1;
    $('#customers').innerHTML = '';
    buildKitchen(); renderHUD(true); renderPlate(); renderTray();
    showScreen('play');
    if (S.tut >= 0) tutStep(0); else { $('#tutBanner').classList.add('hidden'); bigMsg(`Day ${d}`, `Goal: $${S.p.goal}`); }
  }
  function endDay() {
    S.ended = true; clearHL();
    if (S.dayCoins < S.p.goal) return gameOver(`You missed today’s goal of $${S.p.goal} (earned $${S.dayCoins}).`);
    saveBest();
    SFX.win();
    const g = S.p.goal, stars = S.dayCoins >= g * 2 ? 3 : S.dayCoins >= g * 1.5 ? 2 : 1;
    $('#dayTitle').textContent = `Day ${S.day} complete!`;
    $('#dayStars').innerHTML = [1, 2, 3].map(i => `<span class="${i <= stars ? '' : 'off'}" style="animation-delay:${i * 0.15}s">⭐</span>`).join('');
    renderDayStats();
    const n = S.day + 1, news = [];
    SAUCES.filter(s => s.day === n).forEach(s => news.push(`${s.name} sauce`));
    TOPS.filter(t => t.day === n).forEach(t => news.push(t.name));
    if (KIMCHI_DAY === n) news.push('Kimchi side');
    $('#unlockNote').textContent = news.length ? `🔓 Tomorrow unlocks: ${news.join(' + ')}` : (n > 4 ? '🔥 Tomorrow: hungrier crowds & faster orders!' : '');
    renderShop();
    showScreen('day'); confetti();
  }
  function renderDayStats() {
    $('#dayStats').innerHTML = [
      ['Orders served', S.served], ['Unhappy customers', S.angry], ['Earned today', `$${S.dayCoins}`],
      ['Tips & combos', `$${S.tips}`], ['Best combo', `x${S.bestCombo}`], ['Wallet', `$${S.wallet}`]
    ].map(([k, v]) => `<div class="stat">${k}<b>${v}</b></div>`).join('');
  }
  function renderShop() {
    $('#shopList').innerHTML = UPGRADES.map(u => {
      const own = !!S.upgrades[u.id];
      return `<div class="upg ${own ? 'owned' : ''}"><span class="ui">${u.icon}</span><span class="ut"><b>${u.name}</b>${u.desc}</span>
        <button data-buy="${u.id}" ${own || S.wallet < u.cost ? 'disabled' : ''}>${own ? 'Owned' : '$' + u.cost}</button></div>`;
    }).join('');
    $$('[data-buy]').forEach(b => b.addEventListener('click', () => {
      const u = UPGRADES.find(x => x.id === b.dataset.buy);
      if (S.upgrades[u.id] || S.wallet < u.cost) return;
      SFX.init(); SFX.coin(); S.wallet -= u.cost; S.upgrades[u.id] = true; renderShop(); renderDayStats();
    }));
  }
  function confetti() {
    const c = $('#confetti'); c.innerHTML = '';
    const cols = ['#ffd23f', '#e8412a', '#4cc84a', '#2f86d8', '#ff6fa8', '#ff9f1c'];
    for (let i = 0; i < 40; i++) {
      const d = document.createElement('i');
      d.style.left = Math.random() * 100 + '%'; d.style.background = cols[i % cols.length];
      d.style.animationDelay = Math.random() * 0.8 + 's'; d.style.animationDuration = 1.6 + Math.random() * 1.4 + 's';
      c.appendChild(d);
    }
  }
  function saveBest() {
    const b = store.get(LS.best, { score: 0, day: 0 });
    if (S.score > (b.score || 0) || (S.score === b.score && S.day > b.day)) { store.set(LS.best, { score: S.score, day: S.day, served: S.totalServed }); return true; }
    return false;
  }
  function gameOver(reason) {
    S.ended = true; clearHL(); $('#tutBanner').classList.add('hidden');
    const prev = store.get(LS.best, { score: 0 }).score || 0;
    const isNew = S.score > prev; saveBest();
    SFX.lose();
    $('#overTitle').textContent = 'Shop closed!';
    $('#overReason').textContent = reason;
    $('#overScore').textContent = '$' + S.score;
    $('#newBest').classList.toggle('hidden', !isNew || S.score === 0);
    const b = store.get(LS.best, { score: 0, day: 0 });
    $('#overStats').innerHTML = [
      ['Reached', `Day ${S.day}`], ['Orders served', S.totalServed], ['Unhappy customers', S.totalAngry], ['Best score', `$${b.score || 0}`]
    ].map(([k, v]) => `<div class="stat">${k}<b>${v}</b></div>`).join('');
    showScreen('over');
  }

  /* ---------- kitchen build ---------- */
  function buildKitchen() {
    const fw = $('#fryers'); fw.innerHTML = ''; fryerEls = [];
    for (let i = 0; i < 3; i++) {
      const el = document.createElement('div');
      if (i < S.fryers.length) {
        el.className = 'fryer';
        el.innerHTML = `<div class="oil"></div><div class="ck">${ART.chicken('#f7dcb0')}</div><div class="smoke"></div><div class="ring"></div><div class="flbl">EMPTY</div>`;
        el.setAttribute('role', 'button'); el.setAttribute('aria-label', 'Fryer ' + (i + 1));
        tap(el, () => onFryer(i)); fryerEls.push(el);
        el._last = {};
      } else {
        el.className = 'fryer locked'; el.innerHTML = '🔒<br>3rd fryer<br><small>(upgrade)</small>';
      }
      fw.appendChild(el);
    }
    S.fryers.forEach((_, i) => renderFryer(i, true));
    const sr = $('#sauceRow'); sr.innerHTML = ''; sauceEls = {};
    SAUCES.forEach(s => {
      const b = document.createElement('button');
      b.className = 'station sauce' + (unlocked(s) ? '' : ' locked');
      b.innerHTML = `${ART.sauceBottle(s.color)}<span class="lbl">${s.name}</span>${unlocked(s) ? '' : `<span class="lockb">Day ${s.day}</span>`}`;
      b.setAttribute('aria-label', s.name + ' sauce');
      tap(b, () => onSauce(s.id, b)); sr.appendChild(b); sauceEls[s.id] = b;
    });
    const tr = $('#topRow'); tr.innerHTML = ''; topEls = {};
    [...TOPS, { id: 'kimchi', name: 'Kimchi (side)', day: KIMCHI_DAY }].forEach(t => {
      const b = document.createElement('button');
      b.className = 'station top' + (unlocked(t) ? '' : ' locked');
      b.innerHTML = `${ART.TOP_ICON[t.id]}<span class="lbl">${t.name}</span>${unlocked(t) ? '' : `<span class="lockb">Day ${t.day}</span>`}`;
      b.setAttribute('aria-label', t.name);
      tap(b, () => t.id === 'kimchi' ? onKimchi(b) : onTop(t.id, b)); tr.appendChild(b); topEls[t.id] = b;
    });
  }

  /* ---------- rendering ---------- */
  const RAW = '#f7dcb0', GOLD = '#e3a33a', DARK = '#b8641c', BURNT = '#2e1a0e';
  function fryerInfo(f) {
    const p = S.p;
    if (f.state !== 'cooking') return { cls: '', label: S.tut === 1 ? 'TAP BOX' : 'EMPTY', color: RAW, ring: 0, show: false };
    if (f.t < p.cook) return { cls: 'cooking', label: 'FRYING…', color: lerpColor(RAW, GOLD, f.t / p.cook), ring: f.t / p.cook, ringCol: '#ffd23f', show: true };
    if (!f.burnt) {
      const k = (f.t - p.cook) / p.window, warn = k > 0.6;
      return { cls: 'cooking ready' + (warn ? ' warn' : ''), label: warn ? 'HURRY!' : 'READY!', color: lerpColor(GOLD, DARK, Math.max(0, (k - 0.5) * 2)), ring: 1 - k, ringCol: warn ? '#ff5a1f' : '#4cc84a', show: true };
    }
    return { cls: 'burnt', label: 'BURNT ✕', color: BURNT, ring: 0, show: true };
  }
  function renderFryer(i, force) {
    const el = fryerEls[i]; if (!el) return;
    const inf = fryerInfo(S.fryers[i]), L = el._last;
    const cls = 'fryer ' + inf.cls + (el.classList.contains('hl') ? ' hl' : '');
    if (force || L.cls !== cls) { el.className = cls; L.cls = cls; }
    if (force || L.label !== inf.label) { el.querySelector('.flbl').textContent = inf.label; L.label = inf.label; }
    if (force || L.color !== inf.color) { el.querySelectorAll('.ck-body,.ck-body2').forEach(p => p.setAttribute('fill', inf.color)); L.color = inf.color; }
    el.querySelector('.ck').style.opacity = inf.show ? 1 : 0;
    if (inf.show) el.querySelector('.ring').style.background = `conic-gradient(${inf.ringCol || '#ffd23f'} ${Math.round(inf.ring * 360)}deg, rgba(0,0,0,.25) 0)`;
  }
  function plateChickenSVG(pl) {
    const s = pl.sauce ? sauceById(pl.sauce).color : null;
    const over = pl.tops.filter(t => ART.TOP_OVER[t]).map(t => ART.TOP_OVER[t]).join('');
    return ART.chicken('#e09a2f', s, over);
  }
  function renderPlate() {
    const pl = S.plate; let inner = '';
    if (pl.tops.includes('radish')) inner += nest(ART.TOP_ICON.radish, 2, 44, 40, 40);
    if (pl.chicken) inner += nest(plateChickenSVG(pl), 36, 6, 98, 78);
    if (pl.kimchi) inner += nest(ART.TOP_ICON.kimchi, 128, 44, 40, 40);
    $('#plate').innerHTML = ART.plate(inner);
    let hint = 'Plate · fry chicken first';
    if (pl.chicken) hint = pl.sauce ? `${sauceById(pl.sauce).name}${pl.tops.length ? ' + ' + pl.tops.map(t => topById(t).name).join(', ') : ''}${pl.kimchi ? ' + Kimchi' : ''}` : 'Choose a sauce';
    else if (pl.kimchi) hint = 'Kimchi ready · add chicken';
    $('#plateHint').textContent = hint;
  }
  function renderTray() {
    const t = $('#tray'); t.innerHTML = '';
    S.tray.forEach((v, i) => {
      const d = document.createElement('div');
      d.className = 'tslot' + (v ? '' : ' empty');
      d.innerHTML = v ? ART.chicken('#e3a33a') : '';
      tap(d, () => onTray(i, d)); t.appendChild(d);
    });
  }
  const H = {};
  function setText(sel, v) { if (H[sel] !== v) { H[sel] = v; $(sel).textContent = v; } }
  function renderHUD(force) {
    if (force) Object.keys(H).forEach(k => delete H[k]);
    setText('#dayNum', String(S.day));
    setText('#coinNum', String(S.wallet));
    const hk = 'h' + S.hearts; if (H.hearts !== hk) { H.hearts = hk; $('#hearts').innerHTML = [0, 1, 2, 3, 4].map(i => `<span class="hrt${i < S.hearts ? '' : ' off'}">♥</span>`).join(''); }
    const t = Math.ceil(S.time); setText('#timeTxt', `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`);
    $('#timeFill').style.width = (S.time / S.p.len * 100) + '%';
    const g = S.p.goal; $('#goalFill').style.width = Math.min(100, S.dayCoins / g * 100) + '%';
    setText('#goalTxt', `$${S.dayCoins} / $${g}`);
    $('#goalBar').classList.toggle('met', S.dayCoins >= g);
  }

  /* ---------- customers ---------- */
  function genOrder() {
    const sauces = SAUCES.filter(unlocked), tops = TOPS.filter(unlocked);
    const pTop = Math.min(0.6, 0.35 + S.day * 0.05);
    return {
      sauce: sauces[Math.floor(Math.random() * sauces.length)].id,
      tops: tops.filter(() => Math.random() < pTop).map(t => t.id),
      kimchi: S.day >= KIMCHI_DAY && Math.random() < 0.35
    };
  }
  const orderPrice = o => 6 + o.tops.length + (o.kimchi ? 2 : 0) + (['honey', 'yang'].includes(o.sauce) ? 1 : 0);
  function spawnCustomer(order, slotWanted) {
    const free = S.customers.map((c, i) => c ? -1 : i).filter(i => i >= 0);
    if (!free.length) return false;
    const slot = slotWanted != null && S.customers[slotWanted] == null ? slotWanted : free[Math.floor(Math.random() * free.length)];
    order = order || genOrder();
    const cx = order.tops.length + (order.kimchi ? 1 : 0);
    const max = S.p.patience * (S.upgrades.music ? 1.2 : 1) * (1 + cx * 0.08);
    const c = { id: S.nextId++, slot, order, max, patience: max, look: ART.randLook(), mood: 'happy', price: orderPrice(order) };
    const el = document.createElement('div');
    el.className = 'cust enter'; el.style.left = (8 + slot * 138) + 'px';
    const s = sauceById(order.sauce);
    const extras = order.tops.map(t => ART.TOP_ICON[t]).join('') + (order.kimchi ? ART.TOP_ICON.kimchi : '');
    el.innerHTML = `<div class="bubble"><span class="o-price">$${c.price}</span><div class="o-main">${ART.chicken('#e09a2f', s.color, order.tops.filter(t => ART.TOP_OVER[t]).map(t => ART.TOP_OVER[t]).join(''))}<span class="o-sauce" style="background:${s.color}">${s.name}</span></div><div class="o-extras">${extras}</div></div><div class="person">${ART.person(c.look, 'happy')}</div><div class="pat"><i></i></div>`;
    el.setAttribute('role', 'button'); el.setAttribute('aria-label', `Customer ordering ${s.name}`);
    c.el = el; c.pat = el.querySelector('.pat i'); c.personEl = el.querySelector('.person');
    tap(el, () => onCustomer(c));
    $('#customers').appendChild(el);
    setTimeout(() => { if (!c.leaving) { el.classList.remove('enter'); el.classList.add('idle'); } }, 620);
    S.customers[slot] = c; SFX.bell();
    return c;
  }
  function updateCust(c) {
    const f = Math.max(0, c.patience / c.max);
    c.pat.style.width = (f * 100) + '%';
    c.pat.style.background = f > 0.6 ? '#4cc84a' : f > 0.3 ? '#ffc107' : '#f44336';
    const mood = f > 0.6 ? 'happy' : f > 0.3 ? 'ok' : 'mad';
    if (mood !== c.mood) { c.mood = mood; c.personEl.innerHTML = ART.person(c.look, mood); }
  }
  function customerLeave(c, happy) {
    c.leaving = true;
    c.personEl.innerHTML = ART.person(c.look, happy ? 'joy' : 'mad');
    c.el.classList.remove('idle', 'enter', 'hl'); c.el.classList.add(happy ? 'leave-happy' : 'leave-mad');
    setTimeout(() => { c.el.remove(); if (S.customers[c.slot] === c) S.customers[c.slot] = null; }, 850);
  }
  function makeAngry(c, why) {
    S.combo = 0; S.hearts--; S.angry++; S.totalAngry++;
    floatAt(c.el, '💢 -1 ❤', 'red', -40); SFX.angry(); shakeStage();
    if (why) toast(why);
    customerLeave(c, false); renderHUD();
    if (S.hearts <= 0) { S.ended = true; setTimeout(() => gameOver('Too many unhappy customers – your reputation ran out!'), 1000); }
  }

  /* ---------- player actions ---------- */
  function onChickenBox() {
    const box = $('#chickenBox');
    if (!allowed('box')) return deny(box);
    const i = S.fryers.findIndex(f => f.state === 'empty');
    if (i < 0) return deny(box, 'All fryers are busy!');
    Object.assign(S.fryers[i], { state: 'cooking', t: 0, burnt: false, ready: false });
    SFX.fry(); renderFryer(i); floatAt(fryerEls[i], '🍗 sizzle!', 'gold', -20);
    tutAdvance('box');
  }
  function onFryer(i) {
    const f = S.fryers[i], el = fryerEls[i];
    if (S.tut >= 0 && TUT[S.tut].key === 'box') return onChickenBox();
    if (f.state === 'empty') return onChickenBox();
    if (f.burnt) {
      Object.assign(f, { state: 'empty', t: 0, burnt: false }); SFX.deny(); floatAt(el, 'Tossed 🗑️', 'red'); renderFryer(i); return;
    }
    if (f.t < S.p.cook) return deny(el, 'Not golden yet – wait for READY!');
    if (!allowed('fryer')) return deny(el);
    if (!S.plate.chicken) S.plate.chicken = true;
    else {
      const s = S.tray.indexOf(null);
      if (s < 0) return deny(el, 'Plate and warmer are full!');
      S.tray[s] = true; renderTray();
    }
    const perfect = f.t - S.p.cook < S.p.window * 0.6;
    Object.assign(f, { state: 'empty', t: 0, burnt: false, ready: false });
    SFX.top(); sparks(el); if (perfect) floatAt(el, 'Golden!', 'gold', -20);
    renderFryer(i); renderPlate(); bumpPlate();
    tutAdvance('fryer');
  }
  function onTray(i, el) {
    if (!S.tray[i]) return;
    if (!allowed('tray')) return deny(el);
    if (S.plate.chicken) return deny(el, 'Plate busy – serve or trash it first');
    S.tray[i] = null; S.plate.chicken = true; SFX.top(); renderTray(); renderPlate(); bumpPlate();
  }
  function onSauce(id, el) {
    const s = sauceById(id);
    if (!unlocked(s)) return deny(el, `${s.name} unlocks on Day ${s.day}`);
    if (!allowed('sauce:' + id)) return deny(el, S.tut >= 0 ? 'Follow the tip above 👆' : '');
    if (!S.plate.chicken) return deny(el, 'Put fried chicken on the plate first');
    if (S.plate.sauce) return deny(el, 'Already sauced! Trash it to start over');
    S.plate.sauce = id; SFX.sauce(); sparks($('#plate'), s.color, 12); renderPlate(); bumpPlate();
    tutAdvance('sauce:' + id);
  }
  function onTop(id, el) {
    const t = topById(id);
    if (!unlocked(t)) return deny(el, `${t.name} unlocks on Day ${t.day}`);
    if (!allowed('top:' + id)) return deny(el, S.tut >= 0 ? 'Follow the tip above 👆' : '');
    if (!S.plate.chicken) return deny(el, 'Put fried chicken on the plate first');
    if (S.plate.tops.includes(id)) return deny(el, `${t.name} already added`);
    S.plate.tops.push(id); SFX.top(); renderPlate(); bumpPlate();
    tutAdvance('top:' + id);
  }
  function onKimchi(el) {
    if (S.day < KIMCHI_DAY) return deny(el, `Kimchi side unlocks on Day ${KIMCHI_DAY}`);
    if (!allowed('kimchi')) return deny(el);
    if (S.plate.kimchi) return deny(el, 'Kimchi already on the plate');
    S.plate.kimchi = true; SFX.top(); renderPlate(); bumpPlate();
  }
  function onTrash() {
    const pl = S.plate;
    if (!allowed('trash')) return deny($('#trash'));
    if (!pl.chicken && !pl.kimchi) return;
    S.plate = emptyPlate(); SFX.deny(); floatAt($('#plateWrap'), 'Trashed', 'red'); renderPlate();
  }
  function bumpPlate() { const w = $('#plateWrap'); w.classList.remove('bump'); void w.offsetWidth; w.classList.add('bump'); }
  const sameSet = (a, b) => a.length === b.length && a.every(x => b.includes(x));
  function onCustomer(c) {
    if (c.leaving || S.ended) return;
    const pl = S.plate;
    if (!allowed('serve')) return deny(null, 'Follow the tip above 👆');
    if (!pl.chicken) { c.el.classList.remove('shake'); void c.el.offsetWidth; c.el.classList.add('shake'); return deny(null, 'Make their order first!'); }
    if (!pl.sauce) return deny(null, 'Add a sauce first!');
    const o = c.order;
    let why = '';
    if (pl.sauce !== o.sauce) why = `Wrong sauce! They wanted ${sauceById(o.sauce).name}`;
    else if (!sameSet(pl.tops, o.tops)) why = pl.tops.length < o.tops.length || o.tops.some(t => !pl.tops.includes(t)) ? 'Missing a topping!' : 'Extra topping they didn’t order!';
    else if (pl.kimchi !== o.kimchi) why = o.kimchi ? 'Forgot the kimchi!' : 'They didn’t order kimchi!';
    S.plate = emptyPlate(); renderPlate();
    if (why) return makeAngry(c, '😠 ' + why);
    const frac = Math.max(0, c.patience / c.max);
    const tip = Math.round(c.price * 0.5 * frac);
    S.combo++; S.bestCombo = Math.max(S.bestCombo, S.combo);
    const bonus = S.combo >= 3 ? Math.min(5, S.combo - 2) : 0;
    const total = c.price + tip + bonus;
    S.wallet += total; S.score += total; S.dayCoins += total; S.tips += tip + bonus; S.served++; S.totalServed++;
    floatAt(c.el, `+$${c.price}`, 'gold', -30);
    if (tip > 0) setTimeout(() => floatAt(c.el, `TIP +$${tip}`, '', -10), 180);
    if (bonus) setTimeout(() => floatAt(c.el, `COMBO x${S.combo}! +$${bonus}`, 'combo', 10), 360);
    SFX.serve(); setTimeout(SFX.coin, 200); sparks(c.el, '#ffd23f', 14);
    const hc = $('#hudCoins'); hc.classList.remove('pop'); void hc.offsetWidth; hc.classList.add('pop');
    customerLeave(c, true); renderHUD();
    tutAdvance('serve');
  }

  /* ---------- tutorial ---------- */
  const TUT = [
    { key: 'box', text: '👋 Welcome to <b>MAMAZAN Legend</b>! Your first customer wants <b>Soy Garlic</b> chicken with <b>Sesame</b>.<br>👇 Tap the <b>Raw Chicken</b> box to start frying.', target: () => $('#chickenBox') },
    { key: 'fryer', text: 'Wait until it turns <b>golden – READY!</b> ✨ then tap the fryer.<br>Careful: later on, chicken <b>burns</b> if you wait too long!', target: () => fryerEls[0] },
    { key: 'sauce:soy', text: 'Now tap the <b>Soy Garlic</b> sauce to glaze it.', target: () => sauceEls.soy },
    { key: 'top:sesame', text: 'Sprinkle on the <b>Sesame</b> topping.', target: () => topEls.sesame },
    { key: 'serve', text: 'Order complete! 👆 <b>Tap the customer</b> to serve. Faster service = bigger tips.', target: () => S.customers.find(c => c && !c.leaving)?.el },
    { key: 'done', text: '🎉 Perfect! Serve everyone before their <b>patience bar</b> runs out – wrong or slow orders cost ❤️. Reach the <b>daily goal</b> to unlock new sauces!', target: () => null, button: true }
  ];
  function allowed(key) {
    if (!S || S.tut < 0) return true;
    return TUT[S.tut].key === key;
  }
  function clearHL() { $$('.hl').forEach(e => e.classList.remove('hl')); }
  function tutStep(n) {
    S.tut = n; clearHL();
    const st = TUT[n];
    if (n === 0 && !S.customers.some(Boolean)) spawnCustomer({ sauce: 'soy', tops: ['sesame'], kimchi: false }, 1);
    $('#tutBanner').classList.remove('hidden');
    $('#tutText').innerHTML = st.text;
    $('#tutNext').classList.toggle('hidden', !st.button);
    const t = st.target(); if (t) t.classList.add('hl');
  }
  function tutAdvance(key) {
    if (!S || S.tut < 0 || TUT[S.tut].key !== key) return;
    if (S.tut + 1 < TUT.length) tutStep(S.tut + 1);
  }
  function endTutorial() {
    if (!S || S.tut < 0) return;
    S.tut = -1; store.set(LS.tut, true); clearHL();
    $('#tutBanner').classList.add('hidden');
    S.spawnT = 1.5; bigMsg('Day 1', `Goal: $${S.p.goal}`);
  }

  /* ---------- main loop ---------- */
  function update(dt) {
    const p = S.p, tut = S.tut >= 0, speed = S.upgrades.fast ? 1.43 : 1;
    S.fryers.forEach((f, i) => {
      if (f.state !== 'cooking') return;
      f.t += dt * speed;
      if (tut) f.t = Math.min(f.t, p.cook + 0.3);
      if (!f.ready && f.t >= p.cook) { f.ready = true; SFX.ready(); sparks(fryerEls[i], '#fff36b', 8); }
      if (!f.burnt && f.t >= p.cook + p.window) { f.burnt = true; S.burnt++; S.combo = 0; SFX.burn(); toast('🔥 Burnt! Tap the fryer to toss it'); }
      renderFryer(i);
    });
    if (!tut) {
      if (!S.lastCall) {
        S.time -= dt;
        if (S.time <= 0) { S.time = 0; S.lastCall = true; bigMsg('Last orders!', 'Serve the remaining customers'); }
        else {
          S.spawnT -= dt;
          if (!S.customers.some(Boolean)) S.spawnT = Math.min(S.spawnT, 1.0);
          if (S.spawnT <= 0) S.spawnT = spawnCustomer() ? p.spawn * (0.75 + Math.random() * 0.5) : 0.6;
        }
      }
      S.customers.forEach(c => {
        if (!c || c.leaving) return;
        c.patience -= dt;
        if (c.patience <= 0) makeAngry(c, '😤 Too slow! A customer walked out');
        else updateCust(c);
      });
      if (S.lastCall && !S.ended && S.customers.every(c => !c)) endDay();
    }
    if (!S.ended) renderHUD();
  }
  let last = performance.now();
  function frame(now) {
    const dt = Math.min(0.1, (now - last) / 1000); last = now;
    if (S && S.screen === 'play' && !S.paused && !S.ended) update(dt);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  /* ---------- pause / sound ---------- */
  function pause() { if (!S || S.screen !== 'play' || S.ended || S.paused) return; S.paused = true; $('#scrPause').classList.remove('hidden'); }
  function resume() { if (!S) return; S.paused = false; $('#scrPause').classList.add('hidden'); last = performance.now(); }
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
  function syncMute() { $('#btnMute').textContent = SFX.muted ? '🔇' : '🔊'; }
  $('#btnMute').addEventListener('click', () => { SFX.init(); SFX.toggle(); syncMute(); });
  syncMute();
  $('#btnPause').addEventListener('click', pause);
  $('#btnResume').addEventListener('click', resume);
  $('#btnQuit').addEventListener('click', () => { S.ended = true; $('#tutBanner').classList.add('hidden'); showScreen('title'); });

  /* ---------- share ---------- */
  function gameplayShareUrl() {
    const url = new URL(location.href);
    ['daylen', 'channel', 'fbclid', 'gclid'].forEach(key => url.searchParams.delete(key));
    Array.from(url.searchParams.keys()).filter(key => key.startsWith('utm_')).forEach(key => url.searchParams.delete(key));
    url.hash = '';
    url.searchParams.set('utm_source', 'x');
    url.searchParams.set('utm_medium', 'social');
    url.searchParams.set('utm_campaign', 'mamazan_legend');
    return url.toString();
  }
  function shareX() {
    const sc = S ? S.score : 0, d = S ? S.day : 1;
    const text = S && S.screen === 'day'
      ? `I just cleared Day ${d} of MAMAZAN Legend 🍗🔥 with $${sc} earned! Fry, sauce & serve Korean fried chicken – can you beat me?`
      : `I scored $${sc} and reached Day ${d} in MAMAZAN Legend 🍗🔥 Fry, sauce & serve Korean fried chicken – can you beat me?`;
    const url = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text) +
      '&hashtags=' + encodeURIComponent('MAMAZANLegend,KoreanFriedChicken') + '&url=' + encodeURIComponent(gameplayShareUrl());
    window.open(url, '_blank', 'noopener');
  }
  $$('[data-share]').forEach(b => b.addEventListener('click', shareX));

  /* ---------- sample request form ---------- */
  const form = $('#sampleForm');
  let sampleSending = false;
  function formData() {
    const fd = new FormData(form);
    return {
      name: (fd.get('name') || '').trim(), company: (fd.get('company') || '').trim(), country: (fd.get('country') || '').trim(),
      business: fd.get('business') || '', email: (fd.get('email') || '').trim(), products: fd.getAll('products'),
      message: (fd.get('message') || '').trim()
    };
  }
  const SAMPLE_EMAIL = 'wjzta10018545@gmail.com';
  function mailtoFor(d) {
    const body = [
      'Hello MAMAZAN / Deesheng team,', '', 'I would like to request MAMAZAN sauce samples for my business.', '',
      `Name: ${d.name}`, `Company: ${d.company}`, `Country: ${d.country}`, `Business type: ${d.business}`, `Email: ${d.email}`,
      `Products of interest: ${d.products.join(', ') || '-'}`, `Message: ${d.message || '-'}`, '', '(Sent from the MAMAZAN Legend game)'
    ].join('\n');
    return 'mailto:' + SAMPLE_EMAIL + '?subject=' + encodeURIComponent(`Sample request – ${d.company || 'MAMAZAN Legend'}`) + '&body=' + encodeURIComponent(body);
  }
  form.addEventListener('input', () => { $('#formErr').textContent = ''; });
  $('#mailFallback').addEventListener('click', e => { e.currentTarget.href = mailtoFor(formData()); });
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (sampleSending) return;
    const d = formData(), err = $('#formErr');
    const miss = ['name', 'company', 'country', 'business', 'email'].filter(k => !d[k]);
    if (miss.length) { err.textContent = 'Please fill in: ' + miss.join(', '); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email)) { err.textContent = 'Please enter a valid email address'; return; }
    err.textContent = '';
    sampleSending = true;
    const btn = form.querySelector('button[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
    $('#mailSend').href = mailtoFor(d);
    $('#mailFallback').href = mailtoFor(d);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch('https://formsubmit.co/ajax/' + SAMPLE_EMAIL, {
        method: 'POST',
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `MAMAZAN Legend sample request – ${d.company}`,
          _template: 'table',
          _captcha: 'false',
          name: d.name,
          company: d.company,
          country: d.country,
          business_type: d.business,
          email: d.email,
          _replyto: d.email,
          products: d.products.join(', ') || '-',
          message: d.message || '-',
          game_score: S ? S.score : '',
          game_day: S ? S.day : '',
          source: 'MAMAZAN Legend game',
          landing_page: location.origin + location.pathname,
          utm_source: (qs.get('utm_source') || 'direct').slice(0, 100),
          utm_medium: (qs.get('utm_medium') || '').slice(0, 100),
          utm_campaign: (qs.get('utm_campaign') || '').slice(0, 100)
        })
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const result = await res.json();
      if (!result || (result.success !== true && result.success !== 'true')) throw new Error('Submission was not accepted');
      form.classList.add('hidden'); $('#formDone').classList.remove('hidden');
      // Audio is optional; a blocked audio context must not undo confirmed delivery.
      try { SFX.init(); SFX.win(); } catch (soundError) {}
    } catch (ex) {
      err.textContent = 'We could not confirm your request was sent. Your details are still here. Please try again or use the email link below.';
      form.classList.remove('hidden'); $('#formDone').classList.add('hidden');
    } finally {
      clearTimeout(timeout);
      sampleSending = false;
      if (btn) { btn.disabled = false; btn.textContent = 'Request free samples'; }
    }
  });
  function openSamples(e) {
    form.classList.remove('hidden'); $('#formDone').classList.add('hidden'); $('#formErr').textContent = '';
    openOverlay('#scrSample', e && e.currentTarget ? e.currentTarget : document.activeElement);
  }
  $$('[data-cta]').forEach(b => b.addEventListener('click', openSamples));
  $$('#scrSample [data-close]').forEach(b => b.addEventListener('click', () => closeOverlay('#scrSample')));
  $$('#scrHow [data-close]').forEach(b => b.addEventListener('click', () => closeOverlay('#scrHow')));

  /* ---------- real products ---------- */
  function openProducts(e) {
    const panel = $('#scrProducts'), list = $('#productList');
    if (!panel || !list) return;
    list.innerHTML = PRODUCTS.map(p => `<article class="product-card">
      <div class="product-swatch">${ART.sauceBottle(sauceById(p.id).color)}</div>
      <div class="product-copy"><h3>${p.name}</h3><p class="product-note">${p.note}</p>
      <button class="btn small product-select" type="button" data-product="${p.id}">Request this sample →</button></div>
    </article>`).join('');
    openOverlay('#scrProducts', e && e.currentTarget ? e.currentTarget : document.activeElement);
  }
  const productsButton = $('#btnProducts');
  if (productsButton) productsButton.addEventListener('click', openProducts);
  $$('[data-products]').filter(b => b !== productsButton).forEach(b => b.addEventListener('click', openProducts));
  const productList = $('#productList');
  if (productList) productList.addEventListener('click', e => {
    const button = e.target.closest('[data-product]');
    if (!button || !productList.contains(button)) return;
    const product = PRODUCTS.find(p => p.id === button.dataset.product);
    if (!product) return;
    Array.from(form.querySelectorAll('input[name="products"]')).forEach(input => {
      if (input.value === product.interest) input.checked = true;
    });
    const message = form.querySelector('[name="message"]');
    if (message && !message.value.includes(product.name)) {
      message.value = (message.value ? message.value + '\n' : '') + 'Interested in: ' + product.name;
    }
    closeOverlay('#scrProducts');
    openSamples();
  });
  $$('#scrProducts [data-close]').forEach(b => b.addEventListener('click', () => closeOverlay('#scrProducts')));

  /* ---------- wiring ---------- */
  tap($('#chickenBox'), onChickenBox);
  tap($('#trash'), onTrash);
  $('#btnPlay').addEventListener('click', () => { SFX.init(); SFX.tap(); newGame(); });
  $('#btnHow').addEventListener('click', e => openOverlay('#scrHow', e.currentTarget));
  $('#btnNextDay').addEventListener('click', () => { SFX.tap(); S.hearts = Math.min(5, S.hearts + 1); startDay(S.day + 1); });
  $('#btnRetryDay').addEventListener('click', () => { SFX.tap(); const sn = S.snapshot; Object.assign(S, { wallet: sn.wallet, score: sn.score, hearts: Math.max(3, sn.hearts), upgrades: { ...sn.upgrades }, totalServed: sn.totalServed, totalAngry: sn.totalAngry }); startDay(sn.day); });
  $('#btnRestart').addEventListener('click', () => { SFX.tap(); newGame(); });
  $('#tutNext').addEventListener('click', endTutorial);
  $('#tutSkip').addEventListener('click', endTutorial);
  $('#logoChicken').innerHTML = ART.logo();
  addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const overlay = ['#scrSample', '#scrProducts', '#scrHow'].find(selector => !$(selector).classList.contains('hidden'));
    if (overlay) { e.preventDefault(); closeOverlay(overlay); }
    else if (S && S.paused) resume();
    else pause();
  });

  // read-only hook for automated tests
  window.__MCL = { get state() { return S; }, SAUCES, TOPS };
  showScreen('title');
})();
