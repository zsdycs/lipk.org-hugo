(function () {
  // https://www.kirupa.com/html5/detect_whether_font_is_installed.htm
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const text = 'abcdefghijklmnopqrstuvwxyz0123456789';
  context.font = '72px monospace';
  const size = context.measureText(text).width;
  const fonts = [' SC', ' CN', ' TC', ' TW', ''];

  for (let i = 0; i < fonts.length; i++) {
    context.font = "72px '" + 'Source Han Serif' + fonts[i] + "', monospace";
    // no need to load TypeKit if Source Hans Serif has been installed
    if (context.measureText(text).width != size) return;
  }

  const config = {
    kitId: 'kwz5xar',
    async: true,
  };

  const scriptElement = document.createElement('script');
  const firstScript = document.getElementsByTagName('script')[0];

  let flag = false;
  let state = false;

  scriptElement.src = 'https://use.typekit.net/' + config.kitId + '.js';
  scriptElement.async = true;
  scriptElement.onload = scriptElement.onreadystatechange = function () {
    state = this.readyState;
    if (flag || (state && state != 'complete' && state != 'loaded')) return;
    flag = true;
    try {
      Typekit.load(config);
    } catch (e) {}
  };
  firstScript.parentNode.insertBefore(scriptElement, firstScript);
})();
