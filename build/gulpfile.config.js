var SRC_DIR = './src/ui/';     // 源文件目录
var DIST_DIR = './dist/ui/';   // 文件处理后存放的目录
var DIST_FILES = DIST_DIR + '**'; // 目标路径下的所有文件
var MD5_JSON = DIST_DIR + '**/rev-manifest.json'; // 目标路径下的所有文件

var Config = {
    src: SRC_DIR,
    dist: DIST_DIR,
    dist_files: DIST_FILES,
    md5_json: MD5_JSON,
    html: {
        src: SRC_DIR + '*.html',
        dist: DIST_DIR
    },
    assets: {
        src: SRC_DIR + 'js/plugins/**/*',            // assets目录：./src/assets
        dist: DIST_DIR + 'js/plugins'                // assets文件build后存放的目录：./dist/assets
    },
    css: {
        src: SRC_DIR + 'css/**/*.css',           // CSS目录：./src/css/
        dist: DIST_DIR + 'css'                   // CSS文件build后存放的目录：./dist/css
    },
    sass: {
        src: SRC_DIR + 'sass/**/*.scss',         // SASS目录：./src/sass/
        dist: DIST_DIR + 'css'                   // SASS文件生成CSS后存放的目录：./dist/css
    },
    less: {
        src: SRC_DIR + 'less/**/*.less',         // LESS目录：./src/less/
        dist: DIST_DIR + 'css'                   // LESS文件生成CSS后存放的目录：./dist/less
    },
    js: {
        src: SRC_DIR + 'js/baselib/**/*.js',             // JS目录：./src/js/
        dist: DIST_DIR + 'js/baselib',                   // JS文件build后存放的目录：./dist/js
        build_name: 'build.js'                   // 合并后的js的文件名
    },
    img: {
        src: SRC_DIR + 'images/**/*',            // images目录：./src/images/
        dist: DIST_DIR + 'images'                // images文件build后存放的目录：./dist/images
    },
    page: {
        src: SRC_DIR + 'page/**/*',            // page目录：./src/images/
        dist: DIST_DIR + 'page'                // page文件build后存放的目录
    }
};

module.exports = Config;