/* =========================================================================
   Bill Marriott — cuoc doi cua mot nguoi phuc vu
   Vanilla JS. No dependencies. All rendering is progressive: if fetch fails,
   the page still reads as a complete document.
   ========================================================================= */
(() => {
  'use strict';

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Reading progress ---------- */
  const bar = $('#progressBar');
  if (bar) {
    let ticking = false;
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
      ticking = false;
    };
    addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ---------- Nav rail, built from [data-nav] sections ---------- */
  const rail = $('#rail');
  const sections = $$('section[data-nav]');
  if (rail && sections.length) {
    sections.forEach(sec => {
      const b = document.createElement('button');
      b.className = 'rail__item';
      b.type = 'button';
      b.innerHTML = `<span class="rail__label">${sec.dataset.nav}</span><span class="rail__dash"></span>`;
      b.setAttribute('aria-label', 'Tới phần: ' + sec.dataset.nav);
      b.addEventListener('click', () => {
        sec.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
      });
      rail.appendChild(b);
    });

    const items = $$('.rail__item', rail);
    const spy = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const i = sections.indexOf(e.target);
        items.forEach((it, n) =>
          n === i ? it.setAttribute('aria-current', 'true') : it.removeAttribute('aria-current'));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => spy.observe(s));
  }

  /* ---------- Scroll reveal ---------- */
  const revealables = $$('.section__head, .measure > p, .measure > h3, .model__col, .stat, .quote-card, .tl-card, .pullquote, .disclaimer');
  if (REDUCED) {
    revealables.forEach(el => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); obs.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    revealables.forEach(el => { el.classList.add('reveal'); io.observe(el); });
  }

  /* ---------- Deal chart bars ---------- */
  const chart = $('#dealChart');
  if (chart) {
    const fill = () => $$('.deal-row__bar', chart).forEach(b => { b.style.width = b.dataset.pct + '%'; });
    if (REDUCED) fill();
    else new IntersectionObserver((e, o) => {
      if (e[0].isIntersecting) { fill(); o.disconnect(); }
    }, { threshold: 0.3 }).observe(chart);
  }

  /* ---------- Number formatting (Vietnamese conventions) ---------- */
  const fmt = (n, decimals = 0) =>
    n.toLocaleString('vi-VN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  /* ---------- Data loading ---------- */
  const load = p => fetch(p).then(r => { if (!r.ok) throw new Error(p); return r.json(); });

  /* ---------- Timeline ---------- */
  load('data/timeline.json').then(({ eras, events }) => {
    const track   = $('#tlTrack');
    const filters = $('#tlFilters');
    if (!track) return;

    const render = (eraId) => {
      track.innerHTML = '';
      events
        .filter(e => eraId === 'all' || e.era === eraId)
        .forEach((ev, i) => {
          // <article> wrapper keeps the heading out of the <button> (a button may
          // only contain phrasing content). The toggle is a real button inside it.
          const card = document.createElement('article');
          card.className = 'tl-card';
          card.setAttribute('role', 'listitem');

          const detailId = `tl-detail-${eraId}-${i}`;
          card.innerHTML = `
            <span class="tl-card__dot" aria-hidden="true"></span>
            <span class="tl-card__year">${ev.year}</span>
            <h3>${ev.title}</h3>
            <p>${ev.text}</p>
            ${ev.detail ? `
              <button type="button" class="tl-card__more" aria-expanded="false" aria-controls="${detailId}">
                Đọc thêm <span aria-hidden="true">↓</span>
              </button>
              <p class="tl-card__detail" id="${detailId}" hidden>${ev.detail}</p>` : ''}`;

          const toggle = $('.tl-card__more', card);
          if (toggle) {
            const detail = $('.tl-card__detail', card);
            toggle.addEventListener('click', () => {
              const open = toggle.getAttribute('aria-expanded') === 'true';
              toggle.setAttribute('aria-expanded', String(!open));
              card.setAttribute('data-open', String(!open));
              detail.hidden = open;
              toggle.innerHTML = open
                ? 'Đọc thêm <span aria-hidden="true">↓</span>'
                : 'Thu gọn <span aria-hidden="true">↑</span>';
            });
          }
          track.appendChild(card);
        });
    };

    // Era filter chips
    if (filters) {
      const all = [{ id: 'all', label: 'Tất cả', range: '1927–nay' }, ...eras];
      all.forEach((era, i) => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'chip';
        chip.textContent = era.label;
        chip.title = era.range;
        chip.setAttribute('aria-pressed', String(i === 0));
        chip.addEventListener('click', () => {
          $$('.chip', filters).forEach(c => c.setAttribute('aria-pressed', 'false'));
          chip.setAttribute('aria-pressed', 'true');
          render(era.id);
          track.scrollTo({ left: 0, behavior: REDUCED ? 'auto' : 'smooth' });
        });
        filters.appendChild(chip);
      });
    }

    render('all');

    // Keyboard: arrow keys scroll the track by one card
    track.addEventListener('keydown', e => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const card = $('.tl-card', track);
      if (!card) return;
      const step = card.getBoundingClientRect().width + 24;
      e.preventDefault();
      track.scrollBy({ left: e.key === 'ArrowRight' ? step : -step, behavior: REDUCED ? 'auto' : 'smooth' });
    });
  }).catch(err => console.warn('timeline:', err.message));

  /* ---------- Brand explorer ---------- */
  load('data/brands.json').then(({ tiers }) => {
    const tabs   = $('#brandTabs');
    const panels = $('#brandPanels');
    if (!tabs || !panels) return;

    tiers.forEach((tier, i) => {
      const tab = document.createElement('button');
      tab.type = 'button';
      tab.className = 'chip';
      tab.id = `tab-${tier.id}`;
      tab.textContent = tier.label;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', String(i === 0));
      tab.tabIndex = i === 0 ? 0 : -1;          // roving tabindex
      tab.setAttribute('aria-controls', `panel-${tier.id}`);
      tabs.appendChild(tab);

      const panel = document.createElement('div');
      panel.className = 'brands__panel';
      panel.id = `panel-${tier.id}`;
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', `tab-${tier.id}`);
      panel.dataset.active = String(i === 0);
      panel.innerHTML = `
        <p class="brands__blurb">${tier.blurb}</p>
        <div class="brand-grid">
          ${tier.brands.map(b => `
            <article class="brand-card">
              <span class="brand-card__year">${b.year}</span>
              <h3 class="brand-card__name">${b.name}</h3>
              <p class="brand-card__note">${b.note}</p>
            </article>`).join('')}
        </div>`;
      panels.appendChild(panel);

      tab.addEventListener('click', () => {
        $$('[role="tab"]', tabs).forEach(t => {
          t.setAttribute('aria-selected', 'false'); t.tabIndex = -1;
        });
        tab.setAttribute('aria-selected', 'true'); tab.tabIndex = 0;
        $$('.brands__panel', panels).forEach(p => p.dataset.active = 'false');
        panel.dataset.active = 'true';
      });
    });

    // Roving arrow-key navigation across tabs
    tabs.addEventListener('keydown', e => {
      const list = $$('[role="tab"]', tabs);
      const cur = list.indexOf(document.activeElement);
      if (cur === -1) return;
      let next = null;
      if (e.key === 'ArrowRight') next = (cur + 1) % list.length;
      if (e.key === 'ArrowLeft')  next = (cur - 1 + list.length) % list.length;
      if (next === null) return;
      e.preventDefault();
      list[next].focus(); list[next].click();
    });
  }).catch(err => console.warn('brands:', err.message));

  /* ---------- Stats with count-up ---------- */
  load('data/stats.json').then(({ stats }) => {
    const grid = $('#statsGrid');
    if (!grid) return;

    stats.forEach(s => {
      const d = s.decimals || 0;
      const el = document.createElement('div');
      el.className = 'stat';
      el.innerHTML = `
        <p class="stat__num" data-target="${s.value}" data-dec="${d}">${s.prefix}${fmt(0, d)}${s.suffix || ''}</p>
        <p class="stat__label">${s.label}</p>
        <p class="stat__asof">Tính đến ${s.asOf}${s.note ? ' &middot; ' + s.note : ''}</p>`;
      grid.appendChild(el);
    });

    const nums = $$('.stat__num', grid);
    const paint = (el, v) => {
      const d = +el.dataset.dec;
      const s = stats[nums.indexOf(el)];
      el.textContent = `${s.prefix}${fmt(v, d)}${s.suffix || ''}`;
    };

    if (REDUCED) {
      nums.forEach(el => paint(el, +el.dataset.target));
      return;
    }

    const countUp = el => {
      const target = +el.dataset.target;
      const dur = 1400, t0 = performance.now();
      const tick = now => {
        const p = Math.min((now - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        paint(el, +el.dataset.dec ? +(target * eased).toFixed(+el.dataset.dec) : Math.round(target * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) { countUp(e.target); obs.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    nums.forEach(n => io.observe(n));
  }).catch(err => console.warn('stats:', err.message));

  /* ---------- Quote gallery ---------- */
  load('data/quotes.json').then(({ quotes }) => {
    const grid = $('#quoteGrid');
    if (!grid) return;

    const FLAG = {
      verbatim:   null,
      translated: 'Dịch từ bản tiếng Việt — chưa đối chiếu nguyên văn tiếng Anh',
      paraphrase: 'Diễn giải, không phải nguyên văn'
    };

    quotes.forEach(q => {
      const card = document.createElement('figure');
      card.className = 'quote-card';
      card.innerHTML = `
        <blockquote class="quote-card__vi">${q.vi}</blockquote>
        ${q.en ? `<p class="quote-card__en">“${q.en}”</p>` : ''}
        <figcaption>
          <p class="quote-card__by">${q.speaker}</p>
          <p class="quote-card__ctx">${q.context}</p>
          ${q.caveat ? `<p class="quote-card__ctx">${q.caveat}</p>` : ''}
          ${FLAG[q.kind] ? `<span class="quote-card__flag">${FLAG[q.kind]}</span>` : ''}
        </figcaption>`;
      grid.appendChild(card);
    });
  }).catch(err => console.warn('quotes:', err.message));

})();
