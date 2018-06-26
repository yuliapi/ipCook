

// Define variables.
let autoprefixer = require('autoprefixer');
let $ = require('gulp-load-plugins')();
let browserSync  = require('browser-sync').create();
let cleancss     = require('gulp-clean-css');
let concat       = require('gulp-concat');
let del          = require('del');
let gulp         = require('gulp');
let gutil        = require('gulp-util');
let imagemin     = require('gulp-imagemin');
let notify       = require('gulp-notify');
let postcss      = require('gulp-postcss');
let rename       = require('gulp-rename');
let run          = require('gulp-run');
let runSequence  = require('run-sequence');
let sass         = require('gulp-ruby-sass');
let uglify       = require('gulp-uglify-es').default;
let merge = require('merge-stream');

// Include paths file.
let paths = require('./_assets/gulp_config/paths');

// Processes SCSS.
gulp.task('build:styles', function() {
    const reset = gulp.src('node_modules/normalize.css/normalize.css');

    return merge (reset, sass(paths.sassFiles + '/styles.scss', {
        style: 'compressed',
        trace: true,
        loadPath: [paths.sassFiles]
    })).pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))

        .pipe(cleancss())
        .pipe(gulp.dest(paths.jekyllCssFiles))
        .pipe(gulp.dest(paths.siteCssFiles))
        .pipe(browserSync.stream())
        .on('error', gutil.log);
});

gulp.task('clean:styles', function(callback) {
    del([paths.jekyllCssFiles + 'styles.css',
        paths.siteCssFiles + 'styles.css',
    ]);
    callback();
});

// Processes JS.
gulp.task('build:scripts', function() {
    return gulp.src([
        paths.jsFiles + '/**.js'
    ])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.jekyllJsFiles))
        .pipe(gulp.dest(paths.siteJsFiles))
        .on('error', gutil.log);
});
// Deletes processed JS.
gulp.task('clean:scripts', function(callback) {
    del([paths.jekyllJsFiles + 'main.js', paths.siteJsFiles + 'main.js']);
    callback();
});

// Optimizes images.
gulp.task('build:images', function () {
    return gulp.src(paths.imageFilesGlob)
        .pipe($.responsive({
            '*.jpg': {
                // Resize all JPG images to 200 pixels wide
                width: 200,
                height: 200,
                crop: 'center',
            },
            '*.png': {
                width: '100%',
                height: '100%'
            }
        })
        )
        .pipe(imagemin())
        .pipe(gulp.dest(paths.jekyllImageFiles))
        .pipe(gulp.dest(paths.siteImageFiles))
        .pipe(browserSync.stream());

});

gulp.task('clean:images', function(callback) {
    del([paths.jekyllImageFiles, paths.siteImageFiles]);
    callback();
});


// Runs jekyll build command.
gulp.task('build:jekyll', function() {
    var shellCommand = 'bundle exec jekyll build --config _config.yml';

    return gulp.src('')
        .pipe(run(shellCommand))
        .on('error', gutil.log);
});

// Deletes the entire _site directory.
gulp.task('clean:jekyll', function(callback) {
    del(['_site']);
    callback();
});

// Main clean task.
// Deletes _site directory and processed assets.
gulp.task('clean', ['clean:jekyll',
    'clean:images',
    'clean:scripts',
    'clean:styles']);

// Builds site anew.
gulp.task('build', function(callback) {
    runSequence('clean',
        ['build:scripts', 'build:images', 'build:styles'],
        'build:jekyll',
        callback);
});

// Default Task: builds site.
gulp.task('default', ['build']);

// Special tasks for building and then reloading BrowserSync.
gulp.task('build:jekyll:watch', ['build:jekyll'], function(callback) {
    browserSync.reload();
    callback();
});

gulp.task('build:scripts:watch', ['build:scripts'], function(callback) {
    browserSync.reload();
    callback();
});


// Serves site and watches files.
// Note: passing anything besides hard-coded literal paths with globs doesn't
// seem to work with gulp.watch().

gulp.task('serve', ['build'], function() {

    browserSync.init({
        server: paths.siteDir,
        ghostMode: false, // Toggle to mirror clicks, reloads etc. (performance)
        logFileChanges: true,
        logLevel: 'debug',
        open: true        // Toggle to automatically open page when starting.
    });

    // Watch site settings.
    gulp.watch(['_config.yml'], ['build:jekyll:watch']);

    // Watch .scss files; changes are piped to browserSync.
    gulp.watch('_assets/styles/**/*.scss', ['build:styles']);

    // Watch .js files.
    gulp.watch('_assets/js/**/*.js', ['build:scripts:watch']);

    // Watch image files; changes are piped to browserSync.
    gulp.watch('_assets/img/**/*', ['build:images']);

    // Watch posts.
    gulp.watch('_posts/**/*.+(md|markdown|MD)', ['build:jekyll:watch']);

    // Watch html and markdown files.
    gulp.watch(['**/*.+(html|md|markdown|MD)', '!_site/**/*.*'], ['build:jekyll:watch']);

    // Watch data files.
    gulp.watch('_data/**.*+(yml|yaml|csv|json)', ['build:jekyll:watch']);
});




