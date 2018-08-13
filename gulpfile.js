var gulp        = require('gulp');
var pug         = require('gulp-pug');
var sass        = require('gulp-sass');
var del         = require('del');
var rename      = require('gulp-rename');

gulp.task('clean', function(){
    return del(['build/**/*']);
});

gulp.task('build:pug', ['clean'], function(done){
    gulp.src(['./assets/pug/*.pug'])
        .pipe(pug())    	
        .pipe(rename({extname:'.html'}))
        .pipe(gulp.dest('./build/html'))
        .on('end', done);
});

gulp.task('build:sass', ['clean'], function(done){
    gulp.src([
            './assets/scss/*.scss'
        ])
        .pipe(sass())    	
        .pipe(rename({extname:'.css'}))
        .pipe(gulp.dest('./build/css'))
        .on('end', done);
});

gulp.task('build:js', ['clean'], function(done){
    gulp.src([
            './assets/js/*.js'
        ])
        .pipe(rename({extname:'.js'}))
        .pipe(gulp.dest('./build/js'))
        .on('end', done);
});

gulp.task('watch', ['build'], function() {
    gulp.watch(['./assets/**/*'], ['build']);
});

gulp.task('build', [ 'build:js', 'build:pug', 'build:sass']);
gulp.task('default', ['build']);