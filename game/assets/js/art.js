/* MAMAZAN Legend – original vector art (inline SVG, no external assets) */
window.ART = (() => {
  const BLOB = 'M10 50 Q5 32 22 26 Q30 11 47 19 Q58 9 70 22 Q90 22 89 42 Q96 60 77 67 Q62 79 46 71 Q26 78 16 66 Q4 61 10 50Z';
  const BLOB2 = 'M40 40 Q36 28 50 25 Q58 16 68 25 Q82 26 80 40 Q84 52 70 55 Q58 62 50 55 Q38 57 40 40Z';
  function crumbs(c) {
    return `<g fill="${c}" opacity=".55"><circle cx="24" cy="44" r="3"/><circle cx="36" cy="33" r="2.5"/><circle cx="55" cy="30" r="3"/><circle cx="72" cy="38" r="2.5"/><circle cx="62" cy="55" r="3"/><circle cx="40" cy="58" r="2.5"/><circle cx="78" cy="52" r="2"/><circle cx="28" cy="56" r="2"/></g>`;
  }
  // fried chicken pile; fill = fry colour, glaze = sauce colour or null
  function chicken(fill = '#e3a33a', glaze = null, extra = '') {
    const stroke = '#5a2a0a';
    const g = glaze ? `<path d="${BLOB}" fill="${glaze}" opacity=".88"/><path d="${BLOB2}" fill="${glaze}" opacity=".5"/>` : '';
    return `<svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg"><path class="ck-body" d="${BLOB}" fill="${fill}" stroke="${stroke}" stroke-width="3" stroke-linejoin="round"/><path class="ck-body2" d="${BLOB2}" fill="${fill}" stroke="${stroke}" stroke-width="2" opacity=".9"/>${crumbs('#8a4a12')}${g}<ellipse cx="34" cy="34" rx="11" ry="5" fill="#fff" opacity=".45" transform="rotate(-18 34 34)"/>${extra}</svg>`;
  }
  function sauceBottle(color, label = '엄마찬') {
    return `<svg viewBox="0 0 40 70" xmlns="http://www.w3.org/2000/svg"><path d="M18 1 L22 1 L23 10 L17 10Z" fill="#fff" stroke="#3a1a08" stroke-width="1.5"/><rect x="10.5" y="9" width="19" height="9" rx="2.5" fill="#fff" stroke="#3a1a08" stroke-width="2"/><rect x="4" y="16" width="32" height="52" rx="10" fill="${color}" stroke="#3a1a08" stroke-width="2.5"/><rect x="7.5" y="32" width="25" height="19" rx="4" fill="#fff8e8"/><text x="20" y="41" font-size="7.5" text-anchor="middle" font-weight="900" fill="${color}" font-family="sans-serif">${label}</text><text x="20" y="48" font-size="4.6" text-anchor="middle" font-weight="900" fill="#3a1a08" font-family="sans-serif">MAMAZAN</text><rect x="8" y="20" width="5" height="40" rx="2.5" fill="#fff" opacity=".35"/></svg>`;
  }
  const TOP_ICON = {
    sesame: `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><ellipse cx="20" cy="26" rx="17" ry="10" fill="#c8732e" stroke="#5a2a0a" stroke-width="2"/><ellipse cx="20" cy="22" rx="15" ry="6" fill="#f7e7c4"/><g fill="#fffdf5" stroke="#bfa774" stroke-width=".6"><ellipse cx="12" cy="21" rx="2.2" ry="1.3" transform="rotate(20 12 21)"/><ellipse cx="18" cy="19" rx="2.2" ry="1.3" transform="rotate(-30 18 19)"/><ellipse cx="25" cy="21" rx="2.2" ry="1.3" transform="rotate(40 25 21)"/><ellipse cx="29" cy="23" rx="2.2" ry="1.3"/><ellipse cx="16" cy="24" rx="2.2" ry="1.3" transform="rotate(-10 16 24)"/><ellipse cx="22" cy="25" rx="2.2" ry="1.3" transform="rotate(60 22 25)"/></g><g fill="#2a2a2a"><ellipse cx="21" cy="16" rx="1.8" ry="1.1"/><ellipse cx="14" cy="17" rx="1.8" ry="1.1"/></g></svg>`,
    onion: `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><ellipse cx="20" cy="26" rx="17" ry="10" fill="#c8732e" stroke="#5a2a0a" stroke-width="2"/><ellipse cx="20" cy="22" rx="15" ry="6" fill="#f7e7c4"/><g fill="none" stroke="#3fae3a" stroke-width="2.4"><circle cx="13" cy="19" r="3.4"/><circle cx="21" cy="17" r="3.4"/><circle cx="27" cy="21" r="3.4"/><circle cx="18" cy="23" r="3"/></g><g fill="none" stroke="#b7e86a" stroke-width="1"><circle cx="13" cy="19" r="1.6"/><circle cx="21" cy="17" r="1.6"/><circle cx="27" cy="21" r="1.6"/></g></svg>`,
    radish: `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><ellipse cx="20" cy="26" rx="17" ry="10" fill="#4f8fd8" stroke="#1f3f6a" stroke-width="2"/><ellipse cx="20" cy="22" rx="15" ry="6" fill="#e8f1ff"/><g stroke="#c9b24a" stroke-width="1"><rect x="9" y="15" width="7" height="7" rx="1.5" fill="#fffbd6" transform="rotate(-10 12 18)"/><rect x="17" y="12" width="7" height="7" rx="1.5" fill="#fff6b8"/><rect x="24" y="16" width="7" height="7" rx="1.5" fill="#fffbd6" transform="rotate(12 27 19)"/><rect x="15" y="19" width="7" height="7" rx="1.5" fill="#fff3a6"/></g></svg>`,
    kimchi: `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M3 22 Q20 40 37 22Z" fill="#f2f2f2" stroke="#3a1a08" stroke-width="2"/><path d="M6 22 Q9 10 16 13 Q20 6 26 12 Q33 10 34 22Z" fill="#e8412a" stroke="#8a1a0a" stroke-width="1.5"/><path d="M12 20 Q14 14 19 16 M22 19 Q25 13 29 17" fill="none" stroke="#ffd6a8" stroke-width="2" stroke-linecap="round"/><circle cx="15" cy="16" r="1" fill="#fff8c8"/><circle cx="27" cy="15" r="1" fill="#fff8c8"/></svg>`
  };
  // overlay pieces drawn ON the chicken (viewBox 0 0 100 80)
  const TOP_OVER = {
    sesame: `<g fill="#fffdf2" stroke="#a89060" stroke-width=".5">${[[25,40],[40,30],[52,24],[66,32],[78,44],[60,48],[45,50],[30,58],[55,62],[70,58],[36,42],[82,52]].map(([x,y],i)=>`<ellipse cx="${x}" cy="${y}" rx="2.6" ry="1.4" transform="rotate(${(i*47)%180} ${x} ${y})"/>`).join('')}</g>`,
    onion: `<g fill="none" stroke="#2f9e2a" stroke-width="2.6">${[[30,36],[50,28],[68,40],[44,54],[62,60],[24,54]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4"/>`).join('')}</g><g fill="none" stroke="#c4f07a" stroke-width="1">${[[30,36],[50,28],[68,40],[44,54]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.8"/>`).join('')}</g>`,
  };
  const SKIN = ['#ffd9b8', '#f1c096', '#d99a6c', '#a86b45', '#7a4a2e', '#ffe2c6'];
  const HAIR = ['#2a1a10', '#5a3418', '#111', '#c8862e', '#8a8a8a', '#e05a8a', '#3a5ad8'];
  const SHIRT = ['#e8412a', '#2f86d8', '#4cc84a', '#9b59d0', '#ff9f1c', '#1abc9c', '#ff6fa8', '#34495e'];
  function randLook(rng = Math.random) {
    const p = a => a[Math.floor(rng() * a.length)];
    return { skin: p(SKIN), hair: p(HAIR), shirt: p(SHIRT), style: Math.floor(rng() * 5), acc: Math.floor(rng() * 6) };
  }
  function person(l, mood = 'happy') {
    const hairPaths = [
      `<path d="M22 38 Q20 12 48 12 Q76 12 74 38 Q70 24 48 24 Q28 24 22 38Z" fill="${l.hair}"/>`,
      `<path d="M20 44 Q16 10 48 10 Q80 10 76 44 L72 36 Q68 22 48 22 Q30 22 24 36Z" fill="${l.hair}"/><path d="M20 44 Q18 64 26 72 L28 46Z M76 44 Q78 64 70 72 L68 46Z" fill="${l.hair}"/>`,
      `<path d="M24 34 Q24 16 48 16 Q72 16 72 34 Q60 26 48 30 Q36 26 24 34Z" fill="${l.hair}"/>`,
      `<circle cx="48" cy="10" r="9" fill="${l.hair}"/><path d="M22 38 Q20 14 48 14 Q76 14 74 38 Q70 26 48 26 Q28 26 22 38Z" fill="${l.hair}"/>`,
      `<path d="M22 36 Q22 14 48 14 Q74 14 74 36 Q66 22 56 28 Q50 20 42 28 Q32 22 22 36Z" fill="${l.hair}"/>`
    ];
    const eyes = mood === 'mad'
      ? `<path d="M33 37 L42 41 M63 37 L54 41" stroke="#3a1a08" stroke-width="3" stroke-linecap="round"/><circle cx="39" cy="45" r="3" fill="#3a1a08"/><circle cx="57" cy="45" r="3" fill="#3a1a08"/>`
      : mood === 'joy'
      ? `<path d="M34 45 Q39 39 44 45 M52 45 Q57 39 62 45" stroke="#3a1a08" stroke-width="3" fill="none" stroke-linecap="round"/>`
      : `<circle cx="39" cy="44" r="3.4" fill="#3a1a08"/><circle cx="57" cy="44" r="3.4" fill="#3a1a08"/><circle cx="40" cy="43" r="1" fill="#fff"/><circle cx="58" cy="43" r="1" fill="#fff"/>`;
    const mouth = mood === 'mad' ? `<path d="M40 60 Q48 53 56 60" stroke="#3a1a08" stroke-width="3" fill="none" stroke-linecap="round"/>`
      : mood === 'ok' ? `<path d="M41 58 L55 58" stroke="#3a1a08" stroke-width="3" stroke-linecap="round"/>`
      : mood === 'joy' ? `<path d="M38 54 Q48 66 58 54Z" fill="#c2410c" stroke="#3a1a08" stroke-width="2.5" stroke-linejoin="round"/>`
      : `<path d="M40 55 Q48 63 56 55" stroke="#3a1a08" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    const blush = mood === 'mad' ? `<ellipse cx="30" cy="52" rx="5" ry="3" fill="#ff3b3b" opacity=".55"/><ellipse cx="66" cy="52" rx="5" ry="3" fill="#ff3b3b" opacity=".55"/>`
      : `<ellipse cx="30" cy="52" rx="5" ry="3" fill="#ff8a8a" opacity=".45"/><ellipse cx="66" cy="52" rx="5" ry="3" fill="#ff8a8a" opacity=".45"/>`;
    const acc = l.acc === 0 ? `<g fill="none" stroke="#3a1a08" stroke-width="2.4"><circle cx="39" cy="44" r="7"/><circle cx="57" cy="44" r="7"/><path d="M46 44 L50 44"/></g>`
      : l.acc === 1 ? `<path d="M20 30 Q48 4 76 30 Z" fill="${l.shirt}" stroke="#3a1a08" stroke-width="2"/><path d="M60 28 L88 30 L76 34Z" fill="${l.shirt}" stroke="#3a1a08" stroke-width="2"/>` : '';
    const steam = mood === 'mad' ? `<g class="steam" fill="#fff" opacity=".85"><circle cx="16" cy="18" r="5"/><circle cx="10" cy="10" r="4"/><circle cx="80" cy="18" r="5"/><circle cx="86" cy="10" r="4"/></g>` : '';
    return `<svg viewBox="0 0 96 112" xmlns="http://www.w3.org/2000/svg"><path d="M14 112 Q14 78 48 76 Q82 78 82 112Z" fill="${l.shirt}" stroke="#3a1a08" stroke-width="2.5"/><path d="M40 77 L48 88 L56 77" fill="#fff" opacity=".8"/><rect x="42" y="66" width="12" height="12" fill="${l.skin}"/><ellipse cx="48" cy="44" rx="27" ry="28" fill="${l.skin}" stroke="#3a1a08" stroke-width="2.5"/>${hairPaths[l.style]}${eyes}${blush}${mouth}${acc}${steam}</svg>`;
  }
  function plate(inner = '') {
    return `<svg viewBox="0 0 170 96" xmlns="http://www.w3.org/2000/svg"><ellipse cx="85" cy="56" rx="80" ry="36" fill="#dfe6ea"/><ellipse cx="85" cy="52" rx="80" ry="36" fill="#fff" stroke="#9fb0b8" stroke-width="2.5"/><ellipse cx="85" cy="52" rx="60" ry="25" fill="none" stroke="#e3eaee" stroke-width="3"/>${inner}</svg>`;
  }
  function logo() {
    return chicken('#e09a2f', '#d8501a', TOP_OVER.sesame + TOP_OVER.onion);
  }
  return { chicken, sauceBottle, TOP_ICON, TOP_OVER, person, randLook, plate, logo };
})();

