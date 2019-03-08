const gulp=require('gulp');
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const cleanCSS=require('gulp-clean-css');
const autoprefixer=require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const babelify = require('babelify');
const source=require('vinyl-source-stream');
const buffer=require('vinyl-buffer');
const uglify = require('gulp-uglify');
//  gulp.task('style');
//  const styleSRC='./src/scss/style.scss';
//  const styleDIST='./dist/css/';
//  const styleWatch
const jsSrc='./src/js/';
const jsFront = 'script.js';
const jsFolder='./src/js';
const jsDIST='./dist/js/';
const jsWatch='src/js/**/*.js';
const jsFiles=[ jsFront ];
function style(){
    // return gulp.src("./src/scss/style.css")//where is my source file-Initially it was css
 return gulp.src('./src/scss/style.scss')//where is my source file
.pipe(sourcemaps.init())//Sourcemapping that is browser will now read minified version
.pipe(rename('./style.min.css'))//renaming my source file
.pipe(sass().on('error',sass.logError))//to find out whether any error exists
.pipe(cleanCSS())//cleaning and minifying CSS

.pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
} ))
.pipe(sourcemaps.write('./'))
.pipe(gulp.dest("./dist/css"));//the destination where I want to transfer my renamed file file

};
function js(done){
    jsFiles.map( function( entry ) {
		return browserify({
			entries: [jsSrc + entry]
		})
    .transform(babelify,{presets:['env']})
    .bundle()
    .pipe(source(entry))
    .pipe(rename({extname:'.min.js'}))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps:true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(jsDIST))

    });
    done();
//    return gulp.src('./src/js/script.js')
//    .pipe(gulp.dest("./dist/js"));
//Steps to convert Es6 
// browserify
//transform babilify[env]-we should do env version
//source
//rename.min
//buffer
//sourcemap
//uglify
//write source map
};

gulp.task("default",gulp.series(style,js));

    // gulp.task("watch", function() {
    //     gulp.watch( './src/scss/**/*.scss', style);
    //     gulp.watch('./src/js/**/*.js',js);
    // });
function watch(){
    
    
        gulp.watch( './src/scss/**/*.scss',style);
        gulp.watch('./src/js/**/*.js',js);
    
}
// gulp.task("js",js);
exports.style=style;
exports.js=js;
exports.watch=watch;