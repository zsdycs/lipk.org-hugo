'use strict';

const fontSpider = require('./font-spider/index');
const colors = require('colors/safe');
const through = require('through2');
const gutil = require('gutil');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

let htmlFiles = [];
let htmlPaths = [];

// 截取文件名前的路径
function interceptPath(pathSrt) {
  let filePath = path.relative('./', pathSrt);
  let lastSlashIndex = filePath.lastIndexOf('\\');
  if (lastSlashIndex < 0) {
    lastSlashIndex = filePath.lastIndexOf('/');
  }
  filePath = filePath.substring(0, lastSlashIndex);

  return filePath;
}

function doFontSpider(doHtmlFiles, options) {
  return fontSpider(doHtmlFiles, options).then(function (webFonts) {
    webFonts.forEach(function (webFont) {
      gutil.log('Font family', colors.green(webFont.family));
      gutil.log(
        'Original size',
        colors.green(webFont.originalSize / 1000 + ' KB'),
      );
      gutil.log('Include chars', webFont.chars);
      gutil.log('Font id', webFont.id);
      // gutil.log('CSS selectors', webFont.selectors.join(', '));

      webFont.files.forEach(function (itemFile) {
        if (fs.existsSync(itemFile.url)) {
          gutil.log(
            'File',
            colors.cyan(path.relative('./', itemFile.url)) +
              ' created: ' +
              colors.green(itemFile.size / 1000 + ' KB'),
          );
        } else {
          gutil.log(
            colors.red(
              'File ' + path.relative('./', itemFile.url) + ' not created',
            ),
          );
        }
      });
    });
  });
}

function createStream(options) {
  options = options || {};
  htmlFiles = [];
  htmlPaths = [];

  function bufferContents(file, enc, callback) {
    if (file.isNull()) {
      callback(null);
      return;
    }
    if (file.isBuffer && file.isBuffer()) {
      const currentFilePath = interceptPath(file.path);
      if (!htmlPaths.includes(currentFilePath) && htmlFiles.length == 0) {
        // 存文件路径
        htmlPaths.push(currentFilePath);
        // 存文件
        htmlFiles.push(file);
        callback(null, file);
      } else if (htmlPaths.includes(currentFilePath)) {
        // 累积同一字体引用资源的页面
        htmlFiles.push(file);
        callback(null, file);
      } else if (!htmlPaths.includes(currentFilePath) && htmlFiles.length > 0) {
        // 处理前面的页面
        const doHtmlFiles = _.cloneDeep(htmlFiles);
        doFontSpider(doHtmlFiles, options).then(() => {
          // 清空前一批页面文件
          htmlFiles = [];
          // 存文件路径
          htmlPaths.push(currentFilePath);
          // 存文件
          htmlFiles.push(file);
          callback(null, file);
        });
      }
    } else {
      callback(null, file);
    }
  }

  return through.obj(bufferContents);
}

module.exports = createStream;
