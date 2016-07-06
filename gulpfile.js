'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var eslint = require('gulp-eslint');
var browserSync = require('browser-sync').create();
var server = require( 'gulp-develop-server' );

var options = {
    server: {
        path: './server.js',
        execArgv: [ "--harmony MONGODB_URI='mongodb://localhost:27017/accts'" ]
    },
    bs: {
        proxy: 'http://localhost:8080'
    }
};

// run server
gulp.task( 'server:start', function() {
    server.listen( options.server, function( error ) {
        if( ! error ) browserSync.init( options.bs );
    });
});

gulp.task( 'server:restart', function() {
    server.restart( function( error ) {
        if( ! error ) bs.reload();
    });
});

//lint javascript
gulp.task('lint', function () {
    return gulp.src(['**/*.js','!node_modules/**','!bower_components/**','!public/dist/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

//compile sass to css
gulp.task('sass', function () {
    return gulp.src('public/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/dist/css'))
        .pipe(browserSync.stream());
});

//compile to es5
gulp.task('babel',['lint'], function () {
    return gulp.src(['public/**/*.js','!node_modules/**','!bower_components/**','!public/dist/**'])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/dist'));
});


gulp.task('default',['lint','server:start'], function () {
    gulp.watch('public/sass/**/*.scss', ['sass']);
    gulp.watch(['public/**/*.js','!node_modules/**','!bower_components/**','!public/dist/**'], ['babel']);
    gulp.watch("public/**/*.html").on('change', browserSync.reload);
    gulp.watch( [ './server.js','routes/**/*.js','model/**/*.js' ], server.restart );
    gulp.watch( [ './server.js','routes/**/*.js','model/**/*.js' ], server.restart );

});