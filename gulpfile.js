// gulpfile.js

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var clean = require('gulp-clean');
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('clean', function() {
	gulp.src(['./build'])
		.pipe(clean());
});

gulp.task('copy-html-files', function() {
	gulp.src(['./public/**/*.html'])
		.pipe(minifyHtml())
		.pipe(gulp.dest('build/'));
});

gulp.task('usemin', function() {
	gulp.src('./public/index.html')
	  .pipe(usemin({
		css: [minifyCss(), rev()],
		js: [ngAnnotate(), uglify(), rev()]
	  }))
	  .pipe(gulp.dest('build/'));
});

gulp.task('build', ['copy-html-files', 'usemin']);

