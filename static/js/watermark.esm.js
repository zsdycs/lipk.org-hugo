/*!
 * @pansy/watermark@2.0.8 - https://github.com/pansyjs/watermark
 * (c) 2020 Pansy
 */
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) =>
  key in obj
    ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value,
      })
    : (obj[key] = value);
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== 'symbol' ? key + '' : key, value);
  return value;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) =>
      x.done
        ? resolve(x.value)
        : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/config.ts
var defaultOptions = {
  gapX: 100,
  gapY: 100,
  offsetLeft: 0,
  offsetTop: 0,
  width: 120,
  height: 64,
  opacity: 0.15,
  rotate: -22,
  fontSize: 16,
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: '300',
  fontColor: '#000',
  fontFamily: 'sans-serif',
  textAlign: 'center',
  textBaseline: 'alphabetic',
  monitor: true,
  zIndex: 9999,
  mode: 'interval',
  pack: true,
  blindFontSize: 16,
  blindOpacity: 5e-3,
};
var attributeNameTag = 'data-watermark-tag';
var observeOptions = {
  childList: true,
  subtree: true,
  attributeFilter: ['style', 'class', attributeNameTag],
};

// src/utils.ts
function getMutationObserver() {
  return (
    window.MutationObserver ||
    window.WebKitMutationObserver ||
    window.MozMutationObserver
  );
}
function getDataSetKey(attributeName) {
  return attributeName
    .split('-')
    .slice(1)
    .reduce((prev, cur, index) => {
      if (index === 0) {
        return cur;
      }
      return `${prev}${cur[0].toUpperCase() + cur.slice(1)}`;
    });
}
var getStyleStr = (style) => {
  let str = '';
  Object.keys(style).forEach((item) => {
    const key = item.replace(/([A-Z])/g, '-$1').toLowerCase();
    str += `${key}:${style[item]};`;
  });
  return str;
};
var encrypt = (str) => {
  return window.btoa(decodeURI(encodeURIComponent(str)));
};
var getRandomId = (prefix = '') => {
  return `${encrypt(prefix)}-${new Date().getTime()}-${Math.floor(
    Math.random() * Math.pow(10, 8),
  )}`;
};
var getContainer = (container, watermarkId, containerStyle = {}, pack) => {
  let dom;
  if (typeof container === 'string') {
    dom = document.getElementById(container);
    if (!dom) {
      throw new Error(
        `\u6C34\u5370\u6302\u8F7D\u8282\u70B9\u672A\u627E\u5230\uFF0C\u8BF7\u68C0\u67E5#${container}\u662F\u5426\u5B58\u5728`,
      );
    }
  } else {
    dom = container != null ? container : document.body;
  }
  dom.setAttribute(attributeNameTag, watermarkId);
  const style = __spreadValues(
    {
      position: 'relative',
    },
    containerStyle,
  );
  if (!pack) {
    delete style.position;
  }
  dom.setAttribute('style', getStyleStr(style));
  return dom;
};
var blindDecryption = (ctx) => {
  const originalData = ctx.getImageData(
    0,
    0,
    ctx.canvas.width,
    ctx.canvas.height,
  );
  let data = originalData.data;
  for (let i = 0; i < data.length; i++) {
    if (i % 4 == 0) {
      if (data[i] % 2 == 0) {
        data[i] = 0;
      } else {
        data[i] = 255;
      }
    } else if (i % 4 == 3) {
      continue;
    } else {
      data[i] = 0;
    }
  }
  ctx.putImageData(originalData, 0, 0);
};
var getContent = (watermarkId) => {
  const dom = document.createElement('div');
  dom.setAttribute(
    'style',
    getStyleStr({
      pointerEvents: 'none',
    }),
  );
  dom.setAttribute(attributeNameTag, watermarkId);
  return dom;
};
function getDrawPattern(config) {
  const {
    text,
    gapX,
    gapY,
    offsetTop,
    offsetLeft,
    width,
    height,
    rotate,
    opacity,
    fontSize,
    fontStyle,
    fontVariant,
    fontWeight,
    fontFamily,
    fontColor,
    textAlign,
    textBaseline,
    image,
    blindText,
    blindFontSize,
    blindOpacity,
  } = config;
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const ratio = 1;
    const canvasWidth = (Number(gapX) + Number(width)) * ratio;
    const canvasHeight = (Number(gapY) + Number(height)) * ratio;
    const canvasOffsetLeft = Number(offsetLeft) || Number(gapX) / 2;
    const canvasOffsetTop = Number(offsetTop) || Number(gapY) / 2;
    canvas.setAttribute('width', `${canvasWidth}px`);
    canvas.setAttribute('height', `${canvasHeight}px`);
    if (ctx) {
      const markWidth = width * ratio;
      const markHeight = height * ratio;
      ctx.translate(canvasOffsetLeft * ratio, canvasOffsetTop * ratio);
      ctx.rotate((Math.PI / 180) * Number(rotate));
      if (blindText) {
        ctx.globalAlpha = blindOpacity;
        ctx.font = `${blindFontSize}px normal`;
        ctx.fillText(blindText, 0, 0);
      }
      ctx.globalAlpha = opacity;
      if (image) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.referrerPolicy = 'no-referrer';
        img.src = image;
        img.onload = () => {
          ctx.drawImage(img, 0, 0, markWidth, markHeight);
          resolve({
            url: ctx.canvas.toDataURL(),
            width: canvasWidth,
            height: canvasHeight,
          });
        };
        return;
      }
      const texts = Array.isArray(text) ? text : [text];
      const widths = texts.map((item) => ctx.measureText(item).width);
      const maxWidth = Math.max(...widths);
      const markSize = Number(fontSize) * ratio;
      ctx.textAlign = textAlign;
      ctx.textBaseline = textBaseline;
      ctx.fillStyle = fontColor;
      ctx.font = getFont(`${markSize}px`);
      if (maxWidth > width) {
        ctx.font = getFont(`${markSize / 2}px`);
      }
      const lineHeight = markSize + 5;
      let initY =
        (markHeight - (fontSize * texts.length + (texts.length - 1) * 5)) / 2;
      initY = initY < 0 ? 0 : initY;
      for (let i = 0; i < texts.length; i++) {
        ctx.fillText(texts[i] || '', markWidth / 2, initY + lineHeight * i);
      }
      resolve({
        url: ctx.canvas.toDataURL(),
        width: canvasWidth,
        height: canvasHeight,
      });
    }
    function getFont(fontSize2) {
      return `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize2} ${fontFamily}`;
    }
    return reject();
  });
}

// src/index.ts
var MutationObserver = getMutationObserver();
var Watermark = class {
  constructor(options = {}) {
    __publicField(this, 'options');
    __publicField(this, 'container');
    __publicField(this, 'watermarkContent');
    __publicField(this, 'watermarkDom');
    __publicField(this, 'style');
    __publicField(this, 'watermarkTag');
    __publicField(this, 'shadowRoot');
    __publicField(this, 'mutationObserver');
    __publicField(this, '_isAgainRender', (mutation) => {
      if (mutation.type === 'attributes') {
        if (mutation.attributeName === attributeNameTag) {
          return true;
        }
        if (this.watermarkTag === this._getNodeRandomId(mutation.target)) {
          return true;
        }
      }
      if (
        mutation.removedNodes.length &&
        this.watermarkTag === this._getNodeRandomId(mutation.removedNodes[0])
      ) {
        return true;
      }
      return false;
    });
    __publicField(this, '_getNodeRandomId', (node) => {
      var _a;
      return (_a = node == null ? void 0 : node['dataset']) == null
        ? void 0
        : _a[getDataSetKey(attributeNameTag)];
    });
    __publicField(this, '_destroyMutationObserver', () => {
      if (this.mutationObserver) {
        this.mutationObserver.takeRecords();
        this.mutationObserver.disconnect();
        this.mutationObserver = null;
      }
    });
    __publicField(this, '_getWatermarkDom', (watermarkHeight) =>
      __async(this, null, function* () {
        if (!this.watermarkDom) {
          this.watermarkDom = document.createElement('div');
        }
        if (typeof watermarkHeight === 'number' && watermarkHeight) {
          this.style.height = `${watermarkHeight}px`;
        }
        const backgroundConfig = yield getDrawPattern(this.options);
        if (backgroundConfig == null ? void 0 : backgroundConfig.url) {
          const background = backgroundConfig.url;
          if (this.options.mode === 'repeat') {
            this.style.backgroundImage = `url(${background})`;
          } else {
            this.style.backgroundImage = `url(${background}), url(${background})`;
            this.style.backgroundRepeat = 'repeat, repeat';
            this.style.backgroundPosition = `${backgroundConfig.width / 2}px ${
              backgroundConfig.height / 2
            }px, 0 0`;
          }
          if (!this.options.container) {
            this.style.position = 'fixed';
          }
          this.watermarkDom.setAttribute('style', getStyleStr(this.style));
        }
        this.watermarkDom.setAttribute(attributeNameTag, this.watermarkTag);
        return this.watermarkDom;
      }),
    );
    __publicField(this, '_getWatermarkHeight', () => {
      if (!this.container) return 0;
      let height = 0;
      const { scrollHeight = 0, clientHeight = 0 } = this.options.container
        ? this.container.parentNode
        : this.container;
      if (scrollHeight > clientHeight) {
        height = Math.max(scrollHeight, clientHeight);
      }
      return height;
    });
    this.options = Object.assign({}, defaultOptions, options);
    this.style = {
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
      backgroundColor: 'transparent',
      backgroundRepeat: 'repeat',
    };
    this.style.zIndex = this.options.zIndex;
    this.watermarkTag = getRandomId('watermark');
    this.mutationObserver = null;
    this._render();
  }
  update(options = {}) {
    this.options = __spreadValues(__spreadValues({}, this.options), options);
    this.style.zIndex = this.options.zIndex;
    this._render();
  }
  show() {
    if (this.watermarkDom) {
      this.style.display = 'block';
      this.watermarkDom.setAttribute('style', getStyleStr(this.style));
    }
  }
  hide() {
    if (this.watermarkDom) {
      this.style.display = 'none';
      this.watermarkDom.setAttribute('style', getStyleStr(this.style));
    }
  }
  destroy() {
    this.shadowRoot = void 0;
    if (this.watermarkContent) {
      this.watermarkContent.remove();
      this.watermarkContent = void 0;
    }
    if (this.watermarkDom) {
      this.watermarkDom.remove();
      this.watermarkDom = void 0;
    }
    this._destroyMutationObserver();
  }
  _render() {
    return __async(this, null, function* () {
      this._destroyMutationObserver();
      this.container = getContainer(
        this.options.container,
        this.watermarkTag,
        this.options.containerStyle,
        this.options.pack,
      );
      if (!this.watermarkContent) {
        this.watermarkContent = getContent(this.watermarkTag);
        this.container.append(this.watermarkContent);
      }
      const height = this._getWatermarkHeight();
      this.watermarkDom = yield this._getWatermarkDom(height);
      if (this.watermarkContent) {
        const childs = this.watermarkContent.childNodes || [];
        for (let i = 0; i < childs.length; i++) {
          this.watermarkContent.removeChild(childs[i]);
        }
      }
      if (typeof this.watermarkContent.attachShadow === 'function') {
        if (!this.shadowRoot) {
          this.shadowRoot = this.watermarkContent.attachShadow({
            mode: 'open',
          });
        }
      } else {
        this.shadowRoot = this.watermarkContent;
      }
      this.shadowRoot.append(this.watermarkDom);
      if (MutationObserver && this.options.monitor) {
        this.mutationObserver = new MutationObserver((mutations) => {
          let lastMutation = null;
          mutations.forEach((mutation) => {
            if (this._isAgainRender(mutation)) {
              lastMutation = mutation;
              return;
            }
          });
          if (lastMutation) {
            this.destroy();
            this._render();
          }
        });
        this.mutationObserver.observe(this.container, observeOptions);
        this.shadowRoot &&
          this.mutationObserver.observe(this.shadowRoot, observeOptions);
      }
    });
  }
};
export { Watermark, blindDecryption, defaultOptions };
