/*
    gulp.task() 创建任务的
    gulp.src()  找文件源路径
    pipe()      管道
    gulp.dest() 目的路径
*/

const gulp = require("gulp");

// html
gulp.task("html_index", function () {
    return gulp.src("*.html")
    .pipe(gulp.dest("dist/"))
    .pipe(connect.reload());
});

gulp.task("html", function () {
    return gulp.src("html/*.html")
    .pipe(gulp.dest("dist/html"))
    .pipe(connect.reload());
});

// ico
gulp.task("ico", function () {
    return gulp.src("*.ico")
    .pipe(gulp.dest("dist/"))
    .pipe(connect.reload());
});

// readme.md
gulp.task("readme", function () {
    return gulp.src("*.md")
    .pipe(gulp.dest("dist/"))
    .pipe(connect.reload());
});

// images
gulp.task("images", function(){
    return gulp.src("images/**/*")
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload());
});

//data数据
gulp.task("data", function(){
    //有多个源路径，只能写数组
    return gulp.src("data/*.json")
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload());
});

// js代码处理
gulp.task("scripts", function(){
    return gulp.src("js/**/*")
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
});

// libs
gulp.task("libs", function(){
    return gulp.src("libs/*.js")
    .pipe(gulp.dest("dist/libs"))
    .pipe(connect.reload());
})

// api
gulp.task("api", function () {
    return gulp.src("api/**/*")
    .pipe(gulp.dest("dist/api"))
    .pipe(connect.reload());
})

// css
// const scss = require("gulp-sass");
gulp.task("scss", function(){
    return gulp.src("css/*.min.css")
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})

// build
gulp.task("build", ["html_index", "html", "ico", "readme", "images", "scripts", "data", "libs", "api", "scss"], function(){
    console.log("项目建立成功");
})

//设置监听，设置服务，同时启动监听和服务
gulp.task("watch", function(){
    gulp.watch("*.html", ["html_index"]);
    gulp.watch("html/*.html", ["html"]);
    gulp.watch("*.ico", ["ico"]);
    gulp.watch("*.md", ["readme"]);
    gulp.watch("images/**/*", ["images"]);
    gulp.watch("*.json", ["data"]);
    gulp.watch("js/**/*", ["scripts"]);
    gulp.watch("libs/*.js", ["libs"]);
    gulp.watch("api/**/*", ["api"]);
    gulp.watch("css/*.scss", ["scss"]);
})

const connect = require("gulp-connect");
gulp.task("server", function(){
    connect.server({
        root: "dist",
        port: 8888,
        livereload: true
    })
})

//设置默认任务
gulp.task("default", ["watch", "server"]);

// 每次修改时, 打开git bash, 进入: cd 路径, gulp build, gulp
