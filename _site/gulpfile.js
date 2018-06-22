

// Define variables.
let autoprefixer = require('autoprefixer');
var $ = require('gulp-load-plugins')();
var browserSync  = require('browser-sync').create();
var cleancss     = require('gulp-clean-css');
var concat       = require('gulp-concat');
var del          = require('del');
var gulp         = require('gulp');
var gutil        = require('gulp-util');
var imagemin     = require('gulp-imagemin');
var notify       = require('gulp-notify');
var postcss      = require('gulp-postcss');
var rename       = require('gulp-rename');
var run          = require('gulp-run');
var runSequence  = require('run-sequence');
var sass         = require('gulp-ruby-sass');
var uglify       = require('gulp-uglify');

// Include paths file.
var paths = require('./_assets/gulp_config/paths');

gulp.task('images', function () {
    return gulp.src('_assets/images/*.{jpg,png}')
        .pipe($.responsive({
            '*': {
                // Resize all JPG images to 200 pixels wide
                width: 200,
                height: 200,
                crop: 'center',
            },

        }, {
            // Global configuration for all images
            // The output quality for JPEG, WebP and TIFF output formats
            quality: 60,
            // Use progressive (interlace) scan for JPEG and PNG output
            progressive: true,
            // Zlib compression level of PNG output format
            compressionLevel: 7,
            // Strip all metadata
            withMetadata: false,

        }))
        .pipe(gulp.dest('assets/images'));
});
