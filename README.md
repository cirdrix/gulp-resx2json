> A pure JS `.resx` file converter (XML to JSON) plugin for gulp. 
> With this fork you can filter the elements in the resx with a comment value.

## Usage

First, install `gulp-resx2json` as a development dependency by edit the package.json:

```shell
"devDependencies": {
    ...
    "gulp-resx2json": "github:cirdrix/gulp-resx2json.git#1.0.2",
	...
}
```

Then, add it to your `gulpfile.js`:

```javascript
var resx2json = require('gulp-resx2json');

gulp.task('resources', function(){
  gulp.src(['resource.resx'])
    .pipe(resx2json({ commentValue : 'filter comment value' }))
    .pipe(gulp.dest('resources/resource.json'));
});
```
