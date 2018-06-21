var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('images', function () {
    return gulp.src('images/*.{jpg,png}')
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
