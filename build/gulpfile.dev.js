var gulp = require('gulp');                     // 引入gulp
var rename = require('gulp-rename'); //重命名
var minifyHtml = require("gulp-minify-html");   // html文件压缩
var minifyCss = require("gulp-minify-css");     //  css文件压缩
var less = require("gulp-less");                // less编译
var jshint = require('gulp-jshint');            //js检查
var uglify = require("gulp-uglify");            // js文件压缩
var imagemin = require('gulp-imagemin');        // 图片压缩
var cache = require('gulp-cache');              // 缓存
var concat = require("gulp-concat");            // 文件合并
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');//- 对文件名加MD5后缀
var notify = require('gulp-notify');            // 提示信息
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var Config = require('./gulpfile.config.js');

//======= gulp dev 开发环境下 ===============
function dev() {
    console.log(Config);
    /**
     * HTML处理
     */
    gulp.task('html:dev', function () {
        return gulp.src(Config.html.src).pipe(gulp.dest(Config.html.dist)).pipe(reload({
            stream: true
        }));
    });
    /**
     * page处理
     */
    gulp.task('page:dev', function () {
        return gulp.src(Config.page.src).pipe(gulp.dest(Config.page.dist)).pipe(reload({
            stream: true
        }));
    });
    /**
     * assets第三方静态文件夹下的所有文件处理
     */
    gulp.task('assets:dev', function () {
        return gulp.src(Config.assets.src).pipe(gulp.dest(Config.assets.dist)).pipe(reload({
            stream: true
        }));
    });
    /**
     * CSS样式处理
     */
    gulp.task('css:dev', function () {
        return gulp.src(Config.css.src).pipe(gulp.dest(Config.css.dist)).pipe(reload({
            stream: true
        }));
    });
    /**
     * SASS样式处理
     */
    //gulp.task('sass:dev', function () {
    //    return gulp.src(Config.sass.src).pipe(sass()).pipe(gulp.dest(Config.sass.dist)).pipe(reload({
    //        stream: true
    //    }));
    //});
    /**
     *LESS样式处理
     */
    gulp.task('less:dev', function () {
        return gulp.src(Config.less.src).pipe(less()).pipe(gulp.dest(Config.less.dist)).pipe(reload({
            stream: true
        }));
    });
    /**
     * js处理
     */
    gulp.task('js:dev', function () {
        return gulp.src(Config.js.src).pipe(jshint('.jshintrc')).pipe(jshint.reporter()).pipe(gulp.dest(Config.js.dist)).pipe(reload({
            stream: true
        }));
    });
    /**
     * 图片处理
     */
    gulp.task('images:dev', function () {
        return gulp.src(Config.img.src)
            .pipe(cache(imagemin([
                imagemin.gifsicle({interlaced: true}),
                imagemin.jpegtran({progressive: true}),
                imagemin.optipng({optimizationLevel: 5}),
                imagemin.svgo({plugins: [{removeViewBox: true}]})
            ])))
            .pipe(gulp.dest(Config.img.dist)).pipe(reload({
                stream: true
            }));
    });
    gulp.task('dev', ['page:dev', 'css:dev', 'less:dev', 'js:dev', 'assets:dev', 'images:dev'], function () {
        //browserSync.init({
        //    server: {
        //        baseDir: Config.dist
        //    }
        //    , notify: false
        //});
        // Watch .html files
        gulp.watch(Config.html.src, ['page:dev']);
        // Watch .css files
        gulp.watch(Config.css.src, ['css:dev']);
        // Watch .scss files
        gulp.watch(Config.sass.src, ['less:dev']);
        // Watch assets files
        gulp.watch(Config.assets.src, ['assets:dev']);
        // Watch .js files
        gulp.watch(Config.js.src, ['js:dev']);
        // Watch image files
        gulp.watch(Config.img.src, ['images:dev']);
    });
}
//======= gulp dev 开发环境下 ===============
module.exports = dev;