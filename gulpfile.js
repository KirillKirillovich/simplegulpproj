//connect Gulp on project поодключение модулей
const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');

// порядок подключения файлов CSS
// const cssFiles = [
//     './src/css/main.css',
//     './src/css/media.css'
// ]

// порядок подключения SCSS
const cssFiles = [
        // './src/scss/helpers.scss',
        './src/scss/main.scss'
    ]


// порядок подключения файлов JS
const jsFiles = [
    './src/js/lib.js',
    './src/js/main.js'
]

// Style CSS task
function styles() {
    // Шаблон для поиска файлов CSS
    // Все файлы по шаблону  './src/css/**/*.css
    return gulp.src(cssFiles)
    // SCSS 
    .pipe(sourcemaps.init())
    .pipe(sass())
        // Объединение файлов в один
        .pipe(concat('style.css'))
        // расстановка префиксов
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        // Минификация CSS
        .pipe(cleanCSS({
        //уровень сжатия 0-light 2-Hard
            level: 2 
        }))
        .pipe(sourcemaps.write('./'))
        //выходная папка для стилей
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
}


// script JS task 

// function call
function scripts() {
    // Шаблон для поиска файлов JS
    // Все файлы по шаблону  './src/js/**/*.js
    return gulp.src(jsFiles)
    // Объединение файлов в один
    .pipe(concat('script.js'))
    //Минификация JS
    .pipe(uglify({
        toplevel: true
    }))
    //выходная папка для js
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());
}; // <end  JS Scripts Task task


// удаляет все в указаной папке
function clean(){
    return del (['./build/*'])
}

// ПРосмотр файлов Watch

function watch () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    //следить за CSS файлами и JS
    //gulp.watch('./src/css/**/*.css', styles)
    gulp.watch('./src/scss/**/*.scss', styles)
    gulp.watch('./src/js/**/*.js', scripts)
    gulp.watch('./*.html').on('change', browserSync.reload);
}

// вызов функции styles
gulp.task('styles', styles);
// вызов функции Scripts
gulp.task('scripts', scripts);
// удаление файлов
gulp.task('del', clean);
// отслеживание изменений
gulp.task('watch', watch);
// для удаления файлов в папке build и запуска styles, scripts
gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts)));
// старотвая команада для начала работы
gulp.task('dev', gulp.series('build', 'watch'));

