const { series, parallel } = require("gulp")

const bg = require("./gulp/bg")
const copy = require("./gulp/copy")
const icons = require("./gulp/icons")
const meta = require("./gulp/meta")
const optimize = require("./gulp/optimize")
const sprites = require("./gulp/sprites")

exports.bg = bg
exports.copy = copy
exports.icons = icons
exports.meta = meta
exports.optimize = optimize
exports.sprites = sprites

exports.default = series(
  parallel(bg, icons, meta, sprites),
  parallel(optimize, copy),
)
