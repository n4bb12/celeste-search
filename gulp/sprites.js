const { src, dest, parallel } = require("gulp")
const spritesmith = require("gulp.spritesmith")

/**
 * Generates the CSS for a sprite.
 */
const cssTemplate = name => data => {
  const sharedClass = [
    `.icon--${name} {`,
    `  display: block;`,
    `  background-image: url("assets/generated/sprite-${name}.min.png");`,
    `  width: 20px;`,
    `  height: 20px;`,
    `}`,
  ].join("\n")

  const iconSelectorLength
    = name.length + `${data.sprites.length}`.length + 10

  const iconClasses = data.sprites.map(entry => [
    `.icon--${name}--${entry.name}`.padEnd(iconSelectorLength) + "{",
    `  background-position: ${entry.offset_x}px ${entry.offset_y}px;`.trim(),
    `}`,
  ].join(" ")).join("\n")

  return [
    sharedClass,
    iconClasses,
  ].join("\n")
}

/**
 * Generates a single sprite.
 */
const sprite = name => () => src(`generated/sprites/${name}/*.png`)
  .pipe(spritesmith({
    imgName: `${name}.sprite.png`,
    cssName: `${name}.sprite.css`,
    cssTemplate: cssTemplate(name),
  }))
  .pipe(dest("generated/sprites"))

/**
 * `gulp sprites`
 */
module.exports = parallel(
  sprite("items"),
  sprite("materials"),
)
