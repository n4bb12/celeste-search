const { series, parallel } = require("gulp")

const bg = require("./gulp/bg")
const copy = require("./gulp/copy")
const meta = require("./gulp/meta")
const optimize = require("./gulp/optimize")
const sprites = require("./gulp/sprites")

exports.bg = bg
exports.copy = copy
exports.meta = meta
exports.optimize = optimize
exports.sprites = sprites

exports.default = series(
  parallel(bg, meta, sprites),
  parallel(optimize, copy),
)
