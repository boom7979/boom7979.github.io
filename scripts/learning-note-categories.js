hexo.extend.filter.register('before_generate', async () => {
  const posts = hexo.locals.get('posts').toArray();

  for (const post of posts) {
    const match = /^_posts[\\/]([^\\/]+)[\\/]/.exec(post.source);
    if (!match) continue;

    const categories = ['学习笔记', match[1]];
    const current = post.categories.toArray().map(({ name }) => name);
    if (current.length === categories.length && current.every((name, i) => name === categories[i])) {
      continue;
    }
    await post.setCategories([categories]);
  }

  hexo.locals.invalidate();
}, 5);
