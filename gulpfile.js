"use strict";

var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var babelify = require('babelify');
var browserify = require('browserify');
var concat = require('gulp-concat');
var del = require('del');
var exorcist = require('exorcist');
var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('clean', function () {
  return del('dist/**/*');
});

gulp.task('copy-templates', function () {
  return gulp.src('src/server/templates/**.hbs')
    .pipe(gulp.dest('dist/server/templates'));
});

gulp.task('build-components', function () {
  return gulp.src('src/components/**/*.js*')
    .pipe(babel({
      optional: ['es7.classProperties']
    }))
    .pipe(gulp.dest('dist/components'));
});

gulp.task('build-server', ['copy-templates', 'build-components'], function () {
    return gulp.src('src/server/**/*.js*')
      .pipe(babel({
        optional: ['es7.classProperties']
      }))
      .pipe(gulp.dest('dist/server'));
});

gulp.task('compile-scss', function () {
  return gulp.src(['src/client/**/*.scss', 'src/components/**/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
      browsers: ['last 1 version'],
      cascade: false
    }))
    .pipe(sass())
    .pipe(concat('main.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/client'));
});

gulp.task('copy-reset', function () {
  return gulp.src('src/client/reset.css')
    .pipe(gulp.dest('dist/client'));
});

gulp.task('build-client', ['build-components', 'compile-scss', 'copy-reset'], function () {
  var bundler = browserify('src/client/index.js', {debug: true});
  bundler.transform(babelify.configure({
    optional: ['es7.classProperties'],
    sourceMaps: 'inline'
  }));
  return bundler.bundle()
    .on('error', function (err) {
      gutil.log(err.message);
      this.emit('end');
    })
    .pipe(exorcist('dist/client/bundle.js.map'))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist/client'));
});

gulp.task('default', ['build-server', 'build-client']);
