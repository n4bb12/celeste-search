const { src, dest } = require("gulp")
const svgmin = require("gulp-svgmin")
const svgoConfig = require("@n4bb12/config-svgo")

/**
 * Optimize the linear icons set with SVGO.
 */
const icons = () => src([
  `node_modules/linearicons/dist/svg/*.svg`,
])
  .pipe(svgmin(svgoConfig))
  .pipe(dest("generated/icons"))

/**
 * `gulp icons`
 */
module.exports = icons
