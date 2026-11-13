let themeCover;
let themeHeader;

hexo.extend.filter.register('before_generate', () => {
  const covers = hexo.locals.get('data').images ?? [];
  const posts = hexo.locals.get('posts').sort(hexo.config.index_generator.order_by).toArray();
  const coverByPath = new Map(posts.map((post, index) => [
    post.path, covers[index % covers.length],
  ]));
  themeCover ??= hexo.extend.helper.get('_cover');
  themeHeader ??= hexo.extend.helper.get('_cover_index');

  hexo.extend.helper.register('_cover', function (post, count) {
    const cover = coverByPath.get(post.path);
    if (!post.cover && !post.photos?.length && cover) {
      return this.url_for(cover);
    }
    return themeCover.call(this, post, count);
  });

  hexo.extend.helper.register('_cover_index', function (page) {
    if (this.path === 'index.html') return this.url_for('/images/covers/home.webp');
    if (coverByPath.has(page.path)) return this._cover(page);
    return themeHeader.call(this, page);
  });
});
