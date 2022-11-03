'use strict';

var fontSpider = require('./font-spider/index');
var colors = require('colors/safe');
var through = require('through2');
var gutil = require('gutil');
var fs = require('fs');
var path = require('path');

function createStream(options) {
  options = options || {};

  if (!options.resourceBeforeLoad) {
    options.resourceBeforeLoad = function (file) {
      if (/https?/.test(file)) {
        gutil.log('Load', colors.cyan(file));
      }
    };
  }

  function bufferContents(file, enc, callback) {
    if (file.isNull()) {
      callback(null);
      return;
    }

    if (file.isBuffer && file.isBuffer()) {
      fontSpider(file, options)
        .then(function (webFonts) {
          webFonts.forEach(function (webFont) {
            gutil.log('Font family', colors.green(webFont.family));
            gutil.log(
              'Original size',
              colors.green(webFont.originalSize / 1000 + ' KB'),
            );
            gutil.log('Include chars', webFont.chars);
            gutil.log('Font id', webFont.id);
            // gutil.log('CSS selectors', webFont.selectors.join(', '));

            webFont.files.forEach(function (file) {
              if (fs.existsSync(file.url)) {
                gutil.log(
                  'File',
                  colors.cyan(path.relative('./', file.url)) +
                    ' created: ' +
                    colors.green(file.size / 1000 + ' KB'),
                );
              } else {
                gutil.log(
                  colors.red(
                    'File ' + path.relative('./', file.url) + ' not created',
                  ),
                );
              }
            });
          });

          callback(null);
        })
        .catch(callback);
    } else {
      callback(null, file);
    }
  }

  return through.obj(bufferContents);
}

module.exports = createStream;
