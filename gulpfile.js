"use strict";
var gulp = require("gulp");

const sass = require("gulp-sass")(require("sass"));

const concat = require("gulp-concat");

gulp.task("tinymceStyles", function () {
  return gulp
    .src([
      "./src/assets/css/bootstrap/bootstrap.scss",
      "./src/assets/css/styles.css",
    ])
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(concat("tinymce.css"))
    .pipe(gulp.dest("./src/assets/"));
});
