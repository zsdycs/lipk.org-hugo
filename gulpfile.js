var gulp = require('gulp');
var gutil = require('gulp-util');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var htmlclean = require('gulp-htmlclean');
var babel = require('gulp-babel');
var connect = require('gulp-connect');

// 压缩 css 文件
gulp.task('css', function css(done) {
  gulp.src('./public/css/*.css')
    .pipe(minifycss())
    .pipe(gulp.dest('./public/css'))
    .pipe(connect.reload());
    done();
});

// 压缩 html 文件
gulp.task('html', function html(done) {
  gulp.src('./public/**/*.html')
    .pipe(htmlclean())
    .pipe(htmlmin({
      removeComments: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    }))
    .pipe(gulp.dest('./public'))
    .pipe(connect.reload());
    done();
});

// 压缩 js 文件
gulp.task('js', function js(done) {
  gulp.src('./public/js/*.js')
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(uglify())
    .on('error', function (err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(gulp.dest('./public/js'))
    .pipe(connect.reload());
    done();
});

// 默认任务
gulp.task('default', gulp.series(gulp.parallel('html', 'css', 'js')));
