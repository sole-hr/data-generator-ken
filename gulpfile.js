"use strict";

const gulp = require("gulp");

gulp.task("hello", function() {
  console.log("Hello");
});

gulp.task("default", ["hello"], function() {
  console.log("THIS IS THE DEFAULT");
});
