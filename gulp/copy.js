const { src, dest } = require("gulp")
const debug = require("gulp-debug")

/**
 * Copy assets that don't need compression or any other form
 * of optimization.
 */
const copy = () => src([
  `generated/**/*.scss`,
], { base: "generated" })
  .pipe(debug())
  .pipe(dest("src/assets"))

/**
 * `gulp copy`
 */
module.exports = copy
