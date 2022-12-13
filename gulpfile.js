const gulp = require("gulp");
const sass = require("gulp-sass");
const del = require("del");
const browserSync = require("browser-sync").create();

function style() {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./src/css"))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./src/"
    }
  });

  gulp.watch("./src/scss/**/*.scss").on("change", style);
  gulp.watch("./src/js/**/*.js").on("change", browserSync.reload);
  gulp.watch("./src/**/*.html").on("change", browserSync.reload);
}

function copyToDist() {
  del.sync("dist/");
  return gulp.src(["./src/**/*.*", "!./src/scss/**"]).pipe(gulp.dest("dist"));
}

function watchDist() {
  browserSync.init({
    server: "./dist/"
  });
}
exports.default = gulp.series(style, watch);
exports.build = gulp.series(style, copyToDist);
exports.watchDist = gulp.series(style, copyToDist, watchDist);
