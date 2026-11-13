const urlFor = hexo.extend.helper.get('url_for');

hexo.extend.injector.register('body_end', () => {
  const script = urlFor.call(hexo, 'js/home-petals.js');
  return `<script src="${script}" defer></script>`;
});
