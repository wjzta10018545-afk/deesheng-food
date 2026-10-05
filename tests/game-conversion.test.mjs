import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const gameSource = readFileSync(new URL('../public/game/assets/js/game.js', import.meta.url), 'utf8');

// Run the real event handlers in an isolated DOM stub. fetch never leaves this process.
function harness({ href = 'https://mamazan-legend.vercel.app/', fetchResult, soundFailure } = {}) {
  const elements = new Map(), storage = new Map(), requests = [], opened = [], globalListeners = new Map(), timers = new Map();
  let nextTimer = 1;
  let document;
  class Element {
    constructor(id = '') {
      this.id = id;
      this.value = '';
      this.textContent = '';
      this.innerHTML = '';
      this.dataset = {};
      this.listeners = new Map();
      this.style = { setProperty() {} };
      this.disabled = false;
      this.checked = false;
      this.classes = new Set(id.startsWith('scr') && id !== 'scrTitle' || id === 'formDone' ? ['hidden'] : []);
      this.classList = {
        add: (...classes) => classes.forEach(c => this.classes.add(c)),
        remove: (...classes) => classes.forEach(c => this.classes.delete(c)),
        contains: c => this.classes.has(c),
        toggle: (c, force) => {
          const enabled = force === undefined ? !this.classes.has(c) : force;
          if (enabled) this.classes.add(c); else this.classes.delete(c);
          return enabled;
        }
      };
    }
    addEventListener(type, callback) {
      const callbacks = this.listeners.get(type) || [];
      callbacks.push(callback);
      this.listeners.set(type, callbacks);
    }
    async fire(type, event = {}) {
      event = { preventDefault() {}, target: this, ...event, currentTarget: this };
      for (const callback of this.listeners.get(type) || []) await callback(event);
    }
    setAttribute() {}
    focus() { document.activeElement = this; }
    contains(el) { return this === elements.get('productList') && el.dataset.product !== undefined; }
    closest(selector) { return selector === '[data-product]' && this.dataset.product !== undefined ? this : null; }
    querySelector(selector) {
      if (this.id === 'sampleForm') {
        if (selector === 'button[type="submit"]') return get('submit');
        if (selector === '[name="message"]') return fields.message;
      }
      if (selector === 'input, button, a, select, textarea') {
        if (this.id === 'scrSample') return fields.name;
        if (this.id === 'scrProducts') return get('firstProduct');
        if (this.id === 'scrHow') return get('howClose');
      }
      return null;
    }
    querySelectorAll(selector) { return this.id === 'sampleForm' && selector === 'input[name="products"]' ? productInputs : []; }
  }
  function get(id) { if (!elements.has(id)) elements.set(id, new Element(id)); return elements.get(id); }
  const fields = Object.fromEntries(Object.entries({
    name: 'Test Buyer', company: 'Test Company', country: 'Canada', business: 'Importer',
    email: 'buyer@example.test', message: 'Please quote for our restaurant.'
  }).map(([key, value]) => { const field = new Element(key); field.value = value; return [key, field]; }));
  const productInputs = ['Korean fried chicken sauces', 'Gochujang / Korean pastes', 'OEM / private label'].map(value => {
    const field = new Element(); field.value = value; field.checked = value === 'OEM / private label'; return field;
  });
  const collections = {
    '[data-share]': [get('share')], '[data-cta]': [get('cta')], '[data-products]': [get('btnProducts'), get('endProducts')],
    '#scrSample [data-close]': [get('sampleClose')], '#scrHow [data-close]': [get('howClose')],
    '#scrProducts [data-close]': [get('productsClose')]
  };
  document = {
    activeElement: get('btnPlay'), hidden: false,
    querySelector: selector => selector.startsWith('#') ? get(selector.slice(1)) : null,
    querySelectorAll: selector => collections[selector] || [],
    addEventListener() {}, createElement: () => new Element()
  };
  const location = new URL(href);
  const window = { open: (...args) => opened.push(args) };
  class FakeFormData {
    get(key) { return fields[key]?.value || ''; }
    getAll(key) { return key === 'products' ? productInputs.filter(f => f.checked).map(f => f.value) : []; }
  }
  const context = vm.createContext({
    document, window, location, navigator: { language: 'en-US' },
    innerWidth: 420, innerHeight: 760, performance: { now: () => 0 },
    URL, URLSearchParams, FormData: FakeFormData, AbortController,
    localStorage: { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) },
    addEventListener: (type, callback) => globalListeners.set(type, callback),
    requestAnimationFrame() {},
    setTimeout: callback => { const id = nextTimer++; timers.set(id, callback); return id; },
    clearTimeout: id => timers.delete(id),
    ART: { logo: () => '<svg></svg>', sauceBottle: color => `<svg data-color="${color}"></svg>` },
    SFX: {
      muted: false,
      init() { if (soundFailure === 'init') throw new Error('Audio context unavailable'); },
      win() { if (soundFailure === 'win') throw new Error('Audio playback unavailable'); }
    },
    fetch: async (url, options) => {
      requests.push({ url, options, body: JSON.parse(options.body) });
      return fetchResult ? fetchResult(requests.length, options) : { ok: true, json: async () => ({ success: true }) };
    }
  });
  vm.runInContext(gameSource, context, { filename: 'game.js' });
  const submit = () => get('sampleForm').fire('submit');
  const escape = () => globalListeners.get('keydown')({ key: 'Escape', preventDefault() {} });
  const runTimers = () => { const callbacks = Array.from(timers.values()); timers.clear(); callbacks.forEach(callback => callback()); };
  return { get, fields, productInputs, requests, opened, storage, submit, escape, document, runTimers };
}

function assertRetainedForm(app) {
  assert.equal(app.get('sampleForm').classList.contains('hidden'), false);
  assert.equal(app.get('formDone').classList.contains('hidden'), true);
  assert.match(app.get('formErr').textContent, /could not confirm/i);
  assert.equal(app.fields.company.value, 'Test Company');
  assert.equal(app.fields.email.value, 'buyer@example.test');
  assert.equal(app.fields.message.value, 'Please quote for our restaurant.');
  assert.equal(app.get('submit').disabled, false);
  assert.match(decodeURIComponent(app.get('mailFallback').href), /buyer@example.test/);
  assert.equal(app.storage.has('mcl_sample_requests'), false);
}

test('network failure retains details, exposes email fallback and restores retry button', async () => {
  const app = harness({ fetchResult: async () => { throw new Error('offline'); } });
  await app.submit();
  assertRetainedForm(app);
});

test('non-200, API rejection, malformed JSON and missing success never show submitted screen', async t => {
  const cases = {
    'HTTP 500': { ok: false, status: 500, json: async () => ({ success: true }) },
    'false boolean': { ok: true, json: async () => ({ success: false }) },
    'false string': { ok: true, json: async () => ({ success: 'false' }) },
    'malformed JSON': { ok: true, json: async () => { throw new SyntaxError('invalid json'); } },
    'missing success': { ok: true, json: async () => ({ message: 'not accepted' }) },
    'null response': { ok: true, json: async () => null }
  };
  for (const [name, response] of Object.entries(cases)) await t.test(name, async () => {
    const app = harness({ fetchResult: async () => response });
    await app.submit();
    assertRetainedForm(app);
  });
});

test('only explicit true success shows confirmation and sends correct Reply-To and source fields', async t => {
  for (const success of [true, 'true']) await t.test(String(success) + ' (' + typeof success + ')', async () => {
    const app = harness({
      href: 'https://mamazan-legend.vercel.app/?utm_source=x&utm_medium=social&utm_campaign=launch',
      fetchResult: async () => ({ ok: true, json: async () => ({ success }) })
    });
    await app.submit();
    assert.equal(app.get('sampleForm').classList.contains('hidden'), true);
    assert.equal(app.get('formDone').classList.contains('hidden'), false);
    assert.equal(app.get('submit').disabled, false);
    const request = app.requests[0];
    assert.equal(request.url, 'https://formsubmit.co/ajax/wjzta10018545@gmail.com');
    assert.equal(request.body.email, 'buyer@example.test');
    assert.equal(request.body._replyto, 'buyer@example.test');
    assert.equal(request.body.reply_to, undefined);
    assert.equal(request.body.utm_source, 'x');
    assert.equal(request.body.utm_campaign, 'launch');
    assert.equal(request.body.landing_page, 'https://mamazan-legend.vercel.app/');
    assert.equal(app.storage.has('mcl_sample_requests'), false);
  });
});

test('retry submits retained details successfully after initial rejection', async () => {
  const app = harness({ fetchResult: async count => ({ ok: true, json: async () => ({ success: count > 1 }) }) });
  await app.submit();
  assertRetainedForm(app);
  await app.submit();
  assert.equal(app.requests.length, 2);
  assert.equal(app.requests[1].body.company, app.requests[0].body.company);
  assert.equal(app.requests[1].body.message, app.requests[0].body.message);
  assert.equal(app.get('formDone').classList.contains('hidden'), false);
});

test('optional audio errors cannot turn an accepted submission into a delivery failure', async t => {
  for (const soundFailure of ['init', 'win']) await t.test(soundFailure, async () => {
    const app = harness({ soundFailure });
    await app.submit();
    assert.equal(app.requests.length, 1);
    assert.equal(app.get('sampleForm').classList.contains('hidden'), true);
    assert.equal(app.get('formDone').classList.contains('hidden'), false);
    assert.equal(app.get('formErr').textContent, '');
    assert.equal(app.get('submit').disabled, false);
  });
});

test('duplicate clicks during a pending request do not send a second submission', async () => {
  let release;
  const response = new Promise(resolve => { release = resolve; });
  const app = harness({ fetchResult: () => response });
  const first = app.submit();
  assert.equal(app.get('submit').disabled, true);
  await app.submit();
  assert.equal(app.requests.length, 1);
  release({ ok: true, json: async () => ({ success: true }) });
  await first;
  assert.equal(app.get('submit').disabled, false);
});

test('request timeout aborts the pending request and restores the filled form', async () => {
  const app = harness({ fetchResult: (_count, options) => new Promise((_resolve, reject) => {
    options.signal.addEventListener('abort', () => reject(new Error('request timed out')));
  }) });
  const pending = app.submit();
  assert.equal(app.get('submit').disabled, true);
  app.runTimers();
  await pending;
  assert.equal(app.requests[0].options.signal.aborted, true);
  assertRetainedForm(app);
});

test('invalid email is rejected before any request', async () => {
  const app = harness();
  app.fields.email.value = 'wrong-address';
  await app.submit();
  assert.equal(app.requests.length, 0);
  assert.match(app.get('formErr').textContent, /valid email/);
});

test('sharing retains root or subpath gameplay URL and removes testing and old tracking parameters', async t => {
  for (const path of ['/', '/game/', '/game/index.html']) await t.test(path, async () => {
    const href = 'https://mamazan-legend.vercel.app' + path + '?daylen=10&channel=test&utm_source=old&utm_content=prior&fbclid=old&view=en#test';
    const app = harness({ href });
    await app.get('share').fire('click');
    const intent = new URL(app.opened[0][0]);
    const shared = new URL(intent.searchParams.get('url'));
    assert.equal(shared.origin, 'https://mamazan-legend.vercel.app');
    assert.equal(shared.pathname, path);
    assert.equal(shared.hash, '');
    assert.equal(shared.searchParams.get('utm_source'), 'x');
    assert.equal(shared.searchParams.get('utm_medium'), 'social');
    assert.equal(shared.searchParams.get('utm_campaign'), 'mamazan_legend');
    assert.equal(shared.searchParams.get('view'), 'en');
    for (const key of ['daylen', 'channel', 'fbclid', 'utm_content']) assert.equal(shared.searchParams.has(key), false);
    assert.match(intent.searchParams.get('text'), /MAMAZAN Legend/);
  });
});

test('real product selection preselects interest without removing other inputs and avoids duplicate flavor text', async () => {
  const app = harness();
  await app.get('btnProducts').fire('click');
  assert.equal(app.get('scrProducts').classList.contains('hidden'), false);
  assert.match(app.get('productList').innerHTML, /Soy Garlic Fried Chicken Sauce/);
  assert.match(app.get('productList').innerHTML, /Extra Spicy Fried Chicken Sauce/);
  assert.doesNotMatch(app.get('productList').innerHTML, /Yangnyeom/);
  const button = app.get('productSelect'); button.dataset.product = 'gochu';
  await app.get('productList').fire('click', { target: button });
  assert.equal(app.get('scrProducts').classList.contains('hidden'), true);
  assert.equal(app.get('scrSample').classList.contains('hidden'), false);
  assert.equal(app.productInputs.find(input => input.value === 'Gochujang / Korean pastes').checked, true);
  assert.equal(app.productInputs.find(input => input.value === 'OEM / private label').checked, true);
  assert.equal(app.fields.message.value, 'Please quote for our restaurant.\nInterested in: Korean Gochujang');
  assert.equal(app.fields.company.value, 'Test Company');
  await app.get('btnProducts').fire('click');
  await app.get('productList').fire('click', { target: button });
  assert.equal(app.fields.message.value.split('Korean Gochujang').length - 1, 1);
});

test('Escape closes product and sample dialogs and returns focus to the opener', async () => {
  const app = harness();
  await app.get('btnProducts').fire('click');
  app.escape();
  assert.equal(app.get('scrProducts').classList.contains('hidden'), true);
  assert.equal(app.document.activeElement, app.get('btnProducts'));
  await app.get('cta').fire('click');
  app.escape();
  assert.equal(app.get('scrSample').classList.contains('hidden'), true);
  assert.equal(app.document.activeElement, app.get('cta'));
});
