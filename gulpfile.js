const gulp = require('gulp');

require('./gulp/dev.js');
require('./gulp/docs.js');

// Task dev
gulp.task(
	'default',
	gulp.series(
		'clean:dev',
		gulp.parallel('html:dev', 'sass:dev', 'images:dev', 'fonts:dev', 'files:dev', 'js:dev'),
		gulp.parallel('server:dev', 'watch:dev')
	)
);

// Task docs (production)
gulp.task(
	'docs',
	gulp.series(
		'clean:docs',
		gulp.parallel('html:docs', 'sass:docs', 'images:docs', 'files:docs', 'js:docs'),
		gulp.parallel('server:docs')
	)
);

// Task google fonts in base64
const concat = require('gulp-concat');
const cssmin = require('gulp-minify-css');
const webFontsBase64 = require('gulp-google-fonts-base64-css');

gulp.task('fonts', function () {
	return gulp.src('./src/fonts/fonts.list')
		.pipe(webFontsBase64())
		.pipe(concat('fontsbase64.css'))
		.pipe(cssmin())
		.pipe(gulp.dest('./src/fonts/'));
});