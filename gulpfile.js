var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var open = require('open');

var app = {
	srcPath: 'src/',
	devPath: 'bulid/',
	prdPath: 'dist/'
};

gulp.task('lib', function(){
	gulp.src(['bower_components/**/*.js','bower_components/**/*.css','bower_components/**/*.eot','bower_components/**/*.svg','bower_components/**/*.ttf','bower_components/**/*.woff'])
	.pipe(gulp.dest(app.devPath + 'vendor'))
	.pipe(gulp.dest(app.prdPath + 'vendor'))
	.pipe($.connect.reload())
});

gulp.task('html', function(){
	gulp.src(app.srcPath + '**/*.html')
	.pipe(gulp.dest(app.devPath))
	.pipe(gulp.dest(app.prdPath))
	.pipe($.connect.reload())
});

gulp.task('json', function(){
	gulp.src(app.srcPath + 'data/**/*.json')
	.pipe(gulp.dest(app.devPath + 'data'))
	.pipe(gulp.dest(app.prdPath + 'data'))
	.pipe($.connect.reload())
});

gulp.task('less', function(){
	gulp.src(app.srcPath + 'style/index.less')
	.pipe($.less())
	.pipe(gulp.dest(app.devPath + 'css'))
	.pipe($.cssmin())
	.pipe(gulp.dest(app.prdPath + 'css'))
	.pipe($.connect.reload())
})

gulp.task('js', function(){
	gulp.src(app.srcPath + 'js/**/*.js')
	.pipe($.concat('index.js'))
	.pipe(gulp.dest(app.devPath + 'js'))
	.pipe($.uglify())
	.pipe(gulp.dest(app.prdPath + 'js'))
	.pipe($.connect.reload())
})

gulp.task('image', function(){
	gulp.src(app.srcPath + 'img/**/*')
	.pipe(gulp.dest(app.devPath + 'img'))
	.pipe($.imagemin())
	.pipe(gulp.dest(app.prdPath + 'img'))
	.pipe($.connect.reload())
})

gulp.task('bulid', ['image','js','json','html','less','lib'])

gulp.task('clean', function(){
	gulp.src([app.devPath,app.prdPath])
	.pipe($.clean())
})

gulp.task('serve',['bulid'], function(){
	$.connect.server({
		root: [app.devPath],
		livereload: true,
		port: 9090
	});
	
	open('http://localhost:9090');
	
	gulp.watch(['bower_components/**/*.js','bower_components/**/*.css','bower_components/**/*.eot','bower_components/**/*.svg','bower_components/**/*.ttf','bower_components/**/*.woff'],['lib']);
	gulp.watch(app.srcPath + '**/*.html',['html']);
	gulp.watch(app.srcPath + 'data/**/*.json',['json']);
	gulp.watch(app.srcPath + 'style/**/*.less',['less']);
	gulp.watch(app.srcPath + 'js/**/*.js',['js']);
	gulp.watch(app.srcPath + 'img/**/*',['image']);
})

gulp.task('default',['serve'])
