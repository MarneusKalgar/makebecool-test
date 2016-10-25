"use strict";

var gulp = require('gulp'),
		pug = require('gulp-pug'),
		stylus = require('gulp-stylus'),
		rupture = require('rupture'),
		concat = require('gulp-concat'),
		plumber = require('gulp-plumber'),
		rename = require('gulp-rename'),
		prefix = require('gulp-autoprefixer'),
		imagemin = require('gulp-imagemin'),
		browserSync = require('browser-sync').create();

var useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
		htmlmin = require('gulp-htmlmin'),
		csso = require('gulp-csso'),
		cssmin = require('gulp-clean-css'),
		uglify = require('gulp-uglify'),
		rimraf = require('rimraf'),
		eol = require('gulp-eol');

var paths = {
			blocks: 'blocks/',
			devDir: 'app/',
			outputDir: 'build/'
		};


/*********************************
		Developer tasks
*********************************/

//pug compile
gulp.task('pug', function() {
	return gulp.src(paths.blocks + 'template.pug')
		.pipe(plumber())
		.pipe(pug({pretty: true}))
		.pipe(rename('index.html'))
		.pipe(gulp.dest(paths.devDir))
		.pipe(browserSync.stream())
})

//stylus compile
gulp.task('stylus', function() {
	return gulp.src(paths.blocks + 'template.styl')
		.pipe(plumber())
		.pipe(stylus({
			use: rupture()
		}))
		.pipe(prefix({
			browsers: ['last 10 versions'],
			cascade: true
		}))
		.pipe(rename('main.css'))
		.pipe(gulp.dest(paths.devDir + 'css/'))
		.pipe(browserSync.stream());
});

//js compile
gulp.task('scripts', function() {
	return gulp.src([
			paths.blocks + 'template.js', 
			paths.blocks + '**/*.js', 
			'!' + paths.blocks + '_assets/**/*.js'
		])
		.pipe(concat('main.js'))
		.pipe(gulp.dest(paths.devDir + 'js/'))
		.pipe(browserSync.stream());
});

//watch
gulp.task('watch', function() {
	gulp.watch(paths.blocks + '**/*.pug', ['pug']);
	gulp.watch(paths.blocks + '**/*.styl', ['stylus']);
	gulp.watch(paths.blocks + '**/*.js', ['scripts']);
})

//copy images
gulp.task('imgMin', function() {
	return gulp.src([
			paths.blocks + '**/*.jpg', 
			paths.blocks + '**/*.png', 
			'!' + paths.blocks + '_assets/**/**'
		])
		.pipe(imagemin({progressive: true}))
		.pipe(gulp.dest(paths.devDir + 'img/'));
})

//copy fonts
gulp.task('fonts', function() {
	return gulp.src(paths.blocks + '_assets/fonts/*')
		.pipe(gulp.dest(paths.devDir + 'fonts/'));
})

//server
gulp.task('browser-sync', function() {
	browserSync.init({
		port: 3000,
		server: {
			baseDir: paths.devDir
		}
	});
});


/*********************************
		Production tasks
*********************************/

//clean
gulp.task('clean', function(cb) {
	rimraf(paths.outputDir, cb);
});

//css + js
gulp.task('build', function () {
	return gulp.src(paths.devDir + '*.html')
		//-.pipe( eol("\r\n") )
		.pipe( useref() )
		.pipe( gulpif('*.js', uglify()) )
		.pipe( gulpif('*.css', cssmin()) )
		.pipe( gulp.dest(paths.outputDir) );
});

//images
gulp.task('imgBuild', function() {
	return gulp.src(paths.devDir + 'img/**/*.*')
		.pipe(gulp.dest(paths.outputDir + 'img/'));
})

//fonts
gulp.task('fontsBuild', function() {
	return gulp.src(paths.devDir + '/fonts/*')
		.pipe(gulp.dest(paths.outputDir + 'fonts/'));
})


//develop
gulp.task('develop', ['browser-sync', 'watch', 'pug', 'stylus', 'scripts']);

//copy
gulp.task('copy', ['imgMin', 'fonts']);

//production
gulp.task('production', ['build', 'imgBuild', 'fontsBuild']);

//default
gulp.task('default', ['develop']);