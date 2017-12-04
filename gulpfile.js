var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var plumber = require('gulp-plumber')
var notifier = require('node-notifier');

function errorHandler(err) {
  var list = err.message.split(':')
  var head = list.shift()
  var body = list.join(':')
  var paths = head.split('/')
  console.log(err.message)
  notifier.notify({title: paths[paths.length - 1], message: body})
}

notifier.notify({title: 'gulp', message: 'start'})

gulp.task('build', function() {
  gulp.src( 'source/*.html'  ).pipe( gulp.dest( 'build' ) )
  gulp.src( 'source/images/**'  ).pipe( gulp.dest( 'build/images' ) )
  gulp.src( 'source/stylesheets/**'  ).pipe( gulp.dest( 'build/stylesheets' ) )
  gulp.src('./source/*.js')
    .on('error', errorHandler)
    .pipe($.babel({presets: ['es2015', 'react']}))
    .pipe(plumber({errorHandler: errorHandler}))
    .pipe(gulp.dest('./build'))
})

gulp.task('watch', function() {
  gulp.watch('./source/*', ['build'])
})

gulp.task('default', ['build', 'watch'])
