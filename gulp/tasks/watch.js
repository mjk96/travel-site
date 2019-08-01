const gulp = require("gulp");
const watch = require("gulp-watch");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssvars = require("postcss-simple-vars");
const nested = require("postcss-nested");
const cssImport = require("postcss-import");
const browserSync = require("browser-sync").create();

function styles() {
    return gulp.src('./app/assets/styles/styles.css')
        .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
        .pipe(gulp.dest('./app/temp/styles'));
}

function watchCSS() {
    browserSync.init({
        server: {
            baseDir: "app"
        }
    });
    gulp.watch("./app/assets/styles/**/*.css", gulp.series(styles, cssInject));
}

function watchHTML() {
    gulp.watch("./app/index.html", function() {
        browserSync.reload();
    });
}

function cssInject() {
    return gulp.src("./app/temp/styles/styles.css").pipe(browserSync.stream());
}

exports.watch = gulp.parallel(watchCSS, watchHTML);