var gulp = require('gulp'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();

gulp.task('previewDocs', function(){
  browserSync.init({
    notify: false,
    server:{
      baseDir: "docs"
    }
  });
});

gulp.task('deleteDocsFolder', function(){
  return del("./docs");
});

gulp.task('usemin', ['deleteDocsFolder','scripts'], function(){
  return gulp.src('./app/index.html')
  .pipe(usemin({
    js:[function(){return rev()},function(){return uglify()}]
  }))
  .pipe(gulp.dest('./docs'));
});
gulp.task('build', ['deleteDocsFolder','usemin']);