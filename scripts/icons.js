const { src, dest } = require("gulp")
const svgmin = require("gulp-svgmin")
const svgoConfig = require("@n4bb12/config-svgo")

const paths = {
  in: "node_modules/linearicons/dist/svg/*.svg",
  out: "generated/icons",
}

/**
 * Optimize the linear icons set with SVGO.
 */
const icons = () => src(paths.in)
  .pipe(svgmin(svgoConfig))
  .pipe(dest(paths.out))

/**
 * `gulp icons`
 */
module.exports = icons
