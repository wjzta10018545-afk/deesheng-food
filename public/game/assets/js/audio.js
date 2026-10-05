/* Tiny WebAudio synth – all sounds generated in code */
window.SFX = (() => {
  let ctx = null, master = null, muted = false, noiseBuf = null;
  try { muted = localStorage.getItem('mcl_mute') === '1'; } catch (e) {}
  function init() {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = muted ? 0 : 0.5; master.connect(ctx.destination);
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 1, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  function tone(freq, dur = 0.12, type = 'sine', vol = 0.3, when = 0, slide = 0) {
    if (!ctx || muted) return;
    const t = ctx.currentTime + when, o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, freq + slide), t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(master); o.start(t); o.stop(t + dur + 0.05);
  }
  function noise(dur = 0.3, vol = 0.2, freq = 3000, when = 0) {
    if (!ctx || muted) return;
    const t = ctx.currentTime + when, s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = noiseBuf; f.type = 'bandpass'; f.frequency.value = freq; f.Q.value = 0.8;
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(master); s.start(t); s.stop(t + dur + 0.05);
  }
  const api = {
    init,
    get muted() { return muted; },
    toggle() { muted = !muted; try { localStorage.setItem('mcl_mute', muted ? '1' : '0'); } catch (e) {} if (master) master.gain.value = muted ? 0 : 0.5; return muted; },
    tap() { tone(520, 0.06, 'triangle', 0.18); },
    fry() { noise(0.45, 0.22, 4200); noise(0.3, 0.12, 1800, 0.1); },
    ready() { tone(880, 0.1, 'sine', 0.25); tone(1320, 0.14, 'sine', 0.2, 0.08); },
    sauce() { noise(0.12, 0.25, 700); tone(180, 0.12, 'sine', 0.15, 0, -60); },
    top() { tone(1200, 0.04, 'triangle', 0.12); tone(1500, 0.04, 'triangle', 0.1, 0.04); },
    serve() { [660, 880, 1100].forEach((f, i) => tone(f, 0.12, 'square', 0.09, i * 0.07)); },
    coin() { tone(1568, 0.08, 'square', 0.08); tone(2093, 0.16, 'square', 0.08, 0.07); },
    angry() { tone(220, 0.35, 'sawtooth', 0.15, 0, -120); tone(160, 0.35, 'sawtooth', 0.1, 0.05, -80); },
    burn() { noise(0.6, 0.25, 600); tone(110, 0.4, 'sawtooth', 0.08, 0, -40); },
    deny() { tone(200, 0.1, 'square', 0.08); },
    bell() { tone(1046, 0.5, 'sine', 0.2); tone(1568, 0.4, 'sine', 0.1, 0.02); },
    win() { [523, 659, 784, 1046, 1318].forEach((f, i) => tone(f, 0.18, 'triangle', 0.18, i * 0.1)); },
    lose() { [392, 330, 262, 196].forEach((f, i) => tone(f, 0.25, 'triangle', 0.18, i * 0.15)); }
  };
  return api;
})();
