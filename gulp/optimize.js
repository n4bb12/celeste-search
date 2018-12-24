const { src, dest } = require("gulp")
const debug = require("gulp-debug")
const tinify = require("gulp-tinify")

/**
 * Compress images using https://tinypng.com/
 */
const optimize = () => src([
  `generated/bg/*.png`,
  `generated/meta/*.png`,
  `generated/sprites/*.png`,
], { base: "generated" })
  .pipe(tinify(process.env.TINIFY_API_KEY))
  .pipe(debug())
  .pipe(dest("src/assets"))

/**
 * `gulp optimize`
 */
module.exports = optimize
