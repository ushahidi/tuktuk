
const gulp = require('gulp')
const sass = require('gulp-sass')
const minifyCss = require('gulp-minify-css')
const rename = require('gulp-rename')
const ngAnnotate = require('gulp-ng-annotate')
const uglify = require('gulp-uglify')
const pump = require('pump')

const paths = {
  sass: ['./src/scss/**/*.scss'],
  scripts: ['./src/js/**/*.js']
}

gulp.task('default', ['sass', 'libs', 'scripts'])

gulp.task('sass', function (done) {
  gulp.src('./src/scss/tuktuk.app.scss')
    .pipe(sass({includePaths: [ 'node_modules/' ]}))
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done)
})

gulp.task('libs', (cb) => {
  pump([
    gulp.src('./node_modules/ionic-sdk/release/js/ionic.bundle.min.js'),
    rename({ basename: 'libs' }),
    gulp.dest('www/js'),
    uglify(),
    rename({ extname: '.min.js' }),
    gulp.dest('www/js')
  ],
    cb
  )
})

gulp.task('scripts', (cb) => {
  pump([
    gulp.src('src/js/app.js'),
    ngAnnotate(),
    gulp.dest('www/js'),
    uglify(),
    rename({ extname: '.min.js' }),
    gulp.dest('www/js')
  ],
    cb
  )
})

gulp.task('watch', ['sass', 'scripts'], () => {
  gulp.watch(paths.sass, ['sass'])
  gulp.watch(paths.scripts, ['scripts'])
})
