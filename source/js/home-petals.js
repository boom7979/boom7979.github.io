(() => {
  const preferenceKey = 'blossom-petals-enabled';
  const layer = document.createElement('div');
  layer.className = 'home-petals';
  layer.setAttribute('aria-hidden', 'true');
  const item = document.createElement('li');
  item.className = 'item home-petals-item';
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'home-petals-toggle';
  toggle.setAttribute('aria-label', '花瓣动画');
  toggle.innerHTML = '<i class="ic i-sakura" aria-hidden="true"></i>';
  item.append(toggle);
  layer.hidden = true;
  let enabled = false;
  try {
    enabled = sessionStorage.getItem(preferenceKey) === 'true';
  } catch {
    // The toggle still works when browser storage is unavailable.
  }
  for (let i = 0; i < 24; i++) {
    const petal = document.createElement('span');
    const duration = 3 + (i % 7) * 0.25;
    const drift = 36 + (i % 5) * 6;
    petal.style.setProperty('--x', `${(i * 37 + 4) % 149 - 50}%`);
    petal.style.setProperty('--fall', `${duration}s`);
    petal.style.setProperty('--delay', `-${(i * 1.7 % duration).toFixed(2)}s`);
    petal.style.setProperty('--drift', `${drift}vw`);
    petal.style.setProperty('--size', `${9 + (i * 5) % 14}px`);
    layer.append(petal);
  }
  document.body.append(layer);

  function update() {
    const themeToggle = document.querySelector('#rightNav > .theme');
    if (themeToggle && item.nextElementSibling !== themeToggle) themeToggle.before(item);
    layer.hidden = !enabled;
    toggle.setAttribute('aria-pressed', String(enabled));
    toggle.title = enabled ? '关闭花瓣' : '开启花瓣';
    layer.classList.toggle('is-paused', document.hidden);
  }

  update();
  toggle.addEventListener('click', () => {
    enabled = !enabled;
    try {
      sessionStorage.setItem(preferenceKey, String(enabled));
    } catch {
      // Keep the current page's setting even if it cannot be saved.
    }
    update();
  });
  const main = document.querySelector('#main');
  if (main) new MutationObserver(update).observe(main.parentElement, { childList: true, subtree: true });
  window.addEventListener('popstate', update);
  document.addEventListener('visibilitychange', update);
})();
