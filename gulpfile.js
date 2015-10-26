var gulp = require('gulp') // define task builder
  , react = require('gulp-react') // compile React from JSX
  , browserify = require('gulp-browserify') // require lib/module for client-side
  , clean = require('gulp-clean') // clean old-sourcecode
  , appInfo = require('./package.json') // load app info from package.json
  , concat = require('gulp-concat') // join multiple file to vendor.js (one file)
  , sourcemaps = require('gulp-sourcemaps')
  ;

var buildDir = 'build/' + appInfo.version;

// clean all old-sourcecode JS
gulp.task('clean', function() {
  return gulp.src( [buildDir + '/js/**/*.js', buildDir + '/css'], {read: false} )
    .pipe( clean() );
});

// compile JSX to JS and save to folder "build/"
gulp.task('jsx', ['clean'], function() {
  return gulp.src( 'src/jsx/**/*.jsx' )
    .pipe( react() )
    .pipe( gulp.dest(buildDir + '/js') );
});

// browserify to help client-side require/load all lib/module
gulp.task('browserify', ['jsx'], function() {
  return gulp.src( buildDir + '/js/app.js' )
    .pipe( browserify() )
    .pipe( gulp.dest(buildDir + '/js') );
});

// join all file *.js in folder lib
gulp.task('concat-js', ['clean'], function() {
  return gulp.src( ['src/lib/jquery.js', 'src/lib/moment.min.js',
                    'src/lib/**/*.js'] )
    .pipe( sourcemaps.init() )
      .pipe( concat('vendor.js') )
    .pipe( sourcemaps.write('') )
    .pipe( gulp.dest(buildDir + '/lib') );
});

// join all file style *.css
gulp.task('concat-css', ['clean'], function() {
  return gulp.src( 'src/css/**/*.css' )
    .pipe( sourcemaps.init() )
      .pipe( concat('vendor.css', {newLine: ''}) )
    .pipe( sourcemaps.write('') )
    .pipe( gulp.dest(buildDir + '/css') );
});

gulp.task('watch', function() {
  gulp.watch('src/jsx/**/*.jsx', ['build']);
});

gulp.task('build', ['jsx', 'browserify', 'concat-js', 'concat-css']);
gulp.task('default', ['build']);
