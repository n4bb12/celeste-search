const { src, dest, series, parallel } = require("gulp")
const { writeFile } = require("fs-extra")
const del = require("del")
const responsive = require("gulp-responsive")

const ratio = 9 / 16
const sourceWidth = 2048
const paths = {
  in: "assets/norse.png",
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

    images.push({
      rename: `bg-${width}-${height}.png`,
      width,
      height,
    })
    images.push({
      rename: `bg-${size}.png`,
      width: size,
      height: size,
    })
  })

  return images
}

/**
 * Builds a CSS string containing media queries for the different
 * image sizes.
 */
const buildMediaQueries = images => {
  const rules = []

  function addRule(...lines) {
    rules.push("  " + lines.map(line => line.trim()).join(" "))
  }

  images.forEach(({ rename, width, height }) => {

    const backgroundImage
      = `background-image: url("/assets/bg/${rename}");`

    if (!rules.length) {
      addRule(backgroundImage)
    } else if (width !== height) {
      addRule(
        `@media (max-width: ${width}px), (max-height: ${height}px) {`,
        `  ${backgroundImage}`,
        `}`)
    } else {
      addRule(
        `@media (max-aspect-ratio: 1/1) and (max-height: ${height}px) {`,
        `  ${backgroundImage}`,
        `}`)
    }
  })

  return `body.--stable {
${rules.join("\n")}
}
`
}

/**
 * Deletes all current backgrounds.
 */
const deleteBGs = () => del(paths.out + "/*")

/**
 * Generates multiple sizes of background images.
 */
const generateBGs = done => {
  const images = buildImagesConfigs([1, 1.25, 1.5, 2, 3])

  const writeImages = () => src(paths.in)
    .pipe(responsive({ "*": images }))
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
