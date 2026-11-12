function findPosts(posts, query) {
  const terms = query.normalize('NFKC').toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];

  return posts.map((post) => {
    const title = post.title.normalize('NFKC').toLowerCase();
    const tags = post.tags.map((tag) => tag.normalize('NFKC').toLowerCase());
    let score = 0;
    for (const term of terms) {
      if (title.includes(term)) score += 2;
      else if (tags.some((tag) => tag.includes(term))) score += 1;
      else return null;
    }
    return { post, score };
  }).filter(Boolean).sort((a, b) => b.score - a.score).map(({ post }) => post);
}

function initBlogSearch(scriptUrl) {
  const indexUrl = new URL('../blog-search.json', scriptUrl);
  const dialog = document.createElement('dialog');
  dialog.id = 'search';
  dialog.className = 'blog-search';
  dialog.setAttribute('aria-label', '搜索文章');
  dialog.innerHTML = `
    <div class="inner">
      <div class="header">
        <span class="icon"><i class="ic i-search" aria-hidden="true"></i></span>
        <div class="search-input-container">
          <input class="search-input" type="search" aria-label="文章标题或标签" placeholder="输入文章标题或标签" autofocus>
        </div>
        <form method="dialog">
          <button class="close-btn" type="submit" aria-label="关闭搜索"><i class="ic i-times-circle" aria-hidden="true"></i></button>
        </form>
      </div>
      <div class="results">
        <div class="inner">
          <p id="search-stats" role="status"></p>
          <hr>
          <div id="search-hits"><ol></ol></div>
        </div>
      </div>
    </div>
  `;
  document.body.append(dialog);

  const input = dialog.querySelector('input');
  const status = dialog.querySelector('[role="status"]');
  const results = dialog.querySelector('#search-hits ol');
  let index;
  let request = 0;

  async function search() {
    const current = ++request;
    const query = input.value.trim();
    results.replaceChildren();
    status.textContent = query ? '正在搜索…' : '可以输入多个关键词，用空格分隔。';
    if (!query) return;

    try {
      index ??= fetch(indexUrl).then((response) => {
        if (!response.ok) throw new Error('Search index unavailable');
        return response.json();
      }).catch((error) => {
        index = undefined;
        throw error;
      });

      const posts = await index;
      if (current !== request) return;
      const matches = findPosts(posts, query);
      status.textContent = matches.length ? `找到 ${matches.length} 篇文章` : '没有找到匹配的文章。';

      for (const post of matches) {
        const item = document.createElement('li');
        item.className = 'item';
        const link = document.createElement('a');
        link.href = new URL(post.path, indexUrl).href;
        link.textContent = post.title;
        item.append(link);
        if (post.tags.length) {
          const tags = document.createElement('span');
          tags.textContent = post.tags.join(' · ');
          link.append(tags);
        }
        results.append(item);
      }
    } catch {
      if (current === request) status.textContent = '搜索索引加载失败，请重试。';
    }
  }

  function openSearch(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (!dialog.open) dialog.showModal();
    input.focus();
    search();
  }

  function prepareTrigger() {
    document.querySelectorAll('header .item.search').forEach((trigger) => {
      trigger.tabIndex = 0;
      trigger.setAttribute('role', 'button');
      trigger.setAttribute('aria-label', '搜索文章');
    });
  }

  prepareTrigger();
  document.addEventListener('pjax:complete', prepareTrigger);
  document.addEventListener('click', (event) => {
    if (event.target.closest('header .item.search')) openSearch(event);
  }, true);
  document.addEventListener('keydown', (event) => {
    if (['Enter', ' '].includes(event.key) && event.target.closest('header .item.search')) {
      openSearch(event);
    }
  }, true);
  input.addEventListener('input', search);
  dialog.addEventListener('click', (event) => {
    const target = event.target;
    if (target.closest('.results') ||
        (target.closest('.header') && !target.closest('input, button'))) {
      dialog.close();
    }
  });
}

initBlogSearch(document.currentScript.src);
