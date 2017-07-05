//
//var minifyHtml = require("gulp-minify-html");   // html文件压缩
//var minifyCss = require("gulp-minify-css");     //  css文件压缩
//var less = require("gulp-less");                // less编译
//var uglify = require("gulp-uglify");            // js文件压缩
//var imagemin = require('gulp-imagemin');        // 图片压缩
//var cache = require('gulp-cache');              // 缓存
//var concat = require("gulp-concat");            // 文件合并
//var notify = require('gulp-notify');            // 提示信息
//var rev = require('gulp-rev');
//var revCollector = require('gulp-rev-collector');//- 对文件名加MD5后缀
//
//
//
//// gulp.task('script', function() {
//// 	//有通配符开始出现的那部分路径为 **/*.js
//// 	gulp.src('zoogooy-ui/**/*.js')
//// 	    .pipe(gulp.dest('ui')); //最后生成的文件路径为 dist/**/*.js
//// 	//如果 **/*.js 匹配到的文件为 jquery/jquery.js ,则生成的文件路径为 dist/jquery/jquery.js
//// });
//
//
//
//gulp.task('css', function () {
//    gulp.src('src/ui/**/*.css') // 要压缩的css文件
//    .pipe(minifyCss()) //压缩css
//    .pipe(gulp.dest('dist/ui'))
//    .pipe(notify({ message: 'css task ok' }));
//});
//
//
//gulp.task('js', function () {
//    gulp.src('src/ui/**/*.js') // 要压缩的js文件
//        .pipe(uglify())  //使用uglify进行压缩,更多配置请参考
//        .pipe(gulp.dest('dist/ui')) //压缩后的路径
//        .pipe(notify({ message: 'js task ok' }));
//});
//
//
//
//gulp.task('img', function () {
//    gulp.src('src/ui/**/*.{png,jpg,gif,ico}')
//        .pipe(imagemin([
//            imagemin.gifsicle({interlaced: true}),
//            imagemin.jpegtran({progressive: true}),
//            imagemin.optipng({optimizationLevel: 5}),
//            imagemin.svgo({plugins: [{removeViewBox: true}]})
//        ]))
//        .pipe(gulp.dest('dist/ui'))
//        .pipe(notify({ message: 'img task ok' }));
//});
//
//gulp.task('html', function () {
//    gulp.src('src/ui/**/*.html') // 要压缩的html文件
//        .pipe(minifyHtml()) //压缩
//        .pipe(gulp.dest('dist/ui'))
//        .pipe(notify({ message: 'html task ok' }));
//});
//
//
//
//
//
//gulp.task('concat', function () {
//    gulp.src('src/js/**/*.js')  //要合并的文件
//        .pipe(concat('all.js'))  // 合并匹配到的js文件并命名为 "all.js"
//        .pipe(uglify())  //使用uglify进行压缩,更多配置请参考：
//        .pipe(gulp.dest('dist/js'));
//});
//
////// js代码检查
////var jshint = require("gulp-jshint");
////gulp.task('lint', function () {
////    gulp.src('src/js/**/*.js')
////        .pipe(jshint())
////        .pipe(jshint.reporter()) // 输出检查结果
////        .pipe(notify({ message: 'js task ok' }));
////});
////
////// 文件合并
////var concat = require("gulp-concat");
////gulp.task('concat', function () {
////    gulp.src('src/js/**/*.js')  //要合并的文件
////        .pipe(concat('all.js'))  // 合并匹配到的js文件并命名为 "all.js"
////        .pipe(uglify())  //使用uglify进行压缩,更多配置请参考：
////        .pipe(gulp.dest('dist/js'));
////});
//
//// sass编译
//// var sass = require("gulp-sass");
//// gulp.task('sass', function () {
////     gulp.src('src/sass/*.scss')
////     .pipe(sass())
////     .pipe(gulp.dest('dist/css'));
//// });
//
//gulp.task('less', function () {
//    gulp.src('src/less/*.less')
//        .pipe(less())
//        .pipe(gulp.dest('dist/css'));
//});
//
//
//// 默认任务
//gulp.task('default', function(){
//  gulp.run('css', 'js', 'img', 'html');
//
//  //// 监听html文件变化
//  //gulp.watch('src/*.html', function(){
//  //  gulp.run('html');
//  //});
//
//  // Watch .css files
//  gulp.watch('src/ui/**/*.css', ['css'], function(event){
//      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
//  });
//
//  // Watch .js files
//  gulp.watch('src/ui/**/*.js', ['js'], function(event){
//      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
//  });
//
//  // Watch image files
//  gulp.watch('src/ui/**/*.{png,jpg,gif,ico}', ['img'], function(event){
//      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
//  });
//
//    // Watch html files
//    gulp.watch('src/ui/**/*.html', ['html'], function(event){
//        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
//    });
//});

var dev = require('./build/gulpfile.dev.js');
var build = require('./build/gulpfile.build.js');
dev();
build();
