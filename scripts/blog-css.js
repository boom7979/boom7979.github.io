const { escapeHTML } = require('hexo-util');
const css = hexo.extend.helper.get('css');

hexo.extend.injector.register('head_end', () => {
  const link = css.call(hexo, 'css/blog.css').trim();
  return `  ${link}\n`;
});

hexo.extend.tag.register('text_emphasis', (args) => {
  return `<span class="text-emphasis">${escapeHTML(args.join(' '))}</span>`;
});
