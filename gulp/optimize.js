const { src, dest } = require("gulp")
const debug = require("gulp-debug")
const rename = require("gulp-rename")
const tinify = require("gulp-tinify")

/**
 * Compress images using https://tinypng.com/
 */
const optimize = () => src([
  `generated/bg/*.png`,
  `generated/sprites/*.png`,
])
  .pipe(debug())
  .pipe(rename(path => path.extname = ".min" + path.extname))
  .pipe(tinify(process.env.TINIFY_API_KEY))
  .pipe(dest("src/assets/generated"))

/**
 * `gulp optimize`
 */
module.exports = optimize
