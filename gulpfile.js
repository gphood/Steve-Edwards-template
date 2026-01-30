var gulp        = require('gulp');
var zip         = require('gulp-zip');
var folder_name = __dirname.split(/[\\]+/).pop();
/*const gulp      = require('gulp');
const zip       = require('gulp-zip');

var base_files  = require('../gulp/eryc_base_gantry.js');

console.log(base_files.scripts);

var files       = [
                    './**',
                    '!node_modules',
                    '!node_modules/**',
                    '!gulpfile.js',
                    '!package-lock.json',
                    '!MD5SUMS'
                  ];

files = files.concat(base_files.scripts);

console.log(files);

gulp.task('default', function(){
  return gulp.src(files)
  .pipe(zip(folder_name + '.zip'))
  .pipe(gulp.dest('../downloads/'));g
});*/


gulp.task('default', function(){
    return gulp.src([
                    '../eryc_base_gantry/eryc_base_gantry/**',
                    './**',
                    '!node_modules',
                    '!node_modules/**',
                    '!gulpfile.js',
                    '!package-lock.json',
                    '!MD5SUMS'
                  ])
    .pipe(zip(folder_name + '.zip'))
    .pipe(gulp.dest('../downloads/'));
});