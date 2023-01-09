const gulp = require('gulp');
const gulpBabel = require('gulp-babel');
const gulpConnect = require('gulp-connect');
const gulpHtmlclean = require('gulp-htmlclean');
const gulpHtmlMin = require('gulp-htmlmin');
const gulpMinifycss = require('gulp-minify-css');
const gulpUglify = require('gulp-uglify');
const gulpUtil = require('gulp-util');
const gulpConcat = require('gulp-concat');
const gulpCpFile = require('./gulp-cp-file');
const fontSpider = require('./gulp-font-spider');

function minify_css(done) {
  gulp
    .src([
      './dist/css/theme.css',
      './dist/css/style.css',
      './dist/css/index.css',
      './dist/css/fonts.css',
      './dist/css/loading.css',
    ])
    .pipe(gulpMinifycss())
    .pipe(gulpConcat('main.css'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(gulpConnect.reload());
  done();
}

function minify_photoswipe_css(done) {
  gulp
    .src('./dist/css/photoswipe.css')
    .pipe(gulpMinifycss())
    .pipe(gulp.dest('./dist/css'))
    .pipe(gulpConnect.reload());
  done();
}

function minify_html(done) {
  gulp
    .src('./dist/**/*.html')
    // .pipe(gulpHtmlclean())
    .pipe(
      gulpCpFile({
        src: './static/fontSource/',
        dest: 'fontSource/',
        fileNameList: [
          // 'SourceHanSerifCN-Bold.ttf',
          // 'SourceHanSerifCN-ExtraLight.ttf',
          // 'SourceHanSerifCN-Heavy.ttf',
          'SourceHanSerifCN-Light.ttf',
          'SourceHanSerifCN-Medium.ttf',
          // 'SourceHanSerifCN-Regular.ttf',
          'SourceHanSerifCN-SemiBold.ttf',
        ],
      }),
    )
    // .pipe(
    //   gulpHtmlMin({
    //     removeComments: false,
    //     minifyJS: true,
    //     minifyCSS: true,
    //     minifyURLs: true,
    //   }),
    // )
    .pipe(
      fontSpider({
        ignore: ['main.css'],
        silent: true,
        extraFontFaceRule: [
          {
            'font-family': 'source-han-serif-sc',
            'font-weight': '100',
            src: "url('./fontSource/SourceHanSerifCN-Light.ttf')",
            'font-display': 'swap',
          },
          {
            'font-family': 'source-han-serif-sc',
            'font-weight': 'normal',
            src: "url('./fontSource/SourceHanSerifCN-SemiBold.ttf')",
            'font-display': 'swap',
          },
          {
            'font-family': 'source-han-serif-sc',
            'font-weight': 'bolder',
            src: "url('./fontSource/SourceHanSerifCN-Medium.ttf')",
            'font-display': 'swap',
          },
        ],
        backup: false,
        debug: false,
      }),
    )
    .pipe(gulp.dest('./dist'))
    .pipe(gulpConnect.reload());
  done();
}

function minify_js(done) {
  // main-async.js
  gulp
    .src([
      './dist/js/mode.js',
      './dist/js/math-code.js',
      './dist/js/right-quote.js',
      './dist/js/fix-footnote.js',
      './dist/js/checkbox-list.js',
      './dist/js/hide-menu.js',
      './dist/js/beaudar.js',
      './dist/js/font-face.js',
      // './dist/js/load-typekit.js',
    ])
    .pipe(
      gulpBabel({
        presets: ['@babel/preset-env'],
      }),
    )
    .pipe(gulpUglify())
    .on('error', function (err) {
      gulpUtil.log(gulpUtil.colors.red('[Error]'), err.toString());
    })
    .pipe(gulpConcat('main-async.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(gulpConnect.reload());
  done();

  // main.js
  gulp
    .src(['./dist/js/tableOfContents.v2.js'])
    .pipe(
      gulpBabel({
        presets: ['@babel/preset-env'],
      }),
    )
    .pipe(gulpUglify())
    .on('error', function (err) {
      gulpUtil.log(gulpUtil.colors.red('[Error]'), err.toString());
    })
    .pipe(gulpConcat('main.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(gulpConnect.reload());
  done();
}

function minify_sw_js(done) {
  gulp
    .src('./dist/sw.js')
    .pipe(
      gulpBabel({
        presets: ['@babel/preset-env'],
      }),
    )
    .pipe(gulpUglify())
    .on('error', function (err) {
      gulpUtil.log(gulpUtil.colors.red('[Error]'), err.toString());
    })
    .pipe(gulp.dest('./dist'))
    .pipe(gulpConnect.reload());
  done();
}

exports.default = gulp.series(
  minify_css,
  minify_photoswipe_css,
  minify_html,
  minify_js,
  minify_sw_js,
);
