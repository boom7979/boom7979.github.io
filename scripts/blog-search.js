const urlFor = hexo.extend.helper.get('url_for');

hexo.extend.generator.register('blog_search', (locals) => ({
  path: 'blog-search.json',
  data: JSON.stringify(locals.posts.map((post) => ({
    title: post.title,
    path: post.path,
    tags: post.tags.map((tag) => tag.name),
  }))),
}));

hexo.extend.injector.register('body_end', () => {
  const script = urlFor.call(hexo, 'js/blog-search.js');
  return `<script src="${script}" defer></script>`;
});
