const gulp = require('gulp');
const gulpBabel = require('gulp-babel');
const gulpConnect = require('gulp-connect');
const gulpHtmlclean = require('gulp-htmlclean');
const gulpHtmlmin = require('gulp-htmlmin');
const gulpMinifycss = require('gulp-minify-css');
const gulpUglify = require('gulp-uglify')
const gulpUtil = require('gulp-util');

function minify_css(done) {
  gulp.src('./dist/css/*.css')
    .pipe(gulpMinifycss())
    .pipe(gulp.dest('./dist/css'))
    .pipe(gulpConnect.reload());
  done();
}

function minify_html(done) {
  gulp.src('./dist/**/*.html')
    .pipe(gulpHtmlclean())
    .pipe(gulpHtmlmin({
      removeComments: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(gulpConnect.reload());
  done();
}

function minify_js(done) {
  gulp.src('./dist/js/*.js')
    .pipe(gulpBabel({
      presets: ['@babel/preset-env']
    }))
    .pipe(gulpUglify())
    .on('error', function (err) {
      gulpUtil.log(gulpUtil.colors.red('[Error]'), err.toString());
    })
    .pipe(gulp.dest('./dist/js'))
    .pipe(gulpConnect.reload());
  done();
}

exports.default = gulp.series(minify_css, minify_html, minify_js);
