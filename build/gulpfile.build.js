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
var runSequence = require('run-sequence');            // 顺序执行
var notify = require('gulp-notify');            // 提示信息
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var Config = require('./gulpfile.config.js');
//======= gulp build 正式环境下 ===============
function build() {
    /**
     * page处理
     */
    gulp.task('page', function () {
        return gulp.src(Config.page.src).pipe(gulp.dest(Config.page.dist));
    });
    /**
     * assets文件夹下的所有文件处理
     */
    gulp.task('assets', function () {
        return gulp.src(Config.assets.src).pipe(gulp.dest(Config.assets.dist));
    });
    /**
     * CSS样式处理
     */
    gulp.task('css', function () {
        return gulp.src(Config.css.src)
            .pipe(gulp.dest(Config.css.dist))
            .pipe(rename({ suffix: '.min' }))
            .pipe(minifyCss())
            .pipe(gulp.dest(Config.css.dist))
    });

    /**
     * 合并所有css文件并做压缩处理
     */
    gulp.task('css-concat', function () {
        return gulp.src(Config.css.src)
            .pipe(concat('main.css'))
            .pipe(gulp.dest(Config.css.dist))
            .pipe(rename({ suffix: '.min' }))
            .pipe(minifyCss())
            .pipe(rev())											//- 文件名加MD5后缀
            .pipe(gulp.dest(Config.css.dist))
            .pipe(rev.manifest())								   //- 生成一个rev-manifest.json
            .pipe(gulp.dest(Config.css.dist))					   //- 将 rev-manifest.json 保存到 rev 目录内
            .pipe(notify({ message: 'css task ok' }));
    });

    /**
     * js处理
     */
    gulp.task('js', function () {
        return gulp.src(Config.js.src)
            .pipe(cache('jshint'))
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('default'))
            .pipe(gulp.dest(Config.js.dist))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(uglify())
            .pipe(gulp.dest(Config.js.dist));
    });
    /**
     * 合并所有js文件并做压缩处理
     */
    gulp.task('js-concat', function () {
        return gulp.src(Config.js.src)
            .pipe(cache('jshint'))
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('default'))
            .pipe(concat(Config.js.build_name))
            .pipe(gulp.dest(Config.js.dist))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(uglify())
            .pipe(rev())											//- 文件名加MD5后缀
            .pipe(gulp.dest(Config.js.dist))
            .pipe(rev.manifest())								   //- 生成一个rev-manifest.json
            .pipe(gulp.dest(Config.js.dist))							  //- 将 rev-manifest.json 保存到 rev 目录内
            .pipe(notify({ message: 'js task ok' }));
    });


    /**
     * 图片处理
     */
    gulp.task('images', function () {
        return gulp.src(Config.img.src)
            .pipe(cache(imagemin([
                imagemin.gifsicle({interlaced: true}),
                imagemin.jpegtran({progressive: true}),
                imagemin.optipng({optimizationLevel: 5}),
                imagemin.svgo({plugins: [{removeViewBox: true}]})
            ])))
            .pipe(gulp.dest(Config.img.dist));
    });

    ////Html替换css、js文件版本
    //gulp.task('revHtmlCss', function () {
    //    return gulp.src([Config.css.dist+'/*.json', './src/header.html'])
    //        .pipe(revCollector())                         //替换html中对应的记录
    //        .pipe(gulp.dest('./view'));                     //输出到该文件夹中
    //});
    //gulp.task('revHtmlJs', function () {
    //    return gulp.src([Config.js.dist+'/*.json', './src/header.html'])
    //        .pipe(revCollector())
    //        .pipe(gulp.dest('./view'));
    //});
    //
    //gulp.task('build', function (done) {
    //    condition = false;
    //    //依次顺序执行
    //    runSequence(
    //        ['page'],
    //        ['css'],
    //        ['css-concat'],
    //        ['revHtmlCss'],
    //        ['js'],
    //        ['js-concat'],
    //        ['revHtmlJs'],
    //        ['assets'],
    //        ['images'],
    //        done);
    //});
    gulp.task('build', ['page', 'css', 'css-concat', 'js', 'js-concat', 'assets', 'images'], function(){
        return gulp.src([Config.md5_json, './src/index.html'])   //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
            .pipe(revCollector())								   //- 执行文件内css名的替换
            .pipe(gulp.dest('./view/'))					 //- 替换后的文件输出的目录
            .pipe(notify({ message: 'index task ok' }));
    });

}

//======= gulp build 正式环境下 ===============

module.exports = build;