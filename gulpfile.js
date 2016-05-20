var gulp          = require('gulp'),
    // sass          = require('gulp-sass'),
    gutil         = require('gulp-util'),
    browserify    = require('gulp-browserify'),
    compass       = require('gulp-compass'),
    connect       = require('gulp-connect'),
    gulpif        = require('gulp-if'),
    uglify        = require('gulp-uglify'),
    minifyHTML    = require('gulp-minify-html'),
    concat        = require('gulp-concat'),
    // rename        = require('gulp-rename'),
    bootstrap     = require('jquery', 'bootstrap-sass'),
    path          = require('path');


var env,
    jsSources,
    sassSources,
    htmlSources,
    outputDir,
    // wpDirectory,
    // wpIndex,
    sassStyle;


env = 'development';
// env = process.env.NODE_ENV || 'development';

if (env==='development') {
  outputDir = 'builds/development/';
  sassStyle = 'expanded';
} else {
  outputDir = 'builds/production/';
  sassStyle = 'compressed';
}

// WordPress
// wpDirectory = 'wordpress/wp-content/themes/rcptheme/';


// Note: place libraries below as requirements
jsSources = [
  // 'components/scripts/jqloader.js',
  'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
  'components/scripts/TweenMax.min.js',
  'components/scripts/jquery.scrollmagic.min.js',
  'components/scripts/jquery.slimscroll.min.js',
  // 'components/bootstrap/assets/javascripts/bootstrap.min.js',
  // 'components/bootstrap/assets/javascripts/bootstrap-sprockets.js',
  // 'components/scripts/jquery.fullPage.js',
  // 'components/scripts/fullpageFix.js',
  'components/scripts/script.js'
];
sassSources = [
  // 'components/bootstrap/assets/stylesheets/_bootstrap.scss',
  'components/sass/style.scss'
  // 'bower_components/bootstrap/assets/stylesheets/bootstrap'

];

htmlSources = [outputDir + '*.html'];
// phpSources = [outputDir + '*.php']; ????

gulp.task('js', function() {
  gulp.src(jsSources)
    .pipe(concat('script.js'))
    .pipe(browserify())
    .on('error', gutil.log)
    .pipe(gulpif(env === 'production', uglify()))
    .pipe(gulp.dest(outputDir + 'js'))
    // .pipe(gulp.dest(wpDirectory + 'js'))
    .pipe(connect.reload())
});

gulp.task('compass', function() {
  gulp.src(sassSources)
    .pipe(compass({
      sass: 'components/sass',
      css: (outputDir + 'css'),
      // css: (outputDir + 'css', wpDirectory),
      // css: (wpDirectory + 'css'),
      image: outputDir + 'images',
      style: sassStyle,
      require: ['susy', 'breakpoint']
    })
    // .pipe(gulp.dest(wpDirectory))
    // .pipe(concat('style.css')) // I added this line. Let's see if it works
    .on('error', gutil.log))
    .pipe(connect.reload())
});

gulp.task('watch', function() {
  gulp.watch(jsSources, ['js']);
  gulp.watch(['components/sass/*.scss', 'components/sass/*/*.scss', 'components/bootstrap/assets/stylesheets/*/*.scss'], ['compass']);
  gulp.watch('builds/development/*.html', ['html']);
});

gulp.task('connect', function() {
  connect.server({
    root: outputDir,
    livereload: true
  });
});

gulp.task('html', function() { // simply replace html with php????
  gulp.src('builds/development/*.html')
    .pipe(gulpif(env === 'production', minifyHTML()))
    .pipe(gulpif(env === 'production', gulp.dest(outputDir)))
    // .pipe(rename('front-page.php'))
    // .pipe(gulp.dest(wpDirectory))
    .pipe(connect.reload())
});

// Copy css to wpDirectory
// gulp.task('wpcss', function() { // This is the function to duplicate the css to wpDirectory
//   gulp.src(outputDir+'css/*.css')
//   .pipe(gulp.dest(wpDirectory))
//   .pipe(connect.reload())
// });

// Copy images to production
gulp.task('move', function() {
  gulp.src('builds/development/images/**/*.*')
  .pipe(gulpif(env === 'production', gulp.dest(outputDir+'images')))
  // .pipe(gulpif(env === 'development', gulp.dest(wpDirectory+'images')))
});

gulp.task('default', ['watch', 'html', 'js', 'compass', 'move', 'connect']); // replace html with php???
