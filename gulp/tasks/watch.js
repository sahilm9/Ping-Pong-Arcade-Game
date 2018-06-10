let gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

gulp.task('watch',function(){

  browserSync.init({
    notify: false,
    server:{
      baseDir: "app"
    }
  });

  watch(`./app/index.html`, function(){
    browserSync.reload();
  });

  watch('./app/src/scripts/*.js', function(){
    gulp.start('scriptsRefresh');
  })

});

gulp.task('scriptsRefresh', ['scripts'],function(){
  browserSync.reload();
})