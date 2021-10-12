// https://github.com/stkevintan/hugo-lunr-zh
const fs = require('fs');
const path = require('path');
const { escape } = require('querystring');
const { promisify } = require('util');

const matter = require('gray-matter');
const removeMd = require('remove-markdown');
const striptags = require('striptags');
const nodejieba = require('nodejieba');

const readdir = promisify(fs.readdir);
const writeFile = promisify(fs.writeFile);

function urlize(str) {
  str = str
    .replace(/\s/g, '-')
    .replace(/[\(\)&@]/g, '')
    .toLowerCase();
  return escape(str);
}

function ChineseCut(str) {
  return (
    str &&
    str
      .replace(/\n/gm, '')
      .replace(
        /[\u4E00-\u9FA5\uF900-\uFA2D]+/g,
        (match) => ` ${nodejieba.cut(match).join(' ')} `,
      )
  );
}

function handle(filename, option) {
  const filepath = path.join(option.dir, filename);
  const pathinfo = path.parse(filepath);
  const meta = matter.read(filepath, {
    language: option.matterType,
    delims: option.matterDelims,
  });

  if (
    (option.skipDraft && meta.data.draft === true) ||
    option.skipFile.includes(filename)
  )
    return;

  const plainText =
    pathinfo.ext === '.md' ? removeMd(meta.content) : striptags(meta.content);
  let uri = path.join(option.contextPath, urlize(pathinfo.name));
  console.log(111, uri);

  // if (meta.data.slug != null) {
  //   uri = path.dirname(uri) + meta.data.slug;
  //   console.log(222, uri);
  // }
  // if (meta.data.url != null) {
  //   uri = meta.data.url;
  // }
  const tags = meta.data.tags || [];
  //中文分词
  const content = ChineseCut(plainText);
  const title = ChineseCut(meta.data.title);

  console.log(path.dirname(uri) + meta.data.slug, uri);

  return { uri, tags, content, title, oriTitle: meta.data.title };
}

function lunr(option = {}) {
  const exts = arrayfy(option.extensions);
  nodejieba.load(option.jiebaConf);
  return readdir(option.dir)
    .then((files) => {
      return files.filter((file) => exts.some((ext) => file.endsWith(ext)));
    })
    .then((files) => {
      return files.map((file) => handle(file, option));
    })
    .then((files) => {
      return files.filter((file) => file != null);
    })
    .then((files) => {
      return JSON.stringify(files);
    })
    .then((index) => {
      writeFile(option.output, index, { encoding: 'utf8' });
    })
    .catch((e) => {
      console.log(e);
    });
}

function arrayfy(o) {
  return Array.isArray(o) ? o : o.split(',');
}

console.log('hugo-lunr-zh start');

lunr({
  contextPath: '/blog',
  dir: 'content/blog',
  recursive: true,
  output: 'docs/lunr.json',
  matterType: 'yaml',
  matterDelims: '---',
  skipDraft: true, // draft
  skipFile: ['_index.md', '2018-12-20-Test.md'],
  extensions: '.md',
  jiebaConf: {},
}).then(() => {
  console.log('hugo-lunr-zh done');
});
