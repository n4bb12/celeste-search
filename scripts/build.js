const { series, parallel } = require("gulp")

const exec = require("execa")
const { readFile, writeFile } = require("fs-extra")

const dist = "dist/celeste-search"

function app() {
  return exec.shell("yarn ng build -c production")
}

async function sitemap() {
  let content = await readFile(`${dist}/sitemap.xml`, "utf8")

  content = content
    .replace(/LASTMOD/g, new Date().toISOString())

  return writeFile(`${dist}/sitemap.xml`, content, "utf8")
}

async function robots() {
  if (process.env.CONTEXT !== "production") {
    return
  }

  const content = `
User-agent: *
Disallow:
`.trim()

  return writeFile(`${dist}/robots.xml`, content, "utf8")
}

module.exports = series(app, parallel(sitemap, robots))
