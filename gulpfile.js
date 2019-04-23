const { series, parallel } = require("gulp")

const build = require("./scripts/build")
const bg = require("./scripts/bg")
const copy = require("./scripts/copy")
const icons = require("./scripts/icons")
const meta = require("./scripts/meta")
const optimize = require("./scripts/optimize")
const sprites = require("./scripts/sprites")

exports.build = build
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
