const { src, dest, series, parallel } = require("gulp")
const { writeFile } = require("fs-extra")
const debug = require("gulp-debug")
const del = require("del")
const responsive = require("gulp-responsive")

const ratio = 9 / 16
const sourceWidth = 2048
const paths = {
  in: "assets/YggdrasilLoadingFinal.png",
  out: "generated/bg",
}

/**
 * Determines the images sizes for `gulp-responsive`.
 */
function buildImagesConfigs(exponents) {
  const images = []

  exponents.forEach(exponent => {
    const width = Math.round(sourceWidth * Math.pow(ratio, exponent - 1))
    const height = Math.round(sourceWidth * Math.pow(ratio, exponent))
    const size = height

    // 16:9
    images.push({
      rename: `bg-${width}-${height}.png`,
      width,
      height,
    })

    // 1:1
    images.push({
      rename: `bg-${size}.png`,
      width: size,
      height: size,
      quality: 100,
    })
  })

  return images.sort((a, b) => (b.width - b.height) - (a.width - a.height))
}

/**
 * Builds a CSS string containing media queries for the different
 * image sizes.
 */
const buildMediaQueries = images => {
  const rules = []
  const indent = "  "
  const eol = "\n"

  function addRule(...lines) {
    rules.push(lines.map(line => indent + line).join(eol))
  }

  images.forEach(({ rename, width, height }) => {
    const bgImage
      = `background-image: url("/assets/bg/${rename}");`

    if (!rules.length) {
      addRule(bgImage)
    } else if (width !== height) {
      addRule(
        `@media (max-width: ${width}px), (max-height: ${height}px) {`,
        indent + `${bgImage}`,
        `}`)
    } else {
      addRule(
        `@media (max-aspect-ratio: 1/1) and (max-height: ${height}px) {`,
        indent + `${bgImage}`,
        `}`)
    }
  })

  return `@import "imports";

body {
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: $theme-secondary;
${rules.join(eol + eol)}
}
`
}

/**
 * Deletes previously generated background images.
 */
const deleteBGs = () => del(paths.out + "/*")

/**
 * Generates multiple sizes of background images.
 */
const generateBGs = done => {
  const images = buildImagesConfigs([1, 1.25, 1.5, 2, 3])

  const writeImages = () => src(paths.in)
    .pipe(responsive({ "*": images }, { silent: true }))
    .pipe(debug())
    .pipe(dest(paths.out))

  const writeCSS = () => {
    const scss = buildMediaQueries(images)
    return writeFile(paths.out + "/bg.scss", scss, "utf8")
  }

  return parallel(writeCSS, writeImages)(done)
}

/**
 * `gulp bg`
 */
module.exports = series(deleteBGs, generateBGs)
