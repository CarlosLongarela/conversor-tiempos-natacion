var gulp         = require( 'gulp' ),
	uglify       = require( 'gulp-uglify' ),
	sass         = require( 'gulp-sass' ),
	autoprefixer = require( 'gulp-autoprefixer' ),
	cssnano      = require( 'gulp-cssnano' ),
	plumber      = require( 'gulp-plumber' ),
	concat       = require( 'gulp-concat' ),
	notify       = require( 'gulp-notify' ),
	sourcemaps   = require( 'gulp-sourcemaps' );


var JS = [
	'./js/src/conversor.js',
];

var SCSS = [
	'./css/scss/style.scss',
];

/** Js Tasks */
gulp.task( 'scripts', function() {
	return gulp.src( JS )
		.pipe( sourcemaps.init() )
		// An identity sourcemap will be generated at this step
		.pipe( sourcemaps.identityMap() )
		.pipe( plumber() )
		.pipe( concat( 'conversor.min.js' ) )
		.pipe( uglify() )
		.pipe( sourcemaps.write( './maps' ) )
		.pipe( gulp.dest( 'js' ) )
		.pipe( notify( {
			title: 'Resultado tarea Gulp scripts:',
			message: 'Script .min creado',
			onLast: true
		} ) );
} );

/** SCSS Tasks */
gulp.task( 'styles', function() {
	return gulp.src( SCSS )
		.pipe( sourcemaps.init() )
		// An identity sourcemap will be generated at this step
		.pipe( sourcemaps.identityMap() )
		.pipe( plumber() )
		.pipe( concat( 'style.min.css' ) )
		.pipe( sass().on( 'error', sass.logError ) )
		.pipe( autoprefixer( 'last 2 versions', '> 5%', 'not ie 6-9') )
		.pipe( cssnano() )
		.pipe( sourcemaps.write( './maps' ) )
		.pipe( gulp.dest( 'css' ) )
		.pipe( notify( {
			title: 'Resultado tarea Gulp styles:',
			message: 'CSS creado',
			onLast: true
		} ) );
} );


gulp.task( 'watch', function() {
	// Inspect changes in js files.
	gulp.watch( JS, gulp.series( 'scripts' ) );

	// Inspect changes in scss files.
	gulp.watch( SCSS, gulp.series( 'styles' ) );
} );

//gulp.task( 'default', [ 'scripts', 'scss', 'watch' ] );

gulp.task( 'default', gulp.parallel( 'styles', 'scripts' ) );
